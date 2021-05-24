import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { ConstantService } from "./../../../services/constant.service";
import { EncryptionService } from "./../../../services/encryption.service";
import { PostdataService } from "./../../../services/postdata.service";
import * as S3 from "aws-sdk/clients/s3";


@Component({
  selector: "app-invitestreams",
  host: {
    "(document:click)": "handleClick($event)",
  },
  templateUrl: "./invitestreams.component.html",
  styleUrls: [
    "./../../mycourses/mycourses.component.scss",
    "./../../courses/courses.component.scss",
    "./invitestreams.component.scss",
  ],
})
export class InvitestreamsComponent implements OnInit {
  inviteCurrentStatus: any = "";
  liveClassInvites = [];
  liveClassInviteInnerList = [];
  isInvitepresent: boolean = false;
  startLoader2: boolean = true;
  @ViewChild("dropDownButton", { read: ElementRef })
  streamCardDropDown: ElementRef;
  @ViewChild("dropDownList", { read: ElementRef })
  streamCardDropDownList: ElementRef;
  livestreamTab: number = 1;
  remaindershow: number = 0;
  walldropdown: boolean = false;
  walldrop: boolean = false;
  AllCourse: any[];
  AllMyCourse: any[];
  openConfirmation: boolean = false;
  flag = 1;
  order: string = "";
  countAllCourse: number = 1;
  visibilityText: string = "Filters";
  visibilityfilter: string = "All Pages";
  corsTyp: string = "";
  dataConf = {};
  coursePresent;
  walldropdownMlt: boolean = false;
  visibilityTextMlt: string = "Select reason";
  filterType;

  /*******************************************************************************
  ********************************************************************************
  3 Mentorship Accepted
  2 menu dote timer
  1 aceept and decline stream button
  5 Start Stream
  4 Mentorship Declined
  ********************************************************************************
  *******************************************************************************/
  liveStreamFooter: number = -1;
  isDropDownOpen: boolean = true;
  isReportPopUp: boolean = false;
  report_input_option: boolean = false;
  reportText: string = "";
  setPopUpData = {};
  sameTimeStreamArray = [];
  isMergePopup: boolean = false;
  showDeclinebox = "";
  progressStart: boolean;
  fileupldinprcss: boolean;
  progress: number;
  fileUpload: boolean;
  uploadPercent: any={};
  disableStartStream: boolean;
  constructor(
    public _constantService: ConstantService,
    public _encrypt: EncryptionService,
    private _postService: PostdataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getMentorInvites();
  }



  handleClick(event) {
    if (this.isDropDownOpen == true) {
      if (event.target.name == "menuIcon") {
        this.isDropDownOpen = false;
      } else {
        this.remaindershow = 0;
      }
    } else {
      this.isDropDownOpen = true;
      this.remaindershow = 0;
    }
  }

  livestreamTabUrlFxn(index) {
    if (index == 1) {
      this.inviteCurrentStatus = "";
      // this.filterType = "";
    } else if (index == 2) {
      this.inviteCurrentStatus = "1";
      // this.filterType = 1;
    } else if (index == 0) {
      this.inviteCurrentStatus = "0";
      // this.filterType = 0;/
    }
   
    this.livestreamTab = index;
  }

  showdrop(sectionId, contentId) {
    let id = sectionId + "_" + contentId;
    this.remaindershow = <any>id;
  }

  closewalldropdown() {
    this.walldropdown = false;
  }

  showwalldropdown() {
    this.walldropdown = !this.walldropdown;
    if (this.walldropdown == false) {
      this.closewalldropdown();
    }
  }

  closewalldrop() {
    this.walldrop = false;
  }

  showwalldrop() {
    this.walldrop = !this.walldrop;
    if (this.walldrop == false) {
      this.closewalldrop();
    }
  }

  changeVisibility(id) {
    this.walldropdown = !this.walldropdown;
  }

  changeVisibilitySort(id) {
    this.walldrop = !this.walldrop;
  }

