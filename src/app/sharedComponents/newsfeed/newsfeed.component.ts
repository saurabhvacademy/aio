import { Component, HostListener, ViewChild, OnInit, ComponentFactoryResolver, ViewContainerRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConstantService } from './../../services/constant.service';
import { PostdataService } from './../../services/postdata.service';
import { EncryptionService } from './../../services/encryption.service';
import { LinkpostComponent } from './../postComponents/linkpost/linkpost.component';
import { TextpostComponent } from './../postComponents/textpost/textpost.component';
import { ImagepostComponent } from './../postComponents/imagepost/imagepost.component';
import { FileattachmentpostComponent } from './../postComponents/fileattachmentpost/fileattachmentpost.component';
import { SharedPostComponent } from '../postComponents/post/shared-post/shared-post.component';
import { SharedimagepostComponent } from './../postComponents/sharedimagepost/sharedimagepost.component';
import { SharedfileattachmentComponent } from './../postComponents/sharedfileattachment/sharedfileattachment.component';
import { SharedlinkpostComponent } from './../postComponents/sharedlinkpost/sharedlinkpost.component';
import { SinglechoicepostComponent } from './../postComponents/singlechoicepost/singlechoicepost.component';
import { MultiplechoicepostComponent } from './../postComponents/multiplechoicepost/multiplechoicepost.component';
import { TruefalsepostComponent } from './../postComponents/truefalsepost/truefalsepost.component';
import { SharedtruefalsepostComponent } from './../postComponents/sharedtruefalsepost/sharedtruefalsepost.component';
import { SharedsinglechoicepostComponent } from './../postComponents/sharedsinglechoicepost/sharedsinglechoicepost.component';
import { SharedmultiplechoicepostComponent } from './../postComponents/sharedmultiplechoicepost/sharedmultiplechoicepost.component';
import { SharedcoursepostComponent } from './../postComponents/sharedcoursepost/sharedcoursepost.component';
import { VideopostComponent } from './../postComponents//videopost/videopost.component';
import { SharedvideopostComponent } from './../postComponents/sharedvideopost/sharedvideopost.component';
import { PostotherviewComponent } from './../postComponents/postotherview/postotherview.component';
import { CoursepostComponent } from './../../sharedComponents/postComponents/coursepost/coursepost.component';
import { InternalMessageService } from './../../services/internal-message.service';
import { WallStateService } from 'src/app/modules/wall/services/wall-state.service';
import { SuggestedConnectionsComponent } from 'src/app/modules/wall/suggested-connections/suggested-connections.component';
import { SuggestedPagesComponent } from 'src/app/modules/wall/suggested-pages/suggested-pages.component';
import { PostComponent } from '../postComponents/post/post.component';

@Component({
    selector: 'app-newsfeed',
    templateUrl: './newsfeed.component.html',
    providers: [EncryptionService, ConstantService, PostdataService],
    styleUrls: ['./newsfeed.component.scss', './../postComponents/textpost/allpost.css']
})

export class NewsfeedComponent implements OnInit {
    isWallFilter: number = 0;
    continueScrollAll: boolean = true;
    lastPostCount_4: any = 0;
    lastPostCount_3: any = 0;
    lastPostCount_2: any = 0;
    lastPostCount_1: any = 0;
    isUserPostHitted: boolean = false;
    friendPostSuccess: boolean = false;
    publicPostSuccess: boolean = false;
    followedPgPostSuccess: boolean = false;
    interestPgPostSuccess: boolean = false;
    postScoreArray = [];
    publicView: boolean = false;
    emptypic: boolean = true;
    UserId;
    @ViewChild('container', { read: ViewContainerRef }) container;
    @Input() postId: string = "";
    @Input() postFilter: string = "";
    @Output() sessionLogout = new EventEmitter<boolean>();
    profileView: boolean = false;
    dataConf = {};
    openConfirmation: boolean = false;
    preloader_top: boolean = false;
    preloader_bot: boolean = false;
    user_name = "";
    current_user_name = "";
    message: string;
    herf: string;
    postmenu = false;
    saveCondition = false;
    importantCondition = false;
    savepagepopup = false;
    simplePost = "";
    postDataDetails = {};
    userName = '';
    t: string;
    latest_postId_u = 0;
    latest_postId_d = "";
    latest_pg_postId = "";
    postPresent: boolean = false;
    continueScroll: boolean = true;
    factory;
    ref;
    publicPostLstPid = 0;
    continueScrollPublic: boolean = true;
    continueScrollFriend: boolean = true;
    continueScrollTrending: boolean = false;
    continueScrollPage: boolean = false;
    continueScrollInterestPagePost: boolean = false;
    trendingPostArray = [];
    urlArr = [];
    current_user = "";
    previous_user = "";
    postIdChange = "";
    logout;
    postFilterChange: string = "";
    continueTypeScroll: boolean = false;
    lstTypePostId = "";
    lstIntrestPagePostId = 0;
    isPublicPosts: boolean = false;
    isUserPosts: boolean = false;
    isFollowedPagePosts: boolean = false;
    isInterestPagePosts: boolean = false;
    isPostByType: boolean = false;
    onProfile: boolean = false;
    loaderscreen: boolean = true;
    wlcmdiv: boolean = true;
    showInviteFrndMobile: boolean = false;
    coverAll: boolean;
    randomNumber: number = 1;
    showSuggestedPages = true;
    @Input() from = '';
    postdropdown() {
        this.postmenu = !this.postmenu;
    }



    savedpost() {
        this.saveCondition = !this.saveCondition;
    }

    important() {
        this.importantCondition = !this.importantCondition;
        this.savepagepopup = !this.savepagepopup;
    }




