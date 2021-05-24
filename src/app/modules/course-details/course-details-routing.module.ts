import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import {CoursesComponent} from './courses.component';
import {CourseDetailComponentss} from './course-details.component';

const routes: Routes = [
  {
    path: '',
    component: CourseDetailComponentss
  }
  // {
  //   path: 'details',
  //   component: CoursedetailsComponent
  // }
];

@NgModule({
    imports : [ RouterModule.forChild ( routes ) ],
    exports : [ RouterModule ],
})
export class CourseDetailsRoutingModule { }
