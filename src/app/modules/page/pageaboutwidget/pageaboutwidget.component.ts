import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {EncryptionService} from './../../../services/encryption.service';
import {ConstantService} from './../../../services/constant.service';
import {PostdataService} from './../../../services/postdata.service';

@Component({
    selector: 'app-pageaboutwidget',
    templateUrl: './pageaboutwidget.component.html',
    styleUrls: ['./pageaboutwidget.component.scss']
})
export class PageaboutwidgetComponent implements OnInit {
    @Input() publicView: boolean;
    @Input() pageid: string;
    @Input() pageName: string;
    @Input() usrTyp: string;
    @Output() changePageTab = new EventEmitter<any>();
    shortDesc: string = '';
    website: string = '';
    phone: string = '';
    summaryDivShow = 1;
    loadPageAbout:boolean=true;
    t: string = "";
    constructor(
        public _constantService: ConstantService,
        private _encryptionService: EncryptionService,
        private _router: Router,
        private activatedRoute: ActivatedRoute,
        private postData: PostdataService
    ) {
    }

    ngOnInit() {
        if (this.publicView) {
            this.getpgAbout(this.pageid);
        } else {
            this.getpageAbout(this.pageid);
        }
    }

    getpageAbout(id) {
        var pageDetail = {};
        pageDetail['token'] = this._constantService.getSessionDataBYKey('token');
        pageDetail['token_param'] = {};
        pageDetail['token_param']['device_type'] = 'w';
        pageDetail['token_param']['host'] = '';
        pageDetail['pg_uuid'] = id;

        this._constantService.fetchDataApi(this._constantService.getPageAboutServiceUrl(), pageDetail).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.loadPageAbout = false;
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token',responseData.TOKEN);
                if (responseData.PAGE_ABOUT.SHORT_DESCRIPTION != null) {
                    this.shortDesc = this.postData.decodeURIPostData(responseData.PAGE_ABOUT.SHORT_DESCRIPTION);
                }
                if (responseData.PAGE_ABOUT.WEBSITE != null) {
                    this.website = responseData.PAGE_ABOUT.WEBSITE;
                }
                if (responseData.PAGE_ABOUT.PHONE != null) {
                    this.phone = responseData.PAGE_ABOUT.PHONE;
                }
                if (this.shortDesc == '' && this.pageName == '' && this.website == '' && this.phone == '') {
                    this.summaryDivShow = 2;
                }
            } else if (status == "error_token") {

            } else {

            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });

    }

    goToAbout(typ) {
        if (typ == 1) {
            var obj = {"tab": 2, "edit": false}
            this.changePageTab.emit(obj);
        }
        if (typ == 2) {
            var obj = {"tab": 2, "edit": true}
            this.changePageTab.emit(obj);
        }
    }

    getpgAbout(paramsId) {
        var details = {};
        details['pg_uuid'] = paramsId;
        this._constantService.fetchDataApi(this._constantService.getpgAbout(), details).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.loadPageAbout = false;
                if (responseData.PAGE_ABOUT.SHORT_DESCRIPTION != null) {
                    this.shortDesc = this.postData.decodeURIPostData(responseData.PAGE_ABOUT.SHORT_DESCRIPTION);
                }

                if (responseData.PAGE_ABOUT.WEBSITE != null) {
                    this.website = responseData.PAGE_ABOUT.WEBSITE;
                }
                if (responseData.PAGE_ABOUT.PHONE != null) {
                    this.phone = responseData.PAGE_ABOUT.PHONE;
                }
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }
    
    savePublicPostUrlFxn(){
        if (this.publicView){
            this._constantService.setSessionJsonPair('publicClickedURL', 'page/' + this.pageid);
        }
    }
}
