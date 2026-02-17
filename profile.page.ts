
import { Component, inject, signal, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeminiService } from '../services/gemini.service';
import { FormsModule } from '@angular/forms';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

@Component({
  selector: 'app-ai-pharmacist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex flex-col h-[calc(100vh-64px)] bg-slate-50">
      <!-- Header -->
      <div class="bg-white shadow-sm border-b px-4 py-4 flex items-center gap-4">
        <div class="bg-brand-100 p-2 rounded-full">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
           </svg>
        </div>
        <div>
          <h1 class="text-lg font-bold text-slate-800">MediCare AI Pharmacist</h1>
          <p class="text-xs text-slate-500">Powered by Google Gemini • Ask about general health</p>
        </div>
      </div>

      <!-- Chat Area -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4" #chatContainer>
        <div class="flex justify-center">
          <div class="bg-blue-50 text-blue-800 text-xs px-4 py-2 rounded-full border border-blue-100 max-w-md text-center">
             ⚠️ This is an AI assistant. Medical advice should always be verified by a certified doctor.
          </div>
        </div>

        @for (msg of messages(); track $index) {
          <div class="flex" [class.justify-end]="msg.role === 'user'">
            <div 
              class="max-w-[85%] rounded-2xl p-4 shadow-sm text-sm md:text-base leading-relaxed"
              [class.bg-brand-600]="msg.role === 'user'"
              [class.text-white]="msg.role === 'user'"
              [class.bg-white]="msg.role === 'ai'"
              [class.text-slate-700]="msg.role === 'ai'"
              [class.rounded-tr-none]="msg.role === 'user'"
              [class.rounded-tl-none]="msg.role === 'ai'"
            >
              {{msg.text}}
            </div>
          </div>
        }

        @if (isLoading()) {
          <div class="flex justify-start">
            <div class="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm flex items-center gap-2">
              <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
              <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
              <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        }
      </div>

      <!-- Input Area -->
      <div class="bg-white p-4 border-t border-slate-200">
        <div class="container mx-auto max-w-4xl flex gap-2">
          <input 
            type="text" 
            [(ngModel)]="userInput" 
            (keyup.enter)="sendMessage()"
            placeholder="E.g., What are the side effects of Napa?" 
            class="flex-1 bg-slate-100 border-none rounded-full px-6 py-3 focus:ring-2 focus:ring-brand-500 focus:outline-none"
            [disabled]="isLoading()"
          >
          <button 
            (click)="sendMessage()" 
            [disabled]="!userInput.trim() || isLoading()"
            class="bg-brand-600 hover:bg-brand-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  `
})
export class AiPharmacistPage implements AfterViewChecked {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  
  geminiService = inject(GeminiService);
  
  messages = signal<Message[]>([
    { role: 'ai', text: 'Hello! I am your virtual pharmacist assistant. How can I help you today? You can ask me about medicine dosages, side effects, or general health tips.' }
  ]);
  
  userInput = '';
  isLoading = signal(false);

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  async sendMessage() {
    if (!this.userInput.trim()) return;

    const userMsg = this.userInput;
    this.messages.update(m => [...m, { role: 'user', text: userMsg }]);
    this.userInput = '';
    this.isLoading.set(true);

    const response = await this.geminiService.getHealthAdvice(userMsg);
    
    this.messages.update(m => [...m, { role: 'ai', text: response }]);
    this.isLoading.set(false);
  }
}
