import { Component, OnInit, ViewChild, HostListener, AfterViewInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { SlickCarouselComponent } from "ngx-slick-carousel";
import { ConstantService } from './../../services/constant.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PostdataService } from './../../services/postdata.service';

declare const bitmovin: any;
@Component({
  selector: 'app-live-classes',
  templateUrl: './live-classes.component.html',
  styleUrls: [
    './live-classes.component.scss',
    './../courses/courses.component.scss',
    './../all-courses/all-courses.component.scss',
    './../all-courses/slidercntr.css'
    // '../../sharedComponents/mmenu/slidemenu.css'
  ],
  host: {
    '(window:scroll)': 'onScroll($event)'
  }
})
export class LiveClassesComponent implements OnInit {
  isMobileMenue: boolean = false;
  leftFilterMenu: boolean;
  leftFilterslidebg: boolean;
  trendingCourses: any;
  openLoginPopup: boolean = false;
  enrolledCourses: any;
  interestCoursesUUIDs: any = [];
  premiumCourses: any;
  featuredCourses: any = [];
  filterApplied: boolean;
  divNone: boolean = false;
  // @ViewChild('filteredCourses') filteredCoursesComponent: FilteredCoursesComponent;
  // @ViewChild(AllCoursesFilterComponent) allFilterComponent: AllCoursesFilterComponent;
  @ViewChild('slickModal') slickModal: SlickCarouselComponent;
  @ViewChild('slickModal2') slickModal2: SlickCarouselComponent;
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
  dataConf: {};
  liveClasesData: any;
  todayLiveClasses: any = [];
  upCommingLiveClasses: any = [];
  previousClasses: any;
  fromLiveCompnent = true;
  t: any;
  token: boolean;
  showLeftmenu: boolean;
  showHeader: boolean;
  coverAll: boolean
  constructor(
    public _constantService: ConstantService,
    public _router: Router,
    private postData: PostdataService,
    public changeDetector: ChangeDetectorRef





  ) { }

  ngOnInit() {
    const url = "" + window.location.href
    const UrlArr = url.split('/');

    if (UrlArr[UrlArr.length - 1] == "live-classes") {
      this.showLeftmenu = true;
      this.showHeader = true;
    }
    // console.log(new Date().getMilliseconds() + "all course initialized");
    if (window.innerWidth > 960)
      this.isWebView = true;
    else this.isWebView = false;
    this.onResize(null);
    // this.getBanner();
    this.checkScreenWidth();
    this.t = this._constantService.getSessionDataBYKey('token');
    if (this.t) {
      this.getDataLiveClass();
    } else {
      this.getDataLiveClassWthOtTkn();
    }

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
    // console.log(new Date().getMilliseconds() + "slickkkkk")
    console.log("slick initialized");
    setTimeout(() => {
      if (window.innerWidth <= 480) {

      }
      // this.slickModal.slickPlay();

    }, 2000)

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
    if (window.innerWidth <= 600) {

      console.log('inner widh is less than 480');
    }
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    if (window.innerWidth > 991) {
      // this.isMobileMenue = false;
      this.slideConfig = {
        slidesToShow: 2.75,
        slidesToScroll: 1,
        infinite: false,
      };
      this.slideConfigFeaturedCourses = {
        slidesToShow: 2.2,
        slidesToScroll: 1,
        infinite: false,
      };
    } else if (window.innerWidth > 767) {
      // this.isMobileMenue = false;
      this.slideConfig = {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: false,
      };
      this.slideConfigFeaturedCourses = {
        slidesToShow: 1.5,
        slidesToScroll: 1,
        infinite: false,
      };
    } else if (window.innerWidth > 480) {
      // this.isMobileMenue = false;
      this.slideConfig = {
        slidesToShow: 1.5,
        slidesToScroll: 1,
        infinite: false,
      };
      this.slideConfigFeaturedCourses = {
        slidesToShow: 1.2,
        slidesToScroll: 1,
        infinite: false,
      };
    }
    else {
      this.slideConfig = {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
      };
      this.slideConfigFeaturedCourses = {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
      };
    }

    if (window.innerWidth >= 992) {
      // const rightwidth = document.getElementById("sideThreeCol").offsetWidth;
      // const rightinnwidth = rightwidth - 15;
      // document.getElementById("leftsectionfixed").style.width = rightinnwidth + "px";

    }
  }
  private checkScreenWidth() {
    if (window.innerWidth >= 992) {
      // const rightwidth = document.getElementById("sideThreeCol").offsetWidth;
      // const rightinnwidth = rightwidth - 15;
      // document.getElementById("leftsectionfixed").style.width = rightinnwidth + "px";
      // document.getElementById("someDivleft").style.width = rightinnwidth + "px";
    }
  }

  getDataLiveClass() {
    this.coverAll = true;
    const postData = {};
    postData['token'] = this._constantService.getSessionDataBYKey('token');
    postData['token_param'] = {};
    postData['token_param']['device_type'] = 'w';
    postData['token_param']['host'] = '';
    postData['count'] = 5;

    this._constantService.fetchDataApi(this._constantService.getDataLiveClass(), postData).subscribe(data => {
      const responseData: any = data;
      const status = responseData.STATUS;
      if (status == this._constantService.success_msg) {
        this.todayLiveClasses = responseData.STREAM_DATA[0].CONTENT_DETAILS;
        this.fromLiveCompnent = responseData.STREAM_DATA[0].length > 0;
        this.todayLiveClasses.forEach(todaysClass => {
          var timeRemaining = todaysClass.START_TIME - new Date().getTime();
          if (timeRemaining > 10) {
            setTimeout(() => {
              todaysClass.started = true;
            }, timeRemaining)
          } else {
            todaysClass.started = true;
          }
        });
        this.upCommingLiveClasses = responseData.STREAM_DATA[1].CONTENT_DETAILS;
        this.previousClasses = responseData.STREAM_DATA[2].CONTENT_DETAILS;
        this.previousClasses.forEach(element => {
          element.duration = element.DURATION;
          var hrs = Math.floor(element.DURATION / 3600) + '';
          element.DURATION = element.DURATION % 3600;
          hrs = '0' + hrs;
          var minutes = Math.floor(element.DURATION / 60);
          var seconds = element.DURATION % 60;
          element.DURATION = (hrs == '00' ? '' : hrs + ':') + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
          setTimeout(() => {
            if (window.innerWidth < 640 && this.slickModal2)

              this.slickModal2.unslick();
          }, 500);
          if (element.CONTENT_TYPE == 4) {
            var filteredPathString = element.PATH.split('?')[0];
            filteredPathString = filteredPathString.split('&')[0];
            element.path = "https://img.youtube.com/vi/" + filteredPathString + "/hqdefault.jpg";
          }

        });

        // if(this.todayLiveClasses == ''){
        //   this._router.navigate(['/live-classes/previous-classes']);
        // }


      } else if (status == this._constantService.error_token) {
        this._constantService.clearUserInfo();
        this._router.navigate(['']);
        this.dataConf['type'] = 4;
        this.dataConf['msg'] = "Session Expire";
        this.dataConf['error_msg'] = "Session Expired";
      } else {
        this.dataConf['type'] = 2;
        this.dataConf['msg'] = "STUDY24X7";
        this.dataConf['error_msg'] = responseData.ERROR_MSG;
      }
      this.coverAll = false;

    }, error => {
      this.coverAll = false;

      const responseData = error;
      if (responseData.status == 500) {
        this._router.navigate(['500']);
      }

    });
  }

  getDataLiveClassWthOtTkn() {
    this.coverAll = true;

    const postData = {};
    postData['count'] = 5;
    this._constantService.fetchDataApi(this._constantService.getDataLiveClassWthOtTkn(), postData).subscribe(data => {
      const responseData: any = data;
      const status = responseData.STATUS;
      if (status == this._constantService.success_msg) {
        this.todayLiveClasses = responseData.STREAM_DATA[0].CONTENT_DETAILS;
        this.fromLiveCompnent = responseData.STREAM_DATA[0].length > 0;

        this.todayLiveClasses.forEach(todaysClass => {
          var timeRemaining = todaysClass.START_TIME - new Date().getTime();
          if (timeRemaining > 10) {
            setTimeout(() => {
              todaysClass.started = true;
            }, timeRemaining)
          } else {
            todaysClass.started = true;
          }
        });
        this.upCommingLiveClasses = responseData.STREAM_DATA[1].CONTENT_DETAILS;
        this.previousClasses = responseData.STREAM_DATA[2].CONTENT_DETAILS;
        this.previousClasses.forEach(element => {
          element.duration = element.DURATION;
          var hrs = Math.floor(element.DURATION / 3600) + '';
          element.DURATION = element.DURATION % 3600;
          hrs = '0' + hrs;
          var minutes = Math.floor(element.DURATION / 60);
          var seconds = element.DURATION % 60;
          element.DURATION = (hrs == '00' ? '' : hrs + ':') + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
          setTimeout(() => {
            if (window.innerWidth < 640 && this.slickModal2)

              this.slickModal2.unslick();
          }, 500);
          if (element.CONTENT_TYPE == 4) {
            var filteredPathString = element.PATH.split('?')[0];
            filteredPathString = filteredPathString.split('&')[0];
            element.path = "https://img.youtube.com/vi/" + filteredPathString + "/hqdefault.jpg";
          }

        });

      } else if (status == this._constantService.error_token) {
        this._constantService.clearUserInfo();
        this._router.navigate(['']);
        this.dataConf['type'] = 4;
        this.dataConf['msg'] = "Session Expire";
        this.dataConf['error_msg'] = "Session Expired";
      } else {
        this.dataConf['type'] = 2;
        this.dataConf['msg'] = "STUDY24X7";
        this.dataConf['error_msg'] = responseData.ERROR_MSG;
      }
      this.coverAll = false;

    }, error => {
      this.coverAll = false;

      const responseData = error;
      if (responseData.status == 500) {
        this._router.navigate(['500']);
      }
    });
  }

  leftSidemenu() {
    // this.leftFilterslidebg = !this.leftFilterslidebg;
    this.isMobileMenue = !this.isMobileMenue;
    if (this.isMobileMenue == true) {
      const body = document.getElementsByTagName("body")[0];
      body.classList.add("body-overflow");
    } else {
      const body = document.getElementsByTagName("body")[0];
      body.classList.remove("body-overflow");
    }
  }
  displayMobileMenu() {
    this.isMobileMenue = !this.isMobileMenue;
  }
  hideMobileMenu() {
    this.isMobileMenue = false;
  }
  onScroll(evt) {
    let secHeight: any;
    let secHeightcenter: any;
    if (document.getElementById('leftsectionfixed')) {
      secHeight = document.getElementById('leftsectionfixed').offsetHeight;
      

    }
    if(secHeightcenter = document.getElementById('centersection')){
      secHeightcenter = document.getElementById('centersection').offsetHeight;
    }
    // var secHeightleft = document.getElementById('someDivleft').offsetHeight;
    const innerWindHeight = window.innerHeight - 10;
    if (secHeightcenter > secHeight) {
      if (secHeight > innerWindHeight) {
        const topHeight = secHeight - innerWindHeight;
        this.changePos = secHeight - innerWindHeight;
        this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
        if (this.currPos >= this.changePos) {
          this.isScrolled = true;
          document.getElementById("leftsectionfixed").style.top = -topHeight + "px";
        } else {
          this.isScrolled = false;
        }
      } else {
        const topHeight = secHeight - innerWindHeight;
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
  setliveStreaduration(duration) {
    if (duration > 59) {
      const h = Math.floor(duration / 60);
      const min = duration % 60;
      return h + "h" + " " + min + "m";
    }
    else {
      return duration + "m";
    }
  }
  upcomingClasses() {
    this._router.navigate(['/live-classes/upcoming-classes']);

  }
  routToStream(contentUUID) {
    if (this.t) {
      this._router.navigate(['/livestream/' + contentUUID]);
    } else {
      this.loginpopupFxn();
    }
  }

  routToCourse(url) {
    this._router.navigate(['/course/' + url])
  }

  loginpopupFxn() {
    this.openLoginPopup = !this.openLoginPopup;
    if (this.openLoginPopup) {
      let body = document.getElementsByTagName('body')[0];
      body.classList.add("body-overflow");
    } else {
      let body = document.getElementsByTagName('body')[0];
      body.classList.remove("body-overflow");
    }
    this.changeDetector.detectChanges();
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
  receiveMessage(event) {
    this.fromLiveCompnent = event;
    // this._router.navigate(['/live-classes/previous-classes']);

  }

}
