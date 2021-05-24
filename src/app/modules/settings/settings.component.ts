import { Component, OnInit, AfterViewInit, Output, EventEmitter, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConstantService } from './../../services/constant.service';
import { EncryptionService } from './../../services/encryption.service';
import { Meta, Title } from '@angular/platform-browser';
import { PostdataService } from './../../services/postdata.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    providers: [ConstantService, EncryptionService],

    // styleUrls: ['./settings.component.scss']
    styleUrls: ['./settings.component.scss', './../../sharedComponents/leftmenu/leftmenu.component.scss', './newsettings.component.scss']
})
export class SettingsComponent implements OnInit, AfterViewInit {
    validDate: boolean = false;
    countryList: any;
    countryCode: any;
    countryId: any = this._constantService.getSessionDataBYKey('MOBILE_CNTRY_ID');
    type(arg0: any, arg1: any): any {
        throw new Error("Method not implemented.");
    }
    Code(arg0: any): any {
        throw new Error("Method not implemented.");
    }
    emailtoogle: boolean = true;
    BTN_7: boolean = false;
    BTN_8: boolean = false;
    BTN_9: boolean = false;
    BTN_10: boolean = false;
    BTN_11: boolean = false;
    BTN_12: boolean = false;
    BTN_13: boolean = false;
    BTN_14: boolean = false;
    BTN_15: boolean = false;
    BTN_16: boolean = false;
    BTN_17: boolean = false;
    PAGES: boolean = false;
    RELATED_TO_USER = false;
    SECURITY: boolean = false;
    PUBLIC: boolean = false;
    PersonalSettingOn: boolean = false;
    NotificationOn: boolean = false;
    gender: any;
    stopTimer: boolean;
    timePlaceholder: string;
    verifyLink: boolean = true;
    showVerify: boolean = true;

    @Output() chng_mobile = new EventEmitter<boolean>();
    shwText: boolean = true;
    showResendMobile: boolean = false;
    prloader: boolean = false;
    chang_mobile: boolean = false;
    showPreloader: boolean = false;
    loader: boolean = false;
    isEditable: boolean = true;
    isEditableEmail: boolean = true;
    isEditableMobile: boolean = true;
    verified: boolean = false;
    mobverified: boolean = false;
    showText: boolean = true;
    Text: boolean = true;
    citys = [];
    states = [];
    countryArr = [];
    name: string = "";
    f_name: string;
    l_name: string;
    u_name: string;
    dob: string;
    city_id = "";
    state_id;
    verification_code;
    new_password = "";
    confirm_password = "";
    new_email = "";
    new_mobileno = ""
    vcodEmail = "";
    vcodMobile = "";
    rg_dob_class = 0;
    secWidth = 0;
    t: string;
    dataConf = {};
    openConfirmation: boolean = false;
    count_bef;
    state_bef;
    inputValue: any;
    showResend: boolean = true;
    shwResend: boolean = false;
    count: number;
    countDisplay;
    otpsendMsg: string = "OTP has been generated and sent to your registered Mobile Number/Email Address";
    // resize_window: boolean = true;


