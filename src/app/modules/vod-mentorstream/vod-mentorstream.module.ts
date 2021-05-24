import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import { VodMentorstreamRoutingModule } from './vod-mentorstream-routing.module';
import { VodMentorstreamComponent } from './vod-mentorstream.component';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {ChartModule} from 'angular-highcharts';
import {ConfirmationpopupModule} from './../../componentHost/confirmationpopup.module';
import {TrimdataModule} from './../../componentHost/trimdata.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};
@NgModule({
    imports: [
        CommonModule, FormsModule, VodMentorstreamRoutingModule,
        PerfectScrollbarModule, ChartModule, ConfirmationpopupModule,TrimdataModule
    ],
    declarations: [VodMentorstreamComponent],
    providers: [{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }]
})
export class VodMentorstreamModule {}
