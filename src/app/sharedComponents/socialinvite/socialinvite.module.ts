import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SocialinviteComponent} from './socialinvite.component';
import {InviteviamailModule} from './../inviteviamail/inviteviamail.module';
import {SocialinvitepopupComponent} from './socialinvitepopup/socialinvitepopup.component';

import {InvitepeopleComponent} from './../invitepeople/invitepeople.component';
import {ConfirmationpopupModule} from './../../componentHost/confirmationpopup.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};



@NgModule({
    imports: [
        CommonModule, RouterModule, ConfirmationpopupModule,PerfectScrollbarModule,InviteviamailModule,FormsModule
    ],
    declarations: [SocialinviteComponent, SocialinvitepopupComponent, InvitepeopleComponent],
    exports: [SocialinviteComponent, SocialinvitepopupComponent, InvitepeopleComponent],
    providers:[{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
      }]
})
export class SocialinviteModule {}
