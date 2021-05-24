import { Component, OnInit, AfterViewInit, EventEmitter, Output, HostListener, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EncryptionService } from './../../services/encryption.service';
import { ConstantService } from './../../services/constant.service';
import { UserInfo } from './../login/userInfo';
import { PostdataService } from './../../services/postdata.service';
import { CommonfunctionsService } from './../../services/commonfunctions.service';
import { Meta, Title } from '@angular/platform-browser';
import { PlatformLocation, Location } from '@angular/common';
import { CommonEmitterService } from 'src/app/services/common-emitter.service';
import { SlickCarouselComponent } from "ngx-slick-carousel";


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    providers: [ConstantService, EncryptionService, PostdataService, CommonfunctionsService],
    styleUrls: [
        './profile.component.scss',
        './newprofile.component.scss', '../../app.component.scss'
        // '../../sharedComponents/mmenu/slidemenu.css'
    ],
    host: {
        '(window:scroll)': 'onScroll($event)'
    }

})
export class ProfileComponent implements OnInit, AfterViewInit {
    removeImageReqTyp: any;
    username = '';
    showMyPages = true;
    oldtabId: string = '';
    tabid: string = "";
    id: string = "";
    courseSearch = '';
    userFullName: string;
    userID: any;
    conTab;
    courseTab: any;
    subTab: any;
    newUrl: any;
    oldUrl: any;
    corsTyp: string = '';
    getcourses: boolean = false;
    connClicked: boolean = false;
    userTyp: boolean;
    picTyp: number;
    cnId;
    cnclId;
    profileCoverTip;
    EmptySumm: boolean = false;
    Visited: boolean = false;
    is_viewed: number;
    @Output() connTab = new EventEmitter();
    arr = [];
    CommentPPath: string;
    checkprofile: boolean = false;
    profile;
    showfilter: boolean = true;
    U_id: any;
    usrId: number;
    showPreloader: boolean = false;
    userInfo: UserInfo;
    showbutton: boolean = true;
    userId: string = "";
    imageUpload: boolean = false;
    coverPicImgUpload: boolean = false;
    public userName = '';
    t: string;
    myprofile;
    conn_status = 0;
    isFollowed = 1;
    profileId;
    profilePicPath: string;
    coverPicPath: string;
    profilePicPathOrg: string;
    coverPicPathOrg: string;
    current_year;
    connectionTab = 1;
    user_summary = "";
    current_user = "";
    current_tab = "";
    profiletab = 1;
    aboutArr = {};
    dataConnection = {};
    friendsIds = "";
    postId = "";
    dataConf = {};
    openConfirmation: boolean = false;
    coverPic: boolean = false;
    profilePic: boolean = false;
    filters: string = "";
    pageTab: number = 1;
    acceptId = '';
    cancelId;
    sendId = '';
    following;
    connection;
    follower;
    coverdropdown: boolean = false;
    showupdatemenu: boolean = false;
    serviceResponse: boolean = false;
    uploadProfileCover: boolean = false;
    uploadProfile: boolean = false;
    makeFriends: boolean = false;
    expEdu: boolean = false;
    pageTip: boolean = false;
    addProfile: boolean = true;
    addfriends: boolean = true;
    addExperience: boolean = true;
    profilePath;
    coverPath;
    dataopen: boolean = false;
    showpopup: boolean = false;
    isScrolled = false;
    isScrolledright = false;
    currPos: Number = 0;
    startPos: Number = 0;
    changePos: Number = 0;
    changePos1: Number = 0;
    show_imageview: boolean = false;
    confirmUnfriend: boolean = false;
    myDir: any = 'isNotProfileOtherview';
    orgImagePath = "";
    @ViewChild('cvrdropdown', { read: ElementRef }) cvrdropdown: ElementRef;
    @ViewChild('onlycvrdropdown', { read: ElementRef }) onlycvrdropdown: ElementRef;
    //    @ViewChild('menusectionarea', {read: ElementRef}) menusectionarea: ElementRef;
    @ViewChild('menusectionarea', { read: ElementRef }) menusectionarea: ElementRef;
    showText = true;
    loader = false;
    publicView: boolean = false;
    openLoginPopup: boolean = false;
    openLoginPopupType = 1;
    userCred = '';
    userPwd = "";
    typ;
    isError: boolean = false;
    errorText = '';
    usrData = {};
    isMobileMenue: boolean = false;
    // ShowBtnListWeb: boolean = true;
    ShowBtnListMobile: boolean = false;
    altName = "";
    activeDoCheck: boolean = false;
    oldId: string = '';
    userEmail = '';
    isCratePagePopup: boolean;
    pageTitle: string;
    view: boolean = true;
    showAboutProfile: boolean;
    listShow: boolean;
    cancelRequest: boolean = false;
    resentStatusConnection: boolean;
    countEnrolledCourse = 0;
    otherUserDetails: any;
    screenSize: number;
    slickModalForEnrolledCourse = {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: false
    };
    pagesDetailsOnProfile=[];
    order: string = '';
    myEnrolledCourses: any=[];
    pageThreeDotList = "-1";
    showKnowYourselfPopup: boolean;
    userStatus: any;
    MsgPopUp = true;
    thankuMsgPopUp: boolean;
    updatedSuccessfully: boolean;


    constructor(

        public _constantService: ConstantService,
        public _router: Router,
        public _encryptionService: EncryptionService,
        private title: Title,
        private meta: Meta,
        public _commonfunctionService: CommonfunctionsService,
        private activatedRoute: ActivatedRoute,
        private postData: PostdataService,
        private location: PlatformLocation,
        private _location: Location,
        private changeDetector: ChangeDetectorRef,
        private commonEmitterService: CommonEmitterService
    ) {
        this.userInfo = new UserInfo();
        this.activatedRoute.params.subscribe(params => {
            if (this.userId != params.id) {
                this.view = false;
                setTimeout(() => {
                    this.view = true;
                    this.changeDetector.detectChanges();
                }, 500);
            }
        })
    }


    profilepopup(event) {
        console.log("fetch in");
        this.dataopen = false;
        if (event['status']) {
            //this.profilePicPath = event['image'];
            //this.orgImagePath = event['image'];
            fetch(event['image']).then(res => res.blob()).then(blob => {
                event['image'] = blob;
                this.uploadProfileFile(event, 1);
            });

        }else {
            document.body.classList.remove("body-overflow");
        }
    }

    openprofilepopup() {
        console.log("dataopen true");
        window.scrollTo(0, 0);
        this.dataopen = !this.dataopen;
        // this.postImageShow(0);
        document.getElementsByTagName('body')[0].classList.add('body-overflow');
    }

    opencover(event) {

        this.showpopup = false;
        if (event['status']) {
            if (event['image'] == undefined) {
                return false;
            }
            this.coverPicPath = event['image'];
            fetch(event['image']).then(res => res.blob()).then(blob => {
                event['image'] = blob;
                this.uploadCoverFile(event, 1);
            });
        }else {
            document.body.classList.remove("body-overflow");
        }
    }
    showBtnList() {
        // this.ShowBtnListWeb = false ;
        if (this.ShowBtnListMobile === false) {
            this.ShowBtnListMobile = true;
        } else {
            this.ShowBtnListMobile = false;
        }
    }

    uploadcover() {
        this.showpopup = !this.showpopup;
    }

    @HostListener('window:resize', ['$event'])

