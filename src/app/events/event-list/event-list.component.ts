import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/model/event';
import { EventService } from '../event.service';

@Component({
  selector: 'evm-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  constructor(private service: EventService) {}

  ngOnInit() {
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