  findSameTime = 0;
  getMentorInvites() {
    var data = {};
    data["token"] = this._constantService.getSessionDataBYKey("token");
    data["token_param"] = {};
    data["token_param"]["device_type"] = "w";
    data["token_param"]["host"] = "";
    data["count"] = 1;
    data["r_count"] = 15;
    data["pg_uuid"] = "";
    data["order"] = "desc";
    data["status"] = this.inviteCurrentStatus;

    this._constantService
      .fetchDataApi(this._constantService.getMentorStreamListServiceUrl(), data)
      .subscribe((data) => {
        var responseData: any = data;
        var status = responseData.STATUS;

        if (status == this._constantService.success_msg) {
          this.startLoader2 = false;
          this.isInvitepresent = true;
          this.liveClassInvites = responseData.COURSE_STREAM;
          var resp = JSON.parse(JSON.stringify(this.liveClassInvites));
          for (var i = 0; i < this.liveClassInvites.length; i++) {
            this.liveClassInvites[
              i
            ].COURSE_TITLE = this._postService.decodeURIPostData(
              this.liveClassInvites[i].COURSE_TITLE
            );
            this.liveClassInvites[
              i
            ].PAGE_TITLE = this._postService.decodeURIPostData(
              this.liveClassInvites[i].PAGE_TITLE
            );
            this.liveClassInvites[
              i
            ].STREAM_DESCRIPTION = this._postService.decodeURIPostData(
              this.liveClassInvites[i].STREAM_DESCRIPTION
            );

            if (this.liveClassInvites[i].PAGE_PROFILE_PHOTO_PATH != null) {
              this.liveClassInvites[i].PAGE_PROFILE_PHOTO_PATH =
                this.liveClassInvites[i].PAGE_PROFILE_PHOTO_PATH +
                "profile/" +
                this.liveClassInvites[i].PAGE_UUID +
                "_150x150.png";
            } else {
              if (this.liveClassInvites[i].PAGE_TYPE == 0) {
                this.liveClassInvites[i].PAGE_PROFILE_PHOTO_PATH =
                  this.liveClassInvites[i].PAGE_PROFILE_PHOTO_PATH ||
                  this._constantService.defaultPageIndImgPath;
              } else {
                this.liveClassInvites[i].PAGE_PROFILE_PHOTO_PATH =
                  this.liveClassInvites[i].PAGE_PROFILE_PHOTO_PATH ||
                  this._constantService.defaultPageCollgImgPath;
              }
            }

            if (this.liveClassInvites[i].COURSE_COVER_PHOTO_PATH != null) {
              if (this.liveClassInvites[i].COVER_TYPE == "0") {
                this.liveClassInvites[i].COURSE_COVER_PHOTO_PATH =
                  this.liveClassInvites[i].COURSE_COVER_PHOTO_PATH +
                  "cover/" +
                  this.liveClassInvites[i].COURSE_UUID +
                  "_1235x330.png";
              }
            } else {
              this.liveClassInvites[
                i
              ].COURSE_COVER_PHOTO_PATH = this._constantService.defaultCoverImgPath;
            }
            if (this.liveClassInvites[i].STATUS == 1) {
              this.liveClassInvites[i]["FOOTERTYPE"] = 1;
            } else {
              this.liveClassInvites[i]["FOOTERTYPE"] = 3;
            }
            this.liveClassInvites[i]["liveClassInviteInnerList"] = [];
            var liveClassInviteInnerList = this.liveClassInvites[i].LIVE_STREAM;

            for (var j = 0; j < liveClassInviteInnerList.length; j++) {
              if (liveClassInviteInnerList[j].STATUS == 1) {
                this.setCount(
                  i,
                  j,
                  this._postService.decodeURIPostData(
                    liveClassInviteInnerList[j].START_TIME
                  )
                );
              }
              liveClassInviteInnerList[j]["DURATION_IN_MILISEC"] =
                liveClassInviteInnerList[j].DURATION;
              liveClassInviteInnerList[
                j
              ].DESCRIPTION = this._postService.decodeURIPostData(
                liveClassInviteInnerList[j].DESCRIPTION
              );
             
              liveClassInviteInnerList[j].END_TIME = (liveClassInviteInnerList[j].DURATION*60*1000)+liveClassInviteInnerList[j].START_TIME;
              liveClassInviteInnerList[
                j
              ].LIVE_STREAM_TITLE = this._postService.decodeURIPostData(
                liveClassInviteInnerList[j].LIVE_STREAM_TITLE
              );
              liveClassInviteInnerList[j]["START_TIME_IN_MILISEC"] =
                liveClassInviteInnerList[j].START_TIME;

             
              liveClassInviteInnerList[
                j
              ].STATUS = this._postService.decodeURIPostData(
                liveClassInviteInnerList[j].STATUS
              );
              liveClassInviteInnerList[j].STREAM_STATUS =
                liveClassInviteInnerList[j].STREAM_STATUS;

              liveClassInviteInnerList[j].MULTIPLE_STREAM_STATUS = 1;

              if (liveClassInviteInnerList[j].STATUS == 0) {
                for (let m = 0; m < resp.length; m++) {
                  for (let n = 0; n < resp[m].LIVE_STREAM.length; n++) {
                    console.log(
                      liveClassInviteInnerList[j]["DURATION_IN_MILISEC"]
                    );
                    if (
                      liveClassInviteInnerList[j]["START_TIME_IN_MILISEC"] ==
                        resp[m].LIVE_STREAM[n].START_TIME &&
                      liveClassInviteInnerList[j]["DURATION_IN_MILISEC"] ==
                        resp[m].LIVE_STREAM[n].DURATION
                    ) {
                      if (this.findSameTime >= 1) {
                        liveClassInviteInnerList[j][
                          "MULTIPLE_STREAM_STATUS"
                        ] = 5;
                      }
                      this.findSameTime = this.findSameTime + 1;
                    }
                  }
                }
              }

              this.findSameTime = 0;

              liveClassInviteInnerList[j]["timer"] = [];
              liveClassInviteInnerList[j]["timer"].day = "00";
              liveClassInviteInnerList[j]["timer"].hr = "00";
              liveClassInviteInnerList[j]["timer"].min = "00";
              this.liveClassInvites[i]["liveClassInviteInnerList"].push(
                liveClassInviteInnerList[j]
              );
              if (liveClassInviteInnerList[j].DURATION <= 600000) {
                this.liveStreamFooter = 5;
              }
            }
          }
          this.createTimeBasedFilter();
          console.log(this.liveClassInvites);
        }
      });
  }

