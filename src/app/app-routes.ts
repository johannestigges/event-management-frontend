import { Routes } from "@angular/router";
import { UserListComponent } from "./users/user-list/user-list.component";
import { UserDetailComponent } from "./users/user-detail/user-detail.component";
import { EventListComponent } from "./events/event-list/event-list.component";
import { EventDetailComponent } from "./events/event-detail/event-detail.component";
import { ParticipantsComponent } from "./events/participants/participants.component";
import { ParticipateComponent } from "./events/participants/participate/participate.component";
import { ProtocolComponent } from "./protocol/protocol/protocol.component";
import { LoginComponent } from "./login/login.component";

export const routes: Routes = [
    { path: 'users', component: UserListComponent },
    { path: 'users/detail', component: UserDetailComponent },
    { path: 'events', component: EventListComponent },
    { path: 'events/detail', component: EventDetailComponent },
    { path: 'participants', component: ParticipantsComponent },
    { path: 'participate', component: ParticipateComponent },
    { path: 'protocol', component: ProtocolComponent },
    { path: 'anmelden', component: LoginComponent },
    { path: '', redirectTo: '/participants', pathMatch: 'full' },
    { path: '**', redirectTo: '/login', pathMatch: 'full' },
];