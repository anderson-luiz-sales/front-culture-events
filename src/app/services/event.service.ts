import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventRequestDTO } from '../models/event-request.dto';
import { EventResponseDTO } from '../models/event-response.dto';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:9080/api/v1/events';

  constructor(private http: HttpClient) {}

  createEvent(event: EventRequestDTO): Observable<EventResponseDTO> {
    return this.http.post<EventResponseDTO>(this.apiUrl, event);
  }

  updateEvent(id: number, event: EventRequestDTO): Observable<EventResponseDTO> {
    return this.http.put<EventResponseDTO>(`${this.apiUrl}/${id}`, event);
  }
}