import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {ConstantService} from './../../services/constant.service';
import {EncryptionService} from './../../services/encryption.service';
import {Router} from '@angular/router';
import {InternalMessageService} from './../../services/internal-message.service';


@Component({
    selector: 'app-confirmationpopup',
    templateUrl: './confirmationpopup.component.html',
    styleUrls: ['./confirmationpopup.component.scss', './../../modules/saved/saved.component.scss']
})
export class ConfirmationpopupComponent implements OnInit {
    @Output() closeComfirmPopupThread = new EventEmitter<any>();
    @Output() deleteReview = new EventEmitter<any>();
    @Output() deEnroll = new EventEmitter<any>();
    @Input() dataObj: any;
    @Input() savedFolderId: any;
    confirmPopupStatus = {};
    showText: boolean = true;
    isFromSaved: boolean = false;
    showPreloader: boolean = false;

    constructor(
        public _constantService: ConstantService,
        private _encrypt: EncryptionService,
        private router: Router,
        private _message: InternalMessageService
    ) {}

    ngOnInit() {
        if (this.savedFolderId) {
            this.isFromSaved = true;
        }
    }

    closeConfirmPopupFn() {
        this.confirmPopupStatus['closePopUpStatus'] = false;
        if (this.dataObj['type'] == 3) {
            this.confirmPopupStatus['conversationDelStatus'] = false;
        }
        if (this.dataObj['type'] == 0) {
            this.confirmPopupStatus['userConfirmation'] = false;
        }
        if (this.dataObj['type'] == 1) {
            this.confirmPopupStatus['delPostStatus'] = false;
        }
        if (this.dataObj['type'] == 2) {
            this.confirmPopupStatus['error'] = false;
        }
        if (this.dataObj['type'] == 5) {
            this.confirmPopupStatus['unfollowStatus'] = false;
        }
        if (this.dataObj['type'] == 6) {
            this.confirmPopupStatus['unfriendStatus'] = false;
        }
        if (this.dataObj['type'] == 7) {
            this.confirmPopupStatus['delReview'] = false;
        }
        if (this.dataObj['type'] == 8) {
            this.confirmPopupStatus['deEnroll'] = false;
        }
        this.closeComfirmPopupThread.emit(this.confirmPopupStatus);
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }

