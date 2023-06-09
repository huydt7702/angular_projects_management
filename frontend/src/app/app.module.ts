import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessageComponent } from './components/message/message.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { RestApiService } from './services/rest-api.service';
import { DataService } from './services/data.service';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { ProjectAddComponent } from './components/project-add/project-add.component';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthenticationLayoutComponent } from './layouts/authentication-layout/authentication-layout.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { EmployeePageComponent } from './pages/employee-page/employee-page.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { TaskPageComponent } from './pages/task-page/task-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TaskAddComponent } from './components/task-add/task-add.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { StatisticsPageComponent } from './pages/statistics-page/statistics-page.component';
import { ToastrModule } from 'ngx-toastr';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    EmployeeAddComponent,
    EmployeeEditComponent,
    ProjectAddComponent,
    ProjectEditComponent,
    SidebarComponent,
    AuthenticationLayoutComponent,
    DefaultLayoutComponent,
    LoginPageComponent,
    EmployeePageComponent,
    ProjectPageComponent,
    TaskPageComponent,
    HomePageComponent,
    TaskAddComponent,
    TaskEditComponent,
    ProfilePageComponent,
    StatisticsPageComponent,
    ErrorPageComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [RestApiService, DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
