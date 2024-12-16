import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MatTableModule } from '@angular/material/table'; 
import { MatButtonModule } from '@angular/material/button';

interface EventResponseDTO {
  id: number;
  eventName: string;
  description: string;
  eventDate: string; 
  location: string;
  category: string;
}

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
export class TableEventsComponent {
  events: EventResponseDTO[] = [
    {
      id: 1,
      eventName: 'Concerto de Música',
      description: 'Um concerto de música clássica ao ar livre.',
      eventDate: '2024-05-10',
      location: 'Central Park',
      category: 'Música'
    },
    {
      id: 2,
      eventName: 'Exposição de Arte',
      description: 'Exposição de arte moderna na galeria local.',
      eventDate: '2024-06-15',
      location: 'Galeria de Arte',
      category: 'Arte'
    },
    {
      id: 3,
      eventName: 'Festival de Gastronomia',
      description: 'Festival com os melhores chefs da cidade.',
      eventDate: '2024-07-20',
      location: 'Praça Central',
      category: 'Gastronomia'
    }
  ];

  updateEvent(event: EventResponseDTO) {
    // Lógica para atualizar o evento (pode abrir um modal ou navegar para um formulário de edição)
    console.log('Atualizar evento: ', event);
  }

  deleteEvent(id: number) {
    this.events = this.events.filter(event => event.id !== id);
    console.log('Evento deletado com ID: ', id);
  }
}