import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventResponseDTO } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:9080/api/v1/events';

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<EventResponseDTO[]> {
    return this.http.get<EventResponseDTO[]>(this.apiUrl);
  }

  getEventById(id: number): Observable<EventResponseDTO> {
    return this.http.get<EventResponseDTO>(`${this.apiUrl}/${id}`);
  }

  updateEvent(id: number, event: EventResponseDTO): Observable<EventResponseDTO> {
    return this.http.put<EventResponseDTO>(`${this.apiUrl}/${id}`, event);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  createEvent(event: EventResponseDTO): Observable<EventResponseDTO> {
    return this.http.post<EventResponseDTO>(this.apiUrl, event);
  }
}