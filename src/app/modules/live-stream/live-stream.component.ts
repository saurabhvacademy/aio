import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import {
  PerfectScrollbarComponent,
  PerfectScrollbarDirective,
  PerfectScrollbarConfigInterface,
} from "ngx-perfect-scrollbar";
import { WebsocketService } from "../../services/websocket.service";
import { ConstantService } from "../../services/constant.service";
import { PostdataService } from "../../services/postdata.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { EncryptionService } from "./../../services/encryption.service";
declare function videojs(data1, data2, data3): any;
declare function videoconfig(): any;
declare const bitmovin: any;
declare var $: any;
@Component({
  selector: "app-live-stream",
  templateUrl: "./live-stream.component.html",
  styleUrls: ["./live-stream.component.scss", "./bit-player.css"],
})
export class LiveStreamComponent implements OnInit, AfterViewInit {
  mentorUUID: any;
  startTime: any;
  duration: number = 1;
  durationStr: any = "";
  countDisplay: string;
  secondLeft = "";
  minuteLeft = "";
  hoursLeft = "";
  streamStartTime: any;
  timeRemaining: any;
  timeLapseBar = 0;
  // visibilityTyp: number;
  isMentorLive: boolean = false;
  question_timer: boolean = false;
  msgtab = 1;
  visibilityText = "New Content";
  walldropdown: boolean = false;
  visibilityTyp = 3;
  selectedLiveStreamdropdown = -1;
  showNotification: number = 0;
  streamURL = "abcdefghijklmnopqrstuvwxyz";
  Socket;
  message = { name: "", imgPath: "", message: "", time: "", type: "0" };
  chatList = [];
  content_title = "Understanding the structure of molecule";
  adminNotification = [];
  userNotiification = [];
  vodPath = "";
  count = {
    userCount: 0,
    userNotificationCount: 0,
    adminNotificationCount: 0, 
    //var scriptAdapterLatest = document.createElement("script");
    // var scriptWebrtcAdapter = document.createElement("script");
    // var scriptScreenCapturing = document.createElement("script");
    // var scriptRecordRtc = document.createElement("script");
    // var scriptVideoConfig = document.createElement("script");

    // scriptAdapterLatest.src = "https://js.aio.com/assets/js/stream/adapter-latest.js";
    // scriptWebrtcAdapter.src="https://js.aio.com/assets/js/stream/webrtc_adaptor.js";
    // scriptScreenCapturing.src="https://js.aio.com/assets/js/stream/Screen-Capturing.js";
    // scriptRecordRtc.src="https://js.aio.com/assets/js/stream/recordrtc.js";
    // scriptVideoConfig.src="https://js.aio.com/assets/js/stream/videoconfig.js";
    // document.getElementsByTagName("body")[0].appendChild(scriptAdapterLatest);
    // document.getElementsByTagName("body")[0].appendChild(scriptWebrtcAdapter);
    // document.getElementsByTagName("body")[0].appendChild(scriptScreenCapturing);
    // document.getElementsByTagName("body")[0].appendChild(scriptRecordRtc);
    // document.getElementsByTagName("body")[0].appendChild(scriptVideoConfig);

    enrolledUserCount: 0,
  };
  playerStarted = false;
  isMentor: boolean = false;
  streamVideoURl: string = "";
  StreamingStart: boolean = false;
  userData = {};
  toggleChatSection: boolean = false;
  slideIndex: number = 1;
  broadcastStatus: boolean = false;
  @ViewChild("scrolltobottom") scrolltobottom: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective)
  directiveRef?: PerfectScrollbarDirective;
  videoPlayerType: number = 1;
  aliasStream_id = "";
  streamType: number;
  vodType: any;
  mentorsSocketId: any;
  constructor(
    private _constantService: ConstantService,
    private _websocket: WebsocketService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _encrypt: EncryptionService,
    public postdata: PostdataService
  ) { }

  //   currentSlide(n) {
  //   showSlides(this.slideIndex = n);
  // }
  //
  // showSlides(n){
  //   var i;
  //   var slides = document.getElementsByClassName("mySlides");
  //   var dots = document.getElementsByClassName("dot");
  //   if (n > slides.length) {this.slideIndex = 1}
  //   if (n < 1) {this.slideIndex = slides.length}
  //   for (i = 0; i < slides.length; i++) {
  //       slides[i].style.display = "none";
  //   }
  //   for (i = 0; i < dots.length; i++) {
  //       dots[i].className = dots[i].className.replace(" active", "");
  //   }
  //   slides[this.slideIndex-1].style.display = "block";
  //   dots[this.slideIndex-1].className += " active";
  // }

  ngOnInit() {
     
    // var scriptAdapterLatest = document.createElement("script");
    // var scriptWebrtcAdapter = document.createElement("script");
    // var scriptScreenCapturing = document.createElement("script");
    // var scriptRecordRtc = document.createElement("script");
    // var scriptVideoConfig = document.createElement("script");

    // scriptAdapterLatest.src = "https://js.aio.com/assets/js/stream/adapter-latest.js";
    // scriptWebrtcAdapter.src="https://js.aio.com/assets/js/stream/webrtc_adaptor.js";
    // scriptScreenCapturing.src="https://js.aio.com/assets/js/stream/Screen-Capturing.js";
    // scriptRecordRtc.src="https://js.aio.com/assets/js/stream/recordrtc.js";
    // scriptVideoConfig.src="https://js.aio.com/assets/js/stream/videoconfig.js";
    // document.getElementsByTagName("body")[0].appendChild(scriptAdapterLatest);
    // document.getElementsByTagName("body")[0].appendChild(scriptWebrtcAdapter);
    // document.getElementsByTagName("body")[0].appendChild(scriptScreenCapturing);
    // document.getElementsByTagName("body")[0].appendChild(scriptRecordRtc);
    // document.getElementsByTagName("body")[0].appendChild(scriptVideoConfig);
    // this.isMentorLive = true;

    var script = document.createElement("script");

    script.src = "https://cdn.bitmovin.com/player/web/8.15.0/bitmovinplayer.js";
    document.getElementsByTagName("head")[0].appendChild(script);

    // this.viewStream('');
    //this.checkStream();
    this._activatedRoute.params.subscribe((params: Params) => {
      if (params["id"] != null) {
        var id = params["id"];
        this.streamURL = id;
      }
    });
    this.chkUserToken();
    this._websocket.socketStatusCheck().subscribe((data) => {
      var Data = data;
    });
  }

  ngAfterViewInit() { }

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
            if (responseData.LIVE_STREAM_STATUS == 1) {
              var pathArr = responseData.EXT_PATH.split(".");
              this.vodPath = responseData.PATH + responseData.EXT_PATH;
              this.vodType = pathArr[pathArr.length - 1];
            } else {
              this.vodType = "";
            }
            if(this.vodType=='mp4'){
              this.isMentorLive=true;
              setTimeout(() => {
              this.playVideoFromBitmovin();
              
                
              }, 2000);
            }

            this.aliasStream_id = responseData.STREAMING_ID;
            this.streamType = 1; //Change according to api
            this._constantService.setSessionJsonPair(
              "token",
              responseData.TOKEN
            );
            this.isMentor = responseData.IS_MENTOR == 1 ? true : false;
            this.mentorUUID = responseData.MENTOR_DATA.USER_UUID;
            this.updStreamStatus(
              responseData.COURSE_UUID,
              responseData.CONTENT_UUID,
              responseData.CONTENT_TYPE
            );
            if (responseData.CONTENT_TYPE == 7) {
              // if(!this.playerStarted)
              // this.viewStream("");
            }
            var userData = {};
            userData["contentType"]=responseData.CONTENT_TYPE;
            userData["token"] = responseData.TOKEN;
            userData["streamID"] = this.aliasStream_id;
            userData["userId"] = responseData.USER_ID;
            userData["profilePic"] = responseData.PROFILE_PHOTO_PATH;

            userData["fullName"] =
              responseData.FIRST_NAME + " " + responseData.LAST_NAME;
            userData["userStatus"] = "0";
            userData["isMentor"] = responseData.IS_MENTOR;
            userData["timestamp"] = Date.now();
            userData["environment"] = this._constantService.platformDefinition;
            userData["mentorName"] =
              responseData.MENTOR_DATA.FIRST_NAME +
              " " +
              responseData.MENTOR_DATA.LAST_NAME;
            this.userData = userData;
            this.count.enrolledUserCount = responseData.TOTAL_ENROLLED_USER;

            this.content_title = this.postdata.decodeURIPostData(
              responseData.TITLE
            );
            this.duration = responseData.DURATION;
            this.durationStr =
              "0" +
              Math.floor(responseData.DURATION / 60) +
              " : " +
              Math.floor(responseData.DURATION % 60) +
              " : " +
              "00";
            this.startTime = responseData.START_TIME;
            if (this.startTime - 60000 > Date.now()) {
              this._router.navigate(["home"]);
            }
            this.countdownTimer(this.duration * 60);
            //                setInterval(() => {
            //                this.chkObsStreamStatusFxn();
            //                }, 10000);

            if (
              (!this.isMentor && responseData.VISIBILITY == 0) ||
              (!this.isMentor && responseData.IS_ENROLLED == 1)
            ) {
              this._websocket.connectSocket();
              this._websocket.socketControllerFailed().subscribe((data) => {
                this.connectionFailed();
              });
              this.ConnectWithSocket();
              window.onbeforeunload = () => {
                this.ngOnDestroy();
              };
            } else {
              this._router.navigate(["home"]);
            }
          } else if (status == this._constantService.error_token) {
            this._router.navigate(["home"]);
            return false;
          } else {
            // this.dataConf['type'] = 2;
            // this.dataConf['msg'] = "Error";
            // this.dataConf['error_msg'] = responseData.ERROR_MSG;
            // this.openConfirmation = true;
            // return false;
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

  connectionFailed() {
    this._router.navigate(["home"]);
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
    // this._websocket.socketControllerAdminNotification().subscribe((data) => {
    //     this.updateAdminNotification(data);
    // });

    this._websocket.socketControllerStartStream().subscribe((data) => {
        this.startStream(data);
    });

    this._websocket.socketControllerStopStream().subscribe((data) => {
      this.stopStream(data);
    });

    this._websocket.socketControllerViewStream().subscribe((data) => {
      setTimeout(() => {
        if(!this.playerStarted)
        this.viewStream(data);
      }, 2000);
    });
  }


  startStream(data){
    console.log("STRESM STARTED:", data);
    this.isMentorLive=data.isMentorLive;
    if(this.isMentorLive && !this.playerStarted){
      this.viewStream(data);
    }
    // else if(this.isMentorLive) this.viewStream;
  }



  connectUser(data) {
    console.log("user data");
    console.log(data);

    this.joinUser();
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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userNotiification = [];

    try {
      this._websocket.socketControllerSet("manualDisconnect", this.userData);
    } catch { }
  }

  joinUser() {
    this._websocket.socketControllerSet("addUser", this.userData);
  }

  joinUserFun(data) { }

  sendMsg() {
    var data = document.getElementById("writemsg");
    if (data && data.innerText != "") {
      var myMsg = {};
      myMsg["message"] = data.innerText;
      myMsg["sender"] = {};
      myMsg["sender"]["userId"] = this._constantService.getSessionDataBYKey(
        "u_id"
      );
      myMsg["sender"]["fullName"] = this._constantService.getSessionDataBYKey(
        "full_name"
      );
      myMsg["sender"]["profilePic"] = this.userData["profilePic"];
      myMsg["userStatus"] = "0";
      myMsg["isAdmin"] = "0";
      var date = new Date();
      myMsg["timeStamp"] = date.getTime();
      myMsg["socketId"]=this.mentorsSocketId;
      this._websocket.socketControllerSet("sendChat", myMsg);
      this.chatList.push(myMsg);
      setTimeout(() => {
        this.scrolltobottom.directiveRef.scrollToBottom(0, 0);
      }, 100);
      data.innerText = "";
    }
  }

  disconnectUserFun(data) { }

  stopStream(data) {
    // this.isMentorLive = false;
  }

  GetMessage(data) {
    this.chatList.push(data.message);
    setTimeout(() => {
      this.scrolltobottom.directiveRef.scrollToBottom(0, 0);
    }, 100);
  }

  createProfilePic(userid, profilepath) {
    userid = userid.replace("_1", "");
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

  updateUserCount(data) {
    data.forEach(element => {
      if(element.isMentor==1){
        this.mentorsSocketId=element.socketID;
        console.log(this.mentorsSocketId);
      }
      
    });
   }

  UpdateUserNotification(data) {
    this.userNotiification.push(data);
  }

  playVideoFromVideoJs() {
    setTimeout(() => {
      // ID with which to access the template's video element
      let el = "video_1";

      // setup the player via the unique element ID
      var player = videojs(document.getElementById(el), {}, function () {
        // Store the video object
        var myPlayer = this,
          id = myPlayer.id();

        // Make up an aspect ratio
        var aspectRatio = 264 / 640;

        // internal method to handle a window resize event to adjust the video player
        function resizeVideoJS() {
          var width = document.getElementById(id).parentElement.offsetWidth;
          myPlayer.width(width).height(width * aspectRatio);
        }

        // Initialize resizeVideoJS()
        resizeVideoJS();

        // Then on resize call resizeVideoJS()
        window.onresize = resizeVideoJS;
      });
    }, 5000);
  }

  playVideoFromBitmovin() {
    this.playerStarted=true;
    setTimeout(() => {
      const config = {
        key: "41dc00ff-4da8-46a4-8aaa-2b753e8f74ce",
        analytics: {
          key: "41dc00ff-4da8-46a4-8aaa-2b753e8f74ce",
          videoId: this.content_title,
          title: this.content_title,
        },
        tweaks: {
          autoqualityswitching: false,
        },
        adaptation: {
          logic: "v2",
          limitToPlayerSize: true,
          startupBitrate: "360kbps",

          desktop: {
            bitrates: {
              minSelectableVideoBitrate: "360kbps",
              maxSelectableVideoBitrate: "720kbps",
            },
          },
          mobile: {
            bitrates: {
              //                    minSelectableVideoBitrate: '360kbps',
              maxSelectableVideoBitrate: "480kbps",
            },
          },
        },
        playback: {
          autoplay: true,
        },
      };
      var container = document.getElementById("bit-player");
      var player = new bitmovin.player.Player(container, config);
      var source;
      if (this.vodType == "mp4") {
        source = {
          // hls: this.streamVideoURl,
          // hls: "https://s3.ap-south-1.amazonaws.com/247-cors-video-test/development/4.0.0.1/vod/2cdb12b0-b79b-11ea-ab53-e725503e277f.mp4_adaptive.m3u8"
          // hls: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
          //    hls: 'http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8',

          progressive: [
            {
              url: this.vodPath,
              type: "video/mp4",
              bitrate: 500000,
              label: "Low",
            },
            {
              url: this.vodPath,

              type: "video/mp4",
              bitrate: 1000000,
              label: "Mid",
              preferred: true,
            },
            {
              url: this.vodPath,

              type: "video/mp4",
              bitrate: 2500000,
              label: "High",
            },
          ],
        };
      } else if (this.vodType == "m3u8") {
        source = {
          hls: this.vodPath,
        };
      } else {
        source = {
          hls: this.streamVideoURl,
        };
      }

      player.load(source).then(
        () => {
          console.log("Successfully created Bitmovin Player instance");
          this.playerStarted = true;
        },
        (reason) => {
          console.log(
            "Error while creating Bitmovin Player instance : " + reason
          );
        }
      );
    }, 5000);
  }

  viewStream(data) {
    if (this.isMentorLive && this.streamType == 0) {
      return;
    }
    this.isMentorLive=true;
    this.streamVideoURl =
      this._constantService.videoCDNUrl +
      this.aliasStream_id +
      "_adaptive.m3u8";
    if (this.videoPlayerType == 1 || this.streamType == 1) {
       this.playVideoFromBitmovin(); 
    } else {
      this.playVideoFromVideoJs();
    }
  }
  timeout: number = 15000;
  timeoutLocal: number = 0;

  checkStream() {
    setTimeout(() => {
      var timeoutLocal = this.timeout;
      this.timeout = this.timeout + this.timeoutLocal;
      this.timeoutLocal = timeoutLocal;
      if (!this.isMentorLive) {
        this.chkObsStreamStatusFxn();
      } else {
        //this.checkStream();
        this.chkObsStreamStatusFxn();
      }
    }, this.timeoutLocal);
  }

  timer_switch() {
    this.question_timer = !this.question_timer;
  }
  // smstabClick(index){this.msgtab = index;}
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
    // this.showNotification = index;
    if (this.showNotification == index) {
      this.showNotification = -1;
    } else {
      this.showNotification = index;
    }
  }

  smstabClick(index) {
    this.msgtab = index;
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
    this.timeRemaining = timeLeft;
    this.streamStartTime = this.timeRemaining;
    var timer = setInterval(() => {
      this.timeRemaining = timeLeft;
      var hours = Math.floor((timeLeft % (60 * 60 * 24)) / (60 * 60));
      var minutes = Math.floor((timeLeft % (60 * 60)) / 60);
      var seconds = Math.floor(timeLeft % 60);

      if (hours < 10) {
        this.hoursLeft = "0" + hours.toString();
      } else {
        this.hoursLeft = hours.toString();
      }
      if (minutes < 10) {
        this.minuteLeft = "0" + minutes.toString();
      } else {
        this.minuteLeft = minutes.toString();
      }
      if (seconds < 10) {
        this.secondLeft = "0" + seconds.toString();
      } else {
        this.secondLeft = seconds.toString();
      }

      timeLeft--;

      this.timeLapseBar = 100 - (timeLeft * 100) / (this.duration * 60);

      if (timeLeft < 0) {
        clearInterval(timer);
        //                this.submitTest();
        this.countDisplay = "Submitted!";
      }
    }, 1000);
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
            this.broadcastStatus =
              streamStatus.status == "broadcasting" ? true : false;
            if (this.broadcastStatus == true) {
              this.isMentorLive=true;
              if(!this.playerStarted)
              this.viewStream("");
            } else {
              this.stopStream("");
              // this.checkStream();
            }

            resolve({ status: this.broadcastStatus });
          }
        });
    });
  }

  updStreamStatus(courseUuid, contentUuid, contentTyp) {
    var Courseseen = {};
    Courseseen["token"] = this._constantService.getSessionDataBYKey("token");
    Courseseen["token_param"] = {};
    Courseseen["token_param"]["device_type"] = "w";
    Courseseen["token_param"]["host"] = "";
    Courseseen["cors_uuid"] = courseUuid;
    Courseseen["cntnt_uuid"] = contentUuid;
    Courseseen["cntnt_typ"] = contentTyp;
    Courseseen["remain"] = "";
    this._constantService
      .fetchDataApi(
        this._constantService.getCourseSeentUpdateServiceUrl(),
        Courseseen
      )
      .subscribe((data) => {
        var responseData: any = data;
        var status = responseData.STATUS;
        if (status == "success") {
        }
      });
  }
}