  createTimeBasedFilter() {
    for (var i = 0; i < this.liveClassInvites.length; i++) {}
  }

  updLiveStreamStatus(sectionindex, contentindex, response) {
    var data = {};
    if (this.setPopUpData["type"]) {
      data["typ_id"] = this.setPopUpData["type"];
    } else {
      data["typ_id"] = "";
    }
    if (this.reportText != "") {
      data["text"] = this.reportText;
    } else {
      data["text"] = "";
    }
    data["token"] = this._constantService.getSessionDataBYKey("token");
    data["token_param"] = {};
    data["token_param"]["device_type"] = "w";
    data["token_param"]["host"] = "";
    data["cors_uuid"] = this.liveClassInvites[sectionindex].COURSE_UUID;
    data["cntnt_uuid"] = this.liveClassInvites[sectionindex][
      "liveClassInviteInnerList"
    ][contentindex].CONTENT_UUID;
    data["status"] = response;

    this._constantService
      .fetchDataApi(
        this._constantService.getUpdateLiveStreamStatusServiceUrl(),
        data
      )
      .subscribe((data) => {
        var responseData: any = data;
        var status = responseData.STATUS;

        if (status == this._constantService.success_msg) {
          if (response == 2) {
            this.liveClassInvites[sectionindex]["liveClassInviteInnerList"][
              contentindex
            ].STATUS = 2;
          } else if (response == 1) {
            this.liveClassInvites[sectionindex]["liveClassInviteInnerList"][
              contentindex
            ].STATUS = 1;
            this.setCount(
              sectionindex,
              contentindex,
              this.liveClassInvites[sectionindex]["liveClassInviteInnerList"][
                contentindex
              ].START_TIME_IN_MILISEC
            );
          }
          this.hideReportPopup();
        } else {
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "STUDY24X7";
          this.dataConf["error_msg"] = responseData.ERROR_MSG;
          this.openConfirmation = true;
          return false;
        }
      });
  }

