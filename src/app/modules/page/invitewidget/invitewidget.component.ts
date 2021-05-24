import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ConstantService } from './../../../services/constant.service';
import { PostdataService } from './../../../services/postdata.service';
import { EncryptionService } from './../../../services/encryption.service';

@Component({
    selector: 'app-invitewidget',
    templateUrl: './invitewidget.component.html',
    styleUrls: ['./invitewidget.component.scss', './newinvitewidget.component.scss', './../../../sharedComponents/peopleyouknow/peopleyouknow.component.scss',]
})
export class InvitewidgetComponent implements OnInit {
    invitepopupshow: boolean = false;
    show: boolean = true;

    @Input() pageId: string;
    oldPageId: string = "";
    count = 1;
    inviteList = [];
    continueScroll: boolean = false;
    config: any;

    constructor(
        private _constantService: ConstantService,
        private _encrypt: EncryptionService,
        private postData: PostdataService
    ) { }

    ngOnInit() {
        this.oldPageId = this.pageId;
        //        this.getFriend4InvitePage(this.count);
    }


    showselect() {
        this.show = !this.show
        let invtselected = document.querySelectorAll('input[name="invtFrndWid"]');
        var length = invtselected.length;
        if (length != 0) {
            var invtfrnd = (<HTMLInputElement><any>document.querySelectorAll('input[name="invtFrndWid"]'));
            for (var i = 0; i < length; i++) {
                if (this.show) {
                    invtfrnd[i].checked = false;
                } else {
                    invtfrnd[i].checked = true;
                }
            }
        }
    }


    getFriend4InvitePage(count) {
        var inviteFrnds = {};
        inviteFrnds['token'] = this._constantService.getSessionDataBYKey('token');
        inviteFrnds['token_param'] = {};
        inviteFrnds['token_param']['device_type'] = "w";
        inviteFrnds['token_param']['host'] = '';
        inviteFrnds['pg_uuid'] = this.pageId;
        inviteFrnds['count'] = count;

        this._constantService.fetchDataApi(this._constantService.getInviteFriends4PageServiceUrl(), inviteFrnds).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            this.count = 0;
            if (status == this._constantService.success_msg) {
                if (count == 1) {
                    this.inviteList = [];
                }
                this.count++;
                var inviteListArr = responseData.INVITATION_LIST; if (inviteListArr.length == 0 && this.inviteList.length == 0) {
                    this._constantService.showToast("No Connection Left", "", "1");
                    this.close_popup();
                }
                else if (inviteListArr.length !== 0) {
                    this.invitepopupshow = true;
                }                                                                   
                else if (inviteListArr.length < 10) {
                    this.continueScroll = false;
                } else {
                    this.continueScroll = true;
                }

                for (var i = 0; i < inviteListArr.length; i++) {
                    inviteListArr[i].FULL_NAME = inviteListArr[i].FIRST_NAME + " " + inviteListArr[i].LAST_NAME;
                    if (inviteListArr[i].PROFILE_PHOTO_PATH != null) {
                        inviteListArr[i].PROFILE_PHOTO_PATH = inviteListArr[i].PROFILE_PHOTO_PATH + "profile/" + inviteListArr[i].USER_ID + "_60x60.png";
                    } else {
                        inviteListArr[i].PROFILE_PHOTO_PATH = this._constantService.defaultImgPath;
                    }
                }
                this.inviteList.push.apply(this.inviteList, inviteListArr);
            }
        });
    }

    sendInvite(event) {
        let invtselected = document.querySelectorAll('input[name="invtFrndWid"]:checked');
        var length = invtselected.length;
        if (length != 0) {
            var invt = (<HTMLInputElement><any>document.querySelectorAll('input[name="invtFrndWid"]:checked'));
            var arr = [];
            for (var i = 0; i < length; i++) {
                arr.push(invt[i].value);
            }
            var sendInvite = {};
            sendInvite['token'] = this._constantService.getSessionDataBYKey('token');
            sendInvite['token_param'] = {};
            sendInvite['token_param']['device_type'] = 'w';
            sendInvite['token_param']['host'] = '';
            sendInvite['pg_uuid'] = this.pageId;
            sendInvite['user_id'] = arr.join();

            this._constantService.fetchDataApi(this._constantService.getSendInviteFriends4PageServiceUrl(), sendInvite).subscribe(data => {
                var responseData:any = data;
                var status = responseData.STATUS;
                if (status == this._constantService.success_msg) {
                    for (var j = 0; j < arr.length; j++) {
                        var index = this.inviteList.findIndex(x => x.USER_ID == parseInt(arr[j]));
                        this.inviteList.splice(index, 1);
                    }
                    this.show = true;
                    this.getFriend4InvitePage(this.count);
                }
            });
        } else {
        }

    }

    onScrollDown() {
        if (this.continueScroll) {
            this.getFriend4InvitePage(this.count);
        }
    }

    openinvitefriend() {
        this.getFriend4InvitePage(this.count);
        ////////////////////change done by vijay////////////////
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");

        let leftmenufixed = document.getElementsByClassName('rightmenu_fixed');
        for (let i = 0; i <= leftmenufixed.length; i++) {
            leftmenufixed[i].classList.add("fixedposition");
        }
    }

    close_popup() {

        this.invitepopupshow = false;
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");

        let leftmenufixed = document.getElementsByClassName('rightmenu_fixed');
        for (let i = 0; i <= leftmenufixed.length; i++) {
            leftmenufixed[i].classList.remove("fixedposition");
        }
    }
}
