import { Component, OnInit, ComponentFactoryResolver, Output, Input, EventEmitter, ViewContainerRef, ViewChild } from '@angular/core';
import { ConstantService } from './../../../services/constant.service';
import { EncryptionService } from './../../../services/encryption.service';
import { PostdataService } from './../../../services/postdata.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
//import {CommentComponent} from "./../../../sharedComponents/postComponents/commentView/comment.component";
import { CoursecomponentComponent } from "./../../course-details/course-rating/coursecomponent/coursecomponent.component";
import { CoursereviewComponent } from "./../../course-details/course-rating/coursereview/coursereview.component";
import { Pipe, PipeTransform } from '@angular/core';


// @Pipe({name: 'round'})
// export class RoundPipe implements PipeTransform {

//     transform(value: number): number {
//         return Math.round(value);
//     }
// }

@Component({
    selector: 'app-course-rating',
    templateUrl: './course-rating.component.html',
    styleUrls: ['./course-rating.component.scss']
})
export class CourseRatingComponent implements OnInit {
    CorsUrl: any;
    _ref: any;
    config;
    showGiveReview: boolean;
    reviewLength: number;
    conditionCheck: any;
    openConfirmation: boolean;
    dataConf: any;
    commentCount: any;
    revRatingsUuid: any;
    CorsUUID: any;
    viewCommentList: boolean = false;
    file_path: any;
    hideSpan: number;
    showCommentImg: number;
    comment_image: any;
    showReviewComment: boolean = false;
    commentPresent: boolean = false;
    comment: number;
    ref: any;
    factory;
    lastCommentId = [];
    latestComment;
    CorsComment = [];
    corseRvwRatng = [];
    pageId: string;
    rating5: number;
    @Input() Corsid: any;
    courseReview = [];
    rating = [];
    isReviewed: number = 0;
    shwRevPlaceholder: boolean = true;
    importantCondition: boolean = false;
    isCommentHit: boolean = false;
    c_data: string = "";
    courseTitle: any;
    @ViewChild(CoursereviewComponent) editWindow;
    @ViewChild('container', { read: ViewContainerRef }) container;
    @Output() ratingsCount = new EventEmitter<number>();
    @Input() isAdmin: any;
    @Input() isEnrolled: number;
    @Input() isTrialUser: number;
    @Input() withoutToken: boolean = false;
    EmptyREVstate: boolean = false;
    // @Input() totalRatings :number;
    star5rating;
    constructor(
        public _router: Router,
        public _constantService: ConstantService,
        private _encrypt: EncryptionService,
        private componentFactoryResolver: ComponentFactoryResolver,
        public _encryptionService: EncryptionService,
        private activatedRoute: ActivatedRoute,
        public postData: PostdataService
    ) { }

    ngOnInit() {

        //        this.activatedRoute.params.subscribe((params: Params) => {
        //            if (params['id'] != undefined && params['id'] != null) {
        //                let paramArr = params['id'].split('-');
        //                this.CorsUrl = paramArr[paramArr.length - 1];
        //                this.Corsid = params['id'];
        //            }
        //        });
        this.pageId = this._constantService.getPageIdForCource();
        if (this.withoutToken) {
            this.getratingPageCoursePublic(this.Corsid);
            this.getreviewPageCoursePublic(this.Corsid);
        } else {
            this.getreviewPageCourse(this.Corsid);
            this.getratingPageCourse(this.Corsid);
        }
        //this.getreviewPagecomment();
        if (this.isReviewed == 0 && this.isAdmin == 0 && this.isEnrolled == 1) {
            this.showGiveReview = true;
        } else {
            this.showGiveReview = false;
        }
    }


    ngAfterViewInit() {
        //        this.getreviewPagecomment();
    }


