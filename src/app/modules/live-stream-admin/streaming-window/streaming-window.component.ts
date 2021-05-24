import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from "@angular/core";
import { Title, DomSanitizer } from "@angular/platform-browser";
import { WebsocketService } from "src/app/services/websocket.service";
import {
  PerfectScrollbarComponent,
  PerfectScrollbarDirective,
} from "ngx-perfect-scrollbar";
import { ConstantService } from "src/app/services/constant.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { PostdataService } from "src/app/services/postdata.service";
declare function startStream(): any;
declare function startPublishing(): any;
declare function stopPublishing(): any;
declare function getDataForStream(data: any): any;
declare function enableDesktopCapture(data: boolean): any;
declare function getStreamUpdates(): any;
declare function getChromeExtensionStatus(extensionId: any): any;
declare function muteMic(data: boolean): any;
declare function playLocalCamera(data: boolean): any;
declare var streamId: any;

@Component({
  selector: "app-streaming-window",
  templateUrl: "./streaming-window.component.html",
  styleUrls: [
    "../../live-stream/live-stream.component.scss",
    "../live-stream-admin.component.scss",
    "./streaming-window.component.scss",
  ],
})
export class StreamingWindowComponent implements OnInit {
  delSocialTyp: any;
  streamStatusTimer: NodeJS.Timer;
  coutndownTimer: NodeJS.Timer;
  youtubeCheckbox: boolean = false;
  playWebcam = true;
  fbCheckbox: boolean = false;
  youtubeDataId: any = "";
  fbDataId: any = "";
  platformTyp: any;
  checkSocialAuthInterval: any;
  usrCode: string;
  isObsStream: boolean = false;
  isSocialParams: boolean = false;
  isFbChnl: boolean = false;
  isYoutubeChnl: boolean = false;
  openConfirmation: boolean = false;
  dataConf: any = {};
  obsTokenId: any;
  obsToken: any = "";
  expireTime: any = 0;
  socketCheckTimer: any;
  startTime: any;
  durationStr: string;
  duration: number;
  visibilityText = "New Content";
  layoutdrop: boolean = false;
  layoutvideodrop: boolean = false;
  visibilityTyp = 3;
  selectedLiveStreamdropdown = -1;
  showNotification: number = 0;
  streamURL = "abcdefghijklmnopqrstuvwxyz";
  Socket;
  message = { name: "", imgPath: "", message: "", time: "", type: "0" };
  chatList = [];
  adminNotification = [];
  count = {
    userCount: 0,
    userNotificationCount: 0,
    adminNotificationCount: 0,
    enrolledUserCount: 0,
  };
  isMentor: boolean = true;
  userList = [];
  content_title = "";
  streamButton: string = "Go Live";
  userData: any = {};
  StreamingStart: boolean = false;
  switchCameraAndScreen: boolean = false;
  toggleChatSection: boolean = false;
  toggleChatActive: boolean = false;
  obspopup: boolean = true;
  @ViewChild("scrolltobottom") scrolltobottom: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective)
  directiveRef?: PerfectScrollbarDirective;
  streamProgress: number = 0;
  broadcastStatus: boolean = false;
  layout = "WCTopRight";
  aliasStream_id = "";
  layoutImageUrl: "assets/images/Live-stream/icon/layout-2.svg";
  vidUrl: string = "";
  @ViewChild("video")
  public video: ElementRef<HTMLVideoElement>;

  micOn: boolean = true;
  canvasOn: boolean = true;
  browser: string;

  constructor(
    private _titelService: Title,
    private _websocket: WebsocketService,
    private _constantService: ConstantService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    public postdata: PostdataService,
    private sanitizer: DomSanitizer,
    private changeDetector: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    localStorage.setItem("vidUrl", "");
    this._activatedRoute.params.subscribe((params: Params) => {
      if (params["id"] != null) {
        var id = params["id"];
        this.streamURL = id;
      }
    });
    this._titelService.setTitle("Live Stream Window");
    this.chkUserToken();

    this.socketCheckTimer = setInterval(() => {
      this._websocket.socketStatusCheck().subscribe((data) => {
        console.log(`Socket status is ${data}`);
      });
    }, 5000);
    this.changeVisibilitySort(
      "WCTopRight",
      "assets/images/Live-stream/icon/layout-2.svg"
    );
    this.browser = this._constantService.getBrowserName();
  }



  ngOnDestroy() {
    clearInterval(this.streamStatusTimer);
    clearInterval(this.coutndownTimer);
  }

  toggleChatClick() {
    if (this.toggleChatSection == false) {
      this.toggleChatSection = true;
      this.toggleChatActive = true;
      setTimeout(() => {
        this.scrolltobottom.directiveRef.scrollToBottom(0, 0);
      }, 200);
    } else {
      this.toggleChatSection = false;
      this.toggleChatActive = false;
    }
  }

  exitStream() {
    this._websocket.socketControllerSet("stopStream", this.userData);
    this._router.navigate(["home"]);
  }

  refreshStream() {
    this._websocket.socketControllerSet("startStream", this.userData);
  }

  closeDrop() {
    this.layoutdrop = false;
  }
  closevideoDrop() {
    this.layoutvideodrop = false;
  }
  showwalldrop() {
    this.layoutdrop = !this.layoutdrop;
  }
  showvideodrop() {
    this.layoutvideodrop = !this.layoutvideodrop;
  }

  changeVisibilitySort(layout, layoutImageUrl) {
    this.layout = layout;
    this.layoutImageUrl = layoutImageUrl;
  }

  async onOffMic() {

    this.micOn = !this.micOn;
    await muteMic(this.micOn);
  }





  finishedTest() { }
  getIframeUrl() {
    console.log("iframe");
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      "./widget.html?widgetJsURL= widget.js"
    );
  }

  async startMentorStream() {
    console.log("start stream");

    if (this.streamButton == "Go Live") {
      var panelStreamStatus = await this.showPanelStream();


      this.StreamingStart = true;
      console.log("start");


      var fun = <any>await startStream();

      console.log(fun);

      if (fun.info == "success") {
        this.streamButton = "Stop";
        this.changeDetector.detectChanges();
      } else if (fun.info == "error") {
        // alert("error");
        this.StreamingStart = false;
        this.streamButton = "Go Live";
      } else {
        console.log("sss");
        this.streamButton == "Go Live"
      }
      setTimeout(async () => {
        {
          var func = await startPublishing();
          var toggled = await this.switchCameraToggle(true);
          this.streamButton = "Stop";

          if (func == true) {
            this._websocket.socketControllerSet("startStream", this.userData);
          } else if (func == false) {
            //alert("error");
          }

          const checkStatus = setInterval(async () => {
            var status = await getStreamUpdates();
            console.log("publish stream:" + status);
            if (status == "Disconnected") {
              // var fun = <any>await stopPublishing();
              this._websocket.socketControllerSet("stopStream", this.userData);
              if (func == true) {
                this.StreamingStart = false;
                this.streamButton = "Stop";
                this.switchCameraAndScreen = false;
                this._websocket.socketControllerSet(
                  "stopStream",
                  this.userData
                );
                this.isObsStream = false;
                // this._websocket.socketControllerSet('killRoom',this.userData);
                clearInterval(checkStatus);
                status = "";
              } else if (func == false) {
                //alert("error");
                this.streamButton == "Go Live"
              }
            }
          }, 1000);
        }

      }, 2000);



    } else if (this.streamButton == "Stop") {
      var func = stopPublishing();
      if (func == true) {
        this.StreamingStart = false;
        this.streamButton = "Go Live";
        this.switchCameraAndScreen = false;
        this._websocket.socketControllerSet("stopStream", this.userData);
        this.isObsStream = false;
        open(
          window.location.pathname + "/shared-window",
          "stream-window"
        ).close();
        // this._websocket.socketControllerSet('killRoom',this.userData);

      } else if (func == false) {
        //alert("error");
      }
    } else if (this.streamButton == "OBS Status") {
      this.chkObsStreamStatusFxn();
    }
  }

  craeteObsStreamTokenFxn() {
    return new Promise((resolve) => {
      if (this.broadcastStatus) {
        var getToken = {};
        getToken["token"] = this._constantService.getSessionDataBYKey("token");
        getToken["token_param"] = {};
        getToken["token_param"]["device_type"] = "w";
        getToken["token_param"]["host"] = "";
        getToken["cntnt_uuid"] = this.aliasStream_id;
        getToken["type"] = 1;
        getToken["ed"] = this.expireTime;
        this._constantService
          .fetchDataApi(
            this._constantService.getLiveStreamCheckTokenStatusUrl(),
            getToken
          )
          .subscribe((data) => {
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
                  token: this.obsTokenId,
                  streamID: this.aliasStream_id,
                  streamName: this.content_title,
                  streamURL: this._constantService.antmediaURL,
                };
                getDataForStream(streamToken);

                this.streamStatusTimer = setInterval(() => {
                  this.chkObsStreamStatusFxn();
                }, 10000);

                resolve({ status: true });
              } else {
                //alert('Unable to generate OBS Token.');
                resolve({ status: false });
              }
            }
          });


      } else {
        alert("Another instance of stream already broadcasting");
        resolve({ status: false });
      }
    });
  }

  createStreamIdFxn() {
    return new Promise((resolve) => {
      var createStream = {};
      createStream["token"] = this._constantService.getSessionDataBYKey(
        "token"
      );
      createStream["token_param"] = {};
      createStream["token_param"]["device_type"] = "w";
      createStream["token_param"]["host"] = "";
      createStream["cntnt_uuid"] = this.aliasStream_id;
      createStream["stream_name"] = this.content_title;
      createStream["data_fid"] = "";
      createStream["data_yid"] = "";

      if (this.fbCheckbox && this.fbDataId != "") {
        createStream["data_fid"] = this.fbDataId;
      }
      if (this.youtubeCheckbox && this.youtubeDataId != "") {
        createStream["data_yid"] = this.youtubeDataId;
      }
      this._constantService
        .fetchDataApi(
          this._constantService.getCreateLiveStreamWithIdRestUrl(),
          createStream
        )
        .subscribe((data) => {
          var responseData: any = data;
          var status = responseData.STATUS;
          if (status == this._constantService.success_msg) {
            console.log("str");
          }
        });
    });
  }

  chkObsStreamStatusFxn() {
    return new Promise((resolve) => {
      var getStreamStatus = {};
      getStreamStatus["token"] = this._constantService.getSessionDataBYKey(
        "token"
      );
      getStreamStatus["token_param"] = {};
      getStreamStatus["token_param"]["device_type"] = "w";
      getStreamStatus["token_param"]["host"] = "";
      getStreamStatus["cntnt_uuid"] = this.aliasStream_id;
      getStreamStatus["type"] = 0;
      getStreamStatus["ed"] = "";

      this._constantService
        .fetchDataApi(
          this._constantService.getLiveStreamCheckTokenStatusUrl(),
          getStreamStatus
        )
        .subscribe((data) => {
          var responseData: any = data;
          var status = responseData.STATUS;
          if (status == this._constantService.success_msg) {
            var streamStatus = JSON.parse(responseData.STREAM_STATUS);
            let currentStatus =
              streamStatus.status == "broadcasting" ? false : true;
            if (currentStatus != this.broadcastStatus) {
              if (this.broadcastStatus) {
                this._websocket.socketControllerSet(
                  "startStream",
                  this.userData
                );

              } else {
                this._websocket.socketControllerSet(
                  "stopStream",
                  this.userData
                );
                //                            this.streamProgress = 0;
                //                            this.isObsStream = false;
              }
              this.broadcastStatus = currentStatus;
            }

            resolve({ status: this.broadcastStatus });
          }
        });


    });
  }

  chkUserToken() {
    var checkToken = {};
    checkToken["token"] = this._constantService.getSessionDataBYKey("token");
    checkToken["token_param"] = {};
    checkToken["token_param"]["device_type"] = "w";
    checkToken["token_param"]["host"] = "";
    checkToken["cntnt_uuid"] = this.streamURL;

    this._constantService
      .fetchDataApi(
        this._constantService.getLiveStreamTokenCheckServiceUrl(),
        checkToken
      )
      .subscribe(
        (data) => {
          var responseData: any = data;
          var status = responseData.STATUS;
          if (status == this._constantService.success_msg) {
            this.aliasStream_id = responseData.STREAMING_ID;
            streamId = this.aliasStream_id;
            if (responseData.SOCAIL_AUTH_KEY) {
              if (responseData.SOCAIL_AUTH_KEY.FACEBOOK_AUTH_KEY) {
                this.isFbChnl = true;
                this.fbDataId = responseData.SOCAIL_AUTH_KEY.FACEBOOK_AUTH_KEY;
              }
              if (responseData.SOCAIL_AUTH_KEY.YOUTUBE_AUTH_KEY) {
                this.isYoutubeChnl = true;
                this.youtubeDataId =
                  responseData.SOCAIL_AUTH_KEY.YOUTUBE_AUTH_KEY;
              }
            }

            this._constantService.setSessionJsonPair(
              "token",
              responseData.TOKEN
            );
            this.isMentor = responseData.IS_MENTOR == 1 ? true : false;
            var userData = {};
            userData["token"] = responseData.TOKEN;
            userData["streamID"] = this.aliasStream_id;
            userData["userId"] = responseData.USER_ID + '_1';
            userData["environment"] = this._constantService.platformDefinition;

            userData["profilePic"] = responseData.PROFILE_PHOTO_PATH;

            userData["fullName"] =
              responseData.FIRST_NAME + " " + responseData.LAST_NAME + '_1';
            userData["userStatus"] = "0";
            userData["isMentor"] = '1';
            userData["mentorName"] = userData["fullName"];
            this.userData = userData;


            this.duration = responseData.DURATION;
            this.startTime = responseData.START_TIME;
            this.expireTime = this.startTime + this.duration * 60 * 1000;


            this.count.enrolledUserCount = responseData.TOTAL_ENROLLED_USER;
            this.content_title = responseData.TITLE;

            if (this.isMentor) {

              this.chkObsStreamStatusFxn();
              this._websocket.connectSocket();
              this._websocket.socketControllerFailed().subscribe((data) => {
                this.connectionFailed();
              });
              this.ConnectWithSocket();
              this.countdownTimer(this.duration * 60);
            } else {
              this._router.navigate(["home"]);
            }
          } else if (status == this._constantService.error_token) {

            this._router.navigate(["home"]);
            return false;
          } else {

            this._router.navigate(["home"]);
          }
        },
        (error) => {
          var responseData = error;
          if (responseData.status == 500) {
            this._router.navigate(["500"]);
          }
        }
      );
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


  }

  connectUser(data) {
    console.log(data);
    this.joinUser();
  }

  connectionFailed() {
    this._router.navigate(["home"]);
  }

  ngOnDestroy1(): void {

    try {
      this._websocket.socketControllerSet("manualDisconnect", this.userData);
    } catch {
      console.log("user disconnected");
    }
  }

  joinUser() {
    console.log("join user");

    console.log(this.userData);
    this.userData.isMentor = 1;
    this._websocket.socketControllerSet("addUser", this.userData);
  }

  joinUserFun(data) {
    console.log(data);
  }

  blockChat(userId) {
    this._websocket.socketControllerSet("addUser", userId);
  }

  sendMsg() {
    var data = document.getElementById("writemsg");
    if (data && data.innerText != "") {
      console.log(data.innerText);
      var myMsg = {};
      myMsg["message"] = data.innerText;
      myMsg["sender"] = this.userData;
      myMsg["sender"]["userId"]=myMsg["sender"]["userId"].replace('_1','');
      myMsg["sender"]["profilePic"] = this.userData["profilePic"];
      myMsg["isAdmin"] = "0";
      data["userStatus"] = "0";
      var date = new Date();
      myMsg["timeStamp"] = date.getTime();
      this._websocket.socketControllerSet("sendChat", myMsg);
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
      return profilepath + "profile/" + userid + "_60x60.png";
    } else {
      return this._constantService.defaultImgPath;
    }
  }

  blockUnblockUser(user, index) {
    console.log(user);
    var block = {};
    block["targetId"] = user.userId;
    block["targetName"] = user.fullName;
    block["targetStatus"] = user.userStatus;
    this._websocket.socketControllerSet("blockUser", block);
    console.log(this.userList, index);
    this.userList[index].userStatus == 0
      ? (this.userList[index].userStatus = 1)
      : (this.userList[index].userStatus = 0);
    this.getUserList();
  }

  updateUserCount(data) {
    this.userList = [];
    var count = 0;
    for (var i = 0; i < data.length; i++) {
      if (
        data[i].streamID == this.aliasStream_id &&
        data[i].userId != this._constantService.getSessionDataBYKey("u_id")
      ) {
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
    setTimeout(() => {
      playLocalCamera(false);
    }, 500);
    return true;
  }


  toggletedLiveStreamDropdown(index) {
    if (this.selectedLiveStreamdropdown == index) {
      this.selectedLiveStreamdropdown = -1;
    } else {
      this.selectedLiveStreamdropdown = index;
    }
  }

  closewalldropdown() {
    this.selectedLiveStreamdropdown = 0;
  }

  dropnotification(index) {
    if (this.showNotification == index) {
      this.showNotification = -1;
    } else {
      this.showNotification = index;
    }
  }



  changeVisibility(id) {

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
    this.coutndownTimer = setInterval(() => {
      var hours = Math.floor((timeLeft % (60 * 60 * 24)) / (60 * 60));
      var minutes = Math.floor((timeLeft % (60 * 60)) / 60);
      var seconds = Math.floor(timeLeft % 60);
      timeLeft--;


      if (timeLeft < 0) {
        clearInterval(this.coutndownTimer);
      }
    }, 1000);
  }

  // async showobspupup() {
  //   await this.chkObsStreamStatusFxn();

  //   if (this.obspopup) {
  //     var func = <any>await this.craeteObsStreamTokenFxn();
  //     console.log(func);
  //     if (func.status == false) {
  //       return;
  //     }
  //     this.streamProgress = 2;
  //     this.obspopup = !this.obspopup;
  //   } else {
  //     this.obspopup = !this.obspopup;
  //     this.streamProgress = 0;
  //   }
  // }

  async showPanelStream() {
    var status = await this.chkObsStreamStatusFxn();

    var func = <any>await this.craeteObsStreamTokenFxn();
    // var func = <any>await this.createStreamIdFxn();
    console.log(func);
    if (func.status == false) {
      return;
    }
    this.obspopup = !this.obspopup;
    this.streamProgress = 1;
    return func.status;


  }

  getSocialAuthParams(typ) {
    // typ 0 = youtube
    // typ 1 = facebook
    var hitObj = {};
    hitObj["token"] = this._constantService.getSessionDataBYKey("token");
    hitObj["token_param"] = {};
    hitObj["token_param"]["device_type"] = "w";
    hitObj["token_param"]["host"] = "";
    hitObj["type"] = typ;
    this._constantService
      .fetchDataApi(
        this._constantService.getDeviceAuthForSocialserviceUrl(),
        hitObj
      )
      .subscribe((data) => {
        var responseData: any = data;
        var status = responseData.STATUS;
        if (status == this._constantService.success_msg) {
          let authParams = JSON.parse(responseData.AUTH_PARAM);
          this.isSocialParams = true;
          this.platformTyp = typ;
          this.usrCode = authParams.user_code;
        } else if (status == this._constantService.error_token) {
          this.dataConf["type"] = 4;
          this.dataConf["msg"] = "Session Expire";
          this.dataConf["error_msg"] = "Session Expired!";
          this.openConfirmation = true;
          return false;
        } else {
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "Error";
          this.dataConf["error_msg"] = responseData.ERROR_MSG;
          this.openConfirmation = true;
          return false;
        }
      }),
      (error) => {
        var err = error;
        if (err.status == 500) {
          this._router.navigate(["500"]);
        }
      };
  }

  getSocialAuthStatus(usrCode) {
    var hitObj = {};
    hitObj["token"] = this._constantService.getSessionDataBYKey("token");
    hitObj["token_param"] = {};
    hitObj["token_param"]["device_type"] = "w";
    hitObj["token_param"]["host"] = "";
    hitObj["user_code"] = usrCode;

    this._constantService
      .fetchDataApi(
        this._constantService.getAuthStatusForSocialserviceUrl(),
        hitObj
      )
      .subscribe((data) => {
        var responseData: any = data;
        var status = responseData.STATUS;
        if (status == this._constantService.success_msg) {
          let authStatus = JSON.parse(responseData.AUTH_STATUS);
          if (authStatus.success) {
            clearInterval(this.checkSocialAuthInterval);
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
          this.dataConf["type"] = 4;
          this.dataConf["msg"] = "Session Expire";
          this.dataConf["error_msg"] = "Session Expired!";
          this.openConfirmation = true;
          return false;
        } else {
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "Error";
          this.dataConf["error_msg"] = responseData.ERROR_MSG;
          this.openConfirmation = true;
          return false;
        }
      }),
      (error) => {
        var err = error;
        if (err.status == 500) {
          this._router.navigate(["500"]);
        }
      };
  }

  saveSocialAuthKey(typ) {
    var hitObj = {};
    hitObj["token"] = this._constantService.getSessionDataBYKey("token");
    hitObj["token_param"] = {};
    hitObj["token_param"]["device_type"] = "w";
    hitObj["token_param"]["host"] = "";
    if (typ == 0) {
      hitObj["data_yid"] = this.youtubeDataId;
    }
    if (typ == 1) {
      hitObj["data_fid"] = this.fbDataId;
    }

    this._constantService
      .fetchDataApi(this._constantService.getUpdDeviceIdRestUrl(), hitObj)
      .subscribe((data) => {
        var responseData: any = data;
        var status = responseData.STATUS;
        if (status == this._constantService.success_msg) {
          console.log(responseData);
        } else if (status == this._constantService.error_token) {
          this.dataConf["type"] = 4;
          this.dataConf["msg"] = "Session Expire";
          this.dataConf["error_msg"] = "Session Expired!";
          this.openConfirmation = true;
          return false;
        } else {
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "Error";
          this.dataConf["error_msg"] = responseData.ERROR_MSG;
          this.openConfirmation = true;
          return false;
        }
      }),
      (error) => {
        var err = error;
        if (err.status == 500) {
          this._router.navigate(["500"]);
        }
      };
  }

  addSocialEndpointToStream(streamId, socialDataId) {
    var hitObj = {};
    hitObj["token"] = this._constantService.getSessionDataBYKey("token");
    hitObj["token_param"] = {};
    hitObj["token_param"]["device_type"] = "w";
    hitObj["token_param"]["host"] = "";
    hitObj["cntnt_uuid"] = streamId;
    hitObj["data_id"] = socialDataId;

    this._constantService
      .fetchDataApi(
        this._constantService.getMergeSocialWithStreamRestUrl(),
        hitObj
      )
      .subscribe((data) => {
        var responseData: any = data;
        var status = responseData.STATUS;
        if (status == this._constantService.success_msg) {
          console.log(responseData);
        } else if (status == this._constantService.error_token) {
          this.dataConf["type"] = 4;
          this.dataConf["msg"] = "Session Expire";
          this.dataConf["error_msg"] = "Session Expired!";
          this.openConfirmation = true;
          return false;
        } else {
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "Error";
          this.dataConf["error_msg"] = responseData.ERROR_MSG;
          this.openConfirmation = true;
          return false;
        }
      }),
      (error) => {
        var err = error;
        if (err.status == 500) {
          this._router.navigate(["500"]);
        }
      };
  }

  delSocialConfirmation(typ) {
    this.delSocialTyp = typ;
    this.dataConf["type"] = 0;
    this.dataConf["msg"] = "STUDY24X7";
    this.dataConf["error_msg"] = "Are you sure?";
    this.openConfirmation = true;
  }

  closePopup(event) {
    if (event["error"] == false) {
      this.openConfirmation = false;
      let body = document.getElementsByTagName("body")[0];
      body.classList.remove("body-overflow");
    }
    if (event["userConfirmation"]) {
      this.openConfirmation = false;
      let body = document.getElementsByTagName("body")[0];
      body.classList.remove("body-overflow");
      this.delSocialEndpoint(this.delSocialTyp);
    } else {
      this.openConfirmation = false;
      let body = document.getElementsByTagName("body")[0];
      body.classList.remove("body-overflow");
    }
  }

  delSocialEndpoint(typ) {
    var hitObj = {};
    hitObj["token"] = this._constantService.getSessionDataBYKey("token");
    hitObj["token_param"] = {};
    hitObj["token_param"]["device_type"] = "w";
    hitObj["token_param"]["host"] = "";
    hitObj["type"] = typ;
    if (typ == "y") {
      hitObj["data_id"] = this.youtubeDataId;
    } else {
      hitObj["data_id"] = this.fbDataId;
    }

    if (!hitObj["data_id"]) {
      console.log("Wrong request object.");
      return false;
    }

    this._constantService
      .fetchDataApi(this._constantService.getDltSocialRestUrl(), hitObj)
      .subscribe((data) => {
        var responseData: any = data;
        var status = responseData.STATUS;
        if (status == this._constantService.success_msg) {
          console.log(responseData);
          if (typ == "f") {
            this.isFbChnl = false;
            this.fbDataId = "";
            this.fbCheckbox = false;
          } else {
            this.isYoutubeChnl = false;
            this.youtubeDataId = "";
            this.youtubeCheckbox = false;
          }
        } else if (status == this._constantService.error_token) {
          this.dataConf["type"] = 4;
          this.dataConf["msg"] = "Session Expire";
          this.dataConf["error_msg"] = "Session Expired!";
          this.openConfirmation = true;
          return false;
        } else {
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "Error";
          this.dataConf["error_msg"] = responseData.ERROR_MSG;
          this.openConfirmation = true;
          return false;
        }
      }),
      (error) => {
        var err = error;
        if (err.status == 500) {
          this._router.navigate(["500"]);
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
      this.checkSocialAuthInterval = setInterval(() => {
        ++hitCounter;
        this.getSocialAuthStatus(this.usrCode);
        if (hitCounter > 2) {
          clearInterval(this.checkSocialAuthInterval);
        }
      }, 10000);
    }
  }

  webcamOnOff() {
    this.playWebcam = !this.playWebcam;
    if (this.playWebcam) {
      this.ngAfterViewInit();
    }
  }
  startVideo(playVideo) {
    if (playVideo) {
      this.canvasOn = false;
      var key = this.vidUrl.replace("https://youtu.be/", "");
      key = key.replace("https://www.youtube.com/watch?v=", "");
      key = key.replace("www.youtube.com/watch?v=", '');
      key = key.replace("youtube.com/watch?v=", '');
      key = key.replace("&", "?");
      var url = "https://www.youtube.com/embed/" + key;
      if (
        (<HTMLIFrameElement>document.getElementById("iframeVideo")).src != url
      )
        (<HTMLIFrameElement>document.getElementById("iframeVideo")).src = url;
      this.vidUrl = "";
      this.showvideodrop();
    } else {
      this.canvasOn = true;
      if (
        (<HTMLIFrameElement>document.getElementById("iframeVideo")).src !=
        "assets/static-pages/widget.html"
      )
        (<HTMLIFrameElement>document.getElementById("iframeVideo")).src =
          "assets/static-pages/widget.html";
      this.showvideodrop();
    }
  }

  public ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
      });
    }
  }
}
