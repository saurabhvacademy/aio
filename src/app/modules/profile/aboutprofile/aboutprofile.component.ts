import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ConstantService } from './../../../services/constant.service';
import { PostdataService } from './../../../services/postdata.service';
import { EncryptionService } from './../../../services/encryption.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { json } from 'express';

@Component({
    selector: 'app-aboutprofile',
    templateUrl: './aboutprofile.component.html',
    styleUrls: ['./aboutprofile.component.scss'],
    host: { "(document:click)": "hidePopup($event)" },
    providers: [ConstantService, EncryptionService, PostdataService]
})
export class AboutprofileComponent implements OnInit {
    default: boolean;
    updateProfile: void;
    ToYears: HTMLSelectElement;
    EduYears = [];
    ExpPresentselected: boolean = false;
    Presentselected: boolean = false;
    dataConf = {};
    openConfirmation: boolean = false;
    @Input() summary: string;
    @Input() EmptySumm: boolean;
    @Output() sessionLogout = new EventEmitter<boolean>();
    @Output() summaryUpdated = new EventEmitter<string>();
    @Output() aboutUpdate = new EventEmitter();
    @ViewChild('institute', { read: ElementRef }) institute: ElementRef;
    @ViewChild('course', { read: ElementRef }) course: ElementRef;
    @ViewChild('organization', { read: ElementRef }) organization: ElementRef;
    @ViewChild('position', { read: ElementRef }) position: ElementRef;
    showText: boolean = true;
    showPreloader: boolean = false;
    summaryCount = 0;
    eduSummary = "";
    expSummary = "";
    courseOthers = "";
    editSummary: boolean = true;
    eduDetailsView = 1;
    expDetailsView = 1;
    instituteOthers = "";
    positionOthers = "";
    organizationOthers = "";
    Summaryshow = false;
    educationedit = false;
    educationAdd: boolean = false;
    educationEditBox = true;
    experienceshow = false;
    experienceAdd: boolean = false;
    experienceEditShow = true;
    updateSummary = true;
    inputInstitute = 1;
    inputCourse = 1;
    inputPosition = 1;
    inputOrganization = 1;
    userId;
    profileId;
    summaryDivShow = 1;
    register_re = "";
    years = [];
    ExpYears = [];
    myprofile = 1;
    instituteItem;
    eduId = 0;
    expId = 0;
    organizationArr = [];
    instituteArr = [];
    positionArr = [];
    courseArr = [];
    experience = [];
    education = [];
    infoPopupStatus: any = '';
    infoPopupShowStatus = false;
    secName: string = '';
    eduEditIndex: any;
    expEditIndex: any;
    addEduStatus = false;
    addExpStatus = false;
    userSummary: string = "";
    showglow: boolean = false;
    exp_popup: boolean = false;
    edu_popup: boolean = false;
    summary_popup: boolean = false;
    instituteName = "";
    courseName = "";
    positionName = "";
    organisationName = "";
    searchList: boolean = false;
    searchListCou: boolean = false;
    searchListOrg: boolean = false;
    searchListPos: boolean = false;
    searchedInsArr = [];
    searchedCouArr = [];
    searchedPosArr = [];
    searchedOrgArr = [];
    instituteId = 0;
    courseId = 0;
    organizationId = 0;
    positionId = 0;
    error = "";
    showErrorInsOrg: boolean = false;
    showErrorCouPos: boolean = false;
    showErrorDate: boolean = false;
    showErrorSumm: boolean = false;
    continueScroll: boolean = false;
    summaryBtn: boolean = false;
    timer;
    count = 1;
    activeDoCheck: boolean = false;
    oldId: string = '';
    summaryClearButton: boolean;
    mobileNumber: any;
    emailId: any;
    dateOdBirth: any;
    gender: any;
    interestsList = {};
    manageEditInfoPopup(i, clickSecName) {
        this.infoPopupStatus = i;
        this.infoPopupShowStatus = !this.infoPopupShowStatus;
        this.secName = clickSecName;
    }
    constructor(
        public _constantService: ConstantService,
        private _encryptionService: EncryptionService,
        private _router: Router,
        private activatedRoute: ActivatedRoute,
        private postData: PostdataService
    ) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            console.log("data ::", params);
            if (params['id'] != null) {
                if (params['id'].slice(0, 1) != "#") {
                    this.userId = params['id'];
                    this.activeDoCheck = true;

                }
            }
        });

        if (this.summary == "") {
            this.EmptySumm = true;
            this.editSummary = false;
        } else {
            this.EmptySumm = false;
            this.editSummary = true;
        }
        this.myprofile = this._constantService.getSessionDataBYKey('my_profile');
        console.log(" this.myprofile", this.myprofile);
        if (this._constantService.getSessionDataBYKey('my_profile') == '0') {
            this.myprofile = 2;
        }
        if (this._constantService.getSessionDataBYKey('my_profile') == '2') {
            this.myprofile = 1;
        }
        var max = new Date().getFullYear();
        this.getYears();
        this.mobileNumber = this._constantService.getSessionDataBYKey('mobile');
        this.emailId = this._constantService.getSessionDataBYKey('em');
        this.dateOdBirth = this._constantService.getSessionDataBYKey('dob');
        this.gender = this._constantService.getSessionDataBYKey('gender');
        var interest = JSON.parse(this._constantService.getSessionDataBYKey('interests'));
        var userInterestIds = this._constantService.getSessionDataBYKey('user_interest_id');
        var interestIdsArray = userInterestIds.split(',');

        for (var i = 0; i < interestIdsArray.length; i++) {
            this.interestsList[interestIdsArray[i]]=interest[interestIdsArray[i]];
        }
    }

    ngDoCheck() {

        if (this.summary == null || this.summary == "") {
            this.summaryDivShow = 2;
            this.EmptySumm = true;
            this.editSummary = false;
        } else {
            this.summaryDivShow = 1;
            //  this.summary = this.summary.replace(/  /g, " &#160;");
            this.EmptySumm = false;
            this.editSummary = true;
        }

        // if (this.activeDoCheck) {
        //     this.activatedRoute.params.subscribe((params: Params) => {
        //         if (params['id'] != null) {
        //             if (this.oldId == '') {
        //                 this.oldId = params['id'];
        //             } else if (params['id'] != this.oldId) {
        //                 this.oldId = params['id'];
        //                 window.location.reload();
        //             }
        //         }
        //     });
        // }
    }

    ngAfterViewInit() {

        if (this.userId == null) {
            this.getYears();
            this.getList();
        }

        this.getUserExperienceDetails(this.userId);
        this.getUserEducationDetails(this.userId);
    }

    educationAddBox() {
        this.eduDetailsView = 1;
        this.eduSummary = ' ';
        this.inputInstitute = null;
        this.addEduStatus = true;
        this.educationAdd = true;
    }

    experienceAddBox() {
        this.expDetailsView = 1;
        this.addExpStatus = true;
        this.experienceAdd = true;
        this.expSummary = '';
    }

    summaryDiv(id) {
        if (id == 1) {
            this.summaryDivShow = 0;
            this.userSummary = this.userSummary.replace(/&lt;/g, "<");
            this.userSummary = this.userSummary.replace(/&gt;/g, ">");
            this.userSummary = this.summary.replace(/<br>/g, "\n").replace(/  /g, "&#160;");
        }
        if (id == 2) {
            if (this.summary == '') {
                this.summaryDivShow = 2;
            } else {
                this.summaryDivShow = 1;
            }
        }
        this.editSummary = !this.editSummary;
        this.updateSummary = !this.updateSummary;
        this.Summaryshow = !this.Summaryshow;
        this.summary = this.postData.decodeURIPostData(this.userSummary).trim();


    }

    checkempty() {
        console.log("aaaaaaaaaaa")
        var textarea = <HTMLInputElement>document.getElementById("aboutarea");
        if (textarea.value.length >= 0) {
            console.log("aaaaaaaa");
        } else {
            console.log("bbbbbb");
        }
    }

    submitSummary() {
        this.showPreloader = true;
        this.showText = false;
        var user_summary = {};
        user_summary['token'] = this._constantService.getSessionDataBYKey('token');
        this.userSummary = this.userSummary.replace(/</g, "&lt;");
        this.userSummary = this.userSummary.replace(/>/g, "&gt;");

        user_summary['summ'] = this.postData.encodeURIPostData(this.userSummary).replace(/\%3C(?!span|br|a|href="([^"]*)"|\/span|\/br|\/a).*?\%3E/g, "").trim();
        user_summary['token_param'] = {};
        user_summary['token_param']['device_type'] = 'w';
        user_summary['token_param']['host'] = '';

        this._constantService.fetchDataApi(this._constantService.getUserSummaryUpdateServiceUrl(), user_summary).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.showPreloader = false;
                this.showText = true;
                this._constantService.setSummary(this.postData.decodeURIPostData(this.summary));
                //this._constantService.setToken(responseData.TOKEN);
                this.updateSummary = true;
                this.Summaryshow = false;
                this.summaryDivShow = 1;

                //       summaryDivShow
                this.editSummary = true;
                this.EmptySumm = false;
                this.summary = this.postData.decodeURIPostData(this.userSummary);
                if (this.summary == "") {
                    this.summaryDivShow = 2;
                    this.EmptySumm = true;
                    this.editSummary = false;
                    this.updateSummary = false;
                }
                this.hide_popus();
                this.summaryUpdated.emit(this.summary);
            } else if (status == this._constantService.error_token) {
                this.showPreloader = false;
                this.showText = true;
                this.sessionLogout.emit(true);
            } else {
                this.showPreloader = false;
                this.showText = true;
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
    emptySubmitSummary() {
        this.userSummary = '';
        this.summaryCount = 0;
        this.showPreloader = true;
        this.showText = false;
        var user_summary = {};
        user_summary['token'] = this._constantService.getSessionDataBYKey('token');
        this.userSummary = this.userSummary.replace(/</g, "&lt;");
        this.userSummary = this.userSummary.replace(/>/g, "&gt;");

        user_summary['summ'] = this.postData.encodeURIPostData(this.userSummary).replace(/\%3C(?!span|br|a|href="([^"]*)"|\/span|\/br|\/a).*?\%3E/g, "").trim();;
        user_summary['token_param'] = {};
        user_summary['token_param']['device_type'] = 'w';
        user_summary['token_param']['host'] = '';

        this._constantService.fetchDataApi(this._constantService.getUserSummaryUpdateServiceUrl(), user_summary).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this._constantService.showToast("User Summary updated successfully.", "", "1")
                this.showPreloader = false;
                this.showText = true;
                this._constantService.setSummary(this.postData.decodeURIPostData(this.summary));
                //this._constantService.setToken(responseData.TOKEN);
                this.summaryClearButton = false;
                this.updateSummary = true;
                this.Summaryshow = false;
                this.summaryDivShow = 1;

                //       summaryDivShow
                this.editSummary = true;
                this.EmptySumm = false;
                this.summary = this.postData.decodeURIPostData(this.userSummary);
                if (this.summary == "") {
                    this.summaryDivShow = 2;
                    this.EmptySumm = true;
                    this.editSummary = false;
                    this.updateSummary = false;
                }
                this.hide_popus();
                this.summaryUpdated.emit(this.summary);
            } else if (status == this._constantService.error_token) {
                this.showPreloader = false;
                this.showText = true;
                this.sessionLogout.emit(true);
            } else {
                this.showPreloader = false;
                this.showText = true;
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

    showexppopup() {
        this.showglow = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }
    hideexppopup() {
        this.showglow = false;
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }

    submitEducationDetails(id) {
        this.showPreloader = true;
        this.showText = false;
        var date = new Date();
        var toMon = (<HTMLSelectElement>document.getElementById('eduMon_to'));
        if (toMon.value != "00") {
            var toYr = (<HTMLSelectElement>document.getElementById('eduYr_to'));
        }
        var fromYr = (<HTMLSelectElement>document.getElementById('eduYr_from'));
        var fromMon = (<HTMLSelectElement>document.getElementById('eduMon_from'));
        this.ToYears = toYr;
        if (this.instituteName == "") {
            this.showErrorInsOrg = true;
            this.error = "Please enter a institute name.";
            return false;
        }
        if (this.courseName == "") {
            this.showErrorCouPos = true;
            this.error = "Please enter a course name.";
            return false;
        }
        if (fromMon.value == "default") {
            this.showErrorDate = true;
            this.error = "Please select a month.";
            return false;
        }
        if (toMon.value == "default") {
            this.showErrorDate = true;
            this.error = "Please select a month.";
            return false
        } else {
            if ((toMon.value) != "00") {
                if ((parseInt(toMon.value) > (date.getMonth() + 1)) && (parseInt(toYr.value) == date.getFullYear())) {
                    this.showErrorDate = true;
                    this.error = "End date can’t be past today’s date.";
                    return false;
                }
            }
        }
        if ((toMon.value) != "00") {
            if (parseInt(fromYr.value) > parseInt(toYr.value)) {
                this.showErrorDate = true;
                this.error = "Your end date can't be earlier than start date.";
                return false;
            } else {
                if (parseInt(fromYr.value) == parseInt(toYr.value)) {
                    if (parseInt(fromMon.value) > parseInt(toMon.value)) {
                        this.showErrorDate = true;
                        this.error = "End date can’t be past today’s date.";
                        return false;
                    }
                }
            }
        }
        var user_eduDetails = {};
        user_eduDetails['token_param'] = {};
        user_eduDetails['token_param']['device_type'] = 'w';
        user_eduDetails['token_param']['host'] = '';
        user_eduDetails['token'] = this._constantService.getSessionDataBYKey('token');
        this.eduSummary = this.eduSummary.replace(/</g, "&lt;");
        this.eduSummary = this.eduSummary.replace(/>/g, "&gt;");
        user_eduDetails['summ'] = this.postData.encodeURIPostData(this.eduSummary).replace(/&nbsp;/g, " ");
        if (toMon.value != "00") {
            user_eduDetails['to'] = toYr.value + "-" + toMon.value + "-" + "01";
        } else {
            user_eduDetails['to'] = "";
        }
        user_eduDetails['from'] = fromYr.value + "-" + fromMon.value + "-" + "01";
        user_eduDetails['eduid'] = id;
        if (this.instituteId == 0) {
            user_eduDetails['instid'] = '';
            user_eduDetails['inst'] = this.postData.encodeURIPostData(this.instituteName);
        } else {
            user_eduDetails['instid'] = this.instituteId;
            user_eduDetails['inst'] = '';
        }

        if (this.courseId == 0) {
            user_eduDetails['couid'] = '';
            user_eduDetails['cou'] = this.postData.encodeURIPostData(this.courseName);
        } else {
            user_eduDetails['couid'] = this.courseId;
            user_eduDetails['cou'] = '';
        }

        this._constantService.fetchDataApi(this._constantService.getUserEduUpadateServiceUrl(), user_eduDetails).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;

            if (status == this._constantService.success_msg) {
                this.showPreloader = false;
                this.showText = true;
                this.aboutUpdate.emit(true);
                this.getUserEducationDetails(this.userId);
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.eduSummary = "";
                this.instituteName = "";
                this.courseName = "";
                this.instituteId = 0;
                this.courseId = 0;
                this.hide_popus();
            } else if (status == this._constantService.error_token) {
                this.showPreloader = false;
                this.showText = true;
                this.sessionLogout.emit(true);
            } else {
                this.showPreloader = false;
                this.showText = true;
                this.showErrorDate = true;
                this.error = responseData.ERROR_MSG;
                // this.dataConf['type'] = 2;
                // this.dataConf['msg'] = "STUDY24X7";
                // this.dataConf['error_msg'] = responseData.ERROR_MSG;
                // this.openConfirmation = true;

            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });

    }
    closePopup(event) {
        if (event['error'] == false) {
            this.openConfirmation = false;
        }
    }

    submitExpDetails(id) {
        //        if (this.showPreloader) {
        //            return false;
        //        } else {
        //            this.showPreloader = true;
        //        }console.log("1");
        this.showText = false;
        var date = new Date();
        var user_expDetails = {};
        var toMon = (<HTMLSelectElement>document.getElementById('expMon_to'));
        if (toMon.value != "00") {
            var toYr = (<HTMLSelectElement>document.getElementById('expYr_to'));
        }
        var fromYr = (<HTMLSelectElement>document.getElementById('expYr_from'));
        var fromMon = (<HTMLSelectElement>document.getElementById('expMon_from'));
        if (this.organisationName == "") {
            this.showErrorInsOrg = true;
            this.error = "Please enter a organization name.";
            return false;
        }
        if (this.positionName == "") {
            this.showErrorCouPos = true;
            this.error = "Please enter a position name.";
            return false;
        }
        if (fromMon.value == "default") {
            this.showErrorDate = true;
            this.error = "Please select a month.";
            return false;
        }
        if (toMon.value == "default") {
            this.showErrorDate = true;
            this.error = "Please select a month.";
            return false
        } else {
            if (toMon.value != "00") {
                if ((parseInt(toMon.value) > (date.getMonth() + 1)) && (parseInt(toYr.value) == date.getFullYear())) {
                    this.showErrorDate = true;
                    this.error = "End date can’t be past today’s date.";
                    return false;
                }
            }
        }
        if (toMon.value != "00") {
            if (parseInt(fromYr.value) > parseInt(toYr.value)) {
                this.showErrorDate = true;
                this.error = "Your end date can't be earlier than start date.";
                return false;
            } else {
                if (parseInt(fromYr.value) == parseInt(toYr.value)) {
                    if (parseInt(fromMon.value) > parseInt(toMon.value)) {
                        this.showErrorDate = true;
                        this.error = "End date can’t be past today’s date.";
                        return false;
                    }
                }
            }
        }
        user_expDetails['token'] = this._constantService.getSessionDataBYKey('token');
        this.expSummary = this.expSummary.replace(/</g, "&lt;");
        this.expSummary = this.expSummary.replace(/>/g, "&gt;");
        user_expDetails['summ'] = this.postData.encodeURIPostData(this.expSummary).replace(/&nbsp;/g, " ").trim();
        if (toMon.value != "00") {
            user_expDetails['to'] = toYr.value + "-" + toMon.value + "-" + "01";
        } else {
            user_expDetails['to'] = "";
        }
        user_expDetails['from'] = fromYr.value + "-" + fromMon.value + "-" + "01";
        user_expDetails['expid'] = id;
        if (this.organizationId == 0) {
            user_expDetails['orgid'] = '';
            user_expDetails['org'] = this.organisationName;
        } else {
            user_expDetails['orgid'] = this.organizationId;
            user_expDetails['org'] = '';
        }

        if (this.positionId == 0) {
            user_expDetails['posid'] = '';
            user_expDetails['pos'] = this.positionName;
        } else {
            user_expDetails['posid'] = this.positionId;
            user_expDetails['pos'] = '';
        }
        user_expDetails['token_param'] = {};
        user_expDetails['token_param']['device_type'] = 'w';
        user_expDetails['token_param']['host'] = '';

        this._constantService.fetchDataApi(this._constantService.getUserExpUpadateServiceUrl(), user_expDetails).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;

            if (status == this._constantService.success_msg) {
                this.showPreloader = false;
                this.showText = true;
                this.aboutUpdate.emit(true);
                this.getUserExperienceDetails(this.userId);
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.positionName = '';
                this.organisationName = '';
                this.expSummary = '';
                this.organizationId = 0;
                this.positionId = 0;
                this.hide_popus();
            } else if (status == this._constantService.error_token) {
                this.showPreloader = false;
                this.showText = true;
                this.sessionLogout.emit(true);
            } else {
                this.showPreloader = false;
                this.showText = true;
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

    getList() {
        this._constantService.fetchDataApiWithoutBody(this._constantService.getPositionServiceUrl()).subscribe(data => {
            let responseData: any = data;
            var other = { "POSITION_ID": "others", "POSITION_NAME": "Others" };
            this.positionArr = responseData.POSIN_LIST;
            this.positionArr.push(other);
        });

        this._constantService.fetchDataApiWithoutBody(this._constantService.getCourseServiceUrl()).subscribe(data => {
            //this.register_re:any = data;
            let responseData: any = data;
            this.courseArr = responseData.COURS_LIST;
            var other = { "COURSE_ID": "others", "COURSE_NAME": "Others" };
            this.courseArr.push(other);
        });

        this._constantService.fetchDataApiWithoutBody(this._constantService.getInstitutionServiceUrl()).subscribe(data => {
            let responseData: any = data;
            this.instituteArr = responseData.INSTIT_LIST;
            var other = { "INSTITUTE_ID": "others", "INSTITUTE_NAME": "Others" };
            this.instituteArr.push(other);
        });

        this._constantService.fetchDataApiWithoutBody(this._constantService.getOrganizationServiceUrl()).subscribe(data => {
            let responseData: any = data;
            var other = { 'ORGANIZATION_ID': 'others', 'ORGANIZATION_NAME': 'Others' };
            this.organizationArr = responseData.ORG_LIST;
            this.organizationArr.push(other);
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    getUserEducationDetails(userId: string) {
        this.showPreloader = true;
        this.showText = false;
        var userEdu = {};
        userEdu['token'] = this._constantService.getSessionDataBYKey('token');
        userEdu['token_param'] = {};
        userEdu['token_param']['device_type'] = 'w';
        userEdu['token_param']['host'] = '';
        if (userId == null) {
            this.showPreloader = false;
            this.showText = true;
            userEdu['myprofile'] = 'yes';
            userEdu['username'] = '';
        } else {
            this.showPreloader = false;
            this.showText = true;
            var urlParam = userId.split("?");
            userEdu['myprofile'] = 'no';
            userEdu['username'] = urlParam[0];
        }

        this._constantService.fetchDataApi(this._constantService.getUserEduDetailsServiceUrl(), userEdu).subscribe(data => {
            // this.register_re = data["_body"];
            // let responseData = JSON.parse(this.register_re);
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.showPreloader = false;
                this.showText = true;
                if (responseData.USER_QUAL.length == 0) {
                    this.eduDetailsView = 2;
                    this.showPreloader = false;
                    this.showText = true;
                } else {
                    this.eduDetailsView = 1;
                    this.showPreloader = false;
                    this.showText = true;
                }
                this.education = responseData.USER_QUAL;
                for (var i = 0; i < this.education.length; i++) {
                    this.education[i].SUMMARY = this.postData.decodeURIPostData(this.education[i].SUMMARY);
                    if (this.education[i].TO == null) {
                        this.education[i].TO = "Present";
                    }
                    this.education[i].INSTITUTE = this.postData.decodeURIPostData(this.education[i].INSTITUTE);
                    this.education[i].COURSE = this.postData.decodeURIPostData(this.education[i].COURSE);

                }
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
            } else if (status == this._constantService.error_token) {
                this.showPreloader = false;
                this.showText = true;
                this.sessionLogout.emit(true);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    getUserExperienceDetails(userId: string) {
        this.showPreloader = true;
        this.showText = false;
        var userExp = {};
        userExp['token'] = this._constantService.getSessionDataBYKey('token');
        userExp['token_param'] = {};
        userExp['token_param']['device_type'] = 'w';
        userExp['token_param']['host'] = '';
        if (userId == null) {
            this.showPreloader = false;
            this.showText = true;
            userExp['myprofile'] = 'yes';
            userExp['username'] = '';

        } else {
            this.showPreloader = false;
            this.showText = true;
            var urlParam = userId.split("?");
            userExp['myprofile'] = 'no';
            userExp['username'] = urlParam[0];

        }

        this._constantService.fetchDataApi(this._constantService.getUserExpDetailsServiceUrl(), userExp).subscribe(data => {
            // this.register_re = data["_body"];
            // let responseData = JSON.parse(this.register_re);
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.showPreloader = false;
                this.showText = true;
                if (responseData.USER_EXP.length == 0) {
                    this.expDetailsView = 2;
                    this.showPreloader = false;
                    this.showText = true;
                } else {
                    this.expDetailsView = 1;
                    this.showPreloader = false;
                    this.showText = true;
                }
                this.experience = responseData.USER_EXP;

                for (var i = 0; i < this.experience.length; i++) {
                    if (this.experience[i].SUMMARY != '') {
                        this.experience[i].SUMMARY = this.postData.decodeURIPostData(this.experience[i].SUMMARY).trim();
                        this.experience[i].SUMMARY = this.experience[i].SUMMARY;
                    }
                    if (this.experience[i].TO == null) {
                        this.experience[i].TO = "Present";
                    } else {
                        this.EduYears = this.experience[i].TO;
                    }
                }
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
            } else if (status == this._constantService.error_token) {
                this.showPreloader = false;
                this.showText = true;
                this.sessionLogout.emit(true);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });

    }

    educationclick() {
        if (this.educationEditBox) {
            if (this.education.length == 0) {
                this.eduDetailsView = 1;
            }
            this.addEduStatus = !this.addEduStatus;
            let body = document.getElementsByTagName('body')[0];
            body.classList.add("disable-body");
        }


    }

    experienceclick() {
        if (this.experienceEditShow) {
            if (this.experience.length == 0) {
                this.expDetailsView = 1;
            }
            this.addExpStatus = !this.addExpStatus;
        }
    }

    getYears() {
        var max = new Date().getFullYear();
        var min = 1980;

        for (var i = max; i >= 1980; i--) {
            this.years.push(i);
        }
    }

    getcheckcurryrExp() {
        var max = new Date().getFullYear();
        var date = new Date();
        var n = date.getUTCMonth();
        let selyr = (<HTMLSelectElement>document.getElementById('expYr_to'));
        var toMon = (<HTMLSelectElement>document.getElementById('expMon_to'));
        if (max == parseInt(selyr.value) && parseInt(toMon.value) > n) {
            /////////// add by vijay /////////////////////////////////////////////////        
            toMon.value = "00";
            this.ExpPresentselected = true;
            ///////////// end by vijay////////////////////////////////////////////////
        }
    }

    getcheckcurryrEdu() {
        var max = new Date().getFullYear();
        var date = new Date();
        var n = date.getUTCMonth();
        let selyr = (<HTMLSelectElement>document.getElementById('eduYr_to'));
        var toMon = (<HTMLSelectElement>document.getElementById('eduMon_to'));
        if (max == parseInt(selyr.value) && parseInt(toMon.value) > n) {
            toMon.value = "00";
            this.Presentselected = true;

        }
    }

    getcheckcurryrExpfrom() {
        var max = new Date().getFullYear();
        var date = new Date();
        var n = date.getUTCMonth();
        let selyr = (<HTMLSelectElement>document.getElementById('expYr_from'));
        var toMon = (<HTMLSelectElement>document.getElementById('expMon_from'));
        if (max == parseInt(selyr.value) && parseInt(toMon.value) > n) {
            toMon.value = "01";
        }
    }

    getcheckcurryrEdufrom() {
        var max = new Date().getFullYear();
        var date = new Date();
        var n = date.getUTCMonth();
        let selyr = (<HTMLSelectElement>document.getElementById('eduYr_from'));
        var toMon = (<HTMLSelectElement>document.getElementById('eduMon_from'));
        if (max == parseInt(selyr.value) && parseInt(toMon.value) > n) {
            toMon.value = "01";
        }
    }

    getExpYears() {
        this.default = true;
        var max = new Date().getFullYear();
        var date = new Date();
        var n = date.getUTCMonth();
        this.ExpYears = [];
        var max = new Date().getFullYear();
        this.ExpPresentselected = false;
        //        let selyr = (<HTMLSelectElement> document.getElementById('expYr_from'));console.log("end check : ",selyr);
        //        var minn = parseInt(selyr.value);console.log("end check : ",minn);
        for (var i = max; i >= 1980; i--) {
            this.ExpYears.push(i);
        }
        var toMon = (<HTMLSelectElement>document.getElementById('expMon_to'));
        if (toMon.value == "00") {
            this.ExpPresentselected = true;
        }
        //        if (max == parseInt(selyr.value) && parseInt(toMon.value) > n) {
        //            toMon.value = "00";
        //        }
        this.getexpmonth();
        this.getcheckcurryrExp();
    }

    getexpmonth() {
        var max = new Date().getFullYear();
        var date = new Date();
        var n = date.getUTCMonth();
        this.showErrorDate = false;
        var fromMon = (<HTMLSelectElement>document.getElementById('expMon_from'));
        var toMon = (<HTMLSelectElement>document.getElementById('expMon_to'));
        let selyr = (<HTMLSelectElement>document.getElementById('expYr_from'));
        let toyr = (<HTMLSelectElement>document.getElementById('expYr_to'));
        setTimeout(() => {
            let toyr = (<HTMLSelectElement>document.getElementById('expYr_to'));
            if (toyr != null) {
                if (parseInt(toyr.value) != null) {
                    if (parseInt(selyr.value) == parseInt(toyr.value)) {
                        if (parseInt(fromMon.value) > parseInt(toMon.value)) {
                            toMon.value = "default";
                            toyr.value = "default";
                        }
                    }
                    if (max == parseInt(selyr.value) && parseInt(toMon.value) > n) {
                        toMon.value = "00";
                    }
                    this.getcheckcurryrExp();
                }
            }
        }, 100)
    }
    getedumonth() {
        this.showErrorDate = false;
        var max = new Date().getFullYear();
        var date = new Date();
        var n = date.getUTCMonth();
        var fromMon = (<HTMLSelectElement>document.getElementById('eduMon_from'));
        var toMon = (<HTMLSelectElement>document.getElementById('eduMon_to'));
        let selyr = (<HTMLSelectElement>document.getElementById('eduYr_from'));
        let toyr = (<HTMLSelectElement>document.getElementById('eduYr_to'));
        setTimeout(() => {
            let toyr = (<HTMLSelectElement>document.getElementById('eduYr_to'));
            if (toyr != null) {
                if (parseInt(selyr.value) == parseInt(toyr.value)) {
                    if (parseInt(fromMon.value) > parseInt(toMon.value)) {
                        toMon.value = "default";
                        toyr.value = "default";
                    }
                    if (max == parseInt(selyr.value) && parseInt(toMon.value) > n) {
                        toMon.value = "00";
                    }
                    this.getcheckcurryrEdu();
                }
            }
        }, 100)
    }

    getEduYears() {
        var toMon = (<HTMLSelectElement>document.getElementById('eduMon_to'));
        this.EduYears = [];
        var max = new Date().getFullYear();
        var date = new Date();
        var n = date.getUTCMonth();
        this.Presentselected = false;
        let selyr = (<HTMLSelectElement>document.getElementById('eduYr_from'));
        var minn = parseInt(selyr.value);
        for (var i = max; i >= 1980; i--) {
            this.EduYears.push(i);
        }
        var toMon = (<HTMLSelectElement>document.getElementById('eduMon_to'));
        if (toMon.value == "00") {
            this.Presentselected = true;
        }
        if (max == parseInt(selyr.value) && parseInt(toMon.value) > n) {
            toMon.value = "00";
        }
        this.getedumonth();
        this.getcheckcurryrEdu();
    }

    delUserExp() {
        var res = confirm("Are you sure you want to delete this?");
        if (res) {
            //            var target = event.currentTarget;
            //            var idAttr = target.attributes.id;
            var delUsrExpDetails = {};
            delUsrExpDetails['token'] = this._constantService.getSessionDataBYKey('token');
            delUsrExpDetails['expid'] = this.expId;
            delUsrExpDetails['token_param'] = {};
            delUsrExpDetails['token_param']['device_type'] = 'w';
            delUsrExpDetails['token_param']['host'] = '';

            this._constantService.fetchDataApi(this._constantService.getDelUsrExpServiceUrl(), delUsrExpDetails).subscribe(data => {
                var responseData: any = data;
                var status = responseData.STATUS;
                if (status = this._constantService.success_msg) {
                    //this._constantService.setToken(responseData.TOKEN);
                    this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                    var index = this.experience.findIndex(i => i.USER_EXPERIENCE_ID == this.expId);
                    this.experience.splice(index, 1);
                    if (this.experience.length == 0) {
                        this.expDetailsView = 2;
                        this.experienceAdd = false;
                    }
                    this.hide_popus();
                    this.aboutUpdate.emit(true);
                    //(<HTMLElement> document.getElementById(id)).style.display = "none";
                } else if (status == "error_token") {
                    this.sessionLogout.emit(true);
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
        } else {

            return false;
        }
    }

    delUserEdu() {
        var res = confirm("Are you sure you want to delete this?");
        if (res) {
            //            var target = event.currentTarget;
            //            var idAttr = target.attributes.id;
            var delUsrEduDetails = {};
            delUsrEduDetails['token'] = this._constantService.getSessionDataBYKey('token');
            delUsrEduDetails['eduid'] = this.eduId;
            delUsrEduDetails['token_param'] = {};
            delUsrEduDetails['token_param']['device_type'] = 'w';
            delUsrEduDetails['token_param']['host'] = '';

            this._constantService.fetchDataApi(this._constantService.getDelUsrEduServiceUrl(), delUsrEduDetails).subscribe(data => {
                var responseData: any = data;
                var status = responseData.STATUS;
                if (status = this._constantService.success_msg) {
                    //this._constantService.setToken(responseData.TOKEN);
                    this._constantService.setSessionJsonPair('token', responseData.TOKEN);

                    //                    var id = "edu_" + idAttr.nodeValue;
                    var index = this.education.findIndex(i => i.USER_EDUCATION_ID == this.eduId);
                    this.education.splice(index, 1);
                    if (this.education.length == 0) {
                        this.eduDetailsView = 2;
                        this.educationAdd = false;
                    }
                    this.hide_popus();
                    //                    (<HTMLElement> document.getElementById(id)).style.display = "none";
                    this.aboutUpdate.emit(true);
                } else if (status == "error_token") {

                    this.sessionLogout.emit(true);
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
        } else {

            return false;
        }
    }

    hideInstituteInput(event) {
        if (event.target.value === 'others') {
            this.inputInstitute = 2;
        } else {
            this.instituteOthers = '';
            this.inputInstitute = 1;
        }
    }

    hideCourseInput(event) {
        if (event.target.value === 'others') {
            this.inputCourse = 2;
        } else {
            this.courseOthers = '';
            this.inputCourse = 1;
        }
    }

    hideEduBox() {
        var ins_Opt = (<HTMLSelectElement>document.getElementById('edu_institute'));
        var cou_Opt = (<HTMLSelectElement>document.getElementById('edu_course'));
        var toYr = (<HTMLSelectElement>document.getElementById('eduYr_to'));
        var toMon = (<HTMLSelectElement>document.getElementById('eduMon_to'));
        var fromYr = (<HTMLSelectElement>document.getElementById('eduYr_from'));
        var fromMon = (<HTMLSelectElement>document.getElementById('eduMon_from'));
        ins_Opt.options.selectedIndex = 0;
        cou_Opt.options.selectedIndex = 0;
        toYr.options.selectedIndex = 0;
        toMon.options.selectedIndex = 0;
        fromYr.options.selectedIndex = 0;
        fromMon.options.selectedIndex = 0;
        this.instituteOthers = '';
        this.courseOthers = '';
        this.eduSummary = '';
        this.educationAdd = false;
        this.addEduStatus = false;
        this.inputInstitute = 1;
        this.inputCourse = 1;
        if (this.education.length == 0) {
            this.eduDetailsView = 2;
        }
    }

    hideEduEditBox() {
        this.educationAdd = false;
        this.educationedit = false;
        this.instituteOthers = '';
        this.courseOthers = '';
        this.inputInstitute = 1;
        this.inputCourse = 1;
    }

    hideExpEditBox() {
        this.experienceAdd = false;
        this.experienceshow = false;
        this.organizationOthers = '';
        this.positionOthers = '';
        this.inputPosition = 1;
        this.inputOrganization = 1;
    }

    hideExpBox() {
        var pos_Opt = (<HTMLSelectElement>document.getElementById('exp_position'));
        var org_Opt = (<HTMLSelectElement>document.getElementById('exp_organization'));
        var toYr = (<HTMLSelectElement>document.getElementById('expYr_to'));
        var toMon = (<HTMLSelectElement>document.getElementById('expMon_to'));
        var fromYr = (<HTMLSelectElement>document.getElementById('expYr_from'));
        var fromMon = (<HTMLSelectElement>document.getElementById('expMon_from'));
        this.organizationOthers = '';
        this.positionOthers = '';
        pos_Opt.options.selectedIndex = 0;
        org_Opt.options.selectedIndex = 0;
        toYr.options.selectedIndex = 0;
        toMon.options.selectedIndex = 0;
        fromYr.options.selectedIndex = 0;
        fromMon.options.selectedIndex = 0;
        this.inputPosition = 1;
        this.inputOrganization = 1;
        this.expSummary = '';
        this.addExpStatus = false;
        this.experienceAdd = false;
        if (this.experience.length == 0) {
            this.expDetailsView = 2;
        }
    }

    hidePositionInput(event) {
        if (event.target.value === 'others') {
            this.inputPosition = 2;
        } else {
            this.positionOthers = '';
            this.inputPosition = 1;
        }
    }

    hideOrganizationInput(event) {
        if (event.target.value === 'others') {
            this.inputOrganization = 2;
        } else {
            this.organizationOthers = "";
            this.inputOrganization = 1;
        }
    }

    hideElement(education) {
        education.show = false;
    }


    updateEducationDetails(event, i, from, to) {
        this.eduId = this.education[i].USER_EDUCATION_ID;
        this.instituteName = this.education[i].INSTITUTE;
        if (this.education[i].INSTITUTE_ID != null) {
            this.instituteId = this.education[i].INSTITUTE_ID;
        }
        this.courseName = this.education[i].COURSE;
        if (this.education[i].COURSE_ID != null) {
            this.courseId = this.education[i].COURSE_ID;
        }
        if (this.education[i].TO != null) {
            var dateTo = this.education[i].TO.split("-");
        }
        if (this.education[i].FROM != null) {
            var dateFrom = this.education[i].FROM.split("-");
        }
        setTimeout(() => {
            var dateFromYearObj = (<HTMLSelectElement>document.getElementById("eduYr_from"));
            if (dateFromYearObj != null) {
                for (var j = 0; j < dateFromYearObj.options.length; j++) {
                    if (dateFromYearObj.options[j].value === dateFrom[0].trim()) {
                        dateFromYearObj.options.selectedIndex = j;
                        break;
                    }
                }
            }
            var dateFromMonObj = (<HTMLSelectElement>document.getElementById("eduMon_from"));
            if (dateFromMonObj != null) {
                for (var j = 0; j < dateFromMonObj.options.length; j++) {
                    if (dateFromMonObj.options[j].value === dateFrom[1].trim()) {
                        dateFromMonObj.options.selectedIndex = j;
                        break;
                    }
                }
            }
            var dateToYearObj = (<HTMLSelectElement>document.getElementById("eduYr_to"));
            if (dateToYearObj != null) {
                for (var j = 0; j < dateToYearObj.options.length; j++) {
                    if (dateToYearObj.options[j].value === dateTo[0].trim()) {
                        dateToYearObj.options.selectedIndex = j;
                        break;
                    }
                }
            }
            var dateToMonObj = (<HTMLSelectElement>document.getElementById("eduMon_to"));
            if (dateToMonObj != null) {
                for (var j = 0; j < dateToMonObj.options.length; j++) {
                    if (dateToMonObj.options[j].value === dateTo[1].trim()) {
                        dateToMonObj.options.selectedIndex = j;
                        break;
                    }
                }
            }
        }, 150);
        this.eduSummary = this.postData.decodeURIPostData(this.education[i].SUMMARY);
    }

    updateExperienceDetails(i) {
        this.expId = this.experience[i].USER_EXPERIENCE_ID;
        this.organisationName = this.experience[i].ORGANIZATION;
        if (this.experience[i].ORGANIZATION_ID != null) {
            this.organizationId = this.experience[i].ORGANIZATION_ID;
        }
        this.positionName = this.experience[i].POSITION;
        if (this.experience[i].POSITION_ID != null) {
            this.positionId = this.experience[i].POSITION_ID;
        }
        if (this.experience[i].TO != null) {
            var dateTo = this.experience[i].TO.split("-");
        }
        if (this.experience[i].FROM != null) {
            var dateFrom = this.experience[i].FROM.split("-");
        }
        setTimeout(() => {
            var dateFromYearObj = (<HTMLSelectElement>document.getElementById("expYr_from"));
            if (dateFromYearObj != null) {
                for (var j = 0; j < dateFromYearObj.options.length; j++) {
                    if (dateFromYearObj.options[j].value === dateFrom[0].trim()) {
                        dateFromYearObj.options.selectedIndex = j;
                        break;
                    }
                }
            }
            var dateFromMonObj = (<HTMLSelectElement>document.getElementById("expMon_from"));
            if (dateFromMonObj != null) {
                for (var j = 0; j < dateFromMonObj.options.length; j++) {
                    if (dateFromMonObj.options[j].value === dateFrom[1].trim()) {
                        dateFromMonObj.options.selectedIndex = j;
                        break;
                    }
                }
            }
            var dateToYearObj = (<HTMLSelectElement>document.getElementById("expYr_to"));
            if (dateToYearObj != null) {
                for (var j = 0; j < dateToYearObj.options.length; j++) {
                    if (dateToYearObj.options[j].value === dateTo[0].trim()) {
                        dateToYearObj.options.selectedIndex = j;
                        break;
                    }
                }
            }
            var dateToMonObj = (<HTMLSelectElement>document.getElementById("expMon_to"));
            if (dateToMonObj != null) {
                for (var j = 0; j < dateToMonObj.options.length; j++) {
                    if (dateToMonObj.options[j].value === dateTo[1].trim()) {
                        dateToMonObj.options.selectedIndex = j;
                        break;
                    }
                }
            }
        }, 150);
        this.expSummary = this.postData.decodeURIPostData(this.experience[i].SUMMARY);
    }
    hide_popus() {
        this.exp_popup = false;
        this.edu_popup = false;
        this.summary_popup = false;
        this.organisationName = "";
        this.organizationId = 0;
        this.positionName = "";
        this.positionId = 0;
        this.instituteName = "";
        this.instituteId = 0;
        this.courseName = '';
        this.courseId = 0;
        this.expId = 0;
        this.eduId = 0;
        this.expSummary = "";
        this.eduSummary = "";
        this.error = "";
        this.showErrorInsOrg = false;
        this.showErrorDate = false;
        this.showErrorCouPos = false;
        this.showErrorSumm = false;
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }
    show_abt_popup(index) {
        if (index == 1) {
            this.summary_popup = true;
            this.userSummary = this.summary;
            //            this.countCheck();
        }
        else if (index == 2) {
            this.edu_popup = true;
            setTimeout(() => {
                var toMon = (<HTMLSelectElement>document.getElementById('eduMon_to'));
                for (var i = 0; i < this.education.length; i++) {
                    if (this.education[i].TO == "Present" || this.education[i].TO == null) {
                        toMon.value = "00";
                        this.Presentselected = true;
                    } else {
                        if (toMon.value != "00") {
                            this.Presentselected = false;
                            setTimeout(() => {
                                this.getEduYears();
                            }, 100);
                        }
                    }
                }
            }, 100);
        }
        else if (index == 3) {
            this.exp_popup = true;
            setTimeout(() => {
                var toMon = (<HTMLSelectElement>document.getElementById('expMon_to'));
                for (var i = 0; i < this.experience.length; i++) {
                    if (this.experience[i].TO == "Present" || this.experience[i].TO == null) {
                        toMon.value = "00";
                        this.ExpPresentselected = true;
                    } else {
                        this.ExpPresentselected = false;
                        setTimeout(() => {
                            this.getExpYears();
                        }, 100);
                    }
                }
            }, 100);
        }
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }
    searchlist() {
    }
    // let body = document.getElementsByTagName('body')[0];
    // body.classList.add("body-overflow");
    getMonth() {

    }

    showInstitute() {
        this.showErrorInsOrg = false;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.count = 1;
            this.continueScroll = false;
            if (this.instituteName != "") {
                this.instituteId = 0;
                this.getSolarSrchInst(1);
                //                this.searchedInsArr = this.instituteArr.filter((item) => {
                //                    return item.INSTITUTE_NAME.includes(this.instituteName);
                //                });
                //                if (this.searchedInsArr.length != 0) {
                //                    this.searchList = true;
                //                }
            }
        }, 1000);
    }
    showCourse() {
        this.showErrorCouPos = false;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.count = 1;
            this.continueScroll = false;
            if (this.courseName != "") {
                this.courseId = 0;
                this.getSolarSrchCour(1);
                //                this.searchedCouArr = this.courseArr.filter((item) => {
                //                    return item.COURSE_NAME.includes(this.courseName);
                //                });
                //                if (this.searchedCouArr.length != 0) {
                //                    this.searchListCou = true;
                //                }
            }
        }, 1000);
    }
    showPosition() {
        this.showErrorCouPos = false;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.count = 1;
            this.continueScroll = false;
            if (this.positionName != "") {
                this.positionId = 0;
                this.getSolarSrchPos(1);
            }
            //            this.searchedPosArr = this.positionArr.filter((item) => {
            //                return item.POSITION_NAME.includes(this.positionName);
            //            });
            //            if (this.searchedPosArr.length != 0) {
            //                this.searchListPos = true;
            //            }

        }, 1000);
    }

    showOrganisation() {
        this.showErrorInsOrg = false;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.count = 1;
            this.continueScroll = false;
            if (this.organisationName != "") {
                this.organizationId = 0;
                this.getSolarSrchOrg(1);
            }
            //            this.searchedOrgArr = this.organizationArr.filter((item) => {
            //                return item.ORGANIZATION_NAME.includes(this.organisationName);
            //            });
            //            if (this.searchedOrgArr.length != 0) {
            //                this.searchListOrg = true;
            //            }

        }, 1000);
    }

    setCourse(name, id) {
        this.searchListCou = false;
        this.courseName = name;
        this.courseId = id;
    }
    setInstitute(name, id) {
        this.searchList = false;
        this.instituteName = name;
        this.instituteId = id;
    }
    setOrganization(name, id) {
        this.searchListOrg = false;
        this.organisationName = name;
        this.organizationId = id;
    }
    setPosition(name, id) {
        this.searchListPos = false;
        this.positionName = name;
        this.positionId = id;
    }

    hidePopup(event) {
        var clickedComponent = event.target;
        var openInsPopUp = 0, openCouPopUp = 0, openOrgPopUp = 0, openPosPopUp = 0;
        do {
            if (this.edu_popup) {
                if (clickedComponent === this.institute.nativeElement) {
                    openInsPopUp = 1;
                }
                if (clickedComponent === this.course.nativeElement) {
                    openCouPopUp = 1;
                }
            }
            if (this.exp_popup) {
                if (clickedComponent === this.organization.nativeElement) {
                    openOrgPopUp = 1;
                }
                if (clickedComponent === this.position.nativeElement) {
                    openPosPopUp = 1;
                }
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (openInsPopUp != 1) {
            this.searchList = false;
        }
        if (openCouPopUp != 1) {
            this.searchListCou = false;
        }
        if (openOrgPopUp != 1) {
            this.searchListOrg = false;
        }
        if (openPosPopUp != 1) {
            this.searchListPos = false;
        }
    }

    getSolarSrchInst(count) {
        var searchIns = {};
        searchIns['token'] = this._constantService.getSessionDataBYKey('token');
        searchIns['token_param'] = {};
        searchIns['token_param']['device_type'] = "w";
        searchIns['token_param']['host'] = '';
        searchIns['sdt'] = this.instituteName;
        searchIns['count'] = count;

        this._constantService.fetchDataApi(this._constantService.getSolarSrchInsServiceUrl(), searchIns).subscribe(data => {
            var responseData: any = data;
            if (responseData.STATUS == this._constantService.success_msg) {
                if (count == 1) {
                    this.searchedInsArr = [];
                }
                this.searchList = true;
                //                if(responseData.SEARCHED_TEXT.length!=0){
                //
                //                }
                if (responseData.SEARCHED_TEXT.length < 10) {
                    this.continueScroll = false;
                } else {
                    this.count += 1;
                    this.continueScroll = true;
                }
                this.searchedInsArr.push.apply(this.searchedInsArr, responseData.SEARCHED_TEXT);
            }
        });
    }

    getSolarSrchCour(count) {
        var searchIns = {};
        searchIns['token'] = this._constantService.getSessionDataBYKey('token');
        searchIns['token_param'] = {};
        searchIns['token_param']['device_type'] = "w";
        searchIns['token_param']['host'] = '';
        searchIns['sdt'] = this.courseName;
        searchIns['count'] = count;

        this._constantService.fetchDataApi(this._constantService.getSolarSrchCouServiceUrl(), searchIns).subscribe(data => {
            var responseData: any = data;
            if (responseData.STATUS == this._constantService.success_msg) {
                if (count == 1) {
                    this.searchedCouArr = [];
                }
                this.searchListCou = true;
                if (responseData.SEARCHED_TEXT.length < 10) {
                    this.continueScroll = false;
                } else {
                    this.count += 1;
                    this.continueScroll = true;
                }
                this.searchedCouArr.push.apply(this.searchedCouArr, responseData.SEARCHED_TEXT);
            }
        });
    }

    getSolarSrchPos(count) {
        var searchIns = {};
        searchIns['token'] = this._constantService.getSessionDataBYKey('token');
        searchIns['token_param'] = {};
        searchIns['token_param']['device_type'] = "w";
        searchIns['token_param']['host'] = '';
        searchIns['sdt'] = this.positionName;
        searchIns['count'] = count;

        this._constantService.fetchDataApi(this._constantService.getSolarSrchPosServiceUrl(), searchIns).subscribe(data => {
            var responseData: any = data;
            if (responseData.STATUS == this._constantService.success_msg) {
                if (count == 1) {
                    this.searchedPosArr = [];
                }
                this.searchListPos = true;
                //                if(responseData.SEARCHED_TEXT.length!=0){
                //
                //                }
                if (responseData.SEARCHED_TEXT.length < 10) {
                    this.continueScroll = false;
                } else {
                    this.count += 1;
                    this.continueScroll = true;
                }
                this.searchedPosArr.push.apply(this.searchedPosArr, responseData.SEARCHED_TEXT);
            }
        });
    }

    getSolarSrchOrg(count) {
        var searchIns = {};
        searchIns['token'] = this._constantService.getSessionDataBYKey('token');
        searchIns['token_param'] = {};
        searchIns['token_param']['device_type'] = "w";
        searchIns['token_param']['host'] = '';
        searchIns['sdt'] = this.organisationName;
        searchIns['count'] = count;

        this._constantService.fetchDataApi(this._constantService.getSolarSrchOrgServiceUrl(), searchIns).subscribe(data => {
            var responseData: any = data;
            if (responseData.STATUS == this._constantService.success_msg) {
                if (count == 1) {
                    this.searchedOrgArr = [];
                }
                this.searchListOrg = true;
                //                if(responseData.SEARCHED_TEXT.length!=0){
                //
                //                }
                if (responseData.SEARCHED_TEXT.length < 10) {
                    this.continueScroll = false;
                } else {
                    this.count += 1;
                    this.continueScroll = true;
                }
                this.searchedOrgArr.push.apply(this.searchedOrgArr, responseData.SEARCHED_TEXT);

            }
        });
    }

    onScrollDown() {
        if (this.continueScroll) {
            if (this.searchListOrg) {
                this.getSolarSrchOrg(this.count);
            }
            if (this.searchList) {
                this.getSolarSrchInst(this.count);
            }
            if (this.searchListCou) {
                this.getSolarSrchCour(this.count);
            }
            if (this.searchListPos) {
                this.getSolarSrchPos(this.count);
            }
        }
    }

    PresentSel(event) {
        if (event.target.value == '00') {
            this.Presentselected = true;
        } else {
            this.Presentselected = false;
            this.getEduYears();
        }
    }

    ExpPresentsel(event) {
        if (event.target.value == "00") {
            this.ExpPresentselected = true;
        } else {
            this.ExpPresentselected = false;
            this.getExpYears();
        }
    }

    //    disableabuoutButton:boolean = true;
    countCheck() {
        this.summaryCount = this.userSummary.length;
        if (this.summaryCount != 0) {
            this.summaryClearButton = true;
        } else {
            this.summaryClearButton = false;

        }
        var x = <HTMLInputElement>document.getElementById('counting');
        if (this.summaryCount > 1000) {
            if (x) {
                x.classList.add('count_limit');
                this.summaryBtn = true;
            }
        } else {
            if (x) {
                x.classList.remove('count_limit');
                this.summaryBtn = false;
            }
        }
        //        if(this.summaryCount <= 0){
        //            this.disableabuoutButton = true;
        //        }else{
        //            this.disableabuoutButton = false;
        //        }
        //        [ngClass]="{'postDesable':disableabuoutButton }"
    }



}
