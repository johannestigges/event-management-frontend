import {Component, OnInit} from '@angular/core';
import {User} from 'src/app/model/user';
import {UserService} from '../user.service';

import {RouterLink} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faTrashCan} from '@fortawesome/free-regular-svg-icons';

@Component({
    selector: 'evm-user-list',
    templateUrl: './user-list.component.html',
    imports: [RouterLink, FontAwesomeModule]
})
export class UserListComponent implements OnInit {
  userList: User[] = [];
  readonly faTrashCan = faTrashCan;

  constructor(
    private readonly userService: UserService) {
  }

  ngOnInit() {
    this._loadUsers();
  }

  onDelete(user: User) {
    this.userService
      .remove(user.id)
      .subscribe(() => this._loadUsers());
  }

  private _loadUsers() {
    this.userService.getAll()
      .subscribe((userList) => (this.userList = userList));
  }
}
