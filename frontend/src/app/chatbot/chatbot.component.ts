import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService, ChatResponse } from './chatbot.service';

interface Message {
    role: 'user' | 'bot';
    text: string;
    sources?: string[];
}

@Component({
    selector: 'app-chatbot',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './chatbot.component.html',
    styleUrls: ['./chatbot.component.scss'],
})
export class ChatbotComponent {
    messages = signal<Message[]>([]);
    input = '';
    loading = signal(false);

    constructor(private chatbot: ChatbotService) {
        console.log('ChatbotComponent initialized');

    }

    send() {
        const question = this.input.trim();
        console.log('User question:', question);
        if (!question) return;

        this.addUserMessage(question);
        this.input = '';
        this.loading.set(true);

        this.chatbot.ask(question).subscribe({
            next: (res) => this.handleBotResponse(res),
            error: () => this.handleError(),
        });
    }

    private addUserMessage(text: string) {
        this.messages.update((msgs) => [
            ...msgs,
            { role: 'user', text },
        ]);
    }

    private handleBotResponse(res: ChatResponse) {
        this.messages.update((msgs) => [
            ...msgs,
            {
                role: 'bot',
                text: res.answer,
                sources: res.sources,
            },
        ]);
        this.loading.set(false);
    }

    private handleError() {
        this.messages.update((msgs) => [
            ...msgs,
            {
                role: 'bot',
                text: 'Something went wrong. Please try again.',
            },
        ]);
        this.loading.set(false);
    }
}
