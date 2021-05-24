import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MessagetimePipe} from './../services/messagetime.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MessagetimePipe],
  exports: [MessagetimePipe]
})
export class TimeformatedModule { }
