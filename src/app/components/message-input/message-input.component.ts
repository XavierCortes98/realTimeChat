import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss'],
})
export class MessageInputComponent {
  @Output() message: EventEmitter<string> = new EventEmitter<string>();

  msg = '';

  sendMessage() {
    if (this.msg.trim()) this.message.emit(this.msg);
    this.msg = '';
  }
}
