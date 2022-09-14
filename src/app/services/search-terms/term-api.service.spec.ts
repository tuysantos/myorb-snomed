import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { environment } from "../../../environments/environment";
import { MyOrbItemResulPage } from "../../models/result-page";
import { MyOrbTerm } from "../../models/term";
import { NotificationService } from "../notification/notification.service";
import { TermApiService } from "./term-api.service";

describe('TermApiService', () => {
    let service: TermApiService;
    let httpMock: HttpTestingController;
    let notification: NotificationService;
    let baseFilter = 'sematicTags=procedure&active=true&conceptActive=true&lang=english&limit=200&offset=0&groupByConcept=true';
    const url = `${environment.apiBaseUrl}/descriptions?`;

    const mockResults: MyOrbItemResulPage = {
        totalElements: 3,
        totalPages: 1,
        items: [
            {
                term: 'term 1',
                active: true,
                concept: {id: 1}
            },
            {
                term: 'term 2',
                active: true,
                concept: {id: 2}
            },
            {
                term: 'term 3',
                active: true,
                concept: {id: 3}
            }
        ],
        first: true,
        last: false
    };

    beforeEach(async () => {
        TestBed.configureTestingModule({
            providers: [TermApiService, NotificationService],
            imports: [HttpClientTestingModule, MatSnackBarModule]
        });
        httpMock = TestBed.inject(HttpTestingController);
        service = TestBed.inject(TermApiService);
        notification = TestBed.inject(NotificationService);
    });

    afterEach(() => {
        httpMock.verify();
    })

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return a list of terms', () => {
        const term = 'my term';
        service.searchTerm(term).subscribe((result: MyOrbItemResulPage) => {
            expect(result).toEqual(mockResults)
        });

        const req = httpMock.expectOne(`${url}term=${term}&${baseFilter}`);
        expect(req.request.method).toEqual('GET');
        req.flush(mockResults);
    });

    it('should set new Term', () => {
        spyOn(service.userStatus$, 'next').and.callThrough();
        const myTerm: MyOrbTerm = {
            term: 'my term',
            active: true,
            concept: {id: 1234}
        }
        service.setTerm(myTerm);
        expect(service.userStatus$.next).toHaveBeenCalled();
    })
});