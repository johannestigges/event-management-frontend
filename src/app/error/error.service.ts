import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';

export interface ErrorData {
  hasError: boolean;
  message?: string;
  description?: string;
  details?: string;
  occured_at?: number;
}
export const NO_ERROR: ErrorData = { hasError: false };

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  errorChange = new BehaviorSubject<ErrorData>(NO_ERROR);

  constructor(private readonly router: Router) { }

  get error() {
    return this.errorChange.value;
  }

  clearError() {
    this.errorChange.next(NO_ERROR);
  }

  setError(
    message: string,
    description: string | undefined = undefined,
    details: string | undefined = undefined) {
    this.errorChange.next({ hasError: true, message, description, details });
  }

  throwError(message: string, error: any) {
    if (error.status === 401) {
      this.router.navigate(['/login']);
    }
    this.setError(message, error.message, JSON.stringify(error));
    return throwError(() => new Error(error.message));
  }
}
