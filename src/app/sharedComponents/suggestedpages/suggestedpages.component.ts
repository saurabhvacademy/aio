import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConstantService } from './../../services/constant.service';
import { EncryptionService } from './../../services/encryption.service';
import { PostdataService } from './../../services/postdata.service';

@Component({
    selector: 'app-suggestedpages',
    templateUrl: './suggestedpages.component.html',
    styleUrls: ['./suggestedpages.component.scss', './newsuggestedpages.component.scss']
})
export class SuggestedpagesComponent implements OnInit {
    @Output() hideSugg = new EventEmitter();
    @Input() pageId: string;
    @Input() pageUuid: string;
    @Input() interest;
    pageSugg = [];
    date = new Date();
    config: any;
    withoutToken: boolean;
    isPageuuid: boolean = false;
    token: any;
    constructor(
        public _constantService: ConstantService,
        private _encrypt: EncryptionService,
        private postData: PostdataService
    ) { }

    ngOnInit() {
        this.token = this._constantService.getSessionDataBYKey('token');

        if (this.token != null && this.token != 'undefined' && this.token != '') {
            this.getPageSuggestion();
            this.withoutToken = true;
        }
        else {
            this.withoutToken = true;
            setTimeout(() => {
                this.getpublicPageSuggestion();
            }, 300);

        }
    }

    openLoginPopup() {
        this._constantService.openloginPopup();
    }

    getPageSuggestion() {
        var pageSugg = {};
        pageSugg['token'] = this._constantService.getSessionDataBYKey('token');
        pageSugg['token_param'] = {};
        pageSugg['token_param']['device_type'] = 'w';
        pageSugg['token_param']['host'] = '';
        pageSugg['user_interest'] = this.interest.toString();
        this._constantService.fetchDataApi(this._constantService.getPageSuggestionServiceUrl(), pageSugg).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.isPageuuid = true;
                this.pageSugg = responseData.PAGE_SUGG;
                if (this.pageSugg.length == 0) {
                    this.hideSugg.emit(true);
                    return;
                }
                for (var i = 0; i < this.pageSugg.length; i++) {
                    this.pageSugg[i].IS_FOLLOWED = 0;
                    this.pageSugg[i].TITLE = this.postData.decodeURIPostData(this.pageSugg[i].TITLE);
                    if (this.pageSugg[i].PROFILE_PHOTO_PATH != null) {
                        this.pageSugg[i].PROFILE_PHOTO_PATH = this.pageSugg[i].PROFILE_PHOTO_PATH + "profile/" + this.pageSugg[i].PAGE_UUID + "_120x120.png?v=" + responseData.IMG_UPD_DT
                    } else {
                        if (this.pageSugg[i].TYPE == 0) {
                            this.pageSugg[i].PROFILE_PHOTO_PATH = this._constantService.defaultPageIndImgPath;
                        } else {
                            this.pageSugg[i].PROFILE_PHOTO_PATH = this._constantService.defaultPageCollgImgPath;
                        }
                    }
                    if (this.pageSugg[i].PAGE_NAME != null) {
                        this.pageSugg[i].ID = this.pageSugg[i].PAGE_NAME;
                    } else {
                        this.pageSugg[i].ID = this.pageSugg[i].PAGE_UUID;
                    }
                }

            }
        })
    }



    getpublicPageSuggestion() {
        var pageSugg = {};
        pageSugg['pg_uuid'] = this.pageUuid;

        this._constantService.fetchDataApi(this._constantService.getPublicPageSuggestionServiceUrl(), pageSugg).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.isPageuuid = true;
                this.pageSugg = responseData.PAGE_SUGG;
                if (this.pageSugg.length == 0) {
                    this.hideSugg.emit(true);
                    return;
                }
                for (var i = 0; i < this.pageSugg.length; i++) {
                    this.pageSugg[i].IS_FOLLOWED = 0;
                    this.pageSugg[i].TITLE = this.postData.decodeURIPostData(this.pageSugg[i].TITLE);
                    if (this.pageSugg[i].PROFILE_PHOTO_PATH != null) {
                        this.pageSugg[i].PROFILE_PHOTO_PATH = this.pageSugg[i].PROFILE_PHOTO_PATH + "profile/" + this.pageSugg[i].PAGE_UUID + "_120x120.png?v=" + responseData.IMG_UPD_DT
                    } else {
                        if (this.pageSugg[i].TYPE == 0) {
                            this.pageSugg[i].PROFILE_PHOTO_PATH = this._constantService.defaultPageIndImgPath;
                        } else {
                            this.pageSugg[i].PROFILE_PHOTO_PATH = this._constantService.defaultPageCollgImgPath;
                        }
                    }
                    if (this.pageSugg[i].PAGE_NAME != null) {
                        this.pageSugg[i].ID = this.pageSugg[i].PAGE_NAME;
                    } else {
                        this.pageSugg[i].ID = this.pageSugg[i].PAGE_UUID;
                    }
                }

            }
        })
    }



    pageFollowUnFollow(id, index) {
        console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<,,,jayvi");
        var followUnfollow = {};
        followUnfollow['token'] = this._constantService.getSessionDataBYKey('token');
        followUnfollow['token_param'] = {};
        followUnfollow['token_param']['device_type'] = 'w';
        followUnfollow['token_param']['host'] = '';
        followUnfollow['pg_uuid'] = id;

        this._constantService.fetchDataApi(this._constantService.getPageFollowServiceUrl(), followUnfollow).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                var index = this.pageSugg.findIndex(x => x.PAGE_UUID == id);
                if (index != -1) {
                    //this.pageSugg.splice(index,1);
                }
                this.pageSugg[index].IS_FOLLOWED = 1;

            }
        })
    }
    routeToNewPage(id){
        window.open(window.location.origin + '/page/' + id, '_self');


    }
}
