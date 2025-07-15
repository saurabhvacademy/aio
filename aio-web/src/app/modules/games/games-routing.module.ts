import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'just-for-fun-games',
    loadChildren: () => import('./just-for-fun-games/just-for-fun-games.module').then(m => m.JustForFunGamesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
