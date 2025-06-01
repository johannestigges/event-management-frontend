import {Component, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

import {LOGIN_ROUTE, ROUTE_AFTER_LOGIN} from '../app-routes';

@Component({
    selector: 'evm-login',
    templateUrl: './login.component.html',
    imports: [ReactiveFormsModule]
})
export class LoginComponent implements OnInit {

  errorMessage = '';
  form;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder
  ) {
    this.form = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const username: string | null = params.get('username');
      const pw: string | null = params.get('password');
      if (username && pw) {
        this.authenticationService.login(username, pw).subscribe(
          () => {
            console.log('login on init successful, navigate to', ROUTE_AFTER_LOGIN);
            this.router.navigateByUrl(ROUTE_AFTER_LOGIN);
          })
      }
      if (params.get('logout')) {
        this.authenticationService.logout().subscribe(
          () => {
            console.log('logout successful, navigate to', LOGIN_ROUTE);
            this.router.navigateByUrl(LOGIN_ROUTE);
          }
        );
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.errorMessage = '';
      this.authenticationService.login(this.form.controls.user.value!, this.form.controls.password.value!)
        .subscribe({
          next: () => {
            console.log('login successful, navigate to', ROUTE_AFTER_LOGIN);
            this.authenticationService.getLoggedInUser()
              .subscribe(() => this.router.navigateByUrl(ROUTE_AFTER_LOGIN));
          },
          error: (error) =>
            this.errorMessage = error.status === 401
              ? 'ungültige Anmeldedaten'
              : 'Fehler bei der Anmeldung'
        });
    }
  }
}
