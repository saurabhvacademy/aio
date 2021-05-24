import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {WallComponent} from './wall.component';
import {WallRoutingModule} from './wall-routing.module';
import {LeftmenuModule} from './../../sharedComponents/leftmenu/leftmenu.module';
import {AddpostModule} from './../../sharedComponents/addpost/addpost.module';
import {HeaderModule} from './../../sharedComponents/header/header.module';
import {PeopleyouknowModule} from './../../sharedComponents/peopleyouknow/peopleyouknow.module';
import {ConfirmationpopupModule} from './../../componentHost/confirmationpopup.module';
import {CreatepageModule} from './../../modules/page/createpage/createpage.module';
import {AboutadminComponent} from './../../sharedComponents/aboutadmin/aboutadmin.component';
import {SafepipeModule} from './../../componentHost/safepipe.module';
import {ShowanswerpipeModule} from './../../componentHost/showanswerpipe.module';
import {CapitalizeModule} from './../../componentHost/capitalize.module';
import {TrimdataModule} from './../../componentHost/trimdata.module';
import {DateviewModule} from './../../componentHost/dateview.module';
import {TimeformatedModule} from './../../componentHost/timeformated.module';
import {InviteviamailModule} from './../../sharedComponents/inviteviamail/inviteviamail.module';
import { LoginpopupModule } from './../../sharedComponents/loginpopup/loginpopup.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {CreatefolderModule} from './../../modules/saved/createfolder/createfolder.module';
import {ConnectionrequestModule} from './../../sharedComponents/connectionrequest/connectionrequest.module';
import {SocialinviteModule} from './../../sharedComponents/socialinvite/socialinvite.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import {MmenuModule} from './../../sharedComponents/mmenu/mmenu.module';
import {MnavbarModule} from './../../sharedComponents/mnavbar/mnavbar.module';
// import { PostotherviewModule } from './../../sharedComponents/postComponents/postotherview/postotherview.module';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { InviteLiveStreamsComponent } from './invite-live-streams/invite-live-streams.component';
import { UpcomingclassesComponent } from './upcomingclasses/upcomingclasses.component';
import { LeaderboardModule } from '../leaderboard/leaderboard.module';
import { PointSystemModule } from '../point-system/point-system.module';
import { QuestionforyouModule } from '../questionforyou/questionforyou.module';
import { SavedModule } from '../saved/saved.module';
import { InterestModule } from '../interest/interest.module';
import { LiveClassesModule } from '../live-classes/live-classes.module';
import { WallStateService } from './services/wall-state.service';
import { SuggestedConnectionsComponent } from './suggested-connections/suggested-connections.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SuggestedPagesComponent } from './suggested-pages/suggested-pages.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};





@NgModule({
    imports: [
        CommonModule, InfiniteScrollModule, PeopleyouknowModule, CreatepageModule,ConnectionrequestModule,InviteviamailModule,
        FormsModule, SafepipeModule, AddpostModule, SocialinviteModule,ShowanswerpipeModule,MmenuModule,MnavbarModule,
        WallRoutingModule, TimeformatedModule, ConfirmationpopupModule, LeftmenuModule, CreatefolderModule,
        HeaderModule, CapitalizeModule, TrimdataModule, DateviewModule,PerfectScrollbarModule,LoginpopupModule,PointSystemModule,QuestionforyouModule,SavedModule,InterestModule,LiveClassesModule, SlickCarouselModule
        // ,PostotherviewModule
    ],


    entryComponents: [],
    declarations: [
        WallComponent,
        AboutadminComponent,
        InviteLiveStreamsComponent,
        UpcomingclassesComponent,
        SuggestedConnectionsComponent,
        SuggestedPagesComponent
    ],
    providers:[{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
      },
      WallStateService]
})
export class WallModule {}
