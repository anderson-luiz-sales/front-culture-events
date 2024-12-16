import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { RouterOutlet } from '@angular/router';
import { TableEventsComponent } from "./table-events/table-events.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, TableEventsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
}
