import { Component, OnInit, Input, Output, EventEmitter, ɵConsole, DoCheck } from '@angular/core';
import { PostdataService } from './../../../services/postdata.service';
import { ConstantService } from './../../../services/constant.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EncryptionService } from './../../../services/encryption.service';
declare var $: any;
@Component({
    selector: 'app-paymentpage',
    templateUrl: './paymentpage.component.html',
    styleUrls: ['./paymentpage.component.scss']
})
export class PaymentpageComponent implements OnInit, DoCheck {
    pp;
    InvalidCoupon2: boolean = false;
    InvalidCoupon: boolean = false;
    // paymentTab = 2;
    config: any;
    parentmessage: boolean = false;
    reedem: boolean = true;
    reedemed: boolean = false;
    wallet: boolean = false;
    selectWallet: boolean = false;
    onselect_inner_wrapper: boolean = false;
    enteredCoupon = "";
    couponAdded: boolean = false;
    paymentmodeRequired: boolean = true;
    useruuid;
    mobVerified;
    openConfirmation: boolean = false;
    dataConf = {};
    addClassOTP: boolean = false;
    couponName: string = '';
    isCouponButtonActive: boolean = false;
    addClass: boolean = false;
    numChange: boolean = true;
    otpEnter: boolean = false;
    resendNum;
    countDisplay;
    count;
    stopTimer;
    shwResend: boolean;
    vcodMobile = "";
    new_mobileno = "";
    thankyou: boolean = false;
    incorrectOTP: boolean = false;
    gatewayType: number = 3;
    // walletAmt(event){
    //   this.wallet=event;
    // }



    // paymentTabClick(index){
    //   this.paymentTab = index;
    // }
    // $('#credit-card').on('keypress change', function () {
    //   $(this).val(function (index, value) {
    // 	  return value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
    //   });
    // });

