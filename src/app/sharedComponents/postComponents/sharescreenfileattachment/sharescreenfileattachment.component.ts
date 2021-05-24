import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {ConstantService} from './../../../services/constant.service';
import {EncryptionService} from './../../../services/encryption.service';
import {Router} from '@angular/router';
import {PostdataService} from './../../../services/postdata.service';

@Component({
    selector: 'app-sharescreenfileattachment',
    templateUrl: './sharescreenfileattachment.component.html',
    styleUrls: ['./sharescreenfileattachment.component.scss','./../sharetextpostview/sharetextpostview.component.scss','./../textpost/allpost.css']
})
export class SharescreenfileattachmentComponent implements OnInit {
    postPublicShareLink: string;
    ltIntShow = [];
    openConfirmation: boolean = false;
    dataConf: {};

    @Output() sharefileattachmentpostscreendiv = new EventEmitter<boolean>();
    sharescreenlinkpostvar: boolean = false;
    @Input() postdata: any;
    sharepostviewimagedivhide: boolean = false;
    loader: boolean = false;
    showText: boolean = true;
    interestObj = {};
    tagsArr = [];
    full_name: string = "";
    time = "";
    post_data: string = "";
    DataView: boolean = false;
    profile_pic_path: string = "";
    user_name: string = "";
    image_path
    post_id = 0;
    shrpost_id = 0;
    u_id = 0;
    postTyp = 0;
    file_name: string = "";
    file_type: string = '';
    pages = 0;
    download_Count = 0;
    followerCount = 0;
    path: string = "";
    hidePlaceHolder: boolean = true;
    date = new Date();
    pg_uuid = '';
    isPagePost: boolean = false;
    showIntArr: boolean = false;
    altName = "";
    shareLinkPost:number=1;
    socialFbShareUrl;
    socialTeitterShareUrl;
    socialLinkedInShareUrl;
    sharedPostText='';
    constructor(
        public _constantService: ConstantService,
        private _router: Router,
        private _encrypt: EncryptionService,
        public postData: PostdataService
    ) {}

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
        this.postPublicShareLink = this._constantService.staticPostShareLink + this.postdata.URL;
        if (this.postdata['TEXT'] && this.postdata['EDIT_POST']) {
            this.hidePlaceHolder = false;
            (<HTMLElement> document.getElementById('shareText')).innerText = this.postData.decodeURIPostData(this.postdata['TEXT']);
        }
//        if(this.postdata['EDIT_POST'] == true){
//
//        }
        this.altName = "aio " + this.postdata['KEYWORDS'];
        this.postTyp = this.postdata['TYPE'];
        if (this.postTyp == 4) {
            this.u_id = this.postdata['SHARED_POST_DATA']['USER_ID'];
            this.post_id = this.postdata['USER_POST_ID'];
            this.postTyp = this.postdata['SHARED_POST_DATA']['TYPE'];
            this.u_id = this.postdata['SHARED_FROM'];
            this.full_name = this.postdata['SHARED_POST_DATA']['USER_FULL_NAME'];
            if (this.postdata['SHARED_POST_DATA']['TEXT']) {
                this.post_data = this.postData.decodeURIPostData(this.postdata['SHARED_POST_DATA']['TEXT']);
            }
            if (this.post_data) {
                if (this.post_data.length > 200) {
                    this.DataView = !this.DataView;
                }
            }
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
                this.user_name = this.postData.decodeURIPostData(this.postdata['SHARED_POST_DATA']['TITLE']);
                this.followerCount = this.postdata['SHARED_POST_DATA']['PAGE_FOLLOW_COUNT'];
            } else {
                if (this.postdata['SHARED_POST_DATA']['PROFILE_PHOTO_PATH'] != null && this.postdata['SHARED_POST_DATA']['PROFILE_PHOTO_PATH'] != '') {
                    this.profile_pic_path = this.postdata['SHARED_POST_DATA']['PROFILE_PHOTO_PATH'] + "profile/" + this.postdata['SHARED_POST_DATA']['USER_ID'] + "_60x60.png?v=" + this.postdata['IMG_UPD_DT'];
                } else {
                    this.profile_pic_path = this._constantService.defaultImgPath;
                }
                this.user_name = this.postdata['SHARED_POST_DATA']['USER_NAME'];
            }
            if (this.postdata['SHARED_POST_DATA']['CAPTION'] != null) {
                this.file_name = this.postdata['SHARED_POST_DATA']['CAPTION'];
            }
            this.shrpost_id = this.postdata['SHARED_POST_DATA']['USER_POST_ID'];
            this.postTyp = this.postdata['SHARED_POST_DATA']['TYPE'];
            let typearr = this.file_name.split(".");
            this.file_type = typearr[typearr.length - 1];
            this.pages = this.postdata['SHARED_POST_DATA']['NUMBERS_OF_PAGES_TO_DWLD'];
            this.path = this.postdata['SHARED_POST_DATA']['PATH'] + "attach/" + this.postdata['SHARED_POST_DATA']['USER_POST_ATTACHMENT_UUID'] + "/" + this.postdata['SHARED_POST_DATA']['USER_POST_ATTACHMENT_ID'] + "." + this.file_type;
            this.download_Count = this.postdata['SHARED_POST_DATA']['FILE_DWLD_COUNT'];
            this.tagsArr = this.postdata['INTERESTS'];
            this.setInterestObj();
            if (this.postdata['INTERESTS'].length > 4) {
                for (var i = 0; i < 4; i++) {
                    this.tagsArr[i] = this.postdata['INTERESTS'][i];

                }
            } else {
                this.tagsArr = this.postdata['INTERESTS'];
            }
            if (this.postdata['INTERESTS'].length > 4) {
                this.showIntArr = true;
                for (var i = 4; i < this.postdata['INTERESTS'].length; i++) {
                    if (this.postdata['INTERESTS'][i] != undefined && this.postdata['INTERESTS'][i] != "undefined" && this.postdata['INTERESTS'][i] != null && this.postdata['INTERESTS'][i] != '') {
                        this.ltIntShow[i] = this.postdata['INTERESTS'][i];
                    }
                }
            }

        } else {
            this.shrpost_id = this.postdata['USER_POST_ID'];
            this.setInterestObj();
            this.tagsArr = this.postdata['INTERESTS'];
            this.time = this.postdata['ADD_DATE_TIME'];
            this.post_id = this.postdata['USER_POST_ID'];
            this.u_id = this.postdata['USER_ID'];
            this.tagsArr = this.postdata['INTERESTS'];
            this.full_name = this.postdata['USER_FULL_NAME'];
            this.time = this.postdata['ADD_DATE_TIME'];
            this.post_data = this.postData.decodeURIPostData(this.postdata['TEXT']);
            if (this.post_data) {
                if (this.post_data.length > 200) {
                    this.DataView = !this.DataView;
                }
            }
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
                this.user_name = this.postData.decodeURIPostData(this.postdata['TITLE']);
                this.followerCount = this.postdata['PAGE_FOLLOW_COUNT'];
            } else {
                if (this.postdata['PROFILE_PHOTO_PATH'] != null && this.postdata['PROFILE_PHOTO_PATH'] != '') {
                    this.profile_pic_path = this.postdata['PROFILE_PHOTO_PATH'] + "profile/" + this.postdata['USER_ID'] + "_60x60.png?v=" + this.postdata['IMG_UPD_DT'];
                } else {
                    this.profile_pic_path = this._constantService.defaultImgPath;
                }
                this.user_name = this.postdata['SHARED_POST_DATA']['USER_NAME'];
            }
            if (this.postdata['CAPTION'] != null) {
                this.file_name = this.postdata['CAPTION'];
            }
            let typearr = this.file_name.split(".");
            this.file_type = typearr[typearr.length - 1];
            this.pages = this.postdata['NUMBERS_OF_PAGES_TO_DWLD'];
            this.path = this.postdata['PATH'] + "attach/" + this.postdata['USER_POST_ATTACHMENT_ID'] + "/" + this.postdata['USER_POST_ATTACHMENT_UUID'] + "." + this.file_type;
            this.download_Count = this.postdata['FILE_DWLD_COUNT'];
        }
    }

    checkData() {
        var data = (<HTMLElement> document.getElementById('shareText'));
        if (data.innerText.length == 0) {
            this.hidePlaceHolder = true;
        } else {
            this.hidePlaceHolder = false;
        }
    }

    sharefileattachmentpostviewhide() {
        this.sharefileattachmentpostscreendiv.emit(false);
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }

    sharePost() {
        this.sharefileattachmentpostviewhide();
        this.sharedPostText = this.postData.postDataManipulationWithText(this.sharedPostText);
        this.showText = false;
        this.loader = true;
        // var postData = this.postData.postDataManipulation('shareText');
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
        sharePost['ptyp'] = 4;
        sharePost['pdt'] = this.postData.encodeURIPostData(this.sharedPostText);
        sharePost['shrptyp'] = this.postTyp;
        sharePost['shruid'] = this.u_id;
        sharePost['iid'] = this.tagsArr.join();
        // if (this.hidePlaceHolder) {
        //     sharePost['pdt'] = '';
        // }
       
        this._constantService.fetchDataApi(this._constantService.getSharePostServiceUrl(),sharePost).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this._constantService.showToast("Post has been shared successfully", "", "1");
                if(this.postdata['EDIT_POST']){
                    window.location.reload();
                    return;
                }
                this.showText = true;
                this.loader = false;
                this.sharefileattachmentpostscreendiv.emit(true);
            } else if (status == this._constantService.error_token) {
                this.showText = true;
                this.loader = false;
                this._constantService.clearUserInfo();
                this._router.navigate(['']);
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;
            } else {
                this.showText = true;
                this.loader = false;
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
    updateSourcePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }
    pastedData(event) {
        this.postData.onPaste(event);
    }

    showPost(index){
      this.shareLinkPost=index;
    }
    onFocusInput(){
        this.hidePlaceHolder=true;
        document.getElementsByClassName("popup_background_view")[0].scrollTo(0,0);

    }
}
