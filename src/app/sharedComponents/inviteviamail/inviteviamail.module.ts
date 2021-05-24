import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InviteviamailComponent} from './inviteviamail.component';
import {HeaderModule} from './../header/header.module';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};
@NgModule({
    imports: [
        CommonModule, HeaderModule, PerfectScrollbarModule
    ],
    declarations: [InviteviamailComponent],
    exports: [InviteviamailComponent],
    providers: [{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }]
})
export class InviteviamailModule {}
