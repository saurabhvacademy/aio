import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetUserInformationComponent } from './get-user-information.component';

const routes: Routes = [
  {
    path: 'thankyou',
    component: GetUserInformationComponent
  },
  {
    path: 'contact_us',
    component:GetUserInformationComponent
  },
  {
    path: '',
    component:GetUserInformationComponent
}
];

@NgModule({
    imports : [ RouterModule.forChild ( routes ) ],
    exports : [ RouterModule ],
})
export class GetUserInformationRoutingModule { }
