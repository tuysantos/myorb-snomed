import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { take } from "rxjs";
import { MyOrbTerm } from "../../models/term";
import { TermApiService } from "../../services/search-terms/term-api.service";

@UntilDestroy()
@Component({
    selector: 'my-orb-search-details',
    templateUrl: './search-details.component.html',
    styleUrls: ['./search-details.component.scss'],
})
export class MyOrbSearchDetailComponent implements OnInit {

    termData!: MyOrbTerm;

    constructor(
        private router: Router,
        private termService: TermApiService,
    ) {}

    ngOnInit() {
        this.termService.userStatus$
            .pipe(take(1), untilDestroyed(this))
            .subscribe((term: MyOrbTerm | null) => {
                if(term) {
                    this.termData = term;
                }
            });
    }

    goBack() {
        this.termService.setTerm(null);
        this.router.navigate(['search']);
    }

    goToMain() {
        this.router.navigate(['main']);
    }
}