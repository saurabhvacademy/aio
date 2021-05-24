import { Component, ViewChild, OnInit, ComponentFactoryResolver, ViewContainerRef, Input, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import { PostdataService } from './../../../services/postdata.service';
import { ConstantService } from './../../../services/constant.service';
import { Router } from '@angular/router';
import { EncryptionService } from './../../../services/encryption.service';
import { CommentComponent } from "./../commentView/comment.component";
import { ArticleimagesizeService } from './../../../services/articleimagesize.service';
import { LocalDataService } from 'src/app/services/local-data.service';
@Component({
    selector: 'app-sharedlinkpost',
    // host: {
    //     '(document:click)': 'handleClick($event)',
    // },
    templateUrl: './sharedlinkpost.component.html',
    styleUrls: ['./sharedlinkpost.component.scss', './../sharetextpostview/sharetextpostview.component.scss', './../textpost/allpost.css', './../linkpost/linkpost.component.scss']
})
export class SharedlinkpostComponent implements OnInit {
    postPublicShareLink: string;
    isCommentHit: boolean = false;
    commImageDimns = '';
    pg_id: any;
    shared_u_id: any;
    showIntArr: boolean = false;
    ltIntShow = [];
    c_data: any;
    @ViewChild('container', { read: ViewContainerRef }) container;
    @ViewChild('postright', { read: ElementRef }) postright: ElementRef;
    @ViewChild('aritcleImage', { read: ElementRef }) aritcleImage: ElementRef;
    _ref: any;
    vart: boolean = true;
    postmenu = false;
    saveCondition = false;
    importantCondition = false;
    savepagepopup = false;
    reportpopup = false;
    full_name: string;
    image_path: string;
    time: string = '';
    sharedPostTime: string = "";
    link: string;
    post_data: string = "";
    link_title: string = "";
    link_description: string = "";
    profile_pic_path: string = "";
    user_name: string = "";
    comment = 0;
    like = 0;
    share = 0;
    arr: any;
    tagsArr = [];
    my_profile: boolean = false;
    other_profile: boolean = false;
    comment_image;
    showCommentImg = 1;
    image_upload_url = "";
    hideSpan = 1;
    u_id;
    post_id;
    editquestionpost = false;
    editPostId;
    show: boolean = false;
    DataView: boolean = false;
    seeLess: boolean = false;
    DataViewShared: boolean = false;
    seeLessShared: boolean = false;
    savedFolderId;
    factory;
    ref;
    lastCommentId = 0;
    count = 0;
    commentPresent: boolean = false;
    latestComment;
    postTyp;
    sharedPostUser_fullName;
    sharedPostUser_UserName;
    sharedPostUser_ProfilePicPath;
    sharedPost_data;
    sharedPost_time;
    sharedPostId;
    sharedFrom;
    sharedPostType;
    edittextpost: boolean = false;
    file_path = "";
    uuid = "";
    interestObj = {};
    ConfirmDelete: boolean = false;
    dataConf = {};
    showPreloader: boolean = false;
    sharescreenlinksec: boolean = false;
    editSharedPost: boolean = false;
    viewCommentList: boolean = false;
    impLikeShareStatus = false;
    shareLikeShareStatus = false;
    userLikeShareList = {};
    date = new Date();
    isPagePost: boolean = false;
    pg_uuid = "";
    sharededitPostId;
    openConfirmation: boolean = false;
    title = '';
    followme: boolean = false;
    hideBtn: boolean = false;
    altName = "";

    socialFbShareUrl: string;
    socialTeitterShareUrl: string;
    socialLinkedInShareUrl: string;
    socialTelegramUrl: string;
    socialWhatsappLink: string;

    isSharePostList: boolean = false;
    innerPostTyp = 0;
    setArticleClass = 0;
    postPublicShareLinkCopy: string;
    userProfilePic: any;

    constructor(
        public post: PostdataService,
        public _constantService: ConstantService,
        public _encryptionServices: EncryptionService,
        public _router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        public _getArticleImage: ArticleimagesizeService,
        public _localDataService:LocalDataService
    ) {
        //this.arr = this.post.getPostData();
        if (this.arr != null) {

        }
    }

    hideSocialList() {
        let id = this.u_id + '_' + this.post_id + '_sharelinkhareList';
        if (document.getElementById(id)) {
            document.getElementById(id).style.display = "none";
            document.getElementById(id).style.top = "0px";
        }

        this.isSharePostList = false;
    }

    showSharePostList(event) {
        let id = this.u_id + '_' + this.post_id + '_sharelinkhareList';
        event.preventDefault();
        event.stopPropagation();
        this.isSharePostList = !this.isSharePostList;

        if (event.clientY > 500) {
            setTimeout(() => {
                if (document.getElementById(id)) {
                    document.getElementById(id).style.top = "-105px";
                    document.getElementById(id).style.display = "block";
                }
            }, 100);
        }
        else {
            setTimeout(() => {
                if (document.getElementById(id)) {
                    document.getElementById(id).style.top = "0px";
                    document.getElementById(id).style.display = "block";
                }
            }, 100);
        }


    }


    follow() {
        if (this.followme == false) {
            this._constantService.followUnfollow(0, this.pg_uuid);
            this.followme = !this.followme;
            setTimeout(() => {
                this.hideBtn = true;
            }, 5000);
        }
    }


    unfollow() {
        if (this.followme == true) {
            this._constantService.followUnfollow(1, this.pg_uuid);
            this.followme = !this.followme;
            this.hideBtn = false;
        }
    }



    handleClick(event) {
        this.isSharePostList = false;
        var clickedComponent = event.target;
        var inside = false;
        do {
            if (clickedComponent === this.postright.nativeElement) {
                inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (inside) {


        } else {
            this.postmenu = false;

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
        // if(this.arr.MY_PROFILE){
        this.userProfilePic = this._localDataService.getProfilePicUrl();
        // }
        this.postPublicShareLinkCopy = this._constantService.staticPostShareLink + this.arr['USER_POST_ID'];
        this.postPublicShareLink = this._constantService.staticPostShareLink + this.arr['USER_POST_ID'] + '/' + this.arr['URL'];
        this.socialFbShareUrl = "https://www.facebook.com/dialog/feed?app_id=" + this._constantService.facebookAppId + "&link=" + this.postPublicShareLink;
        this.socialTeitterShareUrl = "https://twitter.com/intent/tweet?text=''" + "&url=" + this.postPublicShareLink;
        this.socialLinkedInShareUrl = "https://www.linkedin.com/sharing/share-offsite/?url=" + this.postPublicShareLink;
        this.socialTelegramUrl = "https://telegram.me/share/url?url=" + this.postPublicShareLink;
        this.socialWhatsappLink = "https://api.whatsapp.com/send?text=" + this.postPublicShareLink;

        this.setInterestObj();
        if (this.arr['INTERESTS'].length > 4) {
            for (var i = 0; i < 4; i++) {
                this.tagsArr[i] = this.arr['INTERESTS'][i];

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
        this.altName = "aio " + this.arr['KEYWORDS'];
        this.link = this.arr['SHARED_POST_DATA']['SHARE_LINK']
        this.full_name = this.arr['USER_FULL_NAME'];
        this.u_id = this.arr['USER_ID'];
        this.post_id = this.arr['USER_POST_ID'];
        this.time = this.arr['ADD_DATE_TIME'];
        if (this.arr['SHARED_POST_DATA']['SHARE_LINK_TITLE'] != '' && this.arr['SHARED_POST_DATA']['SHARE_LINK_TITLE'] != null) {
            this.link_title = this.post.decodeURIPostData(this.arr['SHARED_POST_DATA']['SHARE_LINK_TITLE']);

        }
        console.log(0);
        console.log(this.link_title);
        console.log(1);
        if (this.arr['SHARED_POST_DATA']['SHARE_LINK_DESCRIPTION'] != '' && this.arr['SHARED_POST_DATA']['SHARE_LINK_DESCRIPTION'] != null) {
            this.link_description = this.post.decodeURIPostData(this.arr['SHARED_POST_DATA']['SHARE_LINK_DESCRIPTION']);
        }
        this.image_path = this.arr['SHARED_POST_DATA']['SHARE_LINK_IMAGE'];
        if (this.image_path == '' && this.image_path == null) {
            this.image_path = '';
        }
        if (this.arr['TEXT']) {
            this.DataView = true;
            this.post_data = this.post.decodeURIPostData(this.arr['TEXT']);
            this.post_data = this.post.linkActivate(this.post_data);
            //            this.post_data = this.post_data.replace(/  /g, " &#160;");
        } else {
            this.post_data = '';
        }

        if (this.post_data.length > 301) {
            this.DataView = !this.DataView;
            this.seeLess = this.DataView;
        }


        //outerPost

        if (this.arr['PROFILE_PHOTO_PATH'] != null && this.arr['PROFILE_PHOTO_PATH'] != '') {
            this.profile_pic_path = this.arr['PROFILE_PHOTO_PATH'] + "profile/" + this.arr['USER_ID'] + "_60x60.png?v=" + this.arr['IMG_UPD_DT'];
        } else {
            this.profile_pic_path = this._constantService.defaultImgPath;
        }
        this.user_name = this.arr['USER_NAME'];
        if (this.arr['SHARED_POST_DATA']['TITLE']) {
            this.title = this.post.decodeURIPostData(this.arr['SHARED_POST_DATA']['TITLE']);
        }

        //outerPostEnd

        this.like = this.arr['LIKED_COUNT'];
        if (this.arr['LIKED'] == 1) {
            this.importantCondition = true;
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
        this.share = parseInt(this.arr['SHARED_COUNT']);
        this.editPostId = this.u_id + ":" + this.post_id + ":4";
        this.latestComment = this.arr['LT_COMM_DATA'];
        this.postTyp = this.arr['TYPE'];
        this.innerPostTyp = this.arr['SHARED_POST_DATA']['LINK_PTYPE'];
        this.sharedPostUser_fullName = this.arr['SHARED_POST_DATA']['USER_FULL_NAME'];

        //parentPost

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
                this.profile_pic_path = this.arr['SHARED_POST_DATA']['PAGE_PROFILE_PHOTO_PATH'] + "profile/" + this.arr['SHARED_POST_DATA']['PAGE_UUID'] + "_60x60.png?v=" + this.arr['SHARED_POST_DATA']['IMG_UPD_DT'];
            } else {
                if (this.arr['SHARED_POST_DATA']['PAGE_TYPE'] == 0) {
                    this.profile_pic_path = this._constantService.defaultPageIndImgPath;
                } else if (this.arr['SHARED_POST_DATA']['PAGE_TYPE'] == 1) {
                    this.profile_pic_path = this._constantService.defaultPageCollgImgPath;
                }
            }
            this.title = this.post.decodeURIPostData(this.arr['SHARED_POST_DATA']['TITLE']);
            this.user_name = this.arr['USER_NAME'];
        } else {
            this.sharedPostUser_UserName = this.arr['SHARED_POST_DATA']['USER_NAME'];
            if (this.arr['SHARED_POST_DATA']['PROFILE_PHOTO_PATH'] != null && this.arr['SHARED_POST_DATA']['PROFILE_PHOTO_PATH'] != '') {
                this.sharedPostUser_ProfilePicPath = this.arr['SHARED_POST_DATA']['PROFILE_PHOTO_PATH'] + "profile/" + this.arr['SHARED_POST_DATA']['USER_ID'] + "_60x60.png?v=" + this.arr['SHARED_POST_DATA']['IMG_UPD_DT'];
            } else {
                this.profile_pic_path = this._constantService.defaultImgPath;
            }
        }

        //parentPostEnd

        if (this.arr['SHARED_POST_DATA']['TEXT'] != '') {
            this.DataViewShared = true;
            this.sharedPost_data = this.post.decodeURIPostData(this.arr['SHARED_POST_DATA']['TEXT']);
            this.sharedPost_data = this.post.linkActivate(this.sharedPost_data);
        }
        if (this.sharedPost_data.length > 200) {
            // this.DataViewShared = !this.DataViewShared;
            this.seeLessShared = this.DataViewShared;

        }
        this.sharedPost_data = this.sharedPost_data.replace(/  /g, " &#160;");
        this.sharedPostTime = this.arr['SHARED_POST_DATA']['ADD_DATE_TIME'];
        this.sharedPostId = this.arr['SHARED_POST_ID'];
        this.shared_u_id = this.arr['SHARED_POST_DATA']['USER_ID'];
        this.sharededitPostId = this.shared_u_id + ":" + this.sharedPostId + ":1";
        this.sharedFrom = this.arr['SHARED_FROM'];
        this.sharedPostType = this.arr['SHARED_POST_DATA']['TYPE'];
        if (Object.keys(this.latestComment).length != 0) {
            this.viewCommentList = true;
        }
        if (this.comment > 1) {
            this.commentPresent = true;
        }
        //        this.getReachPost();
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
    private findInterestPos() {
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
    // ngAfterViewChecked(){
    // this.findInterestPos();
    // }
    ngAfterViewInit() {
        this.findInterestPos();
        if (Object.keys(this.latestComment).length != 0) {
            this.lastCommentId = this.latestComment.USER_COMMENT_ID;
            this.latestComment['ADD_DATE_TIME'] = this.post.getPostDateTime(this.latestComment['ADD_DATE_TIME']);
            //this._constantService.setCommentData(this.latestComment);
            this.factory = this.componentFactoryResolver.resolveComponentFactory(CommentComponent);
            this.ref = this.container.createComponent(this.factory);
            this.ref.instance.arr = this.latestComment;
            this.ref.instance._ref = this.ref;
            if (this.comment > 1 && this._router.url.split('/')[1] == "post") {
                this.getComment();
            }
        }
        setTimeout(() => {
            this.findArticleImageSize();
        }, 1000);
    }
    findArticleImageSize() {

        let aritcleImageParentNodeWidth = this.aritcleImage.nativeElement.parentNode.clientWidth;
        let aritcleImageParentNodeHeight = this.aritcleImage.nativeElement.parentNode.clientHeight;
        let articleImageWidth = this.aritcleImage.nativeElement.naturalWidth;
        let articleImageHeight = this.aritcleImage.nativeElement.naturalHeight;
        this.setArticleClass = this._getArticleImage.findArticleImageService(aritcleImageParentNodeWidth, aritcleImageParentNodeHeight, articleImageWidth, articleImageHeight);

    }
    getImgUrl(index) {
        var imgUrl = "url('" + index + "')";
        return imgUrl;

    }
    gotourl(url) {
        if (!/^http[s]?:\/\//.test(url)) {
            url = 'http://' + url;
        }
        window.open(url, "_blank");
    }

    postdropdown() {
        this.postmenu = !this.postmenu;
    }

    savedpost() {
        if (this.saveCondition == false) {
            this.savepagepopup = !this.savepagepopup;
            let body = document.getElementsByTagName('body')[0];
            body.classList.add("body-overflow");
        } else {
            this.putUserPostUnsaved();
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



            this._constantService.fetchDataApi(this._constantService.putUserPostImportantServiceUrl(),importData).subscribe(data => {
                var responseData:any = data;
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
                    this._router.navigate(['500']);
                }
            });
        }
    }


    updateProfilePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }


    reprts() {
        this.reportpopup = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }
    reportpopuphide() {
        this.reportpopup = false;
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

    showPlaceHolder() {
        var id = this.u_id + "_" + this.post_id + "_comm";
        var txt = document.getElementById(id);
        txt.innerHTML = txt.innerHTML.replace(this._constantService.junkText, "");
        if (txt.innerText.length == 0 || txt.innerText.length == 1) {
            txt.classList.add("placeholdercolor");
            txt.classList.remove("option_inputt", "setwdth");
            txt.innerText = this._constantService.commentPlaceHolder;
        }
    }

    change_Commentimage(event) {
        (<HTMLInputElement>document.getElementById(event.target.id.split("_")[1] + "_" + event.target.id.split("_")[2] + "_" + "nci")).click();
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
                var encData = this._encryptionServices.encrypt(data);
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
                        this._router.navigate(['500']);
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

            this.c_data = this.post.postDataManipulation(event.target.id);
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
            comment['cmda'] = this.post.encodeURIPostData(this.c_data);
            comment['cmid'] = 0;
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
                this._constantService.fetchDataApi(this._constantService.putCommentServiceUrl(),comment).subscribe(data => {
                    var responseData:any = data;
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
                        addComment['ADD_DATE_TIME'] = this.post.getPostDateTime(date.getTime());
                        var count = (<HTMLElement>document.getElementById(this.post_id + '_comm_count'));
                        if (count != null) {
                            if (parseInt(count.innerHTML) == 0) {
                                count.style.display = "inline-block";
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
                        event.target.classList.add("placeholdercolor");
                        event.target.classList.remove("option_inputt", "setwdth");
                        this.hideSpan = 1;
                        this.uuid = "";
                        this.file_path = "";
                        window.getSelection().removeAllRanges();
                        this.isCommentHit == true;
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

        } else if (event.getModifierState('Control') && event.keyCode === 13) {
            event.target.innerText = event.target.innerText + "\n";
            var num = Object.keys(event.target.innerText).length;


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
                    responseData.COMMENT_DATA[i].USER_POST_ID = this.post_id;
                    responseData.COMMENT_DATA[i].ADD_DATE_TIME = this.post.getPostDateTime(responseData.COMMENT_DATA[i].ADD_DATE_TIME);
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
                this.dataConf['msg'] = "Session Expire";
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

    putUserPostUnsaved() {
        if (this.vart) {
            this.vart = false;
            var updatePostUnsaved = {};
            updatePostUnsaved['token'] = this._constantService.getSessionDataBYKey('token');
            updatePostUnsaved['token_param'] = {};
            updatePostUnsaved['token_param']['device_type'] = 'w';
            updatePostUnsaved['token_param']['host'] = '';
            updatePostUnsaved['sfldid'] = this.savedFolderId;
            updatePostUnsaved['pid'] = this.post_id;


            this._constantService.fetchDataApi(this._constantService.putUserPostUnsaved(),updatePostUnsaved).subscribe(data => {
                var responseData:any = data;
                var status = responseData.STATUS;
                if (status == this._constantService.success_msg) {
                    this._constantService.showToast("Unsaved successfully", "Post", "1");

                    this.saveCondition = false;
                    this.vart = true;
                    var herf = this._router.url;
                    var urlArr = herf.split("/");
                    if (urlArr[1] == "saved") {
                        var count = document.getElementById(this.savedFolderId + "_count");
                        if (count != null) {
                            if (parseInt(count.innerHTML) == 1) {
                                count.style.display = 'none';
                                count.innerHTML = (parseInt(count.innerHTML) - 1).toString();
                            } else {
                                count.innerHTML = (parseInt(count.innerHTML) - 1).toString();
                            }
                        }
                        this._ref.destroy();
                    }
                    this._constantService.callEmptyStateMethod();
                } else if (status == this._constantService.error_token) {
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
                    this._router.navigate(['500']);
                }
            });
        }
    }
    linkpostviewsec: boolean = false;
    linkpostviewshow() {
        if (this.count < 1) {
            this.count += 1;
            this.getComment();
        } else {
            this.linkpostviewsec = true;
        }
    }

    linkpostviewhide(a) {
        this.linkpostviewsec = a;
    }

    updateSourcePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }



    textPostEditClose(event) {
        this.edittextpost = event;
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");

    }

    closePopup(event) {
        if (event['error'] == false) {
            this.openConfirmation = false;
            let body = document.getElementsByTagName('body')[0];
            body.classList.remove("body-overflow");
        }
    }

    DeletePostCnf() {
        this.ConfirmDelete = true;
        this.dataConf['msg'] = "Post Deletion"
        this.dataConf['error_msg'] = "Are you sure about deleting this feed post?";
        this.dataConf['type'] = 1;
        this.dataConf['pid'] = this.post_id;
        this.dataConf['ptyp'] = 4;
        //        setTimeout(() => {
        //            var count = (document.getElementById(this.savedFolderId + "_count"));
        //            if (count != null) {
        //                if (parseInt(count.innerHTML) == 1) {
        //                    count.style.display = 'none';
        //                    count.innerHTML = (parseInt(count.innerHTML) - 1).toString();
        //                } else {
        //                    count.innerHTML = (parseInt(count.innerHTML) - 1).toString();
        //                }
        //            }
        //        }, 100)
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }

    CloseDeleteConfirm(event) {
        this.ConfirmDelete = event['closePopUpStatus'];
        if (event['delPostStatus']) {
            this._ref.destroy();
        }
    }

    sharelinkPostscreen() {
        this.arr['EDIT_POST'] = false;
        this.sharescreenlinksec = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }

    editPost() {
        this.arr['EDIT_POST'] = true;
        this.editSharedPost = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
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
        this.userLikeShareList['postId'] = this.sharedPostId;
        this.userLikeShareList['type'] = 2;
        this.userLikeShareList['count'] = this.share;
        this.shareLikeShareStatus = !this.shareLikeShareStatus;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }

    CloseViewAll($event) {
        this.impLikeShareStatus = false;
        this.shareLikeShareStatus = false;
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
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

    autoFocus() {
        var id = this.u_id + '_' + this.post_id + '_comm';
        if ((<HTMLInputElement>document.getElementById(id)).innerText == this._constantService.commentPlaceHolder) {
            (<HTMLInputElement>document.getElementById(id)).innerText = '';
        }
        (<HTMLInputElement>document.getElementById(id)).focus();

    }

    sharescreenFunc(event) {
        this.sharescreenlinksec = false;
        if (event) {
            this.share += 1;
        }
    }
    //     @HostListener('drop', ['$event']) blockDrop(e: MouseEvent    ) {
    //        e.preventDefault    ();
    //    }

    getReachPost() {
        var postReach = {};
        postReach['token'] = this._constantService.getSessionDataBYKey('token');
        postReach['token_param'] = {};
        postReach['token_param']['device_type'] = 'w';
        postReach['token_param']['host'] = '';
        postReach['pid'] = this.post_id;


        this._constantService.fetchDataApi(this._constantService.getpostReachUrl(),postReach).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {

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
    showNotify() {
        this._constantService.showToast("Link has been Copied", "", "1");

    }

    linkpostPic() {
        this.image_path = "";
    }

    getUrl(index) {
        if (index) {
            var imgUrl = "url('" + index + "')";
            return imgUrl;
        }
        else {
            this.image_path = "";
            return this.image_path;
        }
    }

}
