import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PageprofileComponent} from './pageprofile.component';
import {PagefeedsComponent} from './../pagefeeds/pagefeeds.component';
import {PageaboutComponent} from './../pageabout/pageabout.component';
import {PagereviewsComponent} from './../pagereviews/pagereviews.component';
import {PageanalyticsComponent} from './../pageanalytics/pageanalytics.component';
import {PagenotificationComponent} from './../pagenotification/pagenotification.component';
import {PageaboutwidgetComponent} from './../pageaboutwidget/pageaboutwidget.component';
import {ReviewswidgetComponent} from './../reviewswidget/reviewswidget.component';
import {ReviewslistComponent} from './../reviewslist/reviewslist.component';
import {PageRoutingModule} from './page-routing.module';
import {AddpostModule} from './../../../sharedComponents/addpost/addpost.module';
import {HeaderModule} from './../../../sharedComponents/header/header.module';
import {CapitalizeModule} from './../../../componentHost/capitalize.module';
import {TrimdataModule} from './../../../componentHost/trimdata.module';
import {SafepipeModule} from './../../../componentHost/safepipe.module';
import {ConfirmationpopupModule} from './../../../componentHost/confirmationpopup.module';
import {PostotherviewModule} from './../../../componentHost/postotherview.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {AddreviewsComponent} from './../addreviews/addreviews.component';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import {InvitefriendsComponent} from './../invitefriends/invitefriends.component';
import {PageInfoComponent} from './../page-info/page-info.component';
import {PageReportPopupComponent} from './../page-report-popup/page-report-popup.component';
import {TrendingpageComponent} from './../../trendingpage/trendingpage.component';
import {ReviewleftmenuComponent} from './../reviewleftmenu/reviewleftmenu.component';
import {InvitefriendwidgetComponent} from './../invitefriendwidget/invitefriendwidget.component';
import {InvitewidgetComponent} from './../invitewidget/invitewidget.component';
import {PhotoComponent} from './../photo/photo.component';
import {ClaimpageComponent} from './../pageprofile/claimpage/claimpage.component';
import {SuggestedpagesModule} from './../../../sharedComponents/suggestedpages/suggestedpages.module';
import {ReviewsratingsComponent} from './../reviewsratings/reviewsratings.component';
import {TimeformatedModule} from './../../../componentHost/timeformated.module';
import {UserreviewComponent} from './../pagereviews/userreview/userreview.component';
import {CourselistComponent} from './../../../sharedComponents/courselist/courselist.component';
//import {CoursewidgetComponent} from './../../../sharedComponents/coursewidget/coursewidget.component';
import {PagementorwidgetComponent} from './../../../sharedComponents/pagementorwidget/pagementorwidget.component';
import {ReviewCommentComponent} from './../pagereviews/review-comment/review-comment.component';
import {AccountprogressComponent} from './../accountprogress/accountprogress.component';
import {LikeshareviewallModule} from './../../../sharedComponents/postComponents/likeshareviewall/likeshareviewall.module';
import {ImagecropperModule} from './../../imgcropper/imagecropper.module';
import {LoginpopupModule} from './../../../sharedComponents/loginpopup/loginpopup.module';
import { CreatecoursewidgetComponent } from './../../../sharedComponents/createcoursewidget/createcoursewidget.component';
import {RegisterinviteComponent} from './../../../sharedComponents/registerinvite/registerinvite.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {LoginheaderModule} from './../../../sharedComponents/loginheader/loginheader.module';
// import {CoursesModule} from './../../courses/courses.module';
import {CoursesComponent} from './../../courses/courses.component';
import { GallerywidgetComponent } from './../gallerywidget/gallerywidget.component';
import {AnalyticsModule} from './../../analytics/analytics.module';
import { UpcominglivestreamsComponent } from './../upcominglivestreams/upcominglivestreams.component';
import { MentormanagerComponent } from './../mentormanager/mentormanager.component';
import { CoursesliderComponent } from './../courseslider/courseslider.component';
import { SildecoursewidgetComponent } from './../sildecoursewidget/sildecoursewidget.component';
import { MobilenoModule } from '../../login/mobileno/mobileno.module';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  // suppressScrollX: true
};


@NgModule({
    imports: [
        CommonModule, CapitalizeModule, AddpostModule,TrimdataModule,SuggestedpagesModule,LoginpopupModule,AnalyticsModule,
        PageRoutingModule, HeaderModule,ConfirmationpopupModule,InfiniteScrollModule,TimeformatedModule,PostotherviewModule,
        FormsModule,CarouselModule,LikeshareviewallModule, ImagecropperModule, PerfectScrollbarModule,SafepipeModule,LoginheaderModule,MobilenoModule
    ],
    declarations: [
        PageprofileComponent, PageaboutwidgetComponent, ReviewslistComponent, PagefeedsComponent, PageaboutComponent,CoursesComponent,
        PagereviewsComponent,PageanalyticsComponent,PagenotificationComponent,ReviewswidgetComponent,
        AddreviewsComponent,InvitefriendsComponent,PageInfoComponent,PageReportPopupComponent,InvitefriendwidgetComponent,
        InvitewidgetComponent, PhotoComponent, ClaimpageComponent,AccountprogressComponent,
        ReviewsratingsComponent,ReviewCommentComponent,UserreviewComponent, ReviewleftmenuComponent,
        TrendingpageComponent, CourselistComponent,GallerywidgetComponent,CoursesliderComponent,SildecoursewidgetComponent,
        PagementorwidgetComponent,RegisterinviteComponent, CreatecoursewidgetComponent,UpcominglivestreamsComponent,MentormanagerComponent,
    ],

    entryComponents:[ReviewCommentComponent,UserreviewComponent],
    providers:[{
          provide: PERFECT_SCROLLBAR_CONFIG,
          useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }]

})
export class PageModule {}
