import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicHomeComponent } from './public-home/public-home.component';
import { AuthGuard } from './services/auth-services/auth.guard';


const routes: Routes = [
    {
    path: '',
    loadChildren: () => import('./modules/signup/signup.module').then(m => m.SignupModule),
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./modules/signup/signup.module').then(m => m.SignupModule)
  },
  {
    path: 'dashboard',
    component: PublicHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'games',
    loadChildren: () => import('./modules/games/games.module').then(m => m.GamesModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
