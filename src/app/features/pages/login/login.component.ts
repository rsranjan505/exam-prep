import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

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

  loading = signal(false);
  // ✅ ADD THIS
  serverError = signal('');

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [false]
  });

  ngOnInit(): void {
    if(this.auth.isLoggedIn()) {
      this.router.navigate(['/']);
    }
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
}
