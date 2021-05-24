import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EncryptionService } from './../../services/encryption.service';
import { ConstantService } from './../../services/constant.service';
import { UserInfo } from './../../modules/login/userInfo';
import { InterestpopupComponent } from './../../sharedComponents/interestpopup/interestpopup.component'


@Component({
    selector: 'app-verificationpopup',
    templateUrl: './verificationpopup.component.html',
    styleUrls: ['./verificationpopup.component.scss', './newverificationpopup.component.scss'],
    providers: [EncryptionService, ConstantService]
})
export class VerificationpopupComponent implements OnInit, AfterViewInit {
    updatedMobile: any;
    stopTimer: boolean;
    shwResend: boolean;
    disablelink: boolean = true;
    vall: any;
    cons: any;
    values = {};
    codeSent = false;
    elmId: any;
    loader: boolean = false;
    modelUserInfo: UserInfo;
    interestpopup: InterestpopupComponent;
    verificationpop = 2;
    encSerReg: string;
    register_re: string;
    showText: boolean = true;
    showPreloader: boolean = false;
    t: string;
    openConfirmation: boolean = false;
    usrEmail;
    dataConf = {};
    email = "";
    mobile = "";
    isWrongNumPopup: boolean = false;
    count: number;
    countDisplay;
    interests: any = [];
    countryId: any = '1';
    constructor(
        public _constantService: ConstantService,
        private _encryptionService: EncryptionService,
        private _router: Router
    ) {
        this.modelUserInfo = new UserInfo();
    }

    ngOnInit() {
        this.countryId = this._constantService.getSessionDataBYKey('country');
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow-y");
        body.classList.remove("stopClicking");

        this.usrEmail = this._constantService.getEmail();
        var firstPart = this.usrEmail.split('@')[0];
        var lstPart = this.usrEmail.split('@')[1];
        var visiblePart = firstPart.slice(0, 4);
        this.usrEmail = visiblePart + '*******@' + lstPart;
        //localStorage.clear();
        if (this._constantService.getSessionDataBYKey('mobile') != null) {
            this.mobile = this._constantService.getSessionDataBYKey('mobile').substring(0, 3) + "****" + this._constantService.getSessionDataBYKey('mobile').substring(7, 10);
        }

    }

    ngAfterViewInit() {
        this.t = this._constantService.getSessionDataBYKey('token');

        if (this.t != '' && this.t != "undefined" && this.t != undefined && this.t != null) {

            if (this._constantService.getSessionDataBYKey('country')) {
                if (this._constantService.getSessionDataBYKey('v_m') == 'false') {
                    this.verificationclick(1);
                } else {
                    if (this._constantService.getUserInterest() != '0') {
                        this._router.navigate(['home']);
                    } else {
                        this.verificationclick(3);
                    }
                }
            } else {
                if (this._constantService.getEmailVer() == 'true') {
                    if (this._constantService.getUserInterest() != '0') {
                        this._router.navigate(['home']);
                    } else {
                        this.verificationclick(3);
                    }
                } else {
                    this.verificationclick(2);
                }
            }
        } else {
            this._constantService.clearUserInfo();
            this._router.navigate(['']);
        }
    }

    verificationclick(index) {
        this.verificationpop = index;
        if (index == 1) {
            setTimeout(() => {
                (<HTMLInputElement>document.getElementById('v_mn1')).focus();
            }, 100);
        }
        if (index == 2) {
            setTimeout(() => {
                (<HTMLInputElement>document.getElementById('v_em1')).focus();
            }, 100);
        }
        this.stopTimer = false;
        this.countDisplay = "00:30";
        this.count = 30;
        this.countdown(this.count);
    }

