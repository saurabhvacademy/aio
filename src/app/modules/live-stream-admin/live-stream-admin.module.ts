import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {LivestreamAdminRoutingModule} from './livestreamadmin-routing.module';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {ChartModule} from 'angular-highcharts';
import {LiveStreamAdminComponent} from './live-stream-admin.component';
import {ConfirmationpopupModule} from './../../componentHost/confirmationpopup.module';
import { StreamingWindowComponent } from './streaming-window/streaming-window.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};
@NgModule({
    imports: [
        CommonModule, FormsModule, LivestreamAdminRoutingModule, 
        PerfectScrollbarModule, ChartModule, ConfirmationpopupModule
    ],
    declarations: [LiveStreamAdminComponent, StreamingWindowComponent],
    providers: [{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }]
})
export class LiveStreamAdminModule {}
