import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConstantService } from './../../../services/constant.service';
import { EncryptionService } from './../../../services/encryption.service';
import { Router } from '@angular/router';
import { PostdataService } from './../../../services/postdata.service';

@Component({
    selector: 'app-sharescreencoursepostview',
    templateUrl: './sharescreencoursepostview.component.html',
    styleUrls: ['./sharescreencoursepostview.component.scss', './../coursepost/coursepost.component.scss', './../sharetextpostview/sharetextpostview.component.scss', './../textpost/allpost.css']
})
export class SharescreencoursepostviewComponent implements OnInit {
    postPublicShareLink: string;
    courseDiscountedPrice: any;
    coursePrice: any;
    courseType: any;
    courseTotalRating: any;
    courseRating: any;
    courseLevel: string;
    showUnlimited: boolean = false;
    count = 0;
    openConfirmation: boolean = false;
    dataConf = {};
    @Output() sharescreencoursepost = new EventEmitter<boolean>();
    @Input() postdata: any;
    @Output() postId = new EventEmitter();
    @Output() shrCount = new EventEmitter();
    loader: boolean = false;
    showText: boolean = true;
    sharepostviewtextpostdivhide: boolean = false;
    interestObj = {};
    tagsArr = [];
    full_name: string = "";
    time = "";
    post_data: string = "";
    DataView: boolean = false;
    profile_pic_path: string = "";
    user_name: string = "";
    post_id = 0;
    shrpost_id = 0;
    u_id = 0;
    postTyp = 0;
    followerCount = 0;
    hidePlaceHolder: boolean = true;
    date = new Date();
    pg_uuid = '';
    isPagePost: boolean = false;
    showIntArr: boolean = false;
    courseTitle: any;
    courseCoverPhoto: any;
    courseLanguage = '';
    languageList = [];
    validity: string = "";
    showDays: boolean = false;
    isAdmin: any;
    isEnrolled: boolean;
    altName = "";
    shareLinkPost: number = 1;
    socialFbShareUrl;
    socialTeitterShareUrl;
    socialLinkedInShareUrl;
    socialTelegramUrl;
    isTrialBased;
    isSubscribed;
    sharedPostText = '';


    constructor(
        public _constantService: ConstantService,
        public _router: Router,
        public _encrypt: EncryptionService,
        private _postData: PostdataService
    ) { }

