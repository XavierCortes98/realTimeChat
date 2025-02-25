import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnDestroy,
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
export class UserListComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('searchInput') searchInput!: ElementRef;

  private subscriptions: Subscription = new Subscription();

  showSearchUserInput = false;
  users: string[] = [];
  userToSearch = '';

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.socketService.getConnectedUsers().subscribe((users) => {
        this.users = users;
      })
    );

    this.subscriptions.add(
      this.socketService.listenForUserDisconnected().subscribe((data) => {
        const disconnectedUser = data.user;
        this.users = this.users.filter((user) => user !== disconnectedUser);
      })
    );
  }

  ngAfterViewChecked() {
    if (this.showSearchUserInput && this.searchInput) {
      this.searchInput.nativeElement.focus();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onInputBlur(): void {
    if (!this.userToSearch || this.userToSearch.trim() === '')
      this.showSearchUserInput = false;
  }

  toggleSearchUserInput() {
    this.showSearchUserInput = !this.showSearchUserInput;
  }
}
