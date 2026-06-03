import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private locationService = inject(LocationService);
  user = this.authService.getUser();

  loading = signal(false);
  editMode = signal(false);

  states: any[] = [];
  cities: any[] = [];

  loadingStates = signal(false);
  loadingCities = signal(false);

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
    const user = this.authService.getUser() || {
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

    this.profileForm.patchValue(user as any);

    // initially readonly
    this.profileForm.disable();

    this.loadStates();

    const stateId = this.profileForm.get('state_id')?.value;

    if (stateId) {
      this.loadCities(parseInt(stateId));
    }
  }

  toggleEdit() {

    this.editMode.set(!this.editMode());

    if (this.editMode()) {
      this.profileForm.enable();
    } else {
      this.profileForm.disable();
    }
  }

  async updateProfile() {

    this.successMessage.set('');
    this.errorMessage.set('');

    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    try {

      const res = await this.authService.updateProfile(
        this.profileForm.value
      );

      this.loading.set(false);

      if (res?.success === false) {
        this.errorMessage.set(
          res.message || 'Failed to update profile.'
        );
        return;
      }

      this.successMessage.set(
        res?.message || 'Profile updated successfully.'
      );

      this.editMode.set(false);
      this.profileForm.disable();

    } catch (error: any) {

      this.loading.set(false);

      this.errorMessage.set(
        error?.message || 'Failed to update profile.'
      );

      console.error(error);
    }
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

  //


  loadStates() {
    this.loadingStates.set(true);

    this.locationService.getStates().then(states => {
      this.states = states;
      this.loadingStates.set(false);
    }).catch(error => {
      console.error('Error loading states:', error);
      this.loadingStates.set(false);
    });
  }

  loadCities(stateId: number) {

    this.locationService.getCitiesByState(stateId).then(cities => {
      this.cities = cities;
    }).catch(error => {
      console.error('Error loading cities:', error);
    });
  }

  onStateChange(event: Event) {

    const stateId = +(event.target as HTMLSelectElement).value;

    this.profileForm.patchValue({
      city_id: null
    });

    this.cities = [];

    if (!stateId) return;

    this.loadingCities.set(true);

    this.locationService.getCitiesByState(stateId).then(cities => {
      this.cities = cities;
      this.loadingCities.set(false);
    }).catch(error => {
      console.error('Error loading cities:', error);
      this.loadingCities.set(false);
    });
  }
}
