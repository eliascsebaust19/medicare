
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-prescription',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-slate-50 min-h-screen py-10">
      <div class="container mx-auto px-4 max-w-2xl">
        <div class="bg-white rounded-xl shadow-lg p-8">
          <div class="text-center mb-8">
            <h1 class="text-2xl font-bold text-slate-800">Upload Prescription</h1>
            <p class="text-slate-500 mt-2">Upload a clear image of your doctor's prescription. Our pharmacists will review it and call you.</p>
          </div>

          <div class="border-2 border-dashed border-brand-200 bg-brand-50 rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-brand-100 transition-colors group">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-brand-400 group-hover:scale-110 transition-transform mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p class="font-medium text-slate-700">Click to upload or drag and drop</p>
            <p class="text-xs text-slate-500 mt-1">JPEG, PNG or PDF (Max 5MB)</p>
            <input type="file" class="hidden"> 
            <!-- In a real app, we would bind a change event here -->
          </div>

          <div class="mt-8 space-y-4">
            <h3 class="font-bold text-slate-800">Guide to a valid prescription</h3>
            <ul class="space-y-3 text-sm text-slate-600">
               <li class="flex items-start gap-2">
                 <svg class="h-5 w-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                 Must show Doctor's Name & Registration Number
               </li>
               <li class="flex items-start gap-2">
                 <svg class="h-5 w-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                 Patient's Name & Date must be visible
               </li>
               <li class="flex items-start gap-2">
                 <svg class="h-5 w-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                 Image should be clear and not blurry
               </li>
            </ul>
          </div>

          <div class="mt-8">
            <button class="w-full bg-slate-300 text-slate-500 font-bold py-3 rounded-lg cursor-not-allowed">Upload & Proceed</button>
            <p class="text-xs text-center text-slate-400 mt-2">Upload a file to enable the button (Simulation)</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class UploadPrescriptionPage {}
