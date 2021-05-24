import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {InboxComponent} from './inbox.component';
import {InboxRoutingModule} from './inbox-routing.module';
import {CapitalizeModule} from './../../componentHost/capitalize.module';
import {TrimdataModule} from './../../componentHost/trimdata.module';
import {DateviewModule} from './../../componentHost/dateview.module';
import {TimeformatedModule} from './../../componentHost/timeformated.module';


import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {HeaderModule} from './../../sharedComponents/header/header.module';
import {ConfirmationpopupModule} from './../../componentHost/confirmationpopup.module';
import {MessageselfviewComponent} from './../inbox/messageselfview/messageselfview.component';
import {MessageotherviewComponent} from './../inbox/messageotherview/messageotherview.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {MmenuModule} from './../../sharedComponents/mmenu/mmenu.module';
import {MnavbarModule} from './../../sharedComponents/mnavbar/mnavbar.module';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
    imports: [
        CommonModule, CapitalizeModule, TrimdataModule, DateviewModule, InfiniteScrollModule,HeaderModule,
        InboxRoutingModule, TimeformatedModule,MmenuModule,MnavbarModule,
        FormsModule,ConfirmationpopupModule,PerfectScrollbarModule
    ],

    declarations: [InboxComponent,MessageotherviewComponent,MessageselfviewComponent],
    entryComponents:[MessageselfviewComponent,MessageotherviewComponent],
    providers:[{
          provide: PERFECT_SCROLLBAR_CONFIG,
          useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }]
})
export class InboxModule {}
