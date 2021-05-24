import { Component, OnInit, ViewChild, HostListener, AfterViewInit } from "@angular/core";
import { ConstantService } from "src/app/services/constant.service";
import { PostdataService } from "src/app/services/postdata.service";
import { AllCoursesFilterComponent } from "./all-courses-filter/all-courses-filter.component";
import { FilteredCoursesComponent } from "./filtered-courses/filtered-courses.component";
import { SlickCarouselComponent } from "ngx-slick-carousel";
import { Router } from "@angular/router";

@Component({
  selector: "app-all-courses",
  templateUrl: "./all-courses.component.html",
  styleUrls: [
    "./../leaderboard/filter-by-interest/responsiveui.css",
    // "../../sharedComponents/mmenu/slidemenu.css",
    "./../courses/courses.component.scss",
    "./all-courses.component.scss",
    "./slidercntr.css",
  ],
  host: {
    '(window:scroll)': 'onScroll($event)'
  }
})
export class AllCoursesComponent implements OnInit, AfterViewInit {
  starRatingObject = this._constantService.starRatingObject;
  isMobileMenue: boolean;
  leftFilterMenu: boolean;
  leftFilterslidebg: boolean;
  trendingCourses: any;
  enrolledCourses: any;
  interestCoursesUUIDs: any = [];
  premiumCourses: any;
  featuredCourses: any = [];
  filterApplied: boolean;
  divNone: boolean = false;
  @ViewChild('filteredCourses') filteredCoursesComponent: FilteredCoursesComponent;
  @ViewChild(AllCoursesFilterComponent) allFilterComponent: AllCoursesFilterComponent;
  @ViewChild('slickModal') slickModal: SlickCarouselComponent;
  @ViewChild('slickModal1') slickModal1: SlickCarouselComponent;
  @ViewChild('slickModal2') slickModal2: SlickCarouselComponent;
  @ViewChild('slickModalK12') slickModalK12: SlickCarouselComponent;
  @ViewChild('slickModalTech') slickModalTech: SlickCarouselComponent;
  @ViewChild('slickModalEdu') slickModalEdu: SlickCarouselComponent;
  @ViewChild('slickModalGvt') slickModalGvt: SlickCarouselComponent;
  @ViewChild('slickModalComp') slickModalComp: SlickCarouselComponent;
  isWebView = true;
  gvtJobsCourses: any = [];
  competitiveExamCourses: any = [];
  k12Courses: any = [];
  tecnologyCourses: any = [];
  educationCourses: any = [];
  isScrolled: boolean = false;
  currPos: Number = 0;
  startPos: Number = 0;
  changePos: Number = 0;
  isLoggedIn: boolean = false;

  constructor(private _constantService: ConstantService,
    public _postDataService: PostdataService,
    private _router: Router) {
    if (!this._constantService.getSessionDataBYKey('token')) {
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
    }
  }

