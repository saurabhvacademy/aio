import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {walletRoutingModule} from './wallet-routing.module';
import {WalletComponent} from './wallet.component';
import {HeaderModule} from './../../sharedComponents/header/header.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
@NgModule({
  imports: [
    CommonModule, walletRoutingModule,HeaderModule,InfiniteScrollModule
  ],
  declarations: [WalletComponent]
})
export class WalletModule { }
