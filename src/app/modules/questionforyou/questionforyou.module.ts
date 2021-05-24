import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuestionforyouRoutingModule } from "./questionforyou-routing.module";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { QuestionforyouComponent } from "./questionforyou.component";
import { HeaderModule } from './../../sharedComponents/header/header.module';
import { LeftmenuModule } from './../../sharedComponents/leftmenu/leftmenu.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AddpostModule } from './../../sharedComponents/addpost/addpost.module';
import { SocialinviteModule } from './../../sharedComponents/socialinvite/socialinvite.module';
import { PeopleyouknowModule } from './../../sharedComponents/peopleyouknow/peopleyouknow.module';
import { MmenuModule } from './../../sharedComponents/mmenu/mmenu.module';
import { MnavbarModule } from './../../sharedComponents/mnavbar/mnavbar.module';
import { YourinterestwidgetComponent } from './yourinterestwidget/yourinterestwidget.component';
import { StatisticswidgetComponent } from './statisticswidget/statisticswidget.component';
import { shortnumber } from './../../componentHost/shortnumber.module';
import { CreatepageModule } from './../../modules/page/createpage/createpage.module';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    imports: [
        CommonModule, QuestionforyouRoutingModule, HeaderModule, LeftmenuModule, RouterModule, MnavbarModule, MmenuModule,
        InfiniteScrollModule, PerfectScrollbarModule, FormsModule,
        AddpostModule, SocialinviteModule, PeopleyouknowModule, shortnumber, CreatepageModule
    ],
    declarations: [QuestionforyouComponent, YourinterestwidgetComponent, StatisticswidgetComponent],
    providers: [{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }],
    exports: [
        QuestionforyouComponent
    ]
})
export class QuestionforyouModule { }
