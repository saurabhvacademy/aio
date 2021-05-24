import {Component, OnInit, Output, Input, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {ConstantService} from './../../../services/constant.service';
import {PostdataService} from './../../../services/postdata.service';
import {EncryptionService} from './../../../services/encryption.service';
import { PerfectScrollbarConfigInterface , PerfectScrollbarDirective, PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';

@Component({
    selector: 'app-invitefriends',
    templateUrl: './invitefriends.component.html',
    styleUrls: ['./invitefriends.component.scss','./../../../sharedComponents/peopleyouknow/peopleyouknow.component.scss','./newinvitefriends.component.scss']
})
export class InvitefriendsComponent implements OnInit {
    show: boolean = true;
    @Input() pageId: string;
    @Output() showWidget = new EventEmitter<boolean>();
    count = 1;
    inviteList = [];
    continueScroll: boolean = false;
    disableInvites: boolean = false;
    oldPageId: string = '';
    public config:PerfectScrollbarConfigInterface={};
     @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
     @ViewChild(PerfectScrollbarDirective) directiveRef?: PerfectScrollbarDirective;
     
    showselect() {
        this.show = !this.show
        let invtselected = document.querySelectorAll('input[name="invtFrnd"]');
        var length = invtselected.length;
        if (length != 0) {
            var invtfrnd = (<HTMLInputElement> <any> document.querySelectorAll('input[name="invtFrnd"]'));
            for (var i = 0; i < length; i++) {
                if (this.show) {
                    invtfrnd[i].checked = false;
                } else {
                    invtfrnd[i].checked = true;
                }
            }
        }

    }
    constructor(
        public _constantService: ConstantService,
        private _encrypt: EncryptionService,
        private postData: PostdataService,
        private element:  ElementRef,
    ) {}

    ngOnInit() {
        this.oldPageId = this.pageId;
        this.getFriend4InvitePage(this.count);
    }

    ngDoCheck() {
        if (this.pageId != this.oldPageId) {
            this.oldPageId = this.pageId;
            this.count = 1;
            this.getFriend4InvitePage(this.count);
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
            if (status == this._constantService.success_msg) {
                if (count == 1) {
                    this.inviteList = [];
                }
              
                var inviteListArr = responseData.INVITATION_LIST;
                if (inviteListArr.length < 10) {
                    this.continueScroll = false;
                } else {
                    this.continueScroll = true;
                }
                for (var i = 0; i < inviteListArr.length; i++) {
                    inviteListArr[i].FULL_NAME = inviteListArr[i].FIRST_NAME +" "+ inviteListArr[i].LAST_NAME;
                    if (inviteListArr[i].PROFILE_PHOTO_PATH != null) {
                        inviteListArr[i].PROFILE_PHOTO_PATH = inviteListArr[i].PROFILE_PHOTO_PATH + "profile/" + inviteListArr[i].USER_ID + "_60x60.png";
                    } else {
                        inviteListArr[i].PROFILE_PHOTO_PATH = this._constantService.defaultImgPath;
                    }
                }
                this.inviteList.push.apply(this.inviteList, inviteListArr);
                if (this.inviteList.length == 0) {
                    this.showWidget.emit(false);
                }
            }
        });
    }

    sendInvite() {
        this.disableInvites = true;
        let invtselected = document.querySelectorAll('input[name="invtFrnd"]:checked');
        var length = invtselected.length;
        if (length != 0) {
            var invt = (<HTMLInputElement> <any> document.querySelectorAll('input[name="invtFrnd"]:checked'));
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
                    if(this.inviteList.length == 0){
                        this.getFriend4InvitePage(this.count);

                    }
                    this.show = true;
                    this.disableInvites = false;
                }else if(status=="error_token"){
                    alert(responseData.ERROR_MSG);
                }
            });
        } else {
            this.disableInvites = false;
        }
        this.componentRef.directiveRef.update();
    }

    onScrollDown() { 
        if (this.continueScroll) {
            this.count++;
            this.getFriend4InvitePage(this.count);
        }
    }

}
