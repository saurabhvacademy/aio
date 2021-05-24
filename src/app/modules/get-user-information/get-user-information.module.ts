import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderModule } from './../../sharedComponents/header/header.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { GetUserInformationComponent } from './get-user-information.component';
import { GetUserInformationRoutingModule } from './get-user-information-routing.module';

@NgModule({
    imports: [
        CommonModule, FormsModule, HeaderModule, 
         RouterModule, NgSelectModule,
         NgOptionHighlightModule, GetUserInformationRoutingModule
    ],
    declarations: [
        GetUserInformationComponent
    ],

    // exports: [CoursesComponent],
    providers: []
})
export class GetUserInformationModule {

















}
