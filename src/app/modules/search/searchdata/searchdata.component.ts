import { Component, OnInit, Input, Output, ComponentFactoryResolver, ViewContainerRef, ViewChild, EventEmitter } from '@angular/core';
import { ConstantService } from './../../../services/constant.service';
import { EncryptionService } from './../../../services/encryption.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PostdataService } from './../../../services/postdata.service';
import { InternalMessageService } from '../../../services/internal-message.service';
import { SearchPostComponent } from '../search-post/search-post.component';

@Component({
    selector: 'app-searchdata',
    templateUrl: './searchdata.component.html',
    styleUrls: ['./searchdata.component.scss'],
    providers: [ConstantService, EncryptionService, PostdataService]

})
export class SearchdataComponent implements OnInit {
    @Input() childTypes: number = 0;
    @ViewChild('container', { read: ViewContainerRef }) container;
    @Output() messageEvent = new EventEmitter<number>();
    dataConf = {};
    search_id = '';
    search_name = '';
    count: number = 1;
    rcount: number = 4;
    search_Data = [];
    search_page = [];
    search_people = [];
    post_Data = [];
    course_Instance: boolean = true;
    courseData: any[];
    page_Instance: boolean = true;
    people_Instance: boolean = true;
    connect: boolean;
    followbutton: boolean;
    factory;
    ref;
    emptyStatepage: boolean = false;
    view: any;
    concentration: boolean = true;
    continueScroll: boolean = false;
    applyFilters: any;
    isNewCourse: any;
    sevenDaysInMilleSeconds = 604800000;
    postDataLength: any;
    header: boolean;
    t: any;
    openLoginPopup: boolean = false;




    constructor(
        public _constantService: ConstantService,
        private _encrypt: EncryptionService,
        private _router: Router,
        public activatedRoute: ActivatedRoute,
        private postData: PostdataService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private listerSearchFilterData: InternalMessageService





    ) { }

    ngOnInit() {
        this.t = this._constantService.getSessionDataBYKey('token');
        if(this.t){
            this.header=true;
        }else{
            this.header=false;

        }
        this.activatedRoute.params.subscribe((params: Params) => {
            if (params['tabid']) {
                this.search_id = params['tabid'];
                if (this.search_name != '' && this.search_name != params['id']) {
                    this.search_name = params['id'];
                    this.getSearchWallData(this.childTypes);
                } else if (this.search_name == '') {
                    this.search_name = params['id'];
                }
            }
        });

        // this.getSearchWallData(this.childTypes);

        this.listerSearchFilterData.message.subscribe((message) => {
            this.count = 1;
            this.search_Data = [];
            this.search_page = [];
            this.search_people = [];
            this.post_Data = [];
            this.applyFilters = message;
            this.getDataForSearch(this.applyFilters);

        })
    }

