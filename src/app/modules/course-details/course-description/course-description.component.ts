import { Component, OnInit, Input } from '@angular/core';
import { ConstantService } from './../../../services/constant.service';
import { EncryptionService } from './../../../services/encryption.service';
import { PostdataService } from './../../../services/postdata.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

@Component({
    selector: 'app-course-description',
    templateUrl: './course-description.component.html',
    styleUrls: ['./course-description.component.scss']
})
export class CourseDescriptionComponent implements OnInit {
    arr: any;
    isCourseNotLivePopup: boolean = false;
    isBuyNowPopup: boolean = false;
    trialStripMsg: any = '';
    isSubscribed: number = 0;
    isTrialBased: number;
    CorsUrl: any;
    corsUuid: any;
    openConfirmation: boolean = false;
    dataConf = {};
    isExpired: any;
    withoutToken: boolean;
    @Input() detailObject: Object;
    courseLanguage: any;
    courseTitle: any;
    corsDescription: string;
    cost: any;
    dCost: any;
    corsCoverPath: string;
    languageList: any;
    pageId: string;
    showResultPopup: boolean = false;
    Corsid: any;
    btnStatus: string;
    publish: any;
    publishedDate;
    courseDetails: any;
    sectionContent = [{ 'CONTENT_TYPE': '', 'CONTENT_UUID': '', 'TITLE': '', 'VISIBILITY': '', 'INFO': '', 'isSubmited': '', 'scoreCard': {} }];
    contents = [{ 'section_UUID': '', 'section_title': '', 'sectionContents': [] }];
    description;
    sectionCount;
    VISIBILABLE_CONTENT;
    bgimages = '';
    enrolled = 0;
    contentTestUuid;
    courseReport;
    quizType;
    followvalue: boolean = false;
    mentorData = [];
    isSeeMoreMentor: boolean = true;
    videoCount: number = 0;
    quizzeCount: number = 0;
    pdfCount: number = 0;
    liveStreamCount: number = 0;
    FreeTrial: boolean = true;
    isbuy: boolean = false;
    // liveStreamDis = {};
    rDays: any = 0;
    corsType: number = 9;
    courseData = {};
    openLoginPopup: boolean = false;
    isError: boolean;
    errorText: any;
    openLoginPopupType: number;
    isPublicView: boolean = false;
    isDownloadable: any;

    constructor(
        public _router: Router,
        public _constantService: ConstantService,
        public _encrypt: EncryptionService,
        public _encryptionService: EncryptionService,
        private activatedRoute: ActivatedRoute,
        public router: Router,
        public postData: PostdataService
    ) { }

    ngOnInit() {
        console.log("fulldata",this.detailObject);
        this.getLiveStreamStatus();
        this.activatedRoute.params.subscribe((params: Params) => {
            if (params['id'] != undefined && params['id'] != null) {
                let paramArr = params['id'].split('-');
                this.CorsUrl = paramArr[paramArr.length - 1];
            }
        });
        this.pageId = this._constantService.getSessionDataBYKey('page_id_course');

        //        this._constantService.setCourseUuid(this.Corsid);
        var token = this._constantService.getSessionDataBYKey('token');

        if (token && token != 'undefined') {
            this.isPublicView = false;
            this.withoutToken = false;
            this.getCourseDetail(this.CorsUrl, this.pageId);
        } else {
            this.isPublicView = true;
            this.withoutToken = true;
            this.setCourseSectionData();
        }
        this.addInetialHeight();
        this.getAllLanguage();
        if (this.detailObject['RDAYS']) {
            this.rDays = this.detailObject['RDAYS'];
        }



        if (this.detailObject['COVER_TYPE'] == "0") {
            if (this.detailObject['COURSE_COVER_PHOTO_PATH'] != null) {
                this.corsCoverPath = this.detailObject['COURSE_COVER_PHOTO_PATH'] + 'cover/' + this.detailObject['COURSE_UUID'] + '_1235x330.png';
            } else {
                this.corsCoverPath = this._constantService.defaultCoverImgPath;
            }
        } else {
            this.corsCoverPath = this.detailObject['COURSE_COVER_PHOTO_PATH'];
        
        }

        if (this.detailObject['COURSE_TITLE']) {
            this.courseTitle = this.postData.decodeURIPostData(this.detailObject['COURSE_TITLE']);
        }
        this.detailObject['COURSE_TITLE'] = this.postData.decodeURIPostData(this.detailObject['COURSE_TITLE']);
        this.detailObject['PAGE_TITLE'] = this.postData.decodeURIPostData(this.detailObject['PAGE_TITLE']);
        console.log("this.detailObject['PAGE_TITLE']",this.detailObject['PAGE_TITLE']);

        this.quizzeCount = this.detailObject['QUIZ_COUNT'];
        this.pdfCount = this.detailObject['DOCUMENT_COUNT'];
        this.liveStreamCount = this.detailObject['STREAM_COUNT'];

    }

