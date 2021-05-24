import { Component, OnInit, AfterViewInit, Output, EventEmitter, ViewChild, HostListener, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EncryptionService } from './../../../services/encryption.service';
import { ConstantService } from './../../../services/constant.service';
import { PostdataService } from './../../../services/postdata.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-pageprofile',
    templateUrl: './pageprofile.component.html',
    providers: [ConstantService, EncryptionService],
    styleUrls: ['./../../profile/profile.component.scss', './pageprofile.component.scss', './../createpage/createpage.component.scss', './newpageprofile.component.scss'],
    host: {
        '(window:scroll)': 'onScroll($event)'
    }
})
export class PageprofileComponent implements OnInit, AfterViewInit {
    isInvitePresent = true;
    removeImageReqTyp: any;
    pageAbout: any;
    usertype: any;
    sendAbout: boolean = false;
    pagenm: any;
    userTyp: boolean;
    pgUrl: any;
    followList: boolean = false;
    myProfile: boolean = false;
    picTyp: number;
    publish;
    continueScroll = false;
    followers = [];
    PgListArray = [];
    serviceResponse: boolean = false;
    followerLastActiveTime: any;
    followerName: any;
    followerPic: any;
    count = 1;
    val: number = 0;
    deletePopup: boolean = false;
    User_Pp: string;
    User_fullname: string;
    page_title: string;
    pageSuggPresent: boolean = true;
    galleryPath: any;
    pageUuid: any;
    short_description: any;
    description: any;
    email: any;
    phone: any;
    pgAddress: any;
    createdBy: any;
    withoutToken: boolean = false;
    reviewTab;
    current_year;
    pg_int: any[];
    showIntArr: boolean = true;
    show: boolean = false;
    page_uuid: any;

    showArrr: boolean = false;
    ltIntShow = [];
    Arr = [];
    boolean = true;
    arrr = [];
    pgIntArr = [];
    more: boolean = false;
    UsrTyp: any;
    hidereview: boolean = true;
    reviewCount: any;
    interest = [];
    detalsshowprofile_var: number = 0;
    course_details_toggle: boolean = true;
    pageprofiletab = 1;
    imageUpload: boolean = false;
    imageUploadpp: boolean = false;
    profilePicPath = '';
    profilePicPathOrg = '';
    coverPicImgUpload: boolean = false;
    coverPicPath = '';
    coverPicPathOrg = '';
    pageId = "";
    postId = "";
    pageTitle = "";
    pageTit = "";
    pageUrl = "";
    pageData = [];
    course_count = 0;
    follow_count = 0;
    user_type = 0;
    uType = 3;
    isfollowed = 0;
    pagedata = {};
    dataConf = {};
    openConfirmation: boolean = false;
    profilePic: boolean = false;
    coverPic: boolean = false;
    pageabout = {};
    pagename = '';
    isreviewed = 0;
    pageDetails = {};
    pageRating = {};
    doCheck = false;
    dataObj = {};
    pageInterest = [];
    date = new Date();
    datatext: boolean = false;
    claimPage: boolean = false;
    oldId = "";
    t;
    showBlankRating: boolean;
    coverdropdown: boolean = false;
    showupdatemenu: boolean = false;
    newpagewelcome: boolean = false;
    ltPgPostInt;
    nocover: boolean = false;
    noprofile: boolean = false;
    noname: boolean = false;
    newPage: boolean = false;
    moreinterestpopup: boolean = false;
    editInterest: boolean = false;
    postSearch: boolean = false;
    postSearchTyp: string = "";
    showopagephotopopup: boolean = false;
    showMore: boolean = true;
    editPops: boolean = false;
    gallery = [];
    showWidget: boolean = true;
    showlesspageint: boolean = true;
    dataopen: boolean = false;
    showpopup: boolean = false;
    interestObj = {};
    config: any;
    show_imageview: boolean = false;
    getSuggestion: boolean = false;
    confirmUnfollow: boolean = false;
    openLoginPopup: boolean = false;
    showChildNow: boolean = false;
    openLoginPopupType = 1;
    pageType;
    PageTitle;
    isScrolled = false;
    isScrolledright = false;
    currPos: Number = 0;
    startPos: Number = 0;
    changePos: Number = 0;
    changePos1: Number = 0;
    orgImagePath = "";
    userCred = '';
    userPwd = "";
    typ;
    ratings: any;
    isError: boolean = false;
    errorText = '';
    usrData = {};
    selectedWidget = 1;
    pagepublishPopup: boolean = false;
    pageReport: boolean = false;
    pageReportPopup: boolean = false;
    pagedeletePopup: boolean = false;
    PageShowBtnListMobile: boolean = false;
    sendForReviewRating: any;
    isEmptyState: boolean = false;
    isScrolledstick: boolean = false;
    @Output() openGenInfo = new EventEmitter<boolean>();



    setPageUid;
    @ViewChild('cvrdropdown', { read: ElementRef }) cvrdropdown: ElementRef;
    @ViewChild('onlycvrdropdown', { read: ElementRef }) onlycvrdropdown: ElementRef;
    @ViewChild('menusectionarea', { read: ElementRef }) menusectionarea: ElementRef;
    altName = "";
    pageprofiletabWithoutToken = 1;
    pageUrlHref: string;
    createCourse = true;
    paramFollow: any;
    pgFllwList: string;
    pageCourseCount: any;



    diman(event) {
        this.datatext = false;
        if (event['type'] == 2) {
            this.user_type = 1;
        }
    }

    closenewpage() {
        this.newpagewelcome = false;
    }

    openchild() {
        this.datatext = true;
    }
    // for croppie popup
    profilepopup(event) {
        this.dataopen = false;
        if (event['status']) {
            fetch(event['image']).then(res => res.blob()).then(blob => {
                event['image'] = blob;
                this.uploadProfileFile(event, 1);
            });
        }
    }

    openprofilepopup() {
        if (window.pageYOffset > 450) {
            window.scroll({
                top: 450,
                left: 0,
                behavior: 'smooth'
            });
        }

        this.dataopen = !this.dataopen;
    }

