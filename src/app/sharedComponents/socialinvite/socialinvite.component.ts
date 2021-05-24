import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {ConstantService} from './../../services/constant.service';
import {EncryptionService} from './../../services/encryption.service';
declare const gapi: any;
@Component({
    selector: 'app-socialinvite',
    templateUrl: './socialinvite.component.html',
    styleUrls: ['./socialinvite.component.scss','./newsocialinvite.component.scss']
})
export class SocialinviteComponent implements OnInit {
    @Output() popupOverFlow = new EventEmitter<boolean>();
    config: string;
    // interestlist: false;
    popupMediaName: number;
    socialInvitePopupShow = false;
    interestlist: boolean = false;
    auth2: any;
    sendInvt: boolean = true;
    email: string = '';
    openConfirmation: boolean = false;
    dataConf = {};

    inviteopenpopup(mediaName: number) {
        this.socialInvitePopupShow = true;
        this.popupMediaName = mediaName;
        this.popupOverFlow.emit(this.socialInvitePopupShow);
        let leftmenufixed = document.getElementsByClassName('rightmenu_fixed');
        for(let i=0;i<=leftmenufixed.length;i++){
          leftmenufixed[i].classList.add("fixedposition");
        }


    }
    invitClosePopup(s) {
        this.socialInvitePopupShow = s;
        this.popupOverFlow.emit(this.socialInvitePopupShow);
    }


    public invite = [];
    constructor(
        private _constantService: ConstantService,
        private _encrypt: EncryptionService
    ) {}

    ngOnInit() {
        gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
                client_id: '820432769646-rvnalptiheclr2n3um6fevdcduill802.apps.googleusercontent.com',
                //                client_id: '820432769646-0gu3aqlpqvfi80ibm99o22rrvgr81kar.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                scope: 'profile email https://www.googleapis.com/auth/contacts.readonly'
            });
            this.attachSignin(document.getElementById('googleBtn'));
        });
    }
    attachSignin(element) {
      console.log("ayush sahu");
        this.auth2.attachClickHandler(element, {},
            (googleUser) => {
                this.socialInvitePopupShow = true;
                this.popupMediaName = 3;
                this.popupOverFlow.emit(this.socialInvitePopupShow);
            }, (error) => {
            });
    }

    sendInvite() {

        if (this.email != "") {
            this.email = this.email.toLowerCase();
            if (this._constantService.isEmail(this.email)) {
                if (this.sendInvt) {
                    this.sendInvt = false;
                    var ids = [];
                    var invite = {};
                    invite['token'] = this._constantService.getSessionDataBYKey('token');
                    invite['token_param'] = {};
                    invite['token_param']['device_type'] = 'w';
                    invite['token_param']['host'] = '';
                    invite['email_ids'] = this.email;
                    this._constantService.fetchDataApi(this._constantService.getInviteFrndServiceUrl(), invite).subscribe(data => {
                        var responseData:any = data;
                        var status = responseData.STATUS;
                        if (status == this._constantService.success_msg) {
                            this.sendInvt = true;
                            this._constantService.showToast("Invitation sent successfully .","",1)
                            this.email= "";
                        }
                    });
                }
            } else {
                this.dataConf['msg'] = "Validation Error";
                this.dataConf['type'] = 2;
                this.dataConf['error_msg'] = "Please enter a valid email address";
                this.openConfirmation = true;
            }
        }else {
                this.dataConf['msg'] = "Validation Error";
                this.dataConf['type'] = 2;
                this.dataConf['error_msg'] = "Please enter a valid email address";
                this.openConfirmation = true;
            }

    }
}
