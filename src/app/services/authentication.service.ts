import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { ErrorService } from '../error/error.service';

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

  private _user$ = new BehaviorSubject<LoggedInUser | null>(null);

  constructor(private http: HttpClient, private errorService: ErrorService) { }

  get user$() {
    return this._user$.asObservable();
  }

  get user(): LoggedInUser | null {
    return this._user$.value;
  }

  hasRole(role: string): boolean {
    return this.user?.roles?.includes(role) || false;
  }

  login(username: string, password: string) {
    const headers = new HttpHeaders({ 'content-type': 'application/x-www-form-urlencoded' });

    return this.http.post('/login', `username=${username}&password=${password}`,
      { headers: headers, responseType: 'text' })
      .pipe(
        tap(() =>
          this._getLoggedInUser().subscribe(user => this._user$.next(user))
        ));
  }

  logout() {
    this._user$.next(null);
    return this.http.get('/logout');
  }

  private _getLoggedInUser() {
    return this.http.get<LoggedInUser>('/rest/authentication/me');
  }
}
