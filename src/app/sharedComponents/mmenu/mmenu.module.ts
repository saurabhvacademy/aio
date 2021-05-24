import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MmenuComponent} from './mmenu.component';

@NgModule({
  imports: [RouterModule

  ],
  declarations: [MmenuComponent],
  exports: [MmenuComponent],
  providers:[]
})
export class MmenuModule { }
