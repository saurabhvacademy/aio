import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ChangeDetectorRef, Output, EventEmitter, HostListener, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantService } from './../../services/constant.service';
import { EncryptionService } from './../../services/encryption.service';
import { PostdataService } from './../../services/postdata.service';
import { SinglechoicepostComponent } from './../../sharedComponents/postComponents/singlechoicepost/singlechoicepost.component';
import { MultiplechoicepostComponent } from './../../sharedComponents/postComponents/multiplechoicepost/multiplechoicepost.component';
import { TruefalsepostComponent } from './../../sharedComponents/postComponents/truefalsepost/truefalsepost.component';
import { SharedtruefalsepostComponent } from './../../sharedComponents/postComponents/sharedtruefalsepost/sharedtruefalsepost.component';
import { SharedsinglechoicepostComponent } from './../../sharedComponents/postComponents/sharedsinglechoicepost/sharedsinglechoicepost.component';
import { SharedmultiplechoicepostComponent } from './../../sharedComponents/postComponents/sharedmultiplechoicepost/sharedmultiplechoicepost.component';
import { InternalMessageService } from './../../services/internal-message.service';
import { AddpostComponent } from './../../sharedComponents/addpost/addpost.component';


@Component({
    selector: 'app-questionforyou',
    templateUrl: './questionforyou.component.html',
    providers: [ConstantService, EncryptionService],
    styleUrls: [
      './questionforyou.component.scss', 
    './../../sharedComponents/postComponents/textpost/allpost.css',
    // '../../sharedComponents/mmenu/slidemenu.css'
  ],
    host: {
        '(window:scroll)': 'onScroll($event)'
    }
})
export class QuestionforyouComponent implements OnInit, AfterViewInit {
    count_3: number = 0;
    count_2: any = 0;
    count_1: any = 0;
    count_0: any = 0;
    usrSelectedInterest: any;
    token;
    hideasked: boolean = true;
    openConfirmation: boolean;
    dataConf = {};
    @ViewChild('container', { read: ViewContainerRef }) container;
    @ViewChild('child') addpostComponent: AddpostComponent;
    @Output() sessionLogout = new EventEmitter<boolean>();
    factory;
    ref;
    postDataDetails: any;
    continueScroll4you: boolean;
    postPresent: boolean = true;
    loaderscreen: boolean = true;
    showAddPost: boolean = true;
    questionType: number = 1;
    lastQuestionId: number = 0;
    isScrolled: boolean = false;
    resize_window;
    currPos: Number = 0;
    startPos: Number = 0;
    changePos: Number = 0;
    isMobileMenue = false;
    showfilter: boolean = false;
    isCratePagePopup: boolean = false;
    httpSubscriber;
    askedempty: boolean;
    smallWindowSize: boolean;
    coverAll:boolean;


    qstnData=[];
    showHeader: boolean;



    constructor(
        public _constantService: ConstantService,
        private _encryptionService: EncryptionService,
        private _postdataService: PostdataService,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        private _message: InternalMessageService,
        public changeDetectRef: ChangeDetectorRef,
    ) { }

    setShowAddPost(event) {
        this.showAddPost = event;
        this.allQuestionForYou();
    }

    ngOnInit() {
        const url =""+ window.location.href
        const UrlArr = url.split('/');

        if(UrlArr[UrlArr.length-1]=="questionforyou" && UrlArr[3]!="home"){
          this.showHeader=true;
        }
        window.scrollTo(0, 0);
        this._message.getCommand().subscribe(data => {
            if (data) {
                if (data.type == 0 && data.command == 'desc') {
                    switch (this.questionType) {
                        case 0: {
                            if (this.count_0 > 0) {
                                this.count_0--;
                            }
                            break;
                        }
                        case 1: {
                            if (this.count_1 > 0) {
                                this.count_1--;
                                this.count_0++;


                            }
                            break;
                        }
                        case 2: {
                            if (this.count_2 > 0) {
                                this.count_2--;
                            }
                            break;
                        }
                        case 3: {
                            if (this.count_3 > 0) {
                                this.count_3--;
                            }
                            break;
                        }
                    }
                } else if (data.type == 1 && data.command == 'answered') {

                    if (this.questionType == 0) {
                        this.count_0--;
                    }
                    if (this.questionType == 1) {
                        this.count_0--;
                    }
                }
                else if (data.type == 1 && data.command == 'notAnswered') {
                    if (this.questionType == 1) {
                        this.count_1--;
                    }
                }

            }
        });
        this.questionCountForYou();
    }
    showintfilterleave() {
        this.showfilter = !this.showfilter;
    }
    showintfilter() {
        this.showfilter = !this.showfilter;
    }
    ngAfterViewInit() {
        this.checkScreenWidth();
        this.showAddPost = false;
        this.smallWindowSize = (window.innerWidth <= 900);
    }

