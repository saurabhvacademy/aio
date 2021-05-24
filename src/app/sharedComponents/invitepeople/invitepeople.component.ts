import {Component, OnInit, Output, EventEmitter, Input, AfterViewInit} from '@angular/core';
import {ConstantService} from './../../services/constant.service';
import {EncryptionService} from './../../services/encryption.service';
import {Router} from '@angular/router';
declare const gapi: any;
declare const FB: any;
declare const $: any;

@Component({
    selector: 'app-invitepeople',
    templateUrl: './invitepeople.component.html',
    styleUrls: ['./invitepeople.component.scss','./newinvitepeople.component.scss']
})
export class InvitepeopleComponent implements OnInit, AfterViewInit {
    dataConf = {};
    openConfirmation: boolean = false;
    @Input() mediaTyp: number;
    @Output() popupCloseByCancelThread = new EventEmitter<boolean>();
    socialInvite: boolean = true;
    suggestionPresent: boolean = false;
    details;
    suggestion_id = [];
    config: string;
    public people = [{"USER_ID": 1}, {"USER_ID": 2}, {"USER_ID": 3}, {"USER_ID": 4}];
    popupCloseByCancelStatus: boolean;
    successpopupshow: boolean;
    public auth2: any;
    sendInvt: boolean = true;
    socialMediaTitle: string;
    sample = [{"USER_ID": 1, "USER_NAME": "1123qwe", "PROFILE_PHOTO_PATH": this._constantService.defaultImgPath, "FIRST_NAME": "TEST 1", "LAST_NAME": "USER2"}, {"USER_ID": 1, "USER_NAME": "1123qwe", "PROFILE_PHOTO_PATH": this._constantService.defaultImgPath, "FIRST_NAME": "TEST 1", "LAST_NAME": "USER2"}, {"USER_ID": 1, "USER_NAME": "1123qwe", "PROFILE_PHOTO_PATH": this._constantService.defaultImgPath, "FIRST_NAME": "TEST 1", "LAST_NAME": "USER2"}, {"USER_ID": 1, "USER_NAME": "1123qwe", "PROFILE_PHOTO_PATH": this._constantService.defaultImgPath, "FIRST_NAME": "TEST 1", "LAST_NAME": "USER2"}];
    googlePlusCont = [];
    inputId = '';
    wrongEmail: boolean = false;
    socialInvtEmails = [];
    alert: boolean = false;
    alertMsg: string = "";
    hideSocialInvitePopup() {
        this.socialInvite = false;
    }
    popupCloseByCancel() {
        this.popupCloseByCancelStatus = false;
        this.popupCloseByCancelThread.emit(this.popupCloseByCancelStatus);
        let leftmenufixed = document.getElementsByClassName('rightmenu_fixed');
        for(let i=0;i<=leftmenufixed.length;i++){
          leftmenufixed[i].classList.remove("fixedposition");
        }
    }

    constructor(
        public _constantService: ConstantService,
        private _encryptionService: EncryptionService,
        private _router: Router,
    ) {}

    ngOnInit() {
        //        gapi.load('client:auth2',         () => {
        //            this.auth2 = gapi.clien        t.init({
        //                apiKey:"AIzaSyD88klQLvh5QyqqWofcYdlEYojQH        GX2-os",
        //          clientId: '820432769646-0gu3aqlpqvfi80ibm99o22rrvgr81kar.apps.googleuserconte        nt.com',
        //          discoveryDocs: "https://www.googleapis.com/discovery/v1/apis/people/v        1/rest",
        //          scope: "https://www.googleapis.com/auth/contacts.r        eadonly"
        //        })
        //            this.listConnection        Names();
        //        });


        //          this.Inviteget10Suggestion();
        if (this.mediaTyp == 1) {
            this.socialMediaTitle = "email";
        } else if (this.mediaTyp == 2) {
            this.socialMediaTitle = "facebook";
        } else if (this.mediaTyp == 3) {
            this.socialMediaTitle = "google +";
            this.listConnectionNames();
        } else if (this.mediaTyp == 4) {
            this.socialMediaTitle = "twitter";
        }
    }

    ngAfterViewInit(): void {

        if (this.mediaTyp == 3) {

        }
    }

