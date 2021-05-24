import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {LiveStreamComponent} from './live-stream.component';
const routes: Routes = [
    {
        path: '',
        component: LiveStreamComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LivestreamRoutingModule { }
