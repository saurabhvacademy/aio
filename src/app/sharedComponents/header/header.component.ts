import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, AfterViewChecked, ViewChild, ElementRef, HostListener, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EncryptionService } from './../../services/encryption.service';
import { ConstantService } from './../../services/constant.service';
import { PostdataService } from './../../services/postdata.service';
import { CookieService } from 'ngx-cookie-service';
import { GoogleAnalyticsService } from 'src/app/services/google-analytics.service';
import { CommonEmitterService } from 'src/app/services/common-emitter.service';
declare var $: any;


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    providers: [],
    styleUrls: ['./headerSearch.component.scss', './header.component.scss', './../peopleyouknow/peopleyouknow.component.scss', './newheader.component.scss'],
    // host: {
    //     '(window:scroll)': 'onScroll($event)',
    //     '(document:click)': 'handleClick($event)'
    // }

})
export class HeaderComponent implements OnInit, AfterViewInit {
    deviceType: number = 0;
    username: any;
    searchCoursePresent: boolean;
    myTimerM: any;
    myTimerN: any;
    myTimerC: any;
    tab: number;
    searchButtonStatus: boolean;
    empty: boolean = false;
    dataConf = {};
    openConfirmation: boolean = false;
    typeId: any;
    TypeId: any;
    unreadCount: any;
    showAccepted: boolean = false;
    recentSearch = [];
    // recentvalues = [];
    activCross: boolean = false;
    activeMenuCond: boolean = false;
    serachResponsiveView: boolean = false;
    @Input() showSearchList=true;
    @Input() showStudyIndiaFoundationLogo = false;
    @Input() hideInterestDropdown = true;

    // showNotification = false;
    // showMessage = false;
    @ViewChild('messageIcon', { read: ElementRef }) messageIcon: ElementRef;
    @ViewChild('connectionIcon', { read: ElementRef }) connectionIcon: ElementRef;
    @ViewChild('notificationIcon', { read: ElementRef }) notificationIcon: ElementRef;
    @ViewChild('header', { read: ElementRef }) header: ElementRef;
    @ViewChild('notificationView', { read: ElementRef }) notificationView: ElementRef;
    @ViewChild('messageView', { read: ElementRef }) messageView: ElementRef;
    @ViewChild('connectionView', { read: ElementRef }) connectionView: ElementRef;
    @ViewChild('connectionListView', { read: ElementRef }) connectionListView: ElementRef;
    @ViewChild('searchDiv', { read: ElementRef }) searchDiv: ElementRef;
    @Input() profile_picPath: string;
    @Input() user_id: string;
    @Input() registerPopup: boolean;
    @Output() sessionLogout = new EventEmitter<boolean>();
    @Output() acceptId = new EventEmitter();
    @Output() tabemit = new EventEmitter<number>();
    @Input() showBrowseTest = false;
    data;
    connectionRequestCount: number;
    connectionRequestStatus: boolean = false;
    showif = 1;
    showConnectionReq = false;
    img_path = "";
    timer = null;
    searchInput = "";
    post_ids = [];
    user_ids = [];
    page_ids = [];
    course_ids = [];
    searched_user = [];
    searched_post = [];
    searched_page = [];
    searched_course = [];
    searchUserPresent: boolean = false;
    searchPostPresent: boolean = false;
    searchPagePresent: boolean = false;
    noResult: boolean = false;
    connectionReqIds;
    trails = [];
    showMsgEmptyState: boolean = false;
    unreadMsgCount: any;
    unreadMsgStatus: boolean = false;
    unreadnotCount: any;
    unreadRequestCount: any;
    unreadNotStatus: boolean = false
    profile_path: string = "";
    notification = [];
    t: string;
    logout;
    showbg: boolean = false;
    date = new Date();
    searchButtonActive: boolean = false;
    resize_windowhead: boolean = true;
    config: any;
    searchdrop = false;
    selectedHeaderdropdown = -1;
    showAppCntrlBtn = false;
    searchTab: number = 0;
    cookieValue: string = '';
    searchData: any;
    emptystate: boolean = false;
    profileImageUrl: string;
    messageBoolean:boolean;


    constructor(
        public _encryptionService: EncryptionService,
        public _constantService: ConstantService,
        public _router: Router,
        public postData: PostdataService,
        public activatedRoute: ActivatedRoute,
        public _cookie: CookieService,
        private changeDetector: ChangeDetectorRef,
        private googleAnalyticsService: GoogleAnalyticsService,
        private commonEmitterService: CommonEmitterService
    ) {
        window.scrollTo(0, 0);
        this.commonEmitterService.profileImageUpdatedEmitter.subscribe(isUpdated=>{
            if(isUpdated){
                this._constantService.date = new Date();
                this.profileImageUrl = this._constantService.getSessionDataBYKey('p_pic');                    
            }
        })
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (window.innerWidth < 2000 && window.innerWidth > 992) {
            var innerWindWidth = window.innerWidth - 18;
            event.target.innerWidth;
            this.resize_windowhead = true;
            document.getElementById("someDivhead").style.width = innerWindWidth + "px";
        } else {
            document.getElementById("someDivhead").style.width = "100%";
        }

    }
    private checkScreenWidth() {
        var winwidth = window.innerWidth - 18;
        if (window.innerWidth < 2000 && window.innerWidth > 992) {

            document.getElementById("someDivhead").style.width = winwidth + "px";
        } else {
            document.getElementById("someDivhead").style.width = "100%";
        }
        if (window.innerWidth < 901) {
            this.hideInterestDropdown = true;
        }
    }

    searchIconClick() {
        this.searchButtonStatus = true;
    }

    searchdropdown() {
        this.searchdrop = !this.searchdrop;
    }

    toggleHeaderDropdown(index) {

        if (this.selectedHeaderdropdown == index) {
            this.selectedHeaderdropdown = -1;
        }
        else {
            this.selectedHeaderdropdown = index;
        }
        if (this.selectedHeaderdropdown == 1) {
            this.get10userNotification();
        }
    }

    focusOut() {
        this.selectedHeaderdropdown = 0;
    }

