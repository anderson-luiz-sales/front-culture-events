import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EventFormComponent } from './events/components/form-events/form-events.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { MatNativeDateModule } from '@angular/material/core';
import { TableEventsComponent } from './events/components/table-events/table-events.component';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    EventFormComponent,
    TableEventsComponent,
  ],
  providers: []
  
})
export class AppModule { }