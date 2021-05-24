import {Component, ViewChild, OnInit, Output, EventEmitter, ComponentFactoryResolver, ViewContainerRef, AfterViewInit, HostListener, ElementRef} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {PostdataService} from './../../services/postdata.service';
import {EncryptionService} from './../../services/encryption.service';
import {AddpostModule} from './../../sharedComponents/addpost/addpost.module';
import {ConstantService} from './../../services/constant.service';
import {LinkpostComponent} from './../../sharedComponents/postComponents/linkpost/linkpost.component';
import {TextpostComponent} from './../../sharedComponents/postComponents/textpost/textpost.component';
import {ImagepostComponent} from './../../sharedComponents/postComponents/imagepost/imagepost.component';
import {FileattachmentpostComponent} from './../../sharedComponents/postComponents/fileattachmentpost/fileattachmentpost.component';
import {SinglechoicepostComponent} from './../../sharedComponents/postComponents/singlechoicepost/singlechoicepost.component';
import {MultiplechoicepostComponent} from './../../sharedComponents/postComponents/multiplechoicepost/multiplechoicepost.component';
import {TruefalsepostComponent} from './../../sharedComponents/postComponents/truefalsepost/truefalsepost.component';
import {VideopostComponent} from './../../sharedComponents/postComponents//videopost/videopost.component';
import {SharedpostComponent} from './../../sharedComponents/postComponents/sharedpost/sharedpost.component';
import {SharedimagepostComponent} from './../../sharedComponents/postComponents/sharedimagepost/sharedimagepost.component';
import {SharedfileattachmentComponent} from './../../sharedComponents/postComponents/sharedfileattachment/sharedfileattachment.component';
import {SharedlinkpostComponent} from './../../sharedComponents/postComponents/sharedlinkpost/sharedlinkpost.component';
import {SharedtruefalsepostComponent} from './../../sharedComponents/postComponents/sharedtruefalsepost/sharedtruefalsepost.component';
import {SharedsinglechoicepostComponent} from './../../sharedComponents/postComponents/sharedsinglechoicepost/sharedsinglechoicepost.component';
import {SharedmultiplechoicepostComponent} from './../../sharedComponents/postComponents/sharedmultiplechoicepost/sharedmultiplechoicepost.component';
import {SharedvideopostComponent} from './../../sharedComponents/postComponents/sharedvideopost/sharedvideopost.component';
import {SharedcoursepostComponent} from './../../sharedComponents/postComponents/sharedcoursepost/sharedcoursepost.component';
import {CoursepostComponent} from './../../sharedComponents/postComponents/coursepost/coursepost.component';
import {InternalMessageService} from './../../services/internal-message.service';

@Component({
    selector: 'app-saved',
    templateUrl: './saved.component.html',
    providers: [ConstantService, EncryptionService, PostdataService, AddpostModule],
    styleUrls: [ './../../sharedComponents/postComponents/textpost/allpost.css', './saved.component.scss'],
    host: {
        '(window:scroll)': 'onScroll($event)'
    }
    //    host: {
    //   '(window:resize)': 'onResize($event)'
    // }
})
export class SavedComponent implements OnInit, AfterViewInit {
    current_year: number;
    id: string;
    Postcount;
    config: any;
    folder: any;
    arr: any;
    @ViewChild('savedContainer', {read: ViewContainerRef}) container;
    FolderPresent = 1;
    lstSelectedFolder = 0;
    currentSelectedFolder = '';
    lstPostId;
    ret = true;
    getrcntpost_click: boolean = false;
    postDataDetails;
    postPresent: boolean = false;
    continueScroll: boolean = true;
    factory;
    ref;
    folderIndex: number = 0;
    recentPostCount = 0;
    secWidth = 0;
    t: string;
    dataConf = {};
    openConfirmation: boolean = false;
    selectedFolderObj = {};
    count = 1;
    savedFolderName: string = "";
    savedFolderId = "";
    save_drop_down: boolean = false;
    isScrolled:boolean = false;
    isScrolled1:boolean = false;
    currPos: Number = 0;
    startPos: Number = 0;
    changePos: Number = 0;
    isEmptyState: boolean = false;
    savedfolder: boolean = false;
    isCratePagePopup:boolean = false;
    // resize_window: boolean = true;
    @ViewChild('saveeditlist', {read: ElementRef}) saveeditlist: ElementRef;
    showHeader: boolean;
    coverAll:boolean;

