import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ConstantService } from './../../services/constant.service';
import { PostdataService } from './../../services/postdata.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { EncryptionService } from './../../services/encryption.service';
import { Location } from '@angular/common';



@Component({
    selector: 'app-mycourses',
    templateUrl: './mycourses.component.html',
    styleUrls: ['./mycourses.component.scss', './../courses/courses.component.scss'],
    host: {
        '(window:scroll)': 'onScroll($event)'
    }
})
export class MycoursesComponent implements OnInit {
    waitTime;
    lstCallTag: any = 0;
    username: any;
    time = [];
    lastopencontent: any;
    gotocourse: boolean = false;
    enablebttn: boolean = false;
    cardClickedIndex: any;
    dataConf: any[];
    NullValidity: boolean = false;
    myCoursesPresent: boolean = true;
    courseSavedData: any[];
    savepagepopup: boolean = false;
    saveCondition: boolean = false;
    isFree: boolean;
    showDays: boolean;
    walldropdown: boolean = false;
    walldrop: boolean = false;
    languageList = [];
    AllMyCourse: any[];
    courseTabAdmin: number;
    flag = 1;
    hideCose: boolean = false;
    notshowImage: boolean = false;
    show_rating: boolean = false;
    rpsign: boolean = false;
    hiderp: boolean = false;
    AllCourse: any[];
    is_admin: boolean = false;
    courseSearch = '';
    count = 1;
    countAllCourse = 1;
    countEnrolledCourse = 0;
    continueAllScroll: boolean = false;
    @Input() pageTab: number;
    pageTabContent: number = 1;
    continueScroll: boolean = false;
    coursePresent: boolean = false;
    followedPagecoursePresent: boolean = false;
    purchasedCoursePresent: boolean = false;
    startLoader2: boolean = true;
    startLoader: boolean = true;
    mycourse = [];
    allCourses = [];
    myladdtm = "";
    flow = 0;
    openConfirmation: boolean = false;
    validity = 0;
    corsTyp: string = '';
    visibilityTyp = 3;
    order: string = '';
    visibilityText: string = "Sort by";
    visibilityfilter: string = "Filter";
    onetime: true;
    isScrolledstick = false;
    currPos: Number = 0;
    startPos: Number = 0;
    changePos: Number = 0;
    contents = [{ 'section_UUID': '', 'section_title': '', 'sectionContents': [] }];
    constructor(
        public _constantService: ConstantService,
        private _encrypt: EncryptionService,
        private postData: PostdataService,
        private _router: Router,
        private _location: Location,
        private activatedRoute: ActivatedRoute,

    ) { }
    onScroll(evt) {
        var secHeight = document.getElementById('stickheadcourse').offsetHeight;
        var innerWindHeight = window.innerHeight;
        if (secHeight < innerWindHeight) {
            if (window.innerWidth < 991) {
                this.changePos = secHeight + 150;
                this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
                if (this.currPos > this.changePos) {
                    this.isScrolledstick = true;
                } else {
                    this.isScrolledstick = false;
                }
            }
        } else {
            this.isScrolledstick = false;
        }
    }
    ngOnInit() {
        this.pageTabContent = this.pageTab;
        this.countEnrolledCourse = 0;
        this.activatedRoute.params.subscribe((params: Params) => {
            this.enablebttn = false;
            if (params['id'] != undefined && params['id'] != null) {
                if (params['id'] != undefined) {
                    this.username = params['id'];
                } else {
                    this.username = this._constantService.getSessionDataBYKey('username');
                }
                setTimeout(() => {
                    if (params['tabid'] == "#Courses:mycourses") {
                        this.courseTabAdmin = 2;
                        this.courseTabAdminClick(2, 2);
                    } else if (params['tabid'] == "#Courses:allcourses") {
                        this.courseTabAdmin = 1;
                        this.courseTabAdminClick(1, 2);
                    }
                }, 100)
            }
        });
        this._location.subscribe(() => this.back())
        this.getAllLanguage();

        //        if (this.pageTab == 1) {
        //            this.courseTabAdminClick(1, 1);
        //        } else {
        //            this.courseTabAdminClick(2, 1);
        //        }
    }

