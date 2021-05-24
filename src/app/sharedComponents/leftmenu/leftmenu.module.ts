import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {LeftmenuComponent} from './leftmenu.component';
import {CreatepageModule} from './../../modules/page/createpage/createpage.module';
import {CapitalizeModule} from './../../componentHost/capitalize.module';
import {TrimdataModule} from './../../componentHost/trimdata.module';
//import {InterestModule} from './../../modules/interest/interest.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
    imports: [
        CommonModule, RouterModule,
        CreatepageModule, CapitalizeModule,PerfectScrollbarModule,TrimdataModule
        
    ],
    declarations: [LeftmenuComponent, ],
    exports: [LeftmenuComponent],
    providers:[{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
      }]
})
export class LeftmenuModule {}