    verificationEmailSubmit() {
        this.showText = false;
        this.showPreloader = true;
        this.loader = true;
        var email_ver = {};
        email_ver['lc'] = this._constantService.getEmail();
        email_ver['by'] = 'email';
        email_ver['vcod'] = (<HTMLInputElement>document.getElementById('v_em1')).value + (<HTMLInputElement>document.getElementById('v_em2')).value + (<HTMLInputElement>document.getElementById('v_em3')).value + (<HTMLInputElement>document.getElementById('v_em4')).value;
        email_ver['token'] = this._constantService.getSessionDataBYKey('token');
        email_ver['token_param'] = {};
        email_ver['token_param']["device_type"] = "w";
        email_ver['token_param']["host"] = "";
        this.vall = email_ver['vcod'];

        this._constantService.fetchDataApi(this._constantService.getEmailVerificationServiceUrl(), email_ver).subscribe(data => {
            this.register_re = data["_body"];
            var responseData: any = data;
            var status = responseData.STATUS;

            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this._constantService.setSessionJsonPair('v_e', 'true');
                this.stopTimer = false;
                this.countDisplay = "00:30";
                this.count = 30;
                this.countdown(this.count);
                if (this._constantService.getSessionDataBYKey('isInterestSet')) {
                    this._router.navigate(['home']);
                }
                else if (this._constantService.getUserInterest() == '0') {
                    this.verificationclick(3);
                } else {
                    this._router.navigate(['home']);
                }

                //this._router.navigate(['home']);
            } else if (status == this._constantService.error_token) {
                this.showText = true;
                this.showPreloader = false;
                this.loader = false;
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;
            } else {
                this.showText = true;
                this.showPreloader = false;
                this.loader = false;
                //               this._logger.debug(responseData.ERROR_MSG);
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
                //                alert(responseData.ERROR_MSG);

            }

        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    verificationMobileSubmit() {
        this.showText = false;
        this.showPreloader = true;
        this.loader = true;
        var mobile_ver = {};
        mobile_ver['lc'] = this._constantService.getSessionDataBYKey('mobile');
        mobile_ver['by'] = 'mobile';
        mobile_ver['vcod'] = (<HTMLInputElement>document.getElementById('v_mn1')).value + (<HTMLInputElement>document.getElementById('v_mn2')).value + (<HTMLInputElement>document.getElementById('v_mn3')).value + (<HTMLInputElement>document.getElementById('v_mn4')).value;
        mobile_ver['token'] = this._constantService.getSessionDataBYKey('token');
        mobile_ver['token_param'] = {};
        mobile_ver['token_param']["device_type"] = "w";
        mobile_ver['token_param']["host"] = "";

        this._constantService.fetchDataApi(this._constantService.getMobileVerificationServiceUrl(), mobile_ver).subscribe(data => {
            this.register_re = data["_body"];
            var responseData: any = data;
            var status = responseData.STATUS;

            if (status == this._constantService.success_msg) {
                this.showText = true;
                this.showPreloader = false;
                this.loader = false;
                this.stopTimer = false;
                this.countDisplay = "00:30";
                this.count = 30;
                this.countdown(this.count);
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                //this._constantService.setMobileVer("true");
                this._constantService.setSessionJsonPair('v_m', 'true');
                if (localStorage.getItem('rfc') == "career") {
                    this.getInterestAndSetInterestsForUsersFromCareer();

                } else {
                    if (this._constantService.getSessionDataBYKey('isInterestSet')) {
                        this._router.navigate(['home']);
                    }
                    else if (this._constantService.getUserInterest() == '0') {
                        this.verificationclick(3);
                    } else {
                        this._router.navigate(['home']);
                    }
                }
            } else if (status == this._constantService.error_token) {
                this.showText = true;
                this.showPreloader = false;
                this.loader = false;
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;
            } else {
                this.showText = true;
                this.showPreloader = false;
                this.loader = false;
                //  this._logger.debug(responseData.ERROR_MSG);
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
                //alert(responseData.ERROR_MSG);
            }

        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    resendVerificationCode(type: string) {
        this.disablelink = false;
        var resendVerification = {};
        resendVerification['t'] = type;
        if (type === 'e') {
            resendVerification['lc'] = this._constantService.getEmail();
        } else {
            resendVerification['lc'] = this._constantService.getSessionDataBYKey('mobile');
            resendVerification['conid'] = this.countryId;

        }
        resendVerification['token'] = this._constantService.getSessionDataBYKey('token');
        resendVerification['token_param'] = {};
        resendVerification['token_param']['device_type'] = 'w';
        resendVerification['token_param']['host'] = '';

        this._constantService.fetchDataApi(this._constantService.getResendVerificationServiceUrl(), resendVerification).subscribe(data => {
            this.register_re = data["_body"];
            var responseData: any = data;
            var status = responseData.STATUS;

            if (status == this._constantService.success_msg) {
                this.stopTimer = false;
                this.countDisplay = "00:30";
                this.count = 30;
                this.countdown(this.count);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
            } else if (status == this._constantService.error_token) {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
                this.disablelink = true;

            }

        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    change(id, event) {
        if (event.target.value != "") {
            this.elmId = 'v_' + id;
            document.getElementById(this.elmId).focus();
        }
    }

    focusElem(id) {
        //        document.getElementById("v_" + id).focus();
    }

    del(id, event) {
        if (event.target.value == "") {
            this.elmId = 'v_' + id;
            document.getElementById(this.elmId).focus();
        }
    }

    delt(event) {
        //        this.elmId = 'v_mn' + event;
        //        document.getElementById(this.elmId).focus();
    }

    delete(event) {
        this.elmId = 'v_mn' + event;
        if (this.elmId.length == 0) {
            document.getElementById(this.elmId).focus();
        }
    }

    otpBlockClickHandler() {
        if ((<HTMLInputElement>document.getElementById('v_mn1'))) {

            if ((<HTMLInputElement>document.getElementById('v_mn1')).value == '') {
                (<HTMLInputElement>document.getElementById('v_mn1')).focus();
            }
            else if ((<HTMLInputElement>document.getElementById('v_mn2')).value == '') {
                (<HTMLInputElement>document.getElementById('v_mn2')).focus();
            }
            else if ((<HTMLInputElement>document.getElementById('v_mn3')).value == '') {
                (<HTMLInputElement>document.getElementById('v_mn3')).focus();
            }
            else if ((<HTMLInputElement>document.getElementById('v_mn4')).value == '') {
                (<HTMLInputElement>document.getElementById('v_mn4')).focus();
            }

        } else if ((<HTMLInputElement>document.getElementById('v_em1'))) {

            if ((<HTMLInputElement>document.getElementById('v_em1')).value == '') {
                (<HTMLInputElement>document.getElementById('v_em1')).focus();
            }
            else if ((<HTMLInputElement>document.getElementById('v_em2')).value == '') {
                (<HTMLInputElement>document.getElementById('v_em2')).focus();
            }
            else if ((<HTMLInputElement>document.getElementById('v_em3')).value == '') {
                (<HTMLInputElement>document.getElementById('v_em3')).focus();
            }
            else if ((<HTMLInputElement>document.getElementById('v_em4')).value == '') {
                (<HTMLInputElement>document.getElementById('v_em4')).focus();
            }
        }
    }


    back() {
        this.stopTimer = true;
        this._constantService.clearUserInfo();
        this._router.navigate(['']);
    }

    closePopup(event) {
        if (event['error'] == false) {
            this.openConfirmation = false;
        }
    }

    sessionExpire(event) {
        if (event) {
            //            this.dataConf['type'] = 4;
            //            this.dataConf['msg'] = "Session Expire";
            //            this.dataConf['error_msg'] = "Session Expired";
            this.openConfirmation = true;
        }
    }

    countdown(n) {
        if (this.stopTimer == false) {
            if (n <= 0) {
                this.count = 0;
                this.shwResend = true;
                return false;
            } else {
                this.shwResend = false;
                setTimeout(() => {
                    if (this.count <= 10) {
                        this.count--;
                        this.countDisplay = "00:0" + this.count;
                    } else {
                        this.count--;
                        this.countDisplay = "00:" + this.count;
                    }
                    this.countdown(this.count);
                }, 1000);
            }
        }
    }

    changeUsrMobile() {
        if (!this.updatedMobile) {
            this.dataConf['type'] = 2;
            this.dataConf['msg'] = "Error";
            this.dataConf['error_msg'] = 'Please provide acceptable data.';
            this.openConfirmation = true;
            return false;
        } else if (!this._constantService.isMobile(this.updatedMobile.trim())) {
            this.dataConf['type'] = 2;
            this.dataConf['msg'] = "Error";
            this.dataConf['error_msg'] = 'Please provide correct mobile number.';
            this.openConfirmation = true;
            return false;
        }

        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";
        hitObj['m'] = this.updatedMobile.trim();
        hitObj['conid'] = this.countryId;

        this._constantService.fetchDataApi(this._constantService.getUpdMob4VerificationServiceUrl(), hitObj).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this._constantService.setSessionJsonPair('mobile', this.updatedMobile.trim());
                this.mobile = this.updatedMobile.substring(0, 3) + "****" + this.updatedMobile.substring(7, 10);
                this.showWrongNumPopup();
                this.updatedMobile = '';
                this.verificationclick(1);
                if (responseData.COUNTRY)
                    this._constantService.setSessionJsonPair('country', responseData.COUNTRY);
            } else if (status == this._constantService.error_token) {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired!";
                this.openConfirmation = true;
                return false;
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "Error";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
                return false;
            }
        }), error => {
            var err = error;
            if (err.status == 500) {
                this._router.navigate(['500']);
            }
        };
    }

    showWrongNumPopup() {
        this.isWrongNumPopup = !this.isWrongNumPopup;
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
                var pulicClickeUrl = this._constantService.getSessionDataBYKey('publicClickedURL');
                localStorage.setItem('rfc', '');
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
                this.openConfirmation = true;

            } else if (status == "error" && responseData.ERROR_MSG == "Interest already saved") {
                this._router.navigate(['home']);
            }
            else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }


        }, error => {


            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }
    setMobileNumberAndCountryCode(emittedObject) {
        this.updatedMobile = emittedObject.mobileNumber;
        this.countryId = emittedObject.countryId;
    }
}
