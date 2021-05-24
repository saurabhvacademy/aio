import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VodMentorstreamComponent } from './vod-mentorstream.component';

const routes: Routes = [{ path: '', component: VodMentorstreamComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VodMentorstreamRoutingModule { }
