import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/models/project';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.css'],
})
export class StatisticsPageComponent implements OnInit {
  projects!: Project[];
  projectId!: string;
  project: Project;
  url = 'http://localhost:4040/v1/api/projects';

  constructor(
    private rest: RestApiService,
    private data: DataService,
    private toasrt: ToastrService
  ) {
    this.project = new Project();
  }

  ngOnInit() {
    this.rest
      .get(this.url)
      .then((data) => {
        this.projects = (data as { data: Project[] }).data;
      })
      .catch((error) => {
        this.data.error(error['message']);
        this.toasrt.error(error['message'], 'Error!');
      });
  }

  handleChangeProject() {
    this.rest
      .getOne(this.url, this.projectId)
      .then((data) => {
        this.project = (data as { data: Project }).data;
      })
      .catch((error) => {
        this.data.error(error['message']);
        this.toasrt.error(error['message'], 'Error!');
      });
  }
}