    back() {
        this.enablebttn = false;
        //        this.activatedRoute.params.subscribe((params: Params) => {
        //            if (params['tabid'] != undefined && params['tabid'] != null) {
        //                if (params['tabid'] == "#Courses:mycourses") {
        //                    this.AllMyCourse = [];
        //                    this.courseTabAdmin = 2;
        //                    this.courseTabAdminClick(2, 3);
        //                } else if (params['tabid'] == "#Courses:allcourses") {
        //                    this.courseTabAdmin = 1;
        //                    this.allCourses = [];
        //                    this.courseTabAdminClick(1, 3);
        //                }
        //            }
        //        });
    }

    onScrollDown() {
        this.enablebttn = false;
        if (this.continueAllScroll) {
            if (this.courseTabAdmin == 1) {
                this.getAllCourseDetailProfile();
            } else
                if (this.courseTabAdmin == 2) {
                    this.getMyEnrolledCourse(1);
                }
        }
    }

    courseTabUrlFxn(id) {
        if (id == 1) {
            this._router.navigate(['profile/' + this.username + '/#Courses:allcourses']);
        } else if (id == 2) {
            this._router.navigate(['profile/' + this.username + '/#Courses:mycourses']);
        }
    }

    courseTabAdminClick(id, callTag) {
        this.flag = 1;
        this.allCourses = [];
        this.AllMyCourse = [];
        this.corsTyp = '';
        this.order = '';
        this.courseSearch = '';
        if (id == 1) {
            this.courseTabAdmin = 1;
            this.courseSearch = '';
            this.visibilityText = 'Sort By';
            this.visibilityfilter = 'Filter';
            this.allCourses = [];
            this.AllMyCourse = [];
            this.countAllCourse = 1;
            if (callTag == 8) {
                this.enablebttn = false;
            }
            this.getAllCourseDetailProfile();
            this.lstCallTag = callTag;

        }
        if (id == 2) {
            this.courseTabAdmin = 2
            this.courseSearch = '';
            this.visibilityText = 'Sort By';
            this.visibilityfilter = 'Filter';
            this.allCourses = [];
            this.AllMyCourse = [];
            this.countEnrolledCourse = 0;
            this.getMyEnrolledCourse(2);
        }

    }


    changeVisibilityMyCourse(id) {
        this.walldropdown = !this.walldropdown;
        this.countEnrolledCourse = 0;
        this.AllCourse = [];
        this.AllMyCourse = [];
        this.countAllCourse = 1;
        this.countEnrolledCourse = 0;
        this.flag = 1;
        if (id == 2) {
            this.visibilityText = 'A-Z';
            //this.visibilityTyp = 2;
            this.order = 'atoz';

        } else if (id == 3) {
            this.visibilityText = 'Z-A';
            // this.visibilityTyp = 1;
            this.order = 'ztoa';

        }
        this.getMyEnrolledCourse(3);
    }

    changeVisibility(id) {
        this.walldropdown = !this.walldropdown;
        this.AllCourse = [];
        this.AllMyCourse = [];
        this.countAllCourse = 1;

        this.flag = 1;
        if (id == 2) {
            this.visibilityText = 'A-Z';
            //this.visibilityTyp = 2;
            this.order = 'atoz';

        } else if (id == 3) {
            this.visibilityText = 'Z-A';
            // this.visibilityTyp = 1;
            this.order = 'ztoa';

        }
        this.getAllCourseDetailProfile();
    }

    changeVisibilitySort(id) {
        this.walldrop = !this.walldrop;
        this.countAllCourse = 1;
        this.flag = 1;
        this.AllCourse = [];
        this.AllMyCourse = [];
        if (id == 3) {
            this.visibilityfilter = 'All';
            //this.visibilityTyp = 3;
            this.corsTyp = '';
        } else if (id == 2) {
            this.visibilityfilter = 'Free';
            //this.visibilityTyp = 2;
            this.corsTyp = '0';
        } else if (id == 1) {
            this.visibilityfilter = 'Paid';
            //this.visibilityTyp = 1;
            this.corsTyp = '1';

        }
        this.getAllCourseDetailProfile();
    }

