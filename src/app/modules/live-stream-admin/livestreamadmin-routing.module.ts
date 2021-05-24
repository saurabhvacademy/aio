import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {LiveStreamAdminComponent} from './live-stream-admin.component';
import { StreamingWindowComponent } from './streaming-window/streaming-window.component';
const routes: Routes = [
    {
        path: '',
        component: LiveStreamAdminComponent
    },
    {
        path:'shared-window',
        component:StreamingWindowComponent
    },
    {
        path:'**',
        redirectTo:''
    }
];



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LivestreamAdminRoutingModule { }
