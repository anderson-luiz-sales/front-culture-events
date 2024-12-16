import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';  
import { MatInputModule } from '@angular/material/input'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core'; 

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