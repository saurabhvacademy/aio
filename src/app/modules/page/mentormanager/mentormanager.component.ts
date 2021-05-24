import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ConstantService} from './../../../services/constant.service';
import {PostdataService} from './../../../services/postdata.service';
import {EncryptionService} from './../../../services/encryption.service';

@Component({
    selector: 'app-mentormanager',
    templateUrl: './mentormanager.component.html',
    styleUrls: ['./../../mycourses/mycourses.component.scss', './../../courses/courses.component.scss', './../../profile/invitestreams/invitestreams.component.scss', './mentormanager.component.scss']
})
export class MentormanagerComponent implements OnInit {
    @Input() pageUid;
    pageId= this.pageUid;
    openConfirmation: boolean = false;
    dataConf;
    inviteCurrentStatus: any = '';
    liveClassInvites = [];
    isInvitepresent: boolean = false;
    startLoader2: boolean = true;
    livestreamTab=" ";
    remaindershow: boolean = false;
    walldropdown: boolean = false;
    walldrop: boolean = false;
    AllCourse: any[];
    AllMyCourse: any[];
    flag = 1;
    order: string = '';

    countAllCourse: number = 1;
    // visibilityText: string = "Filters";
    visibilityfilter: string = "All Courses";
    corsTyp: string = '';
    statusbtn;
  showDropStatus:boolean = true;
  mentorCourseList=[];
    constructor(
        private _constantService: ConstantService,
        private _postData: PostdataService,
        private _encryptData: EncryptionService,

        private _router: Router) {}

    ngOnInit() {
        this.getStreamList();
    }

    livestreamTabUrlFxn(index) {
      if(index == 0){
        this.livestreamTab = " ";
      }
      else{
        this.livestreamTab = index;
      }

        this.getStreamList();
    }


      showCourse(id){
        this._router.navigate(['/addcourse/' + id]);
      }

