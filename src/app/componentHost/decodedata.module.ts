import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DecodedataPipe} from './../services/decode.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DecodedataPipe],
  exports: [DecodedataPipe]
})
export class DecodedataModule { }
