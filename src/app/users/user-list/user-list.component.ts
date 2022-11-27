import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from '../user.service';

@Component({
  selector: 'evm-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  isAdmin=false;
  userList: User[] = [];
  constructor(
    private service: UserService, 
    private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this._loadUsers();
    this.authenticationService.isAdmin()
      .subscribe(isAdmin => this.isAdmin = isAdmin);
  }

  onDelete(user: User) {
    this.service.remove(user.id).subscribe(() => this._loadUsers());
  }

  private _loadUsers() {
    this.service.getAll().subscribe((userList) => (this.userList = userList));
  }
}
