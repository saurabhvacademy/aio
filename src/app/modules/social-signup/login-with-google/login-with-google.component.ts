import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { SocialLoginPopupsComponent } from '../social-login-popups/social-login-popups.component';
import { ConstantService } from 'src/app/services/constant.service';
import { EncryptionService } from 'src/app/services/encryption.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AnyAaaaRecord } from 'dns';
import { CommonEmitterService } from 'src/app/services/common-emitter.service';
declare var gapi: any;
declare const window: any;
declare var googleyolo: any;



@Component({
  selector: 'app-login-with-google',
  templateUrl: './login-with-google.component.html',
  styleUrls: ['../socialsignup.css', '../btneffect.css', './login-with-google.component.scss']
})
export class LoginWithGoogleComponent implements OnInit, AfterViewInit {
  @ViewChild(SocialLoginPopupsComponent) socialLoginPopups: SocialLoginPopupsComponent;
  popup = '';
  model: any = {};
  showText: boolean;
  dataConf: any;
  error: any;
  openConfirmation = false;
  refCode = '';
  @Output() emitResponseOfLoginCheck: EventEmitter<any> = new EventEmitter();
  @Input() showsignupform: boolean;
  @Input() buttonText = 'Google';
  @Input() from = '';
  refCode_1: string;
  refCode_2: string;
  isRoutThree: boolean;
  loginType: string;
  showErrorBox: boolean;
  accessToken: any;
  public auth2: any;
  loaderGoogle: boolean;
  verifyLater: any = 0;
  interests: any = [];
  credentials: any;

  constructor(
    public _constantService: ConstantService,
    public changeDetector: ChangeDetectorRef,
    private _encryptionService: EncryptionService,
    private _cookie: CookieService,
    private _router: Router,
    private commonEmitterService: CommonEmitterService

  ) { }

  googleInit() {
    this.auth2 = gapi.auth2.getAuthInstance();

    this.auth2.attachClickHandler(document.getElementById('googleBtnLogin'), {},
      (googleUser) => {
        this.loaderGoogle = true;
        var authResponse = googleUser.getAuthResponse(true);
        this.accessToken = googleUser.getAuthResponse(true).access_token;
        let profile = googleUser.getBasicProfile();
        var response = {};
        response['id'] = profile.getId();
        response['first_name'] = profile.getGivenName().replace(/[^a-zA-Z ]/g, "");
        response['last_name'] = profile.getFamilyName().replace(/[^a-zA-Z ]/g, "");
        response['email'] = profile.getEmail();
        response['picture'] = {};
        response['picture']['data'] = {};
        response['picture']['data']['url'] = profile.getImageUrl();
        console.log('Response: ', response);
        this.checkSocialLogin(this.accessToken, 'g');
        this.changeDetector.detectChanges();
        console.log("Google Auth Response: ", authResponse);
      }, (error) => {
        // this._constantService.showToast('login error occurred', '', '2');
      });
  }


  checkSocialLogin(accessToken, typ) {
    console.log("yes im call");
    this.accessToken = accessToken;
    this.loaderGoogle = true;
    this.socialLoginPopups.accessToken = accessToken;
    this.socialLoginPopups.type = 'g';
    this.accessToken = accessToken;
    const chkId = {};
    chkId['token_param'] = {};
    chkId['token_param']['device_type'] = 'w';
    chkId['token_param']['host'] = '';
    chkId['acs_tkn'] = accessToken;
    chkId['t'] = typ;
    chkId["vrf_l"] = this.verifyLater;
    chkId["rfc"] = localStorage.getItem('rfc') ? localStorage.getItem('rfc') : '';
    chkId['credentials']=this.credentials;

    this._constantService.fetchDataApi(this._constantService.checkSocialLogin(), chkId).subscribe(data => {
      const responseData: any = data;
      const status = responseData.STATUS;
      if (status == 'success') {

        this.loginType = 'g';
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
          this.socialLoginPopups.verifyOTPForSocial('g', '');
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
      this.loaderGoogle = true;
      this.changeDetector.detectChanges();
    }, error => {
      const responseData = error;
      if (responseData.status == 500) {
        this._router.navigate(['500']);
      }
      this.changeDetector.detectChanges();
    });
  }

  closePopup(event) {
    this.openConfirmation = false;
  }

  ngOnInit() {
    setTimeout(() => {
      this.googleInit();
      const hintPromise = googleyolo.hint({
        supportedAuthMethods: [
           "https://accounts.google.com"
        ],
        supportedIdTokenProviders: [
        {
           uri: "https://accounts.google.com",
           clientId: "820432769646-rvnalptiheclr2n3um6fevdcduill802.apps.googleusercontent.com"
        }
       ]
     });
 

    }, 1000);

  }

  ngAfterViewInit() {

  }


  setDetailsAfterLogin(responseData) {
    this._constantService.setSessionJsonPair('publicClickedURL',window.location.href);
    console.log('Google Login:', responseData);
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

    // window.location.reload();

   

  }


  messageAction($event) {
    if ($event == 'close') {
      this.loaderGoogle = false;
    } else if ($event == 'VL') {
      this.verifyLater = 1;
      this.checkSocialLogin(this.accessToken, 'g')
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
        this._constantService.setSessionJsonPair('dob',responseData.DOB);
        this._constantService.setSessionJsonPair('gender',responseData.GENDER);
        this._constantService.setSessionJsonPair('MOBILE_CNTRY_ID',responseData.MOBILE_CNTRY_ID);
        this._constantService.setSessionJsonPair('p_pic', responseData.PROFILE_PHOTO_PATH + "profile/" + this._constantService.getSessionDataBYKey('u_id') + "_60x60.png?v=" + date.getTime());
        var publicClickedURL = this._constantService.getSessionDataBYKey('publicClickedURL'); 
        localStorage.setItem('userType', responseData.IS_TEACHER);
            if (publicClickedURL) {
              this._constantService.setSessionJsonPair('publicClickedURL','');
              window.location.href=publicClickedURL;
            } else { this._router.navigate(["home"]); }
            
      }
    });
  }
  callCheckSocialLogin(event){
    this.credentials=event.target.value;
    this.checkSocialLogin(this.accessToken,'g');
  }
 
}
