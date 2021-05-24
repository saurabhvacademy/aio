import { Injectable, Output, EventEmitter } from '@angular/core';
import { GoogleAnalyticsService } from './google-analytics.service';
import { ConstantService } from './constant.service';
import { EncryptionService } from './encryption.service';
import { CommonfunctionsService } from './commonfunctions.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { EmitService } from '../sharedComponents/addpost/emit.service';
import { CommonEmitterService } from './common-emitter.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  model: any;
  loginAttemptExceeded: boolean;
  idType;
  

  constructor(
    private googleAnalyticsService: GoogleAnalyticsService,
    private _constantService: ConstantService,
    private _encryptionService: EncryptionService,
    private _commonfunctionService: CommonfunctionsService,
    private _cookie: CookieService,
    private _router: Router,
    private emitService: EmitService,
    private commonEmitterService: CommonEmitterService

  ) { }
  @Output() emitter = new EventEmitter<any>();

  loginSubmit(id, pd) {
    var errorMessage:any={};
    this.loginAttemptExceeded=false;
    this.googleAnalyticsService.eventEmitter(
      'web_Sign Up Page Events:',
      'web_Login',
      'web_Login',
      'web_Sign Up Page Events',
      0
    );
    
    if (id.length == 0 ) {
      errorMessage= {
            errorMessage: 'Please enter your email address or mobile number.',
            error: true,
            type: 'id'
          };
          if(errorMessage.errorMessage){
            return errorMessage;
          }


    } else {
      if (this._constantService.isEmail(id)) {
        this.idType = 'e';
        errorMessage= {
          errorMessage: 'Please enter your email address or mobile number.',
          error: true,
          type: 'id'
        };

      } 
      else if (this._constantService.isMobile(id)) {
        this.idType = 'm';
        errorMessage= {
          errorMessage: 'Please enter your email address or mobile number.',
          error: true,
          type: 'id'
        };

    }else{
      errorMessage= {
        errorMessage: 'Please enter your email address or mobile number.',
        error: true,
        type: 'id'
      };
      if(errorMessage.errorMessage){
        return errorMessage;
      }
    }
    
  }

    if (
      pd == null ||
      pd == "" ||
      pd.length < 6
    ) {
      if (pd == "") {
        errorMessage= {
              errorMessage: 'Please enter your password.',
              error: true,
              type: 'pd'
            };
            if(errorMessage.errorMessage){
              return errorMessage;
            }
      } else {
          errorMessage= {
            errorMessage: 'Please enter valid credentials. Sign up in case of new user.',
            error: true,
            type: 'pd'
          };
      }
      if(errorMessage.errorMessage){
        return errorMessage;
      }
    }
    if (this._constantService.getSessionDataBYKey("lc_data") == null) {
      this._constantService.setSessionJsonPair("lc_data", id);
    } else {
      if (
        this._constantService.getSessionDataBYKey("lc_data") != id
      ) {
        this._constantService.setSessionJsonPair("lc_data", id);
        this._constantService.setLoginCountReset();
        this.loginAttemptExceeded=false;
      }
    }

    const login_d = {
      lc: id,
      pd: pd.trim(),
      t: this.idType,
      token_param: {
        device_type: 'w',
        host: ''
      }
    };
    
    this._constantService
      .fetchDataApi(this._constantService.getLoginServiceUrl(), login_d)
      .subscribe(
        (data) => {
          var responseData: any = data;
          const status = responseData.STATUS;

          if (status == this._constantService.success_msg) {
            this.commonEmitterService.loginSuccesful(true);
            this.googleAnalyticsService.eventEmitter(
              'web_Sign Up Page Events:',
              'web_Login',
              'web_Login',
              'web_Sign Up Page Events',
              0
            );
            const expiredDate = new Date();
            expiredDate.setDate(expiredDate.getDate() + 90);
            this._cookie.set(
              'study247',
              this._encryptionService.encrypt(responseData.TOKEN),
              expiredDate,
              '/'
            );

            this._constantService.setSessionJsonPair(
              'u_id',
              responseData.USER_ID
            );
            this._constantService.setSessionJsonPair(
              'token',
              responseData.TOKEN
            );
            this._constantService.setSessionJsonPair(
              'user_interest',
              responseData.USER_INTEREST
            );
            this._constantService.setSessionJsonPair('em', responseData.EMAIL);
            this._constantService.setSessionJsonPair('mn', responseData.MOBILE);
            this._constantService.setSessionJsonPair("loginTime", new Date().getTime());
            this._constantService.setSessionJsonPair(
              'country',
              responseData.COUNTRY
            );
            this._constantService.setSessionJsonPair(
              "MOBILE_CNTRY_ID",
              responseData.MOBILE_CNTRY_ID
            );
            this._constantService.setSessionJsonPair(
              'followedId',
              responseData.FOLLOWEDID
            );
            this._constantService.setSessionJsonPair(
              'f_id',
              responseData.FRIENDSID
            );
            this._constantService.setSessionJsonPair(
              'u_id',
              responseData.USER_ID
            );
            this._constantService.setSessionJsonPair(
              'token',
              responseData.TOKEN
            );
            this._constantService.setUserInterest(responseData.USER_INTEREST);
            this._constantService.setEmail(responseData.EMAIL);
            this._constantService.setSessionJsonPair(
              'mobile',
              responseData.MOBILE
            );
            this._constantService.setCountry(responseData.COUNTRY);
            this._constantService.setFollowedId(responseData.FOLLOWEDID);
            this._constantService.setFriendsId(responseData.FRIENDSID);
            this._commonfunctionService.latestPostInterest('');
            if (responseData.ISMOBILEVERIFIED == '0') {
              this._constantService.setSessionJsonPair('v_m', 'false');
              this._constantService.setSessionJsonPair(
                'mobile_verify',
                'false'
              );
            } else {
              this._constantService.setSessionJsonPair('v_m', 'true');

              this._constantService.setSessionJsonPair('mobile_verify', 'true');
            }
            if (responseData.ISEMAILVERIFIED == '0') {
              this._constantService.setSessionJsonPair('v_e', 'false');

              this._constantService.setEmailVer('false');
            } else {
              this._constantService.setSessionJsonPair('v_e', 'true');

              this._constantService.setEmailVer('true');
            }
            document.body.classList.remove('body-overflow');
            

            this.getUserDetail();
          } else if (status == 'error') {
            if (responseData.USER_EXIST == "1") {
              this._constantService.setLoginCountPlus();
              if(parseInt(this._constantService.getLoginCount())>=3){
                this.loginAttemptExceeded=true;

              }
            }
            this.emitService.objectEmited({
              type: 'response',
              errorMessage: responseData.ERROR_MSG,
              error: true
            });

          } else if (status == 'error_token') {
            this.emitService.objectEmited({
              type: 'response',
              errorMessage: responseData.ERROR_MSG,
              error: true
            });
          }
          
        },
        (error) => {
          if (error.status == 500) {
            document.body.classList.remove('body-overflow');
            this._router.navigate(['500']);
          }
        }
      );
    return {
      type: '',
      errorMessage: '',
      error: false
    };
  }

  getUserDetail() {
    var user_details = {};
    user_details['token'] = this._constantService.getSessionDataBYKey('token');
    user_details['token_param'] = {};
    user_details['token_param']['device_type'] = "w";
    user_details['token_param']['host'] = '';
    user_details['myprofile'] = 'yes';
    user_details['username'] = '';



    this._constantService.fetchDataApi(this._constantService.getUserDetailsServiceUrl(), user_details).subscribe(data => {
      var responseData: any = data;
      var status = responseData.STATUS;
      var date = new Date();
      if (status == this._constantService.success_msg) {
        this._constantService.setSessionJsonPair('full_name', responseData.FULL_NAME);
        this._constantService.setSessionJsonPair('u_id', responseData.USER_ID);
        this._constantService.setSessionJsonPair('username', responseData.USER_NAME.trim());
        this._constantService.setSummary(responseData.SUMMARY);
        this._constantService.setSessionJsonPair('connection', responseData.CONNECTIONS);
        this._constantService.setSessionJsonPair('followers', responseData.FOLLOWER);
        this._constantService.setSessionJsonPair('followings', responseData.FOLLOWING);
        this._constantService.setSessionJsonPair('profile_pic_s3', responseData.PROFILE_PHOTO_PATH);
        this._constantService.setSessionJsonPair('dob',responseData.DOB);
        this._constantService.setSessionJsonPair('gender',responseData.GENDER);
        this._constantService.setSessionJsonPair('MOBILE_CNTRY_ID',responseData.MOBILE_CNTRY_ID);
        if(responseData.PROFILE_PHOTO_PATH){
          this._constantService.setSessionJsonPair('p_pic', responseData.PROFILE_PHOTO_PATH + "profile/" + this._constantService.getSessionDataBYKey('u_id') + "_60x60.png?v=" + date.getTime());
        }
        localStorage.setItem('userType', responseData.IS_TEACHER);
        var publicClickedURL = this._constantService.getSessionDataBYKey('publicClickedURL'); 
            if (publicClickedURL) {
              this._constantService.setSessionJsonPair('publicClickedURL','');
              window.location.href=publicClickedURL;
            } else { this._router.navigate(["home"]); }
      }
    });
  }


}
