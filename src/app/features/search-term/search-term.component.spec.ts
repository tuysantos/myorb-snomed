import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { MyOrbItemResulPage } from "../../models/result-page";
import { MyOrbTerm } from "../../models/term";
import { NotificationService } from "../../services/notification/notification.service";
import { TermApiService } from "../../services/search-terms/term-api.service";
import { MaterialModule } from "./material.module";
import { MyOrbSearchTermRoutingModule } from "./search-term-routing.module";
import { MyOrbSearchTermComponent } from "./search-term.component";

describe('MyOrbSearchTermComponent', () => {
    let component: MyOrbSearchTermComponent;
    let fixture: ComponentFixture<MyOrbSearchTermComponent>;
    let notification: NotificationService;
    let service: TermApiService;
    let router: Router;

    const termsMock: MyOrbTerm[] = [
        {
            term: 'term 1',
            active: true,
            concept: {id: 1}
        },
        {
            term: 'term 2',
            active: true,
            concept: {id: 2}
        }
    ];

    const resultPage: MyOrbItemResulPage = {
        totalElements: 2,
        totalPages: 1,
        items: termsMock,
        first: true,
        last: false
    }
    
    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [MyOrbSearchTermComponent],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                MaterialModule,
                MatSnackBarModule,
                BrowserAnimationsModule,
                MyOrbSearchTermRoutingModule,
                ReactiveFormsModule,
            ],
            providers: [
                FormBuilder,
                NotificationService,
                TermApiService
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MyOrbSearchTermComponent);
        component = fixture.componentInstance;
        notification = TestBed.inject(NotificationService);
        service = TestBed.inject(TermApiService);
        fixture.detectChanges();
    });

    it('shoould create', () => {
        expect(component).toBeTruthy()
    });

    it('should set term data', () => {
        component.searchForm =  new FormGroup({
            term: new FormControl('my test', [Validators.required]),
          });

        component.isLoading = false;
        service.isLoading$.next(true);

        expect(component.isLoading).toEqual(true);
        expect(component.searchForm.valid).toEqual(true);
    });

    it('should cancel search', () => {
        component.isLoading = true;
        component.totalRecords = 4;
        component.searchExecuted = true;

        component.cancelSearch();

        expect(component.isLoading).toEqual(false);
        expect(component.totalRecords).toEqual(0);
        expect(component.searchExecuted).toEqual(false);
    });

    it('should buildResulList', () => {
        component.dataAreaList = [];
        component.totalRecords = 0;

        component.buildResulList(resultPage);

        expect(component.dataAreaList.length).toEqual(2);
        expect(component.totalRecords).toEqual(2);
    });

    it('should loud errors', () => {
        const result = component.loadErrors();

        expect(result['term']).toBeTruthy();
        expect(result['term'].length).toEqual(3);
        expect(result['term'][0].type).toEqual('required');
    });

    it('should edit term', () => {
        router = TestBed.inject(Router);
        spyOn(router, 'navigate').and.callFake(() => {
            return new Promise((resolve) => resolve(true))
        })
        spyOn(service, 'setTerm').and.callThrough();
        component.buildResulList(resultPage);
        const term: MyOrbTerm = resultPage.items[1];

        component.editTerm(2);

        expect(service.setTerm).toHaveBeenCalledOnceWith(term);
        expect(router.navigate).toHaveBeenCalledWith(['search-details']);
    });

    it('should not edit term', () => {
        router = TestBed.inject(Router);
        spyOn(service, 'setTerm').and.callThrough();
        spyOn(notification, 'error').and.callThrough();
        spyOn(router, 'navigate').and.callFake(() => {
            return new Promise((resolve) => resolve(true))
        });

        component.buildResulList(resultPage);
        const term: MyOrbTerm = {
            term: 'term 3',
            active: true,
            concept: {id: 3}
        };

        component.editTerm(3);

        expect(service.setTerm).not.toHaveBeenCalledOnceWith(term);
        expect(notification.error).toHaveBeenCalledWith('Invalid term');
    });

    it('should go to main', () => {
        router = TestBed.inject(Router);
        spyOn(router, 'navigate').and.callFake(() => {
            return new Promise((resolve) => resolve(true))
        });

        component.goToMain();
        expect(router.navigate).toHaveBeenCalledWith(['main']);
    });
});
