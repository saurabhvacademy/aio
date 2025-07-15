import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReactionTimeGameComponent } from './reaction-time-game.component';

const routes: Routes = [
  { path: 'reaction-time', component: ReactionTimeGameComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JustForFunGamesRoutingModule { }
