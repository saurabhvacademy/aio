import {NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ProfileComponent} from './profile.component';
import {ProfileRoutingModule} from './profile-routing.module';
import {ConnectionlistComponent} from './connectionlist/connectionlist.component';
import {AboutComponent} from './about/about.component';
import {LikedpagesComponent} from './likedpages/likedpages.component';
import {MypagesComponent} from './mypages/mypages.component';
import {AboutprofileComponent} from './aboutprofile/aboutprofile.component';
import {FriendsComponent} from './friends/friends.component';
import {MypagewallComponent} from './mypagewall/mypagewall.component';
import {ProfilefilterComponent} from './profilefilter/profilefilter.component';

import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ConfirmationpopupModule} from './../../componentHost/confirmationpopup.module'
import {HeaderModule} from './../../sharedComponents/header/header.module';
import {AddpostModule} from './../../sharedComponents/addpost/addpost.module';
import {PostotherviewModule} from './../../componentHost/postotherview.module';
import {PeopleyouknowModule} from './../../sharedComponents/peopleyouknow/peopleyouknow.module';
import {CapitalizeModule} from './../../componentHost/capitalize.module';
import {TrimdataModule} from './../../componentHost/trimdata.module';
import {DateviewModule} from './../../componentHost/dateview.module';
import {TimeformatedModule} from './../../componentHost/timeformated.module';
import {CreatepageModule} from './../../modules/page/createpage/createpage.module';
import {SocialinviteModule} from './../../sharedComponents/socialinvite/socialinvite.module';
import {ImagecropperModule} from './../imgcropper/imagecropper.module';
import {MycoursesComponent} from './../mycourses/mycourses.component';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {MysuggestedpagesComponent} from './mysuggestedpages/mysuggestedpages.component';
import {LinkloginpopupComponent} from './../login/linkloginpopup/linkloginpopup.component';
import {LoginpopupModule} from './../../sharedComponents/loginpopup/loginpopup.module';
import {MmenuModule} from './../../sharedComponents/mmenu/mmenu.module';
import {MnavbarModule} from './../../sharedComponents/mnavbar/mnavbar.module';
import {LoginheaderModule} from './../../sharedComponents/loginheader/loginheader.module';
import { CreatecourseandpagewidgetModule} from './../../sharedComponents/createcourseandpagewidget/createcourseandpagewidget.module';
import {InvitestreamsComponent} from './invitestreams/invitestreams.component';
import {filterinvitePipeModule} from './../../componentHost/filterInvitepipe.module';
import { LeaderboardModule } from '../leaderboard/leaderboard.module';
import { ProfileVisitorsModule } from '../profile-visitors/profile-visitors.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};



@NgModule({
    imports: [
        CommonModule, FormsModule, ConfirmationpopupModule, PeopleyouknowModule, CreatepageModule,ImagecropperModule,
        ProfileRoutingModule, RouterModule, InfiniteScrollModule, CapitalizeModule,SocialinviteModule,
         TrimdataModule,PostotherviewModule,MmenuModule,MnavbarModule, CreatecourseandpagewidgetModule,
        HeaderModule, AddpostModule,
         DateviewModule, TimeformatedModule,
          PerfectScrollbarModule,LoginpopupModule,LoginheaderModule,filterinvitePipeModule,LeaderboardModule, ProfileVisitorsModule, SlickCarouselModule
    ],

    declarations: [ProfileComponent, ConnectionlistComponent, AboutComponent,
        AboutprofileComponent, FriendsComponent, MypagewallComponent,
        ProfilefilterComponent, LikedpagesComponent, MypagesComponent, MysuggestedpagesComponent
        , LinkloginpopupComponent, MycoursesComponent, InvitestreamsComponent,
    ],
    providers: [{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },filterinvitePipeModule],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class ProfileModule {}
