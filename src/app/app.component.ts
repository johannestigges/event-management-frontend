import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  isAdmin=false;

  constructor(private readonly authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.isAdmin().subscribe(a => this.isAdmin = a);
  }
  
  title = 'event-management';
}
