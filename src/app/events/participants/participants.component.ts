import { Component, OnInit } from '@angular/core';
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { Event } from 'src/app/model/event';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/users/user.service';
import { EventService } from '../event.service';
import { NgFor, NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'evm-participants',
  templateUrl: './participants.component.html',
  standalone: true,
  imports: [NgIf, NgFor, FontAwesomeModule, RouterLink]
})
export class ParticipantsComponent implements OnInit {
  readonly faCheckCircle = faCheckCircle;
  readonly faXmarkCircle = faXmarkCircle;

  events: Event[] = [];
  users: User[] = [];

  constructor(
    private readonly eventService: EventService,
    private readonly userService: UserService) { }

  ngOnInit() {
    this.eventService.getAll().subscribe(events => {
      this.events = events;
      this.userService.getAll()
        .subscribe(users => this.users = users.filter(u => this._isParticipant(u)));
    });
  }

  participate(event: Event, user: User) {
    return event.participants?.find(p => p.user_id === user.id)?.participate;
  }

  private _isParticipant(user: User): boolean {
    return this.events
      .find(e => e.participants?.find(p => p.user_id === user.id)) !== undefined;
  }
}
