import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WallComponent } from './wall.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'all'
    },    
    {
        path: ':id', component: WallComponent
    },
    {
        path:'**',
        redirectTo:'all'
    }
   
];

@NgModule({
    imports: [RouterModule.forChild(routes),
        CommonModule],
    exports: [RouterModule],
})
export class WallRoutingModule { }
