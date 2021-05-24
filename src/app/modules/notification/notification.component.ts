import { Component, OnInit, AfterViewInit, EventEmitter, Output, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EncryptionService } from './../../services/encryption.service';
import { ConstantService } from './../../services/constant.service';
import { PostdataService } from './../../services/postdata.service';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    providers: [ConstantService, EncryptionService, PostdataService],
    // styleUrls: ['./notification.component.scss']
    styleUrls: ['./notification.component.scss', './../../sharedComponents/peopleyouknow/peopleyouknow.component.scss'],
    host: {
        '(window:scroll)': 'onScroll($event)'
    }
})
export class NotificationComponent implements OnInit, AfterViewInit {

    secWidth = 0;
    current_year;
    t: string;
    profile_path = "";
    notification = [];
    lastNoitificationId = 0;
    continueScroll: boolean = false;
    dataConf = {};
    openConfirmation: boolean = false;
    isScrolled: boolean = false;
    isScrolled1: boolean = false;
    currPos: Number = 0;
    startPos: Number = 0;
    changePos: Number = 0;
    isMobileMenue: boolean = false;
    isMobileMenue1: boolean = false;

    isCratePagePopup: boolean = false;
    // resize_window: boolean = true;
    constructor(
        public _constantService: ConstantService,
        private _router: Router,
        private _encryptionService: EncryptionService,
        private postData: PostdataService
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
            var rightwidth = document.getElementById("wall-sidebar-wrap").offsetWidth;
            var rightinnwidth = rightwidth - 15;
            document.getElementById("someDiv").style.width = rightinnwidth + "px";
            document.getElementById("someDivleft").style.width = rightinnwidth + "px";
        } else {
            document.getElementById("someDiv").style.width = "278px";
            document.getElementById("someDivleft").style.width = "278px";
        }

