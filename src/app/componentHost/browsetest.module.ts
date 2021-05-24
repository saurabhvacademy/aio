import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowsetestComponent } from '../sharedComponents/browsetest/browsetest.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BrowsetestComponent],
  exports: [BrowsetestComponent]
})
export class BrowseTestModule { }
