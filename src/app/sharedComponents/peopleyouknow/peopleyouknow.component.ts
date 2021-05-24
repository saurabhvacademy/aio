import {Component, OnInit, Output, EventEmitter, ViewChild, ComponentRef} from '@angular/core';
import {ConstantService} from './../../services/constant.service';
import {EncryptionService} from './../../services/encryption.service';
import {Router} from '@angular/router';
import {PerfectScrollbarComponent, PerfectScrollbarDirective, PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';

@Component({
    selector: 'app-peopleyouknow',
    templateUrl: './peopleyouknow.component.html',
    styleUrls: ['./peopleyouknow.component.scss', './responsivepeopleyouknow.component.scss', './newpeopleyouknow.component.scss']
})
export class PeopleyouknowComponent implements OnInit {
    openConfirmation: boolean = false;
    @Output() viewAllSuggestion = new EventEmitter<number>();
    @Output() changeTabProfile = new EventEmitter<number>();
    @Output() sessionLogout = new EventEmitter<boolean>();
    @Output() sendId = new EventEmitter();
    @Output() cancelId = new EventEmitter();
    @ViewChild('PerfectScrollbarComponent') ComponentRef?: PerfectScrollbarComponent;
    @ViewChild(PerfectScrollbarDirective) directiveRef?: PerfectScrollbarDirective;
    suggestionPresent: boolean = false;
    details;
    suggestion_id = [];
    config: string;
    t: string;
    alert: boolean = false;
    alertMsg = {};
    public people = [];
    logout;
    date = new Date();
    connectStatus: boolean = false;
    loaderscreen: boolean = true;
    changeTab() {
        this.viewAllSuggestion.emit(5);
        this.changeTabProfile.emit(3);
    }


    constructor(
        public _constantService: ConstantService,
        private _encryptionService: EncryptionService,
        private _router: Router,
    ) {}

    ngOnInit() {
        this.t = this._constantService.getSessionDataBYKey('token');
        if (this.t != null && this.t != undefined && this.t != "") {
            this.get10Suggestion();
        }
    }


    ClosePopup(event) {
        if (event['error'] == false) {
            this.openConfirmation = false;
        }
    }


    get10Suggestion() {
        var suggestionData = {};
        suggestionData['token'] = this._constantService.getSessionDataBYKey('token');
        suggestionData['token_param'] = {};
        suggestionData['token_param']['device_type'] = 'w';
        suggestionData['token_param']['host'] = '';

        this._constantService.fetchDataApi(this._constantService.get10UserSuggestionServiceUrl(), suggestionData).subscribe(data => {
            this.loaderscreen = false;
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.suggestion_id = responseData.SUGG_ID;
                if (this.suggestion_id.length != 0) {

                    this.suggestionPresent = true;
                    this.get10SuggestionDetails(this.suggestion_id.join());
                }
            } else if (status == this._constantService.success_msg) {
                this.sessionLogout.emit(true);
            } else {
                this.alertMsg['msg'] = "Alert";
                this.alertMsg['type'] = 2;
                this.alertMsg['error_msg'] = responseData.ERROR_MSG;
                this.alert = true;
            }

        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    get10SuggestionDetails(ids) {
        var suggDetails = {};
        suggDetails['token'] = this._constantService.getSessionDataBYKey('token');
        suggDetails['token_param'] = {};
        suggDetails['token_param']['device_type'] = 'w';
        suggDetails['token_param']['host'] = '';
        suggDetails['fid'] = ids;

        this._constantService.fetchDataApi(this._constantService.getConnectionDetailsServiceUrl(), suggDetails).subscribe(data => {
            this.details = data["_body"];
            let responseData:any=data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.people = responseData.FRIENDS_DETAIL.reverse();
                for (var i = 0; i < this.people.length; i++) {
                    if (this.people[i].PROFILE_PHOTO_PATH != null) {
                        this.people[i].PROFILE_PHOTO_PATH = this.people[i].PROFILE_PHOTO_PATH + "profile/" + this.people[i].USER_ID + "_60x60.png?v=" + responseData.IMG_UPD_DT
                    } else {
                        this.people[i].PROFILE_PHOTO_PATH = this._constantService.defaultImgPath;
                    }
                    this.people[i].FULL_NAME = this.people[i].FIRST_NAME + " " + this.people[i].LAST_NAME;
                    this.people[i]['connectStatus'] = false;
                }
            } else if (status == this._constantService.success_msg) {
                this.sessionLogout.emit(true);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    sendRequest(ID, i) {
        var sendSuggestionRequest = {};
        sendSuggestionRequest['token'] = this._constantService.getSessionDataBYKey('token');
        sendSuggestionRequest['token_param'] = {};
        sendSuggestionRequest['token_param']['device_type'] = 'w';
        sendSuggestionRequest['token_param']['host'] = '';
        sendSuggestionRequest['conrecid'] = ID;
        var id = "sugg_" + ID;

        this._constantService.fetchDataApi(this._constantService.getSendConnectionRequestServiceUrl(), sendSuggestionRequest).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.people[i]['connectStatus'] = true;

                this.sendId.emit(this.people[i].USER_ID);
                //(<HTMLElement> document.getElementById(id)).style.display = "none";
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                if (this.people.length == 0) {
                    this.get10Suggestion();
                }
            } else if (status == this._constantService.success_msg) {
                this.sessionLogout.emit(true);
            } else {
                this.alertMsg['msg'] = "Alert";
                this.alertMsg['type'] = 2;
                this.alertMsg['error_msg'] = responseData.ERROR_MSG;
                this.alert = true;
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    cancelFrndReq(i) {
        var cancelReq = {};
        cancelReq['token'] = this._constantService.getSessionDataBYKey('token');
        cancelReq['token_param'] = {};
        cancelReq['token_param']['device_type'] = 'w';
        cancelReq['token_param']['host'] = '';
        cancelReq['conrecid'] = this.people[i].USER_ID;

        this._constantService.fetchDataApi(this._constantService.getCancelFrndReqServiceUrl(), cancelReq).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.people[i]['connectStatus'] = false;
                this.cancelId.emit(this.people[i].USER_ID);
            }
        })
    }

    delSuggestion(id, i) {
        var delSuggestion = {};
        delSuggestion['token'] = this._constantService.getSessionDataBYKey('token');
        delSuggestion['token_param'] = {};
        delSuggestion['token_param']['device_type'] = "w";
        delSuggestion['token_param']['host'] = '';
        delSuggestion['suggid'] = id;

        this._constantService.fetchDataApi(this._constantService.getDelSuggestionServiceUrl(), delSuggestion).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.people.splice(i, 1);
                if (this.people.length == 0) {
                    this.get10Suggestion();
                }
            }
        });
        this.ComponentRef.directiveRef.update();
    }

    updateSourcePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }
}
