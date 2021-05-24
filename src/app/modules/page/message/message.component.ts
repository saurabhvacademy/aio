import { Component, ViewChild, OnInit, ComponentFactoryResolver, ViewContainerRef, AfterViewChecked, ElementRef, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EncryptionService } from './../../../services/encryption.service';
import { ConstantService } from './../../../services/constant.service';
import { PostdataService } from './../../../services/postdata.service';
import { PagemessageovComponent } from './pagemessageov/pagemessageov.component';
import { PagemessagesvComponent } from './pagemessagesv/pagemessagesv.component';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss', './newmessage.component.scss']
})
export class MessageComponent implements OnInit {
    emptyStateMsg: boolean = false;
    emptyStatebrDcASTMsg: boolean = false;
    enableSendBtn = false;
    emptyStateInbox: boolean = false;
    emptyStateBroad: boolean = false;
    u_id = [];
    dataConf = {};
    openConfirmation: boolean = false;
    seemore: boolean = false;
    see: string;
    arr: any;
    msg: string;
    DataView: boolean = false;
    t: string;
    config: string;
    showText: boolean = true;
    loader: boolean = false;
    activemessagetype = 2;
    trails = [];
    broadcasts = [];
    messages = [];
    name;
    profile_pic;
    f_id;
    trail_id;
    msg_text = "";
    lstMsgId = 0;
    trailIndex;
    confPopUpObj = {};
    userName: string = "";
    imDisabled = true;
    imDisabledTwo = true;
    hidewebview: boolean = false;
    disableRightPanel = false;
    @ViewChild('scrollTo') public myScrollContainer: ElementRef;
    @ViewChild('container', { read: ViewContainerRef }) container;
    @ViewChild('inbox', { read: ElementRef }) inbox: ElementRef;
    sureToDelStatus: boolean = false;
    showUser: boolean = false;
    noResult: boolean = false;
    searchedUser = [];
    timer = null;
    userProfilePic: string = "";
    friendId = "";
    showdelbtn: boolean = true;
    searchData = ""
    lastTrailTime = "";
    continueScrollTrail: boolean = false;
    count = 1;
    lstAct;
    chatRefresh: boolean = false;
    myTimer;
    lastTrail = 0;
    lastReceivedMsgId = 0;
    inboxswitch: boolean = true;
    shoedelmsglist: boolean = false;
    pageId = "";
    pageProfilePath = "";
    pageTitle = "";
    broadcastIndex = 0;
    @ViewChild('delmsglist', { read: ElementRef }) delmsglist: ElementRef;
    delThisConversation() {
        this.dataConf['type'] = 3;
        this.dataConf['msg'] = "Delete this conversation";
        this.dataConf['error_msg'] = "Are you sure about deleting this conversation?";
        this.dataConf['msgtrailId'] = this.trails[this.trailIndex].MESSAGE_TRAIL_ID;
        this.sureToDelStatus = true;
        this.openConfirmation = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }
    closeMeCon(event) {
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
        this.sureToDelStatus = event['closePopUpStatus'];
        if (event['conversationDelStatus'] == true) {
            document.getElementById(this.trails[this.trailIndex].MESSAGE_TRAIL_ID).style.display = 'none';
            this.trails.splice(this.trailIndex, 1);
            this.activemessagetype = 2;
        }
    }
    activemessage(index) {
        this.activemessagetype = index;
        this.trailIndex = null;
        if (index == 2) {
            this.stopTimer();
            this.showUser = false;
            this.friendId = "";
            this.msg_text = "";
            if (<HTMLInputElement>document.getElementById('searchInput') != null) {
                setTimeout(() => {
                    (<HTMLInputElement>document.getElementById('searchInput')).focus();
                }, 300);
            }

        }
    }


