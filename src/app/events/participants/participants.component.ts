import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/model/event';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/users/user.service';
import { EventService } from '../event.service';

@Component({
  selector: 'evm-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {
  events: Event[] = [];
  users: User[] = [];
  isAdmin = false;

  constructor(
    private eventService: EventService,
    private userService: UserService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.isAdmin().subscribe(a => this.isAdmin = a);
    this.eventService.getAll().subscribe(events => this.events = events);
    this.userService.getAll().subscribe(users => this.users = users);
  }

  participate(event: Event, user: User) {
    return event.participants?.find(p => p.user_id === user.id)?.participate ? "fa fa-check" : "fa fa-minus";
  }
}
