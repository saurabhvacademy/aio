import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CourseleftmenuComponent} from './courseleftmenu.component';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ConfirmationpopupModule} from './../../componentHost/confirmationpopup.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};


@NgModule({
    imports: [
        CommonModule, InfiniteScrollModule,PerfectScrollbarModule, ConfirmationpopupModule
    ],
    declarations: [
        CourseleftmenuComponent
    ],
    exports: [CourseleftmenuComponent],
    providers: [{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }]
})
export class CourseleftmenuModule {}
