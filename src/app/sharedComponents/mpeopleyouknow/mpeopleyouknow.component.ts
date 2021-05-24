import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {EncryptionService} from './../../services/encryption.service';
import {ConstantService} from './../../services/constant.service';
import {PostdataService} from './../../services/postdata.service';
// import * from 'jquery';
import * as $ from 'jquery';
@Component({
    selector: 'app-mpeopleyouknow',
    templateUrl: './mpeopleyouknow.component.html',
    styleUrls: ['./mpeopleyouknow.component.scss']
})
export class MpeopleyouknowComponent implements OnInit {
    username: any;
    @Input() pageId: string;
    @Output() hideSugg = new EventEmitter()
    pageSugg = [];
    pageData = [];
    date = new Date();
    config: any;
    lastIndex: number = 0;
    pagesuggestion2 = [];
    constructor(
        public _constantService: ConstantService,
        private _encrypt: EncryptionService,
        private postData: PostdataService
    ) {}

    ngOnInit() {
        $('.carousel.carousel-multi-item.v-2 .carousel-item').each(function () {
            var next = $(this).next();
            if (!next.length) {
                next = $(this).siblings(':first');
            }
            next.children(':first-child').clone().appendTo($(this));

            for (var i = 0; i < 3; i++) {
                next = next.next();
                if (!next.length) {
                    next = $(this).siblings(':first');
                }
                next.children(':first-child').clone().appendTo($(this));
            }
        });

        this.getPageSuggestion();
        this.username = this._constantService.getSessionDataBYKey('username');

    }

    getPageSuggestion() {
        var pageSugg1 = {};
        pageSugg1['token'] = this._constantService.getSessionDataBYKey('token');
        pageSugg1['token_param'] = {};
        pageSugg1['token_param']['device_type'] = 'w';
        pageSugg1['token_param']['host'] = '';
        pageSugg1['user_interest'] = this._constantService.getSessionDataBYKey('user_interest_id');

        this._constantService.fetchDataApi(this._constantService.getPageSuggestionServiceUrl(), pageSugg1).subscribe(data => {

            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.pageSugg = responseData.PAGE_SUGG;
                if (this.pageSugg.length == 0) {
                    this.hideSugg.emit(true);
                    return;
                }
                for (var i = 0; i < this.pageSugg.length; i++) {

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
                this.pushdatainto2dArray();
                // if (this.pageSugg.length <= 3) {
                //     this.getPageSuggestion();
                // }
            }
        })
    }

    pushdatainto2dArray() {
        this.pagesuggestion2 = [];
        var count = 0;

        for (var k = 0; k < Math.ceil(this.pageSugg.length / 3); k++) {
            var arr = [];
            for (var l = 0; l < 3; l++) {
                if (this.pageSugg[count] != undefined) {
                    arr.push(this.pageSugg[count]);
                }
                count++;
            }
            this.pagesuggestion2.push(arr);

        }
    }

    pageFollowUnFollow(id) {
        var followUnfollow = {};
        followUnfollow['token'] = this._constantService.getSessionDataBYKey('token');
        followUnfollow['token_param'] = {};
        followUnfollow['token_param']['device_type'] = 'w';
        followUnfollow['token_param']['host'] = '';
        followUnfollow['pg_uuid'] = id;

        this._constantService.fetchDataApi(this._constantService.getPageFollowServiceUrl(), followUnfollow).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                var index = this.pageSugg.findIndex(x => x.PAGE_UUID == id);
                if (index != -1) {
                    this.pageSugg.splice(index, 1);
                }
                this.pushdatainto2dArray();
            }
        })
    }

}
