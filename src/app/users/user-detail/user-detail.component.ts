import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/events/event.service';
import { Command } from 'src/app/model/command';
import { User } from 'src/app/model/user';
import { Event } from 'src/app/model/event';
import { Instrument, UserStatus, UserRole } from 'src/app/model/user';
import { AuthenticationService, ROLE_ADMIN } from 'src/app/services/authentication.service';
import { UserService } from '../user.service';
import { QrLoginComponent } from './qr-login/qr-login.component';

@Component({
  selector: 'evm-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  Command = Command;
  command = Command.SHOW;
  events: Event[] = [];
  instruments: Instrument[] = [];
  qrdata = '';

  form = this.fb.group({
    id: [''],
    version: [''],
    vorname: ['', Validators.required],
    nachname: ['', Validators.required],
    status: ['', Validators.required],
    instrument: [''],
    username: [''],
    role: ['']
  });

  userStatus: string[] = Object.values(UserStatus).filter(
    (value) => typeof value === 'string') as string[];
  userRoles: string[] = Object.values(UserRole).filter(
    (value) => typeof value === 'string') as string[];

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly service: UserService,
    private readonly eventService: EventService,
    private readonly authenticationService: AuthenticationService,
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit() {
    this.authenticationService.hasRole(ROLE_ADMIN)
      ? this._init()
      : this.router.navigate(['/login']);
  }

  private _init() {
    this.service.getInstruments().subscribe(instrument => this.instruments = instrument);
    this.activatedRoute.paramMap.subscribe((params) => {
      if (params.has('command')) {
        this.command = Command[params.get('command') as keyof typeof Command];
      }
      if (this.command === Command.ADD) {
        this._get('status').setValue(this.userStatus[0]);
      } else {
        this.service.getOne(Number(params.get('id'))).subscribe((user) => {
          this._get('id').setValue(user.id);
          this._get('version').setValue(user.version);
          this._get('vorname').setValue(user.vorname);
          this._get('nachname').setValue(user.nachname);
          this._get('status').setValue(user.status);
          this._get('instrument').setValue(user.instrument?.id);
          this._get('username').setValue(user.username);
          this._get('role').setValue(user.role);
          this._addEvents(Number(user.id));
        });
      }
      this.command === Command.SHOW || this.command === Command.DELETE
        ? this.form.disable()
        : this.form.enable();
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
            .add(this._toUser())
            .subscribe(() => this.router.navigate(['/users']));
        }
        break;
      case Command.MODIFY:
        if (this.form.valid) {
          this.service
            .update(this._toUser())
            .subscribe(() => this.router.navigate(['/users']));
        }
        break;
      case Command.DELETE:
        this.service
          .remove(Number(this._get('id').value))
          .subscribe(() => this.router.navigate(['/users']));
        break;
      case Command.SHOW:
        this.router.navigate([
          '/users',
          'detail',
          { id: this._get('id').value, command: 'MODIFY' },
        ]);
        break;
    }
  }

  onShowQrCode() {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.width = '300px';
    config.data = {
      username: this._get('username'),
      password: 'my generated password'
    };
    this.dialog.open(QrLoginComponent, config);
  }


  participate(event: Event) {
    const user_id = Number(this._get('id').value);
    return event.participants?.find((p) => p.user_id === user_id)?.participate;
  }

  private _addEvents(user_id: number) {
    this.eventService.getAll().subscribe((events) => {
      events
        .filter(
          (event) =>
            event.participants &&
            event.participants.filter((p) => p.user_id === user_id).length > 0
        )
        .forEach((event) => this.events.push(event));
    });
  }

  private _get(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  private _getInstrument() {
    const id = this._get('instrument').value;
    return this.instruments.find(i => i.id === +id);
  }

  private _toUser() {
    const user:User = {
      id: this._get('id').value,
      version: this._get('version').value,
      vorname: this._get('vorname').value,
      nachname: this._get('nachname').value,
      status: this._get('status').value,
      instrument: this._getInstrument(),
    };
    if (this._get('username').value) {
      user.username = this._get('username').value.toString();
    }
    if (this._get('role').value) {
      user.role = this._get('role').value.toString();
    }
    console.log('User ',user);
    return user;
  }
}
