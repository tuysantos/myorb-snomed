import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, EMPTY, filter, Observable, switchMap } from "rxjs";
import { MyOrbItemResulPage } from "../../models/result-page";
import { NotificationService } from "../../services/notification/notification.service";
import { TermApiService } from "../../services/search-terms/term-api.service";

export interface DataTable {
  id: number;
  term: string;
}

interface FormDataError {
    [key: string]: FormError[]
}

interface FormError {
    type: string;
    message: string;
}

@UntilDestroy()
@Component({
    selector: 'my-orb-search-term',
    templateUrl: './search-term.component.html',
    styleUrls: ['./search-term.component.scss'],
})
export class MyOrbSearchTermComponent implements OnInit {

    displayedColumns: string[] = ['term', 'id'];

    dataSource!: MatTableDataSource<DataTable>;

    dataAreaList: DataTable[] = [];

    isLoading = false;

    totalRecords = 0;

    searchExecuted = false;

    searchForm : FormGroup = this.fb.group({
        term: new FormControl('',Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
        ]))
    });;

    error_messages!: FormDataError;

    private termList!: MyOrbItemResulPage;

    @ViewChild(MatPaginator, {static: false})
    set paginator(value: any) {
        if (this.dataSource){
            this.dataSource.paginator = value;
        }
    }

    @ViewChild(MatSort, { static: false })
    set sort(value: MatSort) {
        this.dataSource.sort = value;
    }

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private termService: TermApiService,
        private notificationService: NotificationService
        ) {}

    ngOnInit() {
        this.dataSource = new MatTableDataSource(this.dataAreaList);
        this.error_messages = this.loadErrors();
        this.termService.isLoading$
            .pipe(filter(data => !!data), untilDestroyed(this))
            .subscribe((data: boolean) => {
                this.isLoading = data;
            });

        this.searchForm.valueChanges
            .pipe(untilDestroyed(this), debounceTime(300),
            switchMap((search) => {
                this.isLoading = true;
                return this.searchForm.valid ? this.termService.searchTerm(search.term) : this.cancelSearch()}))
            .subscribe((result: MyOrbItemResulPage) => {
                this.buildResulList(result);
            })
    }

    loadErrors(): FormDataError {
        return {
            'term':[
                { type:'required', message: 'This field é mandatório'},
                { type:'minlength', message: 'Min length is 3'},
                { type:'maxlength', message: 'Max length exceed'},
            ],
        }
    }

    cancelSearch(): Observable<never> {
        this.isLoading = false;
        this.dataSource.data = [];
        this.totalRecords = 0;
        this.searchExecuted = false;
        return EMPTY;
    }

    buildResulList(data: MyOrbItemResulPage) {
        this.dataAreaList = [];
        this.termList = data;
        if(data) {
            data.items.forEach(itemTerm => {
                this.dataAreaList.push({
                    id: itemTerm.concept.id,
                    term: itemTerm.term
                });
            })
        } 
        
        this.isLoading = false;
        this.dataSource.data = this.dataAreaList;
        this.totalRecords = this.dataAreaList.length;
        this.searchExecuted = true;
    }

    editTerm(id: number) {
        const term = this.termList.items.find(item => item.concept.id === id);
        if(term !== undefined) {
            this.termService.setTerm(term);
            this.router.navigate(['search-details']);
        } else {
            this.notificationService.error('Invalid term');
        }
    }

    goToMain() {
        this.router.navigate(['main']);
    }
}