import {Component, OnInit, } from '@angular/core';
import {Router} from '@angular/router';
import {ConstantService} from './../../../services/constant.service';
import {EncryptionService} from './../../../services/encryption.service';
import {PostdataService} from './../../../services/postdata.service';
import {InternalMessageService} from './../../../services/internal-message.service';


@Component({
    selector: 'app-statisticswidget',
    templateUrl: './statisticswidget.component.html',
    styleUrls: ['./statisticswidget.component.scss']
})
export class StatisticswidgetComponent implements OnInit {

    rightPercentage: number = 0;
    wrongPercentage: any = 0;
    quesResponse: any = 0;
    totalCount: any = 0;
    wrongCount: any = 0;
    rightCount: any = 0;
    daysSpan: number = 0;
    openConfirmation: boolean;
    dataConf: any;
    isShowCalender: boolean = false;
    date = new Date();
    constructor(
        public _constantService: ConstantService,
        private _encryptData: EncryptionService,
        private _postdataService: PostdataService,
        private _router: Router,
        private _message: InternalMessageService
    ) {}

    ngOnInit() {
        this.usrWallAnalyticsFxn();
        this._message.getCommand().subscribe(data => {
            if (data) {
                if (data.type == 0 && data.command == 'desc') {
                    this.usrWallAnalyticsFxn();
                }
            }
        });
    }

    usrWallAnalyticsFxn() {
        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";
        hitObj['strt_dt'] = '';
        hitObj['end_dt'] = '';
        hitObj['days'] = this.daysSpan;

        this._constantService.fetchDataApi(this._constantService.getUserWallAnalyticsServiceUrl(), hitObj).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.rightCount = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(responseData.RIGHT);
                this.wrongCount = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(responseData.WRONG);
                var rCount = responseData.RIGHT;
                var wCount = responseData.WRONG;
                this.totalCount = rCount + wCount;
                this.wrongPercentage = Math.round((responseData.WRONG * 100) / this.totalCount);
                this.rightPercentage = Math.round((responseData.RIGHT * 100) / this.totalCount);
                this.quesResponse = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(responseData.QUESTION_RESPONSE);
                this.totalCount = new Intl.NumberFormat('en-IN', {maximumSignificantDigits: 3}).format(this.totalCount);
            } else if (status == this._constantService.error_token) {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired!";
                this.openConfirmation = true;
                return false;
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "Error";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
                return false;
            }
        }), error => {
            var err = error;
            if (err.status == 500) {
                this._router.navigate(['500']);
            }
        };
    }

    showCalender() {
        this.isShowCalender = !this.isShowCalender;
    }

    setDatesFrmDays(key) {
        switch (key) {
            case 1: {
                this.daysSpan = 7;
                break;
            }
            case 2: {
                this.daysSpan = this.date.getDate();
                break;
            }
            case 3: {
                this.daysSpan = this.date.getDate() + 30;
                break;
            }
            case 4: {
                this.daysSpan = this.date.getDate() + 90;
                break;
            }
        }
        this.wrongPercentage = 0;
        this.rightPercentage = 0;
        this.usrWallAnalyticsFxn();
        this.isShowCalender = !this.isShowCalender;
    }
}