    walletBalance = 0;
    coursePaymentData = { 'finalAmount': 0, 'couponAppliedPrice': 0, 'taxAmount': 0, 'walletDeductionAmount': 0, 'COUPON_VALID': 0, 'DISCOUNT_TYPE': 0, 'MAX_LIMIT': 0, 'CURRENCY_TYPE': '', 'PROMO_DISCOUNT': 0, 'initialAmount': 0, 'COURSE_TITLE': '', 'COURSE_TYPE': 0, 'coverPic': '', 'PAGE_COVER_PHOTO_PATH': '', 'pageTitle': '', 'page_UUID': '' };
    dummydata = '{"STATUS":"success","COUPONS":[{"PROMO_DISCOUNT":"10","MAX_LIMIT":"10","DESCRIPTION":"get%20coupon","CURRENCY_TYPE":"INR","IS_VALID":"1","PROMO_CODE":"Hca9TO7ITfvn","DISCOUNT_TYPE":"1"},{"PROMO_DISCOUNT":"20","MAX_LIMIT":"20","DESCRIPTION":"get%20flat%2020","CURRENCY_TYPE":"INR","IS_VALID":"1","PROMO_CODE":"p6GNcg1572Hn","DISCOUNT_TYPE":"1"},{"PROMO_DISCOUNT":"15","MAX_LIMIT":"15","CURRENCY_TYPE":"INR","IS_VALID":"1","PROMO_CODE":"FoAEAsiUBvqr","DISCOUNT_TYPE":"2","DESCRIPTION":"get%20coupon"},{"PROMO_DISCOUNT":"25","MAX_LIMIT":"25","CURRENCY_TYPE":"INR","IS_VALID":"1","PROMO_CODE":"lJv5OOsuNUmv","DISCOUNT_TYPE":"1","DESCRIPTION":"get%20coupon"},{"PROMO_DISCOUNT":"25","MAX_LIMIT":"25","CURRENCY_TYPE":"INR","IS_VALID":"1","PROMO_CODE":"xx96wgrNzZkH","DISCOUNT_TYPE":"2","DESCRIPTION":"get%20coupon"},{"PROMO_DISCOUNT":"25","MAX_LIMIT":"25","CURRENCY_TYPE":"INR","IS_VALID":"1","PROMO_CODE":"ovEuPbORr212","DISCOUNT_TYPE":"1","DESCRIPTION":"get%20coupon"}]}';
    couponsData = [{ 'DESCRIPTION': '', 'PROMO_CODE': '' }];
    course_UUID = "";
    gatewaySelected: boolean = false;
    buynowcoursepopup: boolean = false;
    elmId: string;
    adminMobileNumber: any;
    countryId: any;
    constructor(public postdata: PostdataService,
        public _constantService: ConstantService,
        public _encrypt: EncryptionService,
        private activatedRoute: ActivatedRoute,

        public router: Router,
        ) { }
    ngOnInit() {
        // this.getPaymentData();
        this.adminMobileNumber = this._constantService.getSessionDataBYKey('mobile');
        if(this.adminMobileNumber && this.adminMobileNumber.length>4 && this.adminMobileNumber.length<14){
            this.addClass=true;
        }
        this.activatedRoute.params.subscribe((params: Params) => {
            if (params['id'] != null) {
                let tkn = this._constantService.getSessionDataBYKey('token');
                if (tkn && tkn != 'undefined') {

                    this.course_UUID = params['id'];
                    this.getPaymentData();
                    this.getCouponsData();
                    this.getWalletData();
                    // this.validateCouponCode();
                } else {
                    this.course_UUID = params['id'];
                    this.router.navigate(['coursedetail/' + this.course_UUID]);
                }
            }
        });
        $('.digit-group').find('input').each(function () {
            $(this).attr('maxlength', 1);
            $(this).on('keyup', function (e) {
                var parent = $($(this).parent());

                if (e.keyCode === 8 || e.keyCode === 37) {
                    var prev = parent.find('input#' + $(this).data('previous'));

                    if (prev.length) {
                        $(prev).select();
                    }
                } else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
                    var next = parent.find('input#' + $(this).data('next'));

                    if (next.length) {
                        $(next).select();
                    } else {
                        if (parent.data('autosubmit')) {
                            parent.submit();
                        }
                    }
                }
            });
        });
    }

    ngDoCheck() {
        setTimeout(() => {

            if (this.couponName == "") {
                this.isCouponButtonActive = false;
            }
            else {
                this.isCouponButtonActive = true;
            }
        }, 100)

        if (document.getElementById('mobilenum')) {
            var numb = (<HTMLInputElement>document.getElementById('mobilenum')).value;
            if (numb.length == 10) {
                this.addClass = true;
            } else {
                this.addClass = false;
            }
        }
        // var entry1;
        // if (document.getElementById('v_mn1')) {
        //     entry1 = (<HTMLInputElement>document.getElementById('v_mn1')).value;
        // }
        // var entry2;
        // if (document.getElementById('v_mn2')) {
        //     entry2 = (<HTMLInputElement>document.getElementById('v_mn2')).value;
        // }
        // var entry3;
        // if (document.getElementById('v_mn3')) {
        //     entry3 = (<HTMLInputElement>document.getElementById('v_mn3')).value;
        // }
        // var entry4;
        // if (document.getElementById('v_mn4')) {
        //     entry4 = (<HTMLInputElement>document.getElementById('v_mn4')).value;
        // }
        // var OTP = entry1 + entry2 + entry3 + entry4;
        // console.log(OTP.length);
        // if (OTP.length == 4) {
        //     this.addClassOTP = true;
        // } else {
        //     this.addClassOTP = false;
        // }
    }

    seletPaymenttWallet() {
        this.selectWallet = !this.selectWallet;
        this.setFinalAmount();
    }
    showReedemed() {
        this.reedemed = true;
        this.reedem = false;
        this.parentmessage = true;
    }
    showReedem() {
        this.reedemed = false;
        this.reedem = true;
        this.parentmessage = false;
    }
    getWalletData() {
        var walletData = {};
        walletData['token'] = this._constantService.getSessionDataBYKey('token');
        walletData['token_param'] = {};
        walletData['token_param']['device_type'] = 'w';
        walletData['token_param']['host'] = '';

        this._constantService.fetchDataApi(this._constantService.getWalletDataServiceUrl(), walletData).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                // this.isEnrolled=  true;
                this.walletBalance = responseData.WALLET_AMOUNT;
                // this.coursePaymentData.walletDeductionAmount = this.coursePaymentData. -responseData.CURRENT_AMOUNT;
            } else {
                // this.dataConf['type'] = 2;
                // this.dataConf['msg'] = "STUDY24X7";
                // this.dataConf['error_msg'] = responseData.ERROR_MSG;
                // this.openConfirmation = true;
            }
        }
        );

    }
    getCouponsData() {
        var couponData = {};
        couponData['token'] = this._constantService.getSessionDataBYKey('token');
        couponData['token_param'] = {};
        couponData['token_param']['device_type'] = 'w';
        couponData['token_param']['host'] = '';
        couponData['cors_uuid'] = this.course_UUID;

        this._constantService.fetchDataApi(this._constantService.getPaymentCouponListDataServiceUrl(), couponData).subscribe(data => {
            // var responseData:any = data;
            var responseData:any = data;
            var status = responseData.STATUS;

            if (status == this._constantService.success_msg) {
                          this.couponsData.length = 0;
                for (var i = 0; i < responseData.COUPONS.length; i++) {
                    // this.couponsData.push({'DESCRIPTION': responseData.COUPONS[i].DESCRIPTION,'PROMO_CODE':responseData.COUPONS[i].PROMO_CODE,'DISCOUNT_TYPE':responseData.COUPONS[i].DISCOUNT_TYPE,'MAX_LIMIT':responseData.COUPONS[i].MAX_LIMIT,'CURRENCY_TYPE':responseData.COUPONS[i].CURRENCY_TYPE,'PROMO_DISCOUNT':responseData.COUPONS[i].PROMO_DISCOUNT});
                    this.couponsData.push({ 'DESCRIPTION': this.postdata.decodeURIPostData(responseData.COUPONS[i].DESCRIPTION), 'PROMO_CODE': responseData.COUPONS[i].PROMO_CODE });
                }
            } else {

            }
        }
        );

    }

    onPasteValidateCouponCode() {
        setTimeout(() => {
            this.validateCouponCode();
        }, 200);

    }
    validateCouponCode() {

        var couponValidate = {};
        couponValidate['token'] = this._constantService.getSessionDataBYKey('token');
        couponValidate['token_param'] = {};
        couponValidate['token_param']['device_type'] = 'w';
        couponValidate['token_param']['host'] = '';
        var inputlist = document.getElementsByTagName('input');
        this.enteredCoupon = this.couponName;
        couponValidate['coupon'] = this.couponName;
        couponValidate['cors_uuid'] = this.course_UUID;
        couponValidate['pg_uuid'] = this.coursePaymentData.page_UUID;

        this._constantService.fetchDataApi(this._constantService.getValidateCouponServiceUrl(), couponValidate).subscribe(data => {

            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {

                this.InvalidCoupon = false;

                this.coursePaymentData.CURRENCY_TYPE = responseData.COUPON_DETAIL.CURRENCY_TYPE;
                this.coursePaymentData.DISCOUNT_TYPE = responseData.COUPON_DETAIL.DISCOUNT_TYPE;
                if (this.coursePaymentData.DISCOUNT_TYPE == 1) {
                    this.coursePaymentData.PROMO_DISCOUNT = responseData.COUPON_DETAIL.DISCOUNT;
                    if (this.coursePaymentData.PROMO_DISCOUNT > this.coursePaymentData.initialAmount) {
                        this.coursePaymentData.PROMO_DISCOUNT = this.coursePaymentData.initialAmount;
                    }

                    // if (this.coursePaymentData.PROMO_DISCOUNT > this.coursePaymentData.initialAmount) {
                    //     this.InvalidCoupon2 = true;
                    //     this.couponAdded = false;
                    //     $("#index").prop("checked", true);
                    //     this.coursePaymentData.finalAmount = this.coursePaymentData.initialAmount;
                    //     return;
                    // }
                } else if (this.coursePaymentData.DISCOUNT_TYPE == 2) {
                    this.coursePaymentData.MAX_LIMIT = responseData.COUPON_DETAIL.MAX_LIMIT;
                    this.coursePaymentData.PROMO_DISCOUNT = Math.ceil((this.coursePaymentData.initialAmount * (responseData.COUPON_DETAIL.DISCOUNT / 100)));
                    if (this.coursePaymentData.PROMO_DISCOUNT > this.coursePaymentData.initialAmount) {
                        this.coursePaymentData.PROMO_DISCOUNT = this.coursePaymentData.initialAmount;
                    }
                    if (this.coursePaymentData.MAX_LIMIT < this.coursePaymentData.PROMO_DISCOUNT) {
                        this.coursePaymentData.PROMO_DISCOUNT = this.coursePaymentData.MAX_LIMIT
                    }

                }
                this.couponAdded = true;
                this.setFinalAmount();

            } else {
                this.InvalidCoupon = true;
                this.couponAdded = false;
                for (var i = 0; i < inputlist.length; i++) {
                    if (inputlist[i].id == 'promo') {
                        // inputlist[i].value ="";
                    }
                }
                // this.dataConf['type'] = 2;
                // this.dataConf['msg'] = "STUDY24X7";
                // this.dataConf['error_msg'] = responseData.ERROR_MSG;
                // this.openConfirmation = true;
            }
        }
        );

    }
    getPaymentData() {
        var paymentData = {};
        paymentData['token'] = this._constantService.getSessionDataBYKey('token');
        paymentData['token_param'] = {};
        paymentData['token_param']['device_type'] = 'w';
        paymentData['token_param']['host'] = '';
        paymentData['cors_uuid'] = this.course_UUID;

        this._constantService.fetchDataApi(this._constantService.getPurchaseCourseDataServiceUrl(), paymentData).subscribe(data => {
            var responseData1:any = data;
            var status:any = responseData1.STATUS;
            this.useruuid = responseData1.USER_UUID;
            this.mobVerified = responseData1.ISMOBILEVERIFIED;
            var renew = responseData1.RENEW_STATUS;
            var status = responseData1.STATUS;          

            var responseData = responseData1.PURCHASE_COURSE_DETAILS;
              if (status == this._constantService.success_msg) {
                //$("#payu").prop("checked", true);
                this.coursePaymentData.COURSE_TITLE = this.postdata.decodeURIPostData(responseData.COURSE_TITLE);
                this.coursePaymentData.COURSE_TYPE = responseData.COURSE_TYPE;
                //use this to validate course is paid
                if (!responseData || responseData.COURSE_TYPE != 1) {
                    this.router.navigate(['home']);
                }
                var date = new Date();
                if (responseData.COVER_TYPE == "0") {

                    this.coursePaymentData.coverPic = responseData.COVER_PHOTO_PATH + 'cover/' + this.course_UUID + "_1235x330.png?v=" + responseData.IMG_UPD_DT;

                } else {
                    this.coursePaymentData.coverPic = responseData.COVER_PHOTO_PATH;

                }
                this.coursePaymentData.page_UUID = responseData.PAGE_UUID;
                if (responseData.PAGE_COVER_PHOTO_PATH != null && responseData.PAGE_COVER_PHOTO_PATH != '') {
                    this.coursePaymentData.PAGE_COVER_PHOTO_PATH = responseData.PAGE_COVER_PHOTO_PATH + 'profile/' + this.coursePaymentData.page_UUID + '_60x60.png?v=' + date.getTime();
                } else {
                    if (responseData.PAGE_TYPE == '0') {
                        this.coursePaymentData.PAGE_COVER_PHOTO_PATH = "./assets/images/individual_profile.svg";
                    } else if (responseData.PAGE_TYPE == '1') {
                        this.coursePaymentData.PAGE_COVER_PHOTO_PATH = "./assets/images/organization_profile.svg";

                    }
                }
                if (responseData.PAGE_PROFILE_PHOTO_PATH != null && responseData.PAGE_PROFILE_PHOTO_PATH != '') {
                    this.pp = responseData.PAGE_PROFILE_PHOTO_PATH + 'profile/' + this.coursePaymentData.page_UUID + '_60x60.png?v=' + date.getTime();
                } else {
                    if (responseData.PAGE_TYPE == '0') {
                        this.pp = "./assets/images/individual_profile.svg";
                    } else if (responseData.PAGE_TYPE == '1') {
                        this.pp = "./assets/images/organization_profile.svg";

                    }
                }
                this.coursePaymentData.pageTitle = this.postdata.decodeURIPostData(responseData.PAGE_TITLE);

                for (var i = 0; i < responseData.COURSE_COST.length; i++) {
                    if (responseData.COURSE_COST[i].CURRENCY_TYPE == "INR") {
                        if (renew == 2) {
                            this.coursePaymentData.initialAmount = responseData.COURSE_COST[i].DISCOUNT_COST;
                        } else if (renew == 1) {
                            this.coursePaymentData.initialAmount = responseData.COURSE_COST[i].RENEWAL_COST;
                        }
                    } else {
                        if (renew == 2) {
                            this.coursePaymentData.initialAmount = responseData.COURSE_COST[i].DISCOUNT_COST;
                        } else if (renew == 1) {
                            this.coursePaymentData.initialAmount = responseData.COURSE_COST[i].RENEWAL_COST;
                        }

                    }
                }
                this.setFinalAmount();

            } else {
                // this.dataConf['type'] = 2;
                // this.dataConf['msg'] = "STUDY24X7";
                // this.dataConf['error_msg'] = responseData.ERROR_MSG;
                // this.openConfirmation = true;
                this.router.navigate(['coursedetail/' + this.course_UUID]);
            }
        }
        );
    }

    setCouponCode(coupon_code) {

        var inputlist = document.getElementsByTagName('input');
        this.couponName = coupon_code;
        this.isCouponButtonActive = true;

        for (var i = 0; i < inputlist.length; i++) {
            if (inputlist[i].id == 'promo') {
                inputlist[i].value = '';
                inputlist[i].value = coupon_code;

            }
        }
    }

    payuSelected(value) {
        this.gatewayType = value;
        this.gatewaySelected = true;
    }
    setFinalAmount() {
        if (this.selectWallet) {
            if (this.coursePaymentData.initialAmount > this.coursePaymentData.PROMO_DISCOUNT) {
                this.coursePaymentData.finalAmount = this.coursePaymentData.initialAmount - this.coursePaymentData.PROMO_DISCOUNT;
            } else {
                this.coursePaymentData.finalAmount = 0;
                this.coursePaymentData.PROMO_DISCOUNT = this.coursePaymentData.initialAmount;

            }
            if (this.coursePaymentData.finalAmount > this.walletBalance) {
                this.paymentmodeRequired = true;
                this.coursePaymentData.walletDeductionAmount = this.walletBalance;
                this.coursePaymentData.finalAmount = this.coursePaymentData.finalAmount - this.walletBalance;
                //$("#payu").prop("checked", true);
                //this.gatewaySelected = true;
            } else {
                this.paymentmodeRequired = false;
                this.coursePaymentData.walletDeductionAmount = this.coursePaymentData.finalAmount;
                this.coursePaymentData.finalAmount = 0;
                //$("#payu").prop("checked", false);
                //this.gatewaySelected = false;

            }

        } else if (!this.selectWallet) {
            this.paymentmodeRequired = true;
            this.coursePaymentData.walletDeductionAmount = 0;
            if (this.coursePaymentData.initialAmount > this.coursePaymentData.PROMO_DISCOUNT) {
                // this.coursePaymentData.finalAmount = this.coursePaymentData.initialAmount - this.coursePaymentData.PROMO_DISCOUNT;
                this.coursePaymentData.finalAmount = (this.coursePaymentData.initialAmount - this.coursePaymentData.PROMO_DISCOUNT);
            } else {
                this.coursePaymentData.finalAmount = 0;

            }
            // this.coursePaymentData.finalAmount = (this.coursePaymentData.initialAmount - this.coursePaymentData.PROMO_DISCOUNT);

        }
    }
    removeCoupon(event, index) {


        this.getCouponsData();
        $(index).prop(index, false);
        this.couponAdded = false;
        this.couponName = "";
        this.isCouponButtonActive = false;

        this.coursePaymentData.PROMO_DISCOUNT = 0;
        this.setFinalAmount();
        this.enteredCoupon = "";
        (<HTMLInputElement>document.getElementById('promo')).value = '';
        event.preventDefault();
        event.stopPropagation();
    }

    removetik(event) {
    }



    verifyPopup() {
        if (this.gatewaySelected || this.selectWallet) {
            if (this.mobVerified == 1) {
                this.checkEligibleForPayment();
            }
            else {
                this.buynowcoursepopup = true;
                this.numChange = true;
                setTimeout(() => {
                    let mobInput = document.getElementById('mobilenum');
                    if (mobInput) {
                        mobInput.focus();
                    }
                }, 200)


            }
        } else {
            this._constantService.showToast("Select Payment Option First", "", "2");
        }


    }

    checkEligibleForPayment() {
        if (this.adminMobileNumber && !isNaN(this.adminMobileNumber)) {
            var checkEligible = {};
            checkEligible['token'] = this._constantService.getSessionDataBYKey('token');
            checkEligible['token_param'] = {};
            checkEligible['token_param']['device_type'] = 'w';
            checkEligible['token_param']['host'] = '';
            checkEligible['cors_uuid'] = this.course_UUID;

            this._constantService.fetchDataApi(this._constantService.getinprogressstatusServiceUrl(), checkEligible).subscribe(data => {
                var responseData:any = data;
                var status = responseData.STATUS;
                if (status == 'success') {
                    this.makePayment();
                } else {
                    this.dataConf['type'] = 2;
                    this.dataConf['msg'] = "Error";
                    this.dataConf['error_msg'] = responseData.ERROR_MSG;
                    this.openConfirmation = true;
                    return false;
                }
            });
        } else {
            this._constantService.showToast('Please enter a valid mobile number', '', '2');
        }

    }

    makePayment() {
        if (!this.gatewaySelected && this.paymentmodeRequired) {
            this.dataConf['type'] = 2;
            this.dataConf['msg'] = "study24x7";
            this.dataConf['error_msg'] = "Please select payment gateway.";
            this.openConfirmation = true;
            return false;
        }

        if (this.gatewayType == 0) {
            var redirectionPath = this._constantService.payuPaymentServerURL;
        } else {
            var redirectionPath = this._constantService.paytmPaymentServerURL;
        }
        var tokens = this._constantService.getSessionDataBYKey('token');
        var useragent = this._encrypt.encrypt(navigator.userAgent);
        tokens = this._encrypt.encrypt(tokens);
        var coupon = this.enteredCoupon;
        var walletstatus = this.selectWallet == true ? "1" : "0";
        var urls = redirectionPath + "?cuuid=" + this.course_UUID.toString() + "&t=" + tokens + "&cpn=" + coupon.toString() + "&wl_sts=" + walletstatus + "&u_a=" + useragent + '&ph=' + this.adminMobileNumber;
        // var urls = "&t="+this._constantService.getSessionDataBYKey('token');
        // +"&cpn="+document.getElementsByTagName('input')== null ? "":document.getElementsByTagName('input')+"+&wl_sts"+this.enteredCoupon == ""? "0":"1";

        window.location.replace(urls);
    }
    removeCouponChecked(index) {
        $(index).prop("checked", false);
        // (<HTMLInputElement>document.getElementById(index)).checked = faslse;

    }

    closeError() {
        this.InvalidCoupon = false;
        this.InvalidCoupon2 = false;
    }
    buynowvarifyclose() {
        clearTimeout(this.timer);
        this.buynowcoursepopup = false;
        this.otpEnter = false;
    }
    getOTP() {
        clearTimeout(this.timer);
        this.incorrectOTP = false;
        this.countDisplay = "00:60";
        this.count = 60;
        this.stopTimer = false
        this.countdown(this.count);
        var changeEmailMobile = {};
        changeEmailMobile['token'] = this._constantService.getSessionDataBYKey('token');
        changeEmailMobile['token_param'] = {};
        changeEmailMobile['token_param']['device_type'] = 'w';
        changeEmailMobile['token_param']['host'] = '';
        var num;
        if (document.getElementById('mobilenum')) {
            num = (<HTMLInputElement>document.getElementById('mobilenum')).value;

        }
        if (num.trim().length == 10) {
            // this.otpEnter=true;
            // this.buynowcoursepopup=true;
            // this.numChange=false;

        } else {
            this._constantService.showToast("Enter a valid mobile number", "", "2");
            this.numChange = true;
            this.otpEnter = false;
            this.buynowcoursepopup = true;
        }
        this.resendNum = num;

        if (num != '') {
            changeEmailMobile['lc'] = num.trim();
        } else {
            this.dataConf['type'] = 2;
            //     this.dataConf['msg'] = "Error";
            //     this.dataConf['error_msg'] = responseData.ERROR_MSG;
            //     this.openConfirmation = true;
            //     return false;
            //     changeEmailMobile['lc'] = this._constantService.getSessionDataBYKey('mobile');
        }
        changeEmailMobile['t'] = 'm';

        this._constantService.fetchDataApi(this._constantService.getSendVeri4EmailMobileChangeServiceUrl(), changeEmailMobile).subscribe(data => {
            var responseData:any = data;
            if (responseData.STATUS == 'success') {
                this.otpEnter = true;
                this.buynowcoursepopup = true;
                this.numChange = false;
            } else if (responseData.status == 500) {
                this.router.navigate(['500']);
            } else {
                this._constantService.showToast("Number already used.", "", "2");
            }


        });
    }
    changeNum() {
        clearTimeout(this.timer);
        this.incorrectOTP = false;
        this.numChange = true;
        this.otpEnter = false;
    }
    resendOTP() {
        clearTimeout(this.timer);
        this.incorrectOTP = false;
        this.countDisplay = "00:60";
        this.count = 60;
        this.stopTimer = false;
        this.countdown(this.count);
        var data = {};
        data['token'] = this._constantService.getSessionDataBYKey('token');
        data['token_param'] = {};
        data['token_param']['device_type'] = 'w';
        data['token_param']['host'] = '';
        if (this.resendNum != '') {
            data['lc'] = this.resendNum.trim();
        } else {
            this.dataConf['type'] = 2;
        }
        data['t'] = 'm';

        this._constantService.fetchDataApi(this._constantService.getSendVeri4EmailMobileChangeServiceUrl(), data).subscribe(data => {
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });
    }
    timer;
    countdown(n) {
        if (this.stopTimer == false) {
            if (n <= 0) {
                this.count = 0;
                this.shwResend = true;
                return false;
            } else {
                this.shwResend = false;
                this.timer = setTimeout(() => {
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
        } else {
            return false;
        }
    }
    verifyOTP() {
        var changeEmailMobile = {};
        changeEmailMobile['token'] = this._constantService.getSessionDataBYKey('token');
        changeEmailMobile['token_param'] = {};
        changeEmailMobile['token_param']['device_type'] = 'w';
        changeEmailMobile['token_param']['host'] = '';
        var entry1;
        if (document.getElementById('v_mn1')) {
            entry1 = (<HTMLInputElement>document.getElementById('v_mn1')).value;
        }
        var entry2;
        if (document.getElementById('v_mn2')) {
            entry2 = (<HTMLInputElement>document.getElementById('v_mn2')).value;
        }
        var entry3;
        if (document.getElementById('v_mn3')) {
            entry3 = (<HTMLInputElement>document.getElementById('v_mn3')).value;
        }
        var entry4;
        if (document.getElementById('v_mn4')) {
            entry4 = (<HTMLInputElement>document.getElementById('v_mn4')).value;
        }
        var OTP = entry1 + entry2 + entry3 + entry4;
        if (OTP.trim().length == 4 && entry1.trim().length == 1 && entry2.trim().length == 1 && entry3.trim().length == 1 && entry4.trim().length == 1) {
            //this.thankyou=true;
            //this.buynowcoursepopup=true;
            //this.otpEnter=false;
        } else {
            this._constantService.showToast("Enter valid OTP or click on Resend OTP if not recieved.", "", "1");
            this.otpEnter = true;
            this.thankyou = false;
            this.buynowcoursepopup = true;
            this.incorrectOTP = true;
        }
        this.vcodMobile = OTP;
        changeEmailMobile['lc'] = this.resendNum.trim();
        changeEmailMobile['vcod'] = this.vcodMobile.trim();

        if (OTP != '') {
        } else {
            this.dataConf['type'] = 2;
            //     this.dataConf['msg'] = "Error";
            //     this.dataConf['error_msg'] = responseData.ERROR_MSG;
            //     this.openConfirmation = true;
            //     return false;
            //changeEmailMobile['lc'] = this._constantService.getSessionDataBYKey('mobile');
        }
        changeEmailMobile['t'] = 'm';

        this._constantService.fetchDataApi(this._constantService.getVerifyCode4EmailMobileChangeServiceUrl(), changeEmailMobile).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                this.thankyou = true;
                this._constantService.showToast("Mobile number changed successfully", "", "1");
            }
            else if (status == 'error') {
                this._constantService.showToast("Enter valid OTP or click on Resend OTP if not recieved.", "", "1");
                this.incorrectOTP = true;
                this.thankyou = false;
                this.buynowcoursepopup = true;
                this.otpEnter = true;

            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });
    }
    endPopup() {
        this.thankyou = false;
        this.otpEnter = false;
        this.buynowcoursepopup = false;
    }
    closeOTP() {
        this.incorrectOTP = false;
    }
    change(id, event) {
        if (event.target.value != "") {
            this.elmId = 'v_' + id;
            document.getElementById(this.elmId).focus();
        }
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
    focusElem(id) {
        //        document.getElementById("v_" + id).focus();
    }

    setMobileNumberAndCountryCode(emittedObject){
        this.adminMobileNumber=emittedObject.mobileNumber;
        if(this.adminMobileNumber && this.adminMobileNumber.length>4 && this.adminMobileNumber.length<14){
            this.addClass=true;
        }else{
            this.addClass=false;
        }
        this.countryId=emittedObject.countryId;
      }
}
