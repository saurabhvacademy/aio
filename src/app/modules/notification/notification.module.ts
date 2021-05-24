import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HeaderModule} from './../../sharedComponents/header/header.module';
import {PeopleyouknowModule} from './../../sharedComponents/peopleyouknow/peopleyouknow.module';
import {LeftmenuModule} from './../../sharedComponents/leftmenu/leftmenu.module';
import {NotificationComponent} from './notification.component';
import {NotificationRoutingModule} from './notification-routing.module';
import {ConnectionrequestModule} from './../../sharedComponents/connectionrequest/connectionrequest.module';
import {CreatepageModule} from './../../modules/page/createpage/createpage.module';
import {MmenuModule} from './../../sharedComponents/mmenu/mmenu.module';
import {MnavbarModule} from './../../sharedComponents/mnavbar/mnavbar.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ConfirmationpopupModule} from './../../componentHost/confirmationpopup.module';
import {TimeformatedModule} from './../../componentHost/timeformated.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};




@NgModule({
    imports: [
        CommonModule, NotificationRoutingModule, HeaderModule,MmenuModule,MnavbarModule,
        RouterModule, PeopleyouknowModule, LeftmenuModule, ConnectionrequestModule, ConfirmationpopupModule,
        InfiniteScrollModule, TimeformatedModule, PerfectScrollbarModule,CreatepageModule
    ],

    declarations: [NotificationComponent],
    providers:[{
          provide: PERFECT_SCROLLBAR_CONFIG,
          useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }]
})
export class NotificationModule {}
