import { Routes } from '@angular/router';
import { TableEventsComponent } from './events/components/table-events/table-events.component';

export const routes: Routes = [
  { path: 'events', component: TableEventsComponent },
  { path: 'events/:id', component: TableEventsComponent },    
  { path: '', redirectTo: '/events', pathMatch: 'full' }
];