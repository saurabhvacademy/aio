import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CapitalizePipe} from './../services/capitalize.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CapitalizePipe],
  exports: [CapitalizePipe]
})
export class CapitalizeModule { }
