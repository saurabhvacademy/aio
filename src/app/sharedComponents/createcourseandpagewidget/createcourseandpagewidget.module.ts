import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatecourseandpagewidgetComponent } from "./createcourseandpagewidget.component";
import {CreatepageModule} from './../../modules/page/createpage/createpage.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  imports: [
    CommonModule, CreatepageModule,PerfectScrollbarModule, InfiniteScrollModule
  ],
  declarations: [CreatecourseandpagewidgetComponent],
  exports: [CreatecourseandpagewidgetComponent],
  providers:[{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
      }]
})
export class CreatecourseandpagewidgetModule {
 }
