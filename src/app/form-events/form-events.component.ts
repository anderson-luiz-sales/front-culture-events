import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { ReactiveFormsModule } from '@angular/forms'; // Importar ReactiveFormsModule
import { MatInputModule } from '@angular/material/input'; // Importar MatInputModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Importar MatFormFieldModule
import { MatButtonModule } from '@angular/material/button'; // Importar MatButtonModule
import { MatDatepickerModule } from '@angular/material/datepicker'; // Importar MatDatepickerModule
import { MatNativeDateModule } from '@angular/material/core'; // Importar MatNativeDateModule

@Component({
  selector: 'app-event-form',
  standalone: true, // Indica que este é um componente autônomo
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

  constructor(private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      eventName: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      eventDate: ['', [Validators.required]],
      location: ['', [Validators.required]],
      category: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.eventForm.valid) {
      this.formSubmitted.emit(this.eventForm.value);
    }
  }
}