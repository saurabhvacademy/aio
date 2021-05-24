import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PageprofileComponent} from './pageprofile.component';

const routes: Routes = [{
    path: '',
    component: PageprofileComponent
}];

@NgModule({
    imports: [
        CommonModule,   
        [RouterModule.forChild(routes)]
    ],
    exports: [RouterModule]
})
export class PageRoutingModule {}
