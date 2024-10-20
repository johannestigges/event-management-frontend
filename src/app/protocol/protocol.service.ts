import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Protocol } from '../model/protocol';
import { catchError } from 'rxjs';
import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: 'root',
})
export class ProtocolService {
  constructor(private http: HttpClient, private errorService: ErrorService
  ) { }

  getAll() {
    return this.http.get<Protocol[]>('/rest/protocol')
      .pipe(catchError((error) =>
        this.errorService.throwError("Fehler beim Lesen der Protokolldaten", error)));
  }
}
