import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { MyOrbSearchDetailsRoutingModule } from './search-details-routing.module';
import { MyOrbSearchDetailComponent } from './search-details.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MyOrbSearchDetailsRoutingModule
  ],
  exports: [MyOrbSearchDetailComponent],
  declarations: [MyOrbSearchDetailComponent],
})
export class MyOrbSearchDetailsModule {}