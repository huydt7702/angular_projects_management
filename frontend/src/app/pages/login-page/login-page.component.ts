import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  employee: Employee;
  btnDisabled = false;
  url = 'http://localhost:4040/v1/api/accounts/login';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.maxLength(5),
      Validators.required,
    ]),
  });

  constructor(
    private rest: RestApiService,
    private data: DataService,
    private router: Router,
    private toasrt: ToastrService
  ) {
    this.employee = new Employee();
  }

  validate() {
    return true;
  }

  async login() {
    this.btnDisabled = true;

    if (this.validate()) {
      const email = this.loginForm.controls.email.value;
      const password = this.loginForm.controls.password.value;
      const newEmployee = { email, password };

      this.rest
        .post(this.url, newEmployee)
        .then(async (data) => {
          let value = data as { employeeId: string; token: string };

          localStorage.setItem('token', value.token);
          this.toasrt.success('Logged in successfully', 'Success');
          await this.data.getProfile();
          this.router.navigate(['/']);
        })
        .catch((error) => {
          this.data.error(error['error'].message);
          this.toasrt.error('Login failed', 'Error!');
          this.btnDisabled = false;
        });
    }
  }
}
