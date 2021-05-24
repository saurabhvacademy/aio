import { Component, OnInit, AfterViewInit, ComponentFactoryResolver, ViewContainerRef, ViewChild, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EncryptionService } from './../../../services/encryption.service';
import { ConstantService } from './../../../services/constant.service';
import { PostdataService } from './../../../services/postdata.service';
import { LinkpostComponent } from './../linkpost/linkpost.component';
import { TextpostComponent } from './../textpost/textpost.component';
import { ImagepostComponent } from './../imagepost/imagepost.component';
import { FileattachmentpostComponent } from './../fileattachmentpost/fileattachmentpost.component';
import { SharedpostComponent } from './../sharedpost/sharedpost.component';
import { SharedimagepostComponent } from './../sharedimagepost/sharedimagepost.component';
import { SharedfileattachmentComponent } from './../sharedfileattachment/sharedfileattachment.component';
import { SharedlinkpostComponent } from './../sharedlinkpost/sharedlinkpost.component';
import { SinglechoicepostComponent } from './../singlechoicepost/singlechoicepost.component';
import { MultiplechoicepostComponent } from './../multiplechoicepost/multiplechoicepost.component';
import { TruefalsepostComponent } from './../truefalsepost/truefalsepost.component';
import { SharedtruefalsepostComponent } from './../sharedtruefalsepost/sharedtruefalsepost.component';
import { SharedsinglechoicepostComponent } from './../sharedsinglechoicepost/sharedsinglechoicepost.component';
import { SharedmultiplechoicepostComponent } from './../sharedmultiplechoicepost/sharedmultiplechoicepost.component';
import { SharedvideopostComponent } from './../sharedvideopost/sharedvideopost.component';
import { VideopostComponent } from './../videopost/videopost.component';
import { PostotherviewComponent } from './../postotherview/postotherview.component';
import { CoursepostComponent } from './../coursepost/coursepost.component';
import { SharedcoursepostComponent } from './../sharedcoursepost/sharedcoursepost.component';
import { Meta, Title } from '@angular/platform-browser';
declare const FB: any;
declare const window: any;
declare var gapi: any;
declare var setTags: Function;
import * as $ from 'jquery';
@Component({
    selector: 'app-singlepostview',
    templateUrl: './singlepostview.component.html',
    styleUrls: [
      './singlepostview.component.scss',
      './../textpost/allpost.css',
       './../../peopleyouknow/peopleyouknow.component.scss',
       // '../../../sharedComponents/mmenu/slidemenu.css'
     ],
    // host: {
    //     '(window:scroll)': 'onScroll($event)'
    // }
})

export class SinglepostviewComponent implements OnInit, AfterViewInit {
    sharedTextData: string;
    openLoginPopup: boolean = false;
    senderName = '';
    openLoginPopupType: number = 1;
    id: any;
    tabCont: any;
    isMobileMenue: boolean = false;
    publicPostURL: string = '';
    myProfile: string;
    openConfirmation: boolean = false;
    dataConf: {};
    singlePagePostData: any = {};
    // @ViewChild(TextpostComponent)
    //  private textpostcomponent: TextpostComponent;
    @ViewChild('container', { read: ViewContainerRef }) container;
    bodyOverflow = false;
    // userInfo:UserInfo;
    t: string;
    secWidth = 0;
    current_year;
    postId: string = "";
    postDataDetails;
    tagData = {};
    factory;
    ref;
    postIdRedis = "";
    currPostId;
    showPreloader: boolean = false;
    showPublic: boolean = false;
    isError: boolean = false;
    errorText = '';
    similarPost = [];
    userCred = '';
    userPwd = "";
    typ;
    relatedPost: boolean = false;
    usrData = {};
    resize_window: boolean = true;
    intestIds: any = [];
    notShowMore = false;
    relatedPostData: any=[];


