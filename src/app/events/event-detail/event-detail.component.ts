import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Command } from 'src/app/model/command';
import { EventService } from '../event.service';

@Component({
  selector: 'evm-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent implements OnInit {
  Command = Command;
  command = Command.SHOW;

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
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      if (params.has('command')) {
        this.command = Command[params.get('command') as keyof typeof Command];
      }
      if (this.isCommand(Command.ADD)) {
        this._get('id').setValue(Math.floor(Math.random() * 10000));
      } else {
        this.service.getOne(Number(params.get('id'))).subscribe((event) => {
          this._get('id').setValue(event.id);
          this._get('name').setValue(event.name);
          this._get('start').setValue(event.start);
          this._get('end').setValue(event.end);
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
              name: this._get('name').value,
              start: this._get('start').value,
              end: this._get('end').value,
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

  isCommand(command: Command) {
    return this.command === command;
  }

  private _get(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }
}
