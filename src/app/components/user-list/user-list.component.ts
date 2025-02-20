import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: string[] = [];

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.getConnectedUsers().subscribe((users) => {
      this.users = users;
    });
  }
}
