import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {livestreamFilter} from './../services/livestreamfilter.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [livestreamFilter],
  exports: [livestreamFilter]
})
export class filterinvitePipeModule { }
