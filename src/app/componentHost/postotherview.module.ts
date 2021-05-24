import {NgModule } from '@angular/core';
import {CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {PostotherviewComponent} from './../sharedComponents/postComponents/postotherview/postotherview.component';
import {CapitalizeModule} from './../componentHost/capitalize.module';
import {TrimdataModule} from './../componentHost/trimdata.module';
import {DateviewModule} from './../componentHost/dateview.module';
import {TimeformatedModule} from './../componentHost/timeformated.module';
import {PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {LoginpopupModule} from './../sharedComponents//loginpopup//loginpopup.module';
import { SafepipeModule } from './safepipe.module';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  imports: [
    CommonModule, CapitalizeModule, TrimdataModule, DateviewModule, TimeformatedModule, PerfectScrollbarModule,
    FormsModule, RouterModule, LoginpopupModule, SafepipeModule
  ],
  declarations: [PostotherviewComponent],
  exports: [PostotherviewComponent],
  entryComponents: [PostotherviewComponent],
  providers:[{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
      }]
})
export class PostotherviewModule { }
