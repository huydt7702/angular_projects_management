import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/models/project';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css'],
})
export class ProjectAddComponent implements OnInit {
  saving = false;
  project: Project;
  url = 'http://localhost:4040/v1/api/projects';

  @Output()
  savingFinished: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private modelService: NgbModal,
    private rest: RestApiService,
    private data: DataService,
    private toasrt: ToastrService
  ) {
    this.project = new Project();
  }

  ngOnInit() {}

  open(content: TemplateRef<any>) {
    this.data.message = '';
    this.modelService.open(content, { ariaDescribedBy: 'modal-basic-title' });
  }

  save() {
    this.saving = true;

    this.rest
      .post(this.url, this.project)
      .then((data) => {
        this.saving = false;
        this.savingFinished.emit('New project is saved!');
        this.toasrt.success('New project is saved!', 'Success');
        this.modelService.dismissAll();
        this.project = new Project();
      })
      .catch((error) => {
        this.saving = false;
        this.data.error(error['error']);
        this.toasrt.error(error['error'], 'Error!');
      });
  }
}
