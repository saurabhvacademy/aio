import { Component, ViewChild, OnInit, Output, EventEmitter, ComponentFactoryResolver, ViewContainerRef, AfterViewInit, ElementRef, HostListener, Input } from '@angular/core';
import { PostdataService } from './../../../services/postdata.service';
import { ConstantService } from './../../../services/constant.service';
import { Router } from '@angular/router';
import { EncryptionService } from './../../../services/encryption.service';
import { CommentComponent } from "./../commentView/comment.component";
import { LocalDataService } from 'src/app/services/local-data.service';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    providers: [PostdataService],
    styleUrls: ['./postcommon.css', './allpostcommon.css', './post.component.scss']
})
export class PostComponent implements OnInit, AfterViewInit {
    postPublicShareLink = '';
    // isCommentHit: boolean = false;
    // commImageDimns = '';
    pg_id: any;
    ltIntShow = [];
    showIntArr: boolean = false;
    // ltTagsArr = [];
    // id: string;
    // shrCount;
    openConfirmation: boolean = false;
    vart: boolean = true;
    // val: any;
    // text: any;
    @Output() popCancel = new EventEmitter<boolean>();
    @ViewChild('container', { read: ViewContainerRef }) container;
    @ViewChild('reportPopup', { read: ElementRef }) reportPopup: ElementRef;
    @ViewChild('commentPlaceHolder', { read: ElementRef }) commentPlaceHolder: ElementRef;
    @ViewChild('aritcleImage', { read: ElementRef }) aritcleImage: ElementRef;
    @ViewChild('aritcleImageDiv', { read: ElementRef }) aritcleImageDiv: ElementRef;
    _ref: any;
    altName = "";
    // show: boolean = false;
    // config: string;
    // hideSpan = 1;
    postmenu = false;
    saveCondition = false;
    importantCondition = false;
    // savepagepopup = false;
    reportpopup = false;
    full_name: string;
    time: string;
    post_data: string = '';
    profile_pic_path: string;
    user_name: string;
    comment = 0;
    // c_data: string = "";
    like = 0;
    share = 0;
    tagsArr = [];
    @Input() arr: any;
    // comment_image;
    // showCommentImg = 1;
    image_upload_url = '';
    u_id;
    post_id;
    // likedetailspopup = false;
    edittextpost = false;
    // savepagepopup:boolean = false;
    my_profile: boolean = false;
    other_profile: boolean = false;
    // editquestionpost = false;
    editPostId: string;
    DataView: boolean = false;
    seeLess = -1;
    // Datashow: boolean = false;
    latestComment: any;
    factory;
    ref;
    lastCommentId = 0;
    // cofunt = 0;
    savedFolderId;
    commentPresent: boolean = false;
    postTyp;
    // file_path = "";
    // uuid = "";
    interestObj = {};
    ConfirmDelete: boolean = false;
    dataConf = {};
    // showPreloader: boolean = false;
    viewCommentList: boolean = false;
    // post_data_trim = "";
    impLikeShareStatus = false;
    shareLikeShareStatus = false;
    userLikeShareList = {};
    // date = new Date();
    isPagePost: boolean = false;
    pg_uuid = "";
    followme: boolean = false;
    hideBtn: boolean = false;
    // showinterestTag: boolean = false;
    // junktxt = '<br><div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;"><div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div></div><div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;"><div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div></div>';
    socialFbShareUrl: string;
    socialTeitterShareUrl: string;
    socialLinkedInShareUrl: string;
    socialTelegramUrl: string;
    socialWhatsappLink: string;
    serachPostVar: any;
    isSharePostList: boolean = false;
    // articleImageWidth = null;
    // articleImageHeight = null;
    // aritcleImageParentNodeWidth = null;
    // aritcleImageParentNodeHeight = null;
    // ImgRatio = null;
    @Input() inSharedPost: boolean = false;
    @Input() inSharedScreen: boolean = false;

