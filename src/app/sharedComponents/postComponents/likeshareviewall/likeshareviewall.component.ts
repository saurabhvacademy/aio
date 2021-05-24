import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {ConstantService} from './../../../services/constant.service';
import {EncryptionService} from './../../../services/encryption.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-likeshareviewall',
    templateUrl: './likeshareviewall.component.html',
    styleUrls: ['./likeshareviewall.component.scss', './../textpost/allpost.css', './newlikeshareviewall.component.scss']
})
export class LikeshareviewallComponent implements OnInit {
    arr = [];
    u_id: any;
    IsRequest: number;
    userId: number;
    reqSent = false;
    config;
    date = new Date();
    @Output() closeViewAllThread = new EventEmitter<boolean>();
    @Output() sessionLogout = new EventEmitter<boolean>();
    @Input() data: Object;
    lstId = 0;
    userList = [];
    text = "";
    continueScroll: boolean = true;
    altName = "";
    userName: any;
    constructor(
        public _constantService: ConstantService,
        private _encrypt: EncryptionService,
        private _router: Router,

    ) {}

    ngOnInit() {
        this.userId = this._constantService.getSessionDataBYKey('u_id');
        if (this.data['type'] == 1) {
            // this.text = "<div> <span> <img src='assets/images/svg-three/post_icon/f05050/imp2.svg'> Important &nbsp; <span style='color: #f05050;'>"+this.data['count']+"</span></span>";
            this.getUserList(0);
        } else if (this.data['type'] == 2) {
            //            this.text = "<span> Shared &nbsp; <span style='color: #f05050;'>"+this.data['count']+"</span></span>";
            this.getUserList(0);
        }else if (this.data['type'] == 4) {
              //            this.text = "<span> Shared &nbsp; <span style='color: #f05050;'>"+this.data['count']+"</span></span>";
              this.impLikeShareFn();
          }
         else {
            //            this.text = "Liked";
            this.getUserImpOnReview(0);
        }

    }

    closeViewAll() {
        this.closeViewAllThread.emit(false);
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }
    // addscroll(){
    //   let body = document.getElementsByTagName('body')[0];
    //   body.classList.remove("body-overflow");
    // }

    onScrollDown() {
        if (this.continueScroll) {
            if (this.data['type'] == 3) {
                this.getUserImpOnReview(this.lstId);
            } else {
                this.getUserList(this.lstId);
            }
        }
    }

