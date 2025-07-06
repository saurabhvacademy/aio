import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserApiUrlsService } from 'src/app/services/constant-services/user-api.service';
import { SignupRoutingModule } from './signup-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';





@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SignupRoutingModule,
    FormsModule, MatInputModule, MatIconModule
  ],
  providers: [
    UserApiUrlsService,
  ]
})
export class SignupModule { }
