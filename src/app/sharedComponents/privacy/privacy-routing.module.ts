import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {PrivacyComponent} from './privacy.component';

const routes: Routes = [{
    path: '',
    component: PrivacyComponent
}];

@NgModule({
    imports: [
        CommonModule,
        [RouterModule.forChild(routes)]
    ],
    exports: [RouterModule]
})
export class PrivacyRoutingModule { }