    myCourseSort(id) {
        this.walldrop = !this.walldrop;
        this.countEnrolledCourse = 0;
        this.countAllCourse = 1;
        this.countEnrolledCourse = 0;
        this.flag = 1;
        this.AllCourse = [];
        this.AllMyCourse = [];
        if (id == 3) {
            this.visibilityfilter = 'All';
            //this.visibilityTyp = 3;
            this.corsTyp = '';
        } else if (id == 2) {
            this.visibilityfilter = 'Free';
            //this.visibilityTyp = 2;
            this.corsTyp = '0';
        } else if (id == 1) {
            this.visibilityfilter = 'Paid';
            //this.visibilityTyp = 1;
            this.corsTyp = '1';

        }
        this.getMyEnrolledCourse(4);
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

    searchKey(event) {
        this.flag = 1;
        if (this.courseTabAdmin == 1 && this.flag == 1) {
            this.countAllCourse = 1;

            clearTimeout(this.waitTime);
            this.waitTime = setTimeout(() => {
                this.getAllCourseDetailProfile();
            }, 2000)

        }
        if (this.courseTabAdmin == 2) {
            this.countEnrolledCourse = 0;
            clearTimeout(this.waitTime);
            this.waitTime = setTimeout(() => {
                this.getMyEnrolledCourse(5);
            }, 2000)
        }
    }


    getAllCourseDetailProfile() {
        if (this.countAllCourse == 1 && !this.AllCourse) {
            this.startLoader2 = true;
        }

        var AllCourseDetail = {}
        AllCourseDetail['token'] = this._constantService.getSessionDataBYKey('token');
        AllCourseDetail['token_param'] = {};
        AllCourseDetail['token_param']['device_type'] = 'w';
        AllCourseDetail['token_param']['host'] = '';
        AllCourseDetail['count'] = this.countAllCourse;
        AllCourseDetail['r_count'] = "";
        AllCourseDetail['order'] = this.order;
        AllCourseDetail['cor_ty'] = this.corsTyp;
        AllCourseDetail['search_text'] = this.postData.encodeURIPostData(this.courseSearch);
        AllCourseDetail['levels'] = "";
        AllCourseDetail['lanids'] = "";
        AllCourseDetail['followed_pg_flg'] = this.flag;
        this.continueAllScroll = false;

        this._constantService.fetchDataApi(this._constantService.getAllCourseDetailProfile(), AllCourseDetail).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            console.log("my course");
            console.log(responseData);
            if (status == this._constantService.success_msg) {

                this.startLoader2 = false;

                if (this.countAllCourse == 1) {
                    this.AllCourse = [];
                }
                if (responseData.IS_ADMIN == 1) {
                    this.is_admin = true;
                }

                var cor_data = responseData.INTEREST_COURSES;
                if (cor_data.length != 0) {
                    this.countAllCourse++;
                    this.continueAllScroll = true;
                } else {
                    this.continueAllScroll = false;
                }
                for (var i = 0; i < cor_data.length; i++) {

                    cor_data[i].SUBSCRIPTION = cor_data[i].SUBSCRIPTION;

                    if (cor_data[i].TOTAL_ENROLLED_USER) {
                        if (cor_data[i].TRAIL_OFFSET) {
                            cor_data[i].TOTAL_ENROLLED_USER = parseInt(cor_data[i].TOTAL_ENROLLED_USER) + parseInt(cor_data[i].TRAIL_OFFSET);
                        }
                    } else {
                        cor_data[i].TOTAL_ENROLLED_USER = cor_data[i].TRAIL_OFFSET ? cor_data[i].TRAIL_OFFSET : 0;
                    }




                    if (cor_data[i].LANGUAGE != null && cor_data[i].LANGUAGE != undefined) {
                        for (var j = 0; j < this.languageList.length; j++) {
                            if (cor_data[i].LANGUAGE == this.languageList[j].LANGUAGE_ID)
                                cor_data[i].LANGUAGE = this.languageList[j].LANGUAGE;
                        }
                    }
                    if (cor_data[i].COURSE_TAGS) {
                        cor_data[i].COURSE_TAGS = cor_data[i].COURSE_TAGS.replace(/,/g, ', ');
                        cor_data[i].COURSE_TAGS = this.postData.decodeURIPostData(cor_data[i].COURSE_TAGS);
                    }
                    if (cor_data[i].COURSE_TITLE != null) {
                        cor_data[i].COURSE_TITLE = this.postData.decodeURIPostData(cor_data[i].COURSE_TITLE);
                    }
                    else { cor_data[i].COURSE_TITLE = '' }
                    if (cor_data[i].PAGE_TITLE != null) {
                        cor_data[i].PAGE_TITLE = this.postData.decodeURIPostData(cor_data[i].PAGE_TITLE);
                    }
                    else { cor_data[i].PAGE_TITLE = '' }
                    cor_data[i].SAVED = cor_data[i].SAVED;
                    if (cor_data[i].PUBLISH_DATE_TIME == null) {
                        cor_data[i].PUBLISH_DATE_TIME = ''
                    }
                    if (cor_data[i].DESCRIPTION != null) {
                        cor_data[i].DESCRIPTION = this.postData.decodeURIPostData(cor_data[i].DESCRIPTION);
                    } else { cor_data[i].DESCRIPTION = '' }
                    if (cor_data[i].ENROLLED_ADD_DATE_TIME != null && cor_data[i].ENROLLED_ADD_DATE_TIME != '') {
                        cor_data[i].ENROLLED_ADD_DATE_TIME = this.postData.getPostDateTime(cor_data[i].ENROLLED_ADD_DATE_TIME);
                    } else {
                        //                        cor_data[i].PUBLISH_DATE_TIME = this.postData.getPostDateTime(cor_data[i].ADD_DATE_TIME);
                    }
                    if (cor_data[i].UPDATE_DATE_TIME != null && cor_data[i].UPDATE_DATE_TIME != '') {
                        cor_data[i].UPDATE_DATE_TIME = this.postData.getPostDateTime(cor_data[i].UPDATE_DATE_TIME);
                    } else {
                        cor_data[i].UPDATE_DATE_TIME = this.postData.getPostDateTime(cor_data[i].ADD_DATE_TIME);
                    }
                    if (cor_data[i].ADD_DATE_TIME != null && cor_data[i].ADD_DATE_TIME != '') {
                        cor_data[i].ADD_DATE_TIME = this.postData.getPostDateTime(cor_data[i].ADD_DATE_TIME);
                    } else {
                        cor_data[i].ADD_DATE_TIME = cor_data[i].PUBLISH_DATE_TIME;
                    }
                    if (cor_data[i].COURSE_COVER_PHOTO_PATH != null) {
                        if (cor_data[i].COVER_TYPE == "0") {
                            cor_data[i].COURSE_COVER_PHOTO_PATH = cor_data[i].COURSE_COVER_PHOTO_PATH + "cover/" + cor_data[i].COURSE_UUID + '_1235x330.png';
                        }
                    } else {
                        cor_data[i].COURSE_COVER_PHOTO_PATH = this._constantService.defaultCoverImgPath;
                    }
                    if (cor_data[i].PAGE_PROFILE_PHOTO_PATH != null) {
                        cor_data[i].PAGE_PROFILE_PHOTO_PATH = cor_data[i].PAGE_PROFILE_PHOTO_PATH + "profile/" + cor_data[i].PAGE_UUID + '_120x120.png';
                    } else {
                        if (cor_data[i].PAGE_TYPE == 0) {
                            cor_data[i].PAGE_PROFILE_PHOTO_PATH = this._constantService.defaultPageIndImgPath;
                        } else {
                            cor_data[i].PAGE_PROFILE_PHOTO_PATH = this._constantService.defaultPageCollgImgPath;
                        }
                    }
                    if (cor_data[i].COURSE_TAGS == null) {
                        cor_data[i].COURSE_TAGS = '';
                    }
                    if (cor_data[i].COURSE_RATING == null) {
                        cor_data[i].COURSE_RATING = '';
                    }
                    if (cor_data[i].COURSE_TYPE == 1) {
                        var cost = cor_data[i].COURSE_PRICE;
                        for (var j = 0; j < cost.length; j++) {

                            if (cost[j].DISCOUNT_COST != '' && cost[j].DISCOUNT_COST != null) {
                                cor_data[i].DISCOUNT_COST = cost[j].DISCOUNT_COST;
                            } else {
                                cor_data[i].DISCOUNT_COST = '';
                            } if (cost[j].COST != '' && cost[j].COST != null) {
                                cor_data[i].COST = cost[j].COST;
                            } else { this.hideCose = false; }
                            if (cost[j].COST == 0 && cost[j].DISCOUNT_COST == 0) { this.hiderp = false }
                        }
                    } else {
                        cor_data[i].DISCOUNT_COST = "FREE";
                        this.hiderp = false; this.rpsign = false;
                    }
                    if (cor_data[i].PUBLISH == 1 || cor_data[i].PUBLISH == 5) {
                        this.show_rating = true;
                    }

                }
                this.AllCourse.push.apply(this.AllCourse, cor_data);

                if (this.AllCourse.length != 0) {
                    this.coursePresent = true;
                } else {
                    this.coursePresent = false;
                }
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });

    }