    ngAfterViewChecked() {
        this.checkScreenWidth();
    }

    ngAfterChecked() {
        this.checkScreenWidth();
    }

    getUserSelectedInterest(event) {
        this.usrSelectedInterest = event.INTEREST;
        this.container.clear();
        this.lastQuestionId = 0;
        //        this.questionCountForYou();
        switch (this.questionType) {
            case 0: {
                //                this.count_0 = event.COUNT;
                this.count_0 = parseInt(event.COUNT);
                break;
            }
            case 1: {
                //                this.count_1 = event.COUNT;
                this.count_1 = parseInt(event.COUNT);
                break;
            }
            case 2: {
                //                this.count_2 = event.COUNT;
                this.count_2 = parseInt(event.COUNT);
                break;
            }
            case 3: {
                //                this.count_2 = event.COUNT;
                this.count_3 = parseInt(event.COUNT);
                break;
            }
        }
        this.allQuestionForYou();
    }


    tabSwitchFxn(tabId) {
        switch (tabId) {
            case 0: {
                this.questionType = 0;
                break;
            }
            case 1: {
                this.questionType = 1;
                break;
            }
            case 2: {
                this.questionType = 2;
                break;
            }
            case 3: {
                this.questionType = 3;
                break;
            }
        }
        this.container.clear();
        this.lastQuestionId = 0;
    }

    questioForYou() {
        this.coverAll=true;
        var question = {};
        question['token'] = this._constantService.getSessionDataBYKey('token');
        question['token_param'] = {};
        question['token_param']['device_type'] = 'w';
        question['token_param']['host'] = '';
        question['type'] = this.questionType;
        question['intr'] = this.usrSelectedInterest.join();
        question['lspid'] = this.lastQuestionId;
        let tabIndex = this.questionType;

        this.httpSubscriber = this._constantService.fetchDataApi(this._constantService.getQuestionForYouServiceUr(), question).subscribe(data => {

            var responseData:any = data;
            var status = responseData.STATUS;

            if (status === this._constantService.success_msg) {
                if (tabIndex == this.questionType) {
                    this.loaderscreen = false;
                    //this._constantService.setToken(responseData.TOKEN);
                    this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                    var post_ids = responseData.POST_DATA;
                    if (post_ids.length == 0) {
                        this.continueScroll4you = false;
                    } else {
                        this.continueScroll4you = true;
                    }
                    if (post_ids.length != 0) {
                        this.postPresent = true;
                        var radisKey = post_ids[post_ids.length - 1];
                        this.lastQuestionId = radisKey.split(':')[1];
                        for (var i = 0; i < post_ids.length; i++) {
                            if (post_ids[i].split(":")[2] != "3") {
                                this.getLatestPostData(post_ids[i], tabIndex);
                            } else if (post_ids[i].split(":")[2] == "3") {
                                if (parseInt(post_ids[i].split(":")[0]) == this._constantService.getSessionDataBYKey('u_id')) {
                                    this.getQuestionPostData(post_ids[i], this._constantService.getQuestionPostDataProfileServiceUrl(), false, tabIndex);
                                } else {
                                    this.getQuestionPostData(post_ids[i], this._constantService.getQuestionPostDataWallServiceUrl(), false, tabIndex);
                                }
                            }
                        }
                    } else if (post_ids.length == 0 && this.lastQuestionId == 0) {
                        this.postPresent = false;
                    }
                }
            }
            this.coverAll=false;
        }),error=>{
            this.coverAll=false;
        }
    }

