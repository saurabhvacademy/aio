import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {VerificationpopupComponent} from './verificationpopup.component';

const routes: Routes = [{
    path: '',
    component: VerificationpopupComponent
}];

@NgModule({
    imports: [
        CommonModule,
        [RouterModule.forChild(routes)]
    ],
    exports: [RouterModule]
})
export class VerificationRoutingModule {}
