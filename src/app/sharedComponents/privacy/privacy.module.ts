import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrivacyComponent} from './privacy.component';
import {PrivacyRoutingModule} from './privacy-routing.module';
import {HeaderModule} from './../header/header.module';
import {ConfirmationpopupModule} from './../../componentHost/confirmationpopup.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  imports: [
    CommonModule,PrivacyRoutingModule, ConfirmationpopupModule,HeaderModule,PerfectScrollbarModule
  ],
  declarations: [PrivacyComponent],
  providers:[{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
      }]
})
export class PrivacyModule { }
