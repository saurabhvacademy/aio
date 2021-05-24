import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TestpageComponent} from './testpage/testpage.component'
import {HeaderModule} from './../../sharedComponents/header/header.module';
import {TestRoutingModule} from './test-routing.module';

import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ConfirmationpopupModule} from './../../componentHost/confirmationpopup.module';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import { TestsolutionsComponent } from './testsolutions/testsolutions.component';
import {CourseleftmenuModule} from './../../sharedComponents/courseleftmenu/courseleftmenu.module';
import {SafepipeModule} from '../../componentHost/safepipe.module';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};



@NgModule({
    imports: [
        CommonModule, PerfectScrollbarModule, HeaderModule,
        InfiniteScrollModule, ConfirmationpopupModule,
        TestRoutingModule, FormsModule, CourseleftmenuModule,SafepipeModule
    ],
    declarations: [TestpageComponent, TestsolutionsComponent],
    providers: [{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }]
})
export class TestModule {}
