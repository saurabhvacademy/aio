import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import {CoursesComponent} from './courses.component';
import {CourseDetailComponentss} from './../course-details/course-details.component';
//import {AddcourseComponent} from './../addcourse/addcourse.component';

const routes: Routes = [
  {
    path: '',
    component: CourseDetailComponentss
  }
   
//   {
//     path: '',
//     component: AddcourseComponent
//   }
];

@NgModule({
    imports : [ RouterModule.forChild ( routes ) ],
    exports : [ RouterModule ],
})
export class CourseDetailsRoutingModule { }
