import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { ConstantService } from 'src/app/services/constant.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EncryptionService } from 'src/app/services/encryption.service';

@Component({
  selector: 'app-social-login-popups',
  templateUrl: './social-login-popups.component.html',
  styleUrls: ['../../../sharedComponents/loginpopup/forgot-password/forgot-password.component.scss', './social-login-popups.component.scss']
})
export class SocialLoginPopupsComponent implements OnInit {
  popup = '';
  @Input() type = '';
  otpTargetInfo: any = {};
  mobileNumber: any;
  verificationType: any = '';
  @Output() emitOtpTargetInfo = new EventEmitter<any>();
  @Output() socialLoginPopupMessage = new EventEmitter<any>();
  inputFromPopup: any = '';
  otpCountdown: any;
  stopTimer = false;
  shwResend: boolean;
  countDisplay: string;
  count: number;
  otpSentCount = 1;
  placeholder = 'Write your mobile number';
  accessToken = '';
  refCode_1: any = '';
  refCode_2: any = '';
  dataConf: any;
  otp: any;
  submitLoader: boolean;
  showPreloader: boolean = false;
  isMobileView: boolean;
  smallHeightView: boolean;
  error = "";
  interests: any = [];
  countryId: any = '1';

  constructor(
    public changeDetector: ChangeDetectorRef,
    public _constantService: ConstantService,
    private _router: Router,
    private _cookie: CookieService,
    private _encryptionService: EncryptionService,

  ) { }

  @HostListener('window:resize', ['$event'])

  onResize(event) {
  }


  isEmail(search: string): boolean {
    var regexp = new RegExp(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/);
    return regexp.test(search);
  }


  setOtpTargetInfo(isResendOtp) {
    if (!isResendOtp) {
      if (this.inputFromPopup) {
        if (this.isMobile(this.inputFromPopup) || this.isEmail(this.inputFromPopup)) {
          if (this.verificationType == 'e') {
            this.otpSentCount = 1;
          }

          this.otpTargetInfo.target = this.inputFromPopup;

          this.otpTargetInfo.type = this.type;
          this.otpTargetInfo.verificationTyp = this.verificationType;
          this.sendOtpForSocial(this.otpTargetInfo);
        }
        else {
          if (this.verificationType == 'm') {
            // this._constantService.showToast("Please enter a valid mobile number", "", 2);
            this.error = "Please enter a valid mobile number";
          } else if (this.verificationType == 'e') {
            // this._constantService.showToast("Please enter a valid email address", "", 2);
            this.error = "Please enter a valid email address";
          }
        }
      } else {
        // this._constantService.showToast("Please provide a required field to recieve an OTP", "", 2);
        this.error = "Please provide a required field to recieve an OTP";

      }
    } else {
      if (this.otpSentCount >= 3 && this.verificationType == 'm') {
        this.shwResend = false;
      } else {
        if (this.verificationType == 'e') {
          this.otpSentCount = 1;
        }
        this.sendOtpForSocial(this.otpTargetInfo);
        this.otpSentCount++;
      }


    }

  }

  setOtpVarificationInfo() {
    this.otp = this.inputFromPopup;
    console.log(this.otp);
    if (this.otp == "") {
      // this._constantService.showToast('Please enter OTP', '', '2');
      this.error = "Please enter OTP";
    } else
      if (this.otp.length == 4) {
        this.verifyOTPForSocial(this.type, this.otp);
      } else {
        // this._constantService.showToast('Enter a valid OTP', '', '2');
        this.error = "Enter a valid OTP";
      }
  }

  openOtpPopup() {
    this.shwResend = false;
    this.popup = 'otp';
    this.countDisplay = "00:30";
    this.count = 30;
    this.countdown();
    this.placeholder = 'Enter OTP';
    this.inputFromPopup = '';
  }

