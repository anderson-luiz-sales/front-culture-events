import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EventResponseDTO } from '../../models/event.model';
import { EventService } from '../../service/event.service';
import { Router } from '@angular/router';

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
  isUpdating: boolean = false;
  isFindById: boolean = false;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router,
  ) {
    this.eventForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      eventName: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      eventDate: [this.getCurrentDateTime(), [Validators.required]],
      location: ['', [Validators.required]],
      category: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    const navigation = window.history.state;
    if (navigation && navigation.event) {
      const event: EventResponseDTO = navigation.event;
      this.eventForm.patchValue(event);
      this.isUpdating = false;
    }
  }

  private getCurrentDateTime(): string {
    const now = new Date();
    const localDateString = now.toISOString().slice(0, 10);
    const localTimeString = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    return `${localDateString}T${localTimeString}`;
  }

  toggleUpdate(): void {
    if (this.isUpdating) {
      this.onSubmit();
    } else {
      this.isUpdating = true;
      this.eventForm.get('id')?.enable();
    }
  }

  toggleFindById(): void {
    if (this.isFindById) {
      this.findById();
    } else {
      this.isFindById = true;
      this.eventForm.get('id')?.enable();
    }
  }

  findById(): void {
    const eventData: EventResponseDTO = this.eventForm.value;
    console.log('ID buscado:', eventData.id);
    if (eventData.id) {
      console.log( eventData.id);
      this.router.navigate(['/events', eventData.id]); 
    } else {
      console.error('ID do evento não fornecido.');
    }
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const eventData: EventResponseDTO = this.eventForm.value;
      if (eventData.id) {
        this.eventService.updateEvent(eventData.id, eventData).subscribe({
          next: (response) => {
            console.log('Evento atualizado com sucesso:', response);
            this.formSubmitted.emit(response);
            this.eventForm.reset();
            location.reload();
          },
          error: (error) => {
            console.error('Erro ao atualizar evento:', error);
          }
        });
      } else {
        this.eventService.createEvent(eventData).subscribe({
          next: (response) => {
            console.log('Evento criado com sucesso:', response);
            this.formSubmitted.emit(response);
            this.eventForm.reset();
            location.reload();
          },
          error: (error) => {
            console.error('Erro ao criar evento:', error);
          }
        });
      }
    }
  }
}