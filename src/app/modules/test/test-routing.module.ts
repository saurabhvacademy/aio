import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {TestpageComponent} from './testpage/testpage.component';
import {TestsolutionsComponent} from './testsolutions/testsolutions.component';
const routes: Routes = [
    {
        path: '',
        component: TestpageComponent
    },
    {
        path: 'testsolution/:id',
        component: TestsolutionsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TestRoutingModule {}
