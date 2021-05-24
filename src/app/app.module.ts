import {BrowserModule, ɵBROWSER_SANITIZATION_PROVIDERS} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {TrimdataModule} from './componentHost/trimdata.module';

import {Error404Component} from './sharedComponents/error404/error404.component';
import {Error400Component} from './sharedComponents/error400/error400.component';
import {Error500Component} from './sharedComponents/error500/error500.component';

import {PostdataService} from './services/postdata.service';
import {ConstantService} from './services/constant.service';
import {EncryptionService} from './services/encryption.service';
import {CoursereferenceComponent} from './sharedComponents/coursereference/coursereference.component';
import {UnsubscribeComponent} from './sharedComponents/unsubscribe/unsubscribe.component';
import {CookieService} from 'ngx-cookie-service';
import {ToastrModule} from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './modules/login/login.component';
import { InterestsDropdownModule } from './sharedComponents/interests-dropdown/interests-dropdown.module';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SearchListModule } from './componentHost/searchlist.module';
import { SocialSignupModule } from './modules/social-signup/social-signup.module';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { LoginheaderModule } from './sharedComponents/loginheader/loginheader.module';
import { LoginpopupModule } from './sharedComponents/loginpopup/loginpopup.module';
import { MobilenoModule } from './modules/login/mobileno/mobileno.module';
import { DownloadAppComponent } from './sharedComponents/download-app/download-app.component';
import { CommonEmitterService } from './services/common-emitter.service';
import { PromotionalPopupComponent } from './sharedComponents/promotional-popup/promotional-popup.component';






// import {filterinvitePipeModule} from './componentHost/filterInvitepipe.module';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
  };
@NgModule({
    declarations: [
        AppComponent,
        Error404Component,
        Error400Component,
        Error500Component,
        UnsubscribeComponent,
        CoursereferenceComponent,
        LoginComponent,
        DownloadAppComponent,
        PromotionalPopupComponent
        //forms
    ],
    imports: [
        BrowserModule,BrowserAnimationsModule, TrimdataModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        // filterinvitePipeModule,
        ToastrModule.forRoot({
        closeButton :true,
        timeOut: 4000,
        positionClass: 'toast-bottom-left',}),
        CommonModule,
        MobilenoModule,
        InterestsDropdownModule,
     PerfectScrollbarModule, SearchListModule, SocialSignupModule, LoginheaderModule, LoginpopupModule

    ],
    providers: [PostdataService, CookieService, ConstantService, EncryptionService, CommonEmitterService, ɵBROWSER_SANITIZATION_PROVIDERS,
        Error404Component,
        Error400Component,
        Error500Component,
        UnsubscribeComponent,
        CoursereferenceComponent,
        LoginComponent,  DownloadAppComponent,
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
          }
    ],

  bootstrap: [AppComponent]
})
export class AppModule {}
