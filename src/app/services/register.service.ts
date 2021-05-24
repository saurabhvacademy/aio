import { Injectable } from '@angular/core';
import { ConstantService } from './constant.service';
import { CookieService } from 'ngx-cookie-service';
import { GoogleAnalyticsService } from './google-analytics.service';
import { EncryptionService } from './encryption.service';
import { Router } from '@angular/router';
import { EmitService } from '../sharedComponents/addpost/emit.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  expiredDate: any;

  constructor(
    private _constantService: ConstantService,
    private _cookie: CookieService,
    private googleAnalyticsService: GoogleAnalyticsService,
    private _encryptionService: EncryptionService,
    private _router: Router,
    private emitService: EmitService
  ) { }

  errorDetails = {
    lastName: {
      msg: '',
      error: false
    },
    firstName: {
      msg: '',
      error: false
    },
    email: {
      msg: '',
      error: false
    },
    mobileNumber: {
      msg: '',
      error: false
    },
    countryId: {
      msg: '',
      error: false
    },
    password: {
      msg: '',
      error: false
    },
    dateOfBirth: {
      msg: '',
      error: false
    },
    noOfErrors: 0,
    ERROR_MSG: ''


  };



  registerSubmit(registrationDetails: {
    email: string,
    mobileNumber: string,
    firstName: string,
    lastName: string,
    countryId: number,
    dateOfBirth: string,
    gd: string,
    password: string

  }) {
    this.errorDetails = {
      lastName: {
        msg: '',
        error: false
      },
      firstName: {
        msg: '',
        error: false
      },
      email: {
        msg: '',
        error: false
      },
      mobileNumber: {
        msg: '',
        error: false
      },
      countryId: {
        msg: '',
        error: false
      },
      password: {
        msg: '',
        error: false
      },
      dateOfBirth: {
        msg: '',
        error: false
      },
      noOfErrors: 0,
      ERROR_MSG: ''


    };

    if (!this._constantService.isMobile(registrationDetails.mobileNumber)) {
      this.errorDetails.mobileNumber.error = true;
      this.errorDetails.noOfErrors++;
      this.errorDetails.mobileNumber.msg = 'Enter a valid mobile number';
    }
    if (!this._constantService.isEmail(registrationDetails.email)) {
      this.errorDetails.email.error = true;
      this.errorDetails.noOfErrors++;
      this.errorDetails.email.msg = 'Enter your email id.';
    }
    if (!registrationDetails.firstName) {
      this.errorDetails.firstName.error = true;
      this.errorDetails.noOfErrors++
      this.errorDetails.firstName.msg = 'Enter your first name';
    }
    if (!registrationDetails.lastName) {
      this.errorDetails.lastName.error = true;
      this.errorDetails.noOfErrors++
      this.errorDetails.lastName.msg = 'Enter your last name';

    }
    if (!registrationDetails.countryId) {
      this.errorDetails.countryId.error = true;
      this.errorDetails.noOfErrors++;
    }
    if (!registrationDetails.password || !this.isPassword(registrationDetails.password)) {
      this.errorDetails.password.error = true;
      this.errorDetails.password.msg = '"Use 6-20 characters with a combination of numbers, letters and !@#$%^&*()_=+"'
      this.errorDetails.noOfErrors++;
    }

    if (registrationDetails.dateOfBirth) {
      const dateArr = registrationDetails.dateOfBirth.split('/');
      if (dateArr.length == 3) {
        if (!this.isValidDate(registrationDetails.dateOfBirth)) {
          this.errorDetails.dateOfBirth.error = true;
          this.errorDetails.dateOfBirth.msg = 'Date is not valid';
          this.errorDetails.noOfErrors++;
        }
      } else {

        this.errorDetails.dateOfBirth.error = true;
        this.errorDetails.dateOfBirth.msg = 'Please provid date of birth in DD/MM/YYYY format'
        this.errorDetails.noOfErrors++;


      }

    }
    if (this.errorDetails.noOfErrors > 0) {
      return this.errorDetails;
    }

    this._constantService.setEmail(registrationDetails.email.toLowerCase().trim());
    //this._constantService.setMobile(this.modelRegister.mn.trim());
    this._constantService.setSessionJsonPair(
      'em',
      registrationDetails.email.toLowerCase().trim()
    );
    this._constantService.setSessionJsonPair(
      'mobile',
      registrationDetails.mobileNumber.trim()
    );
    this._constantService.setCountry(registrationDetails.countryId + '');


    var login_d = {};
    //login_d = this.modelRegister;
    login_d['em'] = registrationDetails.email.trim();
    login_d['mn'] = registrationDetails.mobileNumber.trim();
    login_d['fn'] = registrationDetails.firstName.trim();
    login_d['ln'] = registrationDetails.lastName.trim();
    login_d['conid'] = registrationDetails.countryId;
    if (registrationDetails.dateOfBirth && registrationDetails.dateOfBirth != '') {
      var dateOfBirth = registrationDetails.dateOfBirth.split('/');
      var dob = dateOfBirth[2] + '-' + dateOfBirth[1] + '-' + dateOfBirth[0];
      login_d['dob'] = dob;
    } else {
      login_d['dob'] = '';
    }

    login_d['gd'] = '';
    login_d['pd'] = registrationDetails.password;
    login_d['token_param'] = {};
    login_d['token_param']['device_type'] = 'w';
    login_d['token_param']['host'] = '';
    login_d["rfc"] = localStorage.getItem('rfc') ? localStorage.getItem('rfc') : '';



    // let setCookie = this._cookie.get('publicClickedURL');
    // console.log(setCookie);
    let localCookie = this._cookie.get('publicClickedURL');
    if (localCookie) {
      let urlArr = localCookie.split('/');
      if (urlArr[urlArr.length - 2] == 'page') {
        login_d['intrst_ref'] = urlArr[urlArr.length - 1];
        login_d['type'] = 'pg';
      } else if (urlArr[urlArr.length - 2] == 'course') {
        let urlCourse = urlArr[urlArr.length - 1].split('-');
        let courseId = urlCourse[urlCourse.length - 1];
        login_d['intrst_ref'] = courseId;
        login_d['type'] = 'c';
      }
    }
    this._constantService
      .fetchDataApi(this._constantService.getRegisterServiceUrl(), login_d)
      .subscribe(
        (data) => {
          var responseData: any = data;
          var status = responseData.STATUS;


          if (status == 'success') {
            this.googleAnalyticsService.eventEmitter(
              'web_Clicked',
              'web_Register',
              'web_Register Now',
              'web_Clicked',
              0
            );
            this.emitService.registerErrorObjectEmitted(this.errorDetails);
            var expiredDate = new Date();
            expiredDate.setDate(expiredDate.getDate() + 90);
            this._cookie.set(
              'study247',
              this._encryptionService.encrypt(responseData.TOKEN),
              expiredDate,
              '/'
            );

            this._constantService.setSessionJsonPair('country', registrationDetails.countryId);
            this._constantService.setSessionJsonPair('MOBILE_CNTRY_ID',registrationDetails.countryId);
            this._constantService.setUserInterest('0');
            //this._constantService.setToken(responseData.TOKEN);
            this._constantService.setSessionJsonPair(
              'token',
              responseData.TOKEN
            );
            this._constantService.setSessionJsonPair(
              'isInterestSet',
              responseData.INTEREST_UPD_STATUS
            );
            this._constantService.setEmailVer('false');
            //this._constantService.setMobileVer("false");
            this._constantService.setSessionJsonPair('v_e', 'false');
            this._constantService.setSessionJsonPair('v_m', 'false');
            setTimeout(() => {
              this._router.navigate(['verification']);
            }, 200);

            //                this._router.navigate(['home']);
          } else if (status == 'error_token') {
            this.errorDetails.ERROR_MSG = responseData.ERROR_MSG;
            this.errorDetails.noOfErrors++;
            this.emitService.registerErrorObjectEmitted(this.errorDetails);

            this._constantService.setSessionJsonPair('token', '');
            this._constantService.clearUserInfo();
            //                this._router.navigate(['']);
            window.location.reload();
          } else {
            this.errorDetails.ERROR_MSG = responseData.ERROR_MSG;
            this.emitService.registerErrorObjectEmitted(this.errorDetails);
          }
        },
        (error) => {
          var responseData = error;
          if (responseData.status == 500) {
            this._router.navigate(['500']);
          }
        }
      );
    return this.errorDetails;
  }
  isPassword(search: string): boolean {
    var regexp = new RegExp(/^[A-Za-z0-9!@#$%^&*()_=+]{6,20}$/);
    return regexp.test(search);
  }

  isValidDate(date: string): boolean {
    var matches = /^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/.exec(date);
    if (matches == null) return false;
    let d: number;
    let m: number;
    let y: number;
    d = +matches[1];
    m = +matches[2];
    y = +matches[3];
    return this.isDate(d, m, y);
  }

  isDate(day: number, month: number, year: number): boolean {
    const current_year = new Date().getFullYear();
    if (day == 0 || year < 1940 || year > current_year - 13) {

      return false;
    }
    if (year < current_year - 13) {

    } else if (year > current_year - 13) {
      this.errorDetails.dateOfBirth.error = true;
      this.errorDetails.dateOfBirth.msg = 'Minimum age for sign up should be 13 !';
    }
    switch (month) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        if (day > 31) return false;
        return true;
      case 2:
        if (year % 4 == 0)
          if (day > 29) {
            return false;
          } else {
            return true;
          }
        if (day > 28) {
          return false;
        }

        return true;
      case 4:
      case 6:
      case 9:
      case 11:
        if (day > 30) {
          return false;
        }
        return true;
      default:
        return false;
    }
  }

  formatDate(value) {
    var inputValue;
    var dateCountTracker;
    var currentDate = value;
    var currentLength = currentDate.length;
    var lastNumberEntered = currentDate[currentLength - 1];
    if (currentLength > 10) {
      var res = currentDate.substring(0, 10);
      inputValue = res;
      return inputValue;
    }

    if (currentLength == 1 && currentDate > 3) {
      var transformedDate = '0' + currentDate + '/';
      dateCountTracker = 2;
      currentLength = transformedDate.length;
      inputValue = transformedDate;
      return inputValue;
    } else if (currentLength == 4 && currentDate[3] > 3) {
      var transformedDate =
        currentDate.substring(0, 3) + '0' + currentDate[3] + '/';
      dateCountTracker = 5;
      currentLength = transformedDate.length;
      inputValue = transformedDate;

      return inputValue;
    } else if (
      currentLength == 2 &&
      dateCountTracker != 2 &&
      dateCountTracker != 3
    ) {
      dateCountTracker = currentLength;
      inputValue = currentDate + '/';

      return inputValue;
    } else if (
      currentLength == 5 &&
      dateCountTracker != 5 &&
      dateCountTracker != 6
    ) {
      dateCountTracker = currentLength;
      // return currentDate + '/';
      inputValue = currentDate + '/';

      return inputValue;
    }
    dateCountTracker = currentLength;
    inputValue = currentDate;
    return inputValue;
  }
}
