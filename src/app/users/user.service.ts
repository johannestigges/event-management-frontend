import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User[]>('/rest/users');
  }

  getOne(id: number) {
    return this.http.get<User>(`/rest/users/${id}`);
  }

  add(user: User) {
    return this.http.post<User>('/rest/users', user);
  }

  update(user: User) {
    return this.http.put<User>(`/rest/users/${user.id}`, user);
  }

  remove(id: number) {
    return this.http.delete<void>(`/rest/users/${id}`);
  }
}