    constructor(
        public _constantService: ConstantService,
        public _encrypt: EncryptionService,
        private _message: InternalMessageService,
        public post: PostdataService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private _wallStateService: WallStateService
    ) {

    }
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (window.innerWidth <= 991) {
            this.showInviteFrndMobile = true;
        }
        else {
            this.showInviteFrndMobile = false;
        }

    }
    resizeInvteFrnd() {
        if (window.innerWidth >= 991) {
            this.showInviteFrndMobile = false;
        }
    }

    ngDoCheck() {
        this.t = this._constantService.getSessionDataBYKey('token');
        if (this.t && this.t != 'undefined') {
            if (this.postPresent == false) {
                if (this.isPublicPosts || this.isUserPosts || this.isFollowedPagePosts || this.isInterestPagePosts || this.isPostByType) {
                    this.postPresent = true;
                    this.emptypic = false;
                }
            }
            this.herf = this.router.url;
            if (this.isWallFilter == 0) {
                if (this.herf.match('articles')) {
                    this.isWallFilter = 1;
                    this.lastPostCount_1 = 0;
                    window.scrollTo(0, 0);
                    this.getArticlePost();
                }
            } else if (!this.herf.match('articles')) {
                this.isWallFilter = 0;
                this.container.clear();
                window.scrollTo(0, 0);
                this.lastPostCount_1 = 0;
                this.lastPostCount_2 = 0;
                this.lastPostCount_3 = 0;
                this.lastPostCount_4 = 0;
                this.getAllPost();
            }

            this.urlArr = this.herf.split("/");
            if (this.urlArr[1] == 'profile') {
                this.onProfile = true;
                this.activatedRoute.params.subscribe((params: Params) => {
                    if (params['id'] != null) {
                        if (params['id'] != this.previous_user && this.previous_user != '' && params['id'].charAt(0) != "#") {
                            if (this.container) {
                                this.container.clear();
                            }
                            this.previous_user = this.current_user;
                            this.current_user = params['id'];
                            if (this.current_user.charAt(0) == "#" || this.current_user == "") {
                                this.userName = "";
                            } else {
                                this.userName = this.current_user;
                            }
                            this.getUserPostData(this.userName, "0");
                        }
                    }
                });
            }
            if (this.postFilter != this.postFilterChange) {
                this.postFilterChange = this.postFilter;
                this.postPresent = true;
                if (this.postFilter != "") {
                    setTimeout(() => {
                        this.container.clear();
                        this.latest_postId_d = "0";
                        this.profileView = true;
                        this.getPostByType(this.postFilter, "0");
                    }, 100);
                } else {
                    setTimeout(() => {
                        this.container.clear();
                        this.profileView = true;
                        this.continueTypeScroll = false;
                        this.getUserPostData("", "0");
                    }, 100);
                }
            }
            var ids = this.postId.split(",")[0];
            var intrst = this.postId.split(",")[1];
            if (this.urlArr[1] == 'home' && intrst == '1') {
                if (ids != this.postIdChange) {
                    this.postIdChange = ids;
                    if (this.postIdChange.split(":")[2] != "3") {
                        this.getLatestPostData(this.postIdChange, "0", true);
                    } else if (this.postIdChange.split(":")[2] == "3") {
                        this.getQuestionPostData(this.postIdChange, this._constantService.getQuestionPostDataProfileServiceUrl(), true);
                    }
                }
            } else if (this.urlArr[1] == 'profile') {
                if (ids != this.postIdChange) {
                    this.postIdChange = ids;
                    if (this.postIdChange.split(":")[2] != "3") {
                        this.getLatestPostData(this.postIdChange, "0", true);
                    } else if (this.postIdChange.split(":")[2] == "3") {
                        this.getQuestionPostData(this.postIdChange, this._constantService.getQuestionPostDataProfileServiceUrl(), true);
                    }
                }
            }
        }
    }

    ngOnInit() {

        this.t = this._constantService.getSessionDataBYKey('token');
        if (this.t && this.t != 'undefined') {
            this.getInterest();
            this._message.getWallFilter().subscribe(event => {
                if (event) {
                    this.isWallFilter = event.type;
                    this.lastPostCount_1 = 0;
                    this.getArticlePost();
                }
            });
            this.herf = this.router.url;
            if (this.herf.match('articles')) {
                this.isWallFilter = 1;
                if (this.herf.match('articles')) {
                    this.isWallFilter = 1;
                    this.lastPostCount_1 = 0;
                    this.getArticlePost();
                }
            }
            this.urlArr = this.herf.split("/");
            if (this.urlArr[1] == 'profile') {
                this.profileView = true;
                this.activatedRoute.params.subscribe((params: Params) => {
                    if (params['id'] != null) {
                        if (params['id'] != this.current_user && params['id'].charAt(0) != "#") {
                            this.previous_user = this.current_user;
                            this.current_user = params['id'];
                        }
                        this.userName = params['id'];
                    }
                });
                if (this.userName.charAt(0) == "#" || this.userName == "") {
                    this.userName = "";
                }
                //  if (this.user_name == this._constantService.getUserName()){
                this.getUserPostData(this.userName, "0");
                //    }

            } else {
                if (this.isWallFilter == 0) {
                    this.getAllPost();
                }

                //                this.getLatestPostId(0, 'd');
                //                this.getLatestPgPostIds(0, 'd')
                //                this.getLatestPublicPostIds(0);
                //                this.getLatestPostFromPageWithInInterest(0);

                //                this.getFrndsPostIdsWithDate(0, 'd');
                //                this.getPublicPostIdsWithDate(0);
                //                this.getFollowedPgPostIdsWithDate(0, 'd');
                //                this.getInterestPagePostWithDate(0);
            }
        } else {
            this.activatedRoute.params.subscribe((params: Params) => {
                this.publicView = true;
                this.getPublcPost(params['id']);
            });
        }
        this.resizeInvteFrnd();


        if (window.innerWidth <= 991) {
            this.showInviteFrndMobile = true;
        }
        else {
            this.showInviteFrndMobile = false;
        }
    }

    getInterest() {

        if (!this._wallStateService.getInterests()) {
            this.coverAll = true;

            this._constantService.fetchDataApiWithoutBody(this._constantService.getInterestv1ServiceUrl()).subscribe(data => {
                this.coverAll = false;
                let responseData: any = data;
                let interestData = {};
                this._wallStateService.setInterests(responseData.INTERESTS_DATA);
                for (let i = 0; i < responseData.INTERESTS_DATA.length; i++) {
                    for (let j = 0; j < responseData.INTERESTS_DATA[i].INTERESTS.length; j++) {
                        interestData[responseData.INTERESTS_DATA[i].INTERESTS[j].INTEREST_ID] = responseData.INTERESTS_DATA[i].INTERESTS[j].INTEREST_NAME;
                    }
                }
                this._constantService.setSessionJsonPair('interests', JSON.stringify(interestData));
                this.coverAll = false;

            }), error => {
                this.coverAll = false;
            }
        } else {
            var INTERESTS_DATA: any = this._wallStateService.getInterests();
            let interestData = {};
            for (let i = 0; i < this._wallStateService.getInterests().length; i++) {
                for (let j = 0; j < INTERESTS_DATA[i].INTERESTS.length; j++) {
                    interestData[INTERESTS_DATA[i].INTERESTS[j].INTEREST_ID] = INTERESTS_DATA[i].INTERESTS[j].INTEREST_NAME;
                }
            }
        }
    }

    getPostDateTime(posttime: any) {
        var date = new Date(posttime);
        var day = date.getDate();
        var month = date.toLocaleString("en-us", { month: "short" });
        var time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        var year = date.getFullYear();
        var currentTime = new Date();
        var currentTimetoday = Math.floor(Date.now());
        var diff = Math.abs(currentTimetoday - posttime) / 1000;
        var days = Math.floor(diff / 86400);
        var currentYear = currentTime.getFullYear();
        var year_diff = currentYear - year;
        var result = "";
        if (days == 0) {
            diff -= days * 86400;
            var hour = Math.floor(diff / 3600) % 24;
            diff -= hour * 3600;
            var min = Math.floor(diff / 60) % 60;
            if (min == 0 && hour == 0) {
                result = "Just Now";
            } else if (min == 0 && hour != 0) {
                result = hour + " hr";
            } else if (min != 0 && hour == 0) {
                result = min + " min";
            } else {
                result = hour + " hr " + min + " min";
            }
        } else {
            if (year_diff == 0) {
                result = day + " " + month + " " + time;
            } else {
                result = day + " " + month + " " + year + " " + time;
            }
        }
        return result;
    }

    getAllPost() {
        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";
        hitObj['flow'] = 'd';
        hitObj['count'] = '5';
        hitObj['lspid1'] = this.lastPostCount_1;
        hitObj['lspid2'] = this.lastPostCount_2;
        hitObj['lspid3'] = this.lastPostCount_3;
        hitObj['lspid4'] = this.lastPostCount_4;
        this.coverAll = true;


        this._constantService.fetchDataApi(this._constantService.getAllPostDataServiceUrl(), hitObj).subscribe(data => {
            this.coverAll = false;

            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.loaderscreen = false;
                this.postPresent = true;
                this.lastPostCount_1 = responseData.LSPID1;
                this.lastPostCount_2 = responseData.LSPID2;
                this.lastPostCount_3 = responseData.LSPID3;
                this.lastPostCount_4 = responseData.LSPID4;

                var postArray = responseData.POST_DATA;
                if (postArray.length != 0) {

                    if (postArray.length == 0) {
                        this.continueScrollAll = false;
                    } else {
                        this.continueScrollAll = true;
                    }

                    for (var i = 0; i < postArray.length; i++) {
                        let postData = postArray[i];
                        if (postArray[i].URL == null || postArray[i].URL == '') {
                            postArray[i].URL = postArray[i].POST_KEY;
                        }
                        if (postData['REPORTED'] == 0) {
                            postData['PROFILE_VIEW'] = this.profileView;

                            if (this.urlArr[1] == "profile") {
                                if (this.userName == "" || this.userName == this._constantService.getUserName() || postData['USER_ID'] == this._constantService.getSessionDataBYKey('u_id')) {
                                    postData['MY_PROFILE'] = true;
                                } else {
                                    postData['MY_PROFILE'] = false;
                                }
                            } else {
                                if (postData['USER_ID'] == this._constantService.getSessionDataBYKey('u_id')) {
                                    postData['MY_PROFILE'] = true;
                                } else {
                                    postData['MY_PROFILE'] = false;
                                }
                            }

                            if (postData['TYPE'] == 3) {
                                this.QuesPostBuilder(postData, false);
                            } else {
                                this.postBuilder(postData, false);
                            }
                        }
                    }
                }
            } else if (status == this._constantService.error_token) {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired!";
                this.openConfirmation = true;
                return false;
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "Error";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
                return false;
            }
            this.coverAll = false;

        }), error => {
            this.coverAll = false;

            var err = error;
            if (err.status == 500) {
                this.router.navigate(['500']);
            }
        };
    }

    getArticlePost() {
        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";
        hitObj['flow'] = 'd';
        hitObj['count'] = '10';
        hitObj['lspid1'] = this.lastPostCount_1;
        this.coverAll = true;


        this._constantService.fetchDataApi(this._constantService.getArticlePostDataServiceUrl(), hitObj).subscribe(data => {
            this.coverAll = false;

            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                if (this.lastPostCount_1 == 0) {
                    this.container.clear();
                }
                this.loaderscreen = false;
                this.postPresent = true;
                this.lastPostCount_1 = responseData.LSPID1;

                var postArray = responseData.POST_DATA;
                if (postArray.length != 0) {

                    for (var i = 0; i < postArray.length; i++) {

                        let postData = postArray[i];
                        if (postData['REPORTED'] == 0) {
                            postData['PROFILE_VIEW'] = this.profileView;
                            if (this.urlArr[1] == "profile") {
                                if (this.userName == "" || this.userName == this._constantService.getUserName() || postData['USER_ID'] == this._constantService.getSessionDataBYKey('u_id')) {
                                    postData['MY_PROFILE'] = true;
                                } else {
                                    postData['MY_PROFILE'] = false;
                                }
                            } else {
                                if (postData['USER_ID'] == this._constantService.getSessionDataBYKey('u_id')) {
                                    postData['MY_PROFILE'] = true;
                                } else {
                                    postData['MY_PROFILE'] = false;
                                }
                            }

                            this.postBuilder(postData, false);
                        }
                    }
                } else {
                    this.continueScrollAll = false
                }
            } else if (status == this._constantService.error_token) {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired!";
                this.openConfirmation = true;
                return false;
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "Error";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
                return false;
            }
            this.coverAll = false;

        }), error => {
            this.coverAll = false;
            var err = error;
            if (err.status == 500) {
                this.router.navigate(['500']);
            }
        };
    }

    getLatestPgPostIds(lstPid, flow) {
        this.continueScrollPage = false;
        if (this._constantService.getPageUuid() != "") {
            var pgUuid = this._constantService.getPageUuid();
        } else {
            return false;
        }
        var postId = {};
        postId['token'] = this._constantService.getSessionDataBYKey('token');
        postId['token_param'] = {};
        postId['token_param']['device_type'] = 'w';
        postId['token_param']['host'] = '';
        postId['pg_uuid'] = pgUuid;
        postId['flow'] = flow;
        postId['lspid'] = lstPid;
        postId['count'] = '3';
        this.coverAll = true;


        this._constantService.fetchDataApi(this._constantService.getFollowedPagePostServiceUrl(), postId).subscribe(data => {
            this.coverAll = false;

            var responseData: any = data;
            var status = responseData.STATUS;

            if (status === this._constantService.success_msg) {
                this.loaderscreen = false;
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                var post_ids = responseData.POST_IDS;
                if (flow == "d") {
                    if (post_ids.length < 3) {
                        this.continueScrollPage = false;
                    } else {
                        this.continueScrollPage = true;
                    }
                    if (post_ids.length != 0 && post_ids != undefined) {
                        this.emptypic = false;
                        this.isFollowedPagePosts = true;
                        this.preloader_bot = true;
                        this.latest_pg_postId = post_ids[post_ids.length - 1];
                        for (var i = 0; i < post_ids.length; i++) {
                            if (post_ids[i].split(":")[2] != "3") {
                                this.getLatestPostData(post_ids[i], flow, false);
                            } else if (post_ids[i].split(":")[2] == "3") {
                                if (parseInt(post_ids[i].split(":")[0]) == this._constantService.getSessionDataBYKey('u_id')) {
                                    this.getQuestionPostData(post_ids[i], this._constantService.getQuestionPostDataProfileServiceUrl(), false);
                                } else {
                                    this.getQuestionPostData(post_ids[i], this._constantService.getQuestionPostDataWallServiceUrl(), false);
                                }
                            }
                        }
                        this.preloader_bot = false;
                    } else {
                        //                        if (lstPid == 0 ) {
                        //                            this.postPresent = false;
                        //                        }
                    }
                }
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            } else {
                if (status == "error") {
                    this.continueScrollPage = false;
                } else {
                    //                    if (lstPid == 0 ) {
                    //                        this.postPresent = false;
                    //                    }
                }
            }

            this.coverAll = false;

        }, error => {
            this.coverAll = false;

            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });


    }

    getLatestPostId(lstPid, flow) {
        //        if (this._constantService.getFriendsId() != "" && this._constantService.getFriendsId() != null && this._constantService.getFriendsId() != undefined) {
        //            var frndId = this._constantService.getUserId().toString() + "," + this._constantService.getFriendsId();
        //        } else {
        //            frndId = this._constantService.getUserId().toString();
        //        }
        this.continueScrollFriend = false;
        var postId = {};
        postId['token'] = this._constantService.getSessionDataBYKey('token');
        postId['token_param'] = {};
        postId['token_param']['device_type'] = 'w';
        postId['token_param']['host'] = '';
        //        postId['fid'] = frndId;
        postId['flow'] = flow;
        postId['lspid'] = lstPid;
        postId['count'] = '3';
        this.coverAll = true;


        this._constantService.fetchDataApi(this._constantService.getLatestPostIdServiceUrl(), postId).subscribe(data => {
            this.coverAll = false;

            var responseData: any = data;
            var status = responseData.STATUS;

            if (status === this._constantService.success_msg) {
                this.loaderscreen = false;
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                var post_ids = responseData.POST_IDS;
                if (flow == "d") {
                    if (post_ids.length < 3) {
                        this.continueScrollFriend = false;
                    } else {
                        this.continueScrollFriend = true;
                    }
                    if (post_ids.length != 0) {
                        this.emptypic = false;
                        this.isUserPosts = true;
                        this.preloader_bot = true;
                        this.latest_postId_d = post_ids[post_ids.length - 1];
                        for (var i = 0; i < post_ids.length; i++) {
                            if (post_ids[i].split(":")[2] != "3") {
                                this.getLatestPostData(post_ids[i], flow, false);
                            } else if (post_ids[i].split(":")[2] == "3") {
                                if (parseInt(post_ids[i].split(":")[0]) == this._constantService.getSessionDataBYKey('u_id')) {
                                    this.getQuestionPostData(post_ids[i], this._constantService.getQuestionPostDataProfileServiceUrl(), false);
                                } else {
                                    this.getQuestionPostData(post_ids[i], this._constantService.getQuestionPostDataWallServiceUrl(), false);
                                }

                            }
                        }
                        this.preloader_bot = false;
                    } else {
                        //                        if (lstPid == 0 && post_ids.length == 0) {
                        //                            this.postPresent = false;
                        //                        }
                    }
                }
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            } else {
                if (status == "error") {
                    this.continueScrollFriend = false;
                } else {
                    //                    if (lstPid == 0 && this.continueonPublic == false && this.continueScrollPage == false && this.continueScrollInterestPagePost == false) {
                    //                        this.postPresent = false;
                    //                    }
                }

            }
            this.coverAll = false;



        }, error => {
            this.coverAll = false;

            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });

    }

    getLatestPostData(postIds: string, flow: string, newPost: boolean) {
        this.postPresent = true;
        var postData = {};
        postData['token'] = this._constantService.getSessionDataBYKey('token');
        postData['token_param'] = {};
        postData['token_param']['device_type'] = 'w';
        postData['token_param']['host'] = '';
        postData['pid'] = postIds;

        if (!postData['token']) {
            this.getLatestPostData(postIds, flow, newPost);
            return;
        }
        this.coverAll = true;


        this._constantService.fetchDataApi(this._constantService.getLatestPostDataServiceUrl(), postData).subscribe(data => {
            this.coverAll = false;

            var responseData: any = data;
            var status = responseData.STATUS;

            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);

                if (responseData.POST_DATA.length != 0) {
                    postData = responseData.POST_DATA[0];
                    if (postData['REPORTED'] == 0) {
                        postData['PROFILE_VIEW'] = this.profileView;

                        if (this.urlArr[1] == "profile") {
                            if (this.userName == "" || this.userName == this._constantService.getSessionDataBYKey('username') || postData['USER_ID'] == this._constantService.getSessionDataBYKey('u_id')) {
                                postData['MY_PROFILE'] = true;
                            } else {
                                postData['MY_PROFILE'] = false;
                            }
                        } else {
                            if (postData['USER_ID'] == this._constantService.getSessionDataBYKey('u_id')) {
                                postData['MY_PROFILE'] = true;
                            } else {
                                postData['MY_PROFILE'] = false;
                            }
                        }
                        //if (this.profileView == true) {
                        //if (postData['MY_PROFILE'] == true) {
                        this.postBuilder(postData, newPost);
                        // }
                        //                        else if (postData['VISIBILITY'] == 3) {
                        //                            this.postBuilder(newPost);
                        //                        } else if (postData['VISIBILITY'] == 2) {
                        //                            var connIds = this._constantService.getFriendsId();
                        //                            if (connIds.includes(postData['USER_ID'])) {
                        //                                this.postBuilder(newPost);
                        //                            }
                        //                        }
                        //} else {
                        //    this.postBuilder(newPost);
                        //}
                    }
                }


            }
            this.coverAll = false;

        }, error => {
            this.coverAll = false;

            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });
    }

    postBuilder(postData, newPost: boolean) {
        if (this.from == 'wall') {
            if (this.randomNumber == -1) {
                this.randomNumber = Math.floor(Math.random() * 5) + 11;
            } else {
                this.randomNumber--;
                if (this.randomNumber == 0) {
                    this.randomNumber = -1;
                    if (this.showSuggestedPages) {
                        this.showSuggestedPages = !this.showSuggestedPages;
                        this.factory = this.componentFactoryResolver.resolveComponentFactory(SuggestedPagesComponent);
                        this.ref = this.container.createComponent(this.factory);
                        this.ref.instance._ref = this.ref;
                    } else if (!this.showSuggestedPages) {
                        this.showSuggestedPages = !this.showSuggestedPages;
                        this.factory = this.componentFactoryResolver.resolveComponentFactory(SuggestedConnectionsComponent);
                        this.ref = this.container.createComponent(this.factory);
                        this.ref.instance._ref = this.ref;

                    }

                }
            }
        }

        postData['ADD_DATE_TIME'] = this.post.getPostDateTime(postData['ADD_DATE_TIME']);
        //this.post.setPostData(postData);
        if (postData['TYPE'] == 1) {
            if (postData['SHARE_LINK_TITLE'] == null || postData['SHARE_LINK_TITLE'] == "") {

                this.factory = this.componentFactoryResolver.resolveComponentFactory(PostComponent);
                if (newPost) {
                    this.ref = this.container.createComponent(this.factory, 0);
                } else {
                    this.ref = this.container.createComponent(this.factory);
                }

                this.ref.instance._ref = this.ref;
                this.ref.instance.arr = postData;
            } else {

                this.factory = this.componentFactoryResolver.resolveComponentFactory(LinkpostComponent);
                if (newPost) {
                    this.ref = this.container.createComponent(this.factory, 0);
                } else {
                    this.ref = this.container.createComponent(this.factory);
                }
                this.ref.instance._ref = this.ref;
                this.ref.instance.arr = postData;
            }
        } else if (postData['TYPE'] == 2) {
            if (postData['FILE_TYPE'] == 1) {
                this.factory = this.componentFactoryResolver.resolveComponentFactory(ImagepostComponent);
                if (newPost) {
                    this.ref = this.container.createComponent(this.factory, 0);
                } else {
                    this.ref = this.container.createComponent(this.factory);
                }
                this.ref.instance._ref = this.ref;
                this.ref.instance.arr = postData;
            }
            if (postData['FILE_TYPE'] == 3 || postData['FILE_TYPE'] == 4 || postData['FILE_TYPE'] == 5) {
                this.factory = this.componentFactoryResolver.resolveComponentFactory(FileattachmentpostComponent);
                if (newPost) {
                    this.ref = this.container.createComponent(this.factory, 0);
                } else {
                    this.ref = this.container.createComponent(this.factory);
                }
                this.ref.instance._ref = this.ref;
                this.ref.instance.arr = postData;
            }
        } else if (postData['TYPE'] == 4) {
            if (postData['SHARED_POST_DATA']['USER_ID'] == this._constantService.getSessionDataBYKey('u_id')) {
                postData['SHARED_POST_DATA']['MY_PROFILE'] = true;
            } else {
                postData['SHARED_POST_DATA']['MY_PROFILE'] = false;
            }
            postData['SHARED_POST_DATA']['ADD_DATE_TIME'] = this.getPostDateTime(postData['SHARED_POST_DATA']['ADD_DATE_TIME']);
            if (postData['SHARED_POST_DATA'].TYPE == 1) {
                if (postData['SHARED_POST_DATA'].SHARE_LINK_TITLE == "" || postData['SHARED_POST_DATA'].SHARE_LINK_TITLE == null) {
                    this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedPostComponent);
                    if (newPost) {
                        this.ref = this.container.createComponent(this.factory, 0);
                    } else {
                        this.ref = this.container.createComponent(this.factory);
                    }
                    this.ref.instance._ref = this.ref;
                    this.ref.instance.arr = postData;
                } else {
                    this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedlinkpostComponent);
                    if (newPost) {
                        this.ref = this.container.createComponent(this.factory, 0);
                    } else {
                        this.ref = this.container.createComponent(this.factory);
                    }
                    this.ref.instance._ref = this.ref;
                    this.ref.instance.arr = postData;
                }
            } else if (postData['SHARED_POST_DATA'].TYPE == 2) {
                if (postData['SHARED_POST_DATA'].FILE_TYPE == 1) {
                    this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedimagepostComponent);
                    if (newPost) {
                        this.ref = this.container.createComponent(this.factory, 0);
                    } else {
                        this.ref = this.container.createComponent(this.factory);
                    }
                    this.ref.instance._ref = this.ref;
                    this.ref.instance.arr = postData;
                }
                if (postData['SHARED_POST_DATA'].FILE_TYPE == 3 || postData['SHARED_POST_DATA'].FILE_TYPE == 4 || postData['SHARED_POST_DATA'].FILE_TYPE == 5) {

                    this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedfileattachmentComponent);
                    if (newPost) {
                        this.ref = this.container.createComponent(this.factory, 0);
                    } else {
                        this.ref = this.container.createComponent(this.factory);
                    }
                    this.ref.instance._ref = this.ref;
                    this.ref.instance.arr = postData;
                }
            } else if (postData['SHARED_POST_DATA'].TYPE == 3) {
                //                            if (postData['SHARED_POST_DATA'].USER_ID == this._constantService.getUserId()){
                //                                postData['MY_PROFILE'] = true;
                //                            }else{
                //                                postData['MY_PROFILE'] = false;
                //                            }
                if (postData['MY_PROFILE']) {
                    postData['MY_PROFILE'] = false;
                    postData['MY_PROFILE_PARENT'] = true;
                } else {
                    postData['MY_PROFILE_PARENT'] = false;
                }


                if (postData['SHARED_POST_DATA']['QUESTION_TYPE'] == 1) {
                    this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedsinglechoicepostComponent);
                    if (newPost) {
                        this.ref = this.container.createComponent(this.factory, 0);
                    } else {
                        this.ref = this.container.createComponent(this.factory);
                    }
                    this.ref.instance._ref = this.ref;
                    this.ref.instance.arr = postData;
                } else if (postData['SHARED_POST_DATA']['QUESTION_TYPE'] == 2) {
                    this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedmultiplechoicepostComponent);
                    if (newPost) {
                        this.ref = this.container.createComponent(this.factory, 0);
                    } else {
                        this.ref = this.container.createComponent(this.factory);
                    }
                    this.ref.instance._ref = this.ref;
                    this.ref.instance.arr = postData;
                } else if (postData['SHARED_POST_DATA']['QUESTION_TYPE'] == 3) {
                    this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedtruefalsepostComponent);
                    if (newPost) {
                        this.ref = this.container.createComponent(this.factory, 0);
                    } else {
                        this.ref = this.container.createComponent(this.factory);
                    }
                    this.ref.instance._ref = this.ref;
                    this.ref.instance.arr = postData;
                }
            } else if (postData['SHARED_POST_DATA'].TYPE == 5 || postData['SHARED_POST_DATA'].TYPE == 6) {
                this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedvideopostComponent);
                if (newPost) {
                    this.ref = this.container.createComponent(this.factory, 0);
                } else {
                    this.ref = this.container.createComponent(this.factory);
                }
                this.ref.instance._ref = this.ref;
                this.ref.instance.arr = postData;
            } else if (postData['SHARED_POST_DATA'].TYPE == 7) {
                this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedcoursepostComponent);
                if (newPost) {
                    this.ref = this.container.createComponent(this.factory, 0);
                } else {
                    this.ref = this.container.createComponent(this.factory);
                }
                this.ref.instance._ref = this.ref;
                this.ref.instance.arr = postData;
            }

        } else if (postData['TYPE'] == 5 || postData['TYPE'] == 6) {
            this.factory = this.componentFactoryResolver.resolveComponentFactory(VideopostComponent);
            if (newPost) {
                this.ref = this.container.createComponent(this.factory, 0);
            } else {
                this.ref = this.container.createComponent(this.factory);
            }
            this.ref.instance._ref = this.ref;
            this.ref.instance.arr = postData;
        } else if (postData['TYPE'] == 7 && postData['COURSE_DETAIL']['IS_EXPRIED'] == 0) {
            this.factory = this.componentFactoryResolver.resolveComponentFactory(CoursepostComponent);
            if (newPost) {
                this.ref = this.container.createComponent(this.factory, 0);
            } else {
                this.ref = this.container.createComponent(this.factory);
            }
            this.ref.instance._ref = this.ref;
            this.ref.instance.arr = postData;
            this.ref.instance.onWall=true;
        }


    }


    getUserPostData(uname, lpid) {
        var postData = {};
        postData['token'] = this._constantService.getSessionDataBYKey('token');
        postData['token_param'] = {};
        postData['token_param']['device_type'] = 'w';
        postData['token_param']['host'] = '';
        postData['flow'] = 'd';
        postData['lspid'] = lpid;
        postData['count'] = '10';
        if (uname == this._constantService.getSessionDataBYKey('username')) {
            postData['myprofile'] = 'yes';
            postData['username'] = '';
        } else {
            postData['myprofile'] = 'no';
            postData['username'] = uname;
        }
        this.coverAll = true;


        this._constantService.fetchDataApi(this._constantService.getProfilePostDataServiceUrl(), postData).subscribe(data => {
            this.coverAll = false;

            var responseData: any = data;
            var status = responseData.STATUS;
            if (status === this._constantService.success_msg) {
                this.loaderscreen = false;
                if (lpid == 0 && responseData.POST_DATA.length == 0) {
                    this.postPresent = false;
                } else {
                    this.postPresent = true;
                }
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);

                let postDataArr = responseData.POST_DATA;
                if (postDataArr.length != 0) {
                    if (postDataArr.length < 10) {
                        this.continueScroll = false;
                    } else {
                        this.continueScroll = true;
                    }

                    this.emptypic = false;
                    this.latest_postId_d = responseData.LSPID;

                    for (let i = 0; i < postDataArr.length; i++) {
                        let postData = postDataArr[i];
                        if (postData['REPORTED'] == 0) {
                            postData['PROFILE_VIEW'] = this.profileView;

                            if (this.urlArr[1] == "profile") {
                                if (this.userName == "" || this.userName == this._constantService.getUserName() || postData['USER_ID'] == this._constantService.getSessionDataBYKey('u_id')) {
                                    postData['MY_PROFILE'] = true;
                                } else {
                                    postData['MY_PROFILE'] = false;
                                }
                            } else {
                                if (postData['USER_ID'] == this._constantService.getSessionDataBYKey('u_id')) {
                                    postData['MY_PROFILE'] = true;
                                } else {
                                    postData['MY_PROFILE'] = false;
                                }
                            }

                            if (postData['TYPE'] != 3) {
                                this.postBuilder(postData, false);
                            } else {
                                this.QuesPostBuilder(postData, false);
                            }
                        }
                    }
                } else {
                    this.continueScroll = false;
                    if (lpid == 0) {
                        this.postPresent = false;
                    }
                }
            }
            this.coverAll = false;

        }, error => {
            this.coverAll = false;

            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });

    }

    getQuestionPostData(post_id, url, newPost: boolean) {

        var postData = {};
        postData['token'] = this._constantService.getSessionDataBYKey('token');
        postData['token_param'] = {};
        postData['token_param']['device_type'] = 'w';
        postData['token_param']['host'] = '';
        postData['pid'] = post_id;

        if (!postData['token']) {
            this.getQuestionPostData(post_id, url, newPost);
            return;
        }

        this.coverAll = true;

        this._constantService.fetchDataApi(url, postData).subscribe(data => {
            this.coverAll = false;

            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                if (responseData.POST_DATA.length != 0) {
                    postData = responseData.POST_DATA[0];
                    if (postData['REPORTED'] == 0) {
                        postData['PROFILE_VIEW'] = this.profileView;
                        if (this.urlArr[1] == "profile") {
                            if (this.userName == "" || this.userName == this._constantService.getSessionDataBYKey('username')) {
                                postData['MY_PROFILE'] = true;
                            } else {
                                postData['MY_PROFILE'] = false;
                            }
                        } else {
                            if (postData['USER_ID'] == this._constantService.getSessionDataBYKey('u_id')) {
                                postData['MY_PROFILE'] = true;
                            } else {
                                postData['MY_PROFILE'] = false;
                            }
                        }
                        //                    if (this.profileView == true) {
                        //                        if (postData['MY_PROFILE'] == true) {
                        //                            this.QuesPostBuilder(newPost);
                        //                        }
                        //                        //                        else if (postData['VISIBILITY'] == 3) {
                        //                        //                            this.QuesPostBuilder(newPost);
                        //                        //                        } else if (postData['VISIBILITY'] == 2) {
                        //                        //                            var connIds = this._constantService.getFriendsId();
                        //                        //                            if (connIds.includes(postData['USER_ID'])) {
                        //                        //                                this.QuesPostBuilder(newPost);
                        //                        //                            }
                        //                        //                        }
                        //                    } else {
                        this.QuesPostBuilder(postData, newPost);
                        // }

                    }
                }

            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }
            this.coverAll = false;

        }, error => {
            this.coverAll = false;

            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });
    }

    QuesPostBuilder(postData, newPost) {
        postData['ADD_DATE_TIME'] = this.getPostDateTime(postData['ADD_DATE_TIME']);
        //this.post.setPostData(postData);
        if (postData['QUESTION_TYPE'] == 1) {
            this.factory = this.componentFactoryResolver.resolveComponentFactory(SinglechoicepostComponent);
            if (newPost) {
                this.ref = this.container.createComponent(this.factory, 0);
            } else {
                this.ref = this.container.createComponent(this.factory);
            }
            this.ref.instance._ref = this.ref;
            this.ref.instance.arr = postData;
        } else if (postData['QUESTION_TYPE'] == 2) {
            this.factory = this.componentFactoryResolver.resolveComponentFactory(MultiplechoicepostComponent);
            if (newPost) {
                this.ref = this.container.createComponent(this.factory, 0);
            } else {
                this.ref = this.container.createComponent(this.factory);
            }
            this.ref.instance._ref = this.ref;
            this.ref.instance.arr = postData;
        } else if (postData['QUESTION_TYPE'] == 3) {
            this.factory = this.componentFactoryResolver.resolveComponentFactory(TruefalsepostComponent);
            if (newPost) {
                this.ref = this.container.createComponent(this.factory, 0);
            } else {
                this.ref = this.container.createComponent(this.factory);
            }
            this.ref.instance._ref = this.ref;
            this.ref.instance.arr = postData;
        }
    }

    getLatestPublicPostIds(lstpid) {
        this.continueScrollPublic = false;
        var publicPost = {}
        publicPost['token'] = this._constantService.getSessionDataBYKey('token');
        publicPost['token_param'] = {};
        publicPost['token_param']['device_type'] = 'w';
        publicPost['token_param']['host'] = '';
        if (this._constantService.getFriendsId() != null && this._constantService.getFriendsId() != "" && this._constantService.getFriendsId() != undefined) {
            publicPost['fid'] = this._constantService.getFriendsId();
        } else {
            publicPost['fid'] = this._constantService.getSessionDataBYKey('u_id');
        }

        publicPost['lspid'] = lstpid;
        publicPost['count'] = 3;
        publicPost['flow'] = 'd';
        this.coverAll = true;

        this._constantService.fetchDataApi(this._constantService.getLatestPublicPostServiceUrl(), publicPost).subscribe(data => {
            this.coverAll = false;

            var responseData: any = data;
            var status = responseData.STATUS;

            if (status == this._constantService.success_msg) {
                this.loaderscreen = false;
                var post_ids = responseData.POST_IDS;
                if (post_ids.length < 3) {
                    this.continueScrollPublic = false;
                } else {
                    this.continueScrollPublic = true;
                }
                if (post_ids.length != 0) {
                    this.emptypic = false;
                    this.isPublicPosts = true;
                    this.publicPostLstPid = post_ids[post_ids.length - 1];
                    for (var i = 0; i < post_ids.length; i++) {
                        if (post_ids[i].split(":")[2] != "3") {
                            this.getLatestPostData(post_ids[i], "d", false);
                        } else if (post_ids[i].split(":")[2] == "3") {
                            if (parseInt(post_ids[i].split(":")[0]) == this._constantService.getSessionDataBYKey('u_id')) {
                                this.getQuestionPostData(post_ids[i], this._constantService.getQuestionPostDataProfileServiceUrl(), false);
                            } else {
                                this.getQuestionPostData(post_ids[i], this._constantService.getQuestionPostDataWallServiceUrl(), false);
                            }
                            //                             this.getQuestionPostData(post_ids[i], this._constantService.getQuestionPostDataWallServiceUrl(), false);

                        }
                    }
                }
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }

            this.coverAll = false;

        }, error => {
            this.coverAll = false;

            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });
    }

    closePopup(event) {
        if (event['error'] == false) {
            this.openConfirmation = false;
        }
    }

    getLatestTrendingPostData() {
        if (this.trendingPostArray.length > 0) {
            var trendArr = this.trendingPostArray.slice(0, 3);
            for (var i = 0; i < trendArr.length; i++) {
                if (trendArr[i].split(":")[2] != "3") {
                    this.getLatestPostData(trendArr[i], "d", false);
                } else if (trendArr[i].split(":")[2] == "3") {

                    if (parseInt(trendArr[i].split(":")[0]) == this._constantService.getSessionDataBYKey('u_id')) {
                        this.getQuestionPostData(trendArr[i], this._constantService.getQuestionPostDataProfileServiceUrl(), false);
                    } else {
                        this.getQuestionPostData(trendArr[i], this._constantService.getQuestionPostDataWallServiceUrl(), false);
                    }
                    //                     this.getQuestionPostData(trendArr[i], this._constantService.getQuestionPostDataWallServiceUrl(), false);

                }
            }
            this.trendingPostArray.splice(0, 3);
            if (this.trendingPostArray.length == 0) {
                this.continueScrollTrending = false;
            }
        }


    }

    getLatestTrendingPost() {
        var trend = {};
        trend['token'] = this._constantService.getSessionDataBYKey('token');
        trend['token_param'] = {};
        trend['token_param']['device_type'] = 'w';
        trend['token_param']['host'] = '';
        this.coverAll = true;

        this._constantService.fetchDataApi(this._constantService.getTrendingServiceUrl(), trend).subscribe(data => {
            this.coverAll = false;

            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.trendingPostArray = responseData.TRENDS;
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }
            this.coverAll = false;

        }, error => {
            this.coverAll = false;

            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });

    }

    onScrollDown() {
        if (this.t && this.t != 'undefined') {
            if (this.profileView) {
                if (this.latest_postId_d != "0" && this.profileView) {
                    if (this.continueScroll) {
                        this.getUserPostData(this.userName, this.latest_postId_d);
                    }
                }
                if (this.lstTypePostId != "" && this.profileView) {
                    if (this.continueTypeScroll) {
                        this.getPostByType(this.postFilter, this.lstTypePostId);
                    }
                }

            } else {
                if (this.continueScrollAll) {
                    this.isWallFilter == 1 ? this.getArticlePost() : this.getAllPost();
                }
                //                if (this.continueScrollFriend) {
                //                    this.getLatestPostId(this.latest_postId_d, 'd');
                //                    //                    this.getFrndsPostIdsWithDate(this.latest_postId_d, 'd');
                //                }
                //                if (this.continueScrollPublic) {
                //                    this.getLatestPublicPostIds(this.publicPostLstPid);
                //                    //                    this.getPublicPostIdsWithDate(this.publicPostLstPid);
                //                }
                //                if (this.continueScrollPage) {
                //                    this.getLatestPgPostIds(this.latest_pg_postId, 'd');
                //                    //                    this.getFollowedPgPostIdsWithDate(this.latest_pg_postId, 'd');
                //                }
                //
                //                if (this.continueScrollInterestPagePost) {
                //                    this.getLatestPostFromPageWithInInterest(this.lstIntrestPagePostId);
                //                    //                    this.getInterestPagePostWithDate(this.lstIntrestPagePostId);
                //                }
            }
        }

    }

    getPostByType(typ, ldatetime) {
        var postByTyp = {};
        postByTyp['token'] = this._constantService.getSessionDataBYKey('token');
        postByTyp['token_param'] = {};
        postByTyp['token_param']['device_type'] = 'w';
        postByTyp['token_param']['host'] = '';
        postByTyp['ptyp'] = typ;
        postByTyp['ldatetime'] = ldatetime;

        if (!typ) {
            this.getPostByType(this.postFilter, ldatetime);
        }
        this.coverAll = true;

        this._constantService.fetchDataApi(this._constantService.getPostByTypeServiceUrl(), postByTyp).subscribe(data => {
            this.coverAll = false;

            var responseData: any = data;
            var status = responseData.STATUS;

            if (status == this._constantService.success_msg) {
                var post_ids = responseData.SEARCHED_DATA;
                if (post_ids.length < 3) {
                    this.continueTypeScroll = false;
                } else {
                    this.continueTypeScroll = true;
                }
                if (ldatetime == "0" && post_ids.length == 0) {
                    this.postPresent = false;
                }
                if (post_ids.length != 0) {
                    this.isPostByType = true;
                    this.lstTypePostId = post_ids[post_ids.length - 1].split("#")[1];
                    for (var i = 0; i < post_ids.length; i++) {
                        var post = post_ids[i].split("#")[0];
                        if (post.split(":")[2] != "3") {
                            this.getLatestPostData(post, "d", false);
                        } else if (post.split(":")[2] == "3") {
                            this.getQuestionPostData(post, this._constantService.getQuestionPostDataProfileServiceUrl(), false);
                        }
                    }
                }
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }
            this.coverAll = false;

        }, error => {
            this.coverAll = false;

            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });
    }

    scrollHandler(e) {
        // should log top or bottom
    }

    getLatestPostFromPageWithInInterest(id) {
        this.continueScrollInterestPagePost = false;
        var interestPagePost = {};
        interestPagePost['token'] = this._constantService.getSessionDataBYKey('token');
        interestPagePost['token_param'] = {};
        interestPagePost['token_param']['device_type'] = 'w';
        interestPagePost['token_param']['host'] = '';
        interestPagePost['lspid'] = id;
        interestPagePost['count'] = '3';
        interestPagePost['flow'] = 'd';
        this.coverAll = true;

        this._constantService.fetchDataApi(this._constantService.getInterestPagePostServiceUrl(), interestPagePost).subscribe(data => {
            this.coverAll = false;

            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.loaderscreen = false;
                var post_ids = responseData.POST_IDS;
                if (post_ids.length < 3) {
                    this.continueScrollInterestPagePost = false;
                } else {
                    this.continueScrollInterestPagePost = true;
                }
                if (post_ids.length != 0) {
                    this.isInterestPagePosts = true;
                    this.lstIntrestPagePostId = post_ids[post_ids.length - 1];
                    for (var i = 0; i < post_ids.length; i++) {
                        if (post_ids[i].split(":")[2] != "3") {
                            this.getLatestPostData(post_ids[i], "d", false);
                        } else if (post_ids[i].split(":")[2] == "3") {

                            if (parseInt(post_ids[i].split(":")[0]) == this._constantService.getSessionDataBYKey('u_id')) {
                                this.getQuestionPostData(post_ids[i], this._constantService.getQuestionPostDataProfileServiceUrl(), false);
                            } else {
                                this.getQuestionPostData(post_ids[i], this._constantService.getQuestionPostDataWallServiceUrl(), false);
                            }
                            //                             this.getQuestionPostData(post_ids[i], this._constantService.getQuestionPostDataWallServiceUrl(), false);

                        }
                    }
                }
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }
            this.coverAll = false;


        }, error => {
            this.coverAll = false;

            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });
    }

    closeWelcome() {
        this.wlcmdiv = false;
    }

    getPublcPost(name) {
        var publicData = {};
        publicData['username'] = name;
        this.coverAll = true;


        this._constantService.fetchDataApi(this._constantService.getUserPostPublicServiceUrl(), publicData).subscribe(data => {
            this.coverAll = false;

            var responseData: any = data;
            this.loaderscreen = false;
            this.container.clear();
            if (responseData.STATUS == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                if (responseData.POST_DATA.length != 0) {
                    this.postPresent = true;
                    for (var i = 0; i < responseData.POST_DATA.length; i++) {
                        let postData = responseData.POST_DATA[i];
                        //                    if (postData['USER_ID'] === this._constantService.getUserId().toString()) {
                        //                        postData['MY_PROFILE'] = true;
                        //                    } else {
                        //                        postData['MY_PROFILE'] = false;
                        //                    }
                        postData['MY_PROFILE'] = false;
                        postData['ADD_DATE_TIME'] = this.getPostDateTime(postData['ADD_DATE_TIME']);
                        //this.post.setPostData(postData);
                        if (postData['TYPE'] == 4) {
                            postData['SHARED_POST_DATA'].ADD_DATE_TIME = this.getPostDateTime(postData['SHARED_POST_DATA'].ADD_DATE_TIME);
                        }
                        this.factory = this.componentFactoryResolver.resolveComponentFactory(PostotherviewComponent);
                        this.ref = this.container.createComponent(this.factory);
                        this.ref.instance.arr = postData;

                    }
                } else {
                    this.postPresent = false;
                }
            } else {
                this.postPresent = false;
            }

        }), error => {
            this.coverAll = false;
        };

    }



    //    *************************************************************************** Loading posts with score ********************************************************************

    getFollowedPgPostIdsWithDate(lstPid, flow) {
        this.continueScrollPage = false;
        if (this._constantService.getPageUuid() != "") {
            var pgUuid = this._constantService.getPageUuid();
        } else {
            return false;
        }
        var postId = {};
        postId['token'] = this._constantService.getSessionDataBYKey('token');
        postId['token_param'] = {};
        postId['token_param']['device_type'] = 'w';
        postId['token_param']['host'] = '';
        postId['pg_uuid'] = pgUuid;
        postId['flow'] = flow;
        postId['lspid'] = lstPid;
        this.coverAll = true;
        postId['count'] = '3';

        this._constantService.fetchDataApi(this._constantService.getFollowedPagePostWithDateServiceUrl(), postId).subscribe(data => {
            this.coverAll = false;

            var responseData: any = data;
            var status = responseData.STATUS;

            if (status === this._constantService.success_msg) {
                this.loaderscreen = false;
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.postScoreArray.push.apply(this.postScoreArray, responseData.POST_IDS);
                this.followedPgPostSuccess = true;
                var post_ids = responseData.POST_IDS;
                if (flow == "d") {
                    if (post_ids.length < 3) {
                        this.continueScrollPage = false;
                    } else {
                        this.continueScrollPage = true;
                    }
                    if (post_ids.length != 0 && post_ids != undefined) {
                        this.emptypic = false;
                        this.isFollowedPagePosts = true;
                        this.preloader_bot = true;
                        this.latest_pg_postId = post_ids[post_ids.length - 1].value;
                        if (this.friendPostSuccess && this.interestPgPostSuccess && this.publicPostSuccess) {
                            this.postScoreArray.sort((a, b) => b.score - a.score);
                            for (var i = 0; i < this.postScoreArray.length; i++) {
                                if (this.postScoreArray[i].value.split(":")[2] != "3") {
                                    this.getLatestPostData(this.postScoreArray[i].value, flow, false);
                                } else if (this.postScoreArray[i].value.split(":")[2] == "3") {
                                    if (parseInt(this.postScoreArray[i].value.split(":")[0]) == this._constantService.getSessionDataBYKey('u_id')) {
                                        this.getQuestionPostData(this.postScoreArray[i].value, this._constantService.getQuestionPostDataProfileServiceUrl(), false);
                                    } else {
                                        this.getQuestionPostData(this.postScoreArray[i].value, this._constantService.getQuestionPostDataWallServiceUrl(), false);
                                    }
                                }
                            }
                            this.postScoreArray = [];
                            if (this.continueScrollFriend) {
                                this.friendPostSuccess = false;
                            }
                            if (this.continueScrollPublic) {
                                this.publicPostSuccess = false;
                            }
                            if (this.continueScrollInterestPagePost = true) {
                                this.interestPgPostSuccess = false;
                            }
                            if (this.continueScrollPage) {
                                this.followedPgPostSuccess = false;
                            }
                        }

                        this.preloader_bot = false;
                    } else {
                    }
                }
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            } else {
                if (status == "error") {
                    this.continueScrollPage = false;
                } else {
                }
            }
            this.coverAll = false;

        }, error => {
            this.coverAll = false;

            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });
    }

    getFrndsPostIdsWithDate(lstPid, flow) {
        this.continueScrollFriend = false;
        var postId = {};
        postId['token'] = this._constantService.getSessionDataBYKey('token');
        postId['token_param'] = {};
        postId['token_param']['device_type'] = 'w';
        postId['token_param']['host'] = '';
        //        postId['fid'] = frndId;
        postId['flow'] = flow;
        postId['lspid'] = lstPid;
        postId['count'] = '3';
        this.coverAll = true;


        this._constantService.fetchDataApi(this._constantService.getLatestPostIdWithDateServiceUrl(), postId).subscribe(data => {
            this.coverAll = false;

            var responseData: any = data;
            var status = responseData.STATUS;

            if (status === this._constantService.success_msg) {
                this.loaderscreen = false;
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.postScoreArray.push.apply(this.postScoreArray, responseData.POST_IDS);
                this.friendPostSuccess = true;
                var post_ids = responseData.POST_IDS;
                if (flow == "d") {
                    if (post_ids.length < 3) {
                        this.continueScrollFriend = false;
                    } else {
                        this.continueScrollFriend = true;
                    }
                    if (post_ids.length != 0) {
                        this.emptypic = false;
                        this.isUserPosts = true;
                        this.preloader_bot = true;
                        this.latest_postId_d = post_ids[post_ids.length - 1].value;

                        if (this.followedPgPostSuccess && this.interestPgPostSuccess && this.publicPostSuccess) {
                            this.postScoreArray.sort((a, b) => b.score - a.score);
                            for (var i = 0; i < this.postScoreArray.length; i++) {
                                if (this.postScoreArray[i].value.split(":")[2] != "3") {
                                    this.getLatestPostData(this.postScoreArray[i].value, flow, false);
                                } else if (this.postScoreArray[i].value.split(":")[2] == "3") {
                                    if (parseInt(this.postScoreArray[i].value.split(":")[0]) == this._constantService.getSessionDataBYKey('u_id')) {
                                        this.getQuestionPostData(this.postScoreArray[i].value, this._constantService.getQuestionPostDataProfileServiceUrl(), false);
                                    } else {
                                        this.getQuestionPostData(this.postScoreArray[i].value, this._constantService.getQuestionPostDataWallServiceUrl(), false);
                                    }
                                }
                            }
                            this.postScoreArray = [];
                            if (this.continueScrollFriend) {
                                this.friendPostSuccess = false;
                            }
                            if (this.continueScrollPublic) {
                                this.publicPostSuccess = false;
                            }
                            if (this.continueScrollInterestPagePost = true) {
                                this.interestPgPostSuccess = false;
                            }
                            if (this.continueScrollPage) {
                                this.followedPgPostSuccess = false;
                            }
                        }

                        this.preloader_bot = false;
                    } else {
                    }
                }
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            } else {
                if (status == "error") {
                    this.continueScrollFriend = false;
                } else {
                }

            }
            this.coverAll = false;

        }, error => {
            this.coverAll = false;

            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });

    }

    getPublicPostIdsWithDate(lstpid) {
        this.continueScrollPublic = false;
        var publicPost = {}
        publicPost['token'] = this._constantService.getSessionDataBYKey('token');
        publicPost['token_param'] = {};
        publicPost['token_param']['device_type'] = 'w';
        publicPost['token_param']['host'] = '';
        if (this._constantService.getFriendsId() != null && this._constantService.getFriendsId() != "" && this._constantService.getFriendsId() != undefined) {
            publicPost['fid'] = this._constantService.getFriendsId();
        } else {
            publicPost['fid'] = this._constantService.getSessionDataBYKey('u_id');
        }

        publicPost['lspid'] = lstpid;
        publicPost['count'] = 3;
        publicPost['flow'] = 'd';
        this.coverAll = true;


        this._constantService.fetchDataApi(this._constantService.getLatestPublicPostWithDateServiceUrl(), publicPost).subscribe(data => {
            this.coverAll = false;

            var responseData: any = data;
            var status = responseData.STATUS;

            if (status == this._constantService.success_msg) {
                this.loaderscreen = false;
                this.postScoreArray.push.apply(this.postScoreArray, responseData.POST_IDS);
                this.publicPostSuccess = true;
                var post_ids = responseData.POST_IDS;
                if (post_ids.length < 3) {
                    this.continueScrollPublic = false;
                } else {
                    this.continueScrollPublic = true;
                }
                if (post_ids.length != 0) {
                    this.emptypic = false;
                    this.isPublicPosts = true;
                    this.publicPostLstPid = post_ids[post_ids.length - 1].value;

                    if (this.friendPostSuccess && this.interestPgPostSuccess && this.followedPgPostSuccess) {
                        this.postScoreArray.sort((a, b) => b.score - a.score);
                        for (var i = 0; i < this.postScoreArray.length; i++) {
                            if (this.postScoreArray[i].value.split(":")[2] != "3") {
                                this.getLatestPostData(this.postScoreArray[i].value, "d", false);
                            } else if (this.postScoreArray[i].value.split(":")[2] == "3") {
                                if (parseInt(this.postScoreArray[i].value.split(":")[0]) == this._constantService.getSessionDataBYKey('u_id')) {
                                    this.getQuestionPostData(this.postScoreArray[i].value, this._constantService.getQuestionPostDataProfileServiceUrl(), false);
                                } else {
                                    this.getQuestionPostData(this.postScoreArray[i].value, this._constantService.getQuestionPostDataWallServiceUrl(), false);
                                }
                            }
                        }
                        this.postScoreArray = [];
                        if (this.continueScrollFriend) {
                            this.friendPostSuccess = false;
                        }
                        if (this.continueScrollPublic) {
                            this.publicPostSuccess = false;
                        }
                        if (this.continueScrollInterestPagePost = true) {
                            this.interestPgPostSuccess = false;
                        }
                        if (this.continueScrollPage) {
                            this.followedPgPostSuccess = false;
                        }
                    }

                }
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }
            this.coverAll = false;


        }, error => {
            this.coverAll = false;

            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });
    }

    getInterestPagePostWithDate(id) {
        this.continueScrollInterestPagePost = false;
        var interestPagePost = {};
        interestPagePost['token'] = this._constantService.getSessionDataBYKey('token');
        interestPagePost['token_param'] = {};
        interestPagePost['token_param']['device_type'] = 'w';
        interestPagePost['token_param']['host'] = '';
        interestPagePost['lspid'] = id;
        interestPagePost['count'] = '3';
        interestPagePost['flow'] = 'd';
        this.coverAll = true;


        this._constantService.fetchDataApi(this._constantService.getInterestPagePostWithDateServiceUrl(), interestPagePost).subscribe(data => {
            this.coverAll = false;

            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.loaderscreen = false;
                this.postScoreArray.push.apply(this.postScoreArray, responseData.POST_IDS);
                this.interestPgPostSuccess = true;
                var post_ids = responseData.POST_IDS;
                if (post_ids.length < 3) {
                    this.continueScrollInterestPagePost = false;
                } else {
                    this.continueScrollInterestPagePost = true;
                }
                if (post_ids.length != 0) {
                    this.isInterestPagePosts = true;
                    this.lstIntrestPagePostId = post_ids[post_ids.length - 1].value;
                    if (this.friendPostSuccess && this.interestPgPostSuccess && this.publicPostSuccess) {
                        this.postScoreArray.sort((a, b) => b.score - a.score);
                        for (var i = 0; i < this.postScoreArray.length; i++) {
                            if (this.postScoreArray[i].value.split(":")[2] != "3") {
                                this.getLatestPostData(this.postScoreArray[i].value, "d", false);
                            } else if (this.postScoreArray[i].value.split(":")[2] == "3") {
                                if (parseInt(this.postScoreArray[i].value.split(":")[0]) == this._constantService.getSessionDataBYKey('u_id')) {
                                    this.getQuestionPostData(this.postScoreArray[i].value, this._constantService.getQuestionPostDataProfileServiceUrl(), false);
                                } else {
                                    this.getQuestionPostData(this.postScoreArray[i].value, this._constantService.getQuestionPostDataWallServiceUrl(), false);
                                }
                            }
                        }
                        this.postScoreArray = [];
                        if (this.continueScrollFriend) {
                            this.friendPostSuccess = false;
                        }
                        if (this.continueScrollPublic) {
                            this.publicPostSuccess = false;
                        }
                        if (this.continueScrollInterestPagePost = true) {
                            this.interestPgPostSuccess = false;
                        }
                        if (this.continueScrollPage) {
                            this.followedPgPostSuccess = false;
                        }
                    }
                }

            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }
            this.coverAll = false;

        }, error => {
            this.coverAll = false;

            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });
    }
    //    *************************************************************************** Loading posts with score end ********************************************************************

}
