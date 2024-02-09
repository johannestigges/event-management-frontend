import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProtocolComponent } from './protocol/protocol/protocol.component';
import { ParticipantsComponent } from './events/participants/participants.component';
import { ErrorComponent } from './error/error.component';
import { ParticipateComponent } from './events/participants/participate/participate.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailComponent,
    EventListComponent,
    EventDetailComponent,
    ProtocolComponent,
    ParticipantsComponent,
    ErrorComponent,
    ParticipateComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
