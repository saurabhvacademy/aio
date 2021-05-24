import { Component, HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConstantService } from './../../../services/constant.service';
import { PostdataService } from './../../../services/postdata.service';
import { EncryptionService } from './../../../services/encryption.service';
declare var $: any;
declare var MathJax: any;

@Component({
    selector: 'app-testsolutions',
    templateUrl: './testsolutions.component.html',
    styleUrls: ['./../testpage/testpage.component.scss', './testsolutions.component.scss']
})
export class TestsolutionsComponent implements OnInit {
    completeDataLoaded: boolean;
    config;
    oldId: string = '';
    activeDoCheck: boolean = false;
    responseStr: string = '';
    responseArray: any = [];
    activeLangQuesArr = [];
    groupedQuesMapingArr = [];
    statusArray = [];
    ansArray = [];
    otherLangQues: boolean = false;
    displayId: any;
    isSolutionPresentOld: boolean = false;
    dataCollection = 0;
    testSolutionArr = [];
    testSolutionArrDummy = [{ "QSTN_ID": 1, "SOLN": [{ "SOLUTION_TEXT": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat", "SOLN_IMG": "", "LANG_ID": "1" }] }, { "QSTN_ID": 2, "SOLN": [{ "SOLUTION_TEXT": "", "SOLN_IMG": "", "LANG_ID": "1" }] }, { "QSTN_ID": 3, "SOLN": [{ "SOLUTION_TEXT": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat", "SOLN_IMG": "", "LANG_ID": "1" }] }, { "QSTN_ID": 4, "SOLN": [{ "SOLUTION_TEXT": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat", "SOLN_IMG": "", "LANG_ID": "1" }] }, { "QSTN_ID": 5, "SOLN": [{ "SOLUTION_TEXT": "Pri quas audiam virtute ut, case utamur fuisset eam ut, iisque accommodare an eam. Reque blandit qui eu, cu vix nonumy volumus. Legendos intellegam id usu, vide oporteat vix eu, id illud principes has. Nam tempor utamur gubergren no.", "SOLN_IMG": "", "LANG_ID": "1" }] }, { "QSTN_ID": 6, "SOLN": [{ "SOLUTION_TEXT": "", "SOLN_IMG": "", "LANG_ID": "1" }] }, { "QSTN_ID": 7, "SOLN": [{ "SOLUTION_TEXT": "English", "SOLN_IMG": "", "LANG_ID": "4" }] }];
    testSolnS3Path = '';
    testS3Path = '';
    marksAwardedF: boolean;
    marksAwardedE: boolean;
    marksAwardedD: boolean;
    marksAwardedC: boolean;
    marksAwardedB: boolean;
    marksAwardedA: boolean;
    responseStatusArr: any;
    userResponseStatusArr: any;
    responseArr: string[];
    solutionText = '';
    isSolutionPresent: boolean = false;
    marksAwarded: boolean = false;
    correctAnswer = '';
    userResponse = '';
    userResponseArr: any;
    correctAnswerArr: any;
    testReport: any;
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
    answerStr: String = '';
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
    questionArr = [];
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
    lang_list: boolean = false;
    ques_pallet_list: boolean = false;
    ques_pallet_grid: boolean = true;
    popupToggle: boolean = false;
    testdetails_show: boolean = false;
    dataConf = {};
    openConfirmation: boolean = false;
    visibilityTopic = "Select Topic";
    visibilityTypTopic = 3;
    walldropdownTopic: boolean = false;
    answerhint: boolean = false;
    MobileViewTest: boolean = true;
    ToggleQuesPalletMob: boolean = false;
    arrowDirection: boolean = false;
    popupToggleMob: boolean = false;

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
    }
    showMobileView() {
        if (window.innerWidth <= 992) {
            this.MobileViewTest = false;
        } else {
            this.MobileViewTest = true;

        }
    }

    ngOnInit() {
        this.showMobileView();
        this.activatedRoute.params.subscribe((params: Params) => {
            if (params["id"] != null) {
                this.contentId = params['id'];

                this.getTestDetail();
                this.activeDoCheck = true;
            }
        });
    }

    ngDocheck() {
        if (this.activeDoCheck) {
            this.activatedRoute.params.subscribe((params: Params) => {
                if (params['id'] != null) {
                    if (this.oldId == '') {
                        this.oldId = params['id'];
                    } else if (params['id'] != this.oldId) {
                        this.oldId = params['id'];
                        window.location.reload();
                    }
                }
            });
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
        }, 500);
    }

    showwalldropdownTopic() {
        this.walldropdownTopic = !this.walldropdownTopic;
    }

    changeVisibilityTopic(id) {
        //this.visibilityimg = "Sort By";
        this.visibilityTopic = "Nomenclature";
        // var add = "assets/images/svg-three/add_post/wall/";
        if (id == 3) {
            this.visibilityTopic = "Nomenclature";
            this.visibilityTypTopic = 3;
        } else if (id == 2) {
            this.visibilityTopic = "Nomenclature Part1";
            this.visibilityTypTopic = 2;

        } else if (id == 1) {
            this.visibilityTopic = "Nomenclature Part2";
            this.visibilityTypTopic = 1;

        }
    }

    show_lang_list() {
        if (this.lang_list == false) {
            this.lang_list = true;
        } else {
            this.lang_list = false;
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
    }

    dragDiv(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    test_detials_data() {
        this.testdetails_show = true;
    }

    hideTestdetailsdata() {
        this.testdetails_show = false;
    }

    sessionExpire(event) {
        if (event) {
            this.dataConf['type'] = 4;
            this.dataConf['msg'] = "Session Expire";
            this.dataConf['error_msg'] = "Session Expired";
            this.openConfirmation = true;
        }
    }
    showMenu() {
        this.popupToggle = !this.popupToggle;
        if (this.popupToggle) {
            this.getTestContentStatus();
        }
    }
    popupToggleOpen() {
        this.popupToggle = false;
        // this.popupToggle = !this.popupToggle;
        // if (this.popupToggle) {
        //     this.getTestContentStatus();
        // }
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

    getTestDetail() {
        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";
        hitObj['cntnt_uuid'] = this.contentId;

        this._constantService.fetchDataApi(this._constantService.getTestDetailsServiceUrl(), hitObj).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            var testData = responseData.Test_Details;
            if (status == this._constantService.success_msg) {
                this.courseId = testData.COURSE_UUID;
                this.pageId = testData.PAGE_UUID;
                this.sectionId = testData.SECTION_UUID;
                this.testName = this._postData.decodeURIPostData(testData.TEST_NAME);
                this.testLanguage = testData.LANGUAGE;
                this.testDuration = testData.DURATION;
                this.quesCount = testData.QUESTION_COUNT;
                this.totalMarks = testData.TOTAL_MARKS;
                this.testS3Path = testData.PATH + '/' + this.contentId + '/' + this.contentId + '_w.txt';
                this.testSolnS3Path = testData.PATH + '/' + this.contentId + '/' + this.contentId + '_w_soln.txt';
                this.getTestStatusFxn();
                this.getEncTestSolutionS3();
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

    getEncTestDataS3() {
        $.get(this.testS3Path)
            .done((data) => {
                this.setTestDataS3(data);
            })
            .fail(function () {
                alert('File download failed!');
                return false;
            });
    }

    getEncTestSolutionS3() {
        $.get(this.testSolnS3Path)
            .done((data) => {
                this.setTestSolnS3(data);
            })
            .fail(function () {
                alert('File download failed!');
                return false;
            });
    }

    setTestDataS3(data) {
        if (data) {
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
                    obj.SUB = this._postData.decodeURIPostData(obj.SUB);
                    obj['VISIBILITY'] = false;
                });
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
                        QuesObj['STATIC_TEXT'] = this._postData.pastedDataStrippingByData(QuesObj['TEXT']);
                        QuesObj['UUID'] = quesLang.UUID;
                        QuesObj['TYPE'] = quesLang.TYPE;
                        QuesObj['TYPE_OPTIONS'] = quesLang.TYPE_OPTIONS;
                        QuesObj['DIMENSION_QST'] = quesLang.DIMENSION;
                        QuesObj['DISPLAY_ID'] = '';
                        QuesObj['STATUS'] = '';
                        QuesObj['ANSWER'] = '';
                        QuesObj['SOLUTION'] = '';
                        QuesObj['SOLN_IMG'] = '';
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

    setTestSolnS3(data) {
        var solution = this._encryptData.decryptTest(data);
        solution = this._encryptData.decrypt(solution);
        var solutionObj = JSON.parse(solution);
        var solutionData = solutionObj.SOLUTIONS;
        if (solutionData) {
            solutionData.forEach(Obj => {
                var quesId = Obj.QSTN_ID;
                var solList = Obj.SOLN;
                solList.forEach(solLang => {
                    var solObj = {};
                    solObj['QSTN_ID'] = quesId;
                    solObj['LANG_ID'] = solLang.LANG_ID;
                    if (solLang.SOLN_IMG) {
                        solObj['SOLN_IMG'] = solLang.SOLN_IMG;
                    } else {
                        solObj['SOLN_IMG'] = "";
                    }
                    if (solLang.SOLUTION_TEXT) {
                        solObj['SOLUTION_TEXT'] = this._postData.decodeURIPostData(solLang.SOLUTION_TEXT);
                    } else {
                        solObj['SOLUTION_TEXT'] = "";
                    }

                    this.testSolutionArr.push(solObj);
                });
            });
            setTimeout(() => {
                document.getElementById('questionContainer').scrollTo(0, 2);
            }, 300);
        }
    }



    getTestStatusFxn() {
        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";
        hitObj['cntnt_uuid'] = this.contentId;
        hitObj['cors_uuid'] = this.courseId;

        this._constantService.fetchDataApi(this._constantService.getTestSolutionServiceUrl(), hitObj).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                if (responseData.TEST_REPORT) {
                    this.ansArray = responseData.CORRECT_ANSWERS;
                    this.testReport = this._encryptData.decryptTest(responseData.TEST_REPORT);
                    this.testReport = this._encryptData.decrypt(this.testReport);
                    this.testReport = JSON.parse(this.testReport);
                    this.statusStr = this.testReport.RESPONSE_STATUS;
                    this.responseStr = this.testReport.RESPONSES;
                    if (this.statusStr) {
                        this.statusArray = this.statusStr.split('$');
                    }
                    if (this.responseStr) {
                        this.responseArray = this.responseStr.split('$');
                    }
                }
                this.getEncTestDataS3();
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
                        this.groupedQuesMapingArr.push(index);
                        groupedArrIndex++;
                        ques['STATUS'] = this.statusArray[index];
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
        if (this.answerStr == '') {
            this.answerStr = this.ansArray.join('$');
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
        this.completeDataLoaded = true;
        this.setQuestionData(0);
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
        } else {

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


    goToCourseContent(contentTyp, contentUUID) {
        if (contentTyp == 3) {
            this._router.navigate(['/test/' + contentUUID]);
        } else {
            this._router.navigate(['/viewer/' + contentUUID]);
        }
    }


    setQuestionData(index) {
        this.ToggleQuesPalletMob = false;
        if (index < 0 || index >= this.activeLangQuesArr.length) {
            this.dataConf['type'] = 2;
            this.dataConf['msg'] = "Error";
            this.dataConf['error_msg'] = "Action Denied!";
            this.openConfirmation = true;
            return false;
        }
        if (index > this.activeLangQuesArr.length - 2) {
            this.hideSkipBtn = true;
        } else {
            this.hideSkipBtn = false;
        }
        if (index < 1) {
            this.hideBackBtn = true;
        } else {
            this.hideBackBtn = false;
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

            setTimeout(() => {
                var originalIndex = this.groupedQuesMapingArr[index];
                this.activeQuestion = index + 1;
                this.activeQuesIndex = index;
                this.displayId = data.DISPLAY_ID;

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
                                    this.image_upload_solution_url = this.bucketPath + this.contentId + '/' + this.bucketUuid + "/soln.png";
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

                if (this.testSolutionArr[index].SOLUTION_TEXT) {
                    this.solutionText = this.testSolutionArr[index].SOLUTION_TEXT;
                } else {
                    this.solutionText = "";
                }

                if (this.solutionText != '' || this.image_upload_solution_url != '') {
                    this.isSolutionPresent = true;
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

                this.changeVisibilitySubject(data.SUB_ID, 2);
                //                this.changeVisibilityLang(data.LANG_ID, 2)

                if (data.NEGATIVE_MARKS != 0) {
                    this.negMarks = data.NEGATIVE_MARKS;
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
                        var blanksList = document.getElementsByClassName('fillblankopt');
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
                                //                        var field_dom = document.getElementById('dropdown_' + i);
                                //                        field_dom.addEventListener('click', (event) => {
                                //                            this.changeHandler(event);
                                //                        });
                            }
                        }
                    }, 50);
                }
                if (this.responseArray[originalIndex]) {
                    this.userResponse = this.responseArray[originalIndex];
                } else {
                    this.userResponse = '';
                }
                this.correctAnswer = this.ansArray[originalIndex];
                if (this.userResponse == this.correctAnswer) {
                    this.marksAwarded = true;
                }

                if (data.TYPE == '1') {
                    setTimeout(() => {
                        switch (this.userResponse) {
                            case 'a': {
                                document.getElementById('option001').classList.add('yrAnswer');
                                break;
                            }
                            case 'b': {
                                document.getElementById('option002').classList.add('yrAnswer');
                                break;
                            }
                            case 'c': {
                                document.getElementById('option003').classList.add('yrAnswer');
                                break;
                            }
                            case 'd': {
                                document.getElementById('option004').classList.add('yrAnswer');
                                break;
                            }
                            case 'e': {
                                document.getElementById('option005').classList.add('yrAnswer');
                                break;
                            }
                            case 'f': {
                                document.getElementById('option006').classList.add('yrAnswer');
                                break;
                            }
                        }
                    }, 500);
                    setTimeout(() => {
                        switch (this.correctAnswer) {
                            case 'a': {
                                document.getElementById('option001').classList.add('crAnswer');
                                break;
                            }
                            case 'b': {
                                document.getElementById('option002').classList.add('crAnswer');
                                break;
                            }
                            case 'c': {
                                document.getElementById('option003').classList.add('crAnswer');
                                break;
                            }
                            case 'd': {
                                document.getElementById('option004').classList.add('crAnswer');
                                break;
                            }
                            case 'e': {
                                document.getElementById('option005').classList.add('crAnswer');
                                break;
                            }
                            case 'f': {
                                document.getElementById('option006').classList.add('crAnswer');
                                break;
                            }
                        }
                    }, 500);

                    switch (this.correctAnswer) {
                        case 'a': {
                            if (this.userResponse == 'a') {
                                this.marksAwardedA = true;
                            }
                            break;
                        }
                        case 'b': {
                            if (this.userResponse == 'b') {
                                this.marksAwardedB = true;
                            }
                            break;
                        }
                        case 'c': {
                            if (this.userResponse == 'c') {
                                this.marksAwardedC = true;
                            }
                            break;
                        }
                        case 'd': {
                            if (this.userResponse == 'd') {
                                this.marksAwardedD = true;
                            }
                            break;
                        }
                        case 'e': {
                            if (this.userResponse == 'e') {
                                this.marksAwardedE = true;
                            }
                            break;
                        }
                        case 'f': {
                            if (this.userResponse == 'f') {
                                this.marksAwardedF = true;
                            }
                            break;
                        }
                    };
                }

                if (data.TYPE == '2') {
                    if (this.userResponse) {
                        var response = this.userResponse.split(',');
                    } else {
                        response = [];
                    }
                    var answer = this.correctAnswer.split(',');
                    setTimeout(() => {
                        response.forEach(key => {
                            switch (key) {
                                case 'a': {
                                    document.getElementById('option001').classList.add('yrAnswer');
                                    break;
                                }
                                case 'b': {
                                    document.getElementById('option002').classList.add('yrAnswer');
                                    break;
                                }
                                case 'c': {
                                    document.getElementById('option003').classList.add('yrAnswer');
                                    break;
                                }
                                case 'd': {
                                    document.getElementById('option004').classList.add('yrAnswer');
                                    break;
                                }
                                case 'e': {
                                    document.getElementById('option005').classList.add('yrAnswer');
                                    break;
                                }
                                case 'f': {
                                    document.getElementById('option006').classList.add('yrAnswer');
                                    break;
                                }
                            }
                        });
                    }, 500);
                    setTimeout(() => {
                        answer.forEach(key => {
                            switch (key) {
                                case 'a': {
                                    document.getElementById('option001').classList.add('crAnswer');
                                    break;
                                }
                                case 'b': {
                                    document.getElementById('option002').classList.add('crAnswer');
                                    break;
                                }
                                case 'c': {
                                    document.getElementById('option003').classList.add('crAnswer');
                                    break;
                                }
                                case 'd': {
                                    document.getElementById('option004').classList.add('crAnswer');
                                    break;
                                }
                                case 'e': {
                                    document.getElementById('option005').classList.add('crAnswer');
                                    break;
                                }
                                case 'f': {
                                    document.getElementById('option006').classList.add('crAnswer');
                                    break;
                                }
                            }
                        });
                    }, 500);

                    response.forEach(res => {
                        if (answer.indexOf(res) > -1) {
                            switch (res) {
                                case 'a': {
                                    this.marksAwardedA = true;
                                    break;
                                }
                                case 'b': {
                                    this.marksAwardedB = true;
                                    break;
                                }
                                case 'c': {
                                    this.marksAwardedC = true;
                                    break;
                                }
                                case 'd': {
                                    this.marksAwardedD = true;
                                    break;
                                }
                                case 'e': {
                                    this.marksAwardedE = true;
                                    break;
                                }
                                case 'f': {
                                    this.marksAwardedF = true;
                                    break;
                                }
                            }
                        }
                    });
                }


                if (data.TYPE == '4' || data.TYPE == '5') {
                    var optionSpan = document.getElementsByClassName('optnvalues');
                    if (optionSpan) {
                        for (var i = 0; i < optionSpan.length; i++) {
                            optionSpan[i].classList.remove('rslt_red');
                            optionSpan[i].classList.remove('rslt_green');
                        }
                    }

                    var usrRes = this.userResponse.split(',');
                    var correctAns = this.correctAnswer.split(',');

                    var correctAnsA = [];
                    var correctAnsB = [];
                    var correctAnsC = [];
                    var correctAnsD = [];
                    var correctAnsE = [];
                    var correctAnsF = [];
                    correctAns.forEach(ans => {
                        if (ans.match('a#')) {
                            correctAnsA.push(ans);
                        }
                        else if (ans.match('b#')) {
                            correctAnsB.push(ans);
                        }
                        else if (ans.match('C#')) {
                            correctAnsC.push(ans);
                        }
                        else if (ans.match('d#')) {
                            correctAnsD.push(ans);
                        }
                        else if (ans.match('e#')) {
                            correctAnsE.push(ans);
                        }
                        else if (ans.match('f#')) {
                            correctAnsF.push(ans);
                        }
                    });

                    correctAnsA.forEach(ans => {
                        if (usrRes.indexOf(ans) > -1) {
                            this.marksAwardedA = true;
                        } else {
                            return this.marksAwardedA = false;
                        }
                    });
                    correctAnsB.forEach(ans => {
                        if (usrRes.indexOf(ans) > -1) {
                            this.marksAwardedB = true;
                        } else {
                            return this.marksAwardedB = false;
                        }
                    });
                    correctAnsC.forEach(ans => {
                        if (usrRes.indexOf(ans) > -1) {
                            this.marksAwardedC = true;
                        } else {
                            return this.marksAwardedC = false;
                        }
                    });
                    correctAnsD.forEach(ans => {
                        if (usrRes.indexOf(ans) > -1) {
                            this.marksAwardedD = true;
                        } else {
                            return this.marksAwardedD = false;
                        }
                    });
                    correctAnsE.forEach(ans => {
                        if (usrRes.indexOf(ans) > -1) {
                            this.marksAwardedE = true;
                        } else {
                            return this.marksAwardedE = false;
                        }
                    });
                    correctAnsF.forEach(ans => {
                        if (usrRes.indexOf(ans) > -1) {
                            this.marksAwardedF = true;
                        } else {
                            return this.marksAwardedF = false;
                        }
                    });

                    setTimeout(() => {
                        usrRes.forEach(res => {
                            if (res.match('a#')) { this.preSelectResponse('a', res.slice(-1)) };
                            if (res.match('b#')) { this.preSelectResponse('b', res.slice(-1)) };
                            if (res.match('c#')) { this.preSelectResponse('c', res.slice(-1)) };
                            if (res.match('d#')) { this.preSelectResponse('d', res.slice(-1)) };
                            if (res.match('e#')) { this.preSelectResponse('e', res.slice(-1)) };
                            if (res.match('f#')) { this.preSelectResponse('f', res.slice(-1)) };
                        });

                        var correctAns = this.correctAnswer.split(',');
                        correctAns.forEach(ans => {
                            if (ans.match('a#')) { this.preSelectAnswer('a', ans.slice(-1)) };
                            if (ans.match('b#')) { this.preSelectAnswer('b', ans.slice(-1)) };
                            if (ans.match('c#')) { this.preSelectAnswer('c', ans.slice(-1)) };
                            if (ans.match('d#')) { this.preSelectAnswer('d', ans.slice(-1)) };
                            if (ans.match('e#')) { this.preSelectAnswer('e', ans.slice(-1)) };
                            if (ans.match('f#')) { this.preSelectAnswer('f', ans.slice(-1)) };
                        });
                    }, 100);
                }

            }, 50);
        } else {
            this.activeQuestion = index + 1;
            this.activeQuesIndex = index;
            this.quesTyp = 1;
            this.quesTypName = "Multiple Choice Question";

            this.resetData();
        }

        setTimeout(() => {
            MathJax.Hub.Typeset();
        }, 500);
        setTimeout(() => {
            document.getElementById('questionContainer').scrollTo(0, 2);
        }, 300);
    }

    preSelectResponse(option, res) {
        switch (option) {
            case 'a': {
                if (!this.marksAwardedA) {
                    switch (res) {
                        case 'p': {
                            document.getElementById('responseAP').classList.add('rslt_red');
                            break;
                        }
                        case 'q': {
                            document.getElementById('responseAQ').classList.add('rslt_red');
                            break;
                        }
                        case 'r': {
                            document.getElementById('responseAR').classList.add('rslt_red');
                            break;
                        }
                        case 's': {
                            document.getElementById('responseAS').classList.add('rslt_red');
                            break;
                        }
                        case 't': {
                            document.getElementById('responseAT').classList.add('rslt_red');
                            break;
                        }
                        case 'u': {
                            document.getElementById('responseAU').classList.add('rslt_red');
                            break;
                        }
                    }
                }
                break;
            }
            case 'b': {
                if (!this.marksAwardedB) {
                    switch (res) {
                        case 'p': {
                            document.getElementById('responseBP').classList.add('rslt_red');
                            break;
                        }
                        case 'q': {
                            document.getElementById('responseBQ').classList.add('rslt_red');
                            break;
                        }
                        case 'r': {
                            document.getElementById('responseBR').classList.add('rslt_red');
                            break;
                        }
                        case 's': {
                            document.getElementById('responseBS').classList.add('rslt_red');
                            break;
                        }
                        case 't': {
                            document.getElementById('responseBT').classList.add('rslt_red');
                            break;
                        }
                        case 'u': {
                            document.getElementById('responseBU').classList.add('rslt_red');
                            break;
                        }
                    }
                }
                break;
            }
            case 'c': {
                if (!this.marksAwardedC) {
                    switch (res) {
                        case 'p': {
                            document.getElementById('responseCP').classList.add('rslt_red');
                            break;
                        }
                        case 'q': {
                            document.getElementById('responseCQ').classList.add('rslt_red');
                            break;
                        }
                        case 'r': {
                            document.getElementById('responseCR').classList.add('rslt_red');
                            break;
                        }
                        case 's': {
                            document.getElementById('responseCS').classList.add('rslt_red');
                            break;
                        }
                        case 't': {
                            document.getElementById('responseCT').classList.add('rslt_red');
                            break;
                        }
                        case 'u': {
                            document.getElementById('responseCU').classList.add('rslt_red');
                            break;
                        }
                    }
                }
                break;
            }
            case 'd': {
                if (!this.marksAwardedD) {
                    switch (res) {
                        case 'p': {
                            document.getElementById('responseDP').classList.add('rslt_red');
                            break;
                        }
                        case 'q': {
                            document.getElementById('responseDQ').classList.add('rslt_red');
                            break;
                        }
                        case 'r': {
                            document.getElementById('responseDR').classList.add('rslt_red');
                            break;
                        }
                        case 's': {
                            document.getElementById('responseDS').classList.add('rslt_red');
                            break;
                        }
                        case 't': {
                            document.getElementById('responseDT').classList.add('rslt_red');
                            break;
                        }
                        case 'u': {
                            document.getElementById('responseDU').classList.add('rslt_red');
                            break;
                        }
                    }
                }
                break;
            }
            case 'e': {
                if (!this.marksAwardedE) {
                    switch (res) {
                        case 'p': {
                            document.getElementById('responseEP').classList.add('rslt_red');
                            break;
                        }
                        case 'q': {
                            document.getElementById('responseEQ').classList.add('rslt_red');
                            break;
                        }
                        case 'r': {
                            document.getElementById('responseER').classList.add('rslt_red');
                            break;
                        }
                        case 's': {
                            document.getElementById('responseES').classList.add('rslt_red');
                            break;
                        }
                        case 't': {
                            document.getElementById('responseET').classList.add('rslt_red');
                            break;
                        }
                        case 'u': {
                            document.getElementById('responseEU').classList.add('rslt_red');
                            break;
                        }
                    }
                }
                break;
            }
            case 'f': {
                if (!this.marksAwardedF) {
                    switch (res) {
                        case 'p': {
                            document.getElementById('responseFP').classList.add('rslt_red');
                            break;
                        }
                        case 'q': {
                            document.getElementById('responseFQ').classList.add('rslt_red');
                            break;
                        }
                        case 'r': {
                            document.getElementById('responseFR').classList.add('rslt_red');
                            break;
                        }
                        case 's': {
                            document.getElementById('responseFS').classList.add('rslt_red');
                            break;
                        }
                        case 't': {
                            document.getElementById('responseFT').classList.add('rslt_red');
                            break;
                        }
                        case 'u': {
                            document.getElementById('responseFU').classList.add('rslt_red');
                            break;
                        }
                    }
                }
                break;
            }
        }
    }

    preSelectAnswer(option, ans) {
        switch (option) {
            case 'a': {
                switch (ans) {
                    case 'p': {
                        document.getElementById('correctAP').classList.add('rslt_green');
                        break;
                    }
                    case 'q': {
                        document.getElementById('correctAQ').classList.add('rslt_green');
                        break;
                    }
                    case 'r': {
                        document.getElementById('correctAR').classList.add('rslt_green');
                        break;
                    }
                    case 's': {
                        document.getElementById('correctAS').classList.add('rslt_green');
                        break;
                    }
                    case 't': {
                        document.getElementById('correctAT').classList.add('rslt_green');
                        break;
                    }
                    case 'u': {
                        document.getElementById('correctAU').classList.add('rslt_green');
                        break;
                    }
                }
                break;
            }
            case 'b': {
                switch (ans) {
                    case 'p': {
                        document.getElementById('correctBP').classList.add('rslt_green');
                        break;
                    }
                    case 'q': {
                        document.getElementById('correctBQ').classList.add('rslt_green');
                        break;
                    }
                    case 'r': {
                        document.getElementById('correctBR').classList.add('rslt_green');
                        break;
                    }
                    case 's': {
                        document.getElementById('correctBS').classList.add('rslt_green');
                        break;
                    }
                    case 't': {
                        document.getElementById('correctBT').classList.add('rslt_green');
                        break;
                    }
                    case 'u': {
                        document.getElementById('correctBU').classList.add('rslt_green');
                        break;
                    }
                }
                break;
            }
            case 'c': {
                switch (ans) {
                    case 'p': {
                        document.getElementById('correctCP').classList.add('rslt_green');
                        break;
                    }
                    case 'q': {
                        document.getElementById('correctCQ').classList.add('rslt_green');
                        break;
                    }
                    case 'r': {
                        document.getElementById('correctCR').classList.add('rslt_green');
                        break;
                    }
                    case 's': {
                        document.getElementById('correctCS').classList.add('rslt_green');
                        break;
                    }
                    case 't': {
                        document.getElementById('correctCT').classList.add('rslt_green');
                        break;
                    }
                    case 'u': {
                        document.getElementById('correctCU').classList.add('rslt_green');
                        break;
                    }
                }
                break;
            }
            case 'd': {
                switch (ans) {
                    case 'p': {
                        document.getElementById('correctDP').classList.add('rslt_green');
                        break;
                    }
                    case 'q': {
                        document.getElementById('correctDQ').classList.add('rslt_green');
                        break;
                    }
                    case 'r': {
                        document.getElementById('correctDR').classList.add('rslt_green');
                        break;
                    }
                    case 's': {
                        document.getElementById('correctDS').classList.add('rslt_green');
                        break;
                    }
                    case 't': {
                        document.getElementById('correctDT').classList.add('rslt_green');
                        break;
                    }
                    case 'u': {
                        document.getElementById('correctDU').classList.add('rslt_green');
                        break;
                    }
                }
                break;
            }
            case 'e': {
                switch (ans) {
                    case 'p': {
                        document.getElementById('correctEP').classList.add('rslt_green');
                        break;
                    }
                    case 'q': {
                        document.getElementById('correctEQ').classList.add('rslt_green');
                        break;
                    }
                    case 'r': {
                        document.getElementById('correctER').classList.add('rslt_green');
                        break;
                    }
                    case 's': {
                        document.getElementById('correctES').classList.add('rslt_green');
                        break;
                    }
                    case 't': {
                        document.getElementById('correctET').classList.add('rslt_green');
                        break;
                    }
                    case 'u': {
                        document.getElementById('correctEU').classList.add('rslt_green');
                        break;
                    }
                }
                break;
            }
            case 'f': {
                switch (ans) {
                    case 'p': {
                        document.getElementById('correctFP').classList.add('rslt_green');
                        break;
                    }
                    case 'q': {
                        document.getElementById('correctFQ').classList.add('rslt_green');
                        break;
                    }
                    case 'r': {
                        document.getElementById('correctFR').classList.add('rslt_green');
                        break;
                    }
                    case 's': {
                        document.getElementById('correctFS').classList.add('rslt_green');
                        break;
                    }
                    case 't': {
                        document.getElementById('correctFT').classList.add('rslt_green');
                        break;
                    }
                    case 'u': {
                        document.getElementById('correctFU').classList.add('rslt_green');
                        break;
                    }
                }
                break;
            }
        }

    }

    resetData() {
        var labels = document.getElementsByClassName('option');
        if (labels) {
            for (var i = 0; i < labels.length; i++) {
                labels[i].classList.remove('crAnswer');
                labels[i].classList.remove('yrAnswer');
            }
        }
        this.marksAwardedA = false;
        this.marksAwardedB = false;
        this.marksAwardedC = false;
        this.marksAwardedD = false;
        this.marksAwardedE = false;
        this.marksAwardedF = false;
        this.correctAnswer = '';
        this.userResponse = '';
        this.marksAwarded = false;
        this.isEssayAssociated = false;
        this.essayText = '';
        this.questionText = '';
        this.hintText = '';
        this.isHintProvided = false;
        this.isSolutionPresent = false;
        this.solutionText = '';
        this.image_upload_solution_url = '';
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
        return true;
    }

    addOptions() {
        if (this.newOptionAdded < 2) {
            this.newOptionAdded = this.newOptionAdded + 1;
        }
    }

    quesSkipFxn(index) {
        this.setQuestionData(index + 1);
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
            console.log(this.arrowDirection + "ayush");
        }
        else {
            palletHeight.style.height = document.getElementById(id2).offsetHeight + "px";
            this.arrowDirection = false;
            console.log(this.arrowDirection + "ayush");
        }


    }

}