  // find simlar time course list fun
  sameStream = [];
  PROCESS_TYPE = 0;
  secondTym = false;
  STREAMING_ID;
  findSameTimeStream(sectionIndex, contentIndex, CONTENT_UUID) {
    this.secondTym = false;
    var data = {};
    data["token"] = this._constantService.getSessionDataBYKey("token");
    data["token_param"] = {};
    data["token_param"]["device_type"] = "w";
    data["token_param"]["host"] = "";
    data["cntnt_uuid"] = CONTENT_UUID;
    this._constantService
      .fetchDataApi(
        this._constantService.getMentorSameTimeStreamListServiceUrl(),
        data
      )
      .subscribe((data) => {
        var responseData: any = data;
        this.sameStream = responseData.COURSE_STREAM;
        var status = responseData.STATUS;
        if (status == this._constantService.success_msg) {
          for (let i = 0; i < this.sameStream.length; i++) {
            this.sameStream[
              i
            ].COURSE_TITLE = this._postService.decodeURIPostData(
              this.sameStream[i].COURSE_TITLE
            );
            this.sameStream[i].PAGE_TITLE = this._postService.decodeURIPostData(
              this.sameStream[i].PAGE_TITLE
            );
            if (this.sameStream[i].PAGE_PROFILE_PHOTO_PATH != null) {
              this.sameStream[i].PAGE_PROFILE_PHOTO_PATH =
                this.sameStream[i].PAGE_PROFILE_PHOTO_PATH +
                "profile/" +
                this.sameStream[i].PAGE_UUID +
                "_150x150.png";
            } else {
              if (this.sameStream[i].PAGE_TYPE == 0) {
                this.sameStream[i].PAGE_PROFILE_PHOTO_PATH =
                  this.sameStream[i].PAGE_PROFILE_PHOTO_PATH ||
                  this._constantService.defaultPageIndImgPath;
              } else {
                this.sameStream[i].PAGE_PROFILE_PHOTO_PATH =
                  this.sameStream[i].PAGE_PROFILE_PHOTO_PATH ||
                  this._constantService.defaultPageCollgImgPath;
              }
            }
            this.sameStream[i]["sameStreamInnerList"] = [];
            this.sameStream[i]["sameStreamInnerList"] = this.sameStream[
              i
            ].LIVE_STREAM;

            for (
              let j = 0;
              j < this.sameStream[i]["sameStreamInnerList"].length;
              j++
            ) {
              this.sameStream[i].sameStreamInnerList[
                j
              ].DESCRIPTION = this._postService.decodeURIPostData(
                this.sameStream[i].sameStreamInnerList[j].DESCRIPTION
              );
              this.sameStream[i].sameStreamInnerList[
                j
              ].LIVE_STREAM_TITLE = this._postService.decodeURIPostData(
                this.sameStream[i].sameStreamInnerList[j].LIVE_STREAM_TITLE
              );
              this.sameStream[i].sameStreamInnerList[j].DURATION = this.setTime(
                this.sameStream[i].sameStreamInnerList[j].START_TIME,
                this.sameStream[i].sameStreamInnerList[j].DURATION
              );
              this.sameStream[i].sameStreamInnerList[
                j
              ].START_TIME = this.miliSecTodateConvertar(
                this.sameStream[i].sameStreamInnerList[j].START_TIME
              );
              this.sameStream[i].sameStreamInnerList[j].BUTTON_STATUS = 0;
              this.sameStream[i].sameStreamInnerList[
                j
              ].isReasonDropdoen = false;
              this.sameStream[i].sameStreamInnerList[j].visibilityTextMlt =
                "Select reason";
              this.sameStream[i].sameStreamInnerList[j].PROCESS = 0;

              if (this.sameStream[i].sameStreamInnerList[j].STATUS == 1) {
                this.secondTym = true;
              }

              if (
                this.secondTym &&
                this.sameStream[i].sameStreamInnerList[j].STATUS == 0
              ) {
                this.sameStream[i].sameStreamInnerList[j]["new"] = true;
                this.sameStream[i].sameStreamInnerList[j].STREAMING_ID = "";
              } else {
                this.sameStream[i].sameStreamInnerList[j]["new"] = false;
                if (this.sameStream[i].sameStreamInnerList[j].STATUS == 1) {
                  this.STREAMING_ID = this.sameStream[i].sameStreamInnerList[
                    j
                  ].STREAMING_ID = this.sameStream[i].sameStreamInnerList[
                    j
                  ].STREAMING_ID;
                } else {
                  this.sameStream[i].sameStreamInnerList[j].STREAMING_ID = "";
                }
              }

              if (this.sameStream[i].sameStreamInnerList[j].STATUS == 0) {
                this.sameStream[i].sameStreamInnerList[j].PROCESS = 1;
              }
            }
          }
        }
      });
  }

  // find simlar time course list fun
  changeVisibilityMlt(id, i, j) {
    this.walldropdownMlt = false;
    if (id == 2) {
      this.sameStream[i].sameStreamInnerList[j].visibilityTextMlt =
        "I am unavailable on that day";
    } else if (id == 3) {
      this.sameStream[i].sameStreamInnerList[j].visibilityTextMlt =
        "I have health issues";
    } else if (id == 4) {
      this.sameStream[i].sameStreamInnerList[j].visibilityTextMlt =
        "Have no relation with this page";
    } else {
      this.sameStream[i].sameStreamInnerList[j].visibilityTextMlt =
        "Select reason";
    }
  }