        if (window.innerWidth > 991) {
            this.isMobileMenue = false;
        }
    }
    private checkScreenWidth() {
        var winwidth = window.innerWidth - 18;
        if (window.innerWidth >= 1200) {

            document.getElementById("windiv").style.width = winwidth + "px";
        } else {
            document.getElementById("windiv").style.width = "100%";
        }
        if (window.innerWidth >= 768) {
            var rightwidth = document.getElementById("wall-sidebar-wrap").offsetWidth;
            var rightinnwidth = rightwidth - 15;
            document.getElementById("someDiv").style.width = rightinnwidth + "px";
            document.getElementById("someDivleft").style.width = rightinnwidth + "px";
        } else {
            document.getElementById("someDiv").style.width = "278px";
            document.getElementById("someDivleft").style.width = "278px";
        }
    }

    onScroll(evt) {
        var secHeight = document.getElementById('someDiv').offsetHeight;
        var secHeightleft = document.getElementById('someDivleft').offsetHeight;
        var innerWindHeight = window.innerHeight - 50;
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
        if (secHeightleft > innerWindHeight) {

            var topHeightleft = secHeightleft - innerWindHeight;
            this.changePos = secHeightleft - innerWindHeight;
            this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
            if (this.currPos >= this.changePos) {
                this.isScrolled1 = true;
                document.getElementById("someDivleft").style.top = -topHeightleft + "px";
            } else {
                this.isScrolled1 = false;
            }
        } else {
            var topHeightleft = secHeightleft - innerWindHeight;
            this.changePos = secHeightleft - innerWindHeight;
            this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
            if (this.currPos >= this.changePos) {
                this.isScrolled1 = true;
                document.getElementById("someDivleft").style.top = 72 + "px";
            } else {
                this.isScrolled1 = false;
            }

        }

    }

    ngOnInit() {
        document.title = "Study24x7 - A best place for collaborative learning & sharing";
        this.checkScreenWidth();
        this.t = this._constantService.getSessionDataBYKey('token');
        if (this.t != null && this.t != undefined && this.t != '') {
            //            if (this._constantService.getCountry() == '1') {
            //                if (this._constantService.getMobileVer() == 'false' || this._constantService.getUserInterest() == '0') {
            //                    this._router.navigate(['verification']);
            //                }
            //            } else {
            //                if (this._constantService.getEmailVer() == 'false' || this._constantService.getUserInterest() == '0') {
            //                    this._router.navigate(['verification']);
            //                }
            //            }
            if ((this._constantService.getSessionDataBYKey('mobile_verify') == 'false' && this._constantService.getEmailVer() == 'false') || this._constantService.getUserInterest() == '0') {
                this._router.navigate(['verification']);
            }
            var date = new Date();
            this.current_year = date.getFullYear();
            window.scrollTo(0, 0);
            this.getUserNotification(0);
        } else {
            this._router.navigate(['']);
        }
    }

    ngAfterViewInit() {
        this.secWidth = document.getElementById('left-side-bar').offsetWidth;
        this.secWidth = this.secWidth - 30;
    }

    getUserNotification(lstnotifyId) {

        var notify = {};
        notify['token'] = this._constantService.getSessionDataBYKey('token');
        notify['token_param'] = {};
        notify['token_param']['device_type'] = 'w';
        notify['token_param']['host'] = '';
        notify['lnot_id'] = lstnotifyId;
        notify['flow'] = 'd';
        notify['count'] = 10;
        notify['pg_uuid'] = '';

        this._constantService.fetchDataApi(this._constantService.getUserNotification(), notify).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            this.profile_path = responseData.PP_PATH;

            if (status == this._constantService.success_msg) {
                var notifyArr = responseData.NOTIFICATIONS;

                this.lastNoitificationId = notifyArr[notifyArr.length - 1].USER_NOTIFICATION_ID;
                if (notifyArr.length < 10) {
                    this.continueScroll = false;
                } else {
                    this.continueScroll = true;
                }

                for (var i = 0; i < notifyArr.length; i++) {

                    // notifyArr[i].PROFILE_PIC_PATH = responseData.PP_PATH + "profile/" + notifyArr[i].SENDER_ID + "_60x60.png";
                    notifyArr[i].TEXT = this.postData.decodeURIPostData(notifyArr[i].TEXT);
                    if (notifyArr[i].SEEN == 0) {
                        notifyArr[i].STATUS_CLASS = "unread";
                    } else {
                        notifyArr[i].STATUS_CLASS = "";
                    }
                    if (notifyArr[i].TYPE === "System Update") {
                        notifyArr[i].CLASS = "nf-interest";
                    } else if (notifyArr[i].TYPE === "Question" || notifyArr[i].TYPE === "Question Response") {
                        notifyArr[i].CLASS = "nf-ques";
                    } else if (notifyArr[i].TYPE === "Post") {
                        notifyArr[i].CLASS = "nf-post";
                    } else if (notifyArr[i].TYPE === "Registration") {
                        notifyArr[i].CLASS = "nf-interest";
                    } else if (notifyArr[i].TYPE === "Security Alert") {
                        notifyArr[i].CLASS = "nf-pass";
                    } else if (notifyArr[i].TYPE === "Verification") {
                        if (notifyArr[i].TYPE_ID == 1) {
                            notifyArr[i].CLASS = "nf-mail";
                        } else if (notifyArr[i].TYPE_ID == 2) {
                            notifyArr[i].CLASS = "nf-mobile";
                        }
                    } else if (notifyArr[i].TYPE === "Comment") {
                        notifyArr[i].CLASS = "nf-comment";
                    } else if (notifyArr[i].TYPE === "Page") {
                        notifyArr[i].CLASS = "nf-page";
                    } else if (notifyArr[i].TYPE === "Page_Invite") {
                        notifyArr[i].CLASS = "nf-page";
                    } else if (notifyArr[i].TYPE === "Page_Post") {
                        notifyArr[i].CLASS = "nf-post";
                    } else if (notifyArr[i].TYPE === "Page_Question") {
                        notifyArr[i].CLASS = "nf-ques";
                    } else if (notifyArr[i].TYPE === "Page_BroadcastMsg") {
                        notifyArr[i].CLASS = "nf-page";
                    } else if (notifyArr[i].TYPE === "Connection") {
                        notifyArr[i].CLASS = "nf-con-req";
                    } else if (notifyArr[i].TYPE === "Course") {
                        notifyArr[i].CLASS = "nf-page";
                    } else if (notifyArr[i].TYPE === "Page_Course") {
                        notifyArr[i].CLASS = "nf-page";
                    }

                    if (notifyArr[i].TYPE == "Page_Post") {
                        if (notifyArr[i].PROFILE_PHOTO_PATH) {
                            notifyArr[i].PROFILE_PHOTO_PATH = notifyArr[i].PROFILE_PHOTO_PATH + "profile/" + notifyArr[i].SENDER_ID + "_60x60.png?v=";
                        } else {
                            if (notifyArr[i].PAGE_TYPE == 0) {
                                notifyArr[i].PROFILE_PHOTO_PATH = this._constantService.defaultPageIndImgPath;
                            } else if (notifyArr[i].PAGE_TYPE == 1) {
                                notifyArr[i].PROFILE_PHOTO_PATH = this._constantService.defaultPageCollgImgPath;
                            }
                        }

                    } else if (notifyArr[i].TYPE == "Course") {
                        if (notifyArr[i].COVER_PHOTO_PATH != null) {
                            if (notifyArr[i].COVER_TYPE == 0) {
                                notifyArr[i].PROFILE_PHOTO_PATH = notifyArr[i].COVER_PHOTO_PATH + "cover/" + notifyArr[i].TYPE_ID + "_1235x330.png";
                            } else {
                                notifyArr[i].PROFILE_PHOTO_PATH = notifyArr[i].COVER_PHOTO_PATH;
                            }
                        } else {
                            notifyArr[i].PROFILE_PHOTO_PATH = this._constantService.defaultCoverImgPath;
                        }


                    } else {
                        notifyArr[i].PROFILE_PHOTO_PATH = notifyArr[i].PROFILE_PHOTO_PATH + "profile/" + notifyArr[i].SENDER_ID + "_60x60.png?v=";
                    }

                }

                this.notification.push.apply(this.notification, notifyArr);
            } else if (status == 'error_token') {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }
    closePopup(event) {
        if (event['error'] == false) {
            this.openConfirmation = false;
        } else {
            if (event) {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;
            }
        }
    }
    onScrollDown() {
        if (this.continueScroll) {
            this.getUserNotification(this.lastNoitificationId);
        }
    }

    removenotify(i) {
        this.notification.splice(i, 1);
    }

    goToPost(i) {
        if (this.notification[i].TYPE === "Comment" || this.notification[i].TYPE === "Post" || this.notification[i].TYPE === "Question" || this.notification[i].TYPE === "Question Response" || this.notification[i].TYPE === "Page_Post" || this.notification[i].TYPE === "Page_Question") {
            //this._constantService.setPostId(this.notification[i].TYPE_ID);
            this._constantService.setSessionJsonPair('post_id', this.notification[i].TYPE_ID);
            if (this.notification[i].TYPE_ID) {
                var typeIdArr=this.notification[i].TYPE_ID.split(':')
                window.location.replace('post/' + typeIdArr[1]);
            }
        } else if (this.notification[i].TYPE === "Page_Invite" || this.notification[i].TYPE == 'Page') {
            this._router.navigate(['page/' + this.notification[i].TYPE_ID]);
        } else if (this.notification[i].TYPE === "Connection") {
            this._router.navigate(['profile/' + this.notification[i].USER_NAME]);
        } else if (this.notification[i].TYPE == 'Course' || this.notification[i].TYPE == 'Page_Course') {
            if (this.notification[i].IS_ADMIN == "0") {
                this._router.navigate(['course/' + this.notification[i].COURSE_URL]);
            } else if (this.notification[i].IS_ADMIN == "1") {
                if (this.notification[i].PUBLISH != 3) {
                    this._router.navigate(['addcourse/' + this.notification[i].TYPE_ID]);
                }
            }
            return false;
        }
    }

    updateProfilePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }

    sessionExpire(event) {
        if (event) {
            this.dataConf['type'] = 4;
            this.dataConf['msg'] = "Session Expire";
            this.dataConf['error_msg'] = "Session Expired";
            this.openConfirmation = true;
        }
    }
    displayPageCreatePopup($event) {

        this.isCratePagePopup = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }

    hidePageCreatePopup($event) {
        console.log("ayush sahu");
        this.isCratePagePopup = false;
    }

    displayMobileMenu(e) {
        this.isMobileMenue = !this.isMobileMenue;
        this.isMobileMenue1 = true;
    };
    hideMobileMenu(e) {
        this.isMobileMenue = false;
        this.isMobileMenue1 = false;
    };
    leftSidemenu() {
      // this.leftFilterslidebg = !this.leftFilterslidebg;
      this.isMobileMenue = !this.isMobileMenue;
    //   if (this.leftFilterslidebg == true) {
    //     let body = document.getElementsByTagName('body')[0];
    //     body.classList.add("body-overflow");
    //   } else {
    //     let body = document.getElementsByTagName('body')[0];
    //     body.classList.remove("body-overflow");
    //   }
    }
}
