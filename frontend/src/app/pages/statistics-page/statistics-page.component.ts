import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/models/project';
import { Task } from 'src/app/models/task';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.css'],
})
export class StatisticsPageComponent implements OnInit {
  projects!: Project[];
  tasks!: Task[];
  projectId!: string;
  project: Project;
  totalCostOfAllProjects: number = 0;
  employeeCount!: number;
  tasksInProgress!: number;
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
        this.totalCostOfAllProjects = this.projects.reduce(
          (total, currProject) => total + currProject.budget,
          0
        );
      })
      .catch((error) => {
        this.data.error(error['message']);
        this.toasrt.error(error['message'], 'Error!');
      });

    this.rest
      .get('http://localhost:4040/v1/api/accounts/get/count')
      .then((data) => {
        this.employeeCount = (data as { employeeCount: number }).employeeCount;
      })
      .catch((error) => {
        this.data.error(error['message']);
        this.toasrt.error(error['message'], 'Error!');
      });

    this.rest
      .get('http://localhost:4040/v1/api/tasks')
      .then((data) => {
        const tasks = (data as { data: Task[] }).data;
        const listTasksInProgress = tasks.filter(
          (task) => task.status === 'Developing'
        );
        this.tasksInProgress = listTasksInProgress.length;
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
