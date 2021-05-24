import { Component, OnInit, AfterViewInit, EventEmitter, Output, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EncryptionService } from './../../services/encryption.service';
import { ConstantService } from './../../services/constant.service';
import { PostdataService } from './../../services/postdata.service';
@Component({
    selector: 'app-activitylog',
    templateUrl: './activitylog.component.html',
    providers: [ ConstantService, EncryptionService, PostdataService],
    styleUrls: ['./activitylog.component.scss', './../../sharedComponents/peopleyouknow/peopleyouknow.component.scss',
     './../notification/notification.component.scss'],
    host: {
        '(window:scroll)': 'onScroll($event)'
    }
})
export class ActivitylogComponent implements OnInit, AfterViewInit {
    emptyLog = false;
    secWidth = 0;
    current_year;
    t: string;
    profile_path = '';
    activitylog = [];
    lastActivityTime = '0';
    continueScroll = false;
    dataConf = {};
    openConfirmation = false;
    isScrolled = false;
    isScrolled1 = false;
    currPos: Number = 0;
    startPos: Number = 0;
    changePos: Number = 0;
    resize_window = true;
    isCratePagePopup = false;
    constructor(
        public _constantService: ConstantService,
        private _router: Router,
        private postData: PostdataService
    ) { }
    @HostListener('window:resize', ['$event'])


