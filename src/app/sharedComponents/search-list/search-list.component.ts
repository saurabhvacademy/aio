import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConstantService } from './../../services/constant.service';
import { PostdataService } from './../../services/postdata.service';


@Component({
    selector: 'app-search-list',
    templateUrl: './search-list.component.html',
    styleUrls: ['../header/headerSearch.component.scss', './search-list.component.scss']
})
export class SearchListComponent implements OnInit {
    searchTab: number = 0;
    timer = null;
    searchInput = "";
    searched_user = [];
    searched_post = [];
    searched_page = [];
    searched_course = [];
    searchUserPresent: boolean = false;
    searchPostPresent: boolean = false;
    searchPagePresent: boolean = false;
    searchCoursePresent: boolean;
    searchData: any;
    emptystate: boolean = false;
    dataConf = {};
    post_ids = [];
    page_ids = [];
    course_ids = [];
    user_ids = [];
    openConfirmation: boolean = false;
    data;
    @Input() isResponsive = false;
    inFocus = false;
    @Input() searchUiType=2;




    constructor(
        public _router: Router,
        public _constantService: ConstantService,
        public postData: PostdataService




    ) { }

    ngOnInit(): void {
    }
    searchout() {
        setTimeout(() => {
            this.searchTab = 0;
        }, 150)
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }

    recentSearchInput() {
        this.searchTab = 1;
        // this.getRecentvalues();
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }


    search(e) {
        if (e.keyCode != 8 && e.keyCode != 13) {
            clearTimeout(this.timer);
            var router = this._router;
            var post_ids = "";
            var user_ids = "";
            var friendsDetails;
            this.timer = setTimeout(this.searchText.bind(this), 1000);
        } else if (e.keyCode == 13) {
            this.navToSearch();
        }

    }

    navToSearch() {
        // this.hide_bg_shadow();
        if (this.searchInput.length >= 3) {
            this._router.navigate(['searchresult/all/' + this.searchInput]);
        }
    }

