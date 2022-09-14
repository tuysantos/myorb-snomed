import { MyOrbTerm } from "../term";

export interface MyOrbItemResulPage {
    totalElements: number;
    totalPages: number;
    items: MyOrbTerm[];
    first: boolean;
    last: boolean;
}