import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { SeoService } from 'src/app/core/services/seo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(AuthService);

  private seo = inject(SeoService);

  loading = signal(false);
  // ✅ ADD THIS
  serverError = signal('');

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [false]
  });

  private googleInitialized = false;

  ngOnInit(): void {
    if(this.auth.isLoggedIn()) {
      this.router.navigate(['/']);
    }

     this.seo.updateMetaTags({
      title: 'Login - Knowledge Nation',
      description: 'Access your Knowledge Nation account to track your progress, manage your test series, and stay updated with the latest resources for competitive exam preparation.',
      keywords: 'login knowledge nation,user account,competitive exam preparation,track progress,manage test series'
    });


     // Optional JSON-LD (LocalBusiness)
    this.seo.addJsonLd({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Knowledge Nation',
      url: 'https://www.knowledgenation.in/login',
      logo: 'https://www.knowledgenation.in/assets/logo.png',
      email: 'support@knowledgenation.in',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Patna, Bihar',
        addressCountry: 'India',
      },
      sameAs: [
        'https://www.facebook.com/knowledgenation',
        'https://www.instagram.com/knowledgenation',
      ],
    });
  }


  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  login() {

    // ✅ clear old error
    this.serverError.set('');

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const { email, password } = this.loginForm.value;

    if (typeof email === 'string' && typeof password === 'string') {

      this.auth.login({ email, password }).subscribe({
        next: () => {
          this.loading.set(false);

          // ✅ navigate AFTER auth state is set
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.loading.set(false);

          // 🔥 don’t ignore errors like before
           // ✅ HANDLE SERVER ERRORS PROPERLY
          if (err.status === 401) {
            this.serverError.set('Invalid email or password.');
          }
          else if (err.status === 404) {
            this.serverError.set('User not found.');
            console.log(err);
          }
          else if (err.status === 422) {
            this.serverError.set(
              err.error?.message || 'Validation failed.'
            );
          }
          else if (err.status === 419) {
            this.serverError.set('Session expired. Please refresh and try again.');
          }
          else if (err.status === 500) {
            this.serverError.set('Server error. Please try again later.');
          }
          else {
            this.serverError.set(
              err.error?.message || 'Something went wrong.'
            );
          }

          console.error(err);
        }
      });

    } else {
      this.loading.set(false);
    }
  }

  loginWithGoogle() {
    if (!environment.googleClientId || environment.googleClientId === 'YOUR_GOOGLE_CLIENT_ID_APP') {
      this.serverError.set('Google login is not configured yet.');
      return;
    }

    const win = window as any;
    if (!win.google?.accounts?.id) {
      this.serverError.set('Google sign-in is not available. Please try again.');
      return;
    }

    if (!this.googleInitialized) {
      win.google.accounts.id.initialize({
        client_id: environment.googleClientId,
        callback: (response: any) => this.handleGoogleCredential(response.credential),
      });
      this.googleInitialized = true;
    }

    win.google.accounts.id.prompt();
  }

  private handleGoogleCredential(credential: string) {
    this.loading.set(true);
    this.auth.googleLogin(credential).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading.set(false);
        this.serverError.set(err.error?.message || 'Google login failed. Please try again.');
        console.error(err);
      },
    });
  }
}