    searchText() {
        var search = {};
        var data = this.searchInput.trim();

        if (data.length < 3) {
            return false;
        }
        search['sdt'] = data;

        // this.setrecent(data);
        this._constantService.fetchDataApi(this._constantService.getSearchWall10ServiceUrl(), search).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.searchTab = 2;
                console.log(responseData);
                // this.post_ids = responseData.SEARCHED_PID;
                // this.user_ids = responseData.SEARCHED_UID;
                // this.page_ids = responseData.SEARCHED_PAGEID;
                // this.course_ids = responseData.SEARCHED_CORSID;
                this.searched_user = [];
                this.searched_post = [];
                this.searched_page = [];
                this.searched_course = [];
                this.searchUserPresent = false;
                this.searchPostPresent = false;
                this.searchPagePresent = false;
                this.searchCoursePresent = false;
                // if (this.user_ids.length == 0 && this.post_ids.length == 0 && this.page_ids.length == 0 && this.course_ids.length == 0) {
                //     this.searchdrop = true;
                //     this.noResult = true;
                // } else {
                //     this.noResult = false;
                // }


                this.searchData = responseData.SEARCH_DATA;
                if (this.searchData) {
                    console.log(this.searchData);
                    for (var i = 0; i < this.searchData.length; i++) {
                        if (this.searchData[i].ID == 3) {
                            if (this.searchData[i].USER_DATA.length != 0) {
                                this.searched_user = [];

                                this.searched_user = this.searchData[i].USER_DATA;
                                for (var j = 0; j < this.searched_user.length; j++) {
                                    this.searched_user[j].FULL_NAME = this.searched_user[j].FIRST_NAME + " " + this.searched_user[j].LAST_NAME;
                                    if (this.searched_user[j].PROFILE_PHOTO_PATH != null) {
                                        this.searched_user[j].PROFILE_PHOTO_PATH = this.searched_user[j].PROFILE_PHOTO_PATH + "profile/" + this.searched_user[j].USER_ID + "_60x60.png";
                                    } else {
                                        this.searched_user[j].PROFILE_PHOTO_PATH = this._constantService.defaultImgPath;
                                    }
                                }
                                console.log(this.searched_user)
                            }
                        }
                        if (this.searchData[i].ID == 4) {
                            if (this.searchData[i].PAGE_DATA.length != 0) {
                                this.searched_page = [];

                                this.searched_page = this.searchData[i].PAGE_DATA;
                                for (var j = 0; j < this.searched_page.length; j++) {
                                    this.searched_page[j].TITLE = this.postData.decodeURIPostData(this.searched_page[j].TITLE);
                                    if (this.searched_page[j].PROFILE_PHOTO_PATH != null) {
                                        this.searched_page[j].PROFILE_PHOTO_PATH = this.searched_page[j].PROFILE_PHOTO_PATH + "profile/" + this.searched_page[j].PAGE_UUID + "_120x120.png";
                                    } else {
                                        if (this.searched_page[j].TYPE == 0) {
                                            this.searched_page[j].PROFILE_PHOTO_PATH = this._constantService.defaultPageIndImgPath;
                                        } else {
                                            this.searched_page[j].PROFILE_PHOTO_PATH = this._constantService.defaultPageCollgImgPath;
                                        }
                                    }
                                    if (this.searched_page[j].PAGE_NAME != null) {
                                        this.searched_page[j].ID = this.postData.decodeURIPostData(this.searched_page[j].PAGE_NAME);
                                    } else {
                                        this.searched_page[j].ID = this.postData.decodeURIPostData(this.searched_page[j].PAGE_UUID);
                                    }
                                }
                                console.log(this.searched_page);
                            }
                        }
                        if (this.searchData[i].ID == 1) {
                            if (this.searchData[i].COURSE_DATA.length != 0) {
                                this.searched_course = [];

                                this.searched_course = this.searchData[i].COURSE_DATA;
                                for (var j = 0; j < this.searched_course.length; j++) {
                                    this.searched_course[j].COURSE_TITLE = this.postData.decodeURIPostData(this.searched_course[j].COURSE_TITLE);
                                    //  this.searched_course[i].PAGE_NAME = this.searched_course[i].PAGE_TITLE ;
                                    if (this.searched_course[j].COVER_PHOTO_PATH != null) {
                                        if (this.searched_course[j].COVER_TYPE == 0) {
                                            this.searched_course[j].COVER_PHOTO_PATH = this.searched_course[j].COVER_PHOTO_PATH + "cover/" + this.searched_course[j].COURSE_UUID + "_1235x330.png";
                                        }
                                    } else {
                                        this.searched_course[j].COVER_PHOTO_PATH = this._constantService.defaultCoverImgPath;
                                    }
                                    var x = this.searched_course[j].COURSE_TAGS;
                                    if (x) {
                                        x = x.replace(/,/g, ", ");
                                        this.searched_course[j].COURSE_TAGS = this.postData.decodeURIPostData(x);
                                    }
                                }
                                console.log(this.searched_user)
                            }
                        }
                        // if(this.searchData[i].ID == 2){
                        //     if(this.searchData[i].POST_DATA.length !=0 ){
                        //       this.searched_post = [];
                        //
                        //       this.searched_post = this.searched_post[i].POST_DATA;
                        //       for (var j = 0; j < this.searched_post.length; j++) {
                        //         if (this.searched_post[j].TEXT != null) {
                        //             this.searched_post[j].TEXT = this.postData.decodeURIPostData(this.searched_post[j].TEXT);
                        //         }
                        //         if (this.searched_post[j].PAGE_UUID) {
                        //             if (this.searched_post[j].PAGE_PROFILE_PHOTO_PATH != null) {
                        //                 this.searched_post[j].PROFILE_PHOTO_PATH = this.searched_post[j].PAGE_PROFILE_PHOTO_PATH + "profile/" + this.searched_post[j].PAGE_UUID + "_60x60.png";
                        //             } else {
                        //                 if (this.searched_post[j].PAGE_TYPE == 0) {
                        //                     this.searched_post[j].PROFILE_PHOTO_PATH = this._constantService.defaultPageIndImgPath;
                        //                 } else if (this.searched_post[j].PAGE_TYPE == 1) {
                        //                     this.searched_post[j].PROFILE_PHOTO_PATH = this._constantService.defaultPageCollgImgPath;
                        //                 }
                        //             }
                        //
                        //             this.searched_post[j].USER_FULL_NAME = this.postData.decodeURIPostData(this.searched_post[j].TITLE);
                        //         } else {
                        //             if (this.searched_post[j].PROFILE_PHOTO_PATH != null) {
                        //                 this.searched_post[j].PROFILE_PHOTO_PATH = this.searched_post[j].PROFILE_PHOTO_PATH + "profile/" + this.searched_post[j].USER_ID + "_60x60.png";
                        //             } else {
                        //                 this.searched_post[j].PROFILE_PHOTO_PATH = this._constantService.defaultImgPath;
                        //             }
                        //         }
                        //
                        //       }
                        //       console.log(this.searched_user)
                        //     }
                        //  }
                    }
                    if (this.searched_user.length == 0 && this.searched_page.length == 0 && this.searched_course.length == 0) {
                        console.log("user" + this.searched_user.length);
                        console.log("page" + this.searched_page.length);
                        console.log("searched_course" + this.searched_course.length);
                        console.log("in true");
                        this.emptystate = true;
                    } else {
                        console.log("in false");
                        this.emptystate = false;
                    }
                }


                if (this.user_ids.length != 0) {
                    // this.getSearchUserDetails(this.user_ids.join());
                    // this.searched_user = [];
                    // this.searched_user = responseData.FRIENDS_DETAIL;
                    // for (var i = 0; i < this.searched_user.length; i++) {
                    //     this.searched_user[i].FULL_NAME = this.searched_user[i].FIRST_NAME + " " + this.searched_user[i].LAST_NAME;
                    //     if (this.searched_user[i].PROFILE_PHOTO_PATH != null) {
                    //         this.searched_user[i].PROFILE_PHOTO_PATH = this.searched_user[i].PROFILE_PHOTO_PATH + "profile/" + this.searched_user[i].USER_ID + "_60x60.png";
                    //     } else {
                    //         this.searched_user[i].PROFILE_PHOTO_PATH = this._constantService.defaultImgPath;
                    //     }
                    // }
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
                // this.sessionLogout.emit(true);
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
                // this.searchdrop = true;
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
                // this.sessionLogout.emit(true);
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
                // this.searchdrop = true;
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
                // console.log(this.noResult);
                // console.log(this.searched_page);
                // if (this.searched_page.length == 0) {
                //     this.noResult = true;
                // }
            } else if (status == this._constantService.error_token) {
                // this.sessionLogout.emit(true);
            }
            // console.log(this.noResult);

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
                // this.searchdrop = true;
                this.searchCoursePresent = true;
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.searched_course = [];
                this.searched_course = responseData.COURSE_DATA;

                for (var i = 0; i < this.searched_course.length; i++) {
                    this.searched_course[i].COURSE_TITLE = this.postData.decodeURIPostData(this.searched_course[i].COURSE_TITLE);
                    //  this.searched_course[i].PAGE_NAME = this.searched_course[i].PAGE_TITLE ;
                    if (this.searched_course[i].COVER_PHOTO_PATH != null) {
                        if (this.searched_course[i].COVER_TYPE == 0) {
                            this.searched_course[i].COVER_PHOTO_PATH = this.searched_course[i].COVER_PHOTO_PATH + "cover/" + this.searched_course[i].COURSE_UUID + "_1235x330.png";
                        }
                    } else {
                        this.searched_course[i].COVER_PHOTO_PATH = this._constantService.defaultCoverImgPath;
                    }
                    var x = this.searched_course[i].COURSE_TAGS;
                    if (x) {
                        x = x.replace(/,/g, ", ");
                        this.searched_course[i].COURSE_TAGS = this.postData.decodeURIPostData(x);
                    }
                }

            } else if (status == this._constantService.error_token) {
                // this.sessionLogout.emit(true);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    seeall(index) {
        if (index == 0) {
            this._router.navigate(['/searchresult/courses/' + this.searchInput.trim()]);
            console.log("cor");
            console.log(this.searchInput);
        } else if (index == 1) {
            this._router.navigate(['/searchresult/pages/' + this.searchInput.trim()]);
            console.log("pag");
            console.log(this.searchInput);
        }
        else if (index == 2) {
            this._router.navigate(['/searchresult/people/' + this.searchInput.trim()]);
            console.log("peop");
            console.log(this.searchInput);
        }
    }

    emptysearch() {
        this.searchInput = "";
        console.log(this.searchInput);

    }
    searchFor() {
        this._router.navigate(['/searchresult/all/' + this.searchInput.trim()]);

    }

    routeTo(path, data) {
        if (path == 'course') {
            this._router.navigate(['/course/' + data.COURSE_URL]);
        }
        else if (path == 'page') {
            this._router.navigate(['/page/' + data.PAGE_UUID]);
        } else if (path == 'profile') {
            this._router.navigate(['/profile/' + data.USER_NAME]);
        }


    }

}