    ngOnInit() {
        this.postPublicShareLink = this._constantService.staticPostShareLink + (this.postdata.TYPE!=4?this.postdata.URL:this.postdata.SHARED_POST_ID);

        this.socialFbShareUrl = "https://www.facebook.com/dialog/feed?app_id=" + this._constantService.facebookAppId + "&link=" + this.postPublicShareLink;
        this.socialTeitterShareUrl = "https://twitter.com/intent/tweet?text=''" + "&url=" + this.postPublicShareLink;
        this.socialLinkedInShareUrl = "https://www.linkedin.com/sharing/share-offsite/?url=" + this.postPublicShareLink;
        this.socialTelegramUrl = "https://telegram.me/share/url?url=" + this.postPublicShareLink;



        if (this.postdata['TEXT'] && this.postdata['EDIT_POST']) {
            this.hidePlaceHolder = false;
            if (document.getElementById('shareText')) {
                (<HTMLElement>document.getElementById('shareText')).innerText = this._postData.decodeURIPostData(this.postdata['TEXT']).replace(/&nbsp;/, "");
            }
        }

        this.altName = "aio " + this.postdata['KEYWORDS'];
        this.postTyp = this.postdata['TYPE'];
        this.interestObj = JSON.parse(this._constantService.getSessionDataBYKey('interests'));
        this.tagsArr = this.postdata['INTERESTS'];
        this.time = this.postdata['ADD_DATE_TIME'];

        if (this.postdata['TYPE'] == 4) {
            this.isTrialBased = this.postdata.SHARED_POST_DATA.COURSE_DETAIL.SUBSCRIPTION;
            this.isSubscribed = this.postdata.SHARED_POST_DATA.COURSE_DETAIL.IS_SUBSCRIBE;
            this.isAdmin = this.postdata['SHARED_POST_DATA']['IS_ADMIN'];
            this.courseType = this.postdata['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_TYPE'];
            this.post_id = this.postdata['USER_POST_ID'];
            this.shrpost_id = this.postdata['SHARED_POST_DATA']['USER_POST_ID'];
            this.postTyp = this.postdata['SHARED_POST_DATA']['TYPE'];
            this.u_id = this.postdata['SHARED_FROM'];
            //this.time = this.postdata['ADD_DATE_TIME'];
            //this.post_data = this._postData.decodeURIPostData(this.postdata['SHARED_POST_DATA']['TEXT']).replace(/<!--bindings={\n  \"ng-reflect-ng-if\": \"false\"\n}-->\n/g, "");
            this.full_name = this.postdata['SHARED_POST_DATA']['USER_FULL_NAME'];
            if (this.postdata['SHARED_POST_DATA']['PAGE_UUID'] != '' && this.postdata['SHARED_POST_DATA']['PAGE_UUID'] != null) {
                this.pg_uuid = this.postdata['SHARED_POST_DATA']['PAGE_UUID'];
                this.isPagePost = true;
                if (this.postdata['SHARED_POST_DATA']['PAGE_PROFILE_PHOTO_PATH'] != null && this.postdata['SHARED_POST_DATA']['PAGE_PROFILE_PHOTO_PATH'] != '') {
                    this.profile_pic_path = this.postdata['SHARED_POST_DATA']['PAGE_PROFILE_PHOTO_PATH'] + "profile/" + this.postdata['SHARED_POST_DATA']['PAGE_UUID'] + "_60x60.png?v=" + this.postdata['IMG_UPD_DT'];
                } else {
                    if (this.postdata['SHARED_POST_DATA']['PAGE_TYPE'] == 0) {
                        this.profile_pic_path = this._constantService.defaultPageIndImgPath;
                    } else if (this.postdata['SHARED_POST_DATA']['PAGE_TYPE'] == 1) {
                        this.profile_pic_path = this._constantService.defaultPageCollgImgPath;
                    }
                }
                this.user_name = this._postData.decodeURIPostData(this.postdata['SHARED_POST_DATA']['TITLE']);
                this.followerCount = this.postdata['SHARED_POST_DATA']['PAGE_FOLLOW_COUNT'];
            } else {
                if (this.postdata['SHARED_POST_DATA']['PROFILE_PHOTO_PATH'] != null && this.postdata['SHARED_POST_DATA']['PROFILE_PHOTO_PATH'] != '') {
                    this.profile_pic_path = this.postdata['SHARED_POST_DATA']['PROFILE_PHOTO_PATH'] + "profile/" + this.postdata['SHARED_POST_DATA']['USER_ID'] + "_60x60.png?v=" + this.postdata['IMG_UPD_DT'];
                } else {
                    this.profile_pic_path = this._constantService.defaultImgPath;
                }
                this.user_name = this.postdata['SHARED_POST_DATA']['USER_NAME'];
            }

            this.courseTitle = this._postData.decodeURIPostData(this.postdata['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_TITLE']);
            if (this.postdata['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_COVER_PHOTO_PATH']) {
                if (this.postdata['SHARED_POST_DATA']['COURSE_DETAIL']['COVER_TYPE'] == "0") {
                    this.courseCoverPhoto = this.postdata['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_COVER_PHOTO_PATH'] + 'cover/' + this.postdata['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_UUID'] + '_1235x330.png';
                } else {
                    this.courseCoverPhoto = this.postdata['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_COVER_PHOTO_PATH'];
                }
            } else {
                this.courseCoverPhoto = this._constantService.defaultCoverImgPath;
            }

            this.getAllLanguage(this.postdata['TYPE']);

            if (this.postdata['SHARED_POST_DATA']['COURSE_DETAIL']['RVALIDITY']) {
                this.validity = this.postdata['SHARED_POST_DATA']['COURSE_DETAIL']['RVALIDITY'];
            }
            var courseLevelId = this.postdata['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_LEVEL'];
            this.getCourseLevel(courseLevelId);

            this.courseRating = this.postdata['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_RATING'];
            this.courseTotalRating = this.postdata['SHARED_POST_DATA']['COURSE_DETAIL']['TOTAL_COURSE_RATING_COUNT'];

            if (this.postdata['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_TYPE'] == 1) {
                this.coursePrice = this.postdata['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_PRICE']['0']['COST'];
                this.courseDiscountedPrice = this.postdata['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_PRICE']['0']['DISCOUNT_COST'];
            }
            if (this.postdata['SHARED_POST_DATA']['COURSE_DETAIL']['IS_ENROLLED'] == "1") {
                this.isEnrolled = true;
            } else {
                this.isEnrolled = false;
            }

        } else {

            this.isTrialBased = this.postdata.COURSE_DETAIL.SUBSCRIPTION;
            this.isSubscribed = this.postdata.COURSE_DETAIL.IS_SUBSCRIBE;
            this.isAdmin = this.postdata['IS_ADMIN'];
            this.courseType = this.postdata['COURSE_DETAIL']['COURSE_TYPE'];
            this.courseTitle = this._postData.decodeURIPostData(this.postdata['COURSE_DETAIL']['COURSE_TITLE']);
            if (this.postdata['COURSE_DETAIL']['COURSE_COVER_PHOTO_PATH']) {
                if (this.postdata['COURSE_DETAIL']['COVER_TYPE'] == "0") {
                    this.courseCoverPhoto = this.postdata['COURSE_DETAIL']['COURSE_COVER_PHOTO_PATH'] + 'cover/' + this.postdata['COURSE_DETAIL']['COURSE_UUID'] + '_1235x330.png';
                } else {
                    this.courseCoverPhoto = this.postdata['COURSE_DETAIL']['COURSE_COVER_PHOTO_PATH'];
                }
            } else {
                this.courseCoverPhoto = this._constantService.defaultCoverImgPath;
            }
            this.getAllLanguage(this.postdata['TYPE']);

            if (this.postdata['COURSE_DETAIL']['RVALIDITY']) {
                this.validity = this.postdata['COURSE_DETAIL']['RVALIDITY'];
            }

            var courseLevelId = this.postdata['COURSE_DETAIL']['COURSE_LEVEL'];
            this.getCourseLevel(courseLevelId);

            this.courseRating = this.postdata['COURSE_DETAIL']['COURSE_RATING'];
            this.courseTotalRating = this.postdata['COURSE_DETAIL']['TOTAL_COURSE_RATING_COUNT'];

            if (this.postdata['COURSE_DETAIL']['COURSE_TYPE'] == 1) {
                this.coursePrice = this.postdata['COURSE_DETAIL']['COURSE_PRICE']['0']['COST'];
                this.courseDiscountedPrice = this.postdata['COURSE_DETAIL']['COURSE_PRICE']['0']['DISCOUNT_COST'];
            }


            this.post_id = this.postdata['USER_POST_ID'];
            this.postTyp = this.postdata['TYPE'];
            //            this.shrpost_id = this.postdata['SHARED_POST_DATA']['USER_POST_ID'];
            this.u_id = this.postdata['USER_ID'];
            this.full_name = this.postdata['USER_FULL_NAME'];
            //this.time = this._postData.getPostDateTime(this.postdata['ADD_DATE_TIME']);
            //this.post_data = this._postData.decodeURIPostData(this.postdata['TEXT']).replace(/<!--bindings={\n  \"ng-reflect-ng-if\": \"false\"\n}-->\n/g, "");
            if (this.postdata['PAGE_UUID'] != '' && this.postdata['PAGE_UUID'] != null) {
                this.pg_uuid = this.postdata['PAGE_UUID'];
                this.isPagePost = true;
                if (this.postdata['PAGE_PROFILE_PHOTO_PATH'] != null && this.postdata['PAGE_PROFILE_PHOTO_PATH'] != '') {
                    this.profile_pic_path = this.postdata['PAGE_PROFILE_PHOTO_PATH'] + "profile/" + this.postdata['PAGE_UUID'] + "_60x60.png?v=" + this.postdata['IMG_UPD_DT'];
                } else {
                    if (this.postdata['PAGE_TYPE'] == 0) {
                        this.profile_pic_path = this._constantService.defaultPageIndImgPath;
                    } else if (this.postdata['PAGE_TYPE'] == 1) {
                        this.profile_pic_path = this._constantService.defaultPageCollgImgPath;
                    }
                }
                this.user_name = this._postData.decodeURIPostData(this.postdata['TITLE']);
                this.followerCount = this.postdata['PAGE_FOLLOW_COUNT'];
            } else {
                if (this.postdata['PROFILE_PHOTO_PATH'] != null && this.postdata['PROFILE_PHOTO_PATH'] != '') {
                    this.profile_pic_path = this.postdata['PROFILE_PHOTO_PATH'] + "profile/" + this.postdata['USER_ID'] + "_60x60.png?v=" + this.postdata['IMG_UPD_DT'];
                } else {
                    this.profile_pic_path = this._constantService.defaultImgPath;
                }
                this.user_name = this.postdata['USER_NAME'];
            }

            if (this.postdata['COURSE_DETAIL']['IS_ENROLLED'] == "1") {
                this.isEnrolled = true;
            } else {
                this.isEnrolled = false;
            }
        }

    }

