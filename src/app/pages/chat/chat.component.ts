import { Component } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  messages!: Message[];

  constructor(private socketService: SocketService) {}

  login() {
    this.socketService.join('Xavi');
  }
}
