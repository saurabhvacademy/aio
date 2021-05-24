import {Injectable} from '@angular/core';
import {EncryptionService} from './encryption.service';
import {ConstantService} from './constant.service';
import {Router} from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class CommonfunctionsService {

    dataConf = {};
    openConfirmation: boolean = false;
    
    constructor(
        private _router: Router,
        public _constantService: ConstantService,
        private _encryptionService: EncryptionService 
    ) {}

    latestPostInterest(page_uuid) {
        var lastInterest = {};
        lastInterest['token'] = this._constantService.getSessionDataBYKey('token');
        lastInterest['token_param'] = {};
        lastInterest['token_param']['device_type'] = 'w';
        lastInterest['token_param']['host'] = '';
        if(page_uuid){
            lastInterest['page_uuid'] = page_uuid;
        } else {
            lastInterest['page_uuid'] = "";
        }


        this._constantService.fetchDataApi(this._constantService.getLtUserInterestServiceUrl(), lastInterest).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token',responseData.TOKEN);
                this._constantService.setLtPostInterest(responseData.LATEST_INTEREST_ID);
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
