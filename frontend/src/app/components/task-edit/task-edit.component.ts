import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee';
import { Project } from 'src/app/models/project';
import { Task } from 'src/app/models/task';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css'],
})
export class TaskEditComponent implements OnInit {
  doing = false;
  task: Task;
  projects!: Project[];
  employees!: Employee[];
  url = 'http://localhost:4040/v1/api/tasks';

  @Input('id')
  editId!: string;

  @Output()
  updateFinished: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private modelService: NgbModal,
    private rest: RestApiService,
    public data: DataService,
    private toasrt: ToastrService
  ) {
    this.task = new Task();
    this.data.getProfile();
  }

  ngOnInit() {
    this.doing = true;
    this.rest
      .getOne(this.url, this.editId)
      .then((data) => {
        this.doing = false;
        this.task = (data as { data: Task }).data;
      })
      .catch((error) => {
        this.doing = false;
        this.data.error(error['message']);
      });

    this.rest
      .get('http://localhost:4040/v1/api/projects')
      .then((data) => {
        this.projects = (data as { data: Project[] }).data;
      })
      .catch((error) => {
        this.data.error(error['message']);
      });

    if (this.data.employee?.role === 'Leader') {
      this.rest
        .get('http://localhost:4040/v1/api/accounts')
        .then((data) => {
          this.employees = (data as { employees: Employee[] }).employees;
        })
        .catch((error) => {
          this.data.error(error['message']);
        });
    }
  }

  open(content: TemplateRef<any>) {
    this.data.message = '';
    this.modelService.open(content, { ariaDescribedBy: 'modal-basic-title' });
  }

  update() {
    this.doing = true;

    this.rest
      .put(this.url, this.editId, this.task)
      .then((data) => {
        this.doing = false;
        this.updateFinished.emit('New task is updated!');
        this.toasrt.success('New task is updated!', 'Success');
        this.modelService.dismissAll();
        this.task = new Task();
      })
      .catch((error) => {
        this.doing = false;
        this.data.error(error['error'].message);
        this.toasrt.error(error['error'].message, 'Error!');
      });
  }
}