    constructor(
        public _constantService: ConstantService,
        private _router: Router,
        private _encryptionService: EncryptionService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private activatedRoute: ActivatedRoute,
        private postData: PostdataService
    ) { }
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        // if (window.innerWidth < 2000 && window.innerWidth > 1024){
        //   var winwidth = window.innerWidth - 18;
        //   // var innerWindWidth = window.innerWidth - 18;
        //   event.target.innerWidth;
        //   document.getElementById("windiv").style.width = winwidth + "px";
        // } else {
        //     document.getElementById("windiv").style.width = "100%";
        // }
        if (window.innerWidth >= 769) {
            this.hidewebview = false;
        } else {
            this.hidewebview = true;

        }
    }
    private checkScreenWidth() {
        // var winwidth = window.innerWidth - 18;
        // if (window.innerWidth < 2000 && window.innerWidth > 1024) {
        //     document.getElementById("windiv").style.width = winwidth + "px";
        // } else {
        //     document.getElementById("windiv").style.width = "100%";
        // }
        if (window.innerWidth >= 769) {
            this.hidewebview = false;
        } else {
            this.hidewebview = true;

        }
    }

    backtoMessage() {
        if (this.inboxswitch == true) {
            this.disableRightPanel = true;
        } else if (this.inboxswitch == false) {
            this.disableRightPanel = true;

        }

    }
    BroudcastMsgMobile() {
        this.disableRightPanel = false;
    }

    ngOnInit() {
        this.checkScreenWidth();
        this.t = this._constantService.getSessionDataBYKey('token');
        if (this.t != null && this.t != undefined && this.t != '') {
            //            if (this._constantService.getCountry() == '1') {
            //                if (this._constantService.getMobileVer() == 'false' || this._constantService.getUserInterest() == '0') {
            //                    this._router.navigate(['verification']);
            //                }
            //            } else {
            //                if (this._constantService.getEmailVer() == 'false' || this._constantService.getUserInterest() == '0') {
            //                    this._router.navigate(['verification']);
            //                }
            //            }

            if ((this._constantService.getSessionDataBYKey('mobile_verify') == 'false' && this._constantService.getEmailVer() == 'false') || this._constantService.getUserInterest() == '0') {
                this._router.navigate(['verification']);
            }
            window.scrollTo(0, 0);
            this.activatedRoute.params.subscribe((params: Params) => {
                console.log(params);
                if (params['pageuuid'] != null) {
                    this.showUser = true;
                    this.pageId = params['pageuuid'];
                    this.friendId = this._constantService.getSessionDataBYKey('friend_user_id');
                    this.trails = [];
                    this.messages = [];
                    if (this.pageId != "") {
                        this.getLatestBroadcastTrails(1);
                    }

                } else {
                    this.activemessage(2);
                    this.getLatestBroadcastTrails(1);
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
    }

    ngOnDestroy() {
        this.stopTimer();
    }

    stopTimer() {
        clearInterval(this.myTimer);
    }
    scrollToBottomFirst(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight - 10;
        } catch (err) { }
    }

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch (err) { }
    }

    getLatestMessageTrails(lastTrailTIme) {
        if (lastTrailTIme == "") {
            lastTrailTIme = 1;
        }
        var messageTrail = {};
        messageTrail['token'] = this._constantService.getSessionDataBYKey('token');
        messageTrail['token_param'] = {};
        messageTrail['token_param']['device_type'] = 'w';
        messageTrail['token_param']['host'] = '';
        messageTrail['count'] = lastTrailTIme;
        messageTrail['pg_uuid'] = this.pageId;
        this._constantService.fetchDataApi(this._constantService.get10MessageTrailOnPageServiceUrl(), messageTrail).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            var userPresent = false;
            if (status == this._constantService.success_msg) {
                var trail = responseData.LTST_TRAIL;
                if (trail.length == 0 && lastTrailTIme == 1) {

                    this.emptyStateInbox = true;

                } else {
                    this.emptyStateInbox = false;
                }
                for (var i = 0; i < trail.length; i++) {
                    trail[i].MESSAGE = this.postData.decodeURIPostData(trail[i].MESSAGE);
                    trail[i].PROFILE_PHOTO_PATH = trail[i].PROFILE_PHOTO_PATH + "profile/" + trail[i].USER_ID + "_60x60.png";
                }
                this.trails.push.apply(this.trails, trail);
                if (trail.length != 0) {
                    this.lastTrailTime = trail[trail.length - 1].MESSAGE_TRAIL_ID;
                }
                if (trail.length < 9) {
                    this.continueScrollTrail = false;
                } else {
                    this.continueScrollTrail = true;
                }
                if (trail.length != 0) {
                    this.activemessagetype = 1;
                    if (this.hidewebview == false) {
                        this.getAllRecievedMsg(0, 0, 'd');
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

    getLatestBroadcastTrails(lastTrailTIme) {
        if (lastTrailTIme == 1) {
            lastTrailTIme = 1;
            this.broadcasts = [];
            this.disableRightPanel = true;

        } else {
            this.disableRightPanel = false;
        }
        this.emptyStateInbox = false;
        var messageTrail = {};
        messageTrail['token'] = this._constantService.getSessionDataBYKey('token');
        messageTrail['token_param'] = {};
        messageTrail['token_param']['device_type'] = 'w';
        messageTrail['token_param']['host'] = '';
        messageTrail['count'] = lastTrailTIme;
        messageTrail['pg_uuid'] = this.pageId;
        this._constantService.fetchDataApi(this._constantService.get10BroadcastTrailServiceUrl(), messageTrail).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                var trail = responseData.BROADCAST_MSG_LIST;
                if (trail.length == 0 && lastTrailTIme == 1) {
                    this.emptyStateBroad = true;
                } else {
                    this.emptyStateBroad = false;
                }
                for (var i = 0; i < trail.length; i++) {
                    trail[i].TEXT = this.postData.decodeURIPostData(trail[i].TEXT);
                    if (responseData.TITLE != undefined && responseData.TITLE != null) {
                        trail[i].PAGE_TITLE = this.postData.decodeURIPostData(responseData.TITLE);
                    } else {
                        trail[i].PAGE_TITLE = '';
                    }
                    trail[i].PROFILE_PHOTO_PATH = trail[i].PROFILE_PHOTO_PATH + "profile/" + trail[i].USER_OLD_ID + "_60x60.png";
                }

                this.broadcasts.push.apply(this.broadcasts, trail);
                if (trail.length != 0) {
                    this.lastTrailTime = trail[trail.length - 1].MESSAGE_TRAIL_ID;
                }
                if (trail.length < 9) {
                    this.continueScrollTrail = false;
                } else {
                    this.continueScrollTrail = true;
                }
                if (trail.length != 0) {
                    this.activemessagetype = 1;
                    if (this.hidewebview == false) {
                        this.getBroadcastedMsg(0);
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

    getBroadcastedMsg(id) {
        var view = {};
        view["PROFILE_PHOTO_PATH"] = this.broadcasts[id].PROFILE_PHOTO_PATH;
        view['USER_FULL_NAME'] = this.pageTitle;
        view['UPDATE_DATE_TIME'] = this.broadcasts[id].ADD_DATE_TIME;
        view['USER_NAME'] = this.broadcasts[id].USER_NAME;
        view['MESSAGE'] = this.broadcasts[id].TEXT;
        var factory;
        var ref;
        this.broadcastIndex = id;
        this.disableRightPanel = false;
        setTimeout(() => {
            this.container.clear();
            factory = this.componentFactoryResolver.resolveComponentFactory(PagemessagesvComponent);
            ref = this.container.createComponent(factory, 0);
            ref.instance.arr.view = view;
        }, 200);
    }

    updateProfilePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }

    getAllRecievedMsg(id, lstmsgId, flow) {
        this.activemessagetype = 1;
        var recievedMsg = {};
        if (lstmsgId == 0) {
            this.stopTimer();
            this.lstMsgId = 0;
        }
        this.trailIndex = id;
        recievedMsg['token'] = this._constantService.getSessionDataBYKey('token');
        recievedMsg['token_param'] = {};
        recievedMsg['token_param']['device_type'] = 'w';
        recievedMsg['token_param']['host'] = '';
        recievedMsg['count'] = 10;
        recievedMsg['flow'] = flow;
        recievedMsg['lmsgid'] = lstmsgId;
        recievedMsg['pg_uuid'] = this.pageId;

        if (!this.inboxswitch) {
            this.trail_id = this.trails[id].MESSAGE_TRAIL_ID;
            this.f_id = this.trails[id].USER_ID;
            this.name = this.trails[id].USER_FULL_NAME;
            this.userName = this.trails[id].USER_NAME;
            this.profile_pic = this.trails[id].PROFILE_PHOTO_PATH;
            recievedMsg['msgtid'] = this.trails[id].MESSAGE_TRAIL_ID;
        }

        this._constantService.fetchDataApi(this._constantService.getAllRecievePagemsgServiceUrl(), recievedMsg).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this.userLastActive(this.f_id);
                this.disableRightPanel = false;
                setTimeout(() => {
                    this.messages = responseData.RECV_MSG;


                    if (lstmsgId == 0) {
                        if (this.container) {
                            this.container.clear();
                        }
                        if (this.messages[0] != undefined) {
                            this.lastReceivedMsgId = this.messages[0].USER_MESSAGE_ID;
                        }
                    }
                    if (this.messages.length != 0) {
                        this.lstMsgId = this.messages[0].USER_MESSAGE_ID;
                        for (var i = 0; i < this.messages.length; i++) {
                            var factory;
                            var ref;
                            //this.showdelbtn = true;
                            if (this.messages[i].USER_ID == 1 || this.messages[i].USER_ID == 2) {
                                this.showdelbtn = false;
                            }

                            if (this.messages[i].IS_PAGE == 1) {
                                this.messages[i].PROFILE_PHOTO_PATH = this.messages[i].PAGE_PROFILE_PHOTO_PATH + "profile/" + this.messages[i].USER_ID + "_60x60.png";
                            } else {
                                this.messages[i].PROFILE_PHOTO_PATH = this.messages[i].PROFILE_PHOTO_PATH + "profile/" + this.messages[i].USER_ID + "_60x60.png";
                            }
                            if (this.messages[i].FIRST_USER == this.pageId || this.messages[i].PAGE_NAME == this.pageId) {
                                factory = this.componentFactoryResolver.resolveComponentFactory(PagemessagesvComponent);
                                ref = this.container.createComponent(factory, 0);
                                var view = {};
                                view["PROFILE_PHOTO_PATH"] = this.broadcasts[id].PROFILE_PHOTO_PATH;
                                view['USER_FULL_NAME'] = this.pageTitle;
                                view['UPDATE_DATE_TIME'] = this.broadcasts[id].ADD_DATE_TIME;
                                view['USER_NAME'] = this.broadcasts[id].USER_NAME;
                                view['MESSAGE'] = this.broadcasts[id].TEXT;
                                ref.instance.arr = this.messages[i];
                                ref.instance.arr.view=view;
                            } else {
                                factory = this.componentFactoryResolver.resolveComponentFactory(PagemessageovComponent);
                                ref = this.container.createComponent(factory, 0);
                                ref.instance.arr = this.messages[i];
                            }

                        }
                    }
                }, 200);

                // this.messages = responseData.RECV_MSG;
                // this.disableRightPanel = true;
                //
                // if (lstmsgId == 0) {
                //     if (this.container) {
                //         this.container.clear();
                //     }
                //     if (this.messages[0] != undefined) {
                //         this.lastReceivedMsgId = this.messages[0].USER_MESSAGE_ID;
                //     }
                // }
                // if (this.messages.length != 0) {
                //     this.lstMsgId = this.messages[0].USER_MESSAGE_ID;
                //     for (var i = 0; i < this.messages.length; i++) {
                //         var factory;
                //         var ref;
                //         //this.showdelbtn = true;
                //         if (this.messages[i].USER_ID == 1 || this.messages[i].USER_ID == 2) {
                //             this.showdelbtn = false;
                //         }
                //
                //         if (this.messages[i].IS_PAGE == 1) {
                //             this.messages[i].PROFILE_PHOTO_PATH = this.messages[i].PAGE_PROFILE_PHOTO_PATH + "profile/" + this.messages[i].USER_ID + "_60x60.png";
                //         } else {
                //             this.messages[i].PROFILE_PHOTO_PATH = this.messages[i].PROFILE_PHOTO_PATH + "profile/" + this.messages[i].USER_ID + "_60x60.png";
                //         }
                //         if (this.messages[i].FIRST_USER == this.pageId || this.messages[i].PAGE_NAME == this.pageId) {
                //             factory = this.componentFactoryResolver.resolveComponentFactory(PagemessagesvComponent);
                //             ref = this.container.createComponent(factory, 0);
                //             ref.instance.arr = this.messages[i];
                //         } else {
                //             factory = this.componentFactoryResolver.resolveComponentFactory(PagemessageovComponent);
                //             ref = this.container.createComponent(factory, 0);
                //             ref.instance.arr = this.messages[i];
                //         }
                //
                //     }
                //                    if (this.trails[id].STATUS == 0 && this._constantService.getUserId() != this.trails[id].FIRST_USER && lstmsgId == 0) {
                //                        this.updateMessageStatusSeen(this.trails[id].MESSAGE_TRAIL_ID);
                //                    }
                // }else{
                //
                // }
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                if (lstmsgId == 0) {
                    this.myTimer = setInterval(() => {
                        this.getAllMsg(this.trail_id, this.lastReceivedMsgId);
                    }, 10000);
                }
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
        if (lstmsgId == 0) {
            setTimeout(this.scrollToBottomFirst.bind(this), 500);
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
            var responseData:any = data;
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
        allMSg['page_uuid'] = this.pageId;

        this._constantService.fetchDataApi(this._constantService.getAllMessageServiceUrl(), allMSg).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                var ltstMsg = responseData.RECV_MSG;
                if (ltstMsg.length != 0) {
                    this.lastReceivedMsgId = ltstMsg[0].USER_MESSAGE_ID;
                }
                for (var i = ltstMsg.length - 1; i >= 0; i--) {
                    var factory;
                    var ref;
                    if (ltstMsg[i].FIRST_USER != this._constantService.getSessionDataBYKey('u_id')) {
                        ltstMsg[i].PROFILE_PHOTO_PATH = ltstMsg[i].PROFILE_PHOTO_PATH + "profile/" + ltstMsg[i].FIRST_USER + "_60x60.png";
                        factory = this.componentFactoryResolver.resolveComponentFactory(PagemessageovComponent);
                        ref = this.container.createComponent(factory);
                        ref.instance.arr = ltstMsg[i];
                    } else {
                        ltstMsg[i].PROFILE_PHOTO_PATH = ltstMsg[i].PROFILE_PHOTO_PATH + "profile/" + ltstMsg[i].FIRST_USER + "_60x60.png";
                        factory = this.componentFactoryResolver.resolveComponentFactory(PagemessagesvComponent);
                        ref = this.container.createComponent(factory);
                        ref.instance.arr = ltstMsg[i];
                    }
                    // this.messages.push.apply(this.messages, ltstMsg);
                }
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


    updateMessageStatusSeen(msgId) {
        var messageSeen = {};
        messageSeen['token'] = this._constantService.getSessionDataBYKey('token');
        messageSeen['token_param'] = {};
        messageSeen['token_param']['device_type'] = 'w';
        messageSeen['token_param']['host'] = '';
        messageSeen['msgtid'] = msgId;
        messageSeen['pg_uuid'] = this.pageId;

        this._constantService.fetchDataApi(this._constantService.putMessageSeenStatusPageServiceUrl(), messageSeen).subscribe(data => {
            var responseData:any = data;
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

    sendMsgFunc(f_id, trail_id) {
        if (this.inboxswitch) {

            this.broadcastMsg();
        } else {
            this.sendMsg(f_id, trail_id);
        }
    }

    broadcastMsg() {
        if (this.enableSendBtn == true) {
            var sendMsg = {};
            sendMsg['token'] = this._constantService.getSessionDataBYKey('token');
            sendMsg['token_param'] = {};
            sendMsg['token_param']['device_type'] = 'w';
            sendMsg['token_param']['host'] = '';
            sendMsg['page_uuid'] = this.pageId;
            var msgText = this.msg_text.replace(/\<br\>/g, "");
            this.msg_text = this.msg_text.replace(/</g, "&lt;");
            this.msg_text = this.msg_text.replace(/>/g, "&gt;");
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
            sendMsg['msg'] = this.postData.encodeURIPostData(this.msg_text).replace(/‘|’|‘’/g, "");

            this._constantService.fetchDataApi(this._constantService.putBroadcastServiceUrl(), sendMsg).subscribe(data => {
                var responseData:any = data;
                var status = responseData.STATUS;
                if (status == this._constantService.success_msg) {
                    var id = (<HTMLInputElement>document.getElementById('sndBtn'));
                    if (id) {
                        var dat = id.classList.add('desable');
                    }
                    this.enableSendBtn = false;
                    this.loader = false;
                    this.showText = true;

                    this.getLatestBroadcastTrails(1);

                    this.msg_text = "";
                    this.loader = false;
                    this.showText = true;
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

    sendMsg(f_id, trail_id) {
        if (this.enableSendBtn == true) {
            this.loader = true;
            this.showText = false;
            if (this.msg_text == "") {
                this.loader = false;
                this.showText = true;
                return false;
            }
            this.msg_text = this.msg_text.replace(/</g, "&lt;");
            this.msg_text = this.msg_text.replace(/>/g, "&gt;");
            if (trail_id == 0) {
                this.trails = [];
            }
            //        this.msg_text = (<HTMLInputElement>document.getElementById("msg_text")).value;
            //        this.msg_text = this.msg_text.replace(/\n/g, "<br>").replace(/‘|’|‘’/g, "");
            var sendMsg = {};
            sendMsg['token'] = this._constantService.getSessionDataBYKey('token');
            sendMsg['token_param'] = {};
            sendMsg['token_param']['device_type'] = 'w';
            sendMsg['token_param']['host'] = '';
            sendMsg['fid'] = f_id;
            sendMsg['msgtid'] = trail_id;
            sendMsg['pg_uuid'] = this.pageId;
            var msgText = this.msg_text.replace(/\<br\>/g, "");
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
            sendMsg['msg'] = this.postData.encodeURIPostData(this.msg_text).replace(/‘|’|‘’/g, "").replace(/%0/g, "%3Cbr%3E");


            this._constantService.fetchDataApi(this._constantService.putMsgPageServiceUrl(), sendMsg).subscribe(data => {
                var responseData:any = data;
                var status = responseData.STATUS;
                if (status == this._constantService.success_msg) {
                    if ((<HTMLInputElement>document.getElementById('sendBtn')) != null) {
                        var id = (<HTMLInputElement>document.getElementById('sendBtn'));
                    } else {
                        id = (<HTMLInputElement>document.getElementById('sndBtn'));
                    }
                    var dat = id.classList.add('desable');
                    this.enableSendBtn = false;
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
                        msg_data['MESSAGE'] = this.postData.encodeURIPostData(this.msg_text).replace(/%0/g, "%3Cbr%3E");
                        msg_data['USER_NAME'] = this._constantService.getSessionDataBYKey('username');
                        msg_data['UPDATE_DATE_TIME'] = dateLong;
                        //this._constantService.setMessageData(msg_data);
                        this._constantService.setSessionJsonPair('msg_data', JSON.stringify(msg_data));
                        var factory = this.componentFactoryResolver.resolveComponentFactory(PagemessagesvComponent);
                        var ref = this.container.createComponent(factory);
                        ref.instance.arr = msg_data;
                        this.scrollToBottom();
                    }
                    else {
                        this.loader = false;
                        this.showText = true;
                        this.activatedRoute.params.subscribe((params: Params) => {
                            if (params['pageuuid'] != null) {
                                if (this.hidewebview == false) {
                                    this.getLatestMessageTrails("");
                                }

                                this.activemessagetype = 1;
                            }
                        });
                    }
                    this.msg_text = "";
                    this.loader = false;
                    this.showText = true;
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
        this.getAllRecievedMsg(this.trailIndex, this.lastReceivedMsgId, 'd');
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

    addUser(i) {
        this.showUser = true;
        this.userProfilePic = this.searchedUser[i].PROFILE_PHOTO_PATH;
        this.userName = this.searchedUser[i].USER_NAME;
        this.filtermsgcomboshow = false;
        this.friendId = this.searchedUser[i].USER_ID;
        this.searchData = "";
        this.trails = [];
        this.messages = [];
        this.getLatestMessageTrails("");
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
        this.openConfirmation = false;

    }
    onScrollDown() {
        if (this.continueScrollTrail) {
            this.count++;

            this.getLatestMessageTrails(this.count);
        }
    }

    handleClick(event) {
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
    sitchtomsg(count) {
        this.activemessagetype = 2;
        if (count == 1) {
            this.inboxswitch = true;
            // this.Broadcastshow = true;
            this.stopTimer();
            this.broadcasts = [];
            this.getLatestBroadcastTrails(1);
        }
        else if (count == 2) {
            this.inboxswitch = false;
            // this.Broadcastshow = false;

            this.trails = [];

            this.getLatestMessageTrails(1);

        }
    }
    @HostListener('document:click', ['$event'])
    clickout(event) {
        if (this.showdelbtn && this.delmsglist != undefined) {
            if (this.delmsglist.nativeElement.contains(event.target)) {
                this.shoedelmsglist = true;
            }
            else {

                this.shoedelmsglist = false;
            }
        }
    }
    showdelmsglist() {
        this.shoedelmsglist = !this.shoedelmsglist;
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


}
