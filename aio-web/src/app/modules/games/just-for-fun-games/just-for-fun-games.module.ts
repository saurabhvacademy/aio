import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JustForFunGamesRoutingModule } from './just-for-fun-games-routing.module';

import { ReactionTimeGameComponent } from './reaction-time-game.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    CommonModule,
    JustForFunGamesRoutingModule,
    ReactionTimeGameComponent
  ]
})
export class JustForFunGamesModule { }
