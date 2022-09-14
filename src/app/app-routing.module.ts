import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyOrbMainComponent } from './main/main.component';

const routes: Routes = [
    {
        path: 'search',
        loadChildren: () => import('../app/features/search-term').then((m) => m.MyOrbSearchTermModule)
    },
    {
        path: 'search-details',
        loadChildren: () => import('../app/features/search-details').then((m) => m.MyOrbSearchDetailsModule)
    },
    {
        path: 'main',
        component: MyOrbMainComponent
    },
    {
        path: '', 
        component: MyOrbMainComponent
    },
    {
        path: '**',
        redirectTo: 'main',
        pathMatch: 'full'
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
