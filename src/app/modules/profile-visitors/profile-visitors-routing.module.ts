import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileVisitorsPageComponent } from './profile-visitors-page/profile-visitors-page.component';


const routes: Routes = [
  { path: '', component: ProfileVisitorsPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileVisitorsRoutingModule { }
