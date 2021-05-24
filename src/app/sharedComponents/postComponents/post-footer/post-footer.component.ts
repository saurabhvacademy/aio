import { Component, Input, OnInit, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { LocalDataService } from 'src/app/services/local-data.service';
import { PostdataService } from 'src/app/services/postdata.service';
import { ConstantService } from 'src/app/services/constant.service';
import { Router } from '@angular/router';
import { CommentComponent } from "./../commentView/comment.component";
import { EncryptionService } from 'src/app/services/encryption.service';

@Component({
  selector: 'app-post-footer',
  templateUrl: './post-footer.component.html',
  styleUrls: ['./post-footer.component.scss']
})
export class PostFooterComponent implements OnInit {
  post_id: any;
  u_id: any;
  isSharePostList: boolean = false;
  postPublicShareLink: string;
  sharetextpostviewsec: boolean = false;
  arr: any;
  userLikeShareList = {};
  shareLikeShareStatus = false;
  impLikeShareStatus = false;
  dataConf = {};
  openConfirmation: boolean = false;
  importantCondition = false;
  like: any;
  vart: boolean = true;
  isCommentHit: boolean = false;
  showCommentImg = 1;
  c_data: string = "";
  comment_image: any;
  hideSpan = 1;
  latestComment: any;
  viewCommentList: boolean;
  factory: any;
  uuid = "";
  showPreloader: boolean = false;
  ref: any;
  _ref: any;
  file_path: any;
  commImageDimns: any;
  image_upload_url = '';
  comment: number;
  @ViewChild('container', { read: ViewContainerRef }) container;
  lastCommentId = 0;
  commentPresent: boolean = false;
  commentData: string;
  profilePicPath: any = "";
  sharePostData: any;
  textAreaFooterInput: any;


  constructor(
    public _localDataService: LocalDataService,
    public _constantService: ConstantService,
    public _router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    public _encryptionServices: EncryptionService,
    public postdata: PostdataService

  ) { }

  @Input() footerData: any = {};
  ngOnInit(): void {
    this.profilePicPath = this._localDataService.getProfilePicUrl();
    console.log(this.footerData);
    this.u_id = this.footerData['u_id'];
    this.post_id = this.footerData['post_id'];
    this.postPublicShareLink = this._constantService.staticPostShareLink + this.footerData.arr['USER_POST_ID'] + '/' + this.footerData.arr['URL'];
    this.arr = this.footerData.arr;
    if (this.arr['LIKED'] == 1) {
      this.importantCondition = !this.importantCondition;
    }
    this.like = this.footerData.like;
    this.latestComment = this.arr['LT_COMM_DATA'];
    if (Object.keys(this.latestComment).length != 0) {
      this.viewCommentList = true;
    } else { this.viewCommentList = false; }
    this.comment = this.arr['COMMENT'];
    if (this.comment > 1) {
      this.commentPresent = true;
    } else { this.commentPresent = false; }
  }
  showSharePostList(event) {
    let id = this.u_id + '_' + this.post_id + '_textShareList';
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
  sharePostview() {
    this.sharePostData = JSON.parse(JSON.stringify(this.footerData));
    this.sharePostData.EDIT_POST = false;

    this.sharetextpostviewsec = true;
    let body = document.getElementsByTagName('body')[0];
    body.classList.add("body-overflow");
  }
  sharetextpostparenthide(sharetextpara) {
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove("body-overflow");
    this.sharetextpostviewsec = false;
    if (sharetextpara) {
      this.footerData.share += 1;
    }
    this.sharePostData = {};
  }
  hideSocialList() {
    let id = this.u_id + '_' + this.post_id + '_textShareList';
    if (document.getElementById(id)) {
      document.getElementById(id).style.display = "none";
      document.getElementById(id).style.top = "0px";
    }

    this.isSharePostList = false;
  }

  CloseViewAll($event) {
    this.impLikeShareStatus = false;
    this.shareLikeShareStatus = false;
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove("body-overflow");
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
      this._constantService.fetchDataApi(this._constantService.putUserPostImportantServiceUrl(), importData).subscribe(data => {
        var responseData: any = data;
        var status = responseData.STATUS;
        if (status == this._constantService.success_msg) {
          this.vart = true;
          this.importantCondition = !this.importantCondition;
          if (this.importantCondition) {
            this.like++;
          } else {
            this.like--;
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
  closePopup(event) {
    if (event['error'] == false) {
      this.openConfirmation = false;
    }
  }
  impLikeShareFn() {
    this.userLikeShareList['postId'] = this.post_id;
    this.userLikeShareList['type'] = 1;
    this.userLikeShareList['count'] = this.like;
    this.impLikeShareStatus = !this.impLikeShareStatus;
    let body = document.getElementsByTagName('body')[0];
    body.classList.add("body-overflow");
  }
  autoFocus() {
    var id = this.u_id + '_' + this.post_id + '_comm';
    if ((<HTMLInputElement>document.getElementById(id)).innerText == this._constantService.commentPlaceHolder) {
      (<HTMLInputElement>document.getElementById(id)).innerText = '';
    }
    (<HTMLInputElement>document.getElementById(id)).focus();
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
  addComment(event) {
    this.textAreaFooterInput = document.getElementById(this.u_id + "_" + this.post_id + "_comm");
    this.textAreaFooterInput.style.height = 'auto';
    if (this.textAreaFooterInput.scrollHeight <= 40) {
      this.textAreaFooterInput.style.height = 20 + 'px';
    }
    this.textAreaFooterInput.style.height = this.textAreaFooterInput.scrollHeight + 'px';
    if (event.keyCode == 13 && event.shiftKey) {
      let val = document.getElementById(this.u_id + "_" + this.post_id + "_comm").innerHTML;
      val = val + "<br>";
      document.getElementById(this.u_id + "_" + this.post_id + "_comm").innerHTML = val;
      document.getElementById(this.u_id + "_" + this.post_id + "_comm").focus();
    } else if (event.keyCode == 13 && !event.ctrlKey && !event.shiftKey) {
      if (this.isCommentHit) {
        return false;
      } else {
        this.isCommentHit = true;
      }
      if (event.keyCode == 13 && !event.ctrlKey && !event.shiftKey) {
        // this.c_data = this.postdata.postDataManipulation(event.target.id);
        this.c_data = this.commentData;

        if (this.c_data.length == 0 && this.comment_image == null) {
          event.preventDefault();
          return false;
        }
      }

      this.hideSpan = 0;
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


      if (this.isCommentHit == true) {
        this._constantService.fetchDataApi(this._constantService.putCommentServiceUrl(), comment).subscribe(data => {
          var responseData: any = data;
          var status = responseData.STATUS;
          if (status == this._constantService.success_msg) {
            this.commentData = '';
            this.textAreaFooterInput.style.height = 20 + 'px';
            this.showCommentImg = 1;
            this.comment_image = null;
            this.hideSpan = 1;
            var addComment = {};
            var date = new Date();
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
            this.ref.instance.parentRef = this._ref;
            this.ref.instance._ref = this.ref;
            event.target.innerHTML = this._constantService.commentPlaceHolder;
            event.target.classList.add("placeholdercolor");
            event.target.classList.remove("option_inputt", "setwdth");
            this.hideSpan = 1;
            this.uuid = "";
            this.file_path = "";
            window.getSelection().removeAllRanges();
            this.isCommentHit = false;
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

    }


  }
  // dele(event) {
  //     this.textAreaFooterInput.style.height = 'auto';
  //     this.textAreaFooterInput.style.height = this.textAreaFooterInput.scrollHeight + 'px';
  // }

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
    (<HTMLInputElement>document.getElementById(this.footerData.u_id+'_'+this.footerData.post_id+'_nci')).value = '';

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
  shareCountWallFxn() {
    if(this.footerData.arr.TYPE==4){
    this.userLikeShareList['postId'] = this.footerData.arr.SHARED_POST_ID;
    this.userLikeShareList['type'] = 2;
    this.userLikeShareList['count'] = this.footerData.share;
    this.shareLikeShareStatus = !this.shareLikeShareStatus;
    let body = document.getElementsByTagName('body')[0];
    body.classList.add("body-overflow");
    }else if(this.footerData.arr.TYPE==1){
      this.userLikeShareList['postId'] = this.footerData.arr.USER_POST_ID;
      this.userLikeShareList['type'] = 2;
      this.userLikeShareList['count'] = this.footerData.share;
      this.shareLikeShareStatus = !this.shareLikeShareStatus;
      let body = document.getElementsByTagName('body')[0];
      body.classList.add("body-overflow");
    }
    
  }
  // getProfilePic() {
  //   if (this._localDataService.getProfilePicUrl())
  //     return this._localDataService.getProfilePicUrl();
  //   else
  //     return this._constantService.profilePic()
  // }
      // sharePostview() {
  //   this.sharePostData=JSON.parse(JSON.stringify(this.footerData));
  //   this.sharePostData.EDIT_POST = false;

  //   this.sharetextpostviewsec = true;
  //   let body = document.getElementsByTagName('body')[0];
  //   body.classList.add("body-overflow");
  // }
  // sharetextpostparenthide(sharetextpara) {
  //   let body = document.getElementsByTagName('body')[0];
  //   body.classList.remove("body-overflow");
  //   this.sharetextpostviewsec = false;
  //   if (sharetextpara) {
  //     this.footerData.share += 1;
  //   }
  //   this.sharePostData={};
  // }


  

}
