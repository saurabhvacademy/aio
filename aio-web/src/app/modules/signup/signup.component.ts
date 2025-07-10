import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { User } from 'src/app/modals/user.modal';
import { UserApiUrlsService } from 'src/app/services/constant-services/user-api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    standalone: false
})
export class SignupComponent implements OnInit {
  hide = true;
  registrationForm = new UntypedFormGroup({
    email: new UntypedFormControl(null),
    password: new UntypedFormControl(null),
    confirmPassword: new UntypedFormControl(null)

  });
  isSubmitted = false;

  constructor(
    private _userApiService: UserApiUrlsService,
    private _formBuilder: UntypedFormBuilder,
    private _router:Router
  ) { }
  user = new User("", "", 0, 0);

  name = new UntypedFormControl('');


  ngOnInit(): void {
    this.registrationForm = new UntypedFormGroup({
      email: new UntypedFormControl('', Validators.required),
      password: new UntypedFormControl('', Validators.required),
      confirmPassword: new UntypedFormControl('', Validators.required)

    })

  }

  get formControls() { return this.registrationForm.controls; }

  createUser(): any {
    if (this.registrationForm.status == "INVALID") {
      return false;
    }
    if(this.registrationForm.value.password != this.registrationForm.value.confirmPassword){
      return false;
    }
    let params = {
      name: '',
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password
    }
    this._userApiService.createUser(params).subscribe(users => {

    });

  }

  confirmPasswordValidator(): boolean | null {

    if (this.registrationForm) {
      return true;
    }
    return null;
  }
  routTo(rout:string) {
    this._router.navigate(['/'+rout]);
  }

}
