import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router, RouterLink} from '@angular/router';
import {EventService} from 'src/app/events/event.service';
import {Command} from 'src/app/model/command';
import {Event} from 'src/app/model/event';
import {Instrument, UserStatus} from 'src/app/model/user';
import {UserService} from '../user.service';


@Component({
    selector: 'evm-user-detail',
    templateUrl: './user-detail.component.html',
    imports: [RouterLink, FormsModule, ReactiveFormsModule]
})
export class UserDetailComponent implements OnInit {
  Command = Command;
  command = Command.SHOW;
  events: Event[] = [];
  instruments: Instrument[] = [];
  form;
  userStatus: string[] = Object.values(UserStatus).filter(
    (value) => typeof value === 'string'
  ) as string[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private eventService: EventService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      id: [''],
      version: [''],
      vorname: ['', Validators.required],
      nachname: ['', Validators.required],
      status: ['', Validators.required],
      instrument: ['']
    });
  }

  ngOnInit() {
    this._initInstruments();
    this._initFromParams();
  }

  private _initFromParams() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this._setCommand(params);
      if (this.command === Command.ADD) {
        this._get('status').setValue(this.userStatus[0]);
      } else {
        this._readUser(params.get('id') as string);
      }
      this._enableOrDisableForm();
    });
  }

  private _setCommand(params: ParamMap) {
    if (params.has('command')) {
      this.command = Command[params.get('command') as keyof typeof Command];
    }
  }

  private _initInstruments() {
    this.userService.getInstruments()
      .subscribe(instruments => this.instruments = instruments);
  }

  private _enableOrDisableForm() {
    if (this.command === Command.SHOW || this.command === Command.DELETE) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  private _readUser(id: string) {
    this.userService.getOne(Number(id)).subscribe((user) => {
      this._get('id').setValue(user.id);
      this._get('version').setValue(user.version);
      this._get('vorname').setValue(user.vorname);
      this._get('nachname').setValue(user.nachname);
      this._get('status').setValue(user.status);
      this._get('instrument').setValue(user.instrument?.id);
      this._addEvents(Number(user.id));
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
          this.userService
            .add(this._toUser())
            .subscribe(() => this.router.navigate(['/users']));
        }
        break;
      case Command.MODIFY:
        if (this.form.valid) {
          this.userService
            .update(this._toUser())
            .subscribe(() => this.router.navigate(['/users']));
        }
        break;
      case Command.DELETE:
        this.userService
          .remove(Number(this._get('id').value))
          .subscribe(() => this.router.navigate(['/users']));
        break;
      case Command.SHOW:
        this.router.navigate([
          '/users',
          'detail',
          {id: this._get('id').value, command: 'MODIFY'},
        ]);
        break;
    }
  }

  participate(event: Event) {
    const user_id = Number(this._get('id').value);
    return event.participants?.find((p) => p.user_id === user_id)?.participate;
  }

  private _addEvents(user_id: number) {
    this.eventService.getAll().subscribe((events) =>
      events
        .filter(
          (event) =>
            event.participants &&
            event.participants.filter((p) => p.user_id === user_id).length > 0
        )
        .forEach((event) => this.events.push(event)));
  }

  private _get(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  private _getInstrument() {
    const id = this._get('instrument').value;
    return this.instruments.find(i => i.id === +id);
  }

  private _toUser() {
    return {
      id: this._get('id').value,
      version: this._get('version').value,
      vorname: this._get('vorname').value,
      nachname: this._get('nachname').value,
      status: this._get('status').value,
      instrument: this._getInstrument()
    }
  }
}
