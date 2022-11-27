import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  getLoggedInUser() {
    return this.http.get<LoggedInUser>('/rest/authentication/me');
  }

  hasRole(role: string) {
    return this.getLoggedInUser().pipe(
      tap(u => console.log(u)),
      map(u => u.roles?.includes(role) || false));
  }

  isAdmin() {
    return this.hasRole("ROLE_ADMIN");
  }
  
  isUser() {
    return this.hasRole("ROLE_USER");
  }
}

export interface LoggedInUser {
  name?: string;
  roles?: string[];
}