import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SinglepostviewComponent } from './singlepostview.component';
import { SingleRoutingModule } from './single-routing.module';
import { LeftmenuModule } from './../../leftmenu/leftmenu.module';
import { HeaderModule } from './../../header/header.module';
import { PeopleyouknowModule } from './../../peopleyouknow/peopleyouknow.module';
import { SocialinviteModule } from './../../socialinvite/socialinvite.module';
import { ConfirmationpopupModule } from './../../../componentHost/confirmationpopup.module';
import { AddpostModule } from './../../../sharedComponents/addpost/addpost.module';
import { PostotherviewModule } from './../../../componentHost/postotherview.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { LoginpopupModule } from './../../loginpopup/loginpopup.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { LoginheaderModule } from './../../../sharedComponents/loginheader/loginheader.module';
import { MmenuModule } from './../../mmenu/mmenu.module';
import { MnavbarModule } from './../../mnavbar/mnavbar.module';
import {TrimdataModule} from '../../../componentHost/trimdata.module';
import { SocialSignupModule } from 'src/app/modules/social-signup/social-signup.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    MnavbarModule, MmenuModule,
    CommonModule,
    LeftmenuModule,
    HeaderModule,
    SingleRoutingModule,
    LoginpopupModule,
    TrimdataModule,
    FormsModule,
    PostotherviewModule,
    PeopleyouknowModule,
    SocialinviteModule,
    CarouselModule,
    ConfirmationpopupModule,
    AddpostModule,
    PerfectScrollbarModule,
    LoginheaderModule,
    SocialSignupModule
  ],
  declarations: [SinglepostviewComponent],
  exports: [SinglepostviewComponent],
  
  providers: [{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }]
})
export class SingleModule { }
