import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SettingRoutingModule} from './setting-routing.module';
import {SettingsComponent} from './settings.component';
import {HeaderModule} from './../../sharedComponents/header/header.module';


import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ConfirmationpopupModule} from './../../componentHost/confirmationpopup.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MobilenoModule } from '../login/mobileno/mobileno.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
    imports: [
        CommonModule,ConfirmationpopupModule,
        SettingRoutingModule,
        HeaderModule, FormsModule,PerfectScrollbarModule,MobilenoModule

    ],

    declarations: [SettingsComponent],
    providers:[{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
      }]
})
export class SettingModule {}
