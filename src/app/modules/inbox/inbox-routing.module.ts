import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {InboxComponent} from './inbox.component';

const routes: Routes = [{
    path: '',
    component: InboxComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InboxRoutingModule {}
