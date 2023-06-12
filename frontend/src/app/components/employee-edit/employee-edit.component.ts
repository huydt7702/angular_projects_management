import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/models/employee';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css'],
})
export class EmployeeEditComponent implements OnInit {
  doing = false;
  employee: Employee;
  url = 'http://localhost:4040/v1/api/accounts';

  @Input('id')
  editId!: string;

  @Output()
  updateFinished: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private modelService: NgbModal,
    private rest: RestApiService,
    private data: DataService
  ) {
    this.employee = new Employee();
  }

  ngOnInit() {
    this.doing = true;
    this.rest
      .getOne(this.url, this.editId)
      .then((data) => {
        this.doing = false;
        this.employee = (data as { employee: Employee }).employee;
      })
      .catch((error) => {
        this.doing = false;
        this.data.error(error['message']);
      });
  }

  open(content: TemplateRef<any>) {
    this.data.message = '';
    this.modelService.open(content, { ariaDescribedBy: 'modal-basic-title' });
  }

  update() {
    this.doing = true;

    this.rest
      .put(this.url, this.editId, this.employee)
      .then((data) => {
        this.doing = false;
        this.updateFinished.emit('New employee is updated!');
        this.modelService.dismissAll();
        this.employee = new Employee();
      })
      .catch((error) => {
        this.doing = false;
        this.data.error(error['message']);
      });
  }
}
