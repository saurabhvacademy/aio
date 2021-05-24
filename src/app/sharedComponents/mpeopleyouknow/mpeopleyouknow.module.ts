import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MpeopleyouknowComponent} from './mpeopleyouknow.component';
import {TrimdataModule} from './../../componentHost/trimdata.module';
@NgModule({
  imports: [CommonModule,RouterModule,TrimdataModule,
  ],
  declarations: [MpeopleyouknowComponent],
  exports: [MpeopleyouknowComponent],
  providers:[]
})
export class MpeopleyouknowModule { }
