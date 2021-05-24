import { Component, OnInit, ViewChild, ViewContainerRef, Input, ComponentFactoryResolver, Output, EventEmitter, HostListener, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantService } from './../../../services/constant.service';
import { EncryptionService } from './../../../services/encryption.service';
import { PostdataService } from './../../../services/postdata.service';
import { InternalMessageService } from './../../../services/internal-message.service';

@Component({
    selector: 'app-yourinterestwidget',
    templateUrl: './yourinterestwidget.component.html',
    styleUrls: ['./yourinterestwidget.component.scss']
})
export class YourinterestwidgetComponent implements OnInit {
    user_interest: any;
    oldTab = '';
    interestArr = [];
    userInterest = [];
    interests: any;
    questionCount: any;
    @Input() activeTab;
    @Output() objectEmitter = new EventEmitter<Object>();
    openConfirmation: boolean = false;
    dataConf = {};
    objectKeys = Object.keys;
    config;
    interestsCheckedStatus = {};

    constructor(
        public _constantService: ConstantService,
        private _encryptData: EncryptionService,
        private _postdataService: PostdataService,
        private _router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        private _message: InternalMessageService,
        private changeDetector: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.interests = JSON.parse(this._constantService.getSessionDataBYKey('interests'));
        var userInterest = this._constantService.getSessionDataBYKey('user_interest_id');
        this.userInterest = userInterest.split(',');
        this.userInterest.forEach(element => {
            this.interestsCheckedStatus[element] = false;
        });
        this.getUserIntFxn();
        // this.getUserAnalyticsByInterest();
        this._message.getCommand().subscribe(data => {
            if (data) {
                if (data.type == 0 && data.command == 'desc') {
                    if (this.questionCount > 0) {
                        this.questionCount--;
                    }
                } else if (data.type == 1 && this.activeTab == 0) {
                    if (this.questionCount > 0) {
                        this.questionCount--;
                    }
                }
            }
        });
    }

    ngDoCheck() {
        if (this.activeTab != this.oldTab) {
            this.oldTab = this.activeTab;
            this.changeDetector.detectChanges();

            // setTimeout(() => {
            for (var i = 0; i < this.userInterest.length; i++) {
                this.interestsCheckedStatus[this.interestArr[i]] = false;
                // var interestCapsule = (<HTMLInputElement>document.getElementById('id_' + this.userInterest[i]));
                // if (interestCapsule) {
                //     interestCapsule.checked = false;
                // }
            }
            // }, 0);

            this.getUserAnalyticsByInterest();
        }
    }

    checkboxupdate(id, event) {
        if (event.target.checked) {
            this.interestArr.push(id);
            this.interestsCheckedStatus[id] = true;
        } else if (!event.target.checked) {
            var index = this.interestArr.indexOf(id);
            this.interestArr.splice(index, 1);
            this.interestsCheckedStatus[id] = false;
        }
        var index = this.interestArr.indexOf("");
        if (index > -1) {
            this.interestArr.splice(index, 1);
        }
        this.changeDetector.detectChanges();

        //        this.usrSelectedInterest.emit(this.interestArr);
        this.updateUserInterestForAnalytics();

    }



    userIntesrestFxn(interest) {
        if (this.userInterest.includes(interest)) {
            return true;
        } else {
            return false;
        }
    }

    getUserIntFxn() {
        var hitObj = {};
        hitObj['token'] = this._constantService.getToken();
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";


        this._constantService.fetchDataApi(this._constantService.getUserInterestServiceUrl(), hitObj).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.user_interest = responseData.INTEREST_ID;
                this.user_interest.forEach(obj => {
                    this.userInterest.push(obj.INTEREST_ID);
                });
                //                setTimeout(() => {
                //                    for (var i = 0; i < this.user_interest.length; i++) {
                //                        document.getElementById(this.user_interest[i].INTEREST_ID).setAttribute("checked", "checked");
                //                        this.interestArr.push(String(this.user_interest[i].INTEREST_ID));
                //                    }
                //                }, 200);
                this._constantService.setToken(responseData.TOKEN);
            } else if (status == this._constantService.error_token) {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired!";
                this.openConfirmation = true;
                return false;
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "Error";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
                return false;
            }
        }), error => {
            var err = error;
            if (err.status == 500) {
                this._router.navigate(['500']);
            }
        };
    }

    getUserAnalyticsByInterest() {
        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";
        hitObj['type'] = this.activeTab;

        this._constantService.fetchDataApi(this._constantService.getUserAnalyticsByIntrstServiceUrl(), hitObj).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                if (responseData.INTEREST_ID) {
                    this.interestArr = responseData.INTEREST_ID.split(',');
                } else {
                    this.interestArr = [];
                }
                // setTimeout(() => {
                for (var i = 0; i < this.interestArr.length; i++) {
                    this.interestsCheckedStatus[this.interestArr[i]] = true;
                    // var capsule = (<HTMLInputElement>document.getElementngById('id_' + this.interestArr[i]));
                    // if (capsule) {
                    //     capsule.checked = true;
                    // }
                }
                // }, 300);
                //                var questionCount = parseInt(responseData.COUNT);
                //                this.questionCount = new Intl.NumberFormat('en-IN', {maximumSignificantDigits: 3}).format(questionCount);
                this.questionCount = parseInt(responseData.COUNT);
                this.objectEmitter.emit({ 'COUNT': this.questionCount, 'INTEREST': this.interestArr });
                this.changeDetector.detectChanges();
            } else if (status == this._constantService.error_token) {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired!";
                this.openConfirmation = true;
                return false;
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "Error";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
                return false;
            }
        }), error => {
            var err = error;
            if (err.status == 500) {
                this._router.navigate(['500']);
            }
        };
    }

    updateUserInterestForAnalytics() {
        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";
        hitObj['type'] = this.activeTab;
        hitObj['interest_id'] = this.interestArr.join();


        this._constantService.fetchDataApi(this._constantService.updateUserInterest4AnalyticsServiceUrl(), hitObj).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.getUserAnalyticsByInterest();
            } else if (status == this._constantService.error_token) {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired!";
                this.openConfirmation = true;
                return false;
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "Error";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
                return false;
            }
        }), error => {
            var err = error;
            if (err.status == 500) {
                this._router.navigate(['500']);
            }
        };
    }


}
