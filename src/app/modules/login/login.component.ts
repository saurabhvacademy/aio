import {
  Component,
  OnInit,
  AfterViewInit,
  // ViewChild,
  // ElementRef,
  // ComponentFactoryResolver,
  HostListener,
  ChangeDetectorRef,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { EncryptionService } from "./../../services/encryption.service";
import { ConstantService } from "./../../services/constant.service";
// import { PostdataService } from "./../../services/postdata.service";
import { CommonfunctionsService } from "./../../services/commonfunctions.service";
import { Login } from "./login";
import { Register } from "./register";
declare const FB: any;
declare const window: any;
declare var gapi: any;
import { CookieService } from "ngx-cookie-service";
import { GoogleAnalyticsService } from "../../services/google-analytics.service";
import { PostdataService } from "src/app/services/postdata.service";
import { CommonEmitterService } from "src/app/services/common-emitter.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  //    host: {
  //        '(document:click)': 'handleClick($event)',
  //    },
  styleUrls: [
    "./login.component.scss",
    "./newlogin.component.scss",
    "./newlogin.css",
  ],
  providers: [
    EncryptionService,
    ConstantService,
    CommonfunctionsService,
  ],
})
export class LoginComponent implements OnInit, AfterViewInit {
  hideCountryList = true;
  countryIsdCode = '91';
  showCountryCodeAndFlag = false;
  filteredCountryList: any = [];
  countryCode = 'in';
  errFieldCount = 0;
  showPreloaderS: boolean = false;
  public interests = [];
  isPassUpdated: boolean = false;
  aboveThirteen: boolean;
  current_year: number;
  errorbox: boolean = false;
  showText: boolean = true;
  logintab = 1;
  error = "";
  loginError = "";
  t: string;
  showPreloader: boolean = false;
  dataConf = {};
  showsignupform: boolean = false;
  model = new Login("", "", "", "", "");
  modelRegister = new Register("", 0, "", "", "", "", "", "0");
  rg_fn_class: number;
  rg_ln_class: number;
  rg_em_class: number;
  rg_ph_class: number;
  rg_pd_class: number;
  rg_dob_class: number;
  rg_gd_class: number;
  rg_ci_class: number;
  lg_em_class: number;
  lg_pd_class: number;
  activeInput: number = 0;
  ryt_logintab: number = 1;
  showErrorBox = false;
  showErrorBoxL = false;
  onmobFocus: number = 0;
  senderName = "";
  config: any = {
    minScrollbarLength: 200,
    // scrollYMarginOffset: 100,
  };
  appLink: boolean = false;
  showLoginError: boolean = false;
  show_reg_form_tab: boolean = true;
  show_post_tab: boolean = true;
  closeleftpopup: boolean = false;
  showlogin: boolean = false;
  deviceType: number = 0;
  activeMenuCond: boolean = false;
  showSerachResponsiveView: boolean = false;

  isResponsive: boolean;
  mobileIconShow: boolean = true;
  openHideIntersePopUp: boolean;
  interestAlreadyGet: boolean;
  accordianTab = 0;
  forgotPasswordType: string = '';
  isMobileView: boolean;
  searchCountryString = '';
  countryList: any;
  @ViewChild("r_ln") regLastName: ElementRef;
  constructor(
    private googleAnalyticsService: GoogleAnalyticsService,
    private _encryptionService: EncryptionService,
    private _postData: PostdataService,
    private activatedRoute: ActivatedRoute,
    private _cookie: CookieService,
    // private componentFactoryResolver: ComponentFactoryResolver,
    public _constantService: ConstantService,
    public _commonfunctionService: CommonfunctionsService,
    public changDetector: ChangeDetectorRef,
    private _router: Router,
    private commonEmitterService: CommonEmitterService

  ) {
    if (this._constantService.getSessionDataBYKey('token') &&
      this._constantService.getSessionDataBYKey('token') != '') {
      this._router.navigate(['home']);
    }
  }
  @HostListener("window:resize", ["$event"])
  onResize() {
    if (window.innerWidth <= 900) {
      this.isMobileView = true;
    } else {
      this.isMobileView = false;
    }
    if (window.innerWidth <= 900 && window.innerWidth >= 768) {
      this.show_reg_form_tab = false;
      this.show_post_tab = true;
      this.isResponsive = false;
    } else if (window.innerWidth < 5000 && window.innerWidth > 900) {
      this.show_reg_form_tab = true;
      this.show_post_tab = true;
      this.isResponsive = false;
    }
    if (window.innerWidth < 768) {
      this.isResponsive = false;
      if (document.getElementById("loginRt"))
        var rightwidth = document.getElementById("loginRt").offsetWidth;
      // document.getElementById("logright").style.width = rightwidth + "px";
    }
    if (window.innerHeight > 768) {
      var bgHeight = window.innerHeight;
      var bgwidth = window.innerWidth;
      document.getElementById("bgSec").style.height = bgHeight - 648 + "px";
    }
    if (window.innerWidth >= 1200) {
      var innerWindWidth = window.innerWidth - 18;
      document.getElementById("windiv").style.width = innerWindWidth + "px";
    } else {
      document.getElementById("windiv").style.width = "100%";
    }
  }
  private checkScreenWidth() {
    var winwidth = window.innerWidth - 18;
    if (window.innerWidth >= 1200) {
      document.getElementById("windiv").style.width = winwidth + "px";
    } else {
      document.getElementById("windiv").style.width = "100%";
    }
    if (window.innerWidth < 768) {
      this.isResponsive = true;
      if (document.getElementById("loginRt"))
        var rightwidth = document.getElementById("loginRt").offsetWidth;
    }
    if (window.innerHeight > 768) {
      var bgHeight = window.innerHeight;
      var bgwidth = window.innerWidth;
      document.getElementById("bgSec").style.height = bgHeight - 648 + "px";
      document.getElementById("bgSec").style.height = bgHeight - 648 + "px";
    }
  }




