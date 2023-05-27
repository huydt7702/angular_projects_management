import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessageComponent } from './components/message/message.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { RestApiService } from './services/rest-api.service';
import { DataService } from './services/data.service';
import { HomeComponent } from './components/home/home.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    EmployeeAddComponent,
    HomeComponent,
    EmployeeListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [RestApiService, DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
