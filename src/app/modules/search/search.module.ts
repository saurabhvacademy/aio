import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search-routing.module';
import { LoginheaderModule } from './../../sharedComponents/loginheader/loginheader.module';
import { TrimdataModule } from './../../componentHost/trimdata.module';
import { RouterModule } from '@angular/router';
import { HeaderModule } from './../../sharedComponents/header/header.module';
import { AddpostModule } from './../../sharedComponents/addpost/addpost.module';
import { ConfirmationpopupModule } from './../../componentHost/confirmationpopup.module';
import { CapitalizeModule } from './../../componentHost/capitalize.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { PostotherviewModule } from './../../componentHost/postotherview.module';
import { LoginpopupModule } from './../../sharedComponents/loginpopup/loginpopup.module';
import { SearchdataComponent } from './searchdata/searchdata.component';
import { SearchfilterComponent } from './searchfilter/searchfilter.component';
import { from } from 'rxjs';
import { PeopleyouknowModule } from './../../sharedComponents/peopleyouknow/peopleyouknow.module';
// import { RecommendedpageComponent } from './../wall/recommendedpage/recommendedpage.component';
import { SearchPostComponent } from './search-post/search-post.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  imports: [
    CommonModule, InfiniteScrollModule, LoginheaderModule, PostotherviewModule, LoginpopupModule, FormsModule,
    RouterModule, HeaderModule, PeopleyouknowModule, TrimdataModule, AddpostModule, SearchRoutingModule, ConfirmationpopupModule, CapitalizeModule,
    PerfectScrollbarModule
  ],

  declarations: [SearchComponent, SearchdataComponent, SearchfilterComponent, SearchPostComponent],
  providers: [{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }, ],
  entryComponents : [SearchPostComponent]
})
export class SearchModule { }
