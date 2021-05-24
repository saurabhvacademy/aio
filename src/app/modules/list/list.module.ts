import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageListComponent } from './page-list/page-list.component';
import { FormsModule } from '@angular/forms';
import { PagerService } from 'src/app/services/pager.service';
import { TrimdataModule } from 'src/app/componentHost/trimdata.module';
import { FilterdataPipe } from 'src/app/filterdata.pipe';
import { EncryptionService } from 'src/app/services/encryption.service';
import { ConstantService } from 'src/app/services/constant.service';
import { PostdataService } from 'src/app/services/postdata.service';
import { ListRoutingModule } from './list-routing.module';
import { LoginheaderModule } from 'src/app/sharedComponents/loginheader/loginheader.module';
import { PeopleListComponent } from './people-list/people-list.component';
import { PostListComponent } from './post-list/post-list.component';
import { DecodedataModule } from 'src/app/componentHost/decodedata.module';



@NgModule({
  declarations: [PageListComponent, FilterdataPipe, PostListComponent, PeopleListComponent  ],
  imports: [
    CommonModule, FormsModule, TrimdataModule, ListRoutingModule, LoginheaderModule, DecodedataModule
  ],
  providers: [PagerService, EncryptionService, ConstantService, PostdataService]
})
export class ListModule { }
