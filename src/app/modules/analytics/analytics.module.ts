import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AnalyticsComponent} from "./analytics.component";
//import {ChartsModule} from 'ng2-charts';
import { ChartModule } from 'angular-highcharts';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {ConfirmationpopupModule} from './../../componentHost/confirmationpopup.module';
import {TrimdataModule} from './../../componentHost/trimdata.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    scrollYMarginOffset: 0,
};


@NgModule({
    imports: [
        CommonModule, ChartModule, PerfectScrollbarModule, RouterModule, ConfirmationpopupModule, TrimdataModule, FormsModule
    ],
    declarations: [AnalyticsComponent],
    exports: [AnalyticsComponent],
    providers: [{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG

    }],
})
export class AnalyticsModule {}
