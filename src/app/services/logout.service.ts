import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantService } from './constant.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(
    private _constantService: ConstantService,
    private _router:Router
  ) { }

  userLogout() {
    var user_logout = {};
    user_logout['token'] = this._constantService.getSessionDataBYKey('token');
    user_logout['token_param'] = {};
    user_logout['token_param']['device_type'] = "w";
    user_logout['token_param']['host'] = "";
    this._constantService.fetchDataApi(this._constantService.getLogoutServiceUrl(), user_logout).subscribe(data => {
      var responseData: any = data;
      var status = responseData.STATUS;
      if (status == this._constantService.success_msg) {
        this._constantService.access_token = '';
        this.logoutAwaitFxn();
      } 
    }, error => {
      var responseData = error;
      if (responseData.status == 500) {
        this._router.navigate(['500']);
      }
    });
  }
  async logoutAwaitFxn() {
    await this._constantService.clearUserInfo();
    this._router.navigate(['']);
  }
}
