import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {InterestComponent} from './interest.component';

const routes: Routes = [
  {
    path : '',
    component : InterestComponent
  }
];

@NgModule({
  imports : [ RouterModule.forChild ( routes ), CommonModule ],
  exports : [ RouterModule ],
})
export class InterestRoutingModule { }
