import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrepareComponent } from './prepare.component';

const routes: Routes = [{ path: '', component: PrepareComponent },

{
  path: ':id', component: PrepareComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrepareRoutingModule { }
