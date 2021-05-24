import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {LoginheaderComponent} from './loginheader.component';
import {LoginpopupModule} from './../loginpopup/loginpopup.module'
import { SearchListModule } from 'src/app/componentHost/searchlist.module';
import { InterestsDropdownModule } from 'src/app/sharedComponents/interests-dropdown/interests-dropdown.module';
import { BrowseTestModule } from 'src/app/componentHost/browsetest.module';

@NgModule({
  imports: [
    CommonModule,FormsModule,LoginpopupModule, SearchListModule, InterestsDropdownModule,BrowseTestModule
  ],
  declarations: [LoginheaderComponent],
    exports:[LoginheaderComponent, InterestsDropdownModule]
})
export class LoginheaderModule { }