    constructor(
        public _constantService: ConstantService,
        public post: PostdataService,
        public _router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        public _encryptionService: EncryptionService,
        private postData: PostdataService,
        private _message: InternalMessageService


    ) {
        this._constantService.GetEmptystateObservable$.subscribe(() => {
            this.checkEmptyState();
            //this.getRecentPostInSavedFolder();
        });
    }
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        var innerWindWidth = window.innerWidth - 18;
        if (window.innerWidth >= 1200) {
            event.target.innerWidth;

            document.getElementById("windiv").style.width = innerWindWidth + "px";
        } else {
            document.getElementById("windiv").style.width = "100%";
        }

        if (window.innerWidth >= 992) {
            var rightwidth = document.getElementById("left_side").offsetWidth;
            var rightinnwidth = rightwidth - 15;
            document.getElementById("someDiv").style.width = rightinnwidth + "px";
            document.getElementById("someDivleft").style.width = rightinnwidth + "px";
        }
    }
    private checkScreenWidth() {
        var winwidth = window.innerWidth - 18;
        if (window.innerWidth >= 1200) {

            document.getElementById("windiv").style.width = winwidth + "px";
        } else {
            document.getElementById("windiv").style.width = "100%";
        }

        if (window.innerWidth >= 992) {
            var rightwidth = document.getElementById("left_side").offsetWidth;
            var rightinnwidth = rightwidth - 15;
            document.getElementById("someDiv").style.width = rightinnwidth + "px";
            document.getElementById("someDivleft").style.width = rightinnwidth + "px";
        }
    }

    onScroll(evt) {
        var secHeight = document.getElementById('someDiv').offsetHeight;
        var secHeightleft = document.getElementById('someDivleft').offsetHeight;
        var innerWindHeight = window.innerHeight - 50;
        var secHeightcenter = document.getElementById('centersection').offsetHeight;
        if (secHeightcenter > secHeight) {
            if (secHeight > innerWindHeight) {

                var topHeight = secHeight - innerWindHeight;
                this.changePos = secHeight - innerWindHeight;
                this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
                if (this.currPos >= this.changePos) {
                    this.isScrolled = true;
                    document.getElementById("someDiv").style.top = -topHeight + "px";
                } else {
                    this.isScrolled = false;
                }
            } else {
                var topHeight = secHeight - innerWindHeight;
                this.changePos = secHeight - innerWindHeight;
                this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
                if (this.currPos >= this.changePos) {
                    this.isScrolled = true;
                    document.getElementById("someDiv").style.top = 72 + "px";
                } else {
                    this.isScrolled = false;
                }

            }
        }
        if (secHeightcenter > secHeightleft) {
            if (secHeightleft > innerWindHeight) {

                var topHeightleft = secHeightleft - innerWindHeight;
                this.changePos = secHeightleft - innerWindHeight;
                this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
                if (this.currPos >= this.changePos) {
                    this.isScrolled1 = true;
                    document.getElementById("someDivleft").style.top = -topHeightleft + "px";
                } else {
                    this.isScrolled1 = false;
                }
            } else {
                var topHeightleft = secHeightleft - innerWindHeight;
                this.changePos = secHeightleft - innerWindHeight;
                this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
                if (this.currPos >= this.changePos) {
                    this.isScrolled1 = true;
                    document.getElementById("someDivleft").style.top = 72 + "px";
                } else {
                    this.isScrolled1 = false;
                }

            }
        }else {
            this.isScrolled = false;
        }

    }

    savefolder_drpdown() {
        this.savedfolder = !this.savedfolder;
    }

    focusOut($event) {
        $event.stopPropagation();
        this.savedfolder = false;
        this.save_drop_down = false;

    }

    ngOnInit() {
        const url =""+ window.location.href
        const UrlArr = url.split('/');

        if(UrlArr[UrlArr.length-1]=="saved" && UrlArr[3]!="home"){
          this.showHeader=true;
        }
        this._message.getCommand().subscribe(data => {
            if (data.type == 0 && data.command == 'desc') {
                if (this.savedFolder[this.folderIndex].TOTAL_POST_COUNT > 0) {
                    this.savedFolder[this.folderIndex].TOTAL_POST_COUNT--;
                }
            }
        });

        this.t = this._constantService.getSessionDataBYKey('token');
        var date = new Date();

        this.current_year = date.getFullYear();

        if (this.t != '' && this.t != "undefined" && this.t != undefined && this.t != null) {
            //            if (this._constantService.getCountry() == '1') {
            //                if (this._constantService.getMobileVer() == 'false' || this._constantService.getUserInterest(            ) == '0') {
            //                    this._router.navigate(['verif            ication']);
            //                            }
            //                        } else {
            //                if (this._constantService.getEmailVer() == 'false' || this._constantService.getUserInterest(            ) == '0') {
            //                    this._router.navigate(['verif            ication']);
            //                            }
            //            }

            if (this._constantService.getSessionDataBYKey('mobile_verify') == 'false' && this._constantService.getEmailVer() == 'false') {
                this._router.navigate(['verification']);
            } else if (this._constantService.getUserInterest() == '0') {
                this._router.navigate(['interest']);
            }
            window.scrollTo(0, 0);
            this.getUserSavedFolder();
            this.getRecentPostInSavedFolder();
        } else {
            this._constantService.clearUserInfo();
            this._router.navigate(['']);
        }
    }


    ngAfterViewInit() {
        this.checkScreenWidth();
        this.secWidth = document.getElementById('left-side-bar').offsetWidth;
        this.secWidth = this.secWidth - 30;
    }
    Savedfolder = false;

    public savedFolder = [];

    getUserSavedFolder() {
        var savedFolder = {};
        savedFolder['token'] = this._constantService.getSessionDataBYKey('token');
        savedFolder['token_param'] = {};
        savedFolder['token_param']['device_type'] = 'w';
        savedFolder['token_param']['host'] = '';
        savedFolder['fldid'] = 0;
        savedFolder['count'] = 10;
        savedFolder['flow'] = 'a';


        this._constantService.fetchDataApi(this._constantService.getUserSavedFolderServiceUrl(), savedFolder).subscribe(data => {
            this.coverAll=true;
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.savedFolder = responseData.SAVED_FOLDER;
                if (this.savedFolder.length > 0) {
                    this.FolderPresent = 1;
                }

                for (var i = 0; i < this.savedFolder.length; i++) {
                    this.Postcount = this.savedFolder[i].TOTAL_POST_COUNT;
                }

            } else if (status == this._constantService.error_token) {
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
            this.coverAll=false;

        }, error => {
            this.coverAll=false;

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

    checkEmptyState() {
        console.log(this.currentSelectedFolder);
        this.getPostsafteraction(1);
        this.getUserSavedFolder();
    }

    getFolderPost(fldId, count, scroll, i) {
        this.recentPostCount == 1;
        this.currentSelectedFolder = fldId;
        if (this.lstSelectedFolder != fldId) {
            this.lstSelectedFolder = fldId;
        }
        this.folderIndex = i;
        this.savedFolderName = this.savedFolder[i].FOLDER_NAME;
        this.savedFolderId = this.savedFolder[i].SAVED_FOLDER_ID;
        this.getrcntpost_click = false;
        var savedPost = {};
        savedPost['token'] = this._constantService.getSessionDataBYKey('token');
        savedPost['token_param'] = {};
        savedPost['token_param']['device_type'] = 'w';
        savedPost['token_param']['host'] = '';
        savedPost['sfldid'] = fldId;
        savedPost['flow_id'] = count;

        this._constantService.fetchDataApi(this._constantService.getPostFromSavedFolderServiceUrl(), savedPost).subscribe(data => {
            this.coverAll=true;

            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                if (responseData.POST_DATA != null) {
                    if (count == 1) {
                        if (responseData.POST_DATA.length == 0) {
                            this.recentPostCount = 0;
                            this.FolderPresent = 2;
                        } else {
                            this.FolderPresent = 1;
                        }
                    }
                    this.postPresent = true;
                    if (responseData.POST_DATA.length < 10) {
                        this.continueScroll = false;
                    }
                    if (this.FolderPresent == 1) {
                        var postIds = "";

                        for (var i = 0; i < responseData.POST_DATA.length; i++) {
                            postIds = responseData.POST_DATA[i].split(",")[0];
                            if (postIds.split(":")[2] != "3") {
                                this.getLatestPostData(postIds);
                            } else if (postIds.split(":")[2] == "3") {
                                this.getQuestionPostData(postIds, this._constantService.getQuestionPostDataProfileServiceUrl());
                            }
                        }
                    }
                }
            } else if (status == this._constantService.error_token) {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }
            this.coverAll=false;

        }, error => {
            this.coverAll=false;

            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    getLatestPostData(postIds: string) {
        var postData = {};
        postData['token'] = this._constantService.getSessionDataBYKey('token');
        postData['token_param'] = {};
        postData['token_param']['device_type'] = 'w';
        postData['token_param']['host'] = '';
        postData['pid'] = postIds;

        this._constantService.fetchDataApi(this._constantService.getLatestPostDataServiceUrl(), postData).subscribe(data => {
            this.coverAll=true;

            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                if (responseData.POST_DATA[0] != undefined) {
                    this.postDataDetails = responseData.POST_DATA[0];
                    if (this.postDataDetails['REPORTED'] == 0) {
                        if (this.postDataDetails['USER_ID'] == this._constantService.getSessionDataBYKey('u_id')) {
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
                            } else if (this.postDataDetails['SHARED_POST_DATA'].TYPE == 3) {
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
                                this.ref = this.container.createComponent(this.factory);
                                this.ref.instance._ref = this.ref;
                                this.ref.instance.arr = this.postDataDetails;
                            } else if (this.postDataDetails['SHARED_POST_DATA'].TYPE == 7) {
                                this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedcoursepostComponent);
                                this.ref = this.container.createComponent(this.factory);
                                this.ref.instance._ref = this.ref;
                                this.ref.instance.arr = this.postDataDetails;
                            }
                        } else if (this.postDataDetails['TYPE'] == 5 || this.postDataDetails['TYPE'] == 6) {
                            this.factory = this.componentFactoryResolver.resolveComponentFactory(VideopostComponent);
                            this.ref = this.container.createComponent(this.factory);
                            this.ref.instance._ref = this.ref;
                            this.ref.instance.arr = this.postDataDetails;
                        } else if (this.postDataDetails['TYPE'] == 7) {
                            this.factory = this.componentFactoryResolver.resolveComponentFactory(CoursepostComponent);
                            this.ref = this.container.createComponent(this.factory);
                            this.ref.instance._ref = this.ref;
                            this.ref.instance.arr = this.postDataDetails;
                        }
                    }
                }
            }
            this.coverAll=false;

        }, error => {
            this.coverAll=false;

            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    getQuestionPostData(post_id, url) {
        var postData = {};
        postData['token'] = this._constantService.getSessionDataBYKey('token');
        postData['token_param'] = {};
        postData['token_param']['device_type'] = 'w';
        postData['token_param']['host'] = '';
        postData['pid'] = post_id;


        this._constantService.fetchDataApi(url, postData).subscribe(data => {
            this.coverAll=true;

            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.postDataDetails = responseData.POST_DATA[0];
                if (this.postDataDetails['REPORTED'] == 0) {
                    if (this.postDataDetails['USER_ID'] == this._constantService.getSessionDataBYKey('u_id')) {
                        this.postDataDetails['MY_PROFILE'] = true;
                    } else {
                        this.postDataDetails['MY_PROFILE'] = false;
                    }
                    this.postDataDetails['OTHER_PROFILE'] = false;
                    this.postDataDetails['ADD_DATE_TIME'] = this.getPostDateTime(this.postDataDetails['ADD_DATE_TIME']);
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
            this.coverAll=false;

        }, error => {
            this.coverAll=false;

            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }


    getPostDateTime(posttime: any) {
        var date = new Date(posttime);
        var day = date.getDate();
        var month = date.toLocaleString("en-us", {month: "short"});
        var time = date.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
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

    onScrollDown() {
        if (this.continueScroll && this.folders != 0) {
            this.count++;
            this.getFolderPost(this.currentSelectedFolder, this.count, true, this.folderIndex);
        }

    }

    savedeleteshow: boolean = false;
    savededitshow: boolean = false;
    postmenu: boolean = false;
    createfoldershow: boolean = false;
    overflowStatus = false;

    deletesavedfolder(id) {
        this.currentSelectedFolder = id;
        if (this.savedeleteshow === false) {
            this.overflowStatus = true;
            this.savedeleteshow = true;
        }
        else {
            this.getRecentPostInSavedFolder();
            this.overflowStatus = true;
            this.savedeleteshow = false;
        }
    }
    editsavedfolder(id, name) {
        this.currentSelectedFolder = id;
        this.selectedFolderObj['id'] = id;
        this.selectedFolderObj['name'] = name;
        if (this.savededitshow === false) {
            this.overflowStatus = true;
            this.savededitshow = true;
        }
        else {
            this.overflowStatus = true;
            this.savededitshow = false;

        }
    }
    editfolderhideparent(editpara) {
        this.savededitshow = editpara['popupstatus'];
        this.overflowStatus = editpara['popupstatus'];
        if (editpara['editfolderstatus']) {
            this.savedFolder[this.folderIndex].FOLDER_NAME = editpara['fldname'];
            this.savedFolderName = editpara['fldname'];

        }
    }
    deletefolderhideparent(deletepara) {
        this.savedeleteshow = deletepara['popupstatus'];
        this.overflowStatus = deletepara['popupstatus'];
        if (deletepara['folderDelStatus']) {
            document.getElementById("saved_" + deletepara['fldid']).style.display = "none";
            this.folders = 0;
            this.getrcntpost_click = false;
            this.currentSelectedFolder = "";
            this.getRecentPostInSavedFolder();

        }
    }

    postdropdown() {
        this.postmenu = !this.postmenu;
    }
    showcreatefolder() {
        if (this.createfoldershow === false) {
            this.createfoldershow = true;
            this.overflowStatus = true;
        }
        else {
            this.createfoldershow = false;
            this.overflowStatus = false;
        }
    }
    createfolderhideparent(createpara) {
        this.createfoldershow = createpara;
        this.overflowStatus = createpara;
    }
    folders = 0;
    savedfolderClick(index) {
        this.continueScroll = true;
        this.count = 1;
        if (index != 0) {
            this.container.clear();
        }
        this.folders = index;

    }

    getRecentPostInSavedFolder() {
        if (this.getrcntpost_click == false) {
            this.getrcntpost_click = true;
            var recentPost = {};
            recentPost['token'] = this._constantService.getSessionDataBYKey('token');
            recentPost['token_param'] = {};
            recentPost['token_param']['device_type'] = 'w';
            recentPost['token_param']['host'] = '';


            this._constantService.fetchDataApi(this._constantService.getRecentSavedPostIdServiceUrl(), recentPost).subscribe(data => {
            this.coverAll=true;

                var responseData:any = data;
                var status = responseData.STATUS;
                if (status == this._constantService.success_msg) {
                    //this._constantService.setToken(responseData.TOKEN);
                    this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                    var postIds = "";
                    this.container.clear();
                    this.recentPostCount = responseData.POST_DATA.length;
                    if (responseData.POST_DATA.length == 0) {
                        this.isEmptyState = true;
                    }
                    for (var i = 0; i < responseData.POST_DATA.length; i++) {
                        postIds = responseData.POST_DATA[i].POST_ID;
                        if (postIds.split(":")[2] != "3") {
                            this.getLatestPostData(postIds);
                        } else if (postIds.split(":")[2] == "3") {
                            this.getQuestionPostData(postIds, this._constantService.getQuestionPostDataProfileServiceUrl());
                        }

                    }
                } else if (status == this._constantService.error_token) {
                    this.dataConf['type'] = 4;
                    this.dataConf['msg'] = "Session Expire";
                    this.dataConf['error_msg'] = "Session Expired";
                    this.openConfirmation = true;
                    this.getrcntpost_click = false;
                } else {
                    this.dataConf['type'] = 2;
                    this.dataConf['msg'] = "STUDY24X7";
                    this.dataConf['error_msg'] = responseData.ERROR_MSG;
                    this.openConfirmation = true;
                    this.getrcntpost_click = false;
                }
                this.coverAll=false;

            }, error => {
            this.coverAll=false;

                var responseData = error;
                if (responseData.status == 500) {
                    this._router.navigate(['500']);
                    this.getrcntpost_click = false;
                }
            });
        }
    }
    sessionExpire(event) {
        if (event) {
            this.dataConf['type'] = 4;
            this.dataConf['msg'] = "Session Expire";
            this.dataConf['error_msg'] = "Session Expired";
            this.openConfirmation = true;
            this.getrcntpost_click = false;
        }
    }

    postId(event) {

    }
    savedropdown() {
        this.save_drop_down = !this.save_drop_down;
    }
    @HostListener('document:click', ['$event'])
    clickout(event) {
        if (this.saveeditlist != undefined && this.saveeditlist != null) {
            if (!this.saveeditlist.nativeElement.contains(event.target)) {
                this.save_drop_down = false;
            }
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

    getPostsafteraction(count) {

        var savedPost = {};
        savedPost['token'] = this._constantService.getSessionDataBYKey('token');
        savedPost['token_param'] = {};
        savedPost['token_param']['device_type'] = 'w';
        savedPost['token_param']['host'] = '';
        console.log(this.currentSelectedFolder);
        if (this.currentSelectedFolder == '') {
            this.getrcntpost_click = false;
            this.getRecentPostInSavedFolder();
            return false;
        }

        savedPost['sfldid'] = this.currentSelectedFolder;
        savedPost['flow_id'] = 1;

        this._constantService.fetchDataApi(this._constantService.getPostFromSavedFolderServiceUrl(), savedPost).subscribe(data => {
            this.coverAll=true;

            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                if (responseData.POST_DATA != null) {

                    if (responseData.POST_DATA.length == 0) {
                        this.container.clear();
                        this.recentPostCount = 0;
                        this.FolderPresent = 2;
                        this.isEmptyState = true;
                    } else {
                        this.container.clear();
                        this.FolderPresent = 1;
                        this.isEmptyState = false;
                    }

                    this.postPresent = true;
                    if (responseData.POST_DATA.length < 10) {
                        this.continueScroll = false;
                    }
                    if (this.FolderPresent == 1) {
                        var postIds = "";

                        for (var i = 0; i < responseData.POST_DATA.length; i++) {
                            postIds = responseData.POST_DATA[i].split(",")[0];
                            if (postIds.split(":")[2] != "3") {
                                this.getLatestPostData(postIds);
                            } else if (postIds.split(":")[2] == "3") {
                                this.getQuestionPostData(postIds, this._constantService.getQuestionPostDataProfileServiceUrl());
                            }
                        }
                    }
                }
            } else if (status == this._constantService.error_token) {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }
            this.coverAll=false;

        }, error => {
            this.coverAll=false;

            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }



    displayPageCreatePopup($event) {
        console.log("show create popup wall");
        this.isCratePagePopup = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }

    hidePageCreatePopup($event) {
      console.log("ayush sahu");
      this.isCratePagePopup = false;
    }
}
