import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver, ViewContainerRef, EventEmitter, Output } from '@angular/core';
import { ConstantService } from './../../../services/constant.service';
import { EncryptionService } from './../../../services/encryption.service';
import { PostdataService } from './../../../services/postdata.service';
import { Router } from '@angular/router';
import { UserreviewComponent } from './userreview/userreview.component';
import { InternalMessageService } from '../../../services/internal-message.service';


@Component({
    selector: 'app-pagereviews',
    templateUrl: './pagereviews.component.html',
    styleUrls: ['./pagereviews.component.scss', './allpost.component.scss']
})
export class PagereviewsComponent implements OnInit {
    _ref: any;
    @Input() user_type: number;
    @Input() pageId: string;
    @Input() reviewed: number;
    @Output() isReviewed = new EventEmitter;
    @ViewChild('container', { read: ViewContainerRef }) container;
    showAddReview;
    lastReviewAddDateTime: string = '';
    continueScroll: boolean = false;
    reviewPresent: boolean = false;
    loadReviews: boolean = true;
    @Input() withoutToken: boolean = false;
    constructor(
        public _constantService: ConstantService,
        private _encrtpy: EncryptionService,
        private _router: Router,
        private postData: PostdataService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private _internalMessageService: InternalMessageService

    ) { }

    ngOnInit() {
        this.showAddReview = this.reviewed;
        if (!this.withoutToken) {
            this.getPageReview('');

        } else {
            this.getPageReviewPublic('');
        }
        this._internalMessageService.pageReviewed.subscribe(data => {
            this.reviewed = data;
        })
    }

    checkReviewStatus(event) {
        if (event['status']) {
            this.reviewed = 1;
            this.isReviewed.emit(this.reviewed);
            var reviewData = {};
            var date = new Date();
            reviewData['PAGE_UUID'] = this.pageId;
            reviewData['PAGE_REVIEWS_RATINGS_UUID'] = event['PAGE_REVIEWS_RATINGS_UUID'];
            reviewData['USER_FULL_NAME'] = this._constantService.getSessionDataBYKey('full_name');
            reviewData['USER_NAME'] = this._constantService.getSessionDataBYKey('username');
            reviewData['PROFILE_PHOTO_PATH'] = this._constantService.getSessionDataBYKey('profile_pic_s3');
            reviewData['USER_OLD_ID'] = this._constantService.getSessionDataBYKey('u_id');
            reviewData['ADD_DATE_TIME'] = this.postData.getPostDateTime(date.getTime());
            reviewData['STAR_RATING'] = event['STAR_RATING'];
            reviewData['ISLIKE'] = 0;
            reviewData['LIKED_COUNT'] = 0;
            reviewData['COMMENT_COUNT'] = 0;
            reviewData['withoutToken'] = this.withoutToken;
            reviewData['REVIEW_DESCRIPTION'] = event['REVIEW_DESCRIPTION'];
            var factory = this.componentFactoryResolver.resolveComponentFactory(UserreviewComponent);
            var ref = this.container.createComponent(factory, 0);
            ref.instance.arr = reviewData;
            ref.instance._ref = ref;
            this.reviewPresent = true;
        }
    }

    getPageReview(lstaddtm) {
        var pageReview = {};
        pageReview['token'] = this._constantService.getSessionDataBYKey('token');
        pageReview['token_param'] = {};
        pageReview['token_param']['device_type'] = 'w';
        pageReview['token_param']['host'] = '';
        pageReview['pg_uuid'] = this.pageId;
        pageReview['lpg_rw_id'] = lstaddtm;
        pageReview['count'] = 6;
        pageReview['flow'] = 'd';

        this._constantService.fetchDataApi(this._constantService.getPageReviewsServiceUrl(), pageReview).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                this.loadReviews = false;
                var pageReviewList = responseData.PG_RW_LIST;
                if (pageReviewList.length != 0) {
                    this.reviewPresent = true;
                    this.lastReviewAddDateTime = pageReviewList[pageReviewList.length - 1].PAGE_REVIEWS_RATINGS_ID;
                }
                if (pageReviewList.length < 6) {
                    this.continueScroll = false;
                } else {
                    this.continueScroll = true;
                }
                for (var i = 0; i < pageReviewList.length; i++) {
                    pageReviewList[i].ADD_DATE_TIME = this.postData.getPostDateTime(pageReviewList[i].ADD_DATE_TIME);
                    pageReviewList[i].withoutToken = false;
                    var factory = this.componentFactoryResolver.resolveComponentFactory(UserreviewComponent);
                    var ref = this.container.createComponent(factory);
                    pageReviewList[i].PAGE_UUID = this.pageId;
                    ref.instance._ref = ref;
                    ref.instance.arr = pageReviewList[i];
                }
            }
        })

    }

    getPageReviewPublic(lstaddtm) {
        var pageReview = {};
        pageReview['pg_uuid'] = this.pageId;
        pageReview['lpg_rw_id'] = lstaddtm;
        pageReview['count'] = 6;
        pageReview['flow'] = 'd';

        this._constantService.fetchDataApi(this._constantService.getPublicPageReviewsServiceUrl(), pageReview).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                this.loadReviews = false;
                var pageReviewList = responseData.PG_RW_LIST;
                if (pageReviewList.length != 0) {
                    this.reviewPresent = true;
                    this.lastReviewAddDateTime = pageReviewList[pageReviewList.length - 1].PAGE_REVIEWS_RATINGS_ID;
                }
                if (pageReviewList.length < 6) {
                    this.continueScroll = false;
                } else {
                    this.continueScroll = true;
                }
                for (var i = 0; i < pageReviewList.length; i++) {
                    pageReviewList[i].ADD_DATE_TIME = this.postData.getPostDateTime(pageReviewList[i].ADD_DATE_TIME);
                    pageReviewList[i].withoutToken = true;
                    var factory = this.componentFactoryResolver.resolveComponentFactory(UserreviewComponent);
                    var ref = this.container.createComponent(factory);
                    pageReviewList[i].PAGE_UUID = this.pageId;
                    ref.instance._ref = ref;
                    ref.instance.arr = pageReviewList[i];
                }
            }
        })

    }


    onScrollDown() {
        if (this.continueScroll) {
            if (!this.withoutToken) {
                this.getPageReview(this.lastReviewAddDateTime);
            } else {
                this.getPageReviewPublic(this.lastReviewAddDateTime);
            }
        }
    }

}