    questionCountForYou() {
        this.coverAll=true;
        var question = {};
        question['token'] = this._constantService.getSessionDataBYKey('token');
        question['token_param'] = {};
        question['token_param']['device_type'] = 'w';
        question['token_param']['host'] = '';


        this._constantService.fetchDataApi(this._constantService.getUserQuesCountServiceUrl(), question).subscribe(data => {

            var responseData:any = data;
            var status = responseData.STATUS;

            if (status === this._constantService.success_msg) {
                this.count_0 = parseInt(responseData.COUNT_0);
                this.count_1 = parseInt(responseData.COUNT_1);
                this.count_2 = parseInt(responseData.COUNT_2);
                this.count_3 = parseInt(responseData.COUNT_3);

                if (this.count_3 == 0) {
                    this.askedempty = false;
                }
            }
        this.coverAll=false;

        }),error=>{
            this.coverAll=false;
        };
    }

    allQuestionForYou() {
        this.coverAll=true;
        var question = {};
        question['token'] = this._constantService.getSessionDataBYKey('token');
        question['token_param'] = {};
        question['token_param']['device_type'] = 'w';
        question['token_param']['host'] = '';
        question['type'] = this.questionType;
        question['intr'] = this.usrSelectedInterest.join();
        question['lspid'] = this.lastQuestionId;

        this._constantService.fetchDataApi(this._constantService.getQuestionForYouServiceUrl(), question).subscribe(data => {

            var responseData:any = data;
            var status = responseData.STATUS;

            if (status === this._constantService.success_msg) {
                this.loaderscreen = false;
                var postArr = responseData.POST_DATA;
                if (postArr.length == 0) {
                    this.continueScroll4you = false;
                } else {
                    this.continueScroll4you = true;
                }
                if (this.lastQuestionId == 0) {
                    this.container.clear();
                }

                if (postArr.length != 0) {
                    this.lastQuestionId = responseData.LSPID;
                    this.postPresent = true;
                    this.hideasked = false;
                    for (var i = 0; i < postArr.length; i++) {
                        if (postArr[i]['REPORTED'] == 0) {
                            postArr[i]['PROFILE_VIEW'] = false;
                            if (postArr[i]['USER_ID'] == this._constantService.getSessionDataBYKey('u_id')) {
                                postArr[i]['MY_PROFILE'] = true;
                            } else {
                                postArr[i]['MY_PROFILE'] = false;
                            }

                            if (postArr[i].TYPE == 3) {


                                // this.qstnData.push(postArr[i]);
                                // console.log(this.qstnData);
                                // this.QuesPostBuilder(this.qstnData[i]);
                                this.QuesPostBuilder(postArr[i]);



                            } else {
                                this.postBuilder(postArr[i]);
                            }
                        }
                    }
                } else if (postArr.length == 0 && this.lastQuestionId == 0) {
                    this.postPresent = false;
                }
            }
        this.coverAll=false;

        }),error=>{
            this.coverAll=false;
        };
    }


    // questionPost(postArr){


    // }


