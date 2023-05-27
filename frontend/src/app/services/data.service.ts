import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { NavigationStart, Router } from '@angular/router';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  message = '';
  messageType = 'danger';

  employee!: Employee;

  constructor(private router: Router, private rest: RestApiService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.message = '';
      }
    });
  }

  error(message: string) {
    this.messageType = 'danger';
    this.message = message;
  }

  success(message: string) {
    this.messageType = 'success';
    this.message = message;
  }

  warning(message: string) {
    this.messageType = 'warning';
    this.message = message;
  }
}
