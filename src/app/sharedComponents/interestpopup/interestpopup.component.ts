import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ConstantService } from './../../services/constant.service';
import { EncryptionService } from './../../services/encryption.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

//import { InterestPipe } from './interest.pipe';

@Component({
    selector: 'app-interestpopup',
    templateUrl: './interestpopup.component.html',
    providers: [ConstantService, EncryptionService],
    // styleUrls: ['./interestpopup.component.scss']
    styleUrls: ['./interestpopup.component.scss', './../../modules/interest/interest.component.scss']
})
export class InterestpopupComponent implements OnInit {
    InterestLength: any;
    Intlength: number;
    @Output() sessionLogout = new EventEmitter<boolean>();
    public interests;
    public interestArr = [];

    public value = "";
    register_re: string;
    dataConf = {};
    openConfirmation: boolean = false;
    showPreloader: boolean = false;
    showText: boolean = true;
    config = 'string';
    interestpopup: boolean = true;
    interestlist: boolean = false;
    objectKeys = Object.keys;
    registerPopupStatus = true;
    localCookie: string;
    constructor(
        public _constantService: ConstantService,
        private _cookie: CookieService,
        private _encryptionService: EncryptionService,
        private _router: Router

    ) { }

    ngOnInit() {



        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");


        this.getInterest();

    }


    getInterest() {

        this._constantService.fetchDataApiWithoutBody(this._constantService.getInterestv1ServiceUrl()).subscribe(data => {
            let responseData: any = data;
            this.interests = responseData.INTERESTS_DATA;
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }


    updateUserInterest() {
        // var  localCookie = this._cookie.get('urlcors');
        this.showPreloader = true;
        this.showText = false;
        var user_interest = {};
        var str = this.interestArr.join();
        user_interest['token'] = this._constantService.getSessionDataBYKey('token');
        user_interest['token_param'] = {};
        user_interest['token_param']["device_type"] = "w";
        user_interest['token_param']["host"] = "";
        user_interest['iid'] = str;

        this._constantService.fetchDataApi(this._constantService.getAddInterstServiceUrl(), user_interest).subscribe(data => {
            //            this._logger.debug(data);
            //            this.register_re = data["_body"];
            //            this._logger.debug(this.register_re);
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this._constantService.setSessionJsonPair("user_interest_id",str);
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                // if(localCookie=='1'){
                //     window.open("https://www.aio.com/article/553/how-to-create-your-first-course-on-aio","_self");
                // }else{
                var publicClickedUrl = this._constantService.getSessionDataBYKey('publicClickedURL');
                if (publicClickedUrl) {
                    this._constantService.setSessionJsonPair('publicClickedURL','');
                    window.location.replace(publicClickedUrl);
                } else {
                    this._router.navigate(['home']);
                }
                // }


                this._constantService.setUserInterest(this.interestArr.length.toString());
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            } else {
                this.showPreloader = false;
                this.showText = true;
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

    checkboxupdate(id, event) {
        if (event.target.checked) {
            this.interestArr.push(id);

        } else if (!event.target.checked) {
            var index = this.interestArr.indexOf(id);
            this.interestArr.splice(index, 1);
        }
    }
    closePopup(event) {
        if (event['error'] == false) {
            this.openConfirmation = false;
        }
    }

}