    handleClick(event) {
        var clickedComponent = event.target;
        var headerInside = 0;
        var insideNotification = 0;
        var insideMessage = 0;
        var insideConnection = 0;
        var headerIconClicked = 0;
        do {
            if (clickedComponent === this.notificationView.nativeElement) {
                insideNotification = 1;
            }
            else if (clickedComponent === this.messageView.nativeElement) {
                insideMessage = 1;
            }
            else if (clickedComponent === this.connectionView.nativeElement) {
                insideConnection = 1;
            }

            if (clickedComponent === this.messageIcon.nativeElement || clickedComponent === this.connectionIcon.nativeElement || clickedComponent === this.notificationIcon.nativeElement) {
                headerIconClicked = 1;
            }

            if (clickedComponent === this.searchDiv.nativeElement) {
                headerInside = 2;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);

        if (this.selectedHeaderdropdown == 1) {
            if (insideNotification != 1 && headerIconClicked == 0) {
                this.selectedHeaderdropdown = -1;
            }
        }
        else if (this.selectedHeaderdropdown == 2) {
            if (insideMessage != 1 && headerIconClicked == 0) {
                this.selectedHeaderdropdown = -1;
            }
        }
        else if (this.selectedHeaderdropdown == 3) {
            if (insideConnection != 1 && headerIconClicked == 0) {
                this.selectedHeaderdropdown = -1;
            }
        }

        if (headerInside != 1) {
            this.searchdrop = false;
        }
    }

    ngOnInit() {
        this._cookie.delete('publicClickedURL');

        if (!this._cookie.get('study247')) {
            // this._cookie.set('study247', this._encryptionService.encrypt(this._constantService.getSessionDataBYKey('token')));
            document.cookie = "study247=aio";

        }
        if (/Android/i.test(navigator.userAgent)) {
            console.log("Android");
            this.deviceType = 1;
        } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            console.log("IOS");
            this.deviceType = 2;
        } else {
            this.deviceType = 0;
        }


        this.t = this._constantService.getSessionDataBYKey('token');

        if (this.t != null && this.t != undefined && this.t != '') {
            this.getUserStatus('');

            this.activatedRoute.params.subscribe((params: Params) => {
                let url = window.location.href;
                let urlArr = url.split('/');
                //to stop 'Open in app' responsive button on Question for you, by Lxy
                if (url.includes('questionforyou')) {
                    this.deviceType = 0;
                }

                let isSearch = urlArr.includes('searchresult');
                if (params['id'] && isSearch) {
                    this.searchInput = params['id'];
                }
            });
        }

        this.myTimerM = setInterval(() => {
            this.getUserStatus('');
        }, 450000);
        this.getrecent();
        this.checkScreenWidth();
        this.profileImageUrl = this._constantService.getSessionDataBYKey('p_pic');
    }
    onScroll(evt) {
        this.showScrollButton();
    }
    showScrollButton() {
        if (window.pageYOffset < 200) {
            // document.getElementById("AppId"  ).style.display = "none";
            this.showAppCntrlBtn = false;
        }
        else {
            // document.getElementById("AppId").style.display = "block";
            this.showAppCntrlBtn = true;
        }
    }
    ngOnDestroy() {
        this.stopTimer();
    }

    stopTimer() {
        clearInterval(this.myTimerM);
        clearInterval(this.myTimerN);
        clearInterval(this.myTimerC);
    }

    ngAfterViewInit() {
        this.profileImageUrl = this._constantService.getSessionDataBYKey('p_pic'); 
        this.img_path = this.profile_picPath + "profile/" + this.user_id + "26x26.png";
        $(document).bind('click', this, function () {
            this.searchdrop = false;
        });
        setTimeout(() => {
            this.username = this._constantService.getSessionDataBYKey('username');
        }, 2000)
        this.checkScreenWidth();
    }

    public message = [];

    public request = [];

