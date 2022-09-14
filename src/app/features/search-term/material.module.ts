import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    MatPaginatorModule, 
    MatSortModule, 
    MatProgressBarModule, 
    MatTableModule, 
    MatIconModule, 
    MatFormFieldModule,
    MatButtonModule,
    MatTooltipModule,
    MatInputModule],
  exports: [MatPaginatorModule, 
    MatSortModule, 
    MatProgressBarModule, 
    MatTableModule, 
    MatIconModule, 
    MatFormFieldModule,
    MatButtonModule,
    MatTooltipModule,
    MatInputModule]
})
export class MaterialModule {}
