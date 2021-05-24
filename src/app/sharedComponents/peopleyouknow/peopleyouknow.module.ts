import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {PeopleyouknowComponent} from './peopleyouknow.component'


import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ConfirmationpopupModule} from './../../componentHost/confirmationpopup.module';
import {CapitalizeModule} from './../../componentHost/capitalize.module';
import {TrimdataModule} from './../../componentHost/trimdata.module';
import {DateviewModule} from './../../componentHost/dateview.module';
import {TimeformatedModule} from './../../componentHost/timeformated.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};




@NgModule({
  imports: [
    CommonModule,ConfirmationpopupModule,CapitalizeModule,TrimdataModule,DateviewModule,RouterModule,
    InfiniteScrollModule,TimeformatedModule, PerfectScrollbarModule
  ],
  declarations: [PeopleyouknowComponent],
  exports: [PeopleyouknowComponent],
  providers:[{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
      }]
})
export class PeopleyouknowModule { }
