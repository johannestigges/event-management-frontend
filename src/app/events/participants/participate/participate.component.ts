import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/model/event';
import { Participant } from 'src/app/model/participant';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/users/user.service';
import { EventService } from '../../event.service';
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'evm-participate',
  templateUrl: './participate.component.html'
})
export class ParticipateComponent implements OnInit {
  readonly faCheckCircle = faCheckCircle;
  readonly faXmarkCircle = faXmarkCircle;

  user?: User;
  events: Event[] = [];
  participants: Participant[] = [];

  constructor(
    private readonly eventService: EventService,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.userService.getOne(Number(params.get('id'))).subscribe((user) => {
        this.user = user;
        this.eventService.getAll().subscribe(events => this.events = events);
      });
    });
  }

  onClick(event: Event, participate: boolean) {
    this.eventService.updateParticipant({
      user_id: this.user!.id,
      event_id: event.id,
      participate: participate
    }).subscribe(() => {
      if (participate) {
        alert("Vielen Dank für's Mitmachen!");
      } else {
        alert("Schade! Vielleicht beim nächsten Mal");
      }
      this.events = this.events.filter(e => e.id !== event.id);
      if (this.events.length === 0) {
        this.router.navigate(['/participants']);
      }
    });
  }
}
