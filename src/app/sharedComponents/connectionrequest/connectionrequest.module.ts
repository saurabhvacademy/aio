import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {ConnectionrequestComponent} from './connectionrequest.component';
import {TrimdataModule} from './../../componentHost/trimdata.module';


import {ConfirmationpopupModule} from './../../componentHost/confirmationpopup.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};




@NgModule({
  imports: [
    CommonModule,RouterModule,ConfirmationpopupModule,TrimdataModule,PerfectScrollbarModule

  ],
  declarations: [ConnectionrequestComponent],
  exports: [ConnectionrequestComponent],
  providers:[{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
      }]
})
export class ConnectionrequestModule { }
