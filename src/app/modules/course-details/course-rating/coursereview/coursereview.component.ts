import { Component, OnInit, ComponentFactoryResolver, Output, Input, EventEmitter, ViewContainerRef, ViewChild } from '@angular/core';
import { PostdataService } from './../../../../services/postdata.service';
import { ConstantService } from './../../../../services/constant.service';
import { EncryptionService } from './../../../../services/encryption.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CoursecomponentComponent } from './../../course-rating/coursecomponent/coursecomponent.component'

@Component({
    selector: 'app-coursereview',
    templateUrl: './coursereview.component.html',
    styleUrls: ['./coursereview.component.scss', './../course-rating.component.scss']
})
export class CoursereviewComponent implements OnInit {
    pageCount: number = 1;
    commImageDimns = '';
    uuid: any;
    image_upload_url: any;
    COURSE_REVIEWS_RATINGS_COMMENT_ID: any;
    count = 1;
    rw_rtng_uuid: any;
    confirmText(arg0: any, arg1: any): any {
        throw new Error("Method not implemented.");
    }
    getreviewPageCourse(arg0: any): any {
        throw new Error("Method not implemented.");
    }
    arr: any;
    full_name: string;
    u_name: string;
    parentId;
    commentId;
    postId = 0;
    comment_data: string;
    profile_pic_path: string;
    subCommentStatus: any;
    ratings;
    REVIEW_DESCRIPTION;
    LIKED_COUNT: number;
    addDateTime;
    comment_count;
    user_pic;
    courseData = {};
    openLoginPopup: boolean = false;
    isError: boolean;
    errorText: any;
    openLoginPopupType: number;
    isPublicView: boolean = false;
    _ref: any;
    showGiveReview: boolean;
    reviewLength: number;
    conditionCheck: any;
    openConfirmation: boolean;
    dataConf: any;
    commentCount = 0;
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
    Corsid: any;
    courseReview = [];
    rating = [];
    isReviewed: number = 0;
    shwRevPlaceholder: boolean = true;
    importantCondition: boolean = false;
    isCommentHit: boolean = false;
    c_data: string = "";
    liked = false;
    @ViewChild('container', { read: ViewContainerRef }) container;
    isEnrolled;
    username: any;
    userLikeShareList = {};
    // post_id;
    // like = 0;
    impLikeShareStatus = false;
    viewArticleDate: any = [];
    CorsUrl: any;


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

        this.activatedRoute.params.subscribe((params: Params) => {
            if (params['id'] != undefined && params['id'] != null) {
                let paramArr = params['id'].split('-');
                this.CorsUrl = paramArr[paramArr.length - 1];
            }
        });

        var token = this._constantService.getSessionDataBYKey('token');
        if (token && token != 'undefined') {
            this.isPublicView = false;
        } else {
            this.isPublicView = true;
        }

        this.username = this.arr['USER_NAME'];
        this.full_name = this.arr['FULLNAME'];
        if (this.arr['REVIEW_DESCRIPTION'] != null) {
            this.REVIEW_DESCRIPTION = this.postData.decodeURIPostData(this.arr['REVIEW_DESCRIPTION']);
        } else {
            this.REVIEW_DESCRIPTION = "";
        }
        this.ratings = this.arr['STAR_RATING'];
        if (this.arr['ISLIKE'] == 1) {
            this.liked = true;
        } else {
            this.liked = false;
        }

