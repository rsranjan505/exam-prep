import { Injectable, inject, signal } from '@angular/core'
import { map } from 'rxjs/operators'
import { Observable, of } from 'rxjs'
import { ApiService } from '../api-service'
import { ApiResponse } from 'src/app/core/models/api-response.model'
import { environment } from 'src/environments/environment'
import { Test } from 'src/app/core/models/test.model'


@Injectable({
    providedIn: 'root',
})
export class TestService {

    private api = inject(ApiService)

    /**
     * GLOBAL STATE
     */
    tests = signal<Test[]>([])
    loading = signal<boolean>(false)
    loaded = signal<boolean>(false)

    /**
     * API URL
     */
    private endpoint = environment.apiBaseUrl + '/getTests'

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
}
