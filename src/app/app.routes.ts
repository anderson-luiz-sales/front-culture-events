import { Routes } from '@angular/router';
import { EventFormComponent } from './events/components/form-events/form-events.component';

export const routes: Routes = [
  { path: 'events/:id', component: EventFormComponent }, 
  { path: 'events', component: EventFormComponent },    
  { path: '', redirectTo: '/events', pathMatch: 'full' }
];