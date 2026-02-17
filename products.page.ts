
import { Routes } from '@angular/router';
import { HomePage } from './pages/home.page';
import { ProductsPage } from './pages/products.page';
import { CartPage } from './pages/cart.page';
import { CheckoutPage } from './pages/checkout.page';
import { UploadPrescriptionPage } from './pages/upload-prescription.page';
import { AiPharmacistPage } from './pages/ai-pharmacist.page';
import { AuthPage } from './pages/auth.page';
import { BloodDonationPage } from './pages/blood-donation.page';
import { ProfilePage } from './pages/profile.page';
import { AdminLoginPage } from './pages/admin-login.page';
import { AdminDashboardPage } from './pages/admin-dashboard.page';
import { inject } from '@angular/core';
import { StoreService } from './services/store.service';
import { Router } from '@angular/router';

// Auth Guard for User
const authGuard = () => {
  const store = inject(StoreService);
  const router = inject(Router);
  if (!store.currentUser()) {
    return router.parseUrl('/auth');
  }
  return true;
};

// Auth Guard for Admin
const adminGuard = () => {
  const store = inject(StoreService);
  const router = inject(Router);
  if (!store.isAdmin()) {
    return router.parseUrl('/admin/login');
  }
  return true;
};

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'products', component: ProductsPage },
  { path: 'cart', component: CartPage },
  { path: 'checkout', component: CheckoutPage },
  { path: 'upload', component: UploadPrescriptionPage },
  { path: 'ai-pharmacist', component: AiPharmacistPage },
  { path: 'auth', component: AuthPage },
  { path: 'blood-donation', component: BloodDonationPage },
  { path: 'profile', component: ProfilePage, canActivate: [authGuard] },
  
  // Admin Routes
  { path: 'admin/login', component: AdminLoginPage },
  { path: 'admin/dashboard', component: AdminDashboardPage, canActivate: [adminGuard] },
  
  { path: '**', redirectTo: '' }
];
