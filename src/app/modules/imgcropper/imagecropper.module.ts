import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {ImgcropperComponent} from './imgcropper.component';
import {ImgcropperprofileComponent} from './../imgcropperprofile/imgcropperprofile.component';
import {ImageCropperModule} from 'ngx-img-cropper';
import {ConfirmationpopupModule} from './../../componentHost/confirmationpopup.module'

@NgModule({
  imports: [
    CommonModule, RouterModule,ImageCropperModule,ConfirmationpopupModule
  ],
  declarations: [ImgcropperprofileComponent, ImgcropperComponent],
  exports: [ImgcropperprofileComponent, ImgcropperComponent],
})
export class ImagecropperModule { }
