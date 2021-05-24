import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { Router, ActivatedRoute } from '@angular/router';
import { ConstantService } from 'src/app/services/constant.service';
import { PostdataService } from 'src/app/services/postdata.service';
import { LoginService } from 'src/app/services/login.service';
import { RegisterService } from 'src/app/services/register.service';
import { EmitService } from '../../sharedComponents/addpost/emit.service';
import { CookieService } from 'ngx-cookie-service';


const dayMilliSeconds = 24 * 60 * 60 * 1000;
const TwoDayMilliSeconds = dayMilliSeconds * 2;

@Component({
  selector: 'app-prepare',
  templateUrl: './prepare.component.html',
  styleUrls: ['./prepare.component.scss', 'slider.css', 'prepareresponsive.css', 'header.css', './../login/login.component.scss']

  // "./newlogin.component.scss",
  // "./newlogin.css",
})

export class PrepareComponent implements OnInit {
  config = {};
  selectedCategory = 0;
  courseSavedData: any[];
  saveCondition = false;
  dataConf: any[];
  openConfirmation = false;
  cardClickedIndex: any;
  savepagepopup = false;
  isMobileMenue: boolean;
  leftFilterMenu = false;
  leftFilterslidebg: boolean;
  divNone = false;
  @ViewChild('slickModal') slickModal: SlickCarouselComponent;
  @ViewChild('slickModal3') slickModal3: SlickCarouselComponent;


  isWebView = true;
  showlistmenu = false;
  interestName = '';
  leftRelatedArticles: any = [];
  rightRelatedArticles: any = [];
  centerRelatedArticles: any = [];
  interests: any;
  pricemenue = false;
  popularCourses: any = [];
  featuredCourses: any = [];
  trendingInEducationArticles: any = [];
  popularPages: any = [];
  bestSellingCourses: any = [];
  bestSellingCoursesSlick: any = [];
  noOfPagesInBestSellingCourse: number;
  pageNoArra: any = [];
  currentPage: any = 1;
  courseType: any;
  opennavleft = false;
  isLoggedIn: boolean;
  openLoginPopup = false;
  loginPopupType: any = 0;
  loginright: any = 1;
  logincloseright = false;
  loginId: any;
  password: any;
  focusedRegistrationField = 0;
  registrationDetails = {
    email: '',
    mobileNumber: '',
    firstName: '',
    lastName: '',
    countryId: 1,
    dateOfBirth: '',
    gd: '',
    password: ''
  };
  regiterDetails: any = {
    lastName: {
      msg: '',
      error: false
    },
    firstName: {
      msg: '',
      error: false
    },
    email: {
      msg: '',
      error: false
    },
    mobileNumber: {
      msg: '',
      error: false
    },
    countryId: {
      msg: '',
      error: false
    },
    password: {
      msg: '',
      error: false
    },
    dateOfBirth: {
      msg: '',
      error: false
    },
    noOfErrors: 0,
    ERROR_MSG: ''
  };

  loginMessage = { errorMessage: '', error: false, type: '' };
  interestNameAlias: any;
  showInterestDropdownResponsiveView: boolean;
  interestNameAliasExist: boolean;
  current_year = new Date().getFullYear();
  bannerContent: any;
  bannerHeading: any;

  constructor(
    private _constantService: ConstantService,
    private _cookie: CookieService,
    private _router: Router,
    private activatedRoute: ActivatedRoute,
    public postDataService: PostdataService,
    private loginService: LoginService,
    private registerService: RegisterService,
    private emitService: EmitService,
    private changeDetector: ChangeDetectorRef

  ) {
    let token = this._constantService.getSessionDataBYKey('token');
    if (token) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
    this.emitService.objectEmitter.subscribe($event => {
      this.loginMessage = ($event);
      this.changeDetector.detectChanges();
    });
    this.emitService.registerErrorObjectEmitter.subscribe($event => {
      this.regiterDetails = $event;
    })


  }

  ngOnInit() {
    var token= this._constantService.getSessionDataBYKey('token');
    if (token) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }


