import { Component, OnInit, AfterViewInit, EventEmitter, Output, HostListener } from '@angular/core';
import { error } from 'pdf-lib';
import { ConstantService } from 'src/app/services/constant.service';
import { Router } from '@angular/router';
const dayMilliSeconds = 24 * 60 * 60 * 1000;
const TwoDayMilliSeconds = dayMilliSeconds * 2;
@Component({
    selector: 'app-profile-visitors-page',
    templateUrl: './profile-visitors-page.component.html',
    styleUrls: [
      // '../../../sharedComponents/mmenu/slidemenu.css',
     './profile-visitors-page.component.scss'
   ]
})
export class ProfileVisitorsPageComponent implements OnInit {
    dataConf = {};
    openConfirmation: boolean = false;
    isScrolled: boolean = false;
    isScrolled1: boolean = false;
    currPos: Number = 0;
    startPos: Number = 0;
    changePos: Number = 0;
    isMobileMenue: boolean = false;
    isMobileMenue1: boolean = false;
    showRecentVisitorsList=true;

    recentVisitorsData: {PERCENT_SIGN:string; LABEL: string; LAST_WEEK_VISITORS_COUNT: string; RECENT_VISITORS_COUNT: string; VISITORS: any; }
        = {PERCENT_SIGN:'',
            LABEL: '',
            LAST_WEEK_VISITORS_COUNT: '',
            RECENT_VISITORS_COUNT: '',
            VISITORS: []
        };
    similarInterestVisitorsData: { LABEL: string; VISITORS: any; } = { LABEL: '', VISITORS: [] };
    showPageCreatePopup: boolean;
    lpvwId: any = 0;
    continueScroll: boolean = true;
    pageCount: number = 1;
    headerLabel: any;
    percentSign: any;
    loading: boolean;
    constructor(
        private _constantService: ConstantService,
        public _router: Router,

    ) {
        if(!this._constantService.getSessionDataBYKey('token')){
            this._router.navigate(['']);
        }
    }


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
    ngOnInit(): void {
        this.recentVisitorsData.VISITORS = [];
        this.similarInterestVisitorsData.VISITORS = [];
        this.getVisitors();
    }
    sessionExpire(event) {
        if (event) {
            this.dataConf['type'] = 4;
            this.dataConf['msg'] = "Session Expire";
            this.dataConf['error_msg'] = "Session Expired";
            this.openConfirmation = true;
        }
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
        this.isMobileMenue = !this.isMobileMenue;
    }

    getVisitors() {
        this.loading =true;
        var params = {
            "token": this._constantService.getSessionDataBYKey('token'),
            "token_param": { "device_type": "w", "host": "" },
            "lpvw_id": this.recentVisitorsData.VISITORS.length > 0 ? this.recentVisitorsData.VISITORS[this.recentVisitorsData.VISITORS.length - 1].USER_PROFILE_VIEW_ID : '0',
            "count": '20',
            "flow": "d"
        }
        this._constantService.fetchDataApi(this._constantService.getVisitorsListApiUrl(), params).subscribe(data => {
            var response: any = data;
            var status = response.STATUS;
            if (status == this._constantService.success_msg) {
                this.headerLabel = response.HEADER_LABEL;
                this.recentVisitorsData.PERCENT_SIGN = response.PERCENT_SIGN;
                this.recentVisitorsData.LABEL = response.RECENT_VISITORS.LABEL;
                this.recentVisitorsData.LAST_WEEK_VISITORS_COUNT = response.RECENT_VISITORS.LAST_WEEK_VISITORS_COUNT;
                this.recentVisitorsData.RECENT_VISITORS_COUNT = response.RECENT_VISITORS.RECENT_VISITORS_COUNT;
                this.recentVisitorsData.VISITORS = this.recentVisitorsData.VISITORS.concat(response.RECENT_VISITORS.VISITORS);
                this.similarInterestVisitorsData = response.SIMILAR_INTEREST_VISITORS;
                if (response.RECENT_VISITORS.VISITORS.length < 20) {
                    this.continueScroll = false;
                }
                this.loading=false;
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = response.ERROR_MSG;
                this.openConfirmation = true;
                this.loading=false;
            }
        }, error => {
            var response = error;
            this.loading=false;
            if (response.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    updateRecentVisitorProfilePic(i) {
        this.recentVisitorsData.VISITORS[i].img = false;

    }
    updateSimilarInterestVisitorProfilePic(event) {
        event.target.src = this._constantService.defaultImgPathForSuggestedConnections;

    }
    getTimeElapsed(milliseconds) {
        if (milliseconds >= (TwoDayMilliSeconds)) {
            return Math.round(milliseconds / dayMilliSeconds) + ' days ago';
        }
        if (milliseconds > dayMilliSeconds) {
            return '1 day ago';
        }
        if (milliseconds >= 7200000) {
            return Math.round(milliseconds / 7200000) + ' hours ago'
        }
        if (milliseconds >= 3600000) {
            return 'an hour ago'
        }
        if (milliseconds > 120000) {
            return Math.round(milliseconds / 60000) + ' minutes ago'
        }
        return 'just now'
    }


    displayPageCreatePopup($event) {
        this.showPageCreatePopup = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }

    hidePageCreatePopup($event) {
        this.showPageCreatePopup = false;
    }
    sendToInbox(visitor) {
        var FULL_NAME = visitor.FIRST_NAME + ' ' + visitor.LAST_NAME;
        this._constantService.setSessionJsonPair('user_name', FULL_NAME);
        this._constantService.setSessionJsonPair('friend_user_id', visitor.USER_ID);
        this._router.navigate(['/inbox/' + visitor.USER_NAME]);
        this._constantService.setSessionJsonPair('fom_res', 1);
    }

    onScrollDown() {
        console.log("onscroll down called");
        if (this.continueScroll && !this.loading) {
            this.getVisitors();
        }
    }

}
