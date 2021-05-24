import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {walletRoutingModule} from './checkout-routing.module';
import {PaymentpageComponent} from './paymentpage/paymentpage.component';
import {PaymentreceiptComponent} from './paymentreceipt/paymentreceipt.component';
import {PaymenttransactionComponent} from './paymenttransaction/paymenttransaction.component';
import {PaymentproductdetailComponent} from './paymentproductdetail/paymentproductdetail.component';
import {OrderdetailsComponent} from './orderdetails/orderdetails.component';
import {HeaderModule} from './../../sharedComponents/header/header.module';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ConfirmationpopupModule} from './../../componentHost/confirmationpopup.module';
import {FormsModule} from '@angular/forms';
import { MobilenoModule } from '../login/mobileno/mobileno.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
  imports: [
   MobilenoModule, CommonModule,walletRoutingModule,HeaderModule,InfiniteScrollModule,PerfectScrollbarModule,ConfirmationpopupModule,FormsModule
  ],
  declarations: [PaymentpageComponent,OrderdetailsComponent,PaymentreceiptComponent,PaymenttransactionComponent,PaymentproductdetailComponent],
  providers: [{
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }]
})
export class CheckoutModule { }
