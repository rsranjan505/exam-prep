import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { City, LocationService, State } from '../../services/location.service';
import { ToastService } from '../../services/toast.service';
import { CommonModule, NgIf } from '@angular/common';


function passwordMatch(control: AbstractControl): ValidationErrors | null {
  const pass = control.get('password')?.value;
  const confirm = control.get('confirmed')?.value;
  return pass === confirm ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  imports: [RouterLink, NgIf, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auth = inject(AuthService);
  locationService = inject(LocationService);
  toastService = inject(ToastService);

  loading = signal(false);

  async ngOnInit() {
    if(this.auth.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
    await this.loadStates();

    }



  form = this.fb.group({
    first_name: ['', [Validators.required, Validators.minLength(2)]],
    last_name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    state_id: ['', Validators.required],
    pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmed: ['', Validators.required],
  }, { validators: passwordMatch });

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    this.auth.register(this.form.value).subscribe({
      next: () => {
        this.loading.set(false);
        // Handle successful signup
        this.router.navigate(['dashboard']);
      },
      error: (err) => {
        this.loading.set(false);
        // Handle signup error
      }
    });
  }

  // State and City lists
  states = signal<State[]>([]);



    async loadStates() {
      try {
        const states = await this.locationService.getStates();
        this.states.set(states);
      } catch (error) {
        this.toastService.show('Failed to load states', 'error');
      }
    }

  getStateName(stateId: number): string {
    return this.states().find(s => s.id === stateId)?.name || '';
  }
}
