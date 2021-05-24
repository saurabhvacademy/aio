import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MessageComponent} from './message.component';
import {MessagesRoutingModule} from './messages-routing.module';
import {CapitalizeModule} from './../../../componentHost/capitalize.module';
import {TrimdataModule} from './../../../componentHost/trimdata.module';
import {DateviewModule} from './../../../componentHost/dateview.module';
import {TimeformatedModule} from './../../../componentHost/timeformated.module';


import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {HeaderModule} from './../../../sharedComponents/header/header.module';
import {ConfirmationpopupModule} from './../../../componentHost/confirmationpopup.module';
import {PagemessageovComponent} from './../message/pagemessageov/pagemessageov.component';
import {PagemessagesvComponent} from './../message/pagemessagesv/pagemessagesv.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
    imports: [
        CommonModule, CapitalizeModule, TrimdataModule, DateviewModule, InfiniteScrollModule,HeaderModule,
        MessagesRoutingModule, TimeformatedModule,
        FormsModule,ConfirmationpopupModule,PerfectScrollbarModule
    ],

    declarations: [MessageComponent,PagemessageovComponent,PagemessagesvComponent],
    entryComponents:[PagemessageovComponent,PagemessagesvComponent],
    providers:[{
          provide: PERFECT_SCROLLBAR_CONFIG,
          useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }]
})
export class MessagesModule { }
