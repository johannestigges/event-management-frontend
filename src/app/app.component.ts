import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService, LoggedInUser, ROLE_ADMIN } from './services/authentication.service';
import { NO_ERROR, ErrorService, ErrorData } from './error/error.service';
import { NgIf } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [NgIf, ErrorComponent, RouterOutlet, RouterLink]
})
export class AppComponent implements OnInit, OnDestroy {

  user: LoggedInUser | null = null;
  private _subscriptions$: Subscription[] = [];
  errorData: ErrorData = NO_ERROR;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly errorService: ErrorService) { }

  ngOnInit(): void {
    this._subscriptions$.push(this.authenticationService.user$
      .subscribe(user => this.user = user));
    this._subscriptions$.push(this.errorService.errorChange
      .subscribe(errorData => this.errorData = errorData));
  }

  ngOnDestroy(): void {
    this._subscriptions$.forEach(s => s.unsubscribe());
    this._subscriptions$ = [];
  }

  isAdmin() {
    return this.user?.roles?.includes(ROLE_ADMIN);
  }

  isLoggedInUser() {
    return this.user !== null;
  }
}
