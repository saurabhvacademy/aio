import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {ConstantService} from './../../../services/constant.service';
import {EncryptionService} from './../../../services/encryption.service';
import {Router} from '@angular/router';
import {PostdataService} from './../../../services/postdata.service';
import * as $ from 'jquery' ; 

@Component({
    selector: 'app-sharescreensinglechoicepost',
    templateUrl: './sharescreensinglechoicepost.component.html',
    styleUrls: ['./sharescreensinglechoicepost.component.scss','./../sharetextpostview/sharetextpostview.component.scss','./../textpost/allpost.css']
})

export class SharescreensinglechoicepostComponent implements OnInit {
    postPublicShareLink: string;
    openConfirmation: boolean = false;
    dataConf: {};
    @Output() closeShareScreenThread = new EventEmitter<boolean>();
    @Input() postdata: any;
    postTyp = 0;
    interestObj = {};
    tagsArr = [];
    time = 0;
    hidePlaceHolder: boolean = true;
    post_id = 0;
    shrpost_id = 0;
    loader: boolean = false;
    showText: boolean = true;
    post_data = "";
    questionImg = "";
    user_name = "";
    profile_pic_path = "";
    full_name = '';
    u_id = 0;
    followerCount = 0;
    option = [];
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
        private postData: PostdataService
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