    onResize(event) {
        this.screenSize = window.innerWidth;
        if (window.innerWidth >= 1200) {
            var innerWindWidth = window.innerWidth - 18;
            // event.target.innerWidth;
            // if (document.getElementById("windiv")) {
            //     document.getElementById("windiv").style.width = innerWindWidth + "px";
            // }
        } else {
            // document.getElementById("windiv").style.width = "100%";
        }
        if (window.innerWidth <= 991 && window.innerWidth >= 768) {
            var rightwidth = document.getElementById("outerDivleft").offsetWidth;
            var rightinnwidth = rightwidth - 15;
            document.getElementById("someDiv").style.width = rightinnwidth + "px";
        }
        if (window.innerWidth > 991) {
            setTimeout(() => {
                var rightwidth = document.getElementById("outerDivright").offsetWidth;
                var rightinnwidth = rightwidth - 15;
                var leftId = document.getElementById("someDiv");
                var rightId = document.getElementById("someDivright");
                if (leftId == null && rightId !== null) {
                    document.getElementById("someDivright").style.width = rightinnwidth + "px";
                } else if (leftId !== null && rightId !== null) {
                    document.getElementById("someDiv").style.width = rightinnwidth + "px";
                    document.getElementById("someDivright").style.width = rightinnwidth + "px";
                }
            }, 1000);

        }
        if (window.innerWidth >= 600) {
            this.ShowBtnListMobile = false;
        }

        if (window.innerWidth > 991) {
            this.isMobileMenue = false;
        }

        if (window.innerWidth <= 600 && window.innerWidth >= 480) {
            this.slickModalForEnrolledCourse = {
                slidesToShow: 2.2,
                slidesToScroll: 2,
                infinite: false
            }
        };
        if (window.innerWidth < 480 && window.innerWidth >= 360) {
            this.slickModalForEnrolledCourse = {
                slidesToShow: 1.6,
                slidesToScroll: 1,
                infinite: false
            }
        };
        if (window.innerWidth < 360) {
            this.slickModalForEnrolledCourse = {
                slidesToShow: 1.2,
                slidesToScroll: 1,
                infinite: false
            }
        };


    }
    slickInit(e) {
        console.log(new Date().getMilliseconds() + "slickkkkk")
        console.log("slick initialized");

    }

    breakpoint(e) {
        console.log("breakpoint");
    }

    afterChange(e) {
        console.log("afterChange");
    }

    beforeChange(e) {
        console.log("beforeChange");
    }

    show_btn_list_oninit() {
        this.ShowBtnListMobile = false;
    }

    private checkScreenWidth() {
        this.t = this._constantService.getSessionDataBYKey('token');
        if (this.t != null && this.t != undefined && this.t != '') {
            var winwidth = window.innerWidth - 18;
            // if (window.innerWidth >= 1200) {
            //     document.getElementById("windiv").style.width = winwidth + "px";
            // } else {
            //     document.getElementById("windiv").style.width = "100%";
            // }
        }
        if (window.innerWidth <= 991 && window.innerWidth >= 768) {
            var rightwidth = document.getElementById("outerDivleft") ? document.getElementById("outerDivleft").offsetWidth : 15;
            var rightinnwidth = rightwidth - 15;
            if (document.getElementById("someDiv"))
                document.getElementById("someDiv").style.width = rightinnwidth + "px";
        }
        if (window.innerWidth > 991) {
            setTimeout(() => {
                var rightwidth = document.getElementById("outerDivright").offsetWidth;
                var rightinnwidth = rightwidth - 15;
                var leftId = document.getElementById("someDiv");
                var rightId = document.getElementById("someDivright");
                if (leftId == null && rightId !== null) {
                    document.getElementById("someDivright").style.width = rightinnwidth + "px";
                } else if (leftId !== null && rightId !== null) {
                    document.getElementById("someDiv").style.width = rightinnwidth + "px";
                    document.getElementById("someDivright").style.width = rightinnwidth + "px";
                }
            }, 1000);

        }
    }
    // ngOnChanges(){
    //   this.checkScreenWidth();
    // }

    onScroll(evt) {
        this.t = this._constantService.getSessionDataBYKey('token');
        if (this.t != null && this.t != undefined && this.t != '') {
            if (document.getElementById('someDivright')) {
                var secHeightright = document.getElementById('someDivright').offsetHeight;
            }
            if (document.getElementById('centersection')) {
                var secHeightcenter = document.getElementById('centersection').offsetHeight;
            }

            var innerWindHeight = window.innerHeight - 50;

            if (this.profiletab == 1) {
                var secHeight = document.getElementById('someDiv').offsetHeight;
                if (secHeightcenter > secHeight) {
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
                        this.changePos = secHeight - 100;
                        this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
                        if (this.currPos >= this.changePos) {
                            this.isScrolled = true;
                            document.getElementById("someDiv").style.top = 72 + "px";
                        } else {
                            this.isScrolled = false;
                        }
                    }
                }
                else {
                    this.isScrolled = false;
                }
            }
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

                    this.changePos1 = secHeightright - 100;
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
        if (window.innerWidth >= 600) {
            this.ShowBtnListMobile = false;
        }
    }

    ngDoCheck() {
        //this.publicView = false;
        this.profileNavigate();
        //this.follower = this._constantService.getFollowers();


        //                if (this.cnclId == true) {
        //                    this.following--;
        //                    this.cancelId = '';
        //                }
        if (this.cancelId != '') {
        }
        if (this.sendId != '') {
            this.following++;
            //this._constantService.setFollowings(this.following);
            this._constantService.setSessionJsonPair('followings', this.following);
            this.sendId = '';
        }
        if (this.acceptId != '' && this.myprofile == 2) {
            this.following++;
            //this._constantService.setFollowings(this.following);
            this._constantService.setSessionJsonPair('followings', this.following);
            this.connection++;
            //this._constantService.setConnection(this.connection);
            this._constantService.setSessionJsonPair('connection', this.connection);
            this.acceptId = '';
        } else if (this.acceptId != '' && this.acceptId == this.U_id) {
            this.follower++;
            //this._constantService.setFollowers(this.follower);
            this._constantService.setSessionJsonPair('followers', this.follower);
            this.connection++;
            //this._constantService.setConnection(this.connection);
            this._constantService.setSessionJsonPair('connection', this.connection);
            this.acceptId = '';
        }
        this.closePageTip(this.myprofile);

        if (this.activeDoCheck) {
            this.activatedRoute.params.subscribe((params: Params) => {
                if (params['id'] != null) {
                    if (this.oldId == '') {
                        this.oldId = params['id'];
                    } else if (params['id'] != this.oldId) {
                        this.oldId = params['id'];
                        window.location.reload();
                        this.activeDoCheck = false;
                    }
                }

            });
        }
        if (this.publicView == false && this.myprofile == 2) {
            this.follower = this._constantService.getSessionDataBYKey('followers');
            this.following = this._constantService.getSessionDataBYKey('followings');
            this.connection = this._constantService.getSessionDataBYKey('connection');
        }
    }


