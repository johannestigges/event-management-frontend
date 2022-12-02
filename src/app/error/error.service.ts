import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';

export interface ErrorData {
  hasError: boolean;
  message?: string;
  description?: string;
  details?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  errorChange = new BehaviorSubject<ErrorData>({hasError:false});

  get error() {
    return this.errorChange.value;
  }
  constructor() { }

  clearError() {
    this.errorChange.next({hasError:false});
  }
  setError(message:string, description:string|undefined = undefined,details:string|undefined = undefined) {
    this.errorChange.next({hasError:true, message, description, details});
  }

  throwError(message: string, error:any) {
    this.setError(message, error.message, );
    return throwError(() => new Error(error.message));
  }
}