  closeNav() {
    this.closeleftpopup = !this.closeleftpopup;
    this.showlogin = !this.showlogin;

  }
  showResponsiveSearch() {
    this.getInterest();
    this.activeMenuCond = !this.activeMenuCond;
    this.showSerachResponsiveView = !this.showSerachResponsiveView;
  }
  closeNav1() {
    this.showlogin = !this.showlogin;
    this.closeleftpopup = !this.closeleftpopup;
    this.ngOnInit();
  }
  interestAccordian(index) {
    this.accordianTab = index;
  }



  ngOnInit() {
    this.getCountryName();

    localStorage.setItem('rfc', 'login page');
    this.modelRegister.em = "";
    if (/Android/i.test(navigator.userAgent)) {
      console.log("Android");
      this.deviceType = 1;
    } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      console.log("IOS");
      this.deviceType = 2;
    } else {
      this.deviceType = -1;
    }

    document.body.classList.add("body-overflow-y");
    this.checkScreenWidth();
    let body1 = document.getElementsByTagName("body")[0];
    body1.classList.remove("stopClicking");


    this.t = this._constantService.getSessionDataBYKey("token");
    if (
      this.t != "" &&
      this.t != "undefined" &&
      this.t != undefined &&
      this.t != null
    ) {
    } else {
    }

    this.error = "";
    this.modelRegister.conid = "1";

    this.activatedRoute.params.subscribe((params: Params) => {
      if (
        params["id"] != "" &&
        params["id"] != undefined &&
        params["id"] != null
      ) {
        this.senderName = params["id"];
      }
    });
    var date = new Date();
    this.current_year = date.getFullYear();
    var fbId = this._constantService.facebookAppId;
    window.fbAsyncInit = function () {
      FB.init({
        appId: fbId,
        xfbml: true,
        version: "v3.2",
      });
    };
    var my_awesome_script = document.createElement("script");

    my_awesome_script.setAttribute(
      "src",
      "https://connect.facebook.net/en_US/sdk.js"
    );

    document.head.appendChild(my_awesome_script);


    var pattern = RegExp("user=.[^;]*");
    var matched = document.cookie.match(pattern);
    if (matched) {
      var cookie = matched[0].split("=");
      this.model.lc = cookie[1].split(":")[0];
      this.model.pd = cookie[1].split(":")[1];
    }

