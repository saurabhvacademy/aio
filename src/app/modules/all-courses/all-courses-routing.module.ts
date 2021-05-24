import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllCoursesComponent } from './all-courses.component';

const routes: Routes = [{ path: '', component: AllCoursesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllCoursesRoutingModule { }
