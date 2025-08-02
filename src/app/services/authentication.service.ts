import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable, signal} from '@angular/core';
import {ErrorService} from '../error/error.service';
import {catchError, of, tap, throwError} from 'rxjs';

export const ROLE_ADMIN = 'ROLE_ADMIN';
export const ROLE_USER = 'ROLE_USER';
export const ROLE_GUEST = 'ROLE_GUEST';

export interface LoggedInUser {
  name?: string;
  roles?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient, private errorService: ErrorService) {
  }

  user = signal<LoggedInUser | null>(null);
  isLoggedIn = signal(false);
  isAdmin = signal(false);

  static hasRole(user: LoggedInUser, role: string): boolean {
    return user?.roles?.includes(role) || false;
  }

  login(username: string, password: string) {
    const headers = new HttpHeaders({'content-type': 'application/x-www-form-urlencoded'});

    return this.http.post('/rest/login', `username=${username}&password=${password}`,
      {headers: headers, responseType: 'text'})
      .pipe(
        tap(user => {
          this.isLoggedIn.set(user !== null);
          //  this.isAdmin.set(this.isLoggedIn() && AuthenticationService.hasRole(user, ROLE_ADMIN));
        }),
        catchError((error) => {
          console.log(error);
          if (error.status === 401) {
            return throwError(() => '401');
          } else {
            return this.errorService.throwError("Fehler beim Anmelden", error);
          }
        })
      );
  }

  logout() {
    return this.http.post('/rest/logout', '')
      .pipe(tap(() => {
          console.log('logout');
          this.user.set(null);
          this.isLoggedIn.set(false);
          this.isAdmin.set(false);
        }),
        catchError((error) => this.errorService.throwError("Fehler beim Abmelden", error))
      );
  }

  getLoggedInUser() {
    return this.http.get<LoggedInUser>('/rest/authentication/me')
      .pipe(tap(user => {
          this.isLoggedIn.set(AuthenticationService.checkIsLoggedIn(user));
          this.isAdmin.set(this.isLoggedIn() && AuthenticationService.hasRole(user, ROLE_ADMIN))
        }),
        catchError((error) => this.errorService.throwError("Fehler beim Lesen der Anmeldedaten", error))
      );
  }

  static checkIsLoggedIn(user: LoggedInUser) {
    return user?.name !== null && user.name !== '';
  }
}