    sharePost() {

        let bodyy = document.getElementsByTagName('body')[0];
        bodyy.classList.add("body-overflow");
        this.sharedPostText = this._postData.postDataManipulationWithText(this.sharedPostText);
        // if(this.sharedPostText==''){
        //     return;
        // }

        this.loader = true;
        this.showText = false;
        // var postData = this._postData.postDataManipulation('shareText');

        var sharePost = {};
        sharePost['token'] = this._constantService.getSessionDataBYKey('token');
        sharePost['token_param'] = {};
        sharePost['token_param']['device_type'] = 'w';
        sharePost['token_param']['host'] = '';
        if (this.postdata['TYPE'] != 4) {
            sharePost['pid'] = 0;
            sharePost['shrpid'] = this.post_id;
        }
        else {
            if (this.postdata['EDIT_POST']) {
                sharePost['pid'] = this.post_id;
                sharePost['shrpid'] = this.shrpost_id;
            } else {
                sharePost['pid'] = 0;
                sharePost['shrpid'] = this.shrpost_id;
            }

        }
        //        if (this.postdata['PAGE_UUID'] != '' && this.postdata['PAGE_UUID'] != null){
        //             sharePost['pg_id'] = this.postdata['PAGE_UUID'];
        //        }
        sharePost['ptyp'] = 4;
        sharePost['pdt'] = this._postData.encodeURIPostData(this.sharedPostText).replace(/What's%20on%20your%20mind%3F/g, "").replace(/%3C!--bindings=%7B%0A%20%20%22ng-reflect-ng-if%22:%20%22false%22%0A%7D--%3E/g, "");
        // if (this.hidePlaceHolder) {
        //     sharePost['pdt'] = '';
        // }
        sharePost['shrptyp'] = this.postTyp;
        sharePost['shruid'] = this.u_id;
        sharePost['iid'] = this.tagsArr.join();


        this._constantService.fetchDataApi(this._constantService.getSharePostServiceUrl(), sharePost).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this._constantService.showToast("Post has been shared successfully", "", "1");

                if (this.postdata['EDIT_POST']) {
                    window.location.reload();
                    return;
                }
                this.count++;
                this.shrCount.emit(this.count);
                this.loader = false;
                this.showText = true;
                this.postId.emit(this._constantService.getSessionDataBYKey('u_id') + ":" + responseData.POSTID + ":4");
                this.sharescreencoursepost.emit(true);
                let body = document.getElementsByTagName('body')[0];
                body.classList.remove("body-overflow");
            } else if (status == this._constantService.error_token) {
                this.loader = false;
                this.showText = true;
                this._constantService.clearUserInfo();
                this._router.navigate(['']);
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;

            } else {
                this.loader = false;
                this.showText = true;
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

    getAllLanguage(postDataType) {

        this._constantService.fetchDataApiWithoutBody(this._constantService.getAllLanguageServiceUrl())
            .subscribe(data => {
                let responseData: any = data;
                if (responseData.success = this._constantService.success_msg) {
                    this.languageList = responseData.LNG_LIST;
                    if (postDataType == 4) {
                        if (this.postdata['SHARED_POST_DATA']['COURSE_DETAIL']['LANGUAGE'] != null && this.postdata['SHARED_POST_DATA']['COURSE_DETAIL']['LANGUAGE'] != undefined) {
                            for (var i = 0; i < this.languageList.length; i++) {
                                if (this.postdata['SHARED_POST_DATA']['COURSE_DETAIL']['LANGUAGE'] == this.languageList[i].LANGUAGE_ID) {
                                    this.courseLanguage = this.languageList[i].LANGUAGE;
                                }
                            }
                        }
                    } else {
                        if (this.postdata['COURSE_DETAIL']['LANGUAGE'] != null && this.postdata['COURSE_DETAIL']['LANGUAGE'] != undefined) {
                            for (var i = 0; i < this.languageList.length; i++) {
                                if (this.postdata['COURSE_DETAIL']['LANGUAGE'] == this.languageList[i].LANGUAGE_ID) {
                                    this.courseLanguage = this.languageList[i].LANGUAGE;
                                }
                            }
                        }
                    }


                }

            });
    }

    //    calValidityPeriod(days) {
    //        this.showUnlimited = false;
    //        if (days < 30) {
    //            this.showDays = true;
    //            this.validity = days;
    //        } else if (days == 30 || days == 31) {
    //            this.showDays = false;
    //            this.validity = 1;
    //        } else if(days =="null"){
    //            this.showUnlimited = true;
    //        } else {
    //            this.showDays = false;
    //            var x = days / 30;
    //            this.validity = Math.floor(x);
    //        }
    //    }

    checkData() {
        var data = (<HTMLElement>document.getElementById('shareText'));
        if (data.innerText.length == 0) {
            this.hidePlaceHolder = true;
        } else {
            this.hidePlaceHolder = false;
        }
    }

    pastedData(event) {
        this._postData.onPaste(event);
    }

    sharecourseviewhide() {
        this.sharescreencoursepost.emit(false);
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }

    getCourseLevel(courseLevelId) {
        if (courseLevelId == 1) {
            this.courseLevel = 'Beginner Level';
        } else if (courseLevelId == 2) {
            this.courseLevel = 'Intermediate Level';
        } else if (courseLevelId == 3) {
            this.courseLevel = 'Advance Level';
        } else if (courseLevelId == 4) {
            this.courseLevel = 'All Levels';
        }
    }
    showPost(index) {
        this.shareLinkPost = index;
    }
    onFocusInput() {
        this.hidePlaceHolder = true;
        document.getElementsByClassName("popup_background_view")[0].scrollTo(0, 0);

    }

    openCourseDetailWindow() {
        var herf = this._router.url;
        var urlArr = herf.split("/");
        var sharedPostData: any;
        if (this.postdata.TYPE == 4) {
            sharedPostData = this.postdata['SHARED_POST_DATA']['COURSE_DETAIL'];


        } else if (this.postdata.TYPE == 7) {
            sharedPostData = this.postdata['COURSE_DETAIL'];
        }
        if (!sharedPostData)
            return;
        if (sharedPostData.LAST_OPEN_CONTENT == '' || sharedPostData.LAST_OPEN_CONTENT == null || sharedPostData.LAST_OPEN_CONTENT) {
            //this._constantService.setPageIdForCourse(cors.PAGE_UUID);
            this._constantService.setSessionJsonPair('page_id_course', sharedPostData.PAGE_UUID);
            if (this.postdata['IS_ADMIN'] && this.postdata['IS_ADMIN'] == 0) {
                window.open(window.location.origin + '/course/' + sharedPostData['COURSE_URL'], '_blank')

            }
            var herf = this._router.url;
            var urlArr = herf.split("/");
            if (urlArr[1] !== "course") {
                var publish = sharedPostData['PUBLISH'];
                var is_admin = this.postdata['SHARED_POST_DATA']['IS_ADMIN'];
                var isExpired = sharedPostData['IS_EXPRIED'];
                if ((publish == 4 || publish == 2) && is_admin == '1') {
                    window.open(window.location.origin + '/addcourse/' + sharedPostData['COURSE_UUID'], '_blank')
                } else if (publish == 1 && is_admin == '0' && isExpired == 0) {
                    window.open(window.location.origin + '/course/' + sharedPostData['COURSE_URL'], '_blank')

                } else if (publish == 1 && is_admin == '1') {
                }
            }
        } else {
            // this.viewContent(cors.LAST_OPEN_CONTENT, '', '');
        }
    }
}
