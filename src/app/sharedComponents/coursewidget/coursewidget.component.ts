import {Component, OnInit, AfterViewInit, EventEmitter, Output} from '@angular/core';
import {ViewChild, ComponentFactoryResolver, ViewContainerRef, Input} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {EncryptionService} from './../../services/encryption.service';
import {ConstantService} from './../../services/constant.service';
import {PostdataService} from './../../services/postdata.service';

@Component({
    selector: 'app-coursewidget',
    templateUrl: './coursewidget.component.html',
    styleUrls: ['./coursewidget.component.scss']
})
export class CoursewidgetComponent implements OnInit {
    @Input() parentPageId : string;
    @Input() courseUUID : string;
    @Output() similarCourseStatusEmitter = new EventEmitter;
    withoutToken: boolean = false;
    hiderp: boolean;
    hideCose: boolean;
    validity: any;
    showDays: boolean;
    showUnlimited: boolean;
    similarCorsPresent: boolean;
    @ViewChild('container', {read: ViewContainerRef}) container;
    courselist: any;
    pageId: any;
    similarCourse = [];

    constructor(
        public _constantService: ConstantService,
        public _router: Router,
        private _encrypt: EncryptionService,
        private activatedRoute: ActivatedRoute,
        private componentFactoryResolver: ComponentFactoryResolver,
        private postData: PostdataService

    ) {}

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            if (params['id'] != '' && params['id'] != undefined && params['id'] != null) {
                // this.courseUUID = params['id'];
            }
        });
        var token = this._constantService.getSessionDataBYKey('token');
        if (token && token != 'undefined') {
            this.withoutToken = false;
            this.pageId = this._constantService.getSessionDataBYKey('page_id_course');
            this.getSimilarCourses();
        } else {
            this.withoutToken = true;
            this.getSimilarCoursesPublic();
        }
    }

    goToCourse(corsId, pgId) {
        //this._constantService.setPageIdForCourse(pgId);
        this._constantService.setSessionJsonPair('page_id_course', pgId);
        this._router.navigate(['/course/' + corsId]);
    }


    getSimilarCourses() {
        var CourseDetail = {};
        CourseDetail['token'] = this._constantService.getSessionDataBYKey('token');
        CourseDetail['token_param'] = {};
        CourseDetail['token_param']['device_type'] = 'w';
        CourseDetail['token_param']['host'] = '';
        CourseDetail['cors_uuid'] = this.courseUUID;
        CourseDetail['pg_uuid'] = this.parentPageId;

        this._constantService.fetchDataApi(this._constantService.getSimilarCourses(), CourseDetail).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == 'success') {

                var corsData = [];
                corsData = responseData.COURSE_SUGG;

                if (corsData.length != 0) {
                    this.similarCorsPresent = true;
                } else {
                    this.similarCorsPresent = false;
                    this.similarCourseStatusEmitter.emit(false);
                }

                for (var i = 0; i < corsData.length; i++) {
                    corsData[i]['COURSE_TITLE'] = this.postData.decodeURIPostData(corsData[i]['COURSE_TITLE']);
                    if (corsData[i]['COURSE_COVER_PHOTO_PATH'] != null) {
                        if (corsData[i]['COVER_TYPE'] == 0) {
                            corsData[i]['COURSE_COVER_PHOTO_PATH'] = corsData[i]['COURSE_COVER_PHOTO_PATH'] + "cover/" + corsData[i]['COURSE_UUID'] + '_1235x330.png';
                        } else {
                            corsData[i]['COURSE_COVER_PHOTO_PATH'] = corsData[i]['COURSE_COVER_PHOTO_PATH'];
                        }
                    } else {
                        corsData[i]['COURSE_COVER_PHOTO_PATH'] = this._constantService.defaultCoverImgPath;
                    }

                    if (corsData[i]['PAGE_PROFILE_PHOTO_PATH'] != null) {
                        corsData[i]['PAGE_PROFILE_PHOTO_PATH'] = corsData[i]['PAGE_PROFILE_PHOTO_PATH'] + "profile/" + corsData[i]['PAGE_UUID'] + '_60x60.png'
                    } else {
                        if (corsData[i]['PAGE_TYPE'] == 0) {
                            corsData[i]['PAGE_PROFILE_PHOTO_PATH'] = this._constantService.defaultPageIndImgPath;
                        } else {
                            corsData[i]['PAGE_PROFILE_PHOTO_PATH'] = this._constantService.defaultPageCollgImgPath;
                        }
                    }
                    corsData[i]['PAGE_TITLE'] = this.postData.decodeURIPostData(corsData[i]['PAGE_TITLE']);

                    //                    if (corsData[i]['VALIDITY'] != null) {
                    //                        //this.calValidityPeriod(corsData[i]['VALIDITY']);
                    //                        if (corsData[i]['VALIDITY'] < 30) {
                    //                            corsData[i]['VALIDITY'] = this.calValidityPeriod(corsData[i]['VALIDITY']);
                    //                            corsData[i]['VALIDITY_PERIOD'] = "Validity " + corsData[i]['VALIDITY'] + " days";
                    //                        } else {
                    //                            corsData[i]['VALIDITY'] = this.calValidityPeriod(corsData[i]['VALIDITY']);
                    //                            corsData[i]['VALIDITY_PERIOD'] = "Validity " + corsData[i]['VALIDITY'] + " months";
                    //                        }
                    //
                    //                    } else {
                    //                        //this.calValidityPeriod("null");
                    //                        corsData[i]['VALIDITY_PERIOD'] = "Validity Unlimited";
                    //                    }

                    if (corsData[i]['COURSE_TYPE'] == 1) {
                        var cost = corsData[i]['COURSE_PRICE'];
                        for (var j = 0; j < cost.length; j++) {

                            if (cost[j]['DISCOUNT_COST'] != '' && cost[j]['DISCOUNT_COST'] != null) {
                                corsData[i]['DISCOUNT_COST'] = cost[j]['DISCOUNT_COST'];
                            } else {
                                corsData[i]['DISCOUNT_COST'] = '';
                            } if (cost[j]['COST'] != '' && cost[j]['COST'] != null) {
                                corsData[i]['COST'] = cost[j]['COST'];
                            } else {
                                this.hideCose = false;
                            }
                            if (cost[j].COST == 0 && cost[j].DISCOUNT_COST == 0) {this.hiderp = false}
                        }
                    }

                }

                this.similarCourse.push.apply(this.similarCourse, corsData);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    getSimilarCoursesPublic() {
        var CourseDetail = {};
        CourseDetail['cors_uuid'] = this.courseUUID;
        CourseDetail['pg_uuid'] = this.parentPageId;

       

        this._constantService.fetchDataApi(this._constantService.getCourseSuggestionPublicServiceUrl(), CourseDetail).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                
                var corsData = [];
                corsData = responseData.COURSE_SUGG;

                if (corsData.length != 0) {
                    this.similarCorsPresent = true;
                } else {
                    this.similarCorsPresent = false;
                }

                

                for (var i = 0; i < corsData.length; i++) {
                    corsData[i]['COURSE_TITLE'] = this.postData.decodeURIPostData(corsData[i]['COURSE_TITLE']);
                    if (corsData[i]['COURSE_COVER_PHOTO_PATH'] != null) {
                        if (corsData[i]['COVER_TYPE'] == 0) {
                            corsData[i]['COURSE_COVER_PHOTO_PATH'] = corsData[i]['COURSE_COVER_PHOTO_PATH'] + "cover/" + corsData[i]['COURSE_UUID'] + '_1235x330.png';
                        } else {
                            corsData[i]['COURSE_COVER_PHOTO_PATH'] = corsData[i]['COURSE_COVER_PHOTO_PATH'];
                        }
                    } else {
                        corsData[i]['COURSE_COVER_PHOTO_PATH'] = this._constantService.defaultCoverImgPath;
                    }
                    corsData[i]['PAGE_TITLE'] = this.postData.decodeURIPostData(corsData[i]['PAGE_TITLE']);
                    if (corsData[i]['PAGE_PROFILE_PHOTO_PATH'] != null) {
                        corsData[i]['PAGE_PROFILE_PHOTO_PATH'] = corsData[i]['PAGE_PROFILE_PHOTO_PATH'] + "profile/" + corsData[i]['PAGE_UUID'] + '_60x60.png'
                    } else {
                        if (corsData[i]['PAGE_TYPE'] == 0) {
                            corsData[i]['PAGE_PROFILE_PHOTO_PATH'] = this._constantService.defaultPageIndImgPath;
                        } else {
                            corsData[i]['PAGE_PROFILE_PHOTO_PATH'] = this._constantService.defaultPageCollgImgPath;
                        }
                    }

                    //                    if (corsData[i]['VALIDITY'] != null) {
                    //                        //this.calValidityPeriod(corsData[i]['VALIDITY']);
                    //                        if (corsData[i]['VALIDITY'] < 30) {
                    //                            corsData[i]['VALIDITY'] = this.calValidityPeriod(corsData[i]['VALIDITY']);
                    //                            corsData[i]['VALIDITY_PERIOD'] = "Validity " + corsData[i]['VALIDITY'] + " days";
                    //                        } else {
                    //                            corsData[i]['VALIDITY'] = this.calValidityPeriod(corsData[i]['VALIDITY']);
                    //                            corsData[i]['VALIDITY_PERIOD'] = "Validity " + corsData[i]['VALIDITY'] + " months";
                    //                        }
                    //
                    //                    } else {
                    //                        //this.calValidityPeriod("null");
                    //                        corsData[i]['VALIDITY_PERIOD'] = "Validity Unlimited";
                    //                    }

                    if (corsData[i]['COURSE_TYPE'] == 1) {
                        var cost = corsData[i]['COURSE_PRICE'];
                        for (var j = 0; j < cost.length; j++) {

                            if (cost[j]['DISCOUNT_COST'] != '' && cost[j]['DISCOUNT_COST'] != null) {
                                corsData[i]['DISCOUNT_COST'] = cost[j]['DISCOUNT_COST'];
                            } else {
                                corsData[i]['DISCOUNT_COST'] = '';
                            } if (cost[j]['COST'] != '' && cost[j]['COST'] != null) {
                                corsData[i]['COST'] = cost[j]['COST'];
                            } else {
                                this.hideCose = false;
                            }
                            if (cost[j].COST == 0 && cost[j].DISCOUNT_COST == 0) {this.hiderp = false}
                        }
                    }

                }

                this.similarCourse.push.apply(this.similarCourse, corsData);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
        }

//    calValidityPeriod(d    ays) {
//        this.showUnlimited =     false;
//        if (days <     30) {
//            this.showDays =     true;
//            this.validity =     days;
//        } else if (days == 30 || days ==     31) {
//            this.showDays =     false;
//            this.validit    y = 1;
//        } else if (days == "nu    ll") {
//            this.showUnlimited =     true;
//        }     else {
//            this.showDays =     false;
//            var x = days     / 30;
//            this.validity = Math.flo    or(x);
//            }
//        return this.val    idity;
//    }


}