    ngOnInit() {
        this.onResize(null);
        this.screenSize = window.innerWidth;
        this.t = this._constantService.getSessionDataBYKey('token');
        this.myprofile = this._constantService.getSessionDataBYKey('my_profile');
        if (this.t && this.t != 'undefined') {
            this.publicView = false;
            if ((this._constantService.getSessionDataBYKey('mobile_verify') == 'false' && this._constantService.getEmailVer() == 'false') || this._constantService.getUserInterest() == '0') {
                this._router.navigate(['verification']);
            }
            var date = new Date();
            this.current_year = date.getFullYear();
            window.scrollTo(0, 0);
            this.activatedRoute.params.subscribe((params: Params) => {
                if (this.oldId == '') {
                    this.oldId = params['id'];
                } else if (this.oldId != params['id']) {
                    this.userDetails(params['id'], 1);
                    this.oldId = params['id'];
                }
                if (params['tabid'] == undefined || params['tabid'] == "" || params['tabid'] == null) {
                    this.tabid = "";
                } else {
                    this.tabid = params['tabid'];
                }
                this.id = params['id'];
                if (this.id) {
                    this.userName = params['id'];
                }
                if (this.tabid == null) {
                    this.dataConnection['userName'] = "";
                    this.activeDoCheck = true;
                } else {
                    var tabArr;
                    if (this.tabid.slice(0, 1) == "#" || this.tabid == "") {
                        if (this.tabid != "") {
                            tabArr = this.tabid.split(":");
                            this.newUrl = tabArr[0].slice(1, tabArr[0].length);
                            tabArr[0] = tabArr[0].slice(1, tabArr[0].length);
                            this.conTab = tabArr[1];
                        } else {

                            tabArr = "";
                        }
                        if (tabArr[0] == 'Pages') {
                            this.courseTab = tabArr[1];
                            this.profiletab = 6;
                            var pageTab = tabArr[1];
                            if (pageTab == "myPage") {
                                this.pageTab = 1;
                            } else if (pageTab == "followed") {
                                this.pageTab = 2;
                            } else if (pageTab == "suggested") {
                                this.pageTab = 3;
                            } this.profiletabClick(6)
                        } else if (tabArr[0] == 'Courses') {
                            if (this.myprofile == undefined) {
                                setTimeout(() => {
                                    this.courseTab = tabArr[1];
                                    this.profiletabClick(7)
                                }, 1000)
                            } else {
                                this.courseTab = tabArr[1];
                                this.profiletabClick(7)
                            }

                        } else if (tabArr[0] == 'Invite') {
                            this.profiletabClick(8)
                        } else if (tabArr[0] == '') {
                            this.profiletabClick(1)
                            this.profiletab = 1;
                            this.activeDoCheck = true;
                        }
                        else if (tabArr[0] == 'About') {
                            this.profiletabClick(2)
                            this.profiletab = 2;
                        } else if (tabArr[0] == 'connection') {
                            this.conTab = tabArr[1];
                            var tabIndex = tabArr[1];
                            this.profiletabClick(3)
                            this.profiletab = 3;
                            if (tabIndex == "connection") {
                                this.connectionTab = 1;
                            } else if (tabIndex == "followers") {
                                this.connectionTab = 2;
                            } else if (tabIndex == "following") {
                                this.connectionTab = 3;
                            } else if (tabIndex == "request") {
                                this.connectionTab = 4;
                            } else if (tabIndex == "suggestion") {
                                this.connectionTab = 5;
                            }
                        }
                        //this.getUserFollowerAndFollowing("","yes");
                        this.getUserDetail();
                        setTimeout(() => {
                            this.userDetails(params['id'], 1);
                            this._location.subscribe(x => this.back()
                            );
                        }, 1000);

                        // this.activeDoCheck = true;

                    }
                }
            }, error => {
                var responseData = error;
                if (responseData.status == 500) {
                    this._router.navigate(['500']);
                }
            });
        } else {
            this.publicView = true;
            this._constantService.getInterest();
            this.activatedRoute.params.subscribe((params: Params) => {
                if (params['id'] != null) {
                    if (params['id'] != this.current_user) {
                        window.scrollTo(0, 0);
                        this.current_user = params['id'];
                        this.getPublicProfileData(params['id']);
                    }
                } else {
                    this._router.navigate(['']);
                }
            });

        }

        this._commonfunctionService.latestPostInterest('');
        this.getMyPages('');
        this.getMyEnrolledCourse();

    }
    ngAfterViewChecked() {
        // this.checkScreenWidth();
    }


    back() {

    }

    ngAfterViewInit() {
        this.t = this._constantService.getSessionDataBYKey('token');
        if (this.t && this.t != 'undefined') {
            this.checkUsr();

            this.usrId = this._constantService.getSessionDataBYKey('u_id');
            this.profile = this._constantService.getSessionDataBYKey('my_profile');
            if (this.profile == 1) {
                this.checkprofile = true;
            }

            setTimeout(() => {
                if (this._constantService.getSessionDataBYKey('my_profile') != '2') {
                    this.userTyp = false;
                    var id1 = document.getElementById('Connections');
                    var id2 = document.getElementById('Followers');
                    var id3 = document.getElementById('Following');
                    if (id1 && id2 && id3 && !this.userEmail) {
                        id1.classList.add('cursolnone')
                        id2.classList.add('cursolnone');
                        id3.classList.add('cursolnone');
                    }
                } else if (this._constantService.getSessionDataBYKey('my_profile') == '2') {
                    this.userTyp = true;
                }
            }, 1000);
            let body = document.getElementsByTagName('body')[0];
            body.classList.remove("body-overflow");
            this.getUserExperienceDetails(this.userId);
            this.getUserEducationDetails(this.userId);
        }
        this.checkScreenWidth();
    }

    profileNavigate() {
        this.showfilter = true;
        if (this.U_id != this.usrId) {
            this.showfilter = false;
        }
        this.t = this._constantService.getSessionDataBYKey('token');
        if (!this.t) {
        } else {
            var tabIndex;
            this.activatedRoute.params.subscribe((params: Params) => {
                if (params['id'] != null) {
                    if (params['tabid'] != null) {
                        if (this.oldtabId == '') {
                            this.oldtabId = params['tabid'];
                        } else if (params['tabid'] != this.oldtabId) {
                            this.oldtabId = params['tabid'];
                            //                            window.location.reload();
                            if (params['tabid'] == "#connection:suggestion") {
                                this.profiletab = 3;
                                this.profiletabClick(3);
                            }
                        }
                    }
                    this.userId = params['id'];
                    if (params['id'] != this.current_user) {
                        window.scrollTo(0, 0);
                        this.current_user = params['id'];
                        if (this.current_user.slice(0, 1) == "#") {
                            var tabArr = this.current_user.slice(1, this.current_user.length).split(':');
                            tabIndex = tabArr[1];
                            if (tabIndex != this.current_tab) {
                                window.scrollTo(0, 0);
                                if (params['tabid'] == "#About") {
                                    this.profiletab = 2;
                                }
                                this.current_tab = tabIndex;
                                if (this.userId == "connection") {
                                    this.profiletab = 3;
                                    if (tabIndex == "connection") {
                                        this.connectionTab = 1;
                                    }
                                    else if (tabIndex == "followers") {
                                        this.connectionTab = 2;
                                    } else if (tabIndex == "following") {
                                        this.connectionTab = 3;
                                    } else if (tabIndex == "request") {
                                        this.connectionTab = 4;
                                    } else if (tabIndex == "suggestion") {
                                        this.connectionTab = 5;
                                    }
                                }
                            }
                        } else {
                            if (this.userId.slice(0, 1) != "#") {
                                this.connectionTab = 1;
                                this.dataConnection['userName'] = this.userId;
                            }

                        }

                    }
                }
            }, error => {
                var responseData = error;
                if (responseData.status == 500) {
                    this._router.navigate(['500']);
                }
            });

        }

    }

    connTabSwitch(index, profile) {
        if (this.myprofile == 2) {
            this.profiletab = 3;
            if (index == 1) {
                this.connClicked = true;
                this.connectionTab = 1;
                this._router.navigate(['profile/' + this.userName + '/#connection:connections']);
            };
            if (index == 2) {
                this.connectionTab = 2;
                this._router.navigate(['profile/' + this.userName + '/#connection:followers']);
            };
            if (index == 3) {
                this.connectionTab = 3;
                this._router.navigate(['profile/' + this.userName + '/#connection:following']);
            };
        }

    }

