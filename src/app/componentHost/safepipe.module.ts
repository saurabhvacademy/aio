import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SafePipe} from './../services/safe.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SafePipe],
  exports: [SafePipe]
})
export class SafepipeModule { }
