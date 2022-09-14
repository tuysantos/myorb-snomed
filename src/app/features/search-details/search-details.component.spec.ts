import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { BehaviorSubject } from "rxjs";
import { MyOrbTerm } from "../../models/term";
import { TermApiService } from "../../services/search-terms/term-api.service";
import { MaterialModule } from "./material.module";
import { MyOrbSearchDetailsRoutingModule } from "./search-details-routing.module";
import { MyOrbSearchDetailComponent } from "./search-details.component";

describe('MyOrbSearchDetailComponent', () => {
    let component: MyOrbSearchDetailComponent;
    let fixture: ComponentFixture<MyOrbSearchDetailComponent>;
    let service: TermApiService;
    let router: Router;
    
    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [MyOrbSearchDetailComponent],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                MaterialModule,
                MatSnackBarModule,
                MyOrbSearchDetailsRoutingModule
            ],
            providers: [
                TermApiService
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MyOrbSearchDetailComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(TermApiService);
        fixture.detectChanges();
    });

    it('shoould create', () => {
        expect(component).toBeTruthy()
    });

    it('should set term data', () => {
        const obj: MyOrbTerm = {
            term: 'my term',
            active: true,
            concept: {id: 1}
        };

        service.userStatus$ = new BehaviorSubject<MyOrbTerm | null>(obj);

        component.ngOnInit();

        expect(component.termData).toEqual(obj);
    });

    it('should go back', () => {
        router = TestBed.inject(Router);
        spyOn(service, 'setTerm').and.callThrough();
        spyOn(router, 'navigate').and.callFake(() => {
            return new Promise((resolve) => resolve(true))
        });

        component.goBack();

        expect(service.setTerm).toHaveBeenCalledOnceWith(null);
        expect(router.navigate).toHaveBeenCalledWith(['search']);
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