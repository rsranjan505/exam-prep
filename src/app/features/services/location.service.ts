// src/app/services/location.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

export interface State {
  id: number;
  name: string;
  code?: string;
}

export interface City {
  id: number;
  name: string;
  state_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiBaseUrl;

  states = signal<State[]>([]);
  cities = signal<City[]>([]);
  isLoadingStates = signal(false);
  isLoadingCities = signal(false);

  async getStates() {
    this.isLoadingStates.set(true);
    try {
      const response: any = await this.http.get(`${this.apiUrl}/states`).toPromise();
      if (response.success) {
        this.states.set(response.data);
      }
      this.isLoadingStates.set(false);
      return response.data;
    } catch (error) {
      console.error('Error fetching states:', error);
      throw error;
    } finally {
      this.isLoadingStates.set(false);
    }
  }

  async getCitiesByState(stateId: number) {
    this.isLoadingCities.set(true);
    this.cities.set([]); // Clear previous cities
    try {
      const response: any = await this.http.get(`${this.apiUrl}/cities/${stateId}`).toPromise();
      if (response.success) {
        this.cities.set(response.data);
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching cities:', error);
      throw error;
    } finally {
      this.isLoadingCities.set(false);
    }
  }


  async saveEnquiry(data: any): Promise<any | false> {

    try {

      const response = await firstValueFrom(
        this.http.post(`${this.apiUrl}/submit-enquiry`, data)
      );

      return response;

    } catch (error) {

      console.error('Enquiry save failed:', error);

      return false;
    }
  }
}