    constructor(
        public _constantService: ConstantService,
        public _router: Router,
        public _encrypt: EncryptionService,
        public postData: PostdataService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private activatedRoute: ActivatedRoute,
        private title: Title,
        private meta: Meta
    ) {
        window.scrollTo(0, 0);
    }
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        // if (window.innerWidth < 2000 && window.innerWidth > 1024){
        //   var innerWindWidth = window.innerWidth - 18;
        //   event.target.innerWidth;
        //   this.resize_window = true;
        //   document.getElementById("windiv").style.width = innerWindWidth + "px";
        // }else{
        //   document.getElementById("windiv").style.width = "100%";
        // }
        if (window.innerWidth >= 768) {
            if (document.getElementById("left-side-bar")) {
                var rightwidth = document.getElementById("left-side-bar").offsetWidth;
                var rightinnwidth = rightwidth - 15;
                document.getElementById("someDiv").style.width = rightinnwidth + "px";
            }
        }
        // else{
        //   document.getElementById("someDiv").style.width = "278px";
        // }
    }

    private checkScreenWidth() {
        // var winwidth = window.innerWidth - 18;
        // if (window.innerWidth < 2000 && window.innerWidth > 1024) {
        //
        //     document.getElementById("windiv").style.width = winwidth + "px";
        // } else {
        //     document.getElementById("windiv").style.width = "100%";
        // }
        if (window.innerWidth >= 768) {
            if (document.getElementById("left-side-bar")) {
                var rightwidth = document.getElementById("left-side-bar").offsetWidth;
                var rightinnwidth = rightwidth - 15;
                document.getElementById("someDiv").style.width = rightinnwidth + "px";
            }
        }
        // else{
        //   document.getElementById("someDiv").style.width = "278px";
        // }
    }

    onclickEvent = function (x) {
        alert(x);
    }

    ngOnInit() {
        document.body.classList.remove("body-overflow");
        // var fbId = this._constantService.facebookAppId;
        var fbId = this._constantService.facebookAppId;
        window.fbAsyncInit = function () {
            FB.init({
                appId: fbId,
                xfbml: true,
                version: 'v3.2'
            });
            //        FB.AppEvents.logPageView();

        };
        var my_awesome_script = document.createElement('script');

        my_awesome_script.setAttribute('src', 'https://connect.facebook.net/en_US/sdk.js');

        document.head.appendChild(my_awesome_script);

        this.myProfile = this._constantService.getSessionDataBYKey('my_profile');
        var date = new Date();
        //       this.postData.postId.subscribe(searchTxt => {this.postId=searchTxt;
        //        });
        this.current_year = date.getFullYear();
        this.activatedRoute.params.subscribe((param: Params) => {

            this.t = this._constantService.getSessionDataBYKey('token');
            if (this.t != null && this.t != 'undefined' && this.t != '') {
                this.showPublic = false;
               
                if ((this._constantService.getSessionDataBYKey('mobile_verify') == 'false' && this._constantService.getEmailVer() == 'false') || this._constantService.getUserInterest() == '0') {
                    this._router.navigate(['verification']);
                }

                var u_id = '';
                if (this._constantService.getSessionDataBYKey('u_id')) {
                    u_id = this._constantService.getSessionDataBYKey('u_id').toString();
                }

                var curr_uId = this._router.url.split(":")[0];
                var chn = curr_uId.split("/")[2];
                if (param['id'] != this.postId) {

                    this.currPostId = param['id'];
                    var regex = /^.+:\d+$/;
                    if (regex.test(param['id'])) {
                        if (this.currPostId.split(":")[2] != "3") {
                            this.getLatestPostData(this.currPostId);
                        } else if (this.currPostId.split(":")[2] == "3") {
                            if (u_id == chn) {
                                this.getQuestionPostData(this.currPostId, this._constantService.getQuestionPostDataProfileServiceUrl());
                            } else {
                                this.getQuestionPostData(this.currPostId, this._constantService.getQuestionPostDataWallServiceUrl());
                            }
                        }
                    } else {
                        this.getPublicPostDataToken();
                    }
                }

            } else {
                this.getInterest();
                this.showPublic = true;
                        let splitUrl = this._router.url.split('/post/');
                        let CrntId = splitUrl[splitUrl.length - 1];
                        this.id = param['id'];
                        this.tabCont = param['tabCont'];
                        this.getPostDataPublic(this.id);
                        this.getSimilarPostDataPublic(this.id);
            }
        });

        this.publicPostURL = this._constantService.getSessionDataBYKey('publicClickedURL');

        if (this.publicPostURL != null && this.publicPostURL != undefined && this.publicPostURL != "undefined" && this.publicPostURL != '') {
            //this._constantService.setPublicClickedUrl('');
            this._constantService.setSessionJsonPair('publicClickedURL', '');
        }


    }

    ngAfterViewInit() {
        this.checkScreenWidth();
        // this.secWidth = document.getElementById('left-side-bar').offsetWidth;
        // this.secWidth = this.secWidth - 30;

    }

    ngDoCheck() {
        this.postIdRedis = this._constantService.getSessionDataBYKey('post_id');
    }

    overFlowStatus(status) {
        if (status == true) {
            let body = document.getElementsByTagName('body')[0];
            body.classList.add("body-overflow");
        }
        else {
            let body = document.getElementsByTagName('body')[0];
            body.classList.remove("body-overflow");
        }
    }
    popupOverflowStatus(event) {
        if (event == true) {
            let body = document.getElementsByTagName('body')[0];
            body.classList.add("body-overflow");
        }
        else {
            let body = document.getElementsByTagName('body')[0];
            body.classList.remove("body-overflow");
        }
    }


    getLatestPostData(postIds: string) {

        var postData = {};
        postData['token'] = this._constantService.getSessionDataBYKey('token');
        postData['token_param'] = {};
        postData['token_param']['device_type'] = 'w';
        postData['token_param']['host'] = '';
        postData['pid'] = postIds;



        this._constantService.fetchDataApi(this._constantService.getLatestPostDataServiceUrl(), postData).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (responseData.STATUS == "error") {
                this._router.navigate(['home']);
            }
            if (responseData.POST_DATA.length == 0) {
                this._router.navigate(['home']);
            }
            if (status == this._constantService.success_msg) {
                //.log(this._constantService.success_msg);
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);

                this.postDataDetails = responseData.POST_DATA[0];
                this.container.clear();
                if (this.postDataDetails != undefined) {
                    if (this.postDataDetails['REPORTED'] == 0) {
                        if (postIds.split(':')[0] === this._constantService.getSessionDataBYKey('u_id').toString()) {
                            this.postDataDetails['MY_PROFILE'] = true;
                        } else {
                            this.postDataDetails['MY_PROFILE'] = false;
                        }
                        this.postDataDetails['OTHER_PROFILE'] = false;
                        this.postDataDetails['ADD_DATE_TIME'] = this.getPostDateTime(this.postDataDetails['ADD_DATE_TIME']);
                        //this.post.setPostData(this.postDataDetails);
                        if (this.postDataDetails['TYPE'] == 1) {
                            if (this.postDataDetails['SHARE_LINK_TITLE'] == "" || this.postDataDetails['SHARE_LINK_TITLE'] == null) {
                                this.factory = this.componentFactoryResolver.resolveComponentFactory(TextpostComponent);
                                this.ref = this.container.createComponent(this.factory);
                                this.ref.instance._ref = this.ref;
                                this.ref.instance.arr = this.postDataDetails;
                            } else {
                                this.factory = this.componentFactoryResolver.resolveComponentFactory(LinkpostComponent);

                                this.ref = this.container.createComponent(this.factory);
                                this.ref.instance._ref = this.ref;
                                this.ref.instance.arr = this.postDataDetails;
                            }
                        } else if (this.postDataDetails['TYPE'] == 2) {
                            if (this.postDataDetails['FILE_TYPE'] == 1) {
                                this.factory = this.componentFactoryResolver.resolveComponentFactory(ImagepostComponent);

                                this.ref = this.container.createComponent(this.factory);
                                this.ref.instance._ref = this.ref;
                                this.ref.instance.arr = this.postDataDetails;
                            }
                            if (this.postDataDetails['FILE_TYPE'] == 3 || this.postDataDetails['FILE_TYPE'] == 4 || this.postDataDetails['FILE_TYPE'] == 5) {
                                this.factory = this.componentFactoryResolver.resolveComponentFactory(FileattachmentpostComponent);

                                this.ref = this.container.createComponent(this.factory);
                                this.ref.instance._ref = this.ref;
                                this.ref.instance.arr = this.postDataDetails;
                            }
                        } if (this.postDataDetails['TYPE'] == 7) {
                            this.factory = this.componentFactoryResolver.resolveComponentFactory(CoursepostComponent);

                            this.ref = this.container.createComponent(this.factory);
                            this.ref.instance._ref = this.ref;
                            this.ref.instance.arr = this.postDataDetails;
                            this.ref.instance.onWall = true;
                        } else if (this.postDataDetails['TYPE'] == 4) {
                            this.postDataDetails['SHARED_POST_DATA'].ADD_DATE_TIME = this.getPostDateTime(this.postDataDetails['SHARED_POST_DATA'].ADD_DATE_TIME);
                            if (this.postDataDetails['SHARED_POST_DATA'].TYPE == 1) {
                                if (this.postDataDetails['SHARED_POST_DATA'].SHARE_LINK_TITLE == "") {
                                    this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedpostComponent);

                                    this.ref = this.container.createComponent(this.factory);
                                    this.ref.instance._ref = this.ref;
                                    this.ref.instance.arr = this.postDataDetails;
                                } else {
                                    this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedlinkpostComponent);

                                    this.ref = this.container.createComponent(this.factory);
                                    this.ref.instance._ref = this.ref;
                                    this.ref.instance.arr = this.postDataDetails;
                                }
                            } else if (this.postDataDetails['SHARED_POST_DATA'].TYPE == 2) {
                                if (this.postDataDetails['SHARED_POST_DATA'].FILE_TYPE == 1) {
                                    this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedimagepostComponent);

                                    this.ref = this.container.createComponent(this.factory);
                                    this.ref.instance._ref = this.ref;
                                    this.ref.instance.arr = this.postDataDetails;
                                }
                                if (this.postDataDetails['SHARED_POST_DATA'].FILE_TYPE == 3 || this.postDataDetails['SHARED_POST_DATA'].FILE_TYPE == 4 || this.postDataDetails['SHARED_POST_DATA'].FILE_TYPE == 5) {
                                    this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedfileattachmentComponent);
                                    this.ref = this.container.createComponent(this.factory);
                                    this.ref.instance._ref = this.ref;
                                    this.ref.instance.arr = this.postDataDetails;
                                }

                            } else if (this.postDataDetails['SHARED_POST_DATA'].TYPE == 7) {
                                this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedcoursepostComponent);

                                this.ref = this.container.createComponent(this.factory);
                                this.ref.instance._ref = this.ref;
                                this.ref.instance.arr = this.postDataDetails;
                            } else if (this.postDataDetails['SHARED_POST_DATA'].TYPE == 3) {
                                this.postDataDetails['MY_PROFILE'] = false;
                                if (this.postDataDetails['SHARED_POST_DATA']['QUESTION_TYPE'] == 1) {
                                    this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedsinglechoicepostComponent);

                                    this.ref = this.container.createComponent(this.factory);
                                    this.ref.instance._ref = this.ref;
                                    this.ref.instance.arr = this.postDataDetails;

                                } else if (this.postDataDetails['SHARED_POST_DATA']['QUESTION_TYPE'] == 2) {
                                    this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedmultiplechoicepostComponent);

                                    this.ref = this.container.createComponent(this.factory);
                                    this.ref.instance._ref = this.ref;
                                    this.ref.instance.arr = this.postDataDetails;
                                } else if (this.postDataDetails['SHARED_POST_DATA']['QUESTION_TYPE'] == 3) {
                                    this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedtruefalsepostComponent);

                                    this.ref = this.container.createComponent(this.factory);
                                    this.ref.instance._ref = this.ref;
                                    this.ref.instance.arr = this.postDataDetails;
                                }
                            } else if (this.postDataDetails['SHARED_POST_DATA'].TYPE == 5 || this.postDataDetails['SHARED_POST_DATA'].TYPE == 6) {
                                this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedvideopostComponent);
                                this.ref = this.container.createComponent(this.factory, 0);
                                this.ref.instance._ref = this.ref;
                                this.ref.instance.arr = this.postDataDetails;
                            }

                        } else if (this.postDataDetails['TYPE'] == 5 || this.postDataDetails['TYPE'] == 6) {
                            this.factory = this.componentFactoryResolver.resolveComponentFactory(VideopostComponent);
                            this.ref = this.container.createComponent(this.factory, 0);
                            this.ref.instance._ref = this.ref;
                            this.ref.instance.arr = this.postDataDetails;
                        }

                    }
                }
                // for title and description *********************************************
                if (this.postDataDetails['TEXT']) {
                    let titleurl = this.postData.decodeURIPostData(this.postDataDetails['TEXT']).replace(/<br>/g, "\n").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
                    let titleUrl = this.postData.getTextFromHyperlink(titleurl).replace(/<br>/g, "\n").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
                    titleUrl = this.postData.postDataManipulateHTML(titleUrl);
                    if (titleUrl) {
                        if (titleUrl.length > 64) {
                            titleUrl = titleUrl.slice(0, 64);
                        }
                        var title = titleUrl + " | Study24x7";
                        this.title.setTitle(title);
                        //                        this.meta.addTag({property: "og:title", content: title});
                        //                        this.meta.addTag({name: "twitter:title", content: title});
                        //document.title = this.postDataDetails['USER_NAME'] + " - " + titleUrl + " | Study24x7";
                    }
                } else {
                    var title = "Study24x7 - A best place for collaborative learning & sharing";
                    this.title.setTitle(title);
                    //                    this.meta.addTag({property: "og:title", content: title});
                    //                    this.meta.addTag({name: "twitter:title", content: title});
                }

                //                               if (this.postDataDetails['TEXT']) {
                //                                   var desc = this.postData.decodeURIPostData(this.postDataDetails['TEXT']).replace(/<br>/g, "\n").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
                //                                   if (desc) {
                //                                       this.meta.addTag({name: "description", content: desc.slice(0, 170)},true);
                //                                       this.meta.addTag({property: "og:description", content: desc},true);
                //                                       this.meta.addTag({name: "twitter:description", content: desc},true);
                //                                   }
                //                               } else {
                //                                   desc = "";
                //                                   this.meta.addTag({name: "description", content: desc.slice(0, 170)},true);
                //                                   this.meta.addTag({property: "og:description", content: desc},true);
                //                                   this.meta.addTag({name: "twitter:description", content: desc},true);
                //                               }
                //
                //                this.meta.addTag({property: "og:url", content: document.URL});
                //                this.meta.addTag({name: "twitter:url", content: document.URL});
                //
                //                var isDefined = this.postDataDetails['PATH'];
                //                if (isDefined) {
                //                    var imageUrl = this.postDataDetails['PATH'] + "img/" + this.postDataDetails['USER_POST_ATTACHMENT_UUID'] + ".png";
                //                    this.meta.updateTag({property: "og:image", content: imageUrl});
                //                    this.meta.updateTag({name: "twitter:image", content: imageUrl});
                //                } else {
                //                    imageUrl = "https://study247.s3-accelerate.amazonaws.com/assets/images/svg-three/Logo.png";
                //                    this.meta.updateTag({property: "og:image", content: imageUrl});
                //                    this.meta.updateTag({name: "twitter:image", content: imageUrl});
                //                }
                //
                //                var link = document.getElementsByTagName("link");
                //                for (var i = 0; i < link.length; i++) {
                //                    if (link[i].rel == "canonical") {
                //                        link[i].href = document.URL;
                //                    }
                //                }
                // title and description end ****************************************

            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
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

    getQuestionPostData(post_id, url) {
        var postData = {};
        postData['token'] = this._constantService.getSessionDataBYKey('token');
        postData['token_param'] = {};
        postData['token_param']['device_type'] = 'w';
        postData['token_param']['host'] = '';
        postData['pid'] = post_id;



        this._constantService.fetchDataApi(url, postData).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (responseData.POST_DATA.length == 0) {
                this._router.navigate(['home']);
            }

            if (status == this._constantService.success_msg) {
                this.container.clear();

                //                if (this.postDataDetails['TYPE'] == '' || this.postDataDetails['TYPE'] == null) {
                //                    this._router.navigate(['home']);
                //                }
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.postDataDetails = responseData.POST_DATA[0];
                if (this.postDataDetails['REPORTED'] == 0) {
                    if (post_id.split(':')[0] === this._constantService.getSessionDataBYKey('u_id').toString()) {
                        this.postDataDetails['MY_PROFILE'] = true;
                    } else {
                        this.postDataDetails['MY_PROFILE'] = false;
                    }
                    this.postDataDetails['ADD_DATE_TIME'] = this.getPostDateTime(this.postDataDetails['ADD_DATE_TIME']);
                    //                    this.postDataDetails['RESPONSE_COUNT']
                    //                    this.postDataDetails['TOTAL_RESP_OPT1']
                    //                    this.postDataDetails['TOTAL_RESP_OPT2']
                    //                    this.postDataDetails['TOTAL_RESP_OPT3']
                    //                    this.postDataDetails['TOTAL_RESP_OPT4']
                    //                    this.postDataDetails['TOTAL_RESP_OPT5']
                    //                    this.postDataDetails['TOTAL_RESP_OPT6']
                    //this.post.setPostData(this.postDataDetails);

                    if (this.postDataDetails['QUESTION_TYPE'] == 1) {
                        this.factory = this.componentFactoryResolver.resolveComponentFactory(SinglechoicepostComponent);
                        this.ref = this.container.createComponent(this.factory);
                        this.ref.instance._ref = this.ref;
                        this.ref.instance.arr = this.postDataDetails;
                    } else if (this.postDataDetails['QUESTION_TYPE'] == 2) {
                        this.factory = this.componentFactoryResolver.resolveComponentFactory(MultiplechoicepostComponent);
                        this.ref = this.container.createComponent(this.factory);
                        this.ref.instance._ref = this.ref;
                        this.ref.instance.arr = this.postDataDetails;
                    } else if (this.postDataDetails['QUESTION_TYPE'] == 3) {
                        this.factory = this.componentFactoryResolver.resolveComponentFactory(TruefalsepostComponent);
                        this.ref = this.container.createComponent(this.factory);
                        this.ref.instance._ref = this.ref;
                        this.ref.instance.arr = this.postDataDetails;
                    }
                }

            } else if (status == this._constantService.error_token) {
                this._constantService.clearUserInfo();
                this._router.navigate(['']);
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }
    closePopup(event) {
        if (event['error'] == false) {
            this.openConfirmation = false;
        }
    }

    sessionExpire(event) {
        if (event) {
            this.dataConf['type'] = 4;
            this.dataConf['msg'] = "Session Expire";
            this.dataConf['error_msg'] = "Session Expired";
            this.openConfirmation = true;
        }
    }

    getPostDataPublic(data) {
        if (data == null) {
            return false;
        }
        var postText = {};
        this.activatedRoute.params.subscribe((param: Params) => {
            let isPostId = parseInt(param['id'].toString());
            if (isPostId) {
                postText['ques_str'] = '';
                postText['post_id'] = param['id'];
            } else {
                postText['ques_str'] = this.postData.encodeURIPostData(param['id']);
                postText['post_id'] = '';
            }
        });



        this._constantService.fetchDataApi(this._constantService.getPublicProfilePost4ServiceUrl(), postText).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.container.clear();
                var date = new Date();
                this.postDataDetails = responseData.POST_DATA[0];
                this.postDataDetails.INTERESTS.forEach(element => {
                    this.intestIds.push(element.INTEREST_ID);

                });


                if (this.postDataDetails['URL'] && (this.postDataDetails['USER_POST_ID'])) {
                    window.history.replaceState(null, null, 'post/' + this.postDataDetails['USER_POST_ID'] + '/' + this.postDataDetails['URL']);
                } else {
                    window.history.replaceState(null, null, 'post/' + this.postDataDetails['USER_POST_ID']);
                }

                this.postDataDetails['MY_PROFILE'] = false;
                this.postDataDetails['ADD_DATE_TIME'] = this.getPostDateTime(this.postDataDetails['ADD_DATE_TIME']);
                //this.post.setPostData(this.postDataDetails);
                if (this.postDataDetails['TYPE'] == 4) {
                    this.postDataDetails['SHARED_POST_DATA'].ADD_DATE_TIME = this.getPostDateTime(this.postDataDetails['SHARED_POST_DATA'].ADD_DATE_TIME);
                }
                if (this.postDataDetails['PAGE_UUID'] != '' && this.postDataDetails['PAGE_UUID'] != null) {
                    if (this.postDataDetails['PAGE_PROFILE_PHOTO_PATH'] != null && this.postDataDetails['PAGE_PROFILE_PHOTO_PATH'] != '') {
                        this.usrData['PROFILE_PIC_PATH'] = this.postDataDetails['PAGE_PROFILE_PHOTO_PATH'] + "profile/" + this.postDataDetails['PAGE_UUID'] + "_60x60.png?v=" + responseData.IMG_UPD_DT;
                    } else {
                        if (this.postDataDetails['PAGE_TYPE'] == 0) {
                            this.usrData['PROFILE_PIC_PATH'] = this._constantService.defaultPageIndImgPath;
                        } else if (this.postDataDetails['PAGE_TYPE'] == 1) {
                            this.usrData['PROFILE_PIC_PATH'] = this._constantService.defaultPageCollgImgPath;
                        }
                    }
                } else {
                    if (this.postDataDetails['PROFILE_PHOTO_PATH'] != null && this.postDataDetails['PROFILE_PHOTO_PATH'] != '') {
                        this.usrData['PROFILE_PIC_PATH'] = this.postDataDetails['PROFILE_PHOTO_PATH'] + "profile/" + this.postDataDetails['USER_ID'] + "_60x60.png?v=" + responseData.IMG_UPD_DT;
                    } else {
                        this.usrData['PROFILE_PIC_PATH'] = this._constantService.defaultImgPath;
                    }
                }
                if (this.postDataDetails['TEXT']) {
                    var postdata = this.postData.decodeURIPostData(this.postDataDetails['TEXT']).replace(/<!--bindings={ &#160;"ng-reflect-ng-if": "false" }-->/g, "");
                    if (postdata.length > 200) {
                        postdata = postdata.replace(/ &#160;/g, '  ');
                        postdata = postdata.slice(0, 300) + "...";
                        postdata = postdata.replace(/  /g, " &#160;");
                    }
                    if (postdata == "") {
                        postdata = "...";
                    }
                    this.usrData['USER_FULL_NAME'] = this.postDataDetails['USER_FULL_NAME'];
                }
                if (postdata == "") {
                    postdata = "...";
                }

                if (this.postDataDetails['SHARED_POST_DATA']) {
                    this.sharedTextData = this.postData.decodeURIPostData(this.postDataDetails['SHARED_POST_DATA']['TEXT']);
                }



                // for title and description ****************************************
                if (this.postDataDetails['TEXT']) {
                    let titleurl = this.postData.decodeURIPostData(this.postDataDetails['TEXT']).replace(/<br>/g, "\n").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, '');

                    let titleUrl = this.postData.getTextFromHyperlink(titleurl).replace(/<br>/g, "\n").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
                    titleUrl = this.postData.postDataManipulateHTML(titleUrl);
                    if (titleUrl) {
                        if (titleUrl.length > 64) {
                            titleUrl = titleUrl.slice(0, 60);
                        }
                        var title = titleUrl + " - Study24x7";
                        this.title.setTitle(title);
                        //this.meta.addTag({property: "og:title", content: title});
                        //this.meta.addTag({name: "twitter:title", content: title});
                        //document.title = this.postDataDetails['USER_NAME'] + " - " + titleUrl + " | Study24x7";
                    }
                } else {
                    var title = "Study24x7 - A best place for collaborative learning & sharing";
                    this.title.setTitle(title);
                    // this.meta.addTag({property: "og:title", content: title});
                    // this.meta.addTag({name: "twitter:title", content: title});
                }

                //                               if (this.postDataDetails['TEXT']) {
                //                                   var desc = this.postData.decodeURIPostData(this.postDataDetails['TEXT']).replace(/<br>/g, "\n").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
                //                                   if (desc) {
                //                                       this.meta.addTag({name: "description", content: desc.slice(0, 170)},true);
                //                                       this.meta.addTag({property: "og:description", content: desc},true);
                //                                       this.meta.addTag({name: "twitter:description", content: desc},true);
                //                                   }
                //                               } else {
                //                                   desc = "";
                //                                   this.meta.addTag({name: "description", content: desc.slice(0, 170)},true);
                //                                   this.meta.addTag({property: "og:description", content: desc},true);
                //                                   this.meta.addTag({name: "twitter:description", content: desc},true);
                //                               }
                //
                //                this.meta.addTag({property: "og:url", content: document.URL});
                //                this.meta.addTag({name: "twitter:url", content: document.URL});
                //
                //                var isDefined = this.postDataDetails['PATH'];
                //                if (isDefined) {
                //                    var imageUrl = this.postDataDetails['PATH'] + "img/" + this.postDataDetails['USER_POST_ATTACHMENT_UUID'] + ".png";
                //                    this.meta.updateTag({property: "og:image", content: imageUrl});
                //                    this.meta.updateTag({name: "twitter:image", content: imageUrl});
                //                } else {
                //                    imageUrl = "https://study247.s3-accelerate.amazonaws.com/assets/images/svg-three/Logo.png";
                //                    this.meta.updateTag({property: "og:image", content: imageUrl});
                //                    this.meta.updateTag({name: "twitter:image", content: imageUrl});
                //                }
                //
                //                var link = document.getElementsByTagName("link");
                //                for (var i = 0; i < link.length; i++) {
                //                    if (link[i].rel == "canonical") {
                //                        link[i].href = document.URL;
                //                    }
                //                }
                //                // shareOverrideOGMeta(document.URL, document.title, desc, imageUrl);
                // title and description end ****************************************
                if (this.postDataDetails.PAGE_TYPE == "" || this.postDataDetails.PAGE_TYPE == null || this.postDataDetails.PAGE_TYPE == undefined) {
                    this.usrData['USER_FULL_NAME'] = this.postDataDetails['USER_FULL_NAME'];
                } else {
                    this.usrData['USER_FULL_NAME'] = this.postDataDetails['TITLE'];
                }
                this
                this.factory = this.componentFactoryResolver.resolveComponentFactory(PostotherviewComponent);
                this.ref = this.container.createComponent(this.factory);
                this.ref.instance.arr = this.postDataDetails;
                console.log(this.postDataDetails);
                this.getSingleRelatedPostData();

            }
            else {
                this._router.navigate([''])
            }
        });
    }

    getSimilarPostDataPublic(data) {
        var postText = {}; console.log(data);
        postText['ques_str'] = this.postData.encodeURIPostData(data);


        this._constantService.fetchDataApi(this._constantService.getPublicProfilePostServiceUrl(), postText).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                if (responseData.POST_DATA.length != 0) {
                    this.relatedPost = true;
                    this.similarPost = responseData.POST_DATA;
                    for (var i = 0; i < this.similarPost.length; i++) {
                        this.similarPost[i]['TEXT'] = this.postData.decodeURIPostData(this.similarPost[i]['TEXT']);
                        this.similarPost[i]['TEXT'] = this.postData.decodeURIPostData(this.similarPost[i]['TEXT']).replace(/<!--bindings={/g, "").replace(/"ng-reflect-ng-if": "false"/g, "").replace(/}-->/g, "");
                        this.similarPost[i]['ADD_DATE_TIME'] = this.postData.getPostDateTime(this.similarPost[i]['ADD_DATE_TIME']);
                    }
                }
            }
        })
    }

    getPublicPostDataToken() {
        var postData = {};
        postData['token'] = this._constantService.getSessionDataBYKey('token');
        postData['token_param'] = {};
        postData['token_param']['device_type'] = 'w';
        postData['token_param']['host'] = '';

        this.activatedRoute.params.subscribe((param: Params) => {
            let isPostId = parseInt(param['id'].toString());
            if (isPostId) {
                postData['ques_str'] = '';
                postData['post_id'] = param['id'];
            } else {
                postData['ques_str'] = this.postData.encodeURIPostData(param['id']);
                postData['post_id'] = '';
            }
        });


        this._constantService.fetchDataApi(this._constantService.getPublicPostDataWithTokenServiceUrl(), postData).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (responseData.STATUS == "error") {
                this._router.navigate(['home']);
            }
            if (status == this._constantService.success_msg) {
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.postDataDetails = responseData.POST_DATA[0];
                if (responseData.POST_DATA.length == 0) {
                    this._router.navigate(['home']);
                }

                if (this.postDataDetails['URL'] && (this.postDataDetails['USER_POST_ID'])) {
                    window.history.replaceState(null, null, 'post/' + this.postDataDetails['USER_POST_ID'] + '/' + this.postDataDetails['URL']);
                } else {
                    window.history.replaceState(null, null, 'post/' + this.postDataDetails['USER_POST_ID']);
                }

                if (this.postDataDetails['TEXT']) {
                    let titleurl = this.postData.decodeURIPostData(this.postDataDetails['TEXT']).replace(/<br>/g, "\n").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, '');
                    let titleUrl = this.postData.getTextFromHyperlink(titleurl).replace(/<br>/g, "\n").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/%3Cbr%3E/g, '');
                    titleUrl = this.postData.postDataManipulateHTML(titleUrl);
                    if (titleUrl) {
                        if (titleUrl.length > 64) {
                            titleUrl = titleUrl.slice(0, 60);
                        }
                        var title = titleUrl + " - Study24x7";
                        this.title.setTitle(title);
                    }
                } else {
                    var title = "Study24x7 - A best place for collaborative learning & sharing";
                    this.title.setTitle(title);
                }


                this.container.clear();
                if (this.postDataDetails['REPORTED'] == 0 || this.postDataDetails['REPORTED'] == '0') {
                    if (this.postDataDetails['USER_ID'] == this._constantService.getSessionDataBYKey('u_id')) {
                        this.postDataDetails['MY_PROFILE'] = true;
                    } else {
                        this.postDataDetails['MY_PROFILE'] = false;
                    }
                    this.postDataDetails['OTHER_PROFILE'] = false;
                    this.postDataDetails['ADD_DATE_TIME'] = this.getPostDateTime(this.postDataDetails['ADD_DATE_TIME']);
                    //this.post.setPostData(this.postDataDetails);
                    if (this.postDataDetails['TYPE'] == 1) {
                        if (this.postDataDetails['SHARE_LINK_TITLE']) {
                            // this.factory = this.componentFactoryResolver.resolveComponentFactory(TextpostComponent);
                            this.factory = this.componentFactoryResolver.resolveComponentFactory(LinkpostComponent);
                            this.ref = this.container.createComponent(this.factory);
                            this.ref.instance._ref = this.ref;
                            this.ref.instance.arr = this.postDataDetails;
                        } else {
                            // this.factory = this.componentFactoryResolver.resolveComponentFactory(LinkpostComponent);

                            this.factory = this.componentFactoryResolver.resolveComponentFactory(TextpostComponent);

                            this.ref = this.container.createComponent(this.factory);
                            this.ref.instance._ref = this.ref;
                            this.ref.instance.arr = this.postDataDetails;
                        }
                    } else if (this.postDataDetails['TYPE'] == 2) {
                        if (this.postDataDetails['FILE_TYPE'] == 1) {
                            this.factory = this.componentFactoryResolver.resolveComponentFactory(ImagepostComponent);

                            this.ref = this.container.createComponent(this.factory);
                            this.ref.instance._ref = this.ref;
                            this.ref.instance.arr = this.postDataDetails;
                        }
                        if (this.postDataDetails['FILE_TYPE'] == 3 || this.postDataDetails['FILE_TYPE'] == 4 || this.postDataDetails['FILE_TYPE'] == 5) {
                            this.factory = this.componentFactoryResolver.resolveComponentFactory(FileattachmentpostComponent);
                            this.ref = this.container.createComponent(this.factory);
                            this.ref.instance._ref = this.ref;
                            this.ref.instance.arr = this.postDataDetails;
                        }
                    } else if (this.postDataDetails['TYPE'] == 7) {

                        this.factory = this.componentFactoryResolver.resolveComponentFactory(CoursepostComponent);
                        this.ref = this.container.createComponent(this.factory);
                        this.ref.instance._ref = this.ref;
                        this.ref.instance.arr = this.postDataDetails;
                        this.ref.instance.onWall = true;

                    } else if (this.postDataDetails['TYPE'] == 4) {
                        this.postDataDetails['SHARED_POST_DATA'].ADD_DATE_TIME = this.getPostDateTime(this.postDataDetails['SHARED_POST_DATA'].ADD_DATE_TIME);
                        if (this.postDataDetails['SHARED_POST_DATA'].TYPE == 1) {
                            if (this.postDataDetails['SHARED_POST_DATA'].SHARE_LINK_TITLE) {
                                // this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedpostComponent);
                                this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedlinkpostComponent);
                                this.ref = this.container.createComponent(this.factory);
                                this.ref.instance._ref = this.ref;
                                this.ref.instance.arr = this.postDataDetails;
                            } else {
                                // this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedlinkpostComponent);
                                this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedpostComponent);

                                this.ref = this.container.createComponent(this.factory);
                                this.ref.instance._ref = this.ref;
                                this.ref.instance.arr = this.postDataDetails;
                            }
                        } else if (this.postDataDetails['SHARED_POST_DATA'].TYPE == 2) {
                            if (this.postDataDetails['SHARED_POST_DATA'].FILE_TYPE == 1) {
                                this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedimagepostComponent);

                                this.ref = this.container.createComponent(this.factory);
                                this.ref.instance._ref = this.ref;
                                this.ref.instance.arr = this.postDataDetails;
                            }
                            if (this.postDataDetails['SHARED_POST_DATA'].FILE_TYPE == 3 || this.postDataDetails['SHARED_POST_DATA'].FILE_TYPE == 4 || this.postDataDetails['SHARED_POST_DATA'].FILE_TYPE == 5) {
                                this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedfileattachmentComponent);
                                this.ref = this.container.createComponent(this.factory);
                                this.ref.instance._ref = this.ref;
                                this.ref.instance.arr = this.postDataDetails;
                            }

                        } else if (this.postDataDetails['SHARED_POST_DATA'].TYPE == 7) {
                            this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedcoursepostComponent);
                            this.ref = this.container.createComponent(this.factory);
                            this.ref.instance._ref = this.ref;
                            this.ref.instance.arr = this.postDataDetails;
                        } else if (this.postDataDetails['SHARED_POST_DATA'].TYPE == 3) {
                            this.postDataDetails['MY_PROFILE'] = false;
                            if (this.postDataDetails['SHARED_POST_DATA']['QUESTION_TYPE'] == 1) {
                                this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedsinglechoicepostComponent);

                                this.ref = this.container.createComponent(this.factory);
                                this.ref.instance._ref = this.ref;
                                this.ref.instance.arr = this.postDataDetails;

                            } else if (this.postDataDetails['SHARED_POST_DATA']['QUESTION_TYPE'] == 2) {
                                this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedmultiplechoicepostComponent);

                                this.ref = this.container.createComponent(this.factory);
                                this.ref.instance._ref = this.ref;
                                this.ref.instance.arr = this.postDataDetails;
                            } else if (this.postDataDetails['SHARED_POST_DATA']['QUESTION_TYPE'] == 3) {
                                this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedtruefalsepostComponent);

                                this.ref = this.container.createComponent(this.factory);
                                this.ref.instance._ref = this.ref;
                                this.ref.instance.arr = this.postDataDetails;
                            }
                        } else if (this.postDataDetails['SHARED_POST_DATA'].TYPE == 5 || this.postDataDetails['SHARED_POST_DATA'].TYPE == 6) {
                            this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedvideopostComponent);
                            this.ref = this.container.createComponent(this.factory, 0);
                            this.ref.instance._ref = this.ref;
                            this.ref.instance.arr = this.postDataDetails;
                        }

                    } else if (this.postDataDetails['TYPE'] == 5 || this.postDataDetails['TYPE'] == 6) {
                        this.factory = this.componentFactoryResolver.resolveComponentFactory(VideopostComponent);
                        this.ref = this.container.createComponent(this.factory, 0);
                        this.ref.instance._ref = this.ref;
                        this.ref.instance.arr = this.postDataDetails;
                    } else if (this.postDataDetails['QUESTION_TYPE'] == 1) {
                        this.factory = this.componentFactoryResolver.resolveComponentFactory(SinglechoicepostComponent);
                        this.ref = this.container.createComponent(this.factory);
                        this.ref.instance._ref = this.ref;
                        this.ref.instance.arr = this.postDataDetails;
                    } else if (this.postDataDetails['QUESTION_TYPE'] == 2) {
                        this.factory = this.componentFactoryResolver.resolveComponentFactory(MultiplechoicepostComponent);
                        this.ref = this.container.createComponent(this.factory);
                        this.ref.instance._ref = this.ref;
                        this.ref.instance.arr = this.postDataDetails;
                    } else if (this.postDataDetails['QUESTION_TYPE'] == 3) {
                        this.factory = this.componentFactoryResolver.resolveComponentFactory(TruefalsepostComponent);
                        this.ref = this.container.createComponent(this.factory);
                        this.ref.instance._ref = this.ref;
                        this.ref.instance.arr = this.postDataDetails;
                    }
                }
            }
        });
    }

    closeLoginPopUp(event) {
        this.openLoginPopup = false;
        if (event['LOGIN']) {
            this.showPublic = false;
            this.getPublicPostDataToken();

        }
    }


    getInterest() {

        this._constantService.getInterest();
    }

    loginpopupopen() {
        this.openLoginPopup = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }

    displayMobileMenu($event) {
        this.isMobileMenue = !this.isMobileMenue;
    }

    getSingleRelatedPostData() {
        var postData = {};
        postData['interest'] = this.intestIds.join(',');
        postData['keywords'] = this.postDataDetails.KEYWORDS;
        postData['post_id'] =  this.postDataDetails.USER_POST_ID;

        this._constantService.fetchDataApi(this._constantService.getRelatedDataSinglePostPublic(), postData).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.singlePagePostData = responseData.SEARCH_DATA;
                this.relatedPostData=responseData.SEARCH_DATA.RELATED_POST;

                this.singlePagePostData.POPULAR_COURSES.forEach(course => {
                    if (course.COURSE_PRICE.length > 0) {
                        //use for loop if course.COURSE_PRICE.length is greater than 1 in future
                        course.COURSE_PRICE[0].DISCOUNT_PERCENT =
                            Math.floor(((course.COURSE_PRICE[0].COST - course.COURSE_PRICE[0].DISCOUNT_COST) / course.COURSE_PRICE[0].COST) * 10000) / 100;
                    }
                });
                this.singlePagePostData.FEATURED_COURSES.forEach(course => {
                    if (course.COURSE_PRICE.length > 0) {
                        //use for loop if course.COURSE_PRICE.length is greater than 1 in future
                        course.COURSE_PRICE[0].DISCOUNT_PERCENT =
                            Math.floor(((course.COURSE_PRICE[0].COST - course.COURSE_PRICE[0].DISCOUNT_COST) / course.COURSE_PRICE[0].COST) * 10000) / 100;
                    }
                });
                this.ref.instance.arr.urlNext='post/'+ this.relatedPostData[0].USER_POST_ID;
                console.log(this.ref.instance.arr.urlNext);


            } else if (status == this._constantService.error_token) {
                this._constantService.clearUserInfo();
                this._router.navigate(['']);
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    loginpopupFxn() {
        this.openLoginPopup = !this.openLoginPopup;
        // this.usrData['USER_FULL_NAME'] = this.courseTitle;
        if (this.openLoginPopup) {
            let body = document.getElementsByTagName('body')[0];
            body.classList.add("body-overflow");
        } else {
            let body = document.getElementsByTagName('body')[0];
            body.classList.remove("body-overflow");
        }
    }

    redirectTo(pathname, routeData) {
        var endPoint;
        if (pathname == 'page') {
            endPoint = routeData.PAGE_NAME ? routeData.PAGE_NAME : routeData.PAGE_UUID;

        }
        window.open('/' + pathname + '/' + endPoint);

    }
    redirecttoYoutubeChannel() {
        window.open("https://www.youtube.com/channel/UC3HhY5Y1H2hAME9rfzFJAKg");

    }
    // showingMoreId=[];
    // pushIdToShowingMoreId(id){

    // }

    showMore(id) {
        if (this.notShowMore == false) {
            this.notShowMore = true;
            id = "#" + id;
            $(id).slideDown(200);
        }
    }

    hideMore(id) {
        id = "#" + id;
        $(id).hide(0, this.setNotShowMore());

    }
    setNotShowMore() {
        this.notShowMore = false;
        return null;
    }
    leftSidemenu() {
      // this.leftFilterslidebg = !this.leftFilterslidebg;
      this.isMobileMenue = !this.isMobileMenue;
    //   if (this.leftFilterslidebg == true) {
    //     let body = document.getElementsByTagName('body')[0];
    //     body.classList.add("body-overflow");
    //   } else {
    //     let body = document.getElementsByTagName('body')[0];
    //     body.classList.remove("body-overflow");
    //   }
    }
}
