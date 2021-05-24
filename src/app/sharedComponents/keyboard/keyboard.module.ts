import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {KeyboardComponent} from './keyboard.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  imports: [
    CommonModule,PerfectScrollbarModule
  ],
  declarations: [KeyboardComponent],
  exports: [KeyboardComponent],
  providers:[{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
      }]
})
export class KeyboardModule { }
