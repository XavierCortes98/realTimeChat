import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'realTimeChat';

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: Event) {
    event.preventDefault();
  }
}
