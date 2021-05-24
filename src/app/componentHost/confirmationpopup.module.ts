import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConfirmationpopupComponent} from './../sharedComponents/confirmationpopup/confirmationpopup.component'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ConfirmationpopupComponent],
  exports: [ConfirmationpopupComponent]
})
export class ConfirmationpopupModule { }
