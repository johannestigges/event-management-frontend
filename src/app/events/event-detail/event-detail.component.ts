import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Command} from 'src/app/model/command';
import {Participant} from 'src/app/model/participant';
import {User} from 'src/app/model/user';
import {UserService} from 'src/app/users/user.service';
import {EventService} from '../event.service';
import {NgFor, NgIf} from '@angular/common';

@Component({
    selector: 'evm-event-detail',
    templateUrl: './event-detail.component.html',
    imports: [NgIf, NgFor, RouterLink, ReactiveFormsModule]
})
export class EventDetailComponent implements OnInit {
  Command = Command;

  command = Command.SHOW;
  users: User[] = [];
  unassigned_users: User[] = [];
  participants: Participant[] = [];

  form;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly eventService: EventService,
    private readonly userService: UserService
  ) {
    this.form = this.fb.group({
      id: [''],
      version: [''],
      name: ['', Validators.required],
      startAt: ['', Validators.required],
      endAt: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this._loadUser();
  }

  private _loadUser() {
    this.userService.getAll().subscribe((users) => {
      this.users = users;
      this.unassigned_users = users;
      this.activatedRoute.paramMap.subscribe((params) => {
        if (params.has('command')) {
          this.command = Command[params.get('command') as keyof typeof Command];
        }
        if (!this.isCommand(Command.ADD)) {
          this.eventService.getOne(Number(params.get('id'))).subscribe((event) => {
            this._get('id').setValue(event.id);
            this._get('version').setValue(event.version);
            this._get('name').setValue(event.name);
            this._get('startAt').setValue(event.startAt);
            this._get('endAt').setValue(event.endAt);
            this.setParticipants(event.participants);
          });
        }
        if (this.isCommand(Command.SHOW) || this.isCommand(Command.DELETE)) {
          this.form.disable();
        } else {
          this.form.enable();
        }
      });
    });
  }

  submitButtonText() {
    switch (this.command) {
      case Command.ADD:
        return 'Anlegen';
      case Command.MODIFY:
        return 'Speichern';
      case Command.DELETE:
        return 'Löschen';
      case Command.SHOW:
        return 'Ändern';
    }
  }

  titleText() {
    switch (this.command) {
      case Command.ADD:
        return 'anlegen';
      case Command.MODIFY:
        return 'ändern';
      case Command.DELETE:
        return 'löschen';
      case Command.SHOW:
        return 'anzeigen';
    }
  }

  onSubmit() {
    switch (this.command) {
      case Command.ADD:
        if (this.form.valid) {
          this.eventService.add({
            id: this._get('id').value,
            version: this._get('version').value,
            name: this._get('name').value,
            startAt: this._get('startAt').value,
            endAt: this._get('endAt').value,
            participants: this.participants,
          }).subscribe(() => this.router.navigate(['/events']));
        }
        break;
      case Command.MODIFY:
        if (this.form.valid) {
          this.eventService.update({
            id: this._get('id').value,
            version: this._get('version').value,
            name: this._get('name').value,
            startAt: this._get('startAt').value,
            endAt: this._get('endAt').value,
            participants: this.participants,
          }).subscribe(() => this.router.navigate(['/events']));
        }
        break;
      case Command.DELETE:
        this.eventService
          .remove(Number(this._get('id').value))
          .subscribe(() => this.router.navigate(['/events']));
        break;
      case Command.SHOW:
        this.router.navigate([
          '/events',
          'detail',
          {id: this._get('id').value, command: 'MODIFY'},
        ]);
        break;
    }
  }

  participate(participant: Participant) {
    const pa = this.participants.find((p) => p.user_id === participant.user_id);
    if (pa) {
      pa.participate = !participant.participate;
    }
  }

  setParticipants(participants?: Participant[]) {
    if (participants) {
      this.participants = participants;
      this.unassigned_users = this.unassigned_users.filter(
        (p) => !participants.find((p2) => p2.user_id === p.id)
      );
    }
  }

  isCommand(command: Command) {
    return this.command === command;
  }

  userName(id: number) {
    const user = this.users.find((u) => u.id === id);

    return user
      ? `${user?.vorname} ${user?.nachname}`
      : `unbekannter Name ${id}`;
  }

  assignAll() {
    this.unassigned_users.forEach((user) => this.assign(user));
  }

  assign(user: User) {
    this.participants.push({
      event_id: this._get('id').value,
      user_id: user.id,
      participate: false,
    });
    this.unassigned_users = this.unassigned_users
      .filter((u) => u.id !== user.id);
  }

  removeParticipant(participant: Participant) {
    const user = this.users.find((u) => u.id === participant.user_id);
    if (user) {
      this.unassigned_users.push(user);
    }
    this.participants = this.participants
      .filter((p) => p.user_id !== participant.user_id);
  }

  private _get(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }
}
