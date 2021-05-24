import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {MessageComponent} from './message.component';

const routes: Routes = [{
    path: '',
    component: MessageComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MessagesRoutingModule { }