    getMyEnrolledCourse(val) {
        //        if (this.enablebttn == false) {
        this.enablebttn = true;
        if (this.countEnrolledCourse == 0) {
            this.startLoader = true;
        }

        var AllMyCourseProfile = {}
        AllMyCourseProfile['token'] = this._constantService.getSessionDataBYKey('token');
        AllMyCourseProfile['token_param'] = {};
        AllMyCourseProfile['token_param']['device_type'] = 'w';
        AllMyCourseProfile['token_param']['host'] = '';
        AllMyCourseProfile['index'] = this.countEnrolledCourse;
        AllMyCourseProfile['r_count'] = "";
        AllMyCourseProfile['order'] = this.order;
        AllMyCourseProfile['cor_ty'] = this.corsTyp;
        AllMyCourseProfile['search_text'] = this.postData.encodeURIPostData(this.courseSearch);
        AllMyCourseProfile['levels'] = "";
        AllMyCourseProfile['lanids'] = "";
        this.continueAllScroll = false;

        this._constantService.fetchDataApi(this._constantService.getMyEnrolledCourse(), AllMyCourseProfile).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.startLoader = false
                //this.courseSearch = '';
                var admin = responseData.IS_ADMIN;
                var cor_data;
                if (this.countEnrolledCourse == 0) {
                    this.AllMyCourse = [];
                    cor_data = [];
                    if (responseData.PAGE_COURSES.length == 0) {
                        this.myCoursesPresent = false;
                    } else {
                        this.myCoursesPresent = true;
                    }
                }
                if (admin == 1) {
                    this.is_admin = true;
                }
                cor_data = responseData.PAGE_COURSES;


                this.countEnrolledCourse = responseData.INDEX;
                if (cor_data.length > 9) {
                    this.continueAllScroll = true;
                } else {
                    this.continueAllScroll = false;
                }
                for (var i = 0; i < cor_data.length; i++) {
                    if (cor_data[i].LANGUAGE != null && cor_data[i].LANGUAGE != undefined) {
                        for (var j = 0; j < this.languageList.length; j++) {
                            if (cor_data[i].LANGUAGE == this.languageList[j].LANGUAGE_ID)
                                cor_data[i].LANGUAGE = this.languageList[j].LANGUAGE;
                        }
                    }
                    if (cor_data[i].COURSE_TITLE != null) {
                        cor_data[i].COURSE_TITLE = this.postData.decodeURIPostData(cor_data[i].COURSE_TITLE);
                    }
                    else { cor_data[i].COURSE_TITLE = '' }
                    if (cor_data[i].PAGE_TITLE != null) {
                        cor_data[i].PAGE_TITLE = this.postData.decodeURIPostData(cor_data[i].PAGE_TITLE);
                    } else {

                    }
                    if (cor_data[i].DESCRIPTION != null) {
                        cor_data[i].DESCRIPTION = this.postData.decodeURIPostData(cor_data[i].DESCRIPTION);
                    } else { cor_data[i].DESCRIPTION = '' }
                    if (cor_data[i].ENROLLED_UPDATE_DATE_TIME != null && cor_data[i].ENROLLED_UPDATE_DATE_TIME != '') {
                        //cor_data[i].ENROLLED_UPDATE_DATE_TIME = cor_data[i].ENROLLED_UPDATE_DATE_TIME;
                    } else {
                        cor_data[i].ENROLLED_UPDATE_DATE_TIME = '';
                    }
                    if (cor_data[i].UPDATE_DATE_TIME != null && cor_data[i].UPDATE_DATE_TIME != '') {
                        cor_data[i].UPDATE_DATE_TIME = this.postData.getPostDateTime(cor_data[i].UPDATE_DATE_TIME);
                    } else {
                        cor_data[i].UPDATE_DATE_TIME = this.postData.getPostDateTime(cor_data[i].ADD_DATE_TIME);
                    }
                    if (cor_data[i].ADD_DATE_TIME != null && cor_data[i].ADD_DATE_TIME != '') {
                        cor_data[i].ADD_DATE_TIME = this.postData.getPostDateTime(cor_data[i].ADD_DATE_TIME);
                    } else {
                        cor_data[i].ADD_DATE_TIME = this.postData.getPostDateTime(cor_data[i].PUBLISH_DATE_TIME);
                    }
                    if (cor_data[i].IS_ENROLLED == 1) {
                        cor_data[i].courseStatus = 'Enrolled on' + ' ' + this._constantService.getDateFromMilliseconds('dd mmm, yyyy', cor_data[i].ENROLLED_UPDATE_DATE_TIME);
                    } else if (cor_data[i].IS_ENROLLED == 0 && (cor_data[i].IS_SUBSCRIBE == 1 || cor_data[i].IS_SUBSCRIBE == 2)) {
                        cor_data[i].courseStatus = cor_data[i].RTRAIL_DURO;
                    }
                    if (cor_data[i].LANGUAGE != null && cor_data[i].LANGUAGE != undefined) {
                        for (var j = 0; j < this.languageList.length; j++) {
                            if (cor_data[i].LANGUAGE == this.languageList[j].LANGUAGE_ID)
                                cor_data[i].LANGUAGE = this.languageList[j].LANGUAGE;
                        }
                    }
                    if (cor_data[i].COURSE_TAGS) {
                        cor_data[i].COURSE_TAGS = cor_data[i].COURSE_TAGS.replace(/,/g, ', ');
                        cor_data[i].COURSE_TAGS = this.postData.decodeURIPostData(cor_data[i].COURSE_TAGS);
                    }
                    if (cor_data[i].COURSE_TITLE != null) {
                        cor_data[i].COURSE_TITLE = this.postData.decodeURIPostData(cor_data[i].COURSE_TITLE);
                    }
                    else { cor_data[i].COURSE_TITLE = '' }
                    if (cor_data[i].DESCRIPTION != null) {
                        cor_data[i].DESCRIPTION = this.postData.decodeURIPostData(cor_data[i].DESCRIPTION);
                    } else { cor_data[i].DESCRIPTION = '' }
                    if (cor_data[i].ENROLLED_UPDATE_DATE_TIME != null && cor_data[i].ENROLLED_UPDATE_DATE_TIME != '') {
                        cor_data[i].EXP_DATE_FOR_RENEWCARD = cor_data[i].ENROLLED_UPDATE_DATE_TIME + cor_data[i].VALIDITY * 86400000;
                        //                        cor_data[i].EXP_DATE_FOR_RENEWCARD = this.postData.getPostDateTime(cor_data[i].EXP_DATE_FOR_RENEWCARD);
                    } else {
                        cor_data[i].ENROLLED_UPDATE_DATE_TIME = '';
                    }
                    if (cor_data[i].UPDATE_DATE_TIME != null && cor_data[i].UPDATE_DATE_TIME != '') {
                        cor_data[i].UPDATE_DATE_TIME = this.postData.getPostDateTime(cor_data[i].UPDATE_DATE_TIME);
                    } else {
                        cor_data[i].UPDATE_DATE_TIME = this.postData.getPostDateTime(cor_data[i].ADD_DATE_TIME);
                    }
                    if (cor_data[i].ADD_DATE_TIME != null && cor_data[i].ADD_DATE_TIME != '') {
                        //                        cor_data[i].ADD_DATE_TIME = this.postData.getPostDateTime(cor_data[i].ADD_DATE_TIME);
                    } else {
                        //                        cor_data[i].ADD_DATE_TIME = this.postData.getPostDateTime(cor_data[i].PUBLISH_DATE_TIME);
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
                    if (cor_data[i].PAGE_PROFILE_PHOTO_PATH != null) {
                        cor_data[i].PAGE_PROFILE_PHOTO_PATH = cor_data[i].PAGE_PROFILE_PHOTO_PATH + "profile/" + cor_data[i].PAGE_UUID + '_60x60.png';
                    } else {
                        if (cor_data[i].PAGE_TYPE == 0) {
                            cor_data[i].PAGE_PROFILE_PHOTO_PATH = this._constantService.defaultPageIndImgPath;
                        } else {
                            cor_data[i].PAGE_PROFILE_PHOTO_PATH = this._constantService.defaultPageCollgImgPath;
                        }
                    }

                    if (cor_data[i]['PUBLISH_DATE_TIME'] != null) {
                        cor_data[i]['PUBLISH_DATE_TIME'];
                    } else { cor_data[i]['PUBLISH_DATE_TIME'] = '' }
                    if (cor_data[i].COURSE_TYPE == 1) {
                        var cost = cor_data[i].COURSE_PRICE;
                        for (var j = 0; j < cost.length; j++) {

                            if (cost[j].DISCOUNT_COST != '' && cost[j].DISCOUNT_COST != null) {
                                cor_data[i].DISCOUNT_COST = cost[j].DISCOUNT_COST;
                            } else {
                                cor_data[i].DISCOUNT_COST = '';
                            } if (cost[j].COST != '' && cost[j].COST != null) {
                                cor_data[i].COST = cost[j].COST;
                            } else { this.hideCose = false; }
                            if (cost[j].COST == 0 && cost[j].DISCOUNT_COST == 0) { this.hiderp = false }
                        }
                    } else {
                        cor_data[i].DISCOUNT_COST = "FREE";
                        this.hiderp = false; this.rpsign = false;
                    }
                    if (cor_data[i].PUBLISH == 1 || cor_data[i].PUBLISH == 5) {
                        this.show_rating = true;
                    }

                    if (cor_data[i]['TOTAL_ENROLLED_USER'] != 0) {
                        if (cor_data[i]['RECENT_ENROLLED'] != undefined) {
                            if (cor_data[i]['RECENT_ENROLLED'][0] != '' && cor_data[i]['RECENT_ENROLLED'][0] != null && cor_data[i]['RECENT_ENROLLED'][0] != undefined) {
                                cor_data[i].ENROLLED1 = cor_data[i]['RECENT_ENROLLED'][0]['PROFILE_PHOTO_PATH'] + "profile/" + cor_data[i]['RECENT_ENROLLED'][0]['USER_ID'] + "_60x60.png?v=";
                            } else { cor_data[i].ENROLLED1 = this._constantService.defaultImgPath; }

                            if (cor_data[i]['RECENT_ENROLLED'][1] != '' && cor_data[i]['RECENT_ENROLLED'][1] != null && cor_data[i]['RECENT_ENROLLED'][1] != undefined) {
                                cor_data[i].ENROLLED2 = cor_data[i]['RECENT_ENROLLED'][1]['PROFILE_PHOTO_PATH'] + "profile/" + cor_data[i]['RECENT_ENROLLED'][1]['USER_ID'] + "_60x60.png?v=";
                            } else { cor_data[i].ENROLLED2 = this._constantService.defaultImgPath; }
                        }
                    } else {
                        this.notshowImage = false;
                    }
                }
                this.AllMyCourse.push.apply(this.AllMyCourse, cor_data);

            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });

    }




    closewalldropdown() {
        this.walldropdown = false;
    }
    closewalldrop() {
        this.walldrop = false;
    }
    showwalldropdown() {
        this.walldropdown = !this.walldropdown;
        if (this.walldropdown == false) {
            this.closewalldropdown();
        }
    }

    showwalldrop() {
        this.walldrop = !this.walldrop;
        if (this.walldrop == false) {
            this.closewalldrop();
        }
    }

    updateAllCourse() {
        return this.AllCourse;
    }

    //    calValidityPeriod(days) {
    //        if (days < 30) {
    //            this.showDays = true;
    //            this.validity = days;
    //        } else if (days == 30 || days == 31) {
    //            this.showDays = false;
    //            this.validity = 1;
    //        } else {
    //            this.showDays = false;
    //            var x = days / 30;
    //            this.validity = Math.floor(x);
    //        }
    //        return this.validity;
    //    }

    saveCourse(courseData, index) {
        if (courseData.SAVED == 0) {
            this.savepagepopup = !this.savepagepopup;
            let body = document.getElementsByTagName('body')[0];
            body.classList.add("body-overflow");
            this.courseSavedData = courseData;
            this.courseSavedData['TYPE'] = 7;
            this.cardClickedIndex = index;
        } else {
            this.cardClickedIndex = index;
            this.putCourseUnsaved(courseData);
        }
    }


    updateSavedStatus(event) {

        //this.saveCondition = true;
        if (this.saveCondition == true) {
            this.AllCourse[this.cardClickedIndex].SAVED = 1;
            this.AllMyCourse[this.cardClickedIndex].SAVED = 1;
            //        this.getAllCourseDetailProfile();
        }
    }

    updateUnSavedStatus() {
        // this.saveCondition = false;
        // this.getAllCourseDetailProfile();
        if (this.saveCondition == false) {
            this.AllCourse[this.cardClickedIndex].SAVED = 0;
            this.AllMyCourse[this.cardClickedIndex].SAVED = 0;
        }
    }

    putCourseUnsaved(courseData) {

        if (courseData.USER_POST_ID) {

        } else {
            var x = courseData.COURSE_POST_ID;
            x = x.split(':');
            courseData['USER_POST_ID'] = x[1];
        }
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
                this._constantService.showToast("Unsaved successfully", "Post", "1");

                this.saveCondition = false;
                this.updateUnSavedStatus();
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

    goToCourseDetail(cors) {
        this.gotocourse = true;
        this.lastopencontent = cors.LAST_OPEN_CONTENT;
        if (cors.IS_EXPRIED == 1 || cors.PUBLISH == 4) {
            return;
        } else if (cors.IS_EXPRIED == 2) {
            this._constantService.setPageIdForCourse(cors.PAGE_UUID);
            this._router.navigate(['/course/' + cors.COURSE_URL]);
        } else {
            if (cors.LAST_OPEN_CONTENT == '' || cors.LAST_OPEN_CONTENT == null || Object.keys(cors.LAST_OPEN_CONTENT).length == 0) {
                this._constantService.setPageIdForCourse(cors.PAGE_UUID);
                this._router.navigate(['/course/' + cors.COURSE_URL]);
            } else {
                this.viewContent(cors.LAST_OPEN_CONTENT, '', '');
            }
        }
    }


    viewContent(content, sectionindex, contentIndex) {
        if (content.CONTENT_TYPE == 3) {
            this._router.navigate(['/test/' + content.CONTENT_UUID]);
        } else if (content.CONTENT_TYPE == 2) {
            this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
        } else if (content.CONTENT_TYPE == 1) {
            this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
        } else if (content.CONTENT_TYPE == 4) {
            this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
        } else if (content.CONTENT_TYPE == 5) {
            this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
        } else if (content.CONTENT_TYPE == 6) {
            this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
        } else if (content.CONTENT_TYPE == 7) {
            this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
        }
    }



}
