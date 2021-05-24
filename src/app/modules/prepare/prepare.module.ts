import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PrepareRoutingModule } from './prepare-routing.module';
import { PrepareComponent } from './prepare.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {TrimdataModule} from './../../componentHost/trimdata.module';
import { LoginpopupModule } from 'src/app/sharedComponents/loginpopup/loginpopup.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FormsModule } from '@angular/forms';
import { InterestsDropdownModule } from 'src/app/sharedComponents/interests-dropdown/interests-dropdown.module';
import { HeaderModule } from 'src/app/sharedComponents/header/header.module';
import { SocialSignupModule } from '../social-signup/social-signup.module';
import { LoginService } from 'src/app/services/login.service';
import { CommonfunctionsService } from 'src/app/services/commonfunctions.service';
import {LoginheaderModule} from './../../sharedComponents/loginheader/loginheader.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  declarations: [PrepareComponent,],
  imports: [
    CommonModule,
    PrepareRoutingModule,
    NgbModule,
    SlickCarouselModule,
    TrimdataModule,
    LoginpopupModule,
    PerfectScrollbarModule,
    FormsModule,
    InterestsDropdownModule,
    HeaderModule,
    SocialSignupModule,
    LoginheaderModule

  ],
  providers:[{
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
  LoginService,CommonfunctionsService]
})
export class PrepareModule { }
