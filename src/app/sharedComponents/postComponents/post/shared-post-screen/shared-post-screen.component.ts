import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ConstantService } from '../../../../services/constant.service';
import { EncryptionService } from '../../../../services/encryption.service';
import { Router } from '@angular/router';
import { PostdataService } from '../../../../services/postdata.service';
@Component({
  selector: 'app-shared-post-screen',
  templateUrl: './shared-post-screen.component.html',
  //styleUrls: ['./sharetextpostview.component.scss']
  styleUrls: ['../postcommon.css', '../allpostcommon.css', './shared-post-screen.component.scss']
})

export class SharedPostScreenComponent implements OnInit {
  shareLinkPost: any = 1;
  postPublicShareLink: string;
  count = 0;
  openConfirmation: boolean = false;
  dataConf = {};
  @Output() sharescreentxtpostdiv = new EventEmitter<boolean>();
  @Input() postdata: any;
  @Output() postId = new EventEmitter();
  @Output() shrCount = new EventEmitter();

  loader: boolean = false;
  showText: boolean = true;
  sharepostviewtextpostdivhide: boolean = false;
  interestObj = {};
  tagsArr = [];
  full_name: string = "";
  time = "";
  post_data: string = "";
  DataView: boolean = false;
  profile_pic_path: string = "";
  user_name: string = "";
  post_id = 0;
  shrpost_id = 0;
  u_id = 0;
  postTyp = 0;
  followerCount = 0;
  hidePlaceHolder: boolean = true;
  date = new Date();
  pg_uuid = '';
  isPagePost: boolean = false;
  showIntArr: boolean = false;
  socialFbShareUrl;
  socialTeitterShareUrl;
  socialLinkedInShareUrl;
  socialTelegramUrl;
  sharedPostText = '';
  textAreaShareScreenInput: any;
  constructor(
    public _constantService: ConstantService,
    public _router: Router,
    public _encrypt: EncryptionService,
    public postData: PostdataService
  ) { }

