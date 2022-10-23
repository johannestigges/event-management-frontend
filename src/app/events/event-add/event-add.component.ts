import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'evm-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.scss'],
})
export class EventAddComponent implements OnInit {
  constructor(
    private router: Router,
    private service: EventService,
    private fb: FormBuilder
  ) {}
  form = this.fb.group({
    name: ['', Validators.required],
    start: ['', Validators.required],
    end: ['', Validators.required],
  });

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.valid) {
      this.service
        .add({
          id: Math.random(),
          name: this._get('name').value,
          start: this._get('start').value,
          end: this._get('end').value,
        })
        .subscribe(() => this.router.navigate(['/events']));
    }
  }

  private _get(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }
}
