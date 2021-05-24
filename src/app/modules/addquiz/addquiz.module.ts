import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddquizRoutingModule} from './addquiz-routing.module';
import {AddquizComponent} from './addquiz.component';
import {FormsModule} from '@angular/forms';
import {ConfirmationpopupModule} from './../../componentHost/confirmationpopup.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {KeyboardModule} from './../../sharedComponents/keyboard/keyboard.module';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};


@NgModule({
    imports: [
        CommonModule, AddquizRoutingModule, FormsModule, ConfirmationpopupModule,
        InfiniteScrollModule, PerfectScrollbarModule, KeyboardModule, 
    ],
    declarations: [AddquizComponent],
    providers: [{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }]
})
export class AddquizModule {}