  ngOnInit() {
    this.hidePlaceHolder = false;
    this.postPublicShareLink = this._constantService.staticPostShareLink + this.postdata.arr.URL;

    this.sharedPostText = this.postData.decodeURIPostData(this.postdata.arr.TEXT);
    if(!this.postdata.EDIT_POST){
      this.sharedPostText="";
    }

    this.socialFbShareUrl = "https://www.facebook.com/dialog/feed?app_id=" + this._constantService.facebookAppId + "&link=" + this.postPublicShareLink;
    this.socialTeitterShareUrl = "https://twitter.com/intent/tweet?text=''" + "&url=" + this.postPublicShareLink;
    this.socialLinkedInShareUrl = "https://www.linkedin.com/sharing/share-offsite/?url=" + this.postPublicShareLink;
    this.socialTelegramUrl = "https://telegram.me/share/url?url=" + this.postPublicShareLink;

    this.postTyp = this.postdata.arr['TYPE'];
    this.interestObj = JSON.parse(this._constantService.getSessionDataBYKey('interests'));
    this.tagsArr = this.postdata.arr['INTERESTS'];
    this.time = this.postdata.arr['ADD_DATE_TIME'];
    if (this.postdata.arr['TEXT'] && this.postdata.arr['EDIT_POST']) {
      this.hidePlaceHolder = false;
      setTimeout(() => {
        (<HTMLElement>document.getElementById('shareText')).innerText = this.postData.decodeURIPostData(this.postdata.arr['TEXT']).replace(/<!--bindings={\n  \"ng-reflect-ng-if\": \"false\"\n}-->\n/g, "");
      }, 1000);
    }
    if (this.post_data.length > 380) {
      this.DataView = !this.DataView;
    }
    if (this.postdata.arr['TYPE'] == 4) {
      this.postdata.arr = this.postdata.arr.SHARED_POST_DATA;

      this.post_id = 0;
      this.shrpost_id = this.postdata.arr['USER_POST_ID'];
      this.postTyp = this.postdata.arr['TYPE'];
      this.u_id = this.postdata.u_id;
      this.time = this.postdata.arr['ADD_DATE_TIME'];
      this.post_data = this.postData.decodeURIPostData(this.postdata.arr['TEXT']).replace(/<!--bindings={\n  \"ng-reflect-ng-if\": \"false\"\n}-->\n/g, "");
      this.full_name = this.postdata.arr['USER_FULL_NAME'];
      if (this.postdata.arr['PAGE_UUID'] != '' && this.postdata.arr['PAGE_UUID'] != null) {
        this.pg_uuid = this.postdata.arr['PAGE_UUID'];
        this.isPagePost = true;
        if (this.postdata.arr['PAGE_PROFILE_PHOTO_PATH'] != null && this.postdata.arr['PAGE_PROFILE_PHOTO_PATH'] != '') {
          this.profile_pic_path = this.postdata.arr['PAGE_PROFILE_PHOTO_PATH'] + "profile/" + this.postdata.arr['PAGE_UUID'] + "_60x60.png?v=" + this.postdata.arr['IMG_UPD_DT'];
        } else {
          if (this.postdata.arr['PAGE_TYPE'] == 0) {
            this.profile_pic_path = this._constantService.defaultPageIndImgPath;
          } else if (this.postdata.arr['PAGE_TYPE'] == 1) {
            this.profile_pic_path = this._constantService.defaultPageCollgImgPath;
          }
        }
        this.user_name = this.postData.decodeURIPostData(this.postdata.arr['TITLE']);
        this.followerCount = this.postdata.arr['PAGE_FOLLOW_COUNT'];
      } else {
        if (this.postdata.arr['PROFILE_PHOTO_PATH'] != null && this.postdata.arr['PROFILE_PHOTO_PATH'] != '') {
          this.profile_pic_path = this.postdata.arr['PROFILE_PHOTO_PATH'] + "profile/" + this.postdata.arr['USER_ID'] + "_60x60.png?v=" + this.postdata.arr['IMG_UPD_DT'];
        } else {
          this.profile_pic_path = this._constantService.defaultImgPath;
        }
        this.user_name = this.postdata.arr['USER_NAME'];
      }

    } else {
      this.post_id = 0;
      this.postTyp = this.postdata.arr['TYPE'];
      this.shrpost_id = this.postdata.arr['USER_POST_ID'];
      this.u_id = this.postdata.arr['USER_ID'];
      this.full_name = this.postdata.arr['USER_FULL_NAME'];
      this.time = this.postdata.arr['ADD_DATE_TIME'];
      this.post_data = this.postData.decodeURIPostData(this.postdata.arr['TEXT']).replace(/<!--bindings={\n  \"ng-reflect-ng-if\": \"false\"\n}-->\n/g, "");
      if (this.postdata.arr['PAGE_UUID'] != '' && this.postdata.arr['PAGE_UUID'] != null) {
        this.pg_uuid = this.postdata.arr['PAGE_UUID'];
        this.isPagePost = true;
        if (this.postdata.arr['PAGE_PROFILE_PHOTO_PATH'] != null && this.postdata.arr['PAGE_PROFILE_PHOTO_PATH'] != '') {
          this.profile_pic_path = this.postdata.arr['PAGE_PROFILE_PHOTO_PATH'] + "profile/" + this.postdata.arr['PAGE_UUID'] + "_60x60.png?v=" + this.postdata.arr['IMG_UPD_DT'];
        } else {
          if (this.postdata.arr['PAGE_TYPE'] == 0) {
            this.profile_pic_path = this._constantService.defaultPageIndImgPath;
          } else if (this.postdata.arr['PAGE_TYPE'] == 1) {
            this.profile_pic_path = this._constantService.defaultPageCollgImgPath;
          }
        }
        this.user_name = this.postData.decodeURIPostData(this.postdata.arr['TITLE']);
        this.followerCount = this.postdata.arr['PAGE_FOLLOW_COUNT'];
      } else {
        if (this.postdata.arr['PROFILE_PHOTO_PATH'] != null && this.postdata.arr['PROFILE_PHOTO_PATH'] != '') {
          this.profile_pic_path = this.postdata.arr['PROFILE_PHOTO_PATH'] + "profile/" + this.postdata.arr['USER_ID'] + "_60x60.png?v=" + this.postdata.arr['IMG_UPD_DT'];
        } else {
          this.profile_pic_path = this._constantService.defaultImgPath;
        }
        this.user_name = this.postdata.arr['USER_NAME'];
      }

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

  }
  // ngAfterViewChecked(){
  //   this.findInterestPos();
  // }



  sharetextpostviewhide() {
    this.sharescreentxtpostdiv.emit(false);
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove("body-overflow");
  }

  checkData() {
    var data = (<HTMLElement>document.getElementById('shareText'));
    if (data.innerText.length == 0 || data.innerText == "\n") {
      this.hidePlaceHolder = false;
      console.log("in true");
    } else {
      this.hidePlaceHolder = true;
      console.log("in false");

    }
  }

  sharePost() {

    let bodyy = document.getElementsByTagName('body')[0];
    bodyy.classList.add("body-overflow");

    // var postData = this.postData.postDataManipulation('shareText');
    if (this.sharedPostText) {
      this.sharedPostText = this.postData.postDataManipulationWithText(this.sharedPostText);
    } else {
      this.sharedPostText = '';

    }
    // if (this.sharedPostText == "") {
    //     return;
    // }
    this.showText = false;
    this.loader = true;
    var sharePost = {};
    sharePost['token'] = this._constantService.getSessionDataBYKey('token');
    sharePost['token_param'] = {};
    sharePost['token_param']['device_type'] = 'w';
    sharePost['token_param']['host'] = '';

    sharePost['shrpid'] = this.shrpost_id;


    sharePost['ptyp'] = 4;
    sharePost['pdt'] = this.postData.encodeURIPostData(this.sharedPostText).replace(/What's%20on%20your%20mind%3F/g, "");
    // if (this.hidePlaceHolder) {
    //     sharePost['pdt'] = '';
    // }
    sharePost['shrptyp'] = this.postTyp;
    if(!this.postdata.EDIT_POST){
      sharePost['pid']=0;
    }else if(this.postdata.EDIT_POST){
      sharePost['pid']=this.postdata.post_id;

    }
    sharePost['shruid'] = this.u_id;
    sharePost['iid'] = this.tagsArr.join();

    this._constantService.fetchDataApi(this._constantService.getSharePostServiceUrl(), sharePost).subscribe(data => {
      var responseData: any = data;
      var status = responseData.STATUS;
      if (status == this._constantService.success_msg) {
        this._constantService.showToast("Post has been shared successfully", "", "1");

        if (this.postdata.arr['EDIT_POST']) {
          window.location.reload();
          return;
        }
        this.count++;
        this.shrCount.emit(this.count);
        this.loader = false;
        this.showText = true;
        this.postId.emit(this._constantService.getSessionDataBYKey('u_id') + ":" + responseData.POSTID + ":4");
        this.sharescreentxtpostdiv.emit(true);
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
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
  pastedData(event) {
    this.postData.onPaste(event);
  }
  showPost(index) {
    this.shareLinkPost = index;
  }
  onFocusInput() {
    this.hidePlaceHolder = true;
    document.getElementsByClassName("popup_background_view")[0].scrollTo(0, 0);
  }
  addComment(event){
    this.textAreaShareScreenInput = document.getElementById("shareText");
    this.textAreaShareScreenInput.style.height = 'auto';
    if(this.textAreaShareScreenInput.scrollHeight<=45){
      this.textAreaShareScreenInput.style.height=22 + 'px';
    }
    this.textAreaShareScreenInput.style.height = this.textAreaShareScreenInput.scrollHeight + 'px';
  }
}
