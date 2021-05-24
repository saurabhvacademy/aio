import { Component, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { ConstantService } from '../../services/constant.service';
import { PostdataService } from '../../services/postdata.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PerfectScrollbarComponent, PerfectScrollbarDirective, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { resolve } from 'q';
import { promise } from 'protractor';

declare function startStream(): any;
declare function startPublishing(): any;
declare function stopPublishing(): any;
declare function getDataForStream(data: any): any;
declare function checkBrowserCompatiblity(): any;
declare function enableDesktopCapture(data: boolean): any;
declare function getStreamUpdates(): any;
declare function hasmicrophone(): any;
declare function getChromeExtensionStatus(extensionId: any): any;

@Component({
    selector: 'app-live-stream-admin',
    templateUrl: './live-stream-admin.component.html',
    styleUrls: ['../live-stream/live-stream.component.scss', './live-stream-admin.component.scss']
})
export class LiveStreamAdminComponent implements OnInit {
    mentorUUID: any;
    delSocialTyp: any;
    streamStatusTimer: NodeJS.Timer;
    coutndownTimer: NodeJS.Timer;
    youtubeCheckbox: boolean = false;
    fbCheckbox: boolean = false;
    youtubeDataId: any = '';
    fbDataId: any = '';
    platformDataId: any;
    platformTyp: any;
    checkSocialAuthInterval: any;
    activationUrl: string;
    usrCode: string;
    isObsStream: boolean = false;
    isSocialParams: boolean = false;
    isFbChnl: boolean = false;
    isYoutubeChnl: boolean = false;
    openConfirmation: boolean = false;
    dataConf: any = {};
    obsTokenId: any;
    obsToken: any = '';
    expireTime: any = 0;
    socketCheckTimer: any;
    startTime: any;
    durationStr: string;
    duration: number;
    countDisplay: string;
    timeLapseBar: number;
    secondLeft: string = "00";
    minuteLeft: string = "00";
    hoursLeft: string = "00";
    streamStartTime: any;
    timeRemaining: any;
    // visibilityTyp: number;
    question_timer: boolean = false;
    msgtab = 1;
    visibilityText = "New Content";
    walldropdown: boolean = false;
    visibilityTyp = 3;
    selectedLiveStreamdropdown = -1;
    showNotification: number = 0;
    streamURL = "abcdefghijklmnopqrstuvwxyz";
    Socket;
    message = { 'name': '', 'imgPath': '', 'message': '', 'time': '', 'type': '0' };
    chatList = [];
    adminNotification = [];
    userNotiification = [];
    count = { 'userCount': 0, 'userNotificationCount': 0, 'adminNotificationCount': 0, 'enrolledUserCount': 0 };
    isMentor: boolean = true;
    userList = [];
    content_title = "";
    streamButton: string = "Start Stream";
    userData: any = {};
    StreamingStart: boolean = false;
    courseImage: string = "";
    switchCameraAndScreen: boolean = false;
    toggleChatSection: boolean = false;
    obspopup: boolean = true;
    @ViewChild('scrolltobottom') scrolltobottom: PerfectScrollbarComponent;
    @ViewChild(PerfectScrollbarDirective) directiveRef?: PerfectScrollbarDirective;
    webcamAvailable: number = 0;
    microphoneAvailable: number = 0;
    screenExtensionAvailable: number = 0;
    webcamError: string = "";
    microphoneError: string = "";
    ExtensionError: string = "";
    streamProgress: number = 0;
    broadcastStatus: boolean = false;
    testPanel: boolean = false;
    testFinished: number = 0;
    aliasStream_id = "";
    courseTitle: any;
    timeLeft: string;
    timeLeftMilliseconds: number;
    timerLeftInterval: any;
    updateInterval: any;
    browser: string = '';
    isMobileView: boolean;
    loader: boolean;
    constructor(private _constantService: ConstantService,
        private _websocket: WebsocketService,
        public postdata: PostdataService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,

    ) {
        window.onbeforeunload = () => {
            this.ngOnDestroy1();
        };

    }


    ngOnInit() {


        // var scriptAdapterLatest = document.createElement("script");
        // var scriptWebrtcAdapter = document.createElement("script");
        // var scriptScreenCapturing = document.createElement("script");
        // var scriptRecordRtc = document.createElement("script");
        // var scriptVideoConfig = document.createElement("script");

        // scriptAdapterLatest.src = "https://js.study24x7.com/assets/js/stream/adapter-latest.js";
        // scriptWebrtcAdapter.src="https://js.study24x7.com/assets/js/stream/webrtc_adaptor.js";
        // scriptScreenCapturing.src="https://js.study24x7.com/assets/js/stream/Screen-Capturing.js";
        // scriptRecordRtc.src="https://js.study24x7.com/assets/js/stream/recordrtc.js";
        // scriptVideoConfig.src="https://js.study24x7.com/assets/js/stream/videoconfig.js";
        // document.getElementsByTagName("body")[0].appendChild(scriptAdapterLatest);
        // document.getElementsByTagName("body")[0].appendChild(scriptWebrtcAdapter);
        // document.getElementsByTagName("body")[0].appendChild(scriptScreenCapturing);
        // document.getElementsByTagName("body")[0].appendChild(scriptRecordRtc);
        // document.getElementsByTagName("body")[0].appendChild(scriptVideoConfig);





        if (window.innerWidth < 480)
            this.isMobileView = true;
        this._activatedRoute.params.subscribe((params: Params) => {
            if (params["id"] != null) {
                var id = params['id'];
                this.streamURL = id;
            }
        });

        this.chkUserToken();
        this.socketCheckTimer = setInterval(() => {
            this._websocket.socketStatusCheck().subscribe((data) => {
                console.log(`Socket status is ${data}`);
                //                var count = 0;
                //                if (data === false && count < 3) {
                //                    this._websocket.connectSocket();
                //                    setTimeout(() => {
                //                        this.ConnectWithSocket();
                //                    }, 500);
                //                    count++;
                //                }
            });
        }, 5000);
        // this.checkCamerMicAndExtension();
        this.browser = this._constantService.getBrowserName();

    }

    ngOnDestroy() {
        clearInterval(this.streamStatusTimer);
        clearInterval(this.coutndownTimer);
        clearInterval(this.updateInterval)
    }

    toggleChatClick() {
        if (this.toggleChatSection == false) {
            this.toggleChatSection = true;
            setTimeout(() => {
                this.scrolltobottom.directiveRef.scrollToBottom(0, 0);
            }, 200);
        } else {
            this.toggleChatSection = false;
        }
    }

    exitStream() {
        this._websocket.socketControllerSet('stopStream', this.userData);
     window.open('home', "_self");

    }
    
    refreshStream() {
        this._websocket.socketControllerSet('startStream', this.userData);
    }

    skipDeviceTest() {
        this.testPanel = false;
    }

    checkWebCam() {
        // var microphone = hasmicrophone();
        var n = <any>navigator;
        n.getUserMedia = (n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia);
        if (n.getUserMedia) {
            console.log(n.mediaDevices.enumerateDevices());

            n.getUserMedia({ audio: true, video: true }, stream => {
                var x = document.createElement("VIDEO");
                x.id = "testvideo";
                console.log(x);
                console.log(stream.getVideoTracks());
                // console.log(document.getElementById("testvideo").querySelector('video'));
                // document.getElementById("testvideo").querySelector('video')
                // x.querySelector('video').srcObject = stream;
                var mediaStreamTrack = stream.getVideoTracks()[0];
                if (typeof mediaStreamTrack != "undefined") {
                    mediaStreamTrack.onended = function () {//for Chrome.
                        console.log('Your webcam is busy!');
                        this.webcamError = "Your webcam is busy!";
                        this.webcamAvailable = 2;
                    }
                    console.log("Your webcam is available!");
                    this.webcamError = "Your webcam is available!";
                    this.webcamAvailable = 1;


                } else {
                    console.log("webcam device not available");
                    this.webcamError = "webcam device not available";
                    this.webcamAvailable = 2;
                }
            }, error => {

            });
            this.webcamAvailable = 2;
            console.log("webcam device not available");
            this.webcamError = "webcam device not available";
        } else {
            console.log("webcam device not available");
            this.webcamError = "webcam device not available";
            this.webcamAvailable = 2;
        }

    }

    checkMicrophone() {

        var n = <any>navigator;
        n.getUserMedia = (n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia);
        if (n.getUserMedia) {
            n.getUserMedia({ audio: true, video: true }, (stream) => {
                // document.querySelector('video').srcObject = stream;
                var mediaAudioTrack = stream.getAudioTracks()[0];
                if (typeof mediaAudioTrack != "undefined" && mediaAudioTrack.enabled == true) {
                    console.log("audio device available");
                    this.microphoneAvailable = 1;
                    this.microphoneError = "Audio device available";
                    return;
                } else {
                    console.log('Permission denied!');
                    this.microphoneError = 'Audio permission denied!';
                    this.microphoneAvailable = 2;
                    return;
                }
            }, error => {

            });
            console.log("audio device available");
            this.microphoneError = "Audio device available";
            this.microphoneAvailable = 1;
        } else {
            console.log("audio device not available");
            this.microphoneError = "Audio device not available";
            this.microphoneAvailable = 2;
        }
    }

    async checkScreenShareExtension() {

        var extensionId = this._constantService.screenShareExtentionId;
        var AntmediaExtensionFun = <any>await getChromeExtensionStatus(extensionId);

        var AntmediaExtensionFun2 = <any>await getChromeExtensionStatus("jaefaokkgpkkjijgddghhcncipkebpnb");
        var studyExtensionFun = <any>await getChromeExtensionStatus("hgkmgbhcbkokmflkjmacejcelddjmbif");
        var studyExtensionFun2 = <any>await getChromeExtensionStatus("hphfgcfdakcjhhpnhgkmbpkngiapljll");
        if (AntmediaExtensionFun.status == 1 || AntmediaExtensionFun2.status == 1 || studyExtensionFun.status == 1 || studyExtensionFun2.status == 1)
            this.screenExtensionAvailable = 1;
        // this.ExtensionError = fun.message;
    }

    checkCamerMicAndExtension() {
        this.webcamAvailable = 0;
        this.microphoneAvailable = 0;
        this.screenExtensionAvailable = 0;
            this.checkWebCam();
            this.checkMicrophone();
            this.checkScreenShareExtension();
        // setTimeout(() => {

        //     this.checkMicrophone();
        // }, 2000);
        // setTimeout(() => {

        //     this.checkScreenShareExtension();
        // }, 4000);
    }

    finishedTest() {

    }



    async startMentorStream() {
        if (this.microphoneAvailable == 1 && this.webcamAvailable == 1) {
            let params = "scrollbars=no,resizable=no,status=no,toolbar=no,menubar=no,width=1280,height=720,left=0,top=0";
            open(window.location.pathname + '/shared-window', 'stream-window', params);

        } else {
            if (this.microphoneAvailable != 1) {
                this._constantService.showToast("Microphone not available", "", "2");
            }
            if (this.webcamAvailable != 1) {
                this._constantService.showToast("webcam not available", "", "2");
            }
            this.checkCamerMicAndExtension();
        }



    }

    craeteObsStreamTokenFxn() {
        return new Promise(resolve => {
            if (this.broadcastStatus) {
                var getToken = {};
                getToken['token'] = this._constantService.getSessionDataBYKey('token');
                getToken['token_param'] = {};
                getToken['token_param']['device_type'] = 'w';
                getToken['token_param']['host'] = '';
                getToken['cntnt_uuid'] = this.aliasStream_id;
                getToken['type'] = 1;
                getToken['ed'] = this.expireTime;
                this._constantService.fetchDataApi(this._constantService.getLiveStreamCheckTokenStatusUrl(), getToken).subscribe(data => {
                    var responseData: any = data;
                    var status = responseData.STATUS;
                    if (status == this._constantService.success_msg) {
                        if (this.broadcastStatus) {
                            this.createStreamIdFxn();
                        }
                        var streamingToken = JSON.parse(responseData.STREAM_TOKEN);
                        if (streamingToken && streamingToken.tokenId) {
                            this.obsToken = `${this.aliasStream_id}?token=${streamingToken.tokenId}`;
                            this.obsTokenId = streamingToken.tokenId;
                            let streamToken = {
                                'token': this.obsTokenId,
                                'streamID': this.aliasStream_id,
                                'streamName': this.content_title,
                                'streamURL': this._constantService.antmediaURL
                            }
                            getDataForStream(streamToken);

                            this.streamStatusTimer = setInterval(() => {
                                this.chkObsStreamStatusFxn();
                            }, 10000);

                            resolve({ 'status': true });
                        } else {
                            //alert('Unable to generate OBS Token.');
                            resolve({ 'status': false });
                        }
                    }
                });

                // this.http.request(`https://media.study24x7.net:5443/WebRTCAppEE/rest/broadcast/getToken?id=${this.streamURL}&expireDate=${this.expireTime}&type=publish`).subscribe((data) => {
                // //this.http.request(`https://test.hellouser.co.in:5443/WebRTCAppEE/rest/broadcast/getToken?id=${this.streamURL}&expireDate=${this.expireTime}&type=publish`).subscribe((data) => {
                //     let responseData:any = data;
                //     if (responseData && responseData.tokenId) {
                //         this.obsToken = `${this.streamURL}?token=${responseData.tokenId}`;
                //         this.obsTokenId = responseData.tokenId;
                //         let streamToken = {
                //             'token':this.obsTokenId,
                //             'streamID': this.streamURL,
                //             'streamName': 'study24x7'
                //         }
                //         getDataForStream(streamToken);
                //         console.log("token geerated");
                //         resolve({'status':true});
                //     } else {
                //         alert('Unable to generate OBS Token.');
                //         resolve({'status':false});
                //     }
                // });
                // }else{
                //     alert("Another instance of stream already broadcasting");
                //     resolve({'status':false});

                // }
            } else {
                alert("Another instance of stream already broadcasting");
                resolve({ 'status': false });
            }
        });

    }

    createStreamIdFxn() {
        return new Promise(resolve => {
            var createStream = {};
            createStream['token'] = this._constantService.getSessionDataBYKey('token');
            createStream['token_param'] = {};
            createStream['token_param']['device_type'] = 'w';
            createStream['token_param']['host'] = '';
            createStream['cntnt_uuid'] = this.aliasStream_id;
            createStream['stream_name'] = this.content_title;
            createStream['data_fid'] = '';
            createStream['data_yid'] = '';

            if (this.fbCheckbox && this.fbDataId != '') {
                createStream['data_fid'] = this.fbDataId;
            }
            if (this.youtubeCheckbox && this.youtubeDataId != '') {
                createStream['data_yid'] = this.youtubeDataId;
            }
            this._constantService.fetchDataApi(this._constantService.getCreateLiveStreamWithIdRestUrl(), createStream).subscribe(data => {
                var responseData: any = data;
                var status = responseData.STATUS;
                if (status == this._constantService.success_msg) {
                    console.log("str");

                }
            });

        });

    }

    chkObsStreamStatusFxn() {
        return new Promise(resolve => {
            var getStreamStatus = {};
            getStreamStatus['token'] = this._constantService.getSessionDataBYKey('token');
            getStreamStatus['token_param'] = {};
            getStreamStatus['token_param']['device_type'] = 'w';
            getStreamStatus['token_param']['host'] = '';
            getStreamStatus['cntnt_uuid'] = this.aliasStream_id;
            getStreamStatus['type'] = 0;
            getStreamStatus['ed'] = "";

            this._constantService.fetchDataApi(this._constantService.getLiveStreamCheckTokenStatusUrl(), getStreamStatus).subscribe(data => {
                var responseData: any = data;
                var status = responseData.STATUS;
                if (status == this._constantService.success_msg) {
                    var streamStatus = JSON.parse(responseData.STREAM_STATUS);
                    let currentStatus = streamStatus.status == "broadcasting" ? false : true;
                    if (currentStatus != this.broadcastStatus) {
                        if (this.broadcastStatus) {
                            this._websocket.socketControllerSet('startStream', this.userData);
                            //                            this.streamProgress = 1;
                            //                            this.isObsStream = true;
                        } else {
                            this._websocket.socketControllerSet('stopStream', this.userData);
                            //                            this.streamProgress = 0;
                            //                            this.isObsStream = false;
                        }
                        this.broadcastStatus = currentStatus;
                    }

                    resolve({ status: this.broadcastStatus });
                }
            });


            //         this.http.request(`https://media.study24x7.net:5443/WebRTCAppEE/rest/broadcast/get?id=${this.streamURL}`).subscribe((data) => {
            //    // this.http.request(`https://test.hellouser.co.in:5443/WebRTCAppEE/rest/broadcast/get?id=${this.streamURL}`).subscribe((data) => {
            //         let responseData:any = data;
            //         console.log(responseData);

            //         this.broadcastStatus = responseData.status == "broadcasting" ? false: true;
            //         resolve({status:this.broadcastStatus});
            //     });
        });

    }




    chkUserToken() {
        var checkToken = {};
        checkToken['token'] = this._constantService.getSessionDataBYKey('token');
        checkToken['token_param'] = {};
        checkToken['token_param']['device_type'] = 'w';
        checkToken['token_param']['host'] = '';
        checkToken['cntnt_uuid'] = this.streamURL;

        this._constantService.fetchDataApi(this._constantService.getLiveStreamTokenCheckServiceUrl(), checkToken).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.aliasStream_id = responseData.STREAMING_ID;
                if (responseData.SOCAIL_AUTH_KEY) {
                    if (responseData.SOCAIL_AUTH_KEY.FACEBOOK_AUTH_KEY) {
                        this.isFbChnl = true;
                        this.fbDataId = responseData.SOCAIL_AUTH_KEY.FACEBOOK_AUTH_KEY;
                    }
                    if (responseData.SOCAIL_AUTH_KEY.YOUTUBE_AUTH_KEY) {
                        this.isYoutubeChnl = true;
                        this.youtubeDataId = responseData.SOCAIL_AUTH_KEY.YOUTUBE_AUTH_KEY;
                    }
                }

                this.mentorUUID = responseData.MENTOR_DATA.USER_UUID;
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.isMentor = responseData.IS_MENTOR == 1 ? true : false;
                this.courseTitle = responseData.COURSE_TITLE;
                var streamDurationInMilliSeconds = responseData.DURATION * 60 * 1000;
                var timeSpent = new Date().getTime() - responseData.START_TIME;
                this.timeLeftMilliseconds = streamDurationInMilliSeconds - timeSpent - (330 * 60000);
                this.timeLeft = this._constantService.getDateFromMilliseconds('hh:mm:ss', this.timeLeftMilliseconds);
                this.startTimer();
                var userData = {};
                userData['token'] = responseData.TOKEN;
                userData['streamID'] = this.aliasStream_id;
                userData['userId'] = responseData.USER_ID;
                userData['environment'] = this._constantService.platformDefinition;

                if (responseData.MENTOR_DATA.PROFILE_PHOTO_PATH)
                    userData["profilePic"] = responseData.MENTOR_DATA.PROFILE_PHOTO_PATH + 'profile/' + responseData.USER_ID +'_60x60.png'
                else {
                    userData["profilePic"] = this._constantService.defaultImgPath;
                }

                userData['fullName'] = responseData.FIRST_NAME + " " + responseData.LAST_NAME;
                userData['userStatus'] = '0';
                userData['isMentor'] = responseData.IS_MENTOR;
                userData['mentorName'] = responseData.MENTOR_DATA.FIRST_NAME + ' ' + responseData.MENTOR_DATA.LAST_NAME
                this.userData = userData;
                if (responseData.COVER_TYPE == 1) {
                    this.courseImage = responseData.COVER_PHOTO_PATH;
                } else {
                    this.courseImage = responseData.COVER_PHOTO_PATH + "/cover/" + responseData.COURSE_UUID + "1235x330.png";
                }

                this.duration = responseData.DURATION;
                this.durationStr = '0' + Math.floor(responseData.DURATION / 60) + ' : ' + Math.floor(responseData.DURATION % 60) + ' : ' + '00';
                this.startTime = responseData.START_TIME;
                this.expireTime = this.startTime + (this.duration * 60 * 1000);
                // if ((this.startTime - 60000) < Date.now()){
                //     this._router.navigate(['home']);
                // }


                this.count.enrolledUserCount = responseData.TOTAL_ENROLLED_USER;
                this.content_title = responseData.TITLE;

                // this.StreamingStart = true;
                if (this.isMentor) {
                    //for valid token generation
                    //this.craeteObsStreamTokenFxn();
                    this.chkObsStreamStatusFxn();
                    this._websocket.connectSocket();
                    this._websocket.socketControllerFailed().subscribe((data) => {
                        this.connectionFailed();
                    });
                    this.ConnectWithSocket();
                    this.countdownTimer(this.duration * 60);


                } else {
                    this._router.navigate(['home']);
                }
            } else if (status == this._constantService.error_token) {
                // this.dataConf['type'] = 4;
                // this.dataConf['msg'] = "Session Expire";
                // this.dataConf['error_msg'] = "Session Expired!";
                // this.openConfirmation = true;
                this._router.navigate(['home']);
                return false;
            } else {
                // this.dataConf['type'] = 2;
                // this.dataConf['msg'] = "Error";
                // this.dataConf['error_msg'] = responseData.ERROR_MSG;
                // this.openConfirmation = true;
                // return false;
                this._router.navigate(['home']);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });

    }

    ConnectWithSocket(): void {
        this._websocket.socketControllerConnect().subscribe((data) => {
            this.connectUser(data);
        });

        this._websocket.socketControllerDisonnect().subscribe((data) => {
            this.disconnectUserFun(data);
        });

        this._websocket.socketControllerJoin().subscribe((data) => {
            this.joinUserFun(data);
        });

        this._websocket.socketControllerGetMsg().subscribe((data) => {
            this.GetMessage(data);
        });
        this._websocket.socketControllerUpdateUsers().subscribe((data) => {
            this.updateUserCount(data);
        });
        this._websocket.socketControllerUserNotification().subscribe((data) => {
            this.UpdateUserNotification(data);
        });
        this._websocket.socketControllerAdminNotification().subscribe((data) => {
            this.updateAdminNotification(data);
        });

        this._websocket.socketControllerStartStream().subscribe((data) => {
            this.startMyStream(data);
        });

        this._websocket.socketControllerStopStream().subscribe((data) => {
            this.stopStream(data);
        });

        //   this._websocket.socketControllerViewStream().subscribe((data) => {
        //       this.viewStream(data);
        //   });

    }

    connectUser(data) {
        console.log(data);
        this.joinUser();
    }

    connectionFailed() {
        this._router.navigate(['home']);
    }

    ngOnDestroy1(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.

        try {
            this._websocket.socketControllerSet('manualDisconnect', this.userData);
        } catch {
            console.log("user disconnected");
        }
    }

    joinUser() {
        console.log("join user");

        console.log(this.userData);
        this._websocket.socketControllerSet('addUser', this.userData);
    }

    joinUserFun(data) {
        console.log(data);

    }

    blockChat(userId) {
        this._websocket.socketControllerSet('addUser', userId);
    }

    sendMsg() {
        var data = document.getElementById('writemsg');
        if (data && data.innerText != "") {
            console.log(data.innerText);
            var myMsg = {};
            myMsg['message'] = data.innerText;
            myMsg['sender'] = this.userData;
            data['userStatus'] = '0';
            var date = new Date();
            myMsg['timeStamp'] = date.getTime();
            this._websocket.socketControllerSet('sendChat', myMsg);
            this.chatList.push(myMsg);
            data.innerText = "";
            setTimeout(() => {
                this.scrolltobottom.directiveRef.scrollToBottom(0, 0);
            }, 100);
        }
    }

    disconnectUserFun(data) {
        console.log(data);
    }


    GetMessage(data) {
        this.chatList.push(data.message);
        setTimeout(() => {
            this.scrolltobottom.directiveRef.scrollToBottom(0, 0);
        }, 100);
        console.log(this.chatList);
    }

    createProfilePic(userid, profilepath) {
        userid = userid.replace('_1', '');
        if (profilepath) {
            return profilepath;
        } else {
            return this._constantService.defaultImgPath;
        }
    }

    createProfilePic1(userid, profilepath) {
        userid = userid.replace('_1', '');
        if (profilepath) {
            return profilepath + "profile/" + userid + "_60x60.png";
        } else {
            return this._constantService.defaultImgPath;
        }
    }



    blockUnblockUser(user, index) {
        console.log(user);
        var block = {};
        block['targetId'] = user.userId;
        block['targetName'] = user.fullName;
        block['targetStatus'] = user.userStatus;
        this._websocket.socketControllerSet('blockUser', block);
        console.log(this.userList, index);
        this.userList[index].userStatus == 0 ? this.userList[index].userStatus = 1 : this.userList[index].userStatus = 0;
        this.getUserList();
    }

    updateUserCount(data) {
        this.userList = [];
        var count = 0;
        for (var i = 0; i < data.length; i++) {

            if ((data[i].streamID == this.aliasStream_id) && (data[i].userId != this._constantService.getSessionDataBYKey('u_id'))) {
                this.userList.push(data[i]);
                console.log(data[i]);
                count++;
            }
        }
        this.getUserList();
        this.count.userCount = count;
        if (this.count.userCount > this.count.enrolledUserCount) {
            this.count.enrolledUserCount = this.count.userCount;
        }

    }

    getUserList() {
        return this.userList;
    }

    UpdateUserNotification(data) {
        console.log(data);
        this.adminNotification.push(data);
        console.log("NotificationUser", this.adminNotification);
    }

    updateAdminNotification(data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            this.adminNotification.push(data[i]);
        }

        console.log("NotificationAdmin", this.adminNotification);
    }

    startMyStream(data) {
        console.log(data);
    }

    stopStream(data) {
        console.log(data);
    }

    viewStream(data) {
        console.log(data);
    }

    switchCameraToggle(bool: boolean) {
        console.log("switch camera");
        this.switchCameraAndScreen = bool;
        enableDesktopCapture(bool);
    }






    timer_switch() { this.question_timer = !this.question_timer; }
    // smstabClick(index){this.msgtab = index;}
    toggletedLiveStreamDropdown(index) {
        if (this.selectedLiveStreamdropdown == index) {
            this.selectedLiveStreamdropdown = -1;
        }
        else {
            this.selectedLiveStreamdropdown = index;
        }
    }

    closewalldropdown() { this.selectedLiveStreamdropdown = 0; }

    dropnotification(index) {
        // this.showNotification = index;
        if (this.showNotification == index) {
            this.showNotification = -1;
        }
        else {
            this.showNotification = index;
        }
    }

    smstabClick(index) {
        this.msgtab = index;
    }

    changeVisibility(id) {
        // this.visibilityimg = "New Content";
        // this.pic = "New Content";
        // var add = "assets/images/svg-three/add_post/wall/";
        if (id == 3) {
            this.visibilityText = "You Tube";
            this.visibilityTyp = 3;
        } else if (id == 2) {
            this.visibilityText = "Whiteboard";
            this.visibilityTyp = 2;
        } else if (id == 1) {
            this.visibilityText = "Content";
            this.visibilityTyp = 1;

        }
    }

    countdownTimer(timeLeft) {
        this.timeRemaining = timeLeft;
        this.streamStartTime = this.timeRemaining;
        this.coutndownTimer = setInterval(() => {
            this.timeRemaining = timeLeft;
            var hours = Math.floor((timeLeft % (60 * 60 * 24)) / (60 * 60));
            var minutes = Math.floor((timeLeft % (60 * 60)) / (60));
            var seconds = Math.floor((timeLeft % (60)));

            if (hours < 10) {
                this.hoursLeft = '0' + hours.toString();
            } else {
                this.hoursLeft = hours.toString();
            }
            if (minutes < 10) {
                this.minuteLeft = '0' + minutes.toString();
            } else {
                this.minuteLeft = minutes.toString();
            }
            if (seconds < 10) {
                this.secondLeft = '0' + seconds.toString();
            } else {
                this.secondLeft = seconds.toString();
            }

            timeLeft--;

            this.timeLapseBar = 100 - ((timeLeft * 100) / (this.duration * 60));

            if (timeLeft < 0) {
                clearInterval(this.coutndownTimer);
                //                this.submitTest();
                this.countDisplay = "Submitted!";
            }
        }, 1000);
    }

    async showobspupup() {
        await this.chkObsStreamStatusFxn();

        if (this.obspopup) {
            var func = <any>await this.craeteObsStreamTokenFxn();
            console.log(func);
            if (func.status == false) {
                return;
            }
            this.streamProgress = 2;
            this.obspopup = !this.obspopup;
        } else {
            this.obspopup = !this.obspopup;
            this.streamProgress = 0;

        }
    }

    async showPanelStream() {
        this.testPanel=true;
        this.loader = true;
        await this.checkCamerMicAndExtension();
        this.obspopup = !this.obspopup;
        this.streamProgress = 1;
        setTimeout(() => {
            this.testPanel = (this.webcamAvailable != 1 || this.microphoneAvailable != 1) || (this.screenExtensionAvailable != 1 && this.browser == 'chrome' && !this.isMobileView);
        this.loader = false;
            
        }, 4000);
        
    }

    getSocialAuthParams(typ) {
        // typ 0 = youtube
        // typ 1 = facebook
        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";
        hitObj['type'] = typ;
        this._constantService.fetchDataApi(this._constantService.getDeviceAuthForSocialserviceUrl(), hitObj).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                let authParams = JSON.parse(responseData.AUTH_PARAM);
                this.isSocialParams = true;
                this.platformTyp = typ;
                this.usrCode = authParams.user_code;
                this.activationUrl = authParams.verification_url;
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
        }), error => {
            var err = error;
            if (err.status == 500) {
                this._router.navigate(['500']);
            }
        };
    }

    getSocialAuthStatus(usrCode) {
        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";
        hitObj['user_code'] = usrCode;

        this._constantService.fetchDataApi(this._constantService.getAuthStatusForSocialserviceUrl(), hitObj).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                let authStatus = JSON.parse(responseData.AUTH_STATUS);
                if (authStatus.success) {
                    clearInterval(this.checkSocialAuthInterval);
                    //                    this.platformTyp == 0 ? this.isYoutubeChnl = true : this.isFbChnl = true;
                    if (this.platformTyp == 0) {
                        this.isYoutubeChnl = true;
                        this.youtubeDataId = authStatus.dataId;
                        this.saveSocialAuthKey(0);
                    } else {
                        this.isFbChnl = true;
                        this.fbDataId = authStatus.dataId;
                        this.saveSocialAuthKey(1);
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
        }), error => {
            var err = error;
            if (err.status == 500) {
                this._router.navigate(['500']);
            }
        };
    }

    saveSocialAuthKey(typ) {
        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";
        if (typ == 0) {
            hitObj['data_yid'] = this.youtubeDataId;
        }
        if (typ == 1) {
            hitObj['data_fid'] = this.fbDataId;
        }

        this._constantService.fetchDataApi(this._constantService.getUpdDeviceIdRestUrl(), hitObj).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                console.log(responseData);
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
        }), error => {
            var err = error;
            if (err.status == 500) {
                this._router.navigate(['500']);
            }
        };
    }

    addSocialEndpointToStream(streamId, socialDataId) {
        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";
        hitObj['cntnt_uuid'] = streamId;
        hitObj['data_id'] = socialDataId;

        this._constantService.fetchDataApi(this._constantService.getMergeSocialWithStreamRestUrl(), hitObj).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                console.log(responseData);
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
        }), error => {
            var err = error;
            if (err.status == 500) {
                this._router.navigate(['500']);
            }
        };
    }

    delSocialConfirmation(typ) {
        this.delSocialTyp = typ;
        this.dataConf['type'] = 0;
        this.dataConf['msg'] = "STUDY24X7";
        this.dataConf['error_msg'] = 'Are you sure?';
        this.openConfirmation = true;
    }

    closePopup(event) {
        if (event['error'] == false) {
            this.openConfirmation = false;
            let body = document.getElementsByTagName('body')[0];
            body.classList.remove("body-overflow");
        }
        if (event['userConfirmation']) {
            this.openConfirmation = false;
            let body = document.getElementsByTagName('body')[0];
            body.classList.remove("body-overflow");
            this.delSocialEndpoint(this.delSocialTyp);
        } else {
            this.openConfirmation = false;
            let body = document.getElementsByTagName('body')[0];
            body.classList.remove("body-overflow");
        }
    }

    delSocialEndpoint(typ) {
        // typ 0 = youtube
        // typ 1 = facebook
        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";
        hitObj['type'] = typ;
        if (typ == 'y') {
            hitObj['data_id'] = this.youtubeDataId;
        } else {
            hitObj['data_id'] = this.fbDataId;
        }

        if (!hitObj['data_id']) {
            console.log('Wrong request object.');
            return false;
        }

        this._constantService.fetchDataApi(this._constantService.getDltSocialRestUrl(), hitObj).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                console.log(responseData);
                if (typ == 'f') {
                    this.isFbChnl = false;
                    this.fbDataId = '';
                    this.fbCheckbox = false;
                    //                    (<HTMLInputElement> document.querySelector('input[name="fbIntegration"]:checked')).checked = false;
                } else {
                    this.isYoutubeChnl = false;
                    this.youtubeDataId = '';
                    this.youtubeCheckbox = false;
                    //                    (<HTMLInputElement> document.querySelector('input[name="ytIntegration"]:checked')).checked = false;
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
        }), error => {
            var err = error;
            if (err.status == 500) {
                this._router.navigate(['500']);
            }
        };
    }

    authPopupClose(typ) {
        if (this.checkSocialAuthInterval) {
            clearInterval(this.checkSocialAuthInterval);
        }
        this.isSocialParams = false;
        if (typ == 2) {
            this.getSocialAuthStatus(this.usrCode); //for getting status at first second
            let hitCounter = 0;
            this.checkSocialAuthInterval = setInterval(() => {  //for getting status after 10 seconds interval
                ++hitCounter;
                this.getSocialAuthStatus(this.usrCode);
                if (hitCounter > 2) {  //for getting status only for 3 times in 30 seconds
                    clearInterval(this.checkSocialAuthInterval);
                }
            }, 10000);
        }
    }

    startTimer() {
        if (this.timerLeftInterval == undefined) {
            this.timerLeftInterval = setInterval(() => {
                this.timeLeftMilliseconds -= 1000;
                this.timeLeft = this._constantService.getDateFromMilliseconds("hh:mm:ss", this.timeLeftMilliseconds)

            }, 999)
        }
    }
}
