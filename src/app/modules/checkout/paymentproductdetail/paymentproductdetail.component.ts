
import {Component, OnInit, ComponentFactoryResolver, Output, Input, EventEmitter, ViewContainerRef, ViewChild} from '@angular/core';
import {ConstantService} from './../../../services/constant.service';
import {EncryptionService} from './../../../services/encryption.service';
import {PostdataService} from './../../../services/postdata.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {PlatformLocation} from '@angular/common';

@Component({
    selector: 'app-paymentproductdetail',
    templateUrl: './paymentproductdetail.component.html',
    styleUrls: ['./paymentproductdetail.component.scss',
        '../paymentpage/paymentpage.component.scss'
    ]
})
export class PaymentproductdetailComponent implements OnInit {
    transTyp: string;
    transId;
    totalPay: any;
    Corsid = "";
    walletAmount: number = 0;
    discountedPrice: number;
    couponCode: string;
    couponAppliedCost: string;
    courseName: string;
    paidOnTime: string;
    courseCoverPath: string;
    promocodeflag: boolean = true;
    config: any;
    success: boolean;
    pageTitle: string;
    transactionId: any;
    paymentMethod: any;
    paidOnDate: any;
    ifCouponExists: boolean;
    purchaseDetail = [];
    couponDesc: string = '';
    returntoCourse = "";
    statusPayment: number = 6; //if statusPayment == 0 then in progress payment if statusPayment ==1  then success else failed

    // wallet:boolean=true;
    @Input() childmessage: boolean;
    // @Output() check = new EventEmitter<boolean>();
    //    walletAmt(){
    //      this.check.emit(false);
    //    }
    constructor(
        public _router: Router,
        private _constantService: ConstantService,
        private _encrypt: EncryptionService,
        private componentFactoryResolver: ComponentFactoryResolver,
        public _encryptionService: EncryptionService,
        private activatedRoute: ActivatedRoute,
        private postData: PostdataService,
        private platformlocation: PlatformLocation
    ) {}

    fun() {
        history.pushState(null, null, location.href);
        window.addEventListener('popstate', function (event) {
            history.pushState(null, null, location.href);
        });
    }

    ngOnInit() {

        this.activatedRoute.params.subscribe((params: Params) => {

            if (params['id'] != undefined && params['id'] != null) {
                this.Corsid = params['id'];
            }
            var url = this._router.url.split('/');
            if (url[2] == "status") {
                this.fun();

            }
        });
        // var trnsID = this.Corsid.split('study');
        // this.transId=trnsID[0];
        // this.transTyp=trnsID[1];

        //        this.success = true;
        //        this.pageTitle = "Made Easy Publication";
        //        this.transactionId = "1234567890";
        //        this.paymentMethod = "PAYUMoney";
        //        this.paidOnDate = "4/12/2018";
        //        this.paidOnTime = "4:23 PM";
        //        this.courseCoverPath = "./assets/images/course_cover_pic_example.jpg";
        //        this.courseName = "Introduction to Chemistry : Reactions and Ration";
        //        this.couponCode = "GET 10";
        //        this.ifCouponExists = true;
        //        this.price = 2500;
        //        this.walletAmount = 500;


        this.getPurchasedCourseDetail();

    }
    promocodefun() {
        this.promocodeflag = false;
    }

    getPurchasedCourseDetail() {
        var puchaseDetail = {};
        puchaseDetail['token'] = this._constantService.getSessionDataBYKey('token');
        puchaseDetail['token_param'] = {};
        puchaseDetail['token_param']['device_type'] = 'w';
        puchaseDetail['token_param']['host'] = '';
        puchaseDetail['t_id'] = this.Corsid;
        // puchaseDetail['type'] = this.transTyp;

        this._constantService.fetchDataApi(this._constantService.getPurchasedCourseDetail(), puchaseDetail).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                this.success = true;
                this.statusPayment = responseData.COURSE_DETAIL.STATUS;
                this.purchaseDetail = responseData.COURSE_DETAIL;
                //                 (this.purchaseDetail['DISCOUNT_COUPON']) {
                //                this.ifCouponExists = true;
                //this.couponCode = this.purchaseDetail['DISCOUNT_COUPON'];
                this.couponDesc = this.postData.decodeURIPostData(this.purchaseDetail['COUPON_DESCRIPTION']);
                this.pageTitle = this.postData.decodeURIPostData(this.purchaseDetail['PAGE_TITLE']);
                this.transactionId = this.purchaseDetail['TRANSACTION_UUID'];
                this.paymentMethod = this.purchaseDetail['PAY_TYPE'];
                this.paidOnDate = this.purchaseDetail['UPDATE_DATE_TIME'];
                if (this.purchaseDetail['COVER_TYPE'] == "0") {
                    this.courseCoverPath = this.purchaseDetail['COVER_PHOTO_PATH'] + 'cover/' + this.purchaseDetail['COURSE_UUID'] + '_1235x330.png';
                } else {
                    this.courseCoverPath = this.purchaseDetail['COVER_PHOTO_PATH'];
                }
                this.courseName = this.postData.decodeURIPostData(this.purchaseDetail['COURSE_TITLE']);
                this.couponCode = this.purchaseDetail['PROMO_CODE'];
                this.couponAppliedCost = this.purchaseDetail['COUPON_COST'];

                if (this.couponCode != "" && this.couponCode != null) {
                    this.ifCouponExists = true;
                } else {
                    this.ifCouponExists = false;

                }

                this.discountedPrice = this.purchaseDetail['DISCOUNT_COST'];
                if (this.purchaseDetail['WALLET_COST']) {
                    this.walletAmount = this.purchaseDetail['WALLET_COST'];
                }
                this.totalPay = this.purchaseDetail['OTHER_COST'] == null ? 0 : this.purchaseDetail['OTHER_COST'];
                this.returntoCourse = '/course/' + this.purchaseDetail['COURSE_URL'];
                ///   } else {
                // this.ifCouponExists = false;
                //  }



            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    gotoCourse() {
        this._router.navigate([this.returntoCourse]);
    }
}
