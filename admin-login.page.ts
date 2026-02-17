
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <!-- About -->
          <div>
             <h3 class="text-white font-bold text-lg mb-4">MediCare BD</h3>
             <p class="text-sm leading-relaxed mb-4">
               Bangladesh's most trusted online pharmacy. We deliver authentic medicine, baby care, and hygiene products right to your doorstep.
             </p>
             <div class="flex gap-4">
               <div class="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-brand-600 transition-colors cursor-pointer">f</div>
               <div class="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-brand-600 transition-colors cursor-pointer">t</div>
               <div class="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-brand-600 transition-colors cursor-pointer">in</div>
             </div>
          </div>

          <!-- Links -->
          <div>
            <h3 class="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul class="space-y-2 text-sm">
              <li><a routerLink="/" class="hover:text-white transition-colors">Home</a></li>
              <li><a routerLink="/products" class="hover:text-white transition-colors">All Medicines</a></li>
              <li><a routerLink="/upload" class="hover:text-white transition-colors">Upload Prescription</a></li>
              <li><a routerLink="/ai-pharmacist" class="hover:text-white transition-colors">AI Health Assistant</a></li>
            </ul>
          </div>

          <!-- Support -->
          <div>
            <h3 class="text-white font-bold text-lg mb-4">Support</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Return Policy</a></li>
              <li><a href="#" class="hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h3 class="text-white font-bold text-lg mb-4">Contact Us</h3>
            <ul class="space-y-3 text-sm">
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-brand-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span>Level 4, Khan Plaza, Dhanmondi 27, Dhaka-1209</span>
              </li>
              <li class="flex items-center gap-3">
                <svg class="w-5 h-5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                <span>+880 1712 345678</span>
              </li>
              <li class="flex items-center gap-3">
                <svg class="w-5 h-5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                <span>support@medicare.bd</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-xs text-slate-500">© 2024 MediCare Pharmacy BD. All rights reserved. DGDA License #12345.</p>
          <div class="flex items-center gap-4">
            <span class="text-xs text-slate-500">We Accept:</span>
            <div class="flex gap-2">
              <div class="h-6 w-10 bg-pink-600 rounded"></div> <!-- bKash placeholder -->
              <div class="h-6 w-10 bg-orange-600 rounded"></div> <!-- Nagad placeholder -->
              <div class="h-6 w-10 bg-blue-600 rounded"></div> <!-- Visa placeholder -->
            </div>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
