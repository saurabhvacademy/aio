import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter, HostListener} from '@angular/core';
import {ConstantService} from './../../../services/constant.service';
import {EncryptionService} from './../../../services/encryption.service';
import {PostdataService} from './../../../services/postdata.service';
import {Router} from '@angular/router';

import * as $ from 'jquery';
@Component({
  selector: 'app-courseslider',
  templateUrl: './courseslider.component.html',
  styleUrls: ['./courseslider.component.scss'],
  host: {
    '(window:scroll)': 'onScroll($event)'
  }
})
export class CoursesliderComponent implements OnInit, AfterViewInit {
  @Input() pageId: string;
  @Input() cardPagePic: string;
  @Input() cardpagTitle: string;
  isShowWidget:boolean = false;
  config:any;
  cardDetail = [];
  pagesuggestion2 = [];
  isWebSlider:boolean=false;
  courseApiUrl;
  token;
  constructor(
    public _constantService: ConstantService,
    private _encryptionServices: EncryptionService,
    private _router: Router,
    private postData: PostdataService
  ) { }


  ngAfterViewInit(){
    setTimeout(()=>{
      this.getAllCourseDetail(1);
    },500);


    if (window.innerWidth > 991 ) {
      this.isWebSlider = true;
    }
    else{
      this.isWebSlider = false;
    }




  }



  ngOnInit() {
    this.token = this._constantService.getSessionDataBYKey('token');
     console.log("++++++++++++++++++++++++++++++++++course slider ++++++++++++++++++++++++++++++++++++++++++++++");
    $('.carousel.carousel-multi-item.v-2 .carousel-item').each(function(){
      var next = $(this).next();
      if (!next.length) {
        next = $(this).siblings(':first');
      }
      next.children(':first-child').clone().appendTo($(this));
      for (var i=0;i<4;i++) {
        next=next.next();
        if (!next.length) {
          next=$(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth > 991 ) {
      this.isWebSlider = true;
    }
    else{
      this.isWebSlider = false;
    }
  }



  getAllCourseDetail(count) {
    var AllCourseDetail = {}
    console.log("+++++++++++++++++++++++++++course slider ++++++++++++++++++++++++++++++++++");
    console.log( this.pageId);

    if(this._constantService.getSessionDataBYKey('token')){
      this.courseApiUrl = this._constantService.getAllCourseDetail();
      AllCourseDetail['token'] = this._constantService.getSessionDataBYKey('token');
      AllCourseDetail['token_param'] = {};
      AllCourseDetail['token_param']['device_type'] = 'w';
      AllCourseDetail['token_param']['host'] = '';
      AllCourseDetail['order'] = "";
      AllCourseDetail['cor_ty'] = "";
      AllCourseDetail['search_text'] = "";
      AllCourseDetail['levels'] = "";
      AllCourseDetail['lanids'] = "";
    }
    else{
      this.courseApiUrl = this._constantService.getCourseDetailWithoutTokenUrl();
    }
    AllCourseDetail['count'] = count;
    AllCourseDetail['pg_uuid'] = this.pageId;
    AllCourseDetail['r_count'] = "";

    this._constantService.fetchDataApi(this.courseApiUrl, AllCourseDetail).subscribe(data => {
      var responseData:any = data;
      var courseDetail = responseData.PAGE_COURSES;
      var status = responseData.STATUS;

      if (status == this._constantService.success_msg) {


        if(courseDetail.length >= 4){
          this.isShowWidget = true;
        }
        console.log(courseDetail);
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

        this.pushdatainto2dArray();
      }
    });
  }


  pushdatainto2dArray() {
    this.pagesuggestion2 = [];
    var count = 0;
    for (var k = 0; k < Math.ceil(this.cardDetail.length / 3); k++) {
      var arr = [];
      for (var l = 0; l < 3; l++) {
        if (this.cardDetail[count] != undefined) {
          arr.push(this.cardDetail[count]);
        }
        count++;
      }
      this.pagesuggestion2.push(arr);
    }
  }

  courseDetailRouter(COURSE_URL){
    this._router.navigate(['course/' + COURSE_URL]);
  }


  pageProfiletabWithoutTokenClick(){
    this._router.navigate(['/page/' + this.pageId + '/#Course']);
  }

}