    constructor(
        public _constantService: ConstantService,
        public _encrypt: EncryptionService,
        public router: Router,
        private title: Title,
        private meta: Meta,
        private postData: PostdataService,
        private activatedRoute: ActivatedRoute
    ) { }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (window.innerWidth >= 1200) {
            var innerWindWidth = window.innerWidth - 18;
            event.target.innerWidth;
            // this.resize_window = true;
            document.getElementById("windiv").style.width = innerWindWidth + "px";
        } else {
            document.getElementById("windiv").style.width = "100%";
        }
        if (window.innerWidth >= 768) {
            var rightwidth = document.getElementById("left-side-bar").offsetWidth;
            var rightinnwidth = rightwidth - 15;
            document.getElementById("someDiv").style.width = rightinnwidth + "px";
        }
        // else{
        //   document.getElementById("someDiv").style.width = "278px";
        // }
    }
    private checkScreenWidth() {
        var winwidth = window.innerWidth - 18;
        if (window.innerWidth >= 1200) {

            document.getElementById("windiv").style.width = winwidth + "px";
        } else {
            document.getElementById("windiv").style.width = "100%";
        }
        if (window.innerWidth >= 768) {
            var rightwidth = document.getElementById("left-side-bar").offsetWidth;
            var rightinnwidth = rightwidth - 15;
            document.getElementById("someDiv").style.width = rightinnwidth + "px";
        }
        // else{
        //   document.getElementById("someDiv").style.width = "278px";
        // }
    }

    ngOnInit() {
        this.countryId = this._constantService.getSessionDataBYKey('MOBILE_CNTRY_ID');
        this.getCountryName();
        this.checkScreenWidth();
        document.title = "Study24x7 - A best place for collaborative learning & sharing";
        this.t = this._constantService.getSessionDataBYKey('token');
        if (this.t != null && this.t != undefined && this.t != '') {
            if ((this._constantService.getSessionDataBYKey('mobile_verify') == 'false' && this._constantService.getEmailVer() == 'false') || this._constantService.getUserInterest() == '0') {
                this.router.navigate(['verification']);
            }

            if (this._constantService.getEmailVer() == 'true') {
                this.verified = true;

            }
            if (this._constantService.getSessionDataBYKey('mobile_verify') == 'true') {
                this.mobverified = true;

            }

            window.scrollTo(0, 0);
            this.userDetails();


        } else {
            this.router.navigate(['']);
        }

        this.getCountry();
        this.getCountryNew();
        this.getState(this._constantService.getCountry());
        this.getCity(this.state_id);


        this.activatedRoute.params.subscribe((params: Params) => {
            if (params['id'] != undefined && params['id'] != null) {
                if (params['id'] == "#personalinfo") {
                    this.settingpage(1);
                } else if (params['id'] == "#security") {
                    this.settingpage(2);
                } else if (params['id'] == "#contactinfo") {
                    this.settingpage(4);
                }
            }
        });



    }

    ngAfterViewInit() {

        if (this.t != null && this.t != undefined && this.t != '') {
            this.secWidth = document.getElementById('left-side-bar').offsetWidth;
            this.secWidth = this.secWidth - 30;
            if (this.city_id != "") {
                var city = (<HTMLSelectElement>document.getElementById('city'));
                for (var j = 0; j < city.options.length; j++) {
                    if (city.options[j].value == this.city_id) {
                        city.options.selectedIndex = j;
                        break;
                    }
                }
            }
            if (this.state_id != '') {
                var state = (<HTMLSelectElement>document.getElementById('state'));
                for (var j = 0; j < state.options.length; j++) {
                    if (state.options[j].value === this.state_id) {
                        state.options.selectedIndex = j;
                        break;
                    }
                }
            }
        }
    }

    Settingtab = 1;
    changepassword = 0;
    verifyemailid = 0;
    verifyphone = 0;
    editoption = 0;
    editphoneinput = 0;
    hide_verify = 0;
    selState = 0;
    selCountry = 0;

    settingpage(index) {
        this.Settingtab = index;
        this.NotificationOn = false;
        this.PersonalSettingOn = false;
        this.countDisplay = "00:60";
        this.stopTimer = true;
        this.isEditableEmail = true;
        this.isEditableMobile = true;
        this.verifyemailid = 0;
        this.verifyphone = 0;
        this.editoption = 0;
        this.editphoneinput = 0;
        this.isEditable = true;
        this.new_email = '';
        this.new_mobileno = '';
        this.changepassword = 0;
        if (index == 1) {
            setTimeout(() => {
                (<HTMLInputElement>document.getElementById('full_name')).focus();
            }, 100);
            this.userDetails();
            this.getCountry();
            this.getState(this._constantService.getCountry());
            this.getCity(this.state_id);
            this.getdata();
            this.countryId = this._constantService.getSessionDataBYKey('MOBILE_CNTRY_ID');
            this.countryCode = this._constantService.getMobileCountryCode(this.countryId, this.countryList);
            this.router.navigate(['/settings/#personalinfo']);
        } else if (index == 2) {
            this.countryId = this._constantService.getSessionDataBYKey('MOBILE_CNTRY_ID');
            this.countryCode = this._constantService.getMobileCountryCode(this.countryId, this.countryList);
            this.router.navigate(['/settings/#security'])
        } else if (index == 4) {
            this.router.navigate(['/settings/#contactinfo'])
        }


    }

    generatepassword(index) {
        this.changepassword = index;
    }
    sendOTP4email(index) {
        this.verifyemailid = index;
    }
    sendOTP4phone(index) {
        this.verifyphone = index;
        this.hide_verify = index;
    }
    editemail(index) {
        if (index == 2) {
            if ((<HTMLSelectElement>document.getElementById('chng_email')).value.length == 0) {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "ERROR";
                this.dataConf['error_msg'] = "Please enter email";
                //this.openConfirmation = true;
                return;
            } else if (this._constantService.isEmail((<HTMLSelectElement>document.getElementById('chng_email')).value)) {
                this.verifyemailid = 0;
                this.isEditableEmail = false;
                this.isEditableMobile = true;
                this.editoption = index;
                this.editphoneinput = 0;
                this.new_mobileno = '';

            } else {
                this.verifyemailid = 0;
                this.isEditableEmail = true;
                this.isEditableMobile = true;
                this.shwText = true;
                this.editoption = 1;
                this.editphoneinput = 0;
                this.new_mobileno = '';
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = "Enter a valid email address";
                this.openConfirmation = true;
                return;
            }

        }
        this.verifyemailid = 0;
        this.isEditableEmail = false;
        this.isEditableMobile = true;
        this.editoption = index;
        this.editphoneinput = 0;
        this.new_mobileno = '';
    }
    editphone(index) {
        if (index == 2) {
            if (this.new_mobileno.length == 0) {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "ERROR";
                this.dataConf['error_msg'] = "Please enter mobile no";
                this.openConfirmation = true;
                return;
            } else if (this._constantService.isMobile(this.new_mobileno)) {
                this.stopTimer = true;
                this.verifyphone = 0;
                this.isEditableMobile = false;
                this.isEditableEmail = true;
                this.verified = true;
                this.editphoneinput = index;
                this.editoption = 0;
                this.new_email = '';

            } else {
                this.mobverified = false;
                this.showText = true;
                this.showPreloader = false;
                this.isEditableMobile = false;
                this.loader = false;
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = "Enter a valid mobile number";
                this.openConfirmation = true;
                return;
            }


        }

        this.verifyphone = 0;
        this.isEditableMobile = false;
        this.isEditableEmail = true;
        this.editphoneinput = index;
        this.editoption = 0;
        this.new_email = '';

    }

    savemail(index) {
        this.editphoneinput = index;
    }

    cancel() {
        this.isEditableMobile = true;
        this.editphoneinput = 0;
        this.isEditable = true;
        this.countryId = this._constantService.getSessionDataBYKey('MOBILE_CNTRY_ID');
        this.countryCode = this._constantService.getMobileCountryCode(this.countryId, this.countryList);
    }
    cancel1() {
        this.isEditableEmail = true;
        this.editoption = 0;
        this.isEditable = true;
    }

    getCity(state_id) {
        var data = {};
        data['stid'] = state_id;
        //        if (this.selState == state_id) {
        //            return false;
        //        }
        this.selState = state_id;

        this._constantService.fetchDataApi(this._constantService.getCityServiceUrl(), data).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.citys = responseData.CITY_ID;
                setTimeout(() => {
                    if (this.city_id != "") {
                        var city = (<HTMLSelectElement>document.getElementById('city'));
                        for (var j = 0; j < city.options.length; j++) {
                            if (city.options[j].value == this.city_id) {
                                city.options.selectedIndex = j;
                                break;
                            }
                        }
                    }
                }, 150);

            } else if (status == this._constantService.error_token) {

                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });
    }
    closePopup(event) {
        if (event['error'] == false) {
            this.openConfirmation = false;
        }
    }

    getCountry() {

        this._constantService.fetchDataApiWithoutBody(this._constantService.getCountryv1ServiceUrl()).subscribe(data => {
            let responseData: any = data;
            this.countryArr = responseData.COUNTRY_LIST;
            setTimeout(() => {
                var country = (<HTMLSelectElement>document.getElementById('country'));
                for (var j = 0; j < country.options.length; j++) {
                    if (country.options[j].value === this._constantService.getCountry()) {
                        country.options.selectedIndex = j;
                        //this.getState(country.options[j].value);
                        break;
                    }
                }
            }, 100)
            this.getState(this._constantService.getCountry());
        });
    }

    getCountryNew() {

        this._constantService.fetchDataApiWithoutBody(this._constantService.getCountryServiceUrlNew()).subscribe(data => {
            let responseData: any = data;
        });
    }

    getState(country_id) {
        var data = {};
        data['conid'] = country_id;
        if (this.selCountry == country_id) {
            return 0;
        }
        this.selCountry = country_id;

        this._constantService.fetchDataApi(this._constantService.getStateServiceUrl(), data).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.states = responseData.STATE_ID;

                setTimeout(() => {
                    var state = (<HTMLSelectElement>document.getElementById('state'));
                    for (var j = 0; j < state.options.length; j++) {
                        if (state.options[j].value === this.state_id) {
                            state.options.selectedIndex = j;
                            this.getCity(state.options[j].value);
                            break;
                        }
                    }
                }, 100);

            } else if (status == this._constantService.error_token) {

                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });
    }

    userDetails() {

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
            if (status == this._constantService.error_token) {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;
            } else {
                var fullName = responseData.FULL_NAME.split(" ");
                this.f_name = fullName[0];
                this.l_name = fullName[1];
                this.u_name = responseData.USER_NAME.trim();
                this.city_id = responseData.CITY_ID;
                // this.getCountryName();
                this.selState = this.state_id;
                this.selCountry = responseData.COUNTRY_ID;
                if (responseData.MOBILE_CNTRY_ID) {
                    this._constantService.setSessionJsonPair('MOBILE_CNTRY_ID', responseData.MOBILE_CNTRY_ID);
                    this.countryId = responseData.MOBILE_CNTRY_ID;
                    this.getCountryName();
                }
                if (this.selCountry != null) {
                    this.getCountry();
                }
                this.state_id = responseData.STATE_ID;
                this.getCity(this.state_id);
                //                if (this.state_id != null && this.state_id != '') {
                //                     this.getCity(responseData.STATE_ID);
                //                }
                let dob = responseData.DOB;
                if (dob) {
                    let arrDob = dob.split(' ');
                    this.dob = this.changeDateFormatToDDMMYY(arrDob[0]).replace(/-/g, "/");
                    this.inputValue = this.dob;
                } else {
                    this.inputValue = 'dd/mm/yyyy';
                }


                var country = (<HTMLSelectElement>document.getElementById('country'));
                for (var j = 0; j < country.options.length; j++) {
                    if (country.options[j].value === this._constantService.getCountry()) {
                        country.options.selectedIndex = j;
                        //this.getState(country.options[j].value);
                        break;
                    }
                }
                if (responseData.STATE_ID != null && responseData.STATE_ID != "") {
                    var state = (<HTMLSelectElement>document.getElementById('state'));
                    for (var j = 0; j < state.options.length; j++) {
                        if (state.options[j].value === responseData.STATE_ID) {
                            state.options.selectedIndex = j;
                            break;
                        }
                    }
                }
                if (responseData.CITY_ID != null && responseData.CITY_ID != "") {

                    var city = (<HTMLSelectElement>document.getElementById('city'));
                    for (var j = 0; j < city.options.length; j++) {
                        if (city.options[j].value === responseData.CITY_ID) {
                            city.options.selectedIndex = j;
                            break;
                        }
                    }
                }

                var gender = (<HTMLSelectElement>document.getElementById('gender'));
                if (gender) {
                    if (responseData.GENDER != null && responseData.GENDER != "") {
                        if (responseData.GENDER == 1) {
                            gender.value = "1"
                        } else if (responseData.GENDER == 2) {
                            gender.value = "2"
                        } else {
                            gender.value = '0';
                        }
                    } else {
                        gender.value = '0';
                    }
                }
                this.mobverified = responseData.MOBILE_VERIFIED == "0" ? false : true;
                this.verified = responseData.EMAIL_VERIFIED == "0" ? false : true;

                // title and description starts ************************************
                //                document.title = "Study24x7";
                //
                //                var link = document.getElementsByTagName("link");
                //
                //                for (var i = 0; i < link.length; i++) {
                //                    if (link[i].rel == "canonical") {
                //                        link[i].href = document.URL;
                //                    }
                //                }
                //                if (responseData.SUMMARY) {
                //                    var desc = "";
                //                    this.meta.updateTag({property: "og:description", content: desc});
                //                    this.meta.updateTag({name: "twitter:description", content: desc});
                //                }
                //
                //                this.meta.updateTag({property: "og:title", content: document.title});
                //                this.meta.updateTag({name: "twitter:title", content: document.title});
                //                this.meta.updateTag({property: "og:url", content: document.URL});
                //                this.meta.updateTag({name: "twitter:url", content: document.URL});
                //                var imageUrl = "https://study247.s3-accelerate.amazonaws.com/assets/images/svg-three/Logo.png";
                //                this.meta.updateTag({property: "og:image", content: imageUrl});
                //                this.meta.updateTag({name: "twitter:image", content: imageUrl});

                // title and description end ****************************************

            }

        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });

    }
    empty() {
        this.selCountry = 0;
        this.selState = 0;
        this.state_id = 0
        this.states = [];
        //this.state_id = '';
        this.citys = [];
        //this.city_id = '';
    }
    empty1() {
        this.selState = 0;
        this.state_id = 0
        this.citys = [];
        //this.city_id = '';
    }
    sendVerificationCode4PassChng() {
        this.shwText = false;
        this.prloader = true;

        var data = {};
        data['token'] = this._constantService.getSessionDataBYKey('token');
        data['token_param'] = {};
        data['token_param']['device_type'] = 'w';
        data['token_param']['host'] = '';

        this._constantService.fetchDataApi(this._constantService.getSendVeri4PassChangeServiceUrl(), data).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.shwText = true;
                this.otpsendMsg = responseData.SUCCESS_MSG;
                this.prloader = false;
                this.changepassword = 1;
                this.stopTimer = false;
                this.countDisplay = "00:60";
                this.count = 60;
                this.countdown(this.count);
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
            } else if (status == this._constantService.error_token) {
                this.shwText = true;
                this.prloader = false;
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;
            } else {
                this.shwText = true;
                this.prloader = false;
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }
        }, error => {
            this.shwText = true;
            this.prloader = false;
            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });
    }

    verifyOTP4PassChng() {
        this.loader = true;
        this.showText = false;
        if (this.verification_code != null && this.verification_code != '') {
            var data = {};
            data['token'] = this._constantService.getSessionDataBYKey('token');
            data['token_param'] = {};
            data['token_param']['device_type'] = 'w';
            data['token_param']['host'] = '';
            data['otp'] = this.verification_code;
            if (data['otp'].length == 0) { return false; }

            this._constantService.fetchDataApi(this._constantService.getVerifyCode4PassChangeServiceUrl(), data).subscribe(data => {
                var responseData: any = data;
                var status = responseData.STATUS;
                if (status == this._constantService.success_msg) {
                    this.loader = false;
                    this.showText = true;
                    this.changepassword = 2;
                    //this._constantService.setToken(responseData.TOKEN);
                    this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                } else if (status == this._constantService.error_token) {
                    this.loader = false;
                    this.showText = true;
                    this.dataConf['type'] = 4;
                    this.dataConf['msg'] = "Session Expire";
                    this.dataConf['error_msg'] = "Session Expired";
                    this.openConfirmation = true;
                } else {
                    this.loader = false;
                    this.showText = true;
                    this.dataConf['type'] = 2;
                    this.dataConf['msg'] = "STUDY24X7";
                    this.dataConf['error_msg'] = responseData.ERROR_MSG;
                    this.openConfirmation = true;
                }
                this.verification_code = null;
            }, error => {
                var responseData = error;
                if (responseData.status == 500) {
                    this.router.navigate(['500']);
                }
            });
        } else {
            this.loader = false;
            this.showText = true;
            // alert("Please Enter Verification Code");
            this.dataConf['type'] = 2;
            this.dataConf['msg'] = "STUDY24X7";
            this.dataConf['error_msg'] = "Please Enter Verification Code";
            this.openConfirmation = true;
        }
    }





    changePassword() {
        this.showPreloader = true;
        this.showText = false;
        if (this.new_password == "") {
            //   alert('Enter password');
            this.showPreloader = false;
            this.showText = true;
            this.dataConf['type'] = 2;
            this.dataConf['msg'] = "STUDY24X7";
            this.dataConf['error_msg'] = ' Please enter the new password';
            this.openConfirmation = true;
        } else if (this.confirm_password == "") {
            this.showPreloader = false;
            this.showText = true;
            this.dataConf['type'] = 2;
            this.dataConf['msg'] = "STUDY24X7";
            this.dataConf['error_msg'] = ' Please enter the confirm password';
            this.openConfirmation = true;
        }
        else {
            if (this.new_password == this.confirm_password) {
                var data = {};
                data['pd'] = this.new_password;
                if (data['pd'].match(/ /)) {
                    this.showPreloader = false;
                    this.showText = true;
                    this.dataConf['type'] = 2;
                    this.dataConf['msg'] = "STUDY24X7";
                    this.dataConf['error_msg'] = 'Invalid Password';
                    this.openConfirmation = true;
                    return false;


                }
                if (this.new_password.length < 6 && this.new_password.length > 20) {
                    this.showPreloader = false;
                    this.showText = true;
                    this.dataConf['type'] = 2;
                    this.dataConf['msg'] = "STUDY24X7";
                    this.dataConf['error_msg'] = 'Password length should be between 6 & 20';
                    this.openConfirmation = true;
                    return;
                }
                data['cpd'] = this.confirm_password;
                if (data['cpd'].match(/ /)) {
                    this.showPreloader = false;
                    this.showText = true;
                    this.dataConf['type'] = 2;
                    this.dataConf['msg'] = "STUDY24X7";
                    this.dataConf['error_msg'] = 'Invalid Password';
                    this.openConfirmation = true;
                    return false;
                }

                data['token'] = this._constantService.getSessionDataBYKey('token');
                data['token_param'] = {};
                data['token_param']['device_type'] = 'w';
                data['token_param']['host'] = '';

                this._constantService.fetchDataApi(this._constantService.getPassChangeServiceUrl(), data).subscribe(data => {
                    var responseData: any = data;
                    var status = responseData.STATUS;
                    if (status == this._constantService.success_msg) {
                        this.showPreloader = false;
                        this.showText = true;
                        this.changepassword = 0;
                        //this._constantService.setToken(responseData.TOKEN);
                        this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "STUDY24X7";
                        this.dataConf['error_msg'] = responseData.SUCCESS_MSG;
                        this._constantService.showToast("Password successfully updated ", "", "1");             //*****adc by vijay**** */
                        this.router.navigate(['home']);
                        //this.openConfirmation = true;
                    } else if (status == this._constantService.error_token) {
                        this.showPreloader = false;
                        this.showText = true;
                        this.dataConf['type'] = 4;
                        this.dataConf['msg'] = "Session Expire";
                        this.dataConf['error_msg'] = "Session Expired";
                        this.openConfirmation = true;
                    } else {
                        this.showPreloader = false;
                        this.showText = true;
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "STUDY24X7";
                        this.dataConf['error_msg'] = responseData.ERROR_MSG;
                        this.openConfirmation = true;
                    }
                    this.showPreloader = false;
                    this.showText = true;
                    this.new_password = null;
                    this.confirm_password = null;
                }, error => {
                    var responseData = error;
                    if (responseData.status == 500) {
                        this.router.navigate(['500']);
                    }
                });
            } else {
                this.showPreloader = false;
                this.showText = true;
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = "New password doesn't match with confirm password";
                this.openConfirmation = true;
            }
        }
    }

    isValidDate(date: string): boolean {

        var matches = /^(\d{1,2})[\/](\d{1,2})[\/](\d{4})$/.exec(date);
        if (matches == null) return false;
        let composedDate: string;
        let d: number;
        let m: number;
        let y: number;
        d = +matches[1];
        m = +matches[2];
        y = +matches[3];
        return this.isDate(d, m, y);
    }

    isDate(day: number, month: number, year: number): boolean {
        //        if (day == 0) {
        //            return false;
        //        }
        var datt = new Date();
        var dat = datt.getFullYear();
        if (dat - year < 14) {
            this.validDate = true;
            false;
        }
        if (day == 0 || year < 1940 || year > dat) {
            this.showPreloader = false;
            this.showText = true;
            this.dataConf['type'] = 2;
            this.dataConf['msg'] = "STUDY24X7";
            this.dataConf['error_msg'] = "Age limit should be above 13 years";
            this.openConfirmation = true;
            return false;
        }
        //
        switch (month) {
            case 1: case 3: case 5: case 7: case 8: case 10: case 12:
                if (day > 31)
                    return false;
                return true;
            case 2:
                if (year % 4 == 0)
                    if (day > 29) {
                        return false;
                    }
                    else {
                        return true;
                    }
                if (day > 28) {
                    return false;
                }
                return true;
            case 4: case 6: case 9: case 11:
                if (day > 30) {
                    return false;
                }
                return true;
            default:
                return false;
        }
    }

    changeDateFormat(date: string): string {
        var matches = /^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/.exec(date);

        let composedDate: string;
        let d: number;
        let m: number;
        let y: number;
        d = +matches[1];
        m = +matches[2];
        y = +matches[3];

        return y + '-' + m + '-' + d;
    }


    changeDateFormatToDDMMYY(date: string): string {
        var matches = /^(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})$/.exec(date);
        let composedDate: string;
        let d: number;
        let m: number;
        let y: number;

        y = +matches[1];
        m = +matches[2];
        d = +matches[3];

        return d + '-' + m + '-' + y;
    }


    updateUsrdetails() {
        console.log("aaaaaaaaaa");
        this.showPreloader = true;
        this.showText = false;
        this.validDate = false;
        var country = (<HTMLSelectElement>document.getElementById("country")).value;
        if (country == "default") {
            localStorage.setItem("country", "");
        }else{
            localStorage.setItem("country", (<HTMLSelectElement>document.getElementById("country")).value );

        }
        var first_name = (<HTMLSelectElement>document.getElementById("full_name")).value;
        var last_name = (<HTMLSelectElement>document.getElementById("full_name1")).value;
        if (first_name.match(/[0-9!@#$%^&*~]/)) {
            this.showPreloader = false;
            this.showText = true;
            this.dataConf['type'] = 2;
            this.dataConf['msg'] = "STUDY24X7";
            this.dataConf['error_msg'] = "Please enter a valid first name";
            this.openConfirmation = true;
            return false;
        } else if (first_name.length == 0) {
            this.showPreloader = false;
            this.showText = true;
            this.dataConf['type'] = 2;
            this.dataConf['msg'] = "STUDY24X7";
            this.dataConf['error_msg'] = "Please enter your first name";
            this.openConfirmation = true;
            return false;
        }
        if (first_name.match(" ")) {
            this.showPreloader = false;
            this.showText = true;
            this.dataConf['type'] = 2;
            this.dataConf['msg'] = "STUDY24X7";
            this.dataConf['error_msg'] = "First name field does'nt accept spaces between characters";
            this.openConfirmation = true;
            return false;
        }
        if (last_name.match(" ")) {
            this.showPreloader = false;
            this.showText = true;
            this.dataConf['type'] = 2;
            this.dataConf['msg'] = "STUDY24X7";
            this.dataConf['error_msg'] = "last name field does'nt accept spaces between characters";
            this.openConfirmation = true;
            return false;
        }

        if (last_name.match(/[0-9!@#$%^&*~]/)) {
            this.showPreloader = false;
            this.showText = true;
            this.dataConf['type'] = 2;
            this.dataConf['msg'] = "STUDY24X7";
            this.dataConf['error_msg'] = "Please enter a valid last name";
            this.openConfirmation = true;
            return false;
        } else if (last_name.length == 0) {
            this.showPreloader = false;
            this.showText = true;
            this.dataConf['type'] = 2;
            this.dataConf['msg'] = "STUDY24X7";
            this.dataConf['error_msg'] = "Please enter your last name";
            this.openConfirmation = true;
            return false;
        }
        var state = (<HTMLSelectElement>document.getElementById("state")).value;
        var city = (<HTMLSelectElement>document.getElementById("city")).value;
        var dob = (<HTMLInputElement>document.getElementById("r_dob")).value;

        var data = {};
        if (!this.isValidDate(dob)) {
            // this.rg_dob_class = 1;
            this.showPreloader = false;
            this.showText = true;
            this.dataConf['type'] = 2;
            this.dataConf['msg'] = "STUDY24X7";
            this.dataConf['error_msg'] = "Please enter valid date of birth";
            this.openConfirmation = true;
            return false;
        }
        if (this.validDate) {
            this.showPreloader = false;
            this.showText = true;
            this.dataConf['type'] = 2;
            this.dataConf['msg'] = "STUDY24X7";
            this.dataConf['error_msg'] = "Age limit should be above 13 years";
            this.openConfirmation = true;
            return false;
        }
        data['token'] = this._constantService.getSessionDataBYKey('token');
        data['token_param'] = {};
        data['token_param']['device_type'] = 'w';
        data['token_param']['host'] = '';

        dob = this.changeDateFormat(dob);
        data['dob'] = dob;
        data['fn'] = this.f_name.trim();
        data['ln'] = this.l_name.trim();
        if ((<HTMLSelectElement>document.getElementById("gender")).selectedIndex == 0) {
            this.gender = "0";
        } else if ((<HTMLSelectElement>document.getElementById("gender")).selectedIndex == 1) {
            this.gender = "1";
        } else {
            this.gender = "2";
        }
        data['gender'] = this.gender.trim();
        if (country != null || typeof (country) != undefined) {
            if (country != "default") {
                data['couid'] = country;
            } else {
                data['couid'] = '';
            }
        }
        else {
            this.showPreloader = false;
            this.showText = true;

            //alert("Please select a country");
            this.dataConf['type'] = 2;
            this.dataConf['msg'] = "STUDY24X7";
            this.dataConf['error_msg'] = "Please select your country";
            this.openConfirmation = true;
        }
        if (state != null || typeof (state) != undefined) {
            if (state == 'default') {
                data['stid'] = "";
            } else {
                data['stid'] = state;
            }
        } else {
            this.showPreloader = false;
            this.showText = true;

            // alert("Please select a state");
            this.dataConf['type'] = 2;
            this.dataConf['msg'] = "STUDY24X7";
            this.dataConf['error_msg'] = "Please select your state";
            this.openConfirmation = true;

        }
        if (city != null || typeof (city) != undefined) {
            if (city == 'default') {
                data['cityid'] = "";
            } else {
                data['cityid'] = city;
            }
        } else {
            this.showPreloader = false;
            this.showText = true;
            // alert("Please select a city");
            this.dataConf['type'] = 2;
            this.dataConf['msg'] = "STUDY24X7";
            this.dataConf['error_msg'] = "Please select your city";
            this.openConfirmation = true;

        }


        this._constantService.fetchDataApi(this._constantService.updateUserGenInfoServiceUrl(), data).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this.router.navigate(['home']);
                this.showPreloader = false;
                this.showText = true;
                this.rg_dob_class = 0;
                if (responseData.COUNTRY)
                    this._constantService.setSessionJsonPair('country', responseData.COUNTRY);
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.SUCCESS_MSG;
                this.openConfirmation = true;
            } else if (status == this._constantService.error_token) {
                this.showPreloader = false;
                this.showText = true;
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;
            } else {
                this.showPreloader = false;
                this.showText = true;
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = "User general info is not added";
                this.openConfirmation = true;
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });
    }




    VerificationCode(type: string) {
        this.verifyLink = false;
        this.isEditable = false;
        var resendVerification = {};
        resendVerification['t'] = type;
        if (type === 'e') {
            resendVerification['lc'] = this._constantService.getEmail();
        } else {
            resendVerification['lc'] = this._constantService.getSessionDataBYKey('mobile');
        }

        resendVerification['token'] = this._constantService.getSessionDataBYKey('token');
        resendVerification['token_param'] = {};
        resendVerification['token_param']['device_type'] = 'w';
        resendVerification['token_param']['host'] = '';

        this._constantService.fetchDataApi(this._constantService.getSavedVerifyOTPServiceUrl(), resendVerification).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.showResend = false;
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                if (type == "m") {
                    this.verifyphone = 2;
                } else if (type == 'e') {
                    this.verifyemailid = 2;
                    this.showVerify = false;
                }
                this.countDisplay = "00:60";
                this.stopTimer = false;
                this.count = 60;
                this.countdown(this.count);

            } else if (status == this._constantService.error_token) {
                this.verifyLink = true;
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;
            } else {
                this.verifyLink = true;;
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }

        }, error => {

        });
    }

    verificationSubmit(type: string) {
        this.showText = false;
        this.showPreloader = true;
        if ((<HTMLSelectElement>document.getElementById("textt")).value == '') {
            this.showText = true;
            this.showPreloader = false;
            this.dataConf['type'] = 2;
            this.dataConf['msg'] = "STUDY24X7";
            this.dataConf['error_msg'] = "Please enter verification code";
            this.openConfirmation = true;
            return false;
        }
        this.loader = true;
        var email_ver = {};
        if (type == 'e') {
            email_ver['lc'] = this._constantService.getEmail();
            email_ver['t'] = 'e';
            email_ver['vcod'] = this.vcodEmail;
        } else {
            email_ver['lc'] = this._constantService.getSessionDataBYKey('mobile');
            email_ver['t'] = 'm';
            email_ver['vcod'] = this.vcodMobile;
        }
        email_ver['token'] = this._constantService.getSessionDataBYKey('token');
        email_ver['token_param'] = {};
        email_ver['token_param']["device_type"] = "w";
        email_ver['token_param']["host"] = "";


        this._constantService.fetchDataApi(this._constantService.getSavedVerifyServiceUrl(), email_ver).subscribe(data => {

            var responseData: any = data;
            var status = responseData.STATUS;

            if (status == this._constantService.success_msg) {
                this.showText = true;
                this.showPreloader = false;
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                if (type == 'e') {
                    this._constantService.setEmailVer("true");
                    this.verified = true;
                } else {
                    this._constantService.setSessionJsonPair('mobile_verify', 'true');
                    this.mobverified = true;
                }
                this.isEditable = true;
            } else if (status == "error") {
                this.showText = true;
                this.showPreloader = false;
                this.loader = false;
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            } else {
                this.showText = true;
                this.showPreloader = false;
                this.loader = false;
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;
            }

        }, error => {
            //            var responseData = error;
            //            if (responseData.status == 500) {
            //                this._router.navigate(['500']);
            //            }
        });
    }


    sendOtpForEmailMobileChange(type) {
        //this.showResend == false;
        this.countDisplay = "00:60";
        this.stopTimer = false;
        this.count = 60;
        this.countdown(this.count);
        var changeEmailMobile = {};
        changeEmailMobile['token'] = this._constantService.getSessionDataBYKey('token');
        changeEmailMobile['token_param'] = {};
        changeEmailMobile['token_param']['device_type'] = 'w';
        changeEmailMobile['token_param']['host'] = '';
        if (type == "m") {
            if (this.new_mobileno != '') {
                changeEmailMobile['lc'] = this.new_mobileno.trim();
            } else {
                changeEmailMobile['lc'] = this._constantService.getSessionDataBYKey('mobile');
            }
            changeEmailMobile['conid'] = this.countryId;


        } else if (type == 'e') {
            if (this.new_email != '') {
                changeEmailMobile['lc'] = this.new_email.trim();
            } else {
                changeEmailMobile['lc'] = this._constantService.getEmail();
            }

        }
        changeEmailMobile['t'] = type;

        this._constantService.fetchDataApi(this._constantService.getSendVeri4EmailMobileChangeServiceUrl(), changeEmailMobile).subscribe(data => {
            var responseData: any = data;
            var verifyStatus = responseData.VERIFIED_STATUS;
            if (verifyStatus == 1) {
                if (type == "m") {
                    this.showResendMobile = false;
                    this.editphoneinput = 0;
                    this.verifyphone = 0;
                    //this._constantService.setMobile(this.new_mobileno);
                    this._constantService.setSessionJsonPair('mobile', this.new_mobileno);
                    this.mobverified = true;
                    //this._constantService.setMobileVer('true');
                    this._constantService.setSessionJsonPair('mobile_verify', 'true');
                    if (responseData.COUNTRY)
                        this._constantService.setSessionJsonPair('country', responseData.COUNTRY);

                } else if (type == 'e') {
                    this.editoption = 0;
                    this.verifyemailid = 0;
                    this._constantService.setEmail(this.new_email);
                    this.verified = true;
                    this._constantService.setEmailVer('true');
                }
                return false;
            }
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.verifyLink = false;
                this.loader = false;
                this.showText = true;
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.SUCCESS_MSG;
                this.openConfirmation = true;
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                if (type == "m") {
                    this.verifyphone = 1;
                } else if (type == 'e') {
                    this.verifyemailid = 1;
                }
            } else if (status == this._constantService.error_token) {

                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;
            } else {
                if (type == "m") {
                    this.editphoneinput = 1;
                } else if (type == 'e') {
                    this.editoption = 1;
                }

                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });
    }

    verifyOtpForEmailMobileChange(type) {
        // this.showResend == true;
        this.showPreloader = true;
        this.showText = false;

        var changeEmailMobile = {};
        changeEmailMobile['token'] = this._constantService.getSessionDataBYKey('token');
        changeEmailMobile['token_param'] = {};
        changeEmailMobile['token_param']['device_type'] = 'w';
        changeEmailMobile['token_param']['host'] = '';
        changeEmailMobile['conid'] = this.countryId;
        if (type == "m") {
            changeEmailMobile['lc'] = this.new_mobileno.trim();
            changeEmailMobile['vcod'] = this.vcodMobile.trim();
        } else if (type == 'e') {
            changeEmailMobile['lc'] = this.new_email.trim();
            changeEmailMobile['vcod'] = this.vcodEmail.trim();
        }
        changeEmailMobile['t'] = type;

        this._constantService.fetchDataApi(this._constantService.getVerifyCode4EmailMobileChangeServiceUrl(), changeEmailMobile).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.showPreloader = false;
                this.showText = true;
                this.countDisplay = "00:60";
                this.count = 60;
                this.countdown(this.count);
                if (responseData.COUNTRY)
                    this._constantService.setSessionJsonPair('country', responseData.COUNTRY);
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                if (type == "m") {
                    this.editphoneinput = 0;
                    this.verifyphone = 0;
                    //this._constantService.setMobile(this.new_mobileno);
                    this._constantService.setSessionJsonPair('mobile', this.new_mobileno);
                    this.mobverified = true;
                    //this._constantService.setMobileVer('true');
                    this._constantService.setSessionJsonPair('mobile_verify', 'true');
                } else if (type == 'e') {
                    this.editoption = 0;
                    this.verifyemailid = 0;
                    this._constantService.setEmail(this.new_email);
                    this.verified = true;
                    this._constantService.setEmailVer('true');
                }
            } else if (status == this._constantService.error_token) {
                this.showPreloader = false;
                this.showText = true;
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;
            } else {
                this.showPreloader = false;
                this.showText = true;
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });
    }



    getdata() {
        if (this.Settingtab == 1) {
            setTimeout(() => {
                var country = (<HTMLSelectElement>document.getElementById('country'));
                for (var j = 0; j < country.length; j++) {
                    if (country.options[j].value === this._constantService.getCountry()) {
                        country.options.selectedIndex = j;
                        //this.getState(country.options[j].value);
                        break;
                    }
                }
                if (this.state_id != "" && this.state_id != null) {
                    var state = (<HTMLSelectElement>document.getElementById('state'));
                    for (var j = 0; j < state.options.length; j++) {
                        if (state.options[j].value === this.state_id) {
                            state.options.selectedIndex = j;
                            break;
                        }
                    }
                }
                if (this.city_id != "" && this.city_id != null) {

                    var city = (<HTMLSelectElement>document.getElementById('city'));
                    for (var j = 0; j < city.options.length; j++) {
                        if (city.options[j].value === this.city_id) {
                            city.options.selectedIndex = j;
                            break;
                        }
                    }
                }
            }, 100)

        }
    }

    changeCity(event) {
        if (event.target.value == "default") {
            this.empty1();
        } else {
            this.getCity(event.target.value);
        }
    }

    changeState(event) {
        
        if (event.target.value == "default") {
            this.empty();
        } else {

            this.getState(event.target.value);
        }
    }

    KeyUpCalled(value) {
        var dateCountTracker;
        var currentDate = value;
        var currentLength = currentDate.length;
        var lastNumberEntered = currentDate[currentLength - 1];
        if (currentLength > 10) {
            var res = currentDate.substring(0, 10)
            this.inputValue = res;
            return this.inputValue
        }

        if (currentLength == 1 && currentDate > 3) {
            var transformedDate = "0" + currentDate + '/';
            dateCountTracker = 2;
            currentLength = transformedDate.length;
            this.inputValue = transformedDate;
            return this.inputValue;
        } else if (currentLength == 4 && currentDate[3] > 3) {
            var transformedDate = currentDate.substring(0, 3) + "0" + currentDate[3] + '/';
            dateCountTracker = 5;
            currentLength = transformedDate.length;
            this.inputValue = transformedDate;
            return this.inputValue;
        } else if (currentLength == 2 && (dateCountTracker != 2 && dateCountTracker != 3)) {
            dateCountTracker = currentLength;
            this.inputValue = currentDate + '/'
            return this.inputValue;
        } else if (currentLength == 5 && (dateCountTracker != 5 && dateCountTracker != 6)) {
            dateCountTracker = currentLength;
            // return currentDate + '/';
            this.inputValue = currentDate + '/';
            return this.inputValue;
        }
        dateCountTracker = currentLength;
        this.inputValue = currentDate;
    }
    showlable() {
        // this.tymlable.nativeElement.style.display = "block";
        // this.focustime.nativeElement.style.letterSpacing = "11px";
        this.timePlaceholder = "dd/mm/yyyy";

        if (innerWidth < 1301) {
            // this.focustime.nativeElement.style.letterSpacing = "7px";
            // this.focustime.nativeElement.style.fontSize = "14px";
        }

    }

    hidelable() {
        // if (this.focustime.nativeElement.value) {
        //     this.tymlable.nativeElement.style.display = "block";
        //     this.timePlaceholder = "Date of Birth";
        // }
        // else {
        //     this.tymlable.nativeElement.style.display = "none";
        //     this.timePlaceholder = "Date of Birth";
        //     this.focustime.nativeElement.style.letterSpacing = "0px";
        // }
        this.timePlaceholder = "Date of Birth";
    }

    sessionExpire(event) {
        if (event) {
            this.dataConf['type'] = 4;
            this.dataConf['msg'] = "Session Expire";
            this.dataConf['error_msg'] = "Session Expired";
            this.openConfirmation = true;
        }
    }

    timer_switch(index) {
        if (index == 1) {

            if (this.PUBLIC == true) {
                this.getsubscribeMail('N-001', 1);
            } else {
                this.getUnsubscribeMail('N-001', 1);
            }
            this.PUBLIC = !this.PUBLIC;
        }
        else if (index == 2) {

            if (this.SECURITY == true) {
                this.getsubscribeMail('N-002', 1);
            } else {
                this.getUnsubscribeMail('N-002', 1);
            }
            this.SECURITY = !this.SECURITY;

        }
        else if (index == 3) {

            if (this.RELATED_TO_USER == true) {
                this.getsubscribeMail('N-003', 1);
            } else {
                this.getUnsubscribeMail('N-003', 1);
            }
            this.RELATED_TO_USER = !this.RELATED_TO_USER;
        }
        else if (index == 4) {

            if (this.PAGES == true) {
                this.getsubscribeMail('N-004', 1);
            } else {
                this.getUnsubscribeMail('N-004', 1);
            }
            this.PAGES = !this.PAGES;
        }

        else if (index == 7) {
            if (this.BTN_7 == true) {
                this.getsubscribeMail('EM-007', 0);
            } else {
                this.getUnsubscribeMail('EM-007', 0);
            }
            this.BTN_7 = !this.BTN_7;
        }
        else if (index == 8) {

            if (this.BTN_8 == true) {
                this.getsubscribeMail(' EM-008', 0);
            } else {
                this.getUnsubscribeMail(' EM-008', 0);
            }
            this.BTN_8 = !this.BTN_8;
        }
        else if (index == 9) {

            if (this.BTN_9 == true) {
                this.getsubscribeMail('EM-009', 0);
            } else {
                this.getUnsubscribeMail('EM-009', 0);
            }
            this.BTN_9 = !this.BTN_9;
        }
        else if (index == 10) {

            if (this.BTN_10 == true) {
                this.getsubscribeMail('EM-010', 0);
            } else {
                this.getUnsubscribeMail('EM-010', 0);
            }
            this.BTN_10 = !this.BTN_10;
        }
        else if (index == 11) {

            if (this.BTN_11 == true) {
                this.getsubscribeMail('EM-011', 0);
            } else {
                this.getUnsubscribeMail('EM-011', 0);
            }
            this.BTN_11 = !this.BTN_11;
        }
        else if (index == 12) {

            if (this.BTN_12 == true) {
                this.getsubscribeMail('EM-012', 0);
            } else {
                this.getUnsubscribeMail('EM-012', 0);
            }
            this.BTN_12 = !this.BTN_12;
        }
        else if (index == 13) {

            if (this.BTN_13 == true) {
                this.getsubscribeMail('EM-013', 0);
            } else {
                this.getUnsubscribeMail('EM-013', 0);
            }
            this.BTN_13 = !this.BTN_13;
        }
        else if (index == 14) {
            if (this.BTN_14 == true) {
                this.getsubscribeMail('EM-016', 0);
            } else {
                this.getUnsubscribeMail('EM-016', 0);
            }
            this.BTN_14 = !this.BTN_14;
        }
        else if (index == 15) {

            if (this.BTN_15 == true) {
                this.getsubscribeMail('EM-023', 0);
            } else {
                this.getUnsubscribeMail('EM-023', 0);
            }
            this.BTN_15 = !this.BTN_15;
        }
        else if (index == 16) {

            if (this.BTN_16 == true) {
                this.getsubscribeMail('EM-024', 0);
            } else {
                this.getUnsubscribeMail('EM-024', 0);
            }
            this.BTN_16 = !this.BTN_16;
        }
        else if (index == 17) {

            if (this.BTN_17 == true) {
                this.getsubscribeMail('EM-026', 0);
            } else {
                this.getUnsubscribeMail('EM-026', 0);
            }
            this.BTN_17 = !this.BTN_17;
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
        } else {
            return false;
        }
    }

    mail_notification() {
        this.emailtoogle = !this.emailtoogle;
    }

    getsubscribeMail(Code, type) {
        var subscribeMail = {};
        subscribeMail['token'] = this._constantService.getSessionDataBYKey('token');
        subscribeMail['token_param'] = {};
        subscribeMail['token_param']['device_type'] = 'w';
        subscribeMail['token_param']['host'] = '';
        subscribeMail['code'] = Code;
        subscribeMail['type'] = type;

        this._constantService.fetchDataApi(this._constantService.getsubscribeMail(), subscribeMail).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                if (Code == 'N-001' && type == 1) {
                    this.PUBLIC = false;
                }
                if (Code == 'N-002' && type == 1) {
                    this.SECURITY = false;
                }
                if (Code == 'N-003' && type == 1) {
                    this.RELATED_TO_USER = false;
                }
                if (Code == 'N-004' && type == 1) {
                    this.PAGES = false;
                }
                if (Code == 'EM-007' && type == 0) {
                    this.BTN_7 = false;
                }
                if (Code == 'EM-008' && type == 0) {
                    this.BTN_8 = false;
                }
                if (Code == 'EM-009' && type == 0) {
                    this.BTN_9 = false;
                }
                if (Code == 'EM-010' && type == 0) {
                    this.BTN_10 = false;
                }
                if (Code == 'EM-011' && type == 0) {
                    this.BTN_11 = false;
                }
                if (Code == 'EM-012' && type == 0) {
                    this.BTN_12 = false;
                }
                if (Code == 'EM-013' && type == 0) {
                    this.BTN_13 = false;
                }
                if (Code == 'EM-016' && type == 0) {
                    this.BTN_14 = false;
                }
                if (Code == 'EM-023' && type == 0) {
                    this.BTN_15 = false;
                }
                if (Code == 'EM-024' && type == 0) {
                    this.BTN_16 = false;
                }
                if (Code == 'EM-026' && type == 0) {
                    this.BTN_17 = false;
                }

            }
        });
    }

    getUnsubscribeMail(Code, type) {
        var UnsubscribeMail = {};
        UnsubscribeMail['token'] = this._constantService.getSessionDataBYKey('token');
        UnsubscribeMail['token_param'] = {};
        UnsubscribeMail['token_param']['device_type'] = 'w';
        UnsubscribeMail['token_param']['host'] = '';
        UnsubscribeMail['code'] = Code;
        UnsubscribeMail['type'] = type;

        this._constantService.fetchDataApi(this._constantService.getUnsubscribeMail(), UnsubscribeMail).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                if (Code == 'N-001' && type == 1) {
                    this.PUBLIC = true;
                }
                if (Code == 'N-002' && type == 1) {
                    this.SECURITY = true;
                }
                if (Code == 'N-003' && type == 1) {
                    this.RELATED_TO_USER = true;
                }
                if (Code == 'N-004' && type == 1) {
                    this.PAGES = true;
                }
                if (Code == 'EM-007' && type == 0) {
                    this.BTN_7 = true;
                }
                if (Code == 'EM-008' && type == 0) {
                    this.BTN_8 = true;
                }
                if (Code == 'EM-009' && type == 0) {
                    this.BTN_9 = true;
                }
                if (Code == 'EM-010' && type == 0) {
                    this.BTN_10 = true;
                }
                if (Code == 'EM-011' && type == 0) {
                    this.BTN_11 = true;
                }
                if (Code == 'EM-012' && type == 0) {
                    this.BTN_12 = true;
                }
                if (Code == 'EM-013' && type == 0) {
                    this.BTN_13 = true;
                }
                if (Code == 'EM-016' && type == 0) {
                    this.BTN_14 = true;
                }
                if (Code == 'EM-023' && type == 0) {
                    this.BTN_15 = true;
                }
                if (Code == 'EM-024' && type == 0) {
                    this.BTN_16 = true;
                }
                if (Code == 'EM-026' && type == 0) {
                    this.BTN_17 = true;
                }


            }
        });

    }

    getUsrUnscrCode() {
        var UsrUnscrCode = {};
        UsrUnscrCode['token'] = this._constantService.getSessionDataBYKey('token');
        UsrUnscrCode['token_param'] = {};
        UsrUnscrCode['token_param']['device_type'] = 'w';
        UsrUnscrCode['token_param']['host'] = '';

        this._constantService.fetchDataApi(this._constantService.getUsrUnscrCode(), UsrUnscrCode).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                var UnScrbCode = responseData.UNSUBSCRIBE_CODE;
                var len = UnScrbCode.length;
                for (var i = 0; i < len; i++) {
                    if ('N-001' == UnScrbCode[i]) {
                        this.PUBLIC = true;
                    }
                    if ('N-002' == UnScrbCode[i]) {
                        this.SECURITY = true;
                    }
                    if ('N-003' == UnScrbCode[i]) {
                        this.RELATED_TO_USER = true;
                    }
                    if ('N-004' == UnScrbCode[i]) {
                        this.PAGES = true;
                    }
                    if ('EM-007' == UnScrbCode[i]) {
                        this.BTN_7 = true;
                    }
                    if ('EM-008' == UnScrbCode[i]) {
                        this.BTN_8 = true;
                    }
                    if ('EM-009' == UnScrbCode[i]) {
                        this.BTN_9 = true;
                    }
                    if ('EM-010' == UnScrbCode[i]) {
                        this.BTN_10 = true;
                    }
                    if ('EM-011' == UnScrbCode[i]) {
                        this.BTN_11 = true;
                    }
                    if ('EM-012' == UnScrbCode[i]) {
                        this.BTN_12 = true;
                    }
                    if ('EM-013' == UnScrbCode[i]) {
                        this.BTN_13 = true;
                    }
                    if ('EM-016' == UnScrbCode[i]) {
                        this.BTN_14 = true;
                    }
                    if ('EM-023' == UnScrbCode[i]) {
                        this.BTN_15 = true;
                    }
                    if ('EM-024' == UnScrbCode[i]) {
                        this.BTN_16 = true;
                    }
                    if ('EM-026' == UnScrbCode[i]) {
                        this.BTN_17 = true;
                    }
                }

            }
        });

    }
    getCountryName() {

        this._constantService.fetchDataApiWithoutBody(this._constantService.getCountryv1ServiceUrl()).subscribe(data => {
            const responseData: any = data;
            this.countryList = responseData.COUNTRY_LIST;
            for (var i = 0; i < this.countryList.length; i++) {
                if (this.countryList[i].COUNTRY_ID == this.countryId) {
                    this.countryCode = this.countryList[i].COUNTRY_CODE;
                    break;
                }

            }
        }, error => {
            const responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });
    }
    setMobileNumberAndCountryCode(emittedObject) {
        this.new_mobileno = emittedObject.mobileNumber;
        this.countryId = emittedObject.countryId;
        this.countryCode = emittedObject.countryCode;
    }
    goBackToUrl() {
        window.history.back();

    }
}
