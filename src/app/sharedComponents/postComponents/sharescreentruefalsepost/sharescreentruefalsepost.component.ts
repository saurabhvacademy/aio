import {Component, OnInit, Output, EventEmitter, Input, AfterViewInit} from '@angular/core';
import {ConstantService} from './../../../services/constant.service';
import {EncryptionService} from './../../../services/encryption.service';
import {Router} from '@angular/router';
import {PostdataService} from './../../../services/postdata.service';
import * as $ from 'jquery'  ;
@Component({
    selector: 'app-sharescreentruefalsepost',
    templateUrl: './sharescreentruefalsepost.component.html',
    styleUrls: ['./sharescreentruefalsepost.component.scss','./../sharetextpostview/sharetextpostview.component.scss','./../textpost/allpost.css']
})
export class SharescreentruefalsepostComponent implements OnInit, AfterViewInit {
    postPublicShareLink = '';
    postType: any;
    openConfirmation: boolean = false;
    dataConf: {};
    @Output() closeShareScreenThread = new EventEmitter<boolean>();
    @Input() postdata: any;
    Preloader = false;
    showText = true;
    postTyp = 0;
    interestObj = {};
    tagsArr = [];
    time = 0;
    hidePlaceHolder: boolean = true;
    post_id = 0;
    shrpost_id = 0;
    post_data = "";
    questionImg = "";
    user_name = "";
    profile_pic_path = "";
    full_name = '';
    u_id = 0;
    followerCount = 0;
    date = new Date();
    pg_uuid = '';
    isPagePost: boolean = false;
    showIntArr:boolean = false;
    altName = "";

    shareLinkPost:number=1;
    socialFbShareUrl;
    socialTeitterShareUrl;
    socialLinkedInShareUrl;
    socialTelegramUrl;
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
        this.socialFbShareUrl = "https://www.facebook.com/dialog/feed?app_id="+this._constantService.facebookAppId+"&link="+this.postPublicShareLink;
        this.socialTeitterShareUrl ="https://twitter.com/intent/tweet?text=''"+"&url="+this.postPublicShareLink;
        this.socialLinkedInShareUrl = "https://www.linkedin.com/sharing/share-offsite/?url="+this.postPublicShareLink;
        this.socialTelegramUrl = "https://telegram.me/share/url?url="+this.postPublicShareLink;
        this.postType = this.postdata['TYPE'];
        this.setInterestObj();
        this.tagsArr = this.postdata['INTERESTS'];
        this.altName = "aio " + this.postdata['KEYWORDS'];
        if (this.postType == 4) {
             this.postPublicShareLink = this._constantService.staticPostShareLink + this.postdata.SHARED_POST_DATA.URL;
            this.postTyp = this.postdata['SHARED_POST_DATA']['TYPE'];
            this.u_id = this.postdata['SHARED_POST_DATA']['USER_ID'];
            this.time = this.postdata['SHARED_POST_DATA']['ADD_DATE_TIME'];
            this.post_data = this.postData.decodeURIPostData(this.postdata['SHARED_POST_DATA']['TEXT']);
            this.post_data = this.postData.decodeURIPostData(this.postdata['SHARED_POST_DATA']['TEXT']);
            // if (this.questionImg != null && this.questionImg != '') {
                this.questionImg = this.postdata['SHARED_POST_DATA']['TEXT_IMAGE'];
            // }
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
                this.user_name =this.postdata['SHARED_POST_DATA']['USER_NAME'];
            }
            this.full_name = this.postdata['SHARED_POST_DATA']['USER_FULL_NAME'];

            // if (this.postdata['TEXT'] && this.postdata['EDIT_POST']== true) {
            //     this.hidePlaceHolder = false;
            //     if(document.getElementById('shareText')){
            //     (<HTMLElement> document.getElementById('shareText')).innerText = this.postData.decodeURIPostData(this.postdata['TEXT']);

            //     }
            // }
            if (this.postdata['TEXT'] && this.postdata['EDIT_POST']== true) {
                this.hidePlaceHolder = false;
                (this.sharedPostText = this.postData.decodeURIPostData(this.postdata['TEXT']));
            }
            this.post_id = this.postdata['USER_POST_ID'];
            console.log(this.post_id,"1 ");
            this.shrpost_id = this.postdata['SHARED_POST_DATA']['USER_POST_ID'];
            console.log(this.shrpost_id,"2 ");

        } else {
            this.postTyp = this.postdata['TYPE'];
            this.u_id = this.postdata['USER_ID'];
            this.time = this.postdata['ADD_DATE_TIME'];
            this.full_name = this.postdata['USER_FULL_NAME'];
            this.post_data = this.postData.decodeURIPostData(this.postdata['TEXT']);
            if (this.postdata['TEXT_IMAGE'] != null && this.postdata['TEXT_IMAGE'] != '') {
                this.questionImg = this.postdata['TEXT_IMAGE'];
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
                this.user_name = this.postdata['USER_NAME'];
            }
            //           this.postTyp = this.postdata['TYPE'];
            this.hidePlaceHolder = true;
            this.post_id = this.postdata['USER_POST_ID'];
            console.log(this.post_id,"3");

        }

    }

    ngAfterViewInit() {
        if (this.post_data != "") {
            //document.getElementById("quesText").innerHTML = this.post_data;
            this.post_data = this.postData.getQuestionTextToSave(this.post_id);
        }
    }

    closeShareScreen() {
        this.closeShareScreenThread.emit(false);
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }

    updateSourcePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }

    checkData() {
        var data = (<HTMLElement> document.getElementById('shareText'));
        if (data.innerText.length == 0) {
            this.hidePlaceHolder = true;
        } else {
            this.hidePlaceHolder = false;
        }
    }

    sharePost() {
        this.Preloader = true;
        this.showText = false;
        // var postData = (<HTMLElement> document.getElementById("shareText")).innerText.replace(/&nbsp;/g, "");
        // postData = postData.replace(/&#09;/g, "");
        // postData = postData.replace(/\<(?!span|br|a|\/span|\/br|\/a).*?\>/g, "");
        this.sharedPostText = this.postData.postDataManipulationWithText(this.sharedPostText);
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
        sharePost['pdt'] = this.postData.encodeURIPostData(this.sharedPostText).replace(/What's%20on%20your%20mind%3F/g, "");
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
                this.Preloader = false;
                //this.showText = true;
                this.closeShareScreenThread.emit(true);
            } else if (status == this._constantService.error_token) {
                this.Preloader = false;
                this.showText = true;
                this._constantService.clearUserInfo();
                this._router.navigate(['']);
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;
            }
            else {
                this.Preloader = false;
                this.showText = true;
                alert(responseData.ERROR_MSG);
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

    focusin() {
        (<HTMLElement> document.getElementById('shareText')).focus();
        this.hidePlaceHolder = false;
        document.getElementsByClassName("popup_background_view")[0].scrollTo(0,0);

    }

     pastedData(event) {
        this.postData.onPaste(event);
    }
    showPost(index){
      this.shareLinkPost=index;
    }
    routeToProfile(target) {
        if (target == 'page') {
            window.open(window.location.origin + '/page/' + this.user_name, '_blank')
        } else if (target == 'user'){
            window.open(window.location.origin + '/profile/' + this.user_name, '_blank')
        }
    }
}
