import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MnavbarComponent} from './mnavbar.component';
import {CreatepageModule} from './../../modules/page/createpage/createpage.module';

@NgModule({
  imports: [RouterModule,CommonModule,CreatepageModule

  ],
  declarations: [MnavbarComponent],
  exports: [MnavbarComponent],
  providers:[]
})
export class MnavbarModule { }
