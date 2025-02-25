import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/components/login/login.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Message } from 'src/app/models/message.model';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  username: string = '';
  isSmallScreen = false;
  constructor(
    private dialog: MatDialog,
    private socketService: SocketService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
      });
  }

  ngOnInit() {
    this.socketService.getMessages().subscribe((msg) => {
      this.messages.push(msg);
    });

    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((user) => {
      this.username = user;
    });
  }

  sendMessage(message: string) {
    console.log(message);
    this.socketService.sendMessage(this.username, message);
  }
}