    opencover(event) {
        this.showpopup = false;
        if (event['status']) {
            fetch(event['image']).then(res => res.blob()).then(blob => {
                event['image'] = blob;
                this.uploadCoverFile(event, 1);
            });
        }
    }
    uploadcover() {
        this.showpopup = !this.showpopup;
    }
    showBtnList() {
        // this.ShowBtnListWeb = false ;
        if (this.PageShowBtnListMobile === false) {
            this.PageShowBtnListMobile = true;
        } else {
            this.PageShowBtnListMobile = false;
        }
    }
    constructor(
        public _constantService: ConstantService,
        private _encryptionService: EncryptionService,
        private _router: Router,
        private activatedRoute: ActivatedRoute,
        private postData: PostdataService,
        private _cookie: CookieService,
    ) {
    }
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (window.innerWidth < 2000 && window.innerWidth >= 1200) {
            var innerWindWidth = window.innerWidth - 18;
            event.target.innerWidth;
            document.getElementById("windiv").style.width = innerWindWidth + "px";
        } else {
            document.getElementById("windiv").style.width = "100%";
        }
        if (window.innerWidth >= 768) {
            if (document.getElementById("outerDiv")) {
                var rightwidth = document.getElementById("outerDiv").offsetWidth;
                var rightinnwidth = rightwidth - 15;
                document.getElementById("someDiv").style.width = rightinnwidth + "px";
                document.getElementById("someDivright").style.width = rightinnwidth + "px";
            }
        } else {
            document.getElementById("someDiv").style.width = "278px";
            document.getElementById("someDivright").style.width = "278px";
        }
        //  else {
        //     document.getElementById("someDiv").style.width = rightinnwidth + "px";
        //     document.getElementById("someDivright").style.width = rightinnwidth + "px";
        // }
        if (window.innerWidth >= 600) {
            this.PageShowBtnListMobile = false;
        }
    }
    show_btn_list_oninit() {
        this.PageShowBtnListMobile = false;
    }
    private checkScreenWidth() {
        var winwidth = window.innerWidth - 18;
        if (window.innerWidth >= 1200) {
            if (document.getElementById("windiv"))
                document.getElementById("windiv").style.width = winwidth + "px";
        } else {
            if (document.getElementById("windiv"))
                document.getElementById("windiv").style.width = winwidth + "px" + 18;
        }
        if (window.innerWidth >= 768) {
            var rightwidth = document.getElementById("outerDiv").offsetWidth;
            var rightinnwidth = rightwidth - 15;
            document.getElementById("someDiv").style.width = rightinnwidth + "px";
            document.getElementById("someDivright").style.width = rightinnwidth + "px";
        } else {
            if (document.getElementById("someDiv")) {
                document.getElementById("someDiv").style.width = "278px";
            }
            if (document.getElementById("someDivright")) {
                document.getElementById("someDivright").style.width = "278px";

            }
        }

    }
    ngAfterViewChecked() {
        this.checkScreenWidth();
    }

    onScroll(evt) {
        this.t = this._constantService.getSessionDataBYKey('token');
        if (this.t != null && this.t != 'undefined' && this.t != '') {
            // if (this.pageprofiletab == 1) {

            var secHeight = document.getElementById('someDiv').offsetHeight;
            var secHeightright = document.getElementById('someDivright').offsetHeight;
            var secHeightcenter = document.getElementById('centersection').offsetHeight;
            var innerWindHeight = window.innerHeight - 50;
            if (secHeightcenter > secHeightright) {
                if (secHeight > innerWindHeight) {

                    var topHeight = secHeight - innerWindHeight;

                    var changePosition = secHeight - innerWindHeight;
                    this.changePos = changePosition + 350;
                    // this.changePos = secHeight - innerWindHeight;
                    this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
                    if (this.currPos >= this.changePos) {
                        this.isScrolled = true;
                        document.getElementById("someDiv").style.top = -topHeight + "px";
                    } else {
                        this.isScrolled = false;
                    }
                } else {

                    // var topHeight = secHeight - innerWindHeight;
                    // this.changePos = secHeight - innerWindHeight;
                    this.changePos = secHeight + 50;
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
                // if(this.isScrolled == false){
                //    this.isScrolledright = false;
                //    console.log("1234567890");
                // }
            }
            if (secHeightright < 100) {
                this.isScrolledright = false;
            } else {
                if (secHeightcenter > secHeightright) {
                    if (secHeightright > innerWindHeight) {
                        var topHeight1 = secHeightright - innerWindHeight;
                        var changePosition = secHeightright - innerWindHeight;
                        this.changePos1 = changePosition + 350;
                        this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
                        if (this.currPos >= this.changePos1) {
                            this.isScrolledright = true;
                            document.getElementById("someDivright").style.top = -topHeight1 + "px";
                        } else {
                            this.isScrolledright = false;
                        }
                    } else {
                        this.changePos1 = secHeightright + 50;
                        this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
                        if (this.currPos >= this.changePos1) {
                            this.isScrolledright = true;
                            document.getElementById("someDivright").style.top = 72 + "px";
                        } else {
                            this.isScrolledright = false;
                        }
                    }
                } else {
                    this.isScrolledright = false;
                }
            }
            // }
        }
        if (window.innerWidth < 768) {
            var secHeight = document.getElementById('stickheadcourse').offsetHeight;
            var innerWindHeight = window.innerHeight;
            if (secHeight < innerWindHeight) {

                this.changePos = secHeight + 150;
                this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
                if (this.currPos > this.changePos) {
                    this.isScrolledstick = true;
                } else {
                    this.isScrolledstick = false;
                }
            }
        } else {
            this.isScrolledstick = false;
        }
    }

    removestricky() {
        this.isScrolled = false;
        this.isScrolledright = false;
    }

    ngOnInit() {

        this.activatedRoute.params.subscribe((params: Params) => {
            if (params['id'] == "#Articles") {
                this.pageprofiletab = 7;
                this.pageprofiletabWithoutToken = 7;
            }

        });

        this.show_btn_list_oninit();
        this.t = this._constantService.getSessionDataBYKey('token');
        if (this.t && this.t != 'undefined') {
            this.activatedRoute.queryParams.subscribe(params => {
                if (params.fllw) {
                    this._cookie.set('fllw', params.fllw);
                }
            })
            this.withoutToken = false;

            var date = new Date();
            this.current_year = date.getFullYear();
            this.Arr = [];
            this.ltIntShow = [];
            this.interestObj = JSON.parse(this._constantService.getSessionDataBYKey('interests'));
            this.activatedRoute.params.subscribe((params: Params) => {
                if (params['tabid'] != null) {
                    this.pageId = params['tabid'];
                    this.oldId = this.pageId;
                    this.getpageDetails(this.pageId);
                    if (params['id'] == undefined) {
                        this.pageprofiletabClick(1);
                    }
                }
                if (params['tabid'] != undefined && params['id'] != undefined) {
                    if (params['id'] == null) {
                        this.pageprofiletabClick(1);
                    } else if (params['id'] == "#Course") {
                        this.pageprofiletabClick(3);
                    } else if (params['id'] == "#Review") {
                        this.pageprofiletabClick(4);
                    } else if (params['id'] == "#Notification") {
                        this.pageprofiletabClick(6);
                    } else if (params['id'] == "#Gallery") {
                        this.pageprofiletabClick(9);
                    } else if (params['id'] == "#Question") {
                        this.pageprofiletabClick(12);
                    } else if (params['id'] == "#About") {
                        this.pageprofiletabClick(2);
                    } else if (params['id'] == "#Analytics") {
                        this.pageprofiletabClick(15);
                    } else if (params['id'] == "#Mentorapproval") {
                        this.pageprofiletabClick(16);
                    }
                }
            });
            //            this._location.subscribe(x => this.back()
            //            );



        } else {

            this.withoutToken = true;
            this._constantService.getInterest();
            this.activatedRoute.queryParams.subscribe(params => {
                if (params.fllw) {
                    this._cookie.set('fllw1', params.fllw);
                }
            })
            this.activatedRoute.params.subscribe((params: Params) => {
                this.pageId = params['tabid'];
                this.getpgGalleryPublic(this.pageId);
                this.getpgAboutPublic(this.pageId);


                if (params['id'] == "#Course") {
                    this.pageprofiletabWithoutToken = 3;
                }
                if (params['id'] == "#Question") {
                    this.pageprofiletabWithoutToken = 12;
                }
                if (params['id'] == "#About") {
                    this.pageprofiletabWithoutToken = 2;
                }
                if (params['id'] == "#Review") {
                    this.pageprofiletabWithoutToken = 5;
                }
                if (params['id'] == "#Gallery") {
                    this.pageprofiletabWithoutToken = 6;
                }

                else if (params['id'] == null) {
                    this.pageprofiletabClick(1);
                }


            })
            this._constantService.GetopenLoginMmmenuObservable$.subscribe(() => {
                this.loginpopupopen();
            });
        }
        this.User_Pp = this._constantService.getSessionDataBYKey('p_pic');
        this.User_fullname = this._constantService.getSessionDataBYKey('full_name');

        this.checkScreenWidth();



    }


    ngDoCheck() {
        this.t = this._constantService.getSessionDataBYKey('token');
        if (this.t != null && this.t != undefined && this.t != '') {
            this.activatedRoute.params.subscribe((params: Params) => {
                if ((params['tabid'] != this.pageId) && this.showChildNow) {
                    this.pageId = params['tabid'];
                    this.oldId = this.pageId;
                    this.selectedWidget = 1;
                    this.getPageGallery(1);
                    this.getpageDetails(this.pageId);
                }
            })
        }
    }


    ngAfterViewInit() {
        this.checkScreenWidth();
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");

        if (this.pagenm != "") {
            this.sendForReviewRating = this.pagenm;
        }
        else {
            this.sendForReviewRating = this.page_uuid;
        }



    }



    //    back() {
    //        this.activatedRoute.params.subscribe((params: Params) => {
    //            if (params['tabid'] != null) {
    //                this.pageId = params['tabid'];
    //                this.oldId = this.pageId;
    //                this.getpageDetails(this.pageId);
    //            }
    //            if (params['tabid'] != undefined && params['id'] != null) {
    ////                if (params['id'] == "") {
    //                    this.pageprofiletabClick(1);
    ////                }
    //                  if (params['id'] == "#Course") {
    //                    this.pageprofiletabClick(3);
    //                } else if (params['id'] == "#Review") {
    //                    this.pageprofiletabClick(4);
    //                } else if (params['id'] == "#Notification") {
    //                    this.pageprofiletabClick(6);
    //                } else if (params['id'] == "#Gallery") {
    //                    this.pageprofiletabClick(9);
    //                } else if (params['id'] == "#Question") {
    //                    this.pageprofiletabClick(12);
    //
    //                } else if (params['id'] == "#About") {
    //                    this.pageprofiletabClick(2);
    //
    //                } else if (params['id'] == "#Analytics") {
    //                    this.pageprofiletabClick(15);
    //                }
    //            }
    //        });
    //    }


    check1(event) {
        this.pageprofiletabClick(event);
    }

    showGalley(event) {
        this.pageprofiletabClick(9);
    }

    pageprofiletabClick(index) {
        if (index == 1 && this.showChildNow) {
            this.getPageGallery(1);

        }
        if (window.pageYOffset > 450) {
            window.scroll({
                top: 450,
                left: 0,
                behavior: 'smooth'
            });
        }

        if (index == 10 || index == 11 || index == 12 || index == 13) {
            if (index == 10) {
                this.postSearchTyp = "1";
            } else if (index == 11) {
                this.postSearchTyp = "2";
            } else if (index == 12) {
                this.postSearchTyp = "3";
            } else if (index == 13) {
                this.postSearchTyp = "5,6";
            }
            this.postSearch = true;
        } else {
            this.postSearch = false;
        }

        if (index == 1) {
            this._router.navigate(['/page/' + this.pageId + '']);
        }
        else if (index == 2) {
            this._router.navigate(['/page/' + this.pageId + '/#About']);
        }
        else if (index == 3) {
            this._router.navigate(['/page/' + this.pageId + '/#Course']);
        }
        else if (index == 4) {
            this._router.navigate(['/page/' + this.pageId + '/#Review']);
        }
        else if (index == 6) {
            this._router.navigate(['/page/' + this.pageId + '/#Notification']);
        }
        else if (index == 9) {
            this._router.navigate(['/page/' + this.pageId + '/#Gallery']);
        }
        else if (index == 12) {
            this._router.navigate(['/page/' + this.pageId + '/#Question']);
        }
        else if (index == 7) {
            this.pageprofiletab = 7;
            this._router.navigate(['/page/' + this.pageId + '/#Articles']);
        }
        else if (index == 13) {
            this.pageprofiletab = 13;
            this._router.navigate(['/page/' + this.pageId + '/#About']);
        }
        else if (index == 15) {
            this.pageprofiletab = 15;
            this._router.navigate(['/page/' + this.pageId + '/#Analytics']);
        } else if (index == 16) {
            this.pageprofiletab = 16;
            this._router.navigate(['/page/' + this.pageId + '/#Mentorapproval']);
        }

        this.pageprofiletab = index;
    }

    pageProfiletabWithoutTokenClick(index) {

        if (index == 3) {
            this._router.navigate(['/page/' + this.pageId + '/#Course']);
        }

        else if (index == 1) {
            this._router.navigate(['/page/' + this.pageId]);
        } else if (index == 5) {
            this._router.navigate(['/page/' + this.pageId + '/#Review']);
        } else if (index == 12) {
            this._router.navigate(['/page/' + this.pageId + '/#Question']);
        } else if (index == 7) {
            this._router.navigate(['/page/' + this.pageId + '/#Articles']);
        }
        else if (index == 2) {
            this._router.navigate(['/page/' + this.pageId + '/#About']);
        }
        else if (index == 6) {
            this._router.navigate(['/page/' + this.pageId + '/#Gallery']);
        }


        this.pageprofiletabWithoutToken = index;
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
    check(event) {
        this.pageTitle = event;
    }

    changeAbout(event) {
        if (event == true) {
            this.pagedata['NAME_TIP'] = false;
            this.pagedata['EDIT'] = false;
        } else {
            this.pageTitle = this.postData.decodeURIPostData(event.title);
            this.pageUrl = event.website;
            this.pageUrl = this.pageUrl.replace('/^(?:https?:\/\/)?(?:http\.)?/i', '');
        }
    }

    reviewStatus(event) {
        this.isreviewed = event;
        if (this.isreviewed == 1) {
            this.selectedWidget = 1;
        }
    }

    getpageDetails(id) {
        //this.showChildNow = false;
        this.selectedWidget = 1;
        if (window.pageYOffset > 450) {
            window.scroll({
                top: 450,
                left: 0,
                behavior: 'smooth'
            });
        }

        var pageDetail = {};
        pageDetail['token'] = this._constantService.getSessionDataBYKey('token');
        pageDetail['token_param'] = {};
        pageDetail['token_param']['device_type'] = 'w';
        pageDetail['token_param']['host'] = '';
        pageDetail['pg_uuid'] = id;

        this._constantService.fetchDataApi(this._constantService.getPageDetailsServiceUrl(), pageDetail).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            var pageAbout = responseData.PAGE_ABOUT;
            this.pageAbout = responseData.PAGE_ABOUT;
            if (status == "success") {
                this.pageCourseCount = responseData.PAGE_ABOUT.PAGE_COURSE_COUNT
                this.pageUuid = responseData.PAGE_ABOUT.PAGE_UUID;
                if (this._cookie.get('follow-page') == '1') {
                    this.pageFollowUnFollow(0);
                    this._cookie.delete('follow-page');
                };
                let localCookie = this._cookie.get('fllw');
                if (this.t && this.t != 'undefined') {
                    if (localCookie == '1') {
                        this._cookie.delete('fllw');
                        let localCookiePgList = this._cookie.get('pgFollowList');
                        if (localCookiePgList) {
                            var PgListArray = localCookiePgList.split(',');
                            this._cookie.delete('pgFollowList');
                            for (var i = 0; i <= PgListArray.length - 1; i++) {
                                this.pageFollowUnFollowList(0, PgListArray[i]);

                            }
                        } else {
                            this.pageFollowUnFollow(0)
                        }
                    }
                }


                this.pagenm = responseData.PAGE_ABOUT.PAGE_NAME;
                this._constantService.setSessionJsonPair('page_uuid', this.pageUuid);
                if (!(Object.entries(pageAbout).length === 0 && pageAbout.constructor === Object)) {
                    if (responseData.PAGE_ABOUT.PAGE_UUID != null) {
                        this.page_uuid = responseData.PAGE_ABOUT.PAGE_UUID;
                        this.setPageUid = this.page_uuid;

                        //this._constantService.setPageIdForCourse(this.page_uuid);
                        this._constantService.setSessionJsonPair('page_id_course', this.page_uuid);
                        this.latestPostInterest();
                        this.getPageGallery(1);
                    }
                    if (responseData.PAGE_ABOUT.ISACTIVE == null || responseData.PAGE_ABOUT.ISACTIVE == 1) {
                        this.publish = 1;
                    } else if (responseData.PAGE_ABOUT.ISACTIVE == 0) {
                        this.publish = 0;
                    }
                    if (responseData.USER_TYPE == 1) {
                        this.userTyp = true;
                    } else {
                        this.userTyp = false;
                    }

                    this.ratings = responseData.PAGE_ABOUT.PAGE_REVIEWS_RATINGS_COUNT;

                    if (this.ratings == 0 || this.ratings == '0') {
                        this.showBlankRating = true;
                    } else {
                        this.showBlankRating = false;
                    }

                    // title and description starts ****************************************
                    if (responseData['PAGE_ABOUT']['TITLE']) {
                        //                    var meta = document.getElementsByTagName("meta");
                        //                    var link = document.getElementsByTagName("link");
                        //
                        //                    for (var i = 0; i < link.length; i++) {
                        //                        if (link[i].rel == "canonical") {
                        //                            link[i].href = "";
                        //                        }
                        //                    }
                        var pagetitle = this.postData.decodeURIPostData(responseData['PAGE_ABOUT']['TITLE']);
                        document.title = pagetitle + " - Study24x7";
                        //                    for (var i = 0; i < meta.length; i++) {
                        //                        if (meta[i].name == "description" && this.postData.decodeURIPostData(responseData['PAGE_ABOUT']['DESCRIPTION']) != null) {
                        //                            meta[i].content = this.postData.decodeURIPostData(responseData['PAGE_ABOUT']['DESCRIPTION']);
                        //                        }
                        //                    }
                        //                    if (responseData['PAGE_ABOUT']['DESCRIPTION']) {
                        //                        var desc = this.postData.decodeURIPostData(responseData['PAGE_ABOUT']['DESCRIPTION']);
                        //                        this.meta.updateTag({property: "og:description", content: desc.slice(0, 160)});
                        //                        this.meta.updateTag({name: "twitter:description", content: desc.slice(0, 160)});
                        //                    }
                        //
                        //                    this.meta.updateTag({property: "og:title", content: document.title});
                        //                    this.meta.updateTag({name: "twitter:title", content: document.title});
                        //                    this.meta.updateTag({property: "og:url", content: document.URL});
                        //                    this.meta.updateTag({name: "twitter:url", content: document.URL});
                        //                    var imageUrl = "https://study247.s3-accelerate.amazonaws.com/assets/images/svg-three/Logo.png";
                        //                    this.meta.updateTag({property: "og:image", content: imageUrl});
                        //                    this.meta.updateTag({name: "twitter:image", content: imageUrl});
                        //
                        //
                    } else {
                        document.title = "Study24x7 - A best place for collaborative learning & sharing";
                    }


                    // title and description end ****************************************

                    this.pageType = responseData.PAGE_ABOUT.TYPE;

                    this.user_type = responseData.PAGE_ABOUT.USER_TYPE;
                    this.usertype = responseData.PAGE_ABOUT.USER_TYPE;
                    if (this.user_type == 1) {
                        this.myProfile = true;
                    } else {
                        this.myProfile = false;
                    }
                    this.uType = this.user_type;
                    this.pageData = responseData.PAGE_ABOUT;

                    this.pageTitle = this.postData.decodeURIPostData(responseData.PAGE_ABOUT.TITLE);
                    this.interest = responseData.PAGE_ABOUT.INTEREST;
                    if (this.interest.length != 0) {
                        this.getSuggestion = true;
                    }
                    this.reviewCount = responseData.PAGE_REVIEWS_RATINGS_COUNT;
                    if (this.reviewCount == 0) {
                        this.hidereview = false;
                    }

                    this.pageUrl = responseData.PAGE_ABOUT.WEBSITE;
                    this.pageUrl = this.pageUrl.replace('http://', '');
                    this.pageUrl = this.pageUrl.replace('https://', '');
                    if (this._constantService.isExternalLink(this.pageUrl)) {
                        this.pageUrlHref = 'nofollow noopener'
                    }



                    if (responseData.PAGE_ABOUT.WEBSITE.match("https://") || responseData.PAGE_ABOUT.WEBSITE.match("http://")) {
                        this.pgUrl = responseData.PAGE_ABOUT.WEBSITE;
                    } else {
                        this.pgUrl = "http://" + responseData.PAGE_ABOUT.WEBSITE;
                    }

                    this.UsrTyp = responseData.PAGE_ABOUT.TYPE;

                    this.pageDetails = {
                        "PAGE_TITLE": this.pageTitle,
                        "PAGE_NAME": responseData.PAGE_ABOUT.PAGE_NAME,
                        "COURSE_COUNT": responseData.PAGE_ABOUT.PAGE_COURSE_COUNT,
                        "FOLLOWER_COUNT": responseData.PAGE_ABOUT.PAGE_FOLLOW_COUNT,
                        "PAGE_ID": responseData.PAGE_ABOUT.PAGE_UUID,
                        "POST_ID": this.postId,
                        "PROFILE_PHOTO_PATH": responseData.PAGE_ABOUT.PROFILE_PHOTO_PATH,
                        "ACKNOWLEDGEMENT": responseData.PAGE_ABOUT.ACKNOWLEDGMENT,
                    }

                    //this._constantService.setPageTitle(this.pageTitle);
                    this._constantService.setSessionJsonPair('page_title', this.page_title);
                    if (responseData.PAGE_ABOUT.CLAIM_PAGE == 1) {
                        this.claimPage = true;
                    } else {
                        this.claimPage = false;
                    }

                    if (responseData.PAGE_ABOUT.IS_VIEWED == null || responseData.PAGE_ABOUT.IS_VIEWED == 0) {
                        this.newpagewelcome = true;
                    } else {
                        this.newpagewelcome = false;
                    }

                    //this._constantService.setPageDetails(this.pageDetails);
                    this._constantService.setSessionJsonPair('page_details', JSON.stringify(this.pageDetails));
                    if (responseData.PAGE_ABOUT.PROFILE_PHOTO_PATH != null && responseData.PAGE_ABOUT.PROFILE_PHOTO_PATH != "") {
                        this.profilePic = true;
                        this.profilePicPath = responseData.PAGE_ABOUT.PROFILE_PHOTO_PATH + "profile/" + this.page_uuid + "_150x150.png?v=" + responseData.PAGE_ABOUT.IMG_UPD_DT
                        this.profilePicPathOrg = responseData.PAGE_ABOUT.PROFILE_PHOTO_PATH + "profile/" + this.page_uuid + "_2000.png?v=" + responseData.PAGE_ABOUT.IMG_UPD_DT
                    } else {

                        if (this.UsrTyp == 0) {
                            this.profilePicPath = this._constantService.defaultPageIndImgPath;
                        } else if (this.UsrTyp == 1) {
                            this.profilePicPath = this._constantService.defaultPageCollgImgPath;
                        }
                    }
                    if (responseData.PAGE_ABOUT.COVER_PHOTO_PATH != null && responseData.PAGE_ABOUT.COVER_PHOTO_PATH != "") {
                        this.coverPic = true;
                        this.coverPicPath = responseData.PAGE_ABOUT.COVER_PHOTO_PATH + "cover/" + this.page_uuid + "_1235x330.png?v=" + responseData.PAGE_ABOUT.IMG_UPD_DT;
                        this.coverPicPathOrg = responseData.PAGE_ABOUT.COVER_PHOTO_PATH + "cover/" + this.page_uuid + "_2000.png?v=" + responseData.PAGE_ABOUT.IMG_UPD_DT;
                    } else {
                        this.coverPicPath = this._constantService.defaultCoverImgPath;
                    }
                    if (responseData.PAGE_ABOUT.PAGE_COURSE_COUNT != null) {
                        this.course_count = parseInt(responseData.PAGE_ABOUT.PAGE_COURSE_COUNT);
                    }
                    if (responseData.PAGE_ABOUT.PAGE_FOLLOW_COUNT) {
                        this.follow_count = parseInt(responseData.PAGE_ABOUT.PAGE_FOLLOW_COUNT);
                    }

                    this.pagedata['pageid'] = this.page_uuid;
                    this.pagedata['user_type'] = responseData.PAGE_ABOUT.USER_TYPE;
                    this.pagename = responseData.PAGE_ABOUT.PAGE_NAME;
                    this.pageTitle = this.postData.decodeURIPostData(responseData.PAGE_ABOUT.TITLE);
                    this.isfollowed = responseData.PAGE_ABOUT.ISFOLLOW;
                    this.isreviewed = responseData.PAGE_ABOUT.ISREVIEW;
                    this.pageInterest = responseData.PAGE_ABOUT.INTEREST;
                    this._constantService.setSessionJsonPair('pgInterest', this.pageInterest);
                    this.pgIntArr = JSON.parse(this._constantService.getSessionDataBYKey('interests'));
                    for (var i = 0; i < this.pageInterest.length; i++) {
                        for (var j = 1; j < 14; j++) {
                            if (this.pageInterest[i] == j) {
                                this.arrr.push(this.pgIntArr[j]);
                            }
                        }
                    }
                    this.ltIntShow = []; this.Arr = [];
                    for (var i = 0; i < this.pageInterest.length; i++) {

                        if (i < 4) {
                            this.showIntArr = true;
                            this.Arr.push(this.pageInterest[i]);
                        } else {
                            this.showIntArr = false;
                            this.ltIntShow.push(this.pageInterest[i]);
                        }
                    }

                    if (this.coverPic == false) {
                        this.nocover = true;
                        this.newPage = true;
                    }
                    if (this.profilePic == false) {
                        this.noprofile = true;
                        this.newPage = true;
                    }
                    if (this.pagename == '' || this.pagename == null) {
                        this.noname = true;
                        this.newPage = true;
                    }
                    this.serviceResponse = true;
                    this.showChildNow = true;
                } else {
                    this._router.navigate(['404']);
                }

            } else if (status == "error") {
                this._router.navigate(['404']);
            } else {

            }
        })
    }

    uploadProfileFile(event, typ) {

        //        let fileList: FileList = event.target.files;
        this.imageUploadpp = true;
        //        if (fileList.length > 0) {
        //            let file: File = fileList[0];
        //            if (file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        var upload = {};
        upload['token'] = this._constantService.getSessionDataBYKey('token');
        upload['token_param'] = {};
        upload['token_param']['device_type'] = "w";
        upload['token_param']['host'] = "";
        var data = JSON.stringify(upload);
        var encData = this._encryptionService.encrypt(data);
        let formData = new FormData();
        if (typ == 1) {
            formData.append("file", event['image']);
            formData.append("type", "page_pp");
        } else {
            formData.append("file", event['orgFile']);
            formData.append("type", "page_pp_org");
        }
        formData.append("uuid", this.page_uuid);
        formData.append("token", encData);

        var url = "";
        if (typ == 1) {
            url = this._constantService.getUploadFileServiceUrl();
        } else {
            url = this._constantService.getUploadOrgServiceUrl();
        }
        this._constantService.uploadFileApi(url, formData).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                this.imageUploadpp = false;
                if (typ == 1) {

                    var date = new Date();
                    this.profilePic = true;
                    this.profilePicPath = responseData.FPATH + "profile/" + this.page_uuid + "_150x150.png?v=" + responseData.IMG_UPD_DT;
                }
            } else {
                this.imageUploadpp = false;
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }
        });
        //            } else {
        //                this.imageUpload = false;
        //                this.dataConf['type'] = 2;
        //                this.dataConf['msg'] = "STUDY24X7";
        //                this.dataConf['error_msg'] = "Please Provide a valid file";
        //                this.openConfirmation = true;
        //            }
        //        }
    }

    uploadCoverFile(event, typ) {

        var upload = {};
        this.coverPicImgUpload = true;
        upload['token'] = this._constantService.getSessionDataBYKey('token');
        upload['token_param'] = {};
        upload['token_param']['device_type'] = "w";
        upload['token_param']['host'] = "";
        var data = JSON.stringify(upload);
        var encData = this._encryptionService.encrypt(data);
        let formData = new FormData();
        if (typ == 1) {
            formData.append("file", event['image']);
            formData.append("type", "page_cp");
        } else {
            formData.append("file", event['orgFile']);
            formData.append("type", "page_cp_org");
        }
        formData.append("uuid", this.page_uuid);
        formData.append("token", encData);

        var url = "";
        if (typ == 1) {
            url = this._constantService.getUploadFileServiceUrl();
        } else {
            url = this._constantService.getUploadOrgServiceUrl();
        }
        this._constantService.uploadFileApi(url, formData).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            this.coverPicImgUpload = false;
            if (status == 'success') {
                if (typ) {
                    this.coverPic = true;
                    this.coverPicPath = responseData.FPATH + "cover/" + this.page_uuid + "_1235x330.png?v=" + responseData.IMG_UPD_DT;
                }

            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }
        });
    }

    pageFollowUnFollow(id) {
        var followUnfollow = {};
        followUnfollow['token'] = this._constantService.getSessionDataBYKey('token');
        followUnfollow['token_param'] = {};
        followUnfollow['token_param']['device_type'] = 'w';
        followUnfollow['token_param']['host'] = '';
        followUnfollow['pg_uuid'] = this.pageUuid;
        var url = "";
        if (id == 0) {
            url = this._constantService.getPageFollowServiceUrl();
        } else if (id == 1) {
            url = this._constantService.getPageUnFollowServiceUrl();
        }
        this._constantService.fetchDataApi(url, followUnfollow).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                if (id == 0) {
                    this.isfollowed = 1;
                    this.follow_count += 1;
                } else {
                    this.isfollowed = 0;
                    this.follow_count -= 1;
                }
            }
        })
    }
    pageFollowUnFollowList(id, pageId) {
        var followUnfollow = {};
        followUnfollow['token'] = this._constantService.getSessionDataBYKey('token');
        followUnfollow['token_param'] = {};
        followUnfollow['token_param']['device_type'] = 'w';
        followUnfollow['token_param']['host'] = '';
        followUnfollow['pg_uuid'] = pageId;
        var url = "";
        if (id == 0) {
            url = this._constantService.getPageFollowServiceUrl();
        } else if (id == 1) {
            url = this._constantService.getPageUnFollowServiceUrl();
        }
        this._constantService.fetchDataApi(url, followUnfollow).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                if (id == 0) {
                    this.isfollowed = 1;
                    this.follow_count += 1;
                } else {
                    this.isfollowed = 0;
                    this.follow_count -= 1;
                }
            }
        })
    }

    sessionExpire(event) {
        if (event) {
            this.dataConf['type'] = 4;
            this.dataConf['msg'] = "Session Expire";
            this.dataConf['error_msg'] = "Session expired";
            this.openConfirmation = true;
        }
    }
    courseDetailsTab(id) {
        // alert(id);
        this.detalsshowprofile_var = id;
    }

    frmCorsList(event) {
        // setTimeout(()=>{
        this.pageprofiletab
        //  },1500);

    }

    closePopup(event) {
        if (event['error'] == false) {
            this.openConfirmation = false;
        }
        if (event['userConfirmation']) {
            this.openConfirmation = false;
            let body = document.getElementsByTagName('body')[0];
            body.classList.remove("body-overflow");
            this.removeImage();
        } else {
            this.openConfirmation = false;
            let body = document.getElementsByTagName('body')[0];
            body.classList.remove("body-overflow");
        }
    }




    showcoverdropdown() {
        if (this.coverdropdown == true) {
            this.coverdropdown = false;
        }
        else {
            this.coverdropdown = true;
        }
    }

    hidedropdown() {
        if (this.coverdropdown == true) {
            this.showupdatemenu = true;

        }
        else {
            this.showupdatemenu = false;
        }

    }

    // remove img drp down
    showdropdown() {
        this.showupdatemenu = true;
    }



    @HostListener('document:click', ['$event'])
    clickout(event) {

        if (this.cvrdropdown && this.user_type == 1) {
            if (this.cvrdropdown.nativeElement.contains(event.target)) {
                if (this.onlycvrdropdown.nativeElement.contains(event.target)) {
                    if (this.coverdropdown === true) {
                        this.coverdropdown = true;
                    }
                    else {
                        this.coverdropdown = false;
                    }
                }
                else {
                    if (this.coverdropdown) {
                        if (this.menusectionarea.nativeElement.contains(event.target) != undefined) {
                            this.showupdatemenu = true;
                            this.coverdropdown = true;

                        }
                        else {
                            this.showupdatemenu = true;
                            this.coverdropdown = false;
                        }
                    }

                }
            }
        }
        else {
            this.showupdatemenu = false;
            this.coverdropdown = false;
        }
    }

    removeImageConfirm(event) {
        this.removeImageReqTyp = event;
        this.dataConf['type'] = 0;
        this.dataConf['msg'] = "STUDY24X7";
        if (event == 1) {
            this.dataConf['error_msg'] = 'Are you sure you want to delete this cover pic?';
        } else if (event == 2) {
            this.dataConf['error_msg'] = 'Are you sure ?';
        }
        this.openConfirmation = true;
    }


    removeImage() {
        var delPic = {};
        delPic['token'] = this._constantService.getSessionDataBYKey('token');
        delPic['token_param'] = {};
        delPic['token_param']['device_type'] = 'w';
        delPic['token_param']['host'] = '';
        if (this.removeImageReqTyp === 1) {
            delPic['type'] = 'cp';
        } else {
            delPic['type'] = 'pp';
        }
        delPic['pg_uuid'] = this.page_uuid;

        this._constantService.fetchDataApi(this._constantService.getRemovePictureServiceUrl(), delPic).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                if (this.removeImageReqTyp === 1) {
                    this.coverPicPath = this._constantService.defaultCoverImgPath;
                    this.coverPic = false;
                } else {

                    if (this.pageType == 1) {
                        this.profilePicPath = this._constantService.defaultPageCollgImgPath;
                        this.profilePic = false;
                    }
                    if (this.pageType == 0) {
                        this.profilePicPath = this._constantService.defaultPageIndImgPath;
                        this.profilePic = false;
                    }

                }
            }
        });
    }

    latestPostInterest() {
        var lastInterest = {};
        lastInterest['token'] = this._constantService.getSessionDataBYKey('token');
        lastInterest['token_param'] = {};
        lastInterest['token_param']['device_type'] = 'w';
        lastInterest['token_param']['host'] = '';
        if (this.pageId != '') {
            lastInterest['page_uuid'] = this.page_uuid;
        } else {
            lastInterest['page_uuid'] = "";
        }

        if (!lastInterest['token']) {
            return;
        }

        this._constantService.fetchDataApi(this._constantService.getLtUserInterestServiceUrl(), lastInterest).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                //this._constantService.setLtPostInterest(responseData.LATEST_INTEREST_ID);
                this.ltPgPostInt = responseData.LATEST_INTEREST_ID;
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

    goToTop(event) {

        if (window.pageYOffset > 450) {
            window.scroll({
                top: 450,
                left: 0,
                behavior: 'smooth'
            });
        }

    }
    tipClose(tab) {
        if (tab == 1) {
            this.nocover = false;
        }
        if (tab == 2) {
            this.noname = false;
        }
        if (tab == 3) {
            this.noprofile = false;
        }
        if (tab == 'createCourse') {
            this.createCourse = false;
        }
        if (this.nocover == false && this.noname == false) {
            this.newPage = false;
        }
        if (this.nocover == false && this.noprofile == false && this.noname == false) {
            this.newPage = false;
        } else {
            this.newPage = true;
        }
    }
    createNameTip(index) {
        this.pageprofiletab = index;
        this.editPops = true;

        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");

    }

    frmPgInfo(event) {
        if (event == false) {
            this.editPops = false
        }
    }

    aboutWidgetObj(event) {
        if (event.edit == true) {
            this.pageprofiletab = event.tab;
            //this.pagedata['EDIT'] = 1;
        } else {
            this.pageprofiletab = event.tab;
        }
    }

    showmoreeditint() {
        this.showMore = !this.showMore;

        // this.moreinterestpopup=true;
        // let body = document.getElementsByTagName('body')[0];
        // body.classList.add("body-overflow");
    }

    hidemoreeditint() {
        this.moreinterestpopup = false;
        this.editInterest = false;
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }
    editinterest() {
        this.editInterest = true;
    }

    showimggllypopup() {
        this.pageprofiletab = 9;
        //        this.showopagephotopopup = true;
        //        let body = document.getElementsByTagName('body')[0];
        //        body.classList.add("body-overflow");
        let leftmenufixed = document.getElementsByClassName('rightmenu_fixed');
        for (let i = 0; i <= leftmenufixed.length; i++) {
            leftmenufixed[i].classList.add("fixedposition");
        }
    }

    hideimggllypopup() {
        this.showopagephotopopup = false;
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }

    url: any;

    getUrl(index) {
        if (this.galleryPath[index]) {
            var imgUrl = "url('" + this.galleryPath[index] + "')";
            return imgUrl;
        }
    }

    getPageGallery(count) {

        var gallery = {};
        gallery['token'] = this._constantService.getSessionDataBYKey('token');
        gallery['token_param'] = {};
        gallery['token_param']['device_type'] = 'w';
        gallery['token_param']['host'] = '';
        gallery['pg_uuid'] = this.page_uuid;
        gallery['count'] = count;

        this._constantService.fetchDataApi(this._constantService.getpageGalleryServiceUrl(), gallery).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                if (count == 1) {
                    this.gallery = [];
                    this.galleryPath = [];
                }
                var arr = [];
                for (var i = 0; i < responseData.PAGE_GALLERY_DATA.length; i++) {
                    responseData.PAGE_GALLERY_DATA[i].ADD_DATE_TIME = this.postData.getPostDateTime(responseData.PAGE_GALLERY_DATA[i].ADD_DATE_TIME);
                    if (i < 6) {
                        arr.push(responseData.PAGE_GALLERY_DATA[i]);
                    }
                    this.galleryPath[i] = responseData.PAGE_GALLERY_DATA[i].FILE_PATH + 'profile/' + responseData.PAGE_GALLERY_DATA[i].PAGE_GALLERY_UUID + '.png';
                }
                this.gallery.push.apply(this.gallery, arr);
            }
        })
    }

    reviewUpdate(event) {
        if (event == true) {
            this.isreviewed = 1;
            this.selectedWidget = 1;
        }

    }

    changeInterest(event) {
        this.pageInterest = event;
        //        if(this.pg_int!=event){
        //            this.getpageDetails(this.pageId);
        //        }
        this.Arr = [];
        this.ltIntShow = [];
        if (this.pageInterest.length > 4) {
            this.showIntArr = true;
        } else {
            this.showIntArr = false;
        }

        for (var i = 0; i < this.pageInterest.length; i++) {
            if (i < 4) {
                //  this.Arr.push(this.pageInterest[i]);
            } else {
                this.showArrr = false;
                //   this.ltIntShow.push(this.pageInterest[i]);
            }
        }
        this.getpageDetails(this.pageId);
    }

    cvrUpdTip(event) {
        if (window.pageYOffset > 450) {
            window.scroll({
                top: 450,
                left: 0,
                behavior: 'smooth'
            });
        }

        setTimeout(() => {
            var input = (<HTMLInputElement>document.getElementById('cvrDropdwn'));
            if (input != (undefined && null)) {
                input.click();
            }
        }, 200);

        setTimeout(() => {
            this.uploadcover();
        }, 300);
    }


    updatePgName(event) {
        this.pagename = event;
        this.noname = false;
        if (this.noname == false && this.noprofile == false && this.nocover == false) {
            this.newPage = false;
        }
    }

    postImageHide($event) {
        this.show_imageview = false;
    }
    postImageShow(typ) {
        if (typ == 1) {
            // let body = document.getElementsByTagName('body')[0];
            // body.classList.add("body-overflow");
            this.picTyp = 1;
            this.orgImagePath = this.profilePicPath.substring(0, this.profilePicPath.lastIndexOf('_')) + ".png";
            if (this.profilePicPath != this._constantService.defaultPageCollgImgPath && this.profilePicPath != this._constantService.defaultPageIndImgPath) {
                this.show_imageview = true;
            }
        } else {

            this.picTyp = 2;
            this.orgImagePath = this.coverPicPath.substring(0, this.coverPicPath.lastIndexOf('_')) + ".png";
            if (this.coverPicPath != this._constantService.defaultCoverImgPath) {
                this.show_imageview = true;
                let body = document.getElementsByTagName('body')[0];
                body.classList.add("body-overflow");
                return false;
            }
        }
    }

    unfollowCnfPop() {
        this.confirmUnfollow = true;
        this.dataConf['msg'] = "Page Unfollow"
        this.dataConf['error_msg'] = "Are you sure about unfollowing this page?";
        this.dataConf['type'] = 5;
        this.dataConf['pageId'] = this.page_uuid;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }

    unfollowCnfClose(event) {
        this.confirmUnfollow = event['closePopUpStatus'];
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
        if (event['unfollowStatus']) {
            this.isfollowed = 0;
            this.follow_count -= 1;
        }
    }

    getpgAboutPublic(paramsId) {
        var publicdetails = {};
        publicdetails['pg_uuid'] = paramsId;

        this._constantService.fetchDataApi(this._constantService.getpgDetailPublic(), publicdetails).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
0
                if (responseData.PAGE_ABOUT.PAGE_UUID != null) {
                    this.page_uuid = responseData.PAGE_ABOUT.PAGE_UUID;
                    this.showChildNow = true;
                }
                let localCookie = this._cookie.get('fllw1');
                this._cookie.delete('fllw1');
                if (localCookie == '1') {
                    this._cookie.set('fllw', localCookie);
                    this._cookie.set('pfFllwUuis', this.page_uuid);
                }

                let localCookiepg = this._cookie.get('pfFllwUuis');
                if (localCookiepg) {
                    this.pgFllwList = localCookiepg + ',' + this._cookie.get('pgFollowList');
                    this._cookie.delete('pfFllwUuis');
                }

                if (this.pgFllwList) {
                    this._cookie.set('pgFollowList', this.pgFllwList);
                }


                if (Object.keys(responseData.PAGE_ABOUT).length === 0) {
                    this._router.navigate(['']);
                }
                this.pageType = responseData.PAGE_ABOUT.TYPE;
                this.pgAddress = responseData.PAGE_ABOUT.ADDRESS;
                this.createdBy = responseData.PAGE_ABOUT.CREATED_BY;
                this.phone = responseData.PAGE_ABOUT.PHONE;
                this.email = responseData.PAGE_ABOUT.EMAIL;
                this.pageUrl = responseData.PAGE_ABOUT.WEBSITE;
                this.pageUrl = this.pageUrl.replace('/^(?:https?:\/\/)?(?:http\.)?/i', '');
                if (this._constantService.isExternalLink(this.pageUrl)) {
                    this.pageUrlHref = 'nofollow noopener'
                }

                this.user_type = responseData.PAGE_ABOUT.USER_TYPE;
                this.description = responseData.PAGE_ABOUT.DESCRIPTION;
                this.short_description = responseData.PAGE_ABOUT.SHORT_DESCRIPTION;
                this.pageTitle = this.postData.decodeURIPostData(responseData.PAGE_ABOUT.TITLE);
                if (responseData.PAGE_ABOUT.PROFILE_PHOTO_PATH != null && responseData.PAGE_ABOUT.PROFILE_PHOTO_PATH != "") {
                    this.profilePic = true;
                    this.profilePicPath = responseData.PAGE_ABOUT.PROFILE_PHOTO_PATH + "profile/" + responseData.PAGE_ABOUT.PAGE_UUID + "_150x150.png?v=" + responseData.IMG_UPD_DT
                    this.profilePicPathOrg = responseData.PAGE_ABOUT.PROFILE_PHOTO_PATH + "profile/" + responseData.PAGE_ABOUT.PAGE_UUID + "_2000.png?v=" + responseData.IMG_UPD_DT
                } else {

                    if (responseData.PAGE_ABOUT.TYPE == 0) {
                        this.profilePicPath = this._constantService.defaultPageIndImgPath;
                    } else if (responseData.PAGE_ABOUT.TYPE == 1) {
                        this.profilePicPath = this._constantService.defaultPageCollgImgPath;
                    }
                }
                if (responseData.PAGE_ABOUT.COVER_PHOTO_PATH != null && responseData.PAGE_ABOUT.COVER_PHOTO_PATH != "") {
                    this.coverPic = true;
                    this.coverPicPath = responseData.PAGE_ABOUT.COVER_PHOTO_PATH + "cover/" + responseData.PAGE_ABOUT.PAGE_UUID + "_1235x330.png?v=" + responseData.IMG_UPD_DT
                    this.coverPicPathOrg = responseData.PAGE_ABOUT.COVER_PHOTO_PATH + "cover/" + responseData.PAGE_ABOUT.PAGE_UUID + "_2000.png?v=" + responseData.IMG_UPD_DT
                } else {
                    this.coverPicPath = this._constantService.defaultCoverImgPath;
                }
                this.pageDetails = {
                    "PAGE_TITLE": this.pageTitle,
                    "PAGE_NAME": responseData.PAGE_ABOUT.PAGE_NAME,
                    "COURSE_COUNT": responseData.PAGE_ABOUT.PAGE_COURSE_COUNT,
                    "FOLLOWER_COUNT": responseData.PAGE_ABOUT.PAGE_FOLLOW_COUNT,
                    "PAGE_ID": this.pageId,
                    "POST_ID": this.postId,
                    "PROFILE_PHOTO_PATH": responseData.PAGE_ABOUT.PROFILE_PHOTO_PATH
                }
                this.reviewCount = responseData.PAGE_REVIEWS_RATINGS_COUNT;
                if (this.reviewCount == 0) {
                    this.hidereview = false;
                }

                //this._constantService.setPageTitle(this.pageTitle);
                this._constantService.setSessionJsonPair('page_title', this.page_title);
                if (responseData.PAGE_ABOUT.CLAIM_PAGE == 1) {
                    this.claimPage = true;
                } else {
                    this.claimPage = false;
                }

                if (responseData.PAGE_ABOUT.IS_VIEWED == null || responseData.PAGE_ABOUT.IS_VIEWED == 0) {
                    this.newpagewelcome = true;
                } else {
                    this.newpagewelcome = false;
                }

                //this._constantService.setPageDetails(this.pageDetails);
                this._constantService.setSessionJsonPair('page_details', JSON.stringify(this.pageDetails));


                if (responseData.PAGE_ABOUT.PAGE_COURSE_COUNT != null) {
                    this.course_count = parseInt(responseData.PAGE_ABOUT.PAGE_COURSE_COUNT);
                }
                if (responseData.PAGE_ABOUT.PAGE_UUID != null) {
                    this.page_uuid = responseData.PAGE_ABOUT.PAGE_UUID;
                }
                if (responseData.PAGE_ABOUT.PAGE_FOLLOW_COUNT != null) {
                    this.follow_count = parseInt(responseData.PAGE_ABOUT.PAGE_FOLLOW_COUNT);
                }

                this.pagedata['pageid'] = this.pageId;
                this.pagedata['user_type'] = 0;
                this.pagename = responseData.PAGE_ABOUT.PAGE_NAME;
                this.pageTitle = this.postData.decodeURIPostData(responseData.PAGE_ABOUT.TITLE);
                this.isfollowed = responseData.PAGE_ABOUT.ISFOLLOW;
                this.isreviewed = responseData.PAGE_ABOUT.ISREVIEW;
                var interests = responseData.PAGE_ABOUT.INTERESTS;
                if (interests.length > 4) {
                    this.pageInterest = [];
                    for (var i = 0; i < 4; i++) {
                        this.pageInterest.push(interests[i])
                    }
                    this.showMore = false;
                } else {
                    this.pageInterest = interests;
                }


                if (this.coverPic == false) {
                    this.nocover = true;
                    this.newPage = true;
                }
                if (this.profilePic == false) {
                    this.noprofile = true;
                    this.newPage = true;
                }
                if (this.pagename == '' || this.pagename == null) {
                    this.noname = true;
                    this.newPage = true;
                }

                this.usrData['PROFILE_PIC_PATH'] = this.profilePicPath;
                this.usrData['USER_FULL_NAME'] = this.pageTitle;
                // title and description starts ****************************************
                if (responseData['PAGE_ABOUT']['TITLE']) {
                   
                    var pagetitle = this.postData.decodeURIPostData(responseData['PAGE_ABOUT']['TITLE']);
                    document.title = pagetitle + " - Study24x7";
                  
                } else {
                    document.title = "Study24x7 - A best place for collaborative learning & sharing";
                }


                // title and description end ****************************************

            } else {
                
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }


    getpgGalleryPublic(paramsId) {
        var pgGallery = {};
        pgGallery['pg_uuid'] = paramsId;
        this._constantService.fetchDataApi(this._constantService.getpgGalleryPublic(), pgGallery).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                var arr = [];
                this.galleryPath = [];
                for (var i = 0; i < responseData.PAGE_GALLERY_DATA.length; i++) {
                    responseData.PAGE_GALLERY_DATA[i].ADD_DATE_TIME = this.postData.getPostDateTime(responseData.PAGE_GALLERY_DATA[i].ADD_DATE_TIME);
                    if (i < 6) {
                        arr.push(responseData.PAGE_GALLERY_DATA[i]);
                    }
                    this.galleryPath[i] = responseData.PAGE_GALLERY_DATA[i].FILE_PATH + 'profile/' + responseData.PAGE_GALLERY_DATA[i].PAGE_GALLERY_UUID + '.png';
                }
                this.gallery.push.apply(this.gallery, arr);
            } else {
               
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    closeLoginPopUp(event) {
        this.openLoginPopup = false;
        if (event['LOGIN']) {
            this.withoutToken = false;
            this.activatedRoute.params.subscribe((params: Params) => {
                this.getUserDetail();
                this.getpageDetails(params['id']);
            });
        }
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
                this._constantService.setProfilePicPath(responseData.PROFILE_PHOTO_PATH + "profile/" + this._constantService.getSessionDataBYKey('u_id') + "_60x60.png?v=" + date.getTime())
                if (responseData.PROFILE_PHOTO_PATH)
                    this._constantService.setSessionJsonPair('p_pic', responseData.PROFILE_PHOTO_PATH + "profile/" + this._constantService.getSessionDataBYKey('u_id') + "_60x60.png?v=" + date.getTime());
            }
        });
    }

    postIdDlt(event) {
        this.postId = '';
    }

    loginpopupopen() {
        this.savePublicPostUrlFxn();
        this.openLoginPopup = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }

    hideSuggPg(event) {
        this.pageSuggPresent = false;
    }
    clickOnAssist() {
        if (this.withoutToken) {
            this.openLoginPopupType = 1;
            this.loginpopupopen();

        } else {
            this._router.navigate([this._constantService.askAssistantPath]);
            this._constantService.setSessionJsonPair('friend_user_id', 2);
        }
    }
    showPagePublish() {
        this.val = 2;
        this.pagepublishPopup = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }
    showDelete() {
        this.val = 1;
        this.deletePopup = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }
    closedelete() {
        this.deletePopup = false;
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }
    closePagePublish() {
        this.pagepublishPopup = false;
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }
    showpagefollow() {
        this.pageprofiletab = 20;
        if (this.followList == false) {
            this.followList = true;
            this.getFollowersList();
        }

    }

    getDeletePage() {
        var deletePage = {};
        deletePage['token'] = this._constantService.getSessionDataBYKey('token');
        deletePage['token_param'] = {};
        deletePage['token_param']['device_type'] = 'w';
        deletePage['token_param']['host'] = '';
        deletePage['pg_uuid'] = this.page_uuid;

        this._constantService.fetchDataApi(this._constantService.getdeletePage(), deletePage).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.val = 0;
                this._router.navigate(['']);
            }
            if (status == "error") {
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }


    getPagePublishUnpublish() {
        if (this.publish == 1) {
            this.publish = 0;
        } else {
            this.publish = 1;
        }
        var PagePublishUnpublish = {};
        PagePublishUnpublish['token'] = this._constantService.getSessionDataBYKey('token');
        PagePublishUnpublish['token_param'] = {};
        PagePublishUnpublish['token_param']['device_type'] = 'w';
        PagePublishUnpublish['token_param']['host'] = '';
        PagePublishUnpublish['publish'] = this.publish;
        PagePublishUnpublish['pg_uuid'] = this.page_uuid;

        this._constantService.fetchDataApi(this._constantService.getPageAboutPagePublishUnpublishServiceUrl(), PagePublishUnpublish).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.val = 0;
                this.closePagePublish();
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });


    }



    GETverifyPass() {
        var password = (<HTMLInputElement>document.getElementById("password")).value;
        var verifyPass = {};
        verifyPass['token'] = this._constantService.getSessionDataBYKey('token');
        verifyPass['token_param'] = {};
        verifyPass['token_param']['device_type'] = 'w';
        verifyPass['token_param']['host'] = '';
        verifyPass['pw'] = password;

        this._constantService.fetchDataApi(this._constantService.getverifyPass(), verifyPass).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                if (this.val = 2) {
                    this.getPagePublishUnpublish();
                } else if (this.val = 1) {
                    this.getDeletePage();
                }
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });

    }
    onScrollDown() {
        if (this.continueScroll) {
            this.getFollowersList();
        }
    }

    getFollowersList() {
        var followers = {};
        followers['token'] = this._constantService.getSessionDataBYKey('token');
        followers['token_param'] = {};
        followers['token_param']['device_type'] = 'w';
        followers['token_param']['host'] = '';
        followers['pg_uuid'] = this.page_uuid;
        followers['count'] = this.count;
        followers['r_count'] = 10;

        this._constantService.fetchDataApi(this._constantService.getPgFollowList(), followers).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                var ifollowers = responseData.FOLLOWER_LIST;
                if (responseData.FOLLOWER_LIST.length == 0) {     ///*******add by vijay**********///
                    this.isEmptyState = true;
                }                                                 ////********end by vijay***********///
                for (var i = 0; i < ifollowers.length; i++) {
                    ifollowers[i].LAST_ACTIVE_TIME = this.postData.getPostDateTime(ifollowers[i].LAST_ACTIVE_TIME);
                    ifollowers[i].FULL_NAME = ifollowers[i].FIRST_NAME + " " + ifollowers[i].LAST_NAME;
                    if (ifollowers[i].PROFILE_PHOTO_PATH == null) {
                        ifollowers[i].PROFILE_PHOTO_PATH = this._constantService.defaultImgPath
                    } else {
                        ifollowers[i].PROFILE_PHOTO_PATH = ifollowers[i].PROFILE_PHOTO_PATH + "profile/" + ifollowers[i].USER_ID + "_60x60.png";
                    }
                }
                if (ifollowers.length < 10) {
                    this.continueScroll = false;
                } else {
                    this.count++;
                    this.continueScroll = true;
                }
                this.followers.push.apply(this.followers, ifollowers);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });

    }



    showPageReport() {
        this.pageReport = !this.pageReport;
    }
    showpageDelPopup() {
        this.pagedeletePopup = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }
    hidepageDelPopup() {
        this.pagedeletePopup = false;
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }
    showPageReportPopup() {
        this.pageReportPopup = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }
    hidepageReportPopup(event) {
        this.pageReportPopup = false;
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }
    msgToPage() {
        this._constantService.setSessionJsonPair('page_uuid', this.page_uuid);
        this._constantService.setSessionJsonPair('page_title', this.pageTitle);
        this._constantService.setSessionJsonPair('friend_user_id', this.page_uuid);
        this._router.navigate(['/inbox/#' + this.page_uuid]);
    }

    msgToPageRes() {
        this._constantService.setSessionJsonPair('page_uuid', this.page_uuid);
        this._constantService.setSessionJsonPair('page_title', this.pageTitle);
        this._constantService.setSessionJsonPair('friend_user_id', this.page_uuid);
        this._constantService.setSessionJsonPair('fom_res', 1);
        this._router.navigate(['/inbox/#' + this.page_uuid]);
    }

    savePublicPostUrlFxn() {
        if (this.withoutToken) {
            this._constantService.setSessionJsonPair('publicClickedURL', 'page/' + this.page_uuid);
        }
    }
    pageAboutBio() {
        this._router.navigate(['/page/' + this.pageId + '/#About']);
    }

}
