import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterestRoutingModule } from './interest-routing.module';
import { InterestComponent } from './interest.component';
import { HeaderModule } from './../../sharedComponents/header/header.module';
import { ConfirmationpopupModule } from './../../componentHost/confirmationpopup.module';
import { LeftmenuModule } from './../../sharedComponents/leftmenu/leftmenu.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { CreatepageModule } from './../../modules/page/createpage/createpage.module';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  imports: [
    CommonModule, ConfirmationpopupModule,
    InterestRoutingModule, HeaderModule, LeftmenuModule, PerfectScrollbarModule, CreatepageModule
  ],

  declarations: [InterestComponent],
  providers: [{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }],
  exports: [InterestComponent]
})
export class InterestModule { }
