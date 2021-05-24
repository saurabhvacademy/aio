import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
//import {ChartDataSets, ChartOptions} from 'chart.js';
//import {Color, Label} from 'ng2-charts';
import { Chart } from 'angular-highcharts';
import { Router } from '@angular/router';
import { ConstantService } from './../../services/constant.service';
import { EncryptionService } from './../../services/encryption.service';
import { PostdataService } from './../../services/postdata.service';
// import { DatepickerOptions } from 'ng2-datepicker';
// import * as enLocale from 'date-fns/locale/en';
// import * as frLocale from 'date-fns/locale/fr';


@Component({
    selector: 'app-analytics',
    host: {
        '(document:click)': 'handleClick($event)',
    },
    templateUrl: './analytics.component.html',
    styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
    @ViewChild('menuList', { read: ElementRef }) menuList: ElementRef;
    @ViewChild('menuListImg', { read: ElementRef }) menuListImg: ElementRef;
    startCount = 0;
    endCount = 0;
    isSortCost = false;
    view: any;
    isSortDate = false;
    shortInvoice: any;
    searchText = '';
    isRightBtnDisabled = false;
    isLeftBtnDisabled = false;
    paginationCount: any = 1;
    isTimeBound = false;
    widthset = false;
    @Input() pageUuid;
    dateRange = 'Date Range'
    isSearchActive = false;
    chartLabelsArr = [];
    chartDataArr: any = [0, 0, 0, 0];
    allEnrolledUser = [];
    isUserEnrolled = true;
    totalAmount: any = 0;
    totalEnroll: any = 0;
    soldCount: any = 0;
    selectedCourseId: any = '';
    selectedCourse = 'All Course';
    allCourseList = [];
    isCoursePresent = true;
    openConfirmation = false;
    dataConf = {};
    fromDate = new Date();
    toDate = new Date();
    date = new Date();
    daysSpan: number = 0;
    isShoeDateList = false;
    isShowCourseList = false;
    Price: number = 15000;
    toggleSort = true;
    showdropdown = false;
    searchonfocus = true;
    showListMenu: number;
    focussearchbtnhide = true;
    showInfoOf = '';
    public chart = new Chart({
        chart: {
            type: 'line'
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        series: [
            {
                name: 'Enrollments',
                data: this.chartDataArr
            }
        ]
    } as any);
    config: any;
    constructor(
        public _constantService: ConstantService,
        private _encryptData: EncryptionService,
        private _postdataService: PostdataService,
        private _router: Router,
    ) { }

    handleClick(event) {

    }


    ngOnInit() {
        if (!this.pageUuid) {
            this.pageUuid = this._constantService.getSessionDataBYKey('page_id_course');
        }
        this.getUserCourseListFxn();
        this.getCourseAnalyticsFxn();
    }

    showDatelist() {
        this.isShoeDateList = !this.isShoeDateList;
        this.isShowCourseList = false;
    }

    showCourselist() {
        this.isShowCourseList = !this.isShowCourseList;
        this.isShoeDateList = false;
    }

    chartHovered(event) {

    }

    chartClicked(event) {

    }

    setDatesFrmDays(key) {
        switch (key) {
            case 0: {
                this.daysSpan = 0;
                this.dateRange = 'Date Range';
                break;
            }
            case 1: {
                this.daysSpan = 7;
                this.dateRange = 'Past Week';
                break;
            }
            case 2: {
                this.daysSpan = this.date.getDate();
                this.dateRange = 'This Month';
                break;
            }
            case 3: {
                this.daysSpan = this.date.getDate() + 30;
                this.dateRange = 'Past Month';
                break;
            }
            case 4: {
                this.daysSpan = this.date.getDate() + 90;
                this.dateRange = 'Past 3 Months';
                break;
            }
        }
        this.isTimeBound = true;
        this.allEnrolledUser = [];
        this.getCourseAnalyticsFxn();
        this.isShoeDateList = !this.isShoeDateList;
    }

    courseSelectionHandler(index) {
        if (index > -1) {
            this.selectedCourse = this.allCourseList[index].TITLE;
            this.selectedCourseId = this.allCourseList[index].COURSE_UUID;
        } else {
            this.selectedCourse = 'All Course';
            this.selectedCourseId = '';
        }
        this.allEnrolledUser = [];
        this.getCourseAnalyticsFxn();
    }

    getUserCourseListFxn() {
        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";
        hitObj['pg_uuid'] = this.pageUuid;

        this._constantService.fetchDataApi(this._constantService.getUserCourseListServiceUrl(), hitObj).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                var courseList = responseData.COURSE_LIST;
                if (courseList.length == 0) {
                    this.isCoursePresent = false;
                } else {
                    for (var i = 0; i < courseList.length; i++) {
                        courseList[i].TITLE = this._postdataService.decodeURIPostData(courseList[i].TITLE);
                    }
                    this.allCourseList.push.apply(this.allCourseList, courseList);
                }
            } else if (status == this._constantService.error_token) {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = 'Session Expire';
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

    getCourseAnalyticsFxn() {
        this.allEnrolledUser = [];
        this.isLeftBtnDisabled = true;
        this.isRightBtnDisabled = true;
        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";
        hitObj['pg_uuid'] = this.pageUuid;
        hitObj['cors_uuid'] = this.selectedCourseId;
        if (this.fromDate.getTime() > this.toDate.getTime()) {
            this.dataConf['type'] = 2;
            this.dataConf['msg'] = "Error";
            this.dataConf['error_msg'] = 'Please enter acceptable date span.';
            this.openConfirmation = true;
            return false;
        } else if (this.fromDate.getTime() == this.toDate.getTime()) {
            hitObj['start_date'] = '';
            hitObj['end_date'] = '';
        } else {
            hitObj['start_date'] = this.fromDate.getDate() + '/' + (this.fromDate.getMonth() + 1) + '/' + this.fromDate.getFullYear();
            hitObj['end_date'] = this.toDate.getDate() + '/' + (this.toDate.getMonth() + 1) + '/' + this.toDate.getFullYear();
        }

        if (this.isTimeBound) {
            hitObj['days'] = this.daysSpan;
        } else {
            hitObj['days'] = 0;
        }
        this._constantService.fetchDataApi(this._constantService.getCourseAnalyticsServiceUrl(), hitObj).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.soldCount = responseData.SOLD;
                this.totalEnroll = responseData.TOTAL_ENROL;
                this.totalAmount = responseData.AMOUNT;


                var enrolledUser = responseData.ENROL_LIST;
                if (enrolledUser.length == 0) {
                    this.isUserEnrolled = false;
                } else {
                    if (enrolledUser.length == 20) {
                        this.isRightBtnDisabled = false;
                    }
                    this.startCount = ((this.paginationCount - 1) * 20 + 1);
                    this.endCount = ((this.paginationCount - 1) * 20 + enrolledUser.length);
                    for (var i = 0; i < enrolledUser.length; i++) {
                        enrolledUser[i].USER_FULL_NAME = this._postdataService.decodeURIPostData(enrolledUser[i].USER_FULL_NAME);
                        enrolledUser[i].TITLE = this._postdataService.decodeURIPostData(enrolledUser[i].TITLE);
                        this.shortInvoice = enrolledUser[i].HOVER_DATA;
                        if (!(Object.entries(this.shortInvoice).length === 0 && this.shortInvoice.constructor === Object)) {
                            enrolledUser[i]['IS_INVOICE'] = true;
                            if (!this.shortInvoice.COUPON_COST) {
                                enrolledUser[i].HOVER_DATA.COUPON_COST = 0;
                            }
                            if (!this.shortInvoice.WALLET_COST) {
                                enrolledUser[i].HOVER_DATA.WALLET_COST = 0;
                            }
                        } else {
                            enrolledUser[i]['IS_INVOICE'] = false;
                        }
                    }
                    this.allEnrolledUser.push.apply(this.allEnrolledUser, enrolledUser);
                }
                var graphData = responseData.GRAPH_DATA;
                this.chartLabelsArr = [];
                this.chartDataArr = [];

                if (graphData.length != 0) {
                    graphData.forEach(data => {
                        var pointData = [];
                        pointData.push(data.DATES);
                        pointData.push(data.COUNT);
                        this.chartLabelsArr.push(data.DATES);
                        this.chartDataArr.push(pointData);
                    });
                    this.chart.ref.series[0].setData(this.chartDataArr);
                    this.chart.ref.xAxis[0].update({ categories: this.chartLabelsArr }, true);
                } else {
                    this.chart.ref.series[0].setData([]);
                    this.chart.ref.xAxis[0].update({ categories: [] }, true);
                }

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

    getEnrolledUserContactDetails(user, i) {
        var reqData = 
        { 
        token: this._constantService.getSessionDataBYKey('token'), 
        token_param: 
        { 
            device_type: 'w',
            host: '' 
        },

         cors_uuid: user.COURSE_UUID, 
         user_uuid: user.USER_UUID, 
         pg_uuid: this.pageUuid
         };

          if (this.allEnrolledUser[i].contactDetails) 
          { return false;
         }
           this._constantService.fetchDataApi(this._constantService.getEnrolledUserContactDetailsApiUrl(), reqData).subscribe(data => {

            var responseData: any = data; this.allEnrolledUser[i].contactDetails = { email: responseData.EMAIL, mobile: responseData.MOBILE, USER_NAME: user.USER_NAME };
           
        })
    }

    getCourseAnalyticsFlowFxn(typ) {
        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";
        hitObj['pg_uuid'] = this.pageUuid;
        hitObj['cors_uuid'] = this.selectedCourseId;
        if (this.isSortDate) {
            hitObj['d_srt'] = 'desc';
        } else {
            hitObj['d_srt'] = '';
        }

        if (this.isSortCost) {
            hitObj['c_srt'] = 'desc';
        } else {
            hitObj['c_srt'] = '';
        }

        hitObj['search_text'] = this.searchText;

        if (typ == 0) {
            this.paginationCount--;
            hitObj['count'] = this.paginationCount;
        } else if (typ == 1) {
            this.paginationCount++;
            hitObj['count'] = this.paginationCount;
        } else if (typ == 2) {
            this.paginationCount = 1;
            hitObj['count'] = this.paginationCount;
        }

        if (this.paginationCount == 1) {
            this.isLeftBtnDisabled = true;
        } else {
            this.isLeftBtnDisabled = false;
        }

        if (this.fromDate.getTime() > this.toDate.getTime()) {
            this.dataConf['type'] = 2;
            this.dataConf['msg'] = "Error";
            this.dataConf['error_msg'] = 'Please enter acceptable date span.';
            this.openConfirmation = true;
            return false;
        } else if (this.fromDate.getTime() == this.toDate.getTime()) {
            hitObj['start_date'] = '';
            hitObj['end_date'] = '';
        } else {
            hitObj['start_date'] = this.fromDate.getDate() + '/' + (this.fromDate.getMonth() + 1) + '/' + this.fromDate.getFullYear();
            hitObj['end_date'] = this.toDate.getDate() + '/' + (this.toDate.getMonth() + 1) + '/' + this.toDate.getFullYear();
        }

        if (this.isTimeBound) {
            hitObj['days'] = this.daysSpan;
        } else {
            hitObj['days'] = 0;
        }

        this._constantService.fetchDataApi(this._constantService.getCourseAnalyticsFlwServiceUrl(), hitObj).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {

                var enrolledUser = responseData.ENROL_LIST;
                if (enrolledUser.length == 0) {
                    this.isUserEnrolled = false;
                } else {
                    this.allEnrolledUser = [];
                    if (enrolledUser.length < 20) {
                        this.isRightBtnDisabled = true;
                        if (this.paginationCount == 1) {
                            this.isLeftBtnDisabled = true;
                        } else {
                            this.isLeftBtnDisabled = false;
                        }
                    } else {
                        this.isRightBtnDisabled = false;
                    }
                    this.startCount = ((this.paginationCount - 1) * 20 + 1);
                    this.endCount = ((this.paginationCount - 1) * 20 + enrolledUser.length);
                    for (var i = 0; i < enrolledUser.length; i++) {
                        enrolledUser[i].USER_FULL_NAME = this._postdataService.decodeURIPostData(enrolledUser[i].USER_FULL_NAME);
                        enrolledUser[i].TITLE = this._postdataService.decodeURIPostData(enrolledUser[i].TITLE);
                        this.shortInvoice = enrolledUser[i].HOVER_DATA;
                        if (!(Object.entries(this.shortInvoice).length === 0 && this.shortInvoice.constructor === Object)) {
                            enrolledUser[i]['IS_INVOICE'] = true;
                            if (!this.shortInvoice.COUPON_COST) {
                                enrolledUser[i].HOVER_DATA.COUPON_COST = 0;
                            }
                            if (!this.shortInvoice.WALLET_COST) {
                                enrolledUser[i].HOVER_DATA.WALLET_COST = 0;
                            }
                        } else {
                            enrolledUser[i]['IS_INVOICE'] = false;
                        }
                    }
                    this.allEnrolledUser.push.apply(this.allEnrolledUser, enrolledUser);
                }

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

    allEnrolledUserFxn() {
        return this.allEnrolledUser;
    }

    contentSearchStatusFxn(typ) {
        if (typ == 1) {
            this.isSearchActive = true;
        } else {
            this.isSearchActive = false;
        }
    }

    filterCourseData() {
        // console.log(this.allEnrolledUser);
        if ((<HTMLInputElement>document.getElementById('searchContent')).value != "") {
            return this.allEnrolledUser.filter((data) => (data.TITLE.toString().toLowerCase().includes((<HTMLInputElement>document.getElementById('searchContent')).value.toLowerCase())) || (data.USER_FULL_NAME.toString().toLowerCase().includes((<HTMLInputElement>document.getElementById('searchContent')).value.toLowerCase())));
        } else {
            return this.allEnrolledUser;
        }
    }

    resetTimeSpanFxn() {
        this.daysSpan = 0;
        this.toDate = new Date();
        this.fromDate = new Date();
        this.isTimeBound = false;
        this.allEnrolledUser = [];
        this.dateRange = 'Date Range';
        this.getCourseAnalyticsFxn();
        this.isShoeDateList = !this.isShoeDateList;
    }

    sortDate() {
        this.toggleSort = !this.toggleSort;
        if (!this.toggleSort) {
            this.allEnrolledUser.sort(function (a, b) {
                var c = new Date(a.date);
                var d = new Date(a.date);
                return c.getTime() - d.getTime();

            });
            return this.allEnrolledUser;
        } else {
            this.allEnrolledUserFxn();
        }
    }

    optiondown() {
        this.showdropdown = !this.showdropdown;
    }

    focusOutFunction() {
        setTimeout(() => {
            this.searchonfocus = true;
        }, 300)
        this.widthset = false;
        // this.searchonfocus = true;
        this.focussearchbtnhide = true;
    }

    btnwidth() {

        if (this.searchonfocus) {
            setTimeout(() => {
                this.searchonfocus = !this.searchonfocus;
                this.widthset = !this.widthset;

            }, 300)
        } else {
            if (this.searchText != '') {
                return false;
            } else {
                this.paginationCount = 0;
                this.getCourseAnalyticsFlowFxn(1);
            }
            this.widthset = !this.widthset;
            setTimeout(() => {
                this.searchonfocus = !this.searchonfocus;
            }, 300)
        }
    }

    focusInFunction() {
        this.focussearchbtnhide = false;
    }

    hideList() {
        this.showListMenu = -1;
    }

    showMenu(index) {
        this.showListMenu = index;
    }

    // date: Date;
    // options: DatepickerOptions = {
    //     minYear: 2018,
    //     locale: enLocale,
    //     maxDate: new Date(Date.now()),
    //     displayFormat: 'DD/MM/YYYY',
    // };

    closePopup(event) {
        if (event['error'] == false) {
            this.openConfirmation = false;
        }
    }

    sortingHandler(typ) {
        if (typ == 1) {
            this.isSortDate = !this.isSortDate;
            if (this.isSortDate) {
                this.isSortCost = false;
            }
        } else if (typ == 2) {
            this.isSortCost = !this.isSortCost;
            if (this.isSortCost) {
                this.isSortDate = false;
            }
        }
        this.getCourseAnalyticsFlowFxn(2);
    }

    dateChangeHandler() {
        this.getCourseAnalyticsFxn();
        this.isShoeDateList = !this.isShoeDateList;
    }

    searchHandler(e) {
        if (e.keyCode == 13) {
            this.getCourseAnalyticsFlowFxn(2);
        }
    }
}
