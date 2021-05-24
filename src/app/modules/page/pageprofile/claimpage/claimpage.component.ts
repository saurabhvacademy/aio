import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {ConstantService} from './../../../../services/constant.service';
import {EncryptionService} from './../../../../services/encryption.service';

@Component({
    selector: 'app-claimpage',
    templateUrl: './claimpage.component.html',
    styleUrls: ['./claimpage.component.scss']
})
export class ClaimpageComponent implements OnInit {
    errorpopupshow: boolean = true;
    resend: boolean = false;
    cancelbtn: boolean = true;
    submit: boolean = true;
    resendph: boolean = false;
    cancelbtnph: boolean = true;
    submitph: boolean = true;
    leftmenutab = 1;
    sendOpt: boolean = true;
    @Output() demobj = new EventEmitter<object>();
    @Input() page_id: string;
    credential: string = "";
    otp: string = "";
    error_typ: string = "";
    error_msg: string = "";
    error: boolean = false;
    obj = {};
    diman() {
        this.obj['type'] = 1;
        this.demobj.emit(this.obj);
    }
    claim() {
        this.resend = true;
        this.cancelbtn = false;
        this.submit = false;
    }
    claimph() {
        this.resendph = true;
        this.cancelbtnph = false;
        this.submitph = false;
    }
    leftmenutabClick(index) {
        if(this.leftmenutab!=index){
            this.resend = false;
            this.resendph = false;
            this.submit = true;
            this.submitph = true;
            this.credential = "";
            this.otp = "";
            this.cancelbtn = true;
            this.cancelbtnph = true;
            this.sendOpt = true;
        }
        this.leftmenutab = index;
        
    }
    constructor(
        public _constantService: ConstantService,
        private _encrypt: EncryptionService,
    ) {}

    ngOnInit() {
    }

    sendOpt4Claim() {
     
        if (this.sendOpt) {
            this.sendOpt = false;
            var claimOtp = {};
            if (this.leftmenutab == 1) {
                if (this.credential == "") {
                    this.error_typ = "Email address blank";
                    this.error_msg = "Please enter a email address.";
                    this.error = true;
                    return false;
                } else {
                    if (!this._constantService.isEmail(this.credential.toLowerCase())) {
                        this.error_typ = "Invalid email address";
                        this.error_msg = "Please enter a valid email address.";
                        this.error = true;
                        return false;
                    }
                }
                claimOtp['t'] = "e";
            } else {
                if (this.credential == "") {
                    this.error_typ = "Mobile number blank";
                    this.error_msg = "Please enter a mobile number.";
                    this.error = true;
                    return false;
                } else {
                    if (!this._constantService.isMobile(this.credential)) {
                        this.error_typ = "Invalid mobile number";
                        this.error_msg = "Please enter a valid mobile number.";
                        this.error = true;
                        return false;
                    }
                }
                claimOtp['t'] = "m";
            }
            claimOtp['token'] = this._constantService.getSessionDataBYKey('token');
            claimOtp['lc'] = this.credential;
            claimOtp['token_param'] = {};
            claimOtp['token_param']['device_type'] = 'w';
            claimOtp['token_param']['host'] = '';
            claimOtp['pg_uuid'] = this.page_id;

            this._constantService.fetchDataApi(this._constantService.getClaimOtpSendServiceUrl(), claimOtp).subscribe(data => {
                this.sendOpt = true;
                var responseData:any = data;
                var status = responseData.STATUS;
                if (status == this._constantService.success_msg) {
                    if (this.leftmenutab == 1) {
                        this.resend = true;
                        this.cancelbtn = false;
                        this.submit = false;
                    } else {
                        this.resendph = true;
                        this.cancelbtnph = false;
                        this.submitph = false;
                    }
                } else {
                    this.error = true;
                    this.error_typ = responseData.ERROR_MSG;
                    this.error_msg = "Page doesn't belong to you";
                }
            })
        }
    }
    
    verifyOpt(){
        if (this.sendOpt){
            if(this.otp==""){
                this.error = true;
                this.error_typ = "Blank OTP";
                this.error_msg = "Please enter the code that you've just received.";
                return false;
            }
            var verify = {};
            verify['token'] = this._constantService.getSessionDataBYKey('token');
            verify['token_param'] = {};
            verify['token_param']['device_type'] = 'w';
            verify['token_param']['host'] = '';
            verify['lc'] = this.credential;
            if (this.leftmenutab ==1){
                verify['t'] = "e";
            } else {
                verify['t'] = "m";
            }
            verify['vcod'] = this.otp;
            verify['pg_uuid'] = this.page_id;
            
            this._constantService.fetchDataApi(this._constantService.getVerifyClaimPageServiceUrl(), verify).subscribe(data=>{
                var responseData:any = data;
                var status = responseData.STATUS;
                if (status == this._constantService.success_msg ){
                    this.obj['type'] = 2;
                    this.demobj.emit(this.obj);
                }
            })
                       
        }
    }


}
