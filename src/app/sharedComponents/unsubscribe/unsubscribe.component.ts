import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { EncryptionService } from './../../services/encryption.service';
import { ConstantService } from './../../services/constant.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Credentials } from 'aws-sdk/lib/credentials';

@Component({
    selector: 'app-unsubscribe',
    templateUrl: './unsubscribe.component.html',
    styleUrls: [ './../loginpopup/forgot-password/forgot-password.component.scss', './unsubscribe.component.scss',]
})
export class UnsubscribeComponent implements OnInit {
    email_code: any;
    user_uuid: any
    success: boolean = false;
    unsubscribe: any = {};
    send_otp_placeholder: string = "Email Address or Mobile No.";
    mobileSelected: boolean;
    emailSelected: boolean;
    target: any;
    targetForOtp: any;
    ref_id: any;
    otpVerificationData: any = {};
    formForUnsubscribe = "target";
    otp: any;
    error: string;
    showText: boolean = true;
    showPreloader: boolean;
    stopTimer: boolean;
    countDisplay: string;
    count: number;
    otpCountdown: NodeJS.Timer;
    shwResend: boolean = false;
    successWindow: boolean =false;
    successMessage: any;



    constructor(public _encryptionServices: EncryptionService,
        public _constantService: ConstantService,
        public activatedRoute: ActivatedRoute,
        public changDetector: ChangeDetectorRef,
        private _router: Router) { }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
            this.getParams(params['e']);
        });
    }
    getParams(emilCode) {
        this.unsubscribe['code'] = emilCode;
    }
    sendOtpPlaceholder(target) {
        this.target = target;

        if (target == 'mobile') {
            this.send_otp_placeholder = "Enter mobile no.";
        }
        if (target == 'email') {
            this.send_otp_placeholder = "Enter email";
        }
    }
    getOTP() {
        this.showText = false;
        this.showPreloader = true;
        if (this.target) {
            if (this.target == 'mobile') {
                if (!this._constantService.isMobile(this.targetForOtp)) {
                    this.error = "Please enter your valid mobile number to receive OTP";
                    this._constantService.showToast(this.error, "", 2);
                    this.showPreloader = false;
                    this.showText = true;
                    return false;

                } else {
                    this.unsubscribe['lc'] = this.targetForOtp;
                }
            }
            if (this.target == 'email') {
                if (!this._constantService.isEmail(this.targetForOtp)) {
                    this.error = "Please enter your valid email address to receive OTP";
                    this._constantService.showToast(this.error, "", 2);
                    this.showPreloader = false;
                    this.showText = true;
                    return false;
                } else {
                    this.unsubscribe['lc'] = this.targetForOtp;
                }
            }
            this.unsubscribe['t'] = this.target == 'mobile' ? 'm' : 'e';
            this._constantService.fetchDataApi(this._constantService.getOtpForUnsubscribe(), this.unsubscribe).subscribe(data => {
                var responseData:any = data;
                if (responseData.STATUS == 'success') {
                    this.stopTimer = false;
                    this.countDisplay = "00:60";
                    this.count = 60;
                    this.countdown(this.count);
                    this.shwResend = false;
                    this.formForUnsubscribe = 'otp';
                    this.unsubscribe.ref_id = responseData.REF_ID;
                    this.showPreloader = false;
                    this.showText = true;

                } else if (responseData.STATUS == 'error') {
                    this.showPreloader = false;
                    this.showText = true;
                    this._constantService.showToast(responseData.ERROR_MSG, "", 2);

                }
            })
        } else {
            this.showText = true;
            this.showPreloader = false;
            this._constantService.showToast("Decide the way you want to get OTP", "", 2);
        }



    }

    verifyOtpToUnsubscribe() {
        this.showText = false;
        this.showPreloader = true;
        if (this.otp) {
            this.unsubscribe.otp = this.otp;
            this._constantService.fetchDataApi(this._constantService.verifyOtpForUnsubscribe(), this.unsubscribe).subscribe(data => {
                var responseData:any = data;
                if (responseData.STATUS == 'success') {
                    this.successWindow=true;
                    this.showPreloader = false;
                    this.showText = true;
                    this.successMessage=responseData.SUCCESS_MSG;
                    setTimeout(() => {
                        window.location.href = 'home';

                    }, 5000);

                } else if (responseData.STATUS == 'error') {
                    this.showPreloader = false;
                    this.showText = true;
                    this._constantService.showToast(responseData.ERROR_MSG, "", 2);

                }
            })
        } else {
            this.showText = true;
            this.showPreloader = false;
            this._constantService.showToast("Please enter the received OTP", "", 2);
        }

    }
    goToHome() {
        if (this.formForUnsubscribe == 'target') {
            window.location.href = 'home';
        } else if (this.formForUnsubscribe == 'otp') {
            this.formForUnsubscribe = 'target';
            this.targetForOtp = '';
            this.target = '';
            clearInterval(this.otpCountdown);
            this.shwResend = false;
            this.otp = '';
        }
    }

    countdown(count) {
        if (this.otpCountdown) {
            clearInterval(this.otpCountdown);
        }
        this.otpCountdown = setInterval(() => {
            if (this.stopTimer == false) {
                if (count <= 0) {
                    // this.count = 0;
                    clearInterval(this.otpCountdown);
                    this.shwResend = true;
                    return false;
                } else {
                    this.shwResend = false;
                    // setTimeout(() => {
                    if (count <= 10) {
                        count--;
                        this.countDisplay = "00:0" + count;
                    } else {
                        count--;
                        this.countDisplay = "00:" + count;
                    }
                    this.changDetector.detectChanges();
                    // this.countdown(this.count);
                    // }, 1000);
                }
            } else {
                clearInterval(this.otpCountdown);
                return false;
            }
        }, 1000)
    }
}
