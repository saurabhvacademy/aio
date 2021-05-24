import { Component, OnInit, AfterViewInit, EventEmitter, Output, HostListener, ViewChild, ElementRef, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EncryptionService } from './../../services/encryption.service';
import { ConstantService } from './../../services/constant.service';
import { PostdataService } from './../../services/postdata.service';
import { Location } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-loginheader',
    templateUrl: './loginheader.component.html',
    styleUrls: ['./loginheader.component.scss']
})
export class LoginheaderComponent implements OnInit {
    paginationCount: number = 0;
    data: any;
    openConfirmation: boolean;
    dataConf: any;
    @Output() closePopup = new EventEmitter<object>();
    @Output() searchedObj = new EventEmitter();
    closePopupObj = {};
    userPwd: any = '';
    typ: string;
    errorText: string = '';
    isError: boolean = false;
    openLoginPopupType: number;
    userCred: any = '';
    withoutToken: boolean = false;
    openLoginPopup: boolean = false;
    showPreloader = false;
    timer = null;
    searchInput = "";
    post_ids = [];
    user_ids = [];
    page_ids = [];
    course_ids = [];
    searched_user = [];
    searched_post = [];
    searched_page = [];
    searched_course = [];
    searchUserPresent: boolean = false;
    searchPostPresent: boolean = false;
    searchPagePresent: boolean = false;
    searchCoursePresent: boolean = false;
    noResult: boolean = false;
    searchdrop = false;
    showSearchBar: boolean = false;
    isResponsive = false;
    activeMenuCond: boolean = false;
    serachResponsiveView: boolean = false;
    @Input() showStudyIndiaFoundationLogo = false;
    @Input() showSearchList = true;
    @Output() sessionLogout = new EventEmitter<boolean>();
    @Input() hideInterestDropdown = true;
    @Input() showBrowseTest = false;

    constructor(
        public _constantService: ConstantService,
        public _router: Router,
        public _encryptionService: EncryptionService,
        private activatedRoute: ActivatedRoute,
        private postData: PostdataService,
        private location: Location,
        private _cookie: CookieService
    ) { }

    ngOnInit() {
        this._cookie.delete('publicClickedURL');


        if (!this._cookie.get('study247')) {
            document.cookie = "study247=study24x7";

        }
        if (window.innerWidth < 768) {
            this.isResponsive = true;
        }
        var herf = this._router.url;
        var urlArr = herf.split("/");
        if (urlArr[1] === "searchresult") {
            this.showSearchBar = true;
            this.searchInput = this.searchInput.toLowerCase();
            this.searchInput = urlArr[3];
        } else {
            this.showSearchBar = false;
        }
    }

    closeLoginPopUp(event) {
        this.openLoginPopup = false;
        if (event['LOGIN']) {
            this.withoutToken = false;
            this.activatedRoute.params.subscribe((params: Params) => {
                this.getUserDetail();
            });
        }
    }