    headerData: any = {};
    footerData: any = {};
    constructor(
        public postdata: PostdataService,
        public _constantService: ConstantService,
        public _encryptionServices: EncryptionService,
        public _router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        public _localDataService: LocalDataService

    ) {

        //this.arr = this.postdata.getPostData();
        if (this.arr != null) {

            //            alert(Object.keys(this.latestComment));

        }
    }
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (this.showIntArr == true) {
            var innerWidthFull = window.innerWidth;
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


    ngAfterViewInit() {
        if (this.arr['POST_VIEW_SEARCH'] == 1) {

        } else {
            // this.findInterestPos();
            if (this.latestComment && Object.keys(this.latestComment).length != 0) {
                this.latestComment['ADD_DATE_TIME'] = this.postdata.getPostDateTime(this.latestComment['ADD_DATE_TIME']);
                this.lastCommentId = this.latestComment.USER_COMMENT_ID;
                //this.latestComment['ADD_DATE_TIME'] = this.postdata.getPostDateTime(this.latestComment['ADD_DATE_TIME']);
                //this._constantService.setCommentData(this.latestComment);
                this.factory = this.componentFactoryResolver.resolveComponentFactory(CommentComponent);
                this.ref = this.container.createComponent(this.factory);
                this.ref.instance.arr = this.latestComment;
                this.ref.instance._ref = this.ref;
                if (this.comment > 1 && this._router.url.split('/')[1] == "post") {
                    this.getComment();
                }
            }

        }

    }
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
        if (!this.inSharedPost && !this.inSharedScreen ) {
            if (this.arr['POST_VIEW_SEARCH'] == 1) {
                this.serachPostVar = 1;
                this.postPublicShareLink = this._constantService.staticPostShareLink + this.arr['USER_POST_ID'] + '/' + this.arr['URL'];
                this.socialFbShareUrl = "https://www.facebook.com/dialog/feed?app_id=" + this._constantService.facebookAppId + "&link=" + this.postPublicShareLink;
                this.socialTeitterShareUrl = "https://twitter.com/intent/tweet?text=''" + "&url=" + this.postPublicShareLink;
                this.socialLinkedInShareUrl = "https://www.linkedin.com/sharing/share-offsite/?url=" + this.postPublicShareLink;
                this.socialTelegramUrl = "https://telegram.me/share/url?url=" + this.postPublicShareLink;
                this.socialWhatsappLink = "https://api.whatsapp.com/send?text=" + this.postPublicShareLink;

                this.setInterestObj();
                this.full_name = this.arr['FIRST_NAME'] + " " + this.arr['LAST_NAME'];
                this.time = this.arr['ADD_DATE_TIME'];

                this.altName = "aio " + this.arr['KEYWORDS'];
                //this.post_data = this.post_data.replace(/  /g, " &#160;");
                if (this.arr['PAGE_UUID'] != '' && this.arr['PAGE_UUID'] != null) {
                    this.pg_uuid = this.arr['PAGE_UUID'];
                    this.isPagePost = true;
                    if (this.arr['PAGE_NAME'] != '' && this.arr['PAGE_NAME'] != null) {
                        this.pg_id = this.arr['PAGE_NAME'];
                    } else {
                        this.pg_id = this.arr['PAGE_UUID'];
                    }
                    if (this.arr['PAGE_FOLLOW_STATUS'] == 1) {
                        this.followme = true;
                        this.hideBtn = true;
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
                    this.user_name = this.postdata.decodeURIPostData(this.arr['TITLE']);
                } else {
                    if (this.arr['PROFILE_PHOTO_PATH'] != null && this.arr['PROFILE_PHOTO_PATH'] != '') {
                        this.profile_pic_path = this.arr['PROFILE_PHOTO_PATH'] + "profile/" + this.arr['USER_ID'] + "_60x60.png?v=" + this.arr['IMG_UPD_DT'];
                    } else { this.profile_pic_path = this._constantService.defaultImgPath; }
                    this.user_name = this.arr['USER_NAME'];
                }
                if (this.arr['TEXT']) {
                    this.post_data = this.postdata.decodeURIPostData(this.arr['TEXT']);
                    this.post_data = this.postdata.linkActivate(this.post_data);
                }

                if (this.post_data.length > 301) {
                    this.DataView = !this.DataView;
                    this.seeLess = 0;
                }
            } else {
                this.postPublicShareLink = this._constantService.staticPostShareLink + this.arr['USER_POST_ID'] + '/' + this.arr['URL'];

                this.socialFbShareUrl = "https://www.facebook.com/dialog/feed?app_id=" + this._constantService.facebookAppId + "&link=" + this.postPublicShareLink;
                this.socialTeitterShareUrl = "https://twitter.com/intent/tweet?text=''" + "&url=" + this.postPublicShareLink;
                this.socialLinkedInShareUrl = "https://www.linkedin.com/sharing/share-offsite/?url=" + this.postPublicShareLink;
                this.socialTelegramUrl = "https://telegram.me/share/url?url=" + this.postPublicShareLink;
                this.socialWhatsappLink = "https://api.whatsapp.com/send?text=" + this.postPublicShareLink;
                this.setInterestObj();

                this.full_name = this.arr['USER_FULL_NAME'];
                this.time = this.arr['ADD_DATE_TIME'];

                this.altName = "aio " + this.arr['KEYWORDS'];
                //this.post_data = this.post_data.replace(/ /g, "&#160;");
                if (this.arr['PAGE_UUID'] != '' && this.arr['PAGE_UUID'] != null) {
                    this.pg_uuid = this.arr['PAGE_UUID'];
                    this.isPagePost = true;
                    if (this.arr['PAGE_NAME'] != '' && this.arr['PAGE_NAME'] != null) {
                        this.pg_id = this.arr['PAGE_NAME'];
                    } else {
                        this.pg_id = this.arr['PAGE_UUID'];
                    }
                    if (this.arr['PAGE_FOLLOW_STATUS'] == 1) {
                        this.followme = true;
                        this.hideBtn = true;
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
                    this.user_name = this.postdata.decodeURIPostData(this.arr['TITLE']);
                } else {
                    if (this.arr['PROFILE_PHOTO_PATH'] != null && this.arr['PROFILE_PHOTO_PATH'] != '') {
                        this.profile_pic_path = this.arr['PROFILE_PHOTO_PATH'] + "profile/" + this.arr['USER_ID'] + "_60x60.png?v=" + this.arr['IMG_UPD_DT'];
                    } else { this.profile_pic_path = this._constantService.defaultImgPath; }
                    this.user_name = this.arr['USER_NAME'];
                }

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
                this.u_id = this.arr['USER_ID'];
                this.share = parseInt(this.arr['SHARED_COUNT']);
                this.editPostId = this.u_id + ":" + this.post_id + ":1";
                this.latestComment = this.arr['LT_COMM_DATA'];
                this.postTyp = this.arr['TYPE'];
                if (Object.keys(this.latestComment).length != 0) {
                    this.viewCommentList = true;
                } else { this.viewCommentList = false; }
                if (this.comment > 1) {
                    this.commentPresent = true;
                } else { this.commentPresent = false; }
                this.setInterestArr()

                if (this.arr['TEXT']) {
                    this.post_data = this.postdata.decodeURIPostData(this.arr['TEXT']);
                    this.post_data = this.postdata.linkActivate(this.post_data);
                }

                if (this.post_data.length > 301) {
                    this.DataView = !this.DataView;
                    this.seeLess = 0;
                }
                //        this.getReachPost();
            }
        } else {
            this.setInterestArr()
            if (this.arr.IS_ADMIN == 0) {
                this.my_profile = false;
            } else {
                this.my_profile = true;
            }
            this.full_name = this.arr.USER_FULL_NAME;
            if (this.arr.PAGE_UUID && this.arr.PAGE_UUID != '') {
                this.isPagePost = true;
            }
            if (this.isPagePost) {
                this.user_name = this.arr.PAGE_NAME;
                this.profile_pic_path = this.arr.PAGE_PROFILE_PHOTO_PATH + 'profile/' + this.arr.PAGE_UUID + '_60x60.png?v=' + this.arr.UPDATE_DATE_TIME;
                if (!this.arr.PAGE_PROFILE_PHOTO_PATH) {
                    this.profile_pic_path = this._constantService.defaultPageIndImgPath;
                }
                this.pg_id = this.arr.PAGE_UUID;
            } else {
                this.profile_pic_path = this.arr.PROFILE_PHOTO_PATH + 'profile/' + this.arr.USER_ID + '_60x60.png?v=' + this.arr.UPDATE_DATE_TIME;
                if (!this.arr.PROFILE_PHOTO_PATH) {
                    this.profile_pic_path = this._constantService.defaultImgPathForSuggestedConnections;
                }
                this.user_name = this.arr.USER_NAME;
            }
            this.time = this.arr.ADD_DATE_TIME;
            this.setInterestObj();
            if (this.arr['TEXT']) {
                this.post_data = this.postdata.decodeURIPostData(this.arr['TEXT']);
                this.post_data = this.postdata.linkActivate(this.post_data);
            }

            if (this.post_data.length > 301) {
                this.DataView = !this.DataView;
                this.seeLess = 0;
            }
        }
        this.setHeaderData();
        this.setFooterData();
    }

    setHeaderData() {
        var headerData = {
            isPagePost: this.isPagePost,
            user_name: this.user_name,
            profile_pic_path: this.profile_pic_path,
            pg_id: this.pg_id,
            my_profile: this.my_profile,
            full_name: this.full_name,
            time: this.time,
            postmenu: this.postmenu,
            arr: JSON.parse(JSON.stringify(this.arr)),
            hideBtn: this.hideBtn,
            followme: this.followme,
            saveCondition: this.saveCondition,
            savedFolderId: this.savedFolderId,
            inSharedPost: this.inSharedPost,
            inSharedScreen: this.inSharedScreen,
            post_id: this.post_id,
            u_id: this.u_id

        }
        this.headerData = headerData;
    }

    setFooterData() {
        var footerData = {
            importantCondition: this.importantCondition,
            like: this.like,
            impLikeShareStatus: this.impLikeShareStatus,
            userLikeShareList: this.userLikeShareList,
            post_id: this.post_id,
            arr: JSON.parse(JSON.stringify(this.arr)),
            comment: this.comment,
            share: this.share,
            shareLikeShareStatus: this.shareLikeShareStatus,
            isSharePostList: this.isSharePostList,
            u_id: this.u_id,
            socialFbShareUrl: this.socialFbShareUrl,
            socialTelegramUrl: this.socialTelegramUrl,
            socialWhatsappLink: this.socialWhatsappLink,
            full_name: this.full_name,
            commentPlaceHolder: this._constantService.commentPlaceHolder,
            altName: this.altName,
            image_upload_url: this.image_upload_url,
            commentPresent: this.commentPresent,
            inSharedPost: this.inSharedPost

        }
        this.footerData = footerData;
    }



    closePopup(event) {
        if (event['error'] == false) {
            this.openConfirmation = false;
        }
    }

    textPostEditClose(event) {
        this.edittextpost = event;
        this.popCancel.emit(true);
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }


    overflowStatus: boolean;
    textpostviewsec: boolean = false;
    popupOverPopupStatus: boolean;




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
                this._router.navigate(['500']);
            }
        });
    }



    removePost(event) {
        if (event) {
            this._ref.destroy();
            this._constantService.callEmptyStateMethod();
        }
        this.reportpopup = false;
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }



    sharetextpostviewsec: boolean = false;



    CloseDeleteConfirm(event) {
        if (event['delPostStatus']) {
            this.ConfirmDelete = event['closePopUpStatus'];
            if (event['delPostStatus']) {
                this._ref.destroy();
            }
            var herf = this._router.url;
            var urlArr = herf.split("/");
            if (urlArr[1] === "post") {
                this._router.navigate(['home']);
            }
            let body = document.getElementsByTagName('body')[0];
            body.classList.remove("body-overflow");
        } else if (event['error_msg']) {
            this.ConfirmDelete = event['closePopUpStatus'];
            let body = document.getElementsByTagName('body')[0];
            body.classList.remove("body-overflow");
            this.dataConf['type'] = 2;
            this.dataConf['msg'] = "STUDY24X7";
            this.dataConf['error_msg'] = event.error_msg;
            this.openConfirmation = true;
        } else {
            this.ConfirmDelete = false;
            this.openConfirmation = false;
            let body = document.getElementsByTagName('body')[0];
            body.classList.remove("body-overflow");

        }
    }


    setInterestArr() {
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

        // getReachPost() {
    //     var postReach = {};
    //     postReach['token'] = this._constantService.getSessionDataBYKey('token');
    //     postReach['token_param'] = {};
    //     postReach['token_param']['device_type'] = 'w';
    //     postReach['token_param']['host'] = '';
    //     postReach['pid'] = this.post_id;


    //     this._constantService.fetchDataApi(this._constantService.getpostReachUrl(), postReach).subscribe(data => {
    //         var responseData: any = data;
    //         var status = responseData.STATUS;
    //         if (status == this._constantService.success_msg) {

    //         } else if (status == this._constantService.error_token) {
    //             this.dataConf['type'] = 4;
    //             this.dataConf['msg'] = "Session Expire";
    //             this.dataConf['error_msg'] = "Session Expired";
    //             this.openConfirmation = true;
    //         } else {
    //             this.dataConf['type'] = 2;
    //             this.dataConf['msg'] = "STUDY24X7";
    //             this.dataConf['error_msg'] = responseData.ERROR_MSG;
    //             this.openConfirmation = true;
    //         }
    //     }, error => {
    //         var responseData = error;
    //         if (responseData.status == 500) {
    //             this._router.navigate(['500']);
    //         }
    //     });
    // }

    // putUserPostUnsaved() {
    //     var updatePostUnsaved = {};
    //     updatePostUnsaved['token'] = this._constantService.getSessionDataBYKey('token');
    //     updatePostUnsaved['token_param'] = {};
    //     updatePostUnsaved['token_param']['device_type'] = 'w';
    //     updatePostUnsaved['token_param']['host'] = '';
    //     updatePostUnsaved['sfldid'] = this.savedFolderId;
    //     updatePostUnsaved['pid'] = this.post_id;


    //     this._constantService.fetchDataApi(this._constantService.putUserPostUnsaved(), updatePostUnsaved).subscribe(data => {
    //         var responseData: any = data;
    //         var status = responseData.STATUS;
    //         if (status == this._constantService.success_msg) {
    //             this._constantService.showToast("Unsaved successfully", "Post", "1");

    //             this.saveCondition = false;
    //             var herf = this._router.url;
    //             var urlArr = herf.split("/");
    //             if (urlArr[1] == "saved") {
    //                 setTimeout(() => {
    //                     var count = (document.getElementById(this.savedFolderId + "_count"));
    //                     if (count != null) {
    //                         if (parseInt(count.innerHTML) == 1) {
    //                             count.style.display = 'none';
    //                             count.innerHTML = (parseInt(count.innerHTML) - 1).toString();
    //                         } else {
    //                             count.innerHTML = (parseInt(count.innerHTML) - 1).toString();
    //                         }
    //                     }
    //                 }, 100)
    //                 this._ref.destroy();
    //             }
    //             this._constantService.callEmptyStateMethod();
    //         } else if (status == this._constantService.error_token) {
    //             this.dataConf['type'] = 4;
    //             this.dataConf['msg'] = "Session Expire";
    //             this.dataConf['error_msg'] = "Session Expired";
    //             this.openConfirmation = true;
    //         } else {
    //             this.dataConf['type'] = 2;
    //             this.dataConf['msg'] = "STUDY24X7";
    //             this.dataConf['error_msg'] = responseData.ERROR_MSG;
    //             this.openConfirmation = true;
    //         }
    //     }, error => {
    //         var responseData = error;
    //         if (responseData.status == 500) {
    //             this._router.navigate(['500']);
    //         }
    //     });

    // }

    // textpostviewhide(a) {
    //     this.textpostviewsec = a;
    //     this.overflowStatus = a;
    //     let body = document.getElementsByTagName('body')[0];
    //     body.classList.remove("body-overflow");

    // }

    // updateSourcePic(event) {
    //     event.target.src = this._constantService.defaultImgPath;
    // }
        // sharePostview() {
    //     this.arr['EDIT_POST'] = false;
    //     this.sharetextpostviewsec = true;
    //     let body = document.getElementsByTagName('body')[0];
    //     body.classList.add("body-overflow");
    // }

    // sharetextpostparenthide(stextpara) {
    //     let body = document.getElementsByTagName('body')[0];
    //     body.classList.remove("body-overflow");
    //     this.sharetextpostviewsec = false;
    //     if (stextpara) {
    //         this.share += 1;
    //     }
    // }

    // DeletePostCnf() {
    //     this.ConfirmDelete = true;
    //     this.dataConf['msg'] = "Post Deletion"
    //     this.dataConf['error_msg'] = "Are you sure about deleting this feed post?";
    //     this.dataConf['type'] = 1;
    //     this.dataConf['pid'] = this.post_id;
    //     this.dataConf['ptyp'] = 1;
    //     //        setTimeout(() => {
    //     //            var count = (document.getElementById(this.savedFolderId + "_count"));
    //     //            if (count != null) {
    //     //                if (parseInt(count.innerHTML) == 1) {
    //     //                    count.style.display = 'none';
    //     //                    count.innerHTML = (parseInt(count.innerHTML) - 1).toString();
    //     //                } else {
    //     //                    count.innerHTML = (parseInt(count.innerHTML) - 1).toString();
    //     //                }
    //     //            }
    //     //        }, 100)
    //     let body = document.getElementsByTagName('body')[0];
    //     body.classList.add("body-overflow");
    // }

    // impLikeShareFn() {
    //     this.userLikeShareList['postId'] = this.post_id;
    //     this.userLikeShareList['type'] = 1;
    //     this.userLikeShareList['count'] = this.like;
    //     this.impLikeShareStatus = !this.impLikeShareStatus;
    //     let body = document.getElementsByTagName('body')[0];
    //     body.classList.add("body-overflow");
    // }
    // shareLikeShareFn() {
    //     this.userLikeShareList['postId'] = this.post_id;
    //     this.userLikeShareList['type'] = 2;
    //     this.userLikeShareList['count'] = this.share;
    //     this.shareLikeShareStatus = !this.shareLikeShareStatus;
    //     let body = document.getElementsByTagName('body')[0];
    //     body.classList.add("body-overflow");
    // }
    // CloseViewAll($event) {
    //     this.impLikeShareStatus = false;
    //     this.shareLikeShareStatus = false;
    //     let body = document.getElementsByTagName('body')[0];
    //     body.classList.remove("body-overflow");
    // }

    // goToPost(event) {
    //     this._router.navigate(['post/' + this.arr.USER_POST_ID]);
    // }

    // autoFocus() {
    //     var id = this.u_id + '_' + this.post_id + '_comm';
    //     if ((<HTMLInputElement>document.getElementById(id)).innerText == this._constantService.commentPlaceHolder) {
    //         (<HTMLInputElement>document.getElementById(id)).innerText = '';
    //     }
    //     (<HTMLInputElement>document.getElementById(id)).focus();
    // }

    // updateProfilePic(event) {
    //     if (this.profile_pic_path == null) {
    //         event.target.src = this._constantService.defaultImgPath;
    //     }
    // }
    // showNotify() {
    //     this._constantService.showToast("Link has been Copied", "", "1");

    // }


    // hideEditPost(hide) {
    //     this.show = hide;
    // }

    // showquesedit() {
    //     if (this.editquestionpost === false) {
    //         this.editquestionpost = true;
    //     }
    //     else {
    //         this.editquestionpost = false;
    //     }
    // }

    // closequestionpostedit(queseditclose) {
    //     this.editquestionpost = queseditclose;
    // }

    //    hidePlaceHolder(event    ) {
    //        //event.preventDefault    ();
    //        //this.hideSpan =     2;
    //        document.getElementById(event.target.id).focus    ();
    //        if (event.target.innerText == this._constantService.commentPlaceHolder    ) {
    //            event.target.innerText =     "";
    //            var v = document.getElementById(event.target.i    d);
    //            v.classList.remove("placeholdercolor    ");
    //            v.classList.add("option_inputt setwdth    ");
    //            var sel, ran    ge;
    //            if (window.getSelection    ) {
    //                // IE9 and non    -IE
    //                sel = window.getSelection    ();
    //                if (sel.getRangeAt && sel.rangeCount    ) {
    //                    range = sel.getRangeAt(    0);
    //                    range.deleteContents    ();
    //
    //                    // Range.createContextualFragment() would be useful here but     is
    //                    // non-standard and not supported in all browsers (IE9, for o    ne)
    //                    var el = document.createElement("div    ");
    //                    el.innerHTML =     "";
    //                    var frag = document.createDocumentFragment(), node, lastNo    de;
    //                    while ((node = el.firstChild)    ) {
    //                        lastNode = frag.appendChild(nod    e);
    //                        }
    //
    //                    range.insertNode(fra    g);
    //
    //                    // Preserve the select    ion
    //                    if (lastNode    ) {
    //                        range = range.cloneRange    ();
    //                        range.setStartAfter(lastNod    e);
    //                        range.collapse(tru    e);
    //                        sel.removeAllRanges    ();
    //                        sel.addRange(rang    e);
    //                        }
    //                    }
    //
    //
    //                }
    //
    //            //event.stopPropagation    ();
    //            }
    //
    //        this.hideSpan =     2;
    //    }

    // hidePlaceHolder(event) {
    //     if (event.target.innerText == this._constantService.commentPlaceHolder) {
    //         event.target.innerText = "";
    //         var v = document.getElementById(event.target.id);
    //         v.classList.remove("placeholdercolor");
    //         v.classList.add("option_inputt", "setwdth");
    //         this.isCommentHit = false;
    //     }
    //     document.getElementById(event.target.id).focus();
    // }

    // showPlaceHolder() {
    //     var id = this.u_id + "_" + this.post_id + "_comm";
    //     var txt = document.getElementById(id);
    //     txt.innerHTML = txt.innerHTML.replace(this._constantService.junkText, "");
    //     if (txt.innerText.length == 0 || txt.innerText.length == 1) {
    //         txt.classList.add("placeholdercolor");
    //         txt.classList.remove("option_inputt", "setwdth");
    //         txt.innerText = this._constantService.commentPlaceHolder;
    //     }
    // }

    // change_Commentimage(event) {
    //     (<HTMLInputElement>document.getElementById(event.target.id.split("_")[1] + "_" + event.target.id.split("_")[2] + "_" + "nci")).click();
    // }

    // addImageFile(event: any) {
    //     this.comment_image = event.target.files[0];
    //     let type = this.comment_image.name;
    //     var reader = new FileReader();
    //     var typearr = type.split(".");
    //     this.showPreloader = true;
    //     var size = Math.round(this.comment_image.size / 1000 / 1000);
    //     if (size <= 10) {
    //         if (typearr[1] == 'jpg' || typearr[1] == 'jpeg' || typearr[1] == 'JPG' || typearr[1] == 'JPEG' || typearr[1] == 'png' || typearr[1] == 'PNG') {
    //             this.showCommentImg = 2;
    //             reader.onload = (event: any) => {
    //                 this.image_upload_url = event.target.result;
    //             }
    //             reader.readAsDataURL(event.target.files[0]);
    //             var upload = {};
    //             upload['token'] = this._constantService.getSessionDataBYKey('token');
    //             upload['token_param'] = {};
    //             upload['token_param']['device_type'] = "w";
    //             upload['token_param']['host'] = "";
    //             var data = JSON.stringify(upload);
    //             var encData = this._encryptionServices.encrypt(data);
    //             let formData = new FormData();
    //             formData.append("file", this.comment_image);
    //             formData.append("pattchid", '0');
    //             formData.append("token", encData);
    //             formData.append("type", "4");

    //             this._constantService.uploadFileApi(this._constantService.getUploadFileServiceUrl(), formData).subscribe(data => {
    //                 var responseData: any = data;
    //                 var status = responseData.STATUS;
    //                 if (status == this._constantService.success_msg) {
    //                     this.autoFocus();
    //                     this.showPreloader = false;
    //                     this.commImageDimns = responseData.DIMENSION;
    //                     this.file_path = responseData.FPATH;
    //                     this.uuid = responseData.UUID;
    //                     //this._constantService.setToken(responseData.TOKEN);
    //                     this._constantService.setSessionJsonPair('token', responseData.TOKEN);
    //                 } else if (status == this._constantService.error_token) {
    //                     this.dataConf['type'] = 4;
    //                     this.dataConf['msg'] = "Session Expire";
    //                     this.dataConf['error_msg'] = "Session Expired";
    //                     this.openConfirmation = true;
    //                 } else {
    //                     this.showCommentImg = 1;
    //                     this.comment_image = null;
    //                 }
    //             }, error => {
    //                 var responseData = error;
    //                 if (responseData.status == 500) {
    //                     this._router.navigate(['500']);
    //                 }
    //             });
    //         } else {
    //             this.dataConf['type'] = 2;
    //             this.dataConf['msg'] = "STUDY24X7";
    //             this.dataConf['error_msg'] = "Unable to support the selected file";
    //             this.openConfirmation = true;
    //             this.showCommentImg = 1;
    //             this.comment_image = null;
    //         }
    //     } else {
    //         this.dataConf['msg'] = "STUDY24X7";
    //         this.dataConf['type'] = 2;
    //         this.dataConf['error_msg'] = "File above 10mb is not allowed";
    //         this.openConfirmation = true;
    //         this.showCommentImg = 1;
    //         this.comment_image = null;
    //     }

    // }

    // confirmText(value, event) {

    //     event.preventDefault();
    //     event.stopPropagation();


    // }

    //    @HostListener('drop', ['$event']) blockDrop(e: MouseEvent) {
    //        e.preventDefault();
    //    }

    // addComment(event) {
    //     if (event.keyCode == 13 && event.shiftKey) {
    //         let val = document.getElementById(this.u_id + "_" + this.post_id + "_comm").innerHTML;
    //         val = val + "<br>";
    //         document.getElementById(this.u_id + "_" + this.post_id + "_comm").innerHTML = val;
    //         document.getElementById(this.u_id + "_" + this.post_id + "_comm").focus();
    //     } else if (event.keyCode == 13 && !event.ctrlKey && !event.shiftKey) {
    //         if (this.isCommentHit) {
    //             return false;
    //         } else {
    //             this.isCommentHit = true;
    //         }
    //         if (event.keyCode == 13 && !event.ctrlKey && !event.shiftKey) {
    //             this.c_data = this.postdata.postDataManipulation(event.target.id);
    //             //this.c_data = this.postdata.removeUnwantedContent(this.c_data);
    //             if (this.c_data.length == 0 && this.comment_image == null) {
    //                 event.preventDefault();
    //                 return false;
    //             }
    //         }

    //         this.hideSpan = 0;
    //         this.viewCommentList = true;
    //         var id = event.target.id;
    //         var comment = {};
    //         comment['token'] = this._constantService.getSessionDataBYKey('token');
    //         comment['token_param'] = {};
    //         comment['token_param']['device_type'] = 'w';
    //         comment['token_param']['host'] = '';
    //         comment['pid'] = this.post_id;
    //         comment['cmda'] = this.postdata.encodeURIPostData(this.c_data);
    //         comment['cmid'] = "0";

    //         if (this.comment_image != null) {
    //             comment['fpath'] = this.file_path;
    //             comment['uuid'] = this.uuid;
    //             comment['dimns'] = this.commImageDimns;
    //         } else {
    //             comment['fpath'] = "";
    //             comment['uuid'] = "";
    //         }


    //         if (this.isCommentHit == true) {
    //             this._constantService.fetchDataApi(this._constantService.putCommentServiceUrl(), comment).subscribe(data => {
    //                 var responseData: any = data;
    //                 var status = responseData.STATUS;
    //                 if (status == this._constantService.success_msg) {

    //                     this.showCommentImg = 1;
    //                     this.comment_image = null;
    //                     this.hideSpan = 1;
    //                     var addComment = {};
    //                     var date = new Date();
    //                     addComment['COMMENT_BY'] = this._constantService.getSessionDataBYKey('u_id');
    //                     addComment['IMAGE_PATH'] = this.file_path;
    //                     addComment['PARENT_ID'] = null;
    //                     addComment['PROFILE_PHOTO_PATH'] = this._constantService.getSessionDataBYKey('profile_pic_s3');
    //                     addComment['TEXT'] = this.c_data;
    //                     addComment['USER_COMMENT_ID'] = responseData.COMID;
    //                     addComment['USER_FULL_NAME'] = this._constantService.getSessionDataBYKey('full_name');
    //                     addComment['USER_NAME'] = this._constantService.getSessionDataBYKey('username');
    //                     addComment['USER_POST_ID'] = this.post_id;
    //                     addComment['UNIQUE_COMMENT_ATTACHMENT_ID'] = this.uuid;
    //                     addComment['ADD_DATE_TIME'] = this.postdata.getPostDateTime(date.getTime());
    //                     var count = (<HTMLElement>document.getElementById(this.post_id + '_comm_count'));
    //                     if (count != null) {
    //                         if (parseInt(count.innerHTML) == 0) {
    //                             count.style.display = "inline-block";
    //                         }
    //                         count.innerHTML = (parseInt(count.innerHTML) + 1).toString();
    //                     } else {
    //                         this.comment = 1;
    //                     }
    //                     //this._constantService.setCommentData(addComment);
    //                     this.factory = this.componentFactoryResolver.resolveComponentFactory(CommentComponent);
    //                     this.ref = this.container.createComponent(this.factory, 0);
    //                     this.ref.instance.arr = addComment;
    //                     this.ref.instance.parentRef = this._ref;
    //                     this.ref.instance._ref = this.ref;
    //                     event.target.innerHTML = this._constantService.commentPlaceHolder;
    //                     event.target.classList.add("placeholdercolor");
    //                     event.target.classList.remove("option_inputt", "setwdth");
    //                     this.hideSpan = 1;
    //                     this.uuid = "";
    //                     this.file_path = "";
    //                     window.getSelection().removeAllRanges();
    //                     this.isCommentHit = true;
    //                 } else if (status == this._constantService.error_token) {
    //                     this.dataConf['type'] = 4;
    //                     this.dataConf['msg'] = "Session Expire";
    //                     this.dataConf['error_msg'] = "Session Expired";
    //                     this.openConfirmation = true;
    //                 } else {
    //                     this.dataConf['type'] = 2;
    //                     this.dataConf['msg'] = "STUDY24X7";
    //                     this.dataConf['error_msg'] = responseData.ERROR_MSG;
    //                     this.openConfirmation = true;
    //                 }
    //             }, error => {
    //                 var responseData = error;
    //                 if (responseData.status == 500) {
    //                     this._router.navigate(['500']);
    //                 }
    //             });
    //         }

    //     }


    // }
      // textpostviewshow() {
    //     if (this.count < 1) {
    //         this.count += 1;
    //         this.getComment();
    //     } else {
    //         this.popupOverPopupStatus = true;
    //         this.textpostviewsec = true;
    //         this.overflowStatus = true;
    //         let body = document.getElementsByTagName('body')[0];
    //         body.classList.add("body-overflow");

    //     }

    // }

      // hideSocialList() {
    //     let id = this.u_id + '_' + this.post_id + '_textShareList';
    //     if (document.getElementById(id)) {
    //         document.getElementById(id).style.display = "none";
    //         document.getElementById(id).style.top = "0px";
    //     }

    //     this.isSharePostList = false;
    // }

    // showSharePostList(event) {
    //     let id = this.u_id + '_' + this.post_id + '_textShareList';
    //     event.preventDefault();
    //     event.stopPropagation();
    //     this.isSharePostList = !this.isSharePostList;

    //     if (event.clientY > 500) {
    //         setTimeout(() => {
    //             if (document.getElementById(id)) {
    //                 document.getElementById(id).style.top = "-105px";
    //                 document.getElementById(id).style.display = "block";
    //             }
    //         }, 100);
    //     }
    //     else {
    //         setTimeout(() => {
    //             if (document.getElementById(id)) {
    //                 document.getElementById(id).style.top = "0px";
    //                 document.getElementById(id).style.display = "block";
    //             }
    //         }, 100);
    //     }


    // }

    // private findInterestPos() {
    //     if (this.showIntArr == true) {
    //         var innerWidthFull = window.innerWidth;
    //         var interestPosLeft = document.getElementById(this.post_id + '_interestpos').offsetLeft;
    //         var interestPosRight = innerWidthFull - interestPosLeft;
    //         if (window.innerWidth < 600) {
    //             if (interestPosRight <= 185) {
    //                 document.getElementById(this.post_id + "_shftToLeft").style.left = "-148px";
    //                 document.getElementById(this.post_id + "_shiftArrowLeft").style.left = "155px";
    //             } else {
    //                 document.getElementById(this.post_id + "_shftToLeft").style.left = "-9px";
    //                 document.getElementById(this.post_id + "_shiftArrowLeft").style.left = "15px";
    //             }
    //         }
    //     }
    // }
    // ngAfterViewChecked(){
    //   this.findInterestPos();
    // }

    // follow() {
    //     if (this.followme == false) {
    //         this._constantService.followUnfollow(0, this.pg_uuid);
    //         this.followme = !this.followme;
    //         setTimeout(() => {
    //             this.hideBtn = true;
    //         }, 5000);
    //     }
    // }

    // unfollow() {
    //     if (this.followme == true) {
    //         this._constantService.followUnfollow(1, this.pg_uuid);
    //         this.followme = !this.followme;
    //         this.hideBtn = false;
    //     }
    // }
    // reportpopuphidetag() {
    //     this.showinterestTag = !this.showinterestTag;
    // }


    // handleClick(event) {
    //     if (this.arr['POST_VIEW_SEARCH'] == 1) {

    //     } else {
    //         this.isSharePostList = false;
    //         var clickedComponent = event.target;
    //         var openPopUp = 0;
    //         var showCommentPlaceHolder = 0;
    //         do {
    //             if (this.reportPopup && clickedComponent === this.reportPopup.nativeElement) {
    //                 openPopUp = 1;
    //             }
    //             if (this.commentPlaceHolder && clickedComponent === this.commentPlaceHolder.nativeElement) {
    //                 showCommentPlaceHolder = 1;
    //             }
    //             clickedComponent = clickedComponent.parentNode;
    //         } while (clickedComponent);
    //         if (openPopUp != 1) {
    //             this.postmenu = false;
    //         }
    //         //        if (showCommentPlaceHolder !=1){
    //         //            var id = this.u_id + "_" + this.post_id+"_comm";
    //         //            var txt =document.getElementById(id);
    //         //            if(txt.innerText == ""){
    //         //                txt.innerText = this._constantService.commentPlaceHolder;
    //         //            }
    //         //        }
    //     }
    // }

    // imonclick = false;
    // postdropdown() {
    //     this.postmenu = !this.postmenu;
    //     this.imonclick = true;
    // }

    // savedpost() {
    //     if (this.saveCondition == false) {
    //         this.savepagepopup = !this.savepagepopup;
    //         let body = document.getElementsByTagName('body')[0];
    //         body.classList.add("body-overflow");
    //     } else {
    //         this.putUserPostUnsaved();
    //     }
    // }

    // important() {
    //     if (this.vart == true) {
    //         this.vart = false;

    //         var importData = {};
    //         importData['token'] = this._constantService.getSessionDataBYKey('token');
    //         importData['token_param'] = {};
    //         importData['token_param']['device_type'] = 'w';
    //         importData['token_param']['host'] = '';
    //         importData['pid'] = this.post_id;
    //         if (this.importantCondition) {
    //             importData['status'] = 1;
    //         } else {
    //             importData['status'] = 0;
    //         }
    //         //importData['like_count'] = this.like;



    //         this._constantService.fetchDataApi(this._constantService.putUserPostImportantServiceUrl(), importData).subscribe(data => {
    //             var responseData: any = data;
    //             var status = responseData.STATUS;
    //             if (status == this._constantService.success_msg) {
    //                 this.vart = true;
    //                 this.importantCondition = !this.importantCondition;
    //                 if (this.importantCondition) {
    //                     this.like++;
    //                 } else {
    //                     this.like--;
    //                 }
    //             } else if (status == this._constantService.error_token) {
    //                 this.vart = true;
    //                 this.dataConf['type'] = 4;
    //                 this.dataConf['msg'] = "Session Expire";
    //                 this.dataConf['error_msg'] = "Session Expired";
    //                 this.openConfirmation = true;
    //             } else {
    //                 this.vart = true;
    //                 this.dataConf['type'] = 2;
    //                 this.dataConf['msg'] = "STUDY24X7";
    //                 this.dataConf['error_msg'] = responseData.ERROR_MSG;
    //                 this.openConfirmation = true;
    //             }
    //         }, error => {
    //             var responseData = error;
    //             if (responseData.status == 500) {
    //                 this._router.navigate(['500']);
    //             }
    //         });
    //     }
    // }

    // reprts() {
    //     this.reportpopup = true;
    //     let body = document.getElementsByTagName('body')[0];
    //     body.classList.add("body-overflow");

    // }
    // reportpopuphide() {
    //     this.reportpopup = false;
    // }
    // likepopup() {
    //     this.likedetailspopup = true;

    // }

    // for textPostEdit


    // editPost() {
    //     this.edittextpost = true;
    //     let body = document.getElementsByTagName('body')[0];
    //     body.classList.add("body-overflow");
    // }

}
