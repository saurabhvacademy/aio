import { Component, ViewChild, OnInit, Output, Input, EventEmitter, ComponentFactoryResolver, ViewContainerRef, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import { PostdataService } from './../../../services/postdata.service';
import { ConstantService } from './../../../services/constant.service';
import { Router } from '@angular/router';
import { EncryptionService } from './../../../services/encryption.service';
import { CommentComponent } from "./../commentView/comment.component";
import { ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GoogleAnalyticsService } from 'src/app/services/google-analytics.service';
import { LocalDataService } from 'src/app/services/local-data.service';
// declare var ga: any;


// import {SharescreencoursepostviewComponent} from "./../sharescreencoursepostview/sharescreencoursepostview.component";
@Component({
    selector: 'app-coursepost',
    templateUrl: './coursepost.component.html',
    // host: { "(document:click)": "handleClick($event)" },
    providers: [PostdataService],
    styleUrls: ['./../textpost/textpost-component.scss', './../textpost/allpost.css', './coursepost.component.scss',]
})
export class CoursepostComponent implements OnInit, AfterViewInit {
    onWall:boolean=false;
    isSubscribed: number;
    openLoginPopup: boolean = false;
    isTrialBased: number;
    postPublicShareLink: string;
    postID: string;
    isRenewable: boolean = false;
    rewableCost: any;
    IsRenewable: boolean = false;
    isReported: any;
    showInterests: boolean;
    showUnlimited: boolean = false;
    courseType: any = 0;
    pageUUID: any = '';
    coursid: any;
    openSharescreen: boolean;
    rating: any;
    courseTitle: any;
    corsCoverPath: string;
    ConfirmDeEnroll: boolean = false;
    pageTitle: any;
    isCommentHit: boolean = false;
    commImageDimns = '';
    pg_id: any;
    ltIntShow = [];
    showIntArr: boolean = false;
    ltTagsArr = [];
    id: string;
    shrCount;
    openConfirmation: boolean = false;
    vart: boolean = true;
    val: any;
    text: any;
    courseData = {};
    courseDetails: any = [];

    @ViewChild('container', { read: ViewContainerRef }) container;
    @ViewChild('reportPopup', { read: ElementRef }) reportPopup: ElementRef;
    @ViewChild(' shareList', { read: ElementRef }) shareList: ElementRef;
    @ViewChild('commentPlaceHolder', { read: ElementRef }) commentPlaceHolder: ElementRef;
    isError: boolean;
    errorText: any;
    openLoginPopupType: number;
    _ref: any;
    isEnrolled = false;
    show: boolean = false;
    config: string;
    hideSpan = 1;
    postmenu = false;
    saveCondition = false;
    importantCondition = false;
    savepagepopup = false;
    reportpopup = false;
    full_name: string;
    time: string;
    post_data: string = '';
    profile_pic_path: string;
    user_name: string;
    comment = 0;
    c_data: string = "";
    like = 0;
    share = 0;
    tagsArr = [];
    arr: any;
    comment_image;
    showCommentImg = 1;
    image_upload_url = '';
    u_id;
    post_id;
    likedetailspopup = false;
    edittextpost = false;
    // savepagepopup:boolean = false;
    my_profile: boolean = false;
    other_profile: boolean = false;
    editquestionpost = false;
    editPostId: string;
    DataView: boolean = false;
    seeLess: boolean = false;
    Datashow: boolean = false;
    latestComment: any;
    factory;
    ref;
    lastCommentId = 0;
    count = 0;
    savedFolderId;
    commentPresent: boolean = false;
    postTyp;
    file_path = "";
    uuid = "";
    interestObj = {};
    ConfirmDelete: boolean = false;
    dataConf = {};
    showPreloader: boolean = false;
    viewCommentList: boolean = false;
    post_data_trim = "";
    impLikeShareStatus = false;
    shareLikeShareStatus = false;
    userLikeShareList = {};
    date = new Date();
    isPagePost: boolean = false;
    pg_uuid = "";
    followme: boolean = false;
    hideBtn: boolean = false;
    postPresent: boolean;
    courseLanguage = '';
    languageList = [];
    coursePrice: any;
    courseDiscountedPrice: any
    showMe: boolean;
    validity: string = "";
    showDays: boolean = false;
    hideInDetail: boolean = false;
    altName = "";
    CorsUrl: any;
    urlRequested: any;
    isPublicView: boolean = false;
    socialFbShareUrl: string;
    socialTeitterShareUrl: string;
    socialLinkedInShareUrl: string;
    socialTelegramUrl: string;
    socialWhatsappLink: string;
    isSharePostList: boolean = false;
    enroledCount;
    USER_NAME: any;


    constructor(
        public postdata: PostdataService,
        public _constantService: ConstantService,
        public _encrypt: EncryptionService,
        public router: Router,
        private _cookie: CookieService,
        private activatedRoute: ActivatedRoute,
        private componentFactoryResolver: ComponentFactoryResolver,
        private googleAnalyticsService: GoogleAnalyticsService,
        public _localDataService:LocalDataService
    ) {

    }

    hideSocialList() {
        let id = this.u_id + '_' + this.post_id + '_courseList';
        if (document.getElementById(id)) {
            document.getElementById(id).style.display = "none";
            document.getElementById(id).style.top = "0px";
        }
        this.isSharePostList = false;
    }


    showSharePostList(event) {
        let id = this.u_id + '_' + this.post_id + '_courseList';
        event.preventDefault();
        event.stopPropagation();
        this.isSharePostList = true;

        if (event.clientY > 500) {
            setTimeout(() => {
                if (document.getElementById(id)) {

                    document.getElementById(id).style.top = "-105px";
                    document.getElementById(id).style.display = "block";

                }

            }, 200);

        }
        else {
            setTimeout(() => {
                if (document.getElementById(id)) {
                    document.getElementById(id).style.top = "0px";
                    document.getElementById(id).style.display = "block";
                }

            }, 200);
        }
    }


    ngOnInit() {


        let localCookie = this._cookie.get('enrollrd');

        this.postPublicShareLink = this._constantService.staticPostShareLink + this.arr['USER_POST_ID'] + '/' + this.arr['URL'];
        this.socialFbShareUrl = "https://www.facebook.com/dialog/feed?app_id=" + this._constantService.facebookAppId + "&link=" + this.postPublicShareLink;
        this.socialTeitterShareUrl = "https://twitter.com/intent/tweet?text=''" + "&url=" + this.postPublicShareLink;
        this.socialLinkedInShareUrl = "https://www.linkedin.com/sharing/share-offsite/?url=" + this.postPublicShareLink;
        this.socialTelegramUrl = "https://telegram.me/share/url?url=" + this.postPublicShareLink;
        this.socialWhatsappLink = "https://api.whatsapp.com/send?text=" + this.postPublicShareLink;

        this.USER_NAME=this.arr.USER_NAME;
        this.activatedRoute.params.subscribe((params: Params) => {
            if (params['id'] != undefined && params['id'] != null) {
                this.urlRequested = params['id'];
                let paramArr = params['id'].split('-');
                this.CorsUrl = paramArr[paramArr.length - 1];
            }
        });


        let tkn = this._constantService.getSessionDataBYKey('token');
        if (tkn && tkn != 'undefined') {
            this.isPublicView = false;
        }
        else {
            this.isPublicView = true;
            this._constantService.getInterest();
        }

        var herf = this.router.url;
        this.enroledCount = this.arr.COURSE_DETAIL.TOTAL_ENROLLED_USER;
        if (this.arr.COURSE_DETAIL.TRAIL_OFFSET) {
            this.enroledCount = parseInt(this.enroledCount) + parseInt(this.arr.COURSE_DETAIL.TRAIL_OFFSET);
        }


        var urlArr = herf.split("/");
        if (urlArr[1] === "saved" || urlArr[1] === "course") {
            this.showMe = false;
        } else {
            this.showMe = true;
        }
        if (urlArr[1] === "course") {
            this.hideInDetail = true;
            this.showInterests = false;

        } else {
            this.hideInDetail = false;
            this.showInterests = true;
        }
        if (this.arr['COURSE_DETAIL']['IS_EXPRIED'] == 2) {
            this.isRenewable = true;
        }
        this.postID = this.arr['USER_ID'] + ":" + this.arr['USER_POST_ID'] + ":" + this.arr['TYPE'];

        if (this._constantService.getSessionDataBYKey('interests')) {
            this.interestObj = JSON.parse(this._constantService.getSessionDataBYKey('interests'));
        }
        else {
            setTimeout(() => {
                if (this._constantService.getSessionDataBYKey('interests')) {
                    this.interestObj = JSON.parse(this._constantService.getSessionDataBYKey('interests'));
                }
            }, 1000);
        }
        //        this.interestObj = JSON.parse(this._constantService.getSessionDataBYKey('interests'));

        this.pageTitle = this.postdata.decodeURIPostData(this.arr['TITLE']);
        this.isTrialBased = this.arr['COURSE_DETAIL']['SUBSCRIPTION'];
        this.isSubscribed = this.arr['COURSE_DETAIL']['IS_SUBSCRIBE'];
        this.time = this.arr['ADD_DATE_TIME'];
        this.post_id = this.arr['USER_POST_ID'];

        this.altName = "aio " + this.arr['KEYWORDS'];
        if (this.arr['PAGE_NAME'] != '' && this.arr['PAGE_NAME'] != null) {
            this.pg_id = this.arr['PAGE_NAME'];

        } else {
            this.pg_id = this.arr['PAGE_UUID'];
        }
        this.pageUUID = this.arr['PAGE_UUID'];

        this.isReported = this.arr['REPORTED'];

        if (this.arr['COURSE_DETAIL']['COURSE_TITLE'] != null) {
            this.courseTitle = this.postdata.decodeURIPostData(this.arr['COURSE_DETAIL']['COURSE_TITLE']);
        }
        if (this.arr['PAGE_PROFILE_PHOTO_PATH'] != null && this.arr['PAGE_PROFILE_PHOTO_PATH'] != '') {
            var date = new Date();
            this.profile_pic_path = this.arr['PAGE_PROFILE_PHOTO_PATH'] + 'profile/' + this.arr['PAGE_UUID'] + '_60x60.png?v=' + date.getTime();
        } else {
            if (this.arr['PAGE_TYPE'] == "0") {
                this.profile_pic_path = this._constantService.defaultPageIndImgPath;
            } else {
                this.profile_pic_path = this._constantService.defaultPageCollgImgPath;
            }
        }
        if (this.arr['COURSE_DETAIL']['COURSE_COVER_PHOTO_PATH'] != null) {
            if (this.arr['COURSE_DETAIL']['COVER_TYPE'] == "0") {
                this.corsCoverPath = this.arr['COURSE_DETAIL']['COURSE_COVER_PHOTO_PATH'] + 'cover/' + this.arr['COURSE_DETAIL']['COURSE_UUID'] + '_1235x330.png';
            } else {
                this.corsCoverPath = this.arr['COURSE_DETAIL']['COURSE_COVER_PHOTO_PATH'];
            }
        } else {
            this.corsCoverPath = this._constantService.defaultCoverImgPath;
        }
        if (this.arr['SAVED'] == 1) {
            this.saveCondition = true;
        }
        if (this.arr['SAVED_POST_FLD_ID'] != 0) {
            this.savedFolderId = this.arr['SAVED_POST_FLD_ID'];
        }
        this.u_id = this.arr['USER_ID'];

        this.share = parseInt(this.arr['SHARED_COUNT']);

        this.comment = this.arr['COMMENT'];
        this.latestComment = this.arr['LT_COMM_DATA'];
        if (Object.keys(this.latestComment).length != 0) {
            this.viewCommentList = true;
        } else {
            this.viewCommentList = false;
        }
        if (this.comment > 1) {
            this.commentPresent = true;
        } else {
            this.commentPresent = false;
        }

        this.courseLanguage = this.arr['COURSE_DETAIL']['LANGUAGE_NAME'];

        this.getCourseLevel();
        //        this.getAllLanguage();

        this.like = this.arr['LIKED_COUNT'];

        if (this.arr['LIKED'] == 1) {
            this.importantCondition = !this.importantCondition;
        }
        this.courseType = this.arr['COURSE_DETAIL']['COURSE_TYPE'];
        if (this.arr['COURSE_DETAIL']['COURSE_TYPE'] == 1) {
            this.coursePrice = this.arr['COURSE_DETAIL']['COURSE_PRICE']['0']['COST'];
            this.courseDiscountedPrice = this.arr['COURSE_DETAIL']['COURSE_PRICE']['0']['DISCOUNT_COST'];
        }
        if (this.arr['COURSE_DETAIL']['RVALIDITY']) {
            this.validity = this.arr['COURSE_DETAIL']['RVALIDITY'];
        }
        if (this.arr['COURSE_DETAIL']['IS_ENROLLED'] == 0) {
            this.isEnrolled = false;
        } else {
            this.isEnrolled = true;
        }

        if (this.arr['INTERESTS'].length > 4) {
            for (var i = 0; i < 4; i++) {
                if (this.arr['INTERESTS'][i] != undefined) {
                    this.tagsArr[i] = this.arr['INTERESTS'][i];
                }
            }
            this.showIntArr = true;

            for (var i = 0; i < this.arr['INTERESTS'].length; i++) {
                if (this.arr['INTERESTS'][i + 4] != undefined && this.arr['INTERESTS'][i + 4] != null && this.arr['INTERESTS'][i + 4] != '') {
                    this.ltIntShow[i] = this.arr['INTERESTS'][i + 4];
                }
            }
        } else {
            this.tagsArr = this.arr['INTERESTS'];
        }

        this.arr['IS_ENROLLED'] = 1;
        this.arr['IS_EXPRIED'] = 1;

        if (this.arr['COURSE_DETAIL']['COURSE_PRICE'][0]) {
            if (this.arr['IS_ENROLLED'] == 1 && this.arr['IS_EXPRIED'] == 1 && this.arr['COURSE_DETAIL']['COURSE_PRICE'][0]['RENEWAL_COST'] != 0 && this.arr['COURSE_DETAIL']['COURSE_PRICE'][0]['RENEWAL_COST'] != null && this.arr['COURSE_DETAIL']['COURSE_PRICE'][0]['RENEWAL_COST'] != undefined) {
                this.IsRenewable = true;
                this.rewableCost = this.arr['COURSE_DETAIL']['COURSE_PRICE'][0]['RENEWAL_COST'];
            }
        }
        if (tkn && tkn != 'undefined') {
            if (localCookie == '1') {
                this._cookie.delete('enrollrd');
                this.enrollCourse();
            }
        }



    }



    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (this.showIntArr == true) {
            var innerWidthFull = window.innerWidth;
            if (document.getElementById(this.post_id + '_interestpos')) {
                var interestPosLeft = document.getElementById(this.post_id + '_interestpos').offsetLeft;

                var interestPosRight = innerWidthFull - interestPosLeft;
                if (window.innerWidth < 600) {
                    if (interestPosRight <= 185) {
                        document.getElementById(this.post_id + "_shftToLeft").style.left = "-148px";
                        document.getElementById(this.post_id + "_shiftArrowLeft").style.left = "155px";
                    } else {
                        document.getElementById(this.post_id + "_shftToLeft").style.left = "-9px";
                        document.getElementById(this.post_id + "_shiftArrowLeft").style.left = "15px";
                    }
                }
            }
        }
    }
    private findInterestPos() {
        if (this.showIntArr == true) {
            var innerWidthFull = window.innerWidth;
            if (document.getElementById(this.post_id + '_interestpos')) {
                var interestPosLeft = document.getElementById(this.post_id + '_interestpos').offsetLeft;

                var interestPosRight = innerWidthFull - interestPosLeft;
                if (window.innerWidth < 600) {
                    if (interestPosRight <= 185) {
                        document.getElementById(this.post_id + "_shftToLeft").style.left = "-148px";
                        document.getElementById(this.post_id + "_shiftArrowLeft").style.left = "155px";
                    } else {
                        document.getElementById(this.post_id + "_shftToLeft").style.left = "-9px";
                        document.getElementById(this.post_id + "_shiftArrowLeft").style.left = "15px";
                    }
                }
            }
        }
    }


    ngAfterViewInit() {

        this.findInterestPos()
        if (Object.keys(this.latestComment).length != 0) {
            this.latestComment['ADD_DATE_TIME'] = this.postdata.getPostDateTime(this.latestComment['ADD_DATE_TIME']);
            this.lastCommentId = this.latestComment.USER_COMMENT_ID;
            //this.latestComment['ADD_DATE_TIME'] = this.postdata.getPostDateTime(this.latestComment['ADD_DATE_TIME']);
            //this._constantService.setCommentData(this.latestComment);
            this.factory = this.componentFactoryResolver.resolveComponentFactory(CommentComponent);
            this.ref = this.container.createComponent(this.factory);
            this.ref.instance.arr = this.latestComment;
            this.ref.instance._ref = this.ref;
            if (this.comment > 1 && this.router.url.split('/')[1] == "post") {
                this.getComment();
            }
        }
        var herf = this.router.url;
        var urlArr = herf.split("/");
        if (urlArr[1] === "course") {
            document.getElementById('CourseClass').classList.add("CourseDetailWrapper");
        }

    }

    //    calValidityPeriod(days) {
    //        this.showUnlimited = false;
    //        if (days < 30) {
    //            this.showDays = true;
    //            this.validity = days;
    //        } else if (days == 30 || days == 31) {
    //            this.showDays = false;
    //            this.validity = 1;
    //        } else if (days == "null") {
    //            this.showUnlimited = true;
    //        } else {
    //            this.showDays = false;
    //            var x = days / 30;
    //            this.validity = Math.floor(x);
    //        }
    //    }

    savedpost() {
        if (this.saveCondition == false) {
            this.savepagepopup = !this.savepagepopup;
            let body = document.getElementsByTagName('body')[0];
            body.classList.add("body-overflow");
        } else {
            this.putUserPostUnsaved();
        }
    }

    //    goToDetail()     {
    //
    //        if (urlArr[1] === "course")     {
    //
    //        } else     {
    //            this.router.navigate(['/course/' + this.arr['COURSE_DETAIL']['COURSE_UUID']]    );
    //            }
    //
    //    }




    getAllLanguage() {

        this._constantService.fetchDataApiWithoutBody(this._constantService.getAllLanguageServiceUrl())
            .subscribe(data => {
                let responseData:any = data;
                if (responseData.success = this._constantService.success_msg) {
                    this.languageList = responseData.LNG_LIST;

                    if (this.arr['COURSE_DETAIL']['LANGUAGE'] != null && this.arr['COURSE_DETAIL']['LANGUAGE'] != undefined) {
                        for (var i = 0; i < this.languageList.length; i++) {
                            if (this.arr['COURSE_DETAIL']['LANGUAGE'] == this.languageList[i].LANGUAGE_ID) {
                                this.courseLanguage = this.languageList[i].LANGUAGE;
                            }
                        }
                    }
                }

            });
    }

    getCourseLevel() {
        var courseLevelId = this.arr['COURSE_DETAIL']['COURSE_LEVEL'];
        if (courseLevelId == 1) {
            this.arr['COURSE_DETAIL']['LEVEL'] = 'Beginner Level';
        } else if (courseLevelId == 2) {
            this.arr['COURSE_DETAIL']['LEVEL'] = 'Intermediate Level';
        } else if (courseLevelId == 3) {
            this.arr['COURSE_DETAIL']['LEVEL'] = 'Advance Level';
        } else if (courseLevelId == 4) {
            this.arr['COURSE_DETAIL']['LEVEL'] = 'All Levels';
        }
    }

    showPlaceHolder(event) {
        //        var id = this.u_id + "_" + this.post_id + "_comm";
        //        var txt = document.getElementById(id);
        //        txt.innerHTML = txt.innerHTML.replace(this._constantService.junkText, "");
        if (event.target.innerText.length == 0 || event.target.innerText.length == 1) {
            event.target.classList.add("placeholdercolor");
            event.target.classList.remove("option_inputt", "setwdth");
            event.target.innerText = this._constantService.commentPlaceHolder;
        }
    }

    hidePlaceHolder(event) {
        if (event.target.innerText == this._constantService.commentPlaceHolder) {
            event.target.innerText = "";
            var v = document.getElementById(event.target.id);
            v.classList.remove("placeholdercolor");
            v.classList.add("option_inputt", "setwdth");
            this.isCommentHit = false;
        }
        document.getElementById(event.target.id).focus();
    }

    addComment(event) {
        if (event.keyCode == 13 && !event.ctrlKey && !event.shiftKey) {
            if (this.isCommentHit) {
                return false;
            } else {
                this.isCommentHit = true;
            }


            this.c_data = this.postdata.postDataManipulation(event.target.id);
            if (this.c_data.length == 0 && this.comment_image == null) {
                this.confirmText(this.c_data, event);
                return false;
            } this.hideSpan = 0;
            this.viewCommentList = true;
            var id = event.target.id;
            var comment = {};
            comment['token'] = this._constantService.getSessionDataBYKey('token');
            comment['token_param'] = {};
            comment['token_param']['device_type'] = 'w';
            comment['token_param']['host'] = '';
            comment['pid'] = this.post_id;
            comment['cmda'] = this.postdata.encodeURIPostData(this.c_data);
            comment['cmid'] = "0";
            if (this.comment_image != null) {
                comment['fpath'] = this.file_path;
                comment['uuid'] = this.uuid;
                comment['dimns'] = this.commImageDimns;
            } else {
                comment['fpath'] = "";
                comment['uuid'] = "";
            }
            if (comment['cmda'].length == 0 && this.comment_image == null) {
                return false;

            }

            event.preventDefault();
            if (this.isCommentHit == true) {
                this._constantService.fetchDataApi(this._constantService.putCommentServiceUrl(), comment).subscribe(data => {
                    var responseData:any = data;
                    var status = responseData.STATUS;
                    if (status == this._constantService.success_msg) {
                        this.showCommentImg = 1;
                        this.comment_image = null;
                        this.hideSpan = 1;
                        var date = new Date();
                        var addComment = {};
                        var count = (<HTMLElement>document.getElementById(this.post_id + '_comm_count'));
                        if (count != null) {
                            if (parseInt(count.innerHTML) == 0) {
                                count.style.display = "inline-block";
                            }
                            count.innerHTML = (parseInt(count.innerHTML) + 1).toString();
                        } else {
                            this.comment = 1;
                        }
                        addComment['COMMENT_BY'] = this._constantService.getSessionDataBYKey('u_id');
                        addComment['IMAGE_PATH'] = this.file_path;
                        addComment['PARENT_ID'] = null;
                        addComment['PROFILE_PHOTO_PATH'] = this._constantService.getSessionDataBYKey('profile_pic_s3');
                        addComment['TEXT'] = this.c_data;
                        addComment['USER_COMMENT_ID'] = responseData.COMID;
                        addComment['USER_FULL_NAME'] = this._constantService.getSessionDataBYKey('full_name');
                        addComment['USER_NAME'] = this._constantService.getSessionDataBYKey('username');
                        addComment['USER_POST_ID'] = this.post_id;
                        addComment['UNIQUE_COMMENT_ATTACHMENT_ID'] = this.uuid;
                        //this._constantService.setCommentData(addComment);
                        addComment['ADD_DATE_TIME'] = this.postdata.getPostDateTime(date.getTime());
                        this.factory = this.componentFactoryResolver.resolveComponentFactory(CommentComponent);
                        this.ref = this.container.createComponent(this.factory, 0);
                        this.ref.instance.arr = addComment;
                        this.ref.instance._ref = this.ref;
                        event.target.innerHTML = this._constantService.commentPlaceHolder;
                        event.target.classList.add("placeholdercolor");
                        event.target.classList.remove("option_inputt", "setwdth");
                        this.hideSpan = 1;
                        this.uuid = "";
                        this.file_path = "";
                        //remove focus
                        window.getSelection().removeAllRanges();
                        this.isCommentHit = true;
                    } else if (status == this._constantService.error_token) {
                        this.dataConf['type'] = 4;
                        this.dataConf['msg'] = "Session Expire";
                        this.dataConf['error_msg'] = "Session Expired";
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
                        this.router.navigate(['500']);
                    }
                });
            }
        }
        else if (event.keyCode == 13 && event.keyCode == 17) {
            event.target.innerHTML = event.target.innerHTML + "<br>";
        }
    }

    getComment() {
        var commentData = {};
        commentData['token'] = this._constantService.getSessionDataBYKey('token');
        commentData['token_param'] = {};
        commentData['token_param']['device_type'] = 'w';
        commentData['token_param']['host'] = '';
        commentData['pid'] = this.post_id;
        commentData['lscmid'] = this.lastCommentId;
        commentData['count'] = 10;
        commentData['flow'] = 'd';



        this._constantService.fetchDataApi(this._constantService.getCommentOnPostServiceUrl(), commentData).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                if (responseData.COMMENT_DATA.length < 10) {
                    this.commentPresent = false;
                } else {
                    this.commentPresent = true;
                }
                this.lastCommentId = responseData.COMMENT_DATA[responseData.COMMENT_DATA.length - 1].USER_COMMENT_ID;
                for (var i = 0; i < responseData.COMMENT_DATA.length; i++) {
                    //this._constantService.setCommentData(responseData.COMMENT_DATA[i]);
                    responseData.COMMENT_DATA[i].ADD_DATE_TIME = this.postdata.getPostDateTime(responseData.COMMENT_DATA[i].ADD_DATE_TIME);
                    responseData.COMMENT_DATA[i].USER_POST_ID = this.post_id;
                    this.factory = this.componentFactoryResolver.resolveComponentFactory(CommentComponent);
                    this.ref = this.container.createComponent(this.factory);
                    this.ref.instance.arr = responseData.COMMENT_DATA[i];
                    this.ref.instance._ref = this.ref;
                }
            } else if (status == this._constantService.error_token) {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
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
                this.router.navigate(['500']);
            }
        });
    }

    confirmText(value, event) {
        event.preventDefault();
        event.stopPropagation();
    }

    postdropdown() {
        this.postmenu = !this.postmenu;
        // this.imonclick = true;
    }

    important() {
        if (this.vart == true) {
            this.vart = false;

            var importData = {};
            importData['token'] = this._constantService.getSessionDataBYKey('token');
            importData['token_param'] = {};
            importData['token_param']['device_type'] = 'w';
            importData['token_param']['host'] = '';
            importData['pid'] = this.post_id;
            if (this.importantCondition) {
                importData['status'] = 1;
            } else {
                importData['status'] = 0;
            }
            //importData['like_count'] = this.like;




            this._constantService.fetchDataApi(this._constantService.putUserPostImportantServiceUrl(), importData).subscribe(data => {
                var responseData:any = data;
                var status = responseData.STATUS;
                if (status == this._constantService.success_msg) {
                    this.vart = true;
                    this.importantCondition = !this.importantCondition;
                    if (this.importantCondition) {
                        this.like++;
                    } else {
                        this.like--;
                    }
                } else if (status == this._constantService.error_token) {
                    this.vart = true;
                    this.dataConf['type'] = 4;
                    this.dataConf['msg'] = "Session Expire";
                    this.dataConf['error_msg'] = "Session Expired";
                    this.openConfirmation = true;
                } else {
                    this.vart = true;
                    this.dataConf['type'] = 2;
                    this.dataConf['msg'] = "STUDY24X7";
                    this.dataConf['error_msg'] = responseData.ERROR_MSG;
                    this.openConfirmation = true;
                }
            }, error => {
                var responseData = error;
                if (responseData.status == 500) {
                    this.router.navigate(['500']);
                }
            });
        }
    }

    sharePostview() {
        this.openSharescreen = true;
        this.arr['EDIT_POST'] = false;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }

    sharecoursepostscreenhide(stextpara) {
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
        this.openSharescreen = false;
        if (stextpara) {
            this.share++;
        }
    }

    reprts(num) {
        if (num == 1) {
            this.reportpopup = true;
            let body = document.getElementsByTagName('body')[0];
            body.classList.add("body-overflow");
        }
        if (num == 2) {
            this.dataConf['type'] = 2;
            this.dataConf['msg'] = "STUDY24X7";
            this.dataConf['error_msg'] = "This post is already reported.";
            this.openConfirmation = true;
            //this.reportpopup = false;
        }
    }

    removePost(event) {

        var herf = this.router.url;
        var urlArr = herf.split("/");

        if (urlArr[1] !== "course") {
            if (event) {
                this._ref.destroy();
                this._constantService.callEmptyStateMethod();
            }
            this.reportpopup = false;
            let body = document.getElementsByTagName('body')[0];
            body.classList.remove("body-overflow");
        } else {
            if (event) {
                if (urlArr[1] === "course") {
                    this.dataConf['type'] = 2;
                    this.dataConf['msg'] = "STUDY24X7";
                    this.dataConf['error_msg'] = "Report saved successfully";
                    this.openConfirmation = true;
                    this.reportpopup = false;
                    window.location.reload();
                }
            } else {
                this.reportpopup = false;
            }
        }

    }

    addImageFile(event: any) {
        this.comment_image = event.target.files[0];
        let type = this.comment_image.name;
        var reader = new FileReader();
        var typearr = type.split(".");
        this.showPreloader = true;
        var size = Math.round(this.comment_image.size / 1000 / 1000);
        if (size <= 10) {
            if (typearr[1] == 'jpg' || typearr[1] == 'jpeg' || typearr[1] == 'JPG' || typearr[1] == 'JPEG' || typearr[1] == 'png' || typearr[1] == 'PNG') {
                this.showCommentImg = 2;
                reader.onload = (event: any) => {
                    this.image_upload_url = event.target.result;
                }
                reader.readAsDataURL(event.target.files[0]);
                var upload = {};
                upload['token'] = this._constantService.getSessionDataBYKey('token');
                upload['token_param'] = {};
                upload['token_param']['device_type'] = "w";
                upload['token_param']['host'] = "";
                var data = JSON.stringify(upload);
                var encData = this._encrypt.encrypt(data);
                let formData = new FormData();
                formData.append("file", this.comment_image);
                formData.append("pattchid", '0');
                formData.append("token", encData);
                formData.append("type", "4");

                this._constantService.uploadFileApi(this._constantService.getUploadFileServiceUrl(), formData).subscribe(data => {
                    var responseData:any = data;
                    var status = responseData.STATUS;
                    if (status == this._constantService.success_msg) {
                        this.autoFocus();
                        this.showPreloader = false;
                        this.commImageDimns = responseData.DIMENSION;
                        this.file_path = responseData.FPATH;
                        this.uuid = responseData.UUID;
                        //this._constantService.setToken(responseData.TOKEN);
                        this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                    } else if (status == this._constantService.error_token) {
                        this._constantService.clearUserInfo()
                        this.router.navigate(['']);
                        this.dataConf['type'] = 4;
                        this.dataConf['msg'] = "Session Expire";
                        this.dataConf['error_msg'] = "Session Expired";
                        this.openConfirmation = true;
                    } else {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "STUDY24X7";
                        this.dataConf['error_msg'] = responseData.ERROR_MSG;
                        this.openConfirmation = true;
                        this.showCommentImg = 1;
                        this.comment_image = null;
                    }
                }, error => {
                    var responseData = error;
                    if (responseData.status == 500) {
                        this.router.navigate(['500']);
                    }
                });
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = "Unable to support the selected file";
                this.openConfirmation = true;
                this.showCommentImg = 1;
                this.comment_image = null;
            }
        } else {
            this.dataConf['msg'] = "STUDY24X7";
            this.dataConf['type'] = 2;
            this.dataConf['error_msg'] = "File above 10mb is not allowed";
            this.openConfirmation = true;
            this.showCommentImg = 1;
            this.comment_image = null;
        }

    }

    putUserPostUnsaved() {
        var updatePostUnsaved = {};
        updatePostUnsaved['token'] = this._constantService.getSessionDataBYKey('token');
        updatePostUnsaved['token_param'] = {};
        updatePostUnsaved['token_param']['device_type'] = 'w';
        updatePostUnsaved['token_param']['host'] = '';
        updatePostUnsaved['sfldid'] = this.savedFolderId;
        updatePostUnsaved['pid'] = this.post_id;



        this._constantService.fetchDataApi(this._constantService.putUserPostUnsaved(), updatePostUnsaved).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this._constantService.showToast("Unsaved successfully", "Post", "1");

                this.saveCondition = false;
                var herf = this.router.url;
                var urlArr = herf.split("/");
                if (urlArr[1] == "saved") {
                    setTimeout(() => {

                        var count = (document.getElementById(this.savedFolderId + "_count"));
                        if (count != null) {
                            if (parseInt(count.innerHTML) == 1) {
                                count.style.display = 'none';
                                count.innerHTML = (parseInt(count.innerHTML) - 1).toString();
                            } else {
                                count.innerHTML = (parseInt(count.innerHTML) - 1).toString();
                            }
                        }
                    }, 100)
                    this._ref.destroy();
                }

                this._constantService.callEmptyStateMethod();
            } else if (status == this._constantService.error_token) {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
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
                this.router.navigate(['500']);
            }
        });

    }

    CloseViewAll($event) {
        this.impLikeShareStatus = false;
        this.shareLikeShareStatus = false;
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }

    impLikeShareFn() {
        this.userLikeShareList['postId'] = this.post_id;
        this.userLikeShareList['type'] = 1;
        this.userLikeShareList['count'] = this.like;
        this.impLikeShareStatus = !this.impLikeShareStatus;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }

    shareLikeShareFn() {
        this.userLikeShareList['postId'] = this.post_id;
        this.userLikeShareList['type'] = 2;
        this.userLikeShareList['count'] = this.share;
        this.shareLikeShareStatus = !this.shareLikeShareStatus;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }

    closePopup(event) {
        if (event['error'] == false) {
            this.openConfirmation = false;
        }
    }
    closeCnfPopup(event) {
        if (event['deEnroll'] == false) {
            this.ConfirmDeEnroll = false;
        } else if (event['deEnroll'] == true) {
            this.ConfirmDeEnroll = false;
            this.deEnrollCourse();
        }
    }

    autoFocus() {
        var id = this.u_id + '_' + this.post_id + '_comm';
        var x = document.getElementById(id);
        if (x.innerText == this._constantService.commentPlaceHolder) {
            x.innerText = '';
        }
        (<HTMLInputElement>document.getElementById(id)).focus();

    }

    handleClick(event) {
        this.isSharePostList = false;
        var clickedComponent = event.target;
        var openPopUp = 0;
        do {
            if (this.reportPopup) {
                if (this.reportPopup && clickedComponent === this.reportPopup.nativeElement) {
                    openPopUp = 1;
                }
            }

            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);

        if (openPopUp != 1) {
            this.postmenu = false;
        }
    }

    enrollCourse() {
        var enrollCourse = {};
        enrollCourse['token'] = this._constantService.getSessionDataBYKey('token');
        enrollCourse['token_param'] = {};
        enrollCourse['token_param']['device_type'] = 'w';
        enrollCourse['token_param']['host'] = '';
        enrollCourse['cors_type'] = this.courseType;
        enrollCourse['pg_uuid'] = this.pageUUID;
        enrollCourse['cors_uuid'] = this.arr['COURSE_DETAIL']['COURSE_UUID'];



        this._constantService.fetchDataApi(this._constantService.getCourseEnrollFreeServiceUrl(), enrollCourse).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.googleAnalyticsService.eventEmitter(
                    "web_Course",
                    "web_Enroll",
                    "web_Course enrolled",
                    "web_Course",0
                  );
                // ga('event', 'Study24x7 Event', {
                //     'event_category': 'Goal Events',
                //     'event_label': 'Free Course Enrolled / Free Trial Enrolled',
                //     'value': 10
                // });

                window.location.reload();
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }
        }
        );

    }

    subscribeCourse() {
        var enrollCourse = {};
        enrollCourse['token'] = this._constantService.getSessionDataBYKey('token');
        enrollCourse['token_param'] = {};
        enrollCourse['token_param']['device_type'] = 'w';
        enrollCourse['token_param']['host'] = '';
        enrollCourse['cors_type'] = this.courseType;
        enrollCourse['pg_uuid'] = this.pageUUID;
        enrollCourse['cors_uuid'] = this.arr['COURSE_DETAIL']['COURSE_UUID'];



        this._constantService.fetchDataApi(this._constantService.getSubscribeCourseRestUrl(), enrollCourse).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                window.location.reload();
                this.isSubscribed = 1;
                this.googleAnalyticsService.eventEmitter(
                    "web_Course",
                    "web_Free Trial",
                    "web_Start Free Trial",
                    "web_Course",0
                  );
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }
        });

    }

    askForDeEnroll() {

        var herf = this.router.url;
        var urlArr = herf.split("/");
        if (this.courseType != 1 && this.isEnrolled == true) {
            if (urlArr[1] === "course") {
                this.dataConf['type'] = 8;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = "Do you want to De-enroll this course ?";
                this.ConfirmDeEnroll = true;
            } else {
                this.router.navigate(['/course/' + this.arr['COURSE_DETAIL']['COURSE_URL']]);
            }
        }



    }

    deEnrollCourse() {
        var deEnrollCourse = {};
        deEnrollCourse['token'] = this._constantService.getSessionDataBYKey('token');
        deEnrollCourse['token_param'] = {};
        deEnrollCourse['token_param']['device_type'] = 'w';
        deEnrollCourse['token_param']['host'] = '';
        deEnrollCourse['cors_uuid'] = this.arr['COURSE_DETAIL']['COURSE_UUID'];

        ;

        this._constantService.fetchDataApi(this._constantService.deEnrollCourse(), deEnrollCourse).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                window.location.reload();


            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }
        }
        );

    }

    checkEnroll() {
        var herf = this.router.url;
        var urlArr = herf.split("/");
        if (urlArr[1] === "course") {
            if (this.arr.IS_PUBLIC != 1) {
                if (this.arr.COURSE_DETAIL.COURSE_TYPE != 0 && this.isTrialBased == 0) {
                    this.purchaseCourse();
                } else if (this.isTrialBased == 1 && this.isSubscribed == 0) {
                    this.subscribeCourse();
                } else if (this.isTrialBased == 1 && this.isSubscribed > 0) {
                    this.purchaseCourse();
                } else {
                    this.enrollCourse();
                }
            }
        } else {
            this.router.navigate(['/course/' + this.arr['COURSE_DETAIL']['COURSE_URL']]);
            this.enrollCourse();
        }
    }

    routToCourseDetail(cors) {
        var herf = this.router.url;
        var urlArr = herf.split("/");
        if (cors.LAST_OPEN_CONTENT == '' || cors.LAST_OPEN_CONTENT == null || cors.LAST_OPEN_CONTENT) {
            //this._constantService.setPageIdForCourse(cors.PAGE_UUID);
            this._constantService.setSessionJsonPair('page_id_course', cors.PAGE_UUID);
            if (this.arr['IS_ADMIN'] && this.arr['IS_ADMIN'] == 0) {
                this.router.navigate(['/course/' + this.arr['COURSE_DETAIL']['COURSE_URL']]);
            }

            var herf = this.router.url;
            var urlArr = herf.split("/");
            if (urlArr[1] !== "course") {
                var id = this.arr['COURSE_DETAIL']['COURSE_URL'];
                var publish = this.arr['COURSE_DETAIL']['PUBLISH'];
                var is_admin = this.arr['IS_ADMIN'];
                var isExpired = this.arr['COURSE_DETAIL']['IS_EXPRIED'];
                if ((publish == 4 || publish == 2) && is_admin == '1') {
                    this.router.navigate(['addcourse/' + this.arr['COURSE_UUID']]);
                } else if (publish == 1 && is_admin == '0' && isExpired == 0) {
                    this.router.navigate(['course/' + id]);

                } else if (publish == 1 && is_admin == '1') {
                this.router.navigate(['/course/' + this.arr['COURSE_DETAIL']['COURSE_URL']]);
                }
            }
        } else {
            this.viewContent(cors.LAST_OPEN_CONTENT, '', '');
        }
    }

    purchaseCourse() {
        this.googleAnalyticsService.eventEmitter(
            "web_Course",
            "web_Enroll",
            "web_Buy Now",
            "web_Course",0
          );        
        this.router.navigate(['payment/' + this.arr['COURSE_DETAIL']['COURSE_UUID']]);
        console.log(this.arr['COURSE_DETAIL']['COURSE_UUID']);
    }

    goToDetail(cors) {

    }


    viewContent(content, sectionindex, contentIndex) {

        if (content.CONTENT_TYPE == 3) {
            this.router.navigate(['/test/' + content.CONTENT_UUID]);
        } else if (content.CONTENT_TYPE == 2) {
            this.router.navigate(['/viewer/' + content.CONTENT_UUID]);
        } else if (content.CONTENT_TYPE == 1) {
            this.router.navigate(['/viewer/' + content.CONTENT_UUID]);
        } else if (content.CONTENT_TYPE == 4) {
            this.router.navigate(['/viewer/' + content.CONTENT_UUID]);
        } else if (content.CONTENT_TYPE == 5) {
            this.router.navigate(['/viewer/' + content.CONTENT_UUID]);
        }
    }

    updateProfilePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }

    scrollToRewiews() {

        var herf = this.router.url;
        var urlArr = herf.split("/");
        if (urlArr[1] == "course") {
            var yCords = document.getElementById('reviewRating').offsetTop;
            window.scrollTo(0, yCords);
        }
    }



    getInterest() {

        this._constantService.fetchDataApiWithoutBody(this._constantService.getInterestv1ServiceUrl()).subscribe(data => {
            let responseData:any = data;
            //this._constantService.setInterestObj(responseData.INTERESTS);

            let interestData = {};
            for (let i = 0; i < responseData.INTERESTS_DATA.length; i++) {
                for (let j = 0; j < responseData.INTERESTS_DATA[i].INTERESTS.length; j++) {
                    interestData[responseData.INTERESTS_DATA[i].INTERESTS[j].INTEREST_ID] = responseData.INTERESTS_DATA[i].INTERESTS[j].INTEREST_NAME;
                }
            }

            this._constantService.setSessionJsonPair('interests', JSON.stringify(interestData));
            return interestData;
        });
    }

    showNotify() {
        this._constantService.showToast("Link has been Copied", "", "1");

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
            // this.withoutToken = false;
            //this._constantService.setPublicClickedUrl('course/' + this.Corsid);
            this._constantService.setSessionJsonPair('publicClickedURL', 'course/' + this.CorsUrl);
        }
    }
    redirectToThirdPartyCourse() {
        var url = this.courseDetails.COURSE_DETAILS.THIRD_PARTY_DATA.WEB_URL;
        url = url + "&studentId=" + this._encrypt.encrypt(this.courseDetails.COURSE_DETAILS.THIRD_PARTY_AUTH_ID);
        window.location.replace(url);
    };
    setCookieVal() {
        this._cookie.set('enrollrd', '1');
        this.loginpopupopen();
    }
}
