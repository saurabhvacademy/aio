import { Component, HostListener, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConstantService } from './../../../services/constant.service';
import { PostdataService } from './../../../services/postdata.service';
import { EncryptionService } from './../../../services/encryption.service';
import { PerfectScrollbarComponent, PerfectScrollbarDirective, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
declare var $: any;
declare var CKEDITOR: any;
declare var MathJax: any;


@Component({
    selector: 'app-testpage',
    templateUrl: './testpage.component.html',
    styleUrls: ['./testpage.component.scss']
})
export class TestpageComponent implements OnInit {
    courseUrl: any;
    completeDataLoaded: boolean = false;
    config: any;
    savedCurrentQuestion: any;
    isResumedTest: boolean = false;
    savedTimeRemaining: any;
    savedQuesStatus: any;
    savedTimeString: any;
    savedResponses: any;
    ContentUUID: any;
    remain: number = 1;
    hideSubjectTitle: boolean = false;
    hideNextButton: boolean = false;
    quesStartTime = 0;
    quesSaveTime = 0;
    timeTakenStr: string = '';
    timeTakenArray = [];
    oldId: string = '';
    activeDoCheck: boolean = false;
    isSubmitted = 0;
    scoreStatus: string = '';
    attemptedStatus: any = '';
    percentageStatus: any = '';
    accuracyStatus: any = '';
    speedStatus: any = '';
    timeStatus: any = '';
    activeLangQuesArr = [];
    groupedQuesMapingArr = [];
    statusArray = [];
    responseArray = [];
    displayId: any;
    otherLangQues: boolean = false;
    testS3Path: string;
    reviewedQuesCount: any = 0;
    skippedQuesCount: any = 0;
    unattemptedQuesCount: any = 0;
    attemptedQuesCount: any = 0;
    timeRemaining: any = 0;
    countDisplay = '';
    count = 0;
    secondLeft = 0;
    minuteLeft = 0;
    hoursLeft = 0;
    reportAccuracy: any = 0;
    reportTestMarks: any = 0;
    reportPercentage: any = 0;
    reportTotalMarks: any = 0;
    reportQuesAttempted: any = 0;
    reportTimeTaken: any = 0;
    reportSpeed: any = 0;
    reportQuesCount: any = 0;
    selMatMaxOpt1 = [];
    selMatMaxOpt2 = [];
    selMatMaxOpt3 = [];
    selMatMaxOpt4 = [];
    selMatMaxOpt5 = [];
    selMatMaxOpt6 = [];
    matchOption1 = "";
    matchOption2 = "";
    matchOption3 = "";
    matchOption4 = "";
    matchOption5 = "";
    matchOption6 = "";
    multipleResponseAns = [];
    statusStr: String = '';
    responseStr: String = '';
    testAnalyticsShow: boolean = false;
    blankCounts = 0;
    dropdownAns = [];
    essayText = '';
    isEssayAssociated: boolean = false;
    hideBackBtn: boolean = false;
    hideSkipBtn: boolean = false;
    opt1_text = '';
    opt2_text = '';
    opt3_text = '';
    opt4_text = '';
    opt5_text = '';
    opt6_text = '';
    opt7_text = '';
    opt8_text = '';
    opt9_text = '';
    opt10_text = '';
    opt11_text = '';
    opt12_text = '';
    quesTyp: number;
    quesTypName = ''
    questionText = '';
    groupedQuesArr = [];
    ckeditorReadonly: boolean = true;
    hintText = '';
    isHintProvided: boolean = false;
    activeQuesIndex = 0
    activeQuestion = 1;
    optImg12: boolean;
    option_image12_url: string = '';
    optImg11: boolean = false;
    option_image11_url: string = '';
    optImg10: boolean = false;
    option_image10_url: string = '';
    optImg9: boolean = false;
    option_image9_url: string = '';
    optImg8: boolean = false;
    option_image8_url: string = '';
    optImg7: boolean = false;
    option_image7_url: string = '';
    optImg6: boolean = false;
    option_image6_url: string = '';
    optImg5: boolean = false;
    option_image5_url: string = '';
    optImg4: boolean = false;
    option_image4_url: string = '';
    optImg3: boolean = false;
    option_image3_url: string = '';
    optImg2: boolean = false;
    option_image2_url: string = '';
    optImg1: boolean = false;
    option_image1_url: string = '';
    showSolImg: boolean = false;
    image_upload_solution_url: string = '';
    showHintImg: boolean = false;
    image_upload_hint_url: string = '';
    quesImage: boolean = false;
    image_upload_question_url: string = '';
    bucketUuid = '';
    bucketPath = '';
    newOptionAdded: number = 0;
    rytMarks: any = 0;
    negMarks: any = 0;
    questionArr = {};
    essayArr = [];
    testData: any;
    sectionArr = [];
    languageArr = [];
    subjectArr = [];
    visibleSubject = '';
    visibleSubjectId = '';
    visibleLang = '';
    visibleLangId = '';
    totalMarks: any = 0;
    quesCount: any = 0;
    testDuration: any = 0;
    testLanguage: any = '';
    testName: any = '';
    sectionId: any = '';
    pageId: any = '';
    courseId: any = '';
    contentId: any = '';
    timer: any;

    lang_list: boolean = false;
    ques_pallet_list: boolean = true;
    ques_pallet_grid: boolean = false;
    popupToggle: boolean = true;

    dataConf = {};
    openConfirmation: boolean = false;
    visibilityTopic = "Select Topic";
    visibilityTypTopic = 3;
    walldropdownTopic: boolean = false;
    visibilityAns = "Select Answer";
    visibilityTypAns = 3;
    walldropdownAns: boolean = false;
    instructionSec: boolean = true;
    answerhint: boolean = false;
    pauseTestSec: boolean;
    SubmitTest: boolean = false;
    IntroInfoTog: boolean = false;
    MobileViewTest: boolean = false;
    ToggleQuesPalletMob: boolean = false;
    arrowDirection: boolean = false;
    popupToggleMob: boolean = false;
    @ViewChild(PerfectScrollbarDirective) directiveRef?: PerfectScrollbarDirective;
    @ViewChild('scrolltoTop') scrolltoTop: PerfectScrollbarComponent;
    fileLoading: boolean;
    preloader = true;
    hidePrevious = false;
    buttonClicked: any = -1;
    lastSubumitResponse: {};
    saveUpdateTimeInterval: NodeJS.Timeout;
    constructor(
        private _constantService: ConstantService,
        private _postData: PostdataService,
        private _encryptData: EncryptionService,
        private _router: Router,
        private activatedRoute: ActivatedRoute
    ) { }
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (window.innerWidth <= 992) {
            this.MobileViewTest = false;

        } else {
            this.MobileViewTest = true;

        }
        if (window.innerWidth < 768) {
            this.popupToggleMob = true;
        } else {
            this.popupToggleMob = false;
        }
    }
    showMobileView() {
        if (window.innerWidth <= 992) {
            this.MobileViewTest = false;
        } else {
            this.MobileViewTest = true;

        }
        if (window.innerWidth < 768) {
            this.popupToggleMob = true;
        } else {
            this.popupToggleMob = false;
        }
    }


    ngOnInit() {
        
        this.showMobileView();
        this.activatedRoute.params.subscribe((params: Params) => {
            if (params["id"] != null) {
                this.contentId = params['id'];
                this.getTestDetail();
            }
            this.activeDoCheck = true;
        });
        
    }

    ngDocheck() {
        if (this.activeDoCheck) {
            console.log(this.oldId);
            if (this.oldId == '') {
                this.oldId = this.contentId;
            } else if (this.oldId != this.contentId) {
                console.log('uuid changed');
                this.oldId = this.contentId;
                this.ngOnInit();
            }
        }
    }


    ShowToggleTestInfo() {
        if (this.IntroInfoTog == false) {
            this.IntroInfoTog = true;
        } else {
            this.IntroInfoTog = false;
        }
    }
    ShowQuesPalletMob() {
        if (this.ToggleQuesPalletMob == false) {
            this.ToggleQuesPalletMob = true;
        } else {
            this.ToggleQuesPalletMob = false;
        }
    }
    hideQuesList() {
        this.ToggleQuesPalletMob = false;
    }
    hintfun() {
        this.answerhint = !this.answerhint;
        setTimeout(() => {
            MathJax.Hub.Typeset();
        }, 1000);
    }

    showwalldropdownAns() {
        this.walldropdownAns = !this.walldropdownAns;
    }


    showwalldropdownTopic() {
        this.walldropdownTopic = !this.walldropdownTopic;
    }

    showMenu() {
        this.popupToggle = !this.popupToggle;
        if (this.popupToggle) {
            this.getTestContentStatus();
        }
    }

    popupToggleOpen() {
        //this.popupToggle = !this.popupToggle;
        this.popupToggle = false;

    }

    show_lang_list() {
        if (this.lang_list == false) {
            this.lang_list = true;
        } else {
            this.lang_list = false;
        }
    }


    showTest() {
        if (this.isSubmitted == 1) {
            this._router.navigate(['/test/testsolution/' + this.contentId]);
        } else {
            this.fileLoading = true;

            this.getEncTestDataS3();
            // this.instructionSec = !this.instructionSec;
            // this.popupToggle = false;
        }
    }

    toggle_ques_pallet() {
        if (this.ques_pallet_list == false && this.ques_pallet_grid == true) {
            this.ques_pallet_grid = false;
            this.ques_pallet_list = true;
        } else {
            this.ques_pallet_grid = true;
            this.ques_pallet_list = false;
        }
        setTimeout(() => {
            MathJax.Hub.Typeset();
        }, 500);
        document.getElementById('quizQuestionBubblesContainer').scrollTo(0,0);
    }

    dragDiv(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    sessionExpire(event) {
        if (event) {
            this.dataConf['type'] = 4;
            this.dataConf['msg'] = "Session Expire";
            this.dataConf['error_msg'] = "Session Expired";
            this.openConfirmation = true;
        }
    }

    closePopup(event) {
        this.openConfirmation = false;
    }

    getTestDetail() {
        this.instructionSec = true;
        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";
        hitObj['cntnt_uuid'] = this.contentId;
        this.preloader = true;

        this._constantService.fetchDataApi(this._constantService.getTestDetailsServiceUrl(), hitObj).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            var testData = responseData.Test_Details;
            if (status == this._constantService.success_msg) {
                this.ContentUUID = responseData.CONTENT_UUID;
                this.courseId = testData.COURSE_UUID;
                this.pageId = testData.PAGE_UUID;
                this.sectionId = testData.SECTION_UUID;
                this.testName = this._postData.decodeURIPostData(testData.TEST_NAME);
                this.testLanguage = testData.LANGUAGE;
                this.testDuration = testData.DURATION;
                this.quesCount = testData.QUESTION_COUNT;
                this.totalMarks = testData.TOTAL_MARKS;
                this.isSubmitted = responseData.IS_SUBMITTED;
                this.testS3Path = testData.PATH + '/' + this.contentId + '/' + this.contentId + '_w.txt';
                this.preloader = false;

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

    getTestContentStatus() {
        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";
        hitObj['cors_uuid'] = this.courseId;

        this._constantService.fetchDataApi(this._constantService.getTestContentStatusServiceUrl(), hitObj).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            var testData = responseData.Test_Details;
            if (status == this._constantService.success_msg) {
                if (responseData.CONTENT.length != 0) {
                    this.sectionArr = responseData.CONTENT;
                    this.sectionArr.forEach(section => {
                        section.SECTION_TITLE = this._postData.decodeURIPostData(section.SECTION_TITLE);
                        var secContent = section.SECTION_CONTENT_DATA;
                        secContent.forEach(content => {
                            content.TITLE = this._postData.decodeURIPostData(content.TITLE);
                        })
                    });
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

    goToCourseContent(contentTyp, contentUUID) {
        if (contentTyp == 3) {
            this._router.navigate(['/test/' + contentUUID]);
        } else {
            this._router.navigate(['/viewer/' + contentUUID]);
        }
    }

    getEncTestDataS3() {
        if(this.saveUpdateTimeInterval){
            clearInterval(this.saveUpdateTimeInterval);
        }
        this.saveUpdateTimeInterval=setInterval(()=>{
            this.saveUpdateTime();
        },15000);

        $.get(this.testS3Path)
            .done((data) => {
                this.instructionSec = !this.instructionSec;
                this.popupToggle = false;
                this.setTestDataS3(data);
                this.fileLoading = false;
                
            })
            .fail(function () {
                alert('File download failed!');
                return false;
            });
    }

    setTestDataS3(data) {
        if (data) {
            this.addTestToUser();
            this.testData = this._encryptData.decryptTest(data);
            this.testData = this._encryptData.decrypt(this.testData);
            this.testData = JSON.parse(this.testData);
            this.languageArr = this.testData.LANGUAGE;
            if (this.languageArr) {
                this.languageArr.forEach(obj => {
                    if (obj.LANGUAGE == this.testLanguage) {
                        obj['VISIBILITY'] = true;
                        this.visibleLang = obj.LANGUAGE;
                        this.visibleLangId = obj.LANG_ID;
                    } else {
                        obj['VISIBILITY'] = false;
                    }
                    this.questionArr[obj.LANG_ID] = [];
                    this.groupedQuesArr[obj.LANG_ID] = [];
                });
            }

            this.subjectArr = this.testData.SUBJECT;
            if (this.subjectArr) {
                this.subjectArr.forEach(obj => {
                    obj['VISIBILITY'] = false;
                });
            }
            if (this.subjectArr.length == 1) {
                this.hideSubjectTitle = true;
            }

            var essayArr = this.testData.ESSAY_DATA;
            if (essayArr) {
                essayArr.forEach(Obj => {
                    var essayId = Obj.ESSAY_ID;
                    var essayList = Obj.ESSAY;
                    essayList.forEach(essayLang => {
                        var essayObj = {};
                        essayObj['ESSAY_ID'] = essayId;
                        essayObj['LANG_ID'] = essayLang.LANG_ID;
                        essayObj['TEXT'] = this._postData.decodeURIPostData(essayLang.TEXT);
                        this.essayArr.push(essayObj);
                    });
                });
            }

            var questionArr = this.testData.QUESTIONS;
            if (questionArr) {
                questionArr.forEach(questionObj => {
                    var langFlagArr = [];
                    var quesId = questionObj.QSTN_ID;
                    var subId = questionObj.SUB;
                    var quesList = questionObj.QSTN;
                    quesList.forEach(quesLang => {
                        var QuesObj = {};
                        QuesObj['QSTN_ID'] = quesId;
                        QuesObj['SUB_ID'] = subId;
                        QuesObj['ESSAY_ID'] = quesLang.ESSAY_ID;
                        QuesObj['FPATH'] = quesLang.FPATH;
                        QuesObj['HINT'] = quesLang.HINT;
                        QuesObj['LANG_ID'] = quesLang.LANG_ID;
                        QuesObj['NEGATIVE_MARKS'] = quesLang.NEGATIVE_MARKS;
                        QuesObj['RIGHT_MARKS'] = quesLang.RIGHT_MARKS;
                        QuesObj['TEXT'] = this._postData.decodeURIPostData(quesLang.TEXT);
                        QuesObj['STATIC_TEXT'] = this._postData.pastedDataStrippingByData(QuesObj['TEXT']).slice(0, 100);
                        QuesObj['UUID'] = quesLang.UUID;
                        QuesObj['TYPE'] = quesLang.TYPE;
                        QuesObj['TYPE_OPTIONS'] = quesLang.TYPE_OPTIONS;
                        QuesObj['DIMENSION_QST'] = quesLang.DIMENSION;
                        QuesObj['STATUS'] = 'U';
                        QuesObj['ANSWER'] = '';
                        QuesObj['TIME_TAKEN'] = 0;
                        this.questionArr[quesLang.LANG_ID].push(QuesObj);
                        langFlagArr.push(QuesObj['LANG_ID']);
                    });
                    this.languageArr.forEach(lang => {
                        var index = langFlagArr.indexOf(lang.LANG_ID);
                        if (index == -1) {
                            this.questionArr[lang.LANG_ID].push({});
                        }
                    });
                });
            }

            this.setGroupedQues();
        }
    }


    addTestToUser() {
        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";
        hitObj['cntnt_uuid'] = this.contentId;
        hitObj['cors_uuid'] = this.courseId;

        this._constantService.fetchDataApi(this._constantService.getAddTestUserServiceUrl(), hitObj).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {

                this.savedResponses = responseData.RESPONSES;
                this.savedTimeString = responseData.QSTN_TIME_TAKEN;
                this.savedQuesStatus = responseData.REVIEW_STATUS;
                this.savedTimeRemaining = responseData.TIME_REMAINING;
                this.savedCurrentQuestion = responseData.CURRENT_QSTN;

                if (this.savedTimeRemaining) {
                    this.testTimer(parseInt(this.savedTimeRemaining));
                    this.isResumedTest = true;
                } else {
                    this.testTimer(this.testDuration * 60);
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

    testTimer(timeLeft) {
        this.timeRemaining = timeLeft;
        this.quesStartTime = this.timeRemaining;
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.timer = setInterval(() => {
            this.timeRemaining = timeLeft;
            this.hoursLeft = Math.floor((timeLeft % (60 * 60 * 24)) / (60 * 60));
            this.minuteLeft = Math.floor((timeLeft % (60 * 60)) / (60));
            this.secondLeft = Math.floor((timeLeft % (60)));
            var hours;
            var minutes;
            var seconds;
            if (this.hoursLeft < 10) {
                hours = '0' + this.hoursLeft.toString();
            } else {
                hours = this.hoursLeft.toString();
            }
            if (this.minuteLeft < 10) {
                minutes = '0' + this.minuteLeft.toString();
            } else {
                minutes = this.minuteLeft.toString();
            }
            if (this.secondLeft < 10) {
                seconds = '0' + this.secondLeft.toString();
            } else {
                seconds = this.secondLeft.toString();
            }

            this.countDisplay = hours + ':' + minutes + ':' + seconds;
            timeLeft--;
            if (timeLeft <= 0) {
                clearInterval(this.timer);
                this.submitTest();
                this.countDisplay = "Submitted!";
            }
        }, 1000);
    }

    setGroupedQues() {
        var groupedArrIndex = 0;
        this.subjectArr.forEach((sub) => {
            var isIndexSet = false;
            this.questionArr[this.visibleLangId].forEach((ques, index) => {
                if (!(Object.entries(ques).length === 0 && ques.constructor === Object)) {
                    if (ques.SUB_ID == sub.KEY) {
                        if (!isIndexSet) {
                            sub['FIRST_INDEX'] = groupedArrIndex;
                            isIndexSet = true;
                        }
                        this.timeTakenArray.push(0);
                        this.responseArray.push(0);
                        this.statusArray.push('U');
                        this.groupedQuesMapingArr.push(index);
                        groupedArrIndex++;
                        this.groupedQuesArr[this.visibleLangId].push(ques);
                    }
                } else {
                    this.languageArr.forEach(lang => {
                        var quesObj = this.questionArr[lang.LANG_ID][index];
                        if (!(Object.entries(quesObj).length === 0 && quesObj.constructor === Object)) {
                            if (quesObj.SUB_ID == sub.KEY) {
                                if (!isIndexSet) {
                                    sub['FIRST_INDEX'] = groupedArrIndex;
                                    isIndexSet = true;
                                }
                                this.timeTakenArray.push(0);
                                this.responseArray.push(0);
                                this.statusArray.push('U');
                                this.groupedQuesMapingArr.push(index);
                                groupedArrIndex++;
                                this.groupedQuesArr[this.visibleLangId].push({});
                            }
                        }
                    });
                }
            });
        });

        this.activeLangQuesArr = this.groupedQuesArr[this.visibleLangId];

        if (this.responseStr == '') {
            this.responseStr = this.responseArray.join('$');
        }
        if (this.statusStr == '') {
            this.statusStr = this.statusArray.join('$')
        }
        if (this.timeTakenStr == '') {
            this.timeTakenStr = this.timeTakenArray.join('$');
        }

        this.allLangGroupFxn();
    }

    allLangGroupFxn() {
        this.languageArr.forEach(lang => {
            if (lang.LANG_ID != this.visibleLangId) {
                for (var i = 0; i < this.groupedQuesMapingArr.length; i++) {
                    var originalIndex = this.groupedQuesMapingArr[i];
                    this.groupedQuesArr[lang.LANG_ID].push(this.questionArr[lang.LANG_ID][originalIndex]);
                }
            }
        });

        setTimeout(() => {
            if (this.isResumedTest) {
                this.responseStr = this.savedResponses;
                if (this.responseStr != '') { this.responseArray = this.responseStr.split('$') };

                this.statusStr = this.savedQuesStatus;
                if (this.statusStr != '') {
                    this.statusArray = this.statusStr.split('$');
                    this.activeLangQuesArr.forEach((ques, index) => {
                        ques.STATUS = this.statusArray[index];
                    });
                }

                this.timeTakenStr = this.savedTimeString;
                if (this.timeTakenStr != '') {
                    this.timeTakenArray = this.timeTakenStr.split('$').map(x => parseInt(x));
                }
                if ((this.savedCurrentQuestion > -1) && (this.savedCurrentQuestion <= this.activeLangQuesArr.length)) {
                    this.activeQuesIndex = this.savedCurrentQuestion - 1;
                    this.completeDataLoaded = true;
                    this.setQuestionData(this.activeQuesIndex);
                }
            } else {
                this.completeDataLoaded = true;
                this.setQuestionData(0);
            }
        }, 300);
    }


    changeVisibilityLang(langId, typ) {
        for (var i = 0; i < this.languageArr.length; i++) {
            if (this.languageArr[i].LANG_ID == langId) {
                this.languageArr[i]['VISIBILITY'] = true;
                this.visibleLang = this.languageArr[i].LANGUAGE;
                this.visibleLangId = this.languageArr[i].LANG_ID;
                this.activeLangQuesArr = this.groupedQuesArr[this.visibleLangId];
                this.setQuestionData(this.activeQuesIndex);
            } else {
                this.languageArr[i]['VISIBILITY'] = false;
            }
        }
        if (typ == 1) {
            this.show_lang_list();
        }
    }

    changeVisibilitySubject(subId, typ) {
        this.subjectArr.forEach(subject => {
            if (subject.KEY == subId) {
                subject.VISIBILITY = true;
                this.visibleSubject = subject.SUB;
                this.visibleSubjectId = subject.KEY;
                if (typ == 1) {
                    this.setQuestionData(subject.FIRST_INDEX);
                }
            } else {
                subject.VISIBILITY = false;
            }
        });
    }

    setQuestionData(index) {
        //        window.scrollTo(0, 0);
        // this.scrolltoTop.directiveRef.scrollToTop(0, 0);
        this.newOptionAdded = 0;
        this.dropdownAns = [];
        this.multipleResponseAns = [];
        this.matchOption1 = "";
        this.matchOption2 = "";
        this.matchOption3 = "";
        this.matchOption4 = "";
        this.matchOption5 = "";
        this.matchOption6 = "";
        this.selMatMaxOpt1 = [];
        this.selMatMaxOpt2 = [];
        this.selMatMaxOpt3 = [];
        this.selMatMaxOpt4 = [];
        this.selMatMaxOpt5 = [];
        this.selMatMaxOpt6 = [];

        if (index < 0 || index >= this.activeLangQuesArr.length) {
            this.dataConf['type'] = 2;
            this.dataConf['msg'] = "Error";
            this.dataConf['error_msg'] = "Action Denied!";
            this.openConfirmation = true;
            return false;
        }
        if (index >= this.activeLangQuesArr.length - 1) {
            this.hideSkipBtn = true;
            this.hideNextButton = true;
        } else if (index < this.activeLangQuesArr.length - 1) {
            this.hideSkipBtn = false;
            this.hideNextButton = false;
        }
        if (index <= 0) {
            this.hideBackBtn = true;
            this.hidePrevious = true;
        } else {
            this.hideBackBtn = false;
            this.hidePrevious = false;
        }

        this.resetData();
        var data = this.activeLangQuesArr[index];
        if (!(Object.entries(data).length === 0 && data.constructor === Object)) {
            switch (parseInt(data.TYPE)) {
                case 1: {
                    this.quesTyp = 1;
                    this.quesTypName = "Multiple Choice Question";
                    break;
                }
                case 2: {
                    this.quesTyp = 2;
                    this.quesTypName = "Multiple Response Question";
                    break;
                }
                case 3: {
                    this.quesTyp = 3;
                    this.quesTypName = "True or False Question";
                    break;
                }
                case 4: {
                    this.quesTyp = 4;
                    this.quesTypName = "Match the following type Question";
                    break;
                }
                case 5: {
                    this.quesTyp = 5;
                    this.quesTypName = "Match Matrix Question";
                    break;
                }
                case 6: {
                    this.quesTyp = 6;
                    this.quesTypName = "Fill in the blanks Question";
                    break;
                }
            }

            if (data.TYPE == '1') {
                var options = (<HTMLInputElement>document.querySelector('input[name="singlechoice"]:checked'));
                if (options) {
                    options.checked = false;
                }
            }
            if (data.TYPE == '2') {
                this.multipleResponseAns = [];
                try {
                    var nodes = document.querySelectorAll('input[name="multipleres"]:checked');
                    var nodesLen = nodes.length;

                    for (var i = 0; i < nodesLen; i++) {
                        (<HTMLInputElement>document.querySelector('input[name="multipleres"]:checked')).checked = false;
                    }
                } catch (err) {
                    console.log(err);
                }

            }
            if (data.TYPE == '3') {
                var options = (<HTMLInputElement>document.querySelector('input[name="trueFalse"]:checked'));
                if (options) {
                    options.checked = false;
                }
            }

            setTimeout(() => {
                var originalIndex = this.groupedQuesMapingArr[index];
                this.activeQuestion = index + 1;
                this.activeQuesIndex = index;

                if (data.UUID != '') {
                    var date = new Date;
                    this.bucketUuid = data.UUID;
                    this.bucketPath = data.FPATH;
                    var dimensions = data.DIMENSION_QST;
                    for (const key in dimensions) {
                        if (dimensions[key] != '' && dimensions[key] != null && dimensions[key] != undefined) {
                            switch (key) {
                                case 'qst': {
                                    this.image_upload_question_url = this.bucketPath + this.contentId + '/' + this.bucketUuid + "/qst.png";
                                    this.quesImage = true;
                                    break;
                                }
                                case 'hint': {
                                    this.image_upload_hint_url = this.bucketPath + this.contentId + '/' + this.bucketUuid + "/hint.png";
                                    this.showHintImg = true;
                                    break;
                                }
                                case 'soln': {
                                    this.image_upload_solution_url = this.bucketPath + this.contentId + '/' + this.bucketUuid + "/sol.png";
                                    this.showSolImg = true;
                                    break;
                                }
                                case 'opt1': {
                                    this.option_image1_url = this.bucketPath + this.contentId + '/' + this.bucketUuid + "/opt1.png";
                                    this.optImg1 = true;
                                    break;
                                }
                                case 'opt2': {
                                    this.option_image2_url = this.bucketPath + this.contentId + '/' + this.bucketUuid + "/opt2.png";
                                    this.optImg2 = true;
                                    break;
                                }
                                case 'opt3': {
                                    this.option_image3_url = this.bucketPath + this.contentId + '/' + this.bucketUuid + "/opt3.png";
                                    this.optImg3 = true;
                                    break;
                                }
                                case 'opt4': {
                                    this.option_image4_url = this.bucketPath + this.contentId + '/' + this.bucketUuid + "/opt4.png";
                                    this.optImg4 = true;
                                    break;
                                }
                                case 'opt5': {
                                    this.option_image5_url = this.bucketPath + this.contentId + '/' + this.bucketUuid + "/opt5.png";
                                    this.optImg5 = true;
                                    break;
                                }
                                case 'opt6': {
                                    this.option_image6_url = this.bucketPath + this.contentId + '/' + this.bucketUuid + "/opt6.png";
                                    this.optImg6 = true;
                                    break;
                                }
                                case 'opt7': {
                                    this.option_image7_url = this.bucketPath + this.contentId + '/' + this.bucketUuid + "/opt7.png";
                                    this.optImg7 = true;
                                    break;
                                }
                                case 'opt8': {
                                    this.option_image8_url = this.bucketPath + this.contentId + '/' + this.bucketUuid + "/opt8.png";
                                    this.optImg8 = true;
                                    break;
                                }
                                case 'opt9': {
                                    this.option_image9_url = this.bucketPath + this.contentId + '/' + this.bucketUuid + "/opt9.png";
                                    this.optImg9 = true;
                                    break;
                                }
                                case 'opt10': {
                                    this.option_image10_url = this.bucketPath + this.contentId + '/' + this.bucketUuid + "/opt10.png";
                                    this.optImg10 = true;
                                    break;
                                }
                                case 'opt11': {
                                    this.option_image11_url = this.bucketPath + this.contentId + '/' + this.bucketUuid + "/opt11.png";
                                    this.optImg11 = true;
                                    break;
                                }
                                case 'opt12': {
                                    this.option_image12_url = this.bucketPath + this.contentId + '/' + this.bucketUuid + "/opt12.png";
                                    this.optImg12 = true;
                                    break;
                                }
                            }
                        }
                    }
                }

                if (data.ESSAY_ID) {
                    this.isEssayAssociated = true;
                    this.essayArr.forEach(essay => {
                        if ((essay.ESSAY_ID == data.ESSAY_ID) && (essay.LANG_ID == data.LANG_ID)) {
                            this.essayText = essay.TEXT;
                        }
                    });
                }

                if (data.TEXT) {
                    this.questionText = this._postData.decodeURIPostData(data.TEXT);
                }

                if (data.HINT) {
                    this.hintText = this._postData.decodeURIPostData(data.HINT);
                } else {
                    this.hintText = "";
                }
                if (this.hintText != '' || this.image_upload_hint_url != '') {
                    this.isHintProvided = true;
                }

                this.quesStartTime = this.timeRemaining;

                this.changeVisibilitySubject(data.SUB_ID, 2);
                //            this.changeVisibilityLang(data.LANG_ID, 2)

                this.negMarks = data.NEGATIVE_MARKS;
                if (this.negMarks.toString() == '0.0') {
                    this.negMarks = 0;
                }
                this.rytMarks = data.RIGHT_MARKS;

                if (data.TYPE == '1' || data.TYPE == '2' || data.TYPE == '4' || data.TYPE == '5') {
                    //if (data.TYPE == 1 || data.TYPE == 2) {
                    if (data.TYPE_OPTIONS.A != null) {
                        this.opt1_text = this._postData.decodeURIPostData(data.TYPE_OPTIONS.A);
                    }
                    if (data.TYPE_OPTIONS.B != null) {
                        this.opt2_text = this._postData.decodeURIPostData(data.TYPE_OPTIONS.B);
                    }
                    if (data.TYPE_OPTIONS.C != null) {
                        this.opt3_text = this._postData.decodeURIPostData(data.TYPE_OPTIONS.C);
                    }
                    if (data.TYPE_OPTIONS.D != null) {
                        this.opt4_text = this._postData.decodeURIPostData(data.TYPE_OPTIONS.D);
                    }
                    if (data.TYPE_OPTIONS.E != '' && data.TYPE_OPTIONS.E != null) {
                        this.addOptions();
                        setTimeout(() => {
                            this.opt5_text = this._postData.decodeURIPostData(data.TYPE_OPTIONS.E);
                        }, 200);
                    }
                    if (data.TYPE_OPTIONS.F != '' && data.TYPE_OPTIONS.F != null) {
                        this.addOptions();
                        setTimeout(() => {
                            this.opt6_text = this._postData.decodeURIPostData(data.TYPE_OPTIONS.F);
                        }, 200);
                    }

                    if (data.TYPE == '4' || data.TYPE == '5') {
                        if (data.TYPE_OPTIONS.P != '' && data.TYPE_OPTIONS.P != null) {
                            this.opt7_text = this._postData.decodeURIPostData(data.TYPE_OPTIONS.P);
                        }
                        if (data.TYPE_OPTIONS.Q != '' && data.TYPE_OPTIONS.Q != null) {
                            this.opt8_text = this._postData.decodeURIPostData(data.TYPE_OPTIONS.Q);
                        }
                        if (data.TYPE_OPTIONS.R != '' && data.TYPE_OPTIONS.R != null) {
                            this.opt9_text = this._postData.decodeURIPostData(data.TYPE_OPTIONS.R);
                        }
                        if (data.TYPE_OPTIONS.S != '' && data.TYPE_OPTIONS.S != null) {
                            this.opt10_text = this._postData.decodeURIPostData(data.TYPE_OPTIONS.S);
                        }
                        if (data.TYPE_OPTIONS.T != '' && data.TYPE_OPTIONS.T != null) {
                            setTimeout(() => {
                                this.opt11_text = this._postData.decodeURIPostData(data.TYPE_OPTIONS.T);
                            }, 200);
                        }
                        if (data.TYPE_OPTIONS.U != '' && data.TYPE_OPTIONS.U != null) {
                            setTimeout(() => {
                                this.opt12_text = this._postData.decodeURIPostData(data.TYPE_OPTIONS.U);
                            }, 200);
                        }
                    }
                } else if (data.TYPE == '6') {
                    var optCount = 0;
                    var blankOptions = [];
                    if (data.TYPE_OPTIONS.P != '' && data.TYPE_OPTIONS.P != null) {
                        this.opt7_text = this._postData.decodeURIPostData(data.TYPE_OPTIONS.P);
                        blankOptions.push(this.opt7_text);
                        optCount++;
                    }
                    if (data.TYPE_OPTIONS.Q != '' && data.TYPE_OPTIONS.Q != null) {
                        this.opt8_text = this._postData.decodeURIPostData(data.TYPE_OPTIONS.Q);
                        blankOptions.push(this.opt8_text);
                        optCount++;
                    }
                    if (data.TYPE_OPTIONS.R != '' && data.TYPE_OPTIONS.R != null) {
                        this.opt9_text = this._postData.decodeURIPostData(data.TYPE_OPTIONS.R);
                        blankOptions.push(this.opt9_text);
                        optCount++;
                    }
                    if (data.TYPE_OPTIONS.S != '' && data.TYPE_OPTIONS.S != null) {
                        this.opt10_text = this._postData.decodeURIPostData(data.TYPE_OPTIONS.S);
                        blankOptions.push(this.opt10_text);
                        optCount++;
                    }
                    if (data.TYPE_OPTIONS.T != '' && data.TYPE_OPTIONS.T != null) {
                        setTimeout(() => {
                            this.opt11_text = this._postData.decodeURIPostData(data.TYPE_OPTIONS.T);
                            blankOptions.push(this.opt11_text);
                            optCount++;
                        }, 200);
                    }
                    if (data.TYPE_OPTIONS.U != '' && data.TYPE_OPTIONS.U != null) {
                        setTimeout(() => {
                            this.opt12_text = this._postData.decodeURIPostData(data.TYPE_OPTIONS.U);
                            blankOptions.push(this.opt12_text);
                            optCount++;
                        }, 200);
                    }

                    setTimeout(() => {
                        var blanksList = document.getElementsByClassName('fillblankposts');
                        if (blanksList) {
                            this.blankCounts = optCount;
                            for (var i = 0; i < blanksList.length; i++) {
                                var ul = document.createElement('ul');
                                ul.id = 'dropdown_' + i;
                                ul.classList.add('fill_in_the_blank');
                                var li = document.createElement("li");
                                var label = document.createElement("label");
                                label.innerText = 'Select Option';
                                label.id = 'default_' + i;
                                label.className = 'labelClass';
                                li.appendChild(label);
                                ul.appendChild(li);
                                var spanOut = document.createElement("span");
                                spanOut.classList.add('option_toggle');
                                spanOut.classList.add('hideList');
                                spanOut.id = 'spanOut_' + i;
                                li.appendChild(spanOut);
                                for (var j = 0; j < optCount; j++) {
                                    var span = document.createElement("span");
                                    span.innerText = blankOptions[j];
                                    span.id = 'opt_' + i + '_' + j;
                                    span.classList.add('dropOptions');
                                    spanOut.appendChild(span);
                                }

                                blanksList[i].innerHTML = "";
                                blanksList[i].appendChild(ul);
                                var field_dom = document.getElementById('dropdown_' + i);
                                field_dom.addEventListener('click', (event) => {
                                    this.changeHandler(event);
                                });
                            }
                        }
                    }, 100);
                }


                data['ANSWER'] = this.responseArray[originalIndex];
                if (data.TYPE == '1') {
                    setTimeout(() => {
                        if (data.ANSWER == 'a') {
                            (<HTMLInputElement>document.getElementById("scqSingle0")).checked = true;
                        }
                        if (data.ANSWER == 'b') {
                            (<HTMLInputElement>document.getElementById("scqSingle1")).checked = true;
                        }
                        if (data.ANSWER == 'c') {
                            (<HTMLInputElement>document.getElementById("scqSingle2")).checked = true;
                        }
                        if (data.ANSWER == 'd') {
                            (<HTMLInputElement>document.getElementById("scqSingle3")).checked = true;
                        }
                        if (data.ANSWER == 'e') {
                            (<HTMLInputElement>document.getElementById("scqSingle4")).checked = true;
                        }
                        if (data.ANSWER == 'f') {
                            (<HTMLInputElement>document.getElementById("scqSingle5")).checked = true;
                        }
                    }, 100);
                }
                if (data.TYPE == '2') {
                    if (data.ANSWER) {
                        var arr = data.ANSWER.split(',');
                        this.multipleResponseAns = arr;
                        setTimeout(() => {
                            for (var i = 0; i < arr.length; i++) {
                                if (arr[i] == "a") {
                                    (<HTMLInputElement>document.getElementById("multiResOpt1")).checked = true;
                                } else if (arr[i] == "b") {
                                    (<HTMLInputElement>document.getElementById("multiResOpt2")).checked = true;
                                } else if (arr[i] == "c") {
                                    (<HTMLInputElement>document.getElementById("multiResOpt3")).checked = true;
                                } else if (arr[i] == "d") {
                                    (<HTMLInputElement>document.getElementById("multiResOpt4")).checked = true;
                                } else if (arr[i] == "e") {
                                    (<HTMLInputElement>document.getElementById("multiResOpt5")).checked = true;
                                } else if (arr[i] == "f") {
                                    (<HTMLInputElement>document.getElementById("multiResOpt6")).checked = true;
                                }
                            }
                        }, 100);
                    }
                }

                if (data.TYPE == '3') {
                    setTimeout(() => {
                        if (data.ANSWER == 'a') {
                            (<HTMLInputElement>document.getElementById("truFlsOpt1")).checked = true;
                        }
                        if (data.ANSWER == 'b') {
                            (<HTMLInputElement>document.getElementById("truFlsOpt2")).checked = true;
                        }
                    }, 100);
                }

                if (data.TYPE == '4') {
                    var optArr = data.ANSWER.split(",");
                    setTimeout(() => {
                        for (var j = 0; j < optArr.length; j++) {
                            if (optArr[j].match("a#")) { this.matchOption1 = optArr[j] };
                            if (optArr[j].match("b#")) { this.matchOption2 = optArr[j] };
                            if (optArr[j].match("c#")) { this.matchOption3 = optArr[j] };
                            if (optArr[j].match("d#")) { this.matchOption4 = optArr[j] };
                            if (optArr[j].match("e#")) { this.matchOption5 = optArr[j] };
                            if (optArr[j].match("f#")) { this.matchOption6 = optArr[j] };
                        }
                    }, 100);
                }

                if (data.TYPE == '5') {
                    this.selMatMaxOpt1 = [];
                    this.selMatMaxOpt2 = [];
                    this.selMatMaxOpt3 = [];
                    this.selMatMaxOpt4 = [];
                    this.selMatMaxOpt5 = [];
                    this.selMatMaxOpt6 = [];
                    var optArr = data.ANSWER.split(",");
                    setTimeout(() => {
                        for (var j = 0; j < optArr.length; j++) {
                            if (optArr[j].match("a#")) { this.selMatMaxOpt1.push(optArr[j]) };
                            if (optArr[j].match("b#")) { this.selMatMaxOpt2.push(optArr[j]) };
                            if (optArr[j].match("c#")) { this.selMatMaxOpt3.push(optArr[j]) };
                            if (optArr[j].match("d#")) { this.selMatMaxOpt4.push(optArr[j]) };
                            if (optArr[j].match("e#")) { this.selMatMaxOpt5.push(optArr[j]) };
                            if (optArr[j].match("f#")) { this.selMatMaxOpt6.push(optArr[j]) };
                        }
                    }, 100);
                }

                if (data.TYPE == '6') {
                    var optArr = data.ANSWER.split(",");
                    setTimeout(() => {
                        for (var j = 0; j < optArr.length; j++) {
                            if (optArr[j]) {
                                this.preSelectBlankAns(optArr[j], data);
                            }
                        }
                    }, 100);
                }
            }, 50);
        } else {
            this.quesStartTime = this.timeRemaining;
            this.activeQuestion = index + 1;
            this.activeQuesIndex = index;
            this.quesTyp = 1;
            this.quesTypName = "Multiple Choice Question";
        }
        setTimeout(() => {
            MathJax.Hub.Typeset();
        }, 500);
    }

    preSelectBlankAns(ansString, data) {
        var pair = ansString.split('#');
        var dropdown = pair[0];
        var selection = pair[1];

        switch (dropdown) {
            case 'a': {
                setTimeout(() => {
                    switch (selection) {
                        case 'p': {
                            (<HTMLScriptElement>document.getElementById('default_0')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.P);
                            this.dropdownAns.push('a#p');
                            break;
                        }
                        case 'q': {
                            (<HTMLScriptElement>document.getElementById('default_0')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.Q);
                            this.dropdownAns.push('a#q');
                            break;
                        }
                        case 'r': {
                            (<HTMLScriptElement>document.getElementById('default_0')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.R);
                            this.dropdownAns.push('a#r');
                            break;
                        }
                        case 's': {
                            (<HTMLScriptElement>document.getElementById('default_0')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.S);
                            this.dropdownAns.push('a#s');
                            break;
                        }
                        case 't': {
                            (<HTMLScriptElement>document.getElementById('default_0')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.T);
                            this.dropdownAns.push('a#t');
                            break;
                        }
                        case 'u': {
                            (<HTMLScriptElement>document.getElementById('default_0')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.U);
                            this.dropdownAns.push('a#u');
                            break;
                        }
                    }
                }, 100);
                break;
            }
            case 'b': {
                setTimeout(() => {
                    switch (selection) {
                        case 'p': {
                            (<HTMLScriptElement>document.getElementById('default_1')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.P);
                            this.dropdownAns.push('b#p');
                            break;
                        }
                        case 'q': {
                            (<HTMLScriptElement>document.getElementById('default_1')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.Q);
                            this.dropdownAns.push('b#q');
                            break;
                        }
                        case 'r': {
                            (<HTMLScriptElement>document.getElementById('default_1')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.R);
                            this.dropdownAns.push('b#r');
                            break;
                        }
                        case 's': {
                            (<HTMLScriptElement>document.getElementById('default_1')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.S);
                            this.dropdownAns.push('b#s');
                            break;
                        }
                        case 't': {
                            (<HTMLScriptElement>document.getElementById('default_1')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.T);
                            this.dropdownAns.push('b#t');
                            break;
                        }
                        case 'u': {
                            (<HTMLScriptElement>document.getElementById('default_1')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.U);
                            this.dropdownAns.push('b#u');
                            break;
                        }
                    }
                }, 100);
                break;
            }
            case 'c': {
                setTimeout(() => {
                    switch (selection) {
                        case 'p': {
                            (<HTMLScriptElement>document.getElementById('default_2')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.P);
                            this.dropdownAns.push('c#p');
                            break;
                        }
                        case 'q': {
                            (<HTMLScriptElement>document.getElementById('default_2')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.Q);
                            this.dropdownAns.push('c#q');
                            break;
                        }
                        case 'r': {
                            (<HTMLScriptElement>document.getElementById('default_2')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.R);
                            this.dropdownAns.push('c#r');
                            break;
                        }
                        case 's': {
                            (<HTMLScriptElement>document.getElementById('default_2')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.S);
                            this.dropdownAns.push('c#s');
                            break;
                        }
                        case 't': {
                            (<HTMLScriptElement>document.getElementById('default_2')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.T);
                            this.dropdownAns.push('c#t');
                            break;
                        }
                        case 'u': {
                            (<HTMLScriptElement>document.getElementById('default_2')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.U);
                            this.dropdownAns.push('c#u');
                            break;
                        }
                    }
                }, 100);
                break;
            }
            case 'd': {
                setTimeout(() => {
                    switch (selection) {
                        case 'p': {
                            (<HTMLScriptElement>document.getElementById('default_3')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.P);
                            this.dropdownAns.push('d#p');
                            break;
                        }
                        case 'q': {
                            (<HTMLScriptElement>document.getElementById('default_3')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.Q);
                            this.dropdownAns.push('d#q');
                            break;
                        }
                        case 'r': {
                            (<HTMLScriptElement>document.getElementById('default_3')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.R);
                            this.dropdownAns.push('d#r');
                            break;
                        }
                        case 's': {
                            (<HTMLScriptElement>document.getElementById('default_3')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.S);
                            this.dropdownAns.push('d#s');
                            break;
                        }
                        case 't': {
                            (<HTMLScriptElement>document.getElementById('default_3')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.T);
                            this.dropdownAns.push('d#t');
                            break;
                        }
                        case 'u': {
                            (<HTMLScriptElement>document.getElementById('default_3')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.U);
                            this.dropdownAns.push('d#u');
                            break;
                        }
                    }
                }, 100);
                break;
            }
            case 'e': {
                setTimeout(() => {
                    switch (selection) {
                        case 'p': {
                            (<HTMLScriptElement>document.getElementById('default_4')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.P);
                            this.dropdownAns.push('e#p');
                            break;
                        }
                        case 'q': {
                            (<HTMLScriptElement>document.getElementById('default_4')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.Q);
                            this.dropdownAns.push('e#q');
                            break;
                        }
                        case 'r': {
                            (<HTMLScriptElement>document.getElementById('default_4')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.R);
                            this.dropdownAns.push('e#r');
                            break;
                        }
                        case 's': {
                            (<HTMLScriptElement>document.getElementById('default_4')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.S);
                            this.dropdownAns.push('e#s');
                            break;
                        }
                        case 't': {
                            (<HTMLScriptElement>document.getElementById('default_4')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.T);
                            this.dropdownAns.push('e#t');
                            break;
                        }
                        case 'u': {
                            (<HTMLScriptElement>document.getElementById('default_4')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.U);
                            this.dropdownAns.push('e#u');
                            break;
                        }
                    }
                }, 100);
                break;
            }
            case 'f': {
                setTimeout(() => {
                    switch (selection) {
                        case 'p': {
                            (<HTMLScriptElement>document.getElementById('default_5')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.P);
                            this.dropdownAns.push('f#p');
                            break;
                        }
                        case 'q': {
                            (<HTMLScriptElement>document.getElementById('default_5')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.Q);
                            this.dropdownAns.push('f#q');
                            break;
                        }
                        case 'r': {
                            (<HTMLScriptElement>document.getElementById('default_5')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.R);
                            this.dropdownAns.push('f#r');
                            break;
                        }
                        case 's': {
                            (<HTMLScriptElement>document.getElementById('default_5')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.S);
                            this.dropdownAns.push('f#s');
                            break;
                        }
                        case 't': {
                            (<HTMLScriptElement>document.getElementById('default_5')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.T);
                            this.dropdownAns.push('f#t');
                            break;
                        }
                        case 'u': {
                            (<HTMLScriptElement>document.getElementById('default_5')).innerText = this._postData.decodeURIPostData(data.TYPE_OPTIONS.U);
                            this.dropdownAns.push('f#u');
                            break;
                        }
                    }
                }, 100);
                break;
            }
        }
    }

    submitBlanks(dropdown, selection) {
        switch (dropdown) {
            case '0': {
                for (var i = 0; i < this.dropdownAns.length; i++) {
                    if (this.dropdownAns[i].match("a#")) {
                        this.dropdownAns.splice(i, 1);
                    }
                }
                setTimeout(() => {
                    switch (selection) {
                        case '0': {
                            this.dropdownAns.push('a#p');
                            break;
                        }
                        case '1': {
                            this.dropdownAns.push('a#q');
                            break;
                        }
                        case '2': {
                            this.dropdownAns.push('a#r');
                            break;
                        }
                        case '3': {
                            this.dropdownAns.push('a#s');
                            break;
                        }
                        case '4': {
                            this.dropdownAns.push('a#t');
                            break;
                        }
                        case '5': {
                            this.dropdownAns.push('a#u');
                            break;
                        }
                    }
                }, 200);
                break;
            }
            case '1': {
                for (var i = 0; i < this.dropdownAns.length; i++) {
                    if (this.dropdownAns.toString().match("b#")) {
                        this.dropdownAns.splice(i, 1);
                    }
                }
                setTimeout(() => {
                    switch (selection) {
                        case '0': {
                            this.dropdownAns.push('b#p');
                            break;
                        }
                        case '1': {
                            this.dropdownAns.push('b#q');
                            break;
                        }
                        case '2': {
                            this.dropdownAns.push('b#r');
                            break;
                        }
                        case '3': {
                            this.dropdownAns.push('b#s');
                            break;
                        }
                        case '4': {
                            this.dropdownAns.push('b#t');
                            break;
                        }
                        case '5': {
                            this.dropdownAns.push('b#u');
                            break;
                        }
                    }
                }, 200);
                break;
            }
            case '2': {
                for (var i = 0; i < this.dropdownAns.length; i++) {
                    if (this.dropdownAns.toString().match("c#")) {
                        this.dropdownAns.splice(i, 1);
                    }
                }
                setTimeout(() => {
                    switch (selection) {
                        case '0': {
                            this.dropdownAns.push('c#p');
                            break;
                        }
                        case '1': {
                            this.dropdownAns.push('c#q');
                            break;
                        }
                        case '2': {
                            this.dropdownAns.push('c#r');
                            break;
                        }
                        case '3': {
                            this.dropdownAns.push('c#s');
                            break;
                        }
                        case '4': {
                            this.dropdownAns.push('c#t');
                            break;
                        }
                        case '5': {
                            this.dropdownAns.push('c#u');
                            break;
                        }
                    }
                }, 200);
                break;
            }
            case '3': {
                for (var i = 0; i < this.dropdownAns.length; i++) {
                    if (this.dropdownAns.toString().match("d#")) {
                        this.dropdownAns.splice(i, 1);
                    }
                }
                setTimeout(() => {
                    switch (selection) {
                        case '0': {
                            this.dropdownAns.push('d#p');
                            break;
                        }
                        case '1': {
                            this.dropdownAns.push('d#q');
                            break;
                        }
                        case '2': {
                            this.dropdownAns.push('d#r');
                            break;
                        }
                        case '3': {
                            this.dropdownAns.push('d#s');
                            break;
                        }
                        case '4': {
                            this.dropdownAns.push('d#t');
                            break;
                        }
                        case '5': {
                            this.dropdownAns.push('d#u');
                            break;
                        }
                    }
                }, 200);
                break;
            }
            case '4': {
                for (var i = 0; i < this.dropdownAns.length; i++) {
                    if (this.dropdownAns.toString().match("e#")) {
                        this.dropdownAns.splice(i, 1);
                    }
                }
                setTimeout(() => {
                    switch (selection) {
                        case '0': {
                            this.dropdownAns.push('e#p');
                            break;
                        }
                        case '1': {
                            this.dropdownAns.push('e#q');
                            break;
                        }
                        case '2': {
                            this.dropdownAns.push('e#r');
                            break;
                        }
                        case '3': {
                            this.dropdownAns.push('e#s');
                            break;
                        }
                        case '4': {
                            this.dropdownAns.push('e#t');
                            break;
                        }
                        case '5': {
                            this.dropdownAns.push('e#u');
                            break;
                        }
                    }
                }, 200);
                break;
            }
            case '5': {
                for (var i = 0; i < this.dropdownAns.length; i++) {
                    if (this.dropdownAns.toString().match("f#")) {
                        this.dropdownAns.splice(i, 1);
                    }
                }
                setTimeout(() => {
                    switch (selection) {
                        case '0': {
                            this.dropdownAns.push('f#p');
                            break;
                        }
                        case '1': {
                            this.dropdownAns.push('f#q');
                            break;
                        }
                        case '2': {
                            this.dropdownAns.push('f#r');
                            break;
                        }
                        case '3': {
                            this.dropdownAns.push('f#s');
                            break;
                        }
                        case '4': {
                            this.dropdownAns.push('f#t');
                            break;
                        }
                        case '5': {
                            this.dropdownAns.push('f#u');
                            break;
                        }
                    }
                }, 200);
                break;
            }
        }
    }


    changeHandler(event) {
        var selectedResponse = event.target.id;
        if (selectedResponse && (selectedResponse.search('default_') == -1)) {
            var resValues = selectedResponse.split('_');
            var dropdown = resValues[1];
            var selection = resValues[2];
            (<HTMLScriptElement>document.getElementById('default_' + dropdown)).innerText = (<HTMLScriptElement>document.getElementById('opt_' + dropdown + '_' + selection)).innerText;
            (<HTMLScriptElement>document.getElementById('spanOut_' + dropdown)).classList.toggle('hideList');

            this.submitBlanks(dropdown, selection);
        } else {
            var resValues = selectedResponse.split('_');
            var dropdown = resValues[1];
            (<HTMLScriptElement>document.getElementById('spanOut_' + dropdown)).classList.toggle('hideList');
        }
    }

    resetData() {
        this.quesStartTime = 0;
        this.quesSaveTime = 0;
        this.isEssayAssociated = false;
        this.essayText = '';
        this.questionText = '';
        this.hintText = '';
        this.isHintProvided = false;
        this.answerhint = false;
        this.image_upload_hint_url = '';
        this.image_upload_question_url = '';
        this.option_image12_url = '';
        this.option_image11_url = '';
        this.option_image10_url = '';
        this.option_image9_url = '';
        this.option_image8_url = '';
        this.option_image7_url = '';
        this.option_image6_url = '';
        this.option_image5_url = '';
        this.option_image4_url = '';
        this.option_image3_url = '';
        this.option_image2_url = '';
        this.option_image1_url = '';
    }

    addOptions() {
        if (this.newOptionAdded < 2) {
            this.newOptionAdded = this.newOptionAdded + 1;
        }
    }

    radioBoxUpdate(event) {
    }

    checkboxupdate(event) {
        if (event.target.checked) {
            this.multipleResponseAns.push(event.target.value);
        } else if (!event.target.checked) {
            var index = this.multipleResponseAns.indexOf(event.target.value);
            this.multipleResponseAns.splice(index, 1);
        }
    }

    putResponseFxn(index, typ, buttonTyp, clickedIndex) {
        if (this.preloader) {
            return false;
        }
        this.buttonClicked = buttonTyp;
        this.preloader = true;
        this.ToggleQuesPalletMob = false;
        this.quesSaveTime = this.timeRemaining;
        if (buttonTyp == 0 || buttonTyp == 1) {
            this.remain = this.remain + 1;
        } else if (buttonTyp == 2) {
            this.remain = this.remain - 1;
        }
        // this.UpdateSeenContent(this.remain);
        switch (typ) {
            case 1: {

                var selectedAns = (<HTMLInputElement>document.querySelector('input[name="singlechoice"]:checked'));
                if (selectedAns != null && buttonTyp != 2 && buttonTyp != 0) {
                    this.answerStringFxn(clickedIndex, index, selectedAns.value, 'A', buttonTyp);
                    if ((index + 1) < this.activeLangQuesArr.length && buttonTyp < 2) {
                        (<HTMLInputElement>document.querySelector('input[name="singlechoice"]:checked')).checked = false;
                    }
                } else {
                    this.answerStringFxn(clickedIndex, index, '0', 'S', buttonTyp);
                }
                break;

            }
            case 2: {
                var blankIndex = this.multipleResponseAns.indexOf('');
                if (blankIndex != -1) {
                    this.multipleResponseAns.splice(blankIndex, 1);
                }
                if (this.multipleResponseAns.length != 0 && buttonTyp != 2 && buttonTyp != 0) {
                    var answers = this.multipleResponseAns.join();
                    this.answerStringFxn(clickedIndex, index, answers, 'A', buttonTyp);
                    if ((index + 1) < this.activeLangQuesArr.length && buttonTyp < 2) {
                        if (document.querySelector('input[name="multipleres"]:checked')) {
                            (<HTMLInputElement>document.querySelector('input[name="multipleres"]:checked')).checked = false;

                        }
                    }


                } else {
                    this.answerStringFxn(clickedIndex, index, '0', 'S', buttonTyp);

                }
                break;
            }
            case 3: {
                var selectedAns = (<HTMLInputElement>document.querySelector('input[name="trueFalse"]:checked'));
                if (selectedAns != null && buttonTyp != 2 && buttonTyp != 0) {
                    this.answerStringFxn(clickedIndex, index, selectedAns.value, 'A', buttonTyp);

                    //                    if (this.activeLangQuesArr[index]['STATUS'] != 'R') {
                    //                        this.activeLangQuesArr[index]['STATUS'] = 'A';
                    //                        this.activeLangQuesArr[index]['STATUS'] = 'A';
                    //                    }
                    if ((index + 1) < this.activeLangQuesArr.length && buttonTyp < 2) {
                        (<HTMLInputElement>document.querySelector('input[name="trueFalse"]:checked')).checked = false;
                    }

                } else {
                    this.answerStringFxn(clickedIndex, index, '0', 'S', buttonTyp);
                    //                    if (this.activeLangQuesArr[index]['STATUS'] != 'R') {
                    //                        this.activeLangQuesArr[index]['STATUS'] = 'S';
                    //                        this.activeLangQuesArr[index]['STATUS'] = 'S';
                    //                    }
                }
                break;
            }
            //            case 4: {
            //                var optAns = [];
            //                optAns.push(this.matchOption1, this.matchOption2, this.matchOption3, this.matchOption4);
            //                if (this.newOptionAdded > 0) {
            //                    optAns.push(this.matchOption5);
            //                }
            //                if (this.newOptionAdded > 1) {
            //                    optAns.push(this.matchOption6);
            //                }
            //                var answers = optAns.join();
            //                if (optAns.length != 0 && status == 1) {
            //                    this.answerStringFxn(index, answers, 'A');
            //                    if (this.groupedQuesArr[index]['STATUS'] != 'R') {
            //                        this.groupedQuesArr[index]['STATUS'] = 'A';
            //                    }
            //                } else {
            //                    this.answerStringFxn(index, '0', 'S');
            //                    if (this.groupedQuesArr[index]['STATUS'] != 'R') {
            //                        this.groupedQuesArr[index]['STATUS'] = 'S';
            //                    }
            //                }
            //                if ((index + 1) < this.activeLangQuesArr.length && status != 3) {
            //                    this.setQuestionData(index + 1);
            //                } else if ((index + 1) < this.activeLangQuesArr.length && status == 3) {
            //                    this.setQuestionData(clickedIndex);
            //                }
            //                break;
            //            }
            //            case 5: {
            //                var selectedMatMaxAns = [];
            //                selectedMatMaxAns.push.apply(selectedMatMaxAns, this.selMatMaxOpt1);
            //                selectedMatMaxAns.push.apply(selectedMatMaxAns, this.selMatMaxOpt2);
            //                selectedMatMaxAns.push.apply(selectedMatMaxAns, this.selMatMaxOpt3);
            //                selectedMatMaxAns.push.apply(selectedMatMaxAns, this.selMatMaxOpt4);
            //
            //                if (this.newOptionAdded > 0) {
            //                    selectedMatMaxAns.push.apply(selectedMatMaxAns, this.selMatMaxOpt5);
            //                }
            //                if (this.newOptionAdded > 1) {
            //                    selectedMatMaxAns.push.apply(selectedMatMaxAns, this.selMatMaxOpt6);
            //                }
            //                var answers = selectedMatMaxAns.join();
            //                if (selectedMatMaxAns.length != 0 && status == 1) {
            //                    this.answerStringFxn(index, answers, 'A');
            //                    if (this.questionArr[index]['STATUS'] != 'R') {
            //                        this.questionArr[index]['STATUS'] = 'A';
            //                    }
            //                } else {
            //                    this.answerStringFxn(index, '0', 'S');
            //                    if (this.questionArr[index]['STATUS'] != 'R') {
            //                        this.questionArr[index]['STATUS'] = 'S';
            //                    }
            //                }
            //
            //                if ((index + 1) < this.activeLangQuesArr.length && status != 3) {
            //                    this.setQuestionData(index + 1);
            //                } else if ((index + 1) < this.activeLangQuesArr.length && status == 3) {
            //                    this.setQuestionData(clickedIndex);
            //                }
            //                break;
            //            }
            //            case 6: {
            //                if (this.dropdownAns.length != 0 && status == 1) {
            //                    var answers = this.dropdownAns.join();
            //                    this.answerStringFxn(index, answers, 'A');
            //
            //                    if (this.questionArr[index]['STATUS'] != 'R') {
            //                        this.questionArr[index]['STATUS'] = 'A';
            //                    }
            //                } else {
            //                    this.answerStringFxn(index, '0', 'S');
            //                    if (this.questionArr[index]['STATUS'] != 'R') {
            //                        this.questionArr[index]['STATUS'] = 'S';
            //                    }
            //                }
            //
            //                if ((index + 1) < this.activeLangQuesArr.length && status != 3) {
            //                    this.setQuestionData(index + 1);
            //                } else if ((index + 1) < this.activeLangQuesArr.length && status == 3) {
            //                    this.setQuestionData(clickedIndex);
            //                }
            //                break;
            //            }
        }
        // if (this.hideSkipBtn) {
        //     this.hideNextButton = true;
        // } else {
        //     this.hideNextButton = false;
        // }
        // if ((index + 1) < this.activeLangQuesArr.length && buttonTyp < 2) {
        //     this.setQuestionData(index + 1);
        // } else if ((index - 1 > -1) && buttonTyp == 2) {
        //     this.setQuestionData(index - 1);
        // } else if ((clickedIndex) < this.activeLangQuesArr.length && buttonTyp == 3) {
        //     this.setQuestionData(clickedIndex);
        // }
    }





    UpdateSeenContent(remain, index, clickedIndex, buttonType) {
        var Courseseen = {};
        Courseseen['token'] = this._constantService.getSessionDataBYKey('token');
        Courseseen['token_param'] = {};
        Courseseen['token_param']['device_type'] = 'w';
        Courseseen['token_param']['host'] = '';
        Courseseen['cors_uuid'] = this.courseId;
        Courseseen['cntnt_uuid'] = this.ContentUUID;
        Courseseen['cntnt_typ'] = 3;
        Courseseen['remain'] = remain;
        this._constantService.fetchDataApi(this._constantService.getCourseSeentUpdateServiceUrl(), Courseseen).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                this.saveQuestionResponse(index, clickedIndex, buttonType);
            } else {
                this.preloader = false;
                this.buttonClicked = -1;
            }
        });
    }




    answerStringFxn(clickedIndex, index, ansStr, quesStatus, buttonType) {
        var timeSegment = (this.quesStartTime - this.quesSaveTime);
        var originalIndex = this.groupedQuesMapingArr[index];

        if (buttonType != 2) {
            this.responseArray[originalIndex] = ansStr;
            if (this.statusArray[originalIndex] != 'R') {
                this.statusArray[originalIndex] = quesStatus;
                this.activeLangQuesArr[index]['STATUS'] = quesStatus;
            }
        }
        if (this.statusArray[originalIndex] == 'U' || this.statusArray[originalIndex] == 'S') {
            this.statusArray[originalIndex] = quesStatus;
            this.activeLangQuesArr[index]['STATUS'] = quesStatus;
        }

        this.timeTakenArray[originalIndex] += timeSegment;
        this.activeLangQuesArr[index]['TIME_TAKEN'] = this.timeTakenArray[originalIndex];

        this.responseStr = this.responseArray.join('$');
        this.statusStr = this.statusArray.join('$');
        this.timeTakenStr = this.timeTakenArray.join('$');
        this.UpdateSeenContent(this.remain, index, clickedIndex, buttonType);

    }

    saveQuestionResponse(index, clickedIndex, buttonTyp) {
        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";
        hitObj['cntnt_uuid'] = this.contentId;
        hitObj['cors_uuid'] = this.courseId;
        hitObj['response'] = this.responseStr;
        hitObj['status'] = this.statusStr;
        hitObj['time_taken'] = this.timeTakenStr;
        hitObj['curr_qstn'] = this.activeQuestion;
        hitObj['tym_remains'] = this.timeRemaining;

        this._constantService.fetchDataApi(this._constantService.getSaveResponseServiceUrl(), hitObj).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.lastSubumitResponse = hitObj;
                if ((index + 1) < this.activeLangQuesArr.length && buttonTyp < 2) {
                    this.setQuestionData(index + 1);
                    this.preloader = false;
                    this.buttonClicked = -1;
                } else if ((index - 1 > -1) && buttonTyp == 2) {
                    this.setQuestionData(index - 1);
                    this.preloader = false;
                    this.buttonClicked = -1;

                } else if ((clickedIndex) < this.activeLangQuesArr.length && buttonTyp == 3) {
                    this.setQuestionData(clickedIndex);
                    this.preloader = false;
                    this.buttonClicked = -1;

                }
            } else if (status == this._constantService.error_token) {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired!";
                this.openConfirmation = true;
                this.preloader = false;
                return false;
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "Error";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
                this.preloader = false;
                this.buttonClicked = -1;

                return false;
            }
        }), error => {
            var err = error;
            if (err.status == 500) {
                this._router.navigate(['500']);
            }
        };
    }
    saveUpdateTime() {
        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";
        hitObj['cntnt_uuid'] = this.contentId;
        hitObj['cors_uuid'] = this.courseId;
        hitObj['response'] = this.responseStr;
        hitObj['status'] = this.statusStr;
        hitObj['time_taken'] = this.timeTakenStr;
        hitObj['curr_qstn'] = this.activeQuestion;
        hitObj['tym_remains'] = this.timeRemaining;

        this._constantService.fetchDataApi(this._constantService.getSaveResponseServiceUrl(), hitObj).subscribe(data => {

        });
    }

    checkAnsForMatMax(event, optTyp) {
        if (optTyp == 1) {
            if (event.target.checked) {
                this.selMatMaxOpt1.push(event.target.value);
            } else if (!event.target.checked) {
                var index = this.selMatMaxOpt1.indexOf(event.target.value);
                this.selMatMaxOpt1.splice(index, 1);
            }
        }

        if (optTyp == 2) {
            if (event.target.checked) {
                this.selMatMaxOpt2.push(event.target.value);
            } else if (!event.target.checked) {
                var index = this.selMatMaxOpt2.indexOf(event.target.value);
                this.selMatMaxOpt2.splice(index, 1);
            }
        }
        if (optTyp == 3) {
            if (event.target.checked) {
                this.selMatMaxOpt3.push(event.target.value);
            } else if (!event.target.checked) {
                var index = this.selMatMaxOpt3.indexOf(event.target.value);
                this.selMatMaxOpt3.splice(index, 1);
            }
        }
        if (optTyp == 4) {
            if (event.target.checked) {
                this.selMatMaxOpt4.push(event.target.value);
            } else if (!event.target.checked) {
                var index = this.selMatMaxOpt4.indexOf(event.target.value);
                this.selMatMaxOpt4.splice(index, 1);
            }
        }
        if (optTyp == 5) {
            if (event.target.checked) {
                this.selMatMaxOpt5.push(event.target.value);
            } else if (!event.target.checked) {
                var index = this.selMatMaxOpt5.indexOf(event.target.value);
                this.selMatMaxOpt5.splice(index, 1);
            }
        }
        if (optTyp == 6) {
            if (event.target.checked) {
                this.selMatMaxOpt6.push(event.target.value);
            } else if (!event.target.checked) {
                var index = this.selMatMaxOpt6.indexOf(event.target.value);
                this.selMatMaxOpt6.splice(index, 1);
            }
        }
    }

    submitTest() {
        this.pauseTestSec = false;
        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";
        hitObj['cntnt_uuid'] = this.contentId;
        hitObj['response'] = this.responseStr;
        hitObj['status'] = this.statusStr;
        hitObj['time_taken'] = this.timeTakenStr;
        hitObj['curr_qstn'] = this.activeQuestion;
        hitObj['lang_id'] = this.visibleLangId;
        hitObj['cors_uuid'] = this.courseId;

        this._constantService.fetchDataApi(this._constantService.getSubmitTestServiceUrl(), hitObj).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                var report = responseData.TEST_REPORT;
                this.reportQuesCount = report.QUESTION_COUNT;
                this.reportSpeed = report.SPEED;
                this.reportTimeTaken = report.TIME_TAKEN;
                this.reportQuesAttempted = report.ATTEMPTED_COUNT;
                this.reportTotalMarks = report.TOTAL_MARKS;
                this.reportPercentage = report.PERCENTAGE;
                this.reportTestMarks = report.TOTAL_OBTAINED_MARKS;
                this.reportAccuracy = report.ACCURACY;
                this.timeStatus = report.TIME_TAKEN_STATUS;
                this.speedStatus = report.SPEED_STATUS;
                this.accuracyStatus = report.ACCRACY_STATUS;
                this.percentageStatus = report.PERCENTAGE_STATUS;
                this.attemptedStatus = report.ATTEMPTED_STATUS;
                this.scoreStatus = report.TOTAL_MARKS_STATUS;
                this.testAnalyticsShow = true;
                this.courseUrl = report.COURSE_URL;
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


    matchMatrixAnsSet(value, opt) {
        switch (opt) {
            case 1: {
                var index = this.selMatMaxOpt1.indexOf(value);
                if (index >= 0) {
                    return true;
                } else {
                    return false;
                }
            }
            case 2: {
                var index = this.selMatMaxOpt2.indexOf(value);
                if (index >= 0) {
                    return true;
                } else {
                    return false;
                }
            }
            case 3: {
                var index = this.selMatMaxOpt3.indexOf(value);
                if (index >= 0) {
                    return true;
                } else {
                    return false;
                }
            }
            case 4: {
                var index = this.selMatMaxOpt4.indexOf(value);
                if (index >= 0) {
                    return true;
                } else {
                    return false;
                }
            }
            case 5: {
                var index = this.selMatMaxOpt5.indexOf(value);
                if (index >= 0) {
                    return true;
                } else {
                    return false;
                }
            }
            case 6: {
                var index = this.selMatMaxOpt6.indexOf(value);
                if (index >= 0) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }

    markAsReview(index) {
        var originalIndex = this.groupedQuesMapingArr[index];
        if (this.activeLangQuesArr[index].STATUS != 'R') {
            this.activeLangQuesArr[index].STATUS = 'R';
            this.statusArray[originalIndex] = 'R';
        } else {
            this.activeLangQuesArr[index].STATUS = 'S';
            this.statusArray[originalIndex] = 'S';
        }
    }

    pauseTest() {
        if (this.pauseTestSec) {
            this.attemptedQuesCount = 0;
            this.unattemptedQuesCount = 0;
            this.skippedQuesCount = 0;
            this.reviewedQuesCount = 0;
            this.pauseTestSec = false;
        } else {
            for (var i = 0; i < this.statusArray.length; i++) {
                switch (this.statusArray[i]) {
                    case 'U': {
                        this.unattemptedQuesCount++;
                        break;
                    }
                    case 'S': {
                        this.skippedQuesCount++;
                        break;
                    }
                    case 'R': {
                        this.reviewedQuesCount++;
                        break;
                    }
                }
                if (this.responseArray[i] != 0) {
                    this.attemptedQuesCount++;
                }
            }
            this.pauseTestSec = true;
        }
    }


    dummyHit() {
        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";
        hitObj['key'] = 'value';
        this._constantService.fetchDataApi(this._constantService.getTestDetailsServiceUrl(), hitObj).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {

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


    hidePalletList(index) {


        var id = 'col' + index;
        var id2 = 'col2' + index;

        var palletHeight = document.getElementById(id);
        var setPalletHeight = palletHeight.offsetHeight;

        if (palletHeight.offsetHeight > 0) {
            palletHeight.style.height = '0px';
            this.arrowDirection = true;
        }
        else {
            palletHeight.style.height = document.getElementById(id2).offsetHeight + "px";
            this.arrowDirection = false;

        }


    }

    lastopencontent(event) {

    }




}
