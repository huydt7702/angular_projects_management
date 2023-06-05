import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';

  constructor(public data: DataService, private router: Router) {
    this.data.getProfile();
  }

  logout() {
    this.data.employee = null;
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
