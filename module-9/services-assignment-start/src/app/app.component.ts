import { Component } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsersService]
})
export class AppComponent {

  constructor(private usersService: UsersService) { }

  activeUsers = this.usersService.activeUsers;
  inactiveUsers = this.usersService.inactiveUsers;

}
