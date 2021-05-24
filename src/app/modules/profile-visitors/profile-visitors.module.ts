import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { ProfileVisitorsWidgetComponent } from './profile-visitors-widget/profile-visitors-widget.component';
import { ProfileVisitorsPageComponent } from './profile-visitors-page/profile-visitors-page.component';
import { ProfileVisitorsRoutingModule } from './profile-visitors-routing.module';

import {HeaderModule} from './../../sharedComponents/header/header.module';
import {PeopleyouknowModule} from './../../sharedComponents/peopleyouknow/peopleyouknow.module';
import {LeftmenuModule} from './../../sharedComponents/leftmenu/leftmenu.module';
import {ConnectionrequestModule} from './../../sharedComponents/connectionrequest/connectionrequest.module';

import {CreatepageModule} from './../../modules/page/createpage/createpage.module';
import {MmenuModule} from './../../sharedComponents/mmenu/mmenu.module';
import {MnavbarModule} from './../../sharedComponents/mnavbar/mnavbar.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ConfirmationpopupModule} from './../../componentHost/confirmationpopup.module';
import {TimeformatedModule} from './../../componentHost/timeformated.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';


@NgModule({
  declarations: [ProfileVisitorsWidgetComponent, ProfileVisitorsPageComponent],
  imports: [
    CommonModule, FormsModule, ProfileVisitorsRoutingModule, HeaderModule,MmenuModule,MnavbarModule,
    PeopleyouknowModule, LeftmenuModule, ConnectionrequestModule, ConfirmationpopupModule,
    InfiniteScrollModule, TimeformatedModule, PerfectScrollbarModule,CreatepageModule
  ],
  exports:[ProfileVisitorsWidgetComponent]
})
export class ProfileVisitorsModule { }
