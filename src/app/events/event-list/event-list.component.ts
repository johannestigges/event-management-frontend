import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/model/event';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { EventService } from '../event.service';

@Component({
  selector: 'evm-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  isAdmin=false;

  constructor(
    private service: EventService, 
    private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.authenticationService.isAdmin().subscribe(a => this.isAdmin = a);
    this._loadEvents();
  }

  onDelete(event: Event) {
    this.service.remove(event.id).subscribe(() => this._loadEvents());
  }

  zusagen(event: Event) {
    return event.participants?.filter((p) => p.participate).length;
  }

  private _loadEvents() {
    this.service.getAll().subscribe((events) => (this.events = events));
  }
}