        this.isEnrolled = this.arr['isEnrolled'];
        this.rw_rtng_uuid = this.arr['COURSE_REVIEWS_RATINGS_UUID'];
        this.LIKED_COUNT = this.arr['LIKED_COUNT'];
        this.addDateTime = this.arr['ADD_DATE_TIME'];
        this.comment_count = this.arr['COMMENT_COUNT'];
        this.user_pic = this._constantService.getSessionDataBYKey('p_pic');
        // this.activatedRoute.params.subscribe((params: Params) => {
        //     if (params['id'] != undefined && params['id'] != null) {
        //         this.Corsid = params['id'];
        //     }
        // });
        this.Corsid = this.arr['courseUuid'];
        if (this.arr['PROFILE_PIC_PATH'] != null && this.arr['PROFILE_PIC_PATH'] != undefined) {
            this.profile_pic_path = this.arr['PROFILE_PIC_PATH'];
        } else {
            this.profile_pic_path = this._constantService.defaultImgPath;
        }
    }
    ngAfterView() {
        this.getreviewPagecomment();
    }

    getreviewPagecomment() {
        if (this.viewCommentList == false) {
            return;
        }
        var date = new Date();
        var reviewPagecomment = {};
        reviewPagecomment['token'] = this._constantService.getSessionDataBYKey('token');
        reviewPagecomment['token_param'] = {};
        reviewPagecomment['token_param']['device_type'] = 'w';
        reviewPagecomment['token_param']['host'] = '';
        reviewPagecomment['cors_uuid'] = this.Corsid;
        reviewPagecomment['cors_rw_rating_uuid'] = this.rw_rtng_uuid;
        reviewPagecomment['count'] = this.count;

        this._constantService.fetchDataApi(this._constantService.getreviewPagecomment(), reviewPagecomment).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                this.CorsComment = responseData.COURSE_REVIEW_COMMENT_DATA;
                if (responseData.COURSE_REVIEW_COMMENT_DATA.length < 10) {
                    this.commentPresent = false;
                    this.viewCommentList = true;
                } else {
                    this.count++;
                    this.commentPresent = true;
                    this.viewCommentList = true;
                }
                if (responseData.COURSE_REVIEW_COMMENT_DATA.length > 0) {
                    this.lastCommentId = responseData.COURSE_REVIEW_COMMENT_DATA[responseData.COURSE_REVIEW_COMMENT_DATA.length - 1].COURSE_REVIEWS_RATINGS_COMMENT_ID;
                }
                for (var i = 0; i < responseData.COURSE_REVIEW_COMMENT_DATA.length; i++) {
                    this.CorsComment[i]['USER_FULL_NAME'] = this.CorsComment[i]['FIRST_NAME'] + " " + this.CorsComment[i]['LAST_NAME'];
                    this.CorsComment[i]['PROFILE_PHOTO_PATH'] = this.CorsComment[i]['PROFILE_PHOTO_PATH'] + "profile/" + this.CorsComment[i]['USER_ID'] + "_60x60.png";;
                    this.CorsComment[i]['cors_rw_rating_uuid'] = this.rw_rtng_uuid;
                    this.CorsComment[i]['COURSE_REVIEWS_RATINGS_COMMENT_UUID'] = this.CorsComment[i]['COURSE_REVIEWS_RATINGS_COMMENT_UUID'];
                    this.COURSE_REVIEWS_RATINGS_COMMENT_ID = responseData.COURSE_REVIEWS_RATINGS_COMMENT_ID;
                    this.factory = this.componentFactoryResolver.resolveComponentFactory(CoursecomponentComponent);
                    this.ref = this.container.createComponent(this.factory);
                    this.ref.instance.arr = this.CorsComment[i];
                    this.ref.instance._ref = this.ref;
                }
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }


    addComment(event) {
        if (event.keyCode == 13 && !event.ctrlKey) {
            if (this.isCommentHit) {
                return false;
            } else {
                this.isCommentHit = true;
            }
            this.c_data = this.postData.postDataManipulation(event.target.id);
            if (this.c_data.length == 0 && this.comment_image == null) {
                this.confirmText(this.c_data, event);
                return false;
            } this.hideSpan = 0;
            this.viewCommentList = true;
            var id = event.target.id;
            var comment = {};
            comment['token'] = this._constantService.getSessionDataBYKey('token');
            comment['token_param'] = {};
            comment['token_param']['device_type'] = 'w';
            comment['token_param']['host'] = '';
            comment['cors_uuid'] = this.Corsid;
            comment['cmmnt'] = this.postData.encodeURIPostData(this.c_data);
            comment['cors_rw_rating_uuid'] = this.rw_rtng_uuid;
            comment['cors_rw_cmmnt_uuid'] = "";
            if (comment['cmmnt'].length == 0 && this.comment_image == null) {
                return false;

            }
            if (this.comment_image != null) {
                comment['fpath'] = this.file_path;
                comment['uuid'] = this.uuid;
                comment['dimns'] = this.commImageDimns;
            } else {
                comment['fpath'] = "";
                comment['uuid'] = "";
            }

            event.preventDefault();
            if (this.isCommentHit == true) {
                this._constantService.fetchDataApi(this._constantService.courseAddUpdReviewComment(), comment).subscribe(data => {
                    var responseData:any = data;
                    var status = responseData.STATUS;
                    if (status == this._constantService.success_msg) {
                        this.showCommentImg = 1;
                        this.comment_image = null;
                        this.hideSpan = 1;
                        var date = new Date();
                        var addComment = {};
                        if (this.commentCount != null || this.commentCount == 0) {
                            this.commentCount = this.commentCount + 1;
                        } else {
                            this.comment = 1;
                        }
                        addComment['COMMENT_BY'] = this._constantService.getSessionDataBYKey('u_id');
                        addComment['IMAGE_PATH'] = this.file_path;
                        addComment['PARENT_ID'] = null;
                        addComment['PROFILE_PHOTO_PATH'] = this._constantService.getSessionDataBYKey('profile_pic_s3') + "profile/" + this._constantService.getSessionDataBYKey('u_id') + "_60x60.png";;
                        addComment['TEXT'] = this.c_data;
                        addComment['USER_FULL_NAME'] = this._constantService.getSessionDataBYKey('full_name');
                        addComment['USER_NAME'] = this._constantService.getSessionDataBYKey('username');
                        addComment['cors_rw_rating_uuid'] = this.rw_rtng_uuid;
                        addComment['USER_ID'] = this._constantService.getSessionDataBYKey('u_id');
                        addComment['COURSE_REVIEWS_RATINGS_COMMENT_UUID'] = responseData.CORS_RW_COMUUID;
                        this.COURSE_REVIEWS_RATINGS_COMMENT_ID = responseData.CORS_RW_COMUUID;
                        addComment['ADD_DATE_TIME'] = this.postData.getPostDateTime(date.getTime());
                        setTimeout(() => {
                            this.factory = this.componentFactoryResolver.resolveComponentFactory(CoursecomponentComponent);
                            this.ref = this.container.createComponent(this.factory);
                            this.ref.instance.arr = addComment;
                            this.ref.instance._ref = this.ref;
                        }, 500);
                        event.target.innerHTML = this._constantService.commentPlaceHolder;
                        event.target.classList.add("placeholdercolor");
                        event.target.classList.remove("option_inputt", "setwdth");
                        this.hideSpan = 1;
                        this.file_path = "";

                        var count = (<HTMLElement>document.getElementById('comm_id_' + this.rw_rtng_uuid));
                        if (count != null) {
                            if (parseInt(count.innerHTML) == 1) {
                                count.style.display = 'none';
                                count.innerHTML = (parseInt(count.innerHTML) + 1).toString();
                            } else {
                                count.innerHTML = (parseInt(count.innerHTML) + 1).toString();
                            }
                        }

                        window.getSelection().removeAllRanges();
                        this.isCommentHit = true;
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
        }
        else if (event.keyCode == 13 && event.keyCode == 17) {
            event.target.innerHTML = event.target.innerHTML + "<br>";
        }
    }



    updateImportantReview() {
        var updImp = {};
        updImp['token'] = this._constantService.getSessionDataBYKey('token');
        updImp['token_param'] = {};
        updImp['token_param']['device_type'] = 'w';
        updImp['token_param']['host'] = '';
        updImp['cors_uuid'] = this.Corsid;
        updImp['cors_rw_rating_uuid'] = this.rw_rtng_uuid;



        this._constantService.fetchDataApi(this._constantService.updateImportantToReview(), updImp).subscribe(data => {
            var responseData:any = data;
            var status = responseData.SUCCESS_MSG;
            if (status == "Course reviewed liked.") {
                this.LIKED_COUNT++;
                this.liked = true;
                //                this.getreviewPageCourse(this.Corsid);
            } else if (status == "Course reviewed disliked.") {
                this.liked = false;
                this.LIKED_COUNT--;
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });

    }

    hideRevPlaceholder() {
        this.shwRevPlaceholder = false;
    }
    showRevPlaceholder() {
        var desc = document.getElementById('reviewDescription').innerText;
        if (desc.length == 0) {
            this.shwRevPlaceholder = true;
        } else {
            this.shwRevPlaceholder = false;
        }

    }
    important() {
        this.updateImportantReview();
    }

    openCommentView(event) {

        var id = event.target.id.split('_');
        var x = id[0];
        this.count = 1;
        this.conditionCheck = x;
        this.viewCommentList = !this.viewCommentList;
        this.commentPresent = false;
        this.getreviewPagecomment();

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

    addImageFile(event: any) {
        this.comment_image = event.target.files[0];
        let type = this.comment_image.name;
        var reader = new FileReader();
        var typearr = type.split(".");
        var size = Math.round(this.comment_image.size / 1000 / 1000);
        if (size <= 10) {
            if (typearr[1] == 'jpg' || typearr[1] == 'jpeg' || typearr[1] == 'JPG' || typearr[1] == 'JPEG' || typearr[1] == 'png' || typearr[1] == 'PNG') {
                this.showCommentImg = 2;
                reader.onload = (event: any) => {
                    this.image_upload_url = event.target.result;
                }
                reader.readAsDataURL(event.target.files[0]);
                var upload = {};
                upload['token'] = this._constantService.getSessionDataBYKey('token');
                upload['token_param'] = {};
                upload['token_param']['device_type'] = "w";
                upload['token_param']['host'] = "";
                var data = JSON.stringify(upload);
                var encData = this._encrypt.encrypt(data);
                let formData = new FormData();
                formData.append("file", this.comment_image);
                formData.append("pattchid", '0');
                formData.append("token", encData);
                formData.append("type", "4");
                this._constantService.uploadFileApi(this._constantService.getUploadFileServiceUrl(), formData).subscribe(data => {
                    var responseData:any = data;
                    var status = responseData.STATUS;
                    if (status == this._constantService.success_msg) {
                        this.file_path = responseData.FPATH;
                        this.uuid = responseData.UUID;
                        this.commImageDimns = responseData.DIMENSION;
                        //this._constantService.setToken(responseData.TOKEN);
                        this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                    } else if (status == this._constantService.error_token) {
                        this.dataConf['type'] = 4;
                        this.dataConf['msg'] = "Session Expire";
                        this.dataConf['error_msg'] = "Session Expired";
                        this.openConfirmation = true;
                    } else {
                        this.showCommentImg = 1;
                        this.comment_image = null;
                    }
                }, error => {
                    var responseData = error;
                    if (responseData.status == 500) {
                        this._router.navigate(['500']);
                    }
                });
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = "Unable to support the selected file";
                this.openConfirmation = true;
                this.showCommentImg = 1;
                this.comment_image = null;
            }
        } else {
            this.dataConf['msg'] = "STUDY24X7";
            this.dataConf['type'] = 2;
            this.dataConf['error_msg'] = "File above 10mb is not allowed";
            this.openConfirmation = true;
            this.showCommentImg = 1;
            this.comment_image = null;
        }

    }

    updateProfilePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }
    // impLikeShareFn() {
    //     this.userLikeShareList['postId'] = this.post_id;
    //     this.userLikeShareList['type'] = 1;
    //     // this.userLikeShareList['count'] = this.like;
    //     this.userLikeShareList['count'] = this.LIKED_COUNT;
    //     this.impLikeShareStatus = !this.impLikeShareStatus;
    //     let body = document.getElementsByTagName('body')[0];
    //     body.classList.add("body-overflow");
    // }

    // onScrollDown() {
    //    console.log("scroll");
    //    console.log(this.continueScroll);
    //
    //     if (this.continueScroll) {
    //       this.pageCount++;
    //       if(this.isDraft){
    //         this.important(0);
    //       }
    //       else{
    //         this.important(1);
    //       }
    //     }
    //
    //   }

    impLikeShareFn() {
        this.userLikeShareList['postId'] = this.rw_rtng_uuid;
        this.userLikeShareList['corsId'] = this.Corsid;
        this.userLikeShareList['type'] = 4;
        this.userLikeShareList['count'] = 0;
        this.impLikeShareStatus = !this.impLikeShareStatus;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }

    loginpopupopen() {
        console.log(this.arr['COURSE_TITLE']);
        this.courseData['USER_FULL_NAME'] = this.arr['COURSE_TITLE'];
        this.courseData['PROFILE_PIC_PATH'] = this.arr['PROFILE_PIC_PATH'];
        this.openLoginPopup = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
        this._constantService.setSessionJsonPair('publicClickedURL', 'course/' + this.CorsUrl);
    }

    closeLoginPopUp(event) {
        this.openLoginPopup = false;
        if (event['LOGIN']) {
            // this.withoutToken = false;
            //this._constantService.setPublicClickedUrl('course/' + this.Corsid);
            this._constantService.setSessionJsonPair('publicClickedURL', 'course/' + this.CorsUrl);
        }
    }

}
