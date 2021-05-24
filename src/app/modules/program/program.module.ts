import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramComponent } from './program.component';
import { ProgramRoutingModule } from './program-routing.module';
import {LoginheaderModule} from './../../sharedComponents/loginheader/loginheader.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProgramComponent
  ],
  imports: [
    CommonModule,
    ProgramRoutingModule,
    LoginheaderModule,
    FormsModule
  ]
})
export class ProgramModule { }
