import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddcourseRoutingModule } from './addcourse-routing.module';
import { AddcourseComponent } from './addcourse.component';
import { SelectlibraryComponent } from './selectlibrary/selectlibrary.component';
import { UploadvideoComponent } from './uploadvideo/uploadvideo.component';
import { ConfirmationpopupModule } from './../../componentHost/confirmationpopup.module';
import { HeaderModule } from './../../sharedComponents/header/header.module';
import { CapitalizeModule } from './../../componentHost/capitalize.module';
import { TrimdataModule } from './../../componentHost/trimdata.module';
import { ShowanswerpipeModule } from './../../componentHost/showanswerpipe.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { CoursesModule } from './../courses/courses.module';
import { ImagecroppercpModule } from './../imgcropperCoverPic/imagecroppercp.module';
import { CourseDetailModule } from './../course-details/course-details.module';
import { SafepipeModule } from './../../componentHost/safepipe.module';
import { numbertimes } from './../../services/numbertimes.pipe';
import { DragulaModule, DragulaService } from 'ng2-dragula';
import {ImagecropperModule} from '../imgcropper/imagecropper.module'

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  scrollYMarginOffset: 0,
};


@NgModule({
  imports: [
    CommonModule, AddcourseRoutingModule, CoursesModule, ConfirmationpopupModule, FormsModule, HeaderModule, CapitalizeModule, ShowanswerpipeModule, TrimdataModule,
    PerfectScrollbarModule, DragulaModule, ImagecroppercpModule, SafepipeModule, CourseDetailModule, ImagecropperModule
  ],
  exports: [numbertimes],
  providers: [{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG

  }, DragulaService],
  declarations: [AddcourseComponent, SelectlibraryComponent, UploadvideoComponent, numbertimes,

  ]
})
export class AddcourseModule {
  addCurrency: number = 3;



}
