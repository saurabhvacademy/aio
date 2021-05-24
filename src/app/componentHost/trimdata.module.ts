import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TrimdataPipe} from './../services/trimdata.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TrimdataPipe],
  exports: [TrimdataPipe]
})
export class TrimdataModule { }
