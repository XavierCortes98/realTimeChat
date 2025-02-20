import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;
  private readonly url: string = 'http://localhost:3000';

  constructor() {
    this.socket = io(this.url);
  }

  join(username: string, callback: Function): void {
    this.socket.emit('join', username, callback);
  }

  sendMessage(user: string, message: string) {
    this.socket.emit('message', { user, message });
  }

  getConnectedUsers(): Observable<string[]> {
    return new Observable((observer) => {
      this.socket.on('updateUsers', (users: string[]) => {
        observer.next(users);
      });
      return () => this.socket.off('updateUsers');
    });
  }

  getMessages(): Observable<Message> {
    return new Observable((observer) => {
      this.socket.on('message', (msg) => {
        observer.next(msg);
      });

      return () => {
        this.socket.off('message');
      };
    });
  }
}
