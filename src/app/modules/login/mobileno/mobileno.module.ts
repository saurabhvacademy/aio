import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import { MobilenoComponent } from './mobileno.component';
import {  PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
// const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
//     suppressScrollX: true
//   };


@NgModule({
  declarations: [MobilenoComponent],
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    FormsModule
  ],
  exports:[
    MobilenoComponent
  ],
  providers: [
     // PERFECT_SCROLLBAR_CONFIG,

  ],
})
export class MobilenoModule { }
