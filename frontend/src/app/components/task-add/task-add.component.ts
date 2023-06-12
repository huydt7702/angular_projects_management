import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/models/employee';
import { Project } from 'src/app/models/project';
import { Task } from 'src/app/models/task';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css'],
})
export class TaskAddComponent implements OnInit {
  saving = false;
  task: Task;
  projects!: Project[];
  employees!: Employee[];
  url = 'http://localhost:4040/v1/api/tasks';

  @Output()
  savingFinished: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private modelService: NgbModal,
    private rest: RestApiService,
    private data: DataService
  ) {
    this.task = new Task();
  }

  ngOnInit() {
    this.rest
      .get('http://localhost:4040/v1/api/projects')
      .then((data) => {
        this.projects = (data as { data: Project[] }).data;
      })
      .catch((error) => {
        this.data.error(error['message']);
      });

    this.rest
      .get('http://localhost:4040/v1/api/accounts')
      .then((data) => {
        this.employees = (data as { employees: Employee[] }).employees;
      })
      .catch((error) => {
        this.data.error(error['message']);
      });
  }

  open(content: TemplateRef<any>) {
    this.modelService.open(content, { ariaDescribedBy: 'modal-basic-title' });
  }

  save() {
    this.saving = true;

    this.rest
      .post(this.url, this.task)
      .then((data) => {
        this.saving = false;
        this.savingFinished.emit('New task is saved!');
        this.modelService.dismissAll();
        this.task = new Task();
      })
      .catch((error) => {
        this.saving = false;
        this.data.error(error['message']);
      });
  }
}
