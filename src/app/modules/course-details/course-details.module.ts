export class CourseDetailsModule {}
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TrimdataModule} from './../../componentHost/trimdata.module';
import {CourseDetailComponentss} from './course-details.component';
import {PagemapComponent} from './../page/pagemap/pagemap.component';
import {TestreportComponent} from './../../sharedComponents/testreport/testreport.component';
// import {CoursereferenceComponent} from './../../sharedComponents/coursereference/coursereference.component';
import {InvitepageComponent} from './../../sharedComponents/invitepage/invitepage.component';
import {SuggestedpagesModule} from './../../sharedComponents/suggestedpages/suggestedpages.module';
import {VideoplayerComponent} from './../../sharedComponents/videoplayer/videoplayer.component';
import {videoslistComponent} from './../../sharedComponents/videoslist/videoslist.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
//import {TestpageComponent} from './../test/testpage/testpage.component';
import {CapitalizeModule} from './../../componentHost/capitalize.module';
import {ConfirmationpopupModule} from './../../componentHost/confirmationpopup.module';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import {HeaderModule} from './../../sharedComponents/header/header.module';
import {ShowanswerpipeModule} from './../../componentHost/showanswerpipe.module';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {CourseDetailsRoutingModule} from './course-details-routing.module';
import {SharecoursewidgetComponent} from './../../sharedComponents/sharecoursewidget/sharecoursewidget.component';
import {CoursewidgetComponent} from './../../sharedComponents/coursewidget/coursewidget.component';
import {CourseRatingComponent} from './course-rating/course-rating.component';
import {CourseDescriptionComponent} from './course-description/course-description.component';
import {AddpostModule} from './../../sharedComponents/addpost/addpost.module';
import { CoursereviewComponent } from './course-rating/coursereview/coursereview.component';
 import { CoursecomponentComponent } from './course-rating/coursecomponent/coursecomponent.component';
 import {LoginpopupModule} from './../../sharedComponents/loginpopup/loginpopup.module';
import {LoginheaderModule} from './../../sharedComponents/loginheader/loginheader.module';
import {LikeshareviewallModule} from './../../sharedComponents/postComponents/likeshareviewall/likeshareviewall.module';

// import { CoursesubcomponentComponent } from './course-rating/coursesubcomponent/coursesubcomponent.component';
// import {CoursepostComponent} from './../../sharedComponents/postComponents/coursepost/coursepost.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};


@NgModule({
    imports: [
        CommonModule, FormsModule, CapitalizeModule, CarouselModule, SuggestedpagesModule, HeaderModule, CourseDetailsRoutingModule, AddpostModule,
        InfiniteScrollModule, RouterModule, ConfirmationpopupModule, ShowanswerpipeModule, PerfectScrollbarModule, TrimdataModule, LoginpopupModule, LoginheaderModule,LikeshareviewallModule
    ],
    declarations: [CourseDetailComponentss,
        PagemapComponent,InvitepageComponent,CoursewidgetComponent,CoursecomponentComponent,TestreportComponent,
        VideoplayerComponent,videoslistComponent, SharecoursewidgetComponent,CourseDescriptionComponent,CourseRatingComponent, CoursereviewComponent,
      ],
    exports:[SharecoursewidgetComponent],
    entryComponents:[CoursecomponentComponent,CoursereviewComponent],
    providers:[{
          provide: PERFECT_SCROLLBAR_CONFIG,
          useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }]
})
export class CourseDetailModule {}
