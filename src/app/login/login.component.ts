import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'evm-login',
  templateUrl: './login.component.html'
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
          () => this.router.navigateByUrl('/participants'))
      }
      if (params.get('logout')) {
        this.service.logout();
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.login(this.form.controls.user.value!, this.form.controls.password.value!)
        .subscribe({
          next: () => this.router.navigate(['/participants']),
          error: (error) =>
            this.errorMessage = error.status === 401
              ? 'ungültige Anmeldedaten'
              : 'Fehler bei der Anmeldung'
        });
    }
  }
}
