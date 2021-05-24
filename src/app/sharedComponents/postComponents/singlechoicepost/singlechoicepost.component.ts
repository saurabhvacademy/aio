import { Component, ViewChild, OnInit, ComponentFactoryResolver, ViewContainerRef, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import { PostdataService } from './../../../services/postdata.service';
import { ConstantService } from './../../../services/constant.service';
import { Router } from '@angular/router';
import { EncryptionService } from './../../../services/encryption.service';
import { InternalMessageService } from './../../../services/internal-message.service';
import { CommentComponent } from "./../commentView/comment.component";
import { PostSolutionHintComponent } from './../post-solution-hint/post-solution-hint.component';
import { LocalDataService } from 'src/app/services/local-data.service';


@Component({
    selector: 'app-singlechoicepost',
    templateUrl: './singlechoicepost.component.html',
    // host: { "(document:click)": "handleClick($event)" },
    providers: [PostdataService],
    styleUrls: ['./singlechoicepost.component.scss', './../textpost/allpost.scss']
})
export class SinglechoicepostComponent implements OnInit, AfterViewInit {
    postPublicShareLink: string = '';
    postTimeString: any = '';
    totalResponse: any;
    isCommentHit: boolean = false;
    picTyp: number;
    commImageDimns = '';
    pg_id: any;
    ltIntShow = [];
    showIntArr: boolean = false;
    timerOn: boolean = false;
    openConfirmation: boolean = false;
    vart: boolean = true;
    @ViewChild('container', { read: ViewContainerRef }) container;
    @ViewChild('reportPopup', { read: ElementRef }) reportPopup: ElementRef;
    _ref: any;
    postmenu = false;
    saveCondition = false;
    importantCondition = false;
    savepagepopup = false;
    loader: boolean = false;
    showText: boolean = true;

    hideSpan = 1;
    full_name: string;
    time: string;
    post_data: string;
    profile_pic_path: string;
    user_name: string;
    comment = 0;
    like = 0;
    share = 0;
    tagsArr = [];
    arr: any;
    comment_image;
    showCommentImg = 1;
    image_upload_url = '';
    u_id;
    post_id;
    c_data: string = "";
    edittextpost = false;
    // savepagepopup:boolean = false;
    my_profile: boolean = false;
    editPostId: string;
    DataView: boolean = false;
    latestComment;
    factory;
    ref;
    lastCommentId = 0;
    count = 0;
    savedFolderId;
    commentPresent: boolean = false;
    postTyp;
    questionAns = [];
    questionImg = "";
    option = [];
    option1 = "";
    option2 = "";
    option3 = "";
    option4 = "";
    option5 = "";
    option6 = "";
    option1Img = "";
    option2Img = "";
    option3Img = "";
    option4Img = "";
    option5Img = "";
    option6Img = "";
    hourDec: boolean = false;
    resultDeclared: boolean = false;
    questionTime = 0;
    hour = 0;
    min = 0;
    sec = 0;
    interestObj = {};
    responseStatus = 0;
    timeStatus = 0;
    image_path: string;
    instantResult: boolean = false;
    correctResponseCount = 0;
    incorrectResponseCount = 0;
    myResponse = [];
    myResponseStatus = 0;
    file_path = "";
    uuid;
    opt1RespCount = 0;
    opt2RespCount = 0;
    opt3RespCount = 0;
    opt4RespCount = 0;
    opt5RespCount = 0;
    opt6RespCount = 0;
    opt1Percentile = 0;
    opt2Percentile = 0;
    opt3Percentile = 0;
    opt4Percentile = 0;
    opt5Percentile = 0;
    opt6Percentile = 0;
    ConfirmDelete: boolean = false;
    dataConf = {};
    showPreloader: boolean = false;
    imonclick = false;
    viewCommentList: boolean = false;
    impLikeShareStatus = false;
    shareLikeShareStatus = false;
    userLikeShareList = {};
    date = new Date();
    post_key;
    enable_button: boolean = false;
    pg_uuid = '';
    isPagePost: boolean = false;
    followme: boolean = false;
    hideBtn: boolean = false;
    correctAnswer;
    postimagediv = '';
    oneViewPath = "";
    altName = "";

    socialFbShareUrl: string;
    socialTeitterShareUrl: string;
    socialLinkedInShareUrl: string;
    socialTelegramUrl: string;
    socialWhatsappLink: string;

    isSharePostList: boolean = false;
    solutionData: any = {};
    postSolHint: boolean = false;
    userProfilePic: any;
    constructor(
        public postdata: PostdataService,
        public _constantService: ConstantService,
        private _encrypt: EncryptionService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private router: Router,
        private _message: InternalMessageService,
        public _localDataService: LocalDataService
    ) {
    }


    follow() {
        if (this.followme == false) {
            this._constantService.followUnfollow(0, this.pg_uuid);
            this.followme = !this.followme;
            setTimeout(() => {
                this.hideBtn = true;
            }, 5000);
        }
    }

    hideSocialList() {
        let id = this.u_id + '_' + this.post_id + '_singleShareList';
        if (document.getElementById(id)) {
            document.getElementById(id).style.display = "none";
            document.getElementById(id).style.top = "0px";
        }

        this.isSharePostList = false;
    }


    showSharePostList(event) {
        let id = this.u_id + '_' + this.post_id + '_singleShareList';
        event.preventDefault();
        event.stopPropagation();
        this.isSharePostList = !this.isSharePostList;

        if (event.clientY > 500) {
            setTimeout(() => {
                if (document.getElementById(id)) {
                    document.getElementById(id).style.top = "-105px";
                    document.getElementById(id).style.display = "block";
                }
            }, 100);
        }
        else {
            setTimeout(() => {
                if (document.getElementById(id)) {
                    document.getElementById(id).style.top = "0px";
                    document.getElementById(id).style.display = "block";
                }
            }, 100);
        }


    }
    unfollow() {
        if (this.followme == true) {
            this._constantService.followUnfollow(1, this.pg_uuid);
            this.followme = !this.followme;
            this.hideBtn = false;
        }
    }
    setInterestObj() {
        if (this._constantService.getSessionDataBYKey('interests')) {
            this.interestObj = JSON.parse(this._constantService.getSessionDataBYKey('interests'));
        } else {
            setTimeout(() => {
                this.setInterestObj();
            }, 1000);
        }
    }
    ngOnInit() {
        // if(this.arr.MY_PROFILE){
            this.userProfilePic = this._localDataService.getProfilePicUrl();
        // }
        this.postPublicShareLink = this._constantService.staticPostShareLink + this.arr['USER_POST_ID'] + '/' + this.arr['URL'];
        this.socialFbShareUrl = "https://www.facebook.com/dialog/feed?app_id=" + this._constantService.facebookAppId + "&link=" + this.postPublicShareLink;
        this.socialTeitterShareUrl = "https://twitter.com/intent/tweet?text=''" + "&url=" + this.postPublicShareLink;
        this.socialLinkedInShareUrl = "https://www.linkedin.com/sharing/share-offsite/?url=" + this.postPublicShareLink;
        this.socialTelegramUrl = "https://telegram.me/share/url?url=" + this.postPublicShareLink;
        this.socialWhatsappLink = "https://api.whatsapp.com/send?text=" + this.postPublicShareLink;
        // console.log(this.arr, "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa");
        this.responseStatus = this.arr['RESPONSE_STATUS'];
        if (this.arr['USER_RESPONSE'] != null) {
            this.myResponse = this.arr['USER_RESPONSE'];
        }
        this.questionAns = this.arr['ANSWER'];
        this.correctAnswer = this.arr['ANSWER'].toString();
        //        this.correctResponseCount = this.arr['CORRECT_RESPONSE_COUNT'];
        //        this.incorrectResponseCount = this.arr['INCORRECT_RESPONSE_COUNT'];
        //        this.myResponseStatus = this.arr['RESPONSE'];
        //
        //        if (this.responseStatus == 1) {this.resultDeclared = true;}
        this.altName = "aio " + this.arr['KEYWORDS'];
        if (this.arr['ANSWER'] == 'a') {
            this.correctAnswer = 'A';
        }
        if (this.arr['ANSWER'] == 'b') {
            this.correctAnswer = 'B';
        }
        if (this.arr['ANSWER'] == 'c') {
            this.correctAnswer = 'C';
        }
        if (this.arr['ANSWER'] == 'd') {
            this.correctAnswer = 'D';
        }
        if (this.arr['ANSWER'] == 'e') {
            this.correctAnswer = 'E';
        }
        if (this.arr['ANSWER'] == 'f') {
            this.correctAnswer = 'F';
        }
        //        this.questionAns = this.arr['ANSWER'];
        //        console.log(this.questionAns);
        this.post_key = this.arr['USER_ID'] + ':' + this.arr['USER_POST_ID'] + ':3';
        this.post_id = this.arr['USER_POST_ID'];
        this.option = this.arr['OPTIONS'];
        this.setInterestObj();
        if (this.arr['INTERESTS'].length > 4) {
            for (var i = 0; i < 4; i++) {
                this.tagsArr[i] = this.arr['INTERESTS'][i];

            }
        } else {
            this.tagsArr = this.arr['INTERESTS'];
        }
        if (this.arr['INTERESTS'].length > 4) {
            this.showIntArr = true;
            for (var i = 0; i < this.arr['INTERESTS'].length; i++) {
                if (this.arr['INTERESTS'][i + 4] != undefined && this.arr['INTERESTS'][i + 4] != null && this.arr['INTERESTS'][i + 4] != '') {
                    this.ltIntShow[i] = this.arr['INTERESTS'][i + 4];
                }
            }
        }
        this.full_name = this.arr['USER_FULL_NAME'];
        this.time = this.arr['ADD_DATE_TIME'];
        if (this.arr['TEXT']) {
            this.post_data = this.postdata.decodeURIPostData(this.arr['TEXT']);
            this.post_data = this.postdata.linkActivate(this.post_data);
        } else {
            this.post_data = '';
        }

        if (this.arr['PATH'] != null || this.arr['PATH'] != '') {
            this.image_path = this.arr['PATH'] + "img/" + this.arr['USER_POST_ATTACHMENT_UUID'] + ".png";
        }
        if (this.post_data.length > 301) {
            this.DataView = !this.DataView;
        }
        //        this.post_data = this.post_data.replace(/  /g, " &#160;");
        if (this.arr['PAGE_UUID'] != '' && this.arr['PAGE_UUID'] != null) {
            this.pg_uuid = this.arr['PAGE_UUID'];
            this.isPagePost = true;
            if (this.arr['PAGE_NAME'] != '' && this.arr['PAGE_NAME'] != null) {
                this.pg_id = this.arr['PAGE_NAME'];
            } else {
                this.pg_id = this.arr['PAGE_UUID'];
            }
            if (this.arr['PAGE_FOLLOW_STATUS'] == 1) {
                this.followme = true;
                this.hideBtn = true;
            }
            if (this.arr['PAGE_PROFILE_PHOTO_PATH'] != null && this.arr['PAGE_PROFILE_PHOTO_PATH'] != '') {
                this.profile_pic_path = this.arr['PAGE_PROFILE_PHOTO_PATH'] + "profile/" + this.arr['PAGE_UUID'] + "_60x60.png?v=" + this.arr['IMG_UPD_DT'];
            } else {
                if (this.arr['PAGE_TYPE'] == 0) {
                    this.profile_pic_path = this._constantService.defaultPageIndImgPath;
                } else if (this.arr['PAGE_TYPE'] == 1) {
                    this.profile_pic_path = this._constantService.defaultPageCollgImgPath;
                }
            }
            this.user_name = this.postdata.decodeURIPostData(this.arr['TITLE']);
        } else {
            if (this.arr['PROFILE_PHOTO_PATH'] != null && this.arr['PROFILE_PHOTO_PATH'] != '') {
                this.profile_pic_path = this.arr['PROFILE_PHOTO_PATH'] + "profile/" + this.arr['USER_ID'] + "_60x60.png?v=" + this.arr['IMG_UPD_DT'];
            } else {
                this.profile_pic_path = this._constantService.defaultImgPath;
            }
            this.user_name = this.arr['USER_NAME'];
        }
        this.like = this.arr['LIKED_COUNT'];
        if (this.arr['LIKED'] == 1) {
            this.importantCondition = !this.importantCondition;
        }
        if (this.arr['SAVED'] == 1) {
            this.saveCondition = true;
        }
        if (this.arr['SAVED_POST_FLD_ID'] != 0) {
            this.savedFolderId = this.arr['SAVED_POST_FLD_ID'];
        }
        this.share = parseInt(this.arr['SHARED_COUNT']);
        this.comment = this.arr['COMMENT'];
        this.my_profile = this.arr['MY_PROFILE'];
        if (this.my_profile) {
            this.totalResponse = parseInt(this.arr['RESPONSE_COUNT']);
            this.opt1RespCount = this.arr['TOTAL_RESP_OPT1'];
            this.opt2RespCount = this.arr['TOTAL_RESP_OPT2'];
            this.opt3RespCount = this.arr['TOTAL_RESP_OPT3'];
            this.opt4RespCount = this.arr['TOTAL_RESP_OPT4'];
            this.opt5RespCount = this.arr['TOTAL_RESP_OPT5'];
            this.opt6RespCount = this.arr['TOTAL_RESP_OPT6'];
            if (this.totalResponse != 0) {
                if (this.opt1RespCount != 0) {
                    this.opt1Percentile = (Math.round(((this.opt1RespCount / this.totalResponse) * 100) * 100)) / 100;
                }
                if (this.opt2RespCount != 0) {
                    this.opt2Percentile = (Math.round(((this.opt2RespCount / this.totalResponse) * 100) * 100)) / 100;
                }
                if (this.opt3RespCount != 0) {
                    this.opt3Percentile = (Math.round(((this.opt3RespCount / this.totalResponse) * 100) * 100)) / 100;
                }
                if (this.opt4RespCount != 0) {
                    this.opt4Percentile = (Math.round(((this.opt4RespCount / this.totalResponse) * 100) * 100)) / 100;
                }
                if (this.opt5RespCount != 0) {
                    this.opt5Percentile = (Math.round(((this.opt5RespCount / this.totalResponse) * 100) * 100)) / 100;
                }
                if (this.opt6RespCount != 0) {
                    this.opt6Percentile = (Math.round(((this.opt6RespCount / this.totalResponse) * 100) * 100)) / 100;
                }
            }

        }
        this.u_id = this.arr['USER_ID'];

        if (this.arr['TEXT_IMAGE'] != null) {
            this.questionImg = this.arr['TEXT_IMAGE'];
        }

        if (this.option[0] != null) {
            this.option1 = this.postdata.decodeURIPostData(this.option[0]['TXT']);
            this.option1 = this.postdata.linkActivate(this.option1);
            //            this.option1 = this.option1.replace(/  /g, " &#160;");
            this.option1Img = this.option[0]['IMG'];
        }
        if (this.option[1] != null) {
            this.option2 = this.postdata.decodeURIPostData(this.option[1]['TXT']);
            this.option2 = this.postdata.linkActivate(this.option2);
            //            this.option1 = this.option1.replace(/  /g, " &#160;");
            this.option2Img = this.option[1]['IMG'];

        }
        if (this.option[2] != null) {
            this.option3 = this.postdata.decodeURIPostData(this.option[2]['TXT']);
            this.option3 = this.postdata.linkActivate(this.option3);
            //            this.option1 = this.option1.replace(/  /g, " &#160;");
            this.option3Img = this.option[2]['IMG'];
        }
        if (this.option[3] != null) {
            this.option4 = this.postdata.decodeURIPostData(this.option[3]['TXT']);
            this.option4 = this.postdata.linkActivate(this.option4);
            //            this.option1 = this.option1.replace(/  /g, " &#160;");
            this.option4Img = this.option[3]['IMG'];
        }
        if (this.option[4] != null) {
            this.option5 = this.postdata.decodeURIPostData(this.option[4]['TXT']);
            this.option5 = this.postdata.linkActivate(this.option5);
            //            this.option1 = this.option1.replace(/  /g, " &#160;");
            this.option5Img = this.option[4]['IMG'];
        }
        if (this.option[5] != null) {
            this.option6 = this.postdata.decodeURIPostData(this.option[5]['TXT']);
            this.option6 = this.postdata.linkActivate(this.option6);
            //            this.option1 = this.option1.replace(/  /g, " &#160;");
            this.option6Img = this.option[5]['IMG'];
        }
        this.responseStatus = this.arr['RESPONSE_STATUS'];
        this.timeStatus = this.arr['TIME_STATUS'];
        //        this.timeStatus = 1;
        this.questionAns = this.arr['ANSWER'];
        this.correctResponseCount = this.arr['CORRECT_RESPONSE_COUNT'];
        this.incorrectResponseCount = this.arr['INCORRECT_RESPONSE_COUNT'];
        if (this.arr['USER_RESPONSE'] != null) {
            this.myResponse = this.arr['USER_RESPONSE'];
        }
        this.myResponseStatus = this.arr['RESPONSE'];
        if (this.timeStatus == 1) {
            this.questionTime = this.arr['TIME_REMAINING'];
            if (this.questionTime != 0) {
                var time = this.questionTime.toString();
                var timeArr = time.split(".");
                this.min = parseInt(timeArr[0]) % 60;
                this.hour = Math.floor(parseInt(timeArr[0]) / 60);
                this.sec = parseInt(timeArr[1]);
                this.startTimer();
            } else {
                this.resultDeclared = true;
            }
        } else {
            if (this.responseStatus == 0 && this.myResponseStatus == null) {
                this.instantResult = true;
            } else {
                this.resultDeclared = true;
            }
        }
        this.latestComment = this.arr['LT_COMM_DATA'];

        this.editPostId = this.u_id + ":" + this.post_id + ":3";
        if (Object.keys(this.latestComment).length != 0) {
            this.viewCommentList = true;
        }
        if (this.comment > 1) {
            this.commentPresent = true;
        }
        //        this.getReachPost();

    }
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (this.showIntArr == true) {
            var innerWidthFull = window.innerWidth;
            var interestPosLeft = document.getElementById(this.post_id + '_interestpos').offsetLeft;
            var interestPosRight = innerWidthFull - interestPosLeft;
            if (window.innerWidth < 600) {
                if (interestPosRight <= 185) {
                    document.getElementById(this.post_id + "_shftToLeft").style.left = "-148px";
                    document.getElementById(this.post_id + "_shiftArrowLeft").style.left = "155px";
                } else {
                    document.getElementById(this.post_id + "_shftToLeft").style.left = "-9px";
                    document.getElementById(this.post_id + "_shiftArrowLeft").style.left = "15px";
                }
            }
        }
    }
    private findInterestPos() {
        if (this.showIntArr == true) {
            var innerWidthFull = window.innerWidth;
            var interestPosLeft = document.getElementById(this.post_id + '_interestpos').offsetLeft;
            var interestPosRight = innerWidthFull - interestPosLeft;
            if (window.innerWidth < 600) {
                if (interestPosRight <= 185) {
                    document.getElementById(this.post_id + "_shftToLeft").style.left = "-148px";
                    document.getElementById(this.post_id + "_shiftArrowLeft").style.left = "155px";
                } else {
                    document.getElementById(this.post_id + "_shftToLeft").style.left = "-9px";
                    document.getElementById(this.post_id + "_shiftArrowLeft").style.left = "15px";
                }
            }
        }
    }
    // ngAfterViewChecked(){
    //   this.findInterestPos();
    // }

    ngAfterViewInit() {
        this.solutionData = {
            SOLUTION: this.arr.SOLUTION,
            SOL_MEDIA: this.arr.SOL_MEDIA,
            SOL_TYP: this.arr.SOL_TYP,
            UNIQUE_QUESTION_ID: this.arr.UNIQUE_QUESTION_ID
        }
        this.findInterestPos();
        this.option = this.arr['OPTIONS'];
        if (Object.keys(this.latestComment).length != 0) {
            this.lastCommentId = this.latestComment.USER_COMMENT_ID;
            this.latestComment['ADD_DATE_TIME'] = this.postdata.getPostDateTime(this.latestComment['ADD_DATE_TIME']);
            //this._constantService.setCommentData(this.latestComment);
            this.factory = this.componentFactoryResolver.resolveComponentFactory(CommentComponent);
            this.ref = this.container.createComponent(this.factory);
            this.ref.instance.arr = this.latestComment;
            this.ref.instance._ref = this.ref;
            if (this.comment > 1 && this.router.url.split('/')[1] == "post") {
                this.getComment();
            }
        }
        //        setTimeout(() => {
        //            if (this.post_data != "") {
        //                //document.getElementById(this.post_id + "_quesText").innerHTML = this.post_data;
        //                this.post_data = this.postdata.getQuestionTextToSave(this.post_id);
        //            }
        //            if (this.option1 != "") {
        //                this.option1 = this.postdata.getOption1TextToSave(this.post_id);
        //            }
        //            if (this.option2 != "") {
        //                this.option2 = this.postdata.getOption2TextToSave(this.post_id);
        //            }
        //            if (this.option3 != "") {
        //                this.option3 = this.postdata.getOption3TextToSave(this.post_id);
        //            }
        //            if (this.option4 != "") {
        //                this.option4 = this.postdata.getOption4TextToSave(this.post_id);
        //            }
        //            if (this.option5 != "") {
        //                this.option5 = this.postdata.getOption5TextToSave(this.post_id);
        //            }
        //            if (this.option6 != "") {
        //                this.option6 = this.postdata.getOption6TextToSave(this.post_id);
        //            }
        //        }, 500);
        if (this.my_profile == false) {
            if (this.responseStatus == 1 && this.questionTime != 0 && this.resultDeclared == false) {
                (<HTMLInputElement>document.getElementById(this.post_id + "_option1")).disabled = true;
                (<HTMLInputElement>document.getElementById(this.post_id + "_option2")).disabled = true;
                if (this.option3 != "") {
                    (<HTMLInputElement>document.getElementById(this.post_id + "_option3")).disabled = true;
                }
                if (this.option4 != "") {
                    (<HTMLInputElement>document.getElementById(this.post_id + "_option4")).disabled = true;
                }

                if (this.option5 != "") {
                    (<HTMLInputElement>document.getElementById(this.post_id + "_option5")).disabled = true;
                }
                if (this.option6 != "") {
                    (<HTMLInputElement>document.getElementById(this.post_id + "_option6")).disabled = true;
                }
                //                if (this.resultDeclared == false) {
                //                    (<HTMLButtonElement> document.getElementById(this.post_id + "_submit")).disabled = true;
                //                    //  (<HTMLButtonElement> document.getElementById(this.post_id + "_submit")).innerText = "Submitted";
                //                }
                if (this.myResponse[0] == "A") {
                    var optSolA = (<HTMLInputElement>document.getElementById(this.post_id + "_option1"));
                    if (optSolA != null) {
                        optSolA.checked = true;
                    }
                } else if (this.myResponse[0] == "B") {
                    var optSolB = (<HTMLInputElement>document.getElementById(this.post_id + "_option2"));
                    if (optSolB != null) {
                        optSolB.checked = true;
                    }
                } else if (this.myResponse[0] == "C") {
                    var optSolC = (<HTMLInputElement>document.getElementById(this.post_id + "_option3"));
                    if (optSolC != null) {
                        optSolC.checked = true;
                    }
                } else if (this.myResponse[0] == "D") {
                    var optSolD = (<HTMLInputElement>document.getElementById(this.post_id + "_option4"));
                    if (optSolD != null) {
                        optSolD.checked = true;
                    }
                } else if (this.myResponse[0] == "E") {
                    var optSolE = (<HTMLInputElement>document.getElementById(this.post_id + "_option5"));
                    if (optSolE != null) {
                        optSolE.checked = true;
                    }
                } else if (this.myResponse[0] == "F") {
                    var optSolF = (<HTMLInputElement>document.getElementById(this.post_id + "_option6"));
                    if (optSolF != null) {
                        optSolF.checked = true;
                    }
                }
            }
            if (this.resultDeclared) {

                if (this.questionAns[0] == "A") {
                    var queAns1 = document.getElementById(this.post_id + "_opt1");
                    if (queAns1 != null) {
                        queAns1.className += " rightanswer";
                    }
                } else if (this.questionAns[0] == "B") {
                    var queAns2 = document.getElementById(this.post_id + "_opt2");
                    if (queAns2 != null) {
                        queAns2.className += " rightanswer";
                    }
                } else if (this.questionAns[0] == "C") {
                    var queAns3 = document.getElementById(this.post_id + "_opt3");
                    if (queAns3 != null) {
                        queAns3.className += " rightanswer";
                    }
                } else if (this.questionAns[0] == "D") {
                    var queAns4 = document.getElementById(this.post_id + "_opt4");
                    if (queAns4 != null) {
                        queAns4.className += " rightanswer";
                    }
                } else if (this.questionAns[0] == "E") {
                    var queAns5 = document.getElementById(this.post_id + "_opt5");
                    if (queAns5 != null) {
                        queAns5.className += " rightanswer";
                    }
                } else if (this.questionAns[0] == "F") {
                    var queAns6 = document.getElementById(this.post_id + "_opt6");
                    if (queAns6 != null) {
                        queAns6.className += " rightanswer";
                    }
                }

                if (this.myResponse[0] == "A") {
                    if (this.myResponse[0] != this.questionAns[0]) {
                        var queAns1 = document.getElementById(this.post_id + "_opt1");
                        if (queAns1 != null) {
                            queAns1.className += " wronganswer";
                        }
                    }
                } else if (this.myResponse[0] == "B") {
                    if (this.myResponse[0] != this.questionAns[0]) {
                        var queAns2 = document.getElementById(this.post_id + "_opt2");
                        if (queAns2 != null) {
                            queAns2.className += " wronganswer";
                        }
                    }
                } else if (this.myResponse[0] == "C") {
                    if (this.myResponse[0] != this.questionAns[0]) {
                        var queAns3 = document.getElementById(this.post_id + "_opt3");
                        if (queAns3 != null) {
                            queAns3.className += " wronganswer";
                        }
                    }
                } else if (this.myResponse[0] == "D") {
                    if (this.myResponse[0] != this.questionAns[0]) {
                        var queAns4 = document.getElementById(this.post_id + "_opt4");
                        if (queAns4 != null) {
                            queAns4.className += " wronganswer";
                        }
                    }
                } else if (this.myResponse[0] == "E") {
                    if (this.myResponse[0] != this.questionAns[0]) {
                        var queAns5 = document.getElementById(this.post_id + "_opt5");
                        if (queAns5 != null) {
                            queAns5.className += " wronganswer";
                        }
                    }
                } else if (this.myResponse[0] == "F") {
                    if (this.myResponse[0] != this.questionAns[0]) {
                        var queAns6 = document.getElementById(this.post_id + "_opt6");
                        if (queAns6 != null) {
                            queAns6.className += " wronganswer";
                        }
                    }
                }
            }
        } else {
            if (this.questionAns[0] == "A") {
                var queAns1 = document.getElementById(this.post_id + "_opt1");
                if (queAns1 != null) {
                    queAns1.className += " rightanswer";
                }
            } else if (this.questionAns[0] == "B") {
                var queAns2 = document.getElementById(this.post_id + "_opt2");
                if (queAns2 != null) {
                    queAns2.className += " rightanswer";
                }
            } else if (this.questionAns[0] == "C") {
                var queAns3 = document.getElementById(this.post_id + "_opt3");
                if (queAns3 != null) {
                    queAns3.className += " rightanswer";
                }
            } else if (this.questionAns[0] == "D") {
                var queAns4 = document.getElementById(this.post_id + "_opt4");
                if (queAns4 != null) {
                    queAns4.className += " rightanswer";
                }
            } else if (this.questionAns[0] == "E") {
                var queAns5 = document.getElementById(this.post_id + "_opt5");
                if (queAns5 != null) {
                    queAns5.className += " rightanswer";
                }
            } else if (this.questionAns[0] == "F") {
                var queAns6 = document.getElementById(this.post_id + "_opt6");
                if (queAns6 != null) {
                    queAns6.className += " rightanswer";
                }
            }
        }
        this.findInterestPos();

    }

    handleClick(event) {
        this.isSharePostList = false;
        var clickedComponent = event.target;
        var openPopUp = 0;
        do {
            if (this.reportPopup && clickedComponent === this.reportPopup.nativeElement) {
                openPopUp = 1;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (openPopUp != 1) {
            this.postmenu = false;
        }
    }

    postdropdown() {
        this.postmenu = !this.postmenu;
        this.imonclick = true;
    }


    updateProfilePic(event) {
        if (this.profile_pic_path == null) {
            event.target.src = this._constantService.defaultImgPath;
        }
    }

    savedpost() {
        if (this.saveCondition == false) {
            this.savepagepopup = !this.savepagepopup;
            let body = document.getElementsByTagName('body')[0];
            body.classList.add("body-overflow");
        } else {
            this.putUserPostUnsaved();
        }
    }

    important() {
        if (this.vart == true) {
            this.vart = false;

            var importData = {};
            importData['token'] = this._constantService.getSessionDataBYKey('token');
            importData['token_param'] = {};
            importData['token_param']['device_type'] = 'w';
            importData['token_param']['host'] = '';
            importData['pid'] = this.post_id;
            if (this.importantCondition) {
                importData['status'] = 1;
            } else {
                importData['status'] = 0;
            }
            //importData['like_count'] = this.like;



            this._constantService.fetchDataApi(this._constantService.putUserPostImportantServiceUrl(), importData).subscribe(data => {
                var responseData: any = data;
                var status = responseData.STATUS;
                if (status == this._constantService.success_msg) {
                    this.vart = true;
                    this.importantCondition = !this.importantCondition;
                    if (this.importantCondition) {
                        this.like++;
                    } else {
                        this.like--;
                    }
                } else if (status == this._constantService.error_token) {
                    this.vart = true;
                    this.dataConf['type'] = 4;
                    this.dataConf['msg'] = "Session Expire";
                    this.dataConf['error_msg'] = "Session Expired";
                    this.openConfirmation = true;
                } else {
                    this.vart = true;
                    this.dataConf['type'] = 2;
                    this.dataConf['msg'] = "STUDY24X7";
                    this.dataConf['error_msg'] = responseData.ERROR_MSG;
                    this.openConfirmation = true;
                }
            }, error => {
                var responseData = error;
                if (responseData.status == 500) {
                    this.router.navigate(['500']);
                }
            });
        }
    }
    //    reprts(){
    //        this.reportpopup = true;
    //
    //    }
    //    reportpopuphide(){
    //        this.reportpopup = false;
    //    }
    closePopup(event) {
        this.openConfirmation = false;
    }

    startTimer() {
        this.sec = this.sec - 1;
        if (this.sec < 0) { this.sec = 59 };
        if (this.min < 0) {
            this.min = 59;
            this.hourDec = true;
        } else {
            this.hourDec = false;
        };
        if (this.hourDec && this.hour >= 0) {
            this.hour = this.hour - 1;
        }
        if (this.sec == 59) { this.min = this.min - 1 }

        var hours;
        var minutes;
        var seconds;
        if (this.hour < 10) {
            hours = '0' + this.hour.toString();
        } else {
            hours = this.hour.toString();
        }
        if (this.min < 10) {
            minutes = '0' + this.min.toString();
        } else {
            minutes = this.min.toString();
        }
        if (this.sec < 10) {
            seconds = '0' + this.sec.toString();
        } else {
            seconds = this.sec.toString();
        }

        this.postTimeString = hours + ':' + minutes + ':' + seconds;

        if (this.min == 0 && this.hour == 0 && this.sec == 0) {
            this.getQuestionPostData();
            setTimeout(this.changeView.bind(this), 10);
            return false;
        } else {
            setTimeout(this.startTimer.bind(this), 1000);
        }
    }

    getQuestionPostData() {
        var postData = {};
        postData['token'] = this._constantService.getSessionDataBYKey('token');
        postData['token_param'] = {};
        postData['token_param']['device_type'] = 'w';
        postData['token_param']['host'] = '';
        postData['pid'] = this.post_key;

        var url = "";
        if (this.my_profile) {
            url = this._constantService.getQuestionPostDataProfileServiceUrl()
        } else {
            url = this._constantService.getQuestionPostDataWallServiceUrl();
        }
        this._constantService.fetchDataApi(url, postData).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                if (this.my_profile) {
                    var postData = responseData.POST_DATA[0];
                    this.totalResponse = parseInt(postData['RESPONSE_COUNT']);
                    this.opt1RespCount = postData['TOTAL_RESP_OPT1'];
                    this.opt2RespCount = postData['TOTAL_RESP_OPT2'];
                    this.opt3RespCount = postData['TOTAL_RESP_OPT3'];
                    this.opt4RespCount = postData['TOTAL_RESP_OPT4'];
                    this.opt5RespCount = postData['TOTAL_RESP_OPT5'];
                    this.opt6RespCount = postData['TOTAL_RESP_OPT6'];
                    if (this.totalResponse != 0) {
                        if (this.opt1RespCount != 0) {
                            this.opt1Percentile = (Math.round(((this.opt1RespCount / this.totalResponse) * 100) * 100)) / 100;
                        }
                        if (this.opt2RespCount != 0) {
                            this.opt2Percentile = (Math.round(((this.opt2RespCount / this.totalResponse) * 100) * 100)) / 100;
                        }
                        if (this.opt3RespCount != 0) {
                            this.opt3Percentile = (Math.round(((this.opt3RespCount / this.totalResponse) * 100) * 100)) / 100;
                        }
                        if (this.opt4RespCount != 0) {
                            this.opt4Percentile = (Math.round(((this.opt4RespCount / this.totalResponse) * 100) * 100)) / 100;
                        }
                        if (this.opt5RespCount != 0) {
                            this.opt5Percentile = (Math.round(((this.opt5RespCount / this.totalResponse) * 100) * 100)) / 100;
                        }
                        if (this.opt6RespCount != 0) {
                            this.opt6Percentile = (Math.round(((this.opt6RespCount / this.totalResponse) * 100) * 100)) / 100;
                        }
                    }

                } else {
                    //                    if (responseData.USER_RESPONSE != null) {
                    //                        this.myResponse = responseData.USER_RESPONSE;
                    //                    }
                    if (responseData.POST_DATA[0].CORRECT_RESPONSE_COUNT != null) {
                        this.correctResponseCount = responseData.POST_DATA[0].CORRECT_RESPONSE_COUNT;
                    }

                    if (responseData.POST_DATA[0].INCORRECT_RESPONSE_COUNT != null) {
                        this.incorrectResponseCount = responseData.POST_DATA[0].INCORRECT_RESPONSE_COUNT;
                    }
                    this.myResponseStatus = responseData.POST_DATA[0].RESPONSE;

                }

            } else if (status == this._constantService.error_token) {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });
        this.resultDeclared = true;
    }

    puResponseOnQuestion() {

        if (this.loader) {
            return false;
        }
        this.loader = true;
        this.showText = false;
        var response = {};
        response['token'] = this._constantService.getSessionDataBYKey('token');
        response['token_param'] = {};
        response['token_param']['device_type'] = 'w';
        response['token_param']['host'] = '';
        response['pid'] = this.post_id;
        response['qtyp'] = 1;
        var selectedResponse = (<HTMLInputElement>document.querySelector('input[name="' + this.post_id + '_mainoption"]:checked'));
        if (selectedResponse != null) {
            var arr = [];
            arr.push(selectedResponse.value);
            response['qresp'] = arr;
        } else {
            this.loader = false;
            this.showText = true;
            return false;
        }

        this._constantService.fetchDataApi(this._constantService.putQuestionResponseServiceUrl(), response).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this._constantService.showToast("Your Response Saved Successfully", "", "1");              ////////////*********add by vijay*************//////////
                this._message.setCommand(0, 'desc');
                this.loader = false;
                this.showText = true;
                this.timerOn = true;
                this.myResponse = arr;
                if (this.instantResult) {
                    this.resultDeclared = true;
                    setTimeout(this.changeView.bind(this), 10);
                } else {
                    (<HTMLInputElement>document.getElementById(this.post_id + "_option1")).disabled = true;
                    (<HTMLInputElement>document.getElementById(this.post_id + "_option2")).disabled = true;
                    if (this.option3 != "") {
                        (<HTMLInputElement>document.getElementById(this.post_id + "_option3")).disabled = true;
                    }
                    if (this.option4 != "") {
                        (<HTMLInputElement>document.getElementById(this.post_id + "_option4")).disabled = true;
                    }

                    if (this.option5 != "") {
                        (<HTMLInputElement>document.getElementById(this.post_id + "_option5")).disabled = true;
                    }
                    if (this.option6 != "") {
                        (<HTMLInputElement>document.getElementById(this.post_id + "_option6")).disabled = true;
                    }
                    (<HTMLButtonElement>document.getElementById(this.post_id + "_submit")).disabled = false;
                    //(<HTMLButtonElement> document.getElementById(this.post_id + "_submit")).innerText = "Submitted";
                    (<HTMLButtonElement>document.getElementById(this.post_id + "_submit")).classList.remove('aselesctopetion');

                    this.timerOn = true;
                    this.showText = true;
                }
                this.myResponseStatus = responseData.RESPONSE_STATUS;
                this.responseStatus = 1;
                this.correctResponseCount = responseData.CORRECT_RESPONSE;
                this.incorrectResponseCount = responseData.INCORRECT_RESPONSE;
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
            } else if (status == this._constantService.error_token) {
                this.loader = false;
                this.showText = true;
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;
            } else {
                this.loader = false;
                this.showText = true;
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "Study24x7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });
    }

    changeView() {
        if (this.questionAns[0] == "A") {
            document.getElementById(this.post_id + "_opt1").className += " rightanswer";
        } else if (this.questionAns[0] == "B") {
            document.getElementById(this.post_id + "_opt2").className += " rightanswer";
        } else if (this.questionAns[0] == "C") {
            document.getElementById(this.post_id + "_opt3").className += " rightanswer";
        } else if (this.questionAns[0] == "D") {
            document.getElementById(this.post_id + "_opt4").className += " rightanswer";
        } else if (this.questionAns[0] == "E") {
            document.getElementById(this.post_id + "_opt5").className += " rightanswer";
        } else if (this.questionAns[0] == "F") {
            document.getElementById(this.post_id + "_opt6").className += " rightanswer";
        }
        if (this.myResponse[0] == "A") {
            if (this.myResponse[0] != this.questionAns[0]) {
                document.getElementById(this.post_id + "_opt1").className += " wronganswer";
            }
        } else if (this.myResponse[0] == "B") {
            if (this.myResponse[0] != this.questionAns[0]) {
                document.getElementById(this.post_id + "_opt2").className += " wronganswer";
            }
        } else if (this.myResponse[0] == "C") {
            if (this.myResponse[0] != this.questionAns[0]) {
                document.getElementById(this.post_id + "_opt3").className += " wronganswer";
            }
        } else if (this.myResponse[0] == "D") {
            if (this.myResponse[0] != this.questionAns[0]) {
                document.getElementById(this.post_id + "_opt4").className += " wronganswer";
            }
        } else if (this.myResponse[0] == "E") {
            if (this.myResponse[0] != this.questionAns[0]) {
                document.getElementById(this.post_id + "_opt5").className += " wronganswer";
            }
        } else if (this.myResponse[0] == "F") {
            if (this.myResponse[0] != this.questionAns[0]) {
                document.getElementById(this.post_id + "_opt6").className += " wronganswer";
            }
        }
        //        if (this.option1 != "") {
        //            //document.getElementById(this.post_id + "_opt1_text").innerHTML = this.option1;
        //            this.option1 = this.postdata.getOption1TextToSave(this.post_id);
        //        }
        //        if (this.option2 != "") {
        //            //document.getElementById(this.post_id + "_opt2_text").innerHTML = this.option2;
        //            this.option2 = this.postdata.getOption2TextToSave(this.post_id);
        //        }
        //        if (this.option3 != "") {
        //            //document.getElementById(this.post_id + "_opt3_text").innerHTML = this.option3;
        //            this.option3 = this.postdata.getOption3TextToSave(this.post_id);
        //        }
        //        if (this.option4 != "") {
        //            //document.getElementById(this.post_id + "_opt4_text").innerHTML = this.option4;
        //            this.option4 = this.postdata.getOption4TextToSave(this.post_id);
        //        }
        //        if (this.option5 != "") {
        //            //document.getElementById(this.post_id + "_opt5_text").innerHTML = this.option5;
        //            this.option5 = this.postdata.getOption5TextToSave(this.post_id);
        //        }
        //        if (this.option6 != "") {
        //            //document.getElementById(this.post_id + "_opt6_text").innerHTML = this.option6;
        //            this.option6 = this.postdata.getOption6TextToSave(this.post_id);
        //        }
    }

    removePost(event) {
        if (event) {
            this._ref.destroy();
            //            this._message.setCommand(0, 'desc');
            this._constantService.callEmptyStateMethod();
        }
        this.reportpopup = false;
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }

    updateSourcePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }

    //    deletePostCnf() {
    //        this.ConfirmDelete = true;
    //        let body = document.getElementsByTagName('body')[0];
    //        body.classList.add("body-overflow");
    //    }


    editPost() {
        this.edittextpost = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }

    textPostEditClose(event) {
        this.edittextpost = event;
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }

    fullPostViewStatus: boolean = false;
    openFullPostView() {
        this.fullPostViewStatus = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }

    closeFullPostView(event) {
        this.fullPostViewStatus = event;
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }

    reportpopup = false;
    reprts() {
        this.reportpopup = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }

    reportpopupClose(event) {
        this.reportpopup = event;
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }

    addImageFile(event: any) {
        this.comment_image = event.target.files[0];
        let type = this.comment_image.name;
        var reader = new FileReader();
        var typearr = type.split(".");
        this.showPreloader = true;
        var size = Math.round(this.comment_image.size / 1000 / 1000);
        if (size <= 10) {
            if (typearr[1] == 'jpg' || typearr[1] == 'jpeg' || typearr[1] == 'JPG' || typearr[1] == 'JPEG' || typearr[1] == 'png' || typearr[1] == 'PNG') {
                this.showCommentImg = 2;
                reader.onload = (event: any) => {
                    this.image_upload_url = event.target.result;
                }
                reader.readAsDataURL(event.target.files[0]);
                var upload = {};
                upload['token'] = this._constantService.getSessionDataBYKey('token');
                upload['token_param'] = {};
                upload['token_param']['device_type'] = "w";
                upload['token_param']['host'] = "";
                var data = JSON.stringify(upload);
                var encData = this._encrypt.encrypt(data);
                let formData = new FormData();
                formData.append("file", this.comment_image);
                formData.append("pattchid", '0');
                formData.append("token", encData);
                formData.append("type", "4");

                this._constantService.uploadFileApi(this._constantService.getUploadFileServiceUrl(), formData).subscribe(data => {
                    var responseData: any = data;
                    var status = responseData.STATUS;
                    if (status == this._constantService.success_msg) {
                        this.autoFocus();
                        this.showPreloader = false;
                        this.commImageDimns = responseData.DIMENSION;
                        this.file_path = responseData.FPATH;
                        this.uuid = responseData.UUID;
                        //this._constantService.setToken(responseData.TOKEN);
                        this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                    } else if (status == this._constantService.error_token) {
                        this.dataConf['type'] = 4;
                        this.dataConf['msg'] = "Session Expire";
                        this.dataConf['error_msg'] = "Session Expired";
                        this.openConfirmation = true;
                    } else {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "STUDY24X7";
                        this.dataConf['error_msg'] = responseData.ERROR_MSG;
                        this.openConfirmation = true;
                        this.showCommentImg = 1;
                        this.comment_image = null;
                    }
                }, error => {
                    var responseData = error;
                    if (responseData.status == 500) {
                        this.router.navigate(['500']);
                    }
                });
            }
        } else {
            this.dataConf['msg'] = "STUDY24X7";
            this.dataConf['type'] = 2;
            this.dataConf['error_msg'] = "File above 10mb is not allowed";
            this.openConfirmation = true;
            this.showCommentImg = 1;
            this.comment_image = null;
        }

    }
    confirmText(value, event) {
        event.preventDefault();
        event.stopPropagation();
        this.c_data = value;

    }

    addComment(event) {

        if (event.keyCode == 13 && !event.ctrlKey && !event.shiftKey) {
            if (this.isCommentHit) {
                return false;
            } else {
                this.isCommentHit = true;
            }

            this.c_data = this.postdata.postDataManipulation(event.target.id);
            if (this.c_data.length == 0 && this.comment_image == null) {
                this.confirmText(this.c_data, event);
                return false;
            } this.hideSpan = 0;
            this.viewCommentList = true;
            var id = event.target.id;
            var comment = {};
            comment['token'] = this._constantService.getSessionDataBYKey('token');
            comment['token_param'] = {};
            comment['token_param']['device_type'] = 'w';
            comment['token_param']['host'] = '';
            comment['pid'] = this.post_id;
            comment['cmda'] = this.postdata.encodeURIPostData(this.c_data);
            comment['cmid'] = "0";
            if (this.comment_image != null) {
                comment['fpath'] = this.file_path;
                comment['uuid'] = this.uuid;
                comment['dimns'] = this.commImageDimns;
            } else {
                comment['fpath'] = "";
                comment['uuid'] = "";
            }
            if (comment['cmda'].length == 0 && this.comment_image == null) {
                return false;

            }

            // event.preventDefault();
            if (this.isCommentHit == true) {
                this._constantService.fetchDataApi(this._constantService.putCommentServiceUrl(), comment).subscribe(data => {
                    var responseData: any = data;
                    var status = responseData.STATUS;
                    if (status == this._constantService.success_msg) {
                        event.target.innerHTML = this._constantService.commentPlaceHolder;
                        event.target.classList.add("placeholdercolor");
                        event.target.classList.remove("option_inputt", "setwdth");
                        this.showCommentImg = 1;
                        this.comment_image = null;
                        this.hideSpan = 1;

                        var date = new Date();
                        var addComment = {};
                        addComment['COMMENT_BY'] = this._constantService.getSessionDataBYKey('u_id');
                        addComment['IMAGE_PATH'] = this.file_path;
                        addComment['PARENT_ID'] = null;
                        addComment['PROFILE_PHOTO_PATH'] = this._constantService.getSessionDataBYKey('profile_pic_s3');
                        addComment['TEXT'] = this.c_data;
                        addComment['USER_COMMENT_ID'] = responseData.COMID;
                        addComment['USER_FULL_NAME'] = this._constantService.getSessionDataBYKey('full_name');
                        addComment['USER_NAME'] = this._constantService.getSessionDataBYKey('username');
                        addComment['USER_POST_ID'] = this.post_id;
                        addComment['UNIQUE_COMMENT_ATTACHMENT_ID'] = this.uuid;
                        addComment['ADD_DATE_TIME'] = this.postdata.getPostDateTime(date.getTime());
                        addComment['ADD_DATE_TIME'] = this.postdata.getPostDateTime(date.getTime());
                        var count = (<HTMLElement>document.getElementById(this.post_id + '_comm_count'));
                        if (count != null) {
                            if (parseInt(count.innerHTML) == 0) {
                                count.style.display = "inline-block";
                            }
                            count.innerHTML = (parseInt(count.innerHTML) + 1).toString();
                        } else {
                            this.comment = 1;
                        }
                        //this._constantService.setCommentData(addComment);
                        this.factory = this.componentFactoryResolver.resolveComponentFactory(CommentComponent);
                        this.ref = this.container.createComponent(this.factory, 0);
                        this.ref.instance.arr = addComment;
                        this.ref.instance._ref = this.ref;
                        this.uuid = "";
                        this.file_path = "";
                        this.hideSpan = 1;
                        window.getSelection().removeAllRanges();
                        this.isCommentHit = true;
                    } else if (status == this._constantService.error_token) {
                        this.dataConf['type'] = 4;
                        this.dataConf['msg'] = "Session Expire";
                        this.dataConf['error_msg'] = "Session Expired";
                        this.openConfirmation = true;
                    } else {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "STUDY24X7";
                        this.dataConf['error_msg'] = responseData.ERROR_MSG;
                        this.openConfirmation = true;
                    }
                }, error => {
                    var responseData = error;
                    if (responseData.status == 500) {
                        this.router.navigate(['500']);
                    }
                });
            }

        } else if (event.keyCode == 13 && event.keyCode == 17) {
            event.target.innerHTML = event.target.innerHTML + "<br>";
        }
    }
    sharetextpostviewsec = false;
    openShareScreen() {
        this.arr['EDIT_POST'] = false;
        this.sharetextpostviewsec = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }
    sharetextpostparenthide(event) {
        this.sharetextpostviewsec = false;
        if (event) {
            this.share += 1;
        }
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }

    deletePostCnf() {
        this.ConfirmDelete = true;
        this.dataConf['msg'] = "Post Deletion"
        this.dataConf['error_msg'] = "Are you sure about deleting this feed post?";
        this.dataConf['type'] = 1;
        this.dataConf['pid'] = this.post_id;
        this.dataConf['ptyp'] = 3;
        //        setTimeout(() => {
        //            var count = (document.getElementById(this.savedFolderId + "_count"));
        //            if (count != null) {
        //                if (parseInt(count.innerHTML) == 1) {
        //                    count.style.display = 'none';
        //                    count.innerHTML = (parseInt(count.innerHTML) - 1).toString();
        //                } else {
        //                    count.innerHTML = (parseInt(count.innerHTML) - 1).toString();
        //                }
        //            }
        //        }, 100)
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }

    CloseDeleteConfirm(event) {
        this.ConfirmDelete = event['closePopUpStatus'];
        if (event['delPostStatus']) {
            this._ref.destroy();
            this._message.setCommand(0, 'desc');
        }
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }

    hidePlaceHolder(event) {
        if (event.target.innerText == this._constantService.commentPlaceHolder) {
            event.target.innerText = "";
            var v = document.getElementById(event.target.id);
            v.classList.remove("placeholdercolor");
            v.classList.add("option_inputt", "setwdth");
            this.isCommentHit = false;
        }
        document.getElementById(event.target.id).focus();
    }

    showPlaceHolder() {
        var id = this.u_id + "_" + this.post_id + "_comm";
        var txt = document.getElementById(id);
        txt.innerHTML = txt.innerHTML.replace(this._constantService.junkText, "");
        if (txt.innerText.length == 0 || txt.innerText.length == 1) {
            txt.classList.add("placeholdercolor");
            txt.classList.remove("option_inputt", "setwdth");
            txt.innerText = this._constantService.commentPlaceHolder;
        }
    }

    singleQuesTypepostviewshow() {
        if (this.count < 1) {
            this.count += 1;
            this.getComment();
        } else {
            this.fullPostViewStatus = true;
        }
    }

    getComment() {
        var commentData = {};
        commentData['token'] = this._constantService.getSessionDataBYKey('token');
        commentData['token_param'] = {};
        commentData['token_param']['device_type'] = 'w';
        commentData['token_param']['host'] = '';
        commentData['pid'] = this.post_id;
        commentData['lscmid'] = this.lastCommentId;
        commentData['count'] = 10;
        commentData['flow'] = 'd';



        this._constantService.fetchDataApi(this._constantService.getCommentOnPostServiceUrl(), commentData).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                if (responseData.COMMENT_DATA.length < 10) {
                    this.commentPresent = false;
                } else {
                    this.commentPresent = true;
                }
                this.lastCommentId = responseData.COMMENT_DATA[responseData.COMMENT_DATA.length - 1].USER_COMMENT_ID;
                for (var i = 0; i < responseData.COMMENT_DATA.length; i++) {
                    //this._constantService.setCommentData(responseData.COMMENT_DATA[i]);
                    responseData.COMMENT_DATA[i].USER_POST_ID = this.post_id;
                    responseData.COMMENT_DATA[i].ADD_DATE_TIME = this.postdata.getPostDateTime(responseData.COMMENT_DATA[i].ADD_DATE_TIME);
                    this.factory = this.componentFactoryResolver.resolveComponentFactory(CommentComponent);
                    this.ref = this.container.createComponent(this.factory);
                    this.ref.instance.arr = responseData.COMMENT_DATA[i];
                    this.ref.instance._ref = this.ref;
                }
            } else if (status == this._constantService.error_token) {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });
    }


    putUserPostUnsaved() {
        var updatePostUnsaved = {};
        updatePostUnsaved['token'] = this._constantService.getSessionDataBYKey('token');
        updatePostUnsaved['token_param'] = {};
        updatePostUnsaved['token_param']['device_type'] = 'w';
        updatePostUnsaved['token_param']['host'] = '';
        updatePostUnsaved['sfldid'] = this.savedFolderId;
        updatePostUnsaved['pid'] = this.post_id;



        this._constantService.fetchDataApi(this._constantService.putUserPostUnsaved(), updatePostUnsaved).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this._constantService.showToast("Unsaved successfully", "Post", "1");

                this.saveCondition = false;

                var herf = this.router.url;
                var urlArr = herf.split("/");
                if (urlArr[1] == "saved") {
                    var count = document.getElementById(this.savedFolderId + "_count");
                    if (count != null) {
                        if (parseInt(count.innerHTML) == 1) {
                            count.style.display = 'none';
                            count.innerHTML = (parseInt(count.innerHTML) - 1).toString();
                        } else {
                            count.innerHTML = (parseInt(count.innerHTML) - 1).toString();
                        }
                    }
                    this._ref.destroy();
                }
                this._constantService.callEmptyStateMethod();
            } else if (status == this._constantService.error_token) {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }

        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });

    }
    impLikeShareFn() {
        this.userLikeShareList['postId'] = this.post_id;
        this.userLikeShareList['type'] = 1;
        this.userLikeShareList['count'] = this.like;
        this.impLikeShareStatus = !this.impLikeShareStatus;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }
    shareLikeShareFn() {
        this.userLikeShareList['postId'] = this.post_id;
        this.userLikeShareList['type'] = 2;
        this.userLikeShareList['count'] = this.share;
        this.shareLikeShareStatus = !this.shareLikeShareStatus;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }

    CloseViewAll($event) {
        this.impLikeShareStatus = false;
        this.shareLikeShareStatus = false;
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }

    enable() {

        this.enable_button = true;

    }

    autoFocus() {
        var id = this.u_id + '_' + this.post_id + '_comm';
        if ((<HTMLInputElement>document.getElementById(id)).innerText == this._constantService.commentPlaceHolder) {
            (<HTMLInputElement>document.getElementById(id)).innerText = '';
        }
        (<HTMLInputElement>document.getElementById(id)).focus();

    }

    postimageshow(event) {
        this.postimagediv = "2";
        this.picTyp = 0;
        this.oneViewPath = event.target.currentSrc;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }

    postImageHide(event) {
        this.postimagediv = event;
        //this.imagepostviewsec = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }

    getReachPost() {
        var postReach = {};
        postReach['token'] = this._constantService.getSessionDataBYKey('token');
        postReach['token_param'] = {};
        postReach['token_param']['device_type'] = 'w';
        postReach['token_param']['host'] = '';
        postReach['pid'] = this.post_id;


        this._constantService.fetchDataApi(this._constantService.getpostReachUrl(), postReach).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {

            } else if (status == this._constantService.error_token) {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });
    }

    showSolHint() {
        this.postSolHint = !this.postSolHint;
    }
}
