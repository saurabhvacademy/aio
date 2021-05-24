import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DateviewPipe} from './../services/dateview.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DateviewPipe],
  exports: [DateviewPipe]
})
export class DateviewModule { }