    ///////////////////////////////////////////select type for different tabs////////////////////////////////////////////////////
    getSearchWallData(childTypes) {
        this.childTypes = childTypes;
        this.continueScroll = false;
        switch (childTypes) {
            case 0:
                this.count = 1;
                this.rcount = 4;
                window.history.replaceState(null, null, 'searchresult/all/' + this.search_name.trim());
                break;

            case 1:
                this.count = 1;
                this.rcount = 10;
                window.history.replaceState(null, null, 'searchresult/courses/' + this.search_name.trim());
                break;

            case 2:
                this.count = 1;
                this.rcount = 10;
                window.history.replaceState(null, null, 'searchresult/pages/' + this.search_name.trim());
                break;

            case 3:
                this.count = 1;
                this.rcount = 10;
                window.history.replaceState(null, null, 'searchresult/people/' + this.search_name.trim());
                break;

            case 4:
                this.count = 1;
                this.rcount = 10;
                window.history.replaceState(null, null, 'searchresult/posts/' + this.search_name.trim());
                break;

        }
        this.getDataForSearch("");
    }
    //////////////////////////////////////////////get data from api/////////////////////////////////////////////////////////
    getDataForSearch(postbojdata) {
        this.t = this._constantService.getSessionDataBYKey('token');
        const hitObj = {};

        if(this.t){
            hitObj['token'] = this._constantService.getSessionDataBYKey('token');
            hitObj['token_param'] = {};
            hitObj['token_param']['device_type'] = "w";
            hitObj['token_param']['host'] = "";
            hitObj['sdt'] = this.search_name;
            hitObj['type'] = this.childTypes;
            hitObj['count'] = this.count;
            hitObj['r_count'] = this.rcount;
            if (postbojdata) {
                hitObj['validity'] = postbojdata.validity;
                hitObj['level'] = postbojdata.level;
                hitObj['course_type'] = postbojdata.course_type;
                hitObj['filter_type'] = postbojdata.filter_type;
                hitObj['postedby'] = postbojdata.postedby;
                hitObj['mypage'] = postbojdata.mypage;
                hitObj['pgfiltertyp'] = postbojdata.pgfiltertyp;
                hitObj['usr_fl'] = postbojdata.usr_fl;
            }
        }else{
            hitObj['sdt'] = this.search_name;
            hitObj['type'] = this.childTypes;
            hitObj['count'] = this.count;
            hitObj['r_count'] = this.rcount;
            if (postbojdata) {
                hitObj['validity'] = postbojdata.validity;
                hitObj['level'] = postbojdata.level;
                hitObj['course_type'] = postbojdata.course_type;
                hitObj['filter_type'] = postbojdata.filter_type;
                hitObj['postedby'] = postbojdata.postedby;
                hitObj['mypage'] = postbojdata.mypage;
                hitObj['pgfiltertyp'] = postbojdata.pgfiltertyp;
                hitObj['usr_fl'] = postbojdata.usr_fl;
            }
        }
 
        this._constantService.fetchDataApi(this._constantService.getWallSearchViewData(), hitObj).subscribe(data => {
            const responseData:any = data;
            const status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                if (this.count == 1) {
                    this.postDataLength = 0;
                    this.container.clear();
                    this.search_Data = [];
                    this.search_page = [];
                    this.search_people = [];
                    this.post_Data = [];
                }
                ////////////////////////////////////////////////////for all tab ///////////////////////////////////////////////////////////////////
                if (this.childTypes == 0) {

                    this.course_Instance = true;
                    this.page_Instance = true;
                    this.people_Instance = true;
                    this.emptyStatepage = false;
                    this.concentration = true;
                    ////////////////////////////////////////////////////for course//////////////////////////////////////////////////////////////////////////
                    if (responseData.COURSE_SEARCH_DATA && responseData.COURSE_SEARCH_DATA.length != 0) {
                        var search_Data = responseData.COURSE_SEARCH_DATA;
                        for (var i = 0; i < search_Data.length; i++) {
                            search_Data[i].TITLE = this.postData.decodeURIPostData(search_Data[i].COURSE_TITLE);
                            search_Data[i].PAGE_TITLE = this.postData.decodeURIPostData(search_Data[i].PAGE_TITLE);
                            search_Data[i].PAGE_UUID = search_Data[i].PAGE_UUID;
                            search_Data[i].COURSE_URL;
                            if (search_Data[i].PUBLISH_DATE_TIME) {
                                let date = new Date();
                                search_Data[i]['isNewCourse'] = (parseInt(search_Data[i].PUBLISH_DATE_TIME, 10) + this.sevenDaysInMilleSeconds >= date.getTime());
                            }
                            if (search_Data[i].COVER_TYPE == 1) {
                                search_Data[i].COURSE_PHOTO_PATH = search_Data[i].COURSE_COVER_PHOTO_PATH + "?v=" + search_Data[i].IMG_UPD_DT;
                            } else {
                                search_Data[i].COURSE_PHOTO_PATH = search_Data[i].COURSE_COVER_PHOTO_PATH + "cover/" + search_Data[i].COURSE_UUID + "_1235x330.png?v=" + search_Data[i].IMG_UPD_DT;
                            }
                        }

                        this.search_Data = search_Data;
                    } else {
                        this.course_Instance = false;
                    }
                    //////////////////////////////////////////////////for page/////////////////////////////////////////////////////////////////////////
                    if (responseData.PAGE_SEARCH_DATA && responseData.PAGE_SEARCH_DATA.length != 0) {
                        var search_page = responseData.PAGE_SEARCH_DATA;
                        for (var i = 0; i < search_page.length; i++) {
                            search_page[i].TITLE = search_page[i].TITLE;
                            search_page[i].COUNT = search_page[i].PAGE_FOLLOW_COUNT;
                            search_page[i].PAGE_PROFILE_PATH = this._constantService.createPageProfilePath(search_page[i].PROFILE_PHOTO_PATH, search_page[i].PAGE_UUID, search_page[i].IMG_UPD_DT, search_page[i].TYPE);
                            search_page[i]['isFollowing'] = search_page[i].ISFOLLOW;
                            search_page[i].PAGEUUID = search_page[i].PAGE_UUID;
                        }
                        this.search_page = search_page;
                    } else {
                        this.page_Instance = false;

                    }
                    ////////////////////////////////////////////////////for people //////////////////////////////////////////////////////////
                    if (responseData.USER_SEARCH_DATA && responseData.USER_SEARCH_DATA.length != 0) {
                        var search_people = responseData.USER_SEARCH_DATA;
                        for (var i = 0; i < search_people.length; i++) {
                            search_people[i].NAME = search_people[i].FIRST_NAME + " " + search_people[i].LAST_NAME;
                            search_people[i].USERNAME = search_people[i].USER_NAME;
                            search_people[i].ACTIVE_TIME = this.postData.getPostDateTime(search_people[i].LAST_ACTIVE_TIME);
                            search_people[i].USER_PROFILE = this._constantService.createuserProfilePath(search_people[i].PROFILE_PHOTO_PATH, search_people[i].USER_ID, search_people[i].IMG_UPD_DT);
                            search_people[i]['isFriend'] = search_people[i].FRIEND_STATUS;
                        }
                        this.search_people = search_people;
                    } else {
                        this.people_Instance = false;
                    }
                    /////////////////////////////////////////////for post//////////////////////////////////////////////////////////////////////
                    if (responseData.POST_SEARCH_DATA && responseData.POST_SEARCH_DATA.length != 0) {
                        var post_Data = responseData.POST_SEARCH_DATA;
                        for (var i = 0; i < post_Data.length; i++) {
                            this.searchPostBuilder(post_Data[i]);
                        }
                        if (responseData.POST_SEARCH_DATA.length) {
                            this.postDataLength = responseData.POST_SEARCH_DATA.length;
                        } else {
                            this.postDataLength = 0;
                        }

                        this.post_Data = post_Data;
                    } else {
                        this.container.clear();
                    }
                }
                ////////////////*******for typ 1******/////////////////////
                if (this.childTypes == 1) {
                    if (this.count == 1) {
                    }
                    this.course_Instance = true;
                    this.page_Instance = false;
                    this.people_Instance = false;
                    this.emptyStatepage = false;
                    this.concentration = false;
                    this.container.clear();


                    if (responseData.COURSE_SEARCH_DATA && responseData.COURSE_SEARCH_DATA.length == this.rcount) {
                        this.continueScroll = true;
                    } else {
                        this.continueScroll = false;
                    }

                    if (responseData.COURSE_SEARCH_DATA && responseData.COURSE_SEARCH_DATA.length != 0) {

                        let search_Data = responseData.COURSE_SEARCH_DATA;
                        for (var i = 0; i < search_Data.length; i++) {
                            search_Data[i].TITLE = this.postData.decodeURIPostData(search_Data[i].COURSE_TITLE);
                            search_Data[i].PAGE_TITLE = this.postData.decodeURIPostData(search_Data[i].PAGE_TITLE);
                            search_Data[i].PAGE_UUID = search_Data[i].PAGE_UUID;
                            search_Data[i].COURSE_URL;
                            if (search_Data[i].PUBLISH_DATE_TIME) {
                                let date = new Date();
                                search_Data[i]['isNewCourse'] = (parseInt(search_Data[i].PUBLISH_DATE_TIME, 10) + this.sevenDaysInMilleSeconds >= date.getTime());
                            }
                            if (search_Data[i].COVER_TYPE == 1) {
                                search_Data[i].COURSE_PHOTO_PATH = search_Data[i].COURSE_COVER_PHOTO_PATH + "?v=" + search_Data[i].IMG_UPD_DT;
                            } else {
                                search_Data[i].COURSE_PHOTO_PATH = search_Data[i].COURSE_COVER_PHOTO_PATH + "cover/" + search_Data[i].COURSE_UUID + "_1235x330.png?v=" + search_Data[i].IMG_UPD_DT;
                            }
                        }
                        this.search_Data.push.apply(this.search_Data, search_Data);
                    } else if (this.search_Data.length == 0) {
                        this.course_Instance = false;
                        this.emptyStatepage = true;
                        this.view = 1;
                    }
                }                        ////////////////*****for typ 2********////////////////
                if (this.childTypes == 2) {

                    this.page_Instance = true;
                    this.course_Instance = false;
                    this.people_Instance = false;
                    this.emptyStatepage = false;
                    this.concentration = false;
                    this.container.clear();


                    if (responseData.PAGE_SEARCH_DATA && responseData.PAGE_SEARCH_DATA.length == this.rcount) {
                        this.continueScroll = true;
                    } else {
                        this.continueScroll = false;
                    }

                    if (responseData.PAGE_SEARCH_DATA && responseData.PAGE_SEARCH_DATA.length != 0) {
                        var search_page = responseData.PAGE_SEARCH_DATA;
                        for (var i = 0; i < search_page.length; i++) {
                            search_page[i].TITLE = search_page[i].TITLE;
                            search_page[i].COUNT = search_page[i].PAGE_FOLLOW_COUNT;
                            search_page[i].PAGE_PROFILE_PATH = this._constantService.createPageProfilePath(search_page[i].PROFILE_PHOTO_PATH, search_page[i].PAGE_UUID, search_page[i].IMG_UPD_DT, search_page[i].TYPE);
                            search_page[i]['isFollowing'] = search_page[i].ISFOLLOW;
                            search_page[i].PAGEUUID = search_page[i].PAGE_UUID;
                            search_page[i].PAGE_NAME = search_page[i].PAGE_NAME;
                        }
                        this.search_page.push.apply(this.search_page, search_page);
                    } else if (this.search_page.length == 0) {
                        this.emptyStatepage = true;
                        this.view = 2;
                        this.page_Instance = false;
                    }
                }                        /////////////////*****for typ 3*********////////////
                if (this.childTypes == 3) {

                    this.people_Instance = true;
                    this.course_Instance = false;
                    this.page_Instance = false;
                    this.emptyStatepage = false;
                    this.concentration = false;
                    this.container.clear();

                    if (responseData.USER_SEARCH_DATA && responseData.USER_SEARCH_DATA.length == this.rcount) {
                        this.continueScroll = true;
                    } else {
                        this.continueScroll = false;
                    }

                    if (responseData.USER_SEARCH_DATA && responseData.USER_SEARCH_DATA.length != 0) {
                        var search_people = responseData.USER_SEARCH_DATA;
                        for (var i = 0; i < search_people.length; i++) {
                            search_people[i].NAME = search_people[i].FIRST_NAME + " " + search_people[i].LAST_NAME;
                            search_people[i].USERNAME = search_people[i].USER_NAME;
                            search_people[i].ACTIVE_TIME = this.postData.getPostDateTime(search_people[i].LAST_ACTIVE_TIME);
                            search_people[i].USER_PROFILE = this._constantService.createuserProfilePath(search_people[i].PROFILE_PHOTO_PATH, search_people[i].USER_ID, search_people[i].IMG_UPD_DT);
                            search_people[i]['isFriend'] = search_people[i].FRIEND_STATUS;


                        }
                        this.search_people.push.apply(this.search_people, search_people);
                    } else if (this.search_people.length == 0) {
                        this.emptyStatepage = true;
                        this.view = 3;
                        this.people_Instance = false;
                    }
                }                     ////////////////////////*****for typ 4*******///////////////
                if (this.childTypes == 4) {

                    this.course_Instance = false;
                    this.page_Instance = false;
                    this.people_Instance = false;
                    this.emptyStatepage = false;
                    this.concentration = false;


                    if (responseData.POST_SEARCH_DATA && responseData.POST_SEARCH_DATA.length == this.rcount) {
                        this.continueScroll = true;
                    } else {
                        this.continueScroll = false;
                    }
                    if (responseData.POST_SEARCH_DATA && responseData.POST_SEARCH_DATA.length) {
                        this.postDataLength = responseData.POST_SEARCH_DATA.length;
                    } else {
                        this.postDataLength = 0;
                    }

                    if (responseData.POST_SEARCH_DATA && responseData.POST_SEARCH_DATA.length != 0) {
                        var post_Data = responseData.POST_SEARCH_DATA;
                        for (var i = 0; i < post_Data.length; i++) {
                            this.searchPostBuilder(post_Data[i]);
                        }

                        this.post_Data.push.apply(this.post_Data, post_Data);
                    } else if (this.post_Data.length == 0) {
                        this.emptyStatepage = true;
                        this.view = 4;
                    }
                }
                if (this.search_page.length == 0
                    && this.search_Data.length == 0
                    && this.post_Data.length == 0
                    && this.search_people.length == 0
                    && this.childTypes != 1
                    && this.childTypes != 2
                    && this.childTypes != 3
                    && this.childTypes != 4
                ) {
                    this.emptyStatepage = true;
                    this.view = 5;
                }

            } else if (status == this._constantService.error_token) {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired!";
                return false;
            } else {
                this._router.navigate(['404']);
            }
        }), error => {
            var err = error;
            if (err.status == 500) {
                this._router.navigate(['500']);
            }
        };
    }


    showAllConcentration(value) {
        if (value == 0) {
            this.messageEvent.emit(1)
            this._router.navigate(['/searchresult/courses/' + this.search_name]);

        } else if (value == 1) {
            this.messageEvent.emit(2)
            this._router.navigate(['/searchresult/pages/' + this.search_name]);

        } else if (value == 2) {
            this.messageEvent.emit(3)
            this._router.navigate(['/searchresult/people/' + this.search_name]);
        } else if (value == 3) {
            this.messageEvent.emit(4)
            this._router.navigate(['/searchresult/posts/' + this.search_name]);
        }

    }



    pageFollowUnFollow(id, ind) {                            ////////////****page follow*****//////////////////
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
                this.search_page[ind].isFollowing = 1;
            }
        })
    }



    sendRequest(event, i) {  
        this.t = this._constantService.getSessionDataBYKey('token');
        if( this.t ){                                          ////////////****request sent *****//////////////////
        var sendSuggestionRequest = {};
        sendSuggestionRequest['token'] = this._constantService.getSessionDataBYKey('token');
        sendSuggestionRequest['token_param'] = {};
        sendSuggestionRequest['token_param']['device_type'] = 'w';
        sendSuggestionRequest['token_param']['host'] = '';
        sendSuggestionRequest['conrecid'] = this.search_people[i].USER_ID;
        var id = "sugg_" + event.target.id;
        this._constantService.fetchDataApi(this._constantService.getSendConnectionRequestServiceUrl(), sendSuggestionRequest).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.search_people[i]['isFriend'] = 0;

            }
            else {
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    } else{
        this.loginpopupopen();
    }
}


    cancelFrndReq(event, i) { 
        this.t = this._constantService.getSessionDataBYKey('token');
        if( this.t ){                                                       ////////////****cancel request*****//////////////////
        var cancelReq = {};
        cancelReq['token'] = this._constantService.getSessionDataBYKey('token');
        cancelReq['token_param'] = {};
        cancelReq['token_param']['device_type'] = 'w';
        cancelReq['token_param']['host'] = '';
        cancelReq['conrecid'] = this.search_people[i].USER_ID;
        var id = "sugg_" + event.target.id;

        this._constantService.fetchDataApi(this._constantService.getCancelFrndReqServiceUrl(), cancelReq).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.search_people[i]['isFriend'] = null;

            }
        })
    }
 else{
    this.loginpopupopen();
}
    }


    searchPostBuilder(post_Data) {
        if (post_Data['USER_ID'] == this._constantService.getSessionDataBYKey('u_id')) {
            post_Data['MY_PROFILE'] = true;
        } else {
            post_Data['MY_PROFILE'] = false;
        }
        post_Data['ADD_DATE_TIME'] = this.postData.getPostDateTime(post_Data['ADD_DATE_TIME']);
        this.factory = this.componentFactoryResolver.resolveComponentFactory(SearchPostComponent);
        this.ref = this.container.createComponent(this.factory);
        this.ref.instance._ref = this.ref;
        this.ref.instance.postData = post_Data;
    }


    onScrollDown() {
        if (this.childTypes == 0) return;
        this.count++;
        this.rcount = 10;
        this.getDataForSearch(this.applyFilters);

    }

    sendToInbox(searchpeople) {
        this.t = this._constantService.getSessionDataBYKey('token');
        if( this.t ){ 
        this._constantService.setSessionJsonPair('user_name', searchpeople.FIRST_NAME);
        this._constantService.setSessionJsonPair('friend_user_id', searchpeople.USER_ID);
        this._router.navigate(['/inbox/' + searchpeople.USER_NAME]);
    } else{
        this.loginpopupopen();
    }
}

    updateSourcePicPage(event) {
        event.target.src = this._constantService.defaultPageCollgImgPath;
    }

 loginpopupopen() {
        // this.courseData['USER_FULL_NAME'] = this.courseTitle;
        // this.courseData['PROFILE_PIC_PATH'] = this.corsCoverPath;
        this.openLoginPopup = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
        this._constantService.setSessionJsonPair('publicClickedURL', 'searchresult/' + this.search_id +'/'+ this.search_name );


    }
    closeLoginPopUp(event) {
        this.openLoginPopup = false;
        if (event['LOGIN']) {
            // this.withoutToken = false;
            //this._constantService.setPublicClickedUrl('course/' + this.Corsid);
            // this._constantService.setSessionJsonPair('publicClickedURL', 'course/' + this.CorsUrl);
        }
    }
    updateSourcePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }
}
