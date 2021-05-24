import { Component, OnInit, EventEmitter, Input, Output, ChangeDetectorRef, HostListener } from '@angular/core';
import { ConstantService } from 'src/app/services/constant.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EncryptionService } from 'src/app/services/encryption.service';
import { Login } from 'src/app/modules/login/login';
import { truncateSync } from 'fs';
import { EmitService } from '../../addpost/emit.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../../../../app/sass/abstracts/radiobtn.css', './forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  popup = 'getOtpTarget';
  @Input() type = '';
  @Input() forgotPasswordType = "";
  stopTimer = false;
  count: number;
  otp: any;
  showPreloader: boolean = false;
  isMobileView: boolean;
  smallHeightView: boolean;
  @Output() messageEvent = new EventEmitter<boolean>();
  placeHolder: string = "Email Address or Mobile No.";
  otpTypp: any = '';
  model: any = new Login("", "", "", "", "");
  otpSentTo: string;
  error = "";
  successMsg: any;
  showText: boolean = true;
  countdown: any;
  OtpTargetCheckBox = { "m": false, "e": false };
  countryId: any = '1';




  constructor(
    public changeDetector: ChangeDetectorRef,
    public _constantService: ConstantService,
    private _router: Router,
    private emitService:EmitService


  ) { }
  @HostListener('window:resize', ['$event'])

 



  ngOnInit() {
   
  }

  closefrgtpopup() {
    this.messageEvent.emit(false)
  }
  setOtpType(event) {
    if (event.target.id == "mobile" || event.target.id == "otp-on-mobile") {
      this.OtpTargetCheckBox.m = true;
      this.OtpTargetCheckBox.e = false;
      event.stopPropagation();
    }
    if (event.target.id == "email" || event.target.id == "otp-on-email") {
      this.OtpTargetCheckBox.e = true;
      this.OtpTargetCheckBox.m = false;
      event.stopPropagation();

    }
  }
  editNumber() {
    this.popup = 'getOtpTarget';
    this.model.lc = this.otpSentTo;
    this.error = '';

  }
  setFocus() {
    document.getElementById('c_p_d').focus();
  }


  sendOtpPlaceholder(id) {
    this.model.t = id;
    if (id == "") {
      this.placeHolder = "Decide the way! you want get otp";
      return;
    }
    if (id == 'm') {
      this.otpTypp = id;
      this.placeHolder = "Enter mobile no.";
      this.model.lc = '';
      this.error = '';
      this.otpSentTo='';

    }
    if (id == 'e') {
      this.otpTypp = id;
      this.placeHolder = "Enter email";
      this.model.lc = '';
      this.error = '';
      this.otpSentTo='';


    }
    setTimeout(() => {
      if (this.otpTypp == 'e')
        document.getElementById('f_e').focus();

    }, 200);
  }
  loginOTPSend() {
    this.showPreloader = true;
    this.showText = false;
    this.stopTimer = true;
    this.model.lc = this.model.lc.toLowerCase().trim();
    if (this.otpTypp != '') {
      if (this.otpTypp == 'm') {
        if (!this._constantService.isMobile(this.model.lc)) {
          this.showPreloader = false;
          this.error = "Enter a valid mobile number";
          this.showText = true;
          this.showPreloader = false;
          return false;
        }
      }
      else if (this.otpTypp == 'e') {

        if (!this._constantService.isEmail(this.model.lc)) {
          this.showPreloader = false;
          this.error = "Enter a valid email";
          this.showText = true;
          this.showPreloader = false;
          return false;
        }
      }
    } else {
      this.error = "Decide the way you want to send OTP";
      this.showText = true;
      this.showPreloader = false;
      return false;
    }
    var login_otp_d = {};
    login_otp_d["token"] = this._constantService.getSessionDataBYKey("token");
    login_otp_d["token_param"] = {};
    login_otp_d["token_param"]["device_type"] = "w";
    login_otp_d["token_param"]["host"] = "";
    login_otp_d["lc"] = this.model.lc;
    login_otp_d["t"] = this.model.t;
    login_otp_d['conid'] = this.countryId;
    this._constantService
      .fetchDataApi(
        this._constantService.getForgotPasswordSendServiceUrl(),
        login_otp_d
      )
      .subscribe(
        (data) => {
          var responseData: any = data;
          var status = responseData.STATUS;
          if (status == "success") {
            this.popup = 'otp';
            this.otpSentTo = this.model.lc;
            this.model.lc = '';
            this.placeHolder = 'Enter OTP'
            this.showPreloader = false;
            this.showText = true;
            this.stopTimer = false;
            this.count = 60;
            this.error = '';
            this.countdownTimer();
            document.getElementById('f_e').focus();

          } else {
            this.error = responseData.ERROR_MSG;
            this.showPreloader = false;
            this.showText = true;
          }
        },
        (error) => {
          var responseData = error;
          if (responseData.status == 500) {
            this._router.navigate(["500"]);
          }
        }
      );
  }

  loginOTPVerify() {
    this.showPreloader = true;
    this.showText = false;
    if (this.model.lc === "") {
      this.error = "Please enter the received OTP";
      this.showText = true;
      this.showPreloader = false;
      return false;
    }
    if (this._constantService.isEmail(this.otpSentTo)) {
      this.model.t = "e";
    } else if (this._constantService.isMobile(this.otpSentTo)) {
      this.model.t = "m";
    } else {
      this.showPreloader = false;
      this.showText = true;
      return false;

    }
    var login_otp_d = {};
    login_otp_d["token"] = this._constantService.getSessionDataBYKey("token");
    login_otp_d["token_param"] = {};
    login_otp_d["token_param"]["device_type"] = "w";
    login_otp_d["token_param"]["host"] = "";
    login_otp_d["lc"] = this.otpSentTo;
    login_otp_d["t"] = this.model.t;
    login_otp_d["otp"] = this.model.lc.trim();

    this._constantService
      .fetchDataApi(
        this._constantService.getForgotPasswordVerifyServiceUrl(),
        login_otp_d
      )
      .subscribe(
        (data) => {
          var responseData: any = data;
          var status = responseData.STATUS;
          if (status == "success") {
            this.popup = 'changePassword';
            this.model.lc = '';
            this.error = '';
            this.showText = true;
            this.showPreloader = false;
            if (responseData.COUNTRY)
              this._constantService.setSessionJsonPair('country', responseData.COUNTRY);
          } else {
            this.showText = true;
            this.showPreloader = false;
            this.error = responseData.ERROR_MSG;
          }
        },
        (error) => {
          var responseData = error;
          if (responseData.status == 500) {
            this._router.navigate(["500"]);
          }
        }
      );
  }
  updatingpassword() {
    this.showText = false;
    this.showPreloader = true;
    if (
      this.model.pd != "" &&
      this.model.cpd != ""
    ) {
      this.model.pd.replace(/" | \//g, "");
      this.model.cpd.replace(/"|\//g, "");

      this.model.f_e = this.otpSentTo.toLowerCase();
      if (this._constantService.isEmail(this.model.f_e)) {
        this.model.t = "e";
      } else if (this._constantService.isMobile(this.model.f_e)) {
        this.model.t = "m";
      } else {
        this.error = "Invalid parameter";
        this._constantService.showToast(this.error, "", 2);
        this.showPreloader = false;
        this.showText = true;
        return false;
      }
      var forgot_d = {};
      forgot_d["token"] = this._constantService.getSessionDataBYKey("token");
      forgot_d["token_param"] = {};
      forgot_d["token_param"]["device_type"] = "w";
      forgot_d["token_param"]["host"] = "";
      forgot_d["lc"] = this.model.f_e;
      forgot_d["t"] = this.model.t;
      forgot_d["pd"] = this.model.pd.replace(/" | \//g, "");
      forgot_d["cpd"] = this.model.cpd.replace(/"|\//g, "");

      if (forgot_d["pd"] != forgot_d["cpd"]) {
        this.error = "Confirmed password does not match with the new password";
        this.showText = true;
        this.showPreloader = false;
        return false;
      }
      if (forgot_d["pd"] == undefined || forgot_d["pd"] == "") {
        this._constantService.showToast("Password can not be blank", "", "2");
      }

      this._constantService
        .fetchDataApi(
          this._constantService.getForgotPasswordSetPassServiceUrl(),
          forgot_d
        )
        .subscribe(
          (data) => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == "success") {
              this.model.cpd = "";
              this.model.pd = "";
              if (window.innerWidth >= 900) {
                this._constantService.showToast(
                  "Password successfully updated.",
                  "",
                  "1"
                );
              }
              if (window.innerWidth <= 900) {
                this._constantService.showToast(
                  "Password successfully updated.",
                  "",
                  "1"
                );
              }
              this.showText = true;
              this.showPreloader = false;
              this.closefrgtpopup();
            } else {
              this.error = responseData.ERROR_MSG;
              this.showText = true;
              this.showPreloader = false;
            }
          },
          (error) => {
            var responseData = error;
            if (responseData.status == 500) {
              this._router.navigate(["500"]);
            }
          }
        );
    } else {
      if (
        this.model.pd == "" &&
        this.model.cpd == ""
      ) {
        this.error = " Please enter a required fields";
        this.showPreloader = false;
        this.showText = true;

      }
      if (
        this.model.pd == "" &&
        this.model.cpd != ""
      ) {
        this.error = " Please enter a new password";
        this.showPreloader = false;
        this.showText = true;
      }
      if (
        this.model.cpd == "" &&
        this.model.pd != ""
      ) {
        this.error = " Please enter a confirm password";
        this.showPreloader = false;
        this.showText = true;
      }
    }
  }

  countdownTimer() {
    if (this.countdown) {
      clearInterval(this.countdown);
      this.countdown = undefined;
    }

    this.countdown = setInterval(() => {
      if (this.count <= 0) {
        this.stopTimer = true;
        clearInterval(this.countdown);
      } else
        this.count--;
    }, 1000)

  }
  forgotPasswordOTPReSend() {
    this.error = '';
    this.model.lc = '';
    this.showPreloader = true;
    this.showText = false;
    this.model.f_e = this.otpSentTo.toLowerCase();
    if (this.otpTypp != '') {
      if (this.otpTypp == 'm') {
        this.model.t = "m";
        if (!this._constantService.isMobile(this.model.f_e)) {
          this.showPreloader = false;
          this.showText = true;
          this.error = "Please enter your mobile number to receive OTP";
          return false;
        }
      }
      else if (this.otpTypp == 'e') {
        this.model.t = "e";
        if (!this._constantService.isEmail(this.model.f_e)) {
          this.showPreloader = false;
          this.showText = true;
          this.error = "Please enter your email address to receive OTP";
          return false;
        }
      }
      else {
        this.showPreloader = false;
        this.showText = true;
        this.error =
          "Please enter your email address or mobile number to receive OTP";
        return false;
      }
    } else {
      this.showPreloader = false;
      this.showText = true;
      this.error = "Decide the way you want to send OTP";
    }
    var forgot_d = {};
    forgot_d["token"] = this._constantService.getSessionDataBYKey("token");
    forgot_d["token_param"] = {};
    forgot_d["token_param"]["device_type"] = "w";
    forgot_d["token_param"]["host"] = "";
    forgot_d["lc"] = this.model.f_e;
    forgot_d["t"] = this.model.t;
    forgot_d["conid"] = this.countryId;

    this._constantService
      .fetchDataApi(
        this._constantService.getForgotPasswordSendServiceUrl(),
        forgot_d
      )
      .subscribe(
        (data) => {
          var responseData: any = data;
          var status = responseData.STATUS;
          this.stopTimer = false;
          this.count = 60;
          this.countdownTimer();
          if (status == "success") {
            forgot_d["lc"] = "";
            forgot_d["t"] = "";
            this.showPreloader = false;
            this.showText = true;
            this.popup = 'otp';
            this.otpSentTo = this.model.f_e;
            this.model.f_e = '';
            this.placeHolder = 'Enter OTP'
            this.showPreloader = false;
            this.successMsg = responseData.SUCCESS_MSG;
          } else {
            forgot_d["lc"] = "";
            forgot_d["t"] = "";
            this.showPreloader = false;
            this.showText = true;
            this.error = responseData.ERROR_MSG;
          }
        },
        (error) => {
          var responseData = error;
          if (responseData.status == 500) {
            this._router.navigate(["500"]);
          }
        }
      );
  }
  setMobileNumberAndCountryCode(emittedObject) {
    this.model.lc = emittedObject.mobileNumber;
    this.countryId = emittedObject.countryId;
  }
}
