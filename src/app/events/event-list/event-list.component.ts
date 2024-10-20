import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/model/event';
import { AuthenticationService, ROLE_ADMIN } from 'src/app/services/authentication.service';
import { EventService } from '../event.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSquarePlus, faTrashCan } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'evm-event-list',
  templateUrl: './event-list.component.html',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, FontAwesomeModule]
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  readonly faTrashCan = faTrashCan;

  constructor(
    private readonly eventService: EventService,
    private readonly authenticationService: AuthenticationService) { }

  ngOnInit() {
    this._loadEvents();
  }

  onDelete(event: Event) {
    if (this.authenticationService.hasRole(ROLE_ADMIN)) {
      this.eventService.remove(event.id).subscribe(() => this._loadEvents());
    }
  }

  accept_count(event: Event) {
    return event.participants?.filter((p) => p.participate).length;
  }

  isAdmin() {
    return this.authenticationService.hasRole(ROLE_ADMIN);
  }

  private _loadEvents() {
    this.eventService.getAll().subscribe((events) => (this.events = events));
  }
}
