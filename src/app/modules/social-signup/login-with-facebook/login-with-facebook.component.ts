import { Component, OnInit, ViewChild, ChangeDetectorRef, Output, EventEmitter, Input } from '@angular/core';
import { SocialLoginPopupsComponent } from '../social-login-popups/social-login-popups.component';
import { ConstantService } from 'src/app/services/constant.service';
import { EncryptionService } from 'src/app/services/encryption.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { CommonEmitterService } from 'src/app/services/common-emitter.service';
declare const FB: any;
declare const window: any;

@Component({
  selector: 'app-login-with-facebook',
  templateUrl: './login-with-facebook.component.html',
  styleUrls: ['../socialsignup.css', '../btneffect.css', './login-with-facebook.component.scss']
})
export class LoginWithFacebookComponent implements OnInit {
  @ViewChild(SocialLoginPopupsComponent) socialLoginPopups: SocialLoginPopupsComponent;
  @Output() emitResponseOfLoginCheck = new EventEmitter();
  @Input() showsignupform: boolean;
  @Input() buttonText: 'Facebook';
  @Input() from = '';
  accessToken: any;
  isRoutThree: boolean;
  refCode_1: string;
  refCode_2: string;
  refCode: string;
  model: any;
  showText: boolean;
  dataConf: any;
  error: any;
  openConfirmation: boolean;
  showErrorBox: boolean;
  loginType: string;
  loaderFB: boolean;
  verifyLater: any;
  interests: any = [];

  constructor(
    public _constantService: ConstantService,
    public changDetector: ChangeDetectorRef,
    private _encryptionService: EncryptionService,
    private _cookie: CookieService,
    private _router: Router,
    private commonEmitterService: CommonEmitterService

  ) { }

  checkSocialLogin(accessToken, typ) {
    this.loginType = 'f';
    this.socialLoginPopups.accessToken = accessToken;
    this.socialLoginPopups.type = 'f';
    this.accessToken = accessToken;
    const chkId = {};
    chkId['token_param'] = {};
    chkId['token_param']['device_type'] = 'w';
    chkId['token_param']['host'] = '';
    chkId['acs_tkn'] = accessToken;
    chkId['t'] = typ;
    chkId['vrf_l'] = this.verifyLater;
    chkId["rfc"] = localStorage.getItem('rfc') ? localStorage.getItem('rfc') : '';


    this._constantService.fetchDataApi(this._constantService.checkSocialLogin(), chkId).subscribe(data => {
      const responseData: any = data;
      const status = responseData.STATUS;
      if (status == 'success') {
        this._constantService.setSessionJsonPair(
          "MOBILE_CNTRY_ID",
          responseData.MOBILE_CNTRY_ID
        );
        if (responseData.ROUT == 1) {
          this.setDetailsAfterLogin(responseData);
          this._constantService.getInterest();
        } else if (responseData.ROUT == 5) {
          this.socialLoginPopups.openMobileNumberPopup();
        } else if (responseData.ROUT == 2) {
          this.socialLoginPopups.openEmailPopup();
        } else if (responseData.ROUT == 3) {
          this.isRoutThree = true;
          this.refCode = "";
          this.refCode_1 = '';
          this.refCode_2 = '';
          this.model.otp = '';
          this.socialLoginPopups.verificationType = 'e';

          this.socialLoginPopups.verifyOTPForSocial('f', '');
        } else if (responseData.ROUT == 4) {
          this.showText = true;
          this.dataConf['type'] = 2;
          this.dataConf['msg'] = 'STUDY24X7';
          this.dataConf['error_msg'] = responseData.ERROR_MSG;
          this.error = this.dataConf['error_msg'];
          this.openConfirmation = true;
          this.showErrorBox = true;
          return;
        }
      }
      if (status == 'error') {
        this._constantService.showToast(responseData.ERROR_MSG, '', '2');
      }
      this.changDetector.detectChanges();
    }, error => {
      const responseData = error;
      if (responseData.status == 500) {
        this._router.navigate(['500']);
      }
      this.changDetector.detectChanges();
    });
  }


