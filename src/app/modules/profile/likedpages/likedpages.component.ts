import {Component, OnInit} from '@angular/core';
import {ConstantService} from './../../../services/constant.service';
import {EncryptionService} from './../../../services/encryption.service';
import {PostdataService} from './../../../services/postdata.service';
import {Router} from '@angular/router';
@Component({
    selector: 'app-likedpages',
    templateUrl: './likedpages.component.html',
    styleUrls: ['../mypages/mypages.component.scss','./../newprofile.component.scss']
})
export class LikedpagesComponent implements OnInit {
    UsrTyp: any;
    pages = [];
    startLoader: boolean = true;
    continueScroll: boolean = false;
    laddtm:any=0;
    pagePresent: boolean = false;
    constructor(
        public _constantService: ConstantService,
        private _encrypt: EncryptionService,
        private _router: Router,
        private postData: PostdataService
    ) {}

    ngOnInit() {
        this.getMyFollowedPages('');
    }
    getMyFollowedPages(laddtm) {
        this.continueScroll=false;
        var mypage = {};
        mypage['token'] = this._constantService.getSessionDataBYKey('token');
        mypage['token_param'] = {};
        mypage['token_param']['device_type'] = 'w';
        mypage['token_param']['host'] = '';
        mypage['count'] = '8';
        mypage['lpg_flw_id'] = laddtm;
        mypage['flow'] = 'd';

        this._constantService.fetchDataApi(this._constantService.getFollowedPageServiceUrl(), mypage).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == "success") {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token',responseData.TOKEN);
                var page = responseData.PAGES;               
                if (page.length != 0) {
                    this.startLoader = false;
                    this.pagePresent = true;
                    this.laddtm = page[page.length - 1].PAGE_FOLLOW_ID;
                    for (var i = 0; i < page.length; i++) {
                        this.UsrTyp =  page[i].TYPE;
                        if ((page[i].TITLE != '') && (page[i].TITLE != null)) {
                            page[i].TITLE = this.postData.decodeURIPostData(page[i].TITLE);
                        }
                        if (page[i].PROFILE_PHOTO_PATH != '' && page[i].PROFILE_PHOTO_PATH != null) {
                            page[i].PROFILE_PHOTO_PATH = page[i].PROFILE_PHOTO_PATH + "profile/" + page[i].PAGE_UUID + "_120x120.png";
                        } else {
                            if (this.UsrTyp == 0) {
                                page[i].PROFILE_PHOTO_PATH = this._constantService.defaultPageIndImgPath;
                            } else if (this.UsrTyp == 1) {
                                page[i].PROFILE_PHOTO_PATH = this._constantService.defaultPageCollgImgPath;
                            }
                        }
                        
                        if(page[i].PAGE_NAME != "" && page[i].PAGE_NAME != null){
                            page[i].URL = page[i].PAGE_NAME;
                        } else {
                            page[i].URL = page[i].PAGE_UUID;
                        }
                    }
                    this.pages.push.apply(this.pages, page);
                }
                if (page.length == 0 && laddtm == "") {
                    this.startLoader = false;
                    this.pagePresent = false;
                }
                if (page.length < 8) {
                    this.continueScroll = false;
                } else {
                    this.continueScroll = true;
                }
            } else {

            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    pageFollowUnFollow(id, index) {
        var followUnfollow = {};
        followUnfollow['token'] = this._constantService.getSessionDataBYKey('token');
        followUnfollow['token_param'] = {};
        followUnfollow['token_param']['device_type'] = 'w';
        followUnfollow['token_param']['host'] = '';
        followUnfollow['pg_uuid'] = id;

        this._constantService.fetchDataApi(this._constantService.getPageUnFollowServiceUrl(), followUnfollow).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                // (<HTMLElement> document.getElementById(id)).style.display = "none";
                this.pages.splice(index, 1);
                if (this.pages.length == 0) {
                    this.pagePresent = false;
                }


            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    onScrollDown() {
        if (this.continueScroll && this.laddtm!=0) {
            this.getMyFollowedPages(this.laddtm);
        }
    }
}
