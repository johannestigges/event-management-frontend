import {CanActivateFn} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {inject} from "@angular/core";

export const loggedInGuard: CanActivateFn = () => {
  console.log('loggedInGuard', inject(AuthenticationService).isLoggedIn());
  return inject(AuthenticationService).isLoggedIn()
}

export const isAdminGuard: CanActivateFn = () => {
  console.log('isAdminGuard', inject(AuthenticationService).isAdmin());
  return inject(AuthenticationService).isAdmin();
}
