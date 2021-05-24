import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SavedComponent} from './saved.component';
import {SavedRoutingModule} from './saved-routing.module';
import {SavepopupdeleteComponent} from './savepopupdelete/savepopupdelete.component';
import {SavepopupeditComponent} from './savepopupedit/savepopupedit.component';
import {LeftmenuModule} from './../../sharedComponents/leftmenu/leftmenu.module';
import {HeaderModule} from './../../sharedComponents/header/header.module';
import {ConfirmationpopupModule} from './../../componentHost/confirmationpopup.module';
import {CapitalizeModule} from './../../componentHost/capitalize.module';
import {AddpostModule} from './../../sharedComponents/addpost/addpost.module';
import {CreatepageModule} from './../../modules/page/createpage/createpage.module';

import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {CreatefolderModule} from './../../modules/saved/createfolder/createfolder.module';
import {SocialinviteModule} from './../../sharedComponents/socialinvite/socialinvite.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
    imports: [
        CommonModule, SavedRoutingModule, LeftmenuModule, FormsModule, HeaderModule, ConfirmationpopupModule,
         InfiniteScrollModule, CapitalizeModule,PerfectScrollbarModule,
        CreatefolderModule,SocialinviteModule,AddpostModule,CreatepageModule
    ],
    declarations: [SavedComponent,
        SavepopupdeleteComponent, SavepopupeditComponent,
    ],

    exports: [SavedComponent,
        SavepopupdeleteComponent, SavepopupeditComponent,
    ],
    providers:[{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
      }]
})
export class SavedModule {}
