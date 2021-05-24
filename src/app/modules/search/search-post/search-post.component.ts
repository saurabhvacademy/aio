import { Component, OnInit, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { PostdataService } from './../../../services/postdata.service';
import { ConstantService } from './../../../services/constant.service';
import { EncryptionService } from './../../../services/encryption.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-post',
  templateUrl: './search-post.component.html',
  host: { "(document:click)": "handleClick($event)" },
  styleUrls: ['./../../../sharedComponents/postComponents/textpost/textpost-component.scss', './../../../sharedComponents/postComponents/textpost/allpost.css'],
  providers: [PostdataService, ConstantService, EncryptionService]
})
export class SearchPostComponent implements OnInit {
  postData;
  userView: number;
  pageView: number;
  userName: any;
  time: any;
  viewType: number = 0;
  Text: any;
  USER_PROFILE: any;
  postId: any;
  saveCondition = false;
  savepagepopup = false;
  _ref: any;
  dataConf = {};
  savedFolderId: any;
  orgPostData: any;
  postmenu = false;
  imonclick = false;
  edittextpost = false;
  ConfirmDelete: boolean = false;
  openLoginPopup: boolean = false;

  reportpopup = false;
  followme: boolean = false;
  hideBtn: boolean = false;
  pg_uuid: any;
  my_profile: boolean = false;
  postPublicShareLink = '';
  isPagePost: boolean = false;
  DataView: boolean = false;
  seeLess: boolean = false;
  post_data: string = '';
  pageName: any;
  pageFllw: any;
  pageTime: any;
  page_Cover: any;
  defaultPageIndImgPath = "./assets/images/individual_profile.svg";
  defaultPageCollgImgPath = "./assets/images/organization_profile.svg";
  qustnTyp: boolean = false;
  @ViewChild('reportPopup', { read: ElementRef }) reportPopup: ElementRef;
  editPostId: string;
  openConfirmation: boolean;
  posttype: any;
  t: any;





  constructor(
    private _postData: PostdataService,
    public _constantService: ConstantService,
    public _encryptionServices: EncryptionService,
    public _router: Router,

  ) { }

  ngOnInit() {
    this.postPublicShareLink = this._constantService.staticPostShareLink + this.postData['USER_POST_ID'] + '/' + this.postData['URL'];

    this.postData.PAGE_UUID ? this.viewType = 1 : this.viewType = 0;
    this.posttype = this.postData['TYPE'];

    this.userName = this.postData['FIRST_NAME'] + " " + this.postData['LAST_NAME'];
    this.USER_PROFILE = this._constantService.createuserProfilePath(this.postData['PROFILE_PHOTO_PATH'], this.postData['USER_ID'], this.postData['IMG_UPD_DT']);
    if (this.postData['PAGE_PROFILE_PHOTO_PATH'] && this.postData['PAGE_UUID']) {
      this.page_Cover = this.postData['PAGE_PROFILE_PHOTO_PATH'] + 'profile/' + this.postData['PAGE_UUID'] + "_60x60.png?v=" + this.postData['IMG_UPD_DT'];
    } else {
      if (this.postData['TYPE'] == 0) {
        this.page_Cover = this.defaultPageIndImgPath;
      } else {
        this.page_Cover = this.defaultPageCollgImgPath;
      }
    }
    if (this.postData['TEXT']) {
      this.post_data = this._postData.decodeURIPostData(this.postData['TEXT']);
      this.post_data = this._postData.linkActivate(this.postData['TEXT']);
    }
    if (this.postData['IS_ADMIN']) {
      this.hideBtn = true;
    }
    if (this.post_data.length > 301) {
      this.DataView = !this.DataView;
      this.seeLess = this.DataView;
    }
    this.postId = this.postData['USER_POST_ID'];
    if (this.postData['PAGE_UUID'] != '' && this.postData['PAGE_UUID'] != null) {
      this.pg_uuid = this.postData['PAGE_UUID'];
      this.isPagePost = true;
    }
    this.my_profile = this.postData['MY_PROFILE'];
    if (this.postData['PAGE_FOLLOW_STATUS'] == 1) {
      this.followme = true;
      this.hideBtn = true;
    }
    if (this.postData.length > 301) {
      this.DataView = !this.DataView;
      this.seeLess = this.DataView;
    }
    this.pageName = this.postData['TITLE'];
    this.pageFllw = this.postData['PAGE_FOLLOW_COUNT'];
    this.pageTime = this.postData['ADD_DATE_TIME'];
    if (this.postData['TYPE'] == 3) {
      this.qustnTyp = true;
    }
    this.editPostId = this.postData['USER_ID'] + ":" + this.postId + ":1";


  }


