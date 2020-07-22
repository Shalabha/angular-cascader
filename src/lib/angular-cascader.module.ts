import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AngularCasacaderComponent } from './angular-cascader.component';
import { FilterPipe } from './filter.pipe';
import { ListFilterComponent } from './list-filter/list-filter.component';

@NgModule({
  declarations: [AngularCasacaderComponent, FilterPipe, ListFilterComponent],
  imports: [CommonModule,
    FormsModule],
  exports: [AngularCasacaderComponent, FilterPipe, ListFilterComponent]
})
export class AngularCasacaderModule { }
