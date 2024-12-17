import { Component, OnInit } from '@angular/core';
import { EventResponseDTO } from '../../models/event.model';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../service/event.service';

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
  events: EventResponseDTO[] | any = [];
  value: string | null = null;
  id: string | null = null;

  constructor(
    private eventService: EventService, 
    private router: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loadEvents();
    console.log('OnInit')
  }

  loadEvents(): void {
    this.router.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log('ID recebido:', this.id); 
      if (this.id) { 
        this.eventService.getEventById(Number(this.id)).subscribe({
          next: (data) => {
            this.events = [data]; 
          },
          error: (error) => {
            console.error('Erro ao buscar evento:', error);
          }
        });
      } else {
        this.eventService.getAllEvents().subscribe(data => {
          this.events = data;
        });
      }
    });
  }

  deleteEvent(id: number): void {
    this.eventService.deleteEvent(id).subscribe(() => {
      this.events = this.events.filter((event: { id: number; }) => event.id !== id);
      console.log('Evento deletado com ID: ', id);
    });
  }
}