import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CreatepageComponent} from './createpage.component';
import {ConfirmationpopupModule} from './../../../componentHost/confirmationpopup.module';





@NgModule({
    imports: [
        CommonModule, ConfirmationpopupModule, FormsModule
            ],
   
    declarations: [CreatepageComponent],
    exports: [CreatepageComponent]
})
export class CreatepageModule {}