    profiletabClick(index) {
        this.postId = '';
        this.profiletab = index;
        this.oldUrl = this.newUrl;
        if (this.myprofile == 2) {
            if (index == 1) {
                this._router.navigate(['profile/' + this.userName]);
                this.newUrl = '';
            } else if (index == 2) {
                this._router.navigate(['profile/' + this.userName + '/#About']);
                this.newUrl = 'About';
                this.profiletab = 2;
            } else if (index == 3) {
                this._router.navigate(['profile/' + this.userName + '/#connection:connections']);
                if (this.conTab == 'connections') {
                    this._router.navigate(['profile/' + this.userName + '/#connection:connections']);
                }
                else if (this.conTab == 'followers') {
                    this._router.navigate(['profile/' + this.userName + '/#connection:followers']);
                }
                else if (this.conTab == 'following') {
                    this._router.navigate(['profile/' + this.userName + '/#connection:following']);
                }
                else if (this.conTab == 'request') {
                    this._router.navigate(['profile/' + this.userName + '/#connection:request']);
                }
                else if (this.conTab == 'suggestion') {
                    this._router.navigate(['profile/' + this.userName + '/#connection:suggestion']);
                }
                else if (this.conTab == 'requestSent') {
                    this._router.navigate(['profile/' + this.userName + '/#connection:requestSent']);
                }
                this.newUrl = 'connection';
            }
            else if (index == 6) {
                this._router.navigate(['profile/' + this.userName + '/#Pages:mypages']);
                if (this.courseTab == 'mypages') {
                    this._router.navigate(['profile/' + this.userName + '/#Pages:mypages']);
                } else if (this.courseTab == 'followedpages') {
                    this._router.navigate(['profile/' + this.userName + '/#Pages:followedpages']);
                } else if (this.courseTab == 'suggestedpages') {
                    this._router.navigate(['profile/' + this.userName + '/#Pages:suggestedpages']);
                }
                this.newUrl = 'Pages';

            }

            else if (index == 7) {
                this._router.navigate(['profile/' + this.userName + '/#Courses:allcourses']);
                if (this.courseTab == 'allcourses') {
                    this._router.navigate(['profile/' + this.userName + '/#Courses:allcourses']);
                    this.pageTab = 1;
                } else if (this.courseTab == 'mycourses') {
                    this.pageTab = 2;
                    this._router.navigate(['profile/' + this.userName + '/#Courses:mycourses']);
                }
                this.newUrl = 'Courses';
                this.getcourses = true;
            }
            else if (index == 8) {
                this._router.navigate(['profile/' + this.userName + '/#Invite']);
            }
        } else if (this.myprofile == 1 || this.myprofile == 0) {
            if (index == 1) {
                this._router.navigate(['profile/' + this.userName]);
                this.newUrl = '';
            } else if (index == 2) {
                setTimeout(() => {
                    this.profiletab = 2;
                    this._router.navigate(['profile/' + this.userName + '/#About']);
                    this.newUrl = 'About';
                }, 200)
            }
            else if (index == 3) {
                this._router.navigate(['profile/' + this.userName + '/#connection']);
                this.newUrl = 'connection';
            }
        }
    }

    checkUsr() {
        if (this._constantService.getSessionDataBYKey('username').trim() === this.userName) {
            this.myprofile = 2;
            this.dataConnection['connectionView'] = 2;
        }
    }

