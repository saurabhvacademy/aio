import {Component, OnInit,  Input } from '@angular/core';
import {Router} from '@angular/router';
import {EncryptionService} from './../../../services/encryption.service';
import {ConstantService} from './../../../services/constant.service';
import {PostdataService} from './../../../services/postdata.service';

@Component({
    selector: 'app-pagenotification',
    templateUrl: './pagenotification.component.html',
    styleUrls: ['./pagenotification.component.scss', './../../../sharedComponents/peopleyouknow/peopleyouknow.component.scss', './../../notification/notification.component.scss']
})
export class PagenotificationComponent implements OnInit {
    count = 1;
    secWidth = 0;
    current_year;
    t: string;
    profile_path = "";
    notification = [];
    lastNoitificationId = 0;
    continueScroll: boolean = false;
    dataConf = {};
    openConfirmation: boolean = false;
    loadNotifications: boolean = true;
    @Input() pageId: string;
    constructor(
        public _constantService: ConstantService,
        private _router: Router,
        private _encryptionService: EncryptionService,
        private postData: PostdataService
    ) {}

    ngOnInit() {
        this.getPageNotification(this.count);
    }

    getPageNotification(count) {

        var notify = {};
        notify['token'] = this._constantService.getSessionDataBYKey('token');
        notify['token_param'] = {};
        notify['token_param']['device_type'] = 'w';
        notify['token_param']['host'] = '';
        notify['count'] = count;
        notify['pg_uuid'] = this.pageId;

        this._constantService.fetchDataApi(this._constantService.getPageNotification(), notify).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            this.profile_path = responseData.PP_PATH;
            if (status == this._constantService.success_msg) {
                var notifyArr = responseData.NOTIFICATIONS;

                // this.lastNoitificationId = notifyArr[notifyArr.length - 1].USER_NOTIFICATION_ID;
                if (notifyArr.length < 10) {
                    this.continueScroll = false;
                } else {
                    this.continueScroll = true;
                }
                for (var i = 0; i < notifyArr.length; i++) {
                    
                    
                    if (notifyArr[i].TYPE == "Page_Create") {
                        if (notifyArr[i].PROFILE_PHOTO_PATH == "" || notifyArr[i].PROFILE_PHOTO_PATH == undefined || notifyArr[i].PROFILE_PHOTO_PATH == null) {
                            if (notifyArr[i].PAGE_TYPE == 0) {
                                notifyArr[i].PROFILE_PIC_PATH = this._constantService.defaultPageIndImgPath;
                            } else if (notifyArr[i].PAGE_TYPE == 1) {
                                notifyArr[i].PROFILE_PIC_PATH = this._constantService.defaultPageCollgImgPath;
                            }

                        } else {
                            notifyArr[i].PROFILE_PIC_PATH = notifyArr[i].PROFILE_PHOTO_PATH + "profile/" + notifyArr[i].PAGE_UUID + "_60x60.png";
                        }
                    } else if (notifyArr[i].TYPE == "Page_Course") {
                        notifyArr[i].PROFILE_PIC_PATH = notifyArr[i].PROFILE_PHOTO_PATH + "profile/" + notifyArr[i].SENDER_ID + "_60x60.png";

                    } else if (notifyArr[i].TYPE == "Course") {
                        if (notifyArr[i].COVER_TYPE == 1) {
                            notifyArr[i].PROFILE_PIC_PATH = notifyArr[i].COVER_PHOTO_PATH;
                        } else {
                            notifyArr[i].PROFILE_PIC_PATH = notifyArr[i].COVER_PHOTO_PATH + "cover/" + notifyArr[i].SENDER_ID + "_1235x330.png";
                        }
                    }else if(notifyArr[i].TYPE =="Page_Post"){

                        notifyArr[i].PROFILE_PIC_PATH = notifyArr[i].PROFILE_PHOTO_PATH + "profile/" + notifyArr[i].PAGE_UUID + "_60x60.png";

                    } else {
                        notifyArr[i].PROFILE_PIC_PATH = notifyArr[i].PROFILE_PHOTO_PATH + "profile/" + notifyArr[i].USER_ID + "_60x60.png";
                    }
                    
                    
                    
                    notifyArr[i].TEXT = this.postData.decodeURIPostData(notifyArr[i].TEXT);
                    // if (notifyArr[i].SEEN == 0) {
                    //     notifyArr[i].STATUS_CLASS = "unread";
                    // } else {
                    //     notifyArr[i].STATUS_CLASS = "";
                    // }
                    // if (notifyArr[i].TYPE === "System Update") {
                    //     notifyArr[i].CLASS = "nf-interest";
                    // } else if (notifyArr[i].TYPE === "Question" || notifyArr[i].TYPE === "Question Response") {
                    //     notifyArr[i].CLASS = "nf-ques";
                    // } else if (notifyArr[i].TYPE === "Post") {
                    //     notifyArr[i].CLASS = "nf-post";
                    // } else if (notifyArr[i].TYPE === "Registration") {
                    //     notifyArr[i].CLASS = "nf-interest";
                    // } else if (notifyArr[i].TYPE === "Security Alert") {
                    //     notifyArr[i].CLASS = "nf-pass";
                    // } else if (notifyArr[i].TYPE === "Verification") {
                    //     if (notifyArr[i].TYPE_ID == 1) {
                    //         notifyArr[i].CLASS = "nf-email";
                    //     } else if (notifyArr[i].TYPE_ID == 2) {
                    //         notifyArr[i].CLASS = "nf-mobile";
                    //     }
                    // } else if (notifyArr[i].TYPE === "Comment") {
                    //     notifyArr[i].CLASS = "nf-comment";
                    // } else if (notifyArr[i].TYPE === "Page" || notifyArr[i].TYPE === "Page_Create") {
                    //     notifyArr[i].CLASS = "nf-page";
                    // }
                    // else if (notifyArr[i].TYPE === "Page_Create") {
                    //     notifyArr[i].CLASS = "nf-interest";
                    // } else if (notifyArr[i].TYPE === "Course") {
                    //     notifyArr[i].CLASS = "nf-page";
                    // }
                    if (notifyArr[i].SEEN == 0) {
                        notifyArr[i].STATUS_CLASS = "unread_mass";
                    } else {
                        notifyArr[i].STATUS_CLASS = "";
                    }
                    if (notifyArr[i].TYPE === "System Update") {
                        notifyArr[i].CLASS = "nf-interest";
                    } else if (notifyArr[i].TYPE === "Question" || notifyArr[i].TYPE === "Question Response") {
                        notifyArr[i].CLASS = "nf-ques";
                    } else if (notifyArr[i].TYPE === "Post") {
                        notifyArr[i].CLASS = "nf-post";
                    } else if (notifyArr[i].TYPE === "Connection") {
                        notifyArr[i].CLASS = "nf-con-req";
                    } else if (notifyArr[i].TYPE === "Registration") {
                        notifyArr[i].CLASS = "nf-interest";
                    } else if (notifyArr[i].TYPE === "Security Alert") {
                        notifyArr[i].CLASS = "nf-pass";
                    } else if (notifyArr[i].TYPE === "Verification") {
                        if (notifyArr[i].TYPE_ID == 1) {
                            notifyArr[i].CLASS = "nf-mail";
                        } else if (notifyArr[i].TYPE_ID == 2) {
                            notifyArr[i].CLASS = "nf-mobile";
                        }
                    } else if (notifyArr[i].TYPE === "Comment") {
                        notifyArr[i].CLASS = "nf-comment";
                    } else if (notifyArr[i].TYPE === "Page") {
                        notifyArr[i].CLASS = "nf-page";
                    } else if (notifyArr[i].TYPE === "Page_Invite") {
                        notifyArr[i].CLASS = "nf-page";
                    } else if (notifyArr[i].TYPE === "Page_Post") {
                        notifyArr[i].CLASS = "nf-page";
                    } else if (notifyArr[i].TYPE === "Page_Question") {
                        notifyArr[i].CLASS = "nf-page";
                    } else if (notifyArr[i].TYPE === "Page_BroadcastMsg") {
                        notifyArr[i].CLASS = "nf-page";
                    } else if (notifyArr[i].TYPE === "Course") {
                        notifyArr[i].CLASS = "nf-page";
                    } else if (notifyArr[i].TYPE === "Page_Course") {
                        notifyArr[i].CLASS = "nf-page";
                    }
                }
                this.notification.push.apply(this.notification, notifyArr);
                this.loadNotifications = false; // for preloader
            } else if (status == 'error_token') {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
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
        } else {
            if (event) {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;
            }
        }
    }

