import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/modals/user.modal';
import { UserApiUrlsService } from 'src/app/services/constant-services/user-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  hide = true;
  registrationForm = new FormGroup({
    email: new FormControl(null),
    password: new FormControl(null),
    confirmPassword: new FormControl(null)

  });
  isSubmitted = false;

  constructor(
    private _userApiService: UserApiUrlsService,
    private _formBuilder: FormBuilder,
    private _router:Router
  ) { }
  user = new User("", "", 0, 0);

  name = new FormControl('');


  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)

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
