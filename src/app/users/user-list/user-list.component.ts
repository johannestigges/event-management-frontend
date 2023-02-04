import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthenticationService, ROLE_ADMIN } from 'src/app/services/authentication.service';
import { UserService } from '../user.service';

@Component({
  selector: 'evm-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  userList: User[] = [];

  constructor(
    private readonly service: UserService,
    private readonly authenticationService: AuthenticationService) { }

  ngOnInit() {
      this._loadUsers();
  }

  onDelete(user: User) {
    this.service.remove(user.id).subscribe(() => this._loadUsers());
  }

  isAdmin() {
    return this.authenticationService.hasRole(ROLE_ADMIN);
  }

  private _loadUsers() {
    this.service.getAll().subscribe((userList) => (this.userList = userList));
  }
}
