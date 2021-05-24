import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectoryComponent } from './directory.component';
import {directoryRoutingModule} from './directory-routing.module';


@NgModule({
  imports: [
    CommonModule,directoryRoutingModule
  ],
  declarations: [DirectoryComponent]
})
export class DirectoryModule { }
