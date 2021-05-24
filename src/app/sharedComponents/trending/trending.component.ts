import { Component, OnInit } from '@angular/core';
import { ConstantService } from './../../services/constant.service';
import { EncryptionService } from './../../services/encryption.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-trending',
    templateUrl: './trending.component.html',
    styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit {

    //    trendingPresent:boolean = false;
    trendingPresent: boolean = true;
    config: string;
    //public trend = [{"TEXT":"Hello"},{"TEXT":"Testing"},{"TEXT":"Testing"},{"TEXT":"Gate Entrance"},{"TEXT":"CAT Entrance"},{"TEXT":"JEE Entrance"},{"TEXT":"Banking Entrance"}];
    public trend = [];



    constructor(
        public _constantService: ConstantService,
        private _encryptionService: EncryptionService,
        private _router: Router,
    ) { }

    ngOnInit() {
        //        this.getTrending();
    }

    getTrending() {
        var trend = {};
        trend['token'] = this._constantService.getSessionDataBYKey('token');
        trend['token_param'] = {};
        trend['token_param']['device_type'] = 'w';
        trend['token_param']['host'] = '';

    }

    getTrendingsDetails(ids) {
        var trendDetails = {};
        trendDetails['token'] = this._constantService.getSessionDataBYKey('token');
        trendDetails['token_param'] = {};
        trendDetails['token_param']['device_type'] = 'w';
        trendDetails['token_param']['host'] = '';
        trendDetails['pid'] = ids;

        this._constantService.fetchDataApi(this._constantService.getSearchPostDataServiceUrl(), trendDetails).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.trend = responseData.POST_DATA;
            } else if (status == this._constantService.error_token) {
                this._constantService.clearUserInfo();
                this._router.navigate(['']);
                alert('Session Logout');
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }
}
