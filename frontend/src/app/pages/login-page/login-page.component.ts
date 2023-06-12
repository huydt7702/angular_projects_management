import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  employee: Employee;
  btnDisabled = false;
  url = 'http://localhost:4040/v1/api/accounts/login';

  constructor(
    private rest: RestApiService,
    private data: DataService,
    private router: Router
  ) {
    this.employee = new Employee();
  }

  validate() {
    return true;
  }

  async login() {
    this.btnDisabled = true;

    if (this.validate()) {
      this.rest
        .post(this.url, this.employee)
        .then(async (data) => {
          let value = data as { employeeId: string; token: string };

          localStorage.setItem('token', value.token);
          await this.data.getProfile();
          this.router.navigate(['/']);
        })
        .catch((error) => {
          this.data.error(error['error']);
          this.btnDisabled = false;
        });
    }
  }
}
