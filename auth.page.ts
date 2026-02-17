
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StoreService } from '../services/store.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-slate-50 min-h-screen py-10">
      <div class="container mx-auto px-4 max-w-4xl">
        <h1 class="text-3xl font-bold text-slate-800 mb-8">Checkout</h1>

        <div class="flex flex-col md:flex-row gap-8">
          <div class="flex-1 space-y-6">
            <!-- Shipping Info -->
            <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <h2 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span class="bg-brand-100 text-brand-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                Shipping Address
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input type="text" [(ngModel)]="form.name" class="w-full p-2.5 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none placeholder-slate-400" placeholder="Mr. Rahim">
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <input type="text" [(ngModel)]="form.phone" class="w-full p-2.5 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none placeholder-slate-400" placeholder="+880 1xxx">
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-slate-700 mb-1">Full Address</label>
                  <textarea [(ngModel)]="form.address" rows="3" class="w-full p-2.5 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none placeholder-slate-400" placeholder="House No, Road No, Area, City"></textarea>
                </div>
              </div>
            </div>

            <!-- Payment Method -->
            <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <h2 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                 <span class="bg-brand-100 text-brand-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                 Payment Method
              </h2>
              <div class="grid grid-cols-3 gap-4">
                <label class="cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-slate-50 transition-all"
                  [class.border-pink-500]="paymentMethod() === 'bkash'"
                  [class.bg-pink-50]="paymentMethod() === 'bkash'"
                  [class.border-slate-200]="paymentMethod() !== 'bkash'">
                  <input type="radio" name="payment" value="bkash" class="hidden" (change)="paymentMethod.set('bkash')">
                  <div class="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">bKash</div>
                  <span class="text-sm font-medium text-slate-700">bKash</span>
                </label>
                
                <label class="cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-slate-50 transition-all"
                  [class.border-orange-500]="paymentMethod() === 'nagad'"
                  [class.bg-orange-50]="paymentMethod() === 'nagad'"
                  [class.border-slate-200]="paymentMethod() !== 'nagad'">
                  <input type="radio" name="payment" value="nagad" class="hidden" (change)="paymentMethod.set('nagad')">
                   <div class="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">Nagad</div>
                  <span class="text-sm font-medium text-slate-700">Nagad</span>
                </label>

                <label class="cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-slate-50 transition-all"
                  [class.border-green-500]="paymentMethod() === 'cod'"
                  [class.bg-green-50]="paymentMethod() === 'cod'"
                  [class.border-slate-200]="paymentMethod() !== 'cod'">
                  <input type="radio" name="payment" value="cod" class="hidden" (change)="paymentMethod.set('cod')">
                   <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">COD</div>
                  <span class="text-sm font-medium text-slate-700">Cash on Del.</span>
                </label>
              </div>

              @if (paymentMethod() === 'bkash' || paymentMethod() === 'nagad') {
                <div class="mt-6 bg-slate-50 p-4 rounded-lg text-sm text-slate-600 animate-fade-in">
                  <p class="font-bold mb-2">Instructions:</p>
                  <ol class="list-decimal list-inside space-y-1">
                    <li>Send Money to <strong>01700000000</strong> (Personal)</li>
                    <li>Enter Reference: <strong>MED123</strong></li>
                    <li>Enter the Transaction ID below:</li>
                  </ol>
                  <input type="text" [(ngModel)]="transactionId" placeholder="Enter Transaction ID" class="mt-3 w-full p-2 bg-white text-slate-900 border border-slate-300 rounded focus:outline-none focus:border-brand-500 placeholder-slate-400">
                </div>
              }
            </div>
          </div>

          <!-- Order Summary Small -->
          <div class="md:w-80">
            <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100 sticky top-24">
               <h3 class="text-lg font-bold text-slate-800 mb-4">Your Order</h3>
               <div class="max-h-60 overflow-y-auto mb-4 scrollbar-thin">
                 @for (item of store.cart(); track item.product.id) {
                   <div class="flex justify-between text-sm mb-2 text-slate-600">
                     <span>{{item.quantity}}x {{item.product.name}}</span>
                     <span>৳{{item.product.price * item.quantity}}</span>
                   </div>
                 }
               </div>
               <div class="border-t pt-4 mt-2">
                 <div class="flex justify-between font-bold text-lg">
                   <span>Total</span>
                   <span>৳{{(store.cartTotal() * 1.05 + 60).toFixed(0)}}</span>
                 </div>
               </div>
               
               <button 
                  (click)="placeOrder()" 
                  [disabled]="isProcessing()"
                  class="w-full mt-6 bg-brand-600 text-white font-bold py-3 rounded-xl hover:bg-brand-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
               >
                 @if (isProcessing()) {
                   <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                     <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                     <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                   </svg>
                   Processing...
                 } @else {
                   Place Order
                 }
               </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Success Modal -->
      @if (showSuccess()) {
        <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div class="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl animate-pop-in border border-slate-100 relative overflow-hidden">
             <!-- Decorative background element -->
             <div class="absolute top-0 left-0 w-full h-2 bg-brand-500"></div>

             <div class="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
               </svg>
             </div>
             
             <h2 class="text-2xl font-bold text-slate-800 mb-2">Order Confirmed!</h2>
             
             <div class="bg-slate-50 rounded-lg p-4 mb-6 text-left">
               <p class="text-sm text-slate-500 mb-2 flex justify-between">
                 <span>Order ID:</span>
                 <span class="font-mono font-bold text-slate-700">#{{createdOrderId}}</span>
               </p>
               @if (transactionId) {
                <p class="text-sm text-slate-500 mb-2 flex justify-between">
                  <span>Trx ID:</span>
                  <span class="font-mono font-bold text-brand-600">{{transactionId}}</span>
                </p>
               }
               <p class="text-sm text-slate-500 flex justify-between">
                 <span>Est. Delivery:</span>
                 <span class="font-medium text-slate-700">24 Hours</span>
               </p>
             </div>

             <p class="text-slate-500 text-sm mb-6">
               Thank you, <span class="font-semibold text-slate-800">{{form.name}}</span>. Your order has been placed successfully. We will send you an SMS shortly.
             </p>
             
             <button (click)="finish()" class="w-full bg-brand-600 text-white font-bold py-3 rounded-xl hover:bg-brand-700 transition-colors shadow-lg">Back to Home</button>
          </div>
        </div>
      }
    </div>
  `
})
export class CheckoutPage {
  store = inject(StoreService);
  router = inject(Router);

  form = {
    name: '',
    phone: '',
    address: ''
  };

  transactionId = '';
  paymentMethod = signal<'cod'|'bkash'|'nagad'>('cod');
  isProcessing = signal<boolean>(false);
  showSuccess = signal<boolean>(false);
  createdOrderId = '';

  placeOrder() {
    if (!this.form.name || !this.form.phone || !this.form.address) {
      alert('Please fill in all shipping details.');
      return;
    }

    const method = this.paymentMethod();
    if ((method === 'bkash' || method === 'nagad') && !this.transactionId.trim()) {
      alert(`Please enter your ${method === 'bkash' ? 'bKash' : 'Nagad'} Transaction ID.`);
      return;
    }

    this.isProcessing.set(true);
    
    // Simulate Network Delay and Save to Store
    setTimeout(() => {
      // 1. Create the order in the Store Service
      const total = Number((this.store.cartTotal() * 1.05 + 60).toFixed(0));
      
      this.createdOrderId = this.store.placeOrder({
        customerName: this.form.name,
        phone: this.form.phone,
        address: this.form.address,
        items: [...this.store.cart()],
        totalAmount: total,
        paymentMethod: method,
        transactionId: this.transactionId || undefined
      });

      this.isProcessing.set(false);
      this.showSuccess.set(true);
      this.store.clearCart();
    }, 2000);
  }

  finish() {
    this.router.navigate(['/']);
  }
}
