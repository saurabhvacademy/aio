import { Component, OnInit, OnDestroy, AfterViewInit, AfterViewChecked, Inject, HostListener, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncryptionService } from './../../services/encryption.service';
import { ConstantService } from './../../services/constant.service';
import { CommonfunctionsService } from './../../services/commonfunctions.service';
//import {InterestpopupComponent} from './../../sharedComponents/interestpopup/interestpopup.component';
import { UserInfo } from './../login/userInfo';
import { Meta, Title } from '@angular/platform-browser';
import { PostdataService } from './../../services/postdata.service';
import { ChangeDetectorRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

//import { TextpostComponent } from './../../sharedComponents/postComponents/textpost/textpost.component';


@Component({
    selector: 'app-wall',
    templateUrl: './wall.component.html',
    providers: [ConstantService, EncryptionService, CommonfunctionsService],
    styleUrls: [
      './wall.component.scss',
       // '../../sharedComponents/mmenu/slidemenu.css'
     ],
    host: {
        '(window:scroll)': 'onScroll($event)'
    }
})


export class WallComponent implements OnInit, AfterViewInit, OnDestroy {
    publicClickedURL: string = '';
    setMetaTag: boolean = false;
    UserId: any;
    // @ViewChild(TextpostComponent)
    //  private textpostcomponent: TextpostComponent;
    bodyOverflow = false;
    userInfo: UserInfo;
    t: string;
    secWidth = 0;
    current_year;
    postId = "";
    dataConf = {};
    openConfirmation: boolean = false;
    pageSuggPresent: boolean = true;
    hidenoti: boolean = true;
    acceptId;
    sendId;
    cancelId;
    wallDetail: any;
    fixed: boolean;
    isScrolled = false;
    isScrolled1 = false;
    currPos: Number = 0;
    startPos: Number = 0;
    changePos: Number = 0;
    resize_window: boolean = true;
    scrollVariable: any;
    isMobileMenue: boolean = false;
    isCratePagePopup: boolean = false;
    message = '0';
    showliveclass: boolean = true;
    selected = 'all'
    // declare var jquery:any;
    constructor(
        public _constantService: ConstantService,
        private _cookie: CookieService,
        public _router: Router,
        public _encryptionService: EncryptionService,
        public _commonfunctionService: CommonfunctionsService,
        // @Inject(DOCUMENT) private document: Document
        private changDetector: ChangeDetectorRef,
        private activatedRoute: ActivatedRoute
    ) {
        window.scrollTo(0, 0);
        this.userInfo = new UserInfo();
        if (this._constantService.getUserInterest() == "") {
            this._router.navigate(["/interest"]);
        }
    }
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (window.innerWidth < 2000 && window.innerWidth >= 1200) {
            var innerWindWidth = window.innerWidth - 18;
            event.target.innerWidth;
            this.resize_window = true;
            document.getElementById("windiv").style.width = innerWindWidth + "px";
        } else {
            document.getElementById("windiv").style.width = "100%";
        }
        if (window.innerWidth >= 768) {
            var rightwidth = document.getElementById("wall-sidebar-wrap").offsetWidth;
            var rightinnwidth = rightwidth - 15;
            document.getElementById("someDiv").style.width = rightinnwidth + "px";
            document.getElementById("someDivleft").style.width = rightinnwidth + "px";
        }

        // else{
        //   document.getElementById("someDiv").style.width = "278px";
        // }

        if (window.innerWidth > 991) {
            this.isMobileMenue = false;
        }

    }

    viewAll() {
        this.UserId = this._constantService.getSessionDataBYKey('username');
        this._router.navigate(["profile/" + this.UserId + "/#Invite"]);
    }

    receiveMessage($event) {
        this.message = $event

    }

    private checkScreenWidth() {
        var winwidth = window.innerWidth - 18;
        if (window.innerWidth < 2000 && window.innerWidth >= 1200) {

            document.getElementById("windiv").style.width = winwidth + "px";
        } else {
            document.getElementById("windiv").style.width = "100%";
        }
        if (window.innerWidth >= 768) {
            var rightwidth = document.getElementById("wall-sidebar-wrap").offsetWidth;
            var rightinnwidth = rightwidth - 15;
            document.getElementById("someDiv").style.width = rightinnwidth + "px";
            document.getElementById("someDivleft").style.width = rightinnwidth + "px";
        }
        // else{
        //   document.getElementById("someDiv").style.width = "278px";
        // }
    }

    onScroll(evt) {
        var secHeight = document.getElementById('someDiv').offsetHeight;
        var secHeightleft = document.getElementById('someDivleft').offsetHeight;
        var secHeightcenter = document.getElementById('centersection').offsetHeight;
        var innerWindHeight = window.innerHeight - 50;
        var innerWindHeightleft = window.innerHeight - 50;
        if (secHeightcenter > secHeight) {
            if (secHeight > innerWindHeight) {

                var topHeight = secHeight - innerWindHeight;
                this.changePos = secHeight - innerWindHeight;
                this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
                if (this.currPos >= this.changePos) {
                    this.isScrolled = true;
                    document.getElementById("someDiv").style.top = -topHeight + "px";
                } else {
                    this.isScrolled = false;
                }
            } else {
                var topHeight = secHeight - innerWindHeight;
                this.changePos = secHeight - innerWindHeight;
                this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
                if (this.currPos >= this.changePos) {
                    this.isScrolled = true;
                    document.getElementById("someDiv").style.top = 72 + "px";
                } else {
                    this.isScrolled = false;
                }

            }
        } else {
            this.isScrolled = false;
        }
        if (secHeightcenter > secHeightleft) {
            if (secHeightleft > innerWindHeightleft) {

                var topHeightleft = secHeightleft - innerWindHeightleft;
                this.changePos = secHeightleft - innerWindHeightleft;
                this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
                if (this.currPos >= this.changePos) {
                    this.isScrolled1 = true;
                    document.getElementById("someDivleft").style.top = -topHeightleft + "px";
                } else {
                    this.isScrolled1 = false;
                }
            } else {
                var topHeightleft = secHeightleft - innerWindHeightleft;
                this.changePos = secHeightleft - innerWindHeightleft;
                this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
                if (this.currPos >= this.changePos) {
                    this.isScrolled1 = true;
                    document.getElementById("someDivleft").style.top = 72 + "px";
                } else {
                    this.isScrolled1 = false;
                }

            }
        } else {
            this.isScrolled = false;
        }


        this.showScrollButton();

    }



    ngOnDestroy() {
        if (this.scrollTimer) {
            clearInterval(this.scrollTimer);
        }
    }


    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            if (params['id']) {
                this.selected = params['id'];
                if(!this.selected || this.selected==''){
                    this.selected == 'all';
                }
            }
            this.changDetector.detectChanges();
        });

        if (!this._cookie.get('study247')) {
            // this._cookie.set('study247', this._encryptionService.encrypt(this._constantService.getSessionDataBYKey('token')));
            document.cookie = "study247=aio";
        }
        this.getLiveStreamStatus();
        document.body.classList.remove("body-overflow-y");
        document.title = "Study24x7 - A best place for collaborative learning & sharing";


        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("stopClicking");
        body.classList.remove("body-overflow");

        this._commonfunctionService.latestPostInterest('');

        var browserStrip = document.getElementById("browser_container");
        if (browserStrip) {
            browserStrip.style.display = "none";
        }
        this.setLastActiveTime();
        this.checkScreenWidth();
        var date = new Date();
        this.current_year = date.getFullYear();

        this.t = this._constantService.getSessionDataBYKey('token');

        if (this.t != null && this.t != undefined && this.t != "undefined" && this.t != '') {

            if (this._constantService.getSessionDataBYKey('v_m') === 'false' && this._constantService.getSessionDataBYKey('v_e') === 'false') {
                this._router.navigate(['verification']);
            } else if (this._constantService.getUserInterest() == '0' && this._constantService.getSessionDataBYKey('isInterestSet') == '0') {
                this._router.navigate(['verification']);
            }

        } else {
            this.dataConf['type'] = 4;
            this.dataConf['msg'] = "Session Expire";
            this.dataConf['error_msg'] = "Session Expired";
            this.openConfirmation = true;
        }
        //        this.getUserFollowerAndFollowing();
        this.changDetector.detectChanges();

    }

    // scroll top  start
    scrollTimer;
    isIntervalClear: boolean = true;

    scrollStart() {
        if (this.isIntervalClear) {
            this.scrollTimer = setInterval(() => {
                this.scrollBottomToTop();
            }, 1);
            this.isIntervalClear = false;
        }
    }



    scrollBottomToTop() {
        window.scrollBy(0, -1000);
        if (window.pageYOffset < 100) {
            clearInterval(this.scrollTimer);
            this.isIntervalClear = true;
        }

    }

    showScrollButton() {
        if (window.pageYOffset < 1000) {
            document.getElementById("scrollButton").style.opacity = "0";
        }
        else {
            document.getElementById("scrollButton").style.opacity = "1";

        }
    }

    // scroll top end
    ngAfterViewInit() {
        this.secWidth = document.getElementById('left-side-bar').offsetWidth;
        this.secWidth = this.secWidth - 30;


        document.title = "Study24x7 - A best place for collaborative learning & sharing";

    }

    ngDoCheck() {

    }


    setLastActiveTime() {
        var lastActive = {};
        lastActive['token'] = this._constantService.getSessionDataBYKey('token');
        lastActive['token_param'] = {};
        lastActive['token_param']['device_type'] = 'w';
        lastActive['token_param']['host'] = '';

        if (!lastActive['token']) {
            return;
        }



        this._constantService.fetchDataApi(this._constantService.getLastActiveTimeServiceUrl(), lastActive).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
            } else {
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

    getUserFollowerAndFollowing() {
        var userFollowAndFollowing = {};
        userFollowAndFollowing['token'] = this._constantService.getSessionDataBYKey('token');
        userFollowAndFollowing['token_param'] = {};
        userFollowAndFollowing['token_param']['device_type'] = 'w';
        userFollowAndFollowing['token_param']['host'] = '';
        userFollowAndFollowing['username'] = this._constantService.getSessionDataBYKey('username');
        userFollowAndFollowing['myprofile'] = 'no';


        this._constantService.fetchDataApi(this._constantService.getUserFollowAndFollowingServiceUrl(), userFollowAndFollowing).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this._constantService.setFriendsId(responseData.CONNECTIONS);

            } else {
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


    overFlowStatus(status) {
        if (status == true) {
            let body = document.getElementsByTagName('body')[0];
            body.classList.add("body-overflow");
        }
        else {
            let body = document.getElementsByTagName('body')[0];
            body.classList.remove("body-overflow");
        }
    }
    popupOverflowStatus(event) {
        if (event == true) {
            let body = document.getElementsByTagName('body')[0];
            body.classList.add("body-overflow");
        }
        else {
            let body = document.getElementsByTagName('body')[0];
            body.classList.remove("body-overflow");
        }
    }

    sessionExpire(event) {
        if (event) {
            this.dataConf['type'] = 4;
            this.dataConf['msg'] = "Session Expire";
            this.dataConf['error_msg'] = "Session Expired";
            this.openConfirmation = true;
        }
    }
    closePopup(event) {
        if (event['error'] == false) {
            this.openConfirmation = false;
        }
    }
    hidenotifivation() {
        this.hidenoti = false;
    }

    frmHeader(event) {
        this.acceptId = event;
    }

    frmPplUKnow(event) {
        this.sendId = event;
    }
    frmPplUKnowCancel(event) {
        this.cancelId = event;
    }

    GetUserId(event) {

    }

    scrolledLength() {
        var elmnt = document.getElementsByTagName("BODY")[0];
        var y = elmnt.scrollTop;
    }

    hideSuggPg(event) {
        this.pageSuggPresent = false;
    }

    displayMobileMenu($event) {
        this.isMobileMenue = !this.isMobileMenue;
    }

    hideMobileMenu($event) {
        this.isMobileMenue = false;
    }

    displayPageCreatePopup($event) {
        this.isCratePagePopup = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }

    hidePageCreatePopup($event) {
        this.isCratePagePopup = false;
    }

    getLiveStreamStatus() {
        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";




        this._constantService.fetchDataApi(this._constantService.getCheckLiveStreamServiceUrl(), hitObj).subscribe(data => {
            var responseData: any = data;
            if (responseData.STREAM_FLAG) {
                this._constantService.setSessionJsonPair('STREAM_FLAG', responseData.STREAM_FLAG);
            }
        }), error => {
            var err = error;
            if (err.status == 500) {
                this._router.navigate(['500']);
            }
        };
    }

    leftSidemenu() {
        this.isMobileMenue = !this.isMobileMenue;

    }
    // showclasspopup() {
    //     this.showliveclass = false;
    // }
    setCenterComponent(event) {
        this.selected = event.clicked
    }
    sessionLogout() {

        this._constantService.clearUserInfo();
        this._router.navigate(['']);
    }

}
