
import { Component, Output, EventEmitter, HostListener, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EncryptionService } from './../../services/encryption.service';
import { ConstantService } from './../../services/constant.service';
import { UserInfo } from './../../modules/login/userInfo';
import { Location } from '@angular/common'
import { InternalMessageService } from './../../services/internal-message.service';
import { GoogleAnalyticsService } from 'src/app/services/google-analytics.service';

@Component({
    selector: 'app-leftmenu',
    templateUrl: './leftmenu.component.html',
    providers: [ConstantService, EncryptionService],
    styleUrls: ['../header/profile-dropdown/profile-dropdown.component.scss', './leftmenu.component.scss']
})
export class LeftmenuComponent {

    isWallFilter: number = 0;
    myProfile: string;
    interestPopup: boolean = false;
    loaderscreen: boolean = true;
    userInfo: UserInfo;
    wall_re: string;
    t: string;
    follower;
    following;
    connection;
    logout;
    userObj = [];
    acceptIdOld = "";
    sendIdOld = "";
    cancelIdOld = "";
    resize_window: boolean = true;
    myinterestList = "";

    @Output() onclickEvent = new EventEmitter();
    @Output() wallDetail = new EventEmitter();
    @Output() sessionLogout = new EventEmitter<boolean>();
    @Input() leftSecWidth: any;
    @Input() acceptId: any;
    @Input() sendId: any;
    @Input() cancelId: any;
    @Output() Question = new EventEmitter<boolean>();
    @Output() showPopup = new EventEmitter();
    @Output() hidePopup = new EventEmitter();

