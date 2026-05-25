import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError  } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http = inject(HttpClient);

  get<T>(url: string, token?: string): Observable<T> {
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.get<T>(url, { headers }).pipe(
      tap(res => console.log('API RESPONSE:', res)), // ✅ NOW it works
      catchError(this.handleError)
    );
  }

  post<T>(url: string, body: any, token?: string): Observable<T> {
    let headers = new HttpHeaders({
      // 'Content-Type': 'application/json', // optional if your API needs it
    });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.post<T>(url, body, { headers }).pipe(catchError(this.handleError));
  }

  delete<T>(url: string, token?: string): Observable<T> {
    let headers = new HttpHeaders({
      // 'Content-Type': 'application/json', // optional if your API needs it
    });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.delete<T>(url, { headers }).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API error:', error);
    return throwError(() => error);
  }
}
