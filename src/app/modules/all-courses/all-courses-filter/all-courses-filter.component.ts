import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ConstantService } from "src/app/services/constant.service";
import { Router, ActivatedRoute } from "@angular/router";
import { PerfectScrollbarComponent, PerfectScrollbarDirective, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { PostdataService } from './../../../services/postdata.service';

@Component({
  selector: "app-all-courses-filter",
  templateUrl: "./all-courses-filter.component.html",
  styleUrls: [
    "../../leaderboard/filter-by-interest/responsiveui.css",
    "../../search/searchfilter/checkbox.css",
    "../../search/searchfilter/searchfilter.component.scss",
    "./all-courses-filter.component.scss",
  ],
})
export class AllCoursesFilterComponent implements OnInit {
  @Output() filterEmitter = new EventEmitter();
  filters: any;
  config: any = {};
  interestFilterCtegory: any = -1;
  filterApplied: boolean;
  interestSearchText = "";
  ratedCourseCount: any = {};
  params: any;
  pageSerchText = "";
  nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  searchedPages: any = [];
  trendingPages: any = [];
  isWebView = true;
  userInterests: any;
  allLanguages: string;
  applyButtonHide=false;
  languageList: any;
  isLoggedIn: any=true;;
  constructor(
    private _constantService: ConstantService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private postData: PostdataService


  ) {
    if (!this._constantService.getSessionDataBYKey('token')) {
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
    }
   }
  priceFilters = {
    id: "price-filter",
    filters: [
      { name: "All", value: "" },
      { name: "Paid", value: 1 },
      { name: "Free", value: 0 },
    ],
    value: "",
  };

  validityFilters = {
    id: "validity-filter",
    filters: [
      { name: "All", value: "" },
      { name: "Unlimited", value: 0 },
      { name: "Limited", value: 1 },
    ],
    value: "",
  };

  interestFilters: any = {
    id: "interest-filter",
    filters: [],
    value: "",
  };

  userRatingFilters = {
    id: "rating-filter",
    filters: [
      { name: "1", value: 1 },
      { name: "2", value: 2 },
      { name: "3", value: 3 },
      { name: "4", value: 4 },
    ],
    value: '',
  };

  levelFilters = {
    id: "level-filter",
    filters: [
      { name: "All levels", value: 4 },
      { name: "Advance", value: 3 },
      { name: "Intermediate", value: 2 },
      { name: "Beginner", value: 1 },
    ],
    value: '',
  };

  languageFilters = {
    id: "language-filter",
    filters: [],
    value: "",
  };

  pageFilter = {
    id: "page-filter",
    value: "",
  };

  intListExpended = false;

  ngOnInit(): void {
    // var allLanguages=JSON.parse(this._constantService.getAllLanguageObj());
    // allLanguages.forEach(language => {
    //   var lang = {name:language.LANGUAGE, value:language.LANGUAGE_ID}
    //   this.languageFilters.filters.push(lang);

    // });

    this.getAllLanguage();

    if (window.innerWidth > 960)
      this.isWebView = true;
    else
      this.isWebView = false;
    var params = new URLSearchParams(window.location.search);
    this.params = params;

    if (params.has("p")) {
      this.priceFilters.value = params.get("p");
    }
    if (params.has("v")) {
      this.validityFilters.value = params.get("v");
    }
    if (params.has("r")) {
      this.userRatingFilters.value = params.get("r");
    }
    if (params.has("lg")) {
      this.languageFilters.value = params.get("lg");
    }
    if (params.has("l")) {
      this.levelFilters.value = params.get("l");
    }


    this.getInterest();
      this.getFixedPopularPagesList();

  }

  getAllLanguage() {

    this._constantService.fetchDataApiWithoutBody(this._constantService.getAllLanguageServiceUrl())
      .subscribe(data => {
        let responseData: any = data;
        if (responseData.success = this._constantService.success_msg) {
          this.languageList = responseData.LNG_LIST;
          this.languageList.forEach(language => {
            var lang = { name: language.LANGUAGE, value: language.LANGUAGE_ID };
            this.languageFilters.filters.push(lang);

          });

        }
      });
  }

  getInterest() {
    this._constantService
      .fetchDataApiWithoutBody(this._constantService.getInterestv1ServiceUrl())
      .subscribe(
        (data) => {
          let responseData: any = data;
          this.interestFilters.filters = responseData.INTERESTS_DATA;

          if (this.params.has("i")) {
            var intIds = this.params.get("i").split(',');
            intIds.forEach(id => {
              this.check(this.interestFilters.id, id, false);
              this.interestFilters.filters.forEach(element => {
                element.INTERESTS.forEach(interest => {
                  if (interest.INTEREST_ID == id) {
                    interest.checked = true;
                  }
                });

              });
            })
            if (
              this.params.has("p") ||
              this.params.has("v") ||
              this.params.has("i") ||
              this.params.has("l") ||
              this.params.has("lg") ||
              this.params.has("r")
            ) {
              this.setFilter(true);
              setTimeout(() => {
                this.setFilter(true);

              }, 100)
            }
          }
        },
        (error) => {
          var responseData = error;
          if (responseData.status == 500) {
            this._router.navigate(["500"]);
          }
        }
      );
  }

  filterInterestFilters() {
    if (this.interestSearchText.length > 0) {
      this.interestFilters.filters.forEach((filterCat) => {
        filterCat.show = false;
        filterCat.INTERESTS.forEach((filter) => {
          if (filter.INTEREST_NAME.toLowerCase().includes(this.interestSearchText.toLowerCase())) {
            filterCat.show = true;
            filter.show = true;
          } else {
            filter.show = false;
          }
        });
      });
    } else {
      this.interestFilters.filters.forEach((filterCat) => {
        filterCat.show = false;
        filterCat.INTERESTS.forEach((filter) => {
          filter.show = true;
        });
      });
    }
  }

  getPagesDetailsBySearch() {
    for (var key in this.searchedPages) {
      if (!this.searchedPages[key].checked) {
        delete this.searchedPages[key];
      }
    }
    var reqData = {};
    reqData["token"] = this._constantService.getSessionDataBYKey("token");
    reqData["token_param"] = {};
    reqData["token_param"]["device_type"] = "w";
    reqData["token_param"]["host"] = "";
    reqData["sdt"] = this.pageSerchText;
    reqData["count"] = "1";
    reqData["r_count"] = 1000000;
    this._constantService
      .fetchDataApi(this._constantService.getPagesDetailsBySearchUrl(), reqData)
      .subscribe((data) => {
        var responseData: any = data;
        if (responseData.STATUS == "success") {
          responseData.PAGE_DATA.forEach((page) => {
            if (!this.searchedPages[page.PAGE_UUID])
              this.searchedPages[page.PAGE_UUID] = page;
          });
          console.log(this.searchedPages);
        }
      });
  }
  checkPage(uuid) {
    if (this.pageFilter.value.includes(uuid)) {
      this.pageFilter.value = this.pageFilter.value.replace("," + uuid, "");
      this.pageFilter.value = this.pageFilter.value.replace(uuid, "");
      this.pageFilter.value = this.pageFilter.value.replace(",,", ",");
    } else {
      this.pageFilter.value = this.pageFilter.value + uuid + ",";
    }
    if (this.isWebView)
      this.setFilter(true);
  }

  check(id, val, isFilterApplied) {

    switch (id) {
      case this.interestFilters.id:
        var idVsId = [];
        var ids = this.interestFilters.value.split(',');
        for (var i = 0; i < ids.length; i++) {
          idVsId[ids[i]] = ids[i];
        }
        if (idVsId[val]) {
          delete idVsId[val];
        }
        else {
          idVsId[val] = val;
        }

        var str = '';
        for (var key in idVsId) {
          if (key != '')
            var str = key + ',' + str;
        }
        this.interestFilters.value = str;

        break;
    }
    if (this.isWebView && isFilterApplied)
      this.setFilter(true);
  }

  fromWebView() {
    if (this.isWebView) {
      this.setFilter(true);
    }
  }

  setFilter(isFilterApplied) {
    this.filterApplied = true;
    var filters = {
      price: "0",
      validity: "0",
      interests: "",
      userRating: "0",
      level: "0",
      language: "0",
      isFilterApplied: isFilterApplied,
      pageUUIds: "",
    };
    filters.price = this.priceFilters.value + "";
    filters.validity = this.validityFilters.value + "";
    filters.interests = this.interestFilters.value;
    filters.userRating = this.userRatingFilters.value + "";
    filters.level = this.levelFilters.value + "";
    filters.language = this.languageFilters.value + "";
    filters.pageUUIds = this.pageFilter.value;

    this.filterEmitter.emit(filters);
  }

  getCheckedValue(event) {
    var checked = event.target.checked;
    return checked;
  }

  clearFilter() {
    this.filterApplied = false;
    this.userRatingFilters.value = '';
    this.priceFilters.value = "";
    this.validityFilters.value = "";
    this.interestFilters.value = "";
    this.languageFilters.value = "";
    this.levelFilters.value = '';
    this.interestFilters.filters.forEach((category) => {
      category.INTERESTS.forEach((interest) => {
        interest.checked = false;
      });
    });
    this._router.navigate(["/all-courses"]);
    this.searchedPages = [];
    this.pageFilter.value = "";
    this.getFixedPopularPagesList();
    this.pageSerchText = '';
    this.interestSearchText = '';
    this.setFilter(false);
  }

  getNumberOfCoursesAboveRatings() {
    var reqData = {};
    reqData["token"] = this._constantService.getSessionDataBYKey("token");
    reqData["token_param"] = {};
    reqData["token_param"]["device_type"] = "w";
    reqData["token_param"]["host"] = "";
    this._constantService
      .fetchDataApi(this._constantService.getRatedCourseCountUrl(), reqData)
      .subscribe((data) => {
        var responseData: any = data;
        this.ratedCourseCount[1] = responseData.RATED_COURSE_COUNT["1 & ABOVE"];
        this.ratedCourseCount[2] = responseData.RATED_COURSE_COUNT["2 & ABOVE"];
        this.ratedCourseCount[3] = responseData.RATED_COURSE_COUNT["3 & ABOVE"];
        this.ratedCourseCount[4] = responseData.RATED_COURSE_COUNT["4 & ABOVE"];
      });
  }

  getFixedPopularPagesList() {
    var reqData = {};    
    this._constantService
      .fetchDataApi(
        this._constantService.getFixedPopularPagesListUrl(),
        reqData
      )
      .subscribe((data) => {
        var responseData: any = data;
        this.trendingPages = responseData.PAGE_DATA[0].PAGE_DETAIL;
        this.trendingPages.forEach((page) => {
          if (!this.searchedPages[page.PAGE_UUID])
            this.searchedPages[page.PAGE_UUID] = page;
        });
        console.log(this.searchedPages);
      });
  }
  setUserInteresInInterestFilter(interestCategoryId = '') {
    if(!this.isLoggedIn){
      this.setFilter(true);
      return false;                                                         
    }
    if (!this.userInterests)
      this.getUserInterest(interestCategoryId);
    else {
      this.clearFilter();
      if (interestCategoryId == '') {
        this.userInterests.forEach(userInterest => {
          this.interestFilters.filters.forEach(element => {
            element.INTERESTS.forEach(interest => {
              if (interest.INTEREST_ID == userInterest.INTEREST_ID) {
                interest.checked = true;
                this.interestFilters.value = interest.INTEREST_ID + ',' + this.interestFilters.value;
              }
            });

          });

        });
      } else {
        this.interestFilters.filters.forEach(element => {
          if (element.INTEREST_CATEGORY_ID == interestCategoryId) {
            element.INTERESTS.forEach(interest => {
              interest.checked = true;
              this.interestFilters.value = interest.INTEREST_ID + ',' + this.interestFilters.value;

            });
          }
        });
      }
      this.priceFilters.value='';
      this.validityFilters.value='';
      this.setFilter(true);

    }

  }
  getUserInterest(interestCategoryId) {
    var usr_interest = {};
    usr_interest['token'] = this._constantService.getSessionDataBYKey('token');
    usr_interest['token_param'] = {};
    usr_interest['token_param']['device_type'] = 'w';
    usr_interest['token_param']['host'] = '';

    this._constantService.fetchDataApi(this._constantService.getUserInterestServiceUrl(), usr_interest).subscribe(data => {
      var responseData: any = data;
      var status = responseData.STATUS;
      if (status == this._constantService.success_msg) {
        this.userInterests = responseData.INTEREST_ID;
        this.setUserInteresInInterestFilter(interestCategoryId);


      } else if (responseData.STATUS == 'error_token') {
        this._router.navigate(['/home']);
      }
    }, error => {
      var responseData = error;

      if (responseData.status == 500) {
        this._router.navigate(['500']);
      }
    });
  }



}
