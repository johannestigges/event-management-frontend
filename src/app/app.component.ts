import { Component, OnInit } from '@angular/core';
import { ErrorService } from './error/error.service';
import { AuthenticationService } from './services/authentication.service';
import { ErrorData } from './error/error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  isAdmin=false;
  errorData: ErrorData = {hasError:false};

  constructor(private readonly authenticationService: AuthenticationService, private readonly errorService: ErrorService) { }

  ngOnInit(): void {
    this.authenticationService.isAdmin().subscribe(a => this.isAdmin = a);
    this.errorService.errorChange.subscribe(errorData => this.errorData = errorData);
  }
}