    document.title =
      "Study24x7 - A best place for collaborative learning & sharing";

  }

  filterCountry(name) {
    this.filteredCountryList = [];
    for (var i = 0; i < this.countryList.length; i++) {
      if (this.countryList[i].COUNTRY_NAME.toLowerCase().includes(name)) {
        this.filteredCountryList.push(this.countryList[i]);
      }
    }

  }

  ngAfterViewInit() {
    this.onResize();
  }
  ngAfterViewChecked() {
    this.checkScreenWidth();
  }



  loginclick(index) {
    this.changDetector.detectChanges();
    this.showErrorBoxL = false;
    this.showErrorBox = false;
    this.rg_fn_class = 0;
    this.rg_ln_class = 0;
    this.rg_ph_class = 0;
    this.rg_pd_class = 0;
    this.rg_dob_class = 0;
    this.rg_gd_class = 0;
    this.rg_ci_class = 0;
    this.lg_pd_class = 0;
    this.rg_em_class = 0;
    this.lg_em_class = 0;
    this.logintab = index;
    this.isPassUpdated = false;

    this.ryt_logintab = index;
    if (index == 1) {
      this.showsignupform = true;
    }

  }

  ryt_loginclick(index) {

    this.isPassUpdated = false;
    this.showErrorBoxL = false;
    this.showErrorBox = false;
    this.ryt_logintab = index;
    this.rg_fn_class = 0;
    this.rg_ln_class = 0;
    this.rg_ph_class = 0;
    this.rg_pd_class = 0;
    this.rg_dob_class = 0;
    this.rg_gd_class = 0;
    this.rg_ci_class = 0;
    this.lg_pd_class = 0;
    this.rg_em_class = 0;
    this.lg_em_class = 0;
    if (index != 1) {
      (this.model.lc = ""),
        (this.model.pd = ""),
        (this.model.t = ""),
        (this.model.otp = "");
    }
    if (index != 2) {
      (this.modelRegister.em = ""),
        (this.modelRegister.gd = 0),
        (this.modelRegister.fn = ""),
        (this.modelRegister.ln = ""),
        (this.modelRegister.dob = ""),
        (this.inputValue = ""),
        (this.modelRegister.mn = ""),
        (this.modelRegister.pd = ""),
        (this.modelRegister.conid = "");
    }
  }



  login(event) {
    if (event.keyCode == 13) {
      this.loginSubmit();
    }
  }

  showSignup() {
    this.showsignupform = true;

  }

  loginSubmit() {
    this.googleAnalyticsService.eventEmitter(
      "web_Sign Up Page Events:",
      "web_Login",
      "web_Login",
      "web_Sign Up Page Events",
      0
    );

    this.showPreloader = true;
    this.showText = false;
    this.lg_em_class = 0;
    this.lg_pd_class = 0;
    this.model.lc = this.model.lc.toLowerCase().trim();
    this.model.pd = this.model.pd.trim();

    if (this.model.lc.length == 0) {
      this.lg_em_class = 1;
      this.showPreloader = false;
      this.showText = true;
      this.showSignup();
      this.logintab = 2;
      this.ryt_logintab = 1;
      this.showErrorBoxL = true;
      this.showLoginError = true;
      this.loginError = "Please enter your email address or mobile number.";
      setTimeout(() => {
        document.getElementById("l_e").focus();
      }, 100);
      return false;
    } else {
      if (this.isEmail(this.model.lc)) {
        this.model.t = "e";
        this.loginError = "Please enter valid email address or mobile number.";
      } else if (this.isMobile(this.model.lc)) {
        this.model.t = "m";
        this.loginError = "Please enter valid email address or mobile number.";
      } else if (this.isMobileUni(this.model.lc)) {
        this.model.t = "m";
        this.loginError = "Please enter valid email address or mobile number.";
      } else {
        this.lg_em_class = 1;
        this.showPreloader = false;
        this.showText = true;
        this.showSignup();
        this.logintab = 2;
        this.ryt_logintab = 1;
        this.showErrorBoxL = true;
        this.showLoginError = true;
        this.loginError = "Please enter valid email address or mobile number.";
        return false;
      }
    }
    if (
      this.model.pd == null ||
      this.model.pd == "" ||
      this.model.pd.length < 6
    ) {
      this.showPreloader = false;
      this.showText = true;
      this.showSignup();
      this.logintab = 2;
      this.ryt_logintab = 1;
      this.showErrorBoxL = true;
      this.showLoginError = true;

      if (this.model.pd == "") {
        this.loginError = "Please enter your password.";
      } else {
        this.loginError =
          "Please enter valid credentials. Sign up in case of new user.";
      }

      this.lg_pd_class = 1;
      setTimeout(() => {
        document.getElementById("l_p").focus();
      }, 100);
      return false;
    }

    this.showLoginError = false;

    if (this._constantService.getSessionDataBYKey("lc_data") == null) {
      this.showPreloader = false;
      this.showText = true;
      this._constantService.setSessionJsonPair("lc_data", this.model.lc);
    } else {
      if (
        this._constantService.getSessionDataBYKey("lc_data") != this.model.lc
      ) {
        this._constantService.setSessionJsonPair("lc_data", this.model.lc);
        this._constantService.setLoginCountReset();
      }
    }

    var checkbox = <HTMLInputElement>document.getElementById("adoption4");
    if (checkbox != null) {
      if (checkbox.checked) {
        var date = new Date();
        date.setTime(date.getTime() + 14 * 24 * 60 * 60 * 1000);
        var expire = date.toUTCString();
        document.cookie =
          "user=" + this.model.lc + ":" + this.model.pd + ";expire=" + expire;
      }
    }

    this.showPreloader = true;
    this.showText = false;
    var login_d = {}
    login_d["lc"] = this.model.lc;
    login_d["pd"] = this.model.pd.trim();
    login_d["t"] = this.model.t;
    login_d["token_param"] = {};
    login_d["token_param"]["device_type"] = "w";
    login_d["token_param"]["host"] = "";
    this._constantService
      .fetchDataApi(this._constantService.getLoginServiceUrl(), login_d)
      .subscribe(
        (data) => {

          var responseData: any = data;
          var status = responseData.STATUS;
          if (status == this._constantService.success_msg) {
            localStorage.setItem('userType', responseData.IS_TEACHER);
            this._constantService.getInterest();
            this.googleAnalyticsService.eventEmitter(
              "web_Sign Up Page Events:",
              "web_Login",
              "web_Login",
              "web_Sign Up Page Events",
              0
            );
            var expiredDate = new Date();
            expiredDate.setDate(expiredDate.getDate() + 90);
            this._cookie.set(
              "study247",
              this._encryptionService.encrypt(responseData.TOKEN),
              expiredDate,
              "/"
            );

            this._constantService.setSessionJsonPair(
              "u_id",
              responseData.USER_ID
            );
            this._constantService.setSessionJsonPair(
              "token",
              responseData.TOKEN
            );
            this._constantService.setSessionJsonPair(
              "user_interest",
              responseData.USER_INTEREST
            );
            this._constantService.setSessionJsonPair("em", responseData.EMAIL);
            this._constantService.setSessionJsonPair("mn", responseData.MOBILE);       
            this._constantService.setSessionJsonPair(
              "country",
              responseData.COUNTRY
            );
            this._constantService.setSessionJsonPair(
              "MOBILE_CNTRY_ID",
              responseData.MOBILE_CNTRY_ID
            );
            this._constantService.setSessionJsonPair(
              "followedId",
              responseData.FOLLOWEDID
            );
            this._constantService.setSessionJsonPair(
              "f_id",
              responseData.FRIENDSID
            );
            this._constantService.setSessionJsonPair(
              "u_id",
              responseData.USER_ID
            );
            this._constantService.setSessionJsonPair(
              "token",
              responseData.TOKEN
            );
            this._constantService.setUserInterest(responseData.USER_INTEREST);
            this._constantService.setEmail(responseData.EMAIL);
            this._constantService.setSessionJsonPair(
              "mobile",
              responseData.MOBILE
            );
            this._constantService.setCountry(responseData.COUNTRY);
            this._constantService.setFollowedId(responseData.FOLLOWEDID);
            this._constantService.setFriendsId(responseData.FRIENDSID);
            this._commonfunctionService.latestPostInterest("");
            if (responseData.ISMOBILEVERIFIED == "0") {
              this._constantService.setSessionJsonPair("v_m", "false");
              this._constantService.setSessionJsonPair(
                "mobile_verify",
                "false"
              );
            } else {
              this._constantService.setSessionJsonPair("v_m", "true");

              this._constantService.setSessionJsonPair("mobile_verify", "true");
            }
            if (responseData.ISEMAILVERIFIED == "0") {
              this._constantService.setSessionJsonPair("v_e", "false");

              this._constantService.setEmailVer("false");
            } else {
              this._constantService.setSessionJsonPair("v_e", "true");

              this._constantService.setEmailVer("true");
            }
            document.body.classList.remove("body-overflow");
            this.getUserDetail();
            this.resetInputFields();
            this.commonEmitterService.loginSuccesful(true);
          } else if (status == "error" && responseData.RET_STATUS == 2) {
            this.showLoginError = true;

            if (responseData.TYPE == "e") {
              this.loginError = responseData.ERROR_MSG;
              this.showPreloader = false;
              this.showText = true;
            } else if (responseData.TYPE == "m") {
              this.loginError = responseData.ERROR_MSG;
              this.showPreloader = false;
              this.showText = true;
            } else if (responseData.TYPE == "e,m") {
              this.loginError = responseData.ERROR_MSG;
              this.showPreloader = false;
              this.showText = true;
            }
          } else if (status == "error_token") {
            this.showPreloader = false;
            this.showText = true;
            this._constantService.deleteToken();
            this._constantService.setSessionJsonPair("token", "");
            document.body.classList.remove("body-overflow");
            //                this._router.navigate(['']);
            window.location.reload();
          } else {
            if (responseData.USER_EXIST == "1") {
              this._constantService.setLoginCountPlus();
            }
            this.lg_em_class = 1;
            this.showPreloader = false;
            this.showText = true;
            this.showSignup();
            this.logintab = 2;
            this.ryt_logintab = 1;
            this.showErrorBoxL = true;
            this.showLoginError = true;
            this.loginError = responseData.ERROR_MSG;
            if (Number(this._constantService.getLoginCount()) >= 3) {

              this.opentTooManyLoginAttempts();
            }
          }
        },
        (error) => {
          var responseData = error;
          if (responseData.status == 500) {
            document.body.classList.remove("body-overflow");
            this._router.navigate(["500"]);
          }
        }
      );
  }

  closeForgotPassword() {
    this.forgotPasswordType = "";

  };
  openForgotPassword() {
    this.forgotPasswordType = 'forgotPassword';
    this.model.pd = "";

  };

  opentTooManyLoginAttempts() {
    this.forgotPasswordType = 'tooManyLoginAttempts';
    this.model.pd = "";

  }
  closeTooManyLoginAttempts() {
    this.forgotPasswordType = "";
  }


  mobFocus(index) {
    this.onmobFocus = index;
  }

  mobFocusOut() {
    this.onmobFocus = 0;
  }

  passStatus(event) {
    if (this.modelRegister.pd != "") {
      if (this.modelRegister.pd.length <= 6) {
        document.getElementById("passClass").className = "";
        document.getElementById("passClass").classList.add("weak");
      }
      if (
        this.modelRegister.pd.length > 6 &&
        this.modelRegister.pd.length <= 8
      ) {
        document.getElementById("passClass").className = "";
        document.getElementById("passClass").classList.add("normal");
      }
      if (
        this.modelRegister.pd.length > 8 &&
        this.modelRegister.pd.length <= 10
      ) {
        document.getElementById("passClass").className = "";
        document.getElementById("passClass").classList.add("strong");
      }
      if (this.modelRegister.pd.length > 10) {
        document.getElementById("passClass").className = "";
        document.getElementById("passClass").classList.add("verystrong");
      }
    } else {
      document.getElementById("passClass").className = "";
      document.getElementById("passClass").classList.add("defoult");
    }
  }

  registerSubmit() {
    this.errFieldCount = 0;
    this.showPreloaderS = true;
    this.showText = false;
    this.rg_fn_class = 0;
    this.rg_ln_class = 0;
    this.rg_em_class = 0;
    this.rg_ph_class = 0;
    this.rg_pd_class = 0;
    this.rg_dob_class = 0;
    this.rg_gd_class = 0;
    this.rg_ci_class = 0;
    this.modelRegister.em = this.modelRegister.em.toLowerCase().trim();
    this.modelRegister.mn = this.modelRegister.mn.trim();
    this.modelRegister.ln = this.modelRegister.ln.trim();
    this.modelRegister.fn = this.modelRegister.fn.trim();
    this.modelRegister.pd = this.modelRegister.pd;
    this.modelRegister.dob = this.modelRegister.dob.trim();

    if (this.modelRegister.fn.length == 0) {
      this.rg_fn_class = 1;
      this.showPreloaderS = false;
      this.showText = true;
      this.errorbox = true;
      this.showErrorBox = true;
      this.errFieldCount = 1;
      document.getElementById("r_fn").focus();
      this.error = "Enter your first name.";
      return false;
    } else if (!this.isFirstName()) {
      this.rg_fn_class = 1;
      this.showPreloaderS = false;
      this.showText = true;
      this.errorbox = true;
      this.showErrorBox = true;
      this.errFieldCount = 1;
      document.getElementById("r_fn").focus();
      this.error = "Enter valid first name.";
      return false;
    } else {
      this.errFieldCount = 0;
    }

    if (this.modelRegister.ln.length == 0) {
      this.rg_ln_class = 1;
      this.showPreloaderS = false;
      this.showText = true;
      this.errorbox = true;
      this.showErrorBox = true;
      this.errFieldCount = 2;
      // document.getElementById("r_ln").focus();
      this.regLastName.nativeElement.focus();
      this.error = "Enter your last name.";
      return false;
    } else if (!this.isLastName(this.modelRegister.ln)) {
      this.rg_ln_class = 1;
      this.showPreloaderS = false;
      this.showText = true;
      this.errorbox = true;
      this.showErrorBox = true;
      this.errFieldCount = 2;
      document.getElementById("r_ln").focus();
      this.error = "Enter valid last name.";
      return false;
    } else {
      this.errFieldCount = 0;
    }

    if (this.modelRegister.em.length == 0) {
      this.rg_em_class = 1;
      this.errFieldCount = 3;
      this.showPreloaderS = false;
      this.showText = true;
      this.errorbox = true;
      this.showErrorBox = true;
      document.getElementById("r_e").focus();
      this.error = "Please enter your email address.";
      return false;
    } else if (!this.isEmail(this.modelRegister.em)) {
      this.rg_em_class = 1;
      this.errFieldCount = 3;
      this.showPreloaderS = false;
      this.showText = true;
      this.errorbox = true;
      this.showErrorBox = true;
      document.getElementById("r_e").focus();
      this.error = "Please enter a valid email address.";
      return false;
    } else {
      this.errFieldCount = 0;
    }

    if (this.modelRegister.mn.length == 0) {
      this.rg_ph_class = 1;
      this.showPreloaderS = false;
      this.showText = true;
      this.errorbox = true;
      this.showErrorBox = true;
      this.errFieldCount = 4;
      document.getElementById("r_ph").focus();
      this.error = "Please enter mobile number.";
      return false;
    } else if (this.modelRegister.conid === "1") {
      if (!this.isMobileUni(this.modelRegister.mn)) {
        this.rg_ph_class = 1;
        this.showPreloaderS = false;
        this.showText = true;
        this.errorbox = true;
        this.showErrorBox = true;
        this.errFieldCount = 4;
        document.getElementById("r_ph").focus();
        this.error = "Please enter valid mobile number.";
        return false;
      }
    } else if (!this.isMobileUni(this.modelRegister.mn)) {
      this.rg_ph_class = 1;
      this.showPreloaderS = false;
      this.showText = true;
      this.errorbox = true;
      this.showErrorBox = true;
      this.errFieldCount = 4;
      document.getElementById("r_ph").focus();
      this.error = "Please enter valid mobile number.";
      return false;
    } else {
      this.errFieldCount = 0;
    }

    if (
      !this.isValidDate(this.modelRegister.dob) &&
      this.modelRegister.dob != ""
    ) {
      if (this.modelRegister.dob.length == 0) {
        this.rg_dob_class = 1;
        this.showPreloaderS = false;
        this.showText = true;
        this.errorbox = true;
        this.showErrorBox = true;
        this.errFieldCount = 5;
        document.getElementById("r_dob").focus();
        this.error = "Enter your date of birth.";
        return false;
      } else {
        if (this.aboveThirteen == false) {
          this.rg_dob_class = 1;
          this.showPreloaderS = false;
          this.showText = true;
          this.errorbox = true;
          this.showErrorBox = true;
          this.errFieldCount = 5;
          document.getElementById("r_dob").focus();
          this.error = "Minimum age for sign up should be 13 !";
          return false;
        } else {
          this.rg_dob_class = 1;
          this.showPreloaderS = false;
          this.showText = true;
          this.errorbox = true;
          this.showErrorBox = true;
          document.getElementById("r_dob").focus();
          this.errFieldCount = 5;
          this.error = "Please enter valid date of birth (dd/mm/yyyy).";
          return false;
        }
      }
    } else {
      this.errFieldCount = 0;
    }



    if (!this.isPassword(this.modelRegister.pd)) {
      if (this.modelRegister.pd.length == 0) {
        this.rg_pd_class = 1;
        this.showPreloaderS = false;
        this.showText = true;
        this.errorbox = true;
        this.showErrorBox = true;
        this.errFieldCount = 6;
        document.getElementById("r_p").focus();
        this.error =
          "Use 6-20 characters with a combination of numbers, letters and !@#$%^&*()_=+";
        return false;
      } else {
        this.rg_pd_class = 1;
        this.showPreloaderS = false;
        this.showText = true;
        this.errorbox = true;
        this.showErrorBox = true;
        this.errFieldCount = 6;
        this.error =
          "Passwords must contain at least 6 characters, including uppercase, lowercase letters ,numbers and special character ";
        document.getElementById("r_p").focus();
        return false;
      }
    } else {
      this.errFieldCount = 0;
    }
    this._constantService.setEmail(this.modelRegister.em.toLowerCase().trim());
    this._constantService.setSessionJsonPair(
      "em",
      this.modelRegister.em.toLowerCase().trim()
    );
    this._constantService.setSessionJsonPair(
      "mobile",
      this.modelRegister.mn.trim()
    );
    this._constantService.setSessionJsonPair(
      "MOBILE_CNTRY_ID",
      this.modelRegister.conid
    );
    this._constantService.setCountry(this.modelRegister.conid);
    var login_d = {};
    login_d["em"] = this.modelRegister.em.trim();
    login_d["mn"] = this.modelRegister.mn.trim();
    login_d["fn"] = this.modelRegister.fn.trim();
    login_d["ln"] = this.modelRegister.ln.trim();
    login_d["conid"] = this.modelRegister.conid;

    login_d["dob"] = this.modelRegister.dob
      ? this.changeDateFormat(this.modelRegister.dob).trim()
      : "";
    login_d["gd"] = "";
    login_d["pd"] = this.modelRegister.pd;
    login_d["token_param"] = {};
    login_d["token_param"]["device_type"] = "w";
    login_d["token_param"]["host"] = "";
    login_d["rfc"] = this._postData.encodeURIPostData(localStorage.getItem('rfc'));

    if (this.senderName != "" && this.senderName != undefined) {
      login_d["refrl_usr_nm"] = this.senderName;
    }
    let localCookie = this._cookie.get("publicClickedURL");
    if (localCookie) {
      let urlArr = localCookie.split("/");
      if (urlArr[urlArr.length - 2] == "page") {
        login_d["intrst_ref"] = urlArr[urlArr.length - 1];
        login_d["type"] = "pg";
      } else if (urlArr[urlArr.length - 2] == "course") {
        let urlCourse = urlArr[urlArr.length - 1].split("-");
        let courseId = urlCourse[urlCourse.length - 1];
        login_d["intrst_ref"] = courseId;
        login_d["type"] = "c";
      }
    }
    this._constantService
      .fetchDataApi(this._constantService.getRegisterServiceUrl(), login_d)
      .subscribe(
        (data) => {

          var responseData: any = data;
          var status = responseData.STATUS;

          if (status == "success") {

            this.googleAnalyticsService.eventEmitter(
              "web_Clicked",
              "web_Register",
              "web_Register Now",
              "web_Clicked",
              0
            );
            var expiredDate = new Date();
            expiredDate.setDate(expiredDate.getDate() + 90);
            this._cookie.set(
              "study247",
              this._encryptionService.encrypt(responseData.TOKEN),
              expiredDate,
              "/"
            );

            this._constantService.setSessionJsonPair("country", this.modelRegister.conid);
            this.showPreloader = false;
            this.showText = true;
            this._constantService.setUserInterest("0");
            this._constantService.setSessionJsonPair(
              "token",
              responseData.TOKEN
            );
            this._constantService.setSessionJsonPair(
              "isInterestSet",
              responseData.INTEREST_UPD_STATUS
            );
            this._constantService.setEmailVer("false");
            this._constantService.setSessionJsonPair("v_e", "false");
            this._constantService.setSessionJsonPair("v_m", "false");
            setTimeout(() => {
              this._router.navigate(["verification"]);
            }, 200);
            this.resetInputFields();

          } else if (status == "error_token") {
            this.showPreloader = false;
            this.showText = true;
            this._constantService.setSessionJsonPair("token", "");
            this._constantService.clearUserInfo();
            window.location.reload();
          } else {
            this.showPreloaderS = false;
            this.showText = true;
            this.error = responseData.ERROR_MSG;
            this.showErrorBox = true;
            this.changDetector.detectChanges();
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


  isEmail(search: string): boolean {
    var regexp = new RegExp(
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
    );
    return regexp.test(search);
  }

  isMobile(search: string): boolean {
    var regexp = new RegExp(/^[0-9]{10}$/);
    return regexp.test(search);
  }

  isMobileUni(search: string): boolean {
    var regexp = new RegExp(/^[0-9]{5,13}$/);
    return regexp.test(search);
  }

  isPassword(search: string): boolean {
    var regexp = new RegExp(/^[A-Za-z0-9!@#$%^&*()_=+]{6,20}$/);
    return regexp.test(search);
  }

  isFirstName(): boolean {
    var regexp = new RegExp(/^[a-zA-Z]+$/);
    return regexp.test(this.modelRegister.fn);
  }

  isLastName(search: string): boolean {
    var regexp = new RegExp(/^[a-zA-Z]+$/);
    return regexp.test(search);
  }

  isDob(search: string): boolean {
    return true;
  }

  isCountry(search: string): boolean {
    var regexp = new RegExp(/^\d+$/);
    return regexp.test(search);
  }

  isGender(search: number): boolean {
    if (search == 1 || search == 2) {
      return true;
    } else {

    }
  }

  isValidDate(date: string): boolean {
    this.aboveThirteen = true;
    var matches = /^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/.exec(date);
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
    if (day == 0 || year < 1940 || year > this.current_year - 13) {
      if (year < this.current_year - 13) {
        this.aboveThirteen = true;
      } else if (year > this.current_year - 13) {
        this.aboveThirteen = false;
      }
      return false;
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

  changeDateFormat(date: string): string {
    var matches = /^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/.exec(date);

    let composedDate: string;
    let d: number;
    let m: number;
    let y: number;

    d = +matches[1];
    m = +matches[2];
    y = +matches[3];

    return y + "-" + m + "-" + d;
  }

  onPaste(event) {
    event.preventDefault();
    event.stopPropagation();
  }


  reverse: number = 0;
  replacetext: string;


  inputValue;
  KeyUpCalled(value) {
    var dateCountTracker;
    var currentDate = value;
    var currentLength = currentDate.length;
    var lastNumberEntered = currentDate[currentLength - 1];
    if (currentLength > 10) {
      var res = currentDate.substring(0, 10);
      this.inputValue = res;
      this.modelRegister.dob = this.inputValue;
      return this.inputValue;
    }

    if (currentLength == 1 && currentDate > 3) {
      var transformedDate = "0" + currentDate + "/";
      dateCountTracker = 2;
      currentLength = transformedDate.length;
      this.inputValue = transformedDate;
      this.modelRegister.dob = this.inputValue;

      return this.inputValue;
    } else if (currentLength == 4 && currentDate[3] > 3) {
      var transformedDate =
        currentDate.substring(0, 3) + "0" + currentDate[3] + "/";
      dateCountTracker = 5;
      currentLength = transformedDate.length;
      this.inputValue = transformedDate;
      this.modelRegister.dob = this.inputValue;

      return this.inputValue;
    } else if (
      currentLength == 2 &&
      dateCountTracker != 2 &&
      dateCountTracker != 3
    ) {
      dateCountTracker = currentLength;
      this.inputValue = currentDate + "/";
      this.modelRegister.dob = this.inputValue;

      return this.inputValue;
    } else if (
      currentLength == 5 &&
      dateCountTracker != 5 &&
      dateCountTracker != 6
    ) {
      dateCountTracker = currentLength;
      this.inputValue = currentDate + "/";
      this.modelRegister.dob = this.inputValue;

      return this.inputValue;
    }
    dateCountTracker = currentLength;
    this.inputValue = currentDate;
    this.modelRegister.dob = this.inputValue;
  }
  showError() {
    if (this.error != "") {
      this.showErrorBoxL = !this.showErrorBoxL;
    }
  }




  showapplink() {
    this.appLink = true;
    this.mobileIconShow = false;
  }
  hideapplink() {
    this.appLink = false;
    this.mobileIconShow = true;
  }

  activeInputField(index) {
    this.activeInput = index;
  }

  setPlaceholderColor() {
  }

  getInterest() {
    if (this.interestAlreadyGet) {
      return;
    }
    this._constantService.fetchDataApiWithoutBody(this._constantService.getInterestv1ServiceUrl()).subscribe(data => {
      const responseData: any = data;
      this.interests = responseData.INTERESTS_DATA;
      this.interestAlreadyGet = true;
    }, error => {
      const responseData = error;
      if (responseData.status == 500) {
        this._router.navigate(['500']);
      }
    });
  }



  resetInputFields() {
    this.modelRegister.em = "";
    this.modelRegister.gd = 0;
    this.modelRegister.fn = "";
    this.modelRegister.ln = "";
    this.modelRegister.dob = "";
    this.inputValue = "";
    this.modelRegister.mn = "";
    this.modelRegister.pd = "";
    this.modelRegister.conid = "";
    this.model.lc = "";
    this.model.pd = "";
    this.model.t = "";
    this.model.otp = "";
  }

  closeLoginError() {
    this.showLoginError = false;
    this.lg_em_class = 0;
    this.lg_pd_class = 0;
    this.showErrorBox = false;
    this.error = "";
  }


  homerouter() {
    this._router.navigate([""]);
  }


  routTo(name) {
    this._router.navigate(['prepare/' + name]);
  }
  openNav() { };
  setCountryCode(code) {
    this.countryCode = code;
  }
  getCountryName() {

    this._constantService.fetchDataApiWithoutBody(this._constantService.getCountryv1ServiceUrl()).subscribe(data => {
      const responseData: any = data;
      this.countryList = responseData.COUNTRY_LIST;
      for (var i = 0; i < this.countryList.length; i++) {
        this.countryList[i].COUNTRY_SHORT_NAME = this.countryList[i].COUNTRY_SHORT_NAME.toLowerCase();
        this.filteredCountryList.push(this.countryList[i]);
      }
    }, error => {
      const responseData = error;
      if (responseData.status == 500) {
        this._router.navigate(['500']);
      }
    });
  }
  countryListUpdate() {
    this.hideCountryList = false;
    this.searchCountryString = '';
    this.getCountryName();
  }
  onKey(event: any) {
    var values = event.target.value;
    values = values.replace(/\s/g, '');
    if (!isNaN(values)) {
      return;
    } else if (values) {
      this.modelRegister.mn = ""

    }
  }
  setMobileNumberAndCountryCode(emittedObject) {
    this.modelRegister.mn = emittedObject.mobileNumber;
    this.modelRegister.conid = emittedObject.countryId;
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
        if (responseData.PROFILE_PHOTO_PATH)
          this._constantService.setSessionJsonPair('p_pic', responseData.PROFILE_PHOTO_PATH + "profile/" + this._constantService.getSessionDataBYKey('u_id') + "_60x60.png?v=" + date.getTime());
        localStorage.setItem('userType', responseData.IS_TEACHER);
        this.commonEmitterService.profileImageUpdated(true);
        var publicClickedURL = this._cookie.get('publicClickedURL');
        if (publicClickedURL) {
          this._router.navigate([publicClickedURL])
        } else {
          this._router.navigate(["home"]);
        }

      }
    });
  }

}
