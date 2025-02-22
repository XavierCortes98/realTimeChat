import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, AfterViewChecked {
  @ViewChild('searchInput') searchInput!: ElementRef;
  private userDisconnectSub!: Subscription;
  users: string[] = [];
  showSearchUserInput = false;
  userToSearch = '';
  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.getConnectedUsers().subscribe((users) => {
      this.users = users;
    });

    this.userDisconnectSub = this.socketService
      .listenForUserDisconnected()
      .subscribe((data) => {
        const disconnectedUser = data.user;
        this.users = this.users.filter((user) => user !== disconnectedUser);
      });
  }

  ngAfterViewChecked() {
    if (this.showSearchUserInput && this.searchInput) {
      this.searchInput.nativeElement.focus();
    }
  }

  onInputBlur(): void {
    if (!this.userToSearch || this.userToSearch.trim() === '')
      this.showSearchUserInput = false;
  }

  toggleSearchUserInput() {
    this.showSearchUserInput = !this.showSearchUserInput;
  }
}