    signIn() {
        gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
                client_id: '820432769646-rvnalptiheclr2n3um6fevdcduill802.apps.googleusercontent.com',
                //                client_id: '820432769646-0gu3aqlpqvfi80ibm99o22rrvgr81kar.apps.googleusercontent.com',
                cookie_policy: 'single_host_origin',
                scope: 'profile email https://www.googleapis.com/auth/contacts.readonly'
            });
            this.listConnectionNames();

        });
    }
    onFailure() {}
    onSignIn = (data: any) => {

        setTimeout(() => this.listConnectionNames(), 1000);
    }
    listConnectionNames() {
        gapi.load('client:auth2', () => {
            gapi.client.init({
                apiKey: 'AIzaSyD88klQLvh5QyqqWofcYdlEYojQHGX2-os',
                //                apiKey: 'AIzaSyAFXTyehVY-ZlbYP-0GHSjeAzJ4TTTx5P0',
                discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1'],
                clientId: '820432769646-rvnalptiheclr2n3um6fevdcduill802.apps.googleusercontent.com',
                //                clientId: '820432769646-0gu3aqlpqvfi80ibm99o22rrvgr81kar.apps.googleusercontent.com',
                //                client_id:'1005259527524-p8o8uun9if4bvj96ake45pvm5c8t6h9a.apps.googleusercontent.com',
                //                client_id:'91716688283-anbdeg15ri3j53pnaa3tlohp4g8riuog.apps.googleusercontent.com',
                scope: 'profile email https://www.googleapis.com/auth/contacts.readonly'
            }).then(() => {
                return gapi.client.people.people.connections.list({
                    resourceName: 'people/me',
                    personFields: 'emailAddresses,names'
                });
            }).then(
                (res) => {
                    var googleConnections = res.result.connections;
                    for (var i = 0; i < googleConnections.length; i++) {
                        var obj = {};
                        obj['email'] = googleConnections[i].emailAddresses[0].value;
                        obj['name'] = googleConnections[i].names[0].displayName;
                        this.googlePlusCont.push(obj);
                    }
                    //this.userContacts.emit(this.transformToMailListModel(res.result));
                },
                error => console.log("ERROR " + JSON.stringify(error))
                );
        });
    }

    addMore() {
        this.people.push({"USER_ID": (this.people.length + 1)});
    }

    sendInvite() {
        //        var nodes = document.querySelectorAll(".invite_em");
        //        var ids = [];
        //        for (var i = 0; i< nodes.length;i++){
        //        }
//        if(this.wrongEmail==true){
//            this.alert = true;
//            this.alertMsg = "Enter a valid email address.";
//            return false;
//        } else {
//            this.alert = false;
//            this.alertMsg = "";
//        }

        if (this.sendInvt) {
            this.sendInvt = false;
            var ids = [];
            var ret = false;
            $(".invite_em").each(function () {
                if (ids.indexOf($(this)[0].value) == -1 && $(this)[0].value != "") {
                    if ($(this)[0].validity.valid) {
                        ids.push($(this)[0].value);
                    } else {
                        ret = true;
                    }
                }
            });
            if (ret) {
                this.sendInvt = true;
                this.alert = true;
                this.alertMsg = "Enter a valid email address.";
                return false;
            }
            if (ids.length == 0){
                this.sendInvt = true;
                this.alert = true;
                this.alertMsg = "Please provide atleast one email address.";
                return false;
            }
            var invite = {};
            invite['token'] = this._constantService.getSessionDataBYKey('token');
            invite['token_param'] = {};
            invite['token_param']['device_type'] = 'w';
            invite['token_param']['host'] = '';
            invite['email_ids'] = ids.join();

            this._constantService.fetchDataApi(this._constantService.getInviteFrndServiceUrl(), invite).subscribe(data => {
                var responseData:any = data;
                var status = responseData.STATUS;
                if (status == this._constantService.success_msg) {
                    this.sendInvt = true;
                    this._constantService.showToast("Invitation sent successfully .","",1)
                    this.popupCloseByCancel();
                    
                }
            });
        }
    }

    sendSocialInvite() {
        if (this.sendInvt) {
            if (this.socialInvtEmails.length != 0) {
                this.sendInvt = false;
                var invite = {};
                invite['token'] = this._constantService.getSessionDataBYKey('token');
                invite['token_param'] = {};
                invite['token_param']['device_type'] = 'w';
                invite['token_param']['host'] = '';
                invite['email_ids'] = this.socialInvtEmails.join();

                this._constantService.fetchDataApi(this._constantService.getInviteFrndServiceUrl(), invite).subscribe(data => {
                    var responseData:any = data;
                    var status = responseData.STATUS;
                    if (status == this._constantService.success_msg) {
                        this.sendInvt = true;
                        this._constantService.showToast("Invitation sent successfully .","",1)
                        this.popupCloseByCancel();
                       
                    }
                })
            }
        }

    }

    onFocus(event) {
        this.inputId = event.target.id;
    }
    checkMail(event) {
        var xyz = (<HTMLInputElement> document.getElementById(this.inputId));
        if (xyz != undefined && xyz != null) {
            var emailAddress = xyz.value.toLowerCase();
            if (!this._constantService.isEmail(emailAddress) && emailAddress != "") {
                this.wrongEmail = true;
            } else {
                this.wrongEmail = false;
            }
        }
    }

    addInviteEmail(event) {
        if (event.target.checked) {
            this.socialInvtEmails.push(event.target.value);
        } else if (!event.target.checked) {
            var index = this.socialInvtEmails.indexOf(event.target.value);
            this.socialInvtEmails.splice(index, 1);
        }
    }

    hidealertmsg(){
        this.alert = false;
    }
    onFocusOut(event){ this.checkMail(event);

        if(this.wrongEmail==true){
            this.alert = true;
            this.alertMsg = "Enter a valid email address.";
            return false;
        } else {
            this.alert = false;
            this.alertMsg = "";
        }
    }
}
