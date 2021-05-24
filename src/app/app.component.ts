import { Component, OnInit, ChangeDetectorRef, HostListener } from "@angular/core";
import { Router, NavigationStart, NavigationEnd } from "@angular/router";

import "rxjs/add/operator/filter";
import { ConstantService } from "./services/constant.service";
import { Title } from "@angular/platform-browser";
import { CommonEmitterService } from "./services/common-emitter.service";
import { CookieService } from "ngx-cookie-service";
declare let gtag: Function;
declare var firstload;
declare var varCheckCookie: number;
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "app";
  showKnowYourselfPopup: boolean;
  userStatus: any = -1;
  showPreloader: boolean;
  updatedSuccessfully: boolean;
  MsgPopUp: boolean = true;
  thankuMsgPopUp: boolean;
  goalSelected: boolean = false;
  downloadApp: boolean;
  promotionalpopup: boolean;
  showPopupTime: number = 15000;
  startTime: number;
  totalTimeShow: number;
  totalTimeShowPopup: number;
  currentTime: number;
  popupForHoli: number=0;
  isPromotionalPopupuEnabled=false;
  // IsLoggedin=false;
  constructor(
    private router: Router,
    private titleService: Title,
    private _constantService: ConstantService,
    private _changeDetectior: ChangeDetectorRef,
    private commonEmitterService: CommonEmitterService,
    private _cookie: CookieService

  ) {
    var scriptAdapterLatest = document.createElement("script");
    var scriptWebrtcAdapter = document.createElement("script");
    var scriptScreenCapturing = document.createElement("script");
    var scriptRecordRtc = document.createElement("script");
    var scriptVideoConfig = document.createElement("script");

    scriptAdapterLatest.defer = true;
    scriptWebrtcAdapter.defer = true;
    scriptScreenCapturing.defer = true;
    scriptRecordRtc.defer = true;
    scriptVideoConfig.defer = true;

    scriptAdapterLatest.async = true;
    scriptWebrtcAdapter.async = true;
    scriptScreenCapturing.async = true;
    scriptRecordRtc.async = true;
    scriptVideoConfig.async = true;

    scriptAdapterLatest.src = "https://js.aio.com/assets/js/stream/adapter-latest.js";
    scriptWebrtcAdapter.src = "https://js.aio.com/assets/js/stream/webrtc_adaptor.js";
    scriptScreenCapturing.src = "https://js.aio.com/assets/js/stream/Screen-Capturing.js";
    scriptRecordRtc.src = "https://js.aio.com/assets/js/stream/recordrtc.js";
    scriptVideoConfig.src = "https://js.aio.com/assets/js/stream/videoconfig.js";
    document.getElementsByTagName("body")[0].appendChild(scriptAdapterLatest);
    document.getElementsByTagName("body")[0].appendChild(scriptWebrtcAdapter);
    document.getElementsByTagName("body")[0].appendChild(scriptScreenCapturing);
    document.getElementsByTagName("body")[0].appendChild(scriptRecordRtc);
    document.getElementsByTagName("body")[0].appendChild(scriptVideoConfig);

    this.router.events
      .filter((event) => event instanceof NavigationStart)
      .subscribe((event: NavigationStart) => {
        // You only receive NavigationStart events });

        setTimeout(() => {
          if (this.router.url == "/login" || this.router.url == "/") {
            if (document.getElementById("indexFooter")) {
              document.getElementById("indexFooter").style.display = "block";
            }
          } else {
            if (document.getElementById("indexFooter")) {
              document.getElementById("indexFooter").style.display = "none";
            }
          }
        }, 500);
      });

    //for google analytics code start here
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (firstload == 0) {
          gtag("config", this._constantService.googleAnalyticsUAId, {
            optimize_id: "GTM-MFK8JHZ",
          });
        } else {
          gtag("config", this._constantService.googleAnalyticsUAId, {
            'page_title': this.titleService.getTitle(),
            'page_path': window.location.pathname,
          });
        }

      }

      firstload++;

    });

    this.commonEmitterService.loginSuccessfulEmitter.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.checkUserType();
      }
    })
    // this.IsLoggedin=this._constantService.getSessionDataBYKey('token')?true:false;
  }

  @HostListener('window:resize', ['$event'])

  ngOnInit() {
    console.log("app.component.ts");
    if(!sessionStorage.getItem('holiPopup')){
      this.promotionalpopup=true;
    }  

    this.userStatus = localStorage.getItem('userType');
    var script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/latest.js?config=TeX-MML-AM_CHTML";
    document.getElementsByTagName('body')[0].appendChild(script);
    setInterval(() => { this._changeDetectior.detectChanges(); }, 1000);
    if (!localStorage.getItem('timeToShow')) {
      localStorage.setItem('startTime', "15");
      localStorage.setItem('timeToShow', (new Date().getTime() + 15000 + ''));
    }

    this.checkUserType();
    this.checkForPopup();
    if (!this._cookie.get('study247'))
      this._cookie.set('study247', 'aio');


    if (varCheckCookie && varCheckCookie == 1) {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }

  }

  checkUserType() {
    var token = this._constantService.getSessionDataBYKey('token')
    if (token) {
      setTimeout(() => {
        if (this._constantService.getSessionDataBYKey('token') && token) {
          if (localStorage.getItem("userType") != '0' && localStorage.getItem("userType") != '2' && localStorage.getItem("userType") != '3') {
            this.showKnowYourselfPopup = true;
          } else {
            this.showKnowYourselfPopup = false;
          }
        }

      }, 60000)
    }
  }

  closePopupKnowYourGoalsPopup() {
    this.showKnowYourselfPopup = false;
    this.checkUserType();

  }

  setUserStatus(status) {
    this.showPreloader = true;
    this.userStatus = status;
    (<HTMLButtonElement>document.getElementById('active-status-submit-button')).disabled = true;
    var params = {
      token: this._constantService.getSessionDataBYKey('token'),
      token_param: { "device_type": "w", "host": "" },
      usr_status: status
    }
    this._constantService.fetchDataApi(this._constantService.getUpdateUserStatusUrl(), params).subscribe(data => {
      var response: any = data;
      if (response.STATUS == 'success') {
        localStorage.setItem('userType', status);
        this.showKnowYourselfPopup = true;
        this.MsgPopUp = false;
        this.thankuMsgPopUp = true;
        this.updatedSuccessfully = true;
        this.showPreloader = false;
        setTimeout(() => {
          this.updatedSuccessfully = false;
          this.showKnowYourselfPopup = false;

        }, 3500);
        (<HTMLButtonElement>document.getElementById('active-status-submit-button')).disabled = false;

      } else {

      }
    }, error => {
      console.log(error);
    });

  }
  checkForPopup() {
    setTimeout(() => {

      if (parseInt(localStorage.getItem("timeToShow")) <= new Date().getTime()) {
        this.routeToAndroidIos();
      } else {
        this.checkForPopup();
      }
    }, 5000);
  }
  routeToAndroidIos() {
    if (window.navigator.userAgent.match(/Android/i) || window.navigator.userAgent.match(/iPad/i) || window.navigator.userAgent.match(/iPhone/i)) {
      var urlArr = window.location.href;
      if (urlArr.includes('program') || urlArr.includes('app-view')) {
        this.checkForPopup();
      } else {
        this.downloadApp = true;
        document.getElementsByTagName('body')[0].classList.add('body-overflow');

      }

    }
  }

  closePopup() {
    localStorage.setItem('startTime', (parseInt(localStorage.getItem('startTime')) * 4) + '');
    if (localStorage.getItem('startTime') && parseInt(localStorage.getItem('startTime')) >= 3600) {
      localStorage.setItem('startTime', '3600');
    }
    localStorage.setItem('timeToShow', (parseInt(localStorage.getItem('startTime')) * 1000 + new Date().getTime() + ''))
    this.downloadApp = false;
    this.checkForPopup();
    document.getElementsByTagName('body')[0].classList.remove('body-overflow');

  }
  closePromotinalPopup() {
    this.promotionalpopup = false;
  }
}
