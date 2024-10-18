import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthenticationService, ROLE_ADMIN } from 'src/app/services/authentication.service';
import { UserService } from '../user.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'evm-user-list',
  templateUrl: './user-list.component.html',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink]
})
export class UserListComponent implements OnInit {
  userList: User[] = [];

  constructor(
    private readonly userService: UserService,
    private readonly authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this._loadUsers();
  }

  onDelete(user: User) {
    this.userService.remove(user.id).subscribe(() => this._loadUsers());
  }

  isAdmin() {
    return this.authenticationService.hasRole(ROLE_ADMIN);
  }

  private _loadUsers() {
    this.userService.getAll().subscribe((userList) => (this.userList = userList));
  }
}