    getUserDetail() {
        var user_details = {};
        user_details['token'] = this._constantService.getSessionDataBYKey('token');
        user_details['token_param'] = {};
        user_details['token_param']['device_type'] = "w";
        user_details['token_param']['host'] = '';
        user_details['myprofile'] = 'yes';
        user_details['username'] = '';



        this._constantService.fetchDataApi(this._constantService.getUserDetailsServiceUrl(), user_details).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            var date = new Date();
            if (status == this._constantService.success_msg) {
                this._constantService.setSessionJsonPair('full_name', responseData.FULL_NAME);
                this._constantService.setSessionJsonPair('u_id', responseData.USER_ID);
                this._constantService.setSessionJsonPair('username', responseData.USER_NAME.trim());
                this._constantService.setSummary(responseData.SUMMARY);
                this._constantService.setSessionJsonPair('connection', responseData.CONNECTIONS);
                this._constantService.setSessionJsonPair('followers', responseData.FOLLOWER);
                this._constantService.setSessionJsonPair('followings', responseData.FOLLOWING);
                this._constantService.setSessionJsonPair('profile_pic_s3', responseData.PROFILE_PHOTO_PATH);
                if (responseData.PROFILE_PHOTO_PATH)
                    this._constantService.setSessionJsonPair('p_pic', responseData.PROFILE_PHOTO_PATH + "profile/" + this._constantService.getSessionDataBYKey('u_id') + "_60x60.png?v=" + date.getTime());
                this._constantService.setSessionJsonPair('dob', responseData.DOB);
                this._constantService.setSessionJsonPair('gender', responseData.GENDER);
            }
        });
    }


    getInterest() {

        this._constantService.getInterest();
    }


    latestPostInterest() {
        var lastInterest = {};
        lastInterest['token'] = this._constantService.getSessionDataBYKey('token');
        lastInterest['token_param'] = {};
        lastInterest['token_param']['device_type'] = 'w';
        lastInterest['token_param']['host'] = '';
        lastInterest['page_uuid'] = "";


        this._constantService.fetchDataApi(this._constantService.getLtUserInterestServiceUrl(), lastInterest).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this._constantService.setLtPostInterest(responseData.LATEST_INTEREST_ID);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    loginpopupopen() {
        this.openLoginPopup = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }

    search(e) {
        if (e.keyCode != 8) {
            clearTimeout(this.timer);
            var router = this._router;
            var post_ids = "";
            var user_ids = "";
            var friendsDetails;
            this.timer = setTimeout(this.sendToSearch.bind(this), 1000);
        }

    }

    searchText() {
        var search = {};
        this.searchInput = this.searchInput.toLowerCase();
        var data = this.searchInput.trim();
        search['token'] = this._constantService.getSessionDataBYKey('token');
        search['token_param'] = {};
        search['token_param']['device_type'] = 'w';
        search['token_param']['host'] = '';
        search['sdt'] = data;


        this._constantService.fetchDataApi(this._constantService.getSearchWall10ServiceUrl(), search).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {

                this.post_ids = responseData.SEARCHED_PID;
                this.user_ids = responseData.SEARCHED_UID;
                this.page_ids = responseData.SEARCHED_PAGEID;
                this.course_ids = responseData.SEARCHED_CORSID;
                this.searched_user = [];
                this.searched_post = [];
                this.searched_page = [];
                this.searched_course = [];
                this.searchUserPresent = false;
                this.searchPostPresent = false;
                this.searchPagePresent = false;
                this.searchCoursePresent = false;
                if (this.user_ids.length == 0 && this.post_ids.length == 0 && this.page_ids.length == 0 && this.course_ids.length == 0) {
                    this.searchdrop = true;
                    this.noResult = true;
                } else {
                    this.noResult = false;
                }
                if (this.user_ids.length != 0) {
                    this.getSearchUserDetails(this.user_ids.join());
                }
                if (this.post_ids.length != 0) {
                    this.getSearchPostData(this.post_ids.join());
                }
                if (this.page_ids.length != 0) {
                    this.getSearchPageDetails(this.page_ids.join());
                }
                if (this.course_ids.length != 0) {
                    this.getCourseData4Srch(this.course_ids.join());
                }
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = "responseData.ERROR_MSG2";
                this.openConfirmation = true;
            }

        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });

    }

    getSearchPageDetails(ids: string) {

        var pageDetails = {};
        pageDetails['token'] = this._constantService.getSessionDataBYKey('token');
        pageDetails['token_param'] = {};
        pageDetails['token_param']['device_type'] = 'w';
        pageDetails['token_param']['host'] = '';
        pageDetails['pg_uuids'] = ids;



        this._constantService.fetchDataApi(this._constantService.getSearchedPageDataServiceUrl(), pageDetails).subscribe(data => {
            this.data = data["_body"];
            let responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.searchdrop = true;
                this.searchPagePresent = true;
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.searched_page = [];
                this.searched_page = responseData.POST_DATA;
                for (var i = 0; i < this.searched_page.length; i++) {
                    this.searched_page[i].TITLE = this.postData.decodeURIPostData(this.searched_page[i].TITLE);
                    if (this.searched_page[i].PROFILE_PHOTO_PATH != null) {
                        this.searched_page[i].PROFILE_PHOTO_PATH = this.searched_page[i].PROFILE_PHOTO_PATH + "profile/" + this.searched_page[i].PAGE_UUID + "_120x120.png";
                    } else {
                        if (this.searched_page[i].TYPE == 0) {
                            this.searched_page[i].PROFILE_PHOTO_PATH = this._constantService.defaultPageIndImgPath;
                        } else {
                            this.searched_page[i].PROFILE_PHOTO_PATH = this._constantService.defaultPageCollgImgPath;
                        }
                    }
                    if (this.searched_page[i].PAGE_NAME != null) {
                        this.searched_page[i].ID = this.postData.decodeURIPostData(this.searched_page[i].PAGE_NAME);
                    } else {
                        this.searched_page[i].ID = this.postData.decodeURIPostData(this.searched_page[i].PAGE_UUID);
                    }
                }
                if (this.searched_page.length == 0) {
                    this.noResult = true;
                }
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    getCourseData4Srch(ids: string) {

        var connDetails = {};
        connDetails['token'] = this._constantService.getSessionDataBYKey('token');
        connDetails['token_param'] = {};
        connDetails['token_param']['device_type'] = 'w';
        connDetails['token_param']['host'] = '';
        connDetails['cors_uuids'] = ids;



        this._constantService.fetchDataApi(this._constantService.getCourseData4Srch(), connDetails).subscribe(data => {
            this.data = data["_body"];
            let responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.searchdrop = true;
                this.searchCoursePresent = true;
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.searched_course = [];
                this.searched_course = responseData.COURSE_DATA;

                for (var i = 0; i < this.searched_course.length; i++) {
                    this.searched_course[i].COURSE_TITLE = this.postData.decodeURIPostData(this.searched_course[i].COURSE_TITLE);
                    //  this.searched_course[i].PAGE_NAME = this.searched_course[i].PAGE_TITLE ;
                    if (this.searched_course[i].COVER_PHOTO_PATH != null) {
                        this.searched_course[i].COVER_PHOTO_PATH = this.searched_course[i].COVER_PHOTO_PATH + "cover/" + this.searched_course[i].COURSE_UUID + "_1235x330.png";
                    } else {
                        this.searched_course[i].COVER_PHOTO_PATH = this._constantService.defaultCoverImgPath;
                    }
                    var x = this.searched_course[i].COURSE_TAGS;
                    x = x.replace(/,/g, ", ");
                    this.searched_course[i].COURSE_TAGS = x;
                }

            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    getSearchUserDetails(ids: string) {

        var connDetails = {};
        connDetails['token'] = this._constantService.getSessionDataBYKey('token');
        connDetails['token_param'] = {};
        connDetails['token_param']['device_type'] = 'w';
        connDetails['token_param']['host'] = '';
        connDetails['fid'] = ids;



        this._constantService.fetchDataApi(this._constantService.getConnectionDetailsServiceUrl(), connDetails).subscribe(data => {
            this.data = data["_body"];
            let responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.searchdrop = true;
                this.searchUserPresent = true;
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.searched_user = [];
                this.searched_user = responseData.FRIENDS_DETAIL;
                for (var i = 0; i < this.searched_user.length; i++) {
                    this.searched_user[i].FULL_NAME = this.searched_user[i].FIRST_NAME + " " + this.searched_user[i].LAST_NAME;
                    if (this.searched_user[i].PROFILE_PHOTO_PATH != null) {
                        this.searched_user[i].PROFILE_PHOTO_PATH = this.searched_user[i].PROFILE_PHOTO_PATH + "profile/" + this.searched_user[i].USER_ID + "_60x60.png";
                    } else {
                        this.searched_user[i].PROFILE_PHOTO_PATH = this._constantService.defaultImgPath;
                    }
                }
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }


    getSearchPostData(post_ids) {

        var searchPostData = {};
        searchPostData['token'] = this._constantService.getSessionDataBYKey('token');
        searchPostData['token_param'] = {};
        searchPostData['token_param']['device_type'] = 'w';
        searchPostData['token_param']['host'] = '';
        searchPostData['pid'] = post_ids;



        this._constantService.fetchDataApi(this._constantService.getSearchPostDataServiceUrl(), searchPostData).subscribe(data => {
            let responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.searchdrop = true;
                this.searchPostPresent = true;
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.searched_post = [];
                this.searched_post = responseData.POST_DATA;
                for (var i = 0; i < this.searched_post.length; i++) {

                    if (this.searched_post[i].TEXT != null) {
                        this.searched_post[i].TEXT = this.postData.decodeURIPostData(this.searched_post[i].TEXT);
                    }
                    if (this.searched_post[i].PAGE_UUID) {
                        if (this.searched_post[i].PAGE_PROFILE_PHOTO_PATH != null) {
                            this.searched_post[i].PROFILE_PHOTO_PATH = this.searched_post[i].PAGE_PROFILE_PHOTO_PATH + "profile/" + this.searched_post[i].PAGE_UUID + "_60x60.png";
                        } else {
                            if (this.searched_post[i].PAGE_TYPE == 0) {
                                this.searched_post[i].PROFILE_PHOTO_PATH = this._constantService.defaultPageIndImgPath;
                            } else if (this.searched_post[i].PAGE_TYPE == 1) {
                                this.searched_post[i].PROFILE_PHOTO_PATH = this._constantService.defaultPageCollgImgPath;
                            }
                        }

                        this.searched_post[i].USER_FULL_NAME = this.postData.decodeURIPostData(this.searched_post[i].TITLE);
                    } else {
                        if (this.searched_post[i].PROFILE_PHOTO_PATH != null) {
                            this.searched_post[i].PROFILE_PHOTO_PATH = this.searched_post[i].PROFILE_PHOTO_PATH + "profile/" + this.searched_post[i].USER_ID + "_60x60.png";
                        } else {
                            this.searched_post[i].PROFILE_PHOTO_PATH = this._constantService.defaultImgPath;
                        }
                    }
                }
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    sendToSearch() {
        this.searchInput = this.searchInput.toLowerCase();
        this.searchedObj.emit(this.searchInput.trim());
    }


    getSearchPublicPost() {
        this.searchInput = this.searchInput.toLowerCase();
        var data = this.searchInput.trim();
        if (data == null) {
            return false;
        }
        var searchText = {};
        searchText['sdt'] = data;
        searchText['page_post'] = this.paginationCount;



        this._constantService.fetchDataApi(this._constantService.getSearchPublicPost(), searchText).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //                console.log(responseData.SEARCHED_PURL);
                this.searchedObj.emit(responseData.SEARCHED_PURL);
            } else {
                this._router.navigate([''])
            }
        });
    }
    showResponsiveSearch() {

        this.activeMenuCond = !this.activeMenuCond;
        // this.showSerachResponsiveView = !this.showSerachResponsiveView;
    }
    openressearch() {
        this.serachResponsiveView = !this.serachResponsiveView;
    }

}
