import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyOrbSearchTermComponent } from './search-term.component';


const routes: Routes = [
  {
    path: '',
    component: MyOrbSearchTermComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyOrbSearchTermRoutingModule {}