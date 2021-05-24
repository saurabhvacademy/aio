import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { ConfirmationpopupModule } from './../../componentHost/confirmationpopup.module';
import { LoginpopupComponent } from './loginpopup.component';
import { TrimdataModule } from './../../componentHost/trimdata.module';
import { SocialSignupModule } from 'src/app/modules/social-signup/social-signup.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MobilenoModule } from 'src/app/modules/login/mobileno/mobileno.module';

@NgModule({
  imports: [
   MobilenoModule, CommonModule, ConfirmationpopupModule, TrimdataModule, FormsModule, SocialSignupModule
  ],
  declarations: [LoginpopupComponent, ForgotPasswordComponent],
  exports: [LoginpopupComponent, ForgotPasswordComponent]
})
export class LoginpopupModule { }
