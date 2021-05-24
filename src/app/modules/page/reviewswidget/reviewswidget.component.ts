import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ConstantService} from './../../../services/constant.service';
import {EncryptionService} from './../../../services/encryption.service';
import {PostdataService} from './../../../services/postdata.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-reviewswidget',
    templateUrl: './reviewswidget.component.html',
    styleUrls: ['./reviewswidget.component.scss']
})
export class ReviewswidgetComponent implements OnInit {
    publicView: boolean = false;
    hidereviewWidget: boolean = true;;
    @Input() pageId: string;
    @Output() pageRating = new EventEmitter<object>();
    @Output() reviewWidgetSelection = new EventEmitter();
    @Input()  forRouting:string;
    avgRating: number;
    totalRating: number;
    star1rating: number;
    star2rating: number;
    star3rating: number;
    star4rating: number;
    star5rating: number;
    star1ratingwidth: number = 0;
    star2ratingwidth: number = 0;
    star3ratingwidth: number = 0;
    star4ratingwidth: number = 0;
    star5ratingwidth: number = 0;
    t: string = "";

    // reviewinput: boolean = false;

    constructor(
        public _constantService: ConstantService,
        private _encrtpy: EncryptionService,
        private _router: Router,
        private postData: PostdataService

    ) {
        this._constantService.GetEmptystateObservable$.subscribe(() => {
            this.getPageRating();
        });
    }

    ngOnInit() {
        this.t = this._constantService.getSessionDataBYKey('token');
        if (this.t != null && this.t != 'undefined' && this.t != '') {
            this.pageId = this._constantService.getSessionDataBYKey('page_uuid');
            this.getPageRating();
        } else {
          setTimeout(()=>{
            this.publicView = true;
            this.getreviewPublicPost(this.pageId);
          },300);

        }

    }




    getPageRating() {
        var pageRating = {};
        pageRating['token'] = this._constantService.getSessionDataBYKey('token');
        pageRating['token_param'] = {};
        pageRating['token_param']['device_type'] = 'w';
        pageRating['token_param']['host'] = '';
        pageRating['pg_uuid'] = this.pageId;

        this._constantService.fetchDataApi(this._constantService.getPageRatingServiceUrl(), pageRating).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                var rating = {};
                rating['total'] = responseData.PG_RAT_DATA.TOTAL_RAT;
                if (rating['total'] == 0) {
                    this.hidereviewWidget = false;
                    this.reviewWidgetSelection.emit(2);
                }
                rating['avg_rating'] = responseData.PG_RAT_DATA.TOTAL_AVERAGE_RAT;
                this.pageRating.emit(rating);
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token',responseData.TOKEN);
                this.avgRating = responseData.PG_RAT_DATA.TOTAL_AVERAGE_RAT;
                this.totalRating = responseData.PG_RAT_DATA.TOTAL_RAT;
                this.star1rating = parseInt(responseData.PG_RAT_DATA.TOTAL_1_RAT);
                this.star2rating = parseInt(responseData.PG_RAT_DATA.TOTAL_2_RAT);
                this.star3rating = parseInt(responseData.PG_RAT_DATA.TOTAL_3_RAT);
                this.star4rating = parseInt(responseData.PG_RAT_DATA.TOTAL_4_RAT);
                this.star5rating = parseInt(responseData.PG_RAT_DATA.TOTAL_5_RAT);

                if (this.totalRating != 0) {
                    this.star1ratingwidth = (this.star1rating / this.totalRating) * 100;
                    this.star2ratingwidth = (this.star2rating / this.totalRating) * 100;
                    this.star3ratingwidth = (this.star3rating / this.totalRating) * 100;
                    this.star4ratingwidth = (this.star4rating / this.totalRating) * 100;
                    this.star5ratingwidth = (this.star5rating / this.totalRating) * 100;
                }
            } else if (status == this._constantService.error_token) {

            } else {

            }

        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });

    }



    getreviewPublicPost(paramsId) {
        var review = {};
        review['pg_uuid'] = paramsId;
        this._constantService.fetchDataApi(this._constantService.getreviewPublicPost(), review).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                var rating = {};
                rating['total'] = responseData.PG_RAT_DATA.TOTAL_RAT;
                if (rating['total'] == 0) {
                    //this.hidereviewWidget = false;
                }
                rating['avg_rating'] = responseData.PG_RAT_DATA.TOTAL_AVERAGE_RAT;
                this.pageRating.emit(rating);
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token',responseData.TOKEN);
                this.avgRating = responseData.PG_RAT_DATA.TOTAL_AVERAGE_RAT;
                this.totalRating = responseData.PG_RAT_DATA.TOTAL_RAT;
                this.star1rating = responseData.PG_RAT_DATA.TOTAL_1_RAT;
                this.star2rating = responseData.PG_RAT_DATA.TOTAL_2_RAT;
                this.star3rating = responseData.PG_RAT_DATA.TOTAL_3_RAT;
                this.star4rating = responseData.PG_RAT_DATA.TOTAL_4_RAT;
                this.star5rating = responseData.PG_RAT_DATA.TOTAL_5_RAT;
                var maxRating = Math.max(this.star1rating, this.star2rating, this.star3rating, this.star4rating, this.star5rating);
                if (this.totalRating != 0) {
                    this.star1ratingwidth = (this.star1rating / this.totalRating) * 100;
                    this.star2ratingwidth = (this.star2rating / this.totalRating) * 100;
                    this.star3ratingwidth = (this.star3rating / this.totalRating) * 100;
                    this.star4ratingwidth = (this.star4rating / this.totalRating) * 100;
                    this.star5ratingwidth = (this.star5rating / this.totalRating) * 100;

                }
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    savePublicPostUrlFxn(){
        if (this.publicView){
            this._constantService.setSessionJsonPair('publicClickedURL', 'page/' + this.pageId);
        }
    }



}
