import { Component, OnInit } from "@angular/core";
import { ConstantService } from "src/app/services/constant.service";
import { PostdataService } from "src/app/services/postdata.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-filtered-courses",
  templateUrl: "./filtered-courses.component.html",
  styleUrls: [
    "../../courses/courses.component.scss",
    "../all-courses.component.scss",
    "./filtered-courses.component.scss",
  ],
})
export class FilteredCoursesComponent implements OnInit {
  starRatingObject = this._constantService.starRatingObject;
  filter: any = {};
  filteredCourses: any = [];
  scrollDownOn = true;
  count = 1;
  isLoggedIn: boolean = true;
  fetchingData: boolean = true;
  constructor(
    private _constantService: ConstantService,
    private _postDataService: PostdataService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    if (this._constantService.getSessionDataBYKey('token'))
      this.isLoggedIn = true;
    else
      this.isLoggedIn = false;
  }

  ngOnInit(): void { }

  getFilteredCourses(filter) {
    window.scrollTo(0, 0);
    this.count = 1;
    this.scrollDownOn = true;
    if (filter.isFilterApplied) {
      this.filter = filter;
      var reqData = {};
      reqData["token"] = this._constantService.getSessionDataBYKey("token");
      reqData["token_param"] = {};
      reqData["token_param"]["device_type"] = "w";
      reqData["token_param"]["host"] = "";
      reqData["count"] = this.count;
      reqData["r_count"] = 10;
      reqData["order"] = "";
      reqData["cor_ty"] = filter.price;
      reqData["search_text"] = "";
      reqData["levels"] = filter.level;
      reqData["lanids"] = filter.language;
      reqData["intr"] = filter.interests;
      reqData["trl"] = "";
      reqData["pg_uuids"] = filter.pageUUIds;
      reqData["validity"] = filter.validity;
      reqData["rating"] = filter.userRating;
      var url;
      if (this.isLoggedIn)
        url = this._constantService.getAllCourseDetailProfile();
      else
        url = this._constantService.getAllCourseDetailProfilePublicUrl();
      this._constantService
        .fetchDataApi(
          url,
          reqData
        )
        .subscribe((data) => {
          var responseData: any = data;
          if (responseData.STATUS == "success") {
            this._router.navigate(["/all-courses"], {
              queryParams: {
                p: filter.price,
                v: filter.validity,
                i: filter.interests,
                u: filter.rating,
                l: filter.level,
                lg: filter.language,
              },
            });
            this.filteredCourses = responseData.INTEREST_COURSES;
            this.filteredCourses.forEach((element) => {
              element.COURSE_TITLE = this._postDataService.decodeURIPostData(
                element.COURSE_TITLE
              );
              element.PAGE_TITLE = this._postDataService.decodeURIPostData(
                element.PAGE_TITLE
              );
              if (element.COVER_TYPE != 1) {
                if(window.innerWidth>480)
                element.COURSE_COVER_PHOTO_PATH = element.COURSE_COVER_PHOTO_PATH + 'cover/' + element.COURSE_UUID + '_600x300.jpg';
                else
                element.COURSE_COVER_PHOTO_PATH = element.COURSE_COVER_PHOTO_PATH + 'cover/' + element.COURSE_UUID + '_300x150.jpg';                

              }
              if (element.PAGE_PROFILE_PHOTO_PATH) {
                element.PAGE_PROFILE_PHOTO_PATH = element.PAGE_PROFILE_PHOTO_PATH + 'profile/' + element.PAGE_UUID + '_120x120.png'
              } else {
                element.PAGE_PROFILE_PHOTO_PATH = this._constantService.defaultPageIndImgPath;
              }
              this.fetchingData=false;
            });
          }
        });
    }
  }

  getFilteredCoursesByScroll(filter) {
    if (filter.isFilterApplied) {
      var reqData = {};
      reqData["token"] = this._constantService.getSessionDataBYKey("token");
      reqData["token_param"] = {};
      reqData["token_param"]["device_type"] = "w";
      reqData["token_param"]["host"] = "";
      reqData["count"] = this.count;
      reqData["r_count"] = 20;
      reqData["order"] = "";
      reqData["cor_ty"] = filter.price;
      reqData["search_text"] = "";
      reqData["levels"] = filter.level;
      reqData["lanids"] = filter.language;
      reqData["intr"] = filter.interests;
      reqData["trl"] = "";
      reqData["pg_uuids"] = filter.pageUUIds;
      reqData["validity"] = filter.validity;
      reqData["rating"] = filter.userRating;
      var url;
      if (this.isLoggedIn)
        url = this._constantService.getAllCourseDetailProfile();
      else
        url = this._constantService.getAllCourseDetailProfilePublicUrl();
      this._constantService
        .fetchDataApi(
          url,
          reqData
        ).subscribe((data) => {
          var responseData: any = data;
          if (responseData.STATUS == "success") {
            if (responseData.INTEREST_COURSES.length > 0) {
              responseData.INTEREST_COURSES.forEach((element) => {
                element.COURSE_TITLE = this._postDataService.decodeURIPostData(
                  element.COURSE_TITLE
                );
                element.PAGE_TITLE = this._postDataService.decodeURIPostData(
                  element.PAGE_TITLE
                );
                if (element.COVER_TYPE != 1) {
                  if(window.innerWidth>480)
                element.COURSE_COVER_PHOTO_PATH = element.COURSE_COVER_PHOTO_PATH + 'cover/' + element.COURSE_UUID + '_600x300.jpg';
                else
                element.COURSE_COVER_PHOTO_PATH = element.COURSE_COVER_PHOTO_PATH + 'cover/' + element.COURSE_UUID + '_300x150.jpg';  

                }
                if (element.PAGE_PROFILE_PHOTO_PATH) {
                  element.PAGE_PROFILE_PHOTO_PATH = element.PAGE_PROFILE_PHOTO_PATH + 'profile/' + element.PAGE_UUID + '_120x120.png'
                } else {
                  element.PAGE_PROFILE_PHOTO_PATH = this._constantService.defaultPageIndImgPath;
                }
                // if (element.COURSE_COVER_PHOTO_PATH) {
                //   element.COURSE_COVER_PHOTO_PATH =element.COURSE_COVER_PHOTO_PATH + 'cover/' + element.COURSE_UUID + '_300x150.jpg' 
                //    } else {
                //   element.COURSE_COVER_PHOTO_PATH = this._constantService.defaultCoverImgPath;
                // }
                this.filteredCourses.push(element);

              });
            } else {
              this.scrollDownOn = false;
            }
          }
        });
    }
  }

  onScrollDown() {
    console.log("scrolledDown");
    if (this.scrollDownOn) {
      this.count++;
      this.getFilteredCoursesByScroll(this.filter)
    }

  }
  updateSourcePic(event) {
    event.target.src =  "./assets/images/coverimage.jpg";;
}
}
