import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
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
    private modalService: NgbModal,
    private toasrt: ToastrService
  ) {
    this.data.getProfile();
  }

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
          this.toasrt.success((data as { message: string }).message, 'Success');
        })
        .catch((error) => {
          this.data.error(error['error'].message);
          this.toasrt.error(error['error'].message, 'Error!');
        });
    }
  }

  ngOnInit() {
    this.btnDisabled = true;
    this.rest
      .get(this.url)
      .then((data) => {
        const allTask = (data as { data: Task[] }).data;
        this.tasks =
          this.data.employee?.role === 'Leader'
            ? allTask
            : allTask.filter(
                (task) => task.assignedTo === this.data.employee?._id
              );
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
