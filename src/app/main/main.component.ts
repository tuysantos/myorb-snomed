import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'my-orb-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MyOrbMainComponent {

    constructor(
        private router: Router,
    ) {}

    searchTerm() {
        this.router.navigate(['search']);
    }
}