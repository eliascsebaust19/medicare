
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="bg-slate-50 min-h-screen py-10">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold text-slate-800 mb-8">Shopping Cart</h1>

        @if (store.cart().length === 0) {
          <div class="bg-white rounded-xl shadow-sm p-12 text-center">
            <div class="inline-block p-6 bg-blue-50 rounded-full mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-slate-700 mb-2">Your cart is empty</h2>
            <p class="text-slate-500 mb-8">Looks like you haven't added any medicines yet.</p>
            <a routerLink="/products" class="bg-brand-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-brand-700 transition-colors shadow-lg">Start Shopping</a>
          </div>
        } @else {
          <div class="flex flex-col lg:flex-row gap-8">
            <!-- Cart Items -->
            <div class="flex-1 space-y-4">
              @for (item of store.cart(); track item.product.id) {
                <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
                  <img [src]="item.product.image" alt="{{item.product.name}}" class="w-20 h-20 object-cover rounded-lg bg-gray-100">
                  
                  <div class="flex-1">
                    <h3 class="font-bold text-slate-800">{{item.product.name}}</h3>
                    <p class="text-sm text-slate-500">{{item.product.brand}} | {{item.product.category}}</p>
                    <div class="text-brand-600 font-bold mt-1">৳{{item.product.price}}</div>
                  </div>

                  <div class="flex items-center gap-3">
                    <div class="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                      <button (click)="store.updateQuantity(item.product.id, item.quantity - 1)" class="px-3 py-1 hover:bg-slate-100 text-slate-600 font-bold">-</button>
                      <span class="px-3 py-1 font-medium text-slate-800 min-w-[30px] text-center">{{item.quantity}}</span>
                      <button (click)="store.updateQuantity(item.product.id, item.quantity + 1)" class="px-3 py-1 hover:bg-slate-100 text-slate-600 font-bold">+</button>
                    </div>
                    
                    <button (click)="store.removeFromCart(item.product.id)" class="text-red-400 hover:text-red-600 p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              }
            </div>

            <!-- Summary -->
            <div class="lg:w-96">
              <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100 sticky top-24">
                <h3 class="text-lg font-bold text-slate-800 mb-6">Order Summary</h3>
                
                <div class="space-y-3 mb-6">
                  <div class="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>৳{{store.cartTotal()}}</span>
                  </div>
                  <div class="flex justify-between text-slate-600">
                    <span>Delivery Fee (Dhaka)</span>
                    <span>৳60</span>
                  </div>
                  <div class="flex justify-between text-slate-600">
                    <span>VAT (5%)</span>
                    <span>৳{{(store.cartTotal() * 0.05).toFixed(0)}}</span>
                  </div>
                  <div class="border-t border-slate-100 pt-3 flex justify-between font-bold text-lg text-slate-900">
                    <span>Total</span>
                    <span>৳{{(store.cartTotal() * 1.05 + 60).toFixed(0)}}</span>
                  </div>
                </div>

                <a routerLink="/checkout" class="block w-full bg-brand-600 text-white text-center font-bold py-4 rounded-xl hover:bg-brand-700 transition-colors shadow-lg hover:shadow-xl">
                  Proceed to Checkout
                </a>
                
                <p class="text-xs text-center text-slate-400 mt-4">
                  By placing an order, you agree to our <a href="#" class="underline">Terms of Service</a>.
                </p>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class CartPage {
  store = inject(StoreService);
}