    onResize(event) {
        if (window.innerWidth >= 1200) {
            var innerWindWidth = window.innerWidth - 18;
            event.target.innerWidth;
            this.resize_window = true;
            document.getElementById('windiv').style.width = innerWindWidth + 'px';
        } else {
            document.getElementById('windiv').style.width = '100%';
        }
        if (window.innerWidth >= 768) {
            var rightwidth = document.getElementById('wall-sidebar-wrap').offsetWidth;
            var rightinnwidth = rightwidth - 15;
            document.getElementById('someDiv').style.width = rightinnwidth + 'px';
            document.getElementById('someDivleft').style.width = rightinnwidth + 'px';
        } else {
            document.getElementById('someDiv').style.width = '278px';
            document.getElementById('someDivleft').style.width = '278px';
        }
    }
    private checkScreenWidth() {
        var winwidth = window.innerWidth - 18;
        if (window.innerWidth >= 1200) {

            document.getElementById('windiv').style.width = winwidth + 'px';
        } else {
            document.getElementById('windiv').style.width = '100%';
        }
        if (window.innerWidth >= 768) {
            var rightwidth = document.getElementById('wall-sidebar-wrap').offsetWidth;
            var rightinnwidth = rightwidth - 15;
            document.getElementById('someDiv').style.width = rightinnwidth + 'px';
            document.getElementById('someDivleft').style.width = rightinnwidth + 'px';
        } else {
            document.getElementById('someDivleft').style.width = '278px';
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
                document.getElementById('someDiv').style.top = -topHeight + 'px';
            } else {
                this.isScrolled = false;
            }
        } else {
            var topHeight = secHeight - innerWindHeight;
            this.changePos = secHeight - innerWindHeight;
            this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
            if (this.currPos >= this.changePos) {
                this.isScrolled = true;
                document.getElementById('someDiv').style.top = 72 + 'px';
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
                document.getElementById('someDivleft').style.top = -topHeightleft + 'px';
            } else {
                this.isScrolled1 = false;
            }
        } else {
            var topHeightleft = secHeightleft - innerWindHeight;
            this.changePos = secHeightleft - innerWindHeight;
            this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
            if (this.currPos >= this.changePos) {
                this.isScrolled1 = true;
                document.getElementById('someDivleft').style.top = 72 + 'px';
            } else {
                this.isScrolled1 = false;
            }

        }

    }

    ngOnInit() {
        document.title = 'Study24x7 - A best place for collaborative learning & sharing';
        this.checkScreenWidth();
        this.t = this._constantService.getSessionDataBYKey('token');
        if (this.t != null && this.t != undefined && this.t != '') {


            if ((this._constantService.getSessionDataBYKey('mobile_verify') == 'false' && this._constantService.getEmailVer() == 'false') || this._constantService.getUserInterest() == '0') {
                this._router.navigate(['verification']);
            }

            var date = new Date();
            this.current_year = date.getFullYear();
            window.scrollTo(0, 0);
            this.getUserActivity(0);
        } else {
            this._router.navigate(['']);
        }
    }

    ngAfterViewInit() {
        this.secWidth = document.getElementById('left-side-bar').offsetWidth;
        this.secWidth = this.secWidth - 30;
    }

    getUserActivity(lstactivityId) {

        var activity = {};
        activity['token'] = this._constantService.getSessionDataBYKey('token');
        activity['token_param'] = {};
        activity['token_param']['device_type'] = 'w';
        activity['token_param']['host'] = '';
        activity['lupdtimstmp'] = lstactivityId;
        activity['flow'] = 'd';
        activity['count'] = 10;

        this._constantService.fetchDataApi(this._constantService.getUserActivityServiceUrl(), activity).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            this.profile_path = responseData.PP_PATH;
            if (status == this._constantService.success_msg) {
                var activity = responseData.ACTIVITY_LOG;

                this.lastActivityTime = activity[activity.length - 1].UPDATE_DATE_TIME;
                if (activity.length < 10) {
                    this.continueScroll = false;
                } else {
                    this.continueScroll = true;
                }
                if (activity.length == 0) {
                    this.emptyLog = true;
                }

                for (var i = 0; i < activity.length; i++) {
                    activity[i].PROFILE_PIC_PATH = responseData.PROFILE_PHOTO_PATH + 'profile/' + this._constantService.getSessionDataBYKey('u_id') + '_60x60.png';
                    activity[i].ACTIVITY =this.postData.decodeURIPostData( this.postData.decodeURIPostData(activity[i].ACTIVITY));
                    activity[i].UPDATE_DATE_TIME = this.postData.getPostDateTime(activity[i].UPDATE_DATE_TIME);
                    if (activity[i].SEEN == 0) {
                        activity[i].STATUS_CLASS = 'unread';
                    } else {
                        activity[i].STATUS_CLASS = '';
                    }
                    if (activity[i].TYPE === 'System Update') {
                        activity[i].CLASS = 'nf-interest';
                    } else if (activity[i].TYPE === 'Question' || activity[i].TYPE === 'Question Response') {
                        activity[i].CLASS = 'nf-ques';
                    } else if (activity[i].TYPE === 'Post') {
                        activity[i].CLASS = 'nf-post';
                    } else if (activity[i].TYPE === 'Registration') {
                        activity[i].CLASS = 'nf-interest';
                    } else if (activity[i].TYPE === 'Security Alert') {
                        activity[i].CLASS = 'nf-pass';
                    } else if (activity[i].TYPE === 'Verification') {
                        if (activity[i].TYPE_ID == 1) {
                            activity[i].CLASS = 'nf-email';
                        } else if (activity[i].TYPE_ID == 2) {
                            activity[i].CLASS = 'nf-mobile';
                        }
                    } else if (activity[i].TYPE === 'Comment') {
                        activity[i].CLASS = 'nf-comment';
                    }
                }
                this.activitylog.push.apply(this.activitylog, activity);
            } else if (status == 'error_token') {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = 'Session Expire';
                this.dataConf['error_msg'] = 'Session Expired';
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
                this.dataConf['msg'] = 'Session Expire';
                this.dataConf['error_msg'] = 'Session Expired';
                this.openConfirmation = true;
            }
        }
    }
    onScrollDown() {
        if (this.continueScroll) {
            this.getUserActivity(this.lastActivityTime);
        }
    }

    removenotify(i) {
        this.activitylog.splice(i, 1);
    }

    goToPost(i) {
        if (this.activitylog[i].TYPE === 'Comment' || this.activitylog[i].TYPE === 'Post' || this.activitylog[i].TYPE === 'Question' || this.activitylog[i].TYPE === 'Question Response') {
            this._constantService.setSessionJsonPair('post_id', this.activitylog[i].TYPE_ID);
            this._router.navigate(['post/' + this.activitylog[i].TYPE_ID]);
        }
    }

    updateProfilePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }

    sessionExpire(event) {
        if (event) {
            this.dataConf['type'] = 4;
            this.dataConf['msg'] = 'Session Expire';
            this.dataConf['error_msg'] = 'Session Expired';
            this.openConfirmation = true;
        }
    }

    displayPageCreatePopup($event) {
        this.isCratePagePopup = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add('body-overflow');
    }

    hidePageCreatePopup($event) {
        this.isCratePagePopup = false;
    }

}
