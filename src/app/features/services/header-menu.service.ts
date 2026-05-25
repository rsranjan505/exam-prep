import { Injectable, inject, signal } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, finalize, of, tap } from 'rxjs'
import { MenuItem } from 'src/app/core/models/menu.model'
import { environment } from 'src/environments/environment'



@Injectable({
    providedIn: 'root',
})
export class HeaderMenuService {

    private http = inject(HttpClient)

    /**
     * GLOBAL STATE
     */
    menus = signal<MenuItem[]>([])
    loading = signal<boolean>(false)
    loaded = signal<boolean>(false)

    /**
     * API URL
     */
    private apiUrl = environment.apiBaseUrl + '/getExamTypes'

    /**
     * LOAD MENUS
     */
    loadMenus(forceRefresh: boolean = false): void {

        /**
         * Prevent unnecessary API calls
         */
        if (this.loaded() && !forceRefresh) {
            return
        }

        this.loading.set(true)

        this.http.get<any>(this.apiUrl)
            .pipe(

                tap((response) => {

                    /**
                     * Defensive check
                     */
                    if (Array.isArray(response.data)) {
                        this.menus.set(response.data)
                    } else {
                        this.menus.set([])
                    }

                    this.loaded.set(true)
                }),

                catchError((error) => {

                    console.error('Header menu API error:', error)

                    this.menus.set([])

                    return of([])
                }),

                finalize(() => {
                    this.loading.set(false)
                })
            )
            .subscribe()
    }

    /**
     * GET MENUS
     */
    getMenus() {
        return this.menus
    }

    /**
     * CLEAR CACHE
     */
    clearMenus(): void {
        this.menus.set([])
        this.loaded.set(false)
    }
}
