import { Component, OnInit } from '@angular/core';
import { EventResponseDTO } from '../models/event.model'; 
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router'; 
import { EventService } from '../service/event.service';

@Component({
  selector: 'app-table-events',
  standalone: true,
  templateUrl: './table-events.component.html',
  styleUrls: ['./table-events.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class TableEventsComponent implements OnInit {
  events: EventResponseDTO[] = [];

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe(data => {
      this.events = data;
    });
  }
  
  deleteEvent(id: number): void {
    this.eventService.deleteEvent(id).subscribe(() => {
      this.events = this.events.filter(event => event.id !== id);
      console.log('Evento deletado com ID: ', id);
    });
  }
}