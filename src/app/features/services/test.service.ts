import { Injectable, inject, signal } from '@angular/core'
import { map } from 'rxjs/operators'
import { Observable, of } from 'rxjs'
import { ApiService } from '../api-service'
import { ApiResponse } from 'src/app/core/models/api-response.model'
import { environment } from 'src/environments/environment'
import { Test } from 'src/app/core/models/test.model'
import { StorageService } from './storage.service'


@Injectable({
    providedIn: 'root',
})
export class TestService {

  private api = inject(ApiService);
  private storage = inject(StorageService);

  private baseUrl = environment.apiBaseUrl;

    /**
     * GLOBAL STATE
     */
    tests = signal<Test[]>([])
    loading = signal<boolean>(false)
    loaded = signal<boolean>(false)

    getToken(): string | null {
      return this.storage.get('token');
    }

    /**
     * API URL
     */
    private endpoint = this.baseUrl + '/getTests'

    /**
     * FETCH TESTS
     */
    fetchTests(forceRefresh: boolean = false): Observable<Test[]> {

        /**
         * Prevent duplicate API calls
         */
        if (this.loaded() && !forceRefresh) {
            return of(this.tests())
        }

        this.loading.set(true)

        return this.api
            .get<ApiResponse<Test[]>>(this.endpoint)
            .pipe(

                map((response) => {

                    /**
                     * Because your API response is nested badly:
                     * response.data.data
                     */
                    const tests = response?.data || []

                    this.tests.set(tests)

                    this.loaded.set(true)

                    this.loading.set(false)

                    return tests
                })
            )
    }

    /**
     * GET SINGLE TEST
     */
    getTestById(id: number): Test | undefined {
        return this.tests().find(test => test.id === id)
    }

    getTestBySlug(slug: string): Observable<Test>{

      const url  = environment.apiBaseUrl + '/get-test-slag/' + slug
      return this.api
            .get<ApiResponse<Test>>(url)
            .pipe(

                map((response) => {
                    const test = response?.data || []
                    return test
                })
            )
    }

    /**
     * CLEAR CACHE
     */
    clearTests(): void {
        this.tests.set([])
        this.loaded.set(false)
    }



    saveAttemptTest(data: {
        test_id: number;
        score: any;
      }) {
            const token = this.getToken();

            return this.api.post<any>(
              `${this.baseUrl}/submit-attempt`,
              data,
              token || ''
            );

    }
}
