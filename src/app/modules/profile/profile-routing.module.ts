import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile.component';
import {MycoursesComponent} from './../mycourses/mycourses.component';
import {Routes, RouterModule} from '@angular/router'
import {MypagewallComponent} from './mypagewall/mypagewall.component';
import {InvitestreamsComponent} from './invitestreams/invitestreams.component';

const routes: Routes = [
    {
        path: '',
        component: ProfileComponent
    },

    {
        path: ':id',
        component: ProfileComponent
    },

    {
        path: ':id/:tabid',
        component: ProfileComponent
    },
    {
        path: ':id/:tabid',
        component: MycoursesComponent
    },
    {
        path: ':id/:tabid',
        component: MypagewallComponent
    },
    {
        path: ':id/:tabid',
        component: InvitestreamsComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        [RouterModule.forChild(routes)]
    ],
    exports: [RouterModule]
})
export class ProfileRoutingModule {}
