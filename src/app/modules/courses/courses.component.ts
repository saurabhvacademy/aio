import {Component, OnInit, Output, Input, EventEmitter, HostListener, AfterViewChecked} from '@angular/core';
import {ConstantService} from './../../services/constant.service';
import {EncryptionService} from './../../services/encryption.service';
import {PostdataService} from './../../services/postdata.service';
import {Router} from '@angular/router';
import {ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  setTime:any;
  startLoader2: boolean = true;
  dataConf: any;
  openConfirmation: boolean;
  cardClickedIndex: any;
  EmptyState: boolean = false;
  EmptyState1: boolean = false;
  startLoader: boolean = true;
  showDays: boolean = false;
  DraftCorsTyp = '';
  DraftOrder = '';
  corsTyp = '';
  order: string = '';
  languageList = [];
  myProfile: boolean;
  continueAllScroll: boolean = false;
  addClass: string;
  courseStatus: boolean = false;
  show_rating: boolean;
  count = 1;
  validity: any;
  AllCourse = [];
  is_admin: boolean = false;
  tab1: boolean = true;
  hiderp: boolean = true;
  enrllcourses = [];
  notshowImage: boolean = true;
  courses = [];
  rpsign: boolean = true;
  hideCose: boolean = false;
  profile_pic_path: string;
  profilepic = [];
  discount_cost = [];
  cost = [];
  courselist = [];
  detalsshow_var: number = 8;
  courseTabAdmin = 1;
  @Input() user_type: number;
  @Input() pageId: string;
  @Input() pageTitle: string;
  @Input() profilePicPath: any;
  @Output() courseprofileTab = new EventEmitter<number>();
  coursedertailData;
  courseList = [];
  courseTyp: number;
  courseOrder: string;
  courseSearch: string = "";
  lstCourseId = 0;
  currData = [];
  continueScroll: boolean = true;
  flowId = 1;
  timer = null;
  showcourse_details: boolean = false;
  coursedetailstrue: boolean = true;
  courseTab = 1;
  courseSearchButtonStatus = false;
  filtershortcourse: boolean = false;
  corsId: any;
  pgData = {};
  walldropdown: boolean = false;
  walldrop: boolean = false;
  visibilityText: string = "Sort by";
  visibilityfilter: string = "Filter";
  visibilityTyp = 3;
  coursePrice: any;
  courseDiscountedPrice: any;
  savepagepopup: boolean = false;
  saveCondition: boolean = false;
  courseSavedData: any[];

  istoken:boolean=true;
  token:any;
  courseDataWithoutToken=[];
  preloaderWithoutToken:boolean = true;
  page_uuid;
  page_uuidWithouttoken;
  cardevent: boolean = false;
  hidemessage: boolean = false;
  constructor(public _router: Router,
    public _constantService: ConstantService,
    private _encrypt: EncryptionService,
    public _encryptionService: EncryptionService,
    private activatedRoute: ActivatedRoute,
    private postData: PostdataService
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if(window.innerWidth <= 992){
      this.cardevent = true;
      // document.getElementById("pointerone").style.pointerEvents = "none";
    }else{
    this.cardevent = false;
    // document.getElementById("pointerone").style.pointerEvents = "auto";
  }
}
private checkScreenWidth() {
  if(window.innerWidth <= 992){
    this.cardevent = true;
    // document.getElementById("pointerone").style.pointerEvents = "none";
  }else{
  this.cardevent = false;
  // document.getElementById("pointerone").style.pointerEvents = "auto";
}
}
ngAfterViewChecked(){
  this.checkScreenWidth();
}
closeConfirmPopupFn(){
  this.hidemessage = !this.hidemessage;
}
ngOnInit() {

  this.token = this._constantService.getSessionDataBYKey('token');

  if (this.token && this.token != 'undefined'){

    this.istoken = false;
    if (this.user_type == 0 && this.courseTab == 1) {
      setTimeout(() => this.getAllCourseDetail(this.lstCourseId), 500);
    }
    window.scrollTo(0, 0);
    this.getCurrency();
    if (this.user_type == 1 && this.courseTabAdmin == 1) {

      setTimeout(() => this.getAllCourseDetail(1), 500);
    }
    this.getAllLanguage();

  }

  else{
    this.activatedRoute.params.subscribe((params: Params) => {
      this.pageId = params['tabid'];
      this.getpgAboutPublic(this.pageId);
    })
    this.getAllLanguage();
    this.istoken = true;


  }
}
getpgAboutPublic(paramsId) {
  var publicdetails = {};
  publicdetails['pg_uuid'] = paramsId;
  this._constantService.fetchDataApi(this._constantService.getpgDetailPublic(), publicdetails).subscribe(data => {
    var responseData:any = data;
    var status = responseData.STATUS;
    if (status == this._constantService.success_msg) {
      if (responseData.PAGE_ABOUT.PAGE_UUID != null) {
        this.page_uuid = responseData.PAGE_ABOUT.PAGE_UUID;
        console.log(this.page_uuidWithouttoken);
        setTimeout(()=>{
          this.getCoureCardDetailsWithoutToken();
        },300);
      }

    }});
  }


  getCoureCardDetailsWithoutToken(){
    var host={};
    host['pg_uuid'] = this.page_uuid;
    host['r_count']= '';
    host['count'] = '1';

    this._constantService.fetchDataApi(this._constantService.getCourseDetailWithoutTokenUrl(), host).subscribe(data => {

      var responseData:any = data;
      var status = responseData.STATUS;
      if (status == 'success') {
        this.preloaderWithoutToken = false;


        this.courseDataWithoutToken = responseData.PAGE_COURSES;
        for (let i = 0; i < this.courseDataWithoutToken.length; i++) {
          this.courseDataWithoutToken[i].COURSE_TITLE = this.postData.decodeURIPostData(this.courseDataWithoutToken[i].COURSE_TITLE);
          this.courseDataWithoutToken[i].DESCRIPTION =this.postData.decodeURIPostData(this.courseDataWithoutToken[i].DESCRIPTION);
          this.courseDataWithoutToken[i].COURSE_TAGS =this.postData.decodeURIPostData(this.courseDataWithoutToken[i].COURSE_TAGS);

          if(this.courseDataWithoutToken[i].COVER_TYPE == 0){
            this.courseDataWithoutToken[i].COURSE_COVER_PHOTO_PATH = this.courseDataWithoutToken[i].COURSE_COVER_PHOTO_PATH + 'cover/' + this.courseDataWithoutToken[i].COURSE_UUID + '_1235x330.png';
          }

          if (this.courseDataWithoutToken[i].LANGUAGE != null && this.courseDataWithoutToken[i].LANGUAGE != undefined) {
            for (var j = 0; j < this.languageList.length; j++) {
              if (this.courseDataWithoutToken[i].LANGUAGE == this.languageList[j].LANGUAGE_ID)
              this.courseDataWithoutToken[i].LANGUAGE = this.languageList[j].LANGUAGE;
            }
          }
        }

      }

    })

  }

  goToCourseWithoutToken(courseUrl){
    this._router.navigate(['course/'+courseUrl]);

  }

  showwalldropdown() {
    this.walldropdown = !this.walldropdown;
  }
  showwalldrop() {
    this.walldrop = !this.walldrop;
  }
  closeDrop() {
    this.walldrop = false;
  }
  closewalldrop() {

    this.walldrop = false;
  }

  closewalldropdown() {
    this.walldropdown = false;
  }

  //    courseTabClick(index) {
  //        this.courseSearch = '';
  //        this.courseTab = index;
  //        if (this.courseTab == 2) {
  //            this.tab1 = false;
  //            this.getEnrolledCourses(0);
  //        }
  //        if (this.courseTab == 1) {
  //            this.tab1 = false;
  //            this.getAllCourseDetail(0);
  //        }
  //        if (this.courseTab == 3) {
  //            this.tab1 = false;
  //            this.getPurchasedCourses(0);
  //        }
  //    }


  shortcourse() {
    if (this.filtershortcourse == false) {
      this.filtershortcourse = true;
    }
    else {
      this.filtershortcourse = false;
    }
  }
  courseSearchIconClick() {
    //alert(this.searchButtonStatus);
    this.courseSearchButtonStatus = !this.courseSearchButtonStatus;
    if (this.courseSearchButtonStatus == true) {
      document.getElementById("courseSearch").focus();
    }
  }
  course_detail_show() {
    if (this.showcourse_details == false) {
      this.courseprofileTab.emit(this.detalsshow_var);
      this.showcourse_details = true;
      this.coursedetailstrue = false;
    } else {
      this.showcourse_details = false;
      this.coursedetailstrue = true;
    }

  }

  getCurrency() {
    var currency = {};
    currency['token'] = this._constantService.getSessionDataBYKey('token');
    currency['token_param'] = {};
    currency['token_param']['device_type'] = 'w';
    currency['token_param']['host'] = '';

    this._constantService.fetchDataApi(this._constantService.getCurrencyServiceUrl(), currency).subscribe(data => {
      var responseData:any = data;
      var status = responseData.STATUS;
      if (status == 'success') {
        this.currData = responseData.CURRENCY_DATA;
      }
    }, error => {
      var responseData = error;
      if (responseData.status == 500) {
        this._router.navigate(['500']);
      }
    });
  }

  updateSavedStatus(event) {
    //this.saveCondition = true;
    if (this.saveCondition == true) {
    this.AllCourse[this.cardClickedIndex].SAVED = 1;
  }
}

updateUnSavedStatus() {
  // this.saveCondition = false;
  if (this.saveCondition == false) {
  this.AllCourse[this.cardClickedIndex].SAVED = 0;
}
}

saveCourse(courseData, index) {
  if (courseData.SAVED == 0) {
    this.savepagepopup = !this.savepagepopup;
    let body = document.getElementsByTagName('body')[0];
    body.classList.add("body-overflow");
    this.courseSavedData = courseData;
    this.courseSavedData['PAGE_TITLE'] = this.pageTitle
    this.courseSavedData['PAGE_PROFILE_PHOTO_PATH'] = this.profilePicPath;
    this.courseSavedData['TYPE'] = 7;
    this.cardClickedIndex = index;
  } else {
    this.cardClickedIndex = index;
    this.putCourseUnsaved(courseData);
  }
}


putCourseUnsaved(courseData) {
  var updatePostUnsaved = {};
  updatePostUnsaved['token'] = this._constantService.getSessionDataBYKey('token');
  updatePostUnsaved['token_param'] = {};
  updatePostUnsaved['token_param']['device_type'] = 'w';
  updatePostUnsaved['token_param']['host'] = '';
  updatePostUnsaved['sfldid'] = courseData.SAVED_POST_FLD_ID;
  updatePostUnsaved['pid'] = courseData.USER_POST_ID;

  this._constantService.fetchDataApi(this._constantService.putUserPostUnsaved(), updatePostUnsaved).subscribe(data => {
    var responseData:any = data;
    var status = responseData.STATUS;
    if (status == this._constantService.success_msg) {
      this._constantService.showToast("Unsaved successfully","Post","1");

      this.saveCondition = false;
      this.updateUnSavedStatus();
      //                    var herf = this.router.u                rl;
      //                    var urlArr = herf.split("/                ");
      //                    if (urlArr[1] == "saved"                ) {
      //                        setTimeout(() =                > {
      //                            var count = (document.getElementById(this.savedFolderId + "_count"                ));
      //                            if (count != null                ) {
      //                                if (parseInt(count.innerHTML) == 1                ) {
      //                                    count.style.display = 'non                e';
      //                                    count.innerHTML = (parseInt(count.innerHTML) - 1).toString                ();
      //                                } els                e {
      //                                    count.innerHTML = (parseInt(count.innerHTML) - 1).toString                ();
      //                                                }
      //                                            }
      //                        }, 1                00)
      //                        this._ref.destroy                ();
      //                    }

      this._constantService.callEmptyStateMethod();
    } else if (status == this._constantService.error_token) {
      this.dataConf['type'] = 4;
      this.dataConf['msg'] = "Session Expire";
      this.dataConf['error_msg'] = "Session Expired";
      this.openConfirmation = true;
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


onScrollDown() {
  if (this.continueAllScroll && this.courseTabAdmin == 1 && this.count != 1) {
    // this.count = this.count +1
    this.getAllCourseDetail(this.count);
  }
  if (this.continueScroll && this.courseTabAdmin == 2 && this.count != 1) {
    this.getDraftCourses(this.flowId);
  }

}

searchKey(event) {
  this.count = 1;

  clearTimeout(this.setTime);

  this.setTime = setTimeout(() => {
    if (this.courseTabAdmin == 1) {
      this.getAllCourseDetail(1);
    }
    if (this.courseTabAdmin == 2) {
      this.getDraftCourses(1);
    }
  }, 2000)
}


courseTabAdminClick(id) {
  this.courseTabAdmin = id;
  this.courseSearch = '';
  this.order = '';
  this.corsTyp = '';
  this.DraftOrder = '';
  this.DraftCorsTyp = '';
  this.courseList = [];
  //this.AllCourse = [];
  if (this.courseTabAdmin == 2) {
  this.visibilityText = 'sort By';
  this.visibilityfilter = 'Filter';

  this.getDraftCourses(1);

}
if (this.courseTabAdmin == 1) {
  this.visibilityText = 'Sort By';
  this.visibilityfilter = 'Filter';

  this.getAllCourseDetail(1);

}
}


courseDetail(event, i) {
  this.pgData['corsId'] = this.courseList[i].COURSE_UUID;
  this.pgData['pageId'] = this.pageId;
  this.showcourse_details = true;
}

changeVisibility(id) {
  this.AllCourse = [];
  this.count = 1;
  if (id == 2) {
    this.visibilityText = 'A-Z';
    // this.visibilityTyp = 2;
    this.order = 'atoz';

  } else if (id == 3) {
    this.visibilityText = 'Z-A';
    //this.visibilityTyp = 1;
    this.order = 'ztoa';

  }
  this.closewalldropdown();
  this.getAllCourseDetail(this.count);
}
changeVisibilitySort(id) {
  this.count = 1;
  this.AllCourse = [];
  if (id == 3) {
    this.visibilityfilter = 'All';
    //this.visibilityTyp = 3;
    this.corsTyp = '';
  } else if (id == 2) {
    this.visibilityfilter = 'Free';
    // this.visibilityTyp = 2;
    this.corsTyp = '0';
  } else if (id == 1) {
    this.visibilityfilter = 'Paid';
    // this.visibilityTyp = 1;
    this.corsTyp = '1';

  }
  this.closewalldropdown();
  this.getAllCourseDetail(this.count);
}
changeVisibilityDraft(id) {
  this.courseList = [];
  this.count = 1;
  this.flowId = 1;
  if (id == 2) {
    this.visibilityText = 'A-Z';
    //this.visibilityTyp = 2;
    this.DraftOrder = 'atoz';

  } else if (id == 1) {
    this.visibilityText = 'Z-A';
    //this.visibilityTyp = 1;
    this.DraftOrder = 'ztoa';

  }

  this.getDraftCourses(1);
}
changeVisibilitySortDraft(id) {
  this.count = 1;
  this.flowId = 1;
  this.courseList = [];
  if (id == 3) {
    this.visibilityfilter = 'Filter';
    //this.visibilityTyp = 3;
    this.DraftCorsTyp = '';
  } else if (id == 2) {
    this.visibilityfilter = 'Free';
    //this.visibilityTyp = 2;
    this.DraftCorsTyp = '0';
  } else if (id == 1) {
    this.visibilityfilter = 'Paid';
    //this.visibilityTyp = 1;
    this.DraftCorsTyp = '1';

  }
  this.getDraftCourses(1);
}

getAllCourseDetail(count) {
  this.startLoader2 = true;
  this.startLoader = true;

  var AllCourseDetail = {}
  AllCourseDetail['token'] = this._constantService.getSessionDataBYKey('token');
  AllCourseDetail['token_param'] = {};
  AllCourseDetail['token_param']['device_type'] = 'w';
  AllCourseDetail['token_param']['host'] = '';
  AllCourseDetail['count'] = this.count;
  AllCourseDetail['r_count'] = "";
  AllCourseDetail['pg_uuid'] = this.pageId;
  AllCourseDetail['order'] = this.order;
  AllCourseDetail['cor_ty'] = this.corsTyp;
  AllCourseDetail['search_text'] = this.courseSearch;
  AllCourseDetail['levels'] = "";
  AllCourseDetail['lanids'] = "";

  this._constantService.fetchDataApi(this._constantService.getAllCourseDetail(), AllCourseDetail).subscribe(data => {
    var responseData:any = data;
    var status = responseData.STATUS;
    if (status == this._constantService.success_msg) {
      //this.courseSearch = '';
      this.startLoader = false;
      this.startLoader2 = false;

      var admin = responseData.IS_ADMIN;
      var cor_data;
      if (this.count == 1) {
        this.AllCourse = [];
        cor_data = [];
      }
      cor_data = responseData.PAGE_COURSES;
      if (admin == 1) {
        this.is_admin = true;
      }
      if (cor_data.length > 9) {
        this.continueAllScroll = true;
        this.count++;
      } else {
        this.continueAllScroll = false;
      }
      for (var i = 0; i < cor_data.length; i++) {



        if(cor_data[i].COURSE_TAGS){
          cor_data[i].COURSE_TAGS = this.postData.decodeURIPostData(cor_data[i].COURSE_TAGS);
        }

        if (cor_data[i].LANGUAGE != null && cor_data[i].LANGUAGE != undefined) {
          for (var j = 0; j < this.languageList.length; j++) {
            if (cor_data[i].LANGUAGE == this.languageList[j].LANGUAGE_ID)
            cor_data[i].LANGUAGE = this.languageList[j].LANGUAGE;
          }
        }
        if (cor_data[i].COURSE_TITLE != null) {
          cor_data[i].COURSE_TITLE = this.postData.decodeURIPostData(cor_data[i].COURSE_TITLE);
        }
        else {
          cor_data[i].COURSE_TITLE = '';
        }
        if (cor_data[i].DESCRIPTION != null) {
          cor_data[i].DESCRIPTION = this.postData.decodeURIPostData(cor_data[i].DESCRIPTION);
        } else {
          cor_data[i].DESCRIPTION = '';
        }
        if (cor_data[i].ENROLLED_ADD_DATE_TIME != null && cor_data[i].ENROLLED_ADD_DATE_TIME != '') {
          cor_data[i].ENROLLED_ADD_DATE_TIME = this.postData.getPostDateTime(cor_data[i].ENROLLED_ADD_DATE_TIME);
        } else {
          cor_data[i].PUBLISH_DATE_TIME = this.postData.getPostDateTime(cor_data[i].ADD_DATE_TIME);
        }
        if (cor_data[i].UPDATE_DATE_TIME != null && cor_data[i].UPDATE_DATE_TIME != '') {
          //                        cor_data[i].UPDATE_DATE_TIME = this.postData.getPostDateTime(cor_data[i].UPDATE_DATE_TIME);
        } else {
        //                        cor_data[i].UPDATE_DATE_TIME = this.postData.getPostDateTime(cor_data[i].ADD_DATE_TIME);
      }
      if (cor_data[i].ADD_DATE_TIME != null && cor_data[i].ADD_DATE_TIME != '') {
        cor_data[i].ADD_DATE_TIME = this.postData.getPostDateTime(cor_data[i].ADD_DATE_TIME);
      } else {
        cor_data[i].ADD_DATE_TIME = this.postData.getPostDateTime(cor_data[i].PUBLISH_DATE_TIME);
      }

      if (cor_data[i].COURSE_COVER_PHOTO_PATH != null) {
        if (cor_data[i].COVER_TYPE == 0) {
          cor_data[i].COURSE_COVER_PHOTO_PATH = cor_data[i].COURSE_COVER_PHOTO_PATH + "cover/" + cor_data[i].COURSE_UUID + '_1235x330.png';
        } else {
          cor_data[i].COURSE_COVER_PHOTO_PATH = cor_data[i].COURSE_COVER_PHOTO_PATH;
        }
      } else {
        cor_data[i].COURSE_COVER_PHOTO_PATH = this._constantService.defaultCoverImgPath;
      }

      if (cor_data[i]['PUBLISH_DATE_TIME'] != null) {
        cor_data[i]['PUBLISH_DATE_TIME'];
      } else {cor_data[i]['PUBLISH_DATE_TIME'] = ''}
      if (cor_data[i].COURSE_TYPE == 1) {
        var cost = cor_data[i].COURSE_PRICE;
        if (cor_data[i].COURSE_PRICE == null || cor_data[i].COURSE_PRICE == "null" || cor_data[i].COURSE_PRICE == "") {
          cor_data[i].DISCOUNT_COST = "FREE";
        } else {
          for (var j = 0; j < cost.length; j++) {
            if (cost[j].DISCOUNT_COST != '' && cost[j].DISCOUNT_COST != null) {
              cor_data[i].DISCOUNT_COST = cost[j].DISCOUNT_COST;
            } else {
              cor_data[i].DISCOUNT_COST = '';
            } if (cost[j].COST != '' && cost[j].COST != null) {
              cor_data[i].COST = cost[j].COST;
            } else {this.hideCose = false;}
            if (cost[j].COST == 0 && cost[j].DISCOUNT_COST == 0) {this.hiderp = false}
          }
          //this.coursePrice = cor_data[i]['COURSE_PRICE']['0']['COST'];
          //this.courseDiscountedPrice = cor_data[i]['COURSE_PRICE']['0']['DISCOUNT_COST'];
        }
      } else {
        cor_data[i].DISCOUNT_COST = "FREE";
        this.hiderp = false;
        this.rpsign = false;
      }
      if (cor_data[i].PUBLISH == 1 || cor_data[i].PUBLISH == 5) {
        this.show_rating = true;
      }
      if (cor_data[i]['TOTAL_ENROLLED_USER'] != null) {
        if (cor_data[i]['RECENT_ENROLLED'] != undefined) {
          if (cor_data[i]['RECENT_ENROLLED'][0] != '' && cor_data[i]['RECENT_ENROLLED'][0] != null && cor_data[i]['RECENT_ENROLLED'][0] != undefined) {
            cor_data[i].ENROLLED1 = cor_data[i]['RECENT_ENROLLED'][0]['PROFILE_PHOTO_PATH'] + "profile/" + cor_data[i]['RECENT_ENROLLED'][0]['USER_ID'] + "_60x60.png?v=";
          } else {cor_data[i].ENROLLED1 = this._constantService.defaultImgPath;}

          if (cor_data[i]['RECENT_ENROLLED'][1] != '' && cor_data[i]['RECENT_ENROLLED'][1] != null && cor_data[i]['RECENT_ENROLLED'][1] != undefined) {
            cor_data[i].ENROLLED2 = cor_data[i]['RECENT_ENROLLED'][1]['PROFILE_PHOTO_PATH'] + "profile/" + cor_data[i]['RECENT_ENROLLED'][1]['USER_ID'] + "_60x60.png?v=";
          } else {cor_data[i].ENROLLED2 = this._constantService.defaultImgPath;}
        }
      } else {
        this.notshowImage = false;
        cor_data[i]['TOTAL_ENROLLED_USER'] = 0;
      }
      //                    if (cor_data[i]['VALIDITY']) {
      //                        cor_data[i]['VALIDITY'] = this.calValidityPeriod(cor_data[i]['VALIDITY']);
      //                        console.log('coe_data',cor_data[i]['VALIDITY']);
      //                    } else {
      //                     cor_data[i]['VALIDITY'] = this.calValidityPeriod("null");
      //                     console.log('coe_data null',cor_data[i]['VALIDITY']);
      //                    }

    }
    this.AllCourse.push.apply(this.AllCourse, cor_data);
    if (this.AllCourse.length == 0) {
      this.EmptyState = true;
      if (this.is_admin==true){
        this.EmptyState1 = true;
      }
    } else {
      this.EmptyState = false;
      if (this.is_admin==true){
        this.EmptyState1 = false;
      }
    }
  } else {

  }
});
}

getDraftCourses(f_id) {
  this.startLoader2 = true;
  if (f_id == undefined) {
    f_id = 1;
  }
  var draftCourse = {};
  draftCourse['token'] = this._constantService.getSessionDataBYKey('token');
  draftCourse['token_param'] = {};
  draftCourse['token_param']['device_type'] = 'w';
  draftCourse['token_param']['host'] = '';
  draftCourse['order'] = this.DraftOrder;
  draftCourse['cor_ty'] = this.DraftCorsTyp;
  draftCourse['pg_uuid'] = this.pageId;
  draftCourse['search_text'] = this.courseSearch;
  draftCourse['levels'] = "";
  draftCourse['lanids'] = "";
  draftCourse['count'] = this.flowId;
  draftCourse['r_count'] = "";
  this._constantService.fetchDataApi(this._constantService.getPageDraftCourseServiceUrl(), draftCourse).subscribe(data => {
    var responseData:any = data;
    var status = responseData.STATUS;
    if (status == 'success') {
      this.startLoader2 = false;
      if (this.count == 1) {
        this.courseList = [];
        this.flowId = 1;
        this.continueScroll = true;
        //this.courseSearch = '';
      }
      if (responseData.DRAFTED_COURSE.length < 10) {
        this.continueScroll = false;
      } else {
        this.flowId++;
      }
      //                if (responseData.DRAFTED_COURSE.length == 0) {
      //                    this.getDraftCoursesOld(0);
      //                }
      //this._constantService.setToken(responseData.TOKEN);
      this._constantService.setSessionJsonPair('token',responseData.TOKEN);
      var coursePack = responseData.DRAFTED_COURSE;
      for (var i = 0; i < responseData.DRAFTED_COURSE.length; i++) {

        if (coursePack[i].COURSE_TYPE == 1) {
          var costObj = coursePack[i].COURSE_PRICE;
          coursePack[i].COST = ' ';
          for (var j = 0; j < costObj.length; j++) {
            if (costObj[j].CURRENCY_TYPE == 'INR') {
              if (costObj[j].DISCOUNT_COST != '' && costObj[j].DISCOUNT_COST != null) {
                coursePack[i].COST = costObj[j].DISCOUNT_COST;
              } else {
                coursePack[i].COST = costObj[j].COST;
              }
            }
          }
        } else {
          coursePack[i].COST = 'FREE';
        }
        if (coursePack[i].PAGE_TITLE != null) {
          coursePack[i].PAGE_TITLE = this.postData.decodeURIPostData(coursePack[i].PAGE_TITLE);
        }
        if (coursePack[i].PAGE_NAME != null) {
          coursePack[i].PAGE_NAME = this.postData.decodeURIPostData(coursePack[i].PAGE_NAME);
        }
        if (coursePack[i].COURSE_COVER_PHOTO_PATH != null && coursePack[i].COURSE_COVER_PHOTO_PATH != "") {
          if (coursePack[i].COVER_TYPE == "0") {


            coursePack[i].COURSE_COVER_PHOTO_PATH = coursePack[i].COURSE_COVER_PHOTO_PATH + "cover/" + coursePack[i].COURSE_UUID + '_1235x330.png';

          } else {
            coursePack[i].COURSE_COVER_PHOTO_PATH = coursePack[i].COURSE_COVER_PHOTO_PATH;
          }
        } else {
          coursePack[i].COURSE_COVER_PHOTO_PATH = this._constantService.defaultCoverImgPath;
        }
        if (coursePack[i].PAGE_PROFILE_PHOTO_PATH != null) {
          coursePack[i].PAGE_PROFILE_PHOTO_PATH = coursePack[i].PAGE_PROFILE_PHOTO_PATH + coursePack[i].PAGE_UUID + '_120x120.png';
        } else {
          coursePack[i].PAGE_PROFILE_PHOTO_PATH = this._constantService.defaultImgPath;
        }

        coursePack[i].DESCRIPTION = this.postData.decodeURIPostData(coursePack[i].DESCRIPTION);
        coursePack[i].TITLE = this.postData.decodeURIPostData(coursePack[i].COURSE_TITLE);
        if (coursePack[i].PUBLISH_DATE_TIME != null) {
          coursePack[i].PUBLISH_DATE_TIME = this.postData.getPostDateTime(coursePack[i].PUBLISH_DATE_TIME);
        }
        if (coursePack[i].TOTAL_ENROLLED_USER == 0) {
          coursePack[i].TOTAL_ENROLLED_USER = '--';
        }


      }
      this.courseList.push.apply(this.courseList, coursePack);
      if (this.courseList.length != 0) {
        if (this.is_admin==true){
          this.EmptyState1 = false;
        }
      } else {
        if (this.is_admin == true) {
          this.EmptyState1 = true;
        }
      }
    }
  }, error => {
    var responseData = error;
    if (responseData.status == 500) {
      this._router.navigate(['500']);
    }
  });
}



getDraftCoursesOld(f_id) {
  this.startLoader2 = true;
  var draftCourse = {};
  draftCourse['token'] = this._constantService.getSessionDataBYKey('token');
  draftCourse['token_param'] = {};
  draftCourse['token_param']['device_type'] = 'w';
  draftCourse['token_param']['host'] = '';
  draftCourse['order'] = this.DraftOrder;
  draftCourse['cor_ty'] = this.DraftCorsTyp;
  draftCourse['pg_uuid'] = this.pageId;
  draftCourse['search_text'] = this.courseSearch;
  draftCourse['flow_id'] = f_id;
  this._constantService.fetchDataApi(this._constantService.getPageDraftCourseOldServiceUrl(), draftCourse).subscribe(data => {
    var responseData:any = data;
    var status = responseData.STATUS;
    if (status == 'success') {
      this.startLoader2 = false;
      if (this.count == 1) {
        this.courseList = [];
        this.flowId = 1;
        this.continueScroll = true;
        //this.courseSearch = '';
      }
      if (responseData.DRAFTED_COURSE.length < 10) {
        this.continueScroll = false;
      } else {
        f_id++;
      }
      //this._constantService.setToken(responseData.TOKEN);
      this._constantService.setSessionJsonPair('token',responseData.TOKEN);
      var coursePack = responseData.DRAFTED_COURSE;
      for (var i = 0; i < responseData.DRAFTED_COURSE.length; i++) {

        if (coursePack[i].COURSE_TYPE == 1) {
          var costObj = coursePack[i].COURSE_PRICE;
          coursePack[i].COST = ' ';
          for (var j = 0; j < costObj.length; j++) {
            if (costObj[j].CURRENCY_TYPE == 'INR') {
              if (costObj[j].DISCOUNT_COST != '' && costObj[j].DISCOUNT_COST != null) {
                coursePack[i].COST = costObj[j].DISCOUNT_COST;
              } else {
                coursePack[i].COST = costObj[j].COST;
              }
            }
          }
        } else {
          coursePack[i].COST = 'FREE';
        }
        if (coursePack[i].PAGE_TITLE != null) {
          coursePack[i].PAGE_TITLE = this.postData.decodeURIPostData(coursePack[i].PAGE_TITLE);
        }
        if (coursePack[i].PAGE_NAME != null) {
          coursePack[i].PAGE_NAME = this.postData.decodeURIPostData(coursePack[i].PAGE_NAME);
        }
        if (coursePack[i].COURSE_COVER_PHOTO_PATH != null && coursePack[i].COURSE_COVER_PHOTO_PATH != "") {
          if (coursePack[i].COVER_TYPE == "1") {
            coursePack[i].COURSE_COVER_PHOTO_PATH = coursePack[i].COURSE_COVER_PHOTO_PATH;
          } else {
            coursePack[i].COURSE_COVER_PHOTO_PATH = coursePack[i].COURSE_COVER_PHOTO_PATH + "cover/" + coursePack[i].COURSE_UUID + '_1235x330.png';
          }
        } else {
          coursePack[i].COURSE_COVER_PHOTO_PATH = this._constantService.defaultCoverImgPath;
        }
        if (coursePack[i].PAGE_PROFILE_PHOTO_PATH != null) {
          coursePack[i].PAGE_PROFILE_PHOTO_PATH = coursePack[i].PAGE_PROFILE_PHOTO_PATH + coursePack[i].PAGE_UUID + '_120x120.png';
        } else {
          coursePack[i].PAGE_PROFILE_PHOTO_PATH = this._constantService.defaultImgPath;
        }

        coursePack[i].DESCRIPTION = this.postData.decodeURIPostData(coursePack[i].DESCRIPTION);
        coursePack[i].TITLE = this.postData.decodeURIPostData(coursePack[i].COURSE_TITLE);
        coursePack[i].ADD_DATE_TIME = this.postData.getPostDateTime(coursePack[i].ADD_DATE_TIME);
        if (coursePack[i].PUBLISH_DATE_TIME != null) {
          coursePack[i].PUBLISH_DATE_TIME = this.postData.getPostDateTime(coursePack[i].PUBLISH_DATE_TIME);
        }
        if (coursePack[i].TOTAL_ENROLLED_USER == 0) {
          coursePack[i].TOTAL_ENROLLED_USER = '--';
        }


      }
      this.courseList.push.apply(this.courseList, coursePack);
      if (this.courseList.length != 0) {
        if (this.is_admin==true){
          this.EmptyState1 = false;
        }
      } else {
        if (this.is_admin==true){
          this.EmptyState1 = true;
        }
      }

    }
  }, error => {
    var responseData = error;
    if (responseData.status == 500) {
      this._router.navigate(['500']);
    }
  });
}


getAllLanguage() {
  this._constantService.fetchDataApiWithoutBody(this._constantService.getAllLanguageServiceUrl())
  .subscribe(data => {
    let responseData:any = data;
    if (responseData.success = this._constantService.success_msg) {
      this.languageList = responseData.LNG_LIST;
    }
  });
}

routerTocoursedetails(event) {
  var id = event.COURSE_UUID;
  if (event.PUBLISH == 4 || event.PUBLISH == 2) {
    this._router.navigate(['addcourse/' + id]);
  } else if (event.PUBLISH == 5) {
    this._router.navigate(['reviewcourse/' + id]);
  } else if (event.PUBLISH == 1 && this.is_admin == false) {
    this._router.navigate(['course/' + event.COURSE_URL]);

  } else if (event.PUBLISH == 1 && this.is_admin == true) {
    this._router.navigate(['addcourse/' + id]);
  }
}

routerToaddcourse(event) {
  var id = event.COURSE_UUID;
  this._router.navigate(['addcourse/' + id]);
}

//    calValidityPeriod(days) {
//        if (days < 30) {
//            this.showDays = true;
//            this.validity = days;
//        } else if (days == 30 || days == 31) { console.log("reached 1");
//            this.showDays = false;
//            this.validity = 1;
//        } else if (days == null){
//            this.validity = "Unlimited";
//        }  else if (days > 31){ console.log("reached 2",this.validity);
//            this.showDays = false;
//            var x = days / 30;
//            this.validity = Math.floor(x);console.log("reached 2",this.validity);
//        }
//        return this.validity;
//    }

goToCourse(courseUrl){
  this._router.navigate(['course/'+courseUrl]);
}
}
