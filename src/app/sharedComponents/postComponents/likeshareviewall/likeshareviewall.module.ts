import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {LikeshareviewallComponent} from './likeshareviewall.component';

import {TrimdataModule} from './../../../componentHost/trimdata.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};



@NgModule({
  imports: [
    CommonModule,RouterModule,
    InfiniteScrollModule,TrimdataModule,
    PerfectScrollbarModule
  ],

  declarations: [LikeshareviewallComponent],
  exports: [LikeshareviewallComponent],
  providers:[{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
      }]
})
export class LikeshareviewallModule { }
