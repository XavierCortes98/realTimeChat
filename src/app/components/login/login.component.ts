import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username = '';
  errorMsg = '';
  constructor(
    private socketService: SocketService,
    public dialogRef: MatDialogRef<LoginComponent>
  ) {}

  onConfirm() {
    this.socketService.join(this.username, (response: any) => {
      if (response.status === 200) {
        this.dialogRef.close(this.username);
      } else {
        this.errorMsg = response.message;
      }
    });
  }
}
