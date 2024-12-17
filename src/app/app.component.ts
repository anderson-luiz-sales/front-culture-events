import { Component } from '@angular/core';
import { HeaderComponent } from "./events/components/header/header.component";
import { RouterOutlet } from '@angular/router';
import { EventFormComponent } from "./events/components/form-events/form-events.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, EventFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
}
