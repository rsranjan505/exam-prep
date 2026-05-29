import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {

  private fb = inject(FormBuilder);

  loading = signal(false);
  editMode = signal(false);

  successMessage = signal('');
  errorMessage = signal('');

  profileForm = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', [Validators.required, Validators.minLength(10)]],
    address: [''],
    state_id: [''],
    city_id: [''],
    pincode: ['', Validators.minLength(6)],
    is_active: [true],
  });

  ngOnInit(): void {

    // MOCK DATA
    // Replace with API response
    const user = {
      first_name: 'Rajeev',
      last_name: 'Ranjan',
      email: 'rajeev@example.com',
      mobile: '9876543210',
      address: 'Patna, Bihar',
      state_id: 'Bihar',
      city_id: 'Patna',
      pincode: '800001',
      is_active: true
    };

    this.profileForm.patchValue(user);

    // initially readonly
    this.profileForm.disable();
  }

  toggleEdit() {

    this.editMode.set(!this.editMode());

    if (this.editMode()) {
      this.profileForm.enable();
    } else {
      this.profileForm.disable();
    }
  }

  updateProfile() {

    this.successMessage.set('');
    this.errorMessage.set('');

    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    // FAKE API DELAY
    setTimeout(() => {

      this.loading.set(false);

      // simulate success
      this.successMessage.set('Profile updated successfully.');

      this.editMode.set(false);

      this.profileForm.disable();

    }, 1500);
  }

  get first_name() {
    return this.profileForm.get('first_name');
  }

  get last_name() {
    return this.profileForm.get('last_name');
  }

  get email() {
    return this.profileForm.get('email');
  }

  get mobile() {
    return this.profileForm.get('mobile');
  }

  get pincode() {
    return this.profileForm.get('pincode');
  }
}
