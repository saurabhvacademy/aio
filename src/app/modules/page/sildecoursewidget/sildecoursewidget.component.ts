import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import {ConstantService} from './../../../services/constant.service';
import {EncryptionService} from './../../../services/encryption.service';
import {PostdataService} from './../../../services/postdata.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sildecoursewidget',
  templateUrl: './sildecoursewidget.component.html',
  styleUrls: ['./sildecoursewidget.component.scss','./../courseslider/courseslider.component.scss']
})
export class SildecoursewidgetComponent implements OnInit {
  @Input() pageId: string;
  cardDetail = [];
  @Input() cardPagePic: string;
  @Input() cardpagTitle: string;
  courseApiUrl;
  isShowWidget:boolean = false;
  constructor(
    public _constantService: ConstantService,
    private _encryptionServices: EncryptionService,
    private _router: Router,
    private postData: PostdataService
  ) { }

  ngOnInit() {

  }


  ngAfterViewInit(){
    setTimeout(()=>{
      this.getAllCourseDetail(1);
    },500);
  }


  getAllCourseDetail(count) {

    var AllCourseDetail = {}

    if(this._constantService.getSessionDataBYKey('token')){
      AllCourseDetail['token'] = this._constantService.getSessionDataBYKey('token');
      this.courseApiUrl = this._constantService.getAllCourseDetail();
      AllCourseDetail['token_param'] = {};
      AllCourseDetail['token_param']['device_type'] = 'w';
      AllCourseDetail['token_param']['host'] = '';
      AllCourseDetail['pg_uuid'] = this.pageId;
      AllCourseDetail['order'] = "";
      AllCourseDetail['cor_ty'] = "";
      AllCourseDetail['search_text'] = "";
      AllCourseDetail['levels'] = "";
      AllCourseDetail['lanids'] = "";
    }
    else{
      this.courseApiUrl = this._constantService.getCourseDetailWithoutTokenUrl();
    }
    AllCourseDetail['pg_uuid'] = this.pageId;
    AllCourseDetail['count'] = count;
    AllCourseDetail['r_count'] = "";

    this._constantService.fetchDataApi(this.courseApiUrl, AllCourseDetail).subscribe(data => {
      var responseData:any = data;
      var courseDetail = responseData.PAGE_COURSES;
      var status = responseData.STATUS;

      if (status == this._constantService.success_msg) {

        if(courseDetail.length < 4 && courseDetail.length  != 0){
          this.isShowWidget = true;
        }


        for (let i = 0; i < courseDetail.length; i++) {
          let courseCard = {};
          courseCard['COURSE_TITLE'] = this.postData.decodeURIPostData(courseDetail[i].COURSE_TITLE);
          courseCard['COURSE_RATING'] = courseDetail[i].COURSE_RATING;
          courseCard['RVALIDITY'] = courseDetail[i].RVALIDITY;
          courseCard['COURSE_TYPE'] = courseDetail[i].COURSE_TYPE;
          courseCard['SUBSCRIPTION'] = courseDetail[i].SUBSCRIPTION;
          courseCard['COURSE_URL'] = courseDetail[i].COURSE_URL;

          if(courseDetail[i].COVER_TYPE == 0){
            courseCard['COURSE_COVER_PHOTO_PATH'] = courseDetail[i].COURSE_COVER_PHOTO_PATH + 'cover/' + courseDetail[i].COURSE_UUID + '_1235x330.png';
          }
          else{
            courseCard['COURSE_COVER_PHOTO_PATH'] = courseDetail[i].COURSE_COVER_PHOTO_PATH;
          }

          if(courseDetail[i].COURSE_TYPE != 0){
            courseCard['COST'] = courseDetail[i].COURSE_PRICE[0].COST;
            courseCard['DISCOUNT_COST'] =courseDetail[i].COURSE_PRICE[0].DISCOUNT_COST;
          }
          else{
            courseCard['COST'] = 0;
            courseCard['DISCOUNT_COST'] = 0;
          }
          courseCard['TOTAL_COURSE_RATING_COUNT'] = courseDetail[i].TOTAL_COURSE_RATING_COUNT;

          if (courseDetail[i].TOTAL_ENROLLED_USER) {

            if (courseDetail[i].TRAIL_OFFSET) {
              courseCard['ENROLLMENT']= parseInt(courseDetail[i].TOTAL_ENROLLED_USER) + parseInt(courseDetail[i].TRAIL_OFFSET);
            }else{
              courseCard['ENROLLMENT']= parseInt(courseDetail[i].TOTAL_ENROLLED_USER);
            }
          } else {
            courseCard['ENROLLMENT'] = courseDetail[i].TRAIL_OFFSET ? courseDetail[i].TRAIL_OFFSET : 0;
          }

          this.cardDetail.push(courseCard);
        }
      }
    });
  }

  courseDetailRouter(COURSE_URL){
    this._router.navigate(['/course/' + COURSE_URL]);
  }

}
