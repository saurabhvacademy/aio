import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { PageListComponent } from './page-list/page-list.component';
import { PeopleListComponent } from './people-list/people-list.component';
import { PostListComponent } from './post-list/post-list.component';


const routes: Routes = [
    {
        path: 'page',
        component: PageListComponent
    },
    {
        path: 'post',
        component: PostListComponent
    },{
        path: 'profile',
        component: PeopleListComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ListRoutingModule {}