    onScrollDown() {
        if (this.continueScroll) {
            this.count++;
            this.getPageNotification(this.count);
        }
    }

    updateProfilePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }

    goToPost(i) {
        if (this.notification[i].TYPE === "Comment" || this.notification[i].TYPE === "Post" || this.notification[i].TYPE === "Question" || this.notification[i].TYPE === "Question Response" || this.notification[i].TYPE === "Page_Post" || this.notification[i].TYPE === "Page_Question") {
            //this._constantService.setPostId(this.notification[i].TYPE_ID);
            this._constantService.setSessionJsonPair('post_id', this.notification[i].TYPE_ID);
            if (this.notification[i].TYPE_ID) {
                this._router.navigate(['post/' + this.notification[i].TYPE_ID]);
            }
        } else if (this.notification[i].TYPE === "Page_Invite" || this.notification[i].TYPE == 'Page') {
            this._router.navigate(['page/' + this.notification[i].TYPE_ID]);
        } else if (this.notification[i].TYPE === "Connection") {
            this._router.navigate(['profile/' + this.notification[i].USER_NAME]);
        } else if (this.notification[i].TYPE == 'Course' || this.notification[i].TYPE == 'Page_Course') {
            if (this.notification[i].IS_ADMIN == "0") {
                this._router.navigate(['course/' + this.notification[i].COURSE_URL]);
            } else if (this.notification[i].IS_ADMIN == "1") {
                if (this.notification[i].PUBLISH != 3) {
                    this._router.navigate(['addcourse/' + this.notification[i].TYPE_ID]);
                }
            }
            return false;
        }
    }
}
