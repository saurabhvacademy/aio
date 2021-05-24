import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiveClassesComponent } from './live-classes.component';
import { UpcomingClassesComponent } from './upcoming-classes/upcoming-classes.component';
import { PreviousClassesComponent } from './previous-classes/previous-classes.component';


const routes: Routes = [
  { path: '', component: LiveClassesComponent },
  { path: 'upcoming-classes', component: UpcomingClassesComponent },
  { path: 'previous-classes', component: PreviousClassesComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveClassesRoutingModule { }
