import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SinglepostviewComponent} from './singlepostview.component';

const routes: Routes = [
    {
        path: ':id/:url',
        component: SinglepostviewComponent
    },
    {
        path: ':id',
        component: SinglepostviewComponent
    },
    {
        path: '**',
        component: SinglepostviewComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        [RouterModule.forChild(routes)]
    ],
    exports: [RouterModule]
})

export class SingleRoutingModule {}
