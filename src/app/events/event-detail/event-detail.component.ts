import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Command } from 'src/app/model/command';
import { Participant } from 'src/app/model/participant';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/users/user.service';
import { EventService } from '../event.service';

@Component({
  selector: 'evm-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent implements OnInit {
  Command = Command;
  command = Command.SHOW;

  users: User[] = [];
  nicht_zugeordnete: User[] = [];
  participants: Participant[] = [];

  form = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    start: ['', Validators.required],
    end: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: EventService,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe((users) => {
      this.users = users;
      this.nicht_zugeordnete = users;
      this.activatedRoute.paramMap.subscribe((params) => {
        if (params.has('command')) {
          this.command = Command[params.get('command') as keyof typeof Command];
        }
        if (!this.isCommand(Command.ADD)) {
          this.service.getOne(Number(params.get('id'))).subscribe((event) => {
            this._get('id').setValue(event.id);
            this._get('name').setValue(event.name);
            this._get('start').setValue(event.start);
            this._get('end').setValue(event.end);
            this.setParticipants(event.participants);
          });
        }
        this.isCommand(Command.SHOW) || this.isCommand(Command.DELETE)
          ? this.form.disable()
          : this.form.enable();
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
          this.service
            .add({
              id: this._get('id').value,
              name: this._get('name').value,
              start: this._get('start').value,
              end: this._get('end').value,
              participants: this.participants,
            })
            .subscribe(() => this.router.navigate(['/events']));
        }
        break;
      case Command.MODIFY:
        if (this.form.valid) {
          this.service
            .update({
              id: this._get('id').value,
              name: this._get('name').value,
              start: this._get('start').value,
              end: this._get('end').value,
              participants: this.participants,
            })
            .subscribe(() => this.router.navigate(['/events']));
        }
        break;
      case Command.DELETE:
        this.service
          .remove(Number(this._get('id').value))
          .subscribe(() => this.router.navigate(['/events']));
        break;
      case Command.SHOW:
        this.router.navigate([
          '/events',
          'detail',
          { id: this._get('id').value, command: 'MODIFY' },
        ]);
        break;
    }
  }

  participate(participant: Participant) {
    const p = this.participants.find((p) => p.user_id === participant.user_id);
    if (p) {
      p.participate = !participant.participate;
    }
    console.log('participate', this.participants);
  }

  setParticipants(participants?: Participant[]) {
    if (participants) {
      this.participants = participants;
      this.nicht_zugeordnete = this.nicht_zugeordnete.filter(
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

  alleZuordnen() {
    this.nicht_zugeordnete.forEach((user) => this.zuordnen(user));
  }

  zuordnen(user: User) {
    console.log('zuordnen', user);
    this.participants.push({
      user_id: user.id,
      participate: false,
    });
    this.nicht_zugeordnete = this.nicht_zugeordnete.filter(
      (u) => u.id !== user.id
    );
  }

  removeParticipant(participant: Participant) {
    const user = this.users.find((u) => u.id === participant.user_id);
    if (user) {
      this.nicht_zugeordnete.push(user);
    }
    this.participants = this.participants.filter(
      (p) => p.user_id !== participant.user_id
    );
  }

  private _get(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }
}
