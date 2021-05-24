import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {SuggestedpagesComponent} from './suggestedpages.component';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {TrimdataModule} from './../../componentHost/trimdata.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';

//import {PerfectScrollbarModule} from './../../../../node_modules/ngx-perfect-scrollbar/dist/lib/perfect-scrollbar.module';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,RouterModule,CarouselModule,PerfectScrollbarModule,TrimdataModule, SlickCarouselModule

  ],
  declarations: [SuggestedpagesComponent],
  exports: [SuggestedpagesComponent],
  providers:[{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
      }]
})
 export class SuggestedpagesModule {


 }
