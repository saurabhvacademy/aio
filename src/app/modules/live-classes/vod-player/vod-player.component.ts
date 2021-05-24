import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ConstantService } from 'src/app/services/constant.service';
import { PostdataService } from './../../../services/postdata.service';

declare const bitmovin: any;
declare var $: any;


@Component({
  selector: 'app-vod-player',
  templateUrl: './vod-player.component.html',
  styleUrls: ['./vod-player.component.scss']
})
export class VodPlayerComponent implements OnInit {
  @Input() content: any = {};
  @Output() emitter = new EventEmitter();
  countDisplay: any;
  timerStop: boolean;
  vodContent: any;
  player: any;
  timeToPlay: any;


  constructor(
    public postData: PostdataService,
    private _constentService:ConstantService

  ) { }

  ngOnInit(): void {
    this.vodContent = this.content;
    console.log(this.content, "content");
    this.content.COURSE_TITLE = this.postData.decodeURIPostData(this.content.COURSE_TITLE);
    this.content.courseURL = this.content.COURSE_TITLE.toLowerCase().replace(' ', '-') + '-' + this.content.COURSE_ID;
    
    var script = document.createElement("script");

    script.src = "https://cdn.bitmovin.com/player/web/8.15.0/bitmovinplayer.js";
    document.getElementsByTagName("head")[0].appendChild(script);
    if (this.content.CONTENT_TYPE == 1) {
      var arr = this.content.EXT_PATH.split('.');
    this.content.vodType = arr[arr.length - 1];
    this.content.vodPath = this.content.PATH + this.content.EXT_PATH;
      this.playVideoFromBitmovin();
    }
    else if (this.content.CONTENT_TYPE == 4) {
      this.playInIframe(this.content.PATH);
    }

  }

  playInIframe(path) {
    path=path.replace('&t=','?t=');
    this.content.iframeSource = '';
    this.content.iframeSource = "https://www.youtube.com/embed/" + path;
    this._constentService.getDataApi(this._constentService.getYoutubeVedeoDataUrl().replace('VIDEO_URL','https://youtu.be/'+path)).subscribe(data=>{
      console.log(data);
    })

  }

  playVideoFromBitmovin() {

    setTimeout(() => {
      const config = {
        key: "41dc00ff-4da8-46a4-8aaa-2b753e8f74ce",
        analytics: {
          key: "41dc00ff-4da8-46a4-8aaa-2b753e8f74ce",
          videoId: this.content.content_title,
          title: this.content.content_title,
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

      var container = document.getElementById("player" + this.content.CONTENT_UUID);
      const player = new bitmovin.player.Player(container, config);
      var source;
      if (this.content.vodType == 'mp4') {
        source = {
          progressive: [
            {
              url: this.content.vodPath,
              type: "video/mp4",
              bitrate: 500000,
              label: "Low",
            },
            {
              url: this.content.vodPath,
              type: "video/mp4",
              bitrate: 1000000,
              label: "Mid",
              preferred: true,
            },
            {
              url: this.content.vodPath,
              type: "video/mp4",
              bitrate: 2500000,
              label: "High",
            },
          ],
        };
      } else if (this.content.vodType == "m3u8") {
        source = {
          hls: this.content.vodPath
        };
      }


      player.load(source).then(
        () => {
          console.log("Successfully created Bitmovin Player instance");
          this.count();
          this.timeToPlay = this.content.DEFAULT_VIEW_TIME * 60;
          this.player = player;
        },
        (reason) => {
          console.log(
            "Error while creating Bitmovin Player instance : " + reason
          );
        }
      );
    }, 50);
  }

  close() {
    this.emitter.emit('close');
  }
  count() {

    setTimeout(() => {
      var n = this.timeToPlay;
      this.countDisplay = Math.floor(n / 60) + ':' + (n % 60);
      n--;
      if (n >= 0) {
        this.count();
      }
      else {
        this.timerStop = true;
      }
      this.timeToPlay = n;
    }, 1000);


  }

  playerClicked() {
    if (this.player) {
      var time = this.player.getCurrentTime();
      if (this.player.getCurrentTime() >= (this.content.DEFAULT_VIEW_TIME * 60)) {
        this.timerStop = true;
        this.timeToPlay = 0;
      } else {
        this.timeToPlay = (this.content.DEFAULT_VIEW_TIME * 60) - Math.floor(time);
      }

    }
  }

}
