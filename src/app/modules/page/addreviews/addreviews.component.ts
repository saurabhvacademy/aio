import {Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import {ConstantService} from './../../../services/constant.service';
import {EncryptionService} from './../../../services/encryption.service';
import {Router} from '@angular/router';
import {PostdataService} from './../../../services/postdata.service';

@Component({
    selector: 'app-addreviews',
    templateUrl: './addreviews.component.html',
    styleUrls: ['./addreviews.component.scss','./../../../sharedComponents/postComponents/textpost/allpost.css','./../../../sharedComponents/peopleyouknow/peopleyouknow.component.scss','./newaddreviews.component.scss']
})
export class AddreviewsComponent implements OnInit {
    @Input() pageId:string;
    @Input() pageName:string;
    @Output() reviewStatus = new EventEmitter<object>();
    reviewData = {};
    reviewinput: boolean = false;
    revicedesc:string = "";


    constructor(
        public _constantService: ConstantService,
        private _encrypt: EncryptionService,
        private router: Router,
        private postData: PostdataService
    ) {}

    ngOnInit() {
    }
    show_review_pop() {
        if (this.reviewinput === false) {

            this.reviewinput = true;
            let body = document.getElementsByTagName('body')[0];
            body.classList.add("body-overflow");
        }

    }
    hide_review_pop() {
        if (this.reviewinput === true) {
            this.reviewinput = false;
            this.revicedesc = '';
            this.reviewData['status'] = false;
            this.reviewStatus.emit(this.reviewData);
            let body = document.getElementsByTagName('body')[0];
            body.classList.remove("body-overflow");
        }
    }

    addPageRating(){
        var addRating = {};
        addRating['token'] = this._constantService.getSessionDataBYKey('token');
        addRating['token_param'] = {};
        addRating['token_param']['device_type'] = 'w';
        addRating['token_param']['host'] = '';
        addRating['pg_uuid'] = this.pageId;
        addRating['pg_rw_rating_uuid'] = '';
        var selectedResponse = (<HTMLInputElement> document.querySelector('input[name="star"]:checked'));
        if(selectedResponse == null){                         ////////////////changedone by vijay/////////////////
          this._constantService.showToast( "First share your reviews with us", "","1" );
            return false;
        }
        addRating['pg_rw_rating'] = selectedResponse.value;

        this.revicedesc = this.revicedesc.trim();
        this.revicedesc = this.revicedesc.replace(/&#09;/g, "");
        this.revicedesc = this.revicedesc.replace(/\<(?!span|br|a|\/span|\/br|\/a).*?\>/g, "");
        this.revicedesc = this.revicedesc.replace(/\n/g,"<br>");

        addRating['pg_rw_des'] = this.postData.encodeURIPostData(this.revicedesc);

        this._constantService.fetchDataApi(this._constantService.getAddPageReviewServiceUrl(), addRating).subscribe(data=>{
            var responseData:any=  data;
            var status = responseData.STATUS;
            if(status==this._constantService.success_msg){
                this.reviewData['status'] = true;
                this.reviewData['PAGE_REVIEWS_RATINGS_UUID'] = responseData.PG_RW_UUID;
                this.reviewData['REVIEW_DESCRIPTION'] = this.postData.encodeURIPostData(this.revicedesc);
                this.reviewData['STAR_RATING'] = parseInt(selectedResponse.value);
                this.reviewinput = false;
                this.reviewStatus.emit(this.reviewData);
                this._constantService.callEmptyStateMethod();
            }

          },error=>{

            var responseData = error;
            if(responseData.status==500){
                this.router.navigate(['500']);
            }
        });
    }

    updateSourcePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }
}
