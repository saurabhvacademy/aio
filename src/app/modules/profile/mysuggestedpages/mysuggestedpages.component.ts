import {Component, OnInit} from '@angular/core';
import {ConstantService} from './../../../services/constant.service';
import {EncryptionService} from './../../../services/encryption.service';
import {PostdataService} from './../../../services/postdata.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-mysuggestedpages',
  templateUrl: './mysuggestedpages.component.html',
  styleUrls: ['./../mypages/mypages.component.scss','./mysuggestedpages.component.scss']
})
export class MysuggestedpagesComponent implements OnInit {
    startLoader: boolean = true;
    pageID=[];
    UsrTyp: any;
    pages = [];
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
        this.getSuggestedPages(0);
    }

    getSuggestedPages(laddtm) {
        this.continueScroll=false;
        var pageSugg = {};
        pageSugg['token'] = this._constantService.getSessionDataBYKey('token');
        pageSugg['token_param'] = {};
        pageSugg['token_param']['device_type'] = 'w';
        pageSugg['token_param']['host'] = '';
        pageSugg['lssugg'] = laddtm;
        pageSugg['count'] = 10;
        pageSugg['flow'] = 'd';
        

        this._constantService.fetchDataApi(this._constantService.getAllPageSuggestionServiceUrl(), pageSugg).subscribe(data => {
            
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == "success") {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token',responseData.TOKEN);
                var page = responseData.PAGE_SUGG;                
                if (page.length != 0) {
                    this.startLoader = false;
                    this.pagePresent = true;
                    this.laddtm = page[page.length - 1].PAGE_UUID;
                    for (var i = 0; i < page.length; i++) {
                         this.UsrTyp = page[i].TYPE;
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
                        if(page[i].PAGE_NAME!=null){
                            page[i].ID=page[i].PAGE_NAME;
                        }else{
                            page[i].ID=page[i].PAGE_UUID;
                        }
                        page[i].FOLLOW_STATUS = 0;
                    }
                    this.pages.push.apply(this.pages, page);
                }

                if (page.length == 0 && laddtm == "") {
                    this.startLoader = false;
                    this.pagePresent = false;
                }
                if (page.length < 10) {
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

        this._constantService.fetchDataApi(this._constantService.getPageFollowServiceUrl(), followUnfollow).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                this.pages[index].FOLLOW_STATUS = 1;
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
            this.getSuggestedPages(this.laddtm);
        }
    }

}
