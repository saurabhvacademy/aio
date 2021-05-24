import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchListComponent } from '../sharedComponents/search-list/search-list.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,FormsModule
  ],
  declarations: [SearchListComponent],
  exports: [SearchListComponent]
})
export class SearchListModule { }
