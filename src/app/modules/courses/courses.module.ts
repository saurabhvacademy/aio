import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TrimdataModule } from './../../componentHost/trimdata.module';
//import {CoursesComponent} from './courses.component';
// import {CoursedetailsComponent} from './coursedetails/coursedetails.component';
// import {CoursereferenceComponent} from './../../sharedComponents/coursereference/coursereference.component';
import { SuggestedpagesModule } from './../../sharedComponents/suggestedpages/suggestedpages.module';
//import {VideoplayerComponent} from './../../sharedComponents/videoplayer/videoplayer.component';
//import {videoslistComponent} from './../../sharedComponents/videoslist/videoslist.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
//import {TestpageComponent} from './../test/testpage/testpage.component';
import { CapitalizeModule } from './../../componentHost/capitalize.module';
import { ConfirmationpopupModule } from './../../componentHost/confirmationpopup.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { HeaderModule } from './../../sharedComponents/header/header.module';
import { ShowanswerpipeModule } from './../../componentHost/showanswerpipe.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { CourseDetailModule } from './../course-details/course-details.module';
//import {AddcourseComponent} from './../addcourse/addcourse.component';
// import {CourseRoutingModule} from './course-routing.module';
// import {CoursereferenceComponent} from './../../sharedComponents/coursereference/coursereference.component';

//import {AddcourseModule} from './../../modules/addcourse/addcourse.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};




@NgModule({
    imports: [
        CommonModule, FormsModule, CapitalizeModule, CarouselModule, SuggestedpagesModule, HeaderModule, CourseDetailModule,
        InfiniteScrollModule, RouterModule, ConfirmationpopupModule, ShowanswerpipeModule, PerfectScrollbarModule, TrimdataModule,
    ],
    declarations: [
        //        AddcourseComponent,
    ],

    // exports: [CoursesComponent],
    providers: [{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }]
})
export class CoursesModule {

















}
