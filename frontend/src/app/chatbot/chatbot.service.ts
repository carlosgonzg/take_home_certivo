import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ChatResponse {
    answer: string;
    sources: string[];
}

@Injectable({ providedIn: 'root' })
export class ChatbotService {
    private apiUrl = `${environment.apiUrl}/chatbot/ask`;

    constructor(private http: HttpClient) { }

    ask(question: string): Observable<ChatResponse> {
        return this.http.post<ChatResponse>(this.apiUrl, { question });
    }
}
