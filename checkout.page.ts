
import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { StoreService } from '../services/store.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <!-- Top Bar -->
      <div class="bg-brand-600 text-white text-xs py-1">
        <div class="container mx-auto px-4 flex justify-between items-center">
          <span>💊 Call to Order: +880 1712 345678</span>
          <div class="flex gap-4">
            <span class="hidden sm:inline">Dhaka Delivery: 24 Hrs</span>
            <span>Outside Dhaka: 48 Hrs</span>
          </div>
        </div>
      </div>

      <!-- Main Navbar -->
      <div class="container mx-auto px-4 py-3">
        <div class="flex items-center justify-between gap-4">
          
          <!-- Logo -->
          <a routerLink="/" class="flex items-center gap-2 group">
            <div class="bg-medical-green text-white p-1.5 rounded-lg group-hover:scale-105 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-bold text-slate-800 leading-none">MediCare</h1>
              <p class="text-[10px] text-slate-500 font-medium tracking-wider">PHARMACY BD</p>
            </div>
          </a>

          <!-- Search Bar (Desktop) -->
          <div class="hidden md:flex flex-1 max-w-lg mx-4 relative group">
            <div class="relative w-full">
              <input 
                type="text" 
                placeholder="Search medicine, healthcare products..." 
                class="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full focus:ring-2 focus:ring-brand-500 focus:outline-none text-sm transition-shadow"
                [value]="store.searchQuery()"
                (input)="onSearch($event)"
                (focus)="showSuggestions.set(true)"
                (blur)="onBlur()"
              >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <!-- Auto Suggestions Dropdown -->
            @if (showSuggestions() && (store.searchSuggestions().length > 0 || store.suggestedCorrection())) {
              <div class="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-slate-100 overflow-hidden z-50">
                @if (store.searchSuggestions().length > 0) {
                  <ul>
                    @for (item of store.searchSuggestions(); track item.id) {
                      <li>
                        <button (click)="selectSuggestion(item.name)" class="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center gap-3 transition-colors border-b border-slate-50 last:border-0">
                          <img [src]="item.image" class="w-8 h-8 rounded object-cover bg-gray-100" alt="">
                          <div>
                            <p class="text-sm font-medium text-slate-800">{{item.name}}</p>
                            <p class="text-[10px] text-slate-400">{{item.category}}</p>
                          </div>
                        </button>
                      </li>
                    }
                  </ul>
                }
                
                @if (store.suggestedCorrection() && store.searchSuggestions().length === 0) {
                  <div class="px-4 py-3">
                    <p class="text-sm text-slate-500">
                      Did you mean 
                      <button (click)="selectSuggestion(store.suggestedCorrection()!)" class="text-brand-600 font-bold hover:underline">
                        {{store.suggestedCorrection()}}
                      </button>?
                    </p>
                  </div>
                }
              </div>
            }
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-3 sm:gap-4">
            <a routerLink="/blood-donation" class="hidden sm:flex items-center gap-1 text-sm font-medium text-medical-red hover:bg-red-50 px-3 py-1.5 rounded-full transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Blood Bank
            </a>

            <a routerLink="/cart" class="relative text-slate-600 hover:text-brand-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              @if (store.cartCount() > 0) {
                <span class="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                  {{ store.cartCount() }}
                </span>
              }
            </a>

            <!-- Auth / Profile -->
            @if (store.currentUser()) {
              <a routerLink="/profile" class="flex items-center gap-2 pl-2 border-l border-slate-200">
                <img [src]="store.currentUser()?.image || 'https://via.placeholder.com/32'" class="w-8 h-8 rounded-full border border-slate-200 object-cover">
                <span class="text-sm font-bold text-slate-700 hidden lg:inline">{{store.currentUser()?.name?.split(' ')?.[0]}}</span>
              </a>
            } @else {
              <a routerLink="/auth" class="bg-brand-600 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors shadow-sm">
                Login
              </a>
            }
          </div>
        </div>

        <!-- Mobile Search (visible only on small screens) -->
        <div class="mt-3 md:hidden">
           <input 
              type="text" 
              placeholder="Search medicine..." 
              class="w-full pl-4 pr-4 py-2 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none text-sm"
              [value]="store.searchQuery()"
              (input)="onSearch($event)"
            >
        </div>
      </div>

      <!-- Categories Nav -->
      <nav class="border-t border-slate-100 hidden md:block">
        <div class="container mx-auto px-4">
          <ul class="flex gap-8 text-sm font-medium text-slate-600 py-3 overflow-x-auto">
            <li><a routerLink="/products" class="hover:text-brand-600 whitespace-nowrap">All Medicine</a></li>
            <li><a routerLink="/products" [queryParams]="{cat: 'prescription'}" class="hover:text-brand-600 whitespace-nowrap">Prescription</a></li>
            <li><a routerLink="/products" [queryParams]="{cat: 'otc'}" class="hover:text-brand-600 whitespace-nowrap">OTC Medicine</a></li>
            <li><a routerLink="/products" [queryParams]="{cat: 'baby'}" class="hover:text-brand-600 whitespace-nowrap">Baby Care</a></li>
            <li><a routerLink="/products" [queryParams]="{cat: 'feminine'}" class="hover:text-brand-600 whitespace-nowrap">Feminine Hygiene</a></li>
            <li><a routerLink="/products" [queryParams]="{cat: 'devices'}" class="hover:text-brand-600 whitespace-nowrap">Devices</a></li>
          </ul>
        </div>
      </nav>
    </header>
  `
})
export class HeaderComponent {
  store = inject(StoreService);
  router = inject(Router);
  showSuggestions = signal(false);

  onSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.store.setSearch(query);
  }

  onBlur() {
    setTimeout(() => {
      this.showSuggestions.set(false);
    }, 200);
  }

  selectSuggestion(name: string) {
    this.store.setSearch(name);
    this.showSuggestions.set(false);
    this.router.navigate(['/products']);
  }
}
