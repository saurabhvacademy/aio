import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EncryptionService} from './../../services/encryption.service';
import {ConstantService} from './../../services/constant.service';
@Component({
    selector: 'app-trendingpage',
    templateUrl: './trendingpage.component.html',
    providers: [ ConstantService, EncryptionService]
    // styleUrls: ['./trendingpage.component.scss']
})
export class TrendingpageComponent implements OnInit {

    dataConf = {};
    openConfirmation: boolean = false;
    trendingPresent: boolean = false;
    current_year;
    public trend = [];
    t: string;

    constructor(
        public _constantService: ConstantService,
        private _router: Router,
    ) {}

    ngOnInit() {
        document.title = "Study24x7 - A best place for collaborative learning & sharing";
        this.t = this._constantService.getSessionDataBYKey('token');
        if (this.t != null && this.t != undefined && this            .t != '') {
//            if(this._constantService.getCount            ry()=='1'){
//                if (this._constantService.getMobileVer() == 'false' || this._constantService.getEmailVer()== 'false' || this._constantService.getUserIntere            st()=='0'){
//                   this._router.navigate(['verifi            cation']); 
//                            }
//                        }else {
//                if (this._constantService.getEmailVer() == 'false' || this._constantService.getUserInterest            () == '0'){
//                        this._router.navigate(['verifi            cation']); 
//                            }
//            }

            if ((this._constantService.getSessionDataBYKey('mobile_verify') == 'false' && this._constantService.getEmailVer() == 'false') || this._constantService.getUserInterest() == '0') {
                this._router.navigate(['verification']);
            }
            window.scrollTo(0, 0);
            var date = new Date();
            this.current_year = date.getFullYear();
            this.getTrending();
        } else {
            this._router.navigate(['']);
        }
    }

    getTrending() {
        var trend = {};
        trend['token'] = this._constantService.getSessionDataBYKey('token');
        trend['token_param'] = {};
        trend['token_param']['device_type'] = 'w';
        trend['token_param']['host'] = '';

        

        this._constantService.fetchDataApi(this._constantService.getTrendingServiceUrl(),trend).subscribe(data => {
            var responseData:any = data;
            var status = responseData.status;
            if (status == this._constantService.success_msg) {
                var trending_id = responseData.trends;
                if (trending_id.length != 0) {
                    this.trendingPresent = true;
                    this.getTrendingsDetails(trending_id.join());
                }
            } else if (status == this._constantService.error_token) {
                this._constantService.clearUserInfo();
                this._router.navigate(['']);
                //alert('Session Logout');
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
        }
    }
    getTrendingsDetails(ids) {
        var trendDetails = {};
        trendDetails['token'] = this._constantService.getSessionDataBYKey('token');
        trendDetails['token_param'] = {};
        trendDetails['token_param']['device_type'] = 'w';
        trendDetails['token_param']['host'] = '';
        trendDetails['pid'] = ids;

       

        this._constantService.fetchDataApi(this._constantService.getLatestPostDataServiceUrl(),trendDetails).subscribe(data => {
            var responseData:any = data
            var status = responseData.status;
            if (status == this._constantService.success_msg) {
                this.trend = responseData.post_data;
            } else if (status == this._constantService.error_token) {
                this._constantService.clearUserInfo();
                this._router.navigate(['']);
                alert('This session has expired');
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

}
