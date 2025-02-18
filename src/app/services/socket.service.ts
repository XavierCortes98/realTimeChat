import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;
  private readonly url: string = 'http://localhost:3000';

  constructor() {
    this.socket = io(this.url);
  }

  join(username: string): void {
    this.socket.emit('join', username);
  }
}
