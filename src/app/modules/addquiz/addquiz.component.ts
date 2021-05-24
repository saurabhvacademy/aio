import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConstantService } from './../../services/constant.service';
import { EncryptionService } from './../../services/encryption.service';
import { PostdataService } from './../../services/postdata.service';
import { HttpHeaders } from '@angular/common/http';

declare var CKEDITOR: any;
declare var MathJax: any;


@Component({
    selector: 'app-addquiz',
    host: {
        '(document:click)': 'handleClick($event)',
    },
    templateUrl: './addquiz.component.html',
    styleUrls: ['./addquiz.component.scss', './editor.component.scss']
})
export class AddquizComponent implements OnInit, AfterViewInit {
    addEssayHitted = false;
    recentBucketId: string = '';
    isQuesSaving = false;
    regex = /(<([^>]+)>)/ig;
    hintData = '';
    solutionData = '';
    questionData = '';
    courseLangId = 1;
    solution_placeholder = true;
    hint_placeholder = true;
    question_placeholder = true;
    quizTime: any;
    quizTotalMarks: any;
    quizLanguage: any;
    essayCount: any;
    que_placeholder = true;
    sol_placeholder = true;
    editingSubId = '';
    updatedSubjectName: any = '';
    blankInserted = 0;
    showText: boolean;
    showOpt6: number;
    showOpt6Preloader: boolean;
    optionImgUpload6: boolean;
    showOpt5: number;
    showOpt5Preloader: boolean;
    optionImgUpload5: boolean;
    showOpt4: number;
    showOpt4Preloader: boolean;
    optionImgUpload4: boolean;
    showOpt3: number;
    showOpt3Preloader: boolean;
    optionImgUpload3: boolean;
    showOpt2: number;
    showOpt2Preloader: boolean;
    optionImgUpload2: boolean;
    showOpt1: number;
    showOpt1Preloader: boolean;
    optionImgUpload1: boolean;
    preloader: boolean;
    attachmentId: string;
    image_upload: any;
    imagePostSize: string;
    show_image: number;
    stopUpload = false;
    savedQuiz = false;
    isQuizSummary = false;
    publishedValue = "";
    @ViewChild('quesTyp', { read: ElementRef }) quesTyp: ElementRef;
    //@ViewChild('matchFollowing', {read: ElementRef}) matchFollowing: ElementRef;
    private matchFollowOpt1: ElementRef;
    editableVal: any;
    @ViewChild('matchFollowingOpt1') set content(content: ElementRef) {
        this.matchFollowOpt1 = content;
    }
    private matchFollowOpt2: ElementRef;
    @ViewChild('matchFollowingOpt2') set content2(content: ElementRef) {
        this.matchFollowOpt2 = content;
    }
    private matchFollowOpt3: ElementRef;
    @ViewChild('matchFollowingOpt3') set content3(content: ElementRef) {
        this.matchFollowOpt3 = content;
    }
    private matchFollowOpt4: ElementRef;
    @ViewChild('matchFollowingOpt4') set content4(content: ElementRef) {
        this.matchFollowOpt4 = content;
    }
    private matchFollowOpt5: ElementRef;
    @ViewChild('matchFollowingOpt5') set content5(content: ElementRef) {
        this.matchFollowOpt5 = content;
    }

    @Output() closeAddTest = new EventEmitter<object>();
    QuizQuesTypeList = false;
    opt1_placeholder = true;
    opt2_placeholder = true;
    opt3_placeholder = true;
    opt4_placeholder = true;
    opt5_placeholder = true;
    opt6_placeholder = true;
    userfolowingoptlist = false;
    questionTypeList: number = 0;
    AddEssay_sec = 0;
    essay_placeholder = true;
    QuesPallettab: number = 2;
    quesTypText: string = "Question Type";
    contentId = "";
    courseId = "";
    pageId = "";
    testName: string = '';
    testId: string = "";
    quesText: string = "";
    quesImage = false;
    optImg1 = false;
    optImg2 = false;
    optImg3 = false;
    optImg4 = false;
    optImg5 = false;
    optImg6 = false;
    optImg7 = false;
    optImg8 = false;
    optImg9 = false;
    optImg10 = false;
    optImg11 = false;
    optImg12 = false;
    rytMarks: string = "";
    negMarks: string = "";
    quesPosition = 1;
    currentPosition = 0;
    openConfirmation = false;
    dataConf = {};
    pattern = /[0-9\+\ ]/;
    newOptionAdded = 0;
    newMatchOptionAdded = 0;
    showMatchOptions: number = 0;
    showMatchOpt1 = false;
    showMatchOpt2 = false;
    showMatchOpt3 = false;
    showMatchOpt4 = false;
    showMatchOpt5 = false;
    showMatchOpt6 = false;
    totalQuestion = 0;
    multipleResponseAns = [];
    matchOption1 = "";
    matchOption2 = "";
    matchOption3 = "";
    matchOption4 = "";
    matchOption5 = "";
    matchOption6 = "";
    selectedOption1 = "";
    selectedOption2 = "";
    selectedOption3 = "";
    selectedOption4 = "";
    selectedOption5 = "";
    selectedOption6 = "";
    selMatMaxOpt1 = [];
    selMatMaxOpt2 = [];
    selMatMaxOpt3 = [];
    selMatMaxOpt4 = [];
    selMatMaxOpt5 = [];
    selMatMaxOpt6 = [];
    quesAdded = [{ "ID": 1, "QUES_DATA": '', "LANG_ID": 'l1', "STATUS": false, "CHECKED": false }];
    lang = [];
    langObj = {};
    quesUpdStatus = false;
    currentLangId = "";
    showPrompt = true;
    selectedQuestion = [];
    essaySaved = false;
    essayId = "";
    essayList = [];
    quesTextList = [{ 'QSTN_ID': 0, 'QSTN_TEXT': "", 'IS_IMAGE': false, 'STATIC_TEXT': '', 'LANG_ID': 1, 'ESSAY_ID': 1, 'ESSAY_TEXT': "", 'CHECKED': false, 'STATUS': false, 'IMAGE_UUID': "", 'SUB_ID': '', 'SUB_NAME': '' }];
    totalMarks = 0;
    currentQuesRytMarks: number;
    currentQuesNegMarks: number;
    saveTest = {};
    walldropdown = false;
    walldropdownHour = false;
    walldropdownMinute = false;
    walldropdownTopic = false;
    walldropdownQuesType = false;
    visibilityText = "";
    visibilityHour = "HH";
    visibilityMinute = "MM";
    visibilityTopic = "Others";
    visibilityQuesType = "Multiple choice";
    visibilityTypLang = 3;
    visibilityTypHour = 0;
    visibilityTypMinute = 0;
    visibilityTypTopic = 3;
    visibilityTypeQues = 1;
    showSubjectmanagerpop = false;
    topic_edit = false;
    MatchOptAns = false;

    isPalletGrid = false;
    isUploading = false;
    showSolImg = false;
    showHintImg = false;
    isMergingView = false;
    subjectArr = [];
    languageArr: any;
    newSubjectName = '';
    objectKeys = Object.keys;
    activeLangId = 1;
    prevLangId = 1;
    activeSubId = 'S0';
    activeQuesId = 1;
    essayPosition = 1;
    lastQuesIndex = 0;
    lastEssayIndex = 0;
    totalQuestionObj = 0;
    totalEssayObj = 0;
    newLangQuesEdition = false;
    newLangQuesUpdate = false;
    essayUpdStatus = false;
    continueScrollQues = true;
    continueScrollEssay = true;
    palletViewFormat: number = 1;
    associatedQuesList = [];
    imageSet = {
        'qst': '',
        'opt1': '',
        'opt2': '',
        'opt3': '',
        'opt4': '',
        'opt5': '',
        'opt6': '',
        'opt7': '',
        'opt8': '',
        'opt9': '',
        'opt10': '',
        'opt11': '',
        'opt12': '',
        'soln': '',
        'hint': '',
    };
    option_image1_url = '';
    option_image2_url = '';
    option_image3_url = '';
    option_image4_url = '';
    option_image5_url = '';
    option_image6_url = '';
    option_image7_url = '';
    option_image8_url = '';
    option_image9_url = '';
    option_image10_url = '';
    option_image11_url = '';
    option_image12_url = '';
    image_upload_question_url = '';
    image_upload_solution_url = '';
    image_upload_hint_url = '';
    bucketUuid = '';
    bucketPath = '';
    durationMin = 0;
    ckeditorconfig;
    ckeditorReadonly = false;
    constructor(
        public _constantService: ConstantService,
        private _encrypt: EncryptionService,
        public postData: PostdataService,
        private activatedRoute: ActivatedRoute,
        private _router: Router,
        // public tinymce : EditorComponent,

    ) { }

    ngOnInit() {
     
        this.activatedRoute.params.subscribe((params: Params) => {
            if (params["id"] != null) {
                var id = params['id'];
                id = id.split("study");
                this.savedQuiz = true;
                this.contentId = id[0];
                this.getQuizAdmin(this.contentId);
            }
        });
        this._constantService.setBackToCourse("3");

    }


    ngAfterViewInit() {
        this.createCkEditor();
    }

    createCkEditor() {
        setTimeout(() => {
            var elements = document.querySelectorAll('[contenteditable]');
            for (var i = 0; i < elements.length; i++) {
                this.ckeditor(elements[i].id);
            }
        }, 20);
    }

    updateCkEditoraddoptions() {
        setTimeout(() => {

            if (document.getElementById("opt5_text")) {
                if (!CKEDITOR.instances['opt5_text']) {
                    this.ckeditor("opt5_text");
                } else {
                    this.ckeditor("opt5_text");
                }

            }

            if (document.getElementById("opt6_text")) {
                if (!CKEDITOR.instances['opt6_text']) {
                    this.ckeditor("opt6_text");
                } else {
                    this.ckeditor("opt6_text");

                }

            }

            if (document.getElementById("opt7_text")) {
                if (!CKEDITOR.instances['opt7_text']) {
                    this.ckeditor("opt7_text");
                }

            }

            if (document.getElementById("opt8_text")) {
                if (!CKEDITOR.instances['opt8_text']) {
                    this.ckeditor("opt8_text");
                }

            }

            if (document.getElementById("opt9_text")) {
                if (!CKEDITOR.instances['opt9_text']) {
                    this.ckeditor("opt9_text");
                }

            }

            if (document.getElementById("opt10_text")) {
                if (!CKEDITOR.instances['opt10_text']) {
                    this.ckeditor("opt10_text");
                }

            }
            if (document.getElementById("opt11_text")) {
                if (!CKEDITOR.instances['opt11_text']) {
                    this.ckeditor("opt11_text");
                }

            }
            if (document.getElementById("opt12_text")) {
                if (!CKEDITOR.instances['opt12_text']) {
                    this.ckeditor("opt12_text");
                }

            }
        }, 100);

    }


    resetCkEditoraddoptions() {
        console.log("reset data options");
        setTimeout(() => {
            // console.log("asiiif",document.getElementById("opt5_text"));
            console.log(CKEDITOR.instances);

            if (CKEDITOR.instances['opt5_text']) {
                CKEDITOR.instances['opt5_text'].destroy(true);
                if (document.getElementById('opt5_text')) {
                    this.ckeditor("opt5_text");
                }
            }

            if (CKEDITOR.instances['opt6_text']) {
                CKEDITOR.instances['opt6_text'].destroy(true);
                if (document.getElementById('opt6_text')) {
                    this.ckeditor("opt6_text");
                }
            }

            if (CKEDITOR.instances['opt7_text']) {
                CKEDITOR.instances['opt7_text'].destroy(true);
                if (document.getElementById('opt7_text')) {
                    this.ckeditor("opt7_text");
                }
            }

            if (CKEDITOR.instances['opt8_text']) {
                CKEDITOR.instances['opt8_text'].destroy(true);
                if (document.getElementById('opt8_text')) {
                    this.ckeditor("opt8_text");
                }
            }

            if (CKEDITOR.instances['opt9_text']) {
                CKEDITOR.instances['opt9_text'].destroy(true);
                if (document.getElementById('opt9_text')) {
                    this.ckeditor("opt9_text");
                }
            }

            if (CKEDITOR.instances['opt10_text']) {
                CKEDITOR.instances['opt10_text'].destroy(true);
                if (document.getElementById('opt10_text')) {
                    this.ckeditor("opt10_text");
                }
            }

            if (CKEDITOR.instances['opt11_text']) {
                CKEDITOR.instances['opt11_text'].destroy(true);
                if (document.getElementById('opt11_text')) {
                    this.ckeditor("opt10_text");
                }
            }

            if (CKEDITOR.instances['opt11_text']) {
                CKEDITOR.instances['opt11_text'].destroy(true);
                if (document.getElementById('opt11_text')) {
                    this.ckeditor("opt11_text");
                }
            }

            if (CKEDITOR.instances['opt12_text']) {
                CKEDITOR.instances['opt12_text'].destroy(true);
                if (document.getElementById('opt12_text')) {
                    this.ckeditor("opt12_text");
                }
            }


        }, 0);

    }

    DestroyCkEditoraddoptions() {
        setTimeout(() => {

            if (document.getElementById("opt5_text")) {
                if (!CKEDITOR.instances['opt5_text']) {
                    this.ckeditor("opt5_text");
                } else {
                    if (CKEDITOR.instances['opt5_text']) {
                        CKEDITOR.instances['opt5_text'].destroy(true);
                        this.ckeditor("opt5_text");
                    }
                }

            } else {
                if (CKEDITOR.instances['opt5_text']) {
                    CKEDITOR.instances['opt5_text'].destroy(true);
                }
            }

            if (document.getElementById("opt6_text")) {
                if (!CKEDITOR.instances['opt6_text']) {
                    this.ckeditor("opt6_text");
                } else {
                    if (CKEDITOR.instances['opt6_text']) {
                        CKEDITOR.instances['opt6_text'].destroy(true);
                        this.ckeditor("opt6_text");
                    }
                }

            } else {
                if (CKEDITOR.instances['opt6_text']) {
                    CKEDITOR.instances['opt6_text'].destroy(true);
                }
            }

            if (document.getElementById("opt7_text")) {
                if (!CKEDITOR.instances['opt7_text']) {
                    this.ckeditor("opt7_text");
                } else {
                    if (CKEDITOR.instances['opt7_text']) {
                        CKEDITOR.instances['opt7_text'].destroy(true);
                        this.ckeditor("opt7_text");
                    }
                }

            } else {
                if (CKEDITOR.instances['opt7_text']) {
                    CKEDITOR.instances['opt7_text'].destroy(true);
                }
            }

            if (document.getElementById("opt8_text")) {
                if (!CKEDITOR.instances['opt8_text']) {
                    this.ckeditor("opt8_text");
                } else {
                    if (CKEDITOR.instances['opt8_text']) {
                        CKEDITOR.instances['opt8_text'].destroy(true);
                        this.ckeditor("opt8_text");
                    }
                }

            } else {
                if (CKEDITOR.instances['opt8_text']) {
                    CKEDITOR.instances['opt8_text'].destroy(true);
                }
            }

            if (document.getElementById("opt9_text")) {
                if (!CKEDITOR.instances['opt9_text']) {
                    this.ckeditor("opt9_text");
                } else {
                    if (CKEDITOR.instances['opt9_text']) {
                        CKEDITOR.instances['opt9_text'].destroy(true);
                        this.ckeditor("opt9_text");
                    }
                }

            } else {
                if (CKEDITOR.instances['opt9_text']) {
                    CKEDITOR.instances['opt9_text'].destroy(true);
                }
            }

            if (document.getElementById("opt10_text")) {
                if (!CKEDITOR.instances['opt10_text']) {
                    this.ckeditor("opt10_text");
                } else {
                    if (CKEDITOR.instances['opt10_text']) {
                        CKEDITOR.instances['opt10_text'].destroy(true);
                        this.ckeditor("opt10_text");
                    }
                }

            } else {
                if (CKEDITOR.instances['opt10_text']) {
                    CKEDITOR.instances['opt10_text'].destroy(true);
                }
            }
            if (document.getElementById("opt11_text")) {
                if (!CKEDITOR.instances['opt11_text']) {
                    this.ckeditor("opt11_text");
                } else {
                    if (CKEDITOR.instances['opt11_text']) {
                        CKEDITOR.instances['opt11_text'].destroy(true);
                        this.ckeditor("opt11_text");
                    }
                }

            } else {
                if (CKEDITOR.instances['opt11_text']) {
                    CKEDITOR.instances['opt11_text'].destroy(true);
                }
            }
            if (document.getElementById("opt12_text")) {
                if (!CKEDITOR.instances['opt12_text']) {
                    this.ckeditor("opt12_text");
                } else {
                    if (CKEDITOR.instances['opt12_text']) {
                        CKEDITOR.instances['opt12_text'].destroy(true);
                        this.ckeditor("opt12_text");
                    }
                }

            } else {
                if (CKEDITOR.instances['opt12_text']) {
                    CKEDITOR.instances['opt12_text'].destroy(true);
                }
            }
        }, 0);

    }

    Destroyaddoptions() {
        setTimeout(() => {

            if (document.getElementById("opt5_text")) {


            } else {
                console.log("5");
                if (CKEDITOR.instances['opt5_text']) {
                    CKEDITOR.instances['opt5_text'].destroy(true);
                }
            }

            if (document.getElementById("opt6_text")) {



            } else {
                console.log("6");
                if (CKEDITOR.instances['opt6_text']) {
                    CKEDITOR.instances['opt6_text'].destroy(true);
                }
            }
            console.log("6 and more");

            if (document.getElementById("opt7_text")) {


            } else {
                if (CKEDITOR.instances['opt7_text']) {
                    CKEDITOR.instances['opt7_text'].destroy(true);
                }
            }

            if (document.getElementById("opt8_text")) {


            } else {
                if (CKEDITOR.instances['opt8_text']) {
                    CKEDITOR.instances['opt8_text'].destroy(true);
                }
            }

            if (document.getElementById("opt9_text")) {


            } else {
                if (CKEDITOR.instances['opt9_text']) {
                    CKEDITOR.instances['opt9_text'].destroy(true);
                }
            }

            if (document.getElementById("opt10_text")) {


            } else {
                if (CKEDITOR.instances['opt10_text']) {
                    CKEDITOR.instances['opt10_text'].destroy(true);
                }
            }
            if (document.getElementById("opt11_text")) {


            } else {
                if (CKEDITOR.instances['opt11_text']) {
                    CKEDITOR.instances['opt11_text'].destroy(true);
                }
            }
            if (document.getElementById("opt12_text")) {


            } else {
                if (CKEDITOR.instances['opt12_text']) {
                    CKEDITOR.instances['opt12_text'].destroy(true);
                }
            }
            console.log(CKEDITOR.instances);
        }, 100);

    }


    updateCkEditor() {
        setTimeout(() => {
            if (document.getElementById("opt1_text")) {
                this.ckeditor("opt1_text");

            }
            if (document.getElementById("opt2_text")) {
                this.ckeditor("opt2_text");

            }
            if (document.getElementById("opt3_text")) {
                this.ckeditor("opt3_text");

            }
            if (document.getElementById("opt4_text")) {
                this.ckeditor("opt4_text");

            }
            if (document.getElementById("opt5_text")) {
                this.ckeditor("opt5_text");

            }
            if (document.getElementById("opt6_text")) {
                this.ckeditor("opt6_text");

            }

            if (document.getElementById("opt7_text")) {
                this.ckeditor("opt7_text");

            }
            if (document.getElementById("opt8_text")) {
                this.ckeditor("opt8_text");

            }
            if (document.getElementById("opt9_text")) {
                this.ckeditor("opt9_text");

            }
            if (document.getElementById("opt10_text")) {
                this.ckeditor("opt10_text");

            } if (document.getElementById("opt11_text")) {
                this.ckeditor("opt11_text");

            }
            if (document.getElementById("opt12_text")) {
                this.ckeditor("opt12_text");

            }
        }, 100);

    }



    toggle_ques_pallet() {

        this.isPalletGrid = !this.isPalletGrid;
    }

    topic_list_edit(i) {
        this.topic_edit = !this.topic_edit;
    }

