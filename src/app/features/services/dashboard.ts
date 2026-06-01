import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { ApiService } from '../api-service';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private api = inject(ApiService);
  private storage = inject(StorageService);

  private baseUrl = environment.apiBaseUrl;

  // --------------------------
  // STATE
  // --------------------------

  private plansSubject = new BehaviorSubject<any[]>([]);
  plans$ = this.plansSubject.asObservable();

  private selectedPlanSubject = new BehaviorSubject<any | null>(null);
  selectedPlan$ = this.selectedPlanSubject.asObservable();

  // --------------------------
  // GET TOKEN
  // --------------------------

  getToken(): string | null {
    return this.storage.get('token');
  }



  // --------------------------
  // GET DASHBOARD ITEMS
  // --------------------------

  getDashboardData(): Observable<any> {

    const token = this.getToken();

    return this.api
      .get<any>(
        `${this.baseUrl}/dashboard-data`,
        token || ''
      )
      .pipe(
        map((res: any) => res?.data || null)
      );
  }



}
