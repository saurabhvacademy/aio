import {Component, OnInit, Input} from '@angular/core';
import {ConstantService} from './../../../services/constant.service';
import {EncryptionService} from './../../../services/encryption.service';
import {PostdataService} from './../../../services/postdata.service';
import {Router} from '@angular/router';
@Component({
    selector: 'app-mypages',
    templateUrl: './mypages.component.html',
    styleUrls: ['./mypages.component.scss', './../newprofile.component.scss', './newmypages.component.scss']
})
export class MypagesComponent implements OnInit {
    wrongPass: boolean = false;
    User_fullname: any;
    User_Pp: any;
    page_uuid: any;
    id: any;
    pagId: any;
    UsrTyp: any;

    @Input() userType: number;
    @Input() usrName: number;
    pages = [];
    startLoader: boolean = true;
    continueScroll: boolean = false;
    laddtm: any = 0;
    pagePresent: boolean = false;
    // createpopup
    datatext: boolean = false;
    pageDelete: boolean = false;
    pagedeletePopup: boolean = false;
    followerCount:number = 0;
    hideDelete:boolean = false;

    hidePageCreatePopup(event) {
        this.datatext = event;
    }

    createnewpage() {
        this.datatext = !this.datatext;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }
    // end create popup
    constructor(
        public _constantService: ConstantService,
        private _encrypt: EncryptionService,
         private _router: Router,
        private postData: PostdataService
    ) {}

    ngOnInit() {
        this.getMyPages('');

    }

    date = new Date();

    getMyPages(laddtm) {
        this.continueScroll=false;
        var mypage = {};
        mypage['token'] = this._constantService.getSessionDataBYKey('token');
        mypage['token_param'] = {};
        mypage['token_param']['device_type'] = 'w';
        mypage['token_param']['host'] = '';
        mypage['count'] = '8';
        mypage['lpg_id'] = laddtm;
        mypage['flow'] = 'd';
        mypage['usr_name'] = this.usrName;

        this._constantService.fetchDataApi(this._constantService.getMyPageServiceUrl(), mypage).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == "success") {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token',responseData.TOKEN);
                var page = responseData.PAGES;
                if (page.length < 8) {
                    this.continueScroll = false;
                } else {
                    this.continueScroll = true;
                }

                if (page.length != 0) {
                    this.startLoader = false;
                    this.pagePresent = true;

                    this.laddtm = page[page.length - 1].PAGE_ID;
                    for (var i = 0; i < page.length; i++) {
                        if (this.userType != 2) {
                            page[i].FOLLOW_STATUS = 0;
                        }

                        this.UsrTyp = page[i].TYPE;
                        if (page[i].PROFILE_PHOTO_PATH != '' && page[i].PROFILE_PHOTO_PATH != null) {
                            page[i].PROFILE_PHOTO_PATH = page[i].PROFILE_PHOTO_PATH + "profile/" + page[i].PAGE_UUID + "_120x120.png?v=" + responseData.IMG_UPD_DT
                        } else {

                            if (this.UsrTyp == 0) {
                                page[i].PROFILE_PHOTO_PATH = this._constantService.defaultPageIndImgPath;
                            } else if (this.UsrTyp == 1) {
                                page[i].PROFILE_PHOTO_PATH = this._constantService.defaultPageCollgImgPath;
                            }
                        }
                        if ((page[i].TITLE != '') && (page[i].TITLE != null)) {
                            page[i].TITLE = this.postData.decodeURIPostData(page[i].TITLE);
                        }

                        if (page[i].PAGE_NAME != "" && page[i].PAGE_NAME != null) {
                            page[i].URL = page[i].PAGE_NAME;
                        } else {
                            page[i].URL = page[i].PAGE_UUID;
                        }
                        page[i]['delOpen'] = false;


                    }

                    this.pages.push.apply(this.pages, page);
                } else {
                    if (page.length == 0 && laddtm == "") {
                        this.startLoader = false;
                        this.pagePresent = false;
                    }
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
                //(<HTMLElement> document.getElementById(id)).style.display = "none";
                //this.pages.splice(index, 1);
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
            this.getMyPages(this.laddtm);
        }
    }

    pageDeleteMenu(event, i) {
        this.pages[i].delOpen = true;
        this.page_uuid = this.pages[i].PAGE_UUID;
        this.User_Pp = this.pages[i].PROFILE_PHOTO_PATH;
        this.User_fullname = this.pages[i].TITLE;
        //        setTimeout(()=>{
        //
        //        if (this.pages.indexOf(event.target.id)){
        //            this.id=event.target.id;
        //            this.pagId[this.id]['delOpen']=true;
        //        }
        this.pageDelete = !this.pageDelete;

    }
    
    toggleDelelte(){
      this.hideDelete = !this.hideDelete;
    }
    
    pageDeletePopup() {
        this.pagedeletePopup = !this.pagedeletePopup;
    }
    
    hidepageDelPopup() {
        this.pagedeletePopup = false;

    }
    hidepageDelMenu(i) {
        this.pages[i].delOpen = false;
    }

    GETverifyPass() {
        this.wrongPass = false;
        var password = (<HTMLInputElement> document.getElementById("password")).value;
        var verifyPass = {};
        verifyPass['token'] = this._constantService.getSessionDataBYKey('token');
        verifyPass['token_param'] = {};
        verifyPass['token_param']['device_type'] = 'w';
        verifyPass['token_param']['host'] = '';
        verifyPass['pw'] = password;

        this._constantService.fetchDataApi(this._constantService.getverifyPass(), verifyPass).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.getDeletePage();
            } else {
                this.wrongPass = true;
                (<HTMLInputElement> document.getElementById("password")).value = '';
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });

    }


    getDeletePage() {
        var deletePage = {};
        deletePage['token'] = this._constantService.getSessionDataBYKey('token');
        deletePage['token_param'] = {};
        deletePage['token_param']['device_type'] = 'w';
        deletePage['token_param']['host'] = '';
        deletePage['pg_uuid'] = this.page_uuid;

        this._constantService.fetchDataApi(this._constantService.getdeletePage(), deletePage).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
//                this._router.navigate(['/profile/' + this.usrName ]);
                window.location.reload();
            }
            if (status == "error") {
                (<HTMLInputElement> document.getElementById("password")).value = '';
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }
}
