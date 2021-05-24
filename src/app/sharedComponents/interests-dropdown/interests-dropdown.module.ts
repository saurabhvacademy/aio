import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterestsDropdownComponent } from './interests-dropdown/interests-dropdown.component';



@NgModule({
  declarations: [InterestsDropdownComponent],
  imports: [
    CommonModule
  ],
  exports: [
    InterestsDropdownComponent
 ]
})
export class InterestsDropdownModule { }
