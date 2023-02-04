import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

class UserData {
  gzugzugtdr?: string;
  hojpoijfrdrt?: string;
}

@Component({
  selector: 'evm-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  private readonly KEY = '698e4537677676dfc';

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
      const username:string|null = params.get('username');
      const pw: string|null = params.get('password');
      if (username && pw) {
        this.service.login(username, pw).subscribe({
          next: () => {
          this._writeUserData(username, pw);
            this.router.navigateByUrl('/participants');
            },
          error: () => localStorage.removeItem(this.KEY)
        });}
      if (params.get('logout')) {
        localStorage.removeItem(this.KEY);
        this.service.logout();
      }
      const userdata = this._readUserData();
      if (userdata?.gzugzugtdr && userdata?.hojpoijfrdrt) {
        this.service.login(userdata.gzugzugtdr, userdata.hojpoijfrdrt).subscribe({
          next: () => this.router.navigateByUrl('/participants'),
          error: () => localStorage.removeItem(this.KEY)
        });
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.login(this.form.controls.user.value!, this.form.controls.password.value!)
        .subscribe({
          next: () => {
            this._writeUserData();
            this.router.navigate(['/participants']);
          },
          error: (error) =>
            this.errorMessage = error.status === 401
              ? 'ungültige Anmeldedaten'
              : 'Fehler bei der Anmeldung'
        });
    }
  }

  private _writeUserData(username = this.form.controls.user.value, password = this.form.controls.password.value) {
    let userData: UserData = new UserData();
    userData.gzugzugtdr = username?.toString();
    userData.hojpoijfrdrt = password?.toString();
    localStorage.setItem(this.KEY, JSON.stringify(userData));
  }

  private _readUserData(): UserData | null {
    const savedLogin = localStorage.getItem(this.KEY);
    if (savedLogin) {
      const userData: UserData = JSON.parse(savedLogin);
      return userData;
    }
    return null;
  }
}
