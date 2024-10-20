import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService, ROLE_ADMIN } from "../services/authentication.service";
import { inject } from "@angular/core";

export const loggedInGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    return inject(AuthenticationService).user !== null;
}

export const isAdminGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    return inject(AuthenticationService).hasRole(ROLE_ADMIN);
}