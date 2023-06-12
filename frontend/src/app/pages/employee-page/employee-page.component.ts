import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
    private modalService: NgbModal
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
        })
        .catch((error) => {
          this.data.error(error['message']);
        });
    }
  }

  ngOnInit() {
    this.btnDisabled = true;
    this.rest
      .get(this.url)
      .then((data) => {
        this.employees = (data as { employees: Employee[] }).employees;
        console.log(this.employees);
        this.btnDisabled = false;
      })
      .catch((error) => {
        this.data.error(error['message']);
        this.btnDisabled = false;
      });
  }

  finishAndAlert(message: string) {
    this.data.success(message);

    this.ngOnInit();
  }
}