  liveStreamDone() {
    let streamData = [];
    let data = {};
    for (let i = 0; i < this.sameStream.length; i++) {
      for (let j = 0; j < this.sameStream[i].sameStreamInnerList.length; j++) {
        let stream = {};
        stream["cntnt_uuid"] = this.sameStream[i].sameStreamInnerList[
          j
        ].CONTENT_UUID;

        if (this.sameStream[i].sameStreamInnerList[j].STATUS == 0) {
          stream["status"] = 2;
        } else {
          stream["status"] = this.sameStream[i].sameStreamInnerList[j].STATUS;
          stream["typ_id"] = "";
        }

        if (
          this.sameStream[i].sameStreamInnerList[j].STATUS == 2 ||
          this.sameStream[i].sameStreamInnerList[j].STATUS == 0
        ) {
          switch (this.sameStream[i].sameStreamInnerList[j].visibilityTextMlt) {
            case "I am unavailable on that day":
              stream["typ_id"] = 2;
              break;
            case "I have health issues":
              stream["typ_id"] = 3;
              break;
            case " Have no relation with this page":
              stream["typ_id"] = 4;
            default:
              stream["typ_id"] = 1;
          }
        }
        stream["text"] = "";
        stream["cors_uuid"] = this.sameStream[i].sameStreamInnerList[
          j
        ].COURSE_UUID;
        streamData.push(stream);
      }
    }

    data["token"] = this._constantService.getSessionDataBYKey("token");
    data["token_param"] = {};
    data["token_param"]["device_type"] = "w";
    data["token_param"]["host"] = "";
    data["streams"] = streamData;
    if (this.secondTym) {
      data["stream_id"] = this.STREAMING_ID;
    } else {
      data["stream_id"] = "";
    }
    this._constantService
      .fetchDataApi(this._constantService.setInviteMultipleStreamUrl(), data)
      .subscribe((data) => {
        let responseData: any = data;
        let status = responseData.STATUS;
        if (status == this._constantService.success_msg) {
          this.ngOnInit();
          this.isMergePopup = false;
        } else {
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "STUDY24X7";
          this.dataConf["error_msg"] = responseData.ERROR_MSG;
          this.openConfirmation = true;
          return false;
        }
      });
  }

  nextProcessStream() {
    this.PROCESS_TYPE = 1;
  }
  backProcessStream() {
    this.PROCESS_TYPE = 0;
  }
  showDeclineListBox(i, j) {
    this.sameStream[i].sameStreamInnerList[j].STATUS = 2;
    this.sameStream[i].sameStreamInnerList[j].isReasonDropdoen = true;
    this.sameStream[i].sameStreamInnerList[j].BUTTON_STATUS = 2;
  }

  hideDeclineListBox(i, j) {
    this.sameStream[i].sameStreamInnerList[j].isReasonDropdoen = false;
    this.sameStream[i].sameStreamInnerList[j].BUTTON_STATUS = 0;
    this.sameStream[i].sameStreamInnerList[j].STATUS = 0;
  }

  streamCheckBox(event, i, j) {
    if (event.target.checked) {
      this.sameStream[i].sameStreamInnerList[j].STATUS = 1;
    } else {
      this.sameStream[i].sameStreamInnerList[j].STATUS = 0;
    }
  }

  inviteDropDown(sectionIndex, courseUuid) {
    
    var data = {};
    data["token"] = this._constantService.getSessionDataBYKey("token");
    data["token_param"] = {};
    data["token_param"]["device_type"] = "w";
    data["token_param"]["host"] = "";
    data["status"] = "";
    data["cors_uuid"] = courseUuid;

    this._constantService
      .fetchDataApi(
        this._constantService.getMentorStreamCourseDetailListServiceUrl(),
        data
      )
      .subscribe((data) => {
        var responseData: any = data;
        var status = responseData.STATUS;
        if (status == this._constantService.success_msg) {
          var liveClassInviteInnerList = responseData.COURSE_LIVE_STREAM;
          this.liveClassInvites[sectionIndex]["liveClassInviteInnerList"] = [];
          for (var i = 0; i < liveClassInviteInnerList.length; i++) {
            if (liveClassInviteInnerList[i].STATUS == 1) {
              this.setCount(
                sectionIndex,
                i,
                this._postService.decodeURIPostData(
                  liveClassInviteInnerList[i].START_TIME
                )
              );
            }

            liveClassInviteInnerList[
              i
            ].DESCRIPTION = this._postService.decodeURIPostData(
              liveClassInviteInnerList[i].DESCRIPTION
            );
            liveClassInviteInnerList[i].DURATION = this.setTime(
              liveClassInviteInnerList[i].START_TIME,
              liveClassInviteInnerList[i].DURATION
            );
            liveClassInviteInnerList[
              i
            ].LIVE_STREAM_TITLE = this._postService.decodeURIPostData(
              liveClassInviteInnerList[i].LIVE_STREAM_TITLE
            );
            liveClassInviteInnerList[i].START_TIME_IN_MILISEC =
              liveClassInviteInnerList[i].START_TIME;
            liveClassInviteInnerList[
              i
            ].START_TIME = this.miliSecTodateConvertar(
              liveClassInviteInnerList[i].START_TIME
            );
            liveClassInviteInnerList[
              i
            ].STATUS = this._postService.decodeURIPostData(
              liveClassInviteInnerList[i].STATUS
            );
            liveClassInviteInnerList[
              i
            ].STREAM_STATUS = this._postService.decodeURIPostData(
              liveClassInviteInnerList[i].STREAM_STATUS
            );
            liveClassInviteInnerList[i]["timer"] = [];
            liveClassInviteInnerList[i]["timer"].day = "00";
            liveClassInviteInnerList[i]["timer"].hr = "00";
            liveClassInviteInnerList[i]["timer"].min = "00";
            this.liveClassInvites[sectionIndex][
              "liveClassInviteInnerList"
            ].push(liveClassInviteInnerList[i]);
            if (liveClassInviteInnerList[i].DURATION <= 600000) {
              this.liveStreamFooter = 5;
            }
          }
        }
      });
  
  }

