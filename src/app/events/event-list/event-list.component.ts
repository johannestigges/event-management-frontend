import {Component, OnInit} from '@angular/core';
import {Event} from 'src/app/model/event';
import {EventService} from '../event.service';

import {RouterLink} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faTrashCan} from '@fortawesome/free-regular-svg-icons';

@Component({
    selector: 'evm-event-list',
    templateUrl: './event-list.component.html',
    imports: [RouterLink, FontAwesomeModule]
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  protected readonly faTrashCan = faTrashCan;

  constructor(
    private readonly eventService: EventService
  ) {
  }

  ngOnInit() {
    this._loadEvents();
  }

  onDelete(event: Event) {
    this.eventService.remove(event.id).subscribe(() => this._loadEvents());
  }

  accept_count(event: Event) {
    return event.participants?.filter((p) => p.participate).length;
  }

  private _loadEvents() {
    this.eventService.getAll()
      .subscribe((events) => (this.events = events));
  }
}
