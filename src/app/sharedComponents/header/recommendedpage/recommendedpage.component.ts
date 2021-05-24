import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ConstantService} from '../../../services/constant.service';
import {EncryptionService} from '../../../services/encryption.service';
import {PostdataService} from   '../../../services/postdata.service';

@Component({
    selector: 'app-recommendedpage',
    templateUrl: './recommendedpage.component.html',
    styleUrls: ['./recommendedpage.component.scss', './newrecommendedpage.component.scss']
})
export class RecommendedpageComponent implements OnInit {
    username: any;
    @Input() pageId: string;
    @Output() hideSugg = new EventEmitter()
    pageSugg = [];
    date = new Date();
    config: any;
    addclass:boolean= false;
    hidefollow:boolean =true;

    constructor(
        public _constantService: ConstantService,
        private _encrypt: EncryptionService,
        private postData: PostdataService
    ) {}

    ngOnInit() {
        this.getPageSuggestion();
        this.username = this._constantService.getSessionDataBYKey('username');
    }

    getPageSuggestion() {
        var pageSugg = {};
        pageSugg['token'] = this._constantService.getSessionDataBYKey('token');
        pageSugg['token_param'] = {};
        pageSugg['token_param']['device_type'] = 'w';
        pageSugg['token_param']['host'] = '';
        pageSugg['user_interest'] = this._constantService.getSessionDataBYKey('user_interest_id');

       

        this._constantService.fetchDataApi(this._constantService.getPageSuggestionServiceUrl(),pageSugg).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token',responseData.TOKEN);
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
                    this.pageSugg[i]['followStatus'] = false;
                }

            }
        })
    }

    pageFollowUnFollow(id, ind) {
        var followUnfollow = {};
        followUnfollow['token'] = this._constantService.getSessionDataBYKey('token');
        followUnfollow['token_param'] = {};
        followUnfollow['token_param']['device_type'] = 'w';
        followUnfollow['token_param']['host'] = '';
        followUnfollow['pg_uuid'] = id;
        followUnfollow['followed']=false;
        

        this._constantService.fetchDataApi(this._constantService.getPageFollowServiceUrl(),followUnfollow).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                 ////// done by vijay//////

                 // var index = this.pageSugg.findIndex(x => x.PAGE_UUID == id);
                 // if (index != -1) {



                        // this.addclass = true;
                        // this.hidefollow = false;
                     this.pageSugg[ind]['followStatus'] = true;
                     setTimeout(() => {

                        this.pageSugg.splice(ind, 1);
                     }, 3000);
                 /////end by vijay/////
                }
            // }
        })
    }

}