  miliSecTodateConvertar(milliseconds) {
    let todayDate = new Date(milliseconds);
    let getTodayDate = todayDate.getDate();
    let getTodayMonth = todayDate.getMonth() + 1;
    let getTodayFullYear = todayDate.getFullYear();
    let getCurrentHours = todayDate.getHours();
    let getCurrentMinutes = todayDate.getMinutes();
    let month;
    switch (getTodayMonth) {
      case 1:
        month = "Jan";
        break;
      case 2:
        month = "Feb";
        break;
      case 3:
        month = "Mar";
        break;
      case 4:
        month = "Apr";
        break;
      case 5:
        month = "May";
        break;
      case 6:
        month = "June";
        break;
      case 7:
        month = "July";
        break;
      case 8:
        month = "Aug";
        break;
      case 9:
        month = "Sep";
        break;
      case 10:
        month = "Oct";
        break;
      case 11:
        month = "Nov";
        break;
      case 12:
        month = "Dec";
        break;
    }
    let getCurrentAmPm = getCurrentHours >= 12 ? "PM" : "AM";
    getCurrentHours = getCurrentHours % 12;
    getCurrentHours = getCurrentHours ? getCurrentHours : 12;
    getCurrentMinutes =
      getCurrentMinutes < 10 ? 0 + getCurrentMinutes : getCurrentMinutes;
    let getCurrentDateTime =
      getTodayDate + " " + month + "," + " " + getTodayFullYear;
    return getCurrentDateTime;
  }

  setTime(milliseconds, duration) {
    let todayDate = new Date(milliseconds);
    let getTodayDate = todayDate.getDay();
    let getCurrentHours = todayDate.getHours();
    let getCurrentMinutes = todayDate.getMinutes();
    let getCurrentAmPm = getCurrentHours >= 12 ? "PM" : "AM";
    getCurrentHours = getCurrentHours % 12;
    getCurrentHours = getCurrentHours ? getCurrentHours : 12;
    getCurrentMinutes =
      getCurrentMinutes < 10 ? 0 + getCurrentMinutes : getCurrentMinutes;
    let getCurrentDateTime =
      getCurrentHours +
      ":" +
      getCurrentMinutes +
      " " +
      getCurrentAmPm +
      "-" +
      this.setDuration(milliseconds, duration);
    return getCurrentDateTime;
  }

  setDuration(milli, duration) {
    let milliseconds = milli + duration * 60 * 1000;
    let todayDate = new Date(milliseconds);
    let getTodayDate = todayDate.getDay();
    let getCurrentHours = todayDate.getHours();
    let getCurrentMinutes = todayDate.getMinutes();
    let getCurrentAmPm = getCurrentHours >= 12 ? "PM" : "AM";
    getCurrentHours = getCurrentHours % 12;
    getCurrentHours = getCurrentHours ? getCurrentHours : 12;
    getCurrentMinutes =
      getCurrentMinutes < 10 ? 0 + getCurrentMinutes : getCurrentMinutes;
    let getCurrentDateTime =
      getCurrentHours + ":" + getCurrentMinutes + " " + getCurrentAmPm;
    return getCurrentDateTime;
  }

