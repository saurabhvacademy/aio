import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScholarshipComponent } from './scholarship.component';


const routes: Routes = [
    { path: '', component: ScholarshipComponent },
    {
        path: ':id', component: ScholarshipComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ScholarshipRoutingModule { }
