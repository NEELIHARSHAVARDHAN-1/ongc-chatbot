import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../chat.service';

interface Message {
  from: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  messages: Message[] = [
    { from: 'bot', text: 'Hi! Ask me anything about the document.' },
  ];

  userInput = '';
  loading = false;

  constructor(private chatService: ChatService) {}

  sendMessage() {
    const text = this.userInput.trim();
    if (!text || this.loading) return;

    // push user message
    this.messages.push({ from: 'user', text });
    this.userInput = '';
    this.loading = true;

    // call backend
    this.chatService.ask(text).subscribe({
      next: (res) => {
        this.messages.push({
          from: 'bot',
          text: res.answer || 'No answer returned from backend.',
        });
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.messages.push({
          from: 'bot',
          text:
            'Error: could not reach backend at http://localhost:8000/ask. ' +
            'Make sure the FastAPI server is running.',
        });
        this.loading = false;
      },
    });
  }
}
