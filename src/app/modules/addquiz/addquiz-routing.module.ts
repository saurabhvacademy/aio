import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddquizComponent} from './addquiz.component';

const routes: Routes = [
    {
        path: '',
        component: AddquizComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AddquizRoutingModule {}
