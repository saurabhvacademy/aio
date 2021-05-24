import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {VerificationpopupComponent} from './verificationpopup.component';
import {VerificationRoutingModule} from './verification-routing.module';
import {ConfirmationpopupModule} from './../../componentHost/confirmationpopup.module';
import {InterestpopupModule} from './../interestpopup/interestpopup.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MobilenoModule } from 'src/app/modules/login/mobileno/mobileno.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};



@NgModule({
    imports: [
        CommonModule, VerificationRoutingModule,FormsModule,
        ConfirmationpopupModule, InterestpopupModule,PerfectScrollbarModule, MobilenoModule
    ],
    declarations: [VerificationpopupComponent],
    providers:[{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
      }]
})
export class VerificationModule {}
