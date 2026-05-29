import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, map, Observable, tap } from 'rxjs';
import { ApiService } from '../api-service';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

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
  // GET ALL PLANS
  // --------------------------

  getPlans(): Observable<any[]> {

    return this.api
      .get<any>(
        `${this.baseUrl}/plans`
      )
      .pipe(

        map((res: any) => {

          const plans = res?.data || [];

          this.plansSubject.next(plans);

          return plans;
        })
      );
  }

  // --------------------------
  // GET PLAN BY SLUG
  // --------------------------

  getPlanBySlug(slug: string): Observable<any> {
    const token = this.getToken();

    return this.api
      .get<any>(
        `${this.baseUrl}/get-plan-exame-type/${slug}`,  token || ''
      )
      .pipe(

        map((res: any) => {

          const plan = res?.data || null;

          this.selectedPlanSubject.next(plan);

          return plan;
        })
      );
  }

  // --------------------------
  // PURCHASE PLAN
  // --------------------------

  purchasePlan(data: {
    plan_id: number;
    payment_id: string;
    amount: number;
  }): Observable<any> {

    const token = this.getToken();

    return this.api.post<any>(
      `${this.baseUrl}/purchase-plan`,
      data,
      token || ''
    );
  }

  // --------------------------
  // GET USER ACTIVE PLAN
  // --------------------------

  getMyActivePlan(): Observable<any> {

    const token = this.getToken();

    return this.api
      .get<any>(
        `${this.baseUrl}/my-active-plan`,
        token || ''
      )
      .pipe(
        map((res: any) => res?.data || null)
      );
  }

  // --------------------------
  // VERIFY PAYMENT
  // --------------------------

  verifyPayment(data: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }): Observable<any> {

    const token = this.getToken();

    return this.api.post<any>(
      `${this.baseUrl}/razorpay/verify-payment`,
      data,
      token || ''
    );
  }

  // --------------------------
  // CREATE RAZORPAY ORDER
  // --------------------------

  createOrder(data: {
    plan_id: number;
  }): Observable<any> {

    const token = this.getToken();

    return this.api.post<any>(
      `${this.baseUrl}/razorpay/create-order`,
      data,
      token || ''
    );
  }

  // --------------------------
  // FETCH ALL PLANS (ASYNC)
  // --------------------------

  async fetchPlans(): Promise<any[]> {

    try {

      const response: any = await firstValueFrom(
        this.api.get(
          `${this.baseUrl}/plans`
        )
      );

      const plans = response?.data || [];

      this.plansSubject.next(plans);

      return plans;

    } catch (error: any) {

      console.error('Fetch plans failed:', error);

      return [];
    }
  }

  // --------------------------
  // FETCH SINGLE PLAN (ASYNC)
  // --------------------------

  // async fetchPlanBySlug(slug: string): Promise<any> {

  //   try {

  //     const response: any = await firstValueFrom(
  //       this.api.get(
  //         `${this.baseUrl}/plans/${slug}`
  //       )
  //     );

  //     const plan = response?.data || null;

  //     this.selectedPlanSubject.next(plan);

  //     return plan;

  //   } catch (error: any) {

  //     console.error('Fetch plan failed:', error);

  //     return null;
  //   }
  // }
}
