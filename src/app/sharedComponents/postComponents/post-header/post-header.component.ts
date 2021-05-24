import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalDataService } from 'src/app/services/local-data.service';
import { ConstantService } from 'src/app/services/constant.service';
import { Router } from '@angular/router';
import { PostdataService } from 'src/app/services/postdata.service';

@Component({
  selector: 'app-post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.scss']
})
export class PostHeaderComponent implements OnInit {
  savepagepopup = false;
  arr: any=[];
  dataConf = {};
  _ref: any;
  openConfirmation: boolean = false;
  postMenu = false;
  editTextPost = false;
  editPostId: string;
  postPublicShareLink = '';
  reportpopup = false;
  ConfirmDelete: boolean = false;
  @Output() deletePostEvent = new EventEmitter<any>();
  editSharedPost: boolean;
  sharetextpostviewsec: boolean;
  sharedHeaderData: any;

  constructor(
    public _localDataService: LocalDataService,
    public _constantService: ConstantService,
    public _router: Router,
    public postdata: PostdataService


  ) { }

  @Input() headerData: any = {};

  ngOnInit(): void {
    console.log("INIT OF POST", this.headerData)
    this.arr = this.headerData.arr;
    if(this.arr.TYPE==4){
    this.postPublicShareLink = this._constantService.staticPostShareLink + this.arr['USER_POST_ID'];
    } else if(this.arr.TYPE==1){
    this.postPublicShareLink = this._constantService.staticPostShareLink + this.arr['USER_POST_ID'] + '/' + this.arr['URL'];
    }
    this.editPostId = this.headerData.u_id + ":" + this.headerData.post_id + ":1";
  }


  savedpost() {
    if (this.headerData.saveCondition == false) {
      this.savepagepopup = !this.savepagepopup;
      let body = document.getElementsByTagName('body')[0];
      body.classList.add("body-overflow");
    } else {
      this.putUserPostUnsaved();
    }
  }

  putUserPostUnsaved() {
    var updatePostUnsaved = {};
    updatePostUnsaved['token'] = this._constantService.getSessionDataBYKey('token');
    updatePostUnsaved['token_param'] = {};
    updatePostUnsaved['token_param']['device_type'] = 'w';
    updatePostUnsaved['token_param']['host'] = '';
    updatePostUnsaved['sfldid'] = this.headerData.savedFolderId;
    updatePostUnsaved['pid'] = this.headerData.post_id;


    this._constantService.fetchDataApi(this._constantService.putUserPostUnsaved(), updatePostUnsaved).subscribe(data => {
      var responseData: any = data;
      var status = responseData.STATUS;
      if (status == this._constantService.success_msg) {
        this._constantService.showToast("Unsaved successfully", "Post", "1");

        this.headerData.saveCondition = false;
        var herf = this._router.url;
        var urlArr = herf.split("/");
        if (urlArr[1] == "saved") {
          setTimeout(() => {
            var count = (document.getElementById(this.headerData.savedFolderId + "_count"));
            if (count != null) {
              if (parseInt(count.innerHTML) == 1) {
                count.style.display = 'none';
                count.innerHTML = (parseInt(count.innerHTML) - 1).toString();
              } else {
                count.innerHTML = (parseInt(count.innerHTML) - 1).toString();
              }
            }
          }, 100)
          this._ref.destroy();
        }
        this._constantService.callEmptyStateMethod();
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
  closePopup(event) {
    if (event['error'] == false) {
      this.openConfirmation = false;
    }
  }

  editPost(headerData) {
    if (headerData.arr.TYPE == 1) {
      this.editTextPost = true;
      this.headerData['EDIT_POST'] = true;
      this.sharedHeaderData = JSON.parse(JSON.stringify(this.headerData));
    } else if (headerData.arr.TYPE == 4) {
      this.headerData['EDIT_POST'] = true;
      this.sharedHeaderData = JSON.parse(JSON.stringify(this.headerData));
      this.sharetextpostviewsec = true;
    }
    let body = document.getElementsByTagName('body')[0];
    body.classList.add("body-overflow");
  }
  textPostEditClose(event) {
    this.editTextPost = event;
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove("body-overflow");
  }
  report() {
    this.reportpopup = true;
    let body = document.getElementsByTagName('body')[0];
    body.classList.add("body-overflow");
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
  DeletePostCnf() {
    this.ConfirmDelete = true;
    this.dataConf['msg'] = "Post Deletion"
    this.dataConf['error_msg'] = "Are you sure about deleting this feed post?";
    this.dataConf['type'] = 1;
    this.dataConf['pid'] = this.headerData.post_id;
    this.dataConf['ptyp'] = 1;
    let body = document.getElementsByTagName('body')[0];
    body.classList.add("body-overflow");
  }
  CloseDeleteConfirm(event) {
    this.deletePostEvent.emit(event);
    this.ConfirmDelete = false;
  }
  follow() {
    if (this.headerData.followme == false) {
      this._constantService.followUnfollow(0, this.headerData.arr.PAGE_UUID);
      this.headerData.followme = true;
      this.headerData.hideBtn = true;
      setTimeout(() => {
        this.headerData.arr.PAGE_FOLLOW_STATUS = '1';
      }, 5000);
    }
  }
  unfollow() {
    if (this.headerData.followme == true) {
      this._constantService.followUnfollow(1, this.headerData.arr.PAGE_UUID);
      this.headerData.followme = false;
      this.headerData.hideBtn = false;
      this.headerData.arr.PAGE_FOLLOW_STATUS = '0';

    }
  }
  sharetextpostparenthide(sharetextpara) {
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove("body-overflow");
    this.sharetextpostviewsec = false;

  }
  routeTo(to) {
    if (to == 'profile') {
      if (this.headerData.isPagePost) {
        this._router.navigate(['/page/' + this.headerData.pg_id]);
      } else if (!this.headerData.pagePost) {
        this._router.navigate(['/profile/' + this.headerData.user_name]);
      }
    }else{
      this._router.navigate([to]);
    }
  }
}
