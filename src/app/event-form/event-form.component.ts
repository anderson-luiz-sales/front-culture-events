import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EventService } from '../services/event.service';
import { EventRequestDTO } from '../models/event-request.dto'; 
import { Router } from '@angular/router';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-event-form',
  standalone: true,
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    // MatDatepickerModule,
    // MatNativeDateModule
  ],
  providers: [provideAnimations()]
})
export class EventFormComponent {
  eventForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private eventService: EventService, private router: Router) {
    this.eventForm = this.formBuilder.group({
      eventName: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]]
      // eventDate: ['', Validators.required],
      // location: ['', Validators.required],
      // category: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.eventForm.valid) {
      const eventData: EventRequestDTO = this.eventForm.value;
      this.eventService.createEvent(eventData).subscribe({
        next: (response) => {
          console.log('Evento criado com sucesso!', response);
          this.router.navigate(['/']); 
        },
        error: (err) => {
          console.error('Erro ao criar evento', err);
        }
      });
    } else {
      console.log('Formulário inválido');
    }
  }
}