import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { WhyJoinStudyComponent } from './why-join-study/why-join-study.component';
import { ValuesAndWorkCultureComponent } from './values-and-work-culture/values-and-work-culture.component';
import { SalesAndMarketingComponent } from './sales-and-marketing/sales-and-marketing.component';
import { WeAreHiringComponent } from './we-are-hiring/we-are-hiring.component';
import { PreperationComponent } from './preperation/preperation.component';
import { FooterComponent } from './footer/footer.component';
import { PreferredJobFieldComponent } from './preferred-job-field/preferred-job-field.component';
import { HowToApplyComponent } from './how-to-apply/how-to-apply.component';
import { QualifierTestSyllabusComponent } from './qualifier-test-syllabus/qualifier-test-syllabus.component';
import { FreequentlyAskedQuestionsComponent } from './freequently-asked-questions/freequently-asked-questions.component';
import { CareerComponent } from './career.component';
import { CareerregistrationComponent } from './careerregistration/careerregistration.component';
import { HeaderModule } from 'src/app/sharedComponents/header/header.module';
import { CareerRoutingModule } from './career-routing.module';

import { ConfirmationComponent } from './confirmation/confirmation.component';

import { LoginheaderModule } from 'src/app/sharedComponents/loginheader/loginheader.module';
import { FormsModule } from '@angular/forms';
import { ImagecropperModule } from '../imgcropper/imagecropper.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SharedDataService } from './sharedData/shared-data.service';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { ConfirmationpopupModule } from 'src/app/componentHost/confirmationpopup.module';

import { CareervideoComponent } from './careervideo/careervideo.component';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';





const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  declarations: [BannerComponent, WhyJoinStudyComponent, ValuesAndWorkCultureComponent, SalesAndMarketingComponent, WeAreHiringComponent, PreperationComponent, FooterComponent, PreferredJobFieldComponent, HowToApplyComponent, QualifierTestSyllabusComponent, FreequentlyAskedQuestionsComponent, CareerComponent, CareerregistrationComponent, ConfirmationComponent, CareervideoComponent],
  imports: [
    FormsModule, InfiniteScrollModule, PerfectScrollbarModule, ConfirmationpopupModule, CommonModule, HeaderModule, CareerRoutingModule, LoginheaderModule, ImagecropperModule, SlickCarouselModule
  ],
  providers: [SharedDataService, {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }]
})
export class CareerModule { }