    deletePostConfirm() {
        this.showPreloader = true;
        this.showText = false;
        var deletePost = {};
        deletePost['token'] = this._constantService.getSessionDataBYKey('token');
        deletePost['token_param'] = {};
        deletePost['token_param']['device_type'] = 'w';
        deletePost['token_param']['host'] = '';
        deletePost['pid'] = this.dataObj['pid'];
        deletePost['ptyp'] = this.dataObj['ptyp'];

        this._constantService.fetchDataApi(this._constantService.getDeletePostServiceUrl(), deletePost).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.confirmPopupStatus['closePopUpStatus'] = false;
                this.confirmPopupStatus['delPostStatus'] = true;
                if (this.isFromSaved == true) {
                    this.confirmPopupStatus['savedPostDel'] = true;
                } else {
                    this.confirmPopupStatus['savedPostDel'] = false;
                }

                document.body.classList.remove("body-overflow");
                this.showPreloader = false;
                this.showText = true;
                setTimeout(() => {
                    var count = (document.getElementById(this.savedFolderId + "_count"));
                    if (count != null) {
                        if (parseInt(count.innerHTML) == 1) {
                            count.style.display = 'none';
                            count.innerHTML = (parseInt(count.innerHTML) - 1).toString();
                        } else {
                            count.innerHTML = (parseInt(count.innerHTML) - 1).toString();
                        }
                    }
                }, 100)
                this._constantService.callEmptyStateMethod();
                this.closeComfirmPopupThread.emit(this.confirmPopupStatus);
            } else if (status == this._constantService.error_token) {
                this._constantService.clearUserInfo();
                this.router.navigate(['']);
                this.showPreloader = false;
                this.showText = true;
            } else {
                this.showPreloader = false;
                this.showText = true;
                this.dataObj['error_msg'] = responseData.ERROR_MSG;
                this.dataObj['type'] = 2;
                this.confirmPopupStatus['closePopUpStatus'] = false;
                this.confirmPopupStatus['delPostStatus'] = false;
                this.confirmPopupStatus['error_msg'] = responseData.ERROR_MSG;
                this.closeComfirmPopupThread.emit(this.confirmPopupStatus);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });
    }

    unfollowConfirm() {
        this.showPreloader = true;
        this.showText = false;
        var followUnfollow = {};
        followUnfollow['token'] = this._constantService.getSessionDataBYKey('token');
        followUnfollow['token_param'] = {};
        followUnfollow['token_param']['device_type'] = 'w';
        followUnfollow['token_param']['host'] = '';
        followUnfollow['pg_uuid'] = this.dataObj['pageId'];

        this._constantService.fetchDataApi(this._constantService.getPageUnFollowServiceUrl(), followUnfollow).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                this.showPreloader = false;
                this.showText = true;
                this.confirmPopupStatus['closePopUpStatus'] = false;
                this.confirmPopupStatus['unfollowStatus'] = true;
                this.closeComfirmPopupThread.emit(this.confirmPopupStatus);
            } else if (status == this._constantService.error_token) {
                this._constantService.clearUserInfo();
                this.router.navigate(['']);
                this.showPreloader = false;
                this.showText = true;
            } else {
                this.showPreloader = false;
                this.showText = true;
                this.dataObj['error_msg'] = responseData.ERROR_MSG;
                this.dataObj['type'] = 2;
                this.confirmPopupStatus['closePopUpStatus'] = false;
                this.confirmPopupStatus['delPostStatus'] = false;
                this.closeComfirmPopupThread.emit(this.confirmPopupStatus);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });
    }


    unfriendConfirm() {
        this.showPreloader = true;
        this.showText = false;
        var unfriend = {};
        unfriend['token'] = this._constantService.getSessionDataBYKey('token');
        unfriend['token_param'] = {};
        unfriend['token_param']['device_type'] = 'w';
        unfriend['token_param']['host'] = '';
        unfriend['conrecid'] = this.dataObj['userId'];

        this._constantService.fetchDataApi(this._constantService.getConnectionUnFriend(), unfriend).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                this.showPreloader = false;
                this.showText = true;
                this.confirmPopupStatus['closePopUpStatus'] = false;
                this.confirmPopupStatus['unfriendStatus'] = true;
                var f_id = this._constantService.getFriendsId().split(",");
                var i = f_id.indexOf(this.dataObj['userId']);
                f_id.splice(i, 1);
                this._constantService.setFriendsId(f_id.toString());

                this.closeComfirmPopupThread.emit(this.confirmPopupStatus);
            } else if (status == this._constantService.error_token) {
                this._constantService.clearUserInfo();
                this.router.navigate(['']);
                this.showPreloader = false;
                this.showText = true;
            } else {
                this.showPreloader = false;
                this.showText = true;
                this.dataObj['error_msg'] = responseData.ERROR_MSG;
                this.dataObj['type'] = 2;
                this.confirmPopupStatus['closePopUpStatus'] = false;
                this.confirmPopupStatus['delPostStatus'] = false;
                this.closeComfirmPopupThread.emit(this.confirmPopupStatus);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });
    }


    deleteTrailConfirm() {
        this.showPreloader = true;
        this.showText = false;
        var deleteConversation = {};
        deleteConversation['token'] = this._constantService.getSessionDataBYKey('token');
        deleteConversation['token_param'] = {};
        deleteConversation['token_param']['device_type'] = 'w';
        deleteConversation['token_param']['host'] = '';
        deleteConversation['msgtid'] = this.dataObj['msgtrailId'];

        this._constantService.fetchDataApi(this._constantService.getDeleteConversationServiceUrl(), deleteConversation).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.showPreloader = false;
                this.showText = true;
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.confirmPopupStatus['closePopUpStatus'] = false;
                this.confirmPopupStatus['conversationDelStatus'] = true;
                this.closeComfirmPopupThread.emit(this.confirmPopupStatus);
            } else if (status == this._constantService.error_token) {
                this.showPreloader = false;

                this.showText = true;
                this._constantService.clearUserInfo();
                this.router.navigate(['']);
            } else {
                this.showPreloader = false;

                this.showText = true;
                this.dataObj['error_msg'] = responseData.ERROR_MSG;
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });
    }

    sessionLogout() {
 
        this._constantService.clearUserInfo();
        this.router.navigate(['']);
        this.closeComfirmPopupThread.emit(false);
    }

    delReviewConf() {
        this.deleteReview.emit(true);
    }

    deEnrollCourse() {
        if (this.dataObj['type'] == 8) {
            this.confirmPopupStatus['deEnroll'] = true;
        }
        this.closeComfirmPopupThread.emit(this.confirmPopupStatus);
    }

    usrConfirmation() {
        this.confirmPopupStatus['closePopUpStatus'] = false;
        this.confirmPopupStatus['userConfirmation'] = true;
        this.closeComfirmPopupThread.emit(this.confirmPopupStatus);
    }
}
