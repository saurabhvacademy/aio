import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SavedComponent} from './saved.component';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: SavedComponent
    }
];

@NgModule({
    imports: [
        [RouterModule.forChild(routes)],
        CommonModule
    ],
    exports: [RouterModule]
})
export class SavedRoutingModule {}
