import {Component, ViewChild, OnInit, Output, HostListener} from '@angular/core';
import {PostdataService} from './../../services/postdata.service';
import {ConstantService} from './../../services/constant.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {EncryptionService} from './../../services/encryption.service';
import {Location} from '@angular/common';
@Component({
    selector: 'app-wallet',
    templateUrl: './wallet.component.html',
    styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

    constructor(
        public postdata: PostdataService,
        public _constantService: ConstantService,
        public _encrypt: EncryptionService,
        public router: Router,
        private activatedRoute: ActivatedRoute,
        private location: Location,
    ) {}

    paymentTab = 1;
    walletBalance = 0;
    flowCount = 1;
    selecteddays = 0;
    continueScroll = false;
    TransactionData = [];
    walletStatus = '';
    showFilter: boolean = false;
    showPreloader: boolean = false;
    ngOnInit() {
        this.getWalletData();
        this.checkScreenWidth();
        this.activatedRoute.params.subscribe((params: Params) => {
            if (params['id'] != undefined && params['id'] != null) {
                if (params['id'] == "") {
                    this.paymentTabClick(1);
                } else if (params['id'] == "purchasehistory") {
                    this.paymentTabClick(2);
                }
            }
        });
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        var innerWindWidth = window.innerWidth - 18;
        if (window.innerWidth >= 1200) {
            event.target.innerWidth;

            document.getElementById("windiv").style.width = innerWindWidth + "px";
        } else {
            document.getElementById("windiv").style.width = "100%";
        }
    }

    private checkScreenWidth() {
        var winwidth = window.innerWidth - 18;
        if (window.innerWidth >= 1200) {

            document.getElementById("windiv").style.width = winwidth + "px";
        } else {
            document.getElementById("windiv").style.width = "100%";
        }
    }

    paymentTabClick(index) {
        this.TransactionData = [];
        this.paymentTab = index;
        if (this.paymentTab == 1) {
            this.location.go('/wallet');
            this.getWalletData();
        } else if (this.paymentTab == 2) {
            this.location.go('/wallet/purchasehistory');
            this.TransactionData.length = 0;
            this.flowCount = 1;
            this.selecteddays = 0;
            this.getWalletTransactionData();
        }
    }

    setFilter(value) {

        if (value == 1) {
            this.selecteddays = 7;
        } else if (value == 2) {
            this.selecteddays = 30;
        } if (value == 0) {
            this.selecteddays = 0;
        }

        this.TransactionData.length = 0;
        this.flowCount = 1;

        this.getWalletTransactionData();

    }

    getWalletData() {
        var walletData = {};
        walletData['token'] = this._constantService.getSessionDataBYKey('token');
        walletData['token_param'] = {};
        walletData['token_param']['device_type'] = 'w';
        walletData['token_param']['host'] = '';



        this._constantService.fetchDataApi(this._constantService.getWalletDataServiceUrl(),walletData).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.walletBalance = responseData.WALLET_AMOUNT;
                // this.isEnrolled=  true;
            } else {
                // this.dataConf['type'] = 2;
                // this.dataConf['msg'] = "STUDY24X7";
                // this.dataConf['error_msg'] = responseData.ERROR_MSG;
                // this.openConfirmation = true;
            }
        }
        );

    }

    onScrollDownTransaction() {
        // console.log("scrolled", this.flowCount,this.continueScroll)
        if (this.continueScroll) {
            this.flowCount++;
            this.getWalletTransactionData();

        }
    }

    getWalletTransactionData() {
        this.showPreloader = true;
        var walletTransactionData = {};
        walletTransactionData['token'] = this._constantService.getSessionDataBYKey('token');
        walletTransactionData['token_param'] = {};
        walletTransactionData['token_param']['device_type'] = 'w';
        walletTransactionData['token_param']['host'] = '';
        walletTransactionData['count'] = this.flowCount;
        walletTransactionData['days'] = this.selecteddays;
        walletTransactionData['r_count'] = '';



        this._constantService.fetchDataApi(this._constantService.getPurchaseHistDataServiceUrl(),walletTransactionData).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.showPreloader = false;

                var date = new Date();
                var purchasedHistory = responseData.PURCHASED_HISTORY;
                if (responseData.PURCHASED_HISTORY.length == 20) {
                    this.continueScroll = true;

                } else {
                    this.continueScroll = false;

                }
                // purchasedHistory = purchasedHistory.reverse();
                for (var i = 0; i < purchasedHistory.length; i++) {
                    if (purchasedHistory[i].COVER_TYPE == 0) {
                        purchasedHistory[i].COVER_PHOTO_PATH = purchasedHistory[i].COVER_PHOTO_PATH + 'cover/' + purchasedHistory[i].COURSE_UUID + "_1235x330.png?v=" + responseData.IMG_UPD_DT;
                    }
                    purchasedHistory[i].TITLE = this.postdata.decodeURIPostData(purchasedHistory[i].TITLE);
                }
                this.TransactionData.push.apply(this.TransactionData, purchasedHistory);
            }
        });

    }

    showFilterList() {

        this.showFilter = !this.showFilter;
    }

}