    getUserList(ids) {
       console.log("ayush sahu");
        var userList = {};
        userList['token'] = this._constantService.getSessionDataBYKey('token');
        userList['token_param'] = {};
        userList['token_param']['device_type'] = 'w';
        userList['token_param']['host'] = '';
        userList['lshr_pid'] = "";
        userList['limp_id'] = ids;
        userList['count'] = 10;
        userList['flow'] = 'd';
        userList['pid'] = this.data['postId'];

        
        var url = "";
        if (this.data['type'] == 1) {
            url = this._constantService.getUserListOnImpServiceUrl();
        } else if (this.data['type'] == 2) {
            url = this._constantService.getUserListOnshareServiceUrl();
        }

        this._constantService.fetchDataApi(url,userList).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {

                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                var arr = responseData.USERS_LIST;

                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].PROFILE_PHOTO_PATH == null) {
                        arr[i].PROFILE_PHOTO_PATH = this._constantService.defaultImgPath;
                    } else {
                        arr[i].PROFILE_PHOTO_PATH = arr[i].PROFILE_PHOTO_PATH + "profile/" + arr[i].USER_ID + "_120x120.png?v=" + responseData.IMG_UPD_DT
                    }
                    this.arr[i] = arr[i].USER_ID;
                }

                if (this.data['type'] == 1) {
                    this.lstId = arr[arr.length - 1].USER_IMPORTANT_ID;
                } else {
                    this.lstId = arr[arr.length - 1].SHARE_POST_ID;
                }

                if (arr.length == 0) {
                    this.continueScroll = false;
                } else {
                    this.continueScroll = true;
                }
                this.userList.push.apply(this.userList, arr);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    sendRequest(id, i) {
        var sendSuggestionRequest = {};
        sendSuggestionRequest['token'] = this._constantService.getSessionDataBYKey('token');
        sendSuggestionRequest['token_param'] = {};
        sendSuggestionRequest['token_param']['device_type'] = 'w';
        sendSuggestionRequest['token_param']['host'] = '';
        sendSuggestionRequest['conrecid'] = id;
        // var id = "sugg_" + event.target.id;
       

        this._constantService.fetchDataApi(this._constantService.getSendConnectionRequestServiceUrl(),sendSuggestionRequest).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //    (<HTMLElement> document.getElementById(id)).style.display = "none";
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.userList[i].ISREQSENT = 1;

            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            } else {
                alert(responseData.ERROR_MSG);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });

    }

    cancelFrndReq(id, i) {
        var cancelReq = {};
        cancelReq['token'] = this._constantService.getSessionDataBYKey('token');
        cancelReq['token_param'] = {};
        cancelReq['token_param']['device_type'] = 'w';
        cancelReq['token_param']['host'] = '';
        cancelReq['conrecid'] = id;
        console.log("cancelReq : ", cancelReq);
       
        this._constantService.fetchDataApi(this._constantService.getCancelFrndReqServiceUrl(),cancelReq).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.userList[i].ISREQSENT = 0;
            }
        })
    }

    acceptRequest(id, i) {
          console.log(id);
        var cancelReq = {};
        cancelReq['token'] = this._constantService.getSessionDataBYKey('token');
        cancelReq['token_param'] = {};
        cancelReq['token_param']['device_type'] = 'w';
        cancelReq['token_param']['host'] = '';
        console.log(id);
        cancelReq['conrecid'] = id;
        console.log(cancelReq['conrecid']);

       
        this._constantService.fetchDataApi(this._constantService.updateConnRecAcceptServiceUrl(), cancelReq).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.userList[i].ISFRIEND = 1;
            }
        })
    }


    getUserImpOnReview(ids) {
        var userList = {};
        userList['token'] = this._constantService.getSessionDataBYKey('token');
        userList['token_param'] = {};
        userList['token_param']['device_type'] = 'w';
        userList['token_param']['host'] = '';
        userList['lpg_rw_imp_id'] = ids;
        userList['pg_rw_rating_uuid'] = this.data['reviewId'];
        userList['count'] = 10;
        userList['flow'] = 'd';
        userList['pg_uuid'] = this.data['pg_uuid'];

        

        this._constantService.fetchDataApi(this._constantService.getUserImpOnRevieServiceUrl(),userList).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                var arr = responseData.PG_REVIEW_IMPORTANT_DATA;
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].PROFILE_PHOTO_PATH == null) {
                        arr[i].PROFILE_PHOTO_PATH = this._constantService.defaultImgPath;
                    } else {
                        arr[i].PROFILE_PHOTO_PATH = arr[i].PROFILE_PHOTO_PATH + "profile/" + arr[i].USER_OLD_ID + "_120x120.png?v=" + responseData.IMG_UPD_DT
                    }
                }
                if (arr.length == 0) {
                    this.continueScroll = false;
                } else {
                    this.continueScroll = true;
                }
                this.userList.push.apply(this.userList, arr);
                this.lstId = arr[arr.length - 1].PAGE_REVIEWS_RATINGS_IMPORTANT_ID;
            }
        })
    }



    removeClass(userName,userID) {
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
        this._constantService.setSessionJsonPair('fom_res', 1);
        this._constantService.setSessionJsonPair('user_name', userName);
        this._constantService.setSessionJsonPair('friend_user_id', userID);


    }

    impLikeShareFn() {
        var importData = {};
        importData['token'] = this._constantService.getSessionDataBYKey('token');
        importData['token_param'] = {};
        importData['token_param']['device_type'] = 'w';
        importData['token_param']['host'] = '';
        importData['cors_uuid'] = this.data['corsId'];
        importData['cors_rw_rating_uuid'] =  this.data['postId'];
        importData['count'] = 1;
        importData['r_count'] = 10;

        // if (this.importantCondition) {
        //     importData['status'] = 1;
        // } else {
        //     importData['status'] = 0;
        // }

      
        this._constantService.fetchDataApi(this._constantService.getCourseReviewRatingUrl(),importData).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {

              var arr = responseData.COURSE_REVIEW_IMPORTANT_DATA;
              for (var i = 0; i < arr.length; i++) {
                  if (arr[i].PROFILE_PHOTO_PATH == null) {
                      arr[i].PROFILE_PHOTO_PATH = this._constantService.defaultImgPath;
                  } else {
                    arr[i].PROFILE_PHOTO_PATH = arr[i].PROFILE_PHOTO_PATH + "profile/" + arr[i].USER_ID + "_120x120.png?v=" + responseData.IMG_UPD_DT;
                  }
                  arr[i]['USER_FULL_NAME'] = arr[i]['FIRST_NAME'] + arr[i]['LAST_NAME'];
                  arr[i]['USER_NAME'] = arr[i]['USER_NAME'];

              }
                   this.data['count'] = responseData.TOTAL_IMPORTANT_COUNT;
              this.userList.push.apply(this.userList, arr);
              this.lstId = arr[arr.length - 1].PAGE_REVIEWS_RATINGS_IMPORTANT_ID;
                // this.importantCondition = !this.importantCondition;


            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }
    ngOnDestroy(){
      let body = document.getElementsByTagName('body')[0];
      body.classList.remove("body-overflow");
    }

    clearall(){
        console.log("in");
    }
}
