import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScholarshipComponent } from './scholarship.component';
import { ScholarshipRoutingModule } from './scholarship-routing.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BannerComponent } from './banner/banner.component';
import { AboutTestComponent } from './about-test/about-test.component';
import { CoursesSliderComponent } from './courses-slider/courses-slider.component';
import { TestHighlightsComponent } from './test-highlights/test-highlights.component';
import { FrequentlyAskedQuestionsComponent } from './frequently-asked-questions/frequently-asked-questions.component';
import { FooterComponent } from './footer/footer.component';
import {HeaderModule} from './../../sharedComponents/header/header.module';
import {LoginheaderModule} from './../../sharedComponents/loginheader/loginheader.module';
import { RegistrationDetailsPopupComponent } from './registration-details-popup/registration-details-popup.component';
import {FormsModule} from '@angular/forms';
import { LoginpopupModule } from 'src/app/sharedComponents/loginpopup/loginpopup.module';
import {CarouselModule} from 'ngx-bootstrap/carousel';



@NgModule({
  declarations: [ScholarshipComponent,RegistrationDetailsPopupComponent, BannerComponent, AboutTestComponent, CoursesSliderComponent, TestHighlightsComponent, FrequentlyAskedQuestionsComponent, FooterComponent],
  imports: [
    CommonModule,FormsModule, ScholarshipRoutingModule,LoginpopupModule, SlickCarouselModule, HeaderModule, LoginheaderModule, CarouselModule
  ]
})
export class ScholarshipModule { }
