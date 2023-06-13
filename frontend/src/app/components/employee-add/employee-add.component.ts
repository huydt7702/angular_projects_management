import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css'],
})
export class EmployeeAddComponent implements OnInit {
  saving = false;
  employee: Employee;
  url = 'http://localhost:4040/v1/api/accounts';

  @Output()
  savingFinished: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private modelService: NgbModal,
    private rest: RestApiService,
    private data: DataService,
    private toasrt: ToastrService
  ) {
    this.employee = new Employee();
  }

  ngOnInit() {}

  open(content: TemplateRef<any>) {
    this.data.message = '';
    this.modelService.open(content, { ariaDescribedBy: 'modal-basic-title' });
  }

  save() {
    this.saving = true;

    this.rest
      .post(this.url, this.employee)
      .then((data) => {
        this.saving = false;
        this.savingFinished.emit('New employee is saved!');
        this.modelService.dismissAll();
        this.employee = new Employee();
      })
      .catch((error) => {
        this.saving = false;
        this.data.error(error['error'].message);
        this.toasrt.error(error['error'].message, 'Error!');
      });
  }
}
