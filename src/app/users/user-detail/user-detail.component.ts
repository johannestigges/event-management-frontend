import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Command } from 'src/app/model/command';
import { UserType } from 'src/app/model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'evm-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  Command = Command;
  command = Command.SHOW;

  form = this.fb.group({
    id: [''],
    vorname: ['', Validators.required],
    nachname: ['', Validators.required],
    typ: ['', Validators.required],
  });

  userTypes: string[] = Object.values(UserType).filter(
    (value) => typeof value === 'string'
  ) as string[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      if (params.has('command')) {
        this.command = Command[params.get('command') as keyof typeof Command];
      }
      if (this.isCommand(Command.ADD)) {
        this._get('id').setValue(Math.random());
        this._get('typ').setValue(this.userTypes[0]);
      } else {
        this.service.getOne(Number(params.get('id'))).subscribe((user) => {
          this._get('id').setValue(user.id);
          this._get('vorname').setValue(user.vorname);
          this._get('nachname').setValue(user.nachname);
          this._get('typ').setValue(user.typ);
        });
      }
      this.isCommand(Command.SHOW) || this.isCommand(Command.DELETE)
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
            .add({
              id: this._get('id').value,
              vorname: this._get('vorname').value,
              nachname: this._get('nachname').value,
              typ: this._get('typ').value,
            })
            .subscribe(() => this.router.navigate(['/users']));
        }
        break;
      case Command.MODIFY:
        if (this.form.valid) {
          this.service
            .update({
              id: this._get('id').value,
              vorname: this._get('vorname').value,
              nachname: this._get('nachname').value,
              typ: this._get('typ').value,
            })
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

  isCommand(command: Command) {
    return this.command === command;
  }

  private _get(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }
}
