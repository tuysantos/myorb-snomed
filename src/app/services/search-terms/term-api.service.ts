import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, EMPTY, Observable, tap } from "rxjs";
import { environment } from "../../../environments/environment";
import { MyOrbItemResulPage } from "../../models/result-page";
import { MyOrbTerm } from "../../models/term";
import { NotificationService } from "../notification/notification.service";

@Injectable({
    providedIn: 'root'
})
export class TermApiService {

    userStatus$ = new BehaviorSubject<MyOrbTerm | null>(null);
    isLoading$ = new BehaviorSubject<boolean>(false);
    private url: string;
    private baseFilter = 'sematicTags=procedure&active=true&conceptActive=true&lang=english&limit=200&offset=0&groupByConcept=true';

    constructor(
        private http: HttpClient,
        private notification: NotificationService
    ) {
        this.url = `${environment.apiBaseUrl}/descriptions?`;
    }

    searchTerm(term: string, filters?: string): Observable<MyOrbItemResulPage> {
        const filtersQuery = filters ? filters : this.baseFilter;

        return this.http.get<MyOrbItemResulPage>(`${this.url}term=${term}&${filtersQuery}`).pipe(
            tap({
                error: (err) => {
                    this.notification.error(err.error.message);
                    this.isLoading$.next(false);
                }
            }),
            catchError(() => EMPTY)
          );
    }

    setTerm(term: MyOrbTerm | null) {
        this.userStatus$.next(term);
    }
}