    getratingPageCourse(corsId) {
        var reviewPageCourse = {};
        reviewPageCourse['token'] = this._constantService.getSessionDataBYKey('token');
        reviewPageCourse['token_param'] = {};
        reviewPageCourse['token_param']['device_type'] = 'w';
        reviewPageCourse['token_param']['host'] = '';
        reviewPageCourse['cors_uuid'] = corsId;



        this._constantService.fetchDataApi(this._constantService.getPageCourseRatingUrl(), reviewPageCourse).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                this.rating = responseData.COURSE_RATING_DATA;
                this.rating['TOTAL_COUNT'] = this.rating['TOTAL_5_RAT'] + this.rating['TOTAL_4_RAT'] + this.rating['TOTAL_3_RAT'] + this.rating['TOTAL_2_RAT'] + this.rating['TOTAL_1_RAT'];
                if (this.rating['TOTAL_5_RAT'] != 0) {
                    this.rating['TOTAL_5_RAT_COUNT'] = Math.round(this.rating['TOTAL_5_RAT'] * 100 / this.rating['TOTAL_COUNT']);
                } else {
                    this.rating['TOTAL_5_RAT_COUNT'] = 0;
                }
                if (this.rating['TOTAL_4_RAT'] != 0) {
                    this.rating['TOTAL_4_RAT_COUNT'] = Math.round(this.rating['TOTAL_4_RAT'] * 100 / this.rating['TOTAL_COUNT']);
                } else {
                    this.rating['TOTAL_4_RAT_COUNT'] = 0;
                }
                if (this.rating['TOTAL_3_RAT'] != 0) {
                    this.rating['TOTAL_3_RAT_COUNT'] = Math.round(this.rating['TOTAL_3_RAT'] * 100 / this.rating['TOTAL_COUNT']);
                } else {
                    this.rating['TOTAL_3_RAT_COUNT'] = 0;
                }
                if (this.rating['TOTAL_2_RAT'] != 0) {
                    this.rating['TOTAL_2_RAT_COUNT'] = Math.round(this.rating['TOTAL_2_RAT'] * 100 / this.rating['TOTAL_COUNT']);
                } else {
                    this.rating['TOTAL_2_RAT_COUNT'] = 0;
                }
                if (this.rating['TOTAL_1_RAT'] != 0) {
                    this.rating['TOTAL_1_RAT_COUNT'] = Math.round(this.rating['TOTAL_1_RAT'] * 100 / this.rating['TOTAL_COUNT']);
                } else {
                    this.rating['TOTAL_1_RAT_COUNT'] = 0;
                }
                this.ratingsCount.emit(this.rating['TOTAL_COUNT']);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    getratingPageCoursePublic(corsId) {
        var reviewPageCourse = {};
        reviewPageCourse['cors_uuid'] = corsId;
        reviewPageCourse['count'] = "1";
        reviewPageCourse['r_count'] = "";




        this._constantService.fetchDataApi(this._constantService.getPublicPageCourseRatingUrl(), reviewPageCourse).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                this.rating = responseData.COURSE_RATING_DATA;
                this.rating['TOTAL_COUNT'] = this.rating['TOTAL_5_RAT'] + this.rating['TOTAL_4_RAT'] + this.rating['TOTAL_3_RAT'] + this.rating['TOTAL_2_RAT'] + this.rating['TOTAL_1_RAT'];
                if (this.rating['TOTAL_5_RAT'] != 0) {
                    this.rating['TOTAL_5_RAT_COUNT'] = Math.round(this.rating['TOTAL_5_RAT'] * 100 / this.rating['TOTAL_COUNT']);
                } else {
                    this.rating['TOTAL_5_RAT_COUNT'] = 0;
                }
                if (this.rating['TOTAL_4_RAT'] != 0) {
                    this.rating['TOTAL_4_RAT_COUNT'] = Math.round(this.rating['TOTAL_4_RAT'] * 100 / this.rating['TOTAL_COUNT']);
                } else {
                    this.rating['TOTAL_4_RAT_COUNT'] = 0;
                }
                if (this.rating['TOTAL_3_RAT'] != 0) {
                    this.rating['TOTAL_3_RAT_COUNT'] = Math.round(this.rating['TOTAL_3_RAT'] * 100 / this.rating['TOTAL_COUNT']);
                } else {
                    this.rating['TOTAL_3_RAT_COUNT'] = 0;
                }
                if (this.rating['TOTAL_2_RAT'] != 0) {
                    this.rating['TOTAL_2_RAT_COUNT'] = Math.round(this.rating['TOTAL_2_RAT'] * 100 / this.rating['TOTAL_COUNT']);
                } else {
                    this.rating['TOTAL_2_RAT_COUNT'] = 0;
                }
                if (this.rating['TOTAL_1_RAT'] != 0) {
                    this.rating['TOTAL_1_RAT_COUNT'] = Math.round(this.rating['TOTAL_1_RAT'] * 100 / this.rating['TOTAL_COUNT']);
                } else {
                    this.rating['TOTAL_1_RAT_COUNT'] = 0;
                }
                this.ratingsCount.emit(this.rating['TOTAL_COUNT']);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    getreviewPageCourse(corsId) {
        var reviewPageCourse = {};
        reviewPageCourse['token'] = this._constantService.getSessionDataBYKey('token');
        reviewPageCourse['token_param'] = {};
        reviewPageCourse['token_param']['device_type'] = 'w';
        reviewPageCourse['token_param']['host'] = '';
        reviewPageCourse['cors_uuid'] = corsId;
        // reviewPageCourse['r_count'] = "";
        reviewPageCourse['count'] = 1;



        this._constantService.fetchDataApi(this._constantService.getPageCourseReviewUrl(), reviewPageCourse).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                this.courseReview = responseData.COURSE_RW_LIST;
                if (this.courseReview.length == 0) {
                    this.EmptyREVstate = true;
                }
                this.isReviewed = responseData['ISREVIEW'];
                for (var i = 0; i < this.courseReview.length; i++) {

                    if (this.courseReview[i]['PROFILE_PHOTO_PATH'] != null && this.courseReview[i]['PROFILE_PHOTO_PATH'] != undefined) {
                        this.courseReview[i]['PROFILE_PIC_PATH'] = this.courseReview[i]['PROFILE_PHOTO_PATH'] + "profile/" + this.courseReview[i]['USER_ID'] + "_60x60.png";
                    } else {
                        this.courseReview[i]['PROFILE_PIC_PATH'] = null;
                    }
                    this.courseReview[i]['FULLNAME'] = this.courseReview[i]['FIRST_NAME'] + " " + this.courseReview[i]['LAST_NAME'];
                    this.courseReview[i]['ADD_DATE_TIME'] = this.postData.getPostDateTime(this.courseReview[i]['ADD_DATE_TIME']);
                    this.courseReview[i]['REVIEW_DESCRIPTION'] = this.postData.decodeURIPostData(this.courseReview[i]['REVIEW_DESCRIPTION']);
                    this.courseReview[i]['COURSE_REVIEWS_RATINGS_UUID'] = this.courseReview[i]['COURSE_REVIEWS_RATINGS_UUID'];
                    this.courseReview[i]['ISLIKE'] = responseData.COURSE_RW_LIST[i]['ISLIKE'];
                    this.courseReview[i]['isEnrolled'] = this.isEnrolled;

                    this.courseReview[i]['courseUuid'] = this.Corsid;
                    this.corseRvwRatng = this.courseReview[i]['COURSE_REVIEWS_RATINGS_UUID'];
                    this.commentCount = this.courseReview[i]['COMMENT_COUNT'];
                    this.revRatingsUuid = this.courseReview[i]['COURSE_REVIEWS_RATINGS_UUID'];
                    // this.courseReview[i]['PROFILE_PIC_PATH'] = this.courseReview[i]['COURSE_COVER_PHOTO_PATH'] + 'cover/' + this.courseReview[i]['COURSE_UUID'] + '_1235x330.png';
                    if (this.courseReview[i]['COURSE_TITLE']) {
                        this.courseReview[i]['COURSE_TITLE'] = this.postData.decodeURIPostData(this.courseReview[i]['COURSE_TITLE']);
                        console.log(this.courseReview[i]['COURSE_TITLE']);
                    }
                    this.factory = this.componentFactoryResolver.resolveComponentFactory(CoursereviewComponent);
                    this.ref = this.container.createComponent(this.factory);
                    this.ref.instance.arr = this.courseReview[i];
                    this.ref.instance._ref = this.ref;


                }
                this.reviewLength = this.courseReview.length;
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    getreviewPageCoursePublic(corsId) {
        var reviewPageCourse = {};

        reviewPageCourse['cors_uuid'] = corsId;
        // reviewPageCourse['r_count'] = "";
        reviewPageCourse['count'] = 1;



        this._constantService.fetchDataApi(this._constantService.getPublicPageCourseReviewUrl(), reviewPageCourse).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                this.courseReview = responseData.COURSE_RW_LIST;
                if (this.courseReview.length == 0) {
                    this.EmptyREVstate = true;
                }
                this.isReviewed = responseData['ISREVIEW'];
                for (var i = 0; i < this.courseReview.length; i++) {
                    if (this.courseReview[i]['PROFILE_PHOTO_PATH'] != null && this.courseReview[i]['PROFILE_PHOTO_PATH'] != undefined) {
                        this.courseReview[i]['PROFILE_PIC_PATH'] = this.courseReview[i]['PROFILE_PHOTO_PATH'] + "profile/" + this.courseReview[i]['USER_ID'] + "_60x60.png";
                    } else {
                        this.courseReview[i]['PROFILE_PIC_PATH'] = null;
                    }
                    this.courseReview[i]['FULLNAME'] = this.courseReview[i]['FIRST_NAME'] + " " + this.courseReview[i]['LAST_NAME'];
                    this.courseReview[i]['ADD_DATE_TIME'] = this.postData.getPostDateTime(this.courseReview[i]['ADD_DATE_TIME']);
                    this.courseReview[i]['REVIEW_DESCRIPTION'] = this.postData.decodeURIPostData(this.courseReview[i]['REVIEW_DESCRIPTION']);
                    this.courseReview[i]['COURSE_REVIEWS_RATINGS_UUID'] = this.courseReview[i]['COURSE_REVIEWS_RATINGS_UUID'];
                    this.courseReview[i]['ISLIKE'] = responseData.COURSE_RW_LIST[i]['ISLIKE'];
                    this.courseReview[i]['isEnrolled'] = this.isEnrolled;
                    this.courseReview[i]['courseUuid'] = this.Corsid;
                    this.corseRvwRatng = this.courseReview[i]['COURSE_REVIEWS_RATINGS_UUID'];
                    this.commentCount = this.courseReview[i]['COMMENT_COUNT'];
                    this.revRatingsUuid = this.courseReview[i]['COURSE_REVIEWS_RATINGS_UUID'];
                    this.factory = this.componentFactoryResolver.resolveComponentFactory(CoursereviewComponent);
                    this.ref = this.container.createComponent(this.factory);
                    this.ref.instance.arr = this.courseReview[i];
                    this.ref.instance._ref = this.ref;
                }
                this.reviewLength = this.courseReview.length;
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }



    addCourseRating(event) {
        var reviewCourse = {};
        reviewCourse['token'] = this._constantService.getSessionDataBYKey('token');
        reviewCourse['token_param'] = {};
        reviewCourse['token_param']['device_type'] = 'w';
        reviewCourse['token_param']['host'] = '';
        reviewCourse['cors_uuid'] = this.Corsid;
        reviewCourse['pg_uuid'] = this.pageId;
        reviewCourse['cors_rw_rating_uuid'] = "";
        var selectedResponse = (<HTMLInputElement>document.querySelector('input[name="star"]:checked'));
        if (selectedResponse.value == null) {
            return false;
        }
        reviewCourse['cors_rw_rating'] = selectedResponse.value;
        // if (document.getElementById('reviewDescription').innerText == "Tell us how you feel about this course..") {
        //     document.getElementById('reviewDescription').innerText = "";
        // }
        var reviewDesc = (<HTMLTextAreaElement>document.getElementById('reviewDescription')).value;
        if (reviewDesc) {
            reviewCourse['cors_rw_des'] = this.postData.encodeURIPostData(reviewDesc);
        } else {
            reviewCourse['cors_rw_des'] = '';
        }


        this._constantService.fetchDataApi(this._constantService.getAddCourseRatingServiceUrl(), reviewCourse).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.EmptyREVstate = false;
                this.isReviewed = 1;
                this.showGiveReview = false;
                this.container.clear();
                this.getreviewPageCourse(this.Corsid);
                this.getratingPageCourse(this.Corsid);

            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    updateImportantReview() {
        var updImp = {};
        updImp['token'] = this._constantService.getSessionDataBYKey('token');
        updImp['token_param'] = {};
        updImp['token_param']['device_type'] = 'w';
        updImp['token_param']['host'] = '';
        updImp['cors_uuid'] = this.Corsid;
        updImp['cors_rw_rating_uuid'] = this.corseRvwRatng;



        this._constantService.fetchDataApi(this._constantService.updateImportantToReview(), updImp).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.getreviewPageCourse(this.Corsid);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });

    }

    // hideRevPlaceholder(event) {
    //     this.shwRevPlaceholder = false;
    //     document.getElementById("reviewDescription").focus();
        
    // }
    // showRevPlaceholder(event) {
    //     var desc = document.getElementById('reviewDescription').innerText;
    //     if (desc.length == 0) {
    //         this.shwRevPlaceholder = true;
    //     } else {
    //         this.shwRevPlaceholder = false;
    //     }

    // }
    important() {
        this.updateImportantReview();
    }

    openCommentView(event) {
        var id = event.target.id.split('_');
        var x = id[0];
        this.conditionCheck = x;
        this.viewCommentList = !this.viewCommentList;
        //this.showReviewComment = !this.showReviewComment;
        //        this.getreviewPagecomment();

    }

    confirmText(value, event) {
        event.preventDefault();
        event.stopPropagation();
    }

    hidePlaceHolder(event) {
        if (event.target.innerText == this._constantService.commentPlaceHolder) {
            event.target.innerText = "";
            var v = document.getElementById(event.target.id);
            document.getElementById(event.target.id).focus();
            v.classList.remove("placeholdercolor");
            v.classList.add("option_inputt", "setwdth");
            this.isCommentHit = false;

        }

        document.getElementById(event.target.id).focus();
    }
    showPlaceHolder(event) {
        if (event.target.innerText.length == 0 || event.target.innerText.length == 1) {
            event.target.classList.add("placeholdercolor");
            event.target.classList.remove("option_inputt", "setwdth");
            event.target.innerText = this._constantService.commentPlaceHolder;
        }
    }

    updateProfilePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }
}
