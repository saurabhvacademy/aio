import {Component, OnInit, AfterViewInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {EncryptionService} from './../../services/encryption.service';
import {ConstantService} from './../../services/constant.service';

@Component({
    selector: 'app-connectionrequest',
    templateUrl: './connectionrequest.component.html',
    providers: [ConstantService, EncryptionService],
    styleUrls: ['./connectionrequest.component.scss','./../peopleyouknow/peopleyouknow.component.scss','./newconnectionrequest.component.scss']
})
export class ConnectionrequestComponent implements OnInit {
    dataConf = {};
    openConfirmation: boolean = false;
    @Output() viewAllConnectionRequest = new EventEmitter<number>();
    @Output() changeTabProfile = new EventEmitter<number>();
    @Output() sessionLogout = new EventEmitter<boolean>();
    config: string;
    data: string;
    showif = 1;
    t: string;
    public connectionRec = [];
    logout;
    constructor(
        public _constantService: ConstantService,
        public _router: Router,
        public _encryptionService: EncryptionService
    ) {}

    ngOnInit() {
        this.t = this._constantService.getSessionDataBYKey('token');
        if (this.t != null && this.t != undefined && this.t != '') {
            this.get10ConnectionRequestList();
        } else {
            this._router.navigate(['']);
        }

    }

    changeTab() {
        this.viewAllConnectionRequest.emit(4);
        this.changeTabProfile.emit(3);
    }

    get10ConnectionRequestList() {
        console.log("fsdgsfdgsfdgsfdgsdf");
        var connReqList = {};
        connReqList['token'] = this._constantService.getSessionDataBYKey('token');
        connReqList['token_param'] = {};
        connReqList['token_param']['device_type'] = 'w';
        connReqList['token_param']['host'] = '';

       

        this._constantService.fetchDataApi(this._constantService.get10ConnReqServiceUrl(),connReqList).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                if (responseData.CONIDS.length != 0) {
                    this.showif = 1;
                    console.log("show aaaaaaaaaaaaaaaa");
                    this.get10ConnReqDetails(responseData.CONIDS.join());
                } else {
                    this.showif = 2;

                }

            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
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
    closePopup(event) {
        if (event['error'] == false) {
            this.openConfirmation = false;
        }
    }
    get10ConnReqDetails(ids: string) {
        var connDetails = {};
        connDetails['token'] = this._constantService.getSessionDataBYKey('token');
        connDetails['token_param'] = {};
        connDetails['token_param']['device_type'] = 'w';
        connDetails['token_param']['host'] = '';
        connDetails['fid'] = ids;

        

        this._constantService.fetchDataApi(this._constantService.getConnectionDetailsServiceUrl(),connDetails).subscribe(data => {
            this.data = data["_body"];
            let responseData:any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token',responseData.TOKEN);
                if(responseData.FRIENDS_DETAIL){
                    this.connectionRec = responseData.FRIENDS_DETAIL;
                    for (var i = 0; i < this.connectionRec.length; i++) {
                        this.connectionRec[i].FULL_NAME = this.connectionRec[i].FIRST_NAME +" "+ this.connectionRec[i].LAST_NAME;
                        if (this.connectionRec[i].PROFILE_PHOTO_PATH != null) {
                            this.connectionRec[i].PROFILE_PHOTO_PATH = this.connectionRec[i].PROFILE_PHOTO_PATH + "profile/" + this.connectionRec[i].USER_ID + "_60x60.png";
                        } else {
                            this.connectionRec[i].PROFILE_PHOTO_PATH = this._constantService.defaultImgPath;
                        }
                    }
                }
               
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    updateConnreqAccpt(event, i) {
        var updConnRecAccpt = {};
        var target = event.currentTarget;
        var idAttr = target.attributes.id;
        updConnRecAccpt['token'] = this._constantService.getSessionDataBYKey('token');
        updConnRecAccpt['token_param'] = {};
        updConnRecAccpt['token_param']['device_type'] = 'w';
        updConnRecAccpt['token_param']['host'] = '';
        updConnRecAccpt['conrecid'] = idAttr.nodeValue;
        var id = "connReq_" + idAttr.nodeValue;
     

        this._constantService.fetchDataApi(this._constantService.updateConnRecAcceptServiceUrl(),updConnRecAccpt).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                if (this._constantService.getFriendsId() != '' && this._constantService.getFriendsId() != null) {
                    var f_id = this._constantService.getFriendsId().split(",");
                    f_id.push(idAttr.nodeValue);
                    this._constantService.setFriendsId(f_id.toString());
                } else {
                    this._constantService.setFriendsId(idAttr.nodeValue.toString());
                }
                (<HTMLElement> document.getElementById(id)).style.display = "none";
                this.connectionRec.splice(i, 1);
                if (this.connectionRec.length == 0) {
                    this.get10ConnectionRequestList();
                }
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
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


    updateConnreqReject(event, i) {
        var updConnRecReject = {};
        var target = event.currentTarget;
        var idAttr = target.attributes.id;
        updConnRecReject['token'] = this._constantService.getSessionDataBYKey('token');
        updConnRecReject['token_param'] = {};
        updConnRecReject['token_param']['device_type'] = 'w';
        updConnRecReject['token_param']['host'] = '';
        updConnRecReject['conrecid'] = idAttr.nodeValue;
        var id = "connReq_" + idAttr.nodeValue;
       

        this._constantService.fetchDataApi(this._constantService.updateConnRecRejectServiceUrl(),updConnRecReject).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                (<HTMLElement> document.getElementById(id)).style.display = "none";
                this.connectionRec.splice(i, 1);
                if (this.connectionRec.length == 0) {
                    this.get10ConnectionRequestList();
                }
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
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

    updateSourcePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }
}
