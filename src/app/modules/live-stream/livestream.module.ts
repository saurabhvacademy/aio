import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LiveStreamComponent} from './live-stream.component';
import {LivestreamRoutingModule} from './livestream-routing.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { LivestreampollpopupComponent } from './livestreampollpopup/livestreampollpopup.component';
import { ChartModule } from 'angular-highcharts';
import {SafepipeModule} from '../../componentHost/safepipe.module';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  imports: [
    CommonModule, LivestreamRoutingModule, PerfectScrollbarModule, ChartModule,SafepipeModule
  ],
  declarations: [LiveStreamComponent, LivestreampollpopupComponent],
  providers:[{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
      }]
})
export class LivestreamModule { }
