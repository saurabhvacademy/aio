import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginheaderModule } from './../../sharedComponents/loginheader/loginheader.module';
import { AllCoursesRoutingModule } from './all-courses-routing.module';
import { AllCoursesComponent } from './all-courses.component';
import { AllCoursesFilterComponent } from './all-courses-filter/all-courses-filter.component';
import { HeaderModule } from './../../sharedComponents/header/header.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MnavbarModule } from './../../sharedComponents/mnavbar/mnavbar.module';
import { MmenuModule } from './../../sharedComponents/mmenu/mmenu.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FilteredCoursesComponent } from './filtered-courses/filtered-courses.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { DragDropModule } from '@angular/cdk/drag-drop'


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  declarations: [AllCoursesComponent, AllCoursesFilterComponent, FilteredCoursesComponent],
  imports: [
    CommonModule, LoginheaderModule, HeaderModule,
    AllCoursesRoutingModule, NgbModule, MnavbarModule, MmenuModule, SlickCarouselModule, FormsModule, InfiniteScrollModule, PerfectScrollbarModule,
    DragDropModule
  ],
  providers:[{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
      }]
})
export class AllCoursesModule { }
