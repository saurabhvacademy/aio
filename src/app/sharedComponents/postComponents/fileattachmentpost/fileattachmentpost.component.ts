import { Component, ViewChild, OnInit, ComponentFactoryResolver, ViewContainerRef, Input, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import { ConstantService } from './../../../services/constant.service';
import { Router } from '@angular/router';
import { CapitalizePipe } from './../../../services/capitalize.pipe';
import { EncryptionService } from './../../../services/encryption.service';
import { PostdataService } from './../../../services/postdata.service';
import { CommentComponent } from "./../commentView/comment.component";
import { LocalDataService } from 'src/app/services/local-data.service';

@Component({
    selector: 'app-fileattachmentpost',
    templateUrl: './fileattachmentpost.component.html',
    // host: {"(document:click)": 'handleClick($event)', },
    providers: [PostdataService],
    styleUrls: ['./fileattachmentpost.component.scss', './../textpost/allpost.css']
})
export class FileattachmentpostComponent implements OnInit, AfterViewInit {
    postPublicShareLink: string;
    savedFID: number;
    isCommentHit: boolean = false;
    commImageDimns = '';
    pg_id: any;
    showIntArr: boolean = false;
    ltIntShow = [];
    editquestionpost: boolean = false;
    editfileAttachmntpost: boolean = false;
    @ViewChild('container', { read: ViewContainerRef }) container;
    @ViewChild('reportPopup', { read: ElementRef }) reportPopup: ElementRef;
    sharescreenfilesec: boolean = false;
    _ref: any;
    vart: boolean = true;
    c_data: string = "";
    postmenu = false;
    saveCondition = false;
    importantCondition = false;
    reportpopup = false;
    arr: any;
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
    comment_data = "";
    comment_image;
    showCommentImg = 1;
    image_upload_url = "";
    hideSpan = 1;
    show = false;
    editPostId;
    savepagepopup: boolean = false;
    DataView: boolean = false;
    seeLess: boolean = false;
    savedFolderId;
    latestComment;
    lastCommentId = 0;
    factory;
    ref;
    count = 0;
    commentPresent: boolean = false;
    download_Count = 0;
    postTyp;
    pages;
    file_path = "";
    uuid = "";
    interestObj = {};
    dataConf = {};
    openConfirmation: boolean = false;
    showPreloader: boolean = false;
    imonclick = false;
    viewCommentList: boolean = false;
    impLikeShareStatus = false;
    shareLikeShareStatus = false;
    userLikeShareList = {};
    date = new Date();
    pg_uuid = '';
    isPagePost: boolean = false;
    followme: boolean = false;
    hideBtn: boolean = false;

    socialFbShareUrl: string;
    socialTeitterShareUrl: string;
    socialLinkedInShareUrl: string;
    socialTelegramUrl: string;
    socialWhatsappLink: string;
    isSharePostList: boolean = false;
    userProfilePic: any;
    constructor(
        public postdata: PostdataService,
        public _constantService: ConstantService,
        public _encryptionServices: EncryptionService,
        private componentFactoryResolver: ComponentFactoryResolver,
        public _router: Router,
        public _localDataService: LocalDataService
    ) { }


    hideSocialList() {
        let id = this.u_id + '_' + this.post_id + '_fileShareList';
        if (document.getElementById(id)) {
            document.getElementById(id).style.display = "none";
            document.getElementById(id).style.top = "0px";
        }

        this.isSharePostList = false;
    }

    showSharePostList(event) {
        let id = this.u_id + '_' + this.post_id + '_fileShareList';
        event.preventDefault();
        event.stopPropagation();
        this.isSharePostList = !this.isSharePostList;

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

    closeOptions() {
        this.postmenu = !this.postmenu;
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

        this.postPublicShareLink = this._constantService.staticPostShareLink + this.arr['USER_POST_ID'] + '/' + this.arr['URL'];

        this.socialFbShareUrl = "https://www.facebook.com/dialog/feed?app_id=" + this._constantService.facebookAppId + "&link=" + this.postPublicShareLink;
        this.socialTeitterShareUrl = "https://twitter.com/intent/tweet?text=''" + "&url=" + this.postPublicShareLink;
        this.socialLinkedInShareUrl = "https://www.linkedin.com/sharing/share-offsite/?url=" + this.postPublicShareLink;
        this.socialTelegramUrl = "https://telegram.me/share/url?url=" + this.postPublicShareLink;
        this.socialWhatsappLink = "https://api.whatsapp.com/send?text=" + this.postPublicShareLink;


        this.post_id = this.arr['USER_POST_ID'];
        this.u_id = this.arr['USER_ID'];
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
                if (this.arr['INTERESTS'][i] != undefined && this.arr['INTERESTS'][i] != null && this.arr['INTERESTS'][i] != '') {
                    this.ltIntShow[i] = this.arr['INTERESTS'][i + 4];
                }
            }
        }
        this.full_name = this.arr['USER_FULL_NAME'];
        this.time = this.arr['ADD_DATE_TIME'];
        //        if (this.arr['TEXT']) {
        //            this.post_data = this.postdata.decodeURIPostData(this.arr['TEXT']);
        //            this.post_data = this.post_data.replace(/  /g, " &#160;");
        //        } else {
        //            this.post_data = '';
        //        }
        if (this.arr['TEXT']) {
            this.post_data = this.postdata.decodeURIPostData(this.arr['TEXT']);
            this.post_data = this.post_data.replace(/<br>/, "");
            this.post_data = this.postdata.linkActivate(this.post_data);
        } else {
            this.post_data = '';
        }


        if (this.post_data.length > 301) {
            this.DataView = !this.DataView;
            this.seeLess = this.DataView;
        }
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
            } else {
                this.profile_pic_path = this._constantService.defaultImgPath;
            }
            this.user_name = this.arr['USER_NAME'];
        }
        if (this.arr['CAPTION'] != null) {
            this.file_name = this.arr['CAPTION'];
        }
        if (this.arr['SAVED_POST_FLD_ID'] != 0) {
            this.savedFolderId = this.arr['SAVED_POST_FLD_ID'];
        }
        if (this.arr['SAVED'] == 1) {
            this.saveCondition = true;
        }

        let typearr = this.file_name.split(".");
        this.file_type = typearr[typearr.length - 1];
        this.like = this.arr['LIKED_COUNT'];
        if (this.arr['LIKED'] == 1) {
            this.importantCondition = !this.importantCondition;
        }
        this.pages = this.arr['NUMBERS_OF_PAGES_TO_DWLD'];
        this.path = this.arr['PATH'] + "attach/" + this.arr['USER_POST_ATTACHMENT_UUID'] + "/" + this.arr['USER_POST_ATTACHMENT_UUID'] + "." + this.file_type;
        this.comment = this.arr['COMMENT'];
        this.profile_view = this.arr['PROFILE_VIEW'];
        this.my_profile = this.arr['MY_PROFILE'];
        this.editPostId = this.u_id + ":" + this.post_id + ":2";
        this.share = parseInt(this.arr['SHARED_COUNT']);
        this.latestComment = this.arr['LT_COMM_DATA'];
        this.download_Count = this.arr['FILE_DWLD_COUNT'];
        this.postTyp = this.arr['TYPE'];
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


    ngAfterViewInit() {
        this.findInterestPos();
        if (Object.keys(this.latestComment).length != 0) {
            this.lastCommentId = this.latestComment.USER_COMMENT_ID;
            //this._constantService.setCommentData(this.latestComment);
            this.factory = this.componentFactoryResolver.resolveComponentFactory(CommentComponent);
            this.latestComment['ADD_DATE_TIME'] = this.postdata.getPostDateTime(this.latestComment['ADD_DATE_TIME']);
            this.ref = this.container.createComponent(this.factory);
            this.ref.instance.arr = this.latestComment;
            this.ref.instance._ref = this.ref;
            if (this.comment > 1 && this._router.url.split('/')[1] == "post") {
                this.getComment();
            }
        }

        this.findInterestPos();
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



    postdropdown() {
        this.postmenu = !this.postmenu;
        this.imonclick = true;
    }

    downloadCount(path) {
        //alert(postId);

        var downloadCount = {};
        downloadCount['token'] = this._constantService.getSessionDataBYKey('token');
        downloadCount['token_param'] = {};
        downloadCount['token_param']['device_type'] = 'w';
        downloadCount['token_param']['host'] = '';
        downloadCount['pid'] = this.post_id;
        var dlData = {};
        dlData['token'] = downloadCount['token'];
        dlData['token_param'] = { "device_type": "w", "host": "" };
        dlData['fnm'] = this.arr.CAPTION;
        dlData['usr_p_at_uuid'] = this.arr.USER_POST_ATTACHMENT_UUID;
        var fnmArr = this.arr.CAPTION.split('.');

        dlData['ftyp'] = fnmArr[fnmArr.length - 1];

        this._constantService.fetchBlobDataApi(this._constantService.getDownloadResourcesUrl(), dlData).subscribe(response => {
            var newBlob = new Blob([response], { type: "application/pdf" });

            // IE doesn't allow using a blob object directly as link href
            // instead it is necessary to use msSaveOrOpenBlob
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(newBlob);
                return;
            }

            // For other browsers: 
            // Create a link pointing to the ObjectURL containing the blob.
            const data = window.URL.createObjectURL(newBlob);

            var link = document.createElement('a');
            link.href = data;
            link.download = this.arr.CAPTION;
            // this is necessary as link.click() does not work on the latest firefox
            link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

            setTimeout(function () {
                // For Firefox it is necessary to delay revoking the ObjectURL
                window.URL.revokeObjectURL(data);
                link.remove();
            }, 100);
        })



        this._constantService.fetchDataApi(this._constantService.putDownloadCountServiceUrl(), downloadCount).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.download_Count = responseData.DOWNLDS_COUNT;
            } else if (status == this._constantService.error_token) {
                this._constantService.clearUserInfo();
                this._router.navigate(['']);
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
    closePopup(event) {
        if (event['error'] == false) {
            this.openConfirmation = false;
        }
    }
    savedpost() {
        if (!this.saveCondition) {
            this.savepagepopup = true;
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
    reprts() {
        this.reportpopup = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }
    reportpopuphide() {
        this.reportpopup = false;
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
                        this.dataConf['msg'] = "Session Expire";
                        this.dataConf['error_msg'] = "Session Expired";
                        this.openConfirmation = true;
                    } else {
                        this.showCommentImg = 1;
                        this.comment_image = null;
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

            this.hideSpan = 0;
            this.c_data = this.postdata.postDataManipulation(event.target.id);
            if (this.c_data.length == 0 && this.comment_image == null) {
                this.confirmText(this.c_data, event);
                return false;
            }

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
            if (comment['cmda'].length == 0) {
                return false;

            }

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
                        this.isCommentHit = true;
                    } else if (status == this._constantService.error_token) {
                        this._constantService.clearUserInfo();
                        this._router.navigate(['']);
                        this.dataConf['type'] = 4;
                        this.dataConf['msg'] = "Session Expire";
                        this.dataConf['error_msg'] = "Session Expired";
                        this.openConfirmation = true;
                    } else {
                        this.viewCommentList = false;
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
        } else if (event.keyCode == 13 && event.keyCode == 17) {
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
                    responseData.COMMENT_DATA[i].ADD_DATE_TIME = this.postdata.getPostDateTime(responseData.COMMENT_DATA[i].ADD_DATE_TIME);
                    responseData.COMMENT_DATA[i].USER_POST_ID = this.post_id;
                    this.factory = this.componentFactoryResolver.resolveComponentFactory(CommentComponent);
                    this.ref = this.container.createComponent(this.factory);
                    this.ref.instance.arr = responseData.COMMENT_DATA[i];
                    this.ref.instance._ref = this.ref;
                }
            } else if (status == this._constantService.error_token) {
                this._constantService.clearUserInfo();
                this._router.navigate(['']);
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


    change_Commentimage(event) {
        (<HTMLInputElement>document.getElementById(event.target.id.split("_")[1] + "_" + event.target.id.split("_")[2] + "_" + "nci")).click();
    }

    fileattachmentpostviewsec: boolean = false;
    fileattachmentpostviewshow() {
        if (this.count < 1) {
            this.count += 1;
            this.getComment();
        } else {
            this.fileattachmentpostviewsec = true;
        }
    }

    fileattachmentpostviewhide(a) {
        this.fileattachmentpostviewsec = a;
    }

    putUserPostUnsaved() {
        if (this.vart == true) {
            this.vart = false;
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
                        this._constantService.callEmptyStateMethod();
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
                    this.vart = true;
                }

            }, error => {
                var responseData = error;
                if (responseData.status == 500) {
                    this._router.navigate(['500']);
                }
            });
        }

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

    updateSourcePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }

    sharefilePostscreen() {
        this.arr['EDIT_POST'] = false;
        this.sharescreenfilesec = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }

    sharecount(event) {
        this.sharescreenfilesec = false;
        if (event) {
            this.share++;
        }
    }

    fileConfirmDelete: boolean = false;
    fileDeletePostCnf() {
        this.fileConfirmDelete = true;
        this.savedFID = 1;
        this.dataConf['msg'] = "Post Deletion"
        this.dataConf['error_msg'] = "Are you sure about deleting this feed post?";
        this.dataConf['type'] = 1;
        this.dataConf['pid'] = this.post_id;
        this.dataConf['ptyp'] = 2;
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
        this.savedFolderId
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }

    fileCloseDeleteConfirm(event) {
        this.fileConfirmDelete = event['closePopUpStatus'];
        if (event['delPostStatus']) {
            this._ref.destroy();
        }
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }
    documentViewerStatus = false;
    openDocumentViewer() {
        //        this.documentViewerStatus = true;
        //        let body = document.getElementsByTagName('body')[0];
        //        body.classList.add("body-overflow");
    }
    closeDocView(event) {

        this.documentViewerStatus = event;
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
    shareLikeShareFn($event) {
        $event.stopPropagation();
        this.userLikeShareList['postId'] = this.post_id;
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

    autoFocus() {
        var id = this.u_id + '_' + this.post_id + '_comm';
        if ((<HTMLInputElement>document.getElementById(id)).innerText == this._constantService.commentPlaceHolder) {
            (<HTMLInputElement>document.getElementById(id)).innerText = '';
        }
        (<HTMLInputElement>document.getElementById(id)).focus();

    }
    //     @HostListener('drop', ['$event']) blockDrop(e: MouseEvent) {
    //        e.preventDefault();
    //    }


    getReachPost() {
        var postReach = {};
        postReach['token'] = this._constantService.getSessionDataBYKey('token');
        postReach['token_param'] = {};
        postReach['token_param']['device_type'] = 'w';
        postReach['token_param']['host'] = '';
        postReach['pid'] = this.post_id;



        this._constantService.fetchDataApi(this._constantService.getpostReachUrl(), postReach).subscribe(data => {
            var responseData: any = data;
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

    updateProfilePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }

    showNotify() {
        this._constantService.showToast("Link has been Copied", "", "1");

    }
}
