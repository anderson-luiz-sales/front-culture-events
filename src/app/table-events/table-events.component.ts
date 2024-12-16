import { Component, OnInit } from '@angular/core';
import { EventResponseDTO } from '../models/event.model'; // Ajuste o caminho conforme necessário
import { EventService } from '../service/event.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

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

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe(data => {
      this.events = data;
    });
  }

  updateEvent(event: EventResponseDTO): void {
    // Aqui você pode abrir um modal para editar ou qualquer outra lógica
    console.log('Atualizar evento: ', event);
    // Implementar lógica de atualização aqui
  }

  deleteEvent(id: number): void {
    this.eventService.deleteEvent(id).subscribe(() => {
      this.events = this.events.filter(event => event.id !== id);
      console.log('Evento deletado com ID: ', id);
    });
  }
}