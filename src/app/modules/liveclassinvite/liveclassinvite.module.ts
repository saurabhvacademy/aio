import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveclassinviteComponent } from './liveclassinvite.component';
import {LiveclassinviteRoutingModule} from './liveclassinvite-route.module';

@NgModule({
  imports: [
    CommonModule,LiveclassinviteRoutingModule
  ],
  declarations: [LiveclassinviteComponent]
})
export class LiveclassinviteModule { }
