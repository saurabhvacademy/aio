import { Component, OnInit, AfterViewInit, ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { ConstantService } from './../../../../services/constant.service';
import { EncryptionService } from './../../../../services/encryption.service';
import { PostdataService } from './../../../../services/postdata.service';
import { ReviewCommentComponent } from './../review-comment/review-comment.component';
import { Router } from '@angular/router';
import { InternalMessageService } from '../../../../services/internal-message.service';


@Component({
    selector: 'app-userreview',
    templateUrl: './userreview.component.html',
    styleUrls: [ './../allpost.component.scss', './../../../../sharedComponents/postComponents/sharetextpostview/sharetextpostview.component.scss', './userreview.component.scss', './newuserreview.component.scss',]
})
export class UserreviewComponent implements OnInit, AfterViewInit {
    confirmDelete: boolean = false;
    enableSeemore: boolean = false;
    seemoreComment: any;
    @ViewChild('container', { read: ViewContainerRef }) container;
    arr: any;
    _ref: any;
    user_full_name: string;
    rating: number;
    add_date_time: string;
    DataView: boolean = false;
    reviewdata: string;
    reviewdataE: string;
    profile_pic_path: string;
    importantCondition: boolean = false;
    like = 0;
    comment = 0;
    reviewId: string;
    pageId: string;
    hideSpan = 0;
    u_id: number;
    c_data: string;
    viewCommentList: boolean = false;
    commentPresent: boolean = false;
    postmenu: boolean = false;
    pageRatingCommentid = 0;
    my_review: boolean = false;
    reviewinput: boolean = false;
    userLikeShareList = {};
    impLikeShareStatus: boolean = false;
    date = new Date();
    latestComment: any;
    lastCommentId = 0;
    factory;
    ref;
    dataConf = {};
    withoutToken: boolean = false;
    reviewData: any;
    user_name: any;
    constructor(
        public _constantService: ConstantService,
        private _encrypt: EncryptionService,
        public postData: PostdataService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private router: Router,
        private _internalMessageService: InternalMessageService
    ) { }

    ngOnInit() {
        if (this.arr['USER_OLD_ID'] == this._constantService.getSessionDataBYKey('u_id')) {
            this.my_review = true;
        }
        this.withoutToken = this.arr['withoutToken'];
        this.user_full_name = this.arr['USER_FULL_NAME'];
        this.user_name=this.arr['USER_NAME']
        this.add_date_time = this.arr['ADD_DATE_TIME'];
        if (this.arr['REVIEW_DESCRIPTION']) {
            this.reviewdata = this.postData.decodeURIPostData(this.arr['REVIEW_DESCRIPTION']).trim();
            if (this.reviewdata.length > 200) {
                this.DataView = !this.DataView;
            }
        } else {
            this.reviewdata = "";
        }
        //        this.reviewdata = this.reviewdata.replace(/\&lt;/g,"<");
        //        this.reviewdata = this.reviewdata.replace(/\&gt;/g,">");

        this.rating = this.arr['STAR_RATING'];
        if (this.arr['PROFILE_PHOTO_PATH'] != '') {
            this.profile_pic_path = this.arr['PROFILE_PHOTO_PATH'] + "profile/" + this.arr['USER_OLD_ID'] + "_60x60.png";
        } else {
            this.profile_pic_path = this._constantService.defaultImgPath;
        }
        if (this.arr['ISLIKE'] != 0) {
            this.importantCondition = true;
        }
        if (this.arr['LIKED_COUNT'] != 0) {
            this.like = this.arr['LIKED_COUNT'];
        }
        if (this.arr['COMMENT_COUNT'] != 0) {
            this.comment = this.arr['COMMENT_COUNT'];
        }
        if (this.comment > 0) {
            this.viewCommentList = true;
        }
        if (this.comment > 1) {
            this.commentPresent = true;
        }
        this.seemoreComment = this.arr['COMMENT_COUNT'];
        if (this.seemoreComment > 1) {
            this.enableSeemore = true;
        }
        this.reviewId = this.arr['PAGE_REVIEWS_RATINGS_UUID'];
        this.pageId = this.arr['PAGE_UUID'];
        this.u_id = this.arr['USER_OLD_ID'];
        this.latestComment = this.arr['COMMENT_DATA'];
        if (Object.keys(this.latestComment).length != 0) {
            this.viewCommentList = true;
        } else { this.viewCommentList = false; }




    }

    ngAfterViewInit() {
        if (Object.keys(this.latestComment).length != 0) {
            this.latestComment['ADD_DATE_TIME'] = this.postData.getPostDateTime(this.latestComment['ADD_DATE_TIME']);
            this.lastCommentId = this.latestComment.PAGE_REVIEWS_RATINGS_COMMENT_ID;
            this.pageRatingCommentid = this.latestComment.PAGE_REVIEWS_RATINGS_COMMENT_ID;
            //this.latestComment['ADD_DATE_TIME'] = this.postdata.getPostDateTime(this.latestComment['ADD_DATE_TIME']);
            //this._constantService.setCommentData(this.latestComment);
            this.factory = this.componentFactoryResolver.resolveComponentFactory(ReviewCommentComponent);
            this.ref = this.container.createComponent(this.factory);
            this.ref.instance.arr = this.latestComment;
            this.ref.instance._ref = this.ref;
        }
    }


    reviewImportant() {
        var importData = {};
        importData['token'] = this._constantService.getSessionDataBYKey('token');
        importData['token_param'] = {};
        importData['token_param']['device_type'] = 'w';
        importData['token_param']['host'] = '';
        importData['pg_uuid'] = this.pageId;
        importData['pg_rw_rating_uuid'] = this.reviewId;
        if (this.importantCondition) {
            importData['status'] = 1;
        } else {
            importData['status'] = 0;
        }



        this._constantService.fetchDataApi(this._constantService.getPageReviewImportantServiceUrl(),importData).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == "success") {
                this.importantCondition = !this.importantCondition;
                if (this.importantCondition) {
                    this.like++;
                } else {
                    this.like = this.like - 1;
                }
            } else if (status == 'error_token') {
            } else {
            }
        });

    }



    updateSourcePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }

    hidePlaceHolder(event) {
        this.hideSpan = 2;
        if (event.target.innerText == this._constantService.commentPlaceHolder) {
            event.target.innerText = "";
            var v = document.getElementById(event.target.id);
            v.classList.add("option_inputt");
            v.classList.remove("placeholdercolor");
        }
    }

    showPlaceHolder(event) {
        if (event.target.innerText.length == 0 || event.target.innerText.length == 1) {
            this.hideSpan = 1;
            event.target.innerText = this._constantService.commentPlaceHolder;
            var v = document.getElementById(event.target.id);
            v.classList.remove("option_inputt");
            v.classList.add("placeholdercolor");
        }
    }

    confirmText(value, event) {
        event.preventDefault();
        event.stopPropagation();
        this.c_data = value;
    }

    addComment(event) {
        if (event.keyCode == 13 && !event.ctrlKey) {
            event.preventDefault();
            this.c_data = this.postData.decodeURIPostData(event.target.innerHTML).replace(/\n/g, '<br>').replace(/\<(?!span|br|a|\/span|\/br|\/a).*?\>/g, "").replace(/&#09;/g, "").replace(/&nbsp;/g, "").replace(/"ng-reflect-ng-if": "false"/g, "").replace(/}-->/g, "").trim();
            if (this.c_data.length == 0) {
                this.confirmText(this.c_data, event);
                return false;
            }
            var checkContent = this.c_data.replace(/<br>/g, "");
            if (checkContent.length == 0) {
                return;
            }
            var id = event.target.id;
            var comment = {};
            comment['token'] = this._constantService.getSessionDataBYKey('token');
            comment['token_param'] = {};
            comment['token_param']['device_type'] = 'w';
            comment['token_param']['host'] = '';
            comment['pg_uuid'] = this.pageId;
            comment['cmda'] = this.postData.encodeURIPostData(this.c_data);
            comment['pg_rw_rating_cmm_uuid'] = "";
            comment['pg_rw_rating_uuid'] = this.arr['PAGE_REVIEWS_RATINGS_UUID'];
            comment['uuid'] = "";
            comment['fpath'] = '';
            var commentdata = this.c_data;
            if (comment['cmda'].length == 0) {
                return false;
            }



            this._constantService.fetchDataApi(this._constantService.getAddCommentOnReviewServiceUrl(), comment).subscribe(data => {
                var responseData:any = data;
                var status = responseData.STATUS;
                if (status == "success") {
                    this.viewCommentList = true;
                    this.hideSpan = 1;
                    var date = new Date();
                    var addComment = {};
                    addComment['USER_OLD_ID'] = this._constantService.getSessionDataBYKey('u_id');
                    addComment['PROFILE_PHOTO_PATH'] = this._constantService.getSessionDataBYKey('profile_pic_s3');
                    addComment['TEXT'] = commentdata;
                    addComment['USER_COMMENT_ID'] = responseData.PG_RW_COMID;
                    addComment['USER_FULL_NAME'] = this._constantService.getSessionDataBYKey('full_name');
                    addComment['USER_NAME'] = this._constantService.getSessionDataBYKey('username');
                    addComment['ADD_DATE_TIME'] = this.postData.getPostDateTime(date.getTime());
                    setTimeout(() => {
                        var factory = this.componentFactoryResolver.resolveComponentFactory(ReviewCommentComponent);
                        var ref = this.container.createComponent(factory, 0);
                        ref.instance.arr = addComment;
                    }, 400);
                    event.target.innerHTML = "&zwnj;";
                    this.hideSpan = 1;
                } else if (status == 'error_token') {

                } else {

                }
            });

        } else if (event.keyCode == 13 && event.keyCode == 17) {
            event.target.innerHTML = event.target.innerHTML + "<br>";
        }
    }

    getReviewComment(pageRatingCommentid) {
        var reviewComment = {};
        reviewComment['token'] = this._constantService.getSessionDataBYKey('token');
        reviewComment['token_param'] = {};
        reviewComment['token_param']['device_type'] = 'w';
        reviewComment['token_param']['host'] = '';
        reviewComment['pg_uuid'] = this.pageId;
        reviewComment['pg_rw_rating_uuid'] = this.reviewId;
        reviewComment['lpg_rw_cmt_id'] = pageRatingCommentid;
        reviewComment['flow'] = "d";
        reviewComment['count'] = 10;



        this._constantService.fetchDataApi(this._constantService.getPageReviceCommentServiceUrl(),reviewComment).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == "success") {
                var pageReviewComments = responseData.PG_REVIEW_COMMENT_DATA;
                if (pageReviewComments.length > 0) {
                    this.pageRatingCommentid = pageReviewComments[pageReviewComments.length - 1].PAGE_REVIEWS_RATINGS_COMMENT_ID;
                    this.commentPresent = true;
                }
                if (pageReviewComments.length < 10) {
                    this.commentPresent = false;
                    this.enableSeemore = false;
                }
                for (var i = 0; i < pageReviewComments.length; i++) {
                    var factory = this.componentFactoryResolver.resolveComponentFactory(ReviewCommentComponent);
                    var ref = this.container.createComponent(factory);
                    ref.instance.arr = pageReviewComments[i];
                }
            }
        })
    }

    postdropdown() {
        this.postmenu = !this.postmenu;
    }

    editReview() {
        this.reviewinput = true;
        this.reviewdataE = this.reviewdata.replace(/\&lt;/g, "<");
        this.reviewdataE = this.reviewdata.replace(/\&gt;/g, ">");
        this.reviewdataE = this.reviewdata.replace(/<br>/g, "\n");
        setTimeout(() => {
            if (this.rating == 1) {
                (<HTMLInputElement>document.getElementById("star-1")).checked = true;
            }
            if (this.rating == 2) {
                (<HTMLInputElement>document.getElementById("star-2")).checked = true;
            }
            if (this.rating == 3) {
                (<HTMLInputElement>document.getElementById("star-3")).checked = true;
            }
            if (this.rating == 4) {
                (<HTMLInputElement>document.getElementById("star-4")).checked = true;
            }
            if (this.rating == 5) {
                (<HTMLInputElement>document.getElementById("star-5")).checked = true;
            }
        }, 100)

    }

    hide_review_pop() {
        this.postmenu = false;
        this.reviewinput = false;
        this.reviewdata = this.reviewdata.trim();
        this.reviewdata = this.reviewdata.replace(/</g, "&lt;");
        this.reviewdata = this.reviewdata.replace(/>/g, "&gt;");
        this.reviewdata = this.reviewdata.replace(/&#09;/g, "");
        this.reviewdata = this.reviewdata.replace(/\<(?!span|br|a|\/span|\/br|\/a).*?\>/g, "");
        this.reviewdata = this.reviewdata.replace(/\n/g, "<br>");
    }

    addPageRating() {
        var addRating = {};
        addRating['token'] = this._constantService.getSessionDataBYKey('token');
        addRating['token_param'] = {};
        addRating['token_param']['device_type'] = 'w';
        addRating['token_param']['host'] = '';
        addRating['pg_uuid'] = this.pageId;
        addRating['pg_rw_rating_uuid'] = this.reviewId;
        var selectedResponse = (<HTMLInputElement>document.querySelector('input[name="star"]:checked'));
        if (selectedResponse.value == null) {
            return false;
        }
        addRating['pg_rw_rating'] = selectedResponse.value;

        this.reviewdata = (<HTMLInputElement>document.getElementById("reviewData")).value;
        this.reviewdata = this.reviewdata.trim();
        this.reviewdata = this.reviewdata.replace(/</g, "&lt;");
        this.reviewdata = this.reviewdata.replace(/>/g, "&gt;");
        this.reviewdata = this.reviewdata.replace(/&#09;/g, "");
        this.reviewdata = this.reviewdata.replace(/\<(?!span|br|a|\/span|\/br|\/a).*?\>/g, "");
        this.reviewdata = this.reviewdata.replace(/\n/g, "<br>");
        if (selectedResponse.value == '0.0') {
            return false;
        }
        addRating['pg_rw_des'] = this.postData.encodeURIPostData(this.reviewdata);
        //        addRating['pg_rw_des'] = this.revicedesc;


        this._constantService.fetchDataApi(this._constantService.getAddPageReviewServiceUrl(),addRating).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.reviewinput = false;
                this.postmenu = false;
                this.rating = parseInt(selectedResponse.value);
                this._constantService.callEmptyStateMethod();

            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });
    }

    impLikeShareFn() {
        this.userLikeShareList['pg_uuid'] = this.pageId;
        this.userLikeShareList['reviewId'] = this.reviewId;
        this.userLikeShareList['type'] = 3;
        this.userLikeShareList['count'] = this.like;
        this.impLikeShareStatus = !this.impLikeShareStatus;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }

    CloseViewAll($event) {
        this.impLikeShareStatus = false;
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }

    autoFocus() {
        var id = this.u_id + '_' + this.reviewId + '_comm';
        if ((<HTMLInputElement>document.getElementById(id)).innerText == this._constantService.commentPlaceHolder) {
            (<HTMLInputElement>document.getElementById(id)).innerText = '';
        }
        (<HTMLInputElement>document.getElementById(id)).focus();

    }

    confDelReview() {
        this.dataConf['type'] = 7;
        this.dataConf['msg'] = "Delete Review";
        this.dataConf['error_msg'] = "Do you really want to delete your review ?";
        this.confirmDelete = true;
        this.postmenu = false;
    }

    deletePageReview() {
        var delReview = {};
        delReview['token'] = this._constantService.getSessionDataBYKey('token');
        delReview['token_param'] = {};
        delReview['token_param']['device_type'] = 'w';
        delReview['token_param']['host'] = '';
        delReview['pg_uuid'] = this.pageId;
        delReview['pg_rw_rating_uuid'] = this.reviewId;



        this._constantService.fetchDataApi(this._constantService.getDelPageReviewServiceUrl(), delReview).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this._internalMessageService.setPageReviewed(0);
                this.confirmDelete = false;
                this._ref;
                this._ref.destroy();
                this._constantService.callEmptyStateMethod();
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });

    }

    closePopup(event) {
        if (event['delReview'] == false) {
            this.confirmDelete = false;
        }
    }

    openLoginPopup() {
        this._constantService.openloginPopup();
    }
}
