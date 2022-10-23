import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Event } from 'src/app/model/event';
import { EventService } from '../event.service';

@Component({
  selector: 'evm-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent implements OnInit {
  event$!: Observable<Event>;

  constructor(private route: ActivatedRoute, private service: EventService) {}

  ngOnInit(): void {
    this.event$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getOne(Number(params.get('id')!))
      )
    );
  }
}
