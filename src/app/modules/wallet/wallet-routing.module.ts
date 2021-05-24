import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {WalletComponent} from './wallet.component';
const routes: Routes = [
    {
        path: '',
        component: WalletComponent
    },
    {
        path: ':id',
        component: WalletComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class walletRoutingModule {}