  // ==============================counter function start=====================================
  setCount(sectionIndex, contentIndex, duration) {
    let sectionid = sectionIndex;
    let contentid = contentIndex;
    let courseStartTime = new Date(duration);
    var countDownDate = new Date(courseStartTime).getTime();

    // Update the count down every 1 second
    var x = setInterval(() => {
      // Get today's date and time
      var now = new Date().getTime();
      // Find the distance between now and the count down date
      var distance = countDownDate - now;
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      // Output the result in an element with id="demo"

      if (
        this.liveClassInvites[sectionid] &&
        this.liveClassInvites[sectionid]["liveClassInviteInnerList"][contentid]
      ) {
        this.liveClassInvites[sectionid]["liveClassInviteInnerList"][
          contentid
        ].timer.day = days;
        this.liveClassInvites[sectionid]["liveClassInviteInnerList"][
          contentid
        ].timer.min = minutes;
        this.liveClassInvites[sectionid]["liveClassInviteInnerList"][
          contentid
        ].timer.hr = hours;
      } else {
        clearInterval(x);
      }
      // If the count down is over, write some text
      if (distance < 0) {
        this.liveClassInvites[sectionid]["liveClassInviteInnerList"][
          contentid
        ].STREAM_STATUS = 1;
        clearInterval(x);
      }
    }, 1000);
  }
  // ==============================counter function end ======================================

  // ================================show report popup ======================================

  showReportPopup(sectionId, contentId) {
    console.log("showReportPopup");
    this.isReportPopUp = true;
    this.setPopUpData["sectionIndex"] = sectionId;
    this.setPopUpData["contentIndex"] = contentId;
    this.setPopUpData["DESCRIPTION"] = this.liveClassInvites[sectionId][
      "liveClassInviteInnerList"
    ][contentId].DESCRIPTION;
    this.setPopUpData["DURATION"] = this.liveClassInvites[sectionId][
      "liveClassInviteInnerList"
    ][contentId].DURATION;
    this.setPopUpData["LIVE_STREAM_TITLE"] = this.liveClassInvites[sectionId][
      "liveClassInviteInnerList"
    ][contentId].LIVE_STREAM_TITLE;
    this.setPopUpData["START_TIME"] = this.liveClassInvites[sectionId][
      "liveClassInviteInnerList"
    ][contentId].START_TIME;
    this.setPopUpData["LIVE_STREAM_TITLE"] = this.liveClassInvites[sectionId][
      "liveClassInviteInnerList"
    ][contentId].LIVE_STREAM_TITLE;
  }

  hideReportPopup() {
    this.isReportPopUp = false;
  }

  hide_option(sectionId, contentId, index) {
    if (index == 6) {
      this.report_input_option = true;
    } else {
      this.report_input_option = false;
      this.reportText = "";
    }
    this.setPopUpData["type"] = index;
  }

  streamDemo(stream) {
    if(stream.IS_UPLD==1)
    this.router.navigate(["/vod-mentorstream/" + stream.CONTENT_UUID]);
    else this.router.navigate(["/mentorstream/"+stream.CONTENT_UUID]);
  }

  multiplecoursepopup(sectionIndex, contentIndex, status, uid) {
    this.findSameTimeStream(sectionIndex, contentIndex, uid);
    this.isMergePopup = !this.isMergePopup;
  }

  hidemultiplecoursepopup() {
    this.isMergePopup = false;
  }

  showwalldropdownMlt(i, j) {
    let id = "streamDeclineList_" + i + "_" + j;
    console.log(document.getElementById(id).classList.contains("showList"));
    if (document.getElementById(id).classList.contains("showList")) {
      document.getElementById(id).classList.remove("showList");
    } else {
      document.getElementById(id).classList.add("showList");
    }
    this.walldropdownMlt = !this.walldropdownMlt;
    // if (this.walldropdownMlt == false) {
    //   this.closewalldropdownMlt();
    // }
  }

  closewalldropdownMlt(i, j) {
    this.walldropdownMlt = false;
    let id = "streamDeclineList_" + i + "_" + j;
    document.getElementById(id).classList.remove("showList");
  }

  // showwalldropdownMlt() {
  //   this.walldropdownMlt = !this.walldropdownMlt;
  //   if (this.walldropdownMlt == false) {
  //     this.closewalldropdownMlt();
  //   }
  // }

  openReasonDD(index) {
    for (let i = 0; i < this.sameTimeStreamArray.length; i++) {
      if (i == index) {
        this.sameTimeStreamArray[i]["isReasonDropdown"] = !this
          .sameTimeStreamArray[i]["isReasonDropdown"];
      } else {
        this.sameTimeStreamArray[i]["isReasonDropdown"] = false;
      }
    }
  }


