import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { MyOrbSearchTermRoutingModule } from './search-term-routing.module';
import { MyOrbSearchTermComponent } from './search-term.component';


@NgModule({
  imports: [
    CommonModule,
    MyOrbSearchTermRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  declarations: [MyOrbSearchTermComponent],
})
export class MyOrbSearchTermModule {}