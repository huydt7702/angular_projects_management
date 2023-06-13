import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/models/project';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css'],
})
export class ProjectPageComponent implements OnInit {
  projects!: Project[];
  btnDisabled = false;
  url = 'http://localhost:4040/v1/api/projects';
  deletedId!: string;
  confirmMessage = '';

  constructor(
    private rest: RestApiService,
    private data: DataService,
    private modalService: NgbModal,
    private toasrt: ToastrService
  ) {}

  confirmDeleteProject(
    confirmDialog: TemplateRef<any>,
    id: string,
    name: string
  ) {
    this.confirmMessage = `Do you want to delete the project ${name}`;
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

  deleteProject() {
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
          this.toasrt.error(error['error'], 'Error!');
        });
    }
  }

  ngOnInit() {
    this.btnDisabled = true;
    this.rest
      .get(this.url)
      .then((data) => {
        this.projects = (data as { data: Project[] }).data;
        this.btnDisabled = false;
      })
      .catch((error) => {
        this.data.error(error['message']);
        this.toasrt.error(error['message'], 'Error!');
        this.btnDisabled = false;
      });
  }

  finishAndAlert(message: string) {
    this.data.success(message);

    this.ngOnInit();
  }
}
