import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, HostListener } from '@angular/core';
import { ConstantService } from './../../services/constant.service';
import { EncryptionService } from './../../services/encryption.service';
import { PostdataService } from './../../services/postdata.service';
import { Router } from '@angular/router';
import { ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CoursepostComponent } from './../../sharedComponents/postComponents/coursepost/coursepost.component';
import { CookieService } from 'ngx-cookie-service';


// import {CoursereferenceComponent} from './../../sharedComponents/coursereference/coursereference.component';
import { CourseDescriptionComponent } from './course-description/course-description.component';


@Component({
    selector: 'app-course-details',
    templateUrl: './course-details.component.html',
    styleUrls: ['./course-details.component.scss']
})
export class CourseDetailComponentss implements OnInit {
    urlRequested: any;
    CorsUrl: any;
    isSimilarCoursePresent: boolean = true;
    courseData = {};
    userPwd: any;
    typ: string;
    userCred: any;
    openLoginPopupType: number;
    errorText: any;
    isError: boolean;
    openLoginPopup: boolean = false;
    loadChild: boolean = false;
    openConfirmation: boolean = false;
    dataConf = {};
    withoutToken: boolean = false;
    countVideoPlay: number = 0;
    isReported: any;
    activeDoCheck: boolean = false;
    oldId = '';
    showThumbail: boolean;
    showPromoVideo: boolean = false;
    public promoVideoThumbnailPath: string = "";
    public promoVideoPath: string = "";
    showDays: boolean = false;
    courseReview = [];
    count: any;
    showUnlimited: boolean = false;
    ratingPercnt: number;
    rating = [];
    courseLanguage = [];
    languageList = [];
    detail: any = {};
    @ViewChild('container', { read: ViewContainerRef }) container;
    @ViewChild(CourseDescriptionComponent) courseDescription: CourseDescriptionComponent;
    @Input() pgData: object;
    @Input() coursedetailData;
    @Input() totalRatings: number;
    pageId;
    courseTitle = '';
    pageTitle = '';
    corsCoverPath = '';
    corsDescription = '';
    cost;
    dCost;
    corsType;
    btnStatus = '';
    publish;
    showReviewComment: number = 0;
    Corsid;
    factory;
    ref;
    preview;
    config;
    pg_id: any;
    sendData = {};
    postIds;
    showUnpublished: boolean = false;
    validity: number = 0;
    totalRatingsCount: number = 0;
    isAdmin: any;
    isEnrolled: number;
    isTrialUser: number;
    isRenewable = false;
    switchToRating: boolean = false;
    similarCorsPresent: boolean;
    showSocialWidget = false;
    setCourseUrl: any = "";
    hidepopupcourse: boolean = false;
    courseDetails: any = [];
    archived: any;
    constructor(
        public _router: Router,
        private _cookie: CookieService,
        private _constantService: ConstantService,
        public _encryptionService: EncryptionService,
        private activatedRoute: ActivatedRoute,
        private componentFactoryResolver: ComponentFactoryResolver,
        private postData: PostdataService) { }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        // if (window.innerWidth >= 1200){
        //   var innerWindWidth = window.innerWidth - 18;
        //   event.target.innerWidth;
        //   this.resize_window = true;
        //   document.getElementById("windiv").style.width = innerWindWidth + "px";
        // }else{
        //   document.getElementById("windiv").style.width = "100%";
        // }
        if (window.innerWidth >= 768) {
            var rightwidth = document.getElementById("course_detail").offsetWidth;
            var rightinnwidth = rightwidth - 15;
            document.getElementById("someDiv").style.width = rightinnwidth + "px";
        } else {
            document.getElementById("someDiv").style.width = "100%";
        }
    }
    private checkScreenWidth() {
        // var winwidth = window.innerWidth - 18;
        // if (window.innerWidth >= 1200) {
        //
        //     document.getElementById("windiv").style.width = winwidth + "px";
        // } else {
        //     document.getElementById("windiv").style.width = "100%";
        // }
        if (window.innerWidth >= 768) {
            var rightwidth = document.getElementById("course_detail").offsetWidth;
            var rightinnwidth = rightwidth - 15;
            document.getElementById("someDiv").style.width = rightinnwidth + "px";
        } else {
            document.getElementById("someDiv").style.width = "100%";
        }
    }

    ngAfterViewInit() {
        this.checkScreenWidth();
    }

    ngOnInit() {
        let currentUrl = this._router.url.split('/');
        if (currentUrl[1] == 'coursedetail') {
            this.routeToLatestFxn(currentUrl[2]);
        }
        window.scrollTo(0, 0);
        this.activatedRoute.params.subscribe((params: Params) => {
            if (params['id'] != undefined && params['id'] != null) {
                this.urlRequested = params['id'];
                let paramArr = params['id'].split('-');
                this.CorsUrl = paramArr[paramArr.length - 1];
            }
        });


        var token = this._constantService.getSessionDataBYKey('token');
        //        var token = '';
        if (token && token != 'undefined') {
            this.withoutToken = false;
            this.getCourseDetail(this.CorsUrl);
        } else {
            this.withoutToken = true;
            this.getCourseDetailPublic(this.CorsUrl);
        }
        this.activeDoCheck = true;
        this.getAllLanguage();

        let publicPostURL = this._constantService.getSessionDataBYKey('publicClickedURL');

        if (publicPostURL != null && publicPostURL != undefined && publicPostURL != "undefined" && publicPostURL != '') {
            //this._constantService.setPublicClickedUrl('');
            this._constantService.setSessionJsonPair('publicClickedURL', '');
        }

        this._cookie.set('publicClickedURL', '', 0, '/');

    }


    goToPreviousUrl() {
        window.history.back();
    }

    ngDoCheck() {
        if (this.activeDoCheck) {
            this.activatedRoute.params.subscribe((params: Params) => {
                if (params['id'] != null) {
                    if (this.oldId == '') {
                        this.oldId = params['id'];
                    } else if (params['id'] != this.oldId) {
                        this.oldId = params['id'];
                        window.location.reload();
                    }
                }
            });
        }


    }

    routeToLatestFxn(uuid) {
        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";
        hitObj['p'] = uuid;
        hitObj['t'] = '2';




        this._constantService.fetchDataApi(this._constantService.getUuidToNameServiceUrl(), hitObj).subscribe(data => {
            var responseData: any = data;
            //            var status = responseData.STATUS;
            if (responseData.URL) {
                this._router.navigate(['course/' + responseData.URL]);
            } else if (status == this._constantService.error_token) {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired!";
                this.openConfirmation = true;
                return false;
            } else {
                this._router.navigate(['404']);
            }
        }), error => {
            var err = error;
            if (err.status == 500) {
                this._router.navigate(['500']);
            }
        };
    }


    getCourseDetail(corsId) {
        var CourseDetail = {};
        CourseDetail['token'] = this._constantService.getSessionDataBYKey('token');
        CourseDetail['token_param'] = {};
        CourseDetail['token_param']['device_type'] = 'w';
        CourseDetail['token_param']['host'] = '';
        CourseDetail['cors_uuid'] = '';
        CourseDetail['cors_id'] = corsId;



        this._constantService.fetchDataApi(this._constantService.getPageCourseDetailUrl(), CourseDetail).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == 'success') {

                this.courseDetails = responseData;

                this.Corsid = responseData.COURSE_DETAILS.COURSE_UUID;
                this.detail = responseData.COURSE_DETAILS;
                this.archived = this.detail.ARCHIVE;
                if (responseData.COURSE_DETAILS.PUBLISH == 4) {
                    this.openConfirmation = true;
                    this.dataConf['type'] = 2;
                    this.dataConf['msg'] = "STUDY24X7";
                    this.dataConf['error_msg'] = "This course is not available for now. Please try after some time";
                    this.openConfirmation = true;
                }
                console.log("xyz", this.detail);

                if (this.detail['COURSE_URL'] && (this.detail['URL'] != this.urlRequested)) {
                    //                    this._router.navigate(['course/' + this.detail['COURSE_URL']]);
                    window.history.pushState(this.urlRequested, null, 'course/' + this.detail['COURSE_URL']);
                }

                this.setCourseUrl = this.detail['COURSE_URL'];
                this.showSocialWidget = true;
                this.pageId = this.detail['PAGE_UUID'];
                if (this.detail['IS_EXPRIED'] == 2) {
                    this.isRenewable = true;
                }

                if (this.detail['COURSE_POST_ID'] != "") {
                    this.getLatestPostData(this.detail['COURSE_POST_ID']);
                } else {
                    this.showUnpublished = true;
                    if (this.detail['VALIDITY']) {
                        this.calValidityPeriod(this.detail['VALIDITY']);
                    } else {
                        this.calValidityPeriod("null");
                    }
                }
                this.isAdmin = responseData['IS_ADMIN'];
                var date = new Date;
                if (this.detail['PROMOTIONAL_VIDEO_PATH']) {
                    this.showPromoVideo = true;
                    this.promoVideoPath = this.detail['PROMOTIONAL_VIDEO_PATH'] + this.Corsid + ".mp4?v=" + this.detail['IMG_UPD_DT'];
                    this.promoVideoThumbnailPath = this.detail['PROMOTIONAL_VIDEO_PATH'] + this.Corsid + ".png?v=" + this.detail['IMG_UPD_DT'];
                }
                if (this.showPromoVideo == true && this.countVideoPlay == 0) {
                    this.countVideoPlay++;
                    this.showThumbail = false;
                }

                if (this.promoVideoThumbnailPath) {
                    this.showThumbail = true;
                }

                //this.isAdmin.emit(responseData['IS_ADMIN']);
                var corsType = this.detail['COURSE_TYPE'];
                this.isEnrolled = this.detail['IS_ENROLLED'];
                this.isTrialUser = this.detail['IS_SUBSCRIBE'];
                var isPurchased = this.detail['IS_PURCHASED'];
                var recentEnroll = this.detail['RECENT_ENROLLED'];
                this.publish = this.detail['PUBLISH'];
                if (this.publish == 2 || this.publish == 5) {
                    this._router.navigate(['/home']);
                }
                if (corsType == 1) {
                    if (this.isEnrolled == 0 && isPurchased == 0) {
                        this.btnStatus = 'Purchase';
                    }
                    else if (this.isEnrolled == 0 && isPurchased == 1) {
                        this.btnStatus = 'Enroll';
                    }
                    else if (this.isEnrolled == 1 && isPurchased == 1) {
                        this.btnStatus = 'Go To Course';
                    }
                } else {
                    if (this.isEnrolled == 0) {
                        this.btnStatus = 'Enroll';
                    }
                    if (this.isEnrolled == 1) {
                        this.btnStatus = 'Go To Course';
                    }
                }
                if (this.detail['LANGUAGE'] != null && this.detail['LANGUAGE'] != undefined) {
                    for (var j = 0; j < this.languageList.length; j++) {
                        if (this.detail['LANGUAGE'] == this.languageList[j].LANGUAGE_ID) {
                            this.courseLanguage.push(this.languageList[j].LANGUAGE);
                        }
                    }
                }
                if (this.detail['COURSE_TITLE'] != null) {
                    this.courseTitle = this.postData.decodeURIPostData(this.detail['COURSE_TITLE']);
                    console.log("in details", this.courseTitle);
                }

                // title and description starts ****************************************
                document.title = this.courseTitle + " - Study24x7";
                // title and description end ****************************************

                this.detail['COURSE_RATING'] = 1;

                if (this.detail['COVER_TYPE'] == "0") {
                    if (this.detail['COURSE_COVER_PHOTO_PATH'] != null) {
                        this.corsCoverPath = this.detail['COURSE_COVER_PHOTO_PATH'] + 'cover/' + this.detail['COURSE_UUID'] + '_1235x330.png';
                    } else {
                        this.corsCoverPath = this._constantService.defaultCoverImgPath;
                    }
                } else {
                    this.corsCoverPath = this.detail['COURSE_COVER_PHOTO_PATH'];
                }
                if (this.detail['COURSE_TYPE'] == 1) {
                    var cost = this.detail['COURSE_PRICE'];
                    for (var j = 0; j < cost.length; j++) {

                        if (cost[j].DISCOUNT_COST != '' && cost[j].DISCOUNT_COST != null) {
                            this.dCost = cost[j].DISCOUNT_COST;
                        } else {
                            this.detail['DISCOUNT_COST'] = '0';
                        }
                        if (cost[j].COST != '' && cost[j].COST != null) {
                            this.cost = cost[j].COST;
                        }
                    }
                } else {
                    this.dCost = "FREE";
                }
                if (this.detail['DESCRIPTION'] != null) {
                    this.corsDescription = this.postData.decodeURIPostData(this.detail['DESCRIPTION']);
                }

                if (this.detail['PUBLISH_DATE_TIME'] != null) {
                    this.detail['PUBLISH_DATE_TIME'] = this.detail['PUBLISH_DATE_TIME'];
                }
                if (this.detail['COURSE_RATING'] != null && this.detail['COURSE_RATING'] != undefined) {
                    this.detail['COURSE_RATING'] = 0;
                }
                if (this.detail['PAGE_PROFILE_PHOTO_PATH'] != null && this.detail['PAGE_PROFILE_PHOTO_PATH'] != "") {
                    this.detail['PAGE_PROFILE_PHOTO_PATH'] = this.detail['PAGE_PROFILE_PHOTO_PATH'] + 'profile/' + this.pageId + '_60x60.png?v=' + this.detail['ADD_DATE_TIME'];
                } else {
                    if (this.detail['PAGE_TYPE'] == 0) {
                        this.detail['PAGE_PROFILE_PHOTO_PATH'] = this._constantService.defaultPageIndImgPath;
                    } else {
                        this.detail['PAGE_PROFILE_PHOTO_PATH'] = this._constantService.defaultPageCollgImgPath;
                    }

                }

                if (this.detail['PAGE_NAME'] != '' && this.detail['PAGE_NAME'] != null) {
                    this.pg_id = this.detail['PAGE_NAME'];
                } else {
                    this.pg_id = this.detail['PAGE_UUID'];
                }
                this.pageTitle = this.postData.decodeURIPostData(this.detail['PAGE_TITLE']);
                this.detail['COURSE_TAGS'] = 'SSC';
                // this.detail['VALIDITY'] = ;
                //  this.detail['LEVEL'] = 'intermediate';
                this.getCourseLevel();
                this.getAllLanguage();
                this.switchToRating = true;

                this.loadChild = true;

            }else {
              this._router.navigate(['404'])
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    updateSourcePic(event) {
        event.target.src = this._constantService.defaultPageCollgImgPath;
    }

    getCourseDetailPublic(corsId) {
        var hitObj = {};
        hitObj['cors_uuid'] = "";
        hitObj['cors_id'] = corsId;



        this._constantService.fetchDataApi(this._constantService.getPublicCourseDataServiceUrl(), hitObj).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.Corsid = responseData.COURSE_DETAILS.COURSE_UUID;
                this.detail = responseData.COURSE_DETAILS;
                this.archived = this.detail.ARCHIVE;

                if (responseData.COURSE_DETAILS.PUBLISH == 4) {
                    this.openConfirmation = true;
                    this.dataConf['type'] = 2;
                    this.dataConf['msg'] = "STUDY24X7";
                    this.dataConf['error_msg'] = "This course is not available for now. Please try after some time";
                    this.openConfirmation = true;
                    this.pageId = this.detail['PAGE_UUID'];
                }

                if (this.detail['COURSE_URL'] && (this.detail['URL'] != this.urlRequested)) {
                    //                    this._router.navigate(['course/' + this.detail['COURSE_URL']]);
                    window.history.pushState(this.urlRequested, null, 'course/' + this.detail['COURSE_URL']);
                }

                this.pageId = this.detail['PAGE_UUID'];
                this.loadChild = true;
                var courseLevelId = this.detail['COURSE_LEVEL'];
                if (courseLevelId == 1) {
                    this.detail['LEVEL'] = 'Beginner Level';
                } else if (courseLevelId == 2) {
                    this.detail['LEVEL'] = 'Intermediate Level';
                } else if (courseLevelId == 3) {
                    this.detail['LEVEL'] = 'Advance Level';
                } else if (courseLevelId == 4) {
                    this.detail['LEVEL'] = 'All Levels';
                }

                if (this.detail['VALIDITY']) {
                    this.calValidityPeriod(this.detail['VALIDITY']);
                } else {
                    this.calValidityPeriod("null");
                }
                if (this.detail['URL'] != "") {

                    this.getLatestPostDataPublic(this.detail['URL']);
                } else {
                    this.showUnpublished = true;
                    if (this.detail['VALIDITY']) {
                        this.calValidityPeriod(this.detail['VALIDITY']);
                    } else {
                        this.calValidityPeriod("null");
                    }
                }


                var date = new Date;
                if (this.detail['PROMOTIONAL_VIDEO_PATH']) {
                    this.showPromoVideo = true;
                    this.promoVideoPath = this.detail['PROMOTIONAL_VIDEO_PATH'] + this.Corsid + ".mp4?v=" + responseData.IMG_UPD_DT;
                    this.promoVideoThumbnailPath = this.detail['PROMOTIONAL_VIDEO_PATH'] + this.Corsid + ".png?v=" + responseData.IMG_UPD_DT;
                }
                if (this.showPromoVideo == true && this.countVideoPlay == 0) {
                    this.countVideoPlay++;
                    this.showThumbail = false;
                }

                if (this.promoVideoThumbnailPath) {
                    this.showThumbail = true;
                }

                this.isAdmin = responseData['IS_ADMIN'];
                var corsType = this.detail['COURSE_TYPE'];
                //                this.isEnrolled = this.detail['IS_ENROLLED'];
                var isPurchased = 0;
                var recentEnroll = this.detail['RECENT_ENROLLED'];
                this.publish = this.detail['PUBLISH'];
                if (corsType == 1) {
                    if (this.isEnrolled == 0 && isPurchased == 0) {
                        this.btnStatus = 'Purchase';
                    }
                    else if (this.isEnrolled == 0 && isPurchased == 1) {
                        this.btnStatus = 'Enroll';
                    }
                    else if (this.isEnrolled == 1 && isPurchased == 1) {
                        this.btnStatus = 'Go To Course';
                    }
                } else {
                    if (this.isEnrolled == 0) {
                        this.btnStatus = 'Enroll';
                    }
                    if (this.isEnrolled == 1) {
                        this.btnStatus = 'Go To Course';
                    }
                }

                if (this.detail['LANGUAGE'] != null && this.detail['LANGUAGE'] != undefined) {
                    for (var j = 0; j < this.languageList.length; j++) {
                        if (this.detail['LANGUAGE'] == this.languageList[j].LANGUAGE_ID) {
                            this.courseLanguage.push(this.languageList[j].LANGUAGE);
                        }
                    }
                }
                if (this.detail['COURSE_TITLE'] != null) {
                    this.courseTitle = this.postData.decodeURIPostData(this.detail['COURSE_TITLE']);
                }
                this.detail['COURSE_RATING'] = 1;

                if (this.detail['COVER_TYPE'] == "0") {
                    if (this.detail['COURSE_COVER_PHOTO_PATH'] != null) {
                        this.corsCoverPath = this.detail['COURSE_COVER_PHOTO_PATH'] + 'cover/' + this.detail['COURSE_UUID'] + '_1235x330.png';
                    } else {
                        this.corsCoverPath = this._constantService.defaultCoverImgPath;
                    }
                } else {
                    this.corsCoverPath = this.detail['COURSE_COVER_PHOTO_PATH'];
                }

                if (this.detail['COURSE_TYPE'] == 1) {
                    var cost = this.detail['COURSE_PRICE'];
                    for (var j = 0; j < cost.length; j++) {

                        if (cost[j].DISCOUNT_COST != '' && cost[j].DISCOUNT_COST != null) {
                            this.dCost = cost[j].DISCOUNT_COST;
                        } else {
                            this.detail['DISCOUNT_COST'] = '0';
                        }
                        if (cost[j].COST != '' && cost[j].COST != null) {
                            this.cost = cost[j].COST;
                        }
                    }
                } else {
                    this.dCost = "FREE";
                }

                if (this.detail['DESCRIPTION'] != null) {
                    this.corsDescription = this.postData.decodeURIPostData(this.detail['DESCRIPTION']);
                }

                if (this.detail['PUBLISH_DATE_TIME'] != null) {
                    this.detail['PUBLISH_DATE_TIME'] = this.detail['PUBLISH_DATE_TIME'];
                }
                if (this.detail['COURSE_RATING'] != null && this.detail['COURSE_RATING'] != undefined) {
                    this.detail['COURSE_RATING'] = 0;
                }
                if (this.detail['TOTAL_COURSE_RATING_COUNT'] != null && this.detail['TOTAL_COURSE_RATING_COUNT'] != undefined) {
                    this.detail['TOTAL_COURSE_RATING_COUNT'] = 0;
                }
                if (this.detail['PAGE_PROFILE_PHOTO_PATH'] != null && this.detail['PAGE_PROFILE_PHOTO_PATH'] != "") {
                    this.detail['PAGE_PROFILE_PHOTO_PATH'] = this.detail['PAGE_PROFILE_PHOTO_PATH'] + 'profile/' + this.pageId + '_60x60.png?v=' + this.detail['ADD_DATE_TIME'];
                }

                else {
                    if (this.detail['PAGE_TYPE'] == 0) {
                        this.detail['PAGE_PROFILE_PHOTO_PATH'] = this._constantService.defaultPageIndImgPath;
                    } else {
                        this.detail['PAGE_PROFILE_PHOTO_PATH'] = this._constantService.defaultPageCollgImgPath;
                    }

                }

                if (this.detail['PAGE_NAME'] != '' && this.detail['PAGE_NAME'] != null) {
                    this.pg_id = this.detail['PAGE_NAME'];
                } else {
                    this.pg_id = this.detail['PAGE_UUID'];
                }
                this.pageTitle = this.postData.decodeURIPostData(this.detail['PAGE_TITLE']);
                this.detail['COURSE_TAGS'] = 'SSC';
                // this.detail['VALIDITY'] = ;
                //  this.detail['LEVEL'] = 'intermediate';
                this.getCourseLevel();
                this.getAllLanguage();
                this.switchToRating = true;
                this.loadChild = true;
            } else if (status == this._constantService.error_token) {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired!";
                this.openConfirmation = true;
                return false;
            } else if(status=="error"){
              this._router.navigate(['404']);
            }else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "Error";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
                return false;
            }
        }), error => {
            var err = error;
            if (err.status == 500) {
                this._router.navigate(['500']);
            }
        };
    }

    playPromoVideo() {
        this.showThumbail = false;
    }

    getLatestPostData(postIds: string) {
        //this.postPresent = true;
        var postData = {};
        postData['token'] = this._constantService.getSessionDataBYKey('token');
        postData['token_param'] = {};
        postData['token_param']['device_type'] = 'w';
        postData['token_param']['host'] = '';
        postData['pid'] = postIds;



        this._constantService.fetchDataApi(this._constantService.getLatestPostDataServiceUrl(), postData).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.createCoursePost(responseData.POST_DATA[0]);
                this.courseDescription.arr = responseData.POST_DATA[0]
                var postData = responseData.POST_DATA[0];
                this.isReported = postData['REPORTED'];
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    getLatestPostDataPublic(postIds: string) {
        //this.postPresent = true;
        var postData = {};
        // postData['token'] = this._constantService.getSessionDataBYKey('token');
        postData['token_param'] = {};
        postData['token_param']['device_type'] = 'w';
        postData['token_param']['host'] = '';
        postData['ques_str'] = postIds;



        this._constantService.fetchDataApi(this._constantService.getPublicProfilePost4ServiceUrl(), postData).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                responseData.POST_DATA[0].IS_ADMIN = 0;
                responseData.POST_DATA[0].IS_PUBLIC = 1;
                this.createCoursePost(responseData.POST_DATA[0]);
                this.courseDescription.arr = responseData.POST_DATA[0]
                var postData = responseData.POST_DATA[0];
                this.isReported = postData['REPORTED'];
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    preview_dropdown(index) {
        let y = document.getElementById(index).classList.contains("hidelist")
        if (!y) {
            document.getElementById(index).classList.add("hidelist");
        }
        else {
            document.getElementById(index).classList.remove("hidelist");
        }
    }

    showReviewComentBox(index) {
        this.showReviewComment = index;
    }

    calValidityPeriod(days) {
        this.showUnlimited = false;
        if (days < 30) {
            this.showDays = true;
            this.validity = days;
        } else if (days == 30 || days == 31) {
            this.showDays = false;
            this.validity = 1;
        } else if (days == "null") {
            this.showUnlimited = true;
        } else {
            this.showDays = false;
            var x = days / 30;
            this.validity = Math.floor(x);
        }
    }

    getAllLanguage() {
        this._constantService.fetchDataApi(this._constantService.getAllLanguageServiceUrl(), {})
            .subscribe(data => {
                let responseData: any = data;
                if (responseData.success = this._constantService.success_msg) {
                    this.languageList = responseData.LNG_LIST;
                    if (!this.withoutToken) {
                        if (this.detail['LANGUAGE'] != null && this.detail['LANGUAGE'] != undefined) {
                            for (var i = 0; i < this.languageList.length; i++) {
                                if (this.detail['LANGUAGE'] == this.languageList[i]['LANGUAGE_ID']) {
                                    this.courseLanguage = this.languageList[i]['LANGUAGE'];
                                }
                            }
                        }
                    } else {
                        if (this.detail['LANGUAGE'] != null && this.detail['LANGUAGE'] != undefined) {
                            for (var i = 0; i < this.languageList.length; i++) {
                                if (this.detail['LANGUAGE'] == this.languageList[i]['LANGUAGE_ID']) {
                                    this.courseLanguage = this.languageList[i]['LANGUAGE'];
                                }
                            }
                        }
                    }

                }
            });
    }

    getCourseLevel() {
        var courseLevelId = this.detail['LEVEL'];
        if (courseLevelId == 1) {
            this.detail['LEVEL'] = 'Beginner Level';
        } else if (courseLevelId == 2) {
            this.detail['LEVEL'] = 'Intermediate Level';
        } else if (courseLevelId == 3) {
            this.detail['LEVEL'] = 'Advance Level';
        } else if (courseLevelId == 4) {
            this.detail['LEVEL'] = 'All Levels';
        }
    }




    createCoursePost(data) {
        this.factory = this.componentFactoryResolver.resolveComponentFactory(CoursepostComponent);

        this.ref = this.container.createComponent(this.factory);
        this.ref.instance._ref = this.ref;
        this.ref.instance.arr = data;
        this.ref.instance.courseDetails = this.courseDetails;
    }




    loginpopupopen() {
        this.courseData['USER_FULL_NAME'] = this.courseTitle;
        this.courseData['PROFILE_PIC_PATH'] = this.corsCoverPath;
        this.openLoginPopup = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
        this._constantService.setSessionJsonPair('publicClickedURL', 'course/' + this.CorsUrl);
    }

    closeLoginPopUp(event) {
        this.openLoginPopup = false;
        if (event['LOGIN']) {
            this.withoutToken = false;
            //this._constantService.setPublicClickedUrl('course/' + this.Corsid);
            this._constantService.setSessionJsonPair('publicClickedURL', 'course/' + this.CorsUrl);
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
                //this._constantService.setFullName(responseData.FULL_NAME);
                this._constantService.setSessionJsonPair('full_name', responseData.FULL_NAME);
                //this._constantService.setUserId(responseData.USER_ID);
                this._constantService.setSessionJsonPair('u_id', responseData.USER_ID);
                //this._constantService.setUserName(responseData.USER_NAME.trim());
                this._constantService.setSessionJsonPair('username', responseData.USER_NAME.trim());
                this._constantService.setSummary(responseData.SUMMARY);
                //this._constantService.setConnection(responseData.CONNECTIONS);
                this._constantService.setSessionJsonPair('connection', responseData.CONNECTIONS);
                //this._constantService.setFollowers(responseData.FOLLOWER);
                this._constantService.setSessionJsonPair('followers', responseData.FOLLOWER);
                //this._constantService.setFollowings(responseData.FOLLOWING);
                this._constantService.setSessionJsonPair('followings', responseData.FOLLOWING);
                //this._constantService.setProfilePicS3Path(responseData.PROFILE_PHOTO_PATH);
                this._constantService.setSessionJsonPair('profile_pic_s3', responseData.PROFILE_PHOTO_PATH);
                //this._constantService.setProfilePicPath(responseData.PROFILE_PHOTO_PATH + "profile/" + this._constantService.getUserId() + "_60x60.png?v=" + date.getTime())
                if (responseData.PROFILE_PHOTO_PATH)
                    this._constantService.setSessionJsonPair('p_pic', responseData.PROFILE_PHOTO_PATH + "profile/" + this._constantService.getSessionDataBYKey('u_id') + "_60x60.png?v=" + date.getTime());
            }
        });
    }

    similarCourseEventHandler(event) {
        this.isSimilarCoursePresent = false;
    }
    validitypopuphide() {
        this.hidepopupcourse = false;
    }

    routTo() {
        this._router.navigate(['page/'+this.pageId])
        this.pageId='';
    }

}
