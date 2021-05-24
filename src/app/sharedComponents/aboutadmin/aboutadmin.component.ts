import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EncryptionService} from './../../services/encryption.service';
import {ConstantService} from './../../services/constant.service';


@Component({
    selector: 'app-aboutadmin',
    templateUrl: './aboutadmin.component.html',
    styleUrls: ['./aboutadmin.component.scss'],
    providers: [ConstantService, EncryptionService]
})
export class AboutadminComponent implements OnInit {
    dataConf = {};
    openConfirmation: boolean = false;
    aboutUs: string = "";
    t: string;
    constructor(
        public _constantService: ConstantService,
        private _router: Router,
        private _encryptionService: EncryptionService
    ) {}

    ngOnInit() {
        this.getAboutUsData();
//        this.t = this._constantService.getSessionDataBYKey('token');
//        if (this.t != null && this.t != undefined && this.t != '') {
//            if (this._constantService.getCountry() == '1') {
//                if (this._constantService.getMobileVer() == 'false' || this._constantService.getEmailVer() == 'false' || this._constantService.getUserInterest() == '0') {
//                    this._router.navigate(['verification']);
//                }
//            } else {
//                if (this._constantService.getEmailVer() == 'false' || this._constantService.getUserInterest() == '0') {
//                    this._router.navigate(['verification']);
//                }
//            }
//            window.scrollTo(0, 0);
//            this.getAboutUsData();
//        } else {
//            this._router.navigate(['']);
//        }
    }

    getAboutUsData() {
        var about = {};
        about['token'] = this._constantService.getSessionDataBYKey('token');
        about['token_param'] = {};
        about['token_param']['device_type'] = 'w';
        about['token_param']['host'] = '';

        

        this._constantService.fetchDataApi(this._constantService.getAboutUsServiceUrl(),about).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status === this._constantService.success_msg) {
                this.aboutUs = responseData.ABOUT_US;
            } else if (status == this._constantService.error_token) {
                this._constantService.clearUserInfo();
                this._router.navigate(['']);
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
        },error=>{
            var responseData = error;
            if(responseData.status==500){
                this._router.navigate(['500']);
            }
        });
    }
     closePopup(event) {
        if (event['error'] == false) {
            this.openConfirmation = false;
        }
    }
}
