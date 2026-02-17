
import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  styles: [`
    /* 3D Capsule Animation */
    .scene {
      perspective: 1000px;
    }
    
    .capsule-container {
      position: relative;
      width: 120px;
      height: 300px;
      transform-style: preserve-3d;
      animation: float 6s ease-in-out infinite;
    }

    .capsule-body {
      width: 100%;
      height: 100%;
      border-radius: 60px;
      background: linear-gradient(135deg, #ef4444 50%, #ffffff 50%);
      box-shadow: 
        inset -15px -5px 20px rgba(0,0,0,0.2),
        inset 15px 5px 20px rgba(255,255,255,0.4),
        20px 20px 40px rgba(0,0,0,0.15);
      transform: rotate(25deg) rotateY(20deg);
      transition: transform 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    /* Shine effect */
    .capsule-body::after {
      content: '';
      position: absolute;
      top: 10%;
      left: 20%;
      width: 20%;
      height: 60%;
      background: linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0));
      border-radius: 50px;
      filter: blur(5px);
    }

    /* Floating Particles */
    .particle {
      position: absolute;
      background: white;
      border-radius: 50%;
      opacity: 0.6;
      animation: rise 4s infinite linear;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(5deg); }
    }

    @keyframes rise {
      0% { transform: translateY(0) scale(1); opacity: 0; }
      50% { opacity: 0.8; }
      100% { transform: translateY(-100px) scale(0); opacity: 0; }
    }
    
    .hero-gradient {
      background: radial-gradient(circle at top right, #e0f2fe 0%, #ffffff 40%, #f0f9ff 100%);
    }
  `],
  template: `
    <!-- Full Screen Hero Section -->
    <div class="relative w-full min-h-[90vh] hero-gradient overflow-hidden flex items-center">
      
      <!-- Background Abstract Elements -->
      <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-100/50 to-transparent skew-x-[-12deg] origin-top"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-brand-50 rounded-full blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2"></div>

      <div class="container mx-auto px-4 relative z-10 w-full">
        <div class="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-0">
          
          <!-- Left Content (Text) -->
          <div class="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left pt-10 lg:pt-0">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-brand-100 mb-6 animate-fade-in-up">
              <span class="flex h-3 w-3 relative">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span class="text-xs font-bold text-slate-600 uppercase tracking-wider">#1 Online Pharmacy in BD</span>
            </div>

            <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-6 tracking-tight">
              Healthcare <br class="hidden lg:block" />
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400">Simplified</span>
              For You.
            </h1>

            <p class="text-lg text-slate-500 mb-10 max-w-xl leading-relaxed">
              Experience the future of pharmacy. Authentic medicines, instant doctor consultations, and fast delivery across Bangladesh.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a routerLink="/products" class="px-8 py-4 bg-brand-600 text-white font-bold rounded-xl shadow-lg shadow-brand-500/30 hover:bg-brand-700 hover:-translate-y-1 transition-all text-center flex items-center justify-center gap-2">
                <span>Order Medicine</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a routerLink="/upload" class="px-8 py-4 bg-white text-slate-700 font-bold rounded-xl shadow-sm border border-slate-200 hover:border-brand-400 hover:text-brand-600 transition-all text-center">
                Upload Prescription
              </a>
            </div>

            <!-- Trust Badges -->
            <div class="mt-12 flex items-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Bkash_Logo_Icon.png/1200px-Bkash_Logo_Icon.png" class="h-8 object-contain" alt="bKash">
               <img src="https://freelogopng.com/images/all_img/1679248787Nagad-Logo.png" class="h-8 object-contain" alt="Nagad">
               <div class="text-xs font-bold text-slate-400 border-l pl-4 border-slate-300">
                 DGDA <br> Licensed
               </div>
            </div>
          </div>

          <!-- Right Visuals (Doctor + 3D Capsule) -->
          <div class="w-full lg:w-1/2 relative h-[500px] lg:h-[700px] flex items-end justify-center lg:justify-end perspective-container">
             
             <!-- 3D Capsule Floating Element -->
             <div class="absolute top-20 left-0 lg:left-10 z-20 scene">
               <div class="capsule-container">
                 <div class="capsule-body"></div>
                 <!-- Particles around capsule -->
                 <div class="particle" style="width: 10px; height: 10px; top: 100%; left: 20%; animation-delay: 0s;"></div>
                 <div class="particle" style="width: 6px; height: 6px; top: 100%; left: 60%; animation-delay: 1s;"></div>
                 <div class="particle" style="width: 8px; height: 8px; top: 100%; left: 40%; animation-delay: 2.5s;"></div>
               </div>
               
               <!-- Floating Label -->
               <div class="absolute -right-16 top-1/2 bg-white/90 backdrop-blur-md p-3 rounded-lg shadow-xl border border-white/50 animate-bounce-slow">
                 <p class="text-xs font-bold text-slate-800">Fast Relief</p>
                 <p class="text-[10px] text-green-500">In Stock</p>
               </div>
             </div>

             <!-- Doctor Image -->
             <div class="relative z-10 h-[90%] lg:h-full w-auto">
               <img 
                 src="https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-afro-professional-doctor-png-image_10148632.png" 
                 class="h-full w-auto object-contain drop-shadow-2xl mask-bottom"
                 alt="Professional Doctor"
               >
               
               <!-- Glass Card Overlay -->
               <div class="absolute bottom-12 -left-4 lg:-left-12 bg-white/80 backdrop-blur-lg p-5 rounded-2xl shadow-2xl border border-white/40 max-w-xs animate-slide-up delay-300">
                  <div class="flex items-center gap-4 mb-3">
                    <div class="bg-blue-100 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p class="font-bold text-slate-800 text-sm">24/7 Support</p>
                      <p class="text-xs text-slate-500">Expert Pharmacists</p>
                    </div>
                  </div>
                  <div class="w-full bg-slate-200 rounded-full h-1.5 mb-2">
                    <div class="bg-brand-500 h-1.5 rounded-full" style="width: 85%"></div>
                  </div>
                  <p class="text-[10px] text-slate-400 text-right">Response rate: 98%</p>
               </div>
             </div>
             
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section (Seamlessly connected) -->
    <div class="bg-white py-16 relative z-20">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="group bg-slate-50 hover:bg-brand-50 p-8 rounded-2xl transition-all duration-300 border border-slate-100 hover:border-brand-100">
            <div class="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span class="text-3xl">🚀</span>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-2">Express Delivery</h3>
            <p class="text-slate-500">Get your medicines delivered within 2 hours in Dhaka and 24 hours nationwide.</p>
          </div>
          
          <div class="group bg-slate-50 hover:bg-brand-50 p-8 rounded-2xl transition-all duration-300 border border-slate-100 hover:border-brand-100">
            <div class="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span class="text-3xl">🛡️</span>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-2">100% Authentic</h3>
            <p class="text-slate-500">We source directly from manufacturers. 100% money-back guarantee on authenticity.</p>
          </div>

          <div class="group bg-slate-50 hover:bg-brand-50 p-8 rounded-2xl transition-all duration-300 border border-slate-100 hover:border-brand-100">
            <div class="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span class="text-3xl">👨‍⚕️</span>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-2">Expert Advice</h3>
            <p class="text-slate-500">Free consultation with our A Grade pharmacists for any medication related queries.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Categories -->
    <section class="py-16 bg-white border-t border-slate-100">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-end mb-10">
           <div>
             <h2 class="text-3xl font-bold text-slate-800">Shop by Category</h2>
             <p class="text-slate-500 mt-2">Find what you need from our wide range of products</p>
           </div>
           <a routerLink="/products" class="hidden md:block text-brand-600 font-bold hover:text-brand-700 hover:underline">View All Categories &rarr;</a>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          @for (cat of categories; track cat.name) {
            <a routerLink="/products" [queryParams]="{cat: cat.key}" class="group block text-center">
              <div class="bg-white border border-slate-100 rounded-2xl p-6 mb-4 group-hover:shadow-lg group-hover:border-brand-200 transition-all duration-300 flex flex-col items-center justify-center h-40 relative overflow-hidden">
                 <div class="absolute inset-0 bg-gradient-to-br from-slate-50 to-white opacity-100 group-hover:from-brand-50 group-hover:to-white transition-colors"></div>
                 <span class="text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300 relative z-10">{{cat.emoji}}</span>
                 <span class="font-bold text-slate-700 group-hover:text-brand-600 relative z-10 text-sm">{{cat.name}}</span>
              </div>
            </a>
          }
        </div>
        
        <div class="mt-6 text-center md:hidden">
          <a routerLink="/products" class="text-brand-600 font-bold hover:text-brand-700">View All Categories &rarr;</a>
        </div>
      </div>
    </section>

    <!-- Special Offers Section -->
    <section class="py-12 bg-white" id="offers">
      <div class="container mx-auto px-4">
        <div class="flex items-center gap-2 mb-8">
          <div class="bg-red-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-slate-800">Special Offers</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Banner 1 -->
          <div class="relative rounded-2xl overflow-hidden bg-gradient-to-r from-pink-500 to-rose-500 text-white h-48 flex items-center p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div class="relative z-10 w-2/3">
              <span class="bg-white/20 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Limited Time</span>
              <h3 class="text-2xl font-bold mt-2 mb-1">bKash Payment</h3>
              <p class="text-pink-100 text-sm mb-4">Get 10% instant cashback on all medicine orders above ৳500.</p>
              <button class="bg-white text-pink-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-pink-50 transition-colors">Shop Now</button>
            </div>
            <div class="absolute right-0 bottom-0 w-1/3 h-full overflow-hidden">
               <div class="absolute -bottom-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Bkash_Logo_Icon.png/1200px-Bkash_Logo_Icon.png" class="absolute bottom-4 right-4 w-20 opacity-80" alt="bKash">
            </div>
          </div>

          <!-- Banner 2 -->
          <div class="relative rounded-2xl overflow-hidden bg-gradient-to-r from-teal-500 to-emerald-500 text-white h-48 flex items-center p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div class="relative z-10 w-2/3">
               <span class="bg-white/20 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Baby Care</span>
               <h3 class="text-2xl font-bold mt-2 mb-1">Diaper Festival</h3>
               <p class="text-teal-100 text-sm mb-4">Up to 25% OFF on Pampers, Huggies and more.</p>
               <a routerLink="/products" [queryParams]="{cat: 'baby'}" class="bg-white text-teal-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-teal-50 transition-colors inline-block">View Offers</a>
            </div>
            <div class="absolute right-4 bottom-0 w-32 h-full flex items-end opacity-80">
               <span class="text-6xl">👶</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-20 bg-slate-50">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-end mb-12">
          <div>
            <h2 class="text-3xl font-bold text-slate-800">Featured Medicines</h2>
            <p class="text-slate-500 mt-2">Best selling healthcare products this week</p>
          </div>
          <a routerLink="/products" class="bg-white border border-slate-300 text-slate-700 px-6 py-2 rounded-full font-bold hover:bg-slate-50 hover:text-brand-600 transition-colors">View All</a>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          @for (product of featuredProducts; track product.id) {
            <div class="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-5 border border-slate-100 flex flex-col h-full group relative">
              
              <!-- Sale Badge -->
              @if (product.originalPrice && product.originalPrice > product.price) {
                <div class="absolute top-4 right-4 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md animate-pulse">
                  SAVE ৳{{(product.originalPrice - product.price)}}
                </div>
              }

              <div class="relative mb-6 rounded-xl bg-gray-50 h-56 flex items-center justify-center overflow-hidden">
                <img [src]="product.image" alt="{{product.name}}" class="object-cover h-full w-full group-hover:scale-110 transition-transform duration-700">
                @if (product.requiresPrescription) {
                  <span class="absolute top-3 left-3 bg-white/90 backdrop-blur text-yellow-700 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm border border-yellow-200 flex items-center gap-1">
                    <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                    Rx Required
                  </span>
                }
              </div>
              
              <div class="flex-1">
                <p class="text-xs font-bold text-brand-600 uppercase tracking-wide mb-2">{{product.brand}}</p>
                <h3 class="font-bold text-slate-900 text-lg leading-tight mb-2 group-hover:text-brand-600 transition-colors">{{product.name}}</h3>
                <p class="text-slate-500 text-sm line-clamp-2 mb-4">{{product.description}}</p>
              </div>

              <div class="pt-4 border-t border-slate-50 flex items-center justify-between">
                <div>
                   <div class="flex items-center gap-2">
                     <span class="text-2xl font-bold text-slate-800">৳{{product.price}}</span>
                     @if (product.originalPrice) {
                       <span class="text-sm text-slate-400 line-through">৳{{product.originalPrice}}</span>
                     }
                   </div>
                </div>
                <button 
                  (click)="store.addToCart(product); $event.stopPropagation()"
                  class="bg-brand-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg shadow-brand-500/30 transform hover:scale-110 active:scale-95 transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- AI Promo Banner -->
    <section class="py-12 bg-white">
      <div class="container mx-auto px-4">
        <div class="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-3xl overflow-hidden shadow-2xl relative p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
          
          <!-- Decorative Background -->
          <div class="absolute inset-0 opacity-20">
             <div class="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/50 via-transparent to-transparent"></div>
          </div>

          <div class="relative z-10 md:w-2/3">
             <div class="inline-flex items-center gap-2 bg-indigo-800/50 border border-indigo-500/30 text-indigo-200 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
               Google Gemini Powered
             </div>
             <h2 class="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
               Unsure about your <br/> medication?
             </h2>
             <p class="text-indigo-200 text-lg mb-8 max-w-xl">
               Chat with our AI Pharmacist instantly. Check interactions, understand side effects, and get health tips 24/7 without waiting.
             </p>
             <a routerLink="/ai-pharmacist" class="inline-flex items-center gap-3 bg-white text-indigo-900 font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-indigo-50 transition-colors transform hover:-translate-y-1">
               <span>Start AI Consultation</span>
               <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
               </svg>
             </a>
          </div>

          <div class="relative z-10 md:w-1/3 flex justify-center">
             <div class="w-64 h-64 relative">
                <div class="absolute inset-0 bg-indigo-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div class="relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-full shadow-2xl flex items-center justify-center h-full w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-32 w-32 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  `
})
export class HomePage {
  store = inject(StoreService);

  get featuredProducts() {
    return this.store.products().slice(0, 4);
  }

  categories = [
    { name: 'Prescription', key: 'prescription', emoji: '💊' },
    { name: 'OTC Medicine', key: 'otc', emoji: '🩹' },
    { name: 'Baby Care', key: 'baby', emoji: '👶' },
    { name: 'Personal Care', key: 'personal', emoji: '🧴' },
    { name: 'Devices', key: 'devices', emoji: '🩺' },
    { name: 'Nutrition', key: 'nutrition', emoji: '🍎' },
  ];
}
