import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { ErrorService } from '../error/error.service';
import { Instrument, User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  getAll() {
    return this.http.get<User[]>('/rest/users')
    .pipe(catchError((error) => this.errorService.throwError("Fehler beim Lesen der Benutzer", error)));

  }

  getInstruments() {
    return this.http.get<Instrument[]>('/rest/users/instruments')
    .pipe(catchError((error) => this.errorService.throwError("Fehler beim Lesen der Instrumente", error)));
  }

  getOne(id: number) {
    return this.http.get<User>(`/rest/users/${id}`)
    .pipe(catchError((error) => this.errorService.throwError("Fehler beim Lesen des Benutzers", error)));
  }

  add(user: User) {
    return this.http.post<User>('/rest/users', user)
    .pipe(catchError((error) => this.errorService.throwError("Fehler beim Anlegen eines Benutzers", error)));
  }

  update(user: User) {
    return this.http.put<User>(`/rest/users/${user.id}`, user)
    .pipe(catchError((error) => this.errorService.throwError("Fehler beim Speichern des Benutzers", error)));
  }

  remove(id: number) {
    return this.http.delete<void>(`/rest/users/${id}`)
    .pipe(catchError((error) => this.errorService.throwError("Fehler beim Entfernen des Benutzers", error)));
  }
}