    statusButton(sectionIndex,contentIndex) {
      this.statusbtn = <any>(sectionIndex +"_"+ contentIndex);
     if(!document.getElementById(this.statusbtn).classList.contains("showStatus")){
        document.getElementById(this.statusbtn).classList.add("showStatus") ;

        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";
        hitObj['cntnt_uuid'] = this.mentorCourseList[sectionIndex].mentorCourseInnerList[contentIndex].CONTENT_UUID;

        this._constantService.fetchDataApi(this._constantService.getCourseCourseMentorStreamStatusUrl(), hitObj).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            let stremTrail = responseData.STREAM_TRAIL;

            if (status == "success") {

                 for (let i = 0; i < stremTrail.length; i++) {
                  stremTrail[i].USER_FULL_NAME = this._postData.decodeURIPostData(stremTrail[i].USER_FULL_NAME);
                  if(stremTrail[i].TEXT){
                    stremTrail[i].TEXT = this._postData.decodeURIPostData(stremTrail[i].TEXT);
                  }
                  else{
                    stremTrail[i].TEXT = "";
                  }

                  stremTrail[i].STATUS = this._postData.decodeURIPostData(stremTrail[i].STATUS);
                  stremTrail[i].STREAM_DATE = this.miliSecTodateConvertar(stremTrail[i].ADD_DATE_TIME);
                  this.mentorCourseList[sectionIndex]['mentorCourseInnerList'][contentIndex]['mentorStreamTrail'].push(stremTrail[i]);
                 }
            }
        });

      }
     else{
       document.getElementById(this.statusbtn).classList.remove("showStatus") ;
         this.mentorCourseList[sectionIndex]['mentorCourseInnerList'][contentIndex]['mentorStreamTrail'].length=0;
     }
     }






    showdrop(i,j) {
        let remaindershow = i+'-'+j;
        if(document.getElementById(remaindershow).classList.contains("hide")){
          document.getElementById(remaindershow).classList.remove("hide");

        }
        else{
          document.getElementById(remaindershow).classList.add("hide");
        }

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

    changeVisibility() {
        this.walldropdown = !this.walldropdown;
    }

    changeVisibilitySort() {
        this.walldrop = !this.walldrop;
    }

    getStreamList() {
        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";
        hitObj['count'] = 1;
        hitObj['pg_uuid'] = this.pageUid;
        hitObj['status'] = this.livestreamTab;
        hitObj['order'] = '';

        this._constantService.fetchDataApi(this._constantService.getAdminStreamCorsListServiceUrl(), hitObj).subscribe(data => {

            var responseData:any = data;
            var status = responseData.STATUS;
            this.mentorCourseList =  responseData.COURSE_STREAM;
            if (status == this._constantService.success_msg) {

                this.startLoader2 = false;
                 for (let i = 0; i < this.mentorCourseList.length; i++) {
                    this.mentorCourseList[i].COURSE_TITLE = this._postData.decodeURIPostData(this.mentorCourseList[i].COURSE_TITLE);
                    this.mentorCourseList[i].COURSE_UUID = this._postData.decodeURIPostData(this.mentorCourseList[i].COURSE_UUID);
                    this.mentorCourseList[i]['mentorCourseInnerList']=[];
                    this.showList(i)
                    // this.mentorCourseList[i]['mentorCourseInnerList']['mentordata']=[];
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
// ==================================toggle list function start ==============================================



showList(index){
  // let id = 'listNumber'+index;
  // let listId = document.getElementById(id);
  // if(listId.classList.contains("setHeight")){
  //    listId.classList.remove("setHeight");
     var hitObj = {};
     hitObj['token'] = this._constantService.getSessionDataBYKey('token');
     hitObj['token_param'] = {};
     hitObj['token_param']['device_type'] = "w";
     hitObj['token_param']['host'] = "";
     hitObj['cors_uuid'] = this.mentorCourseList[index].COURSE_UUID;
     hitObj['pg_uuid'] = this.pageUid;
     hitObj['status'] = '';

     this._constantService.fetchDataApi(this._constantService.getAdminStreamCorsInnerListServiceUrl(), hitObj).subscribe(data => {
         var responseData:any = data;
         var status = responseData.STATUS;
         let CourseInnerList =  responseData.COURSE_LIVE_STREAM;
         let MentorData = [];
         if (status == "success") {
              for (let i = 0; i < CourseInnerList.length; i++) {
                 CourseInnerList[i].CONTENT_UUID = this._postData.decodeURIPostData(CourseInnerList[i].CONTENT_UUID);
                 CourseInnerList[i].DESCRIPTION = this._postData.decodeURIPostData(CourseInnerList[i].DESCRIPTION);
                 // CourseInnerList[i].DURATION = this._postData.decodeURIPostData(CourseInnerList[i].DURATION);
                 CourseInnerList[i].LIVE_STREAM_TITLE = this._postData.decodeURIPostData(CourseInnerList[i].LIVE_STREAM_TITLE);
                 // CourseInnerList[i].START_TIME  = this._postData.decodeURIPostData(CourseInnerList[i].START_TIME);
                 CourseInnerList[i].STATUS = this._postData.decodeURIPostData(CourseInnerList[i].STATUS );
                 // CourseInnerList[i].STREAM_STATUS = this._postData.decodeURIPostData(CourseInnerList[i].STREAM_STATUS );

                 CourseInnerList[i].MENTOR_DATA.IMG_UPD_DT = this._postData.decodeURIPostData(CourseInnerList[i].MENTOR_DATA.IMG_UPD_DT);
                 CourseInnerList[i].MENTOR_DATA.PROFILE_PHOTO_PATH  = this._postData.decodeURIPostData(CourseInnerList[i].MENTOR_DATA.PROFILE_PHOTO_PATH);
                 CourseInnerList[i].MENTOR_DATA.USER_FULL_NAME = this._postData.decodeURIPostData(CourseInnerList[i].MENTOR_DATA.USER_FULL_NAME);
                 CourseInnerList[i].MENTOR_DATA.USER_ID = this._postData.decodeURIPostData(CourseInnerList[i].MENTOR_DATA.USER_ID);
                 CourseInnerList[i].MENTOR_DATA.USER_UUID = this._postData.decodeURIPostData(CourseInnerList[i].MENTOR_DATA.USER_UUID );
                 CourseInnerList[i].SETDATE = this.miliSecTodateConvertar(CourseInnerList[i].START_TIME);

                 CourseInnerList[i].SETDURATION = this.setTime(CourseInnerList[i].START_TIME,CourseInnerList[i].DURATION);
                 CourseInnerList[i]['timer']=[];
                 CourseInnerList[i]['timer'].day ='00';
                 CourseInnerList[i]['timer'].hr ='00';
                 CourseInnerList[i]['timer'].min = '00';
                 CourseInnerList[i]['mentorStreamTrail'] = [];
                 this.mentorCourseList[index]['mentorCourseInnerList'].push(CourseInnerList[i]);
                 this.setCount(index, i, CourseInnerList[i].START_TIME);
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
  // }
  // else{
  //   listId.classList.add("setHeight");
  //    this.mentorCourseList[index]['mentorCourseInnerList'].length = 0;
  // }
}
// =================================toggle list function end===============================================

// ==============================counter function start=====================================

setCount(sectionIndex, contentIndex, duration){
  let courseStartTime = new Date(duration);
  var countDownDate = new Date(courseStartTime).getTime();
  // Update the count down every 1 second
  var x = setInterval( ()=> {
  // Get today's date and time
  var now = new Date().getTime();
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  // Output the result in an element with id="demo"

  if(this.mentorCourseList[sectionIndex] &&  this.mentorCourseList[sectionIndex]['mentorCourseInnerList'][contentIndex]){
    this.mentorCourseList[sectionIndex]['mentorCourseInnerList'][contentIndex].timer.day  = days;
    this.mentorCourseList[sectionIndex]['mentorCourseInnerList'][contentIndex].timer.min = minutes;
    this.mentorCourseList[sectionIndex]['mentorCourseInnerList'][contentIndex].timer.hr =  hours;
  }
  else{
    clearInterval(x);

  }
  // If the count down is over, write some text
  if (distance < 0) {
  clearInterval(x);
  this.mentorCourseList[sectionIndex]['mentorCourseInnerList'][contentIndex].timer.day  = 0;
  this.mentorCourseList[sectionIndex]['mentorCourseInnerList'][contentIndex].timer.min = 0;
  this.mentorCourseList[sectionIndex]['mentorCourseInnerList'][contentIndex].timer.hr =  0;
}
}, 1000);
}
// ==============================counter function end ======================================

//======================= milisec to date converter function start===============================
miliSecTodateConvertar(milliseconds) {

  let todayDate = new Date(milliseconds);
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  console.log(todayDate);
  let getTodayDate = todayDate.getDate();
  let getTodayMonth =  todayDate.getMonth()+1;

  let getTodayFullYear = todayDate.getFullYear();
  let getCurrentHours = todayDate.getHours();
  let getCurrentMinutes = todayDate.getMinutes();
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  console.log(getTodayDate);
  let month;
  switch(getTodayMonth){
    case 1: month = "Jan";
    break;
    case 2: month = "Feb";
    break;
    case 3: month = "Mar";
    break;
    case 4: month = "Apr";
    break;
    case 5: month = "May";
    break;
    case 6: month = "June";
    break;
    case 7: month = "July";
    break;
    case 8: month = "Aug";
    break;
    case 9: month = "Sep";
    break;
    case 10: month = "Oct";
    break;
    case 11: month = "Nov";
    break;
    case 12: month = "Dec";
    break;
  }
  let getCurrentAmPm = getCurrentHours >= 12 ? 'PM' : 'AM';
  getCurrentHours = getCurrentHours % 12;
  getCurrentHours = getCurrentHours ? getCurrentHours : 12;
  getCurrentMinutes = getCurrentMinutes < 10 ? 0 + getCurrentMinutes : getCurrentMinutes;
  let getCurrentDateTime = getTodayDate + ' ' + month + ','+ ' ' + getTodayFullYear;
  return getCurrentDateTime;
}
//======================= milisec to date converter function end===============================

//======================= set duration function start==========================================

  setTime(milliseconds, duration ) {
    let todayDate = new Date(milliseconds);
    let getTodayDate = todayDate.getDay();
    let getCurrentHours = todayDate.getHours();
    let getCurrentMinutes = todayDate.getMinutes();
    let getCurrentAmPm = getCurrentHours >= 12 ? 'PM' : 'AM';
    getCurrentHours = getCurrentHours % 12;
    getCurrentHours = getCurrentHours ? getCurrentHours : 12;
    getCurrentMinutes = getCurrentMinutes < 10 ? 0 + getCurrentMinutes : getCurrentMinutes;
    let getCurrentDateTime =  getCurrentHours + ':' + getCurrentMinutes + ' ' + getCurrentAmPm + "-" + this.setDuration(milliseconds, duration);
    return getCurrentDateTime;
  }


  setDuration(milli, duration) {
    let milliseconds = milli + (duration * 60 * 1000);
    let todayDate = new Date(milliseconds);
    let getTodayDate = todayDate.getDay();
    let getCurrentHours = todayDate.getHours();
    let getCurrentMinutes = todayDate.getMinutes();
    let getCurrentAmPm = getCurrentHours >= 12 ? 'PM' : 'AM';
    getCurrentHours = getCurrentHours % 12;
    getCurrentHours = getCurrentHours ? getCurrentHours : 12;
    getCurrentMinutes = getCurrentMinutes < 10 ? 0 + getCurrentMinutes : getCurrentMinutes;
    let getCurrentDateTime =  getCurrentHours + ':' + getCurrentMinutes + ' ' + getCurrentAmPm  ;
    return getCurrentDateTime;
  }

//======================= set duration function end==========================================
}
