import {Component, OnInit, Input} from '@angular/core';
import {ConstantService} from './../../../services/constant.service';
import {EncryptionService} from './../../../services/encryption.service';
import {PostdataService} from './../../../services/postdata.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-upcomingclasses',
    templateUrl: './upcomingclasses.component.html',
    providers: [ConstantService, EncryptionService],
    styleUrls: ['./upcomingclasses.component.scss', './../invite-live-streams/invite-live-streams.component.scss', './../../page/upcominglivestreams/upcominglivestreams.component.scss']
})
export class UpcomingclassesComponent implements OnInit {
    selCountry = 0;
    upcomingStreams = [];
    isClasspresent: boolean = false;
    isResponsive = false;
    runningStream: any;
    showStreamCardForResponsive: boolean=true;
    constructor(
        public _constantService: ConstantService,
        public _encrypt: EncryptionService,
        private _postService: PostdataService,
        private _Router: Router

    ) {}

    ngOnInit() {
        this.getupcomingClasses();
        if (window.innerWidth > 991) {
            this.isResponsive = false;
        }else {
            this.isResponsive = true;
        }
    }

    getupcomingClasses() {
        var data = {};
        data['token'] = this._constantService.getSessionDataBYKey('token');
        data['token_param'] = {};
        data['token_param']['device_type'] = "w";
        data['token_param']['host'] = "";

       

        this._constantService.fetchDataApi(this._constantService.getTodayClassesServiceUrl(),data).subscribe(data => {
            var responseData:any = data;

            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                if (responseData.TODAY_LIVE_STREAMS.length == 0) {
                    this.isClasspresent = false;
                } else {
                    this.isClasspresent = true;
                    this.upcomingStreams = responseData.TODAY_LIVE_STREAMS;
                    for (var i = 0; i < this.upcomingStreams.length; i++) {
                        this.upcomingStreams[i].COURSE_TITLE = this._postService.decodeURIPostData(this.upcomingStreams[i].COURSE_TITLE);
                        this.upcomingStreams[i].PAGE_TITLE = this._postService.decodeURIPostData(this.upcomingStreams[i].PAGE_TITLE);
                        this.upcomingStreams[i].STREAM_DESCRIPTION = this._postService.decodeURIPostData(this._postService.decodeURIPostData(this.upcomingStreams[i].STREAM_DESCRIPTION));
                        if (this.upcomingStreams[i].PAGE_TYPE == 0) {
                            this.upcomingStreams[i].PAGE_PROFILE_PHOTO_PATH = 
                            this.upcomingStreams[i].PAGE_PROFILE_PHOTO_PATH != '' &&
                             this.upcomingStreams[i].PAGE_PROFILE_PHOTO_PATH != null ?
                              this.upcomingStreams[i].PAGE_PROFILE_PHOTO_PATH +"profile/"+this.upcomingStreams[i].PAGE_UUID+"_60x60.png?v="+this.upcomingStreams[i].IMG_UPD_DT   :
                               this._constantService.defaultImgPath ;
                        } else {
                            this.upcomingStreams[i].PAGE_PROFILE_PHOTO_PATH = this.upcomingStreams[i].PAGE_PROFILE_PHOTO_PATH != '' && this.upcomingStreams[i].PAGE_PROFILE_PHOTO_PATH != null ? 
                            this.upcomingStreams[i].PAGE_PROFILE_PHOTO_PATH +"profile/"+this.upcomingStreams[i].PAGE_UUID+"_60x60.png?v="+this.upcomingStreams[i].IMG_UPD_DT   : this._constantService.defaultImgPath ;
                        }
                        this.upcomingStreams[i].END_TIME = this.upcomingStreams[i].START_TIME + (this.upcomingStreams[i].DURATION * 60 * 1000);

                        this.upcomingStreams[i]['timeRemaining'] = 0;
                        this.upcomingStreams[i]['daysLeft'] = 0;
                        this.upcomingStreams[i]['hoursLeft'] = 0;
                        this.upcomingStreams[i]['minuteLeft'] = 0;
                        this.upcomingStreams[i]['secondLeft'] = 0;
                        var currentTime = Date.now();
                        if ((this.upcomingStreams[i].START_TIME - currentTime) > 0) {
                            this.upcomingStreams[i]['isRunning'] = 0;
                            this.upcomingStreams[i].TIME_REMAINING = Math.floor(((parseInt(this.upcomingStreams[i].START_TIME) - currentTime) / (1000)));
                            this.testTimer(i, this.upcomingStreams[i].TIME_REMAINING);
                        } else {
                            this.upcomingStreams[i]['isRunning'] = 1;
                            this.upcomingStreams[i].TIME_REMAINING = 0;
                        }

                        if ((this.upcomingStreams[i].START_TIME - currentTime) <= 0 && !this.runningStream ) {
                            this.runningStream=this.upcomingStreams[i];
                            
                        } 
                    }

                }
            }
        });
    }

    testTimer(i, timeLeft) {
        this.upcomingStreams[i]['timeRemaining'] = timeLeft;
        var timer = setInterval(() => {
            this.upcomingStreams[i]['timeRemaining'] = timeLeft;
            this.upcomingStreams[i]['hoursLeft'] = Math.floor((timeLeft % (60 * 60 * 24)) / (60 * 60)).toString();
            this.upcomingStreams[i]['minuteLeft'] = Math.floor((timeLeft % (60 * 60)) / (60)).toString();
            this.upcomingStreams[i]['secondLeft'] = Math.floor((timeLeft % (60))).toString();


            if (parseInt(this.upcomingStreams[i]['daysLeft']) < 10) {
                this.upcomingStreams[i]['daysLeft'] = '0' + this.upcomingStreams[i]['daysLeft'].toString();
            } else {
                this.upcomingStreams[i]['daysLeft'] = this.upcomingStreams[i]['daysLeft'].toString();
            }
            if (parseInt(this.upcomingStreams[i]['hoursLeft']) < 10) {
                this.upcomingStreams[i]['hoursLeft'] = '0' + this.upcomingStreams[i]['hoursLeft'].toString();
            } else {
                this.upcomingStreams[i]['hoursLeft'] = this.upcomingStreams[i]['hoursLeft'].toString();
            }
            if (parseInt(this.upcomingStreams[i]['minuteLeft']) < 10) {
                this.upcomingStreams[i]['minuteLeft'] = '0' + this.upcomingStreams[i]['minuteLeft'].toString();
            } else {
                this.upcomingStreams[i]['minuteLeft'] = this.upcomingStreams[i]['minuteLeft'].toString();
            }
            if (parseInt(this.upcomingStreams[i]['secondLeft']) < 10) {
                this.upcomingStreams[i]['secondLeft'] = '0' + this.upcomingStreams[i]['secondLeft'].toString();
            } else {
                this.upcomingStreams[i]['secondLeft'] = this.upcomingStreams[i]['secondLeft'].toString();
            }

            this.upcomingStreams[i]['timeRemaining']--;
            if (timeLeft < 0) {
                clearInterval(timer);
                this.upcomingStreams[i]['isRunning'] = 1;
            } else {
                timeLeft = this.upcomingStreams[i]['timeRemaining'];
            }
        }, 1000);
    }


    page_Route(sData){
        if(sData['PAGE_NAME']){
            this._Router.navigate(['page/'+sData['PAGE_NAME']]);
        }else{
            this._Router.navigate(['page/'+sData['PAGE_UUID']]);

        }

    }
    closeCard(i){
        this.showStreamCardForResponsive=false;
    }

    routeTo(url,i){
        this._Router.navigate([url]);
    }
}