    subjectMergeFxn() {
        this.isMergingView = !this.isMergingView;
    }

    showwalldropdown() {
        this.walldropdown = !this.walldropdown;
    }

    closewalldropdown() {
        this.walldropdown = false;
    }





    showMatchOptfollowing() {
        this.MatchOptAns = !this.MatchOptAns;
    }
    /*hour visibility strat*/
    showwalldropdownHour() {
        this.walldropdownHour = !this.walldropdownHour;
    }

    closewalldropdownHour() {
        this.walldropdownHour = false;
    }

    changeVisibilityHour(id) {
        if (id == 3) {
            this.visibilityHour = "03";
            this.visibilityTypHour = 3;
        } else if (id == 2) {
            this.visibilityHour = "02";
            this.visibilityTypHour = 2;

        } else if (id == 1) {
            this.visibilityHour = "01";
            this.visibilityTypHour = 1;

        } else if (id == 0) {
            this.visibilityHour = "00";
            this.visibilityTypHour = 0;
        }
        this.updateTestDuration();
    }
    /*hour visibility end*/
    /*minute visibility strat*/
    showwalldropdownMinute() {
        this.walldropdownMinute = !this.walldropdownMinute;
    }

    closewalldropdownMinute() {
        this.walldropdownMinute = false;
    }
    changeVisibilityMinute(id) {
        if (id == 3) {
            this.visibilityMinute = "45";
            this.visibilityTypMinute = 3;
        } else if (id == 2) {
            this.visibilityMinute = "30";
            this.visibilityTypMinute = 2;

        } else if (id == 1) {
            this.visibilityMinute = "15";
            this.visibilityTypMinute = 1;

        } else if (id == 0) {
            this.visibilityMinute = "00";
            this.visibilityTypMinute = 0;
        }
        this.updateTestDuration();
    }
    /*minute visibility end*/


    showSubjectmanager() {
        this.showSubjectmanagerpop = !this.showSubjectmanagerpop;
        this.getTestSubject();
    }
    hidesubjectmanagerpop() {
        this.showSubjectmanagerpop = false;
        for (let i = 0; i < this.subjectArr.length; i++) {
            this.subjectArr[i].EDIT = false;
            this.editingSubId = '';
        }
        this.isMergingView = false;
        this.newSubjectName = '';
    }



    selectquestiontype() {
        this.QuizQuesTypeList = !this.QuizQuesTypeList;
    }
    selectquestionopt() {
        this.userfolowingoptlist = !this.userfolowingoptlist;
    }


    hideEssayinput() {
        this.essaySaved = false;
        this.AddEssay_sec = 0;
        this.quesPosition = 1;
        this.getQuestionData(this.quesPosition, this.activeLangId);
        this.createCkEditor();
    }

    write_Essay() {
        this.essay_placeholder = false;
    }

    getInFocus(type) {
        switch (type) {
            case 1: {
                if (this.question_placeholder) {
                    this.question_placeholder = false;
                    setTimeout(() => {
                        // document.getElementById('q_text').focus();
                        this.ckeditor('q_text');
                    }, 50);
                } else if (document.getElementById('q_text').innerHTML.length == 0) {
                    this.question_placeholder = true;
                }
                break;
            }
            case 2: {
                if (this.solution_placeholder) {
                    this.solution_placeholder = false;
                    setTimeout(() => {
                        // document.getElementById('sol_text').focus();
                        this.ckeditor('sol_text');

                    }, 50);
                } else if (document.getElementById('sol_text').innerHTML.length == 0) {
                    this.solution_placeholder = true;
                }
                break;
            }
            case 3: {
                if (this.hint_placeholder) {
                    this.hint_placeholder = false;
                    setTimeout(() => {
                        // document.getElementById('hint_text').focus();
                        this.ckeditor('hint_text');

                    }, 50);
                } else if (document.getElementById('hint_text').innerHTML.length == 0) {
                    this.hint_placeholder = true;
                }
                break;
            }
        }
    }

    closePopup(event) {
        this.openConfirmation = false;
    }


    QuesPallettabClick(index) {
        this.AddEssay_sec = index;
        this.setEssayOneviewKey(0);
        if (index == 2) {
            this.quesUpdStatus = false;
        }
        if (index == 1) {
            this.newAdditionFxn(2);
            this.createCkEditor();
        } else {
            if (this.quesTextList.length > 0 && this.quesTextList[0]['QSTN_ID'] != 0) {
                //                this.getQuestionData(this.activeQuesId, this.activeLangId);
                this.newAdditionFxn(1);
            }
            this.createCkEditor();
        }
        setTimeout(() => {
            MathJax.Hub.Typeset();
        }, 500);
    }



    handleClick(event) {
        var clickedComponent = event.target;
        var typ = 0;
        do {
            if (!this.AddEssay_sec) {
                if (clickedComponent === this.quesTyp.nativeElement) {
                    typ = 1;
                }
            }

            //            if (this.questionTypeList==4){
            //                if (this.showMatchOpt1){
            //                    if (clickedComponent === this.matchFollowOpt1.nativeElement) {
            //                        typ = 2;
            //                    }
            //                }
            //                if (this.showMatchOpt2){
            //                    if (clickedComponent === this.matchFollowOpt2.nativeElement) {
            //                        typ = 3;
            //                    }
            //                }
            //                if (this.showMatchOpt3){
            //                    if (clickedComponent === this.matchFollowOpt3.nativeElement) {
            //                        typ = 4;
            //                    }
            //                }
            //                if (this.showMatchOpt4){
            //                    if (clickedComponent === this.matchFollowOpt4.nativeElement) {
            //                        typ = 5
            //                    }
            //                }
            //                if (this.showMatchOpt5){
            //                    if (clickedComponent === this.matchFollowOpt5.nativeElement) {
            //                        typ = 6;
            //                    }
            //                }
            //            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (typ != 1) {
            this.QuizQuesTypeList = false;
        }
        //        if(typ!=2){
        //            this.showMatchOpt1 = false;
        //        }
        //        if(typ!=3){
        //            this.showMatchOpt2 = false;
        //        }
        //        if(typ!=4){
        //            this.showMatchOpt3 = false;
        //        }
        //        if(typ!=5){
        //            this.showMatchOpt4 = false;
        //        }
        //        if(typ!=6){
        //            this.showMatchOpt5 = false;
        //        }
    }

