import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css'],
})
export class EmployeeEditComponent implements OnInit {
  employee!: Employee;
  btnDisabled = false;
  url = 'http://localhost:4040/v1/api/accounts';
  id: string;

  constructor(
    private rest: RestApiService,
    private data: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = route.snapshot.params['id'];
  }

  ngOnInit() {
    this.btnDisabled = true;
    this.rest
      .getOne(this.url, this.id)
      .then((data) => {
        this.employee = (data as { employee: Employee }).employee;
        this.btnDisabled = false;
      })
      .catch((error) => {
        this.data.error(error['message']);
        this.btnDisabled = false;
      });
  }

  validate() {
    return true;
  }

  update() {
    this.btnDisabled = true;

    if (this.validate()) {
      this.rest
        .put(this.url, this.id, this.employee)
        .then((data) => {
          this.data.success('Employee is updated');
          this.btnDisabled = false;
          this.router.navigate(['/employee-list']);
        })
        .catch((error) => {
          this.data.error(error['message']);
          this.btnDisabled = false;
        });
    }
  }
}
