import { Component, OnInit, ViewChild, HostListener, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { PostdataService } from './../../../services/postdata.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConstantService } from '../../../services/constant.service';
declare const bitmovin: any;
declare var $: any;


@Component({
  selector: 'app-previous-classes',
  templateUrl: './previous-classes.component.html',
  styleUrls: [
    './previous-classes.component.scss',
    './../../all-courses/slidercntr.css'
    // '../../../sharedComponents/mmenu/slidemenu.css'
  ],
  host: {
    '(window:scroll)': 'onScroll($event)'
  }
})
export class PreviousClassesComponent implements OnInit {
  @Input() previousClasses = [];
  @Input() fromLiveCompnent: boolean;
  @Output() messageEvent = new EventEmitter();

  dataConf: {};
  pageCount: number = 1;
  continueScroll: any = true;
  isScrolled: boolean = false;
  currPos: Number = 0;
  startPos: Number = 0;
  changePos: Number = 0;
  isMobileMenue: boolean = false;
  playerContent: any;
  playPreviousClass: boolean;
  t: any;
  token: boolean;
  mobileView: boolean;
  view = -1;
  player: any;
  dismissPopup: boolean = true;
  countDisplay: string;
  timerStop: boolean;
  interval: NodeJS.Timeout;
  iframeSource: string;
  timeToPlay: any;
  constructor(
    private postData: PostdataService,
    public _router: Router,
    public _constantService: ConstantService,
    private activatedRoute: ActivatedRoute



  ) { }

  ngOnInit(): void {
    var script = document.createElement("script");

    script.src = "https://cdn.bitmovin.com/player/web/8.15.0/bitmovinplayer.js";
    document.getElementsByTagName("head")[0].appendChild(script);
    this.t = this._constantService.getSessionDataBYKey('token');
    if (this.t && !this.fromLiveCompnent) {
      this.getpreviousClassesDtl();
    } else if (!this.fromLiveCompnent) {
      this.getpreviousClassesDtlWthOtTkn();
    }

    this.checkScreenWidth();
  }
  getpreviousClassesDtl() {
    const postData = {};
    postData['token'] = this._constantService.getSessionDataBYKey('token');
    postData['token_param'] = {};
    postData['token_param']['device_type'] = 'w';
    postData['token_param']['host'] = '';
    postData['type'] = 3;
    postData['count'] = this.pageCount;
    postData['r_count'] = 12;

    this._constantService.fetchDataApi(this._constantService.getLiveClassesDtl(), postData).subscribe(data => {
      const responseData: any = data;
      const status = responseData.STATUS;
      if (status == this._constantService.success_msg) {
        // this.upComingClasses = responseData.STREAM_DATA;
        for (let i = 0; i < responseData.STREAM_DATA.length; i++) {
          responseData.STREAM_DATA[i].duration = responseData.STREAM_DATA[i].DURATION;
          var hrs = Math.floor(responseData.STREAM_DATA[i].DURATION / 3600) + '';
          responseData.STREAM_DATA[i].DURATION = responseData.STREAM_DATA[i].DURATION % 3600;
          var hrs = '0' + hrs;
          var minutes = Math.floor(responseData.STREAM_DATA[i].DURATION / 60);
          var seconds = responseData.STREAM_DATA[i].DURATION % 60;
          responseData.STREAM_DATA[i].DURATION = (hrs == '00' ? '' : hrs + ':') + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
          if (responseData.STREAM_DATA[i].CONTENT_TYPE == 4) {
            var filteredPathString = responseData.STREAM_DATA[i].PATH.split('?')[0];
            filteredPathString = filteredPathString.split('&')[0];
            responseData.STREAM_DATA[i].path = "https://img.youtube.com/vi/" + filteredPathString + "/hqdefault.jpg";
          }
          this.previousClasses.push(responseData.STREAM_DATA[i]);
        }
        if (responseData.STREAM_DATA.length < postData['r_count']) {
          this.continueScroll = false;
        }
      } else if (status == this._constantService.error_token) {
        this._constantService.clearUserInfo();
        this._router.navigate(['']);
        this.dataConf['type'] = 4;
        this.dataConf['msg'] = 'Session Expire';
        this.dataConf['error_msg'] = 'Session Expired';
      } else {
        this.dataConf['type'] = 2;
        this.dataConf['msg'] = 'STUDY24X7';
        this.dataConf['error_msg'] = responseData.ERROR_MSG;
      }
    }, error => {
      const responseData = error;
      if (responseData.status == 500) {
        this._router.navigate(['500']);
      }
    });
  }

  getpreviousClassesDtlWthOtTkn() {
    const postData = {};
    postData['type'] = 3;
    postData['count'] = this.pageCount;
    postData['r_count'] = 9;

    this._constantService.fetchDataApi(this._constantService.getLiveClassesDtlWthOtTkn(), postData).subscribe(data => {
      const responseData: any = data;
      const status = responseData.STATUS;
      if (status == this._constantService.success_msg) {
        // this.upComingClasses = responseData.STREAM_DATA;
        for (let i = 0; i < responseData.STREAM_DATA.length; i++) {
          responseData.STREAM_DATA[i].duration = responseData.STREAM_DATA[i].DURATION;
          var hrs = Math.floor(responseData.STREAM_DATA[i].DURATION / 3600) + '';
          responseData.STREAM_DATA[i].DURATION = responseData.STREAM_DATA[i].DURATION % 3600;
          var hrs = '0' + hrs;
          var minutes = Math.floor(responseData.STREAM_DATA[i].DURATION / 60);
          var seconds = responseData.STREAM_DATA[i].DURATION % 60;
          responseData.STREAM_DATA[i].DURATION = (hrs == '00' ? '' : hrs + ':') + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
          if (responseData.STREAM_DATA[i].CONTENT_TYPE == 4) {
            var filteredPathString = responseData.STREAM_DATA[i].PATH.split('?')[0];
            filteredPathString = filteredPathString.split('&')[0];
            responseData.STREAM_DATA[i].path = "https://img.youtube.com/vi/" + filteredPathString + "/hqdefault.jpg";
          }
          this.previousClasses.push(responseData.STREAM_DATA[i]);

        }
        if (responseData.STREAM_DATA.length < postData['r_count']) {
          this.continueScroll = false;
        }


      } else if (status == this._constantService.error_token) {
        this._constantService.clearUserInfo();
        this._router.navigate(['']);
        this.dataConf['type'] = 4;
        this.dataConf['msg'] = 'Session Expire';
        this.dataConf['error_msg'] = 'Session Expired';
      } else {
        this.dataConf['type'] = 2;
        this.dataConf['msg'] = 'STUDY24X7';
        this.dataConf['error_msg'] = responseData.ERROR_MSG;
      }
    }, error => {
      const responseData = error;
      if (responseData.status == 500) {
        this._router.navigate(['500']);
      }
    });
  }

  showAllPreviousClasses() {
    this.messageEvent.emit(false);

  }
  onScrollDown() {
    if (this.continueScroll && !this.fromLiveCompnent) {
      this.pageCount++;
      if (this.t) { this.getpreviousClassesDtl(); } else { this.getpreviousClassesDtlWthOtTkn(); }
    }
  }
  ngAfterViewInit() {
    this.checkScreenWidth();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth >= 992) {
      // const rightwidth = document.getElementById('sideThreeCol').offsetWidth;
      // const rightinnwidth = rightwidth - 15;
      // document.getElementById('leftsectionfixed').style.width = rightinnwidth + 'px';
      this.mobileView = false;
    } else {
      this.mobileView = true;
    }
  }
  private checkScreenWidth() {
    if (window.innerWidth >= 992) {
      // const rightwidth = document.getElementById('sideThreeCol').offsetWidth;
      // const rightinnwidth = rightwidth - 15;
      // document.getElementById('leftsectionfixed').style.width = rightinnwidth + 'px';
      // document.getElementById("someDivleft").style.width = rightinnwidth + "px";
      this.mobileView = false;
    } else {
      this.mobileView = true;
    }
  }
  onScroll(evt) {

    let secHeight: any;
    let secHeightcenter: any;
    if (document.getElementById('leftsectionfixed')) {
      secHeight = document.getElementById('leftsectionfixed').offsetHeight;
    }
    if (secHeightcenter = document.getElementById('centersection')) {
      secHeightcenter = document.getElementById('centersection').offsetHeight;
    }
    const innerWindHeight = window.innerHeight - 10;

    if (secHeightcenter > secHeight) {

      if (secHeight > innerWindHeight) {
        const topHeight = secHeight - innerWindHeight;
        this.changePos = secHeight - innerWindHeight;
        this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
        if (this.currPos >= this.changePos) {
          this.isScrolled = true;
          document.getElementById('leftsectionfixed').style.top = -topHeight + 'px';
        } else {
          this.isScrolled = false;
        }
      } else {
        const topHeight = secHeight - innerWindHeight;
        this.changePos = secHeight - innerWindHeight;
        this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
        if (this.currPos >= this.changePos) {
          this.isScrolled = true;
          document.getElementById('leftsectionfixed').style.top = 72 + 'px';
        } else {
          this.isScrolled = false;
        }

      }
    } else {
      this.isScrolled = false;
    }

  }
  leftSidemenu() {
    // this.leftFilterslidebg = !this.leftFilterslidebg;
    this.isMobileMenue = !this.isMobileMenue;
    if (this.isMobileMenue == true) {
      const body = document.getElementsByTagName('body')[0];
      body.classList.add('body-overflow');
    } else {
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('body-overflow');
    }
  }
  displayMobileMenu() {
    this.isMobileMenue = !this.isMobileMenue;
  }
  hideMobileMenu() {
    this.isMobileMenue = false;
  }
  play(previousClass, i) {
    this.timerStop = false;
    clearInterval(this.interval);
    this.playerContent = previousClass;
    if (!this.mobileView) {
      this.playPreviousClass = true;
    } else {
      this.view = i;
      if (previousClass.CONTENT_TYPE == 1) {
        this.playVideoFromBitmovin(previousClass);
      }
      else if (previousClass.CONTENT_TYPE == 4) {
        this.playInIframe(previousClass.PATH);
      }


    }
  }
  playInIframe(path) {
    path = path.replace('&t=', '?t=');
    this.iframeSource = "https://www.youtube.com/embed/" + path;

  }

  playVideoFromBitmovin(content) {
    content.vodPath = content.PATH + content.EXT_PATH;
    var arr = content.EXT_PATH.split('.');
    content.vodType = arr[arr.length - 1];
    if (this.player) {
      this.player = undefined;
    }
    setTimeout(() => {
      const config = {
        key: "41dc00ff-4da8-46a4-8aaa-2b753e8f74ce",
        analytics: {
          key: "41dc00ff-4da8-46a4-8aaa-2b753e8f74ce",
          videoId: content.STREAM_TITLE,
          title: content.STREAM_TITLE,
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

      var container = document.getElementById("player" + content.CONTENT_UUID);
      this.player = new bitmovin.player.Player(container, config);
      var source;
      if (content.EXT_PATH) {
        if (content.vodType == 'mp4') {
          source = {
            progressive: [
              {
                url: content.vodPath,
                type: "video/mp4",
                bitrate: 500000,
                label: "Low",
              },
              {
                url: content.vodPath,
                type: "video/mp4",
                bitrate: 1000000,
                label: "Mid",
                preferred: true,
              },
              {
                url: content.vodPath,
                type: "video/mp4",
                bitrate: 2500000,
                label: "High",
              },
            ],
          };
        } else {
          source = {
            hls: content.vodPath
          }
        }
      } else {
        source = {
          hls: this._constantService.videoCDNUrl + content.CONTENT_UUID + "_adaptive.m3u8"
        };
      }


      this.player.load(source).then(
        () => {
          console.log("Successfully created Bitmovin Player instance");
          this.timeToPlay = content.DEFAULT_VIEW_TIME * 60;
          this.count();
        },
        (reason) => {
          console.log(
            "Error while creating Bitmovin Player instance : " + reason
          );
        }
      );
    }, 500);
  }

  dismissPopUp() {
    this.dismissPopup = false;
  }

  redirectTo(pathname, routeData) {
    var endPoint;
    if (pathname == 'page') {
      endPoint = routeData.PAGE_NAME ? routeData.PAGE_NAME : routeData.PAGE_UUID;

    }
    if (pathname == 'course') {
      endPoint = routeData.COURSE_URL;

    }
    window.open('/' + pathname + '/' + endPoint);

  }

  count() {

    this.interval = setInterval(() => {

      if (this.timeToPlay >= 0) {
        this.countDisplay = Math.floor(this.timeToPlay / 60) + ':' + (this.timeToPlay % 60);
        this.timeToPlay--;
      }
      else {
        this.timerStop = true;
        clearInterval(this.interval);
      }

      if (this.player.getCurrentTime >= 120) {
        this.timerStop = true;
        this.player = undefined;
        this.timeToPlay = undefined;
      } else {
        this.timeToPlay = 120 - Math.floor(this.player.getCurrentTime());
      }

    }, 1000);


  }
  playerClicked(previousClass) {
    if (this.player) {
      var time = this.player.getCurrentTime();
      if (this.player.getCurrentTime() >= (previousClass.DEFAULT_VIEW_TIME * 60)) {
        this.timerStop = true;
        this.timeToPlay = 0;
      } else {
        this.timeToPlay = (previousClass.DEFAULT_VIEW_TIME * 60) - Math.floor(time);
      }

    }
  }

}
