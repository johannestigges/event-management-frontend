import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Protocol } from '../model/protocol';

@Injectable({
  providedIn: 'root',
})
export class ProtocolService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Protocol[]>('/rest/protocol');
  }
}
