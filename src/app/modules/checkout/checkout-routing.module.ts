import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {PaymentpageComponent} from './paymentpage/paymentpage.component';
import {PaymentreceiptComponent} from './paymentreceipt/paymentreceipt.component';
import {PaymenttransactionComponent} from './paymenttransaction/paymenttransaction.component';
import {PaymentproductdetailComponent} from './paymentproductdetail/paymentproductdetail.component';
import {OrderdetailsComponent} from './orderdetails/orderdetails.component';
const routes: Routes = [
    {
        path: '',
        component: PaymentpageComponent
    },

    {
        path: '/:id',
        component: PaymentpageComponent
    },

    {
        path: 'receipt/:id',
        component: PaymentproductdetailComponent
    },
    // {
    //     path: 'paymenttransaction',
    //     component: PaymenttransactionComponent
    // },
    {
        path: 'status',
        component: PaymentproductdetailComponent
    },

    {
        path: 'status/:id',
        component: PaymentproductdetailComponent
    },

    {
        path: 'orderdetails',
        component: OrderdetailsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class walletRoutingModule {}