  handleClick(event) {
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

  getOrgDataAndSave() {
    this.t = this._constantService.getSessionDataBYKey('token');
    if( this.t ){                                          ////////////****request sent *****//////////////////

    var postData = {};
    postData['token'] = this._constantService.getSessionDataBYKey('token');
    postData['token_param'] = {};
    postData['token_param']['device_type'] = 'w';
    postData['token_param']['host'] = '';
    postData['ques_str'] = '';
    postData['post_id'] = this.postId;
    this._constantService.fetchDataApi(this._constantService.getPublicPostDataWithTokenServiceUrl(), postData).subscribe(data => {
      var responseData:any = data;
      var status = responseData.STATUS;
      if (status == this._constantService.success_msg) {
        this.orgPostData = responseData.POST_DATA[0];

        if (this.saveCondition == false) {
          this.savepagepopup = !this.savepagepopup;
          let body = document.getElementsByTagName('body')[0];
          body.classList.add("body-overflow");
        } else {
          this.putUserPostUnsaved();
        }
      }
    });
  }else{
      this.loginpopupopen();
  }
}

  putUserPostUnsaved() {
    var updatePostUnsaved = {};
    updatePostUnsaved['token'] = this._constantService.getSessionDataBYKey('token');
    updatePostUnsaved['token_param'] = {};
    updatePostUnsaved['token_param']['device_type'] = 'w';
    updatePostUnsaved['token_param']['host'] = '';
    updatePostUnsaved['sfldid'] = this.savedFolderId;
    updatePostUnsaved['pid'] = this.postId;

    this._constantService.fetchDataApi(this._constantService.putUserPostUnsaved(), updatePostUnsaved).subscribe(data => {
      var responseData:any = data;
      var status = responseData.STATUS;
      if (status == this._constantService.success_msg) {
      this._constantService.showToast("Unsaved successfully","Post","1");

        this.saveCondition = false;
      }
    }, error => {
      var responseData = error;
      if (responseData.status == 500) {
        this._router.navigate(['500']);
      }
    });

  }
  postdropdown() {
    this.t = this._constantService.getSessionDataBYKey('token');
    if(this.t){
      this.postmenu = !this.postmenu;
      this.imonclick = true;
    }else{
      this.loginpopupopen();
    }
   
  }
  editPost() {
    this.edittextpost = true;
    let body = document.getElementsByTagName('body')[0];
    body.classList.add("body-overflow");
  }
  DeletePostCnf() {
    this.ConfirmDelete = true;
    this.dataConf['msg'] = "Post Deletion"
    this.dataConf['error_msg'] = "Are you sure about deleting this feed post?";
    this.dataConf['type'] = 1;
    this.dataConf['pid'] = this.postId;
    this.dataConf['ptyp'] = this.posttype;
    let body = document.getElementsByTagName('body')[0];
    body.classList.add("body-overflow");
  }
  reprts() {
    this.reportpopup = true;
    let body = document.getElementsByTagName('body')[0];
    body.classList.add("body-overflow");

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
  removePost(event) {
    if (event) {
      this._ref.destroy();
      this._constantService.callEmptyStateMethod();
    }
    this.reportpopup = false;
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove("body-overflow");
  }


  attemptQustn() {
    this._router.navigate(['/post/' + this.postId]);

  }
  textPostEditClose(event) {
    this.edittextpost = event;
    // this.popCancel.emit(true);
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove("body-overflow");
  }
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
  closePopup(event) {
    if (event['error'] == false) {
      this.openConfirmation = false;
    }
  }
  loginpopupopen() {
    // this.courseData['USER_FULL_NAME'] = this.courseTitle;
    // this.courseData['PROFILE_PIC_PATH'] = this.corsCoverPath;
    this.openLoginPopup = true;
    let body = document.getElementsByTagName('body')[0];
    body.classList.add("body-overflow");

}
closeLoginPopUp(event) {
  this.openLoginPopup = false;
  if (event['LOGIN']) {
      // this.withoutToken = false;
      //this._constantService.setPublicClickedUrl('course/' + this.Corsid);
      // this._constantService.setSessionJsonPair('publicClickedURL', 'course/' + this.CorsUrl);
  }
}
}