    this.activatedRoute.params.subscribe(params => {
      if (params['id'] && this.interestNameAlias != params['id']) {
        this.interestNameAlias = params['id'];
        this.getInterest();
      } else {
        //  this.interestName = ''; }
        // this.bestSellingCourses=[];
        // this.bestSellingCoursesSlick=[];
        this._router.navigate(["400"]);
      }
      if (!this.isLoggedIn) {
        this._constantService.setSessionJsonPair('publicClickedURL', window.location.href)
      }
    });



    if (window.innerWidth > 960) {
      this.isWebView = true;
    }
    else { this.isWebView = false; }
    if (window.innerWidth < 768) {
      this.showInterestDropdownResponsiveView = true;
    }
    this.onResize(null);


  }
  slideConfig = { slidesToShow: 4, slidesToScroll: 1, infinite: false };
  slideConfigFeaturedCourses = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
  };
  slideConfigbestselling = {
    slidesToShow: 2.5,
    slidesToScroll: 1,
    infinite: false,
  };


  addSlide() {
  }

  removeSlide() {
  }

  slickInit(e) {
    console.log('slick initialized');

  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  afterChange(e, slickName) {
    if (slickName == 'slickModal3') {
      if (e.currentSlide >= this.bestSellingCoursesSlick.length - 2) {
        this.nextPage();
      }
    }
  }

  beforeChange(e) {
    console.log('beforeChange');
  }
  ngAfterViewInit() {
    if (window.innerWidth <= 480) {

      this.slickModal.unslick();
      console.log('inner widh is less than 480');
    }
    this.onResize(event);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth > 991) {
      this.slideConfig = {
        slidesToShow: 4.2,
        slidesToScroll: 1,
        infinite: false,
      };
      this.slideConfigFeaturedCourses = {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
      };
      this.slideConfigbestselling = {
        slidesToShow: 2.5,
        slidesToScroll: 1,
        infinite: false,
      };
    } else if (window.innerWidth > 767) {
      // this.isMobileMenue = true;
      this.slideConfig = {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
      };
      this.slideConfigFeaturedCourses = {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
      };
      this.slideConfigbestselling = {
        slidesToShow: 2.5,
        slidesToScroll: 1,
        infinite: false,
      };
    } else if (window.innerWidth > 480) {
      // this.isMobileMenue = true;
      this.slideConfig = {
        slidesToShow: 2.5,
        slidesToScroll: 1,
        infinite: false,
      };
      this.slideConfigFeaturedCourses = {
        slidesToShow: 2.5,
        slidesToScroll: 1,
        infinite: false,
      };
      this.slideConfigbestselling = {
        slidesToShow: 1.5,
        slidesToScroll: 1,
        infinite: false,
      };
    } else {
      this.slideConfig = {
        slidesToShow: 1.5,
        slidesToScroll: 1,
        infinite: false,
      };
      this.slideConfigFeaturedCourses = {
        slidesToShow: 1.5,
        slidesToScroll: 1,
        infinite: false,
      };
      this.slideConfigbestselling = {
        slidesToShow: 1.2,
        slidesToScroll: 1,
        infinite: false,
      };
    }

  }


  showMenueList() {
    this.showlistmenu = !this.showlistmenu;
    if (this.showlistmenu == true) {
      document.getElementsByTagName('body')[0].classList.add('body-overflow');
    } else {
      document.getElementsByTagName('body')[0].classList.remove('body-overflow');
    }
  }

  getInterest() {
    if (!this.interests) {
      this._constantService.fetchDataApiWithoutBody(this._constantService.getInterestv1ServiceUrl()).subscribe(data => {
        const responseData: any = data;
        this.interests = responseData.INTERESTS_DATA;
        let machedAlias = '';
        if (this.interestNameAlias) {
          for (let i = 0; i < this.interests.length; i++) {
            for (let j = 0; j < this.interests[i].INTERESTS.length; j++) {
              if (this.interests[i].INTERESTS[j].INTEREST_NAME_ALIAS.toLowerCase() == this.interestNameAlias.toLowerCase()) {
                this.interestName = this.interests[i].INTERESTS[j].INTEREST_NAME;
                machedAlias = this.interests[i].INTERESTS[j].INTEREST_NAME_ALIAS;
                this.interestNameAliasExist = true;
                break;
              }
            }
          }

        }
        if (!this.interestNameAliasExist && this.interestNameAlias) {
          this._router.navigate(['400']);
          return;
        } else if (this.interestNameAlias !== machedAlias) {
          this._router.navigate(['prepare/' + machedAlias]);
          return;
        }


        this.getMarketPlaceDetails();
        this.getBestSellingCoursesWithPrice('');
        this.interestNameAliasExist = false;


      }, error => {
        const responseData = error;
        if (responseData.status == 500) {
          this._router.navigate(['500']);
        }
      });
    } else {
      let machedAlias = '';

      if (this.interestNameAlias) {
        for (let i = 0; i < this.interests.length; i++) {
          for (let j = 0; j < this.interests[i].INTERESTS.length; j++) {
            if (this.interests[i].INTERESTS[j].INTEREST_NAME_ALIAS.toLowerCase() == this.interestNameAlias.toLowerCase()) {
              this.interestName = this.interests[i].INTERESTS[j].INTEREST_NAME;
              machedAlias = this.interests[i].INTERESTS[j].INTEREST_NAME_ALIAS;
              this.interestNameAliasExist = true;
              break;
            }
          }
        }
      }
      if (!this.interestNameAliasExist && this.interestNameAlias) {
        this._router.navigate(['400']); return;
      } else if (this.interestNameAlias !== machedAlias) {
        this._router.navigate(['prepare/' + machedAlias]);
        return;
      }
      this.getMarketPlaceDetails();
      this.getBestSellingCoursesWithPrice('');
      this.interestNameAliasExist = false;

    }
  }

  getMarketPlaceDetails() {
    const reqData = {
      interest_name: this.interestName
    };
    this._constantService.fetchDataApi(this._constantService.getMarketPlaceDetailsUrl(), reqData).subscribe(data => {
      const responseData: any = data;
      this.leftRelatedArticles = this.getUpdatedFieldsForArticle(responseData.MAKKETPLACE.LEFT_RELATED_ARTICLE);
      this.rightRelatedArticles = this.getUpdatedFieldsForArticle(responseData.MAKKETPLACE.RIGHT_RELATED_ARTICLE);
      this.centerRelatedArticles = this.getUpdatedFieldsForArticle(responseData.MAKKETPLACE.CENTER_RELATED_ARTICLE);
      this.popularCourses = this.getUpdatedFieldsForCourse(responseData.MAKKETPLACE.POPULAR_COURSES);
      this.trendingInEducationArticles = this.getUpdatedFieldsForArticle(responseData.MAKKETPLACE.TRENDING_IN_EDUCATION);
      this.featuredCourses = this.getUpdatedFieldsForCourse(responseData.MAKKETPLACE.FEATURED_COURSES);
      this.popularPages = responseData.MAKKETPLACE.POPULAR_PAGES;
      this.bannerContent=responseData.MAKKETPLACE.banrCntnt;
      this.bannerHeading=responseData.MAKKETPLACE.banrHdng;
      this.popularPages.forEach(element => {
        element.PAGE_TITLE = this.postDataService.decodeURIPostData(element.PAGE_TITLE);
        element.DESCRIPTION = this.postDataService.decodeURIPostData(element.DESCRIPTION);
        if (element.PROFILE_PHOTO_PATH) {
          element.PROFILE_PHOTO_PATH = element.PROFILE_PHOTO_PATH + 'profile/' + element.PAGE_UUID + '_150x150.png?v=' + element.IMG_UPD_DT;
        } else {
          element.PROFILE_PHOTO_PATH = this._constantService.defaultPageIndImgPath;
        }
        if (element.COVER_PHOTO_PATH) {
          element.COVER_PHOTO_PATH = element.COVER_PHOTO_PATH + 'cover/' + element.PAGE_UUID + '_1235x330.png?v=' + element.IMG_UPD_DT;
        } else {
          element.COVER_PHOTO_PATH = this._constantService.defaultCoverImgPath;
        }

      });
      setTimeout(() => {
        this.slickModal.slickPlay();
      }, 2000);
    })
  }

  getUpdatedFieldsForArticle(arr) {
    arr.forEach(element => {
      if (element.ARTICLE_COVER_URL) {
        element.ARTICLE_COVER_URL = element.ARTICLE_COVER_URL + '/' + element.ARTICLE_UUID + '.png?v=' + element.UPDATE_DATE_TIME;
      } else {
        element.ARTICLE_COVER_URL = this._constantService.defaultPageCollgImgPath;
      }

      element.timeElapsed = this.getTimeElapsed(new Date().getTime() - element.ADD_DATE_TIME);

    });
    return arr;

  }

  courseLevelVsName = {
    1: 'Beginner Level',
    2: 'Intermediate Level',
    3: 'Advance Level',
    4: 'All Levels'
  }

  getUpdatedFieldsForCourse(arr) {
    arr.forEach(element => {

      if (element.COVER_TYPE != 1) {
        element.COURSE_COVER_PHOTO_PATH = element.COURSE_COVER_PHOTO_PATH + 'cover/' + element.COURSE_UUID + '_1235x330.png';
      }
      element.levelName = this.courseLevelVsName[element.COURSE_LEVEL];
      if (element.COURSE_PRICE[0]) {
        element.courseDiscount = Math.round(((element.COURSE_PRICE[0].COST - element.COURSE_PRICE[0].DISCOUNT_COST) / element.COURSE_PRICE[0].COST) * 10000) / 100 + '%';
      }

      // element.timeElapsed = this.getTimeElapsed(new Date().getTime() - element.ADD_DATE_TIME);

    });
    return arr;

  }

  getBestSellingCoursesWithPrice(type) {
    this.noOfPagesInBestSellingCourse = undefined;
    this.pageNoArra = [];
    this.currentPage = 1;
    this.courseType = type;
    this.getBestSellingCourses(type);
  }


  getBestSellingCourses(courseType) {
    const reqData: any = { 'interest_name': this.interestName, 'count': this.currentPage, 'r_count': 4 }
    if (courseType != '') {
      reqData.cors_type = courseType;
    }


    this._constantService.fetchDataApi(this._constantService.getBestSellingCoursesUrl(), reqData).subscribe(data => {
      const responseData: any = data;
      this.bestSellingCourses = this.getUpdatedFieldsForCourse(responseData.BEST_SELLING_COURSES);
      if (!this.noOfPagesInBestSellingCourse) {
        if (Math.floor(responseData.BEST_SELLING_COURSES_COUNT / reqData.r_count) == (responseData.BEST_SELLING_COURSES_COUNT / reqData.r_count)) {
          this.noOfPagesInBestSellingCourse = Math.floor(responseData.BEST_SELLING_COURSES_COUNT / reqData.r_count);
        }
        else {
          this.noOfPagesInBestSellingCourse = Math.floor(responseData.BEST_SELLING_COURSES_COUNT / reqData.r_count) + 1;
        }

        for (let i = 0; i < this.noOfPagesInBestSellingCourse; i++) {
          this.pageNoArra[i] = {
            value: i + 1,
            activated: false
          }
        }
        if (this.pageNoArra[0]) {
          this.pageNoArra[0].activated = true;
        }
      }
      this.bestSellingCoursesSlick = this.bestSellingCoursesSlick.concat(this.bestSellingCourses);

    })
  }

  routTo(name) {
    this._router.navigate(['prepare/' + name]);
  }
  showmenue() {
    this.pricemenue = !this.pricemenue;
  }

  getTimeElapsed(milliseconds) {
    if (milliseconds >= (TwoDayMilliSeconds)) {
      return Math.round(milliseconds / dayMilliSeconds) + ' days ago';
    }
    if (milliseconds > dayMilliSeconds) {
      return '1 day ago';
    }
    if (milliseconds >= 7200000) {
      return Math.round(milliseconds / 7200000) + ' hours ago'
    }
    if (milliseconds >= 3600000) {
      return 'an hour ago'
    }
    if (milliseconds > 120000) {
      return Math.round(milliseconds / 60000) + ' minutes ago'
    }
    return 'just now'
  }


  routToArticle(article) {
    this._router.navigate(['article/' + article.ARTICLE_ID + '/' + article.ARTICLE_UUID]);
  }
  routToCourse(course) {
    this._router.navigate(['course/' + course.COURSE_URL]);
  }
  routToPage(page) {
    this._router.navigate(['page/' + page.PAGE_UUID]);
  }

  goToPage(page) {
    this.pageNoArra.forEach(element => {
      if (element.value == page.value) {
        element.activated = true;
      } else { element.activated = false; }
    });

    this.currentPage = page.value;
    this.getBestSellingCourses(this.courseType);

  }

  nextPage() {
    if (this.currentPage < this.noOfPagesInBestSellingCourse) {
      this.currentPage++;
      this.goToPage({ value: this.currentPage, activated: true });
    }

  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.goToPage({ value: this.currentPage, activated: true });

    }

  }

  openNav() {
    this.opennavleft = !this.opennavleft;
    if (this.opennavleft == true) {
      document.getElementsByTagName('body')[0].classList.add('body-overflow');
    } else {
      document.getElementsByTagName('body')[0].classList.remove('body-overflow');
    }
    const acc = document.getElementsByClassName('accordion');
    let i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener('click', function () {
        this.classList.toggle('active');
        const panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    }
  }

  savepopup(course, index) {
    if (this._constantService.getSessionDataBYKey('token')) {
      if (course.SAVED == 0) {
        this.savepagepopup = !this.savepagepopup;
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('body-overflow');
        this.courseSavedData = course;
        this.courseSavedData['TYPE'] = 7;
        this.cardClickedIndex = index;
      } else {
        this.cardClickedIndex = index;
        this.putCourseUnsaved(course);
      }
    } else {
      this.openLoginPopup = true;

    }
  }


  putCourseUnsaved(courseData) {

    if (courseData.USER_POST_ID) {

    } else {
      let x = courseData.COURSE_POST_ID;
      x = x.split(':');
      courseData['USER_POST_ID'] = x[1];
    }
    const updatePostUnsaved = {};
    updatePostUnsaved['token'] = this._constantService.getSessionDataBYKey('token');
    updatePostUnsaved['token_param'] = {};
    updatePostUnsaved['token_param']['device_type'] = 'w';
    updatePostUnsaved['token_param']['host'] = '';
    updatePostUnsaved['sfldid'] = courseData.SAVED_POST_FLD_ID;
    updatePostUnsaved['pid'] = courseData.USER_POST_ID;

    this._constantService.fetchDataApi(this._constantService.putUserPostUnsaved(), updatePostUnsaved).subscribe(data => {
      const responseData: any = data;
      const status = responseData.STATUS;
      if (status == this._constantService.success_msg) {
        this._constantService.showToast('Unsaved successfully', 'Post', '1');

        this.saveCondition = false;
        this._constantService.callEmptyStateMethod();
      } else if (status == this._constantService.error_token) {
        this.dataConf['type'] = 4;
        this.dataConf['msg'] = 'Session Expire';
        this.dataConf['error_msg'] = 'Session Expired';
        this.openConfirmation = true;
      } else {
        this.dataConf['type'] = 2;
        this.dataConf['msg'] = 'STUDY24X7';
        this.dataConf['error_msg'] = responseData.ERROR_MSG;
        this.openConfirmation = true;
      }
    }, error => {
      const responseData = error;
      if (responseData.status == 500) {
        this._router.navigate(['500']);
      }
    });

  }

  leftSideFilter() {
    this.leftFilterMenu = !this.leftFilterMenu;
    if (this.leftFilterMenu == true) {
      const body = document.getElementsByTagName('body')[0];
      body.classList.add('body-overflow');
    } else {
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('body-overflow');
    }
  }
  loginbtn(id) {
    this.loginright = id;
  }
  closelogin() {
    this.logincloseright = !this.logincloseright;
    this.loginright = 1;
    if (this.logincloseright == true) {
      const body = document.getElementsByTagName('body')[0];
      body.classList.add('body-overflow');
    } else {
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('body-overflow');
    }
  }

  loginSubmit() {
    this.loginMessage = this.loginService.loginSubmit(this.loginId, this.password);
  }



  registerSubmit() {
    this.regiterDetails = this.registerService.registerSubmit(this.registrationDetails);
  }
  formatDate() {
    this.regiterDetails.dateOfBirth = this.registerService.formatDate(this.registrationDetails.dateOfBirth);
    console.log(this.regiterDetails.dateOfBirth);
  }
  routToQuestion(endpoint) {
    this._router.navigate([endpoint]);

  }
  setCokie() {
    this._cookie.set('follow-page', '1', 0, '/');

  }





}
