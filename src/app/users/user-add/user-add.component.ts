import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserType } from 'src/app/model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'evm-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent implements OnInit {
  constructor(
    private router: Router,
    private service: UserService,
    private fb: FormBuilder
  ) {}

  form = this.fb.group({
    vorname: ['', Validators.required],
    nachname: ['', Validators.required],
    typ: [''],
  });

  userTypes: string[] = Object.values(UserType).filter(
    (value) => typeof value === 'string'
  ) as string[];

  ngOnInit(): void {
    this._get('typ').setValue(this.userTypes[0]);
  }

  onSubmit() {
    if (this.form.valid) {
      this.service
        .add({
          id: Math.random(),
          vorname: this._get('vorname').value,
          nachname: this._get('nachname').value,
          typ: this._get('typ').value,
        })
        .subscribe(() => this.router.navigate(['/users']));
    }
  }

  private _get(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }
}