    getLatestPostData(postIds: string, tabIndex) {
        this.coverAll=true;

        this.postPresent = true;
        var postData = {};
        postData['token'] = this._constantService.getSessionDataBYKey('token');
        postData['token_param'] = {};
        postData['token_param']['device_type'] = 'w';
        postData['token_param']['host'] = '';
        postData['pid'] = postIds;

        this._constantService.fetchDataApi(this._constantService.getLatestPostDataServiceUrl(), postData).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;

            if (status == this._constantService.success_msg) {
                if (tabIndex == this.questionType) {
                    //this._constantService.setToken(responseData.TOKEN);
                    this._constantService.setSessionJsonPair('token', responseData.TOKEN);

                    if (responseData.POST_DATA.length != 0) {
                        this.postDataDetails = responseData.POST_DATA[0];
                        if (this.postDataDetails['REPORTED'] == 0) {
                            this.postDataDetails['PROFILE_VIEW'] = false;

                            if (this.postDataDetails['USER_ID'] == this._constantService.getSessionDataBYKey('u_id')) {
                                this.postDataDetails['MY_PROFILE'] = true;
                            } else {
                                this.postDataDetails['MY_PROFILE'] = false;
                            }

                            this.postBuilder(this.postDataDetails);

                        }
                    }
                }
            }
        this.coverAll=false;

        }, error => {
        this.coverAll=false;

            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });
    }


    postBuilder(postDataDetails) {
        postDataDetails['ADD_DATE_TIME'] = this._postdataService.getPostDateTime(postDataDetails['ADD_DATE_TIME']);
        if (postDataDetails['TYPE'] == 4) {
            postDataDetails['SHARED_POST_DATA']['ADD_DATE_TIME'] = this._postdataService.getPostDateTime(postDataDetails['SHARED_POST_DATA']['ADD_DATE_TIME']);
            if (postDataDetails['SHARED_POST_DATA'].TYPE == 3) {
                if (postDataDetails['MY_PROFILE']) {
                    postDataDetails['MY_PROFILE'] = false;
                    postDataDetails['MY_PROFILE_PARENT'] = true;
                } else {
                    postDataDetails['MY_PROFILE_PARENT'] = false;
                }

                if (postDataDetails['SHARED_POST_DATA']['QUESTION_TYPE'] == 1) {
                    this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedsinglechoicepostComponent);

                    this.ref = this.container.createComponent(this.factory);
                    this.ref.instance._ref = this.ref;
                    this.ref.instance.arr = postDataDetails;
                } else if (postDataDetails['SHARED_POST_DATA']['QUESTION_TYPE'] == 2) {
                    this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedmultiplechoicepostComponent);

                    this.ref = this.container.createComponent(this.factory);
                    this.ref.instance._ref = this.ref;
                    this.ref.instance.arr = postDataDetails;
                } else if (postDataDetails['SHARED_POST_DATA']['QUESTION_TYPE'] == 3) {
                    this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedtruefalsepostComponent);

                    this.ref = this.container.createComponent(this.factory);
                    this.ref.instance._ref = this.ref;
                    this.ref.instance.arr = postDataDetails;
                }
            }
        }
    }


    getQuestionPostData(post_id, url, newPost: boolean, tabIndex) {
        this.coverAll=true;
        var postData = {};
        postData['token'] = this._constantService.getSessionDataBYKey('token');
        postData['token_param'] = {};
        postData['token_param']['device_type'] = 'w';
        postData['token_param']['host'] = '';
        postData['pid'] = post_id;

        if (!postData['token']) {
            this.getQuestionPostData(post_id, url, newPost, tabIndex);
            return;
        }


        this._constantService.fetchDataApi(url, postData).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                if (tabIndex == this.questionType) {
                    //this._constantService.setToken(responseData.TOKEN);
                    this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                    if (responseData.POST_DATA.length != 0) {
                        this.sessionLogout.emit(true);

                        this.postDataDetails = responseData.POST_DATA[0];
                        if (this.postDataDetails['REPORTED'] == 0) {
                            this.postDataDetails['PROFILE_VIEW'] = false;

                            if (this.postDataDetails['USER_ID'] == this._constantService.getSessionDataBYKey('u_id')) {
                                this.postDataDetails['MY_PROFILE'] = true;
                            } else {
                                this.postDataDetails['MY_PROFILE'] = false;
                            }

                            this.QuesPostBuilder(this.postDataDetails);

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
        this.coverAll=false;

        }, error => {
        this.coverAll=false;

            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });
    }


    QuesPostBuilder(postDataDetails) {
        this.changeDetectRef.detectChanges();
        postDataDetails['ADD_DATE_TIME'] = this._postdataService.getPostDateTime(postDataDetails['ADD_DATE_TIME']);
        if (postDataDetails['QUESTION_TYPE'] == 1) {
            this.factory = this.componentFactoryResolver.resolveComponentFactory(SinglechoicepostComponent);
            this.ref = this.container.createComponent(this.factory);
            this.ref.instance._ref = this.ref;
            this.ref.instance.arr = postDataDetails;
        } else if (postDataDetails['QUESTION_TYPE'] == 2) {
            this.factory = this.componentFactoryResolver.resolveComponentFactory(MultiplechoicepostComponent);
            this.ref = this.container.createComponent(this.factory);
            this.ref.instance._ref = this.ref;
            this.ref.instance.arr = postDataDetails;
        } else if (postDataDetails['QUESTION_TYPE'] == 3) {
            this.factory = this.componentFactoryResolver.resolveComponentFactory(TruefalsepostComponent);
            this.ref = this.container.createComponent(this.factory);
            this.ref.instance._ref = this.ref;
            this.ref.instance.arr = postDataDetails;
        }
    }


    onScrollDown() {
        this.token = this._constantService.getSessionDataBYKey('token');
        if (this.token && this.token != 'undefined') {
            console.log("aaaaa",this.continueScroll4you);
            if (this.continueScroll4you) {
                //                this.questioForYou();
                this.allQuestionForYou();
            }
        }
    }



    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.smallWindowSize = (window.innerWidth <= 900);
        if (window.innerWidth < 2000 && window.innerWidth >= 1200) {
            var innerWindWidth = window.innerWidth - 18;
            this.resize_window = true;
            document.getElementById("windiv").style.width = innerWindWidth + "px";
        } else {
            document.getElementById("windiv").style.width = "100%";
        }

        document.getElementById("windiv").style.width = innerWindWidth + "px";
        if (window.innerWidth >= 768) {
            var rightwidth = document.getElementById("que_sidebar_right").offsetWidth;
            var rightinnwidth = rightwidth - 15;
            document.getElementById("someDiv").style.width = rightinnwidth + "px";
            document.getElementById("someDivleft").style.width = rightinnwidth + "px";
        }


        if (window.innerWidth > 991) {
            this.isMobileMenue = false;
        }

    }

    private checkScreenWidth() {
        if (window.innerWidth < 2000 && window.innerWidth >= 1200) {
            var innerWindWidth = window.innerWidth - 18;

            this.resize_window = true;
            document.getElementById("windiv").style.width = innerWindWidth + "px";
        } else {
            document.getElementById("windiv").style.width = "100%";
        }

        if (window.innerWidth >= 768) {
            var rightwidth = document.getElementById("que_sidebar_right").offsetWidth;
            var rightinnwidth = rightwidth - 15;
            if(document.getElementById("someDiv")){
            document.getElementById("someDiv").style.width = rightinnwidth + "px";
            }
            if(document.getElementById("someDivleft")){
            document.getElementById("someDivleft").style.width = rightinnwidth + "px";
            }

        }

        if (window.innerWidth > 992) {
            let hedder_Width = document.getElementById("centerDiv").offsetWidth;
            document.getElementById("header").style.width = (hedder_Width - 30) + "px";

        }
        if (window.innerWidth > 992) {
            let hedder_Width = document.getElementById("centerDiv").offsetWidth;
            document.getElementById("header").style.width = (hedder_Width - 30) + "px";
        }
        else {
            let hedder_Width = document.getElementById("centerDiv").offsetWidth;
            document.getElementById("header").style.width = hedder_Width + "px";
        }
    }

    onScroll(evt) {
        var middleWrapperHeight = document.getElementById('centerDiv').offsetHeight;
        if(document.getElementById('someDiv')){
        var secHeight = document.getElementById('someDiv').offsetHeight;
        }
        var secHeightleft = document.getElementById('someDivleft').offsetHeight;
        var innerWindHeight = window.innerHeight - 50;

        if (secHeight < middleWrapperHeight) {
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
        } else {
            this.isScrolled = false;
        }
        if (secHeightleft < middleWrapperHeight) {
            if (secHeightleft > innerWindHeight) {

                var topHeightleft = secHeightleft - innerWindHeight;
                this.changePos = secHeightleft - innerWindHeight;
                this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
                if (this.currPos >= this.changePos) {
                    this.isScrolled = true;

                    document.getElementById("someDivleft").style.top = -topHeightleft + "px";
                } else {
                    this.isScrolled = false;

                }
            } else {
                var topHeightleft = secHeightleft - innerWindHeight;
                this.changePos = secHeightleft - innerWindHeight;
                this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
                if (this.currPos >= this.changePos) {
                    this.isScrolled = true;

                    document.getElementById("someDivleft").style.top = 72 + "px";
                }

            }
        } else {
            this.isScrolled = false;
        }

    }

    displayMobileMenu($event) {
        this.isMobileMenue = !this.isMobileMenue;
        if (!this.isMobileMenue) {
            this.allQuestionForYou();
        }
    }

    displayPageCreatePopup($event) {
        this.isCratePagePopup = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }

    hidePageCreatePopup($event) {
        this.isCratePagePopup = false;
    }

    hideMobileMenu() {
        this.isMobileMenue = false;
        this.lastQuestionId = 0;
        this.allQuestionForYou();
    }

    openQuestionPopup() {
        this.showAddPost = true;
        this.changeDetectRef.detectChanges();
        setTimeout(() => {
            this.addpostComponent.addposttab(3);

        }, 100);
    }
    receivepopup() {

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
