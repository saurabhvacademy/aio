import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShowSelecteAnswerPipe} from './../services/show-selecte-answer.pipe'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ShowSelecteAnswerPipe],
  exports: [ShowSelecteAnswerPipe],
})
export class ShowanswerpipeModule { }