    getUserStatus(typ) {
        var userStatus = {};
        userStatus['token'] = this._constantService.getSessionDataBYKey('token');
        userStatus['token_param'] = {};
        userStatus['token_param']['device_type'] = "w";
        userStatus['token_param']['host'] = "";
        userStatus['type'] = typ;



        if (!userStatus['token']) {
            return;
        }

        this._constantService.fetchDataApi(this._constantService.getUserStatusServiceUrl(), userStatus).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                var userStatus = responseData.USER_STATUS;
                if ((typ == '' || typ == 'N') && userStatus.NOTIFICATION_STATUS != 0 && userStatus.NOTIFICATION_STATUS != null) {
                    this.unreadNotStatus = true;
                    if (userStatus.NOTIFICATION_STATUS <= 99) {
                        this.unreadnotCount = userStatus.NOTIFICATION_STATUS;
                    } else if (userStatus.NOTIFICATION_STATUS > 99) {
                        this.unreadnotCount = '99+';
                    }
                }
                if ((typ == '' || typ == 'M') && userStatus.MESSAGE_STATUS != 0 && userStatus.MESSAGE_STATUS != null) {
                    this.unreadMsgStatus = true;
                    if (userStatus.MESSAGE_STATUS <= 99) {
                        this.unreadMsgCount = userStatus.MESSAGE_STATUS;
                    } else if (userStatus.MESSAGE_STATUS > 99) {
                        this.unreadMsgCount = '99+';
                    }
                }
                if ((typ == '' || typ == 'C') && userStatus.CONNECTIONS_STATUS != 0 && userStatus.CONNECTIONS_STATUS != null) {
                    this.connectionRequestStatus = true;
                    if (userStatus.CONNECTIONS_STATUS <= 99) {
                        this.unreadRequestCount = userStatus.CONNECTIONS_STATUS;
                    } else if (userStatus.CONNECTIONS_STATUS > 99) {
                        this.unreadRequestCount = '99+';
                    }
                }
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
        })
    };

    allSeenNotify() {
        var allSeen = {};
        allSeen['token'] = this._constantService.getSessionDataBYKey('token');
        allSeen['token_param'] = {};
        allSeen['token_param']['device_type'] = "w";
        allSeen['token_param']['host'] = "";
        allSeen['pg_uuid'] = "";


        this._constantService.fetchDataApi(this._constantService.getAllNotificationUpdateSeenServiceUrl(), allSeen).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.unreadnotCount = 0;

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

  


    closePopup(event) {
        if (event['error'] == false) {
            this.openConfirmation = false;
        }
    }
    get10ConnectionRequestList() {
        this.connectionRequestStatus = false;
        var connReqList = {};
        connReqList['token'] = this._constantService.getSessionDataBYKey('token');
        connReqList['token_param'] = {};
        connReqList['token_param']['device_type'] = 'w';
        connReqList['token_param']['host'] = '';


        this._constantService.fetchDataApi(this._constantService.get10ConnReqServiceUrl(), connReqList).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.connectionRequestCount = responseData.CONIDS.length;
                var conids = responseData.CONIDS;
                if (this.connectionRequestCount == 0) {
                    this.showif = 2;
                } else {
                    this.showif = 1;
                    this.get10ConnReqDetails(conids.join());
                }
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = "responseData.ERROR_MSG";
                this.openConfirmation = true;
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });

    }

    clickedOnLeaderBoard() {
        this.googleAnalyticsService.eventEmitter(
            "web_Clicked",
            "web_Login",
            "web_Login",
            "web_web_Clicked", 0
        );
        this._router.navigate(['/leaderboard']);
    }

    get10ConnReqDetails(ids: string) {
        var connDetails = {};
        connDetails['token'] = this._constantService.getSessionDataBYKey('token');
        connDetails['token_param'] = {};
        connDetails['token_param']['device_type'] = 'w';
        connDetails['token_param']['host'] = '';
        connDetails['fid'] = ids;



        this._constantService.fetchDataApi(this._constantService.getConnectionDetailsServiceUrl(), connDetails).subscribe(data => {
            this.data = data["_body"];
            let responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.request = responseData.FRIENDS_DETAIL;
                this.connectionRequestCount = this.request.length;
                if (this.request.length != 0) {
                    this.showif = 1;
                }
                for (var i = 0; i < this.request.length; i++) {
                    this.request[i].IS_ACCEPTED = false;
                    this.request[i].LAST_ACTIVE_TIME = this.postData.getPostDateTime(this.request[i].LAST_ACTIVE_TIME);
                    if (this.request[i].PROFILE_PHOTO_PATH != null && this.request[i].PROFILE_PHOTO_PATH != "") {
                        this.request[i].PROFILE_PHOTO_PATH = this.request[i].PROFILE_PHOTO_PATH + "profile/" + this.request[i].USER_ID + "_60x60.png";
                        this.request[i].FULL_NAME = this.request[i].FIRST_NAME + " " + this.request[i].LAST_NAME;
                    } else {
                        this.request[i].PROFILE_PHOTO_PATH = this._constantService.defaultImgPath;
                        this.request[i].FULL_NAME = this.request[i].FIRST_NAME + " " + this.request[i].LAST_NAME;
                    }
                }
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });

    }

    updateConnreqAccpt(event, i) {
        var tid = 3;
        var updConnRecAccpt = {};
        var target = event.currentTarget;
        var idAttr = target.attributes.id;
        updConnRecAccpt['token'] = this._constantService.getSessionDataBYKey('token');
        updConnRecAccpt['token_param'] = {};
        updConnRecAccpt['token_param']['device_type'] = 'w';
        updConnRecAccpt['token_param']['host'] = '';
        updConnRecAccpt['conrecid'] = idAttr.nodeValue;
        var id = "connReq_" + idAttr.nodeValue;

        this._constantService.fetchDataApi(this._constantService.updateConnRecAcceptServiceUrl(), updConnRecAccpt).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this.toggleHeaderDropdown(tid);
                if (this._constantService.getFriendsId() != '' && this._constantService.getFriendsId() != null) {
                    var f_id = this._constantService.getFriendsId().split(",");
                    f_id.push(idAttr.nodeValue);
                    this._constantService.setFriendsId(f_id.toString());
                } else {
                    this._constantService.setFriendsId(idAttr.nodeValue.toString());
                }
                this.acceptId.emit(this.request[i].USER_ID);
                this.connectionRequestCount = this.connectionRequestCount - 1;
                //(<HTMLElement> document.getElementById(id)).style.display = "none";
                // this.request.splice(i, 1);
                this.request[i].IS_ACCEPTED = true;
                if (this.request.length == 0) {
                    this.get10ConnectionRequestList();
                }
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = "responseData.ERROR_MSG1";
                this.openConfirmation = true;
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }


    requests(event, i) {
        var updConnRecAccpt = {};
        var tid = 3;
        var target = event.currentTarget;
        var idAttr = target.attributes.id;
        updConnRecAccpt['token'] = this._constantService.getSessionDataBYKey('token');
        updConnRecAccpt['token_param'] = {};
        updConnRecAccpt['token_param']['device_type'] = 'w';
        updConnRecAccpt['token_param']['host'] = '';
        updConnRecAccpt['conrecid'] = idAttr.nodeValue;
        var id = "connReq_" + idAttr.nodeValue;

        this._constantService.fetchDataApi(this._constantService.updateConnRecRejectServiceUrl(), updConnRecAccpt).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //  this.toggleHeaderDropdown(tid);
                this.connectionRequestCount = this.connectionRequestCount - 1;
                // (<HTMLElement> document.getElementById(id)).style.display = "none";
                this.request.splice(i, 1);
                if (this.request.length == 0) {
                    this.get10ConnectionRequestList();
                }
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
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




    search(e) {
        if (e.keyCode != 8 && e.keyCode != 13) {
            clearTimeout(this.timer);
            var router = this._router;
            var post_ids = "";
            var user_ids = "";
            var friendsDetails;
            this.timer = setTimeout(this.searchText.bind(this), 1000);
        } else if (e.keyCode == 13) {
            this.navToSearch();
        }

    }

    searchText() {
        var search = {};
        var data = this.searchInput.trim();

        if (data.length < 3) {
            return false;
        }
        search['token'] = this._constantService.getSessionDataBYKey('token');
        search['token_param'] = {};
        search['token_param']['device_type'] = 'w';
        search['token_param']['host'] = '';
        search['sdt'] = data;

        this.setrecent(data);
        this._constantService.fetchDataApi(this._constantService.getSearchWall10ServiceUrl(), search).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.searchTab = 2;
                console.log(responseData);
                // this.post_ids = responseData.SEARCHED_PID;
                // this.user_ids = responseData.SEARCHED_UID;
                // this.page_ids = responseData.SEARCHED_PAGEID;
                // this.course_ids = responseData.SEARCHED_CORSID;
                this.searched_user = [];
                this.searched_post = [];
                this.searched_page = [];
                this.searched_course = [];
                this.searchUserPresent = false;
                this.searchPostPresent = false;
                this.searchPagePresent = false;
                this.searchCoursePresent = false;
                // if (this.user_ids.length == 0 && this.post_ids.length == 0 && this.page_ids.length == 0 && this.course_ids.length == 0) {
                //     this.searchdrop = true;
                //     this.noResult = true;
                // } else {
                //     this.noResult = false;
                // }


                this.searchData = responseData.SEARCH_DATA;
                if (this.searchData) {
                    console.log(this.searchData);
                    for (var i = 0; i < this.searchData.length; i++) {
                        if (this.searchData[i].ID == 3) {
                            if (this.searchData[i].USER_DATA.length != 0) {
                                this.searched_user = [];

                                this.searched_user = this.searchData[i].USER_DATA;
                                for (var j = 0; j < this.searched_user.length; j++) {
                                    this.searched_user[j].FULL_NAME = this.searched_user[j].FIRST_NAME + " " + this.searched_user[j].LAST_NAME;
                                    if (this.searched_user[j].PROFILE_PHOTO_PATH != null) {
                                        this.searched_user[j].PROFILE_PHOTO_PATH = this.searched_user[j].PROFILE_PHOTO_PATH + "profile/" + this.searched_user[j].USER_ID + "_60x60.png";
                                    } else {
                                        this.searched_user[j].PROFILE_PHOTO_PATH = this._constantService.defaultImgPath;
                                    }
                                }
                                console.log(this.searched_user)
                            }
                        }
                        if (this.searchData[i].ID == 4) {
                            if (this.searchData[i].PAGE_DATA.length != 0) {
                                this.searched_page = [];

                                this.searched_page = this.searchData[i].PAGE_DATA;
                                for (var j = 0; j < this.searched_page.length; j++) {
                                    this.searched_page[j].TITLE = this.postData.decodeURIPostData(this.searched_page[j].TITLE);
                                    if (this.searched_page[j].PROFILE_PHOTO_PATH != null) {
                                        this.searched_page[j].PROFILE_PHOTO_PATH = this.searched_page[j].PROFILE_PHOTO_PATH + "profile/" + this.searched_page[j].PAGE_UUID + "_120x120.png";
                                    } else {
                                        if (this.searched_page[j].TYPE == 0) {
                                            this.searched_page[j].PROFILE_PHOTO_PATH = this._constantService.defaultPageIndImgPath;
                                        } else {
                                            this.searched_page[j].PROFILE_PHOTO_PATH = this._constantService.defaultPageCollgImgPath;
                                        }
                                    }
                                    if (this.searched_page[j].PAGE_NAME != null) {
                                        this.searched_page[j].ID = this.postData.decodeURIPostData(this.searched_page[j].PAGE_NAME);
                                    } else {
                                        this.searched_page[j].ID = this.postData.decodeURIPostData(this.searched_page[j].PAGE_UUID);
                                    }
                                }
                                console.log(this.searched_page);
                            }
                        }
                        if (this.searchData[i].ID == 1) {
                            if (this.searchData[i].COURSE_DATA.length != 0) {
                                this.searched_course = [];

                                this.searched_course = this.searchData[i].COURSE_DATA;
                                for (var j = 0; j < this.searched_course.length; j++) {
                                    this.searched_course[j].COURSE_TITLE = this.postData.decodeURIPostData(this.searched_course[j].COURSE_TITLE);
                                    //  this.searched_course[i].PAGE_NAME = this.searched_course[i].PAGE_TITLE ;
                                    if (this.searched_course[j].COVER_PHOTO_PATH != null) {
                                        if (this.searched_course[j].COVER_TYPE == 0) {
                                            this.searched_course[j].COVER_PHOTO_PATH = this.searched_course[j].COVER_PHOTO_PATH + "cover/" + this.searched_course[j].COURSE_UUID + "_1235x330.png";
                                        }
                                    } else {
                                        this.searched_course[j].COVER_PHOTO_PATH = this._constantService.defaultCoverImgPath;
                                    }
                                    var x = this.searched_course[j].COURSE_TAGS;
                                    if (x) {
                                        x = x.replace(/,/g, ", ");
                                        this.searched_course[j].COURSE_TAGS = this.postData.decodeURIPostData(x);
                                    }
                                }
                                console.log(this.searched_user)
                            }
                        }
                        // if(this.searchData[i].ID == 2){
                        //     if(this.searchData[i].POST_DATA.length !=0 ){
                        //       this.searched_post = [];
                        //
                        //       this.searched_post = this.searched_post[i].POST_DATA;
                        //       for (var j = 0; j < this.searched_post.length; j++) {
                        //         if (this.searched_post[j].TEXT != null) {
                        //             this.searched_post[j].TEXT = this.postData.decodeURIPostData(this.searched_post[j].TEXT);
                        //         }
                        //         if (this.searched_post[j].PAGE_UUID) {
                        //             if (this.searched_post[j].PAGE_PROFILE_PHOTO_PATH != null) {
                        //                 this.searched_post[j].PROFILE_PHOTO_PATH = this.searched_post[j].PAGE_PROFILE_PHOTO_PATH + "profile/" + this.searched_post[j].PAGE_UUID + "_60x60.png";
                        //             } else {
                        //                 if (this.searched_post[j].PAGE_TYPE == 0) {
                        //                     this.searched_post[j].PROFILE_PHOTO_PATH = this._constantService.defaultPageIndImgPath;
                        //                 } else if (this.searched_post[j].PAGE_TYPE == 1) {
                        //                     this.searched_post[j].PROFILE_PHOTO_PATH = this._constantService.defaultPageCollgImgPath;
                        //                 }
                        //             }
                        //
                        //             this.searched_post[j].USER_FULL_NAME = this.postData.decodeURIPostData(this.searched_post[j].TITLE);
                        //         } else {
                        //             if (this.searched_post[j].PROFILE_PHOTO_PATH != null) {
                        //                 this.searched_post[j].PROFILE_PHOTO_PATH = this.searched_post[j].PROFILE_PHOTO_PATH + "profile/" + this.searched_post[j].USER_ID + "_60x60.png";
                        //             } else {
                        //                 this.searched_post[j].PROFILE_PHOTO_PATH = this._constantService.defaultImgPath;
                        //             }
                        //         }
                        //
                        //       }
                        //       console.log(this.searched_user)
                        //     }
                        //  }
                    }
                    if (this.searched_user.length == 0 && this.searched_page.length == 0 && this.searched_course.length == 0) {
                        console.log("user" + this.searched_user.length);
                        console.log("page" + this.searched_page.length);
                        console.log("searched_course" + this.searched_course.length);
                        console.log("in true");
                        this.emptystate = true;
                    } else {
                        console.log("in false");
                        this.emptystate = false;
                    }
                }


                if (this.user_ids.length != 0) {
                    // this.getSearchUserDetails(this.user_ids.join());
                    // this.searched_user = [];
                    // this.searched_user = responseData.FRIENDS_DETAIL;
                    // for (var i = 0; i < this.searched_user.length; i++) {
                    //     this.searched_user[i].FULL_NAME = this.searched_user[i].FIRST_NAME + " " + this.searched_user[i].LAST_NAME;
                    //     if (this.searched_user[i].PROFILE_PHOTO_PATH != null) {
                    //         this.searched_user[i].PROFILE_PHOTO_PATH = this.searched_user[i].PROFILE_PHOTO_PATH + "profile/" + this.searched_user[i].USER_ID + "_60x60.png";
                    //     } else {
                    //         this.searched_user[i].PROFILE_PHOTO_PATH = this._constantService.defaultImgPath;
                    //     }
                    // }
                }
                if (this.post_ids.length != 0) {
                    this.getSearchPostData(this.post_ids.join());
                }
                if (this.page_ids.length != 0) {
                    this.getSearchPageDetails(this.page_ids.join());
                }
                if (this.course_ids.length != 0) {
                    this.getCourseData4Srch(this.course_ids.join());
                }

            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = "responseData.ERROR_MSG2";
                this.openConfirmation = true;
            }

        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });

    }

    getCourseData4Srch(ids: string) {

        var connDetails = {};
        connDetails['token'] = this._constantService.getSessionDataBYKey('token');
        connDetails['token_param'] = {};
        connDetails['token_param']['device_type'] = 'w';
        connDetails['token_param']['host'] = '';
        connDetails['cors_uuids'] = ids;



        this._constantService.fetchDataApi(this._constantService.getCourseData4Srch(), connDetails).subscribe(data => {
            this.data = data["_body"];
            let responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.searchdrop = true;
                this.searchCoursePresent = true;
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.searched_course = [];
                this.searched_course = responseData.COURSE_DATA;

                for (var i = 0; i < this.searched_course.length; i++) {
                    this.searched_course[i].COURSE_TITLE = this.postData.decodeURIPostData(this.searched_course[i].COURSE_TITLE);
                    //  this.searched_course[i].PAGE_NAME = this.searched_course[i].PAGE_TITLE ;
                    if (this.searched_course[i].COVER_PHOTO_PATH != null) {
                        if (this.searched_course[i].COVER_TYPE == 0) {
                            this.searched_course[i].COVER_PHOTO_PATH = this.searched_course[i].COVER_PHOTO_PATH + "cover/" + this.searched_course[i].COURSE_UUID + "_1235x330.png";
                        }
                    } else {
                        this.searched_course[i].COVER_PHOTO_PATH = this._constantService.defaultCoverImgPath;
                    }
                    var x = this.searched_course[i].COURSE_TAGS;
                    if (x) {
                        x = x.replace(/,/g, ", ");
                        this.searched_course[i].COURSE_TAGS = this.postData.decodeURIPostData(x);
                    }
                }

            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    getSearchUserDetails(ids: string) {

        var connDetails = {};
        connDetails['token'] = this._constantService.getSessionDataBYKey('token');
        connDetails['token_param'] = {};
        connDetails['token_param']['device_type'] = 'w';
        connDetails['token_param']['host'] = '';
        connDetails['fid'] = ids;


        this._constantService.fetchDataApi(this._constantService.getConnectionDetailsServiceUrl(), connDetails).subscribe(data => {
            this.data = data["_body"];
            let responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.searchdrop = true;
                this.searchUserPresent = true;
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.searched_user = [];
                this.searched_user = responseData.FRIENDS_DETAIL;
                for (var i = 0; i < this.searched_user.length; i++) {
                    this.searched_user[i].FULL_NAME = this.searched_user[i].FIRST_NAME + " " + this.searched_user[i].LAST_NAME;
                    if (this.searched_user[i].PROFILE_PHOTO_PATH != null) {
                        this.searched_user[i].PROFILE_PHOTO_PATH = this.searched_user[i].PROFILE_PHOTO_PATH + "profile/" + this.searched_user[i].USER_ID + "_60x60.png";
                    } else {
                        this.searched_user[i].PROFILE_PHOTO_PATH = this._constantService.defaultImgPath;
                    }
                }
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }


    getSearchPostData(post_ids) {

        var searchPostData = {};
        searchPostData['token'] = this._constantService.getSessionDataBYKey('token');
        searchPostData['token_param'] = {};
        searchPostData['token_param']['device_type'] = 'w';
        searchPostData['token_param']['host'] = '';
        searchPostData['pid'] = post_ids;


        this._constantService.fetchDataApi(this._constantService.getSearchPostDataServiceUrl(), searchPostData).subscribe(data => {
            let responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.searchdrop = true;
                this.searchPostPresent = true;
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.searched_post = [];
                this.searched_post = responseData.POST_DATA;
                for (var i = 0; i < this.searched_post.length; i++) {

                    if (this.searched_post[i].TEXT != null) {
                        this.searched_post[i].TEXT = this.postData.decodeURIPostData(this.searched_post[i].TEXT);
                    }
                    if (this.searched_post[i].PAGE_UUID) {
                        if (this.searched_post[i].PAGE_PROFILE_PHOTO_PATH != null) {
                            this.searched_post[i].PROFILE_PHOTO_PATH = this.searched_post[i].PAGE_PROFILE_PHOTO_PATH + "profile/" + this.searched_post[i].PAGE_UUID + "_60x60.png";
                        } else {
                            if (this.searched_post[i].PAGE_TYPE == 0) {
                                this.searched_post[i].PROFILE_PHOTO_PATH = this._constantService.defaultPageIndImgPath;
                            } else if (this.searched_post[i].PAGE_TYPE == 1) {
                                this.searched_post[i].PROFILE_PHOTO_PATH = this._constantService.defaultPageCollgImgPath;
                            }
                        }

                        this.searched_post[i].USER_FULL_NAME = this.postData.decodeURIPostData(this.searched_post[i].TITLE);
                    } else {
                        if (this.searched_post[i].PROFILE_PHOTO_PATH != null) {
                            this.searched_post[i].PROFILE_PHOTO_PATH = this.searched_post[i].PROFILE_PHOTO_PATH + "profile/" + this.searched_post[i].USER_ID + "_60x60.png";
                        } else {
                            this.searched_post[i].PROFILE_PHOTO_PATH = this._constantService.defaultImgPath;
                        }
                    }
                }
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    getLatestMessageTrails() {
        this.unreadMsgStatus = false;
        var messageTrail = {};
        messageTrail['token'] = this._constantService.getSessionDataBYKey('token');
        messageTrail['token_param'] = {};
        messageTrail['token_param']['device_type'] = 'w';
        messageTrail['token_param']['host'] = '';
        messageTrail['funame'] = "";
        messageTrail['count'] = 1;
        messageTrail['page_uuid'] = "";



        this._constantService.fetchDataApi(this._constantService.get10MessageTrailServiceUrl(), messageTrail).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.message = responseData.LTST_TRAIL;
                this.unreadMsgCount = responseData.TOTAL_UNREAD_MSG;
                for (var i = 0; i < this.message.length; i++) {
                    this.message[i].MESSAGE = this.postData.decodeURIPostData(this.message[i].MESSAGE);
                    //                    this.message[i].PROFILE_PHOTO_PATH = this.message[i].PROFILE_PHOTO_PATH+"profile/"+this.message[i].USER_ID+"_60x60.png";

                    if (this.message[i].IS_PAGE == null) {
                        if (this.message[i].PROFILE_PHOTO_PATH != null && this.message[i].PROFILE_PHOTO_PATH != "") {
                            this.message[i].PROFILE_PHOTO_PATH = this.message[i].PROFILE_PHOTO_PATH + "profile/" + this.message[i].USER_ID + "_60x60.png";
                        } else {
                            this.message[i].PROFILE_PHOTO_PATH = this._constantService.defaultImgPath;
                        }
                    } else {
                        if (this.message[i].PAGE_PROFILE_PHOTO_PATH != null && this.message[i].PAGE_PROFILE_PHOTO_PATH != "") {
                            this.message[i].PROFILE_PHOTO_PATH = this.message[i].PAGE_PROFILE_PHOTO_PATH + "profile/" + this.message[i].PAGE_UUID + "_60x60.png";
                        } else {
                            if (this.message[i].TYPE == 0) {
                                this.message[i].PROFILE_PHOTO_PATH = this._constantService.defaultPageIndImgPath;
                            } else if (this.message[i].TYPE == 1) {
                                this.message[i].PROFILE_PHOTO_PATH = this._constantService.defaultPageCollgImgPath;
                            }
                        }
                        this.message[i].USER_FULL_NAME = this.postData.decodeURIPostData(this.message[i].PAGE_TITLE);
                    }

                    if (this.message[i].STATUS == 1) {
                        this.message[i].UNREAD = 'unread_mass';
                    } else {
                        this.message[i].UNREAD = '';
                    }
                }
                if (this.message.length == 0) {
                    this.showMsgEmptyState = true;
                }

                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = "responseData.ERROR_MSG3";
            } this.openConfirmation = true;
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    get10userNotification() {
        this.unreadNotStatus = false;
        var notification = {};
        notification['token'] = this._constantService.getSessionDataBYKey('token');
        notification['token_param'] = {};
        notification['token_param']['device_type'] = "w";
        notification['token_param']['host'] = '';
        notification['pg_uuid'] = '';


        this._constantService.fetchDataApi(this._constantService.get10NotificationServiceUrl(), notification).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            this.TypeId = responseData.TYPE_ID;
            this.profile_path = responseData.PP_PATH;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.TypeId = responseData.TYPE_ID;
                this.notification = responseData.NOTIFICATIONS;
                for (var i = 0; i < this.notification.length; i++) {

                    this.notification[i].TEXT = this.postData.decodeURIPostData(this.notification[i].TEXT);

                    if (this.notification[i].SEEN == 0) {
                        this.notification[i].STATUS_CLASS = "unread_mass";
                    } else {
                        this.notification[i].STATUS_CLASS = "";
                    }
                    if (this.notification[i].TYPE === "System Update") {
                        this.notification[i].CLASS = "nf-interest";
                    } else if (this.notification[i].TYPE === "Question" || this.notification[i].TYPE === "Question Response") {
                        this.notification[i].CLASS = "nf-ques";
                    } else if (this.notification[i].TYPE === "Post") {
                        this.notification[i].CLASS = "nf-post";
                    } else if (this.notification[i].TYPE === "Connection") {
                        this.notification[i].CLASS = "nf-con-req";
                    } else if (this.notification[i].TYPE === "Registration") {
                        this.notification[i].CLASS = "nf-interest";
                    } else if (this.notification[i].TYPE === "Security Alert") {
                        this.notification[i].CLASS = "nf-pass";
                    } else if (this.notification[i].TYPE === "Verification") {
                        if (this.notification[i].TYPE_ID == 1) {
                            this.notification[i].CLASS = "nf-mail";
                        } else if (this.notification[i].TYPE_ID == 2) {
                            this.notification[i].CLASS = "nf-mobile";
                        }
                    } else if (this.notification[i].TYPE === "Comment") {
                        this.notification[i].CLASS = "nf-comment";
                    } else if (this.notification[i].TYPE === "Page") {
                        this.notification[i].CLASS = "nf-page";
                    } else if (this.notification[i].TYPE === "Page_Invite") {
                        this.notification[i].CLASS = "nf-page";
                    } else if (this.notification[i].TYPE === "Page_Post") {
                        this.notification[i].CLASS = "nf-page";
                    } else if (this.notification[i].TYPE === "Page_Question") {
                        this.notification[i].CLASS = "nf-page";
                    } else if (this.notification[i].TYPE === "Page_BroadcastMsg") {
                        this.notification[i].CLASS = "nf-page";
                    } else if (this.notification[i].TYPE === "Course") {
                        this.notification[i].CLASS = "nf-page";
                    } else if (this.notification[i].TYPE === "Page_Course") {
                        this.notification[i].CLASS = "nf-page";
                    }

                    if (this.notification[i].TYPE == "Course") {
                        if (this.notification[i].COVER_PHOTO_PATH != null) {
                            if (this.notification[i].COVER_TYPE == 0) {
                                this.notification[i].COVER_PHOTO_PATH = this.notification[i].COVER_PHOTO_PATH + "cover/" + this.notification[i].TYPE_ID + "_1235x330.png";

                            } else {
                                this.notification[i].COVER_PHOTO_PATH = this.notification[i].COVER_PHOTO_PATH;
                            }
                        } else {
                            this.notification[i].COVER_PHOTO_PATH = this._constantService.defaultCoverImgPath;
                        }
                        //this.notification[i].PROFILE_PHOTO_PATH = this.notification[i].PROFILE_PHOTO_PATH + "cover/" + this.notification[i].TYPE_ID + "_60x60.png?v                    =" + this.date.getTime();
                    }



                    if (this.notification[i].PROFILE_PHOTO_PATH) {
                        if (this.notification[i].TYPE == "Post") {
                            this.notification[i].PROFILE_PHOTO_PATH = this.notification[i].PROFILE_PHOTO_PATH + "profile/" + this.notification[i].SENDER_ID + "_60x60.png?v=" + responseData.IMG_UPD_DT
                        } else if (this.notification[i].TYPE == "Page_Post") {
                            this.notification[i].PROFILE_PHOTO_PATH = this.notification[i].PROFILE_PHOTO_PATH + "profile/" + this.notification[i].SENDER_ID + "_60x60.png?v=" + responseData.IMG_UPD_DT
                        } else {
                            this.notification[i].PROFILE_PHOTO_PATH = this.notification[i].PROFILE_PHOTO_PATH + "profile/" + this.notification[i].SENDER_ID + "_60x60.png?v=" + responseData.IMG_UPD_DT
                        }
                    } else {
                        if (this.notification[i].PAGE_TYPE) {
                            if (this.notification[i].PAGE_TYPE == 0) {
                                this.notification[i].PROFILE_PHOTO_PATH = this._constantService.defaultPageIndImgPath;
                            }
                            if (this.notification[i].PAGE_TYPE == 1) {
                                this.notification[i].PROFILE_PHOTO_PATH = this._constantService.defaultPageCollgImgPath;
                            }
                        } else {
                            this.profile_path = this._constantService.defaultImgPath;
                        }
                    }

                    if (this.notification == null) {
                        this.empty = true;
                    }


                }
                if (this.notification == null) {
                    this.empty = true;
                }

                if (responseData.UNREAD_NOTI_COUNT != 0) {
                    this.unreadnotCount = responseData.UNREAD_NOTI_COUNT;
                    this.unreadNotStatus = true;
                    if (this.selectedHeaderdropdown == 1) {
                        this.unreadNotStatus = false;
                        this.allSeenNotify();
                    }
                } else {
                    this.unreadNotStatus = false;
                }
                this.changeDetector.detectChanges();
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }



    updateProfilePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }


    goToPost(i) {

        if (this.notification[i].SEEN == 0) {
            var notifyUpd = {};
            notifyUpd['token'] = this._constantService.getSessionDataBYKey('token');
            notifyUpd['token_param'] = {};
            notifyUpd['token_param']['device_type'] = 'w';
            notifyUpd['token_param']['host'] = '';
            notifyUpd['notify_id'] = this.notification[i].USER_NOTIFICATION_ID;


            this._constantService.fetchDataApi(this._constantService.getNotificationUpdateSeenServiceUrl(), notifyUpd).subscribe(data => {
                var responseData: any = data;
                var status = responseData.STATUS;
                if (status == this._constantService.success_msg) {
                    this.typeId = this.notification[i].TYPE_ID;
                } else if (status == this._constantService.error_token) {
                    this.sessionLogout.emit(true);
                }
            }, error => {
                var responseData = error;
                if (responseData.status == 500) {
                    this._router.navigate(['500']);
                }
            });
        }

        if (this.notification[i].TYPE === "Comment" || this.notification[i].TYPE === "Post" || this.notification[i].TYPE === "Question" || this.notification[i].TYPE === "Question Response" || this.notification[i].TYPE === "Page_Post" || this.notification[i].TYPE === "Page_Question") {
            //this._constantService.setPostId(this.notification[i].TYPE_ID);
            this._constantService.setSessionJsonPair('post_id', this.notification[i].TYPE_ID);
            if (this.notification[i].URL) {

                this._router.navigate(['post/' + this.notification[i].URL]);
            } else if (this.notification[i].TYPE_ID) {
                this._router.navigate(['post/' + this.notification[i].TYPE_ID]);
            } else {
                this._constantService.showToast("This post is still under review", "", "3");
                return false;
            }

        }
        else if (this.notification[i].TYPE === "Connection") {
            this._router.navigate(['profile/' + this.notification[i].USER_NAME]);
        }
        else if (this.notification[i].TYPE == 'Page_Invite' || this.notification[i].TYPE == 'Page') {
            this._router.navigate(['page/' + this.notification[i].TYPE_ID]);
            return false;
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

    getSearchPageDetails(ids: string) {

        var pageDetails = {};
        pageDetails['token'] = this._constantService.getSessionDataBYKey('token');
        pageDetails['token_param'] = {};
        pageDetails['token_param']['device_type'] = 'w';
        pageDetails['token_param']['host'] = '';
        pageDetails['pg_uuids'] = ids;



        this._constantService.fetchDataApi(this._constantService.getSearchedPageDataServiceUrl(), pageDetails).subscribe(data => {
            this.data = data["_body"];
            let responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.searchdrop = true;
                this.searchPagePresent = true;
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.searched_page = [];
                this.searched_page = responseData.POST_DATA;
                for (var i = 0; i < this.searched_page.length; i++) {
                    this.searched_page[i].TITLE = this.postData.decodeURIPostData(this.searched_page[i].TITLE);
                    if (this.searched_page[i].PROFILE_PHOTO_PATH != null) {
                        this.searched_page[i].PROFILE_PHOTO_PATH = this.searched_page[i].PROFILE_PHOTO_PATH + "profile/" + this.searched_page[i].PAGE_UUID + "_120x120.png";
                    } else {
                        if (this.searched_page[i].TYPE == 0) {
                            this.searched_page[i].PROFILE_PHOTO_PATH = this._constantService.defaultPageIndImgPath;
                        } else {
                            this.searched_page[i].PROFILE_PHOTO_PATH = this._constantService.defaultPageCollgImgPath;
                        }
                    }
                    if (this.searched_page[i].PAGE_NAME != null) {
                        this.searched_page[i].ID = this.postData.decodeURIPostData(this.searched_page[i].PAGE_NAME);
                    } else {
                        this.searched_page[i].ID = this.postData.decodeURIPostData(this.searched_page[i].PAGE_UUID);
                    }
                }
                // console.log(this.noResult);
                // console.log(this.searched_page);
                // if (this.searched_page.length == 0) {
                //     this.noResult = true;
                // }
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            }
            // console.log(this.noResult);

        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    bg_shadow() {
        this.showbg = true;
        // let body = document.getElementsByTagName('body')[0];
        // body.classList.add("body-overflow");
        this.searchButtonActive = true;

    }

    deactive() {
        this.searchButtonActive = false;
    }

    hide_bg_shadow() {
        this.showbg = false;
        // let body = document.getElementsByTagName('body')[0];
        // body.classList.remove("body-overflow");
    }

    gototop() {
        var herf = this._router.url;
        var urlArr = herf.split("/");
        // if (urlArr[1] == "home") {
        //     window.scrollTo(0, 0);
        //     window.location.reload();
        // }
    }

    goToTrail(i) {
        if (this.message[i].USER_NAME == null) {
            this.message[i].PAGE_TITLE = this.postData.decodeURIPostData(this.message[i].PAGE_TITLE);
            this._constantService.setSessionJsonPair('page_uuid', this.message[i].PAGE_UUID);
            this._constantService.setSessionJsonPair('page_title', this.message[i].PAGE_TITLE);
            this._constantService.setSessionJsonPair('friend_user_id', this.message[i].PAGE_UUID);
            this._router.navigate([/inbox/ + '#' + this.message[i].PAGE_UUID]);

        } else {
            this._router.navigate([/inbox/ + this.message[i].USER_NAME]);
        }
    }
    //    setTab(){
    //        this.tab=2;
    //        this.tabemit.emit(this.tab);
    //    }

    UpdateActivityList() {
        var UpActivity = {};
        UpActivity['token'] = this._constantService.getSessionDataBYKey('token');
        UpActivity['token_param'] = {};
        UpActivity['token_param']['device_type'] = 'w';
        UpActivity['token_param']['host'] = '';
        UpActivity['sdt'] = this.searchInput;


        this._constantService.fetchDataApi(this._constantService.getUpdateActivityListServiceUrl(), UpActivity).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {

            }
            else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });

    }

    updateSourcePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }

    navToSearch() {
        this.hide_bg_shadow();
        this._router.navigate(['searchresult/all/' + this.searchInput]);
    }

    recentSearchInput() {
        this.searchTab = 1;
        this.getRecentvalues();
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }
    searchout() {
        setTimeout(() => {
            this.searchTab = 0;
        }, 150)
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }
    setrecent(data) {
        // this.recentSearch.push(data);
        var expiredDate = new Date();
        expiredDate.setDate(expiredDate.getDate() + 30);
        // this._cookie.set('study247', this._encryptionService.encrypt(), expiredDate);
        if (this.recentSearch.length < 4) {
            this.recentSearch.unshift(data);
        } else {
            this.recentSearch.pop();
            this.recentSearch.unshift(data);
        }
        this._cookie.set('recentSearch', this.recentSearch.toString(), expiredDate);
        this.getRecentvalues();
        // this.cookieValue = this._cookie.get('recentSearch');
        // console.log(this.cookieValue);
        // console.log("rahjlfkdsajflksda");

    }
    getrecent() {
        this.cookieValue = this._cookie.get('recentSearch');
        if (this.cookieValue != "") {
            this.recentSearch = this.cookieValue.split(",");

            this.getRecentvalues();
        }
    }
    clearReset() {
        // console.log("ghfdhsgggggggggggggg");
        var expiredDate = new Date();
        expiredDate.setDate(expiredDate.getDate() + 30);

        this.recentSearch.length = 0;
        this._cookie.set('recentSearch', '', expiredDate);

        this.searchInput = "";
        this.getRecentvalues();

    }
    getRecentvalues() {

        return this.recentSearch;
    }
    emptysearch() {
        this.searchInput = "";
        console.log(this.searchInput);

    }

    seeall(index) {
        if (index == 0) {
            this._router.navigate(['/searchresult/courses/' + this.searchInput.trim()]);
            console.log("cor");
            console.log(this.searchInput);
        } else if (index == 1) {
            this._router.navigate(['/searchresult/pages/' + this.searchInput.trim()]);
            console.log("pag");
            console.log(this.searchInput);
        }
        else if (index == 2) {
            this._router.navigate(['/searchresult/people/' + this.searchInput.trim()]);
            console.log("peop");
            console.log(this.searchInput);
        }
    }

    updateConnreqReject(event, i) {
        var updConnRecAccpt = {};
        var target = event.currentTarget;
        var idAttr = target.attributes.id;
        updConnRecAccpt['token'] = this._constantService.getSessionDataBYKey('token');
        updConnRecAccpt['token_param'] = {};
        updConnRecAccpt['token_param']['device_type'] = 'w';
        updConnRecAccpt['token_param']['host'] = '';
        updConnRecAccpt['conrecid'] = idAttr.nodeValue;
        var id = "connReq_" + idAttr.nodeValue;

        this._constantService.fetchDataApi(this._constantService.updateConnRecRejectServiceUrl(), updConnRecAccpt).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                (<HTMLElement>document.getElementById(id)).style.display = "none";
                this.request.splice(i, 1);
                if (this.request.length == 0) {
                    this.showif = 2;
                }
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
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

    redirectToProfile(username) {
        if (username) {
            this._router.navigate(['profile/' + username]);
        }
    }
    ngAfterViewChecked() {
        this.checkScreenWidth();
    }
    showResponsiveSearch() {

        this.activeMenuCond = !this.activeMenuCond;
        // this.showSerachResponsiveView = !this.showSerachResponsiveView;
    }
    openressearch() {
        this.serachResponsiveView = !this.serachResponsiveView;
    }
    routTo(endpoint) {
        window.open(window.location.host + '/home');
    }
    receiveMessage($event) {
    this.messageBoolean = $event;
  }
}
