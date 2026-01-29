import { Routes } from '@angular/router';
import { BaseComponent } from './features/layouts/base/base.component';
import { HomeComponent } from './features/pages/home/home.component';
import { AboutComponent } from './features/pages/about/about.component';
import { ContactComponent } from './features/pages/contact/contact.component';
import { AuthlayoutComponent } from './features/layouts/authlayout/authlayout.component';
import { LoginComponent } from './features/pages/login/login.component';
import { BooksComponent } from './features/pages/books/books.component';
import { TestSeriesComponent } from './features/pages/test-series/test-series.component';
import { CartComponent } from './features/pages/cart/cart.component';
import { CheckoutComponent } from './features/pages/checkout/checkout.component';
import { DashboardComponent } from './features/private/dashboard/dashboard.component';
import { RegisterComponent } from './features/pages/register/register.component';
import { TestComponent } from './features/private/test/test.component';
import { ResultComponent } from './features/private/result/result.component';

export const routes: Routes = [
  // 🌐 Public Website
  {
    path: '',
    component: BaseComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'test-series', component: TestSeriesComponent },
      { path: 'books', component: BooksComponent },
      { path: 'cart', component: CartComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'checkout', component: CheckoutComponent },
    ],
  },

  // 🔐 Auth Pages
  {
    path: '',
    component: AuthlayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: RegisterComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'test', component: TestComponent },
      { path: 'result', component: ResultComponent },

      // later: register, otp, forgot-password
    ],
  },

  { path: '**', redirectTo: '' },
];