    // =========================================================================================================================
    //without token get coure detail function
    // =========================================================================================================================
    setCourseSectionData() {

        this.description = this.postData.decodeURIPostData(this.detailObject['DESCRIPTION']);
        this.publishedDate = this.detailObject['PUBLISH_DATE_TIME'];
        console.log(this.detailObject['PUBLISH_DATE_TIME']);
        this.VISIBILABLE_CONTENT = this.detailObject['VISIBILABLE_CONTENT'];
        this.sectionCount = this.detailObject['SECTION_COUNT'];
        this.mentorData = this.detailObject['MENTOR_DATA'];
        this.trialStripMsg = this.detailObject['RTRAIL_DURO'];
        this.isTrialBased = this.detailObject['SUBSCRIPTION'];
        this.rDays = this.detailObject['RDAYS'];

        for (let k = 0; k < this.mentorData.length; k++) {
            if (this.mentorData[k].SUMMARY) {
                this.mentorData[k].SUMMARY = this.postData.decodeURIPostData(this.mentorData[k].SUMMARY);
            }
            if (this.mentorData[k].PROFILE_PHOTO_PATH) {
                this.mentorData[k].SUMMARY = this.postData.decodeURIPostData(this.mentorData[k].SUMMARY);
                this.mentorData[k].USER_FULL_NAME = this.postData.decodeURIPostData(this.mentorData[k].USER_FULL_NAME);
                this.mentorData[k].PROFILE_PHOTO_PATH = this.mentorData[k].PROFILE_PHOTO_PATH + "profile/" + this.mentorData[k].USER_ID + "_150x150.png?v=" + this.mentorData[k].IMG_UPD_DT;
            }
            else {
                this.mentorData[k].PROFILE_PHOTO_PATH = "./assets/images/defaultProfilePic.svg";
            }
        }
        this.sectionContent.length = 0;
        this.contents.length = 0;
        for (var i = 0; i < this.detailObject['CONTENT'].length; i++) {
            this.contents.push({ 'section_UUID': this.detailObject['CONTENT'][i].SECTION_UUID, 'section_title': this.detailObject['CONTENT'][i].SECTION_TITLE, 'sectionContents': [] });
            if (this.detailObject['CONTENT'][i].SECTION_CONTENT_DATA != null) {
                for (var j = 0; j < this.detailObject['CONTENT'][i].SECTION_CONTENT_DATA.length; j++) {
                    var sectioncontents = { 'CONTENT_TYPE': '', 'CONTENT_UUID': '', 'TITLE': '', 'VISIBILITY': '', 'INFO': '', 'SEEN': '' };
                    sectioncontents['CONTENT_TYPE'] = this.detailObject['CONTENT'][i].SECTION_CONTENT_DATA[j].CONTENT_TYPE;
                    sectioncontents['CONTENT_UUID'] = this.detailObject['CONTENT'][i].SECTION_CONTENT_DATA[j].CONTENT_UUID;
                    sectioncontents['TITLE'] = this.postData.decodeURIPostData(this.detailObject['CONTENT'][i].SECTION_CONTENT_DATA[j].TITLE);
                    sectioncontents['VISIBILITY'] = this.detailObject['CONTENT'][i].SECTION_CONTENT_DATA[j].VISIBILITY;
                    sectioncontents['SEEN'] = this.detailObject['CONTENT'][i].SECTION_CONTENT_DATA[j].SEEN;

                    if (sectioncontents['CONTENT_TYPE'] == '1') {
                        if (this.detailObject['CONTENT'][i].SECTION_CONTENT_DATA[j].DURATION < 60) {
                            sectioncontents['INFO'] = this.detailObject['CONTENT'][i].SECTION_CONTENT_DATA[j].DURATION + " min";
                        } else {
                            var x = this.detailObject['CONTENT'][i].SECTION_CONTENT_DATA[j].DURATION;
                            x = Math.floor(x / 60);
                            sectioncontents['INFO'] = x + " min";
                        }

                    }


                    else if (sectioncontents['CONTENT_TYPE'] == '2') {
                        sectioncontents['INFO'] = this.detailObject['CONTENT'][i].SECTION_CONTENT_DATA[j].PAGES + " pages";
                    }
                    else if (sectioncontents['CONTENT_TYPE'] == '3') {
                        sectioncontents['INFO'] = this.detailObject['CONTENT'][i].SECTION_CONTENT_DATA[j].QUESTION_COUNT + " ques";
                    }
                    else if (sectioncontents['CONTENT_TYPE'] == '4') {
                        sectioncontents['INFO'] = '';
                    }
                    else if (sectioncontents['CONTENT_TYPE'] == '5') {
                        sectioncontents['INFO'] = '';
                    }
                    else if (sectioncontents['CONTENT_TYPE'] == '6') {
                        sectioncontents['INFO'] = '1 Test';
                    }
                    else if (sectioncontents['CONTENT_TYPE'] == '7') {
                        // sectioncontents['mentorName'] = this.postData.decodeURIPostData(this.detailObject['CONTENT'][i].SECTION_CONTENT_DATA[j].MENTOR_DATA.USER_FULL_NAME);
                        sectioncontents['INFO'] = this.setliveStreaduration(this.detailObject['CONTENT'][i].SECTION_CONTENT_DATA[j].DURATION);
                        sectioncontents['mentorName'] = this.postData.decodeURIPostData(this.detailObject['CONTENT'][i]['SECTION_CONTENT_DATA'][j].MENTOR_DATA.USER_FULL_NAME);
                        sectioncontents['streamingDate'] = this.miliSecTodateConvertar(this.detailObject['CONTENT'][i]['SECTION_CONTENT_DATA'][j].START_TIME);
                    }
                    this.contents[i].sectionContents.push(sectioncontents);
                }

            }
        }
    }


