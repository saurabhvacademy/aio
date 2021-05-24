import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShortNumberPipe} from './../services/short-number.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ShortNumberPipe],
  exports: [ShortNumberPipe]
})
export class shortnumber { }
