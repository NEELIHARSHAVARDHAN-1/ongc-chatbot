import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'http://localhost:8000/ask';

  constructor(private http: HttpClient) {}

  ask(text: string): Observable<{ answer: string }> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<{ answer: string }>(
      this.apiUrl,
      { text },
      { headers }
    );
  }
}
