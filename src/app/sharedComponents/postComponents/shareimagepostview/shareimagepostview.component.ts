import {Component, OnInit,AfterViewInit, Output, Input, EventEmitter, HostListener} from '@angular/core';
import {ConstantService} from './../../../services/constant.service';
import {PostdataService} from './../../../services/postdata.service';
import {EncryptionService} from './../../../services/encryption.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-shareimagepostview',
    templateUrl: './shareimagepostview.component.html',
    styleUrls: ['./shareimagepostview.component.scss','./../sharetextpostview/sharetextpostview.component.scss','./../textpost/allpost.css']
})
export class ShareimagepostviewComponent implements OnInit,AfterViewInit {
    postPublicShareLink: string;
    openConfirmation: boolean = false;
    dataConf: {};
    @Output() sharescreenimagepostdiv = new EventEmitter<boolean>();
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
    sharedPostId;
    u_id = 0;
    postTyp = 0;
    followerCount = 0;
    hidePlaceHolder: boolean = true;
    impLikeShareStatus = false;
    shareLikeShareStatus = false;
    userLikeShareList = {};
    date = new Date();
    pg_uuid = '';
    isPagePost: boolean = false;
    showIntArr: boolean = false;
    shareCount: object;
    altName = "";
    shareLinkPost:number=1;
    socialFbShareUrl;
    socialTeitterShareUrl;
    socialLinkedInShareUrl;
    socialTelegramUrl;
    sharedPostText= '';
    constructor(
        public _constantService: ConstantService,
        private _router: Router,
        private _encrypt: EncryptionService,
        public postData: PostdataService
    ) {}
    ngOnInit(){

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
    ngAfterViewInit() {
    this.postPublicShareLink = this._constantService.staticPostShareLink + this.postdata.SHARED_POST_DATA.URL;
    this.socialFbShareUrl = "https://www.facebook.com/dialog/feed?app_id="+this._constantService.facebookAppId+"&link="+this.postPublicShareLink;
    this.socialTeitterShareUrl ="https://twitter.com/intent/tweet?text=''"+"&url="+this.postPublicShareLink;
    this.socialLinkedInShareUrl = "https://www.linkedin.com/sharing/share-offsite/?url="+this.postPublicShareLink;
    this.socialTelegramUrl = "https://telegram.me/share/url?url="+this.postPublicShareLink;
        this.postTyp = this.postdata['TYPE'];
        this.altName = "aio " + this.postdata['KEYWORDS'];

        this.shrpost_id = this.postdata['SHARED_POST_DATA']['USER_POST_ID'];
        this.setInterestObj();
        this.tagsArr = this.postdata['INTERESTS'];
        this.time = this.postdata['ADD_DATE_TIME'];
        // if (this.postdata['TEXT'] && this.postdata['EDIT_POST']) {
        //     this.hidePlaceHolder = false;
        //     (<HTMLElement> document.getElementById('shareText')).innerHTML = this.postData.decodeURIPostData(this.postdata['TEXT']).trim();
        // }
        if (this.postdata['TEXT'] && this.postdata['EDIT_POST']== true) {
            this.hidePlaceHolder = false;
            (this.sharedPostText = this.postData.decodeURIPostData(this.postdata['TEXT']));
        }
        if (this.postTyp == 4) {
            this.postTyp = this.postdata['SHARED_POST_DATA']['TYPE'];
            this.post_id = this.postdata['USER_POST_ID'];
            this.sharedPostId = this.postdata['SHARED_POST_DATA']['SHARED_POST_ID'];
            this.u_id = this.postdata['SHARED_FROM'];
            this.full_name = this.postdata['SHARED_POST_DATA']['USER_FULL_NAME'];
            if(this.postdata['SHARED_POST_DATA']['TEXT']!=null){
            this.post_data = this.postData.decodeURIPostData(this.postdata['SHARED_POST_DATA']['TEXT']).trim();
            if (this.post_data.length > 301) {
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
            this.image_path = this.postdata['SHARED_POST_DATA']['PATH'] + "img/" + this.postdata['SHARED_POST_DATA']['USER_POST_ATTACHMENT_UUID'] + ".png";
        } else {
            this.postTyp = this.postdata['TYPE'];
            this.post_id = this.postdata['USER_POST_ID'];
            this.u_id = this.postdata['USER_ID'];
            this.tagsArr = this.postdata['INTERESTS'];
            this.full_name = this.postdata['USER_FULL_NAME'];
            this.time = this.postdata['ADD_DATE_TIME'];
            this.image_path = this.postdata['PATH'] + "img/" + this.postdata['USER_POST_ATTACHMENT_UUID'] + ".png";
            if(this.postdata['TEXT']!=null){
            this.post_data = this.postData.decodeURIPostData(this.postdata['TEXT']);
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
                this.user_name = this.postdata['USER_NAME'];
            }
            if (this.post_data.length > 200) {
                this.DataView = !this.DataView;
            }
        }
        this.findInterestPos();

    }

    shareimagepostviewhide() {
        this.sharescreenimagepostdiv.emit(false);
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }

    checkData() {
        var data = (<HTMLElement> document.getElementById('shareText'));
        if (data.innerText.length == 0) {
            this.hidePlaceHolder = true;
        } else {
            this.hidePlaceHolder = false;
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if(this.showIntArr == true){
      var innerWidthFull = window.innerWidth;
      var interestPosLeft = document.getElementById(this.post_id + '_interestpos').offsetLeft;
      var interestPosRight = innerWidthFull - interestPosLeft;
      if(window.innerWidth < 600 ){
        if(interestPosRight <= 185 ){
          document.getElementById(this.post_id + "_shftToLeft").style.left = "-148px";
          document.getElementById(this.post_id + "_shiftArrowLeft").style.left =  "155px";
        }else{
          document.getElementById(this.post_id + "_shftToLeft").style.left = "-9px";
          document.getElementById(this.post_id + "_shiftArrowLeft").style.left =  "15px";
        }
      }
}
    }
    private findInterestPos() {
        if(this.showIntArr == true){
      var innerWidthFull = window.innerWidth;
      var interestPosLeft = document.getElementById(this.post_id + '_interestpos').offsetLeft;
      var interestPosRight = innerWidthFull - interestPosLeft;
      if(window.innerWidth < 600 ){
        if(interestPosRight <= 185 ){
          document.getElementById(this.post_id + "_shftToLeft").style.left = "-148px";
          document.getElementById(this.post_id + "_shiftArrowLeft").style.left =  "155px";
        }else{
          document.getElementById(this.post_id + "_shftToLeft").style.left = "-9px";
          document.getElementById(this.post_id + "_shiftArrowLeft").style.left =  "15px";
        }
      }
      }
    }
  // ngAfterViewChecked(){
  //   this.findInterestPos();
  // }

//    ngAfterViewInit() {
//      this.findInterestPos();
//    }

    sharePost() {
        this.sharedPostText=this.postData.postDataManipulationWithText(this.sharedPostText);
        this.loader = true;
        this.showText = false;
        // var postData = this.postData.postDataManipulation('shareText');

        var sharePost = {};
        sharePost['token'] = this._constantService.getSessionDataBYKey('token');
        sharePost['token_param'] = {};
        sharePost['token_param']['device_type'] = 'w';
        sharePost['token_param']['host'] = '';
        let bodyy = document.getElementsByTagName('body')[0];
            bodyy.classList.remove("body-overflow");
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
        // if (sharePost['pdt'] == "%3Cspan%20_ngcontent-c14%3D%22%22%20class%3D%22placeholder%22%20id%3D%22post_placeholder%22%3EWhat's%20on%20your%20mind%3F%3C%2Fspan%3E") {
        //     sharePost['pdt'] = '';

        // }
        // if (this.hidePlaceHolder) {
        //     sharePost['pdt'] = '';
        // }
        sharePost['shrptyp'] = this.postTyp;
        sharePost['shruid'] = this.u_id;
        sharePost['iid'] = this.tagsArr.join();
       

        this._constantService.fetchDataApi(this._constantService.getSharePostServiceUrl(), sharePost).subscribe(data => {
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
                this.sharescreenimagepostdiv.emit(true);
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
    closePopup(event) {
        if (event['error'] == false) {
            this.openConfirmation = false;
        }
    }
    updateSourcePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }
    impLikeShareFn() {
        this.userLikeShareList['postId'] = this.post_id;
        this.userLikeShareList['type'] = 1;
        this.impLikeShareStatus = !this.impLikeShareStatus;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }
    shareLikeShareFn() {
        this.userLikeShareList['postId'] = this.sharedPostId;
        this.userLikeShareList['type'] = 2;
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
