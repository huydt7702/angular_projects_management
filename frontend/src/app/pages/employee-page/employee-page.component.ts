import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.css'],
})
export class EmployeePageComponent implements OnInit {
  employees!: Employee[];
  btnDisabled = false;
  url = 'http://localhost:4040/v1/api/accounts';
  deletedId!: string;
  confirmMessage = '';

  constructor(
    private rest: RestApiService,
    private data: DataService,
    private modalService: NgbModal,
    private toasrt: ToastrService
  ) {}

  confirmDeleteEmployee(
    confirmDialog: TemplateRef<any>,
    id: string,
    name: string
  ) {
    this.confirmMessage = `Do you want to delete employee ${name}`;
    this.deletedId = id;
    this.modalService
      .open(confirmDialog, { ariaDescribedBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.deletedId = '';
        },
        (err) => {}
      );
  }

  deleteEmployee() {
    if (this.deletedId !== '') {
      this.rest
        .delete(this.url, this.deletedId)
        .then((data) => {
          this.modalService.dismissAll();
          this.ngOnInit();
          this.toasrt.success((data as { message: string }).message, 'Success');
        })
        .catch((error) => {
          this.data.error(error['error']);
        });
    }
  }

  ngOnInit() {
    this.btnDisabled = true;
    this.rest
      .get(this.url)
      .then((data) => {
        this.employees = (data as { employees: Employee[] }).employees;
        this.btnDisabled = false;
      })
      .catch((error) => {
        this.data.error(error['error']);
        this.toasrt.error(error['error'], 'Error!');
        this.btnDisabled = false;
      });
  }

  finishAndAlert(message: string) {
    this.data.success(message);

    this.ngOnInit();
  }
}
