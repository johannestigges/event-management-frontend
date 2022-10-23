import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Event } from '../model/event';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Event[]> {
    return this.http.get<Event[]>('/rest/events');
  }

  getOne(id: number) {
    return this.http.get<Event>(`/rest/events/${id}`);
  }

  getParticipants(id: number) {
    return this.http.get<User[]>(`/rest/events/${id}/participants`);
  }

  add(event: Event) {
    return this.http.post<Event>('/rest/events', event);
  }

  update(event: Event) {
    return this.http.put<Event>('/rest/events', event);
  }

  remove(id: number) {
    return this.http.delete<void>(`/rest/events/${id}`);
  }
}
