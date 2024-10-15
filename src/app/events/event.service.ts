import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ErrorService } from '../error/error.service';
import { Event } from '../model/event';
import { Participant } from '../model/participant';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(
    private readonly http: HttpClient,
    private readonly errorService: ErrorService) { }

  getAll(): Observable<Event[]> {
    return this.http.get<Event[]>('/rest/events')
      .pipe(catchError((error) =>
        this.errorService.throwError("Fehler beim Lesen der Veranstaltungen", error)));
    ;
  }

  getOne(id: number) {
    return this.http.get<Event>(`/rest/events/${id}`)
      .pipe(catchError((error) =>
        this.errorService.throwError("`Fehler beim Lesen der Veranstaltung", error)));
  }

  getParticipants(id: number) {
    return this.http.get<User[]>(`/rest/events/${id}/participants`)
      .pipe(catchError((error) =>
        this.errorService.throwError("Fehler beim Lesen der Teilnehmer", error)));
  }

  updateParticipant(participant: Participant) {
    return this.http.put<Participant>(`/rest/events/participants/${participant.event_id}`, participant)
      .pipe(catchError((error) =>
        this.errorService.throwError("Fehler beim Aktualisieren eines Teilnehmers", error)));
  }

  add(event: Event) {
    return this.http.post<Event>('/rest/events', event)
      .pipe(catchError((error) =>
        this.errorService.throwError("Fehler beim Anlegen der Veranstaltung", error)));
  }

  update(event: Event) {
    return this.http.put<Event>(`/rest/events/${event.id}`, event)
      .pipe(catchError((error) =>
        this.errorService.throwError("Fehler beim Aktualisieren der Veranstaltung", error)));
  }

  remove(id: number) {
    return this.http.delete<Event>(`/rest/events/${id}`)
      .pipe(catchError((error) =>
        this.errorService.throwError("Fehler beim Entfernen der Veranstaltung", error)));
  }
}
