import { Component, OnInit, ViewChild, ViewContainerRef, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { PostdataService } from './../../../services/postdata.service';
import { ConstantService } from './../../../services/constant.service';
import { Router } from '@angular/router';
import { CapitalizePipe } from './../../../services/capitalize.pipe';
import { EncryptionService } from './../../../services/encryption.service';
import { CommentComponent } from "./../commentView/comment.component";
import { ArticleimagesizeService } from './../../../services/articleimagesize.service';
@Component({
    selector: 'app-postotherview',
    templateUrl: './postotherview.component.html',
    styleUrls: [
        './../coursepost/coursepost.component.scss',
        './../textpost/textpost-component.scss',
        './../post-header/post-header.component.scss',
        './../post-footer/post-footer.component.scss',
        './../linkpost/linkpost.component.scss',
        './../multiplechoicepost/multiplechoicepost.component.scss',
        './../commentView/comment.component.scss',
        './../post/postcommon.css',
        './postotherview.component.scss']
})
export class PostotherviewComponent implements OnInit {
    enable_button = false;
    usrData = {};
    senderName = '';
    openLoginPopupType: number = 1;
    openLoginPopup: boolean = false;
    publicURL: any = '';
    redisKey: string = '';
    languageList: any;
    courseLanguage: any;
    validity: string = "";
    showDays: boolean;
    showUnlimited: boolean;
    courseDiscountedPrice: any;
    coursePrice: any;
    courseType: any;
    importantCondition: boolean;
    latestComment: any;
    courseTitle: string;
    corsCoverPath: string;
    pageTitle: any;
    pg_id: any;
    text: string;
    interestObj = {}
    arr: any;
    _ref: any;
    vart: boolean = true;
    c_data: string = "";
    tagsArr = [];
    path = "";
    post_id = 0;
    u_id = 0;
    full_name: string = "";
    file_name: string = "";
    file_type: string;
    time: string;
    post_data: string = "";
    profile_pic_path: string = "";
    user_name: string = "";
    comment = 0;
    like = 0;
    share = 0;
    profile_view: boolean = false;
    my_profile: boolean = false;
    image_upload_url = "";
    hideSpan = 1;
    show = false;
    editPostId;
    savepagepopup: boolean = false;
    DataView: boolean = false;
    factory;
    ref;
    count = 0;
    commentPresent: boolean = false;
    download_Count = 0;
    postTyp;
    pages;
    file_path = "";
    uuid = "";
    userLikeShareList = {};
    date = new Date();
    pg_uuid: string = "";
    isPagePost: boolean = false;
    followme: boolean = false;
    ltIntShow = [];
    showIntArr: boolean = false;
    image_path: string = "";
    link_title: string = "";
    link_description: string = "";
    opt1RespCount = 0;
    opt2RespCount = 0;
    opt3RespCount = 0;
    opt4RespCount = 0;
    opt5RespCount = 0;
    opt6RespCount = 0;
    opt1Percentile = 0;
    opt2Percentile = 0;
    opt3Percentile = 0;
    opt4Percentile = 0;
    opt5Percentile = 0;
    opt6Percentile = 0;
    questionImg = "";
    option1 = "";
    option2 = "";
    option3 = "";
    option4 = "";
    option5 = "";
    option6 = "";
    option1Img = "";
    option2Img = "";
    option3Img = "";
    option4Img = "";
    option5Img = "";
    option6Img = "";
    hourDec: boolean = false;
    resultDeclared: boolean = false;
    questionTime = 0;
    hour = 0;
    min = 0;
    sec = 0;
    multipleResponse = [];
    responseStatus = 0;
    timeStatus = 0;
    instantResult: boolean = false;
    correctResponseCount = 0;
    incorrectResponseCount = 0;
    myResponse = [];
    myResponseStatus = 0;
    questionAns = [];
    videosrc: string = "";
    sharedPostUser_fullName;
    sharedPostUser_UserName;
    sharedPostUser_ProfilePicPath;
    sharedPost_data;
    sharedPost_time;
    sharedPostId;
    sharedFrom;
    sharedPostType;
    DataViewShared: boolean = false;
    sharedPostTime: string = ''
    linkImage: string = ''
    altName = "";
    enroledCount;
    innerPostTyp = 0;
    isSharePostList = false;
    postPublicShareLink;
    socialFbShareUrl
    socialTeitterShareUrl;
    socialLinkedInShareUrl;
    socialTelegramUrl;
    socialWhatsappLink;
    sharedPostUserName: any;
    sharedPostPageName: any;
    @ViewChild('aritcleImage', { read: ElementRef }) aritcleImage: ElementRef;
    setArticleClass = 0;
    level: any;
    constructor(
        public postdata: PostdataService,
        public _constantService: ConstantService,
        public _encryptionServices: EncryptionService,
        public _router: Router,
        public _getArticleImage: ArticleimagesizeService,
        public changeDetector: ChangeDetectorRef


    ) { }
    setInterestObj() {
        if (this._constantService.getSessionDataBYKey('interests')) {
            this.interestObj = JSON.parse(this._constantService.getSessionDataBYKey('interests'));
        } else {
            setTimeout(() => {
                this.setInterestObj();
            }, 1000);
        }
    }

    ngOnInit() {
        window.scrollTo(0, 0);
        this.postPublicShareLink = window.location.origin + '/' + this.arr['USER_POST_ID'] + '/' + this.arr['URL'];
        this.socialFbShareUrl = "https://www.facebook.com/dialog/feed?app_id=" + this._constantService.facebookAppId + "&link=" + this.postPublicShareLink;
        this.socialTeitterShareUrl = "https://twitter.com/intent/tweet?text=''" + "&url=" + this.postPublicShareLink;
        this.socialLinkedInShareUrl = "https://www.linkedin.com/sharing/share-offsite/?url=" + this.postPublicShareLink;
        this.socialTelegramUrl = "https://telegram.me/share/url?url=" + this.postPublicShareLink;
        this.socialWhatsappLink = "https://api.whatsapp.com/send?text=" + this.postPublicShareLink;
        if (this.arr.SHARED_POST_DATA) {
            this.pg_uuid = this.arr.SHARED_POST_DATA.PAGE_UUID;
            this.sharedPostUserName = this.arr.SHARED_POST_DATA.USER_NAME;
            this.sharedPostPageName = this.arr.SHARED_POST_DATA.TITLE;
            this.pg_id = this.pg_uuid;

        }
        this.senderName = this.arr['SENDER_NAME'];
        this.redisKey = this.arr['USER_ID'] + ':' + this.arr['USER_POST_ID'] + ':' + this.arr['TYPE'];
        this.publicURL = this.arr['URL'];
        this.post_id = this.arr['USER_POST_ID'];
        this.u_id = this.arr['USER_ID'];
        this.innerPostTyp = this.arr['LINK_PTYPE'];
        this.altName = "study24x7 " + this.arr['KEYWORDS'];

        this.setInterestObj();
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

        //        if(this.arr['TYPE        ']=        =7){
        //
        //        }


        this.full_name = this.arr['USER_FULL_NAME'];
        this.time = this.arr['ADD_DATE_TIME'];

        if (this.arr['TEXT']) {
            this.arr['TEXT'] = this.arr['TEXT'].replace(/%3C!--bindings%3D%7B%0A%20%20%22ng-reflect-ng-if%22%3A%20%22false%22%0A%7D--%3E/g, "");
            this.post_data = this.postdata.decodeURIPostData(this.arr['TEXT']).replace(/<!--bindings={/g, "").replace(/"ng-reflect-ng-if": "false"/g, "").replace(/}-->/g, "").replace(/&#160;/g, "").replace(/<br>/g, "\n").replace(/&nbsp;/g, " ");
            if (this.post_data.length > 200) {
                this.DataView = !this.DataView;
            }
            this.post_data = this.post_data.replace(/  /g, " &#160;");
        }



        if (this.arr['TEXT_IMAGE'] != null) {
            this.questionImg = this.arr['TEXT_IMAGE'];
        }

        if (this.arr['PAGE_UUID'] != '' && this.arr['PAGE_UUID'] != null) {
            this.pg_uuid = this.arr['PAGE_UUID'];
            this.pg_id = this.arr['PAGE_UUID'];
            this.isPagePost = true;
            if (this.arr['PAGE_FOLLOW_STATUS'] == 1) {
                this.followme = true;
            }
            if (this.arr['PAGE_PROFILE_PHOTO_PATH'] != null && this.arr['PAGE_PROFILE_PHOTO_PATH'] != '') {
                this.profile_pic_path = this.arr['PAGE_PROFILE_PHOTO_PATH'] + "profile/" + this.arr['PAGE_UUID'] + "_60x60.png?v=" + this.arr['IMG_UPD_DT'];
            } else {
                if (this.arr['PAGE_TYPE'] == 0) {
                    this.profile_pic_path = this._constantService.defaultPageIndImgPath;
                } else if (this.arr['PAGE_TYPE'] == 1) {
                    this.profile_pic_path = this._constantService.defaultPageCollgImgPath;
                }
            }
            if (this.arr['TITLE']) {
                this.user_name = this.postdata.decodeURIPostData(this.arr['TITLE']);
            }

        } else {
            if (this.arr['PROFILE_PHOTO_PATH'] != null && this.arr['PROFILE_PHOTO_PATH'] != '') {
                this.profile_pic_path = this.arr['PROFILE_PHOTO_PATH'] + "profile/" + this.arr['USER_ID'] + "_60x60.png?v=" + this.arr['IMG_UPD_DT'];
            } else {
                this.profile_pic_path = this._constantService.defaultImgPath;
            }
            this.user_name = this.arr['USER_NAME'];
        }
        if (this.arr['CAPTION'] != null) {
            this.file_name = this.arr['CAPTION'];
            let typearr = this.file_name.split(".");
            this.file_type = typearr[typearr.length - 1];
            this.like = this.arr['LIKED_COUNT'];
            this.pages = this.arr['NUMBERS_OF_PAGES_TO_DWLD'];
            this.path = this.arr['PATH'] + "attach/" + this.arr['USER_POST_ATTACHMENT_UUID'] + "/" + this.arr['USER_POST_ATTACHMENT_UUID'] + "." + this.file_type;
        }

        this.comment = this.arr['COMMENT'];
        this.profile_view = this.arr['PROFILE_VIEW'];
        this.my_profile = this.arr['MY_PROFILE'];
        this.editPostId = this.u_id + ":" + this.post_id + ":2";
        this.share = parseInt(this.arr['SHARED_COUNT']);
        this.download_Count = this.arr['FILE_DWLD_COUNT'];
        this.postTyp = this.arr['TYPE'];
        if (this.postTyp == 2 && this.arr['FILE_TYPE'] == 1) {
            this.image_path = this.arr['PATH'] + "img/" + this.arr['USER_POST_ATTACHMENT_UUID'] + ".png";
        }

        if (this.postTyp == 1 && this.arr['SHARE_LINK_TITLE'] != "") {
            if (this.arr['SHARE_LINK_TITLE'])
                this.link_title = this.postdata.decodeURIPostData(this.arr['SHARE_LINK_TITLE']);
            if (this.arr['SHARE_LINK_DESCRIPTION'])
                this.link_description = this.postdata.decodeURIPostData(this.arr['SHARE_LINK_DESCRIPTION']);
            if (this.arr['SHARE_LINK_IMAGE'] != null || this.arr['SHARE_LINK_IMAGE'] != 'null') {
                this.image_path = this.arr['SHARE_LINK_IMAGE'];
            }
        }

        if (this.postTyp == 3) {
            var option = this.arr['OPTIONS'];
            if (this.arr['QUESTION_TYPE'] == 1 || this.arr['QUESTION_TYPE'] == 2) {
                if (option[0] != null) {
                    this.option1 = this.postdata.decodeURIPostData(option[0]['TXT']);
                    this.option1 = this.option1.replace(/  /g, " &#160;");
                    this.option1Img = option[0]['IMG'];
                }
                if (option[1] != null) {
                    this.option2 = this.postdata.decodeURIPostData(option[1]['TXT']);
                    this.option2 = this.option2.replace(/  /g, " &#160;");
                    this.option2Img = option[1]['IMG'];
                }
                if (option[2] != null) {
                    this.option3 = this.postdata.decodeURIPostData(option[2]['TXT']);
                    this.option3 = this.option3.replace(/  /g, " &#160;");
                    this.option3Img = option[2]['IMG'];
                }
                if (option[3] != null) {
                    this.option4 = this.postdata.decodeURIPostData(option[3]['TXT']);
                    this.option4 = this.option4.replace(/  /g, " &#160;");
                    this.option4Img = option[3]['IMG'];
                }
                if (option[4] != null) {
                    this.option5 = this.postdata.decodeURIPostData(option[4]['TXT']);
                    this.option5 = this.option5.replace(/  /g, " &#160;");
                    this.option5Img = option[4]['IMG'];
                }
                if (option[5] != null) {
                    this.option6 = this.postdata.decodeURIPostData(option[5]['TXT']);
                    this.option6 = this.option6.replace(/  /g, " &#160;");
                    this.option6Img = option[5]['IMG'];
                }

                this.share = this.arr['SHARED_COUNT'];
                if (this.my_profile) {
                    var totalResponse = this.arr['RESPONSE_COUNT'];
                    this.opt1RespCount = this.arr['TOTAL_RESP_OPT1'];
                    this.opt2RespCount = this.arr['TOTAL_RESP_OPT2'];
                    this.opt3RespCount = this.arr['TOTAL_RESP_OPT3'];
                    this.opt4RespCount = this.arr['TOTAL_RESP_OPT4'];
                    this.opt5RespCount = this.arr['TOTAL_RESP_OPT5'];
                    this.opt6RespCount = this.arr['TOTAL_RESP_OPT6'];
                    if (totalResponse != 0) {
                        if (this.opt1RespCount != 0) {
                            this.opt1Percentile = (Math.round(((this.opt1RespCount / totalResponse) * 100) * 100)) / 100;
                        }
                        if (this.opt2RespCount != 0) {
                            this.opt2Percentile = (Math.round(((this.opt2RespCount / totalResponse) * 100) * 100)) / 100;
                        }
                        if (this.opt3RespCount != 0) {
                            this.opt3Percentile = (Math.round(((this.opt3RespCount / totalResponse) * 100) * 100)) / 100;
                        }
                        if (this.opt4RespCount != 0) {
                            this.opt4Percentile = (Math.round(((this.opt4RespCount / totalResponse) * 100) * 100)) / 100;
                        }
                        if (this.opt5RespCount != 0) {
                            this.opt5Percentile = (Math.round(((this.opt5RespCount / totalResponse) * 100) * 100)) / 100;
                        }
                        if (this.opt6RespCount != 0) {
                            this.opt6Percentile = (Math.round(((this.opt6RespCount / totalResponse) * 100) * 100)) / 100;
                        }
                    }

                    this.responseStatus = this.arr['RESPONSE_STATUS'];
                    this.timeStatus = this.arr['TIME_STATUS'];
                    this.questionAns = this.arr['ANSWER'];
                    this.correctResponseCount = this.arr['CORRECT_RESPONSE_COUNT'];
                    this.incorrectResponseCount = this.arr['INCORRECT_RESPONSE_COUNT'];
                    if (this.arr['USER_RESPONSE'] != null) {
                        this.myResponse = this.arr['USER_RESPONSE'];
                    }
                    this.myResponseStatus = this.arr['RESPONSE'];
                    if (this.timeStatus == 1) {
                        this.questionTime = this.arr['TIME_REMAINING'];
                        if (this.questionTime != 0) {
                            var time = this.questionTime.toString();
                            var timeArr = time.split(".");
                            this.min = parseInt(timeArr[0]) % 60;
                            this.hour = Math.floor(parseInt(timeArr[0]) / 60);
                            this.sec = parseInt(timeArr[1]);
                        } else {
                            this.resultDeclared = true;
                        }
                    } else {
                        if (this.responseStatus == 0 || this.myResponseStatus == null) {
                            this.instantResult = true;
                        } else {
                            this.resultDeclared = true;
                        }
                    }
                }
            } else {

            }
        }

        if (this.arr['TYPE'] == 5) {
            if (this.arr['TEXT']) {
                this.post_data = this.postdata.decodeURIPostData(this.arr['TEXT']).replace(/<!--bindings={/g, "").replace(/"ng-reflect-ng-if": "false"/g, "").replace(/}-->/g, "").replace(/<br>/g, "\n").replace(/&nbsp;/g, " ");
                this.post_data = this.postdata.linkActivate(this.post_data);

                this.editPostId = this.u_id + ":" + this.post_id + ":5";
                this.linkImage = "https://img.youtube.com/vi/" + this.arr['SHARE_LINK'] + "/0.jpg";
                this.videosrc = "https://www.youtube.com/embed/" + this.arr['SHARE_LINK'];
            }

        } else if (this.arr['TYPE'] == 6) {
            if (this.arr['TEXT']) {
                this.post_data = this.postdata.decodeURIPostData(this.arr['TEXT']).replace(/<!--bindings={/g, "").replace(/"ng-reflect-ng-if": "false"/g, "").replace(/}-->/g, "").replace(/<br>/g, "\n").replace(/&nbsp;/g, " ");
                this.post_data = this.postdata.linkActivate(this.post_data);

                this.editPostId = this.u_id + ":" + this.post_id + ":6";
                this.getVimeoData(this.arr['SHARE_LINK']);
                this.videosrc = "https://player.vimeo.com/video/" + this.arr['SHARE_LINK'];
            }

        }

        if (this.arr['TYPE'] == 1) {
            this.text = this.postdata.decodeURIPostData(this.arr['TEXT']);
        }

        if (this.arr['TYPE'] == 7) {

            this.enroledCount = this.arr.COURSE_DETAIL.TOTAL_ENROLLED_USER;
            if (this.arr.COURSE_DETAIL.TRAIL_OFFSET) {
                this.enroledCount = parseInt(this.enroledCount) + parseInt(this.arr.COURSE_DETAIL.TRAIL_OFFSET);
            }

            if (this.arr['PAGE_PROFILE_PHOTO_PATH'] != null && this.arr['PAGE_PROFILE_PHOTO_PATH'] != "") {
                this.profile_pic_path = this.arr['PAGE_PROFILE_PHOTO_PATH'] + "profile/" + this.arr['PAGE_UUID'] + '_60x60.png';
            } else {
                if (this.arr['PAGE_TYPE'] == "0") {
                    this.arr['PAGE_PROFILE_PHOTO_PATH'] = this._constantService.defaultPageIndImgPath;
                } else {
                    this.arr['PAGE_PROFILE_PHOTO_PATH'] = this._constantService.defaultPageCollgImgPath;
                }
            }
            this.pg_id = this.arr['PAGE_UUID'];
            this.pageTitle = this.postdata.decodeURIPostData(this.arr['TITLE']);
            this.time = this.arr['ADD_DATE_TIME'];
            if (this.arr['COURSE_DETAIL']['COURSE_COVER_PHOTO_PATH'] != null) {
                if (this.arr['COURSE_DETAIL']['COVER_TYPE'] == "0") {
                    this.corsCoverPath = this.arr['COURSE_DETAIL']['COURSE_COVER_PHOTO_PATH'] + 'cover/' + this.arr['COURSE_DETAIL']['COURSE_UUID'] + '_1235x330.png';
                } else {
                    this.corsCoverPath = this.arr['COURSE_DETAIL']['COURSE_COVER_PHOTO_PATH'];
                }
            } else {
                this.corsCoverPath = this._constantService.defaultCoverImgPath;
            }
            if (this.arr['COURSE_DETAIL']['COURSE_TITLE'] != null) {
                this.courseTitle = this.postdata.decodeURIPostData(this.arr['COURSE_DETAIL']['COURSE_TITLE']);
            }
            this.share = this.arr['SHARED_COUNT'];

            this.comment = this.arr['COMMENT'];
            this.latestComment = this.arr['LT_COMM_DATA'];

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
            this.courseLanguage = this.arr['COURSE_DETAIL']['LANGUAGE_NAME'];
            //            this.getAllLanguage();
            this.getCourseLevel();


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



        }


        if (this.arr['TYPE'] == 4) {
            if (this.arr['SHARED_POST_DATA']['TEXT']) {
                this.innerPostTyp = this.arr['SHARED_POST_DATA']['LINK_PTYPE'];
                this.text = this.postdata.decodeURIPostData(this.arr['SHARED_POST_DATA']['TEXT']).replace(/<!--bindings={/g, "").replace(/"ng-reflect-ng-if": "false"/g, "").replace(/}-->/g, "");
            }
            if (this.arr['SHARED_POST_DATA']['TYPE'] == 2 && this.arr['SHARED_POST_DATA']['FILE_TYPE'] != 1) {
                if (this.arr['SHARED_POST_DATA']['CAPTION'] != null) {
                    this.file_name = this.arr['SHARED_POST_DATA']['CAPTION'];
                }
                this.download_Count = this.arr['SHARED_POST_DATA']['FILE_DWLD_COUNT'];
                let typearr = this.file_name.split(".");
                this.file_type = typearr[typearr.length - 1];
                this.pages = this.arr['SHARED_POST_DATA']['NUMBERS_OF_PAGES_TO_DWLD'];
                this.path = this.arr['SHARED_POST_DATA']['PATH'] + "attach/" + this.arr['SHARED_POST_DATA']['USER_POST_ATTACHMENT_UUID'] + "/" + this.arr['SHARED_POST_DATA']['USER_POST_ATTACHMENT_UUID'] + "." + this.file_type;
            }
            if (this.arr['SHARED_POST_DATA']['TYPE'] == 2 && this.arr['SHARED_POST_DATA']['FILE_TYPE'] == 1) {
                this.image_path = this.arr['SHARED_POST_DATA']['PATH'] + "img/" + this.arr['SHARED_POST_DATA']['USER_POST_ATTACHMENT_UUID'] + ".png";
            }
            if (this.arr['SHARED_POST_DATA']['TYPE'] == 1 && this.arr['SHARED_POST_DATA']['SHARE_LINK_TITLE'] != "") {
                if (this.arr['SHARED_POST_DATA']['SHARE_LINK_TITLE']) {
                    this.link_title = this.postdata.decodeURIPostData(this.arr['SHARED_POST_DATA']['SHARE_LINK_TITLE']);
                }
                if (this.arr['SHARED_POST_DATA']['SHARE_LINK_DESCRIPTION']) {
                    this.link_description = this.postdata.decodeURIPostData(this.arr['SHARED_POST_DATA']['SHARE_LINK_DESCRIPTION']);
                }
                this.image_path = this.arr['SHARED_POST_DATA']['SHARE_LINK_IMAGE'];
                if (this.image_path == '' && this.image_path == null) {
                    this.image_path = '';
                }


            }


            if (this.arr['SHARED_POST_DATA']['TYPE'] == 5) {
                if (this.arr['SHARED_POST_DATA']['TEXT']) {
                    this.text = this.postdata.decodeURIPostData(this.arr['SHARED_POST_DATA']['TEXT']).replace(/<!--bindings={/g, "").replace(/"ng-reflect-ng-if": "false"/g, "").replace(/}-->/g, "");
                    this.editPostId = this.u_id + ":" + this.post_id + ":5";
                    this.linkImage = "https://img.youtube.com/vi/" + this.arr['SHARED_POST_DATA']['SHARE_LINK'] + "/0.jpg";
                    this.videosrc = "https://www.youtube.com/embed/" + this.arr['SHARED_POST_DATA']['SHARE_LINK'];
                }
            } else if (this.arr['SHARED_POST_DATA']['TYPE'] == 6) {
                if (this.arr['SHARED_POST_DATA']['TEXT']) {
                    this.text = this.postdata.decodeURIPostData(this.arr['SHARED_POST_DATA']['TEXT']).replace(/<!--bindings={/g, "").replace(/"ng-reflect-ng-if": "false"/g, "").replace(/}-->/g, "");
                    //                this.text=this.text.replace(/<!--bindings={/g,"");
                    //                this.text=this.text.replace(/"ng-reflect-ng-if": "false"/g,"");
                    //                this.text=this.text.replace(/}-->/g,"");
                    this.editPostId = this.u_id + ":" + this.post_id + ":6";
                    this.getVimeoData(this.arr['SHARED_POST_DATA']['SHARE_LINK']);
                    this.videosrc = "https://player.vimeo.com/video/" + this.arr['SHARED_POST_DATA']['SHARE_LINK'];
                }
            }


            if (this.arr['SHARED_POST_DATA']['TYPE'] == 3) {
                var option = this.arr['SHARED_POST_DATA']['OPTIONS'];
                if (this.arr['SHARED_POST_DATA']['QUESTION_TYPE'] == 1 || this.arr['SHARED_POST_DATA']['QUESTION_TYPE'] == 2) {
                    if (option[0] != null) {
                        this.option1 = this.postdata.decodeURIPostData(option[0]['TXT']);
                        this.option1 = this.option1.replace(/  /g, " &#160;");
                        this.option1Img = option[0]['IMG'];
                    }
                    if (option[1] != null) {
                        this.option2 = this.postdata.decodeURIPostData(option[1]['TXT']);
                        this.option2 = this.option2.replace(/  /g, " &#160;");
                        this.option2Img = option[1]['IMG'];
                    }
                    if (option[2] != null) {
                        this.option3 = this.postdata.decodeURIPostData(option[2]['TXT']);
                        this.option3 = this.option3.replace(/  /g, " &#160;");
                        this.option3Img = option[2]['IMG'];
                    }
                    if (option[3] != null) {
                        this.option4 = this.postdata.decodeURIPostData(option[3]['TXT']);
                        this.option4 = this.option4.replace(/  /g, " &#160;");
                        this.option4Img = option[3]['IMG'];
                    }
                    if (option[4] != null) {
                        this.option5 = this.postdata.decodeURIPostData(option[4]['TXT']);
                        this.option5 = this.option5.replace(/  /g, " &#160;");
                        this.option5Img = option[4]['IMG'];
                    }
                    if (option[5] != null) {
                        this.option6 = this.postdata.decodeURIPostData(option[5]['TXT']);
                        this.option6 = this.option6.replace(/  /g, " &#160;");
                        this.option6Img = option[5]['IMG'];
                    }

                    this.share = this.arr['SHARED_COUNT'];
                    if (this.my_profile) {
                        var totalResponse = this.arr['SHARED_POST_DATA']['RESPONSE_COUNT'];
                        this.opt1RespCount = this.arr['SHARED_POST_DATA']['TOTAL_RESP_OPT1'];
                        this.opt2RespCount = this.arr['SHARED_POST_DATA']['TOTAL_RESP_OPT2'];
                        this.opt3RespCount = this.arr['SHARED_POST_DATA']['TOTAL_RESP_OPT3'];
                        this.opt4RespCount = this.arr['SHARED_POST_DATA']['TOTAL_RESP_OPT4'];
                        this.opt5RespCount = this.arr['SHARED_POST_DATA']['TOTAL_RESP_OPT5'];
                        this.opt6RespCount = this.arr['SHARED_POST_DATA']['TOTAL_RESP_OPT6'];
                        if (totalResponse != 0) {
                            if (this.opt1RespCount != 0) {
                                this.opt1Percentile = (Math.round(((this.opt1RespCount / totalResponse) * 100) * 100)) / 100;
                            }
                            if (this.opt2RespCount != 0) {
                                this.opt2Percentile = (Math.round(((this.opt2RespCount / totalResponse) * 100) * 100)) / 100;
                            }
                            if (this.opt3RespCount != 0) {
                                this.opt3Percentile = (Math.round(((this.opt3RespCount / totalResponse) * 100) * 100)) / 100;
                            }
                            if (this.opt4RespCount != 0) {
                                this.opt4Percentile = (Math.round(((this.opt4RespCount / totalResponse) * 100) * 100)) / 100;
                            }
                            if (this.opt5RespCount != 0) {
                                this.opt5Percentile = (Math.round(((this.opt5RespCount / totalResponse) * 100) * 100)) / 100;
                            }
                            if (this.opt6RespCount != 0) {
                                this.opt6Percentile = (Math.round(((this.opt6RespCount / totalResponse) * 100) * 100)) / 100;
                            }
                        }


                        this.responseStatus = this.arr['SHARED_POST_DATA']['RESPONSE_STATUS'];
                        this.timeStatus = this.arr['SHARED_POST_DATA']['TIME_STATUS'];
                        this.questionAns = this.arr['SHARED_POST_DATA']['ANSWER'];
                        this.correctResponseCount = this.arr['SHARED_POST_DATA']['CORRECT_RESPONSE_COUNT'];
                        this.incorrectResponseCount = this.arr['SHARED_POST_DATA']['INCORRECT_RESPONSE_COUNT'];
                        if (this.arr['SHARED_POST_DATA']['USER_RESPONSE'] != null) {
                            this.myResponse = this.arr['SHARED_POST_DATA']['USER_RESPONSE'];
                        }
                        this.myResponseStatus = this.arr['SHARED_POST_DATA']['RESPONSE'];
                        if (this.timeStatus == 1) {
                            this.questionTime = this.arr['SHARED_POST_DATA']['TIME_REMAINING'];
                            if (this.questionTime != 0) {
                                var time = this.questionTime.toString();
                                var timeArr = time.split(".");
                                this.min = parseInt(timeArr[0]) % 60;
                                this.hour = Math.floor(parseInt(timeArr[0]) / 60);
                                this.sec = parseInt(timeArr[1]);
                            } else {
                                this.resultDeclared = true;
                            }
                        } else {
                            if (this.responseStatus == 0 || this.myResponseStatus == null) {
                                this.instantResult = true;
                            } else {
                                this.resultDeclared = true;
                            }
                        }
                    }
                }
                if (this.arr['SHARED_POST_DATA']['TEXT_IMAGE'] != null) {
                    console.log("fsdgfddddddddddddddddd");
                    this.questionImg = this.arr['SHARED_POST_DATA']['TEXT_IMAGE'];

                }
            }

            this.sharedPostUser_fullName = this.arr['SHARED_POST_DATA']['USER_FULL_NAME'];
            if (this.arr['SHARED_POST_DATA']['PAGE_UUID'] != '' && this.arr['SHARED_POST_DATA']['PAGE_UUID'] != null) {
                this.isPagePost = true;
                this.sharedPostUser_UserName = this.postdata.decodeURIPostData(this.arr['SHARED_POST_DATA']['TITLE']);
                if (this.arr['SHARED_POST_DATA']['PAGE_PROFILE_PHOTO_PATH'] != null && this.arr['SHARED_POST_DATA']['PAGE_PROFILE_PHOTO_PATH'] != '') {
                    this.sharedPostUser_ProfilePicPath = this.arr['SHARED_POST_DATA']['PAGE_PROFILE_PHOTO_PATH'] + "profile/" + this.arr['SHARED_POST_DATA']['PAGE_UUID'] + "_60x60.png?v=" + this.arr['SHARED_POST_DATA']['IMG_UPD_DT'];
                } else {
                    if (this.arr['SHARED_POST_DATA']['PAGE_TYPE'] == 0) {
                        this.sharedPostUser_ProfilePicPath = this._constantService.defaultPageIndImgPath;
                    } else if (this.arr['SHARED_POST_DATA']['PAGE_TYPE'] == 1) {
                        this.sharedPostUser_ProfilePicPath = this._constantService.defaultPageCollgImgPath;
                    }
                }
            } else {
                this.sharedPostUser_UserName = this.arr['SHARED_POST_DATA']['USER_NAME'];
                if (this.arr['SHARED_POST_DATA']['PROFILE_PHOTO_PATH'] != null && this.arr['SHARED_POST_DATA']['PROFILE_PHOTO_PATH'] != '') {
                    this.sharedPostUser_ProfilePicPath = this.arr['SHARED_POST_DATA']['PROFILE_PHOTO_PATH'] + "profile/" + this.arr['SHARED_POST_DATA']['USER_ID'] + "_60x60.png?v=" + this.arr['SHARED_POST_DATA']['IMG_UPD_DT'];
                } else {
                    this.sharedPostUser_ProfilePicPath = this._constantService.defaultImgPath;
                }
            }


            //            this.sharedPost_data = this.postdata.decodeURIPostData(this.arr['SHARED_POST_DATA']['TEXT']).replace(/<!--bindings={/g, "").replace(/"ng-reflect-ng-if": "false"/g, "").replace(/}-->/g, "").replace(/&#160;/g, "");
            this.sharedPost_data = this.postdata.decodeURIPostData(this.arr['SHARED_POST_DATA']['TEXT']);
            //            if (this.sharedPost_data.length > 200) {
            //                this.DataViewShared = !this.DataViewShared;
            //            }
            //            this.sharedPost_data = this.sharedPost_data.replace(/  /g, " &#160;");
            this.sharedPostTime = this.arr['SHARED_POST_DATA']['ADD_DATE_TIME'];
            this.sharedPostId = this.arr['SHARED_POST_ID'];
            this.sharedFrom = this.arr['SHARED_FROM'];
            this.sharedPostType = this.arr['SHARED_POST_DATA']['TYPE'];
            this.share = this.arr['SHARED_COUNT'];

            var postDetails: any;
            if (this.arr.SHARED_POST_DATA.TYPE == 7) {
                postDetails = this.arr.SHARED_POST_DATA;
                if (postDetails['COURSE_DETAIL']['COURSE_TITLE'] != null) {
                    this.courseTitle = this.postdata.decodeURIPostData(postDetails['COURSE_DETAIL']['COURSE_TITLE']);
                }
                this.courseLanguage = postDetails['COURSE_DETAIL']['LANGUAGE_NAME'];

                if (postDetails['COURSE_DETAIL']['COURSE_COVER_PHOTO_PATH'] != null) {
                    if (postDetails['COURSE_DETAIL']['COVER_TYPE'] == "0") {
                        this.corsCoverPath = postDetails['COURSE_DETAIL']['COURSE_COVER_PHOTO_PATH'] + 'cover/' + postDetails['COURSE_DETAIL']['COURSE_UUID'] + '_1235x330.png';
                    } else {
                        this.corsCoverPath = postDetails['COURSE_DETAIL']['COURSE_COVER_PHOTO_PATH'];
                    }
                } else {
                    this.corsCoverPath = this._constantService.defaultCoverImgPath;
                }
            }

        }
        if (this.isPagePost) {
            this.usrData['PROFILE_PIC_PATH'] = this.profile_pic_path;
            // this.usrData['USER_FULL_NAME'] = this.user_name;
            this.usrData['USER_FULL_NAME'] = this.full_name;
            console.log(this.user_name);
        } else {
            this.usrData['PROFILE_PIC_PATH'] = this.profile_pic_path;
            this.usrData['USER_FULL_NAME'] = this.full_name;
            console.log(this.full_name);
        }
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.findArticleImageSize();
        }, 1000);

    }
    findArticleImageSize() {

        // let aritcleImageParentNodeWidth = this.aritcleImage.nativeElement.parentNode.clientWidth;
        // let aritcleImageParentNodeHeight = this.aritcleImage.nativeElement.parentNode.clientHeight;
        // let articleImageWidth = this.aritcleImage.nativeElement.naturalWidth;
        // let articleImageHeight = this.aritcleImage.nativeElement.naturalHeight;
        // this.setArticleClass = this._getArticleImage.findArticleImageService(aritcleImageParentNodeWidth, aritcleImageParentNodeHeight, articleImageWidth, articleImageHeight  );

    }
    getImgUrl(index) {
        var imgUrl = "url('" + index + "')";
        return imgUrl;

    }
    //    calValidityPeriod(days    ) {
    //        this.showUnlimited = fal    se;
    //        if (days < 30    ) {
    //            this.showDays = tr    ue;
    //            this.validity = da    ys;
    //        } else if (days == 30 || days == 31    ) {
    //            this.showDays = fal    se;
    //            this.validity =     1;
    //        } else if (days == "null"    ) {
    //            this.showUnlimited = tr    ue;
    //        } els    e {
    //            this.showDays = fal    se;
    //            var x = days /     30;
    //            this.validity = Math.floor(    x);
    //            }
    //    }

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

    getCourseLevelbyId(id){
        switch(id){
            case 1: return 'Beginner Level';
            break;
            case 2: return 'Intermediate Level';
            break;
            case 3: return 'Advance Level';
            break;
            case 4: return 'All Levels';
            break;

        }
    }

    getAllLanguage() {

        this._constantService.fetchDataApiWithoutBody(this._constantService.getAllLanguageServiceUrl())
            .subscribe(data => {
                let responseData: any = data;
                if (responseData.success = this._constantService.success_msg) {
                    this.languageList = responseData.LNG_LIST;
                    setTimeout(() => {
                        if (this.arr['COURSE_DETAIL']['LANGUAGE'] != null && this.arr['COURSE_DETAIL']['LANGUAGE'] != undefined) {
                            for (var i = 0; i < this.languageList.length; i++) {
                                if (this.arr['COURSE_DETAIL']['LANGUAGE'] == this.languageList[i].LANGUAGE_ID) {
                                    this.courseLanguage = this.languageList[i].LANGUAGE;
                                }
                            }
                        }
                    }, 200);
                }
            });
    }

    updateSourcePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }

    getVimeoData(id) {
        var VIMEO_BASE_URL = "https://vimeo.com/api/oembed.json?url=https://vimeo.com/" + id;
        this._constantService.getDataApi(VIMEO_BASE_URL).subscribe(data => {
            var respoonseData: any = data;
            this.linkImage = respoonseData.thumbnail_url_with_play_button;
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    savePublicPostUrlFxn() {
        //this._constantService.setPublicClickedUrl('post/'+this.publicURL);

        this._constantService.setSessionJsonPair('publicClickedURL', 'post/' + this.publicURL);
    }


    loginpopupFxn() {
        this.openLoginPopup = !this.openLoginPopup;
        this.usrData['USER_FULL_NAME'] = this.courseTitle;
        if (this.openLoginPopup) {
            let body = document.getElementsByTagName('body')[0];
            body.classList.add("body-overflow");
        } else {
            let body = document.getElementsByTagName('body')[0];
            body.classList.remove("body-overflow");
        }
        this.changeDetector.detectChanges();
    }

    showSharePostList(event) {
        let id = this.u_id + '_' + this.post_id + '_shareTextShareList';
        console.log(id);
        event.preventDefault();
        event.stopPropagation();
        this.isSharePostList = !this.isSharePostList;

        if (event.clientY > 500) {
            setTimeout(() => {
                if (document.getElementById(id)) {
                    document.getElementById(id).style.top = "-105px";
                    document.getElementById(id).style.display = "block";
                    console.log("if");
                }
            }, 100);
        }
        else {
            setTimeout(() => {
                if (document.getElementById(id)) {
                    document.getElementById(id).style.top = "0px";
                    document.getElementById(id).style.display = "block";
                    console.log("else");
                }
            }, 100);
        }


    }

    redirectTo(url) {
        window.location.replace(url);
    }

    hideSocialList(event) {
        this.isSharePostList = false;

    }
    publicViewArticle() {
        // console.log(this.arr['SHARE_LINK']);
        // this._router.navigate([this.arr['SHARE_LINK']]);
        location.replace(this.arr['SHARE_LINK']);

    }


    enableSubmitButton() {
        this.enable_button = true;
    }
    submitResponse() {
        if (this.arr.submittedAnswer) {
            this.resultDeclared = true;
        }
        // setTimeout(() => {
        //     this.loginpopupFxn();
        // }, 2000);
    }

    checkboxupdate(event) {
        if (event.target.checked) {
            this.enable_button = true;
            this.multipleResponse.push(event.target.value);
        } else if (!event.target.checked) {
            var index = this.multipleResponse.indexOf(event.target.value);
            this.multipleResponse.splice(index, 1);
        }
    }
    submitMultipleResponse() {
        if (this.multipleResponse) {
            this.resultDeclared = true;
            this.myResponse = this.multipleResponse.sort();
            setTimeout(this.changeView.bind(this), 100);
        }
        this.submitResponse();
    }
    changeView() {
        for (var j = 0; j < this.arr.ANSWER.length; j++) {
            if (this.arr.ANSWER[j] == "A") {
                var a = (<HTMLInputElement>document.getElementById(this.post_id + "_opt1"));
                if (a != null) {
                    a.className += " rightanswer";
                }
            } else if (this.arr.ANSWER[j] == "B") {
                var b = (<HTMLInputElement>document.getElementById(this.post_id + "_opt2"));
                if (b != null) {
                    b.className += " rightanswer";
                }
            } else if (this.arr.ANSWER[j] == "C") {
                var c = (<HTMLInputElement>document.getElementById(this.post_id + "_opt3"));
                if (c != null) {
                    c.className += " rightanswer";
                }
            } else if (this.arr.ANSWER[j] == "D") {
                var d = (<HTMLInputElement>document.getElementById(this.post_id + "_opt4"));
                if (d != null) {
                    d.className += " rightanswer";
                }
            } else if (this.arr.ANSWER[j] == "E") {
                var e = (<HTMLInputElement>document.getElementById(this.post_id + "_opt5"));
                if (e != null) {
                    e.className += " rightanswer";
                }
            } else if (this.arr.ANSWER[j] == "F") {
                var f = (<HTMLInputElement>document.getElementById(this.post_id + "_opt6"));
                if (f != null) {
                    f.className += " rightanswer";
                }
            }
        }
        for (var i = 0; i < this.myResponse.length; i++) {
            if (this.arr.ANSWER.includes(this.myResponse[i]) == false) {
                if (this.myResponse[i] == "A") {
                    var a = (<HTMLInputElement>document.getElementById(this.post_id + "_opt1"));
                    if (a != null) {
                        a.className += " wronganswer";
                    }
                } else if (this.myResponse[i] == "B") {
                    var b = (<HTMLInputElement>document.getElementById(this.post_id + "_opt2"));
                    if (b != null) {
                        b.className += " wronganswer";
                    }
                } else if (this.myResponse[i] == "C") {
                    var c = (<HTMLInputElement>document.getElementById(this.post_id + "_opt3"));
                    if (c != null) {
                        c.className += " wronganswer";
                    }
                } else if (this.myResponse[i] == "D") {
                    var d = (<HTMLInputElement>document.getElementById(this.post_id + "_opt4"));
                    if (d != null) {
                        d.className += " wronganswer";
                    }
                } else if (this.myResponse[i] == "E") {
                    var e = (<HTMLInputElement>document.getElementById(this.post_id + "_opt5"));
                    if (e != null) {
                        e.className += " wronganswer";
                    }
                } else if (this.myResponse[i] == "F") {
                    var f = (<HTMLInputElement>document.getElementById(this.post_id + "_opt6"));
                    if (f != null) {
                        f.className += " wronganswer";
                    }
                }
            }
        }
    }
    submitSharedMultipleResponse() {
        if (this.multipleResponse) {
            this.resultDeclared = true;
            this.myResponse = this.multipleResponse.sort();
            setTimeout(this.sharedchangeView.bind(this), 100);
        }
        this.submitResponse();
    }
    sharedchangeView() {
        for (var j = 0; j < this.arr.SHARED_POST_DATA.ANSWER.length; j++) {
            if (this.arr.SHARED_POST_DATA.ANSWER[j] == "A") {
                var a = (<HTMLInputElement>document.getElementById(this.post_id + "_opt1"));
                if (a != null) {
                    a.className += " rightanswer";
                }
            } else if (this.arr.SHARED_POST_DATA.ANSWER[j] == "B") {
                var b = (<HTMLInputElement>document.getElementById(this.post_id + "_opt2"));
                if (b != null) {
                    b.className += " rightanswer";
                }
            } else if (this.arr.SHARED_POST_DATA.ANSWER[j] == "C") {
                var c = (<HTMLInputElement>document.getElementById(this.post_id + "_opt3"));
                if (c != null) {
                    c.className += " rightanswer";
                }
            } else if (this.arr.SHARED_POST_DATA.ANSWER[j] == "D") {
                var d = (<HTMLInputElement>document.getElementById(this.post_id + "_opt4"));
                if (d != null) {
                    d.className += " rightanswer";
                }
            } else if (this.arr.SHARED_POST_DATA.ANSWER[j] == "E") {
                var e = (<HTMLInputElement>document.getElementById(this.post_id + "_opt5"));
                if (e != null) {
                    e.className += " rightanswer";
                }
            } else if (this.arr.SHARED_POST_DATA.ANSWER[j] == "F") {
                var f = (<HTMLInputElement>document.getElementById(this.post_id + "_opt6"));
                if (f != null) {
                    f.className += " rightanswer";
                }
            }
        }
        for (var i = 0; i < this.myResponse.length; i++) {
            if (this.arr.SHARED_POST_DATA.ANSWER.includes(this.myResponse[i]) == false) {
                if (this.myResponse[i] == "A") {
                    var a = (<HTMLInputElement>document.getElementById(this.post_id + "_opt1"));
                    if (a != null) {
                        a.className += " wronganswer";
                    }
                } else if (this.myResponse[i] == "B") {
                    var b = (<HTMLInputElement>document.getElementById(this.post_id + "_opt2"));
                    if (b != null) {
                        b.className += " wronganswer";
                    }
                } else if (this.myResponse[i] == "C") {
                    var c = (<HTMLInputElement>document.getElementById(this.post_id + "_opt3"));
                    if (c != null) {
                        c.className += " wronganswer";
                    }
                } else if (this.myResponse[i] == "D") {
                    var d = (<HTMLInputElement>document.getElementById(this.post_id + "_opt4"));
                    if (d != null) {
                        d.className += " wronganswer";
                    }
                } else if (this.myResponse[i] == "E") {
                    var e = (<HTMLInputElement>document.getElementById(this.post_id + "_opt5"));
                    if (e != null) {
                        e.className += " wronganswer";
                    }
                } else if (this.myResponse[i] == "F") {
                    var f = (<HTMLInputElement>document.getElementById(this.post_id + "_opt6"));
                    if (f != null) {
                        f.className += " wronganswer";
                    }
                }
            }
        }
    }
    routeToNextQuestion() {
        this._router.navigate([this.arr.urlNext])
    }

}
