import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderModule} from './../../sharedComponents/header/header.module';
import { LeaderboardRoutingModule } from "./leaderboard-routing.module";
import { LeaderboardComponent } from './leaderboard.component';
import { FilterByInterestComponent } from './filter-by-interest/filter-by-interest.component';
import { TopThreeDisplayComponent } from './top-three-display/top-three-display.component';
import { RankListingComponent } from './rank-listing/rank-listing.component';
import { MyPointsComponent } from './my-points/my-points.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { PointSystemModule } from '../point-system/point-system.module';
import {MnavbarModule} from './../../sharedComponents/mnavbar/mnavbar.module';
import {MmenuModule} from './../../sharedComponents/mmenu/mmenu.module';
import { shortnumber } from './../../componentHost/shortnumber.module';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  imports: [
    CommonModule, HeaderModule, LeaderboardRoutingModule,
    InfiniteScrollModule, PerfectScrollbarModule, PointSystemModule, shortnumber,MnavbarModule,MmenuModule
  ],
  declarations: [LeaderboardComponent, FilterByInterestComponent, TopThreeDisplayComponent, RankListingComponent, MyPointsComponent],
  providers:[{
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }],
    exports: [MyPointsComponent]
})
export class LeaderboardModule { }
