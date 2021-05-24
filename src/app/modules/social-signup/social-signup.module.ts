import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginWithFacebookComponent } from './login-with-facebook/login-with-facebook.component';
import { LoginWithGoogleComponent } from './login-with-google/login-with-google.component';
import { SocialLoginPopupsComponent } from './social-login-popups/social-login-popups.component';
import { FormsModule } from '@angular/forms';
import { MobilenoModule } from '../login/mobileno/mobileno.module';



@NgModule({
  declarations: [LoginWithFacebookComponent,LoginWithGoogleComponent,SocialLoginPopupsComponent],
  imports: [
    CommonModule,FormsModule, MobilenoModule
  ],
  exports: [
    LoginWithFacebookComponent,LoginWithGoogleComponent,SocialLoginPopupsComponent
  ]
})
export class SocialSignupModule { }
