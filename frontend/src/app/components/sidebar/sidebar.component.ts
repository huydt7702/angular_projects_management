import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(
    public data: DataService,
    private router: Router,
    private toasrt: ToastrService
  ) {
    this.data.getProfile();
  }

  logout() {
    this.data.employee = null;
    localStorage.clear();
    this.toasrt.success('Logout successfully', 'Success');
    this.router.navigate(['login']);
  }
}
