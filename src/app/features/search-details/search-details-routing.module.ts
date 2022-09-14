import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyOrbSearchDetailComponent } from './search-details.component';

const routes: Routes = [
  {
    path: '',
    component: MyOrbSearchDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyOrbSearchDetailsRoutingModule {}