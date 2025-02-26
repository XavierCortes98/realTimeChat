import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MessageInputComponent } from './components/message-input/message-input.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { MessageItemComponent } from './components/message-item/message-item.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ChatComponent } from './pages/chat/chat.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FilterPipe } from './shared/filter.pipe';

@NgModule({
  declarations: [
    FilterPipe,
    MessageInputComponent,
    MessageListComponent,
    MessageItemComponent,
    UserListComponent,
    ChatComponent,
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatDialogModule,
    BrowserModule,
    MatIconModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
