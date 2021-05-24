import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LiveclassinviteComponent} from './liveclassinvite.component';


const routes: Routes = [
   {
     path : '',
     component : LiveclassinviteComponent
   }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LiveclassinviteRoutingModule {}
