import { Component, ViewChild, AfterViewInit, OnInit, ComponentFactoryResolver, ViewContainerRef, AfterViewChecked, ElementRef, HostListener, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EncryptionService } from './../../services/encryption.service';
import { ConstantService } from './../../services/constant.service';
import { PostdataService } from './../../services/postdata.service';
import { MessageotherviewComponent } from './messageotherview/messageotherview.component';
import { MessageselfviewComponent } from './messageselfview/messageselfview.component';
import { PerfectScrollbarComponent, PerfectScrollbarDirective, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
    selector: 'app-inbox',
    host: { '(document:click)': 'handleClick($event)' },
    templateUrl: './inbox.component.html',
    providers: [],
    styleUrls: ['./inbox.component.scss', './../../sharedComponents/peopleyouknow/peopleyouknow.component.scss']
})
export class InboxComponent implements OnInit, AfterViewInit {
    displayName: any;
    cpy_msg: string;
    isMsgQueEmpty: boolean = true;
    uuiD: any = "";
    valAct2: boolean;
    valAct: boolean;
    Pguuid: any;
    usr_nam: any;
    usr_name: any;
    trailen = [];
    flw = "d";
    prevUname = "";
    pageMsg: boolean = false;
    rurl: any;
    uuid: boolean = false;
    emptyStateMsg: boolean = false;
    enableSendBtn: boolean = false;
    StopHit: boolean = true;
    u_id = [];
    dataConf = {};
    openConfirmation: boolean = false;
    seemore: boolean = false;
    see: string;
    arr: any;
    msg: string;
    DataView: boolean = false;
    t: string;
    config: PerfectScrollbarConfigInterface = {};
    showText: boolean = true;
    loader: boolean = false;
    activemessagetype = 2;
    trails = [];
    messages = [];
    name;
    profile_pic;
    f_id;
    trail_id;
    msg_text = "";
    lstMsgId = 0;
    trailIndex = 0;
    confPopUpObj = {};
    userName: string = "";
    imDisabled = true;
    imDisabledTwo = true;
    message_people_list: boolean = true;
    message_trail: boolean = false;
    webviewmsg: boolean = true;
    // resize_window: boolean = true;
    //@ViewChild('scrollTo' , {read: ElementRef}) public myScrollContainer: ElementRef;
    @ViewChild('container', { read: ViewContainerRef }) container;
    // @ViewChild('container_mob', {read: ViewContainerRef}) container_mob;
    @ViewChild('inbox', { read: ElementRef }) inbox: ElementRef;
    @ViewChild('scrolltobottom') scrolltobottom: PerfectScrollbarComponent;
    @ViewChild('scrolltobottom_mob') scrolltobottom_mob: PerfectScrollbarComponent;
    @ViewChild(PerfectScrollbarDirective) directiveRef?: PerfectScrollbarDirective;
    @ViewChild('perfectScrollBarResponsiveContactList') perfectScrollBarResponsiveContactList: PerfectScrollbarComponent;
    @ViewChild('perfectScrollBarWebContactList') perfectScrollBarWebContactList: PerfectScrollbarComponent;

    sureToDelStatus: boolean = false;
    showUser: boolean = false;
    noResult: boolean = false;
    searchedUser = [];
    timer = null;
    userProfilePic: string = "";
    friendId = "";
    showdelbtn = true;
    searchData = ""
    lastTrailTime = "";
    continueScrollTrail: boolean = false;
    continueScrollUp: boolean = false;
    count = 1;
    lstAct;
    chatRefresh: boolean = false;
    myTimer;
    lastTrail = 0;
    lastReceivedMsgId;
    firstReceivedMsgId;
    inboxswitch: boolean = false;
    shoedelmsglist: boolean = false;
    isPage: any;
    urlData = "";
    removedUser: boolean = true;
    isMobileMenue: boolean = false;
    displayTitle: string = "";
    @ViewChild('delmsglist', { read: ElementRef }) delmsglist: ElementRef;
    fromRes: number;
    res_msg: any;
    openedIndex: any;



    delThisConversation() {
        this.confPopUpObj['type'] = 3;
        this.confPopUpObj['msg'] = "Delete this conversation";
        this.confPopUpObj['error_msg'] = "Are you sure about deleting this conversation?";
        this.confPopUpObj['msgtrailId'] = this.trails[this.trailIndex].MESSAGE_TRAIL_ID;
        this.sureToDelStatus = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");

    }

    closeMeCon(event) {
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
        this.sureToDelStatus = event['closePopUpStatus'];
        if (event['conversationDelStatus'] == true) {
            this.Pguuid = this.trails[this.trailIndex].PAGE_UUID;
            this.usr_nam = this.trails[this.trailIndex].USER_NAME;
            if (this.trails.length - 1 == this.trailIndex) {
                this.valAct = true;
            }
            if (this.trailIndex == 1) {
                this.valAct2 = true;
            }
            document.getElementById(this.trails[this.trailIndex].MESSAGE_TRAIL_ID).style.display = 'none';
            this.trails.splice(this.trailIndex, 1);
            this.activemessagetype = 1;
        }
        if (this.trailen.length == 1) {
            this.activemessagetype = 2;
        } else {
            if (this.valAct != true) {
                this.getAllRecievedMsg(this.trailIndex, 0, this.flw);
            }
            else if (this.valAct2 == true) {
                if (this.trails[this.trailIndex] == undefined) {
                    this.activemessagetype = 2;
                } else {
                    this.getAllRecievedMsg(2, 0, this.flw);
                }
            }
            else {
                this.getAllRecievedMsg(this.trailIndex - 1, 0, this.flw);
            }

            //            else {
            //                this.getAllRecievedMsg(this.trailIndex + 1, 0, this.flw);
            //            }
        }
        this.Pguuid = "#" + this.Pguuid;
        if (this.usr_name == this.usr_nam || this.usr_name == this.Pguuid) {
            this._router.navigate(['inbox'])
        }
        this.shoedelmsglist = false;
    }

    activemessage(index) {
        this.activemessagetype = index;
        this.trailIndex = null;
        if (index == 2) {
            this.stopTimer();
            this.showUser = false;
            this.friendId = "";
            this.msg_text = "";
            setTimeout(() => {
                var input = <HTMLInputElement>document.getElementById('searchInput');
                if (input) {
                    // input.focus();
                    document.getElementById("new_msg").focus();

                } else {
                    this.activemessage(2);
                }
            }, 300);
        } else if (index == 3) {
            // this case is for responsive site, new msg view on only compose click.
            this.activemessagetype = 2;
            this.message_people_list = false;
            this.message_trail = true;
            this.stopTimer();
            this.showUser = false;
            this.friendId = "";
            this.msg_text = "";
            this._constantService.setSessionJsonPair('cmps_res_msg', 1);
            setTimeout(() => {
                var input = <HTMLInputElement>document.getElementById('searchInput');
                if (input) {
                    document.getElementById("new_msg").focus();

                    // input.focus();
                } else {
                    this.activemessage(2);
                }
            }, 300);
        }
    }


    constructor(
        public _constantService: ConstantService,
        private _router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        private activatedRoute: ActivatedRoute,
        private postData: PostdataService,
        private changeDetector: ChangeDetectorRef
    ) { }
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        // var innerWindWidth = window.innerWidth - 18;
        // event.target.innerWidth;
        // document.getElementById("windiv").style.width = innerWindWidth + "px";

        if (window.innerWidth < 2000 && window.innerWidth > 992) {
            var innerWindWidth = window.innerWidth - 18;
            event.target.innerWidth;
            // this.resize_window = true;
            document.getElementById("windiv").style.width = innerWindWidth + "px";
        } else {
            document.getElementById("windiv").style.width = "100%";
        }

        if (window.innerWidth >= 769) {
            this.webviewmsg = true;
        } else {
            this.webviewmsg = false;

        }

        if (window.innerWidth > 991) {
            this.isMobileMenue = false;
        }

    }
    private checkScreenWidth() {
        // var winwidth = window.innerWidth - 18;
        // if (window.innerWidth < 2000 && window.innerWidth > 499) {
        //     document.getElementById("windiv").style.width = winwidth + "px";
        // } else {
        //     document.getElementById("windiv").style.width = winwidth + "px" + 18;
        // }
        var winwidth = window.innerWidth - 18;
        if (window.innerWidth < 2000 && window.innerWidth > 992) {

            document.getElementById("windiv").style.width = winwidth + "px";
        } else {
            document.getElementById("windiv").style.width = "100%";
        }
        if (window.innerWidth >= 769) {
            this.webviewmsg = true;
        } else {
            this.webviewmsg = false;

        }
    }

    ngOnInit() {

        this.checkScreenWidth();
        this.t = this._constantService.getSessionDataBYKey('token');
        if (this.t != null && this.t != undefined && this.t != '') {
            //            if (this._constantService.getCountry(            ) == '1') {
            //                if (this._constantService.getMobileVer() == 'false' || this._constantService.getUserInterest(            ) == '0') {
            //                    this._router.navigate(['verif            ication']);
            //                            }
            //                        } else {
            //                if (this._constantService.getEmailVer() == 'false' || this._constantService.getUserInterest(            ) == '0') {
            //                    this._router.navigate(['verification']);
            //                            }
            //            }

            if ((this._constantService.getSessionDataBYKey('mobile_verify') == 'false' && this._constantService.getEmailVer() == 'false') || this._constantService.getUserInterest() == '0') {
                this._router.navigate(['verification']);
            }


            window.scrollTo(0, 0);

            this.activatedRoute.params.subscribe((params: Params) => {
                if (params['username']) {
                    this.uuiD = params['username'].replace(/#/g, "");
                    var str = params['username'];
                    var y = str.charAt(0);
                    if (y == "#") {
                        this.isPage = 2;
                        this.f_id = this.uuiD;
                        if (this._constantService.getSessionDataBYKey('page_title')) {
                            this.displayTitle = this._constantService.getSessionDataBYKey('page_title');
                        }
                    } else {
                        this.f_id = this.friendId; console.log(this.f_id);
                        this.isPage = 0
                        if (this._constantService.getSessionDataBYKey('user_name')) {
                            this.displayName = this._constantService.getSessionDataBYKey('user_name');
                            this.displayTitle = this.displayName;
                        } else {
                            this.displayName = this.uuiD;
                            this.displayTitle = this.uuiD;
                        }
                    }
                }

            });

            this.activatedRoute.params.subscribe((params: Params) => {
                if (params['username'] != null) {
                    this.showUser = true;

                    setTimeout(() => {
                        this.friendId = this._constantService.getSessionDataBYKey('friend_user_id');
                    }, 100)
                    this.trails = [];
                    this.messages = [];
                    this.urlData = params['username'];
                    if (this.webviewmsg == false) {
                        // this.getLatestMessageTrails(params['username'], "");
                        setTimeout(() => {
                            this.activemessagetype = 1;
                            // this.getAllRecievedMsg(0, 0, 'd');
                        }, 400)
                    }
                    this.getLatestMessageTrails(params['username'], "");
                } else {
                    this.activemessage(2);
                    this.getLatestMessageTrails("", "");
                }
            }, error => {
                var responseData = error;
                if (responseData.status == 500) {
                    this._router.navigate(['500']);
                }
            });
        } else {
            this._router.navigate(['']);

        }

        this.fromRes = this._constantService.getSessionDataBYKey('fom_res');


        if (this.urlData.charAt(0) != "#") {
            this.pageMsg = true;
        }
        this.activatedRoute.params.subscribe((params: Params) => {
            this.usr_name = params['username'];
        });

        console.log(this.uuiD);




    }

    ngOnDestroy() {
        this.stopTimer();
    }
    ngAfterViewInit() {
        document.getElementById("new_msg").focus();

    }

    //    ngDoCheck() {
    //        if (this.activemessagetype == 1 && this.trail_id != this.lastTrail) {
    //            this.lastTrail = this.trail_id;
    //            this.stopTimer();
    //        } else if (this.activemessagetype != 1) {
    //            this.stopTimer();
    //        }
    //    }

    stopTimer() {
        clearInterval(this.myTimer);
    }
    scrollToBottomFirst(): void {
        try {
            this.scrolltobottom.directiveRef.scrollToBottom(0, 0);
            this.scrolltobottom_mob.directiveRef.scrollToBottom(0, 0);

        } catch (err) { }
    }

    // scrollToBottom(): void {
    //     try {
    //         this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    //     } catch (err) {}
    // }

    getLatestMessageTrails(username: string, lastTrailTIme) {
        if (lastTrailTIme == "") {
            lastTrailTIme = 1;
        }
        this.prevUname = "";
        if (username == 'compose') {
            this.activemessage(2);
        }
        this.userName = username;
        var pagetrail = false;
        var messageTrail = {};
        messageTrail['token'] = this._constantService.getSessionDataBYKey('token');
        messageTrail['token_param'] = {};
        messageTrail['token_param']['device_type'] = 'w';
        messageTrail['token_param']['host'] = '';


        if (this.isPage == 2) {
            pagetrail = true;
            username = username.substring(1, username.length);
            this.friendId = username;
            messageTrail['funame'] = "";
            messageTrail['page_uuid'] = username;
        } else if (this.isPage == null) {
            this.friendId = username;
            messageTrail['funame'] = "";
            messageTrail['page_uuid'] = "";
        } else {
            messageTrail['funame'] = username;
            messageTrail['page_uuid'] = "";
            this.friendId = username;
        }
        messageTrail['count'] = lastTrailTIme;
        this._constantService.fetchDataApi(this._constantService.get10MessageTrailServiceUrl(), messageTrail).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            var userPresent = false;
            if (status == this._constantService.success_msg) {

                var trail = responseData.LTST_TRAIL;
                this.trailen = trail;
                for (var i = 0; i < trail.length; i++) {
                    if (trail[i].IS_PAGE == null) {
                        //this.isPage = null;
                        trail[i].MESSAGE = this.postData.decodeURIPostData(trail[i].MESSAGE);
                        if (trail[i].PROFILE_PHOTO_PATH) {
                            trail[i].PROFILE_PHOTO_PATH = trail[i].PROFILE_PHOTO_PATH + "profile/" + trail[i].USER_ID + "_60x60.png";
                        } else {
                            trail[i].PROFILE_PHOTO_PATH = this._constantService.defaultImgPath;
                        }

                    } else {
                        trail[i].MESSAGE = this.postData.decodeURIPostData(trail[i].MESSAGE);
                        trail[i].USER_FULL_NAME = this.postData.decodeURIPostData(trail[i].PAGE_TITLE);
                        if (trail[i].PAGE_PROFILE_PHOTO_PATH) {
                            trail[i].PROFILE_PHOTO_PATH = trail[i].PAGE_PROFILE_PHOTO_PATH + "profile/" + trail[i].PAGE_UUID + "_60x60.png";
                        } else {
                            if (trail[i].TYPE == 0) {
                                trail[i].PROFILE_PHOTO_PATH = this._constantService.defaultPageIndImgPath;
                            } else {
                                trail[i].PROFILE_PHOTO_PATH = this._constantService.defaultPageCollgImgPath;
                            }
                        }
                    }
                }

                this.trails.push.apply(this.trails, trail);
                console.log("aaaa", this.trails);
                if (this.fromRes == 1) {
                    if (this._constantService.getSessionDataBYKey('page_title') && this.isPage == 2) {
                        this.searchData = this._constantService.getSessionDataBYKey('page_title');
                    }
                    if (this._constantService.getSessionDataBYKey('user_name') && this.isPage == 0) {
                        this.searchData = this._constantService.getSessionDataBYKey('user_name');
                    }
                    this.activemessage(3);

                    console.log(this.trails);
                    this.f_id = this._constantService.getSessionDataBYKey('friend_user_id');
                    for (var i = 0; i < this.trails.length; i++) {
                        if (this.trails[i].USER_FULL_NAME == this.searchData) {
                            this.callGetAllRecievedMsg(i, 0, "d");
                        }
                    }
                }

                for (var i = 0; i < this.trails.length; i++) {
                    if (pagetrail) {
                        if (this.trails[i].FIRST_USER == this.friendId || this.trails[i].SECOND_USER == this.friendId) {
                            userPresent = true;
                        }
                    } else {
                        if (this.trails[i].USER_NAME == this.userName || this.userName == "") {
                            userPresent = true;
                        }
                    }
                }


                if (!userPresent) {
                    this.activemessagetype = 2;

                    if (pagetrail) {
                        this.userName = this._constantService.getSessionDataBYKey('page_uuid');
                    } else {
                        this.userName = username;
                    }
                }

                if (trail.length != 0) {
                    this.lastTrailTime = trail[trail.length - 1].MESSAGE_TRAIL_ID;
                }

                if (trail.length < 9) {
                    this.continueScrollTrail = false;
                } else {
                    this.continueScrollTrail = true;
                }

                if (username == 'compose') {
                    this.activemessage(2);
                } else if ((trail.length != 0 && userPresent)) {
                    this.activemessagetype = 1;
                    if (this.webviewmsg) {
                        this.getAllRecievedMsg(0, 0, 'd');

                    } else if (this.webviewmsg == false) {
                        // this.activemessagetype = 2;
                        // this.message_people_list = true;
                        // this.message_trail = false;
                        // console.log("web view false");
                        if (username == "") {
                            this.activemessagetype = 1;
                            this.backtoMessage();
                        } else {
                            this.activemessagetype = 2;
                            // this.backtoMessage();
                        }

                    }
                }

                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
            } else if (status == 'error_token') {
                this.confPopUpObj['type'] = 4;
                this.confPopUpObj['msg'] = "Session Expire";
                this.confPopUpObj['error_msg'] = "Session Expired";
                this.sureToDelStatus = true;



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

    updateProfilePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }

    backtoMessage() {
        this.activemessagetype = 2;
        this.message_people_list = true;
        this.message_trail = false;
        this.searchData = '';
    }

    callGetAllRecievedMsg(id, lstmsgId, flow) {
        this.pageMsg = false;
        this.activemessagetype = 1;
        this.message_people_list = false;
        this.message_trail = true;

        setTimeout(() => {
            this.getAllRecievedMsg(id, lstmsgId, flow);
        }, 1000);
    }

    getAllRecievedMsg(id, lstmsgId, flow) {
        this.pageMsg = false;
        this.activemessagetype = 1;
        this.message_people_list = false;


        var recievedMsg = {};
        if (lstmsgId == 0) {
            this.stopTimer();
            this.lstMsgId = 0;
        }
        this.msg_text = '';
        this.imDisabled = true;
        this.trailIndex = id;
        recievedMsg['token'] = this._constantService.getSessionDataBYKey('token');
        recievedMsg['token_param'] = {};
        recievedMsg['token_param']['device_type'] = 'w';
        recievedMsg['token_param']['host'] = '';
        recievedMsg['msgtid'] = this.trails[id].MESSAGE_TRAIL_ID;

        recievedMsg['count'] = 10;
        recievedMsg['flow'] = flow;
        recievedMsg['lmsgid'] = lstmsgId;
        this.trail_id = this.trails[id].MESSAGE_TRAIL_ID;
        if (this.trails[id].IS_PAGE == null) {
            this.f_id = this.trails[id].USER_ID;
        } else if (this.trails[id].SECOND_USER == '2') {

        } else {
            this.f_id = this.trails[id].PAGE_UUID;
        }

        this.name = this.trails[id].USER_FULL_NAME;
        if (this.trails[id].PAGE_UUID == null && this.trails[id].PAGE_UUID == undefined) {
            this.uuid = false;
            this.userName = this.trails[id].USER_NAME;
        } else {
            this.uuid = true;
            this.userName = this.trails[id].PAGE_UUID;
        }
        if (this.trails[id].PAGE_NAME != "" && this.trails[id].PAGE_NAME != null) {
            this.trails[id].URL = this.trails[id].PAGE_NAME;
            this.rurl = this.trails[id].URL;
        } else {
            this.trails[id].URL = this.trails[id].PAGE_UUID;
            this.rurl = this.trails[id].URL;
        }
        this.profile_pic = this.trails[id].PROFILE_PHOTO_PATH;
        this._constantService.fetchDataApi(this._constantService.getAllRecievedMsgServiceUrl(), recievedMsg).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            this.message_trail = true;

            // this.message_people_list = false;
            if (status == this._constantService.success_msg) {
                document.getElementById("msg_text").focus();

                setTimeout(() => {
                    if (this.urlData.charAt(0) != "#") {
                        this.userLastActive(this.f_id);
                    }
                    this.messages = responseData.RECV_MSG;
                    if (lstmsgId == 0) {
                        if (this.container) {
                            this.container.clear();
                        }
                        this.lastReceivedMsgId = this.messages[0].USER_MESSAGE_ID;
                        this.firstReceivedMsgId = this.messages[this.messages.length - 1].USER_MESSAGE_ID;

                    } else {
                        this.firstReceivedMsgId = this.messages[this.messages.length - 1].USER_MESSAGE_ID;

                    }
                    if (this.messages.length < 10) {
                        this.continueScrollUp = false;
                    } else {
                        this.continueScrollUp = true;
                    }
                    if (this.messages.length != 0) {
                        this.isPage = this.messages[0].IS_PAGE;
                        this.lstMsgId = this.messages[this.messages.length - 1].USER_MESSAGE_ID;

                        for (var i = 0; i < this.messages.length; i++) {
                            var factory;
                            var ref;
                            this.showdelbtn = true;
                            if (this.messages[i].FIRST_USER == 2 || this.messages[i].SECOND_USER == 2) {
                                this.showdelbtn = false;
                                this.messages[i].PROFILE_PHOTO_PATH = './assets/images/svg-three/wall/help2.svg';
                            } else if (this.messages[i].IS_PAGE == 1) {
                                if (this.messages[i].TYPE == 0) {
                                    if (this.messages[i].PAGE_PROFILE_PHOTO_PATH) {
                                        this.messages[i].PROFILE_PHOTO_PATH = this.messages[i].PAGE_PROFILE_PHOTO_PATH + "profile/" + this.messages[i].FIRST_USER + "_60x60.png";
                                    } else {
                                        this.messages[i].PROFILE_PHOTO_PATH = this._constantService.defaultPageIndImgPath;
                                    }
                                } else if (this.messages[i].TYPE == 1) {
                                    if (this.messages[i].PAGE_PROFILE_PHOTO_PATH) {
                                        this.messages[i].PROFILE_PHOTO_PATH = this.messages[i].PAGE_PROFILE_PHOTO_PATH + "profile/" + this.messages[i].FIRST_USER + "_60x60.png";
                                    } else {
                                        this.messages[i].PROFILE_PHOTO_PATH = this._constantService.defaultPageCollgImgPath;
                                    }
                                }

                            } else {
                                this.messages[i].PROFILE_PHOTO_PATH = this.messages[i].PROFILE_PHOTO_PATH + "profile/" + this.messages[i].FIRST_USER + "_60x60.png";
                            }

                            if (this.messages[i].FIRST_USER == this._constantService.getSessionDataBYKey('u_id')) {
                                factory = this.componentFactoryResolver.resolveComponentFactory(MessageselfviewComponent);
                                ref = this.container.createComponent(factory, 0);
                                ref.instance.arr = this.messages[i];

                            } else {
                                factory = this.componentFactoryResolver.resolveComponentFactory(MessageotherviewComponent);
                                ref = this.container.createComponent(factory, 0);
                                ref.instance.arr = this.messages[i];
                            }

                        }
                        if (this.trails[id].STATUS == 1 && this._constantService.getSessionDataBYKey('u_id') != this.trails[id].FIRST_USER && lstmsgId == 0) {
                            this.updateMessageStatusSeen(this.trails[id].MESSAGE_TRAIL_ID);
                        }

                    }
                    if (this.messages.length == 0) {
                        this.emptyStateMsg = true;
                    }
                    //this._constantService.setToken(responseData.TOKEN);
                    this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                    if (lstmsgId == 0) {
                        this.myTimer = setInterval(() => {
                            this.getAllMsg(this.trail_id, this.lastReceivedMsgId);
                        }, 10000);
                    }
                    if (this.scrolltobottom != undefined) {
                        this.scrolltobottom.directiveRef.scrollToBottom();
                    }
                    if (this.scrolltobottom_mob != undefined) {
                        this.scrolltobottom_mob.directiveRef.scrollToBottom();
                    }
                }, 200);
            } else if (status == 'error_token') {
                this.confPopUpObj['type'] = 4;
                this.confPopUpObj['msg'] = "Session Expire";
                this.confPopUpObj['error_msg'] = "Session Expired";
                this.sureToDelStatus = true;

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
        // this.scrolltobottom.psYReachEnd.emit();


        if (lstmsgId == 0) {
            setTimeout(this.scrollToBottomFirst.bind(this), 0);
        }


    }

    userLastActive(userId) {
        var lastActive = {};
        lastActive['token'] = this._constantService.getSessionDataBYKey('token');
        lastActive['token_param'] = {};
        lastActive['token_param']['device_type'] = 'w';
        lastActive['token_param']['host'] = '';
        lastActive['user_id'] = userId;
        this._constantService.fetchDataApi(this._constantService.getUserLastActiveServiceUrl(), lastActive).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.lstAct = this.postData.getPostDateTime(responseData.LAST_ACTIVE_TIME);
            } else if (status == 'error_token') {

                this.confPopUpObj['type'] = 4;
                this.confPopUpObj['msg'] = "Session Expire";
                this.confPopUpObj['error_msg'] = "Session Expired";
                this.sureToDelStatus = true;
            } else {
                //                this.dataConf['type'] = 2;
                //                this.dataConf['msg'] = "STUDY24X7";
                //                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                //                this.openConfirmation = true;

            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    getAllMsg(tid, lmsgid) {
        var allMSg = {};
        allMSg['token'] = this._constantService.getSessionDataBYKey('token');
        allMSg['token_param'] = {};
        allMSg['token_param']['device_type'] = 'w';
        allMSg['token_param']['host'] = '';
        allMSg['msgtid'] = tid;
        allMSg['lmsgid'] = lmsgid;
        this._constantService.fetchDataApi(this._constantService.getAllMessageServiceUrl(), allMSg).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                var ltstMsg = responseData.RECV_MSG;
                if (ltstMsg.length != 0) {
                    this.lastReceivedMsgId = ltstMsg[0].USER_MESSAGE_ID;
                    this.firstReceivedMsgId = ltstMsg[ltstMsg.length - 1].USER_MESSAGE_ID;

                } else {
                    this.StopHit = false;
                }
                for (var i = ltstMsg.length - 1; i >= 0; i--) {
                    var factory;
                    var ref;
                    if (ltstMsg[i].FIRST_USER != this._constantService.getSessionDataBYKey('u_id')) {
                        ltstMsg[i].PROFILE_PHOTO_PATH = ltstMsg[i].PROFILE_PHOTO_PATH + "profile/" + ltstMsg[i].FIRST_USER + "_60x60.png";
                        factory = this.componentFactoryResolver.resolveComponentFactory(MessageotherviewComponent);
                        ref = this.container.createComponent(factory);
                        ref.instance.arr = ltstMsg[i];

                    } else {
                        ltstMsg[i].PROFILE_PHOTO_PATH = this._constantService.getSessionDataBYKey('p_pic');
                        factory = this.componentFactoryResolver.resolveComponentFactory(MessageselfviewComponent);
                        ref = this.container.createComponent(factory);
                        ref.instance.arr = ltstMsg[i];
                    }
                    //this.messages.push.apply(this.messages, ltstMsg);
                }
            } else if (status == 'error_token') {
                this.confPopUpObj['type'] = 4;
                this.confPopUpObj['msg'] = "Session Expire";
                this.confPopUpObj['error_msg'] = "Session Expired";
                this.sureToDelStatus = true;
            }

        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });

    }


    updateMessageStatusSeen(msgId) {
        var messageSeen = {};
        messageSeen['token'] = this._constantService.getSessionDataBYKey('token');
        messageSeen['token_param'] = {};
        messageSeen['token_param']['device_type'] = 'w';
        messageSeen['token_param']['host'] = '';
        messageSeen['msgtid'] = msgId;
        this._constantService.fetchDataApi(this._constantService.putMessageSeenStatusServiceUrl(), messageSeen).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
            } else if (status == 'error_token') {

                this.confPopUpObj['type'] = 4;
                this.confPopUpObj['msg'] = "Session Expire";
                this.confPopUpObj['error_msg'] = "Session Expired";
                this.sureToDelStatus = true;
            } else {
                //                this.dataConf['type'] = 2;
                //                this.dataConf['msg'] = "STUDY24X7";
                //                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                //                this.openConfirmation = true;

            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    addNewLine(event) {
        if (event.keyCode == 13) {
            this.msg_text = this.msg_text + "\n";
        }

    }

    sendMsg(f_id, trail_id) {
        console.log(f_id, "   ", trail_id);
        if (f_id == undefined) {
            if (this.uuiD) {
                f_id = this.uuiD;
            }
        }
        if (this.fromRes == 1) {
            if (f_id == '' && trail_id == 0) {
                f_id = this._constantService.getSessionDataBYKey('friend_user_id');
            }
        }
        if (this.enableSendBtn == true) {
            if (<HTMLInputElement>document.getElementById('msg_text')) {
                if ((<HTMLInputElement>document.getElementById('msg_text')).value.length == 0) {
                    return;
                }
            }

            this.loader = true;
            this.enableSendBtn = false;
            this.showText = false;
            this.msg_text = this.msg_text.replace(/</g, "&lt;");
            this.msg_text = this.msg_text.replace(/>/g, "&gt;");
            this.cpy_msg = this.msg_text;

            if (this.msg_text == "") {
                this.loader = false;
                this.showText = true;
                return false;
            }

            var sendMsg = {};
            sendMsg['token'] = this._constantService.getSessionDataBYKey('token');
            sendMsg['token_param'] = {};
            sendMsg['token_param']['device_type'] = 'w';
            sendMsg['token_param']['host'] = '';
            sendMsg['fid'] = f_id;
            sendMsg['msgtid'] = trail_id;
            //            if (this.urlData.charAt(0) == "#" || this.isPage == 1) {
            console.log("is page", this.isPage);
            if (((this.urlData.charAt(0) == "#") && (this.isPage == 1 || this.isPage == 2)) && f_id != '2') {
                if (this.isPage != undefined) {
                    console.log("in Page");
                    sendMsg['is_page'] = 2;
                }
                sendMsg['fid'] = this.uuiD;
            } else {
                sendMsg['is_page'] = "";
            }

            var msgText = this.msg_text.replace(/&lt;br&gt;/g, "");
            if (msgText.length == 0) {
                this.loader = false;
                this.showText = true;
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = "Please enter some text";
                this.openConfirmation = true;
                this.msg_text = '';
                return false;
            }

            sendMsg['msg'] = this.postData.encodeURIPostData(this.msg_text).replace(/‘|’|‘’/g, "").replace(/%0A/g, "%3Cbr%3E");

            this._constantService.fetchDataApi(this._constantService.putMsgServiceUrl(), sendMsg).subscribe(data => {
                var responseData: any = data;
                var status = responseData.STATUS;
                if (status == this._constantService.success_msg) {
                    if (this.perfectScrollBarResponsiveContactList) {
                        this.perfectScrollBarResponsiveContactList.directiveRef.scrollToTop(0, 1);
                    }
                    if (this.perfectScrollBarWebContactList) {
                        this.perfectScrollBarWebContactList.directiveRef.scrollTo(0, 0);
                    }

                    var recentMessage = this.trails[this.trailIndex];
                    this.trails.splice(this.trailIndex, 1);
                    this.trails.splice(0, 0, recentMessage);
                    this.trailIndex = 0;
                    this.changeDetector.detectChanges();

                    if (this.fromRes == 1) {
                        this._constantService.setSessionJsonPair('cmps_res_msg', '');
                        // this.searchData = this._constantService.getSessionDataBYKey('page_title');
                        //  this.activemessage(3);
                        //  this.f_id = this._constantService.getSessionDataBYKey('friend_user_id');

                        //    console.log(this.trails);
                        for (var i = 0; i < this.trails.length; i++) {
                            if (this.trails[i].USER_FULL_NAME == this.searchData) {
                                this.callGetAllRecievedMsg(i, 0, "d");

                            }
                        }
                    }
                    if (this._constantService.getSessionDataBYKey('cmps_res_msg') == 1) {
                        this._constantService.setSessionJsonPair('cmps_res_msg', '');

                        for (var i = 0; i < this.trails.length; i++) {
                            if (this.trails[i].USER_NAME == this.res_msg) {
                                this.callGetAllRecievedMsg(i, 0, "d");
                            }
                        }
                    }
                    this.isMsgQueEmpty = true;
                    if (parseInt(trail_id) == 0) {
                        this.trails = [];
                    }
                    if ((<HTMLInputElement>document.getElementById('sndBtn')) != null) {
                        var iid = (<HTMLInputElement>document.getElementById('sndBtn'));
                        var datt = iid.classList.add('desable');
                    } else {
                        iid = (<HTMLInputElement>document.getElementById('sendBtn'));
                        datt = iid.classList.add('desable');
                    }
                    this.enableSendBtn = true;
                    if (responseData.USER_MESSAGE_ID != '' && responseData.USER_MESSAGE_ID != null && responseData.USER_MESSAGE_ID != undefined) {
                        this.lastReceivedMsgId = responseData.USER_MESSAGE_ID;
                    }
                    this.loader = false;
                    this.showText = true;
                    if (trail_id != 0) {
                        var msg_data = {};
                        var date = new Date();
                        var dateLong = date.getTime();
                        msg_data['PROFILE_PHOTO_PATH'] = this._constantService.getSessionDataBYKey('p_pic');
                        msg_data['MESSAGE'] = this.postData.encodeURIPostData(this.msg_text).replace(/%0A/g, "%3Cbr%3E");
                        msg_data['USER_NAME'] = this._constantService.getSessionDataBYKey('username');
                        msg_data['UPDATE_DATE_TIME'] = dateLong;
                        //this._constantService.setMessageData(msg_data);
                        this._constantService.setSessionJsonPair('msg_data', JSON.stringify(msg_data));
                        var factory = this.componentFactoryResolver.resolveComponentFactory(MessageselfviewComponent);
                        var ref = this.container.createComponent(factory);
                        ref.instance.arr = msg_data;
                        setTimeout(() => {
                            if (this.webviewmsg == false) {
                                this.scrolltobottom_mob.directiveRef.scrollToBottom(0, 300);
                                this.scrolltobottom_mob.directiveRef.update();
                            } else {
                                this.scrolltobottom.directiveRef.scrollToBottom(0, 300);
                                this.scrolltobottom.directiveRef.update();
                            }
                        }, 500);
                        this.msg_text = "";

                        //this.scrollToBottom();
                    } else {

                        this.msg_text = "";
                        this.loader = false;
                        this.showText = true;
                        if (this.userName != null) {
                            console.log("1............");
                            this.getLatestMessageTrails(this.userName, "");
                            this.activemessagetype = 1;
                        } else if (this.userName != this.prevUname) {
                            console.log("2............");
                            this.prevUname = this.userName;
                            this.getLatestMessageTrails(this.userName, "");
                        } else {
                            console.log("3............");
                            this.getLatestMessageTrails("", "");
                            this.activemessagetype = 1;
                        }

                    }

                    this.loader = false;
                    this.showText = true;
                    // this.scrolltobottom.directiveRef.scrollToBottom(0, 300);
                    // this.scrolltobottom.directiveRef.update();
                }
                else if (status == 'error_token') {
                    this.loader = false;
                    this.showText = true;
                    this.confPopUpObj['type'] = 4;
                    this.confPopUpObj['msg'] = "Session Expire";
                    this.confPopUpObj['error_msg'] = "Session Expired";
                    this.sureToDelStatus = true;
                    this.loader = false;

                    this.showText = true;
                } else {
                    this.loader = false;
                    this.showText = true;
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
    }

    onScrollUp() {
        if (this.continueScrollUp) {
            this.getAllRecievedMsg(this.trailIndex, this.firstReceivedMsgId, 'u');
        }
    }




    filtermsgcomboshow: boolean = false;
    filtermsgcombo() {
        if (this.filtermsgcomboshow == false) {
            this.filtermsgcomboshow = true;
        }
        else {
            this.filtermsgcomboshow = false;
        }
    }
    msgNotEmpty(event) {
        this.imDisabled = !event;
    }
    msgNotEmptyTwo(event) {
        if (this.showUser) {
            this.imDisabledTwo = !event;
        }
    }

    searchUser(e) {
        this.noResult = false;
        if (e.keyCode != 8) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                var searchUser = {};
                searchUser['token'] = this._constantService.getSessionDataBYKey('token');
                searchUser['token_param'] = {};
                searchUser['token_param']['device_type'] = 'w';
                searchUser['token_param']['host'] = '';
                searchUser['sdt'] = this.searchData.trim();

                this._constantService.fetchDataApi(this._constantService.getSearchUserServiceUrl(), searchUser).subscribe(data => {
                    var responseData: any = data;
                    var status = responseData.STATUS;
                    if (status == this._constantService.success_msg) {
                        this.filtermsgcomboshow = true;

                        this.searchedUser = responseData.SEARCHED_USER;
                        if (this.searchedUser.length == 0) {
                            this.noResult = true;
                        }
                        //this._constantService.setToken(responseData.TOKEN);
                        this._constantService.setSessionJsonPair('token', responseData.TOKEN);

                        for (var i = 0; i < responseData.SEARCHED_USER.length; i++) {
                            this.searchedUser[i].PROFILE_PHOTO_PATH = responseData.SEARCHED_USER[i].PROFILE_PHOTO_PATH + "profile/" + responseData.SEARCHED_USER[i].USER_ID + "_60x60.png";
                        }

                        if (this.searchedUser.length == 0) {
                            this.noResult = true;
                        }
                    }
                }, error => {
                    var responseData = error;
                    if (responseData.status == 500) {
                        this._router.navigate(['500']);
                    }
                });
            }, 2000);
        } else {

        }
    }

    addUser(i) {
        this.showUser = true; console.log(this.searchedUser[i]);
        this.userProfilePic = this.searchedUser[i].PROFILE_PHOTO_PATH;
        this.userName = this.searchedUser[i].USER_NAME;
        console.log('userName', this.searchedUser[i].USER_NAME);
        this.displayName = this.searchedUser[i].USER_FULL_NAME;
        console.log('displayName', this.searchedUser[i].USER_FULL_NAME);
        this.res_msg = this.searchedUser[i].USER_NAME;
        this.displayTitle = this.displayName;
        this.filtermsgcomboshow = false;
        this.friendId = this.searchedUser[i].USER_ID;
        this.searchData = "";
        this.isPage = 0;
        this.trails = [];
        this.messages = [];
        this.getLatestMessageTrails(this.userName, "");
    }

    xyz() {
        this.filtermsgcomboshow = false;
    }

    sessionExpire(event) {
        if (event) {
            this.confPopUpObj['type'] = 4;
            this.confPopUpObj['msg'] = "Session Expire";
            this.confPopUpObj['error_msg'] = "Session Expired";
            this.sureToDelStatus = true;
        }
    }
    closePopup(event) {
        if (event['error'] == false) {
            this.openConfirmation = false;
        }
    }

    onScrollDown() {
        if (this.continueScrollTrail) {
            this.count++;
            if (this.StopHit != false) {
                this.activatedRoute.params.subscribe((params: Params) => {
                    if (params['username'] != null) {
                        this.getLatestMessageTrails(params['username'], this.count);
                    } else {
                        this.getLatestMessageTrails("", this.count);
                    }
                });
            }
        }
    }

    handleClick(event) {
        if (this.webviewmsg) {
            var clickedComponent = event.target;
            var headerInside = 0;
            do {
                if (this.activemessagetype == 2) {
                    if (clickedComponent === this.inbox.nativeElement) {
                        headerInside = 1;
                    }
                }
                clickedComponent = clickedComponent.parentNode;
            } while (clickedComponent);
            if (headerInside != 1) {
                this.filtermsgcomboshow = false;
            }
        }
    }
    sitchtomsg(count) {
        if (count == 1) {
            this.inboxswitch = true;
        }
        else if (count == 2) {
            this.inboxswitch = false;
        }

    }
    //    @HostListener('document:click', ['$event'])
    //    clickout(event) {
    //        if (this.showdelbtn) {
    //            if (this.delmsglist.nativeElement.contains(event.target)) {
    //                this.shoedelmsglist = true;
    //            } else {
    //                this.shoedelmsglist = false;
    //            }
    //        }
    //
    //    }
    showdelmsglist() {
        this.shoedelmsglist = !this.shoedelmsglist;
    }
    remUser() {
        this.showUser = false;
        this.userName = '';
        this.displayName = '';
        this.friendId = '';

    }

    checktab() {
        setTimeout(() => {
            this.activemessage(2);
        }, 100);
    }

    check(event) {
        var x = (<HTMLInputElement>document.getElementById('msg_text'));
        setTimeout(() => {
            if (x != undefined && x != null) {
                var postData = x.value;
                var id = (<HTMLInputElement>document.getElementById('sendBtn'));
                if (postData != undefined) {
                    postData = postData.replace(/ /g, "");
                    postData = postData.toString().trim();
                }
                if (postData.length != 0 && postData != '') {
                    var data = id.classList.remove('desable');
                    this.enableSendBtn = true;
                }
                postData = postData.trim();
            }
        }, 400);

    }

    checkPaste() {
        setTimeout(() => {
            var x = document.getElementById('msg_text');
            if (x != undefined && x != null) {
                var postData = x.innerText;
                postData = this.postData.removeUnwantedContent('msg_text');
                var id = (<HTMLInputElement>document.getElementById('sendBtn'));
                if (postData != undefined) {
                    postData = postData.replace(/ /g, "");
                    this.enableSendBtn = true;
                    postData = postData.toString().trim();
                }
                if (postData.length != 1 && postData.length != 0 && postData != '') {
                    var data = id.classList.remove('desable');

                }
                postData = postData.trim();
            }
        }, 400);
    }

    onEnter(event) {
        var data = (<HTMLInputElement>document.getElementById('msg_text')).innerHTML;
        data = data.replace(/<br><br>/g, "<br>");
        return data;
    }


    dele(event) {
        var check;
        if (check == 0) { return; }
        var x = document.getElementById('msg_text');
        if (x != undefined && x != null) {
            var postData = x.innerText;
            var id = (<HTMLInputElement>document.getElementById('sendBtn'));
            if (postData != undefined) {
                postData = this.postData.removeUnwantedContent("msg_text");
                this.enableSendBtn = true;

            }
            if (postData.length != 0 && postData.length != 1 && postData != '') {
                var data = id.classList.remove('desable');
            } else {
                if (postData.length == 1) {
                    this.enableSendBtn = true;
                }
                var data = id.classList.add('desable');
            } this.check(event);
        }
        if (postData.length == 0 || postData == undefined) {
            this.enableSendBtn = false;

        }

    }

    checkk(event) {
        var x = (<HTMLInputElement>document.getElementById('new_msg'));
        setTimeout(() => {
            if (x != undefined && x != null) {
                var postData = x.value;
                var id = (<HTMLInputElement>document.getElementById('sndBtn'));
                if (postData != undefined) {
                    postData = postData.replace(/ /g, "");
                    postData = postData.toString().trim();
                }
                if (postData.length != 0 && postData != '') {
                    var data = id.classList.remove('desable');
                    this.enableSendBtn = true;
                }
                postData = postData.trim();
            }
        }, 400);

    }

    del(event) {
        var check;
        if (check == 0) { return; }
        var x = document.getElementById('new_msg');
        if (x != undefined && x != null) {
            var postData = x.innerText;
            var id = (<HTMLInputElement>document.getElementById('sndBtn'));
            if (postData != undefined) {
                postData = this.postData.removeUnwantedContent("new_msg");
                this.enableSendBtn = true;

            }
            if (postData.length != 0 && postData.length != 1 && postData != '') {
                var data = id.classList.remove('desable');
            } else {
                if (postData.length == 1) {
                    this.enableSendBtn = true;
                }
                var data = id.classList.add('desable');
            } this.check(event);
        }
        if (postData.length == 0 || postData == undefined) {
            this.enableSendBtn = false;

        }

    }
    

    displayMobileMenu(event) {
        this.isMobileMenue = !this.isMobileMenue;
    }

    hideMobileMenu() {
        this.isMobileMenue = false;
    }

    goToHome() {
        this._router.navigate(["/home"]);
    }
    callconsole() {
        console.log("@@@@@@@@@");
    }
}
