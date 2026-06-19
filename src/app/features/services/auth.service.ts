import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, map, Observable, tap } from 'rxjs';
import { ApiService } from '../api-service';
import { StorageService } from './storage.service';
import { User } from 'src/app/core/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private api = inject(ApiService);
  private storage = inject(StorageService);

  private baseUrl = environment.apiBaseUrl;

  private userSubject = new BehaviorSubject<User | null>(this.loadUser());
  user$ = this.userSubject.asObservable();

  // ------------------------
  // INIT
  // ------------------------
  private loadUser(): User | null {
    const raw = this.storage.get('user');
    return raw !== null && raw !== 'undefined' ? JSON.parse(raw) : null;
  }

  private setSession(user: User, token: string) {
    this.storage.set('user', JSON.stringify(user));
    this.storage.set('token', token);
    this.userSubject.next(user);
  }

  // ------------------------
  // AUTH ACTIONS
  // ------------------------
  login(credentials: { email: string; password: string }): Observable<void> {
    return this.api.post<any>(`${this.baseUrl}/login`, credentials).pipe(
      tap(res => {
        const user = res?.data;
        const token = res?.data?.login_token;

        if (!user || !token) {
          throw new Error('Invalid login response structure');
        }

        this.setSession(user, token);
      }),
      tap(() => {}) // return void to match your subscribe usage
    );
  }

  googleLogin(credential: string): Observable<void> {
    return this.api.post<any>(`${this.baseUrl}/auth/google`, { credential }).pipe(
      tap(res => {
        const user = res?.data;
        const token = res?.data?.login_token;

        if (!user || !token) {
          throw new Error('Invalid Google login response structure');
        }

        this.setSession(user, token);
      }),
      tap(() => {})
    );
  }

  register(data: any): Observable<User> {
    return this.api.post<any>(`${this.baseUrl}/register`, data).pipe(
      map(res => {
        this.setSession(res.data, res.data.login_token);
        return res.data;
      })
    );
  }

  logout(): void {
    this.storage.remove('user');
    this.storage.remove('token');
    this.userSubject.next(null);
  }

  // ------------------------
  // STATE (SSR SAFE)
  // ------------------------
  getToken(): string | null {
    return this.storage.get('token');
  }

  isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  changePassword(data: { current_password: string; new_password: string }): Observable<void> {
    const token = this.getToken();
    return this.api.post(`${this.baseUrl}/change-password`, data, token || '').pipe(
      map(() => {}) // return void
    );
  }

  async updateProfile(data: any): Promise<any> {
    try {

      const token = localStorage.getItem('token');
      const response: any = await firstValueFrom(
        this.api.post(
          `${this.baseUrl}/update-profile`,
          data,
          token || ''
        )
      );
      console.log('Update profile response:', response.data);
      // VALID RESPONSE CHECK
      if (response && response.data) {

        // KEEP EXISTING TOKEN
        const currentToken =
          response.data.token || token;

        this.setSession(
          response.data,
          currentToken || ''
        );

      }
      return response;

    } catch (error: any) {

      console.error('Profile update failed:', error);

      return {
        success: false,
        message:
          error?.error?.message ||
          'Profile update failed',
        errors:
          error?.error?.errors || null
      };

    }
  }
}
