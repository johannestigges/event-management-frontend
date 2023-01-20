import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { ParticipantsComponent } from './events/participants/participants.component';
import { ParticipateComponent } from './events/participants/participate/participate.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProtocolComponent } from './protocol/protocol/protocol.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserListComponent } from './users/user-list/user-list.component';

const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'users/detail', component: UserDetailComponent },
  { path: 'events', component: EventListComponent },
  { path: 'events/detail', component: EventDetailComponent },
  { path: 'participants', component: ParticipantsComponent },
  { path: 'participate', component: ParticipateComponent },
  { path: 'protocol', component: ProtocolComponent },
  { path: '', redirectTo: '/participants', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
