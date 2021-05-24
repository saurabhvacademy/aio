import { Component, ViewChild, OnInit, ComponentFactoryResolver, ViewContainerRef, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import { PostdataService } from './../../../services/postdata.service';
import { ConstantService } from './../../../services/constant.service';
import { Router } from '@angular/router';
import { EncryptionService } from './../../../services/encryption.service';
import { CommentComponent } from './../commentView/comment.component';
import { LocalDataService } from 'src/app/services/local-data.service';
@Component({
    selector: 'app-sharedcoursepost',
    templateUrl: './sharedcoursepost.component.html',
    // host: { '(document:click)': 'handleClick($event)' },
    providers: [PostdataService],
    styleUrls: [ './../coursepost/coursepost.component.scss', './../sharetextpostview/sharetextpostview.component.scss', './../textpost/allpost.css', './sharedcoursepost.component.scss']
})
export class SharedcoursepostComponent implements OnInit, AfterViewInit {
    postPublicShareLink: string;
    postPublicShareLinkCopy: string;
    ConfirmDeEnroll: boolean = false;
    isAdmin: any;
    isEnrolled: boolean;
    courseCoverPhoto: string;
    courseTitle: string;
    showUnlimited: boolean = false;
    isCommentHit: boolean = false;
    commImageDimns = '';
    pg_id: any;
    ltIntShow = [];
    showIntArr: boolean = false;
    pagTyp: number;
    openConfirmation: boolean = false;
    @ViewChild('container', { read: ViewContainerRef }) container;
    @ViewChild('reportPopup', { read: ElementRef }) reportPopup: ElementRef;
    _ref: any;
    vart: boolean = true;
    c_data: string = '';
    hideSpan = 1;
    config: string;
    postmenu = false;
    saveCondition = false;
    importantCondition = false;
    savepagepopup = false;
    reportpopup = false;
    arr: any;
    full_name: string;
    time: string = '';
    sharedPostTime = '';
    post_data: string = '';
    profile_pic_path: string = '';
    user_name: string = '';
    comment = 0;
    like = 0;
    share = 0;
    tagsArr = [];
    comment_image;
    showCommentImg = 1;
    image_upload_url = '';
    u_id;
    post_id;
    shrpost_id;
    likedetailspopup = false;
    edittextpost = false;
    // savepagepopup:boolean = false;
    my_profile: boolean = false;
    other_profile: boolean = false;
    editquestionpost = false;
    editPostId: string;
    DataView: boolean = false;
    seeLess: boolean = false;
    DataViewShared: boolean = false;
    seeLessShared: boolean = false;
    latestComment: any;
    factory;
    ref;
    lastCommentId = 0;
    count = 0;
    savedFolderId = 0;
    commentPresent: boolean = false;
    postTyp;
    sharedPostUser_fullName;
    sharedPostUser_UserName;
    sharedPostUser_ProfilePicPath;
    sharedPost_data;
    sharedPost_time;
    sharedPostId;
    sharedFrom;
    sharedPostType;
    file_path = '';
    uuid = '';
    interestObj = {};
    ConfirmDelete: boolean = false;
    dataConf = {};
    showPreloader: boolean = false;
    openShareScreen: boolean = false;
    editSharedPost: boolean = false;
    viewCommentList: boolean = false;
    impLikeShareStatus = false;
    shareLikeShareStatus = false;
    userLikeShareList = {};
    date = new Date();
    isPagePost: boolean = false;
    pg_uuid = '';
    title = '';
    followme: boolean = false;
    hideBtn: boolean = false;
    sharedPostEditId = '';
    courseLanguage = '';
    languageList = [];
    coursePrice: any;
    courseDiscountedPrice: any
    showMe: boolean;
    validity: string = '';
    showDays: boolean = false;
    altName = '';

    socialFbShareUrl: string;
    socialTeitterShareUrl: string;
    socialLinkedInShareUrl: string;
    socialTelegramUrl: string;
    socialWhatsappLink: string;

    isSharePostList: boolean = false;

    enroledCount;

    isTrialBased;
    isSubscribed;
    serachPostVar: any;
    userProfilePic: any;
    constructor(
        public postdata: PostdataService,
        public _constantService: ConstantService,
        public _encryptionServices: EncryptionService,
        public _router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        public _localDataService: LocalDataService
    ) { }


    hideSocialList() {
        let id = this.u_id + '_' + this.post_id + '_shareCouresShareList';
        if (document.getElementById(id)) {
            document.getElementById(id).style.display = 'none';
            document.getElementById(id).style.top = '0px';
        }

        this.isSharePostList = false;
    }




    showSharePostList(event) {
        let id = this.u_id + '_' + this.post_id + '_shareCouresShareList';
        event.preventDefault();
        event.stopPropagation();
        this.isSharePostList = !this.isSharePostList;

        if (event.clientY > 500) {
            setTimeout(() => {
                if (document.getElementById(id)) {
                    document.getElementById(id).style.top = '-105px';
                    document.getElementById(id).style.display = 'block';
                }

            }, 100);

        }
        else {
            setTimeout(() => {
                if (document.getElementById(id)) {
                    document.getElementById(id).style.top = '0px';
                    document.getElementById(id).style.display = 'block';
                }

            }, 100);
        }


    }



    ngOnInit() {
        // if(this.arr.MY_PROFILE){
            this.userProfilePic = this._localDataService.getProfilePicUrl();
        // }
        if (this.arr['POST_VIEW_SEARCH'] == 1) {

        } else {




            this.postPublicShareLinkCopy = this._constantService.staticPostShareLink + this.arr['USER_POST_ID'];

            this.postPublicShareLink = this._constantService.staticPostShareLink + this.arr['USER_POST_ID'] + '/' + this.arr.SHARED_POST_DATA['URL'];

            this.isTrialBased = this.arr.SHARED_POST_DATA.COURSE_DETAIL.SUBSCRIPTION;
            this.isSubscribed = this.arr.SHARED_POST_DATA.COURSE_DETAIL.IS_SUBSCRIBE;

            this.enroledCount = this.arr.SHARED_POST_DATA.COURSE_DETAIL.TOTAL_ENROLLED_USER;
            if (this.arr.SHARED_POST_DATA.COURSE_DETAIL.TRAIL_OFFSET) {
                this.enroledCount = parseInt(this.enroledCount) + parseInt(this.arr.SHARED_POST_DATA.COURSE_DETAIL.TRAIL_OFFSET);
            }
            this.socialFbShareUrl = 'https://www.facebook.com/dialog/feed?app_id=' + this._constantService.facebookAppId + '&link=' + this.postPublicShareLink;
            this.socialTeitterShareUrl = 'https://twitter.com/intent/tweet?text=\'\'' + '&url=' + this.postPublicShareLink;
            this.socialLinkedInShareUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=' + this.postPublicShareLink;
            this.socialTelegramUrl = 'https://telegram.me/share/url?url=' + this.postPublicShareLink;
            this.socialWhatsappLink = 'https://api.whatsapp.com/send?text=' + this.postPublicShareLink;

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
            if (this.arr['INTERESTS'].length > 4) {
                for (var i = 0; i < 4; i++) {
                    if (this.arr['INTERESTS'][i] != undefined) {
                        this.tagsArr[i] = this.arr['INTERESTS'][i];
                    }
                }
            } else {
                this.tagsArr = this.arr['INTERESTS'];
            }
            if (this.arr['INTERESTS'].length > 4) {
                this.showIntArr = true;
                for (var i = 0; i < this.arr['INTERESTS'].length; i++) {
                    if (this.arr['INTERESTS'][i + 4] != undefined && this.arr['INTERESTS'][i + 4] != null && this.arr['INTERESTS'][i + 4] != '') {
                        this.ltIntShow[i] = this.arr['INTERESTS'][i + 4];
                    }
                }
            }
            this.pagTyp = this.arr['SHARED_POST_DATA']['PAGE_TYPE'];
            this.full_name = this.arr['USER_FULL_NAME'];
            this.time = this.arr['ADD_DATE_TIME'];
            this.altName = 'study24x7 ' + this.arr['KEYWORDS'];
            if (this.arr['TEXT']) {
                this.post_data = this.postdata.decodeURIPostData(this.arr['TEXT']);
                this.post_data = this.postdata.linkActivate(this.post_data);
            } else {
                this.post_data = '';
            }

            if (this.post_data.length > 301) {
                this.DataView = !this.DataView;
                this.seeLess = this.DataView;
            }


            //outerPost
            this.user_name = this.arr['USER_NAME'];
            if (this.arr['SHARED_POST_DATA']['TITLE']) {
                this.title = this.postdata.decodeURIPostData(this.arr['SHARED_POST_DATA']['TITLE']);
            }

            this.sharedPostTime = this.postdata.getPostDateTime(this.arr['SHARED_POST_DATA']['COURSE_DETAIL']['PUBLISH_DATE_TIME']);

            //outerPostEnd

            this.like = this.arr['LIKED_COUNT'];
            if (this.arr['LIKED'] == 1) {
                this.importantCondition = !this.importantCondition;
            }
            if (this.arr['SAVED'] == 1) {
                this.saveCondition = true;
            }
            if (this.arr['SAVED_POST_FLD_ID'] != 0) {
                this.savedFolderId = this.arr['SAVED_POST_FLD_ID'];
            }
            this.comment = this.arr['COMMENT'];
            this.my_profile = this.arr['MY_PROFILE'];
            this.other_profile = this.arr['OTHER_PROFILE'];
            this.post_id = this.arr['USER_POST_ID'];
            this.shrpost_id = this.arr['SHARED_POST_ID'];

            this.u_id = this.arr['USER_ID'];
            this.share = parseInt(this.arr['SHARED_COUNT']);
            this.editPostId = this.u_id + ':' + this.post_id + ':4';
            this.latestComment = this.arr['LT_COMM_DATA'];


            this.postTyp = this.arr['TYPE'];
            this.sharedPostUser_fullName = this.arr['SHARED_POST_DATA']['USER_FULL_NAME'];

            //parentPost

            if (this.arr['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_TITLE'] != null) {
                this.courseTitle = this.postdata.decodeURIPostData(this.arr['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_TITLE']);
            }

            if (this.arr['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_COVER_PHOTO_PATH']) {
                if (this.arr['SHARED_POST_DATA']['COURSE_DETAIL']['COVER_TYPE'] == '0') {
                    this.courseCoverPhoto = this.arr['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_COVER_PHOTO_PATH'] + 'cover/' + this.arr['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_UUID'] + '_1235x330.png';
                } else {
                    this.courseCoverPhoto = this.arr['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_COVER_PHOTO_PATH'];
                }
            } else {
                this.courseCoverPhoto = this._constantService.defaultCoverImgPath;
            }

            if (this.arr['SHARED_POST_DATA']['PAGE_PROFILE_PHOTO_PATH'] != null && this.arr['SHARED_POST_DATA']['PAGE_PROFILE_PHOTO_PATH'] != '') {
                this.sharedPostUser_ProfilePicPath = this.arr['SHARED_POST_DATA']['PAGE_PROFILE_PHOTO_PATH'] + 'profile/' + this.arr['SHARED_POST_DATA']['PAGE_UUID'] + '_60x60.png?v=' + this.arr['IMG_UPD_DT'];
            } else {
                if (this.arr['SHARED_POST_DATA']['PAGE_TYPE'] == '0') {
                    this.sharedPostUser_ProfilePicPath = this._constantService.defaultPageIndImgPath;
                } else if (this.arr['SHARED_POST_DATA']['PAGE_TYPE'] == '1') {
                    this.sharedPostUser_ProfilePicPath = this._constantService.defaultPageCollgImgPath;
                }
            }

            if (this.arr['SHARED_POST_DATA']['PAGE_UUID'] != '' && this.arr['SHARED_POST_DATA']['PAGE_UUID'] != null) {
                this.pg_uuid = this.arr['SHARED_POST_DATA']['PAGE_UUID'];
                this.isPagePost = true;
                if (this.arr['SHARED_POST_DATA']['PAGE_NAME'] != '' && this.arr['SHARED_POST_DATA']['PAGE_NAME'] != null) {
                    this.pg_id = this.arr['SHARED_POST_DATA']['PAGE_NAME'];
                } else {
                    this.pg_id = this.arr['SHARED_POST_DATA']['PAGE_UUID'];
                }
                if (this.arr['SHARED_POST_DATA']['PAGE_FOLLOW_STATUS'] == 1) {
                    this.followme = true;
                    this.hideBtn = true;
                }
                if (this.arr['SHARED_POST_DATA']['PAGE_PROFILE_PHOTO_PATH'] != null && this.arr['SHARED_POST_DATA']['PAGE_PROFILE_PHOTO_PATH'] != '') {
                    this.profile_pic_path = this.arr['SHARED_POST_DATA']['PAGE_PROFILE_PHOTO_PATH'] + 'profile/' + this.arr['SHARED_POST_DATA']['PAGE_UUID'] + '_60x60.png?v=' + this.arr['IMG_UPD_DT'];
                } else {
                    if (this.pagTyp == 0) {
                        this.profile_pic_path = this._constantService.defaultPageIndImgPath;
                    } else if (this.pagTyp == 1) {
                        this.profile_pic_path = this._constantService.defaultPageCollgImgPath;
                    }
                }
                this.title = this.postdata.decodeURIPostData(this.arr['SHARED_POST_DATA']['TITLE']);
                this.user_name = this.arr['USER_NAME'];
            } else {
                this.sharedPostUser_UserName = this.arr['SHARED_POST_DATA']['TITLE'];

            }

            //parentPostEnd
            if (this.arr['SHARED_POST_DATA']['TEXT']) {
                this.sharedPost_data = this.postdata.decodeURIPostData(this.arr['SHARED_POST_DATA']['TEXT']);
                this.sharedPost_data = this.postdata.linkActivate(this.sharedPost_data);
                if (this.sharedPost_data.length > 200) {
                    this.DataViewShared = !this.DataViewShared;
                    this.seeLessShared = this.DataViewShared;
                }
            } else {
                this.sharedPost_data = '';
            }

            this.isAdmin = this.arr['SHARED_POST_DATA']['IS_ADMIN'];
            this.sharedPostId = this.arr['SHARED_POST_ID'];
            this.sharedFrom = this.arr['SHARED_FROM'];
            this.sharedPostType = this.arr['SHARED_POST_DATA']['TYPE'];
            this.sharedPostEditId = this.sharedFrom + ':' + this.sharedPostId + ':1';

            if (Object.keys(this.latestComment).length != 0) {
                this.viewCommentList = true;
            }
            if (this.comment > 1) {
                this.commentPresent = true;
            }

            this.courseLanguage = this.arr['SHARED_POST_DATA']['COURSE_DETAIL']['LANGUAGE_NAME'];

            //        this.getAllLanguage();
            this.getCourseLevel();

            if (this.arr['SHARED_POST_DATA']['COURSE_DETAIL']['RVALIDITY']) {
                this.validity = this.arr['SHARED_POST_DATA']['COURSE_DETAIL']['RVALIDITY'];
            }

            if (this.arr['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_TYPE'] == 1) {
                this.coursePrice = this.arr['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_PRICE']['0']['COST'];
                this.courseDiscountedPrice = this.arr['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_PRICE']['0']['DISCOUNT_COST'];
            }

            if (this.arr['SHARED_POST_DATA']['COURSE_DETAIL']['IS_ENROLLED'] == '1') {
                this.isEnrolled = true;
            } else {
                this.isEnrolled = false;
            }


        }
        //this.getReachPost();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (this.showIntArr == true) {
            var innerWidthFull = window.innerWidth;
            var interestPosLeft = document.getElementById(this.post_id + '_interestpos').offsetLeft;
            var interestPosRight = innerWidthFull - interestPosLeft;
            if (window.innerWidth < 600) {
                if (interestPosRight <= 185) {
                    document.getElementById(this.post_id + '_shftToLeft').style.left = '-148px';
                    document.getElementById(this.post_id + '_shiftArrowLeft').style.left = '155px';
                } else {
                    document.getElementById(this.post_id + '_shftToLeft').style.left = '-9px';
                    document.getElementById(this.post_id + '_shiftArrowLeft').style.left = '15px';
                }
            }
        }
    }
    private findInterestPos() {
        if (this.showIntArr == true) {
            var innerWidthFull = window.innerWidth;
            var interestPosLeft = document.getElementById(this.post_id + '_interestpos').offsetLeft;
            var interestPosRight = innerWidthFull - interestPosLeft;
            if (window.innerWidth < 600) {
                if (interestPosRight <= 185) {
                    document.getElementById(this.post_id + '_shftToLeft').style.left = '-148px';
                    document.getElementById(this.post_id + '_shiftArrowLeft').style.left = '155px';
                } else {
                    document.getElementById(this.post_id + '_shftToLeft').style.left = '-9px';
                    document.getElementById(this.post_id + '_shiftArrowLeft').style.left = '15px';
                }
            }
        }
    }
    // ngAfterViewChecked(){
    // this.findInterestPos();
    // }
    ngAfterViewInit() {
        this.findInterestPos();
        if (Object.keys(this.latestComment).length != 0) {
            this.lastCommentId = this.latestComment.USER_COMMENT_ID;
            this.latestComment['ADD_DATE_TIME'] = this.latestComment['ADD_DATE_TIME'];
            //this._constantService.setComentData(this.latestComment);
            this.factory = this.componentFactoryResolver.resolveComponentFactory(CommentComponent);
            this.ref = this.container.createComponent(this.factory);
            this.ref.instance.arr = this.latestComment;
            this.ref.instance._ref = this.ref;
            if (this.comment > 1 && this._router.url.split('/')[1] == 'post') {
                this.getComment();
            }
        }
    }

    confirmText(value, event) {
        event.preventDefault();
        event.stopPropagation();
        this.c_data = value;
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
            comment['cmid'] = '0';
            if (this.comment_image != null) {
                comment['fpath'] = this.file_path;
                comment['uuid'] = this.uuid;
                comment['dimns'] = this.commImageDimns;
            } else {
                comment['fpath'] = '';
                comment['uuid'] = '';
            }
            if (comment['cmda'].length == 0 && this.comment_image == null) {
                return false;

            }

            event.preventDefault();
            if (this.isCommentHit == true) {
                this._constantService.fetchDataApi(this._constantService.putCommentServiceUrl(), comment).subscribe(data => {
                    var responseData: any = data;
                    var status = responseData.STATUS;
                    if (status == this._constantService.success_msg) {
                        this.showCommentImg = 1;
                        this.comment_image = null;
                        this.hideSpan = 1;
                        var date = new Date();
                        var addComment = {};
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
                        addComment['ADD_DATE_TIME'] = this.postdata.getPostDateTime(date.getTime());
                        var count = (<HTMLElement>document.getElementById(this.post_id + '_comm_count'));
                        if (count != null) {
                            if (parseInt(count.innerHTML) == 0) {
                                count.style.display = 'inline-block';
                            }
                            count.innerHTML = (parseInt(count.innerHTML) + 1).toString();
                        } else {
                            this.comment = 1;
                        }
                        this.factory = this.componentFactoryResolver.resolveComponentFactory(CommentComponent);
                        this.ref = this.container.createComponent(this.factory, 0);
                        this.ref.instance.arr = addComment;
                        this.ref.instance._ref = this.ref;
                        event.target.innerHTML = this._constantService.commentPlaceHolder;
                        event.target.classList.add('placeholdercolor');
                        event.target.classList.remove('option_inputt', 'setwdth');
                        this.hideSpan = 1;
                        this.uuid = '';
                        this.file_path = '';
                        window.getSelection().removeAllRanges();
                        this.isCommentHit == true;
                    } else if (status == this._constantService.error_token) {
                        this.dataConf['type'] = 4;
                        this.dataConf['msg'] = 'Session Expire';
                        this.dataConf['error_msg'] = 'Session Expired';
                        this.openConfirmation = true;
                    } else {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = 'STUDY24X7';
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
        } else if (event.keyCode == 13 && event.keyCode == 17) {
            event.target.innerHTML = event.target.innerHTML + '<br>';
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
            var responseData: any = data;
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
                    responseData.COMMENT_DATA[i].USER_POST_ID = this.post_id;
                    responseData.COMMENT_DATA[i].ADD_DATE_TIME = this.postdata.getPostDateTime(responseData.COMMENT_DATA[i].ADD_DATE_TIME);
                    this.factory = this.componentFactoryResolver.resolveComponentFactory(CommentComponent);
                    this.ref = this.container.createComponent(this.factory);
                    this.ref.instance.arr = responseData.COMMENT_DATA[i];
                    this.ref.instance._ref = this.ref;
                }
            } else if (status == this._constantService.error_token) {
                this._constantService.clearUserInfo();
                this._router.navigate(['']);
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = 'Session Expire';
                this.dataConf['error_msg'] = 'Session Expired';
                this.openConfirmation = true;
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = 'STUDY24X7';
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

    addImageFile(event: any) {
        this.comment_image = event.target.files[0];
        let type = this.comment_image.name;
        var reader = new FileReader();
        var typearr = type.split('.');
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
                upload['token_param']['device_type'] = 'w';
                upload['token_param']['host'] = '';
                var data = JSON.stringify(upload);
                var encData = this._encryptionServices.encrypt(data);
                let formData = new FormData();
                formData.append('file', this.comment_image);
                formData.append('pattchid', '0');
                formData.append('token', encData);
                formData.append('type', '4');

                this._constantService.uploadFileApi(this._constantService.getUploadFileServiceUrl(), formData).subscribe(data => {
                    var responseData: any = data;
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
                        this.dataConf['type'] = 4;
                        this.dataConf['msg'] = 'Session Expire';
                        this.dataConf['error_msg'] = 'Session Expired';
                        this.openConfirmation = true;
                    } else {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = 'STUDY24X7';
                        this.dataConf['error_msg'] = responseData.ERROR_MSG;
                        this.openConfirmation = true;
                        this.showCommentImg = 1;
                        this.comment_image = null;
                    }
                }, error => {
                    var responseData = error;
                    if (responseData.status == 500) {
                        this._router.navigate(['500']);
                    }
                });
            } else {
                this.dataConf['msg'] = 'STUDY24X7';
                this.dataConf['error_msg'] = 'Unable to support the selected file';
                this.openConfirmation = true;
                this.showCommentImg = 1;
                this.comment_image = null;
            }
        } else {
            this.dataConf['msg'] = 'STUDY24X7';
            this.dataConf['type'] = 2;
            this.dataConf['error_msg'] = 'File above 10mb is not allowed';
            this.openConfirmation = true;
            this.showCommentImg = 1;
            this.comment_image = null;
        }

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
                var responseData: any = data;
                var status = responseData.STATUS;
                if (status == this._constantService.success_msg) {
                    this.vart = true;
                    this.importantCondition = !this.importantCondition;
                    if (this.importantCondition) {
                        this.like++;
                    } else {
                        if (this.like != 0) {
                            this.like--;
                        }
                    }
                } else if (status == this._constantService.error_token) {
                    this.vart = true;
                    this.dataConf['type'] = 4;
                    this.dataConf['msg'] = 'Session Expire';
                    this.dataConf['error_msg'] = 'Session Expired';
                    this.openConfirmation = true;
                } else {
                    this.vart = true;
                    this.dataConf['type'] = 2;
                    this.dataConf['msg'] = 'STUDY24X7';
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
    //        }else {
    //            this.showDays = false;
    //            var x = days / 30;
    //            this.validity = Math.floor(x);
    //        }
    //    }

    getAllLanguage() {

        this._constantService.fetchDataApiWithoutBody(this._constantService.getAllLanguageServiceUrl())
            .subscribe(data => {
                let responseData: any = data;
                if (responseData.success = this._constantService.success_msg) {
                    this.languageList = responseData.LNG_LIST;

                    if (this.arr['SHARED_POST_DATA']['COURSE_DETAIL']['LANGUAGE'] != null && this.arr['SHARED_POST_DATA']['COURSE_DETAIL']['LANGUAGE'] != undefined) {
                        for (var i = 0; i < this.languageList.length; i++) {
                            if (this.arr['SHARED_POST_DATA']['COURSE_DETAIL']['LANGUAGE'] == this.languageList[i].LANGUAGE_ID) {
                                this.courseLanguage = this.languageList[i].LANGUAGE;
                            }
                        }
                    }
                }

            });
    }

    getCourseLevel() {
        var courseLevelId = this.arr['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_LEVEL'];
        if (courseLevelId == 1) {
            this.arr['SHARED_POST_DATA']['COURSE_DETAIL']['LEVEL'] = 'Beginner Level';
        } else if (courseLevelId == 2) {
            this.arr['SHARED_POST_DATA']['COURSE_DETAIL']['LEVEL'] = 'Intermediate Level';
        } else if (courseLevelId == 3) {
            this.arr['SHARED_POST_DATA']['COURSE_DETAIL']['LEVEL'] = 'Advance Level';
        } else if (courseLevelId == 4) {
            this.arr['SHARED_POST_DATA']['COURSE_DETAIL']['LEVEL'] = 'All Levels';
        }
    }

    postdropdown() {
        this.postmenu = !this.postmenu;
    }

    hidePlaceHolder(event) {
        if (event.target.innerText == this._constantService.commentPlaceHolder) {
            event.target.innerText = '';
            var v = document.getElementById(event.target.id);
            v.classList.remove('placeholdercolor');
            v.classList.add('option_inputt', 'setwdth');
            this.isCommentHit = false;
        }
        document.getElementById(event.target.id).focus();
    }

    showPlaceHolder() {
        var id = this.u_id + '_' + this.post_id + '_comm';
        var txt = document.getElementById(id);
        txt.innerHTML = txt.innerHTML.replace(this._constantService.junkText, '');
        if (txt.innerText.length == 0 || txt.innerText.length == 1) {
            txt.classList.add('placeholdercolor');
            txt.classList.remove('option_inputt', 'setwdth');
            txt.innerText = this._constantService.commentPlaceHolder;
        }
    }

    impLikeShareFn() {
        this.userLikeShareList['postId'] = this.post_id;
        this.userLikeShareList['type'] = 1;
        this.userLikeShareList['count'] = this.like;
        this.impLikeShareStatus = !this.impLikeShareStatus;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add('body-overflow');
    }
    shareLikeShareFn() {
        this.userLikeShareList['postId'] = this.sharedPostId;
        this.userLikeShareList['type'] = 2;
        this.userLikeShareList['count'] = this.share;
        this.shareLikeShareStatus = !this.shareLikeShareStatus;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add('body-overflow');
    }
    CloseViewAll($event) {
        this.impLikeShareStatus = false;
        this.shareLikeShareStatus = false;
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove('body-overflow');
    }

    removePost(event) {
        if (event) {
            this._ref.destroy();
            this._constantService.callEmptyStateMethod();
        }
        this.reportpopup = false;
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove('body-overflow');
    }

    DeletePostCnf() {
        this.ConfirmDelete = true;
        this.dataConf['msg'] = 'Post Deletion'
        this.dataConf['error_msg'] = 'Are you sure about deleting this feed post?';
        this.dataConf['type'] = 1;
        this.dataConf['pid'] = this.post_id;
        this.dataConf['ptyp'] = 4;

        let body = document.getElementsByTagName('body')[0];
        body.classList.add('body-overflow');
    }

    CloseDeleteConfirm(event) {
        this.ConfirmDelete = event['closePopUpStatus'];
        if (event['delPostStatus']) {
            this._ref.destroy();
        }
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove('body-overflow');
    }

    autoFocus() {
        var id = this.u_id + '_' + this.post_id + '_comm';
        if ((<HTMLInputElement>document.getElementById(id)).innerText == this._constantService.commentPlaceHolder) {
            (<HTMLInputElement>document.getElementById(id)).innerText = '';
        }
        (<HTMLInputElement>document.getElementById(id)).focus();

    }

    handleClick(event) {
        this.isSharePostList = false;
        var clickedComponent = event.target;
        var openPopUp = 0;
        do {
            if (this.reportPopup && clickedComponent === this.reportPopup.nativeElement) {
                openPopUp = 1;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (openPopUp != 1) {
            this.postmenu = false;
        }
    }

    shareCoursePostScreen() {
        this.arr['EDIT_POST'] = false;
        this.openShareScreen = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add('body-overflow');
    }

    sharecoursepostscreenhide(stextpara) {
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove('body-overflow');
        this.openShareScreen = false;
        if (stextpara) {
            this.share += 1;
        }
    }

    editPost() {
        this.arr['EDIT_POST'] = true;
        this.editSharedPost = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add('body-overflow');
    }

    reprts() {
        this.reportpopup = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add('body-overflow');

    }

    reportpopuphide() {
        this.reportpopup = false;
    }

    savedpost() {
        if (this.saveCondition == false) {
            this.savepagepopup = !this.savepagepopup;
            let body = document.getElementsByTagName('body')[0];
            body.classList.add('body-overflow');
        } else {
            this.putUserPostUnsaved();
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
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this._constantService.showToast('Unsaved successfully', 'Post', '1');

                this.saveCondition = false;
                var herf = this._router.url;
                var urlArr = herf.split('/');
                if (urlArr[1] == 'saved') {
                    setTimeout(() => {
                        var count = (document.getElementById(this.savedFolderId + '_count'));
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
                this.dataConf['msg'] = 'Session Expire';
                this.dataConf['error_msg'] = 'Session Expired';
                this.openConfirmation = true;
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = 'STUDY24X7';
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

    closeCnfPopup(event) {
        if (event['deEnroll'] == false) {
            this.ConfirmDeEnroll = false;
        } else if (event['deEnroll'] == true) {
            this.ConfirmDeEnroll = false;
            this.deEnrollCourse();
        }
    }

    checkEnroll() {

        var herf = this._router.url;
        var urlArr = herf.split('/');

        if (urlArr[1] === 'course') {
            if (this.arr['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_TYPE'] != 0) {
                this.purchaseCourse();
            } else {
                this.enrollCourse();
            }
        } else {
            this._router.navigate(['/course/' + this.arr['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_URL']]);
        }


    }

    askForDeEnroll() {
        var herf = this._router.url;
        var urlArr = herf.split('/');

        if (urlArr[1] === 'course') {
            this.dataConf['type'] = 8;
            this.dataConf['msg'] = 'STUDY24X7';
            this.dataConf['error_msg'] = 'Do you want to De-enroll this course ?';
            this.ConfirmDeEnroll = true;
        } else {
            this._router.navigate(['/course/' + this.arr['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_URL']]);
        }

    }

    enrollCourse() {
        var enrollCourse = {};
        enrollCourse['token'] = this._constantService.getSessionDataBYKey('token');
        enrollCourse['token_param'] = {};
        enrollCourse['token_param']['device_type'] = 'w';
        enrollCourse['token_param']['host'] = '';
        enrollCourse['cors_type'] = this.arr['SHARED_POST_DATA']['PAGE_TYPE'];
        enrollCourse['pg_uuid'] = this.pg_id;
        enrollCourse['cors_uuid'] = this.arr['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_UUID'];



        this._constantService.fetchDataApi(this._constantService.getCourseEnrollFreeServiceUrl(), enrollCourse).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.isEnrolled = true;

            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = 'STUDY24X7';
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }
        }
        );

    }

    deEnrollCourse() {
        var deEnrollCourse = {};
        deEnrollCourse['token'] = this._constantService.getSessionDataBYKey('token');
        deEnrollCourse['token_param'] = {};
        deEnrollCourse['token_param']['device_type'] = 'w';
        deEnrollCourse['token_param']['host'] = '';
        deEnrollCourse['cors_uuid'] = this.arr['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_UUID'];


        this._constantService.fetchDataApi(this._constantService.deEnrollCourse(), deEnrollCourse).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.isEnrolled = false;


            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = 'STUDY24X7';
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }
        }
        );

    }

    purchaseCourse() {
        this._router.navigate(['payment/' + this.arr['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_UUID']]);
    }

    routToCourseDetail() {
        var herf = this._router.url;
        var urlArr = herf.split('/');
        if (urlArr[1] !== 'course') {
            var id = this.arr['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_UUID'];
            var publish = this.arr['SHARED_POST_DATA']['COURSE_DETAIL']['PUBLISH'];
            var is_admin = this.arr['SHARED_POST_DATA']['IS_ADMIN'];
            if (publish == 1) {
                if (is_admin == 1) {
                    this._router.navigate(['addcourse/' + id]);
                }
                if (is_admin == 0) {
                    this._router.navigate(['course/' + this.arr['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_URL']]);
                }
            } else {
                this._constantService.showToast('This course is temporarily not available', 'STUDY24X7', 3)
            }
        }
    }

    updateProfilePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }
    showNotify() {
        this._constantService.showToast('Link has been Copied', '', '1');

    }
}