    userDetails(userId: string, val) {
        var user_details = {};
        user_details['token'] = this._constantService.getSessionDataBYKey('token');
        user_details['token_param'] = {};
        user_details['token_param']['device_type'] = "w";
        user_details['token_param']['host'] = '';
        if (userId == "" || userId == this._constantService.getSessionDataBYKey('username')) {
            this.myprofile = 2;
            this.dataConnection['connectionView'] = 2;
            this._constantService.setSessionJsonPair('my_profile', '1');
            user_details['myprofile'] = 'yes';
            user_details['username'] = '';
        } else {
            this.myprofile = 1;
            this.dataConnection['connectionView'] = 1;
            this._constantService.setSessionJsonPair('my_profile', '0');
            user_details['myprofile'] = 'no';
            user_details['username'] = userId;
        }

        this._constantService.fetchDataApi(this._constantService.getUserDetailsServiceUrl(), user_details).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            this.otherUserDetails = responseData;
            this.otherUserDetails.USER_EXP.ORGANIZATION = this.postData.decodeURIPostData(this.otherUserDetails.USER_EXP.ORGANIZATION);
            this.otherUserDetails.USER_EXP.POSITION = this.postData.decodeURIPostData(this.otherUserDetails.USER_EXP.POSITION);
            this.otherUserDetails.USER_EDU.COURSE = this.postData.decodeURIPostData(this.otherUserDetails.USER_EDU.COURSE);
            this.otherUserDetails.USER_EDU.INSTITUTE = this.postData.decodeURIPostData(this.otherUserDetails.USER_EDU.INSTITUTE);
            if (responseData.EMAIL) {
                this.userEmail = responseData.EMAIL;
            }

            if (status == this._constantService.success_msg) {
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.userID = responseData.USER_ID;

                this.updateProfileViewedByUrl(this.userID);

                this.username = responseData.USER_NAME;
                this.userFullName = responseData.FIRST_NAME + " " + responseData.LAST_NAME;
                this.pageTitle = this.postData.decodeURIPostData(this.userFullName);
                this.serviceResponse = true;

                document.title = responseData['FULL_NAME'] + " - Study24x7";
                this.altName = responseData['FULL_NAME'];
                if (responseData.USER_NAME == this._constantService.getSessionDataBYKey('username')) {
                    this._constantService.setSessionJsonPair('my_profile', '2');
                }
                if (this.myprofile == 2) {
                    this._constantService.setSessionJsonPair('u_id', responseData.USER_ID);
                }
                if (this.myprofile == 1) {
                    var frndUsrId = JSON.stringify(responseData.USER_ID);
                    this._constantService.setSessionJsonPair('friend_user_id', frndUsrId);
                }
                this.U_id = responseData.USER_ID;
                this.is_viewed = responseData.IS_VIEWED;
                if (this.is_viewed == 1) {
                    this.Visited = false;
                } else {
                    this.Visited = true;
                }

                this.userInfo.full_name = responseData.FULL_NAME;
                this.userName = responseData.USER_NAME;
                this.dataConnection['usr_name'] = this.userName;
                this.profileId = responseData.USER_ID;
                if (responseData.SUMMARY != 'null' && responseData.SUMMARY != null) {
                    this.user_summary = responseData.SUMMARY;
                    this.user_summary = this.postData.decodeURIPostData(this.user_summary);

                } else {
                    this.user_summary = "";
                    this.EmptySumm = true;
                    this.user_summary = this.postData.decodeURIPostData(this.user_summary);
                }
                if (responseData.PROFILE_PHOTO_PATH != "" && responseData.PROFILE_PHOTO_PATH != null) {
                    this.profilePic = true;
                    this.profilePicPath = responseData.PROFILE_PHOTO_PATH + "profile/" + responseData.USER_ID + "_150x150.png?v=" + responseData.IMG_UPD_DT;
                    this.profilePicPathOrg = responseData.PROFILE_PHOTO_PATH + "profile/" + responseData.USER_ID + "_2000.png?v=" + responseData.IMG_UPD_DT;
                    this.uploadProfile = false;
                } else {
                    this.profilePicPath = this._constantService.defaultImgPath;
                    this.uploadProfile = true;
                }

                if (responseData.COVER_PHOTO_PATH != "" && responseData.COVER_PHOTO_PATH != null) {
                    this.coverPic = true;
                    this.coverPicPath = responseData.COVER_PHOTO_PATH + "cover/" + responseData.USER_ID + "_1235x330.png?v=" + responseData.IMG_UPD_DT;
                    this.coverPicPathOrg = responseData.COVER_PHOTO_PATH + "cover/" + responseData.USER_ID + "_2000.png?v=" + responseData.IMG_UPD_DT;
                } else {
                    this.coverPicPath = this._constantService.defaultCoverImgPath;
                }

                if (responseData.CONNECTIONS == "0") {
                    this.pageTip = true;
                    this.makeFriends = true;
                }
                if (responseData.STATUS == "error") {
                    this._router.navigate(['/home']);
                }
                this.friendsIds = responseData.CONNECTIONS;
                if (this.myprofile == 2) {
                    this._constantService.setSessionJsonPair('connection', responseData.CONNECTIONS);
                    this._constantService.setSessionJsonPair('followers', responseData.FOLLOWER);
                    this._constantService.setSessionJsonPair('followings', responseData.FOLLOWING);
                } else {
                    this.connection = responseData.CONNECTIONS;
                    this.follower = responseData.FOLLOWER;
                    this.following = responseData.FOLLOWING;
                }
                this.userInfo.notification = responseData.NOTIFICATIONS;
                this.userInfo.message = responseData.MESSAGE;
                this.userInfo.cityid = responseData.CITY_ID;
                this.userInfo.stateid = responseData.STATE_ID;
                if (responseData.STATE_NAME != "") {
                    this.aboutArr['state'] = responseData.STATE_NAME;
                } else {
                    this.aboutArr['state'] = "";
                }
                if (responseData.CITY_NAME != "") {
                    this.aboutArr['city'] = responseData.CITY_NAME;
                } else {
                    this.aboutArr['city'] = "";
                }
                if (responseData.USER_EXP != {}) {
                    this.aboutArr['user_exp'] = responseData.USER_EXP;
                } else {
                    this.aboutArr['user_exp'] = "";
                }
                if (responseData.USER_EDU != {}) {
                    this.aboutArr['user_edu'] = responseData.USER_EDU;
                } else {
                    this.aboutArr['user_edu'] = "";
                }

                var expLength = Object.keys(responseData.USER_EXP).length;
                var eduLength = Object.keys(responseData.USER_EDU).length;

                if ((expLength == 0) || (eduLength == 0)) {
                    this.expEdu = true;
                }
                if (this.expEdu == false && this.makeFriends == false && this.uploadProfileCover == false) {
                    this.pageTip = false;
                }
                this.aboutArr['profile_view'] = this.myprofile;
                this.conn_status = responseData.CONN_STATUS;
                if (this.conn_status == 0 && responseData.ISFOLLOWING == "1") {
                    this.resentStatusConnection = true;
                }
                if (this._constantService.getSessionDataBYKey('username') !== this.userName) {
                    if (responseData.ISFOLLOWING == "1") {
                        this.isFollowed = 2;
                    } else { this.isFollowed = 1; }
                } if (this.U_id != this.usrId) {
                    this.showfilter = false;
                }
                this.showAboutProfile = true;
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    updateProfileViewedByUrl(userId) {
        var params = {
            token: this._constantService.getSessionDataBYKey('token'),
            token_param: {
                device_type: 'w',
                host: ''
            },
            uid: userId

        }
        this._constantService.fetchDataApi(this._constantService.getUpdateProfileViewedByUrl(), params).subscribe(data => {

        })
    }

    sendFriendRequest(event) {
        var sndFrndRequest = {};
        sndFrndRequest['token'] = this._constantService.getSessionDataBYKey('token');
        sndFrndRequest['token_param'] = {};
        sndFrndRequest['token_param']['device_type'] = 'w';
        sndFrndRequest['token_param']['host'] = '';
        var target = event.currentTarget;
        var idAttr = target.attributes.id;
        sndFrndRequest['conrecid'] = idAttr.nodeValue;

        this._constantService.fetchDataApi(this._constantService.getSendConnectionRequestServiceUrl(), sndFrndRequest).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {

                if (responseData.FOLLOWERS == 1) {
                    this.follower++;
                }
                this._constantService.setSessionJsonPair('followers', this.follower);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.conn_status = 1;
                this.resentStatusConnection = true;
            } else if (status == this._constantService.error_token) {
                this.openConfirmation = true;
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

    requestFollow(event) {
        if (this.resentStatusConnection) {
            this.isFollowed = 2;
            return false;
        }

        this.showPreloader = true;
        this.showbutton = false;

        var target = event.currentTarget;
        var idAttr = target.attributes.id;
        var requestFollow = {};
        requestFollow['token'] = this._constantService.getSessionDataBYKey('token');
        requestFollow['token_param'] = {};
        requestFollow['token_param']['device_type'] = 'w';
        requestFollow['token_param']['host'] = '';
        requestFollow['conrecid'] = idAttr.nodeValue;

        this._constantService.fetchDataApi(this._constantService.getRequestFollowServiceUrl(), requestFollow).subscribe(data => {

            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.follower++;
                this._constantService.setSessionJsonPair('followers', this.follower);
                this.showPreloader = false;
                this.showbutton = true;
                this.isFollowed = 2;
                this.resentStatusConnection = true;

                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
            } else if (status == this._constantService.error_token) {
                this.openConfirmation = true;
            } else {
                this.showPreloader = false;
                this.showbutton = true;
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


    showcoverdropdown() {
        if (this.coverdropdown === true) {
            this.coverdropdown = false;
        }
        else {
            this.coverdropdown = true;
        }
    }
    showdropdown() {
        this.showupdatemenu = true;
    }
    hidedropdown() {
        if (this.coverdropdown === true) {
            this.showupdatemenu = true;
        }
        else {
            this.showupdatemenu = false;
        }

    }

    @HostListener('document:click', ['$event'])
    clickout(event) {
        if (this.serviceResponse) {
            if (this.cvrdropdown && this.cvrdropdown.nativeElement.contains(event.target)) {
                if (this.onlycvrdropdown && this.onlycvrdropdown.nativeElement.contains(event.target)) {
                    if (this.coverdropdown === true) {
                        this.coverdropdown = true;
                    }
                    else {
                        this.coverdropdown = false;
                    }
                }
                else {
                    if (this.menusectionarea != undefined) {
                        if (this.menusectionarea.nativeElement.contains(event.target)) {
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
            else {
                this.showupdatemenu = false;
                this.coverdropdown = false;
            }
        }
    }





    requestUnfollow(event) {
        this.showPreloader = true;
        this.showbutton = false;
        var target = event.currentTarget;
        var idAttr = target.attributes.id;
        var requestUnfollow = {};
        requestUnfollow['token'] = this._constantService.getSessionDataBYKey('token');
        requestUnfollow['token_param'] = {};
        requestUnfollow['token_param']['device_type'] = 'w';
        requestUnfollow['token_param']['host'] = '';
        requestUnfollow['conrecid'] = idAttr.nodeValue;

        this._constantService.fetchDataApi(this._constantService.getRequestUnfollowServiceUrl(), requestUnfollow).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.follower--;
                this._constantService.setSessionJsonPair('followers', this.follower);
                this.showPreloader = false;
                this.showbutton = true;
                this.isFollowed = 1;
                this.resentStatusConnection = false;

                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
            } else if (status == this._constantService.error_token) {
                this.showPreloader = false;
                this.showbutton = true;
                this._constantService.clearUserInfo();

            } else {
                this.showPreloader = false;
                this.showbutton = true;
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


    getUserFollowerAndFollowing(userName: string, profileView: string) {
        var userFollowAndFollowing = {};
        userFollowAndFollowing['token'] = this._constantService.getSessionDataBYKey('token');
        userFollowAndFollowing['token_param'] = {};
        userFollowAndFollowing['token_param']['device_type'] = 'w';
        userFollowAndFollowing['token_param']['host'] = '';
        userFollowAndFollowing['username'] = userName;
        userFollowAndFollowing['myprofile'] = profileView;

        this._constantService.fetchDataApi(this._constantService.getUserFollowAndFollowingServiceUrl(), userFollowAndFollowing).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this._constantService.setFollowingId(responseData.FOLLOWING);
                this._constantService.setFollowedId(responseData.FOLLOWERS);
                this._constantService.setFriendsId(responseData.CONNECTIONS);

            } else if (status == this._constantService.error_token) {
                this._constantService.clearUserInfo();

                //this._router.navigate(['']);
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

    uploadProfileFile(event, typ) {
        this.imageUpload = true;
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
            formData.append("type", "pp");
        } else {
            formData.append("file", event['orgFile']);
            formData.append("type", "pp_org");
        }
        formData.append("pattchid", "");
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
            if (status == this._constantService.success_msg) {
                this.imageUpload = false;
                if (typ == 1) {
                    this.uploadProfile = false;
                    var date = new Date();
                    this.profilePic = true;
                    this.profilePicPath = responseData.FPATH + "profile/" + this._constantService.getSessionDataBYKey('u_id') + "_150x150.png?v=" + new Date().getTime();
                    this.profilePicPathOrg = responseData.FPATH + "profile/" + this._constantService.getSessionDataBYKey('u_id') + "_2000.png?v=" + responseData.IMG_UPD_DT;
                    this.CommentPPath = responseData.FPATH;
                    this._constantService.setSessionJsonPair('p_pic', this.profilePicPath);
                    this._constantService.setSessionJsonPair('profile_pic_s3', this.CommentPPath);
                    this.commonEmitterService.profileImageUpdated(true);

                }
            } else {
                this.showPreloader = false;
                this.showbutton = true;
                this.imageUpload = false;
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
        formData.append("pattchid", "0");
        formData.append("token", encData);
        if (typ == 1) {
            formData.append("file", event['image']);
            formData.append("type", "cp");
        } else {
            formData.append("file", event['orgFile']);
            formData.append("type", "cp_org");
        }
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
            if (status == this._constantService.success_msg) {
                if (typ == 1) {
                    this.uploadProfileCover = false;
                    this.imageUpload = false;
                    this.showbutton = true;
                    this.coverdropdown = false;
                    var date = new Date();
                    this.coverPic = true;
                    this.coverPicPath = responseData.FPATH + "cover/" + this._constantService.getSessionDataBYKey('u_id') + "_1235x330.png?v=" + responseData.IMG_UPD_DT;
                    this.coverPicPathOrg = responseData.FPATH + "cover/" + this._constantService.getSessionDataBYKey('u_id') + "_2000.png?v=" + responseData.IMG_UPD_DT;
                }
            } else {
                this.showPreloader = false;
                this.showbutton = true;
                this.imageUpload = false;
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


    updateConnreqAccpt(event) {
        this.showPreloader = true;
        this.showbutton = false;
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

                this.follower++;
                this._constantService.setSessionJsonPair('followers', this.follower);
                this.connection++;
                this._constantService.setSessionJsonPair('connection', this.connection);
                if (this._constantService.getFriendsId() != '' && this._constantService.getFriendsId() != null) {
                    var f_id = this._constantService.getFriendsId().split(",");
                    f_id.push(idAttr.nodeValue);
                    this._constantService.setFriendsId(f_id.toString());
                } else {
                    this._constantService.setFriendsId(idAttr.nodeValue.toString());
                }
                this.showPreloader = false;
                this.showbutton = true;
                this.conn_status = 2;
                this.isFollowed = 2;
                var element = document.getElementById('messageAfterConnectionSuccess');
                if (element) {
                    element.style.display = 'block';
                    setTimeout(() => {
                        element.style.display = 'none';
                    }, 4000);
                }

            } else if (status == this._constantService.error_token) {
                this.showPreloader = false;
                this.showbutton = true;
                this._constantService.clearUserInfo();

            } else {
                this.showPreloader = false;
                this.showbutton = true;
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


    updateConnreqReject(event) {
        this.showPreloader = true;
        this.showbutton = false;
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
                this.showPreloader = false;
                this.showbutton = true;
                this.conn_status = 0;
                this.isFollowed = 2;
            } else if (status == this._constantService.error_token) {
                this.showPreloader = false;
                this.showbutton = true;
                this._constantService.clearUserInfo();

            } else {
                this.showPreloader = false;
                this.showbutton = true;
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

    updateSourcePic(event) {
        event.target.src = this._constantService.defaultImgPath;
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

    changeFilter(event) {
        this.filters = event;
    }

    closePopup(event) {
        if (event['error'] == false) {
            this.openConfirmation = false;
            let body = document.getElementsByTagName('body')[0];
            body.classList.remove("body-overflow");
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


    cancelFrndReq(id) {
        var cancelReq = {};
        cancelReq['token'] = this._constantService.getSessionDataBYKey('token');
        cancelReq['token_param'] = {};
        cancelReq['token_param']['device_type'] = 'w';
        cancelReq['token_param']['host'] = '';
        cancelReq['conrecid'] = id;

        this._constantService.fetchDataApi(this._constantService.getCancelFrndReqServiceUrl(), cancelReq).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.conn_status = 0;
            }
        })
    }

    frmHeader(event) {
        this.acceptId = event;
    }
    frmFrnds(event) {
        this.cnclId = true;
        this.cnId = this._constantService.getSessionDataBYKey('followings');
        this.cnId--;
        this._constantService.setSessionJsonPair('followings', this.cnId);
        this.cancelId = event;
    }

    frmFrndsSnd(event) {
        this.cnclId = false;
        this.sendId = event;
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
        if (this.removeImageReqTyp == 1) {
            delPic['type'] = 'cp';
        }
        if (this.removeImageReqTyp == 2) {
            delPic['type'] = 'pp';
            this._constantService.setSessionJsonPair('p_pic', null);
            this._constantService.setSessionJsonPair('profile_pic_s3', null);
            this.postImageShow(0);
        }
        delPic['pg_uuid'] = '';
        delPic['pg_uuid'] = '';

        this._constantService.fetchDataApi(this._constantService.getRemovePictureServiceUrl(), delPic).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                if (this.removeImageReqTyp == 1) {
                    this.coverdropdown = false;
                    this.coverPicPath = this._constantService.defaultCoverImgPath;
                    this.coverPic = false;
                    this.uploadProfileCover = true;
                } else {
                    this.profilePicPath = this._constantService.defaultImgPath;
                    this.profilePic = false;
                    this.uploadProfile = true;
                }
            }
        });
    }

    tipClose(tab) {

        if (tab == 1) {
            this.makeFriends = false;
        }
        if (tab == 2) {
            this.uploadProfileCover = false;
        }
        if (tab == 3) {
            this.expEdu = false;
        }
        if (this.makeFriends == false && this.uploadProfileCover == false && this.expEdu == false) {
            this.pageTip = false;
        }
    }

    closePageTip(profile) {
        this.pageTip = false;
    }

    cvrUpdTip(event) {
        window.scrollTo(0, 0);
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


    cvrUpdClick1() {
        var input = (<HTMLInputElement>document.getElementById('profileload'));
        if (input != (undefined && null)) {
            input.click();
        }
    }
    closenewpage() {
        this.Visited = false;
    }

    postImageHide($event) {
        this.show_imageview = false;
    }


    postImageShow(typ) {
        if (typ == 1) {
            this.picTyp = 1;
            this.orgImagePath = this.profilePicPath.substring(0, this.profilePicPath.lastIndexOf('_')) + ".png";
            if (this.profilePicPath != this._constantService.defaultImgPath) {
                this.show_imageview = true;
            }
        } else if (typ == 2) {
            this.picTyp = 2;
            this.orgImagePath = this.coverPicPath.substring(0, this.coverPicPath.lastIndexOf('_')) + ".png";
            if (this.coverPicPath != this._constantService.defaultCoverImgPath) {
                this.show_imageview = true;
                let body = document.getElementsByTagName('body')[0];
                body.classList.add("body-overflow");
                return false;
            }

            this.picTyp = 2;
            this.orgImagePath = this.coverPicPath.substring(0, this.coverPicPath.lastIndexOf('_')) + ".png";

        }

    }

    unfriendCnfPop(event) {
        this.confirmUnfriend = true;
        var target = event.currentTarget;
        var idAttr = target.attributes.id;
        this.dataConf['msg'] = "Unfriend"
        this.dataConf['error_msg'] = "Are you sure about this?";
        this.dataConf['type'] = 6;
        this.dataConf['userId'] = idAttr.nodeValue;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }

    unfriendCnfClose(event) {
        this.confirmUnfriend = event['closePopUpStatus'];
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
        if (event['unfriendStatus']) {
            this.conn_status = 0;
            this.connection--;
            //this._constantService.setConnection(this.connection);
            this._constantService.setSessionJsonPair('connection', this.connection);
        }
    }

    getPublicProfileData(name) {
        this.publicView = true;
        var publicData = {};
        publicData['username'] = name;

        this._constantService.fetchDataApi(this._constantService.getUserDetailsPublicServiceUrl(), publicData).subscribe(data => {
            var responseData: any = data;
            if (responseData.STATUS == this._constantService.success_msg) {

                this.serviceResponse = true;
                var date = new Date();
                this.userInfo.full_name = responseData.FULL_NAME;
                this.userName = responseData.USER_NAME;
                this.dataConnection['usr_name'] = this.userName;
                this.profileId = responseData.USER_ID;
                this.friendsIds = responseData.CONNECTIONS;
                this.connection = responseData.CONNECTIONS;
                this.follower = responseData.FOLLOWER;
                this.following = responseData.FOLLOWING;
                this.userInfo.cityid = responseData.CITY_ID;
                this.userInfo.stateid = responseData.STATE_ID;

                if (responseData.SUMMARY != 'null' && responseData.SUMMARY != null) {
                    this.user_summary = responseData.SUMMARY;
                    this.user_summary = this.postData.decodeURIPostData(this.user_summary);
                } else {
                    this.user_summary = "";
                    this.EmptySumm = true;
                    this.user_summary = this.postData.decodeURIPostData(this.user_summary);
                }
                if (responseData.PROFILE_PHOTO_PATH != "" && responseData.PROFILE_PHOTO_PATH != null) {
                    this.profilePic = true;
                    this.profilePicPath = responseData.PROFILE_PHOTO_PATH + "profile/" + responseData.USER_ID + "_150x150.png?v=" + responseData.IMG_UPD_DT;
                    this.profilePicPathOrg = responseData.PROFILE_PHOTO_PATH + "profile/" + responseData.USER_ID + "_2000.png?v=" + responseData.IMG_UPD_DT;
                    this.uploadProfile = false;
                } else {
                    this.profilePicPath = this._constantService.defaultImgPath;
                    this.uploadProfile = true;
                }
                if (responseData.COVER_PHOTO_PATH != "" && responseData.COVER_PHOTO_PATH != null) {
                    this.coverPic = true;
                    this.coverPicPath = responseData.COVER_PHOTO_PATH + "cover/" + responseData.USER_ID + "_1235x330.png?v=" + responseData.IMG_UPD_DT;
                    this.coverPicPathOrg = responseData.COVER_PHOTO_PATH + "cover/" + responseData.USER_ID + "_2000.png?v=" + responseData.IMG_UPD_DT;
                } else {
                    this.coverPicPath = this._constantService.defaultCoverImgPath;
                }

                if (responseData.STATE_NAME != "") {
                    this.aboutArr['state'] = responseData.STATE_NAME;
                } else {
                    this.aboutArr['state'] = "";
                }
                if (responseData.CITY_NAME != "") {
                    this.aboutArr['city'] = responseData.CITY_NAME;
                } else {
                    this.aboutArr['city'] = "";
                }
                if (responseData.USER_EXP != {}) {
                    this.aboutArr['user_exp'] = responseData.USER_EXP;
                } else {
                    this.aboutArr['user_exp'] = "";
                }
                if (responseData.USER_EDU != {}) {
                    this.aboutArr['user_edu'] = responseData.USER_EDU;
                } else {
                    this.aboutArr['user_edu'] = "";
                }
                var expLength = Object.keys(responseData.USER_EXP).length;
                var eduLength = Object.keys(responseData.USER_EDU).length;

                if ((expLength == 0) || (eduLength == 0)) {
                    this.expEdu = true;
                }
                this.aboutArr['profile_view'] = this.myprofile;
                this.usrData['PROFILE_PIC_PATH'] = this.profilePicPath;
                this.usrData['USER_FULL_NAME'] = this.userInfo.full_name;

                // title and description starts ************************************
                //                var meta = document.getElementsByTagName("meta");
                //                for (var i = 0; i < meta.length; i++) {
                //                    if (meta[i].name == "description") {
                //                        if (responseData['SUMMARY']) {
                //                            meta[i].content = this.postData.decodeURIPostData(responseData['SUMMARY']);
                //                        } else {
                //                            meta[i].content = "";
                //                        }
                //                    }
                //                }
                //
                document.title = responseData['FULL_NAME'] + " - Study24x7";
                //
                //                var link = document.getElementsByTagName("link");
                //
                //                for (var i = 0; i < link.length; i++) {
                //                    if (link[i].rel == "canonical") {
                //                        link[i].href = document.URL;
                //                    }
                //                }
                //                if (responseData.SUMMARY) {
                //                    var desc = this.postData.decodeURIPostData(responseData['SUMMARY']);
                //                    this.meta.updateTag({property: "og:description", content: desc.slice(0, 160)});
                //                    this.meta.updateTag({name: "twitter:description", content: desc.slice(0, 160)});
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
                // var str = JSON.stringify(responseData);
                // str = this.postData.decodeURIPostData(str);

                // this.otherUserDetails = JSON.parse(str);
                this.otherUserDetails = responseData;
                this.otherUserDetails.USER_EXP.ORGANIZATION = this.postData.decodeURIPostData(this.otherUserDetails.USER_EXP.ORGANIZATION);
                this.otherUserDetails.USER_EXP.POSITION = this.postData.decodeURIPostData(this.otherUserDetails.USER_EXP.POSITION);
                this.otherUserDetails.USER_EDU.COURSE = this.postData.decodeURIPostData(this.otherUserDetails.USER_EDU.COURSE);
                this.otherUserDetails.USER_EDU.INSTITUTE = this.postData.decodeURIPostData(this.otherUserDetails.USER_EDU.INSTITUTE);

            } else {
                this._router.navigate(['']);
            }


        })
    }

    closeLoginPopUp(event) {
        this.openLoginPopup = false;
        if (event['LOGIN']) {
            this.publicView = false;
            this.activatedRoute.params.subscribe((params: Params) => {
                this.getUserDetail();
                this.userDetails(params['id'], 3);
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
            if (responseData.EMAIL) {
                this.userEmail = responseData.EMAIL;
            }
            var date = new Date();
            if (status == this._constantService.success_msg) {
                this.altName = responseData.FULL_NAME;
                this._constantService.setSessionJsonPair('full_name', responseData.FULL_NAME);
                this._constantService.setSessionJsonPair('u_id', responseData.USER_ID);
                this._constantService.setSessionJsonPair('username', responseData.USER_NAME.trim());
                this._constantService.setSummary(responseData.SUMMARY);
                this._constantService.setSessionJsonPair('connection', responseData.CONNECTIONS);
                this._constantService.setFollowers(responseData.FOLLOWER);
                this._constantService.setSessionJsonPair('follower', responseData.FOLLOWER);
                this._constantService.setSessionJsonPair('followings', responseData.FOLLOWING);
                this._constantService.setSessionJsonPair('profile_pic_s3', responseData.PROFILE_PHOTO_PATH);
                if (responseData.PROFILE_PHOTO_PATH)
                    this._constantService.setSessionJsonPair('p_pic', responseData.PROFILE_PHOTO_PATH + "profile/" + this._constantService.getSessionDataBYKey('u_id') + "_60x60.png?v=" + date.getTime());
            }
        });
    }

    loginpopupopen() {
        this.openLoginPopup = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }
    aboutUpdate(e) {
        this.userDetails("", 6);
    }

    displayMobileMenu() {
        this.isMobileMenue = !this.isMobileMenue;
    }
    hideMobileMenu() {
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
    sendToInbox() {
        this._constantService.setSessionJsonPair('user_name', this.userFullName);
        this._constantService.setSessionJsonPair('friend_user_id', this.userID);
        this._router.navigate(['/inbox/' + this.userName]);
    }
    msgToPageRes() {
        this._constantService.setSessionJsonPair('user_name', this.userFullName);
        this._constantService.setSessionJsonPair('friend_user_id', this.userID);
        this._constantService.setSessionJsonPair('page_title', this.pageTitle);
        this._constantService.setSessionJsonPair('fom_res', 1);
        this._router.navigate(['/inbox/' + this.userName]);
    }
    leftSidemenu() {
        // this.leftFilterslidebg = !this.leftFilterslidebg;
        this.isMobileMenue = !this.isMobileMenue;
        // this.isMobileMenue1 = !this.isMobileMenue1;
        //   if (this.leftFilterslidebg == true) {
        //     let body = document.getElementsByTagName('body')[0];
        //     body.classList.add("body-overflow");
        //   } else {
        //     let body = document.getElementsByTagName('body')[0];
        //     body.classList.remove("body-overflow");
        //   }
    }
    listDropDown() {
        this.listShow = !this.listShow;
    }
    ClickedOut(event) {
        if (event.target.id != this.profileId) {
            this.cancelRequest = false;
        }
        if (event.target.id != "dropDownBtnList") {
            this.listShow = false;
        }
        if (event.target.id != "pagedrpdown") {
            this.pageThreeDotList = '-1';
        }
    }
    getUserExperienceDetails(userId: string) {
        this.showPreloader = true;
        this.showText = false;
        var userExp = {};
        userExp['token'] = this._constantService.getSessionDataBYKey('token');
        userExp['token_param'] = {};
        userExp['token_param']['device_type'] = 'w';
        userExp['token_param']['host'] = '';
        if (userId == null) {
            this.showPreloader = false;
            this.showText = true;
            userExp['myprofile'] = 'yes';
            userExp['username'] = '';

        } else {
            this.showPreloader = false;
            this.showText = true;
            var urlParam = userId.split("?");
            userExp['myprofile'] = 'no';
            userExp['username'] = urlParam[0];

        }

        this._constantService.fetchDataApi(this._constantService.getUserExpDetailsServiceUrl(), userExp).subscribe(data => {
            // this.register_re = data["_body"];
            // let responseData = JSON.parse(this.register_re);
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                // this.showPreloader = false;
                // this.showText = true;
                // if (responseData.USER_EXP.length == 0) {
                //     this.expDetailsView = 2;
                //     this.showPreloader = false;
                //     this.showText = true;
                // } else {
                //     this.expDetailsView = 1;
                //     this.showPreloader = false;
                //     this.showText = true;
                // }
                // this.experience = responseData.USER_EXP;

                // for (var i = 0; i < this.experience.length; i++) {
                //     if (this.experience[i].SUMMARY != '') {
                //         this.experience[i].SUMMARY = this.postData.decodeURIPostData(this.experience[i].SUMMARY).trim();
                //         this.experience[i].SUMMARY = this.experience[i].SUMMARY;
                //     }
                //     if (this.experience[i].TO == null) {
                //         this.experience[i].TO = "Present";
                //     } else {
                //         this.EduYears = this.experience[i].TO;
                //     }
                // }
                // //this._constantService.setToken(responseData.TOKEN);
                // this._constantService.setSessionJsonPair('token', responseData.TOKEN);
            } else if (status == this._constantService.error_token) {
                this.showPreloader = false;
                this.showText = true;
                // this.sessionLogout.emit(true);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });

    }
    getUserEducationDetails(userId: string) {
        this.showPreloader = true;
        this.showText = false;
        var userEdu = {};
        userEdu['token'] = this._constantService.getSessionDataBYKey('token');
        userEdu['token_param'] = {};
        userEdu['token_param']['device_type'] = 'w';
        userEdu['token_param']['host'] = '';
        if (userId == null) {
            this.showPreloader = false;
            this.showText = true;
            userEdu['myprofile'] = 'yes';
            userEdu['username'] = '';
        } else {
            this.showPreloader = false;
            this.showText = true;
            var urlParam = userId.split("?");
            userEdu['myprofile'] = 'no';
            userEdu['username'] = urlParam[0];
        }

        this._constantService.fetchDataApi(this._constantService.getUserEduDetailsServiceUrl(), userEdu).subscribe(data => {
            // this.register_re = data["_body"];
            // let responseData = JSON.parse(this.register_re);
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                // this.showPreloader = false;
                // this.showText = true;
                // if (responseData.USER_QUAL.length == 0) {
                //     this.eduDetailsView = 2;
                //     this.showPreloader = false;
                //     this.showText = true;
                // } else {
                //     this.eduDetailsView = 1;
                //     this.showPreloader = false;
                //     this.showText = true;
                // }
                // this.education = responseData.USER_QUAL;
                // for (var i = 0; i < this.education.length; i++) {
                //     this.education[i].SUMMARY = this.postData.decodeURIPostData(this.education[i].SUMMARY);
                //     if (this.education[i].TO == null) {
                //         this.education[i].TO = "Present";
                //     }
                //     this.education[i].INSTITUTE=this.postData.decodeURIPostData(this.education[i].INSTITUTE);
                //     this.education[i].COURSE=this.postData.decodeURIPostData(this.education[i].COURSE);

                // }
                // //this._constantService.setToken(responseData.TOKEN);
                // this._constantService.setSessionJsonPair('token', responseData.TOKEN);
            } else if (status == this._constantService.error_token) {
                this.showPreloader = false;
                this.showText = true;
                // this.sessionLogout.emit(true);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    getMyPages(laddtm) {
        var mypage = {};
        mypage['token'] = this._constantService.getSessionDataBYKey('token');
        mypage['token_param'] = {};
        mypage['token_param']['device_type'] = 'w';
        mypage['token_param']['host'] = '';
        mypage['count'] = '100';
        mypage['lpg_id'] = laddtm;
        mypage['flow'] = 'd';
        mypage['usr_name'] = this._constantService.getSessionDataBYKey('username');

        this._constantService.fetchDataApi(this._constantService.getMyPageServiceUrl(), mypage).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == "success") {
                this.pagesDetailsOnProfile = responseData.PAGES;
                if (this.pagesDetailsOnProfile.length > 3) {
                    this.pagesDetailsOnProfile.splice(3);
                }

            } else {

            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }
    getMyEnrolledCourse() {
        var AllMyCourseProfile = {}
        AllMyCourseProfile['token'] = this._constantService.getSessionDataBYKey('token');
        AllMyCourseProfile['token_param'] = {};
        AllMyCourseProfile['token_param']['device_type'] = 'w';
        AllMyCourseProfile['token_param']['host'] = '';
        AllMyCourseProfile['index'] = '0';
        AllMyCourseProfile['r_count'] = "";
        AllMyCourseProfile['order'] = this.order;
        AllMyCourseProfile['cor_ty'] = "";
        AllMyCourseProfile['search_text'] = "";
        AllMyCourseProfile['levels'] = "";
        AllMyCourseProfile['lanids'] = "";

        this._constantService.fetchDataApi(this._constantService.getMyEnrolledCourse(), AllMyCourseProfile).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.myEnrolledCourses = responseData.PAGE_COURSES;

            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });

    }
    copyProfileUrl() {
        var url = window.location.origin + "/profile/" + this.userName;
        this.postData.copyPostURL(url);
    }
    copyPageUrl(uuid) {
        var url = window.location.origin + "/page/" + uuid;
        this.postData.copyPostURL(url);
    }

    editYourGoal() {
        this.showKnowYourselfPopup = true;
    }
    closeEditYourGoal() {
        this.showKnowYourselfPopup = false;
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
}
