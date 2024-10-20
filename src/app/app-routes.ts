import { Routes } from "@angular/router";
import { UserListComponent } from "./users/user-list/user-list.component";
import { UserDetailComponent } from "./users/user-detail/user-detail.component";
import { EventListComponent } from "./events/event-list/event-list.component";
import { EventDetailComponent } from "./events/event-detail/event-detail.component";
import { ParticipantsComponent } from "./events/participants/participants.component";
import { ParticipateComponent } from "./events/participants/participate/participate.component";
import { ProtocolComponent } from "./protocol/protocol/protocol.component";
import { LoginComponent } from "./login/login.component";
import { isAdminGuard, loggedInGuard } from "./guard/loggedin-guard";

export const LOGIN_ROUTE = '/anmelden';
export const ROUTE_AFTER_LOGIN = '/participants';
export const routes: Routes = [
    { path: 'users', component: UserListComponent, canActivate: [isAdminGuard] },
    { path: 'users/detail', component: UserDetailComponent, canActivate: [isAdminGuard] },
    { path: 'events', component: EventListComponent, canActivate: [isAdminGuard] },
    { path: 'events/detail', component: EventDetailComponent, canActivate: [isAdminGuard] },
    { path: 'participants', component: ParticipantsComponent, canActivate: [loggedInGuard] },
    { path: 'participate', component: ParticipateComponent, canActivate: [loggedInGuard] },
    { path: 'protocol', component: ProtocolComponent, canActivate: [isAdminGuard] },
    { path: 'anmelden', component: LoginComponent },
    { path: '**', redirectTo: LOGIN_ROUTE, pathMatch: 'full' },
];