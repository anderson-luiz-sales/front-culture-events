import { Routes } from '@angular/router';
import { EventFormComponent } from './form-events/form-events.component';

export const routes: Routes = [
  { path: '', redirectTo: '/form-events', pathMatch: 'full' },
  { path: 'form-events', component: EventFormComponent },
];