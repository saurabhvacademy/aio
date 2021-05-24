import { NgModule } from '@angular/core';


import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginheaderModule } from './../../sharedComponents/loginheader/loginheader.module';


import {LeftmenuModule} from './../../sharedComponents/leftmenu/leftmenu.module';
import { HeaderModule } from './../../sharedComponents/header/header.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MnavbarModule } from './../../sharedComponents/mnavbar/mnavbar.module';
import { MmenuModule } from './../../sharedComponents/mmenu/mmenu.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { LiveClassesRoutingModule } from './live-classes-routing.module';
import { LiveClassesComponent } from './live-classes.component';
import { UpcomingClassesComponent } from './upcoming-classes/upcoming-classes.component';
import { TodaysClassesComponent } from './todays-classes/todays-classes.component';
import { PreviousClassesComponent } from './previous-classes/previous-classes.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { VodPlayerComponent } from './vod-player/vod-player.component';
import { LoginpopupModule } from './../../sharedComponents/loginpopup/loginpopup.module';
import { MsgAfterSampleComponent } from './msg-after-sample/msg-after-sample.component';
import {SafepipeModule} from './../../componentHost/safepipe.module';
import { TrimdataModule } from 'src/app/componentHost/trimdata.module';



@NgModule({
  declarations: [LiveClassesComponent, UpcomingClassesComponent, TodaysClassesComponent, PreviousClassesComponent, VodPlayerComponent, MsgAfterSampleComponent],
  imports: [SafepipeModule,
    CommonModule, LeftmenuModule,InfiniteScrollModule,LoginpopupModule, TrimdataModule,
    LiveClassesRoutingModule, LoginheaderModule, HeaderModule, NgbModule, MnavbarModule, MmenuModule, SlickCarouselModule, FormsModule
  ],
  exports:[LiveClassesComponent]
})
export class LiveClassesModule { }
