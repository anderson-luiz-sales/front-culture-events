import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';  
import { MatInputModule } from '@angular/material/input'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core'; 
import { EventResponseDTO } from '../models/event.model'; 
import { EventService } from '../service/event.service';

@Component({
  selector: 'app-event-form',
  standalone: true,
  templateUrl: './form-events.component.html',
  styleUrls: ['./form-events.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class EventFormComponent implements OnInit {
  eventForm: FormGroup;
  @Output() formSubmitted = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private eventService: EventService) {
    this.eventForm = this.fb.group({
      eventName: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      eventDate: [this.getCurrentDateTime(), [Validators.required]],
      location: ['', [Validators.required]],
      category: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  private getCurrentDateTime(): string {
    const now = new Date();
    const isoString = now.toISOString();
    const localDateString = isoString.slice(0, 10);
    const localTimeString = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    return `${localDateString}T${localTimeString}`;
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const eventData: EventResponseDTO = this.eventForm.value; 
      this.eventService.createEvent(eventData).subscribe({
        next: (response: any) => {
          console.log('Evento criado com sucesso:', response);
          this.formSubmitted.emit(response); 
          this.eventForm.reset(); 
          location.reload(); 
        },
        error: (error: any) => {
          console.error('Erro ao criar evento:', error);
        }
      });
    }
  }
}