import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/model/event';
import { AuthenticationService, ROLE_ADMIN } from 'src/app/services/authentication.service';
import { EventService } from '../event.service';

@Component({
  selector: 'evm-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {
  events: Event[] = [];

  constructor(
    private readonly service: EventService,
    private readonly authenticationService: AuthenticationService) { }

  ngOnInit() {
      this._loadEvents();
  }

  onDelete(event: Event) {
    if (this.authenticationService.hasRole(ROLE_ADMIN)) {
      this.service.remove(event.id).subscribe(() => this._loadEvents());
    }
  }

  accept_count(event: Event) {
    return event.participants?.filter((p) => p.participate).length;
  }

  isAdmin() {
    return this.authenticationService.hasRole(ROLE_ADMIN);
  }

  private _loadEvents() {
    this.service.getAll().subscribe((events) => (this.events = events));
  }
}
