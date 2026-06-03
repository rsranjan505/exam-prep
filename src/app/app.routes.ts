import { Routes } from '@angular/router';
import { BaseComponent } from './features/layouts/base/base.component';
import { HomeComponent } from './features/pages/home/home.component';
import { AboutComponent } from './features/pages/about/about.component';
import { ContactComponent } from './features/pages/contact/contact.component';
import { AuthlayoutComponent } from './features/layouts/authlayout/authlayout.component';
import { LoginComponent } from './features/pages/login/login.component';
import { TestSeriesComponent } from './features/pages/test-series/test-series.component';
import { DashboardComponent } from './features/private/dashboard/dashboard.component';
import { RegisterComponent } from './features/pages/register/register.component';
import { TestComponent } from './features/private/test/test.component';
import { StudyMaterial } from './features/pages/study-material/study-material';
import { Gallery } from './features/pages/gallery/gallery';
import { OnlineSupport } from './features/pages/online-support/online-support';
import { FreeDemoTestComponent } from './features/pages/free-demo-test/free-demo-test.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // 🌐 Public Website
  {
    path: '',
    component: BaseComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'test-series', component: TestSeriesComponent },
      {  path: 'test-series/:exam',  component: FreeDemoTestComponent },
      { path: 'study-materials', component: StudyMaterial },
      { path: 'gallery', component: Gallery },
      { path: 'online-support', component: OnlineSupport },
      { path: 'contact', component: ContactComponent },

      { path: 'sample-test', component: FreeDemoTestComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: RegisterComponent },

      { path: 'privacy-policy', loadComponent: () => import('./features/pages/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent) },
      { path: 'refund-policy', loadComponent: () => import('./features/pages/refund-policy/refund-policy.component').then(m => m.RefundPolicyComponent) },
      { path: 'terms-condition', loadComponent: () => import('./features/pages/terms-condition/terms-condition.component').then(m => m.TermsConditionComponent) },
    ],
  },

  // 🔐 Auth Pages
  {
    path: '',
    component: AuthlayoutComponent,
    children: [
     {
        path: 'profile',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./features/private/profile/profile.component')
            .then(m => m.ProfileComponent)
      },
      // { path: 'dashboard', component: DashboardComponent },
      {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./features/private/dashboard/dashboard.component')
            .then(m => m.DashboardComponent)
      },
      // { path: 'test', component: TestComponent },
      {
        path: 'mock-tests',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./features/private/mock-test/mock-test.component')
            .then(m => m.MockTestComponent)
      },
      {
        path: 'purchase-plan',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./features/private/plan-purchase/plan-purchase.component')
            .then(m => m.PlanPurchaseComponent)
      },

      {
        path: 'test/:slug',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./features/private/test/test.component')
            .then(m => m.TestComponent)
      },

      {
        path: 'active-plan',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./features/private/active-plan/active-plan.component')
            .then(m => m.ActivePlanComponent)
      },

      // later: register, otp, forgot-password
    ],
  },

  { path: '**', redirectTo: 'not-found' },
  { path: 'not-found', loadComponent: () => import('./features/pages/not-found/not-found.component').then(m => m.NotFoundComponent) },
  { path: 'coming-soon', loadComponent: () => import('./features/pages/coming-soon/coming-soon.component').then(m => m.ComingSoonComponent) },
];
