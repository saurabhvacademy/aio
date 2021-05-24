import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointSystemRoutingModule } from "./point-system-routing.module";
import { PointSystemComponent } from './point-system.component';
import { HeaderModule } from './../../sharedComponents/header/header.module';
import { PointSystemLeftPanelComponent } from './point-system-left-panel/point-system-left-panel.component';
import { MyPointComponent } from './my-point/my-point.component';
import { EarnPointsComponent } from './earn-points/earn-points.component';
import { RankStatisticsComponent } from './rank-statistics/rank-statistics.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CreatepageModule } from './../../modules/page/createpage/createpage.module';
import { MnavbarModule } from './../../sharedComponents/mnavbar/mnavbar.module';
import { MmenuModule } from './../../sharedComponents/mmenu/mmenu.module';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  imports: [
    CommonModule, HeaderModule,
    PointSystemRoutingModule, CreatepageModule, InfiniteScrollModule, PerfectScrollbarModule,
    MnavbarModule,
    MmenuModule

  ],
  declarations: [PointSystemComponent, PointSystemLeftPanelComponent, MyPointComponent, EarnPointsComponent, RankStatisticsComponent],
  exports: [RankStatisticsComponent],
  providers: [{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }]
})
export class PointSystemModule { }
