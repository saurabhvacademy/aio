import {Component, ViewChild, OnInit, AfterViewInit, Output, EventEmitter, ElementRef, Input, HostListener} from '@angular/core';
import {ConstantService} from './../../../services/constant.service';
import {PostdataService} from './../../../services/postdata.service';
import {EncryptionService} from './../../../services/encryption.service';
import {Router} from '@angular/router';
import { ArticleimagesizeService } from './../../../services/articleimagesize.service';
@Component({
    selector: 'app-sharelinkpostview',
    templateUrl: './sharelinkpostview.component.html',
    styleUrls: ['./sharelinkpostview.component.scss', './../sharetextpostview/sharetextpostview.component.scss', './../textpost/allpost.css', './../linkpost/linkpost.component.scss', './sharelinkpostview.component.scss']
})
export class SharelinkpostviewComponent implements OnInit, AfterViewInit {
    editPostId: any;
    postPublicShareLink: string;
    shareLinkPost: any = 1;
    openConfirmation: boolean = false;
    dataConf: {};
    @Output() sharelinkpostscreendiv = new EventEmitter<boolean>();
    @ViewChild('aritcleImage', { read: ElementRef }) aritcleImage: ElementRef;
    sharescreenlinkpostvar: boolean = false;
    @Input() postdata: any;
    sharepostviewimagedivhide: boolean = false;
    interestObj = {};
    showPreloader: boolean = false;
    showText: boolean = true;
    tagsArr = [];
    full_name: string = "";
    link: string = "";
    link_title: string = "";
    link_description: string = "";
    time = "";
    post_data: string = "";
    DataView: boolean = false;
    profile_pic_path: string = "";
    user_name: string = "";
    image_path = "";
    post_id = 0;
    shrpost_id = 0;
    sharedPostId;
    u_id = 0;
    postTyp = 0;
    followerCount = 0;
    hidePlaceHolder: boolean = true;
    saveCondition: boolean = false;
    savepagepopup: boolean = false;
    userLikeShareList = {};
    impLikeShareStatus = false;
    shareLikeShareStatus = false;
    date = new Date();
    pg_uuid = '';
    isPagePost: boolean = false;
    showIntArr: boolean = false;
    socialFbShareUrl;
    socialTeitterShareUrl;
    socialLinkedInShareUrl;
    socialTelegramUrl;
    innerPostTyp = 0;
    setArticleClass = 0;
    sharedPostText='';
    constructor(
        public _constantService: ConstantService,
        private _router: Router,
        private _encrypt: EncryptionService,
        public postData: PostdataService,
        public _getArticleImage: ArticleimagesizeService
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


       if (this.postdata['IS_ARTICLE']){
           this.postPublicShareLink = this._constantService.staticArticleShareLink + this.postdata.ARTICLE_ID + '/' + this.postdata.ARTICLE_URL;
       }else{
           this.postPublicShareLink = this._constantService.staticPostShareLink + this.postdata.URL;
       }

        this.socialFbShareUrl = "https://www.facebook.com/dialog/feed?app_id="+this._constantService.facebookAppId+"&link="+this.postPublicShareLink;
        this.socialTeitterShareUrl ="https://twitter.com/intent/tweet?text="+"&url="+this.postPublicShareLink;
        this.socialLinkedInShareUrl = "https://www.linkedin.com/sharing/share-offsite/?url="+this.postPublicShareLink;
        this.socialTelegramUrl = "https://telegram.me/share/url?url="+this.postPublicShareLink;

        this.sharedPostText = this.postData.decodeURIPostData(this.postdata.TEXT);
        this.postTyp = this.postdata['TYPE'];
        this.innerPostTyp = this.postdata['LINK_PTYPE'];
        this.setInterestObj();
        this.tagsArr = this.postdata['INTERESTS'];
        this.time = this.postdata['ADD_DATE_TIME'];

        this.editPostId = this.postdata['USER_ID'] + ":" + this.postdata['USER_POST_ID'] + ":" + this.postdata['TYPE'];
        if (this.postTyp == 4) {
            this.postTyp = this.postdata['SHARED_POST_DATA']['TYPE'];
            this.post_id = this.postdata['USER_POST_ID'];
            this.u_id = this.postdata['SHARED_FROM'];
            this.shrpost_id = this.postdata['SHARED_POST_DATA']['USER_POST_ID'];
            this.time = this.postdata['ADD_DATE_TIME'];
            this.full_name = this.postdata['SHARED_POST_DATA']['USER_FULL_NAME'];
            this.post_data = this.postData.decodeURIPostData(this.postdata['SHARED_POST_DATA']['TEXT']).trim();
            if (this.post_data.length > 200) {
                this.DataView = !this.DataView;
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
            this.sharedPostId = this.postdata['SHARED_POST_ID'];
            this.link_title = this.postData.decodeURIPostData(this.postdata['SHARED_POST_DATA']['SHARE_LINK_TITLE']);
            this.link_description = this.postData.decodeURIPostData(this.postdata['SHARED_POST_DATA']['SHARE_LINK_DESCRIPTION']);
            if (this.postdata['SHARED_POST_DATA']['SHARE_LINK_IMAGE'] != null || this.postdata['SHARED_POST_DATA']['SHARE_LINK_IMAGE'] != 'null') {
                this.image_path = this.postdata['SHARED_POST_DATA']['SHARE_LINK_IMAGE'];
            }
        } else {
            this.postTyp = this.postdata['TYPE'];
            this.post_id = this.postdata['USER_POST_ID'];
            this.shrpost_id = this.postdata['SHARED_POST_DATA']['USER_POST_ID'];
            this.u_id = this.postdata['USER_ID'];
            this.tagsArr = this.postdata['INTERESTS'];
            this.full_name = this.postdata['USER_FULL_NAME'];
            this.time = this.postdata['ADD_DATE_TIME'];
            this.post_data = this.postData.decodeURIPostData(this.postdata['TEXT']).trim();
            if (this.post_data.length > 200) {
                this.DataView = !this.DataView;
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
            this.link_title = this.postData.decodeURIPostData(this.postdata['SHARE_LINK_TITLE']);
            this.link_description = this.postData.decodeURIPostData(this.postdata['SHARE_LINK_DESCRIPTION']);
            if (this.postdata['SHARE_LINK_IMAGE'] != null || this.postdata['SHARE_LINK_IMAGE'] != 'null') {
                this.image_path = this.postdata['SHARE_LINK_IMAGE'];
            }
        }
    }

    ngAfterViewInit() {
        if (this.postdata['TEXT'] && this.postdata['EDIT_POST']) {
            this.hidePlaceHolder = false;
            (<HTMLElement> document.getElementById('shareText')).innerHTML = this.postData.decodeURIPostData(this.postdata['TEXT']).trim();
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
        this.setArticleClass = this._getArticleImage.findArticleImageService(aritcleImageParentNodeWidth, aritcleImageParentNodeHeight, articleImageWidth, articleImageHeight  );

    }
    getImgUrl(index) {
        var imgUrl = "url('" + index + "')";
        return imgUrl;

    }


    sharelinkpostviewhide() {
        this.sharelinkpostscreendiv.emit(false);
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }
    //    savedpost(){
    //        if(this.saveCondition==false){
    //            this.savepagepopup = !this.savepagepopup ;
    //        }else{
    //            this.putUserPostUnsaved();
    //        }
    //     }

    checkData() {
        var data = (<HTMLElement> document.getElementById('shareText'));
        if (data.innerText.length == 0) {
            this.hidePlaceHolder = true;
        } else {
            this.hidePlaceHolder = false;
        }
    }

    sharePost() {

        this.showPreloader = true;
        this.showText = false;
        // var postData = this.postData.postDataManipulation('shareText');
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
        // if (this.hidePlaceHolder) {
        //     sharePost['pdt'] = '';
        // }
        sharePost['shrptyp'] = this.postTyp;
        sharePost['shruid'] = this.u_id;
        sharePost['iid'] = this.tagsArr.join();


        this._constantService.fetchDataApi(this._constantService.getSharePostServiceUrl(),sharePost).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this._constantService.showToast("Post has been shared successfully", "", "1");
                if (this.postdata['EDIT_POST']) {
                    window.location.reload();
                    return;
                }

                this.showPreloader = false;
                this.sharelinkpostscreendiv.emit(true);


                let body1 = document.getElementsByTagName('body')[0];
                body1.classList.remove("body-overflow");
            } else if (status == this._constantService.error_token) {
                this.showPreloader = false;
                this.showText = true;
                this._constantService.clearUserInfo();
                this._router.navigate(['']);
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;
            } else {
                this.showPreloader = false;
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
    showPost(index) {
        this.shareLinkPost = index;
    }

    linkpostPic(){
      this.image_path = "";
    }

    getUrl(index) {
        if(index){
        var imgUrl = "url('"+index+"')";
        return imgUrl;
       }
       else{
          this.image_path = "";
          return this.image_path;
       }
    }
    onFocusInput(){
        this.hidePlaceHolder=true;
        document.getElementsByClassName("popup_background_view")[0].scrollTo(0,0);

    }
}
