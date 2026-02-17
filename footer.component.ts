
import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService, Product } from '../services/store.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-slate-50 min-h-screen pb-12">
      <!-- Header -->
      <div class="bg-white shadow-sm border-b border-slate-200 py-6">
        <div class="container mx-auto px-4">
          <h1 class="text-2xl font-bold text-slate-800">All Medicines</h1>
          <p class="text-slate-500">Browse our complete inventory of healthcare products</p>
        </div>
      </div>

      <div class="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        <!-- Sidebar Filters -->
        <aside class="w-full md:w-64 flex-shrink-0">
          <div class="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h3 class="font-bold text-slate-800 mb-4 text-lg">Filters</h3>
            
            <div class="mb-6">
              <h4 class="font-medium text-slate-700 mb-2 text-sm uppercase tracking-wide">Category</h4>
              <div class="space-y-2">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="cat" [checked]="currentCategory() === 'all'" (change)="setCategory('all')" class="text-brand-600 focus:ring-brand-500">
                  <span class="text-slate-600 text-sm">All</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="cat" [checked]="currentCategory() === 'prescription'" (change)="setCategory('prescription')" class="text-brand-600 focus:ring-brand-500">
                  <span class="text-slate-600 text-sm">Prescription</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="cat" [checked]="currentCategory() === 'otc'" (change)="setCategory('otc')" class="text-brand-600 focus:ring-brand-500">
                  <span class="text-slate-600 text-sm">OTC Medicine</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="cat" [checked]="currentCategory() === 'baby'" (change)="setCategory('baby')" class="text-brand-600 focus:ring-brand-500">
                  <span class="text-slate-600 text-sm">Baby Care</span>
                </label>
              </div>
            </div>

            <div class="mb-6">
              <h4 class="font-medium text-slate-700 mb-2 text-sm uppercase tracking-wide">Price Range</h4>
              <div class="flex items-center gap-2 text-sm text-slate-600">
                 <span>৳0</span>
                 <input type="range" class="w-full accent-brand-600 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer">
                 <span>৳5000</span>
              </div>
            </div>

             <div class="mb-6">
              <h4 class="font-medium text-slate-700 mb-2 text-sm uppercase tracking-wide">Availability</h4>
              <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked class="rounded text-brand-600 focus:ring-brand-500">
                  <span class="text-slate-600 text-sm">In Stock Only</span>
              </label>
            </div>
          </div>
        </aside>

        <!-- Product Grid -->
        <div class="flex-1">
          @if (filteredList().length === 0) {
            <div class="flex flex-col items-center justify-center py-20 bg-white rounded-lg shadow-sm border border-dashed border-slate-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 class="text-xl font-medium text-slate-600">No medicines found</h3>
              
              @if (store.suggestedCorrection()) {
                <div class="mt-2 text-lg text-slate-600 bg-brand-50 px-4 py-2 rounded-lg border border-brand-100">
                  Did you mean 
                  <button (click)="applyCorrection(store.suggestedCorrection()!)" class="text-brand-600 font-bold hover:underline italic">
                    {{store.suggestedCorrection()}}
                  </button>?
                </div>
              } @else {
                <p class="text-slate-400">Try adjusting your filters or search query.</p>
              }
              
              <button (click)="resetFilters()" class="mt-4 text-brand-600 font-medium hover:underline">Clear Filters</button>
            </div>
          } @else {
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (product of filteredList(); track product.id) {
                <div class="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-4 border border-slate-100 flex flex-col group">
                  <div class="relative mb-4 h-48 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
                    <img [src]="product.image" alt="{{product.name}}" class="object-cover h-full w-full group-hover:scale-105 transition-transform">
                     @if (product.requiresPrescription) {
                      <div class="absolute top-2 left-2 bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-1 rounded shadow-sm">Rx Required</div>
                    }
                    @if (!product.inStock) {
                      <div class="absolute inset-0 bg-white/60 flex items-center justify-center backdrop-blur-[1px]">
                         <span class="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase shadow-sm">Out of Stock</span>
                      </div>
                    }
                  </div>
                  
                  <div class="flex-1">
                    <div class="flex justify-between items-start">
                      <p class="text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full mb-2 inline-block">{{product.category}}</p>
                      <div class="flex text-yellow-400 text-xs">
                         <span>★</span><span>★</span><span>★</span><span>★</span><span class="text-gray-300">★</span>
                      </div>
                    </div>
                    
                    <h3 class="font-bold text-slate-800 leading-tight mb-1">{{product.name}}</h3>
                    <p class="text-xs text-slate-500 mb-3">{{product.brand}}</p>
                    <p class="text-sm text-slate-600 line-clamp-2 mb-4">{{product.description}}</p>
                  </div>

                  <div class="pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div>
                       <span class="block text-xs text-slate-400">Price</span>
                       <span class="text-brand-600 font-bold text-xl">৳{{product.price}}</span>
                    </div>
                    <button 
                      (click)="store.addToCart(product)"
                      [disabled]="!product.inStock"
                      class="bg-brand-600 hover:bg-brand-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white p-2.5 rounded-lg transition-colors shadow-md hover:shadow-lg active:scale-95 transform"
                    >
                      <span class="flex items-center gap-1 font-medium text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Add
                      </span>
                    </button>
                  </div>
                </div>
              }
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class ProductsPage {
  store = inject(StoreService);
  route = inject(ActivatedRoute);

  currentCategory = signal<string>('all');

  constructor() {
    this.route.queryParams.subscribe(params => {
      if (params['cat']) {
        this.currentCategory.set(params['cat'].toLowerCase());
      } else {
        this.currentCategory.set('all');
      }
    });
  }
  
  filteredList = computed(() => {
    let products = this.store.filteredProducts();
    const cat = this.currentCategory();
    
    if (cat !== 'all') {
      products = products.filter(p => {
        if (cat === 'otc') return p.category.toLowerCase().includes('otc');
        if (cat === 'prescription') return p.category.toLowerCase().includes('prescription') || p.requiresPrescription;
        return p.category.toLowerCase().includes(cat);
      });
    }
    
    return products;
  });

  setCategory(cat: string) {
    this.currentCategory.set(cat);
  }

  resetFilters() {
    this.currentCategory.set('all');
    this.store.setSearch('');
  }

  applyCorrection(correction: string) {
    this.store.setSearch(correction);
  }
}
