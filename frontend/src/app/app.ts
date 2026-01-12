import { Component } from '@angular/core';
import { ChatbotComponent } from './chatbot/chatbot.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChatbotComponent],
  template: `
    <h1 style="text-align:center">Compliance Chatbot</h1>
    <app-chatbot></app-chatbot>
  `,
})
export class AppComponent { }