  async uploadContent(event, invitation) {
    this.disableStartStream=true;
    this.uploadPercent[invitation.CONTENT_UUID]={};
    this.uploadPercent[invitation.CONTENT_UUID]["uploading"]=true;
    var typ="lec";
    var file = event.target.files[0];
    var fileType = file.name.split(".");
     if (fileType[fileType.length - 1] == "mp4" && typ == "lec") {
      var size = file.size / 1000 / 1000;
      if (size > 3000) {
        this.dataConf["msg"] = "STUDY24X7";
        this.dataConf["type"] = 2;
        this.dataConf["error_msg"] = "File above 3gb is not allowed";
        this.openConfirmation = true;
      } else {
        await this.getDurationOfMp4Video(file, invitation,size); 
      }
    } else {
      this.dataConf["msg"] = "STUDY24X7";
      this.dataConf["type"] = 2;
      this.dataConf["error_msg"] = "File not supported";
      this.openConfirmation = true;
    }
  }

  getDurationOfMp4Video(file, invitation,size) {
    return new Promise((resolve, reject) => {
      console.log(file);
      var video = document.createElement("video");
      video.preload = "metadata";
      var duration;
      var error = setTimeout(() => {
        resolve(
        );
      }, 3000);
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        clearTimeout(error);
        resolve(
          duration = video.duration.toString()
        );
        this.uploadVod(file,invitation,video.duration.toString(),size);
      };

      video.src = URL.createObjectURL(file);
    });
  }

  uploadVod(file,invitation,duration,size){   
                var folderName;
                if (invitation.FOLDER_NAME != "") {
                  folderName = invitation.FOLDER_NAME + "/";
                } else {
                  folderName = "";
                }
                var typeFormat;
               
                  typeFormat = ".mp4";
                var bucket = new S3(this._constantService.awsKey);
                var params = {
                  Bucket: invitation.BUCKET_NAME,
                  Key: folderName + invitation.CONTENT_UUID + typeFormat,
                  Body: file,
                  ContentType: "",
                  ACL: "public-read",
                };

                var upload_obj = bucket.upload(params, function (err, data) {
                  if (err) {
                    this.progressStart = false;
                    this.fileupldinprcss = true;
                    this.disableStartStream = false;
                   
                    this.dataConf["type"] = 2;
                    this.dataConf["msg"] = "Error";
                    this.dataConf["error_msg"] =
                      "Failed to upload file due to internal error";
                    this.openConfirmation = true;
                    return false;
                  } else {
                  }
                });
                var percentDone = 0;

                let refreshInterval = setInterval(() => {
                  var isOnline = window.navigator.onLine;
                  if (isOnline) {
                    // this._constantService.showToast("","",2);
                  } else {
                    this._constantService.showToast("Net connection lost","",2);

                    console.log("offline");
                  }
                  
                }, 3000);

                upload_obj.on("httpUploadProgress", (progress) => {
                  var done = progress.loaded;
                  var total = progress.total;
                  percentDone =Math.floor( (done / total) * 100);
                  let progresscount = 1 - percentDone / 100;   
                  this.uploadPercent[invitation.CONTENT_UUID]['percent']=percentDone+'%';
                });

                upload_obj.promise().then((data) => {
                  this.disableStartStream = false;
                  this.callSuccessFulUploadApi(invitation,size,duration);
                  clearInterval(refreshInterval);
                });
             
            
  }

  callSuccessFulUploadApi(invitation,size,duration) {
    var uploadsuccessData = {};
    uploadsuccessData[
      "token"
    ] = this._constantService.getSessionDataBYKey("token");
    uploadsuccessData["token_param"] = {};
    uploadsuccessData["token_param"]["device_type"] = "w";
    uploadsuccessData["token_param"]["host"] = "";
    uploadsuccessData["cntnt_uuid"] = invitation.CONTENT_UUID;
    uploadsuccessData["pg_uuid"] = invitation.PAGE_UUID;
    uploadsuccessData["type"] = 7;
    uploadsuccessData["fsize"]=size;
    uploadsuccessData["duration"]=duration;


    this._constantService
      .fetchDataApi(
        this._constantService.getCourseUploadSuccessfulServiceUrl(),
        uploadsuccessData
      )
      .subscribe((data) => {
        var responseData2: any = data;
        var status = responseData2.STATUS;
        if (status == this._constantService.success_msg) {
          this.uploadPercent[invitation.CONTENT_UUID]["percent"]='100%';
          this.disableStartStream == false;
          this.progressStart = false;
          this.fileupldinprcss = true;
          this.progress = 100;
          setTimeout(() => {
            this.fileUpload = false;
            this.progress = 0;
          }, 3000);
        } else {
          this.progressStart = false;
          this.fileupldinprcss = true;
          setTimeout(() => {
            
          }, 3000);
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "Error";
          this.dataConf["error_msg"] = responseData2.ERROR_MSG;
          this.openConfirmation = true;
          return false;
        }
      });
  }
}
