import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { AuthenticationLayoutComponent } from './layouts/authentication-layout/authentication-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { EmployeePageComponent } from './pages/employee-page/employee-page.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { TaskPageComponent } from './pages/task-page/task-page.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'employee-list', component: EmployeePageComponent },
      { path: 'employee-add', component: EmployeeAddComponent },
      { path: 'employee-edit/:id', component: EmployeeEditComponent },
      { path: 'project-list', component: ProjectPageComponent },
      { path: 'task-list', component: TaskPageComponent },
    ],
  },
  {
    path: 'login',
    component: AuthenticationLayoutComponent,
    children: [
      {
        path: '',
        component: LoginPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
