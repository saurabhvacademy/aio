import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from './header.component';
import { RecommendedpageComponent } from './recommendedpage/recommendedpage.component';


import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {CapitalizeModule} from './../../componentHost/capitalize.module';
import {TrimdataModule} from './../../componentHost/trimdata.module';
import {DateviewModule} from './../../componentHost/dateview.module';
import {TimeformatedModule} from './../../componentHost/timeformated.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ProfileDropdownComponent } from './profile-dropdown/profile-dropdown.component';
import { InterestsDropdownModule } from '../interests-dropdown/interests-dropdown.module';
import { SearchListModule } from 'src/app/componentHost/searchlist.module';
import { BrowseTestModule } from 'src/app/componentHost/browsetest.module';
import { CommonEmitterService } from 'src/app/services/common-emitter.service';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};



@NgModule({
    imports: [
        CommonModule,RouterModule,TimeformatedModule,
        FormsModule,CapitalizeModule,TrimdataModule,DateviewModule,PerfectScrollbarModule,InterestsDropdownModule, SearchListModule, BrowseTestModule
        ],
    declarations: [HeaderComponent, RecommendedpageComponent, ProfileDropdownComponent],
    exports: [HeaderComponent,RecommendedpageComponent],
    providers:[{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
      },CommonEmitterService]
})
export class HeaderModule {}