    addInetialHeight() {
        let contentList = document.getElementsByClassName("content");
        for (let i = 0; i <= contentList.length; i++) {

        }
    }
    // ============================================================================================
    //with token
    // ============================================================================================
    getCourseDetail(corsId, pgId) {
        var CourseDetail = {};
        CourseDetail['token'] = this._constantService.getSessionDataBYKey('token');
        CourseDetail['token_param'] = {};
        CourseDetail['token_param']['device_type'] = 'w';
        CourseDetail['token_param']['host'] = '';
        CourseDetail['cors_uuid'] = "";
        CourseDetail['cors_id'] = corsId;
        CourseDetail['pg_uuid'] = pgId;



        this._constantService.fetchDataApi(this._constantService.getPageCourseDetailUrl(), CourseDetail).subscribe(data => {
            var responseData:any = data;

            var status = responseData.STATUS;
            if (status == 'success') {
                this.isDownloadable = responseData.COURSE_DETAILS.IS_DOWNLOADABLE;
                this.rDays = responseData.COURSE_DETAILS.RDAYS;
                this.Corsid = responseData.COURSE_DETAILS.COURSE_UUID;
                this.corsUuid = responseData.COURSE_DETAILS.COURSE_UUID;
                this._constantService.setCourseUuid(responseData.COURSE_DETAILS.COURSE_UUID);
                this.videoCount = responseData.COURSE_DETAILS.LECTURE_COUNT;
                this.quizzeCount = responseData.COURSE_DETAILS.QUIZ_COUNT;
                this.pdfCount = responseData.COURSE_DETAILS.DOCUMENT_COUNT;
                this.liveStreamCount = responseData.COURSE_DETAILS.STREAM_COUNT;

                if (Object.entries(responseData.COURSE_DETAILS).length == 0) {
                    this._router.navigate(['/400']);
                }
                this.mentorData = responseData.COURSE_DETAILS.MENTOR_DATA;
                for (let i = 0; i < this.mentorData.length; i++) {


                    if (this.mentorData[i].SUMMARY) {
                        this.mentorData[i].SUMMARY = this.postData.decodeURIPostData(this.mentorData[i].SUMMARY);
                    }
                    this.mentorData[i].SUMMARY = this.postData.decodeURIPostData(this.mentorData[i].SUMMARY);
                    this.mentorData[i].USER_FULL_NAME = this.postData.decodeURIPostData(this.mentorData[i].USER_FULL_NAME);

                    if (responseData.COURSE_DETAILS.MENTOR_DATA[i].PROFILE_PHOTO_PATH) {
                        this.mentorData[i].PROFILE_PHOTO_PATH = this.mentorData[i].PROFILE_PHOTO_PATH + "profile/" + this.mentorData[i].USER_ID + "_150x150.png?v=" + this.mentorData[i].IMG_UPD_DT;
                    }
                    else {
                        this.mentorData[i].PROFILE_PHOTO_PATH = "./assets/images/defaultProfilePic.svg";
                    }
                }

                this.courseDetails = responseData.COURSE_DETAILS;
                this.isSubscribed = this.courseDetails.IS_SUBSCRIBE;
                this.isTrialBased = this.courseDetails.SUBSCRIPTION;
                this.trialStripMsg = this.courseDetails.RTRAIL_DURO;
                this.corsType = this.courseDetails.COURSE_TYPE;
                this.sectionCount = this.courseDetails.SECTION_COUNT;
                this.enrolled = this.courseDetails.IS_ENROLLED;
                this.isExpired = this.courseDetails.IS_EXPRIED;
                var isPurchased = this.courseDetails.IS_PURCHASED;
                // var recentEnroll = this.courseDetails.RECENT_ENROLLED;
                this.publish = this.courseDetails.PUBLISH;
                this.description = this.postData.decodeURIPostData(this.courseDetails.DESCRIPTION);
                this.VISIBILABLE_CONTENT = this.courseDetails.VISIBILABLE_CONTENT;
                this.contents.length = 0;
                if (this.courseDetails.PUBLISH == 3 || this.courseDetails.PUBLISH == 1) {
                    this.publishedDate = this.courseDetails.PUBLISH_DATE_TIME;
                    // console.log(this.publishedDate);
                }
                for (var i = 0; i < responseData.COURSE_DETAILS.CONTENT.length; i++) {
                    this.sectionContent.length = 0;
                    this.contents.push({ 'section_UUID': responseData.COURSE_DETAILS.CONTENT[i].SECTION_UUID, 'section_title': responseData.COURSE_DETAILS.CONTENT[i].SECTION_TITLE, 'sectionContents': [] });
                    if (responseData.COURSE_DETAILS.CONTENT[i].SECTION_CONTENT_DATA != null) {
                        for (var j = 0; j < responseData.COURSE_DETAILS.CONTENT[i].SECTION_CONTENT_DATA.length; j++) {
                            var sectioncontents = { 'CONTENT_TYPE': '', 'CONTENT_UUID': '', 'TITLE': '', 'VISIBILITY': '', 'INFO': '', 'SEEN': '', 'REMAIN': '', 'isSubmited': '', 'scoreCard': {}, 'streamingDate': {} };
                            sectioncontents['CONTENT_TYPE'] = responseData.COURSE_DETAILS.CONTENT[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE;
                            sectioncontents['CONTENT_UUID'] = responseData.COURSE_DETAILS.CONTENT[i].SECTION_CONTENT_DATA[j].CONTENT_UUID;
                            sectioncontents['TITLE'] = this.postData.decodeURIPostData(responseData.COURSE_DETAILS.CONTENT[i].SECTION_CONTENT_DATA[j].TITLE);
                            sectioncontents['VISIBILITY'] = responseData.COURSE_DETAILS.CONTENT[i].SECTION_CONTENT_DATA[j].VISIBILITY;
                            sectioncontents['SEEN'] = responseData.COURSE_DETAILS.CONTENT[i].SECTION_CONTENT_DATA[j].SEEN;
                            sectioncontents['REMAIN'] = responseData.COURSE_DETAILS.CONTENT[i].SECTION_CONTENT_DATA[j].REMAIN;


                            sectioncontents['isSubmited'] = responseData.COURSE_DETAILS.CONTENT[i].SECTION_CONTENT_DATA[j].IS_SUBMITTED;

                            sectioncontents['scoreCard'] = responseData.COURSE_DETAILS.CONTENT[i].SECTION_CONTENT_DATA[j].SCORECARD;

                            if (sectioncontents['CONTENT_TYPE'] == '1') {
                                if (responseData.COURSE_DETAILS.CONTENT[i].SECTION_CONTENT_DATA[j].DURATION < 60) {
                                    sectioncontents['INFO'] = responseData.COURSE_DETAILS.CONTENT[i].SECTION_CONTENT_DATA[j].DURATION + " min";
                                } else {
                                    var x = responseData.COURSE_DETAILS.CONTENT[i].SECTION_CONTENT_DATA[j].DURATION;
                                    x = Math.floor(x / 60);
                                    sectioncontents['INFO'] = x + " min";
                                }

                            }
                            else if (sectioncontents['CONTENT_TYPE'] == '2') {
                                sectioncontents['INFO'] = responseData.COURSE_DETAILS.CONTENT[i].SECTION_CONTENT_DATA[j].PAGES + " pages";
                                sectioncontents['PATH'] = responseData.COURSE_DETAILS.CONTENT[i].SECTION_CONTENT_DATA[j].PATH;
                            }
                            else if (sectioncontents['CONTENT_TYPE'] == '3') {
                                sectioncontents['INFO'] = responseData.COURSE_DETAILS.CONTENT[i].SECTION_CONTENT_DATA[j].QUESTION_COUNT + " ques";
                            }
                            else if (sectioncontents['CONTENT_TYPE'] == '4') {
                                sectioncontents['INFO'] = '';
                            }
                            else if (sectioncontents['CONTENT_TYPE'] == '5') {
                                sectioncontents['INFO'] = '';
                            } else if (sectioncontents['CONTENT_TYPE'] == '6') {
                                sectioncontents['INFO'] = '1 Test';
                            }
                            else if (sectioncontents['CONTENT_TYPE'] == '7') {

                                sectioncontents['INFO'] = this.setliveStreaduration(responseData.COURSE_DETAILS.CONTENT[i].SECTION_CONTENT_DATA[j].DURATION);
                                sectioncontents['mentorName'] = this.postData.decodeURIPostData(responseData.COURSE_DETAILS.CONTENT[i].SECTION_CONTENT_DATA[j].MENTOR_DATA.USER_FULL_NAME);
                                sectioncontents.streamingDate = this.miliSecTodateConvertar(responseData.COURSE_DETAILS.CONTENT[i].SECTION_CONTENT_DATA[j].START_TIME);

                            }
                            this.contents[i].sectionContents.push(sectioncontents);

                        }

                    }
                }

            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }


    routeMentorProfile(username, id) {
        this._router.navigate(["profile/" + username]);
    }
    getAllLanguage() {
        this._constantService.fetchDataApiWithoutBody(this._constantService.getAllLanguageServiceUrl())
            .subscribe(data => {
                let responseData:any = data;
                if (responseData.success = this._constantService.success_msg) {
                    this.languageList = responseData.LNG_LIST;
                    if (this.withoutToken) {
                        if (this.detailObject['LANGUAGE'] != null && this.detailObject['LANGUAGE'] != undefined) {
                            for (var i = 0; i < this.languageList.length; i++) {
                                if (this.detailObject['LANGUAGE'] == this.languageList[i].LANGUAGE_ID) {
                                    this.courseLanguage = this.languageList[i].LANGUAGE;
                                }
                            }
                        }
                    } else {
                        //                         if (this.detailObject['LANGUAGE'] != null && this.detailObject['LANGUAGE'] != undefined) {
                        //                            for (var i = 0; i < this.languageList.length; i++) {
                        //                                if (this.detailObject['LANGUAGE'] == this.languageList[i].LANGUAGE_ID) {
                        //                                    this.courseLanguage = this.languageList[i].LANGUAGE;
                        //                                }
                        //                            }
                        //                        }
                    }
                }
            });
    }


    contentId;
    contentHeight;
    setContentHeight

    preview_dropdown(id, count) {
        this.contentId = document.getElementById("previewlist" + count);
        this.contentHeight = this.contentId.offsetHeight;
        this.setContentHeight = document.getElementById("previewInnerlist" + count).offsetHeight;
        if (this.contentHeight > 0) {
            document.getElementById("previewlist" + count).style.height = 0 + "px";
        }
        else {
            document.getElementById("previewlist" + count).style.height = this.setContentHeight + "px";
        }
        console.log(count);
        // let index=id;
        // let y = document.getElementById(index).classList.contains("hidelist");
        // if (!y) {
        //     document.getElementById(index).classList.add("hidelist");
        //     document.getElementById(index).classList.remove("showList");
        // }
        // else {
        //   document.getElementById(index).classList.remove("hidelist");
        //   document.getElementById(index).classList.add("showList");
        // }

        this.arrowRotate(count);
    }


    arrowRotate(index) {

        let head = "previewlisthead" + index;


        let x = document.getElementById(head).classList.contains("rotateImg");

        if (!x) {
            document.getElementById(head).classList.add("rotateImg");

        }
        else {
            document.getElementById(head).classList.remove("rotateImg");

        }
    }





    viewContent(content, sectionindex, contentIndex) {
        if (this.corsType == 0) {
            if (content.VISIBILITY == 0) {
                if (content.CONTENT_TYPE == 3) {
                    this._router.navigate(['/test/' + content.CONTENT_UUID]);
                } else if (content.CONTENT_TYPE == 2) {
                    this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                } else if (content.CONTENT_TYPE == 1) {
                    this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                } else if (content.CONTENT_TYPE == 4) {
                    this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                } else if (content.CONTENT_TYPE == 5) {
                    this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                } else if (content.CONTENT_TYPE == 6) {
                    this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                }
                else if (content.CONTENT_TYPE == 7) {
                    this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                } else if (this.isExpired == 2) {
                    //Please add error message accordingly.
                }
            }
        } else {
            if (this.enrolled == 1 && this.isExpired != 2) {
                this.UpdateSeenContent(content, sectionindex, contentIndex);
                if (content.CONTENT_TYPE == 3) {
                    this._router.navigate(['/test/' + content.CONTENT_UUID]);
                } else if (content.CONTENT_TYPE == 2) {
                    this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                } else if (content.CONTENT_TYPE == 1) {
                    this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                } else if (content.CONTENT_TYPE == 4) {
                    this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                } else if (content.CONTENT_TYPE == 5) {
                    this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                } else if (content.CONTENT_TYPE == 6) {
                    // this.openLinkedBasedTest(content.PATH,content.CONTENT_UUID);
                    this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                }
                else if (content.CONTENT_TYPE == 7) {
                    this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                }//lxy
            } else if (this.enrolled == 0) {
                if (this.isTrialBased == 0 && this.isSubscribed == 0 || this.isTrialBased == 0 && this.isSubscribed == 1) {
                    if (content.VISIBILITY == 0) {
                        if (content.CONTENT_TYPE == 3) {
                            this._router.navigate(['/test/' + content.CONTENT_UUID]);
                        } else if (content.CONTENT_TYPE == 2) {
                            this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                        } else if (content.CONTENT_TYPE == 1) {
                            this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                        } else if (content.CONTENT_TYPE == 4) {
                            this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                        } else if (content.CONTENT_TYPE == 5) {
                            this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                        } else if (content.CONTENT_TYPE == 6) {
                            this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                        }
                        else if (content.CONTENT_TYPE == 7) {
                            this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                        } else if (this.isExpired == 2) {
                            //Please add error message accordingly.
                        }
                    } else {
                        this.isBuyNowPopup = true;
                        let body = document.getElementsByTagName('body')[0];
                        body.classList.add("body-overflow");
                    }
                }
                else if (this.isTrialBased == 1 && this.isSubscribed == 0) {
                }
                else if (this.isTrialBased == 1 && this.isSubscribed == 1) {
                    if (content.VISIBILITY == 0) {
                        if (content.CONTENT_TYPE == 3) {
                            this._router.navigate(['/test/' + content.CONTENT_UUID]);
                        } else if (content.CONTENT_TYPE == 2) {
                            this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                        } else if (content.CONTENT_TYPE == 1) {
                            this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                        } else if (content.CONTENT_TYPE == 4) {
                            this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                        } else if (content.CONTENT_TYPE == 5) {
                            this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                        } else if (content.CONTENT_TYPE == 6) {
                            this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                        }
                        else if (content.CONTENT_TYPE == 7) {
                            this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                        } else if (this.isExpired == 2) {
                            //Please add error message accordingly.
                        }
                    } else {
                        if (content.VISIBILITY == 0) {
                            this.UpdateSeenContent(content, sectionindex, contentIndex);
                            if (content.CONTENT_TYPE == 3) {
                                this._router.navigate(['/test/' + content.CONTENT_UUID]);
                            } else if (content.CONTENT_TYPE == 2) {
                                this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                            } else if (content.CONTENT_TYPE == 1) {
                                this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                            } else if (content.CONTENT_TYPE == 4) {
                                this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                            } else if (content.CONTENT_TYPE == 5) {
                                this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                            } else if (content.CONTENT_TYPE == 6) {
                                // this.openLinkedBasedTest(content.PATH,content.CONTENT_UUID);
                                this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                            }
                            else if (content.CONTENT_TYPE == 7) {
                                this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                            }
                        } else {
                            if (this.courseDetails['START_DATE_TIME']) {
                                let startDate = new Date(this.courseDetails['START_DATE_TIME']);
                                let startTime = startDate.getTime();
                                let currentTime = new Date().getTime();
                                if (currentTime < startTime) {
                                    this.isCourseNotLivePopup = true;
                                    let body = document.getElementsByTagName('body')[0];
                                    body.classList.add("body-overflow");
                                } else {
                                    this.isBuyNowPopup = true;
                                    let body = document.getElementsByTagName('body')[0];
                                    body.classList.add("body-overflow");
                                }
                            }
                        }
                    }
                }
                else if (this.isTrialBased == 1 && this.isSubscribed == 2) {
                    if (content.VISIBILITY == 0) {
                        this.UpdateSeenContent(content, sectionindex, contentIndex);
                        if (content.CONTENT_TYPE == 3) {
                            this._router.navigate(['/test/' + content.CONTENT_UUID]);
                        } else if (content.CONTENT_TYPE == 2) {
                            this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                        } else if (content.CONTENT_TYPE == 1) {
                            this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                        } else if (content.CONTENT_TYPE == 4) {
                            this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                        } else if (content.CONTENT_TYPE == 5) {
                            this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                        } else if (content.CONTENT_TYPE == 6) {
                            // this.openLinkedBasedTest(content.PATH,content.CONTENT_UUID);
                            this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                        }
                        else if (content.CONTENT_TYPE == 7) {
                            this._router.navigate(['/viewer/' + content.CONTENT_UUID]);
                        }
                    } else {


                        this.isBuyNowPopup = true;
                        let body = document.getElementsByTagName('body')[0];
                        body.classList.add("body-overflow");
                    }
                }

            }
            else {
                if (!this.withoutToken) {
                    this.dataConf['type'] = 2;
                    this.dataConf['msg'] = "Error";
                    this.dataConf['error_msg'] = "Please enroll to view this course";
                    this.openConfirmation = true;
                }
            }
        }
    }

    UpdateSeenContent(content, sectionindex, contentIndex) {
        if (content.SEEN == '0') {
            var Courseseen = {};
            Courseseen['token'] = this._constantService.getSessionDataBYKey('token');
            Courseseen['token_param'] = {};
            Courseseen['token_param']['device_type'] = 'w';
            Courseseen['token_param']['host'] = '';
            Courseseen['cors_uuid'] = this.corsUuid;
            Courseseen['cntnt_uuid'] = content.CONTENT_UUID;
            Courseseen['cntnt_typ'] = content.CONTENT_TYPE;
            if (content.CONTENT_TYPE == 2 && (content.REMAIN == null || content.REMAIN == 0)) {
                Courseseen['remain'] = 1;
            } else {
                Courseseen['remain'] = content.REMAIN;
            }




            this._constantService.fetchDataApi(this._constantService.getCourseSeentUpdateServiceUrl(), Courseseen).subscribe(data => {
                var responseData:any = data;
                var status = responseData.STATUS;
                if (status == 'success') {
                    this.contents[sectionindex].sectionContents[contentIndex].SEEN = "1";
                }
            });
        }
    }

    // var parent = document.querySelector('#testResult');
    //
    // testResult.addEventListener('click', function(){
    //
    //        event.stopPropagation();
    //        this.showResultPopup = !this.showResultPopup;
    //  });
    showResult(clickedSection, id, type) {

        event.stopPropagation();
        this.contentTestUuid = id;
        this.quizType = type;
        this.courseReport = clickedSection;
        this.showResultPopup = !this.showResultPopup;

    }
    hideReportPopup() {
        this.showResultPopup = false;
    }



    mentorDataFun() {
        return this.mentorData;
    }



    changefollow(FOLLOW_STATUE, mentorIndex) {

        if (FOLLOW_STATUE == 0) {
            var requestFollow = {};
            requestFollow['token'] = this._constantService.getSessionDataBYKey('token');
            requestFollow['token_param'] = {};
            requestFollow['token_param']['device_type'] = 'w';
            requestFollow['token_param']['host'] = '';
            requestFollow['conrecid'] = this.mentorData[mentorIndex].USER_ID;

            this._constantService.fetchDataApi(this._constantService.getRequestFollowServiceUrl(), requestFollow).subscribe(data => {
                var responseData:any = data;
                var status = responseData.STATUS;
                if (status == "success") {
                    this.followvalue = true;
                    this.mentorData[mentorIndex].IS_FOLLOW = 1;
                    this.mentorDataFun();
                }
            });
        }
        else {

            var requestUnfollow = {};
            requestUnfollow['token'] = this._constantService.getSessionDataBYKey('token');
            requestUnfollow['token_param'] = {};
            requestUnfollow['token_param']['device_type'] = 'w';
            requestUnfollow['token_param']['host'] = '';
            requestUnfollow['conrecid'] = this.mentorData[mentorIndex].USER_ID;




            this._constantService.fetchDataApi(this._constantService.getRequestUnfollowServiceUrl(), requestUnfollow).subscribe(data => {
                var responseData:any = data;
                var status = responseData.STATUS;
                if (status == this._constantService.success_msg) {
                    this.followvalue = false;
                    this.mentorData[mentorIndex].IS_FOLLOW = 0;
                    this.mentorDataFun();
                }
            });

        }

    }


    miliSecTodateConvertar(milliseconds) {
        let d = new Date(milliseconds);
        let p = d.toString();
        let Q = p.split("G");
        return Q[0];
    }

    setliveStreaduration(duration) {
        if (duration > 59) {
            let h = Math.floor(duration / 60);
            let min = duration % 60;
            return h + "h" + " " + min + "m";
        }
        else {
            return duration + "m";
        }
    }

    seeMoreMentor() {
        this.isSeeMoreMentor = false;
    }

    getLiveStreamStatus() {
        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";




        this._constantService.fetchDataApi(this._constantService.getCheckLiveStreamServiceUrl(), hitObj).subscribe(data => {
            var responseData:any = data;
            if (responseData.STREAM_FLAG) {
                this._constantService.setSessionJsonPair('STREAM_FLAG', responseData.STREAM_FLAG);
            }

        }), error => {
            var err = error;
            if (err.status == 500) {
                this._router.navigate(['500']);
            }
        };
    }

    enrollBtnHandler() {
        this.isBuyNowPopup = false;
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
        /*This code reffering to the main enroll button on course post.*/
        let buttonRef = (<HTMLInputElement>document.getElementById('enrollButton'));
        if (buttonRef) {
            buttonRef.click();
        }
    }

    buyNowPopupHandler() {
        this.isBuyNowPopup = false;
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }

    notLivePopupHandler() {
        this.isCourseNotLivePopup = false;
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }

    updateProfilePic(event) {
        event.target.src = this._constantService.defaultPageCollgImgPath;
    }

    loginpopupopen() {
        this.courseData['USER_FULL_NAME'] = this.courseTitle;
        this.courseData['PROFILE_PIC_PATH'] = this.corsCoverPath;
        this.openLoginPopup = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
        this._constantService.setSessionJsonPair('publicClickedURL', 'course/' + this.CorsUrl);
    }

    closeLoginPopUp(event) {
        this.openLoginPopup = false;
        if (event['LOGIN']) {
            // this.withoutToken = false;
            //this._constantService.setPublicClickedUrl('course/' + this.Corsid);
            this._constantService.setSessionJsonPair('publicClickedURL', 'course/' + this.CorsUrl);
        }
    }
    buyNow() {
        this.router.navigate(['payment/' + this.arr['COURSE_DETAIL']['COURSE_UUID']]);

    }
}