  openEmailPopup() {
    this.shwResend = false;
    this.otpSentCount = 1;
    this.popup = 'email';
    this.verificationType = 'e';
    this.placeholder = 'Enter your email';
    this.inputFromPopup = '';
  }

  openMobileNumberPopup() {
    this.shwResend = false;
    this.otpSentCount = 1;
    this.popup = 'number';
    this.verificationType = 'm';
    this.placeholder = 'Enter your mobile number';
    this.inputFromPopup = '';
    this.changeDetector.detectChanges();
  }

  ngOnInit() {
    if (window.innerWidth <= 720) {
      this.isMobileView = true;
    } else {
      this.isMobileView = false;
    }

    if (window.innerHeight <= 360) {
      this.smallHeightView = true;
    } else {
      this.smallHeightView = false;
    }
  }

  countdown() {
    if (this.otpCountdown) {
      clearInterval(this.otpCountdown);
    }
    this.otpCountdown = setInterval(() => {
      if (this.stopTimer == false) {
        if (this.count <= 0) {
          clearInterval(this.otpCountdown);
          this.shwResend = true;
          return false;
        } else {
          this.shwResend = false;
          if (this.count <= 10) {
            this.count--;
            this.countDisplay = '00:0' + this.count;
          } else {
            this.count--;
            this.countDisplay = '00:' + this.count;
          }
          this.changeDetector.detectChanges();
        }
      } else {
        clearInterval(this.otpCountdown);
        return false;
      }
    }, 1000)
  }

  resetVariables() {
    this.popup = '';
    this.type = '';
    this.otpTargetInfo = {};
    this.mobileNumber = '';
    this.verificationType = '';
    this.inputFromPopup = '';
    this.otpCountdown = 0;
    this.stopTimer = false;
    this.shwResend = false;
    this.countDisplay = '';
    this.count = 0;
    this.otpSentCount = 0;
    this.error = '';
  }

  closePopup() {
    this.socialLoginPopupMessage.emit('close');
  }

  //This function is to set popup type.
  setPopup(popup) {
    this.popup = popup;
    document.getElementById('socialLoginPopupInput').focus();
  }

  sendOtpForSocial(otpTargetInfo) {
    this.shwResend = false;
    this.showPreloader = true;
    this.submitLoader = true;
    const chkId = {};
    chkId['token_param'] = {};
    chkId['token_param']['device_type'] = 'w';
    chkId['token_param']['host'] = '';
    chkId['acs_tkn'] = this.accessToken;
    chkId['lc'] = otpTargetInfo.target;
    chkId['t'] = otpTargetInfo.type;
    chkId['type'] = otpTargetInfo.verificationTyp;
    chkId['conid'] = this.countryId;
    this._constantService.setSessionJsonPair('MOBILE_CNTRY_ID', this.countryId);

    this._constantService.fetchDataApi(this._constantService.sendOTPForSocial(), chkId).subscribe(data => {
      const responseData: any = data;
      const status = responseData.STATUS;
      if (status == 'success') {
        this.shwResend = true;
        this.showPreloader = false;
        this.openOtpPopup();
        if (responseData.REF_CODE_1) { this.refCode_1 = responseData.REF_CODE_1; }
        if (responseData.REF_CODE_2) { this.refCode_2 = responseData.REF_CODE_2; }
        this.error = '';
      } else if (responseData.STATUS === 'error') {
        this.showPreloader = false;
        this._constantService.showToast(responseData.ERROR_MSG, '', '2');
        this.changeDetector.detectChanges();


      }
      this.submitLoader = false;
    }, error => {

      if (error.status == 500) {
        this._router.navigate(['500']);
      } else if (error.status == 'error') {
        if (error.ROUT == 4) {
        }
      }
      this.changeDetector.detectChanges();
    });
  }

  isMobile(search: string): boolean {

    var regexp = new RegExp(/^[0-9]{10}$/);
    return regexp.test(search);
  }


