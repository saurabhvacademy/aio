import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArticleRoutingModule} from './article-routing.module';
import {ArticleComponent} from './article.component';
import {HeaderModule} from './../../sharedComponents/header/header.module';
import {FormsModule} from '@angular/forms';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {ViewArticleComponent} from './view-article/view-article.component';
import {ConfirmationpopupModule} from './../../componentHost/confirmationpopup.module';
import { MyarticleComponent } from './myarticle/myarticle.component';
import {TrimdataModule} from './../../componentHost/trimdata.module';
import {AddpostModule} from './../../sharedComponents/addpost/addpost.module';
import {LikeshareviewallModule} from './../../sharedComponents/postComponents/likeshareviewall/likeshareviewall.module';
import {LoginheaderModule} from './../../sharedComponents/loginheader/loginheader.module';
import {LoginpopupModule} from './../../sharedComponents/loginpopup/loginpopup.module';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
    imports: [
        CommonModule,
        ArticleRoutingModule,
        FormsModule,
        InfiniteScrollModule, PerfectScrollbarModule,
        HeaderModule,
        ConfirmationpopupModule,
        TrimdataModule,
        LikeshareviewallModule,
        AddpostModule,
        LoginheaderModule,
        LoginpopupModule
    ],
    declarations: [
        ArticleComponent,
        ViewArticleComponent,
        MyarticleComponent
    ],
    providers: [{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }]
})
export class ArticleModule {}
