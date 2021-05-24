import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ConstantService} from './../../../services/constant.service';
import {EncryptionService} from './../../../services/encryption.service';
import {PostdataService} from './../../../services/postdata.service';

@Component({
    selector: 'app-invite-live-streams',
    templateUrl: './invite-live-streams.component.html',
    styleUrls: ['./invite-live-streams.component.scss', './../../page/upcominglivestreams/upcominglivestreams.component.scss']
})
export class InviteLiveStreamsComponent implements OnInit {
    timerArr = [];
    liveClassInvites: any;
    isInvitepresent: boolean = false;
    remaindershow: boolean = false;
    config: any;
    userId;
    pendingStream='';
    @Output() messageEvent = new EventEmitter<string>();

    constructor(
        public _constantService: ConstantService,
        public _encrypt: EncryptionService,
        public _router: Router,
        private _postService: PostdataService
    ) {}

    ngOnInit() {
        this.getMentorInvites();
        this.userId = this._constantService.getSessionDataBYKey('username');
        console.log(this.userId);
    }

    ngOnDestroy(){
        this.timerArr.forEach((timer)=>{
            clearInterval(timer);
        })
    }

    showdrop() {
        this.remaindershow = !this.remaindershow;
    }
  viewAll(){
    this._router.navigate(["profile/"+ this.userId + "/#Invite"]);
  }
  sendMessage() {
    this.messageEvent.emit(this.pendingStream);
  }
    getMentorInvites() {
        var data = {};
        data['token'] = this._constantService.getSessionDataBYKey('token');
        data['token_param'] = {};
        data['token_param']['device_type'] = "w";
        data['token_param']['host'] = "";
        data['count'] = 1;
        data['r_count'] = 10;
        this._constantService.fetchDataApi(this._constantService.getMentorInvitesServiceUrl(),data).subscribe(data => {
            var responseData:any = data;
            console.log("upcoming class >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            console.log(responseData);
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.pendingStream = responseData.PENDING_STREAM_COUNT;
                this.sendMessage();
                if (responseData.LIVE_STREAMS.length == 0) {
                    this.isInvitepresent = false;
                } else {
                    this.isInvitepresent = true;
                    this.liveClassInvites = responseData.LIVE_STREAMS;
                    for (var i = 0; i < this.liveClassInvites.length; i++) {
                        this.liveClassInvites[i].COURSE_TITLE = this._postService.decodeURIPostData(this.liveClassInvites[i].COURSE_TITLE);
                        this.liveClassInvites[i].PAGE_TITLE = this._postService.decodeURIPostData(this.liveClassInvites[i].PAGE_TITLE);
                        this.liveClassInvites[i].STREAM_DESCRIPTION = this._postService.decodeURIPostData(this.liveClassInvites[i].STREAM_DESCRIPTION);
                        if(this.liveClassInvites[i].PAGE_TYPE == 0){
                            if(this.liveClassInvites[i].PAGE_PROFILE_PHOTO_PATH){
                                this.liveClassInvites[i].PAGE_PROFILE_PHOTO_PATH = this.liveClassInvites[i].PAGE_PROFILE_PHOTO_PATH + "profile/" + this.liveClassInvites[i].PAGE_UUID + "_60x60.png?v=" + this.liveClassInvites[i].IMG_UPD_DT;
                            }else{
                                this.liveClassInvites[i].PAGE_PROFILE_PHOTO_PATH = this._constantService.defaultPageIndImgPath;
                            }

                        }else{
                        if(this.liveClassInvites[i].PAGE_PROFILE_PHOTO_PATH){
                                this.liveClassInvites[i].PAGE_PROFILE_PHOTO_PATH = this.liveClassInvites[i].PAGE_PROFILE_PHOTO_PATH + "profile/" + this.liveClassInvites[i].PAGE_UUID + "_60x60.png?v=" + this.liveClassInvites[i].IMG_UPD_DT;
                            }else{
                                this.liveClassInvites[i].PAGE_PROFILE_PHOTO_PATH = this._constantService.defaultPageCollgImgPath;
                            }
                        }
                        this.liveClassInvites[i].END_TIME = this.liveClassInvites[i].START_TIME + (this.liveClassInvites[i].DURATION * 60 * 1000);

                        this.liveClassInvites[i]['timeRemaining'] = 0;
                        this.liveClassInvites[i]['daysLeft'] = 0;
                        this.liveClassInvites[i]['hoursLeft'] = 0;
                        this.liveClassInvites[i]['minuteLeft'] = 0;
                        this.liveClassInvites[i]['secondLeft'] = 0;
                        var currentTime = Date.now();
                        if ((this.liveClassInvites[i].START_TIME - currentTime) > 0) {
                            this.liveClassInvites[i]['isRunning'] = 0;
                            this.liveClassInvites[i].TIME_REMAINING = Math.floor(((parseInt(this.liveClassInvites[i].START_TIME) - currentTime) / (1000)));
                            this.testTimer(i, this.liveClassInvites[i].TIME_REMAINING);
                        } else {
                            this.liveClassInvites[i]['isRunning'] = 1;
                            this.liveClassInvites[i].TIME_REMAINING = 0;
                        }
                    }
                }
            }
        });
    }