  verifyOTPForSocial(typ, otp) {
    this.showPreloader = true;
    this.submitLoader = true;
    let urlLink;
    const chkOtp: any = {};
    chkOtp['token_param'] = {};
    chkOtp['token_param']['device_type'] = 'w';
    chkOtp['token_param']['host'] = '';
    chkOtp['acs_tkn'] = this.accessToken;
    chkOtp['rfc'] = localStorage.getItem('rfc') ? localStorage.getItem('rfc') : '';
    if (this.verificationType == 'e') {
      chkOtp['ref_id_1'] = this.refCode_1;
      chkOtp['ref_id_2'] = this.refCode_2;
      urlLink = this._constantService.newVerifyOTPForESocial();
    } else if (this.verificationType == 'm') {
      chkOtp['ref_id_1'] = this.refCode_1;
      urlLink = this._constantService.newVerifyOTPForMSocial();
    } else {
      alert('error!' + this.verificationType);
    }
    chkOtp['vcod'] = otp;
    chkOtp['t'] = typ;

    const localCookie = this._cookie.get('publicClickedURL');

    if (localCookie) {
      const urlArr = localCookie.split('/');
      if (urlArr[urlArr.length - 2] == 'page') {
        chkOtp['intrst_ref'] = urlArr[urlArr.length - 1];
        chkOtp['type'] = 'pg';
      } else if (urlArr[urlArr.length - 2] == 'course') {
        const urlCourse = urlArr[urlArr.length - 1].split('-');
        const courseId = urlCourse[urlCourse.length - 1];
        chkOtp['intrst_ref'] = courseId;
        chkOtp['type'] = 'c';
      }
      chkOtp.conid = this.countryId;
    }
    chkOtp.conid = this.countryId;

    this._constantService.fetchDataApi(urlLink, chkOtp).subscribe(data => {
      const responseData: any = data;
      const status = responseData.STATUS;
      if (status == 'success') {
        this.error = '';
        this.showPreloader = false;
        if (responseData.MOBILE_CNTRY_ID) {
          this._constantService.setSessionJsonPair(
            "MOBILE_CNTRY_ID",
            responseData.MOBILE_CNTRY_ID
          );
        }
        if (responseData.ROUT == 2) {
          this.openEmailPopup();
        } else if (responseData.ROUT == 3) {
          this.refCode_2 = '';
          this.verificationType = 'e';
          this.verifyOTPForSocial(this.type, '');
        } else if (responseData.ROUT == 4) {
          this.dataConf['type'] = 2;
          this.dataConf['msg'] = "STUDY24X7";
          this.dataConf['error_msg'] = responseData.ERROR_MSG;
          this._constantService.showToast(responseData.ERROR_MSG, '', '2');
        } else {
          this.changeDetector.detectChanges();
          this._constantService.setSessionJsonPair('social_login', 'true');
          this._constantService.setSessionJsonPair('token', responseData.TOKEN);
          this._constantService.setSessionJsonPair('isInterestSet', responseData.INTEREST_UPD_STATUS);

          if (responseData.COUNTRY != '' && responseData.COUNTRY != null) {
            this._constantService.setCountry(responseData.COUNTRY);
          } else {
            this._constantService.setCountry(null);
          }
          if (responseData.MOBILE != '') {
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
          if (responseData.USER_INTEREST) {
            this._constantService.setUserInterest(responseData.USER_INTEREST);
          }
          if (responseData.EMAIL) {
            this._constantService.setEmail(responseData.EMAIL);
            this._constantService.setSessionJsonPair('em', responseData.EMAIL);
          }
          if (responseData.USER_INTEREST != 0 && responseData.USER_INTEREST != null) {
            var publicClickedURL = this._constantService.getSessionDataBYKey('publicClickedURL');
            this._constantService.setSessionJsonPair('publicClickedURL', '');
            if (publicClickedURL) {
              window.location.href = publicClickedURL;
            } else { this._router.navigate(["home"]); }

          } else {
            if (localStorage.getItem('rfc') == 'career') {
              this.getInterestAndSetInterestsForUsersFromCareer();

            } else
              this._router.navigate(['verification']).then(() => { window.location.reload(); });
          }
        }
      }
      else {
        this.showPreloader = false;
        // this._constantService.showToast("Enter valid OTP or click on Resend OTP if not recieved.", "", 2);
        this.error = "Enter valid OTP or click on Resend OTP if not recieved.";
      }
      this.submitLoader = false;
      this.changeDetector.detectChanges();
    }, error => {
      if (error.status == 500) {
        this._router.navigate(['500']);
      }
    });
    this.changeDetector.detectChanges();

  }
  verifyLater() {
    if (this.count > 15) {
      return false;
    } else {
      this.socialLoginPopupMessage.emit('VL');
    }

  }
  editTarget() {
    var inputFromPopup = this.otpTargetInfo.target;
    if (this.verificationType == 'e') {
      this.openEmailPopup();

    } else if (this.verificationType == 'm') {
      this.openMobileNumberPopup();
    }
    this.inputFromPopup = inputFromPopup;
  }

  getInterestAndSetInterestsForUsersFromCareer() {
    this._constantService.fetchDataApiWithoutBody(this._constantService.getInterestv1ServiceUrl()).subscribe(data => {
      let responseData: any = data;
      var interests = [];
      this.interests = responseData.INTERESTS_DATA;
      this.interests.forEach(interestCategory => {
        if (interestCategory.INTEREST_CATEGORY_ID == '5') {
          interestCategory.INTERESTS.forEach(interest => {
            interests.push(interest.INTEREST_ID);
          });
        }
      });
      var ids = interests.join();
      this.updateUserInterest(ids, interests.length);


    }, error => {

      var responseData = error;
      if (responseData.status == 500) {
        this._router.navigate(['500']);
      }
    });
  }

  updateUserInterest(ids, numberOfInterests) {
    var user_interest = {};
    user_interest['token'] = this._constantService.getSessionDataBYKey('token');
    user_interest['token_param'] = {};
    user_interest['token_param']["device_type"] = "w";
    user_interest['token_param']["host"] = "";
    user_interest['iid'] = ids;
    this._constantService.fetchDataApi(this._constantService.getAddInterstServiceUrl(), user_interest).subscribe(data => {
      var responseData: any = data;
      var status = responseData.STATUS;
      if (status == 'success') {
        //this._constantService.setToken(responseData.TOKEN);
        this._constantService.setSessionJsonPair('token', responseData.TOKEN);
        this._constantService.setUserInterest(numberOfInterests + '');
        localStorage.setItem('rfc', '');
        var pulicClickeUrl = this._constantService.getSessionDataBYKey('publicClickedURL');
        if (pulicClickeUrl) {
          this._constantService.setSessionJsonPair('publicClickedURL', '');
          window.location.replace(pulicClickeUrl);
        } else {
          this._router.navigate(["/home"]);
        }
      } else if (status == 'error_token') {
        this.dataConf['type'] = 4;
        this.dataConf['msg'] = "Session Expire";
        this.dataConf['error_msg'] = "Session Expired";

      } else if (status == "error" && responseData.ERROR_MSG == "Interest already saved") {
        this._router.navigate(['home']);
      }
      else {
        this.dataConf['type'] = 2;
        this.dataConf['msg'] = "STUDY24X7";
        this.dataConf['error_msg'] = responseData.ERROR_MSG;
      }


    }, error => {


      var responseData = error;
      if (responseData.status == 500) {
        this._router.navigate(['500']);
      }
    });
  }
  setMobileNumberAndCountryCode(emittedObject) {
    this.inputFromPopup = emittedObject.mobileNumber;
    this.countryId = emittedObject.countryId;
  }
}