        this.postTyp = this.postdata['TYPE'];
        this.setInterestObj();
        this.tagsArr = this.postdata['INTERESTS'];
        this.time = this.postdata['ADD_DATE_TIME'];
        this.altName = "study24x7 " + this.postdata['KEYWORDS'];
        if (this.postTyp == 4) {
        this.postPublicShareLink = this._constantService.staticPostShareLink + this.postdata.SHARED_POST_DATA.URL;

            this.u_id = this.postdata['SHARED_POST_DATA']['USER_ID'];
            this.postTyp = this.postdata['SHARED_POST_DATA']['TYPE'];
            this.post_data = this.postData.decodeURIPostData(this.postdata['SHARED_POST_DATA']['TEXT']);
            this.questionImg = this.postdata['SHARED_POST_DATA']['TEXT_IMAGE'];
            this.profile_pic_path = this.postdata['SHARED_POST_DATA']['PROFILE_PHOTO_PATH'] + "profile/" + this.postdata['SHARED_POST_DATA']['USER_ID'] + "_60x60.png";
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
            this.full_name = this.postdata['SHARED_POST_DATA']['USER_FULL_NAME'];

            if (this.postdata['TEXT'] && this.postdata['EDIT_POST']== true) {
                this.hidePlaceHolder = false;
                (this.sharedPostText = this.postData.decodeURIPostData(this.postdata['TEXT']));
            }
            this.post_id = this.postdata['USER_POST_ID'];
            this.shrpost_id = this.postdata['SHARED_POST_DATA']['USER_POST_ID'];
            this.option = this.postdata['SHARED_POST_DATA']['OPTIONS'];
            if (this.option[0] != null) {
                this.option1 = this.postData.decodeURIPostData(this.option[0]['TXT']);
                this.option1Img = this.option[0]['IMG'];
            }
            if (this.option[1] != null) {
                this.option2 = this.postData.decodeURIPostData(this.option[1]['TXT']);
                this.option2Img = this.option[1]['IMG'];
            }
            if (this.option[2] != null) {
                this.option3 = this.postData.decodeURIPostData(this.option[2]['TXT']);
                this.option3Img = this.option[2]['IMG'];
            }
            if (this.option[3] != null) {
                this.option4 = this.postData.decodeURIPostData(this.option[3]['TXT']);
                this.option4Img = this.option[3]['IMG'];
            }
            if (this.option[4] != null) {
                this.option5 = this.postData.decodeURIPostData(this.option[4]['TXT']);
                this.option5Img = this.option[4]['IMG'];
            }
            if (this.option[5] != null) {
                this.option6 = this.postData.decodeURIPostData(this.option[5]['TXT']);
                this.option6Img = this.option[5]['IMG'];
            }
        } else {
            this.u_id = this.postdata['USER_ID'];
            this.post_data = this.postData.decodeURIPostData(this.postdata['TEXT']);
            this.questionImg = this.postdata['TEXT_IMAGE'];
            if (this.postdata['PAGE_UUID'] != '' && this.postdata['PAGE_UUID'] != null) {
                this.pg_uuid = this.postdata['PAGE_UUID'];
                this.isPagePost = true;
                if (this.postdata['PAGE_PROFILE_PHOTO_PATH'] != null && this.postdata['PAGE_PROFILE_PHOTO_PATH'] != '') {
                    this.profile_pic_path = this.postdata['PAGE_PROFILE_PHOTO_PATH'] + "profile/" + this.postdata['PAGE_UUID'] + "_60x60.png?v="+ this.postdata['IMG_UPD_DT'];
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
            this.full_name = this.postdata['USER_FULL_NAME'];

            this.hidePlaceHolder = true;
            this.post_id = this.postdata['USER_POST_ID'];
            this.shrpost_id = this.postdata['USER_POST_ID'];
            this.option = this.postdata['OPTIONS'];

            if (this.option[0] != null) {
                this.option1 = this.postData.decodeURIPostData(this.option[0]['TXT']);
                this.option1Img = this.option[0]['IMG'];
            }
            if (this.option[1] != null) {
                this.option2 = this.postData.decodeURIPostData(this.option[1]['TXT']);
                this.option2Img = this.option[1]['IMG'];
            }
            if (this.option[2] != null) {
                this.option3 = this.postData.decodeURIPostData(this.option[2]['TXT']);
                this.option3Img = this.option[2]['IMG'];
            }
            if (this.option[3] != null) {
                this.option4 = this.postData.decodeURIPostData(this.option[3]['TXT']);
                this.option4Img = this.option[3]['IMG'];
            }


            if (this.option[4] != null) {
                this.option5 = this.postData.decodeURIPostData(this.option[4]['TXT']);
                this.option5Img = this.option[4]['IMG'];
            }
            if (this.option[5] != null) {
                this.option6 = this.postData.decodeURIPostData(this.option[5]['TXT']);
                this.option6Img = this.option[5]['IMG'];
            }
        }
    }

    ngAfterViewInit() {
        //        if (this.post_data != null) {
        //            //document.getElementById("quesText").innerHTML = this.post_data;
        //            this.post_data = this.postData.getQuestionTextToSave(this.post_id);
        //        }
        //        if (this.option1 != "") {
        //            //document.getElementById("opt1_text").innerHTML = this.option1;
        //            this.option1 = this.postData.getOption1TextToSave(this.post_id);
        //        }
        //        if (this.option2 != "") {
        //            //document.getElementById("opt2_text").innerHTML = this.option2;
        //            this.option2 = this.postData.getOption2TextToSave(this.post_id);
        //        }
        //        if (this.option3 != "") {
        //            //document.getElementById("opt3_text").innerHTML = this.option3;
        //            this.option3 = this.postData.getOption3TextToSave(this.post_id);
        //        }
        //        if (this.option4 != "") {
        //            //document.getElementById("opt4_text").innerHTML = this.option4;
        //            this.option4 = this.postData.getOption4TextToSave(this.post_id);
        //        }
        //        if (this.option5 != "") {
        //            //document.getElementById("opt5_text").innerHTML = this.option5;
        //            this.option5 = this.postData.getOption5TextToSave(this.post_id);
        //        }
        //        if (this.option6 != "") {
        //            //document.getElementById("opt6_text").innerHTML = this.option6;
        //            this.option6 = this.postData.getOption6TextToSave(this.post_id);
        //        }
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
        this.sharedPostText=this.postData.postDataManipulationWithText(this.sharedPostText);
        this.loader = true;
        this.showText = false;
        // var postData = (<HTMLElement> document.getElementById("shareText")).innerText.replace(/&nbsp;/g, "");
        // postData = postData.replace(/&#09;/g, "");
        // postData = postData.replace(/\<(?!span|br|a|\/span|\/br|\/a).*?\>/g, "");
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
                this.loader = false;
                this.showText = true;
                this.closeShareScreenThread.emit(true);
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
            // window.open(window.location.origin + '/page/' + this.pg_uuid, '_blank')
            this._router.navigate([ '/page/' + this.pg_uuid]);
        } else if (target == 'user'){
            // window.open(window.location.origin + '/profile/' + this.user_name, '_blank')
            this._router.navigate([ '/profile/' + this.user_name]);

        }

    }
}
