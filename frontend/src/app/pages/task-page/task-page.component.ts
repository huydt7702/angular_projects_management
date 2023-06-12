import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from 'src/app/models/task';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css'],
})
export class TaskPageComponent implements OnInit {
  tasks!: Task[];
  btnDisabled = false;
  url = 'http://localhost:4040/v1/api/tasks';
  deletedId!: string;
  confirmMessage = '';

  constructor(
    private rest: RestApiService,
    private data: DataService,
    private modalService: NgbModal
  ) {}

  confirmDeleteTask(confirmDialog: TemplateRef<any>, id: string, name: string) {
    this.confirmMessage = `Do you want to delete the task ${name}`;
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

  deleteTask() {
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
        this.tasks = (data as { data: Task[] }).data;
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