  ngOnInit() {
    console.log(new Date().getMilliseconds() + "all course initialized");
    if (window.innerWidth > 960)
      this.isWebView = true;
    else this.isWebView = false;
    this.onResize(null);
    this.getBanner();
    this.checkScreenWidth();
  }
  slideConfig = { slidesToShow: 3, slidesToScroll: 3, infinite: false };
  slideConfigFeaturedCourses = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true
  };

  addSlide() {
    //  this.slides.push({img: "http://placehold.it/350x150/777777"})
  }

  removeSlide() {
    //  this.slides.length = this.slides.length - 1;
  }

  slickInit(e) {
    console.log(new Date().getMilliseconds() + "slickkkkk")
    console.log("slick initialized");

  }

  breakpoint(e) {
    console.log("breakpoint");
  }

  afterChange(e) {
    console.log("afterChange");
  }

  beforeChange(e) {
    console.log("beforeChange");
  }
  ngAfterViewInit() {
    this.checkScreenWidth();
    // if (window.innerWidth <= 480) {
    //   this.slickModal1.unslick();
    //   this.slickModal2.unslick();
    //   this.slickModal.unslick();
    //   console.log('inner widh is less than 480');
    // }
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    if (window.innerWidth > 991) {
      // this.isMobileMenue = false;
      this.slideConfig = {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: false,
      };
      this.slideConfigFeaturedCourses = {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      };
    } else {
      // this.isMobileMenue = true;
      this.slideConfig = {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: false,
      };
      this.slideConfigFeaturedCourses = {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      };
    }

    if (window.innerWidth >= 992) {
      var rightwidth = document.getElementById("sideThreeCol").offsetWidth;
      var rightinnwidth = rightwidth - 15;
      document.getElementById("leftsectionfixed").style.width = rightinnwidth + "px";

    }
  }
  private checkScreenWidth() {
    if (window.innerWidth >= 992) {
      var rightwidth = document.getElementById("sideThreeCol").offsetWidth;
      var rightinnwidth = rightwidth - 15;
      document.getElementById("leftsectionfixed").style.width = rightinnwidth + "px";
      // document.getElementById("someDivleft").style.width = rightinnwidth + "px";
    }
  }
  leftSideFilter() {

    this.leftFilterMenu = !this.leftFilterMenu;
    console.log(this.leftFilterMenu);
    if (this.leftFilterMenu == true) {
      let body = document.getElementsByTagName("body")[0];
      body.classList.add("body-overflow");
    } else {
      let body = document.getElementsByTagName("body")[0];
      body.classList.remove("body-overflow");
    }
    this.allFilterComponent.applyButtonHide=this.leftFilterMenu;
  }
  leftSidemenu() {
    // this.leftFilterslidebg = !this.leftFilterslidebg;
    this.isMobileMenue = !this.isMobileMenue;
    if (this.isMobileMenue == true) {
      let body = document.getElementsByTagName("body")[0];
      body.classList.add("body-overflow");
    } else {
      let body = document.getElementsByTagName("body")[0];
      body.classList.remove("body-overflow");
    }
  }
  displayMobileMenu() {
    this.isMobileMenue = !this.isMobileMenue;
  }
  hideMobileMenu() {
    this.isMobileMenue = false;
  }

  getFilteredCourses(event) {
    if (!this.isWebView)
      this.leftSideFilter()
    console.log(event);
    this.filterApplied = event.isFilterApplied;
    this.filteredCoursesComponent.getFilteredCourses(event);
  }

  getUserInterestGroupCourse() {
    var reqData = {};
    reqData["token"] = this._constantService.getSessionDataBYKey("token");
    reqData["token_param"] = {};
    reqData["token_param"]["device_type"] = "w";
    reqData["token_param"]["host"] = "";
    reqData["trd_cros"] = this.interestCoursesUUIDs.join();
    this._constantService
      .fetchDataApi(
        this._constantService.getUserInterestGroupCourseUrl(),
        reqData
      )
      .subscribe((data) => {
        var responseData: any = data;
        this.premiumCourses = this.getUpdatedFieldsFor(responseData.PREMIUM_COURSES);
        this.gvtJobsCourses = this.getUpdatedFieldsFor(responseData.INTEREST_GROUP1);
        this.competitiveExamCourses = this.getUpdatedFieldsFor(responseData.INTEREST_GROUP2);
        this.k12Courses = this.getUpdatedFieldsFor(responseData.INTEREST_GROUP3);
        this.tecnologyCourses = this.getUpdatedFieldsFor(responseData.INTEREST_GROUP4);
        this.educationCourses = this.getUpdatedFieldsFor(responseData.INTEREST_GROUP5);
        setTimeout(() => {
          if (window.innerWidth <= 640) {
            this.slickModal2.unslick();
            this.slickModalK12.unslick();
            this.slickModalTech.unslick();
            this.slickModalEdu.unslick();
            this.slickModalGvt.unslick();
            this.slickModalComp.unslick();
          }

        }, 1000)


      });
  }
  getUserInterestGroupCoursePublic() {
    var reqData = {};
    reqData["trd_cros"] = this.interestCoursesUUIDs.join();
    this._constantService
      .fetchDataApi(
        this._constantService.getUserInterestGroupCoursePublicUrl(),
        reqData
      )
      .subscribe((data) => {
        var responseData: any = data;
        this.premiumCourses = this.getUpdatedFieldsFor(responseData.PREMIUM_COURSES);
        this.gvtJobsCourses = this.getUpdatedFieldsFor(responseData.INTEREST_GROUP1);
        this.competitiveExamCourses = this.getUpdatedFieldsFor(responseData.INTEREST_GROUP2);
        this.k12Courses = this.getUpdatedFieldsFor(responseData.INTEREST_GROUP3);
        this.tecnologyCourses = this.getUpdatedFieldsFor(responseData.INTEREST_GROUP4);
        this.educationCourses = this.getUpdatedFieldsFor(responseData.INTEREST_GROUP5);
        setTimeout(() => {
          if (window.innerWidth <= 640) {
            this.slickModal2.unslick();
            this.slickModalK12.unslick();
            this.slickModalTech.unslick();
            this.slickModalEdu.unslick();
            this.slickModalGvt.unslick();
            this.slickModalComp.unslick();
          }

        }, 1000)


      });
  }
  getUpdatedFieldsFor(arr) {
    arr.forEach((element) => {
      element.COURSE_TITLE = this._postDataService.decodeURIPostData(element.COURSE_TITLE);
      element.PAGE_TITLE = this._postDataService.decodeURIPostData(element.PAGE_TITLE);
      if (element.COVER_TYPE != 1) {
        if(window.innerWidth>480)
        element.COURSE_COVER_PHOTO_PATH = element.COURSE_COVER_PHOTO_PATH + 'cover/' + element.COURSE_UUID + '_600x300.jpg';
        else
        element.COURSE_COVER_PHOTO_PATH = element.COURSE_COVER_PHOTO_PATH + 'cover/' + element.COURSE_UUID + '_300x150.jpg';


      }
      element.COURSE_URL = (element.COURSE_TITLE.trim().split(' ').join('-') + '-' + element.COURSE_ID).toLowerCase();
      if (element.PAGE_PROFILE_PHOTO_PATH) {
        element.PAGE_PROFILE_PHOTO_PATH = element.PAGE_PROFILE_PHOTO_PATH + 'profile/' + element.PAGE_UUID + '_120x120.png'
      } else {
        element.PAGE_PROFILE_PHOTO_PATH = this._constantService.defaultPageIndImgPath;
      }
    });
    return arr;

  }

  getUserEnrolledAndInterestCourses() {
    var reqData = {};
    reqData["token"] = this._constantService.getSessionDataBYKey("token");
    reqData["token_param"] = {};
    reqData["token_param"]["device_type"] = "w";
    reqData["token_param"]["host"] = "";
    this._constantService
      .fetchDataApi(
        this._constantService.getUserEnrolledAndInterestCoursesUrl(),
        reqData
      )
      .subscribe((data) => {
        var responseData: any = data;
        if (responseData.STATUS == this._constantService.success_msg) {
          this.trendingCourses = this.getUpdatedFieldsFor(responseData.INTEREST_COURSE);
          this.trendingCourses.forEach(element => {
            this.interestCoursesUUIDs.push(element.COURSE_UUID);
          });
          this.getUserInterestGroupCourse();
        } else if (responseData.STATUS == 'error_token') {
          this._router.navigate(['/home']);
        }
        setTimeout(() => {
          if (window.innerWidth <= 640) {
            this.slickModal1.unslick();
          }

        }, 1000)
      });
  }

  getUserEnrolledAndInterestCoursesPublic() {

    this._constantService
      .fetchDataApiWithoutBody(
        this._constantService.getUserEnrolledAndInterestCoursesPublicUrl()
      )
      .subscribe((data) => {
        var responseData: any = data;
        if (responseData.STATUS == this._constantService.success_msg) {
          this.trendingCourses = this.getUpdatedFieldsFor(responseData.INTEREST_COURSE);
          this.trendingCourses.forEach(element => {
            this.interestCoursesUUIDs.push(element.COURSE_UUID);
          });

          this.getUserInterestGroupCoursePublic();
        } else if (responseData.STATUS == 'error_token') {
          this._router.navigate(['/home']);
        }
        setTimeout(() => {
          if (window.innerWidth <= 640) {
            this.slickModal1.unslick();
          }

        }, 1000)
      });
  }

  getBanner() {
    this._constantService
      .fetchDataApi(this._constantService.getBannerUrl(), {})
      .subscribe((data) => {
        var responseData: any = data;
        this.featuredCourses = this.getUpdatedFieldsFor(responseData.BANNERS);
        setTimeout(() => {

          this.slickModal.slickPlay();

        }, 1000)
        if (this.isLoggedIn) {
          this.getUserEnrolledAndInterestCourses();
        } else {
          this.getUserEnrolledAndInterestCoursesPublic();
        }

      });
  }

  setUserInteresInInterestFilter(interestId) {
    this.allFilterComponent.setUserInteresInInterestFilter(interestId);
  }
  onScroll(evt) {

    var secHeight = document.getElementById('leftsectionfixed').offsetHeight;
    // var secHeightleft = document.getElementById('someDivleft').offsetHeight;
    var innerWindHeight = window.innerHeight - 10;
    var secHeightcenter = document.getElementById('centersection').offsetHeight;
    if (secHeightcenter > secHeight) {
      if (secHeight > innerWindHeight) {
        var topHeight = secHeight - innerWindHeight;
        this.changePos = secHeight - innerWindHeight;
        this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
        if (this.currPos >= this.changePos) {
          this.isScrolled = true;
          document.getElementById("leftsectionfixed").style.top = -topHeight + "px";
        } else {
          this.isScrolled = false;
        }
      } else {
        var topHeight = secHeight - innerWindHeight;
        this.changePos = secHeight - innerWindHeight;
        this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
        if (this.currPos >= this.changePos) {
          this.isScrolled = true;
          document.getElementById("leftsectionfixed").style.top = 72 + "px";
        } else {
          this.isScrolled = false;
        }

      }
    }
    else {
      this.isScrolled = false;
    }

  }
}
