import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InterestpopupComponent} from './interestpopup.component';
import {ConfirmationpopupModule} from './../../componentHost/confirmationpopup.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};





@NgModule({
    imports: [
        CommonModule,ConfirmationpopupModule,PerfectScrollbarModule

    ],
    declarations: [InterestpopupComponent],
    exports: [InterestpopupComponent],
    providers:[{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
      }]
})
export class InterestpopupModule {}