  facebookLogin() {
    this.loaderFB = true;
    this.changDetector.detectChanges();

    FB.getLoginStatus((response: any) => {

      var response = response;

      if (response.status == 'connected') {

        this.accessToken = response.authResponse.accessToken;

        FB.api('/me', { fields: 'id,name,email,first_name,last_name,gender,picture.type(large)' }, (response) => {
          this.checkSocialLogin(this.accessToken, 'f');
        });
      } else {
        FB.login((response: any) => {
          if (response.authResponse) {
            var response = response;
            this.accessToken = response.authResponse.accessToken;
            FB.api('/me', { fields: 'id,name,email,first_name,last_name,gender,picture.type(large)' }, (response: any) => {
              this.checkSocialLogin(this.accessToken, 'f');
            });
          } else {
          }
        }, { scope: 'public_profile' });
      }
      this.loaderFB = false;
    });
  }


  ngOnInit() {
    var fbId = this._constantService.facebookAppId;
    window.fbAsyncInit = function () {
      FB.init({
        appId: fbId,
        xfbml: true,
        version: 'v3.2'
      });
      //        FB.AppEvents.logPageView();

    };
    var my_awesome_script = document.createElement('script');

    my_awesome_script.setAttribute('src', 'https://connect.facebook.net/en_US/sdk.js');

    document.head.appendChild(my_awesome_script);

  }
  setDetailsAfterLogin(responseData) {
    this._constantService.setSessionJsonPair('publicClickedURL', window.location.href);
    console.log('Facebook Login:', responseData);

    this.commonEmitterService.loginSuccesful(true);
    this._constantService.setSessionJsonPair("loginTime", new Date().getTime());
    this._constantService.setSessionJsonPair('social_login', 'true');
    this._constantService.setSessionJsonPair('token', responseData.TOKEN);
    var expiredDate = new Date();
    expiredDate.setDate(expiredDate.getDate() + 90);
    this._cookie.set('study247', this._encryptionService.encrypt(responseData.TOKEN), expiredDate, '/');
    this._constantService.setUserInterest(responseData.USER_INTEREST.toString()); console.log(responseData, typeof (responseData.USER_INTEREST));

    this._constantService.setSessionJsonPair('u_id', responseData.USER_ID);

    if (responseData.COUNTRY != "" && responseData.COUNTRY != null) {
      this._constantService.setCountry(responseData.COUNTRY);
      this._constantService.setSessionJsonPair('country', responseData.COUNTRY);
    } else {
      this._constantService.setCountry(null);
    }
    if (responseData.MOBILE != "") {
      this._constantService.setSessionJsonPair('mobile', responseData.MOBILE);
    }
    if (responseData.ISEMAILVERIFIED == 0) {
      this._constantService.setEmailVer('false');
    } else {
      this._constantService.setEmailVer('true');
    }
    if (responseData.ISMOBILEVERIFIED == 0) {
      this._constantService.setSessionJsonPair('mobile_verify', 'false');
    } else {
      //this._constantService.setMobileVer('true');
      this._constantService.setSessionJsonPair('mobile_verify', 'true');
    }

    if (responseData.EMAIL) {
      this._constantService.setEmail(responseData.EMAIL);
      this._constantService.setSessionJsonPair('em', responseData.EMAIL);

    }
    var date = new Date();
    this._constantService.setSessionJsonPair('profile_pic_s3', responseData.PROFILE_PHOTO_PATH);
    this._constantService.setSessionJsonPair('p_pic', responseData.PROFILE_PHOTO_PATH + "profile/" + this._constantService.getSessionDataBYKey('u_id') + "_60x60.png?v=" + date.getTime());
    if (responseData.MOBILE_CNTRY_ID) {
      this._constantService.setSessionJsonPair(
        "MOBILE_CNTRY_ID",
        responseData.MOBILE_CNTRY_ID
      );
    }

    this.getUserDetail();
  }





  messageAction($event) {
    if ($event == 'close') {
      this.loaderFB = false;
    } else if ($event == 'VL') {
      this.verifyLater = 1;
    }
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
        this._constantService.setSessionJsonPair('dob', responseData.DOB);
        this._constantService.setSessionJsonPair('gender', responseData.GENDER);
        this._constantService.setSessionJsonPair('MOBILE_CNTRY_ID', responseData.MOBILE_CNTRY_ID);
        this._constantService.setSessionJsonPair('p_pic', responseData.PROFILE_PHOTO_PATH + "profile/" + this._constantService.getSessionDataBYKey('u_id') + "_60x60.png?v=" + date.getTime());
        localStorage.setItem('userType', responseData.IS_TEACHER);
        var publicClickedURL = this._constantService.getSessionDataBYKey('publicClickedURL');
        if (publicClickedURL) {
          this._constantService.setSessionJsonPair('publicClickedURL', '');
          window.location.href = publicClickedURL;
        } else { this._router.navigate(["home"]); }

      }
    });
  }

}
