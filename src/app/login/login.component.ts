import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { NgIf } from '@angular/common';
import { ROUTE_AFTER_LOGIN } from '../app-routes';

@Component({
  selector: 'evm-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule]
})
export class LoginComponent implements OnInit {

  errorMessage = '';

  form = this.fb.group({
    user: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private readonly service: AuthenticationService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const username: string | null = params.get('username');
      const pw: string | null = params.get('password');
      if (username && pw) {
        this.service.login(username, pw).subscribe(
          () => this.router.navigateByUrl(ROUTE_AFTER_LOGIN))
      }
      if (params.get('logout')) {
        this.service.logout();
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.errorMessage = '';
      this.service.login(this.form.controls.user.value!, this.form.controls.password.value!)
        .subscribe({
          next: () => {
            this.router.navigateByUrl(ROUTE_AFTER_LOGIN);
          },
          error: (error) =>
            this.errorMessage = error.status === 401
              ? 'ungültige Anmeldedaten'
              : 'Fehler bei der Anmeldung'
        });
    }
  }
}