    addTest() {
        var addTest = {};
        addTest['token'] = this._constantService.getSessionDataBYKey('token');
        addTest['token_param'] = {};
        addTest['token_param']['device_type'] = 'w';
        addTest['token_param']['host'] = '';
        addTest['pg_uuid'] = this.pageId;
        addTest['cors_uuid'] = this.courseId;
        addTest['test_nm'] = this.postData.encodeURIPostData(this.testName.trim());
        addTest['sec_uuid'] = "";

        this._constantService.fetchDataApi(this._constantService.getAddTestServiceUrl(), addTest).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                this.contentId = responseData.CONTENT_UUID;
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.addLangToTest();
            }
        });
    }


    showOptions(id) {
        this.showMatchOptions = id;
    }

    addOptions(typ) {
        if (this.newOptionAdded < 2) {
            this.newOptionAdded = this.newOptionAdded + 1;
            setTimeout(() => {
                if (typ == 1) {
                    console.log("asif add option");
                    // this.updateCkEditoraddoptions();
                    // this.DestroyCkEditoraddoptions();
                    if (this.newOptionAdded == 1) {
                        if (document.getElementById("opt5_text")) {
                            if (!CKEDITOR.instances['opt5_text']) {
                                this.ckeditor("opt5_text");
                            } else {
                                this.ckeditor("opt5_text");
                            }

                        }
                    }
                    if (this.newOptionAdded == 2) {
                        if (document.getElementById("opt6_text")) {
                            if (!CKEDITOR.instances['opt6_text']) {
                                this.ckeditor("opt6_text");
                            } else {
                                this.ckeditor("opt6_text");
                            }

                        }
                    }
                }
            }, 100);

        }
    }

    removeAddedOption(field) {

        if (this.newOptionAdded == 1) {
            if (CKEDITOR.instances["opt5_text"]) {
                CKEDITOR.instances["opt5_text"].destroy(true);
            }
        }
        if (this.newOptionAdded == 2) {
            if (CKEDITOR.instances["opt6_text"]) {
                CKEDITOR.instances["opt6_text"].destroy(true);
            }
        }
        if (field != 'z') {
            var index = this.multipleResponseAns.indexOf(field);
            if (index != -1) {
                this.multipleResponseAns.splice(index, 1);
            }

        }
        this.newOptionAdded--;

        // this.DestroyCkEditoraddoptions();
        // this.Destroyaddoptions();




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

    getFocus(id) {
        if (document.getElementById(id).innerHTML.length == 0) {
            // document.getElementById(id).focus();
            // this.ckeditor(id);
        }
    }



    addLangToTest() {
        var val = this.contentId.split("study");
        var addLang = {};
        addLang['token'] = this._constantService.getSessionDataBYKey('token');
        addLang['token_param'] = {};
        addLang['token_param']['device_type'] = "w";
        addLang['token_param']['host'] = '';
        addLang['language'] = this.visibilityText;
        addLang['cntnt_uuid'] = val[0];
        this._constantService.fetchDataApi(this._constantService.getAddLangToTestServiceUrl(), addLang).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == "success") {
                this.langObj = responseData.LANGUAGE;
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                for (let key in this.langObj) {
                    this.lang.push({ key: key, value: this.langObj[key] });
                }
            }
        });

    }



    getPreviousQuestionData() {
        if ((this.quesPosition - 1) != 0) {
            this.quesPosition = this.quesPosition - 1;
            this.getQuestionData(this.quesPosition, this.activeLangId);
        }
    }


    removeQuesFromEssay(quesId, quesLang, essayId) {
        var val = this.contentId.split("study");
        var rmQuesFrmEssay = {};
        rmQuesFrmEssay['token'] = this._constantService.getSessionDataBYKey('token');
        rmQuesFrmEssay['token_param'] = {};
        rmQuesFrmEssay['token_param']['device_type'] = 'w';
        rmQuesFrmEssay['token_param']['host'] = '';
        rmQuesFrmEssay['essay_id'] = essayId;
        rmQuesFrmEssay['lang_id'] = quesLang;
        rmQuesFrmEssay['cntnt_uuid'] = val[0];
        rmQuesFrmEssay['pg_uuid'] = this.pageId;
        rmQuesFrmEssay['cors_uuid'] = this.courseId;
        rmQuesFrmEssay['qstn_no'] = quesId;


        this._constantService.fetchDataApi(this._constantService.getUnAssociateQuesFrmEssayServiceUrl(), rmQuesFrmEssay).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                var index = this.quesTextList.findIndex(x => x.QSTN_ID == quesId);
                if (index > -1) {
                    this.quesTextList[index].ESSAY_ID = 0;
                    this.quesTextList[index].ESSAY_TEXT = "";
                    this.quesTextList[index].STATUS = false;
                    this.quesTextList[index].CHECKED = false;
                }
            }
        });
    }

    getTest() {
        var test = {};
        test['token'] = this._constantService.getSessionDataBYKey('token');
        test['token_param'] = {};
        test['token_param']['device_type'] = 'w';
        test['token_param']['host'] = '';



        this._constantService.fetchDataApi(this._constantService.getTestDetailsServiceUrl(), test).subscribe(data => {
            var responseData:any = data;
        });
    }



    //========================================================================================================================
    // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX    ADDED BY LAKSHYA    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    //========================================================================================================================

    getQuizAdmin(testId) {
        var val = testId.split("study");
        var getTest = {};
        getTest['token'] = this._constantService.getSessionDataBYKey('token');
        getTest['token_param'] = {};
        getTest['token_param']['device_type'] = 'w';
        getTest['token_param']['host'] = '';
        getTest['cntnt_uuid'] = val[0];



        this._constantService.fetchDataApi(this._constantService.getQuizAdminServiceUrl(), getTest).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.pageId = responseData.PAGE_UUID;
                this.courseId = responseData.COURSE_UUID;
                this.testName = this.postData.decodeURIPostData(responseData.TEST.TEST_NAME);
                this.durationMin = responseData.TEST.DURATION;
                this.courseLangId = responseData.COURSE_LANGUAGE;
                this.editableVal = responseData.IS_EDITABLE; 
                this.publishedValue = responseData.PUBLISH;
                if (this.publishedValue == '4') {
                    this.publishedValue = '2';
                }
                this.setQuizLanguage();
                if (this.durationMin) {
                    let intHours = Math.floor(this.durationMin / 60);
                    this.visibilityHour = '0' + Math.floor(this.durationMin / 60).toString();
                    this.visibilityMinute = (this.durationMin % 60).toString();
                    this.visibilityTypHour = intHours;
                } else {
                    this.durationMin = 0;
                }
                this.subjectArr = responseData.TEST.SUBJECT;
                this.getAllQuestionText(this.lastQuesIndex);
                this.getAllEssayText(this.lastEssayIndex);
                if (this.subjectArr) {
                    for (var i = 0; i < this.subjectArr.length; i++) {
                        if (this.subjectArr[i].KEY === 'S0') {
                            this.subjectArr[i]['VISIBILITY'] = true;
                        } else {
                            this.subjectArr[i]['VISIBILITY'] = false;
                        }

                        this.subjectArr[i]['EDIT'] = false;
                    }
                }
                console.table(this.subjectArr);

            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "Error";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
                return false;
            }
        });
    }

    setQuizLanguage() {
        var languageX = this._constantService.getAllLanguageObj();
        this.languageArr = JSON.parse(languageX);
        if (this.languageArr && this.languageArr.length != 0) {
            for (var i = 0; i < this.languageArr.length; i++) {
                if (this.languageArr[i].LANGUAGE_ID == this.courseLangId) {
                    this.activeLangId = this.courseLangId;
                    this.languageArr[i]['VISIBILITY'] = true;
                    this.visibilityText = this.languageArr[i].LANGUAGE;
                } else {
                    this.languageArr[i]['VISIBILITY'] = false;
                }
            }
        }
    }

    getAllQuestionText(quesIndex) {
        var val = this.contentId.split("study");
        var getTest = {};
        getTest['token'] = this._constantService.getSessionDataBYKey('token');
        getTest['token_param'] = {};
        getTest['token_param']['device_type'] = 'w';
        getTest['token_param']['host'] = '';
        getTest['cntnt_uuid'] = val[0];
        getTest['cors_uuid'] = this.courseId;
        getTest['flow'] = 'd';
        getTest['count'] = 10;
        getTest['pg_uuid'] = this.pageId;
        getTest['last_qstn_index'] = quesIndex;

        this._constantService.fetchDataApi(this._constantService.getAllQuesTextFrmTestServiceUrl(), getTest).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                if (responseData.QUESTION_TEXT.length != 0) {
                    if (quesIndex == 0) {
                        this.quesTextList = [];
                    }

                    if (responseData.QUESTION_TEXT.length == 0) {
                        this.continueScrollQues = false;
                    } else {
                        this.continueScrollQues = true;
                    }
                    this.lastQuesIndex = responseData.QUESTION_TEXT[responseData.QUESTION_TEXT.length - 1].QSTN_ID;
                    this.totalQuestionObj = responseData.QUESTION_COUNT;
                    var quesArr = responseData.QUESTION_TEXT;
                    if (quesArr) {
                        var quesList = [];
                        for (var i = 0; i < quesArr.length; i++) {
                            var QSTN_ID = quesArr[i].QSTN_ID;
                            var subName = "";
                            if (quesArr[i].SUB != null) {
                                subName = quesArr[i].SUB;
                            }
                            var langCount = quesArr[i].QSTN.length;
                            var dataObj = quesArr[i].QSTN;
                            for (var j = 0; j < langCount; j++) {
                                var QuesObj = {};
                                QuesObj['QSTN_ID'] = QSTN_ID;
                                QuesObj['SUB_NAME'] = subName;
                                QuesObj['ESSAY_ID'] = dataObj[j]['ESSAY_ID'];
                                QuesObj['LANG_ID'] = dataObj[j]['LANG_ID'];
                                //                                QuesObj['QSTN_TEXT'] = this._encrypt.decryptutf8(dataObj[j].TEXT);
                                QuesObj['QSTN_TEXT'] = this.postData.decodeURIPostData(dataObj[j].TEXT);
                                QuesObj['QSTN_TEXT'] = this.postData.decodeURIPostData(QuesObj['QSTN_TEXT']);
                                QuesObj['STATIC_TEXT'] = this.postData.pastedDataStrippingByData(QuesObj['QSTN_TEXT']).slice(0, 100);
                                //                                var essayText = this.postData.decodeURIPostData(dataObj[j].ESSAY_TEXT);
                                QuesObj['ESSAY_TEXT'] = this.postData.decodeURIPostData(dataObj[j].ESSAY_TEXT).replace(this.regex, '').slice(0, 100);
                                //                                QuesObj['ESSAY_TEXT'] = this.postData.pastedDataStrippingByData(essayText).slice(0,100);
                                if (dataObj[j]['ESSAY_ID'] != '' && dataObj[j]['ESSAY_ID'] != 0 && dataObj[j]['ESSAY_ID'] != undefined) {
                                    QuesObj['STATUS'] = true;
                                } else {
                                    QuesObj['STATUS'] = false;
                                }
                                if (dataObj[j]['TEXT'].match('%3Cimg') || dataObj[j]['TEXT'].match('%3Ctable')) {
                                    QuesObj['IS_IMAGE'] = true;
                                } else {
                                    QuesObj['IS_IMAGE'] = false;
                                }
                                if (dataObj[j]['UUID']) {
                                    QuesObj['IMAGE_UUID'] = dataObj[j]['UUID'];
                                } else {
                                    QuesObj['IMAGE_UUID'] = "";
                                }
                                quesList.push(QuesObj);
                            }
                        }
                        this.quesTextList.push.apply(this.quesTextList, quesList);
                        setTimeout(() => {
                            MathJax.Hub.Typeset();
                        }, 500)
                        if (this.palletViewFormat == 2) {
                            this.assoQuesPreFormating();
                        }
                        this.totalQuestion = this.quesTextList.length;
                        if (this.quesUpdStatus == false) {
                            this.quesPosition = this.totalQuestionObj + 1;
                        }
                    }
                }
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "Error";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
                return false;
            }
        });
    }

    getAllEssayText(lastEssayId) {
        var val = this.contentId.split("study");
        var getTest = {};
        getTest['token'] = this._constantService.getSessionDataBYKey('token');
        getTest['token_param'] = {};
        getTest['token_param']['device_type'] = 'w';
        getTest['token_param']['host'] = '';
        getTest['cntnt_uuid'] = val[0];
        getTest['cors_uuid'] = this.courseId;
        getTest['pg_uuid'] = this.pageId;
        getTest['flow'] = 'd';
        getTest['count'] = 10;
        getTest['last_ess_index'] = lastEssayId;

        this._constantService.fetchDataApi(this._constantService.getAllEssayTextFrmTestServiceUrl(), getTest).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                if (responseData.ESSAY_DATA.length != 0) {
                    if (this.lastEssayIndex == 0) {
                        this.essayList = [];
                    }
                    this.lastEssayIndex = responseData.ESSAY_DATA[responseData.ESSAY_DATA.length - 1].ESSAY_ID;
                    this.totalEssayObj = responseData.ESSAY_COUNT;
                    var essayArr = responseData.ESSAY_DATA;
                    if (essayArr.length < 10) {
                        this.continueScrollEssay = false;
                    }
                    if (essayArr) {
                        var essayList = [];
                        for (var i = 0; i < essayArr.length; i++) {
                            var ESSAY_ID = essayArr[i].ESSAY_ID;
                            var essayCount = essayArr[i].ESSAY.length;
                            var dataObj = essayArr[i].ESSAY;

                            for (var j = 0; j < essayCount; j++) {
                                var EssayObj = {};
                                EssayObj['ESSAY_ID'] = ESSAY_ID;
                                EssayObj['LANG_ID'] = dataObj[j]['LANG_ID'];
                                var text = this.postData.decodeURIPostData(dataObj[j].TEXT);
                                EssayObj['ESSAY_TEXT'] = this.postData.pastedDataStrippingByData(text).slice(0, 100);
                                EssayObj['ONEVIEW'] = false;

                                if (dataObj[j]['TEXT'].match('%3Cimg') || dataObj[j]['TEXT'].match('%3Ctable')) {
                                    EssayObj['IS_IMAGE'] = true;
                                } else {
                                    EssayObj['IS_IMAGE'] = false;
                                }

                                essayList.push(EssayObj);
                            }
                        }
                        this.essayList.push.apply(this.essayList, essayList);
                        setTimeout(() => {
                            MathJax.Hub.Typeset();
                        }, 500)
                    }
                }
            }
        });
    }



    addTestSubject() {
        var val = this.contentId.split("study");
        var addSubject = {};
        addSubject['token'] = this._constantService.getSessionDataBYKey('token');
        addSubject['token_param'] = {};
        addSubject['token_param']['device_type'] = 'w';
        addSubject['cntnt_uuid'] = val[0];
        addSubject['pg_uuid'] = this.pageId;
        addSubject['cors_uuid'] = this.courseId;
        addSubject['sub'] = this.newSubjectName;

        this._constantService.fetchDataApi(this._constantService.getAddSubjectToTestServiceUrl(), addSubject).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == "success") {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.newSubjectName = '';
                this.getTestSubject();
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "Error";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
                return false;
            }
        });
    }

    getTestSubject() {
        var val = this.contentId.split("study");
        var addSubject = {};
        addSubject['token'] = this._constantService.getSessionDataBYKey('token');
        addSubject['token_param'] = {};
        addSubject['token_param']['device_type'] = 'w';
        addSubject['cntnt_uuid'] = val[0];
        addSubject['cors_uuid'] = this.courseId;


        this._constantService.fetchDataApi(this._constantService.getAllSubjectOfTestServiceUrl(), addSubject).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == "success") {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.subjectArr = responseData.SUBJECT;
                if (this.subjectArr) {
                    for (var i = 0; i < this.subjectArr.length; i++) {
                        if (this.subjectArr[i].KEY == 'S0') {
                            this.changeVisibilityTopic(i);
                        } else {
                            this.subjectArr[i]['VISIBILITY'] = false;
                            this.subjectArr[i]['EDIT'] = false;
                        }
                    }
                }
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "Error";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
                return false;
            }
        });
    }

    resetView() {
        //this.resetCkEditoraddoptions();
        setTimeout(() => {


            this.question_placeholder = true;
            this.solution_placeholder = true;
            this.hint_placeholder = true;
            if (this.AddEssay_sec == 1) {
                // if(document.getElementById("essayData")){
                //     var essayText = document.getElementById("essayData");

                // }else{
                //     var essayText = document.getElementById("cke_essayData");

                // }
                // // var essayText = document.getElementById("essayData");
                // if (essayText) {
                // essayText.innerHTML = "";
                this.resetValueOfckeditor("essayData");
                // }
                return false;
            }
            // if(document.getElementById("q_text")){
            //     var qText = document.getElementById("q_text");

            // }else{
            //     var qText = document.getElementById("cke_q_text");

            // }
            // if (qText) {
            //     qText.innerHTML = "";
            // }
            this.resetValueOfckeditor("q_text");

            // if(document.getElementById("sol_text")){

            // var solText = document.getElementById("sol_text");


            // }else{
            //     var solText = document.getElementById("cke_sol_text");

            // }
            // if (solText) {
            //     solText.innerHTML = "";
            // }
            this.resetValueOfckeditor("sol_text");
            // if(document.getElementById("hint_text")){
            // var hintText = document.getElementById("hint_text");
            //     }
            // else{
            //         var hintText = document.getElementById("cke_hint_text");

            // }
            // if (hintText) {
            //     hintText.innerHTML = "";
            // }
            this.resetValueOfckeditor("hint_text");

            if (this.visibilityTypeQues != 3 && this.visibilityTypeQues != 6) {
                this.resetValueOfckeditor("opt1_text");
                this.resetValueOfckeditor("opt2_text");
                this.resetValueOfckeditor("opt3_text");
                this.resetValueOfckeditor("opt4_text");

                // document.getElementById("opt1_text").innerHTML = "";
                // document.getElementById("opt2_text").innerHTML = "";
                // document.getElementById("opt3_text").innerHTML = "";
                // document.getElementById("opt4_text").innerHTML = "";
                if (this.newOptionAdded > 0) {
                    // document.getElementById("cke_opt5_text").innerHTML = "";
                    this.resetValueOfckeditor("opt5_text");
                }
                if (this.newOptionAdded > 1) {
                    this.resetValueOfckeditor("opt6_text");

                    // document.getElementById("cke_opt6_text").innerHTML = "";
                }
            }
            if (this.visibilityTypeQues == 1) {
                setTimeout(()=>{
                    if(document.querySelector('input[name="singlechoice"]:checked'))
                (<HTMLInputElement>document.querySelector('input[name="singlechoice"]:checked')).checked = false;
                },400);
            }
            if (this.visibilityTypeQues == 2) {
                this.multipleResponseAns = [];
                var nodes = document.querySelectorAll('input[name="multipleres"]:checked');
                var nodesLen = nodes.length;

                for (var i = 0; i < nodesLen; i++) {
                    (<HTMLInputElement>document.querySelector('input[name="multipleres"]:checked')).checked = false;
                }
            }
            if (this.visibilityTypeQues == 3) {
                (<HTMLInputElement>document.querySelector('input[name="truefalse"]:checked')).checked = false;
            }
            if (this.visibilityTypeQues == 4 || this.visibilityTypeQues == 6) {
                this.matchOption1 = "";
                this.matchOption2 = "";
                this.matchOption3 = "";
                this.matchOption4 = "";
                this.matchOption5 = "";
                this.matchOption6 = "";
                this.blankInserted = 0;
                this.resetValueOfckeditor("opt7_text");
                this.resetValueOfckeditor("opt8_text");
                this.resetValueOfckeditor("opt9_text");
                this.resetValueOfckeditor("opt10_text");

                // document.getElementById("cke_opt7_text").innerHTML = "";
                // document.getElementById("cke_opt8_text").innerHTML = "";
                // document.getElementById("cke_opt9_text").innerHTML = "";
                // document.getElementById("cke_opt10_text").innerHTML = "";
                if (this.newOptionAdded > 0) {
                    // document.getElementById("cke_opt11_text").innerHTML = "";
                    this.resetValueOfckeditor("opt11_text");

                }
                if (this.newOptionAdded > 1) {
                    // document.getElementById("cke_opt12_text").innerHTML = "";
                    this.resetValueOfckeditor("opt12_text");

                }
            }
            if (this.visibilityTypeQues == 5) {
                this.selMatMaxOpt1 = [];
                this.selMatMaxOpt2 = [];
                this.selMatMaxOpt3 = [];
                this.selMatMaxOpt4 = [];
                this.selMatMaxOpt5 = [];
                this.selMatMaxOpt6 = [];
                this.resetValueOfckeditor("opt7_text");

                this.resetValueOfckeditor("opt8_text");

                this.resetValueOfckeditor("opt9_text");

                this.resetValueOfckeditor("opt10_text");


                // document.getElementById("cke_opt7_text").innerHTML = "";
                // document.getElementById("cke_opt8_text").innerHTML = "";
                // document.getElementById("cke_opt9_text").innerHTML = "";
                // document.getElementById("cke_opt10_text").innerHTML = "";
                if (this.newOptionAdded > 0) {
                    this.resetValueOfckeditor("opt11_text");

                    // document.getElementById("cke_opt11_text").innerHTML = "";
                }
                if (this.newOptionAdded > 1) {
                    this.resetValueOfckeditor("opt12_text");

                    // document.getElementById("cke_opt12_text").innerHTML = "";
                }
            }


            this.bucketPathFormatFxn();
        }, 500);
    }

    bucketPathFormatFxn() {
        if (this.bucketUuid != '') {
            this.recentBucketId = this.bucketUuid;
            this.bucketUuid = '';
        } else {
            this.recentBucketId = '';
            this.bucketUuid = '';
        }

        this.bucketPath = '';
        this.quesImage = false;
        this.showHintImg = false;
        this.showSolImg = false;
        this.image_upload_question_url = '';
        this.image_upload_solution_url = '';
        this.image_upload_hint_url = '';
        this.optImg1 = false;
        this.option_image1_url = '';
        this.optImg2 = false;
        this.option_image2_url = '';
        this.optImg3 = false;
        this.option_image3_url = '';
        this.optImg4 = false;
        this.option_image4_url = '';
        this.optImg5 = false;
        this.option_image5_url = '';
        this.optImg6 = false;
        this.option_image6_url = '';
        this.optImg7 = false;
        this.option_image7_url = '';
        this.optImg8 = false;
        this.option_image8_url = '';
        this.optImg9 = false;
        this.option_image9_url = '';
        this.optImg10 = false;
        this.option_image10_url = '';
        this.optImg11 = false;
        this.option_image11_url = '';
        this.optImg12 = false;
        this.option_image12_url = '';
        this.imageSet = {
            'qst': '',
            'opt1': '',
            'opt2': '',
            'opt3': '',
            'opt4': '',
            'opt5': '',
            'opt6': '',
            'opt7': '',
            'opt8': '',
            'opt9': '',
            'opt10': '',
            'opt11': '',
            'opt12': '',
            'soln': '',
            'hint': '',
        };
    }

    setFixedView() {
        this.newLangQuesEdition = true;
        // var qText = document.getElementById("cke_q_text");
        // if (qText) {
        //     qText.innerHTML = "";
        // }
        // var solText = document.getElementById("cke_sol_text");
        // if (solText) {
        //     solText.innerHTML = "";
        // }
        // var hintText = document.getElementById("cke_hint_text");
        // if (hintText) {
        //     hintText.innerHTML = "";
        // }
        this.resetValueOfckeditor("q_text");
        this.resetValueOfckeditor("sol_text");
        this.resetValueOfckeditor("hint_text");


    }

    /*Question Type visibility strat*/
    showwalldropdownQuesType() {
        this.walldropdownQuesType = !this.walldropdownQuesType;
    }

    closewalldropdownQuesType() {
        this.walldropdownQuesType = false;
    }

    changeVisibilityQuesType(id, typ) {

        this.newOptionAdded = 0;
        this.MatchOptAns = false;
        this.matchOption1 = "";
        this.matchOption2 = "";
        this.matchOption3 = "";
        this.matchOption4 = "";
        this.matchOption5 = "";
        this.matchOption6 = "";
        this.blankInserted = 0;
        if (id == 1) {
            this.visibilityQuesType = "Multiple choice";
            this.visibilityTypeQues = 1;
        } else if (id == 2) {
            this.visibilityQuesType = "Multiple response";
            this.visibilityTypeQues = 2;

        } else if (id == 3) {
            this.visibilityQuesType = "True and False";
            this.visibilityTypeQues = 3;

        } else if (id == 4) {
            this.visibilityQuesType = "Match Following";
            this.visibilityTypeQues = 4;

        } else if (id == 5) {
            this.visibilityQuesType = "Match Matrix";
            this.visibilityTypeQues = 5;

        } else if (id == 6) {
            this.visibilityQuesType = "Fill in the blanks";
            this.visibilityTypeQues = 6;

        }
        if (typ == 1) {
            this.updateCkEditor();

            // this.resetCkEditoraddoptions();
            // this.DestroyCkEditoraddoptions();
        }


    }
    /*Question Type visibility end*/

    /*SubjectTopic visibility strat*/
    showwalldropdownTopic() {
        this.walldropdownTopic = !this.walldropdownTopic;
    }

    closewalldropdownTopic() {
        this.walldropdownTopic = false;
    }

    changeVisibilityTopic(index) {
        for (var i = 0; i < this.subjectArr.length; i++) {
            if (i == index) {
                this.subjectArr[i].VISIBILITY = true;
            } else {
                this.subjectArr[i].VISIBILITY = false;
            }
        }

        if (index == -1) {
            this.visibilityTopic = "";
            this.activeSubId = "";
            return false;
        }
        this.visibilityTopic = this.subjectArr[index].SUB;
        this.activeSubId = this.subjectArr[index].KEY;
        this.walldropdownTopic = false;

    }
    /*subjectTopic visibility end*/

    changeVisibilityLang(langId, changeTyp) {
        for (var i = 0; i < this.languageArr.length; i++) {
            if (this.languageArr[i].LANGUAGE_ID == langId) {
                this.languageArr[i]['VISIBILITY'] = true;
                this.visibilityText = this.languageArr[i].LANGUAGE;
                this.activeLangId = this.languageArr[i].LANGUAGE_ID;
            } else {
                this.languageArr[i]['VISIBILITY'] = false;
            }
        }

        if (this.quesUpdStatus && changeTyp == 2) {
            for (var i = 0; i < this.quesTextList.length; i++) {
                if (this.quesTextList[i].QSTN_ID === this.activeQuesId) {
                    if (this.quesTextList[i].LANG_ID === this.activeLangId) {
                        this.getQuestionData(this.activeQuesId, this.activeLangId);
                        this.newLangQuesEdition = false;
                        this.newLangQuesUpdate = false;
                        return false;
                    }
                }
            }
            this.setFixedView();
        }

        //        this.visibilityText = this.languageArr[index].LANGUAGE;
        //        this.activeLangId = this.languageArr[index].LANGUAGE_ID;
        //        //this.getAllQuestionText(this.contentId);
    }

    addBlankSpaceToText() {
        this.blankInserted++;

        var html = `&nbsp;<span _ngcontent-c3="" name="blankFields" class="fillblankopt" id="blank_` + this.blankInserted + `">_______________</span>&nbsp;`;
        var sel, range;
        //        document.getElementById('q_text').focus();
        this.postData.placeCaretAtEnd('q_text');
        setTimeout(() => {
            if (window.getSelection) {
                // IE9 and non-IE
                sel = window.getSelection();
                if (sel.getRangeAt && sel.rangeCount) {
                    range = sel.getRangeAt(0);
                    range.deleteContents();

                    // Range.createContextualFragment() would be useful here but is
                    // non-standard and not supported in all browsers (IE9, for one)
                    var el = document.createElement("div");
                    el.innerHTML = html;
                    var frag = document.createDocumentFragment(), node, lastNode;
                    while ((node = el.firstChild)) {
                        lastNode = frag.appendChild(node);
                    }
                    range.insertNode(frag);


                    // Preserve the selection
                    if (lastNode) {
                        range = range.cloneRange();
                        range.setStartAfter(lastNode);
                        range.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                }
            }
        }, 100);
        //        var divObj = document.getElementById('q_text');
        //        if(divObj){
        //            divObj.innerHTML = divObj.innerHTML.replace(/<br>/g, "");
        //        }
    }

    checkboxupdate(event) {
        if (event.target.checked) {
            this.multipleResponseAns.push(event.target.value);
        } else if (!event.target.checked) {
            var index = this.multipleResponseAns.indexOf(event.target.value);
            this.multipleResponseAns.splice(index, 1);
        }
    }

    getEssayData(essayId, langId) {
        var val = this.contentId.split("study");
        this.essayUpdStatus = true;
        //        for (var i = 0; i < this.selectedQuestion.length; i++) {
        //            var index = this.quesAdded.findIndex(x => x.ID == this.selectedQuestion[i]);
        //            this.quesAdded[index].CHECKED = false;
        //            this.quesAdded[index].STATUS = true;
        //        }
        var getEssay = {};
        getEssay['token'] = this._constantService.getSessionDataBYKey('token');
        getEssay['token_param'] = {};
        getEssay['token_param']['device_type'] = 'w';
        getEssay['token_param']['host'] = '';
        getEssay['cntnt_uuid'] = val[0];
        getEssay['essay_id'] = essayId;
        getEssay['lang_id'] = langId;
        getEssay['cors_uuid'] = this.courseId;

        this._constantService.fetchDataApi(this._constantService.getEssayByIdServiceUrl(), getEssay).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == "success") {
                if (langId != this.activeLangId) {
                    this.changeVisibilityLang(langId, 1);
                }
                this.setEssayOneviewKey(essayId);
                this.selectedQuestion = [];
                this.associatedQuesList = responseData.QUESTION_LIST;
                this.essaySaved = true;
                this.essayId = essayId;
                this.essayPosition = essayId;
                this.setckeditorData("essayData", this.postData.decodeURIPostData(responseData.ESSAY_TEXT));
                // document.getElementById("cke_essayData").innerHTML = this.postData.decodeURIPostData(responseData.ESSAY_TEXT);
                //this.selectedQuestion.push.apply(this.selectedQuestion,responseData.QUESTION_LIST);
                //                for (var i = 0; i < responseData.QUESTION_LIST.length; i++) {
                //                    var quesIndx = this.selectedQuestion.indexOf(responseData.QUESTION_LIST[i]);
                //                    if (quesIndx == -1) {
                //                        this.selectedQuestion.push(responseData.QUESTION_LIST[i]);
                //                    }
                //                    var index = this.quesAdded.findIndex(x => x.ID == responseData.QUESTION_LIST[i]);
                //                    this.quesAdded[index].CHECKED = true;
                //                    this.quesAdded[index].STATUS = false;
                //                }
                //                this.QuesPallettabClick(1);
            }
        });
    }


    updateEssay() {
        var val = this.contentId.split("study");
        var updEssay = {};
        updEssay['token'] = this._constantService.getSessionDataBYKey('token');
        updEssay['token_param'] = {};
        updEssay['token_param']['device_type'] = 'w';
        updEssay['token_param']['host'] = '';
        updEssay['pg_uuid'] = this.pageId;
        updEssay['lang_id'] = this.activeLangId;
        updEssay['cntnt_uuid'] = val[0];
        updEssay['essay_id'] = this.essayId;
        updEssay['cors_uuid'] = this.courseId;
        var essayData = this.getckeditorData("essayData");
        //  this.postData.removeUnwantedContent("essayData");
        if (essayData == "") {
            this.dataConf['type'] = 2;
            this.dataConf['msg'] = "Error";
            this.dataConf['error_msg'] = "Please provide some acceptable data.";
            this.openConfirmation = true;
            return false;
        } else {
            updEssay['essay_txt'] = this.postData.encodeURIPostData(essayData);
        }


        this._constantService.fetchDataApi(this._constantService.getUpdateEssayServiceUrl(), updEssay).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == "success") {
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.essaySaved = false;
                this.resetValueOfckeditor("essayData");
                var index = this.essayList.findIndex(x => x.ESSAY_ID == parseInt(this.essayId));
                var text = this.postData.pastedDataStrippingByData(essayData);
                this.essayList[index].ESSAY_TEXT = text.slice(0, 100);
            }
        });
    }

    deleteEssayFromTest(essayId, langId, index) {
        event.stopPropagation();
        var val = this.contentId.split("study");
        var delEssay = {};
        delEssay['token'] = this._constantService.getSessionDataBYKey('token');
        delEssay['token_param'] = {};
        delEssay['token_param']['device_type'] = 'w';
        delEssay['token_param']['host'] = '';
        delEssay['pg_uuid'] = this.pageId;
        delEssay['lang_id'] = langId;
        delEssay['cntnt_uuid'] = val[0];
        delEssay['essay_id'] = essayId;
        delEssay['cors_uuid'] = this.courseId;


        this._constantService.fetchDataApi(this._constantService.getDeleteEssayFromTestServiceUrl(), delEssay).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == "success") {
                this.totalEssayObj--;
                //                this.essayList.splice(index, 1);
                this.essayList = [];
                this.essaySaved = false;
                this.getAllEssayText(0);
                this.getAllQuestionText(0);
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "Error";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
                return false;
            }
        });
    }




    addEssayToTest() {
        if (this.addEssayHitted) {
            return false;
        } else {
            this.addEssayHitted = true;
            if (this.essaySaved) {
                this.updateEssay();
                this.addEssayHitted = false;
            } else {
                var addEssay = {};
                addEssay['token'] = this._constantService.getSessionDataBYKey('token');
                addEssay['token_param'] = {};
                addEssay['token_param']['device_type'] = 'w';
                addEssay['token_param']['host'] = '';
                addEssay['lang_id'] = this.activeLangId;
                addEssay['cntnt_uuid'] = this.contentId;
                addEssay['essay_id'] = "0";
                addEssay['pg_uuid'] = this.pageId;
                addEssay['cors_uuid'] = this.courseId;
                // var essayData = this.postData.removeUnwantedContent("essayData");
                var essayData = this.getckeditorData("essayData");
                if (essayData == "") {
                    this.dataConf['type'] = 2;
                    this.dataConf['msg'] = "Error";
                    this.dataConf['error_msg'] = "Please provide some acceptable data.";
                    this.openConfirmation = true;
                    this.addEssayHitted = false;
                    return false;
                } else {
                    addEssay['essay_txt'] = this.postData.encodeURIPostData(essayData);
                }

                var addQuestion = false;
                if (addQuestion) {
                } else {
                    this._constantService.fetchDataApi(this._constantService.getAddEssayToTestServiceUrl(), addEssay).subscribe(data => {
                        var responseData:any = data;
                        var status = responseData.STATUS;
                        if (status == "success") {
                            this.lastEssayIndex = responseData.ESSAY_ID;
                            this.resetView();
                            this.totalEssayObj++;
                            var EssayObj = {};
                            EssayObj['ESSAY_ID'] = responseData.ESSAY_ID;
                            EssayObj['LANG_ID'] = this.activeLangId;
                            //                        var text = this.postData.pastedDataStrippingByData(essayData);                        
                            //                        
                            var text = essayData;

                            EssayObj['ESSAY_TEXT'] = this.postData.pastedDataStrippingByData(text);
                            this.essayList.push(EssayObj);
                            setTimeout(() => { this.addEssayHitted = false; }, 600);

                        } else {
                            this.addEssayHitted = false;
                        }
                    });
                }
            }
            setTimeout(() => {
                MathJax.Hub.Typeset();
            }, 500)
        }
    }

    addQuestionToTest(action) {

        if (!this.isQuesSaving) {
            this.isQuesSaving = true;
            var addQues = {};
            addQues['token'] = this._constantService.getSessionDataBYKey('token');
            addQues['token_param'] = {};
            addQues['token_param']['device_type'] = 'w';
            addQues['token_param']['host'] = '';
            addQues['pg_uuid'] = this.pageId;
            addQues['cntnt_uuid'] = this.contentId;
            addQues['lang_id'] = this.activeLangId;
            addQues['sub_id'] = this.activeSubId;
            addQues['type'] = this.visibilityTypeQues;
            addQues['cors_uuid'] = this.courseId;

            addQues['fpath'] = "";
            addQues['dimns'] = this.imageSet;
            if (this.bucketUuid == '') {
                addQues['fpath'] = "";
                addQues['uuid'] = "";
            } else {
                addQues['fpath'] = this.bucketPath;
                addQues['uuid'] = this.bucketUuid;
            }
            if (this.quesUpdStatus) {
                addQues['qstn_no'] = this.quesPosition;
            } else {
                addQues['position'] = "";
                addQues['qstn_no'] = "";
            }

            // var hint = this.postData.removeUnwantedContent('hint_text');
            var hint = this.getckeditorData("hint_text");
            //        var hint = this.hintData;
            if (hint != '') {
                addQues['hint'] = this.postData.encodeURIPostData(hint);
            } else {
                addQues['hint'] = "";
            }

            // var soln = this.postData.removeUnwantedContent('sol_text');
            var soln = this.getckeditorData("sol_text");
            console.log(soln);
            //        var soln = this.solutionData;
            if (soln != '') {
                addQues['soln'] = this.postData.encodeURIPostData(soln);
            } else {
                addQues['soln'] = "";
            }

            addQues['essay_id'] = "";
            //removed by asif
            // var postData = this.postData.removeUnwantedContent("q_text");
            // var div = document.getElementById('q_text');
            // if (div) {
            //     var postDataText = div.innerHTML.trim().replace(/<br>/g, '');
            //     // var postDataText = div.innerText.trim().replace(/<br>/g, '');

            // }
            var postData = this.getckeditorData("q_text");

            // var postData = document.getElementById('cke_q_text').innerHTML;
            addQues['text'] = "";

            if (postData != "") {
                addQues['text'] = this.postData.encodeURIPostData(postData);
                //            addQues['text'] = this.questionData;
            } else if (this.quesImage == false || this.visibilityTypeQues == 6 || this.question_placeholder) {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = "Please enter question data";
                this.openConfirmation = true;
                this.isQuesSaving = false;
                return false;
            }



            switch (this.visibilityTypeQues) {
                case 1: {
                    var opt1 = this.getckeditorData('opt1_text');
                    var opt2 = this.getckeditorData('opt2_text');
                    var opt3 = this.getckeditorData('opt3_text');
                    var opt4 = this.getckeditorData('opt4_text');
                    // var opt1 = document.getElementById('cke_opt1_text').innerHTML;
                    // opt1 = this.postData.pastedDataStrippingByData(opt1);
                    // var opt2 = document.getElementById('cke_opt2_text').innerHTML;
                    // opt2 = this.postData.pastedDataStrippingByData(opt2);
                    // var opt3 = document.getElementById('cke_opt3_text').innerHTML;
                    // opt3 = this.postData.pastedDataStrippingByData(opt3);
                    // var opt4 = document.getElementById('cke_opt4_text').innerHTML;
                    // opt4 = this.postData.pastedDataStrippingByData(opt4);
                    console.log(this.getckeditorData('opt1_text'));

                    if (!opt1 && this.optImg1 == false) {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "STUDY24X7";
                        this.dataConf['error_msg'] = "Please add data in options";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    } else {
                        if (this.postData.encodeURIPostData(opt1)) {
                            addQues['val1'] = this.postData.encodeURIPostData(opt1);
                        } else {
                            addQues['val1'] = "";
                        }
                    }
                    if (!opt2 && this.optImg2 == false) {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "Error";
                        this.dataConf['error_msg'] = "Please add data in options";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    } else {
                        if (this.postData.encodeURIPostData(opt2)) {
                            addQues['val2'] = this.postData.encodeURIPostData(opt2);
                        } else {
                            addQues['val2'] = "";
                        }
                    }
                    if (!opt3 && this.optImg3 == false) {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "Error";
                        this.dataConf['error_msg'] = "Please add data in options";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    } else {
                        if (this.postData.encodeURIPostData(opt3)) {
                            addQues['val3'] = this.postData.encodeURIPostData(opt3);
                        } else {
                            addQues['val3'] = "";
                        }
                    }
                    if (!opt4 && this.optImg4 == false) {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "Error";
                        this.dataConf['error_msg'] = "Please add data in options";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    } else {
                        if (this.postData.encodeURIPostData(opt4)) {
                            addQues['val4'] = this.postData.encodeURIPostData(opt4);
                        } else {
                            addQues['val4'] = "";
                        }
                    }
                    if (this.newOptionAdded > 0) {
                        // var opt5 = document.getElementById('opt5_text').innerHTML;
                        var opt5 = this.getckeditorData('opt5_text');
                        //opt5 = this.postData.pastedDataStrippingByData(opt5);
                        if (!opt5 && this.optImg5 == false) {
                            this.dataConf['type'] = 2;
                            this.dataConf['msg'] = "Error";
                            this.dataConf['error_msg'] = "Please add data in options";
                            this.openConfirmation = true;
                            this.isQuesSaving = false;
                            return false;
                        } else {
                            if (this.postData.encodeURIPostData(opt5)) {
                                addQues['val5'] = this.postData.encodeURIPostData(opt5);
                            } else {
                                addQues['val5'] = "";
                            }
                        }
                    } else {
                        addQues['val5'] = "";
                    }
                    if (this.newOptionAdded > 1) {
                        // var opt6 = document.getElementById('cke_opt6_text').innerHTML;
                        var opt6 = this.getckeditorData('opt6_text');
                        //opt6 = this.postData.pastedDataStrippingByData(opt6);
                        if (!opt6 && this.optImg6 == false) {
                            this.dataConf['type'] = 2;
                            this.dataConf['msg'] = "Error";
                            this.dataConf['error_msg'] = "Please add data in options";
                            this.openConfirmation = true;
                            this.isQuesSaving = false;
                            return false;
                        } else {
                            if (this.postData.encodeURIPostData(opt6)) {
                                addQues['val6'] = this.postData.encodeURIPostData(opt6);
                            } else {
                                addQues['val6'] = "";
                            }
                        }
                    } else {
                        addQues['val6'] = "";
                    }


                    var selectedAns = (<HTMLInputElement>document.querySelector('input[name="singlechoice"]:checked'));
                    if (selectedAns != null) {
                        addQues['corr_ansr'] = selectedAns.value;
                    } else {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "Error";
                        this.dataConf['error_msg'] = "Please select an answer for this question.";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    }
                    break;
                }

                case 2: {
                    var opt1 = this.getckeditorData('opt1_text');
                    var opt2 = this.getckeditorData('opt2_text');
                    var opt3 = this.getckeditorData('opt3_text');
                    var opt4 = this.getckeditorData('opt4_text');
                    // var opt1 = document.getElementById('cke_opt1_text').innerHTML;
                    // opt1 = this.postData.pastedDataStrippingByData(opt1);
                    // var opt2 = document.getElementById('cke_opt2_text').innerHTML;
                    // opt2 = this.postData.pastedDataStrippingByData(opt2);
                    // var opt3 = document.getElementById('cke_opt3_text').innerHTML;
                    // opt3 = this.postData.pastedDataStrippingByData(opt3);
                    // var opt4 = document.getElementById('cke_opt4_text').innerHTML;
                    // opt4 = this.postData.pastedDataStrippingByData(opt4);
                    if (!opt1 && this.optImg1 == false) {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "STUDY24X7";
                        this.dataConf['error_msg'] = "Please add data in options";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    } else {
                        if (this.postData.encodeURIPostData(opt1)) {
                            addQues['val1'] = this.postData.encodeURIPostData(opt1);
                        } else {
                            addQues['val1'] = "";
                        }
                    }
                    if (!opt2 && this.optImg2 == false) {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "Error";
                        this.dataConf['error_msg'] = "Please add data in options";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    } else {
                        if (this.postData.encodeURIPostData(opt2)) {
                            addQues['val2'] = this.postData.encodeURIPostData(opt2);
                        } else {
                            addQues['val2'] = "";
                        }
                    }
                    if (!opt3 && this.optImg3 == false) {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "Error";
                        this.dataConf['error_msg'] = "Please add data in options";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    } else {
                        if (this.postData.encodeURIPostData(opt3)) {
                            addQues['val3'] = this.postData.encodeURIPostData(opt3);
                        } else {
                            addQues['val3'] = "";
                        }
                    }
                    if (!opt4 && this.optImg4 == false) {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "Error";
                        this.dataConf['error_msg'] = "Please add data in options";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    } else {
                        if (this.postData.encodeURIPostData(opt4)) {
                            addQues['val4'] = this.postData.encodeURIPostData(opt4);
                        } else {
                            addQues['val4'] = "";
                        }
                    }
                    if (this.newOptionAdded > 0) {
                        // var opt5 = document.getElementById('cke_opt5_text').innerHTML;
                        var opt5 = this.getckeditorData('opt5_text');
                        ///opt5 = this.postData.pastedDataStrippingByData(opt5);
                        if (!opt5 && this.optImg5 == false) {
                            this.dataConf['type'] = 2;
                            this.dataConf['msg'] = "Error";
                            this.dataConf['error_msg'] = "Please add data in options";
                            this.openConfirmation = true;
                            this.isQuesSaving = false;
                            return false;
                        } else {
                            if (this.postData.encodeURIPostData(opt5)) {
                                addQues['val5'] = this.postData.encodeURIPostData(opt5);
                            } else {
                                addQues['val5'] = "";
                            }
                        }
                    } else {
                        addQues['val5'] = "";
                    }
                    if (this.newOptionAdded > 1) {
                        // var opt6 = document.getElementById('cke_opt6_text').innerHTML;
                        var opt6 = this.getckeditorData('opt6_text');

                        //opt6 = this.postData.pastedDataStrippingByData(opt6);
                        if (!opt6 && this.optImg6 == false) {
                            this.dataConf['type'] = 2;
                            this.dataConf['msg'] = "Error";
                            this.dataConf['error_msg'] = "Please add data in options";
                            this.openConfirmation = true;
                            this.isQuesSaving = false;
                            return false;
                        } else {
                            if (this.postData.encodeURIPostData(opt6)) {
                                addQues['val6'] = this.postData.encodeURIPostData(opt6);
                            } else {
                                addQues['val6'] = "";
                            }
                        }
                    } else {
                        addQues['val6'] = "";
                    }

                    if (this.multipleResponseAns.length == 0) {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "Error";
                        this.dataConf['error_msg'] = "Please Select Answers for this Question";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    } else {
                        addQues['corr_ansr'] = this.multipleResponseAns.join();
                    }
                    break;
                }

                case 3: {

                    addQues['val1'] = "true";
                    addQues['val2'] = "false";
                    var selectedAns = (<HTMLInputElement>document.querySelector('input[name="truefalse"]:checked'));
                    if (selectedAns != null) {
                        addQues['corr_ansr'] = selectedAns.value;
                    } else {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "STUDY24X7";
                        this.dataConf['error_msg'] = "Please Select Answer for this Question";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    }
                    break;
                }

                case 4: {
                    // var opt1 = this.postData.removeUnwantedContent("opt1_text");
                    // var opt2 = this.postData.removeUnwantedContent("opt2_text");
                    // var opt3 = this.postData.removeUnwantedContent("opt3_text");
                    // var opt4 = this.postData.removeUnwantedContent("opt4_text");
                    // var opt7 = this.postData.removeUnwantedContent("opt7_text");
                    // var opt8 = this.postData.removeUnwantedContent("opt8_text");
                    // var opt9 = this.postData.removeUnwantedContent("opt9_text");
                    // var opt10 = this.postData.removeUnwantedContent("opt10_text");
                    var opt1 = this.getckeditorData("opt1_text");
                    var opt2 = this.getckeditorData("opt2_text");
                    var opt3 = this.getckeditorData("opt3_text");
                    var opt4 = this.getckeditorData("opt4_text");
                    var opt7 = this.getckeditorData("opt7_text");
                    var opt8 = this.getckeditorData("opt8_text");
                    var opt9 = this.getckeditorData("opt9_text");
                    var opt10 = this.getckeditorData("opt10_text");
                    if (opt1 == "" && this.optImg1 == false) {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "STUDY24X7";
                        this.dataConf['error_msg'] = "Please add data in options";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    } else {
                        addQues['val1'] = this.postData.encodeURIPostData(opt1);
                    }
                    if (opt2 == "" && this.optImg2 == false) {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "Error";
                        this.dataConf['error_msg'] = "Please add data in options";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    } else {
                        addQues['val2'] = this.postData.encodeURIPostData(opt2);
                    }
                    if (opt3 == "" && this.optImg3 == false) {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "Error";
                        this.dataConf['error_msg'] = "Please add data in options";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    } else {
                        addQues['val3'] = this.postData.encodeURIPostData(opt3);
                    }
                    if (opt4 == "" && this.optImg4 == false) {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "Error";
                        this.dataConf['error_msg'] = "Please add data in options";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    } else {
                        addQues['val4'] = this.postData.encodeURIPostData(opt4);
                    }
                    if (opt7 == "" && this.optImg7 == false) {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "Error";
                        this.dataConf['error_msg'] = "Please add data in options";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    } else {
                        addQues['val7'] = this.postData.encodeURIPostData(opt7);
                    }
                    if (opt8 == "" && this.optImg8 == false) {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "Error";
                        this.dataConf['error_msg'] = "Please add data in options";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    } else {
                        addQues['val8'] = this.postData.encodeURIPostData(opt8);
                    }
                    if (opt9 == "" && this.optImg9 == false) {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "Error";
                        this.dataConf['error_msg'] = "Please add data in options";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    } else {
                        addQues['val9'] = this.postData.encodeURIPostData(opt9);
                    }
                    if (opt10 == "" && this.optImg10 == false) {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "Error";
                        this.dataConf['error_msg'] = "Please add data in options";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    } else {
                        addQues['val10'] = this.postData.encodeURIPostData(opt10);
                    }

                    if (this.newOptionAdded > 0) {
                        var opt11 = this.postData.removeUnwantedContent("opt11_text");
                        if (opt11 == "" && this.optImg11 == false) {
                            this.dataConf['type'] = 2;
                            this.dataConf['msg'] = "Error";
                            this.dataConf['error_msg'] = "Please add data in options";
                            this.openConfirmation = true;
                            this.isQuesSaving = false;
                            return false;
                        } else {
                            addQues['val11'] = this.postData.encodeURIPostData(opt11);
                        }

                        // var opt5 = this.postData.removeUnwantedContent("opt5_text");
                        var opt5 = this.getckeditorData("opt5_text");
                        if (opt5 == "" && this.optImg5 == false) {
                            this.dataConf['type'] = 2;
                            this.dataConf['msg'] = "Error";
                            this.dataConf['error_msg'] = "Please add data in options";
                            this.openConfirmation = true;
                            this.isQuesSaving = false;
                            return false;
                        } else {
                            addQues['val5'] = this.postData.encodeURIPostData(opt5);
                        }
                    } else {
                        addQues['val5'] = "";
                        addQues['val11'] = "";
                    }
                    if (this.newOptionAdded > 1) {
                        // var opt12 = this.postData.removeUnwantedContent("opt12_text");
                        var opt12 = this.getckeditorData("opt12_text");
                        if (opt12 == "" && this.optImg12 == false) {
                            this.dataConf['type'] = 2;
                            this.dataConf['msg'] = "Error";
                            this.dataConf['error_msg'] = "Please add data in options";
                            this.openConfirmation = true;
                            this.isQuesSaving = false;
                            return false;
                        } else {
                            addQues['val12'] = this.postData.encodeURIPostData(opt12);
                        }

                        // var opt6 = this.postData.removeUnwantedContent("opt6_text");
                        var opt6 = this.getckeditorData("opt6_text");
                        if (opt6 == "" && this.optImg6 == false) {
                            this.dataConf['type'] = 2;
                            this.dataConf['msg'] = "Error";
                            this.dataConf['error_msg'] = "Please add data in options";
                            this.openConfirmation = true;
                            this.isQuesSaving = false;
                            return false;
                        } else {
                            addQues['val6'] = this.postData.encodeURIPostData(opt6);
                        }
                    } else {
                        addQues['val6'] = "";
                        addQues['val12'] = "";
                    }

                    if (this.matchOption1 == "" || this.matchOption2 == "" || this.matchOption3 == "" || this.matchOption4 == "") {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "Error";
                        this.dataConf['error_msg'] = "Please provide acceptable Question-Answer set.";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    } else {
                        var optAns = [];
                        optAns.push(this.matchOption1, this.matchOption2, this.matchOption3, this.matchOption4);
                        if (this.newOptionAdded > 0) {
                            optAns.push(this.matchOption5);
                        }
                        if (this.newOptionAdded > 1) {
                            optAns.push(this.matchOption6);
                        }
                        var count = this.postData.searchStringInArray(this.matchOption1.slice(1, 3), optAns);
                        if (count > 1) {
                            this.dataConf['type'] = 2;
                            this.dataConf['msg'] = "Error";
                            this.dataConf['error_msg'] = "Please Select unique Answers for all options";
                            this.openConfirmation = true;
                            this.isQuesSaving = false;
                            return false;
                        }
                        count = this.postData.searchStringInArray(this.matchOption2.slice(1, 3), optAns);
                        if (count > 1) {
                            this.dataConf['type'] = 2;
                            this.dataConf['msg'] = "Error";
                            this.dataConf['error_msg'] = "Please Select unique Answers for all options";
                            this.openConfirmation = true;
                            this.isQuesSaving = false;
                            return false;
                        }
                        count = this.postData.searchStringInArray(this.matchOption3.slice(1, 3), optAns);
                        if (count > 1) {
                            this.dataConf['type'] = 2;
                            this.dataConf['msg'] = "Error";
                            this.dataConf['error_msg'] = "Please Select unique Answers for all options";
                            this.openConfirmation = true;
                            this.isQuesSaving = false;
                            return false;
                        }
                        count = this.postData.searchStringInArray(this.matchOption4.slice(1, 3), optAns);
                        if (count > 1) {
                            this.dataConf['type'] = 2;
                            this.dataConf['msg'] = "Error";
                            this.dataConf['error_msg'] = "Please Select unique Answers for all options";
                            this.openConfirmation = true;
                            this.isQuesSaving = false;
                            return false;
                        }
                        if (this.newOptionAdded > 0) {
                            count = this.postData.searchStringInArray(this.matchOption5.slice(1, 3), optAns);
                            if (count > 1) {
                                this.dataConf['type'] = 2;
                                this.dataConf['msg'] = "Error";
                                this.dataConf['error_msg'] = "Please Select unique Answers for all options";
                                this.openConfirmation = true;
                                this.isQuesSaving = false;
                                return false;
                            }
                        }
                        if (this.newOptionAdded > 1) {
                            count = this.postData.searchStringInArray(this.matchOption6.slice(1, 3), optAns);
                            if (count > 1) {
                                this.dataConf['type'] = 2;
                                this.dataConf['msg'] = "Error";
                                this.dataConf['error_msg'] = "Please Select unique Answers for all options";
                                this.openConfirmation = true;
                                this.isQuesSaving = false;
                                return false;
                            }
                        }
                        addQues['corr_ansr'] = optAns.join();
                    }
                    break;
                }

                case 5: {
                    // var opt1 = this.postData.removeUnwantedContent("opt1_text");
                    // var opt2 = this.postData.removeUnwantedContent("opt2_text");
                    // var opt3 = this.postData.removeUnwantedContent("opt3_text");
                    // var opt4 = this.postData.removeUnwantedContent("opt4_text");
                    // var opt7 = this.postData.removeUnwantedContent("opt7_text");
                    // var opt8 = this.postData.removeUnwantedContent("opt8_text");
                    // var opt9 = this.postData.removeUnwantedContent("opt9_text");
                    // var opt10 = this.postData.removeUnwantedContent("opt10_text");
                    var opt1 = this.getckeditorData("opt1_text");
                    var opt2 = this.getckeditorData("opt2_text");
                    var opt3 = this.getckeditorData("opt3_text");
                    var opt4 = this.getckeditorData("opt4_text");
                    var opt7 = this.getckeditorData("opt7_text");
                    var opt8 = this.getckeditorData("opt8_text");
                    var opt9 = this.getckeditorData("opt9_text");
                    var opt10 = this.getckeditorData("opt10_text");
                    console.log('asif opt 1', opt1, opt2)
                    if (opt1 == "" && this.optImg1 == false) {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "STUDY24X7";
                        this.dataConf['error_msg'] = "Please add data in options";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    } else {
                        addQues['val1'] = this.postData.encodeURIPostData(opt1);
                    }
                    if (opt2 == "" && this.optImg2 == false) {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "Error";
                        this.dataConf['error_msg'] = "Please add data in options";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    } else {
                        addQues['val2'] = this.postData.encodeURIPostData(opt2);
                    }
                    if (opt3 == "" && this.optImg3 == false) {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "Error";
                        this.dataConf['error_msg'] = "Please add data in options";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    } else {
                        addQues['val3'] = this.postData.encodeURIPostData(opt3);
                    }
                    if (opt4 == "" && this.optImg4 == false) {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "Error";
                        this.dataConf['error_msg'] = "Please add data in options";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    } else {
                        addQues['val4'] = this.postData.encodeURIPostData(opt4);
                    }
                    if (opt7 == "" && this.optImg7 == false) {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "Error";
                        this.dataConf['error_msg'] = "Please add data in options";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    } else {
                        addQues['val7'] = this.postData.encodeURIPostData(opt7);
                    }
                    if (opt8 == "" && this.optImg8 == false) {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "Error";
                        this.dataConf['error_msg'] = "Please add data in options";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    } else {
                        addQues['val8'] = this.postData.encodeURIPostData(opt8);
                    }
                    if (opt9 == "" && this.optImg9 == false) {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "Error";
                        this.dataConf['error_msg'] = "Please add data in options";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    } else {
                        addQues['val9'] = this.postData.encodeURIPostData(opt9);
                    }
                    if (opt10 == "" && this.optImg10 == false) {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "Error";
                        this.dataConf['error_msg'] = "Please add data in options";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    } else {
                        addQues['val10'] = this.postData.encodeURIPostData(opt10);
                    }

                    if (this.newOptionAdded > 0) {
                        // var opt11 = this.postData.removeUnwantedContent("opt11_text");
                        var opt11 = "";
                        opt11 = this.getckeditorData("opt11_text");
                        if (opt11 == "" && this.optImg11 == false) {
                            this.dataConf['type'] = 2;
                            this.dataConf['msg'] = "Error";
                            this.dataConf['error_msg'] = "Please add data in options";
                            this.openConfirmation = true;
                            this.isQuesSaving = false;
                            return false;
                        } else {
                            addQues['val11'] = this.postData.encodeURIPostData(opt11);
                        }

                        // var opt5 = this.postData.removeUnwantedContent("opt5_text");
                        var opt5 = this.getckeditorData("opt5_text");
                        if (opt5 == "" && this.optImg5 == false) {
                            this.dataConf['type'] = 2;
                            this.dataConf['msg'] = "Error";
                            this.dataConf['error_msg'] = "Please add data in options";
                            this.openConfirmation = true;
                            this.isQuesSaving = false;
                            return false;
                        } else {
                            addQues['val5'] = this.postData.encodeURIPostData(opt5);
                        }
                    } else {
                        addQues['val5'] = "";
                        addQues['val11'] = "";
                    }
                    if (this.newOptionAdded > 1) {
                        // var opt12 = this.postData.removeUnwantedContent("opt12_text");
                        var opt12 = this.getckeditorData("opt12_text");
                        if (opt12 == "" && this.optImg12 == false) {
                            this.dataConf['type'] = 2;
                            this.dataConf['msg'] = "Error";
                            this.dataConf['error_msg'] = "Please add data in options";
                            this.openConfirmation = true;
                            this.isQuesSaving = false;
                            return false;
                        } else {
                            addQues['val12'] = this.postData.encodeURIPostData(opt12);
                        }

                        // var opt6 = this.postData.removeUnwantedContent("opt6_text");
                        var opt6 = this.getckeditorData("opt6_text");
                        if (opt6 == "" && this.optImg6 == false) {
                            this.dataConf['type'] = 2;
                            this.dataConf['msg'] = "Error";
                            this.dataConf['error_msg'] = "Please add data in options";
                            this.openConfirmation = true;
                            this.isQuesSaving = false;
                            return false;
                        } else {
                            addQues['val6'] = this.postData.encodeURIPostData(opt6);
                        }
                    } else {
                        addQues['val6'] = "";
                        addQues['val12'] = "";
                    }

                    var selectedMatMaxAns = [];
                    if (this.selMatMaxOpt1.length == 0 || this.selMatMaxOpt2.length == 0 || this.selMatMaxOpt3.length == 0 || this.selMatMaxOpt4.length == 0) {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "Error";
                        this.dataConf['error_msg'] = "Please provide acceptable Question-Answer set.";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    } else {
                        selectedMatMaxAns.push.apply(selectedMatMaxAns, this.selMatMaxOpt1);
                        selectedMatMaxAns.push.apply(selectedMatMaxAns, this.selMatMaxOpt2);
                        selectedMatMaxAns.push.apply(selectedMatMaxAns, this.selMatMaxOpt3);
                        selectedMatMaxAns.push.apply(selectedMatMaxAns, this.selMatMaxOpt4);
                    }
                    if (this.newOptionAdded > 0 && this.selMatMaxOpt5.length == 0) {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "Error";
                        this.dataConf['error_msg'] = "Please provide acceptable Question-Answer set.";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    } else {
                        selectedMatMaxAns.push.apply(selectedMatMaxAns, this.selMatMaxOpt5);
                    }
                    if (this.newOptionAdded > 1 && this.selMatMaxOpt6.length == 0) {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "Error";
                        this.dataConf['error_msg'] = "Please provide acceptable Question-Answer set.";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    } else {
                        selectedMatMaxAns.push.apply(selectedMatMaxAns, this.selMatMaxOpt6);
                    }
                    addQues['corr_ansr'] = selectedMatMaxAns.join();
                    break;
                }

                case 6: {

                    if (this.blankInserted == 0) {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "Error";
                        this.dataConf['error_msg'] = "Please Add Data in question";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    }
                    // var opt7 = this.postData.removeUnwantedContent("opt7_text");
                    // var opt8 = this.postData.removeUnwantedContent("opt8_text");
                    // var opt9 = this.postData.removeUnwantedContent("opt9_text");
                    // var opt10 = this.postData.removeUnwantedContent("opt10_text");
                    var opt7 = this.getckeditorData("opt7_text");
                    var opt8 = this.getckeditorData("opt8_text");
                    var opt9 = this.getckeditorData("opt9_text");
                    var opt10 = this.getckeditorData("opt10_text");

                    if (opt7 == "" && this.blankInserted > 0) {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "Error";
                        this.dataConf['error_msg'] = "Please add data in options";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    } else {
                        addQues['val7'] = this.postData.encodeURIPostData(opt7);
                    }
                    if (opt8 == "" && this.blankInserted > 1) {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "Error";
                        this.dataConf['error_msg'] = "Please add data in options";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    } else {
                        addQues['val8'] = this.postData.encodeURIPostData(opt8);
                    }
                    if (opt9 == "" && this.blankInserted > 2) {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "Error";
                        this.dataConf['error_msg'] = "Please add data in options";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    } else {
                        addQues['val9'] = this.postData.encodeURIPostData(opt9);
                    }
                    if (opt10 == "" && this.blankInserted > 3) {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "Error";
                        this.dataConf['error_msg'] = "Please add data in options";
                        this.openConfirmation = true;
                        this.isQuesSaving = false;
                        return false;
                    } else {
                        addQues['val10'] = this.postData.encodeURIPostData(opt10);
                    }

                    if (this.newOptionAdded > 0) {
                        // var opt11 = this.postData.removeUnwantedContent("opt11_text");
                        var opt11 = '';
                        opt11 = this.getckeditorData("opt11_text");
                        if (opt11 == "" && this.blankInserted > 4) {
                            this.dataConf['type'] = 2;
                            this.dataConf['msg'] = "Error";
                            this.dataConf['error_msg'] = "Please add data in options";
                            this.openConfirmation = true;
                            this.isQuesSaving = false;
                            return false;
                        } else {
                            addQues['val11'] = this.postData.encodeURIPostData(opt11);
                        }
                    } else {
                        addQues['val11'] = "";
                    }
                    if (this.newOptionAdded > 1) {
                        // var opt12 = this.postData.removeUnwantedContent("opt12_text");
                        var opt12 = this.getckeditorData("opt12_text");
                        if (opt12 == "" && this.blankInserted > 5) {
                            this.dataConf['type'] = 2;
                            this.dataConf['msg'] = "Error";
                            this.dataConf['error_msg'] = "Please add data in options";
                            this.openConfirmation = true;
                            this.isQuesSaving = false;
                            return false;
                        } else {
                            addQues['val12'] = this.postData.encodeURIPostData(opt12);
                        }
                    } else {
                        addQues['val12'] = "";
                    }

                    if (this.blankInserted == 1) {
                        if (this.matchOption1 == "") {
                            this.dataConf['type'] = 2;
                            this.dataConf['msg'] = "Error";
                            this.dataConf['error_msg'] = "Please provide acceptable Question-Answer set.";
                            this.openConfirmation = true;
                            this.isQuesSaving = false;
                            return false;
                        } else {
                            var optAns = [];
                            optAns.push(this.matchOption1);
                            var count = this.postData.searchStringInArray(this.matchOption1.slice(1, 3), optAns);
                            if (count > 1) {
                                this.dataConf['type'] = 2;
                                this.dataConf['msg'] = "Error";
                                this.dataConf['error_msg'] = "Please Select unique Answers for all options";
                                this.openConfirmation = true;
                                this.isQuesSaving = false;
                                return false;
                            }
                            addQues['corr_ansr'] = optAns.join();
                        }
                    } else if (this.blankInserted == 2) {
                        if (this.matchOption1 == "" || this.matchOption2 == "") {
                            this.dataConf['type'] = 2;
                            this.dataConf['msg'] = "Error";
                            this.dataConf['error_msg'] = "Please provide acceptable Question-Answer set.";
                            this.openConfirmation = true;
                            this.isQuesSaving = false;
                            return false;
                        } else {
                            var optAns = [];
                            optAns.push(this.matchOption1, this.matchOption2);
                            var count = this.postData.searchStringInArray(this.matchOption1.slice(1, 3), optAns);
                            if (count > 1) {
                                this.dataConf['type'] = 2;
                                this.dataConf['msg'] = "Error";
                                this.dataConf['error_msg'] = "Please Select unique Answers for all options";
                                this.openConfirmation = true;
                                this.isQuesSaving = false;
                                return false;
                            }
                            count = this.postData.searchStringInArray(this.matchOption2.slice(1, 3), optAns);
                            if (count > 1) {
                                this.dataConf['type'] = 2;
                                this.dataConf['msg'] = "Error";
                                this.dataConf['error_msg'] = "Please Select unique Answers for all options";
                                this.openConfirmation = true;
                                this.isQuesSaving = false;
                                return false;
                            }
                            addQues['corr_ansr'] = optAns.join();
                        }
                    } else if (this.blankInserted == 3) {
                        if (this.matchOption1 == "" || this.matchOption2 == "" || this.matchOption3 == "") {
                            this.dataConf['type'] = 2;
                            this.dataConf['msg'] = "Error";
                            this.dataConf['error_msg'] = "Please provide acceptable Question-Answer set.";
                            this.openConfirmation = true;
                            this.isQuesSaving = false;
                            return false;
                        } else {
                            var optAns = [];
                            optAns.push(this.matchOption1, this.matchOption2, this.matchOption3);
                            var count = this.postData.searchStringInArray(this.matchOption1.slice(1, 3), optAns);
                            if (count > 1) {
                                this.dataConf['type'] = 2;
                                this.dataConf['msg'] = "Error";
                                this.dataConf['error_msg'] = "Please Select unique Answers for all options";
                                this.openConfirmation = true;
                                this.isQuesSaving = false;
                                return false;
                            }
                            count = this.postData.searchStringInArray(this.matchOption2.slice(1, 3), optAns);
                            if (count > 1) {
                                this.dataConf['type'] = 2;
                                this.dataConf['msg'] = "Error";
                                this.dataConf['error_msg'] = "Please Select unique Answers for all options";
                                this.openConfirmation = true;
                                this.isQuesSaving = false;
                                return false;
                            }
                            count = this.postData.searchStringInArray(this.matchOption3.slice(1, 3), optAns);
                            if (count > 1) {
                                this.dataConf['type'] = 2;
                                this.dataConf['msg'] = "Error";
                                this.dataConf['error_msg'] = "Please Select unique Answers for all options";
                                this.openConfirmation = true;
                                this.isQuesSaving = false;
                                return false;
                            }
                            addQues['corr_ansr'] = optAns.join();
                        }
                    } else if (this.blankInserted == 4) {
                        if (this.matchOption1 == "" || this.matchOption2 == "" || this.matchOption3 == "" || this.matchOption4 == "") {
                            this.dataConf['type'] = 2;
                            this.dataConf['msg'] = "Error";
                            this.dataConf['error_msg'] = "Please provide acceptable Question-Answer set.";
                            this.openConfirmation = true;
                            this.isQuesSaving = false;
                            return false;
                        } else {
                            var optAns = [];
                            optAns.push(this.matchOption1, this.matchOption2, this.matchOption3, this.matchOption3);
                            var count = this.postData.searchStringInArray(this.matchOption1.slice(1, 3), optAns);
                            if (count > 1) {
                                this.dataConf['type'] = 2;
                                this.dataConf['msg'] = "Error";
                                this.dataConf['error_msg'] = "Please Select unique Answers for all options";
                                this.openConfirmation = true;
                                this.isQuesSaving = false;
                                return false;
                            }
                            count = this.postData.searchStringInArray(this.matchOption2.slice(1, 3), optAns);
                            if (count > 1) {
                                this.dataConf['type'] = 2;
                                this.dataConf['msg'] = "Error";
                                this.dataConf['error_msg'] = "Please Select unique Answers for all options";
                                this.openConfirmation = true;
                                this.isQuesSaving = false;
                                return false;
                            }
                            count = this.postData.searchStringInArray(this.matchOption3.slice(1, 3), optAns);
                            if (count > 1) {
                                this.dataConf['type'] = 2;
                                this.dataConf['msg'] = "Error";
                                this.dataConf['error_msg'] = "Please Select unique Answers for all options";
                                this.openConfirmation = true;
                                this.isQuesSaving = false;
                                return false;
                            }
                            count = this.postData.searchStringInArray(this.matchOption4.slice(1, 3), optAns);
                            if (count > 1) {
                                this.dataConf['type'] = 2;
                                this.dataConf['msg'] = "Error";
                                this.dataConf['error_msg'] = "Please Select unique Answers for all options";
                                this.openConfirmation = true;
                                this.isQuesSaving = false;
                                return false;
                            }
                            addQues['corr_ansr'] = optAns.join();
                        }
                    } else if (this.blankInserted == 5) {
                        if (this.matchOption1 == "" || this.matchOption2 == "" || this.matchOption3 == "" || this.matchOption4 == "" || this.matchOption5 == "") {
                            this.dataConf['type'] = 2;
                            this.dataConf['msg'] = "Error";
                            this.dataConf['error_msg'] = "Please provide acceptable Question-Answer set.";
                            this.openConfirmation = true;
                            this.isQuesSaving = false;
                            return false;
                        } else {
                            var optAns = [];
                            optAns.push(this.matchOption1, this.matchOption2, this.matchOption3, this.matchOption4, this.matchOption5);
                            var count = this.postData.searchStringInArray(this.matchOption1.slice(1, 3), optAns);
                            if (count > 1) {
                                this.dataConf['type'] = 2;
                                this.dataConf['msg'] = "Error";
                                this.dataConf['error_msg'] = "Please Select unique Answers for all options";
                                this.openConfirmation = true;
                                this.isQuesSaving = false;
                                return false;
                            }
                            count = this.postData.searchStringInArray(this.matchOption2.slice(1, 3), optAns);
                            if (count > 1) {
                                this.dataConf['type'] = 2;
                                this.dataConf['msg'] = "Error";
                                this.dataConf['error_msg'] = "Please Select unique Answers for all options";
                                this.openConfirmation = true;
                                this.isQuesSaving = false;
                                return false;
                            }
                            count = this.postData.searchStringInArray(this.matchOption3.slice(1, 3), optAns);
                            if (count > 1) {
                                this.dataConf['type'] = 2;
                                this.dataConf['msg'] = "Error";
                                this.dataConf['error_msg'] = "Please Select unique Answers for all options";
                                this.openConfirmation = true;
                                this.isQuesSaving = false;
                                return false;
                            }
                            count = this.postData.searchStringInArray(this.matchOption4.slice(1, 3), optAns);
                            if (count > 1) {
                                this.dataConf['type'] = 2;
                                this.dataConf['msg'] = "Error";
                                this.dataConf['error_msg'] = "Please Select unique Answers for all options";
                                this.openConfirmation = true;
                                this.isQuesSaving = false;
                                return false;
                            }
                            count = this.postData.searchStringInArray(this.matchOption5.slice(1, 3), optAns);
                            if (count > 1) {
                                this.dataConf['type'] = 2;
                                this.dataConf['msg'] = "Error";
                                this.dataConf['error_msg'] = "Please Select unique Answers for all options";
                                this.openConfirmation = true;
                                this.isQuesSaving = false;
                                return false;
                            }
                            addQues['corr_ansr'] = optAns.join();
                        }
                    } else if (this.blankInserted == 6) {
                        if (this.matchOption1 == "" || this.matchOption2 == "" || this.matchOption3 == "" || this.matchOption4 == "" || this.matchOption5 == "" || this.matchOption6 == "") {
                            this.dataConf['type'] = 2;
                            this.dataConf['msg'] = "Error";
                            this.dataConf['error_msg'] = "Please provide acceptable Question-Answer set.";
                            this.openConfirmation = true;
                            this.isQuesSaving = false;
                            return false;
                        } else {
                            var optAns = [];
                            optAns.push(this.matchOption1, this.matchOption2, this.matchOption3, this.matchOption4, this.matchOption5, this.matchOption6);
                            var count = this.postData.searchStringInArray(this.matchOption1.slice(1, 3), optAns);
                            if (count > 1) {
                                this.dataConf['type'] = 2;
                                this.dataConf['msg'] = "Error";
                                this.dataConf['error_msg'] = "Please Select unique Answers for all options";
                                this.openConfirmation = true;
                                this.isQuesSaving = false;
                                return false;
                            }
                            count = this.postData.searchStringInArray(this.matchOption2.slice(1, 3), optAns);
                            if (count > 1) {
                                this.dataConf['type'] = 2;
                                this.dataConf['msg'] = "Error";
                                this.dataConf['error_msg'] = "Please Select unique Answers for all options";
                                this.openConfirmation = true;
                                this.isQuesSaving = false;
                                return false;
                            }
                            count = this.postData.searchStringInArray(this.matchOption3.slice(1, 3), optAns);
                            if (count > 1) {
                                this.dataConf['type'] = 2;
                                this.dataConf['msg'] = "Error";
                                this.dataConf['error_msg'] = "Please Select unique Answers for all options";
                                this.openConfirmation = true;
                                this.isQuesSaving = false;
                                return false;
                            }
                            count = this.postData.searchStringInArray(this.matchOption4.slice(1, 3), optAns);
                            if (count > 1) {
                                this.dataConf['type'] = 2;
                                this.dataConf['msg'] = "Error";
                                this.dataConf['error_msg'] = "Please Select unique Answers for all options";
                                this.openConfirmation = true;
                                this.isQuesSaving = false;
                                return false;
                            }
                            count = this.postData.searchStringInArray(this.matchOption5.slice(1, 3), optAns);
                            if (count > 1) {
                                this.dataConf['type'] = 2;
                                this.dataConf['msg'] = "Error";
                                this.dataConf['error_msg'] = "Please Select unique Answers for all options";
                                this.openConfirmation = true;
                                this.isQuesSaving = false;
                                return false;
                            }
                            count = this.postData.searchStringInArray(this.matchOption6.slice(1, 3), optAns);
                            if (count > 1) {
                                this.dataConf['type'] = 2;
                                this.dataConf['msg'] = "Error";
                                this.dataConf['error_msg'] = "Please Select unique Answers for all options";
                                this.openConfirmation = true;
                                this.isQuesSaving = false;
                                return false;
                            }
                            addQues['corr_ansr'] = optAns.join();
                        }
                    }
                    break;
                }
            }


            //===========================================================================================================================
            // START : FOR NEGATIVE AND RIGHT MARKS         XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            //===========================================================================================================================

            if (this.negMarks == "") {
                addQues['neg_marks'] = 0;
            } else {
                if (!this.pattern.test(this.negMarks)) {
                    this.dataConf['type'] = 2;
                    this.dataConf['msg'] = "Error";
                    this.dataConf['error_msg'] = "Please provide negative marks in numbers.";
                    this.openConfirmation = true;
                    this.isQuesSaving = false;
                    return false;
                } else {
                    addQues['neg_marks'] = this.negMarks;
                }
            }
            if (this.rytMarks == "") {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "Error";
                this.dataConf['error_msg'] = "Please provide right marks for this question";
                this.openConfirmation = true;
                this.isQuesSaving = false;
                return false;
            } else {
                if (!this.pattern.test(this.rytMarks)) {
                    this.dataConf['type'] = 2;
                    this.dataConf['msg'] = "Error";
                    this.dataConf['error_msg'] = "Please provide right marks in numbers.";
                    this.openConfirmation = true;
                    this.isQuesSaving = false;
                    return false;
                } else {
                    addQues['ryt_marks'] = this.rytMarks;
                }
            }

            if (this.negMarks != '') {
                if (parseInt(this.negMarks) > parseInt(this.rytMarks)) {
                    this.dataConf['type'] = 2;
                    this.dataConf['msg'] = "Error";
                    this.dataConf['error_msg'] = "Negative marks can't be greater than maximum marks.";
                    this.openConfirmation = true;
                    this.isQuesSaving = false;
                    return false;
                }
            }

            //===========================================================================================================================
            // END : FOR NEGATIVE AND RIGHT MARKS         XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            //===========================================================================================================================

            var url = "";
            if (this.quesUpdStatus) {
                url = this._constantService.getTestQuesUpdateServiceUrl();
            } else {
                url = this._constantService.getAddQuesToTestServiceUrl();
            }
            this._constantService.fetchDataApi(url, addQues).subscribe(data => {
                var responseData:any = data;
                var status = responseData.STATUS;
                if (status == "success") {

                    if (this.quesUpdStatus == false) {

                        if (action == 2) {
                            this.resetView();
                            this.quesPosition = this.quesPosition + 1;
                        } else {
                            this.quesUpdStatus = true;
                            this.dataConf['type'] = 2;
                            this.dataConf['msg'] = "STUDY24X7";
                            this.dataConf['error_msg'] = responseData.SUCCESS_MSG;
                            this.openConfirmation = true;


                        }
                        this.totalMarks = this.totalMarks + parseInt(this.rytMarks);
                        this.totalQuestionObj = this.totalQuestionObj + 1;
                        this.lastQuesIndex = this.totalQuestionObj;
                        if (this.totalQuestionObj == 1) {
                            this.quesTextList = [];
                        }

                        var statictext = this.postData.pastedDataStrippingByData(postData);
                        //                    var statictext = postData;
                        var staticStrippedText = '';
                        if (statictext) {
                            staticStrippedText = statictext;
                        }
                        if (postData.match('<img') || postData.match('<table')) {
                            this.quesTextList.push({ "QSTN_ID": this.totalQuestionObj, "QSTN_TEXT": postData.slice(0, 100), "IS_IMAGE": true, "STATIC_TEXT": staticStrippedText, "LANG_ID": this.activeLangId, "ESSAY_ID": 0, "ESSAY_TEXT": "", "STATUS": false, "CHECKED": false, "IMAGE_UUID": "", 'SUB_ID': this.activeSubId, 'SUB_NAME': this.visibilityTopic });
                        } else {
                            this.quesTextList.push({ "QSTN_ID": this.totalQuestionObj, "QSTN_TEXT": postData.slice(0, 100), "IS_IMAGE": false, "STATIC_TEXT": staticStrippedText, "LANG_ID": this.activeLangId, "ESSAY_ID": 0, "ESSAY_TEXT": "", "STATUS": false, "CHECKED": false, "IMAGE_UUID": "", 'SUB_ID': this.activeSubId, 'SUB_NAME': this.visibilityTopic });
                        }
                        this.currentPosition = this.totalQuestionObj;
                    }
                    else if (this.quesUpdStatus && (this.newLangQuesEdition || this.newLangQuesUpdate)) {
                        var index = this.quesTextList.findIndex(x => x.QSTN_ID == this.quesPosition);
                        var nxtPos = index + 1;
                        // var statictext = this.postData.pastedDataStrippingByData(postDataText);
                        var statictext = postData;
                        var staticStrippedText = '';
                        if (statictext) {
                            staticStrippedText = statictext.slice(0, 100);
                        }
                        if (postData.match('<img') || postData.match('<table')) {
                            this.quesTextList.splice(nxtPos, 0, { "QSTN_ID": this.quesPosition, "QSTN_TEXT": staticStrippedText.slice(0, 100), "IS_IMAGE": true, "STATIC_TEXT": staticStrippedText, "LANG_ID": this.activeLangId, "ESSAY_ID": 0, "ESSAY_TEXT": "", "STATUS": false, "CHECKED": false, "IMAGE_UUID": this.recentBucketId, 'SUB_ID': this.activeSubId, 'SUB_NAME': this.visibilityTopic });
                        } else {
                            this.quesTextList.splice(nxtPos, 0, { "QSTN_ID": this.quesPosition, "QSTN_TEXT": staticStrippedText.slice(0, 100), "IS_IMAGE": false, "STATIC_TEXT": staticStrippedText, "LANG_ID": this.activeLangId, "ESSAY_ID": 0, "ESSAY_TEXT": "", "STATUS": false, "CHECKED": false, "IMAGE_UUID": this.recentBucketId, 'SUB_ID': this.activeSubId, 'SUB_NAME': this.visibilityTopic });
                        }
                        if (action == 2) {
                            if (this.quesPosition == this.totalQuestionObj) {
                                this.quesPosition = this.quesPosition + 1;
                                this.resetView();
                                this.quesUpdStatus = false;
                            } else {
                                this.quesPosition++;
                                this.getQuestionData(this.quesPosition, this.activeLangId);
                            }
                        } else {
                            this.dataConf['type'] = 2;
                            this.dataConf['msg'] = "STUDY24X7";
                            this.dataConf['error_msg'] = responseData.SUCCESS_MSG;
                            this.openConfirmation = true;
                        }
                    }
                    else {
                        var index = this.quesTextList.findIndex(x => x.QSTN_ID == this.quesPosition);
                        this.quesTextList[index].QSTN_TEXT = postData.slice(0, 100);
                        // var statictext = this.postData.pastedDataStrippingByData(postDataText);
                        var statictext = postData;
                        var staticStrippedText = '';
                        if (statictext) {
                            staticStrippedText = statictext.slice(0, 100);
                        }
                        this.quesTextList[index].STATIC_TEXT = staticStrippedText;
                        if (this.totalQuestionObj == 0) {
                            this.totalQuestionObj = this.totalQuestionObj + 1;
                        }
                        if (action == 2) {
                            if (this.quesPosition == this.totalQuestionObj) {
                                this.quesPosition = this.quesPosition + 1;
                                this.resetView();
                                this.quesUpdStatus = false;
                            } else {
                                this.quesPosition++;
                                this.getQuestionData(this.quesPosition, this.activeLangId);
                            }
                        } else {
                            this.dataConf['type'] = 2;
                            this.dataConf['msg'] = "STUDY24X7";
                            this.dataConf['error_msg'] = responseData.SUCCESS_MSG;
                            this.openConfirmation = true;
                        }
                    }
                    this.newOptionAdded = 0;
                    setTimeout(() => {
                        MathJax.Hub.Typeset();
                    }, 500)
                } else {
                    this.dataConf['type'] = 2;
                    this.dataConf['msg'] = "Error";
                    this.dataConf['error_msg'] = responseData.ERROR_MSG;
                    this.openConfirmation = true;
                    this.isQuesSaving = false;
                    return false;
                }
            });

        }
        setTimeout(() => {
            this.isQuesSaving = false;
        }, 500);



    }


    getQuestionData(quesId, langId) {
        this.bucketPathFormatFxn();
        var val = this.contentId.split("study");
        this.newLangQuesEdition = false;
        this.newLangQuesUpdate = false;
        var getQues = {};
        getQues['token'] = this._constantService.getSessionDataBYKey('token');
        getQues['token_param'] = {};
        getQues['token_param']['device_type'] = 'w';
        getQues['token_param']['host'] = '';
        getQues['pg_uuid'] = this.pageId;
        getQues['cors_uuid'] = this.courseId;
        getQues['cntnt_uuid'] = val[0];
        getQues['qstn_no'] = quesId;
        getQues['lang_id'] = langId;

        this._constantService.fetchDataApi(this._constantService.getQuesDataFrmTestServiceUrl(), getQues).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == "success") {
                if (responseData.QUESTION.ISEXIST != 0) {
                    this.quesUpdStatus = true;
                    this.activeQuesId = quesId;
                    this.currentPosition = quesId;
                    this.quesPosition = quesId;
                    this.contentId = responseData.CONTENT_UUID;
                    this.bucketUuid = responseData.QUESTION.UUID;
                    if (langId != this.activeLangId) {
                        this.changeVisibilityLang(langId, 1);
                    }
                    this.changeVisibilityQuesType(responseData.QUESTION.TYPE, 0);
                    var index = this.subjectArr.findIndex(x => x.KEY == responseData.QUESTION.SUB_ID);
                    this.changeVisibilityTopic(index);
                    setTimeout(() => { this.setQuestionData(responseData.QUESTION); }, 100);
                } else {
                    this.resetView();
                    this.newLangQuesUpdate = true;
                    this.quesUpdStatus = true;
                    this.activeQuesId = quesId;
                }

            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "Error";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
                return false;
            }
        });
    }


    setQuestionData(data) {
        this.newOptionAdded = 0;
        if (data.UUID != '') {
            var date = new Date;
            this.bucketPath = data.FPATH;
            var dimensions = data.DIMENSION_QST;
            for (const key in dimensions) {
                if (dimensions[key] != '' && dimensions[key] != null && dimensions[key] != undefined) {
                    switch (key) {
                        case 'qst': {
                            this.image_upload_question_url = this.bucketPath + this.contentId + '/' + this.bucketUuid + "/qst.png";
                            this.imageSet.qst = dimensions[key];
                            this.quesImage = true;

                            break;
                        }
                        case 'hint': {
                            this.image_upload_hint_url = this.bucketPath + this.contentId + '/' + this.bucketUuid + "/hint.png";
                            this.imageSet.hint = dimensions[key];
                            this.showHintImg = true;

                            break;
                        }
                        case 'soln': {
                            this.image_upload_solution_url = this.bucketPath + this.contentId + '/' + this.bucketUuid + "/soln.png";
                            this.imageSet.soln = dimensions[key];
                            this.showSolImg = true;

                            break;
                        }
                        case 'opt1': {
                            this.option_image1_url = this.bucketPath + this.contentId + '/' + this.bucketUuid + "/opt1.png";
                            this.imageSet.opt1 = dimensions[key];
                            this.optImg1 = true;

                            break;
                        }
                        case 'opt2': {
                            this.option_image2_url = this.bucketPath + this.contentId + '/' + this.bucketUuid + "/opt2.png";
                            this.imageSet.opt2 = dimensions[key];
                            this.optImg2 = true;

                            break;
                        }
                        case 'opt3': {
                            this.option_image3_url = this.bucketPath + this.contentId + '/' + this.bucketUuid + "/opt3.png";
                            this.imageSet.opt3 = dimensions[key];
                            this.optImg3 = true;

                            break;
                        }
                        case 'opt4': {
                            this.option_image4_url = this.bucketPath + this.contentId + '/' + this.bucketUuid + "/opt4.png";
                            this.imageSet.opt4 = dimensions[key];
                            this.optImg4 = true;

                            break;
                        }
                        case 'opt5': {
                            this.option_image5_url = this.bucketPath + this.contentId + '/' + this.bucketUuid + "/opt5.png";
                            this.imageSet.opt5 = dimensions[key];
                            this.optImg5 = true;

                            break;
                        }
                        case 'opt6': {
                            this.option_image6_url = this.bucketPath + this.contentId + '/' + this.bucketUuid + "/opt6.png";
                            this.imageSet.opt6 = dimensions[key];
                            this.optImg6 = true;

                            break;
                        }
                        case 'opt7': {
                            this.option_image7_url = this.bucketPath + this.contentId + '/' + this.bucketUuid + "/opt7.png";
                            this.imageSet.opt7 = dimensions[key];
                            this.optImg7 = true;

                            break;
                        }
                        case 'opt8': {
                            this.option_image8_url = this.bucketPath + this.contentId + '/' + this.bucketUuid + "/opt8.png";
                            this.imageSet.opt8 = dimensions[key];
                            this.optImg8 = true;

                            break;
                        }
                        case 'opt9': {
                            this.option_image9_url = this.bucketPath + this.contentId + '/' + this.bucketUuid + "/opt9.png";
                            this.imageSet.opt9 = dimensions[key];
                            this.optImg9 = true;

                            break;
                        }
                        case 'opt10': {
                            this.option_image10_url = this.bucketPath + this.contentId + '/' + this.bucketUuid + "/opt10.png";
                            this.imageSet.opt10 = dimensions[key];
                            this.optImg10 = true;

                            break;
                        }
                        case 'opt11': {
                            this.option_image11_url = this.bucketPath + this.contentId + '/' + this.bucketUuid + "/opt11.png";
                            this.imageSet.opt11 = dimensions[key];
                            this.optImg11 = true;

                            break;
                        }
                        case 'opt12': {
                            this.option_image12_url = this.bucketPath + this.contentId + '/' + this.bucketUuid + "/opt12.png";
                            this.imageSet.opt12 = dimensions[key];
                            this.optImg12 = true;

                            break;
                        }
                    }
                }
            }
        }

        if (this.postData.decodeURIPostData(data.TEXT) || this.quesImage) {
            this.question_placeholder = false;
            setTimeout(() => {
                // document.getElementById("q_text").innerHTML = this.postData.decodeURIPostData(data.TEXT);

                this.setckeditorData("q_text", this.postData.decodeURIPostData(data.TEXT));
            }, 50);
        }
        if (this.postData.decodeURIPostData(data.SOLUTION) || this.showSolImg) {
            this.solution_placeholder = false;
            setTimeout(() => {
                // document.getElementById("sol_text").innerHTML = this.postData.decodeURIPostData(data.SOLUTION);

                this.setckeditorData("sol_text", this.postData.decodeURIPostData(data.SOLUTION));

            }, 50);
        } else {
            this.resetValueOfckeditor('sol_text');
        }
        if (this.postData.decodeURIPostData(data.HINT) || this.showHintImg) {
            this.hint_placeholder = false;
            setTimeout(() => {
                // document.getElementById("hint_text").innerHTML = this.postData.decodeURIPostData(data.HINT);


                this.setckeditorData("hint_text", this.postData.decodeURIPostData(data.HINT));

            }, 50);
        } else {
            this.resetValueOfckeditor('hint_text');
        }


        if (data.TYPE == '1' || data.TYPE == '2' || data.TYPE == '4' || data.TYPE == '5') {
            //if (data.TYPE == 1 || data.TYPE == 2) {
            if (data.TYPE_OPTIONS.A != null) {
                // document.getElementById("opt1_text").innerHTML = this.postData.decodeURIPostData(data.TYPE_OPTIONS.A);
                this.setckeditorData("opt1_text", this.postData.decodeURIPostData(data.TYPE_OPTIONS.A));

            }
            if (data.TYPE_OPTIONS.B != null) {
                // document.getElementById("opt2_text").innerHTML = this.postData.decodeURIPostData(data.TYPE_OPTIONS.B);
                this.setckeditorData("opt2_text", this.postData.decodeURIPostData(data.TYPE_OPTIONS.B));

            }
            if (data.TYPE_OPTIONS.C != null) {
                // document.getElementById("opt3_text").innerHTML = this.postData.decodeURIPostData(data.TYPE_OPTIONS.C);
                this.setckeditorData("opt3_text", this.postData.decodeURIPostData(data.TYPE_OPTIONS.C));

            }
            if (data.TYPE_OPTIONS.D != null) {
                // document.getElementById("opt4_text").innerHTML = this.postData.decodeURIPostData(data.TYPE_OPTIONS.D);
                this.setckeditorData("opt4_text", this.postData.decodeURIPostData(data.TYPE_OPTIONS.D));

            }
            if (data.TYPE_OPTIONS.E != '' && data.TYPE_OPTIONS.E != null) {
                this.addOptions(0);
                setTimeout(() => {
                    // document.getElementById("opt5_text").innerHTML = this.postData.decodeURIPostData(data.TYPE_OPTIONS.E);
                    this.setckeditorData("opt5_text", this.postData.decodeURIPostData(data.TYPE_OPTIONS.E));

                }, 200);
            } else {
                // console.log(CKEDITOR.instances['opt5_text']);
                // if(CKEDITOR.instances['opt5_text']){
                //     CKEDITOR.instances["opt5_text"].destroy(true);
                // }
            }
            if (data.TYPE_OPTIONS.F != '' && data.TYPE_OPTIONS.F != null) {
                this.addOptions(0);
                setTimeout(() => {
                    // document.getElementById("opt6_text").innerHTML = this.postData.decodeURIPostData(data.TYPE_OPTIONS.F);
                    this.setckeditorData("opt6_text", this.postData.decodeURIPostData(data.TYPE_OPTIONS.F));

                }, 200);
            } else {
                // if(CKEDITOR.instances['opt6_text']){
                //     CKEDITOR.instances["opt6_text"].destroy(true);
                // }
            }
        }

        if (data.TYPE == '4' || data.TYPE == '5' || data.TYPE == '6') {
            if (data.TYPE_OPTIONS.P != '' && data.TYPE_OPTIONS.P != null) {
                // document.getElementById("opt7_text").innerHTML = this.postData.decodeURIPostData(data.TYPE_OPTIONS.P);
                this.setckeditorData("opt7_text", this.postData.decodeURIPostData(data.TYPE_OPTIONS.P));

            }
            if (data.TYPE_OPTIONS.Q != '' && data.TYPE_OPTIONS.Q != null) {
                // document.getElementById("opt8_text").innerHTML = this.postData.decodeURIPostData(data.TYPE_OPTIONS.Q);
                this.setckeditorData("opt8_text", this.postData.decodeURIPostData(data.TYPE_OPTIONS.Q));

            }
            if (data.TYPE_OPTIONS.R != '' && data.TYPE_OPTIONS.R != null) {
                // document.getElementById("opt9_text").innerHTML = this.postData.decodeURIPostData(data.TYPE_OPTIONS.R);
                this.setckeditorData("opt9_text", this.postData.decodeURIPostData(data.TYPE_OPTIONS.R));

            }
            if (data.TYPE_OPTIONS.S != '' && data.TYPE_OPTIONS.S != null) {
                // document.getElementById("opt10_text").innerHTML = this.postData.decodeURIPostData(data.TYPE_OPTIONS.S);
                this.setckeditorData("opt10_text", this.postData.decodeURIPostData(data.TYPE_OPTIONS.S));

            }
            if (data.TYPE_OPTIONS.T != '' && data.TYPE_OPTIONS.T != null) {
                this.addOptions(0);
                setTimeout(() => {
                    // document.getElementById("opt11_text").innerHTML = this.postData.decodeURIPostData(data.TYPE_OPTIONS.T);
                    this.setckeditorData("opt11_text", this.postData.decodeURIPostData(data.TYPE_OPTIONS.T));

                }, 200);
            }
            if (data.TYPE_OPTIONS.U != '' && data.TYPE_OPTIONS.U != null) {
                this.addOptions(0);
                setTimeout(() => {
                    // document.getElementById("opt12_text").innerHTML = this.postData.decodeURIPostData(data.TYPE_OPTIONS.U);
                    this.setckeditorData("opt12_text", this.postData.decodeURIPostData(data.TYPE_OPTIONS.U));

                }, 200);
            }
        }

        if (data.NEGATIVE_MARKS != 0) {
            this.negMarks = data.NEGATIVE_MARKS;
            this.currentQuesNegMarks = parseInt(data.NEGATIVE_MARKS);
        }
        this.rytMarks = data.RIGHT_MARKS;
        this.currentQuesRytMarks = parseInt(data.RIGTH_MARKS);
        setTimeout(() => {


            if (data.TYPE == '1') {
                if (data.CORRECT_ANSWER[0] == 'a') {
                    (<HTMLInputElement>document.getElementById("multiChOpt1")).checked = true;
                }
                if (data.CORRECT_ANSWER[0] == 'b') {
                    (<HTMLInputElement>document.getElementById("multiChOpt2")).checked = true;
                }
                if (data.CORRECT_ANSWER[0] == 'c') {
                    (<HTMLInputElement>document.getElementById("multiChOpt3")).checked = true;
                }
                if (data.CORRECT_ANSWER[0] == 'd') {
                    (<HTMLInputElement>document.getElementById("multiChOpt4")).checked = true;
                }
                if (data.CORRECT_ANSWER[0] == 'e') {
                    (<HTMLInputElement>document.getElementById("multiChOpt5")).checked = true;
                }
                if (data.CORRECT_ANSWER[0] == 'f') {
                    (<HTMLInputElement>document.getElementById("multiChOpt6")).checked = true;
                }
            }
            if (data.TYPE == '2') {
                var arr = data.CORRECT_ANSWER.split(',');
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
                }, 200);
            }
            if (data.TYPE == '3') {
                if (data.CORRECT_ANSWER[0] == 'a') {
                    (<HTMLInputElement>document.getElementById("truFlsOpt1")).checked = true;
                }
                if (data.CORRECT_ANSWER[0] == 'b') {
                    (<HTMLInputElement>document.getElementById("truFlsOpt2")).checked = true;
                }
            }
            if (data.TYPE == '4' || data.TYPE == '6') {

                var optArr = data.CORRECT_ANSWER.split(",");
                for (var j = 0; j < optArr.length; j++) {
                    this.blankInserted++;
                    if (optArr[j].match("a#")) { this.matchOption1 = optArr[j]; };
                    if (optArr[j].match("b#")) { this.matchOption2 = optArr[j]; };
                    if (optArr[j].match("c#")) { this.matchOption3 = optArr[j]; };
                    if (optArr[j].match("d#")) { this.matchOption4 = optArr[j]; };
                    if (optArr[j].match("e#")) { this.matchOption5 = optArr[j]; };
                    if (optArr[j].match("f#")) { this.matchOption6 = optArr[j]; };
                }
            }
            if (data.TYPE == '5') {
                this.selMatMaxOpt1 = [];
                this.selMatMaxOpt2 = [];
                this.selMatMaxOpt3 = [];
                this.selMatMaxOpt4 = [];
                this.selMatMaxOpt5 = [];
                this.selMatMaxOpt6 = [];
                var optArr = data.CORRECT_ANSWER.split(",");
                for (var j = 0; j < optArr.length; j++) {
                    if (optArr[j].match("a#")) { this.selMatMaxOpt1.push(optArr[j]); };
                    if (optArr[j].match("b#")) { this.selMatMaxOpt2.push(optArr[j]); };
                    if (optArr[j].match("c#")) { this.selMatMaxOpt3.push(optArr[j]); };
                    if (optArr[j].match("d#")) { this.selMatMaxOpt4.push(optArr[j]); };
                    if (optArr[j].match("e#")) { this.selMatMaxOpt5.push(optArr[j]); };
                    if (optArr[j].match("f#")) { this.selMatMaxOpt6.push(optArr[j]); };
                }
            }
        }, 200);

        setTimeout(() => {
            MathJax.Hub.Typeset();
        }, 500)
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

    deleteQuestionFromTest(quesId, langId, index) {
        var val = this.contentId.split("study");
        var delQues = {};
        delQues['token'] = this._constantService.getSessionDataBYKey('token');
        delQues['token_param'] = {};
        delQues['token_param']['device_type'] = 'w';
        delQues['token_param']['host'] = '';
        delQues['pg_uuid'] = this.pageId;
        delQues['cntnt_uuid'] = val[0];
        delQues['qstn_no'] = quesId;
        delQues['lang_id'] = langId;
        delQues['cors_uuid'] = this.courseId;

        this._constantService.fetchDataApi(this._constantService.deleteQuesFrmTestServiceUrl(), delQues).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == "success") {

                if (this.quesTextList[index].QSTN_ID == this.quesPosition) {
                    this.newAdditionFxn(3);
                }
                this.totalQuestionObj--;
                this.quesTextList.splice(index, 1);
                this.getAllQuestionText(0);

            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "Error";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
                return false;
            }
        });
    }

    addQuesToEssayList(event) {
        if (event.target.checked) {

            //            this.associatedQuesList.push(parseInt(event.target.id));

            this.selectedQuestion.push(parseInt(event.target.id));
            var index = this.quesTextList.findIndex(x => x.QSTN_ID == event.target.id);
            this.quesTextList[index].CHECKED = true;
        } else if (!event.target.checked) {

            //            var index = this.associatedQuesList.indexOf(parseInt(event.t            arget.id));
            //            this.associatedQuesList.splice(index, 1);

            var index = this.selectedQuestion.indexOf(parseInt(event.target.id));
            this.selectedQuestion.splice(index, 1);
            var index = this.quesTextList.findIndex(x => x.QSTN_ID == event.target.id);
            this.quesTextList[index].CHECKED = false;
            this.quesTextList[index].STATUS = false;
        }
    }

    addQuestionToEssay() {
        var addQues2Essay = {};
        addQues2Essay['token'] = this._constantService.getSessionDataBYKey('token');
        addQues2Essay['token_param'] = {};
        addQues2Essay['token_param']['device_type'] = 'w';
        addQues2Essay['token_param']['host'] = '';
        addQues2Essay['essay_id'] = this.essayId;
        addQues2Essay['lang_id'] = this.activeLangId;
        addQues2Essay['cntnt_uuid'] = this.contentId;
        addQues2Essay['pg_uuid'] = this.pageId;
        addQues2Essay['cors_uuid'] = this.courseId;

        addQues2Essay['qstn_no'] = this.selectedQuestion.toString();
        addQues2Essay['prev_qstn'] = this.associatedQuesList.toString();


        this._constantService.fetchDataApi(this._constantService.getAssociateQuesToEssayServiceUrl(), addQues2Essay).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                this.selectedQuestion = [];
                this.palletViewSelector(1);
                this.getEssayData(this.essayId, this.activeLangId);
                this.getAllQuestionText(0);
            }
        });
    }


    onScrollDownQues() {
        if (this.continueScrollQues) {
            this.getAllQuestionText(this.lastQuesIndex);
        }
    }

    onScrollDownEssay() {
        if (this.continueScrollEssay) {
            this.getAllEssayText(this.lastEssayIndex);
        }
    }

    palletViewSelector(id) {
        if (this.palletViewFormat == 3 && id == 3) {
            this.palletViewFormat = 1;
        } else if (id == 2) {
            //            this.assoQuesPreFormating();
            this.getAllQuestionText(0);
            this.palletViewFormat = 2;
            console.log(this.associatedQuesList);
            console.log(this.selectedQuestion);
        } else {
            for (var i = 0; i < this.quesTextList.length; i++) {
                this.quesTextList[i].CHECKED = false;
            }
            this.palletViewFormat = id;
        }
        setTimeout(() => {
            MathJax.Hub.Typeset();
        }, 500)
    }

    setEssayOneviewKey(essayId) {
        this.essayId = essayId;
        for (var i = 0; i < this.essayList.length; i++) {
            if (this.essayList[i].ESSAY_ID == essayId) {
                this.essayList[i].ONEVIEW = true;
            } else {
                this.essayList[i].ONEVIEW = false;
            }
        }
    }

    newAdditionFxn(typ) {
        if (typ === 1) {
            this.newOptionAdded = 0;
            this.quesUpdStatus = false;
            this.quesPosition = this.totalQuestionObj + 1;
            this.resetView();
            this.bucketPathFormatFxn();
        } else if (typ === 2) {
            this.setEssayOneviewKey(0);
            this.essaySaved = false;
            this.essayUpdStatus = false;
            this.essayPosition = this.totalEssayObj + 1;
            this.resetView();
        } else if (typ == 3) {
            this.quesUpdStatus = false;
            this.quesPosition = this.totalQuestionObj;
            this.resetView();
            this.bucketPathFormatFxn();
        }
    }

    assoQuesPreFormating() {
        for (var i = 0; i < this.associatedQuesList.length; i++) {
            var index = this.quesTextList.findIndex(x => (x.QSTN_ID == this.associatedQuesList[i] && x.LANG_ID == this.activeLangId));
            if (index > -1) {
                this.quesTextList[index].CHECKED = true;
            }
            this.selectedQuestion.push(this.associatedQuesList[i]);
            this.questionList();
        }
        setTimeout(() => {
            MathJax.Hub.Typeset();
        }, 500)
    }

    questionList() {
        return this.quesTextList;
    }

    uuidCheck(event) {
        this.stopUpload = false;
        if (event.target.id == 'image1') {
            this.option_image1_url = '';
            this.imageSet['s_opt1'] = '';
        } else
            if (event.target.id == 'image2') {
                this.option_image2_url = '';
                this.imageSet.opt2 = '';
            } else
                if (event.target.id == 'image3') {
                    this.option_image3_url = '';
                    this.imageSet.opt3 = '';
                } else
                    if (event.target.id == 'image4') {
                        this.option_image4_url = '';
                        this.imageSet.opt4 = '';
                    } else
                        if (event.target.id == 'image5') {
                            this.option_image5_url = '';
                            this.imageSet.opt5 = '';
                        } else
                            if (event.target.id == 'image6') {
                                this.option_image6_url = '';
                                this.imageSet.opt6 = '';
                            } else
                                if (event.target.id == 'image7') {
                                    this.option_image7_url = '';
                                    this.imageSet.opt7 = '';
                                } else
                                    if (event.target.id == 'image8') {
                                        this.option_image8_url = '';
                                        this.imageSet.opt8 = '';
                                    } else
                                        if (event.target.id == 'image9') {
                                            this.option_image9_url = '';
                                            this.imageSet.opt9 = '';
                                        } else
                                            if (event.target.id == 'image10') {
                                                this.option_image10_url = '';
                                                this.imageSet.opt10 = '';
                                            } else
                                                if (event.target.id == 'image11') {
                                                    this.option_image11_url = '';
                                                    this.imageSet.opt11 = '';
                                                } else
                                                    if (event.target.id == 'image12') {
                                                        this.option_image12_url = '';
                                                        this.imageSet.opt12 = '';
                                                    } else
                                                        if (event.target.id == 'solImage') {
                                                            this.image_upload_solution_url = '';
                                                            this.imageSet.soln = '';
                                                        } else
                                                            if (event.target.id == 'hintImage') {
                                                                this.image_upload_hint_url = '';
                                                                this.imageSet.hint = '';
                                                            } else
                                                                if (event.target.id == 'quesImage') {
                                                                    this.image_upload_question_url = '';
                                                                    this.imageSet.qst = '';
                                                                }
        if (this.image_upload_question_url == '' && this.option_image1_url == '' && this.option_image2_url == '' && this.option_image3_url == '' && this.option_image4_url == '' && this.option_image5_url == '' && this.option_image6_url == '') {
            if (this.option_image7_url == '' && this.option_image8_url == '' && this.option_image9_url == '' && this.option_image10_url == '' && this.option_image11_url == '' && this.option_image12_url == '' && this.image_upload_solution_url == '' && this.image_upload_hint_url == '') {
                this.bucketUuid = '';
            }
        }
    }

    removeImg(event) {
        this.show_image = 1;
        this.imagePostSize = '';
        this.image_upload = null;
        this.attachmentId = "";
    }

    change_optionImg(id) {
        var optid = 'option' + id + 'image';
        (<HTMLInputElement>document.getElementById(optid)).click();
    }

    changeImageFxn(key) {
        switch (key) {
            case 'qst': {
                this.image_upload_question_url = "";
                this.imageSet.qst = '';
                this.quesImage = false;
                break;
            }
            case 'hint': {
                this.image_upload_hint_url = '';
                this.imageSet.hint = '';
                this.showHintImg = false;
                break;
            }
            case 'soln': {
                this.image_upload_solution_url = '';
                this.imageSet.soln = '';
                this.showSolImg = false;
                break;
            }
            case 'opt1': {
                this.option_image1_url = '';
                this.imageSet.opt1 = '';
                this.optImg1 = false;
                break;
            }
            case 'opt2': {
                this.option_image2_url = '';
                this.imageSet.opt2 = '';
                this.optImg2 = false;
                break;
            }
            case 'opt3': {
                this.option_image3_url = '';
                this.imageSet.opt3 = '';
                this.optImg3 = false;
                break;
            }
            case 'opt4': {
                this.option_image4_url = '';
                this.imageSet.opt4 = '';
                this.optImg4 = false;
                break;
            }
            case 'opt5': {
                this.option_image5_url = '';
                this.imageSet.opt5 = '';
                this.optImg5 = false;
                break;
            }
            case 'opt6': {
                this.option_image6_url = '';
                this.imageSet.opt6 = '';
                this.optImg6 = false;
                break;
            }
            case 'opt7': {
                this.option_image7_url = '';
                this.imageSet.opt7 = '';
                this.optImg7 = false;
                break;
            }
            case 'opt8': {
                this.option_image8_url = '';
                this.imageSet.opt8 = '';
                this.optImg8 = false;
                break;
            }
            case 'opt9': {
                this.option_image9_url = '';
                this.imageSet.opt9 = '';
                this.optImg9 = false;
                break;
            }
            case 'opt10': {
                this.option_image10_url = '';
                this.imageSet.opt10 = '';
                this.optImg10 = false;
                break;
            }
            case 'opt11': {
                this.option_image11_url = '';
                this.imageSet.opt11 = '';
                this.optImg11 = false;
                break;
            }
            case 'opt12': {
                this.option_image12_url = '';
                this.imageSet.opt12 = '';
                this.optImg12 = false;
                break;
            }
        }
        if (!(this.optImg1 && this.optImg2 && this.optImg3 && this.optImg4 && this.optImg5 && this.optImg6 && this.optImg7 && this.optImg8 && this.optImg9 && this.optImg10 && this.optImg11 && this.optImg12 && this.showSolImg && this.showHintImg && this.quesImage)) {
            this.bucketUuid = '';
            this.bucketPath = '';
        }
    }

    change_image_hint() {
        (<HTMLInputElement>document.getElementById('questionimage')).click();
    }

    change_image_solution() {
        (<HTMLInputElement>document.getElementById('questionimage')).click();
    }

    addImgContent(event: any, id) {
        this.isUploading = true;
        this.preloader = true;
        this.showText = false;
        this.stopUpload = true;
        this.image_upload = event.target.files[0];
        let type = this.image_upload.name;
        var reader = new FileReader();
        var typearr = type.split(".");
        var size = Math.round(this.image_upload.size / 1000 / 1000);
        if (size <= 10) {
            if (this.image_upload.name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
                var upload = {};
                upload['token'] = this._constantService.getSessionDataBYKey('token');
                upload['token_param'] = {};
                upload['token_param']['device_type'] = "w";
                upload['token_param']['host'] = "";
                var data = JSON.stringify(upload);
                var encData = this._encrypt.encryptutf8(data);
                let formData = new FormData();
                formData.append("file", this.image_upload);
                if (this.bucketUuid == "") {
                    formData.append("uuid", '0');
                } else {
                    formData.append("uuid", this.bucketUuid);
                }

                formData.append("token", encData);
                formData.append("cntnt_uuid", this.contentId);
                if (id == 1) {
                    this.optionImgUpload1 = true;
                    this.showOpt1Preloader = true;
                    this.optImg1 = true;
                    formData.append("opttyp", 'opt1');
                } else if (id == 2) {
                    this.optionImgUpload2 = true;
                    this.showOpt2Preloader = true;
                    this.optImg2 = true;
                    formData.append("opttyp", 'opt2');
                } else if (id == 3) {
                    this.optionImgUpload3 = true;
                    this.showOpt3Preloader = true;
                    this.optImg3 = true;
                    formData.append("opttyp", 'opt3');
                } else if (id == 4) {
                    this.optionImgUpload4 = true;
                    this.showOpt4Preloader = true;
                    this.optImg4 = true;
                    formData.append("opttyp", 'opt4');
                } else if (id == 5) {
                    this.optionImgUpload5 = true;
                    this.showOpt5Preloader = true;
                    this.optImg5 = true;
                    formData.append("opttyp", 'opt5');
                } else if (id == 6) {
                    this.optionImgUpload6 = true;
                    this.showOpt6Preloader = true;
                    this.optImg6 = true;
                    formData.append("opttyp", 'opt6');
                } else if (id == 7) {
                    this.optionImgUpload6 = true;
                    this.showOpt6Preloader = true;
                    this.optImg7 = true;
                    formData.append("opttyp", 'opt7');
                } else if (id == 8) {
                    this.optionImgUpload6 = true;
                    this.showOpt6Preloader = true;
                    this.optImg8 = true;
                    formData.append("opttyp", 'opt8');
                } else if (id == 9) {
                    this.optionImgUpload6 = true;
                    this.showOpt6Preloader = true;
                    this.optImg9 = true;
                    formData.append("opttyp", 'opt9');
                } else if (id == 10) {
                    this.optionImgUpload6 = true;
                    this.showOpt6Preloader = true;
                    this.optImg10 = true;
                    formData.append("opttyp", 'opt10');
                } else if (id == 11) {
                    this.optionImgUpload6 = true;
                    this.showOpt6Preloader = true;
                    this.optImg11 = true;
                    formData.append("opttyp", 'opt11');
                } else if (id == 12) {
                    this.optionImgUpload6 = true;
                    this.showOpt6Preloader = true;
                    this.optImg12 = true;
                    formData.append("opttyp", 'opt12');
                } else if (id == 13) {
                    this.optionImgUpload6 = true;
                    this.showOpt6Preloader = true;
                    this.quesImage = true;
                    formData.append("opttyp", 'qst');
                } else if (id == 14) {
                    this.optionImgUpload6 = true;
                    this.showOpt6Preloader = true;
                    this.showSolImg = true;
                    formData.append("opttyp", 'soln');
                } else if (id == 15) {
                    this.optionImgUpload6 = true;
                    this.showOpt6Preloader = true;
                    this.showHintImg = true;
                    formData.append("opttyp", 'hint');
                }

                let headers = new HttpHeaders();
                headers.delete('Content-Type');
                this._constantService.fetchDataApi(this._constantService.getImageUploadTestServiceUrl(), formData, headers).subscribe(data => {
                    var responseData:any = data;
                    var status = responseData.STATUS;
                    this.preloader = false;
                    this.showText = true;
                    this.isUploading = false;
                    if (status == this._constantService.success_msg) {
                        this.stopUpload = false;
                        var date = new Date();
                        this.bucketPath = responseData.FPATH;
                        this.bucketUuid = responseData.UUID;
                        if (id == 1) {
                            this.optionImgUpload1 = false;
                            this.showOpt1Preloader = false;
                            this.option_image1_url = responseData.FPATH + this.contentId + '/' + this.bucketUuid + "/opt1.png?v=" + responseData.IMG_UPD_DT;
                            this.imageSet.opt1 = responseData.DIMENSION;
                        } else if (id == 2) {
                            this.showText = true;
                            this.optionImgUpload2 = false;
                            this.showOpt2Preloader = false;
                            this.option_image2_url = responseData.FPATH + this.contentId + '/' + this.bucketUuid + "/opt2.png?v=" + responseData.IMG_UPD_DT;
                            this.imageSet.opt2 = responseData.DIMENSION;
                        } else if (id == 3) {
                            this.showText = true;
                            this.optionImgUpload3 = false;
                            this.showOpt3Preloader = false;
                            this.option_image3_url = responseData.FPATH + this.contentId + '/' + this.bucketUuid + "/opt3.png?v=" + responseData.IMG_UPD_DT;
                            this.imageSet.opt3 = responseData.DIMENSION;
                        } else if (id == 4) {
                            this.showText = true;
                            this.optionImgUpload4 = false;
                            this.showOpt4Preloader = false;
                            this.option_image4_url = responseData.FPATH + this.contentId + '/' + this.bucketUuid + "/opt4.png?v=" + responseData.IMG_UPD_DT;
                            this.imageSet.opt4 = responseData.DIMENSION;
                        } else if (id == 5) {
                            this.showText = true;
                            this.showOpt5Preloader = false;
                            this.optionImgUpload5 = false;
                            this.option_image5_url = responseData.FPATH + this.contentId + '/' + this.bucketUuid + "/opt5.png?v=" + responseData.IMG_UPD_DT;
                            this.imageSet.opt5 = responseData.DIMENSION;
                        } else if (id == 6) {
                            this.showText = true;
                            this.optionImgUpload6 = false;
                            this.showOpt6Preloader = false;
                            this.option_image6_url = responseData.FPATH + this.contentId + '/' + this.bucketUuid + "/opt6.png?v=" + responseData.IMG_UPD_DT;
                            this.imageSet.opt6 = responseData.DIMENSION;
                        } else if (id == 7) {
                            this.showText = true;
                            this.optionImgUpload6 = false;
                            this.showOpt6Preloader = false;
                            this.option_image7_url = responseData.FPATH + this.contentId + '/' + this.bucketUuid + "/opt7.png?v=" + responseData.IMG_UPD_DT;
                            this.imageSet.opt7 = responseData.DIMENSION;
                        } else if (id == 8) {
                            this.showText = true;
                            this.optionImgUpload6 = false;
                            this.showOpt6Preloader = false;
                            this.option_image8_url = responseData.FPATH + this.contentId + '/' + this.bucketUuid + "/opt8.png?v=" + responseData.IMG_UPD_DT;
                            this.imageSet.opt8 = responseData.DIMENSION;
                        } else if (id == 9) {
                            this.showText = true;
                            this.optionImgUpload6 = false;
                            this.showOpt6Preloader = false;
                            this.option_image9_url = responseData.FPATH + this.contentId + '/' + this.bucketUuid + "/opt9.png?v=" + responseData.IMG_UPD_DT;
                            this.imageSet.opt9 = responseData.DIMENSION;
                        } else if (id == 10) {
                            this.showText = true;
                            this.optionImgUpload6 = false;
                            this.showOpt6Preloader = false;
                            this.option_image10_url = responseData.FPATH + this.contentId + '/' + this.bucketUuid + "/opt10.png?v=" + responseData.IMG_UPD_DT;
                            this.imageSet.opt10 = responseData.DIMENSION;
                        } else if (id == 11) {
                            this.showText = true;
                            this.optionImgUpload6 = false;
                            this.showOpt6Preloader = false;
                            this.option_image11_url = responseData.FPATH + this.contentId + '/' + this.bucketUuid + "/opt11.png?v=" + responseData.IMG_UPD_DT;
                            this.imageSet.opt11 = responseData.DIMENSION;
                        } else if (id == 12) {
                            this.showText = true;
                            this.optionImgUpload6 = false;
                            this.showOpt6Preloader = false;
                            this.option_image12_url = responseData.FPATH + this.contentId + '/' + this.bucketUuid + "/opt12.png?v=" + responseData.IMG_UPD_DT;
                            this.imageSet.opt12 = responseData.DIMENSION;
                        } else if (id == 13) {
                            this.quesImage = true;
                            this.showText = true;
                            this.optionImgUpload6 = false;
                            this.showOpt6Preloader = false;
                            this.image_upload_question_url = responseData.FPATH + this.contentId + '/' + this.bucketUuid + "/qst.png?v=" + responseData.IMG_UPD_DT;
                            this.imageSet.qst = responseData.DIMENSION;
                            this.question_placeholder = false;
                        } else if (id == 14) {
                            this.showText = true;
                            this.optionImgUpload6 = false;
                            this.showOpt6Preloader = false;
                            this.image_upload_solution_url = responseData.FPATH + this.contentId + '/' + this.bucketUuid + "/soln.png?v=" + responseData.IMG_UPD_DT;
                            this.imageSet.soln = responseData.DIMENSION;
                            this.solution_placeholder = false;
                        } else if (id == 15) {
                            this.showText = true;
                            this.optionImgUpload6 = false;
                            this.showOpt6Preloader = false;
                            this.image_upload_hint_url = responseData.FPATH + this.contentId + '/' + this.bucketUuid + "/hint.png?v=" + responseData.IMG_UPD_DT;
                            this.imageSet.hint = responseData.DIMENSION;
                            this.hint_placeholder = false;
                        }

                        //this._constantService.setToken(responseData.TOKEN);
                        this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                    } else if (status == this._constantService.error_token) {
                        this.dataConf['type'] = 4;
                        this.dataConf['msg'] = "Session Expire";
                        this.dataConf['error_msg'] = "Session Expired";
                        this.openConfirmation = true;

                    } else {
                        this.isUploading = false;
                        this.stopUpload = false;
                        this.dataConf['msg'] = responseData.ERROR;
                        this.dataConf['type'] = 2;
                        this.dataConf['error_msg'] = responseData.ERROR_MSG;
                        this.openConfirmation = true;
                        return false;
                    }
                }, error => {
                    var responseData = error;
                    if (responseData.status == 500) {
                        this._router.navigate(['500']);
                    }
                });
            } else {
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['type'] = 2;
                this.dataConf['error_msg'] = "Unable to support the selected file";
                this.openConfirmation = true;
                this.stopUpload = false;
                this.image_upload = null;
            }
        }
        else {
            this.dataConf['msg'] = "STUDY24X7";
            this.dataConf['type'] = 2;
            this.dataConf['error_msg'] = "File above 10mb is not allowed";
            this.openConfirmation = true;
            this.stopUpload = false;
            this.image_upload = null;
        }
    }

    editSubjects(index) {
        for (let i = 0; i < this.subjectArr.length; i++) {
            this.subjectArr[i].EDIT = false;
            this.editingSubId = '';
        }
        this.subjectArr[index].EDIT = true;
        this.editingSubId = this.subjectArr[index].KEY;
        this.updatedSubjectName = this.subjectArr[index].SUB;
    }

    updateTestDuration() {
        var val = this.contentId.split("study");
        var updTestDur = {};
        updTestDur['token'] = this._constantService.getSessionDataBYKey('token');
        updTestDur['token_param'] = {};
        updTestDur['token_param']['device_type'] = 'w';
        updTestDur['token_param']['host'] = '';
        updTestDur['pg_uuid'] = this.pageId;
        updTestDur['cntnt_uuid'] = val[0];
        updTestDur['cors_uuid'] = this.courseId;
        this.durationMin = 0;
        if (this.visibilityHour == 'HH') {
            this.durationMin = (parseInt(this.visibilityMinute));
        } else if (this.visibilityMinute == 'MM') {
            this.durationMin = ((parseInt(this.visibilityHour) * 60));
        } else {
            this.durationMin = ((parseInt(this.visibilityHour) * 60) + parseInt(this.visibilityMinute));
        }
        updTestDur['duration'] = this.durationMin;



        this._constantService.fetchDataApi(this._constantService.getUpdateTestDurationServiceUrl(), updTestDur).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == 'success') {

            }
        });
    }

    saveTestFxn() {
        console.log(this.durationMin);
        if (this.totalQuestionObj == 0) {
            this.dataConf['msg'] = "STUDY24X7";
            this.dataConf['type'] = 2;
            this.dataConf['error_msg'] = "Please provide some questions for test.";
            this.openConfirmation = true;
            return false;
        } else if (this.durationMin == 0) {
            this.dataConf['msg'] = "STUDY24X7";
            this.dataConf['type'] = 2;
            this.dataConf['error_msg'] = "Please provide time duration of test.";
            this.openConfirmation = true;
            return false;
        }
        var val = this.contentId.split("study");
        var saveTest = {};
        saveTest['token'] = this._constantService.getSessionDataBYKey('token');
        saveTest['token_param'] = {};
        saveTest['token_param']['device_type'] = 'w';
        saveTest['token_param']['host'] = '';
        saveTest['pg_uuid'] = this.pageId;
        saveTest['cntnt_uuid'] = val[0];
        saveTest['cors_uuid'] = this.courseId;



        this._constantService.fetchDataApi(this._constantService.getSaveTestServiceUrl(), saveTest).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            var testDetails = responseData.TEST_DETAILS;
            if (status == 'success') {
                this.essayCount = testDetails.ESSAY_COUNT;
                var langId = testDetails.LANG_ID;
                this.languageArr.forEach(obj => {
                    if (obj.LANGUAGE_ID == langId) {
                        this.quizLanguage = obj.LANGUAGE;
                    }
                });
                this.quizTotalMarks = testDetails.TOTAL_MARKS;
                this.quizTime = testDetails.DURATION;

                this.isQuizSummary = true;
            }
        });
    }

    quizCreationContinue() {
        this.isQuizSummary = false;
    }

    blanksCountFxn() {
        var blankFields = document.getElementsByName('blankFields');
        for (var i = 0; i < blankFields.length; i++) {
            if (blankFields.item(i).innerText != '_______________') {
                blankFields.item[i].remove();
                this.blankInserted--;
            }
        }
    }

    getFocusAtEnd(id) {
        this.postData.placeCaretAtEnd(id);
    }

    updateSubjectName(subId, index) {
        this.subjectArr.forEach(sub => {
            if (sub.SUB.trim().toLowerCase() == this.updatedSubjectName.trim().toLowerCase()) {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "Error";
                this.dataConf['error_msg'] = 'Subject name already exists.';
                this.openConfirmation = true;
                this.subjectArr[index].EDIT = false;
                return false;
            }
        });
        var val = this.contentId.split("study");
        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";
        hitObj['sub_id'] = subId;
        hitObj['sub'] = this.updatedSubjectName;
        hitObj['pg_uuid'] = this.pageId;
        hitObj['cntnt_uuid'] = val[0];
        hitObj['cors_uuid'] = this.courseId;


        this._constantService.fetchDataApi(this._constantService.getUpdateSubjectServiceUrl(), hitObj).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.subjectArr[index].EDIT = false;
                this.subjectArr[index].SUB = this.updatedSubjectName;
                this.editingSubId = '';
                this.updatedSubjectName = '';
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

    deleteSubjectName(subId, index) {
        if (this.subjectArr[index].SUB == 'Others') {
            this.dataConf['type'] = 2;
            this.dataConf['msg'] = "Error";
            this.dataConf['error_msg'] = 'Permission Denied!';
            this.openConfirmation = true;
            return false;
        }
        var val = this.contentId.split("study");
        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";
        hitObj['sub_id'] = subId;
        hitObj['pg_uuid'] = this.pageId;
        hitObj['cntnt_uuid'] = val[0];
        hitObj['cors_uuid'] = this.courseId;

        this._constantService.fetchDataApi(this._constantService.getDeleteSubjectServiceUrl(), hitObj).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {

                this.subjectArr.splice(index, 1);
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

    mergeSubject() {
        var checkedSubject = (<HTMLInputElement>document.querySelector('input[name="subjectList"]:checked'));
        if (checkedSubject) {
            var subjectIds = checkedSubject.value;
        } else {
            this.dataConf['type'] = 2;
            this.dataConf['msg'] = "Error";
            this.dataConf['error_msg'] = "Please select atleast one subject to mrege.";
            this.openConfirmation = true;
            return false;
        }
        var val = this.contentId.split("study");
        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";
        hitObj['old_sub_id'] = subjectIds;
        hitObj['new_sub_id'] = this.editingSubId;
        hitObj['pg_uuid'] = this.pageId;
        hitObj['cors_uuid'] = this.courseId;
        hitObj['cntnt_uuid'] = val[0];

        this._constantService.fetchDataApi(this._constantService.getSubjectMergeServiceUrl(), hitObj).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {

                window.location.reload();
                this.editingSubId = '';
                this.isMergingView = false;
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

    checkNewSubject(type) {
        this.subjectArr.forEach(sub => {
            if (sub.SUB.trim().toLowerCase() == this.newSubjectName.trim().toLowerCase()) {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "Error";
                this.dataConf['error_msg'] = 'Subject name already exists.';
                this.openConfirmation = true;
                return false;
            }
        });

    }

    OnFocus() {
        this.que_placeholder = false;
    }

    focusout() {
        this.que_placeholder = true;
    }

    OnFocusOption(event) {

        if (event == "opt1_text") {
            this.opt1_placeholder = false;
        }
        else if (event == "opt2_text") {
            this.opt2_placeholder = false;
        }
        else if (event == "opt3_text") {
            this.opt3_placeholder = false;
        }
        else if (event == "opt4_text") {
            this.opt4_placeholder = false;
        }
        else if (event == "opt5_text") {
            this.opt5_placeholder = false;
        }
        else if (event == "opt6_text") {
            this.opt6_placeholder = false;
        } else if (event == "sol_text") {
            this.sol_placeholder = false;
        } else if (event == "hint_text") {
            this.hint_placeholder = false;
        }
    }

    focusoutOption(event) {
        var val = document.getElementById(event).innerHTML;

        if (event == "opt1_text") {
            if (val.length == 0) {
                this.opt1_placeholder = true;
            }
        }
        else if (event == "opt2_text") {
            if (val.length == 0) {
                this.opt2_placeholder = true;
            }
        }
        else if (event == "opt3_text") {
            if (val.length == 0) {
                this.opt3_placeholder = true;
            }
        }
        else if (event == "opt4_text") {
            if (val.length == 0) {
                this.opt4_placeholder = true;
            }
        }
        else if (event == "opt5_text") {
            if (val.length == 0) {
                this.opt5_placeholder = true;
            }
        }
        else if (event == "opt6_text") {
            if (val.length == 0) {
                this.opt6_placeholder = true;
            }
        } else if (event == "sol_text") {
            if (val == "") {
                this.sol_placeholder = true;
            }

        } else if (event == "hint_text") {
            if (val == "") {
                this.hint_placeholder = true;
            }
        }
    }

    resetSelectedSub() {
        var checkedSubject = (<HTMLInputElement>document.querySelector('input[name="subjectList"]:checked'));
        if (checkedSubject) {
            checkedSubject.checked = false;
        }
    }

    ckeditor(id) {

        if (CKEDITOR.instances[id]) {
            CKEDITOR.instances[id].destroy(true);
        }
        setTimeout(() => {
            CKEDITOR.replace(id, {
                readOnly: this.ckeditorReadonly,
                width: '100%',
                height: 100,
                resize_maxWidth: 1000,
                resize_minWidth: 800,
                //                extraPlugins:'mathjax, mathJaxLib : 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/latest.js?config=TeX-MML-AM_CHTML',
                //extraPlugins : 'uploadimage',
                filebrowserBrowseUrl: this._constantService.ckeditorPath + 'ckfinder/ckfinder.html?command=QuickUpload&type=ImagesQuickUpload&type=Images&environment=' + this._constantService.platformDefinition + '&testId=' + this.contentId + '&userId=' + this._constantService.getSessionDataBYKey('u_id'),
                filebrowserImageBrowseUrl: this._constantService.ckeditorPath + 'ckfinder/ckfinder.html?type=Images?command=QuickUpload&type=ImagesQuickUpload&type=Images&environment=' + this._constantService.platformDefinition + '&testId=' + this.contentId + '&userId=' + this._constantService.getSessionDataBYKey('u_id'),
                filebrowserFlashBrowseUrl: this._constantService.ckeditorPath + 'ckfinder/ckfinder.html?type=Flash?command=QuickUpload&type=ImagesQuickUpload&type=Images&environment=' + this._constantService.platformDefinition + '&testId=' + this.contentId + '&userId=' + this._constantService.getSessionDataBYKey('u_id'),
                filebrowserUploadUrl: this._constantService.ckeditorPath + 'ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files&type=ImagesQuickUploads&environment=' + this._constantService.platformDefinition + '&testId=' + this.contentId + '&userId=' + this._constantService.getSessionDataBYKey('u_id'),
                filebrowserImageUploadUrl: this._constantService.ckeditorPath + 'ckfinder/core/connector/php/connector.php?command=QuickUpload&type=ImagesQuickUpload&type=Images&environment=' + this._constantService.platformDefinition + '&testId=' + this.contentId + '&userId=' + this._constantService.getSessionDataBYKey('u_id'),
                filebrowserFlashUploadUrl: this._constantService.ckeditorPath + 'ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Flash',
                customConfig: 'config.js',
            });
        }, 200);


        console.log(CKEDITOR.instances, id);


    }

    getckeditorData(id) {
        //        console.log("asif get");
        //         console.log(CKEDITOR.instances[id].getData());
        return CKEDITOR.instances[id].getData();
        // return CKEDITOR.instances[id].document.$;
    }

    resetValueOfckeditor(id) {
        CKEDITOR.instances[id].setData("");
    }

    setckeditorData(id, data) {
        // console.log(data);
        //        if(CKEDITOR.instances[id]){
        //            CKEDITOR.instances[id].destroy(true);
        //        }
        this.ckeditor(id);
        setTimeout(() => {
            CKEDITOR.instances[id].setData(data);
            //        this.readonlyckeditor();
            MathJax.Hub.Typeset();
        }, 1000);


    }


    readonlyckeditor() {

        for (var instanceName in CKEDITOR.instances) {
            CKEDITOR.instances[instanceName].setReadOnly(this.ckeditorReadonly);
        }
    }





}
