import { Component, ViewChild, OnInit, ComponentFactoryResolver, ViewContainerRef, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import { PostdataService } from './../../../services/postdata.service';
import { ConstantService } from './../../../services/constant.service';
import { Router } from '@angular/router';
import { EncryptionService } from './../../../services/encryption.service';
import { CommentComponent } from "./../commentView/comment.component";
import { InternalMessageService } from './../../../services/internal-message.service';
import { LocalDataService } from 'src/app/services/local-data.service';

@Component({
    selector: 'app-truefalsepost',
    templateUrl: './truefalsepost.component.html',
    // host: { "(document:click)": "handleClick($event)" },
    providers: [PostdataService, ConstantService],
    styleUrls: ['./truefalsepost.component.scss', './../textpost/allpost.scss']
})
export class TruefalsepostComponent implements OnInit {
    postPublicShareLink: string = '';
    postTimeString: string = '';
    totalResponse: any;
    isCommentHit: boolean = false;
    picTyp: number;
    commImageDimns = '';
    pg_id: any;
    solutionData: any = {};

    showIntArr: boolean = false;
    ltIntShow = [];
    NoImage: boolean = true;
    openConfirmation: boolean = false;
    vart: boolean = true;
    Text: boolean = true;
    timerOn: boolean = false;
    loader: boolean = false;
    c_data: string;
    @ViewChild('container', { read: ViewContainerRef }) container;
    @ViewChild('reportPopup', { read: ElementRef }) reportPopup: ElementRef;
    Preloader: boolean = false;
    showText: boolean = true;
    _ref: any;
    postmenu = false;
    saveCondition = false;
    importantCondition = false;
    savepagepopup = false;
    reportpopup = false;
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
    edittextpost = false;
    // savepagepopup:boolean = false;
    my_profile: boolean = false;
    other_profile: boolean = false;
    editquestionpost = false;
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
    questionAns;
    questionImg = "";
    option1 = "";
    option2 = "";
    hourDec: boolean = false;
    resultDeclared: boolean = false;
    questionTime = 0;
    hour = 0;
    min = 0;
    sec = 0;
    interestObj = {};
    responseStatus = 0;
    timeStatus = 0;
    instantResult: boolean = false;
    correctResponseCount = 0;
    incorrectResponseCount = 0;
    myResponse = [];
    myResponseStatus = 0;
    file_path = "";
    uuid = "";
    opt1RespCount = 0;
    opt2RespCount = 0;
    opt1Percentile = 0;
    opt2Percentile = 0;
    ConfirmDelete: boolean = false;
    dataConf = {};
    showpreloader: boolean = false;
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
    oneViewPath = '';
    altName = "";

    socialFbShareUrl: string;
    socialTeitterShareUrl: string;
    socialLinkedInShareUrl: string;
    socialTelegramUrl: string;
    socialWhatsappLink: string;

    isSharePostList: boolean = false;
    postSolHint: boolean;
    userProfilePic: any;
    constructor(
        public postdata: PostdataService,
        public _constantService: ConstantService,
        public _encrypt: EncryptionService,
        public router: Router,
        public componentFactoryResolver: ComponentFactoryResolver,
        private _message: InternalMessageService,
        public _localDataService:LocalDataService
    ) {
        //this.arr = this.postdata.getPostData();
        if (this.arr != null) {

        }
    }


    hideSocialList() {
        let id = this.u_id + '_' + this.post_id + '_tfShareList';
        if (document.getElementById(id)) {
            document.getElementById(id).style.display = "none";
            document.getElementById(id).style.top = "0px";
        }

        this.isSharePostList = false;
    }



    showSharePostList(event) {
        let id = this.u_id + '_' + this.post_id + '_tfShareList';
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

    follow() {
        if (this.followme == false) {
            this._constantService.followUnfollow(0, this.pg_uuid);
            this.followme = !this.followme;
            setTimeout(() => {
                this.hideBtn = true;
            }, 5000);
        }
    }


    unfollow() {
        if (this.followme == true) {
            this._constantService.followUnfollow(1, this.pg_uuid);
            this.followme = !this.followme;
            this.hideBtn = false;
        }
    }
    //     @HostListener('drop', ['$event']) blockDrop(e: MouseEvent) {
    //        e.preventDefault();
    //    }
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


        this.altName = "study24x7 " + this.arr['KEYWORDS'];
        this.correctAnswer = this.arr['ANSWER'].toString();
        this.post_key = this.arr['USER_ID'] + ':' + this.arr['USER_POST_ID'] + ':3';
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
            if (this.post_data.length > 301) {
                this.DataView = !this.DataView;
            }
        } else {
            this.post_data = '';
        }

        if (this.arr['TEXT_IMAGE'] != null && this.arr['TEXT_IMAGE'] != '') {
            this.questionImg = this.arr['TEXT_IMAGE'];
        } else { this.NoImage = false; }

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
        if (this.arr["SHARED_COUNT"] != 0) {
            this.share = parseInt(this.arr['SHARED_COUNT']);
        }
        this.comment = this.arr['COMMENT'];
        this.my_profile = this.arr['MY_PROFILE'];
        if (this.my_profile) {
            this.totalResponse = parseInt(this.arr['RESPONSE_COUNT']);
            this.opt1RespCount = this.arr['TOTAL_RESP_OPT1'];
            this.opt2RespCount = this.arr['TOTAL_RESP_OPT2'];
            if (this.totalResponse != 0) {
                if (this.opt1RespCount != 0) {
                    this.opt1Percentile = (Math.round(((this.opt1RespCount / this.totalResponse) * 100) * 100)) / 100;
                }
                if (this.opt2RespCount != 0) {
                    this.opt2Percentile = (Math.round(((this.opt2RespCount / this.totalResponse) * 100) * 100)) / 100;
                }
            }
        }
        this.latestComment = this.arr['LT_COMM_DATA'];

        //        this.other_profile = this.arr['OTHER_PROFILE'];
        this.post_id = this.arr['USER_POST_ID'];
        this.u_id = this.arr['USER_ID'];
        var option = this.arr['OPTIONS'];
        this.option1 = option[0]['TXT'];
        this.option2 = option[1]['TXT'];
        this.responseStatus = this.arr['RESPONSE_STATUS'];
        this.timeStatus = this.arr['TIME_STATUS'];
        this.questionAns = this.arr['ANSWER'];
        this.correctResponseCount = this.arr['CORRECT_RESPONSE_COUNT'];
        this.incorrectResponseCount = this.arr['INCORRECT_RESPONSE_COUNT'];
        if (this.arr['USER_RESPONSE'] != null) {
            this.myResponse = this.arr['USER_RESPONSE'];
        }
        this.editPostId = this.u_id + ":" + this.post_id + ":3";
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
            if (this.responseStatus == 0) {
                this.instantResult = true;
            } else {
                this.resultDeclared = true;
            }
        }
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

    ngAfterViewInit() {
        this.solutionData = {
            SOLUTION: this.arr.SOLUTION,
            SOL_MEDIA: this.arr.SOL_MEDIA,
            SOL_TYP: this.arr.SOL_TYP,
            UNIQUE_QUESTION_ID: this.arr.UNIQUE_QUESTION_ID

        }
        this.findInterestPos()
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
        if (this.post_data != null) {
            this.post_data = this.postdata.getQuestionTextToSave(this.post_id);
        }
        if (this.my_profile == false) {
            if (this.responseStatus == 1 && this.questionTime != 0 && this.resultDeclared == false) {
                var op1 = (<HTMLInputElement>document.getElementById(this.post_id + "_option1"));
                if (op1 != null) {
                    op1.disabled = true;
                }
                var op2 = (<HTMLInputElement>document.getElementById(this.post_id + "_option2"));
                if (op2 != null) {
                    op2.disabled = true;
                }
                //                (<HTMLButtonElement> document.getElementById(this.post_id + "_submit")).disabled = true;
                //    (<HTMLButtonElement> document.getElementById(this.post_id + "_submit")).innerText = "Submitted";
                if (this.myResponse[0] == "A") {
                    var op1 = (<HTMLInputElement>document.getElementById(this.post_id + "_option1"));
                    if (op1 != null) {
                        op1.checked = true;
                    }
                } else if (this.myResponse[0] == "B") {
                    var op2 = (<HTMLInputElement>document.getElementById(this.post_id + "_option2"));
                    if (op2 != null) {
                        op2.checked = true;
                    }
                }
            }
            if (this.resultDeclared) {
                if (this.questionAns[0] == "A") {
                    var op1 = (<HTMLInputElement>document.getElementById(this.post_id + "_opt1"));
                    if (op1 != null) {
                        op1.className += " rightanswer";
                    }
                } else if (this.questionAns[0] == "B") {
                    var op2 = (<HTMLInputElement>document.getElementById(this.post_id + "_opt2"));
                    if (op2 != null) {
                        op2.className += " rightanswer";
                    }
                }
                if (this.myResponse[0] == "A") {
                    if (this.myResponse[0] != this.questionAns[0]) {
                        var op1 = (<HTMLInputElement>document.getElementById(this.post_id + "_opt1"));
                        if (op1 != null) {
                            op1.className += " wronganswer";
                        }
                    }
                } else if (this.myResponse[0] == "B") {
                    if (this.myResponse[0] != this.questionAns[0]) {
                        var op2 = (<HTMLInputElement>document.getElementById(this.post_id + "_opt2"));
                        if (op2 != null) {
                            op2.className += " wronganswer";
                        }
                    }
                }
            }
        } else {
            if (this.questionAns[0] == "A") {
                var op1 = (<HTMLInputElement>document.getElementById(this.post_id + "_opt1"));
                if (op1 != null) {
                    op1.className += " rightanswer";
                }
            } else if (this.questionAns[0] == "B") {
                var op2 = (<HTMLInputElement>document.getElementById(this.post_id + "_opt2"));
                if (op2 != null) {
                    op2.className += " rightanswer";
                }
            }
        }

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
                    this._constantService.clearUserInfo();
                    this.router.navigate(['']);
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
    //
    //    reportpopuphide(){
    //        this.reportpopup = false;
    //    }
    closePopup(event) {
        if (event['error'] == false) {
            this.openConfirmation = false;
        }
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
                    if (this.totalResponse != 0) {
                        if (this.opt1RespCount != 0) {
                            this.opt1Percentile = (Math.round(((this.opt1RespCount / this.totalResponse) * 100) * 100)) / 100;
                        }
                        if (this.opt2RespCount != 0) {
                            this.opt2Percentile = (Math.round(((this.opt2RespCount / this.totalResponse) * 100) * 100)) / 100;
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
        this.Text = false;
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
            this.Text = true;
            //            alert("Please Select Any Response");
            return false;
        }


        this._constantService.fetchDataApi(this._constantService.putQuestionResponseServiceUrl(), response).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this._constantService.showToast("Your Response Saved Successfully", "", "1");              ////////////*********add by vijay*************//////////
                this._message.setCommand(0, 'desc');
                this.loader = false;
                this.Text = true;
                this.timerOn = true;
                if (this.instantResult) {
                    this.myResponse = arr;
                    this.resultDeclared = true;
                    setTimeout(this.changeView.bind(this), 10);
                } else {
                    this.loader = false;
                    this.Text = true;
                    (<HTMLInputElement>document.getElementById(this.post_id + "_option1")).disabled = true;
                    (<HTMLInputElement>document.getElementById(this.post_id + "_option2")).disabled = true;
                    (<HTMLButtonElement>document.getElementById(this.post_id + "_submit")).disabled = true;
                    //   (<HTMLButtonElement> document.getElementById(this.post_id + "_submit")).innerText = "Submitted";
                    (<HTMLButtonElement>document.getElementById(this.post_id + "_submit")).classList.remove('aselesctopetion');
                }
                this.myResponseStatus = responseData.RESPONSE_STATUS;
                this.responseStatus = 1;
                this.correctResponseCount = responseData.CORRECT_RESPONSE;
                this.incorrectResponseCount = responseData.INCORRECT_RESPONSE;
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);

            } else if (status == this._constantService.error_token) {
                this.loader = false;
                this.Text = true
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;
            } else {
                this.loader = false;
                this.Text = true
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
                //this.router.navigate(['500']);
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
        }
        if (this.myResponse[0] == "A") {
            if (this.myResponse[0] != this.questionAns[0]) {
                document.getElementById(this.post_id + "_opt1").className += " wronganswer";
            }
        } else if (this.myResponse[0] == "B") {
            if (this.myResponse[0] != this.questionAns[0]) {
                document.getElementById(this.post_id + "_opt2").className += " wronganswer";
            }
        }
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

    updateSourcePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }

    deletePostCnf() {
        this.ConfirmDelete = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }

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
        this.showpreloader = true;
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
                        this.showpreloader = false;
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
                        this.showCommentImg = 1;
                        this.comment_image = null;
                    }
                }, error => {
                    var responseData = error;
                    if (responseData.status == 500) {
                        this.router.navigate(['500']);
                    }
                });
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = "Unable to support the selected file";
                this.openConfirmation = true;
                this.showCommentImg = 1;
                this.comment_image = null;
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
            if (event.keyCode == 13 && !event.ctrlKey && !event.shiftKey) {

                this.c_data = this.postdata.postDataManipulation(event.target.id);
                if (this.c_data.length == 0 && this.comment_image == null) {
                    this.confirmText(this.c_data, event);
                    return false;
                }
            }

            this.hideSpan = 0;
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

            event.preventDefault();
            if (this.isCommentHit == true) {
                this._constantService.fetchDataApi(this._constantService.putCommentServiceUrl(), comment).subscribe(data => {
                    var responseData: any = data;
                    var status = responseData.STATUS;
                    if (status == this._constantService.success_msg) {
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
                        var count = (<HTMLElement>document.getElementById(this.post_id + '_comm_count'));
                        if (count != null) {
                            if (parseInt(count.innerHTML) == 0) {
                                count.style.display = "inline-block";
                            }
                            count.innerHTML = (parseInt(count.innerHTML) + 1).toString();
                        } else {
                            this.comment = 1;
                        }
                        this.factory = this.componentFactoryResolver.resolveComponentFactory(CommentComponent);
                        this.ref = this.container.createComponent(this.factory, 0);
                        this.ref.instance.arr = addComment;
                        this.ref.instance._ref = this.ref;
                        event.target.innerHTML = this._constantService.commentPlaceHolder;
                        event.target.classList.add("placeholdercolor");
                        event.target.classList.remove("option_inputt", "setwdth");
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

        } else if (event.keyCode == 13 && event.ctrlKey) {
            event.target.innerText = event.target.innerText + "\n";
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
            this.share = this.share + 1;
        }
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }

    DeletePostCnf() {
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

    updateProfilePic(event) {
        if (this.profile_pic_path == null) {
            event.target.src = this._constantService.defaultImgPath;
        }
    }
    showNotify() {
        this._constantService.showToast("Link has been Copied", "", "1");

    }
    showSolHint() {
        this.postSolHint = !this.postSolHint;
    }
}
