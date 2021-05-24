import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {ImgcroppercpComponent} from './imgcroppercp.component';
import {ImageCropperModule} from 'ngx-img-cropper';
import {ConfirmationpopupModule} from './../../componentHost/confirmationpopup.module'

@NgModule({
  imports: [
    CommonModule, RouterModule,ImageCropperModule,ConfirmationpopupModule
  ],
  declarations: [ImgcroppercpComponent],
  exports: [ ],
})
export class ImagecroppercpModule { }
