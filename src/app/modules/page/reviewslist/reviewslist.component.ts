import {Component, OnInit, Input, EventEmitter, Output, ViewChild, ComponentFactoryResolver, ViewContainerRef} from '@angular/core';
import {ConstantService} from './../../../services/constant.service';
import {EncryptionService} from './../../../services/encryption.service';
import {PostdataService} from './../../../services/postdata.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-reviewslist',
    templateUrl: './reviewslist.component.html',
    styleUrls: ['./reviewslist.component.scss','./../../../sharedComponents/postComponents/textpost/allpost.css', './newreviewslist.component.scss']
})
export class ReviewslistComponent implements OnInit {


    @Input() pageId: string;
    @Input() user_type: number;
    @Input() pageRating: object;
    @Input() reviwed: number;
    @Output() changeTab = new EventEmitter<number>()
    @Output() reviewStatus = new EventEmitter<boolean>();
    oldId: string = "";
    reviewinput: boolean = false;
    pageReviewList = [];
    reviewList: boolean = true;
    avgRating: number;
    date = new Date();
    revicedesc = "";
    uname;
    showReviewDiv: boolean = true;
    constructor(
        private router: Router,
        public _constantService: ConstantService,
        private _encrtpy: EncryptionService,
        private postData: PostdataService,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {}

    ngOnInit() {
        this.oldId = this.pageId;
        this.getPageReview();
        if (this.pageRating) {
            this.avgRating = this.pageRating['avg_rating'];
        }
        var x = this._constantService.getSessionDataBYKey('p_pic');
        if (x.length < 5) {
            //this._constantService.setProfilePicPath(this._constantService.defaultImgPath);
            this._constantService.setSessionJsonPair('p_pic',this._constantService.defaultImgPath);
        }
    }
    ngDoCheck() {
        if (this.pageId != this.oldId) {
            this.oldId = this.pageId;
            this.getPageReview();
            if (this.pageRating) {
                this.avgRating = this.pageRating['avg_rating'];
            }
        }
    }


    show_review_pop() {
        //        if (this.reviewinput === false) {
        //            this.reviewinput = true;
        //            let body = document.getElementsByTagName('body')[0];
        //            body.classList.add("body-overflow");
        //        }
        this.changeTab.emit(4);
    }
    hide_review_pop() {
        if (this.reviewinput === true) {
            this.reviewinput = false;
            let body = document.getElementsByTagName('body')[0];
            body.classList.remove("body-overflow");
        }
    }

    getPageReview() {
        var pageReview = {};
        pageReview['token'] = this._constantService.getSessionDataBYKey('token');
        pageReview['token_param'] = {};
        pageReview['token_param']['device_type'] = 'w';
        pageReview['token_param']['host'] = '';
        pageReview['pg_uuid'] = this.pageId;
        pageReview['lpg_rw_id'] = "";
        pageReview['count'] = 2;
        pageReview['flow'] = 'd';

        this._constantService.fetchDataApi(this._constantService.getPageReviewsServiceUrl(), pageReview).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.pageReviewList = responseData.PG_RW_LIST;
                for (var i = 0; i < this.pageReviewList.length; i++) {
                    this.pageReviewList[i].ADD_DATE_TIME = this.postData.getPostDateTime(this.pageReviewList[i].ADD_DATE_TIME);
                    this.pageReviewList[i].PROFILE_PHOTO_PATH = this.pageReviewList[i].PROFILE_PHOTO_PATH + "profile/" + this.pageReviewList[i].USER_OLD_ID + "_60x60.png";
                    this.pageReviewList[i].REVIEW_DESCRIPTION = this.postData.decodeURIPostData(this.pageReviewList[i].REVIEW_DESCRIPTION);
                }
            }
            if (this.pageReviewList.length == 0 && this.user_type == 1) {
                this.showReviewDiv = false;
            }
        });

    }

    addPageRating(event) {
        if ((<HTMLInputElement> document.getElementById('reviewDesc')) != null && (<HTMLInputElement> document.getElementById('reviewDesc')) != undefined) {
            var x = (<HTMLInputElement> document.getElementById('reviewDesc'));
            if (x != null && x != undefined) {
                this.revicedesc = x.value;
            }
        }
        var addRating = {};
        addRating['token'] = this._constantService.getSessionDataBYKey('token');
        addRating['token_param'] = {};
        addRating['token_param']['device_type'] = 'w';
        addRating['token_param']['host'] = '';
        addRating['pg_uuid'] = this.pageId;
        addRating['pg_rw_rating_uuid'] = '';
        var selectedResponse = (<HTMLInputElement> document.querySelector('input[name="star"]:checked'));
        if (selectedResponse.value == null) {
            return false;
        }
        addRating['pg_rw_rating'] = selectedResponse.value;

        this.revicedesc = this.revicedesc.trim();
        this.revicedesc = this.revicedesc.replace(/&#09;/g, "");
        this.revicedesc = this.revicedesc.replace(/\<(?!span|br|a|\/span|\/br|\/a).*?\>/g, "");
        this.revicedesc = this.revicedesc.replace(/\n/g, "<br>");
        if (this.revicedesc.length == 0) {
            // return false;
            this.revicedesc = '';
        }
        addRating['pg_rw_des'] = this.postData.encodeURIPostData(this.revicedesc);
        this._constantService.fetchDataApi(this._constantService.getAddPageReviewServiceUrl(), addRating).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.reviwed = 1;
                this.reviewStatus.emit(true);
                var date = new Date();
                var dateLong = date.getTime();
                var reviewData = {};
                reviewData['ADD_DATE_TIME'] = this.postData.getPostDateTime(dateLong);
                reviewData['USER_FULL_NAME'] = this._constantService.getSessionDataBYKey('full_name');
                reviewData['PROFILE_PHOTO_PATH'] = this._constantService.getSessionDataBYKey('p_pic');
                reviewData['REVIEW_DESCRIPTION'] = this.revicedesc;
                reviewData['STAR_RATING'] = parseInt(selectedResponse.value);
                if (this.pageReviewList.length == 0) {
                    this.pageReviewList[0] = reviewData;
                } else {
                    this.pageReviewList[1] = reviewData;
                }

            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });
    }

    updateSourcePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }

    goToReview() {
        this.changeTab.emit(4);
    }

}
