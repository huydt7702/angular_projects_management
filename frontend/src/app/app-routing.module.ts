import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { HomeComponent } from './components/home/home.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'employee-add', component: EmployeeAddComponent },
  { path: '', component: HomeComponent },
  { path: 'employee-list', component: EmployeeListComponent },
  { path: 'employee-edit/:id', component: EmployeeEditComponent },
  { path: 'project-list', component: ProjectListComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