    updLiveStreamStatus(corsId, cntntId, index, acceptStatus) {
        var data = {};
        data['token'] = this._constantService.getSessionDataBYKey('token');
        data['token_param'] = {};
        data['token_param']['device_type'] = "w";
        data['token_param']['host'] = "";
        data['cors_uuid'] = corsId;
        data['cntnt_uuid'] = cntntId;
        if(acceptStatus == 2){
          data['typ_id'] = 1;
          data['text'] = "";
        }
        data['status'] = acceptStatus;
        

        this._constantService.fetchDataApi(this._constantService.getUpdateLiveStreamStatusServiceUrl(),data).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                if(acceptStatus == 1){
                    this.liveClassInvites[index].STATUS = 1;
                }
            }
        });
    }

    testTimer(i, timeLeft) {
        this.liveClassInvites[i]['timeRemaining'] = timeLeft;
        this.timerArr[i] = setInterval(() => {
            this.liveClassInvites[i]['timeRemaining'] = timeLeft;
            this.liveClassInvites[i]['hoursLeft'] = Math.floor((timeLeft % (60 * 60 * 24)) / (60 * 60)).toString();
            this.liveClassInvites[i]['minuteLeft'] = Math.floor((timeLeft % (60 * 60)) / (60)).toString();
            this.liveClassInvites[i]['secondLeft'] = Math.floor((timeLeft % (60))).toString();

            if(this.liveClassInvites[i]['timeRemaining'] < 86400 && this.liveClassInvites[i]['timeRemaining'] > 0){
                this.liveClassInvites[i]['isRunning'] = 0;
            }else{
                this.liveClassInvites[i]['isRunning'] = 1;
            }

            if (parseInt(this.liveClassInvites[i]['daysLeft']) < 10) {
                this.liveClassInvites[i]['daysLeft'] = '0' + this.liveClassInvites[i]['daysLeft'].toString();
            } else {
                this.liveClassInvites[i]['daysLeft'] = this.liveClassInvites[i]['daysLeft'].toString();
            }
            if (parseInt(this.liveClassInvites[i]['hoursLeft']) < 10) {
                this.liveClassInvites[i]['hoursLeft'] = '0' + this.liveClassInvites[i]['hoursLeft'].toString();
            } else {
                this.liveClassInvites[i]['hoursLeft'] = this.liveClassInvites[i]['hoursLeft'].toString();
            }
            if (parseInt(this.liveClassInvites[i]['minuteLeft']) < 10) {
                this.liveClassInvites[i]['minuteLeft'] = '0' + this.liveClassInvites[i]['minuteLeft'].toString();
            } else {
                this.liveClassInvites[i]['minuteLeft'] = this.liveClassInvites[i]['minuteLeft'].toString();
            }
            if (parseInt(this.liveClassInvites[i]['secondLeft']) < 10) {
                this.liveClassInvites[i]['secondLeft'] = '0' + this.liveClassInvites[i]['secondLeft'].toString();
            } else {
                this.liveClassInvites[i]['secondLeft'] = this.liveClassInvites[i]['secondLeft'].toString();
            }

            this.liveClassInvites[i]['timeRemaining']--;
            if (timeLeft < 0) {
                clearInterval(this.timerArr[i]);
                this.liveClassInvites[i]['isRunning'] = 1;
                this.liveClassInvites[i].countDisplay = "Started!";
            } else {
                timeLeft = this.liveClassInvites[i]['timeRemaining'];
            }
        }, 1000);
    }

}
