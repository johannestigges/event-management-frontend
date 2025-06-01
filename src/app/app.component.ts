import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthenticationService} from './services/authentication.service';
import {NO_ERROR, ErrorService, ErrorData} from './error/error.service';

import {ErrorComponent} from './error/error.component';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {LOGIN_ROUTE} from './app-routes';

@Component({
    selector: 'evm-root',
    templateUrl: './app.component.html',
    imports: [ErrorComponent, RouterOutlet, RouterLink]
})
export class AppComponent implements OnInit, OnDestroy {

  private _subscriptions$: Subscription[] = [];
  errorData: ErrorData = NO_ERROR;

  constructor(
    readonly authenticationService: AuthenticationService,
    private readonly router: Router,
    private readonly errorService: ErrorService) {
  }

  ngOnInit(): void {
    this._subscriptions$.push(this.authenticationService.getLoggedInUser()
      .subscribe(user => this.router.navigateByUrl(
        AuthenticationService.checkIsLoggedIn(user)
          ? 'participants' : LOGIN_ROUTE
      )));
    this._subscriptions$.push(this.errorService.errorChange
      .subscribe(errorData => this.errorData = errorData));
  }

  ngOnDestroy(): void {
    this._subscriptions$.forEach(s => s.unsubscribe());
    this._subscriptions$ = [];
  }
}