    constructor(
        public _constantService: ConstantService,
        public _router: Router,
        private _location: Location,
        public _encryptionService: EncryptionService,
        private _message: InternalMessageService,
        private activatedRoute: ActivatedRoute,
        private googleAnalyticsService: GoogleAnalyticsService
    ) {
        this.userInfo = new UserInfo();
    }
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        // if (window.innerWidth < 2000 && window.innerWidth > 992){
        //   var innerWindWidth = window.innerWidth - 18;
        //   event.target.innerWidth;
        //   this.resize_window = true;
        //   document.getElementById("windiv").style.width = innerWindWidth + "px";
        // }else{
        //   document.getElementById("windiv").style.width = "100%";
        // }
        if (window.innerWidth < 1200 && window.innerWidth >= 768) {
            var rightwidth = document.getElementById("leftfixed").offsetWidth;
            var rightinnwidth = rightwidth;
            document.getElementById("leftfixmenu").style.width = "100%";
        } else {
            document.getElementById("leftfixmenu").style.width = "100%";
        }
    }
    private checkScreenWidth() {
        // var winwidth = window.innerWidth - 18;
        // if (window.innerWidth < 2000 && window.innerWidth > 992) {
        //
        //     document.getElementById("windiv").style.width = winwidth + "px";
        // } else {
        //     document.getElementById("windiv").style.width = "100%";
        // }
        if (window.innerWidth < 1200 && window.innerWidth >= 768) {
            var rightwidth = document.getElementById("leftfixed").offsetWidth;
            var rightinnwidth = rightwidth;
            document.getElementById("leftfixmenu").style.width = "100%";
        } else {
            document.getElementById("leftfixmenu").style.width = "100%";
        }
    }

    ngDoCheck() {
        if (this.sendId != '' && this.sendId != undefined && this.sendId != this.sendIdOld) {
            this.sendIdOld = this.sendId;
            this.following++;
            //this._constantService.setFollowings(this.following);
            this._constantService.setSessionJsonPair('followings', this.following);
            this.sendId = '';
        }
        if (this.cancelId != '' && this.cancelId != undefined && this.cancelId != this.cancelIdOld) {
            this.cancelIdOld = this.cancelId;
            this.following--;
            //this._constantService.setFollowings(this.following);
            this._constantService.setSessionJsonPair('followings', this.following);
            this.cancelId = '';
        }
        if (this.acceptId != '' && this.acceptId != undefined && this.acceptId != this.acceptIdOld) {
            this.acceptIdOld = this.acceptId;
            this.following++;
            //this._constantService.setFollowings(this.following);
            this._constantService.setSessionJsonPair('followings', this.following);
            this.connection++;
            //this._constantService.setConnection(this.connection);
            this._constantService.setSessionJsonPair('connection', this.connection);
            this.acceptId = '';
        }
        //this.follower = this._constantService.getFollowers();
        this.follower = this._constantService.getSessionDataBYKey('followers');
        //this.following = this._constantService.getFollowings();
        this.following = this._constantService.getSessionDataBYKey('followings');
        this.connection = this._constantService.getSessionDataBYKey('connection');

        var herf = this._router.url;
        if (herf.match('articles')) {
            this.isWallFilter = 1;
        } else if (herf.match('questionforyou')) {
            this.isWallFilter = 2;
        } else if (herf.match('saved')) {
            this.isWallFilter = 3;
        } else if (herf.match('interest')) {
            this.isWallFilter = 4;
        } else if (herf.match('live-classes')) {
            this.isWallFilter = 5;
        } else if (herf.match('all')) {
            this.isWallFilter = 0;
        }
    }

    ngOnInit() {

        this.checkScreenWidth();
        this.myProfile = this._constantService.getSessionDataBYKey('my_profile');
        //this.userNetworkCount();
        this.t = this._constantService.getSessionDataBYKey('token');
        if (this.t != null && this.t != undefined && this.t != '') {
            this.setUserInfo();

        } else {
            this._router.navigate(['']);
        }
        this._location.subscribe(() => this.back())
    }


    back() {
        this.activatedRoute.params.subscribe((params: Params) => {
            console.log(params);
        });
    }


    setUserInfo() {       
                this.loaderscreen = false;
                this.userInfo.full_name = this._constantService.getSessionDataBYKey('full_name');
                this.userInfo.uname = this._constantService.getSessionDataBYKey('username');
                
                this.userInfo.profile_pic_path = this._constantService.profilePic();
               
    }

    updateSourcePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }

    createpagePopupShow: boolean = false;

    createpageopenpopup() {
        this.createpagePopupShow = true;
        let body1 = document.getElementsByTagName('body')[0];
        body1.classList.add("body-overflow");
    }



    closeCreatePagePopup(event) {
        //alert(event);
        this.createpagePopupShow = event;
    }

    QuestionForYou() {
        this.Question.emit(true);

    }


    showPageCreatePopup() {
        this.googleAnalyticsService.eventEmitter(
            "web_Access",
            "web_Activity",
            "web_Create a Page",
            "web_Access", 0
        );
        this.showPopup.emit(true);
        console.log("show create popups");
    }
    hidePageCreatePopup() {
        this.hidePopup.emit(false);
    }

    articleFilter() {
        //      this._message.setWallFilter(1);
        this.googleAnalyticsService.eventEmitter(
            "web_Access",
            "web_Activity",
            "web_Articles",
            "web_Access", 0
        );
        // this.onclickEvent.emit("newsfeed");
        setTimeout(() => {
            this._router.navigate(['/home/articles'], { queryParams: { filter: 'articles' } });

        }, 200);
    }
    toggleShowHide(index) {
        console.log('interestList1');

        var myinterestList = document.getElementById('interestshow');
        console.log(myinterestList);

        //var interestmenutoggle = document.getElementById("interestmenuup_"+index);
        if (myinterestList.classList.contains('show')) {
            myinterestList.classList.remove('show');
        } else {
            myinterestList.classList.add('show');
        }
        //   if (interestmenutoggle.classList.contains('glyphicon-menu-up')) {
        //    interestmenutoggle.classList.remove('glyphicon-menu-up');
        //  } else {
        // interestmenutoggle.classList.add('glyphicon-menu-up');
        // }
    }

    routTo(endpoint) {
        var filter = 0;
        if (endpoint == 'questionforyou') {
            this.googleAnalyticsService.eventEmitter(
                "web_Access",
                "web_Activity",
                "web_Questions",
                "web_Access", 0
            );
            filter = 2;

        }
        if (endpoint == 'interests') {
            this.googleAnalyticsService.eventEmitter(
                "web_Access",
                "web_Activity",
                "web_Interests",
                "web_Access", 0
            );
            filter = 4;

        }

        if (endpoint == 'saved') {
            filter = 3;
        }
        if (endpoint == 'interests') {
            filter = 4
        }

        this._router.navigate(['home/' + endpoint], { queryParams: { filter: filter } });
        // window.location.replace(endpoint);

    }
    emit(clickedValue) {
        this.onclickEvent.emit({ clicked: clickedValue });
    }
}
