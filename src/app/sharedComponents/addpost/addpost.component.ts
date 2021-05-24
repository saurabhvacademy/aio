import { Component, OnInit, AfterViewInit, Output, Input, EventEmitter, ViewChild, ElementRef, HostListener, ViewContainerRef, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core';
import { ConstantService } from './../../services/constant.service';
import { Router } from '@angular/router';
import { EncryptionService } from './../../services/encryption.service';
import { PostdataService } from './../../services/postdata.service';
import { PostDetails } from './post.details';
import { ValueTransformer } from '@angular/compiler/src/util';
import { AddSolutionComponent } from './add-solution/add-solution.component';
import { EmitService } from './emit.service';
import { CookieService } from 'ngx-cookie-service';

//import $ = require("jquery");
declare var MQ: any;
declare var $: any;

@Component({
    selector: 'app-addpost',
    host: { '(document:click)': 'handleClick($event)' },
    templateUrl: './addpost.component.html',
    styleUrls: ['./addpost.component.scss', 'addpost.eqation.css', './newaddpost.component.scss'],
    providers: []
})
export class AddpostComponent implements OnInit, AfterViewInit {

    hideAddIntrest: boolean = false;
    data: any;

    enaleaddpostBtn: boolean = true;
    ShowSubmitBtn: boolean = false;
    @Output() hideScroll = new EventEmitter<boolean>();
    @Output() postId = new EventEmitter<string>();
    @Output() sessionLogout = new EventEmitter<boolean>();
    @Output() valueChange = new EventEmitter<boolean>();
    @Output() emitToQuestionForYou = new EventEmitter<boolean>();
    @Input() pageInterest: Array<number>;
    @Input() ltPgPostInt;
    @Input() pageId;
    @Input() rType = 0;
    @ViewChild('interest', { read: ElementRef }) interest: ElementRef;
    @ViewChild("focustime", { read: ElementRef }) focustime: ElementRef;
    @ViewChild("tymlable", { read: ElementRef }) tymlable: ElementRef;
    @ViewChild("tymlable1", { read: ElementRef }) tymlable1: ElementRef;
    @ViewChild('container', { read: ViewContainerRef }) container;

    //    @ViewChild('wallintlist', {read: ElementRef}) wallintlist: ElementRef;
    //    @ViewChild('wallprylist', {read: ElementRef}) wallprylist: ElementRef;
    @ViewChild('postinprylist', { read: ElementRef }) postinprylist: ElementRef;
    @ViewChild('visibility', { read: ElementRef }) visibility: ElementRef;
    @ViewChild('shadow', { read: ElementRef }) shadow: ElementRef;
    postshadow: any;
    isText = [];
    arrr = [];
    pgIntArr: any;
    val = 1;
    pageInt = false;
    pageTitle: any;
    pageData: any;
    user_type: any;
    disabledPostBtn: boolean = true;
    value: number = 1;
    postData: string;
    dell = 0;
    delll = 0;
    del = 0;
    pic3: string;
    pic2: string;
    pic: string;
    timer: any;
    hideScrollStatus = true;
    //    MQ = MathQuill.getInterface(2);
    imageUpload: any;
    showText: boolean = true;
    loader: boolean = false;
    showPreloader: boolean = false;
    divId = "";
    que_id = 1;
    opt_1 = 1;
    opt_2 = 1;
    opt_3 = 1;
    opt_4 = 1;
    opt_5 = 1;
    opt_6 = 1;
    last_id = "";
    showInterest: boolean = false;
    uuid = "";
    showOpt1 = 1;
    showOpt2 = 1;
    showOpt3 = 1;
    showOpt4 = 1;
    showOpt5 = 1;
    showOpt6 = 1;
    option_image1;
    option_image2;
    option_image3;
    option_image4;
    option_image5;
    option_image6;
    option_image1_url: string = "";
    option_image2_url: string = "";
    option_image3_url: string = "";
    option_image4_url: string = "";
    option_image5_url: string = "";
    option_image6_url: string = "";
    optionImgUpload1: boolean = false;
    optionImgUpload2: boolean = false;
    optionImgUpload3: boolean = false;
    optionImgUpload4: boolean = false;
    optionImgUpload5: boolean = false;
    optionImgUpload6: boolean = false;
    file_type;
    file_path = "";
    show_image_question = 1;
    image_upload_question_url = "";
    listMenuPost = false;
    questiontypeList = false;
    showglow = false;
    questionduration = false;
    stylepost = 'string';
    selectedposttab = 1;
    questionTypediv = 1;
    modelPost = new PostDetails();
    linkPresent: boolean = false;
    linkPreview = 1;
    linkImage = '';
    linkTitle = '';
    linkAttrTitle = "";
    linkDescription = '';
    linkAttrDesc = "";
    shareLink = '';
    show_image = 1;
    image_upload_url = "";
    ret = 0;
    file_upload;
    image_upload;
    user_interest = [];
    post_tags = [];
    t: string;
    questionBlock: boolean = true;
    show_placeholder = true;
    add_option = "";
    ret2: boolean = false;
    showEditor: boolean = false;
    attachmentPageCount = "";
    attachmentId = "";
    editortab = 1;
    addOption = 0;
    addOptionHide: boolean = true;
    timeselected: boolean = false;
    attmptHour = "";
    attmptMin = "";
    multipleResponseAns = [];
    quesAttmptTimeHour = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];
    quesAttmptTimeMin = ['00', '15', '30', '45'];
    openConfirmation = false;
    showHrDropList = false;
    showMinDropList = false;
    pholder = true;
    Minpholder = true;
    hh = "HH";
    mm = "MM";
    youtubeLinkPresent: boolean = false;
    youtubeLink = "";
    showOpt1Preloader: boolean = false;
    showOpt2Preloader: boolean = false;
    showOpt3Preloader: boolean = false;
    showOpt4Preloader: boolean = false;
    showOpt5Preloader: boolean = false;
    showOpt6Preloader: boolean = false;
    selectedQuestionType: string = `Question Type`;
    logout;
    vimeoLinkPresent: boolean = false;
    vimeoLink = "";
    videoId = "";
    caretOffset: number = 0;
    alertMsg = {};
    alert: boolean = false;
    herf = "";
    urlArr = [];
    intrst = '0';
    stopUpload: boolean = false;
    ans1S = false;
    ans2S = false;
    ans3S = false;
    ans4S = false;
    ans5S = false;
    ans6S = false;
    ans1M = false;
    ans2M = false;
    ans3M = false;
    ans4M = false;
    ans5M = false;
    ans6M = false;
    textValue: string = '';
    seemoreint: boolean = false;
    timePlaceholder: any = "HH:MM";
    walldropdown: boolean = false;
    shwwallshowInterest: boolean = false;
    question_timer: boolean = false;
    visibilityText = "Public";
    visibilityTyp = 3;
    visibilityimg = "public";
    shadowglow: boolean = false;
    active3: boolean = false;
    active4: boolean = false;
    active5: boolean = false;
    active6: boolean = false;
    called = 0;
    changelisui: boolean = false;
    morewallint: boolean = false;
    quesactive: boolean = false;
    postInnerText;
    imageSet = { 's_qst': '', 's_opt1': '', 's_opt2': '', 's_opt3': '', 's_opt4': '', 's_opt5': '', 's_opt6': '', 's_sol': '' };
    imagePostSize = '';
    values;
    textAreaPostDataElement: any;
    option_imagesol_url: any;
    optionImgUpload7: boolean;
    qstnSolUrl: any;
    solType = 0;
    pdfOriginalname: any;
    solText: any;
    factory: any;
    ref: any;
    subscription: any;
    textSubscription: any;
    removeUpldImg: any;
    coverAll: boolean;
    dataDiv: HTMLElement;
    constructor(
        public _constantService: ConstantService,
        public _encryptionServices: EncryptionService,
        public _router: Router,
        public post_data: PostdataService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private emitService: EmitService,
        public _cookie: CookieService,
        private changeDetecotor: ChangeDetectorRef
    ) {
        this.subscription = emitService.emmiter.subscribe($event => {
            this.addOptionImg($event, 7);
        })
        this.textSubscription = emitService.textEmmiter.subscribe($event => {
            this.solutiontext($event);
        })
        this.removeUpldImg = emitService.removeImage.subscribe($event => {
            this.uuidCheck($event);
        })
    }

    ngOnInit() {
        if (!this._cookie.get('study247')) {
            // this._cookie.set('study247', this._encryptionServices.encrypt(this._constantService.getSessionDataBYKey('token')));
            document.cookie = "study247=aio";

        }
        if (this.rType == 3) {
            this.addposttab(3);
        }
        this.pic = "public";
        this.visibilityimg = "Public";
        if (this.show_placeholder == true) {
            this.disabledPostBtn = true;
        }
        this.t = this._constantService.getSessionDataBYKey('token');
        if (this.t != '' && this.t != 'undefined' && this.t != null) {
            this.getUserInterest();
        } else {
            this._router.navigate(['']);
        }
        this.herf = this._router.url;
        this.urlArr = this.herf.split("/");
    }

    ngAfterViewInit() {
        this.textAreaPostDataElement = <HTMLTextAreaElement>document.getElementById('postData')

        if (this.pageInterest != undefined) {
            var userInterest = this.user_interest;
            this.user_interest = [];
            for (var i = 0; i < this.pageInterest.length; i++) {
                var index = userInterest.findIndex(x => x.INTEREST_ID == this.pageInterest[i]);
                if (index != -1) {
                    this.user_interest.push(userInterest[index]);
                }
            }
        }

    }

    ngDoCheck() {
        if (this.ltPgPostInt != undefined && this.ltPgPostInt != null && this.called == 0) {
            //this.latestPostInterest();
            this.called = 1;
        }
        if (this.ans2S == false && this.ans2M == false) {
            var div3 = document.getElementById('opt3_text');
            if (div3 != null && this.option_image3_url == '' && (div3.innerText.trim().length < 2 || div3.innerText.trim() == '\n')) {
                div3.contentEditable = "false";
                this.active3 = false;
                this.ans3S = false;
                this.ans3M = false;
            }
        }
        if (this.ans3S == false && this.ans3M == false) {
            var div4 = document.getElementById('opt4_text');
            if (div4 != null && this.option_image4_url == '' && (div4.innerText.trim().length < 2 || div4.innerText.trim() == '\n')) {
                div4.contentEditable = "false";
                this.active4 = false;
                this.ans4S = false;
                this.ans4M = false;
            }
        }
        if (this.ans4S == false && this.ans4M == false) {
            var div5 = document.getElementById('opt5_text');
            if (div5 != null && this.option_image5_url == '' && (div5.innerText.trim().length < 2 || div5.innerText.trim() == '\n')) {
                div5.contentEditable = "false";
                this.active5 = false;
                this.ans5S = false;
                this.ans5M = false;
            }
        }
        if (this.ans5S == false && this.ans5M == false) {
            var div6 = document.getElementById('opt6_text');
            if (div6 != null && this.option_image6_url == '' && (div6.innerText.trim().length < 2 || div6.innerText.trim() == '\n')) {
                div6.contentEditable = "false";
                this.active6 = false;
                this.ans6S = false;
                this.ans6M = false;
            }
        }

    }



    glowup() {
        this.questionTypediv = 1;
        this.stylepost = 'position: relative';
        this.show_placeholder = false;
        this.showglow = true;
        setTimeout(() => {
            if (this.selectedposttab == 1) {
                (<HTMLElement>document.getElementById('postData')).focus();
            }

        }, 100);
        this.hideScrollStatus = true;
        this.hideScroll.emit(this.hideScrollStatus);
        if (this._router.url.split('/')[1] != 'page') {
            setTimeout(() => {
                this.latestPostInterest()
                if (this.user_interest.length == 1) {
                    this.addTags(this.user_interest[0].INTEREST_ID, this.user_interest[0].INTEREST_NAME);
                }
            }, 100);
        } else {
            setTimeout(() => {
                this.latestPostInterest();
            }, 100);
        }


    }


    glowhide() {
        this.seemoreint = false;
        this.questionTypediv = 1;
        this.showEditor = false;
        this.showglow = false;
        this.selectedposttab = 1;
        this.post_tags = [];
        this.show_image = 1;
        this.linkPresent = false;
        this.file_upload = null;
        this.hideScrollStatus = false;
        this.uuid = "";
        this.showOpt1 = 1;
        this.showOpt2 = 1;
        this.showOpt3 = 1;
        this.showOpt4 = 1;
        this.showOpt5 = 1;
        this.showOpt6 = 1;
        this.ans1S = false;
        this.ans2S = false;
        this.ans3S = false;
        this.ans4S = false;
        this.ans5S = false;
        this.ans6S = false;
        this.ans1M = false;
        this.ans2M = false;
        this.ans3M = false;
        this.ans4M = false;
        this.ans5M = false;
        this.ans6M = false;
        this.show_image_question = 1;
        this.questionBlock = true;
        this.show_placeholder = true;
        this.hideScroll.emit(this.hideScrollStatus);
        this.attmptHour = ``;
        this.attmptMin = ``;
        this.selectedQuestionType = `Multiple choice`;
        this.hh = "HH";
        this.mm = "MM";
        this.linkPresent = false;
        this.ret = 0;
        this.linkImage = "";
        this.linkTitle = "";
        this.linkAttrTitle = "";
        this.linkDescription = "";
        this.linkAttrDesc = "";
        this.youtubeLinkPresent = false;
        this.vimeoLinkPresent = false;
        this.file_upload = null;
        this.image_upload = null;
        setTimeout(() => {
            this.latestPostInterest();
        }, 100);
        this.emitToQuestionForYou.emit(false);
    }

    activeChoice(event) {
        if (event.target.id == 'opt1_text') {
            if (event.target.innerText.trim() != '\n' && event.target.innerText.trim().length != 0) {
                this.ans1S = true;
            } else if (this.option_image1_url == '') {
                this.ans1S = false;
                (<HTMLInputElement>document.getElementById('adoption1')).checked = false;
            }

        }
        if (event.target.id == 'opt2_text') {
            if (event.target.innerText.trim() != '\n' && event.target.innerText.trim().length != 0) {
                this.ans2S = true;
                this.active3 = true;
                var div3 = document.getElementById('opt3_text');
                if (div3 != null) {
                    div3.contentEditable = "true";
                }
            } else if (this.option_image2_url == '') {
                this.ans2S = false;
                (<HTMLInputElement>document.getElementById('adoption2')).checked = false;
            }
        }
        if (event.target.id == 'opt3_text') {
            if (event.target.innerText.trim() != '\n' && event.target.innerText.trim().length != 0) {
                this.ans3S = true;
                this.active4 = true;
                var div4 = document.getElementById('opt4_text');
                if (div4 != null) {
                    div4.contentEditable = "true";
                }
            } else if (this.option_image3_url == '') {
                this.ans3S = false;
                (<HTMLInputElement>document.getElementById('adoption3')).checked = false;
            }

        }
        if (event.target.id == 'opt4_text') {
            if (event.target.innerText.trim() != '\n' && event.target.innerText.trim().length != 0) {
                this.ans4S = true;
                this.active5 = true;
                var div5 = document.getElementById('opt5_text');
                if (div5 != null) {
                    div5.contentEditable = "true";
                }
            } else if (this.option_image4_url == '') {
                this.ans4S = false;
                (<HTMLInputElement>document.getElementById('adoption4')).checked = false;
            }

        }
        if (event.target.id == 'opt5_text') {
            if (event.target.innerText.trim() != '\n' && event.target.innerText.trim().length != 0) {
                this.ans5S = true;
                this.active6 = true;
                var div6 = document.getElementById('opt6_text');
                if (div6 != null) {
                    div6.contentEditable = "true";
                }
            } else if (this.option_image5_url == '') {
                this.ans5S = false;
                (<HTMLInputElement>document.getElementById('adoption5')).checked = false;
            }

        }
        if (event.target.id == 'opt6_text') {
            if (event.target.innerText.trim() != '\n' && event.target.innerText.trim().length != 0) {
                this.ans6S = true;
            } else if (this.option_image6_url == '') {
                this.ans6S = false;
                (<HTMLInputElement>document.getElementById('adoption6')).checked = false;
            }

        }
    }

    activeChoiceM(event) {
        if (event.target.id == 'opt1_text') {
            if (event.target.innerText.trim() != '\n' && event.target.innerText.trim().length != 0) {
                this.ans1M = true;
            } else if (this.option_image1_url == '') {
                this.ans1M = false;
                (<HTMLInputElement>document.getElementById('adoption1')).checked = false;
                this.removeSelIOption((<HTMLInputElement>document.getElementById('adoption1')).value);
            }

        }
        if (event.target.id == 'opt2_text') {
            if (event.target.innerText.trim() != '\n' && event.target.innerText.trim().length != 0) {
                this.ans2M = true;
                this.active3 = true;
                var div3 = document.getElementById('opt3_text');
                if (div3 != null) {
                    div3.contentEditable = "true";
                }
            } else if (this.option_image2_url == '') {
                this.ans2M = false;
                (<HTMLInputElement>document.getElementById('adoption2')).checked = false;
                this.removeSelIOption((<HTMLInputElement>document.getElementById('adoption2')).value);
            }

        }
        if (event.target.id == 'opt3_text') {
            if (event.target.innerText.trim() != '\n' && event.target.innerText.trim().length != 0) {
                this.ans3M = true;
                this.active4 = true;
                var div4 = document.getElementById('opt4_text');
                if (div4 != null) {
                    div4.contentEditable = "true";
                }
            } else if (this.option_image3_url == '') {
                this.ans3M = false;
                (<HTMLInputElement>document.getElementById('adoption3')).checked = false;
                this.removeSelIOption((<HTMLInputElement>document.getElementById('adoption3')).value);
            }

        }
        if (event.target.id == 'opt4_text') {
            if (event.target.innerText.trim() != '\n' && event.target.innerText.trim().length != 0 && event.key != " ") {
                this.ans4M = true;
                this.active5 = true;
                var div5 = document.getElementById('opt5_text');
                if (div5 != null) {
                    div5.contentEditable = "true";
                }
            } else if (this.option_image4_url == '') {
                this.ans4M = false;
                (<HTMLInputElement>document.getElementById('adoption4')).checked = false;
                this.removeSelIOption((<HTMLInputElement>document.getElementById('adoption4')).value);
            }

        }
        if (event.target.id == 'opt5_text') {
            if (event.target.innerText.trim() != '\n' && event.target.innerText.trim().length != 0) {
                this.ans5M = true;
                this.active6 = true;
                var div6 = document.getElementById('opt6_text');
                if (div6 != null) {
                    div6.contentEditable = "true";
                }
            } else if (this.option_image5_url == '') {
                this.ans5M = false;
                (<HTMLInputElement>document.getElementById('adoption5')).checked = false;
                this.removeSelIOption((<HTMLInputElement>document.getElementById('adoption5')).value);
            }

        }
        if (event.target.id == 'opt6_text') {
            if (event.target.innerText.trim() != '\n' && event.target.innerText.trim().length != 0) {
                this.ans6M = true;
            } else if (this.option_image6_url == '') {
                this.ans6M = false;
                (<HTMLInputElement>document.getElementById('adoption6')).checked = false;
                this.removeSelIOption((<HTMLInputElement>document.getElementById('adoption6')).value);
            }
        }
    }


    uuidCheck(event) {
        this.stopUpload = false;
        if (event.target.id == 'image1') {
            this.option_image1_url = '';
            this.imageSet['s_opt1'] = '';
            if ((<HTMLInputElement>document.getElementById('opt1_text')).innerText.trim().length == 1) {
                this.ans1S = false;
                this.ans1M = false;
                (<HTMLInputElement>document.getElementById('adoption1')).checked = false;
            }
        } else
            if (event.target.id == 'image2') {
                this.option_image2_url = '';
                this.imageSet['s_opt2'] = '';
                if ((<HTMLInputElement>document.getElementById('opt2_text')).innerText.trim().length == 1) {
                    this.ans2S = false;
                    this.ans2M = false;
                    (<HTMLInputElement>document.getElementById('adoption2')).checked = false;
                }
            } else
                if (event.target.id == 'image3') {
                    this.option_image3_url = '';
                    this.imageSet['s_opt3'] = '';
                    if ((<HTMLInputElement>document.getElementById('opt3_text')).innerText.trim().length == 1) {
                        this.ans3S = false;
                        this.ans3M = false;
                        (<HTMLInputElement>document.getElementById('adoption3')).checked = false;
                    }
                } else
                    if (event.target.id == 'image4') {
                        this.option_image4_url = '';
                        this.imageSet['s_opt4'] = '';
                        if ((<HTMLInputElement>document.getElementById('opt4_text')).innerText.trim().length == 1) {
                            this.ans4S = false;
                            this.ans4M = false;
                            (<HTMLInputElement>document.getElementById('adoption4')).checked = false;
                        }
                    } else
                        if (event.target.id == 'image5') {
                            this.option_image5_url = '';
                            this.imageSet['s_opt5'] = '';
                            if ((<HTMLInputElement>document.getElementById('opt5_text')).innerText.trim().length == 1) {
                                this.ans5S = false;
                                this.ans5M = false;
                                (<HTMLInputElement>document.getElementById('adoption5')).checked = false;
                            }
                        } else
                            if (event.target.id == 'image6') {
                                this.option_image6_url = '';
                                this.imageSet['s_opt6'] = '';
                                if ((<HTMLInputElement>document.getElementById('opt6_text')).innerText.trim().length == 1) {
                                    this.ans6S = false;
                                    this.ans6M = false;
                                    (<HTMLInputElement>document.getElementById('adoption6')).checked = false;
                                }
                            } else
                                if (event.target.id == 'quesImage') {
                                    this.image_upload_question_url = '';
                                    this.imageSet['s_qst'] = '';
                                }
                                else
                                    if (event.target.id == 'solattch') {
                                        this.emitService.imageUploadUrl();
                                        this.imageSet['s_sol'] = '';
                                        this.solType = 0;
                                        this.qstnSolUrl = '';
                                        this.pdfOriginalname = '';
                                    }


        if (this.image_upload_question_url == '' && this.option_image1_url == '' && this.option_image2_url == '') {
            if (this.option_image3_url == '' && this.option_image4_url == '' && this.option_image5_url == '' && this.option_image6_url == '') {
                this.uuid = '';
            }
        }

        (<HTMLInputElement>document.getElementById('fileupload')).value = '';










    }


    addposttab(index, typ = 0) {

        if (index == 3) {
            this.seemoreint = false;
            this.selectedposttab = index;
            this.post_tags = [];
            this.glowup();
            this.showglow = true;
            let body = document.getElementsByTagName('body')[0];
            body.classList.add("body-overflow");
        }
        this.seemoreint = false;
        this.selectedposttab = index;
        this.post_tags = [];
        this.showglow = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
        setTimeout(() => {
            this.factory = this.componentFactoryResolver.resolveComponentFactory(AddSolutionComponent);

            this.ref = this.container.createComponent(this.factory);
            this.ref.instance._ref = this.ref;

        })
    }

    questionTypebutton(index, questionType) {
        this.changelisui = false;
        this.selectedQuestionType = questionType;
        this.questiontypeList = false;


        if (this.questionTypediv != index) {
            this.questionTypediv = index;
            this.showOpt1 = 1;
            this.showOpt2 = 1;
            this.showOpt3 = 1;
            this.showOpt4 = 1;
            this.showOpt5 = 1;
            this.showOpt6 = 1;
            this.ans3S = false;
            this.ans4S = false;
            this.ans5S = false;
            this.ans6S = false;
            this.ans3M = false;
            this.ans4M = false;
            this.ans5M = false;
            this.ans6M = false;
            this.active3 = false;
            this.active4 = false;
            this.active5 = false;
            this.active6 = false;
            this.option_image1_url = "";
            this.option_image2_url = "";
            this.option_image3_url = "";
            this.option_image4_url = "";
            this.option_image5_url = "";
            this.option_image6_url = "";
            this.addOption = 0;
            this.addOptionHide = true;
            switch (index) {
                case 0: {
                    this.hh = "HH";
                    this.mm = "MM";
                    this.timeselected = false;
                    this.attmptHour = '';
                    this.attmptMin = '';
                    break;
                }
                case 1: {
                    this.hh = "HH";
                    this.mm = "MM";
                    this.timeselected = false
                    this.attmptHour = '';
                    this.attmptMin = '';
                    break;
                }
                case 2: {
                    this.hh = "HH";
                    this.mm = "MM";
                    this.timeselected = false
                    this.attmptHour = '';
                    this.attmptMin = '';
                    break;
                }
                case 3: {
                    this.hh = "HH";
                    this.mm = "MM";
                    this.timeselected = false;
                    this.attmptHour = '';
                    this.attmptMin = '';
                    break;
                }
                default: {
                    this.timeselected = false;
                    this.attmptHour = '';
                    this.attmptMin = '';
                    break;
                }
            }

            setTimeout(() => {
                this.ref = undefined;
                this.factory = this.componentFactoryResolver.resolveComponentFactory(AddSolutionComponent);
                if (this.container) {
                    this.ref = this.container.createComponent(this.factory);
                    this.ref.instance._ref = this.ref;
                }

            })
        }

    }


    latestPostInterest() {
        var x;
        //if (typ != 0) {console.log("if ",this.ltPgPostInt);
        //  x = this.ltPgPostInt;
        //  } else {console.log("else ",this.ltPgPostInt);
        x = this._constantService.getLtPostInterest();
        if (x != null && x != undefined) {
            x = x.split(',');
        } else {
            return;
        }
        // }
        var preInt = [];
        if (x != null) {
            for (var j = 0; j < x.length; j++) {
                preInt.push(parseInt(x[j]));
            }
        }
        for (var l = 0; l < this.user_interest.length; l++) {
            if (!preInt.includes(this.user_interest[l])) {
                this.user_interest[l].STATUS = true;
            }
        }
        if (preInt.length != 0) {
            for (var k = 0; k < preInt.length; k++) {
                var id = this.user_interest.findIndex(x => x.INTEREST_ID == preInt[k]);
                if (this.user_interest[id] != undefined) {
                    this.addTags(this.user_interest[id].INTEREST_ID, this.user_interest[id].INTEREST_NAME);
                }
            }
        }

    }


    removeShareLink() {
        this.ret = 0;
        this.linkPresent = false;
        this.linkPreview = 1;
        this.linkImage = "";
        this.linkTitle = "";
        this.linkAttrTitle = "";
        this.linkDescription = "";
        this.linkAttrDesc = "";
        this.youtubeLinkPresent = false;
        this.vimeoLinkPresent = false;
    }

    addMoreOption() {
        this.del = 1;
        this.addOption += 1;
        this.dell = 1;
        var opt4 = document.getElementById('opt4_text');
        if (opt4 != null && (this.ans4S || this.ans4M) && opt4.innerText.trim().length != 0 && opt4.innerText.trim() != '\n') {
            setTimeout(() => {
                var div5 = document.getElementById('opt5_text');
                if (div5 != null) {
                    this.active5 = true;
                    div5.contentEditable = "true";
                }
            }, 100);
        }
        var opt5 = document.getElementById('opt5_text');
        if (opt5 != null && (this.ans5S || this.ans5M) && opt5.innerText.trim().length != 0 && opt5.innerText.trim() != '\n') {
            setTimeout(() => {
                var div6 = document.getElementById('opt6_text');
                if (div6 != null) {
                    this.active5 = true;
                    div6.contentEditable = "true";
                }
            }, 100);
        }
        if (this.addOption == 2) {
            this.dell = 2;
            this.delll = 1;
            this.addOptionHide = false;
        }
    }

    removeOption(event) {
        this.addOption -= 1;
        this.addOptionHide = true;
        if (event.target.id == 'del5') {
            this.del = 0;
            this.option_image5 = "";
            this.option_image5_url = '';
            this.optionImgUpload5 = false;
            this.showOpt5 = 1;
            this.ans5S = false;
            this.ans5M = false;
        } else {
            this.dell = 1;
            this.del = 1;
            this.option_image6 = "";
            this.option_image6_url = '';
            this.optionImgUpload6 = false;
            this.showOpt6 = 1;
            this.ans6S = false;
            this.ans6M = false;
        }

    }


    removeImg(event) {
        this.show_image = 1;
        this.imagePostSize = '';
        this.image_upload_url = '';
        this.file_upload = null;
        this.image_upload = null;
        this.attachmentId = "";
        this.check(event);
        this.check({});
        (<HTMLInputElement>document.getElementById('fileupload')).value = '';



    }

    change_optionImg(id) {
        var optid = 'option' + id + 'image';
        (<HTMLInputElement>document.getElementById(optid)).click();
    }

    change_image_question() {
        (<HTMLInputElement>document.getElementById('questionimage')).click();
    }

    change_image() {
        if (this.file_upload == null) {
            (<HTMLInputElement>document.getElementById('statusimage')).click();
        } else {
            (<HTMLInputElement>document.getElementById('fileupload')).click();
        }

    }

    showtags() {

        var found = this.user_interest.some(function (el) {
            return el.STATUS === true;
        });
        if (found) {
            this.showInterest = !this.showInterest;
            this.seemoreint = false;
        }


    }

    closeInterest() {
        (<HTMLElement>document.getElementById('interest_tags')).style.display = "none";
        this.showInterest = false;
    }

    showQuestionTextArea() {
        this.questionBlock = false;
        setTimeout(function () { (<HTMLElement>document.getElementById('q_text')).focus() }, 400);

    }

    postlist() {
        this.listMenuPost = !this.listMenuPost;
    }
    questiontype() {
        this.questiontypeList = !this.questiontypeList;
        this.changelisui = !this.changelisui;
    }
    hidequestypelst() {
        this.questiontypeList = false
        this.changelisui = false;
    }
    duration() {
        this.questionduration = !this.questionduration;
        this.timeselected = true;
    }

    checkboxupdate(event) {
        if (event.target.checked) {
            this.multipleResponseAns.push(event.target.value);
        } else if (!event.target.checked) {
            var index = this.multipleResponseAns.indexOf(event.target.value);
            this.multipleResponseAns.splice(index, 1);
        }
    }

    addTags(tag_id, tag_name) {
        if (this.post_tags && this.post_tags.indexOf(tag_id) == -1) {

            this.post_tags.push(tag_id);
            var tagText = tag_name + '<img src="assets/images/svg/tagcross.svg" id="remove_' + tag_id + '">';
            var tag = document.createElement('span');
            tag.id = "tag_" + tag_id;
            tag.className = 'tags remTag';
            tag.innerHTML = tagText;
            var tags = document.getElementById('posttags');
            if (tags != null && tags != undefined) {
                tags.insertBefore(tag, tags.childNodes[0]);
                var tag_dom = document.getElementById("remove_" + tag_id);
                var post_tagArr = this.post_tags;
                tag_dom.addEventListener('click', () => {
                    tags.removeChild(tag);
                    var index = post_tagArr.indexOf(tag_id);
                    var remid = this.user_interest.findIndex(x => x.INTEREST_ID == tag_id);
                    post_tagArr.splice(index, 1);
                    this.user_interest[remid].STATUS = true;
                    if (this.post_tags.length < 3) {
                        this.hideAddIntrest = false;
                    }
                });
            }
            this.post_tags = post_tagArr;
            var id = this.user_interest.findIndex(x => x.INTEREST_ID == tag_id);
            this.user_interest[id].STATUS = false;
        }
        this.showInterest = false;
        if (this.post_tags && this.post_tags.length >= 3) {
            this.hideAddIntrest = true;
        }
    }

    addOptionImg(event: any, id) {
        this.loader = true;
        this.stopUpload = true;
        this.image_upload = event.target.files[0];
        let type = this.image_upload.name;
        var reader = new FileReader();
        var typearr = type.split(".");
        var size = Math.round(this.image_upload.size / 1000 / 1000);
        if (size <= 10) {
            if (this.image_upload.name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
                //            reader.onload = (event:any) => {
                var upload = {};
                upload['token'] = this._constantService.getSessionDataBYKey('token');
                upload['token_param'] = {};
                upload['token_param']['device_type'] = "w";
                upload['token_param']['host'] = "";
                var data = JSON.stringify(upload);
                var encData = this._encryptionServices.encrypt(data);
                let formData = new FormData();
                formData.append("file", this.image_upload);
                if (this.uuid == "") {
                    formData.append("uuid", '0');
                } else {
                    formData.append("uuid", this.uuid);
                }

                formData.append("token", encData);
                formData.append("type", "3");
                if (id == 1) {
                    this.optionImgUpload1 = true;
                    this.showOpt1Preloader = true;
                    this.showOpt1 = 2;
                    this.ans1S = true;
                    this.ans1M = true;
                    formData.append("opttyp", 'opt1');
                } else if (id == 2) {
                    this.optionImgUpload2 = true;
                    this.showOpt2Preloader = true;
                    this.showOpt2 = 2;
                    this.ans2S = true;
                    this.ans2M = true;
                    this.active3 = true;
                    var div3 = document.getElementById('opt3_text');
                    if (div3 != null) {
                        div3.contentEditable = "true";
                    }
                    formData.append("opttyp", 'opt2');
                }
                else if (id == 3) {
                    this.optionImgUpload3 = true;
                    this.showOpt3Preloader = true;
                    this.showOpt3 = 2;
                    this.ans3S = true;
                    this.ans3M = true;
                    this.active4 = true;
                    var div4 = document.getElementById('opt4_text');
                    if (div4 != null) {
                        div4.contentEditable = "true";
                    }
                    formData.append("opttyp", 'opt3');
                }
                else if (id == 4) {
                    this.optionImgUpload4 = true;
                    this.showOpt4Preloader = true;
                    this.showOpt4 = 2;
                    this.ans4S = true;
                    this.ans4M = true;
                    this.active5 = true;
                    var div5 = document.getElementById('opt5_text');
                    if (div5 != null) {
                        div5.contentEditable = "true";
                    }
                    formData.append("opttyp", 'opt4');
                }
                else if (id == 5) {
                    this.optionImgUpload5 = true;
                    this.showOpt5Preloader = true;
                    this.showOpt5 = 2;
                    this.ans5S = true;
                    this.ans5M = true;
                    this.active6 = true;
                    var div6 = document.getElementById('opt6_text');
                    if (div6 != null) {
                        div6.contentEditable = "true";
                    }
                    formData.append("opttyp", 'opt5');
                } else if (id == 6) {
                    this.optionImgUpload6 = true;
                    this.showOpt6Preloader = true;
                    this.showOpt6 = 2;
                    this.ans6S = true;
                    this.ans6M = true;
                    formData.append("opttyp", 'opt6');
                } else if (id == 7) {
                    this.optionImgUpload7 = true;
                    formData.append("opttyp", 'sol');
                    this.ref.instance.uploading = true;
                    this.ref.instance.uploaded = true;
                }


                var x = (<HTMLInputElement>document.getElementById('addPost'));
                if (x != null && x != undefined) {
                    x.classList.add("desablebutton");
                }

                this._constantService.uploadFileApi(this._constantService.getUploadFileServiceUrl(), formData).subscribe(data => {
                    var responseData: any = data;
                    var status = responseData.STATUS;
                    this.loader = false;
                    x.classList.remove("desablebutton");
                    if (status == this._constantService.success_msg) {
                        this.showPreloader = false;
                        this.showText = true;
                        this.stopUpload = false;
                        var date = new Date();
                        this.uuid = responseData.UUID;
                        var currentTime = new Date().getTime();
                        if (id == 1) {
                            this.optionImgUpload1 = false;
                            this.showOpt1Preloader = false;
                            this.option_image1_url = responseData.FPATH + 'img/' + this.uuid + "/opt1.png?v=" + currentTime;
                            this.imageSet['s_opt1'] = responseData.DIMENSION;
                        } else if (id == 2) {
                            this.showText = true;
                            this.optionImgUpload2 = false;
                            this.showOpt2Preloader = false;
                            this.option_image2_url = responseData.FPATH + 'img/' + this.uuid + "/opt2.png?v=" + currentTime;
                            this.imageSet['s_opt2'] = responseData.DIMENSION;
                        } else if (id == 3) {
                            this.showText = true;
                            this.optionImgUpload3 = false;
                            this.showOpt3Preloader = false;
                            this.option_image3_url = responseData.FPATH + 'img/' + this.uuid + "/opt3.png?v=" + currentTime;
                            this.imageSet['s_opt3'] = responseData.DIMENSION;
                        } else if (id == 4) {
                            this.showText = true;
                            this.optionImgUpload4 = false;
                            this.showOpt4Preloader = false;
                            this.option_image4_url = responseData.FPATH + 'img/' + this.uuid + "/opt4.png?v=" + currentTime;
                            this.imageSet['s_opt4'] = responseData.DIMENSION;
                        } else if (id == 5) {
                            this.showText = true;
                            this.showOpt5Preloader = false;
                            this.optionImgUpload5 = false;
                            this.option_image5_url = responseData.FPATH + 'img/' + this.uuid + "/opt5.png?v=" + currentTime;
                            this.imageSet['s_opt5'] = responseData.DIMENSION;
                        } else if (id == 6) {
                            this.showText = true;
                            this.optionImgUpload6 = false;
                            this.showOpt6Preloader = false;
                            this.option_image6_url = responseData.FPATH + 'img/' + this.uuid + "/opt6.png?v=" + currentTime;
                            this.imageSet['s_opt6'] = responseData.DIMENSION;
                        } else if (id == 7) {
                            this.optionImgUpload7 = false;
                            this.option_imagesol_url = responseData.FPATH + '/sol.png';
                            this.ref.instance.imageUploadUrl = this.option_imagesol_url;
                            this.imageSet['s_sol'] = responseData.DIMENSION;
                            this.qstnSolUrl = responseData.FPATH;
                            this.solType = 2;

                        }
                        else {
                            this.showPreloader = false;
                            this.stopUpload = false;
                            if (id == 1) {
                                this.showText = true;
                                this.showOpt1Preloader = false;
                                this.showOpt1 = 1;
                            } else if (id == 2) {
                                this.showText = true;
                                this.showOpt2Preloader = false;
                                this.showOpt2 = 1;
                            } else if (id == 3) {
                                this.showText = true;
                                this.showOpt3Preloader = false;
                                this.showOpt3 = 1;
                            } else if (id == 4) {
                                this.showText = true;
                                this.showOpt4Preloader = false;
                                this.showOpt4 = 1;
                            } else if (id == 5) {
                                this.showText = true;
                                this.showOpt5Preloader = false;
                                this.showOpt5 = 1;
                            } else if (id == 6) {
                                this.showText = true;
                                this.showOpt6Preloader = false;
                                this.showOpt6 = 1;
                            }
                        }
                        this.ref.instance.uploading = false;


                        //this._constantService.setToken(responseData.TOKEN);
                        this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                        (<HTMLInputElement>document.getElementById('option' + id + 'image')).value = '';
                    } else if (status == this._constantService.error_token) {
                        this.stopUpload = false;
                        this.sessionLogout.emit(true);
                        this.showPreloader = false;
                        this.ref.instance.uploading = false;



                    } else {
                        this.alertMsg['msg'] = responseData.ERROR;
                        this.alertMsg['type'] = 2;
                        this.alertMsg['error_msg'] = responseData.ERROR_MSG;
                        this.alert = true;
                        this.ref.instance.uploading = false;


                        return false;
                    }
                }, error => {
                    var responseData = error;
                    if (responseData.status == 500) {
                        this._router.navigate(['500']);
                    }
                });



            } else if (this.image_upload.name.match(/\.(pdf|PDF|ppt|PPT|)$/) && id == 7) {
                this.ref.instance.uploaded = true;
                this.ref.instance.uploading = true;
                this.file_type = 4;
                this.optionImgUpload7 = true;
                var filetype = typearr[typearr.length - 1];
                this.option_imagesol_url = "assets/images/svg/" + filetype.toLowerCase() + ".svg";
                let file: File = this.image_upload;
                var upload = {};
                upload['token'] = this._constantService.getSessionDataBYKey('token');
                upload['token_param'] = {};
                upload['token_param']['device_type'] = "w";
                upload['token_param']['host'] = "";
                var data = JSON.stringify(upload);
                var encData = this._encryptionServices.encrypt(data);
                let formData = new FormData();
                formData.append("file", this.image_upload);
                if (this.uuid == "") {
                    formData.append("uuid", '0');
                } else {
                    formData.append("uuid", this.uuid);
                }

                formData.append("token", encData);
                formData.append("opttyp", 'sol');
                formData.append("type", "3");


                this._constantService.uploadFileApi(this._constantService.getUploadFileServiceUrl(), formData).subscribe(data => {
                    var responseData: any = data;
                    var status = responseData.STATUS;
                    if (status == this._constantService.success_msg) {
                        this.optionImgUpload7 = false;
                        this.solType = 1;
                        this.pdfOriginalname = responseData.ORIGINAL_NAME;
                        this.uuid = responseData.UUID;
                        this.qstnSolUrl = responseData.FPATH;
                        this.imageSet['s_sol'] = '';
                        this.ref.instance.uploading = false;
                        this.ref.instance.imageUploadUrl = 'assets/images/svg/pdf.svg'



                        this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                    } else if (status == this._constantService.error_token) {
                        this.sessionLogout.emit(true);
                        this.ref.instance.uploading = false;



                    } else {
                        // this.emitService.removeDocFile(event);
                        this.emitService.imageUploadUrl();
                        this.solType = 0;
                        this.qstnSolUrl = '';
                        this.pdfOriginalname = '';

                        this.imageSet['s_sol'] = '';
                        this.alertMsg['msg'] = "Validations";
                        this.alertMsg['type'] = 2;
                        this.alertMsg['error_msg'] = responseData.ERROR_MSG;
                        this.alert = true;
                        this.ref.instance.uploading = false;



                        return false;
                    }
                }, error => {
                    var responseData = error;

                    if (responseData.status == 500) {
                        this._router.navigate(['500']);
                    }
                });


            }



            else {
                this.alertMsg['msg'] = "STUDY24X7";
                this.alertMsg['type'] = 2;
                this.alertMsg['error_msg'] = "Unable to support the selected file";
                (<HTMLInputElement>document.getElementById('option' + id + 'image')).value = '';
                this.alert = true;
                this.stopUpload = false;
                this.image_upload = null;
                this.file_type = null;
                this.showPreloader = false;
            }
        }
        else {
            this.alertMsg['msg'] = "STUDY24X7";
            this.alertMsg['type'] = 2;
            this.alertMsg['error_msg'] = "File above 10mb is not allowed";
            this.alert = true;
        }
        this.stopUpload = false;
        this.image_upload = null;
        this.showPreloader = false;
    }


    addQuestionImg(event: any) {
        this.loader = true;
        this.stopUpload = true;
        this.image_upload = event.target.files[0];
        this.file_upload = event.target.files[0];
        let type = this.image_upload.name;
        var reader = new FileReader();
        var typearr = type.split(".");

        this.imageUpload = true;
        this.showPreloader = true;
        var size = Math.round(this.image_upload.size / 1000 / 1000);
        if (size <= 10) {
            if (this.image_upload.name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
                this.file_type = 1;
                this.show_image_question = 2;
                var id = (<HTMLInputElement>document.getElementById('addPost'));
                if (id != null && id != undefined) {
                    id.classList.add("desablebutton");
                }
                if (this.questionTypediv === 0) {
                    reader.onload = (event: any) => {
                        this.image_upload_question_url = event.target.result;
                    }
                    reader.readAsDataURL(event.target.files[0]);
                }

                var upload = {};
                upload['token'] = this._constantService.getSessionDataBYKey('token');
                upload['token_param'] = {};
                upload['token_param']['device_type'] = "w";
                upload['token_param']['host'] = "";
                var data = JSON.stringify(upload);
                var encData = this._encryptionServices.encrypt(data);
                let formData = new FormData();
                formData.append("file", this.image_upload);
                if (this.uuid == "") {
                    formData.append("uuid", '0');
                } else {
                    formData.append("uuid", this.uuid);
                }
                formData.append("token", encData);
                if (this.questionTypediv === 0) {
                    formData.append("type", "2");
                    formData.append("pattchid", '0');
                } else {
                    formData.append("type", "3");
                    formData.append("opttyp", 'qst');
                }


                this._constantService.uploadFileApi(this._constantService.getUploadFileServiceUrl(), formData).subscribe(data => {
                    var responseData: any = data;
                    var status = responseData.STATUS;
                    id.classList.remove("desablebutton");
                    this.loader = false;
                    if (status == this._constantService.success_msg) {
                        this.stopUpload = false;
                        this.imageUpload = false;
                        this.showPreloader = false;
                        this.uuid = responseData.UUID;
                        var date = new Date()
                        if (this.questionTypediv === 0) {
                            //                            this.image_upload_question_url = responseData.FPATH;
                            this.imagePostSize = responseData.DIMENSION;
                            this.file_path = responseData.FPATH;
                            this.attachmentPageCount = responseData.PAGE;
                            this.attachmentId = responseData.UUID;
                        } else {
                            this.image_upload_question_url = responseData.FPATH + 'img/' + this.uuid + "/qst.png?v=" + new Date().getTime();
                            this.imageSet['s_qst'] = responseData.DIMENSION;
                        }
                        //this._constantService.setToken(responseData.TOKEN);
                        this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                        this.check1(event);
                        (<HTMLInputElement>document.getElementById('questionimage')).value = '';
                    } else if (status == this._constantService.error_token) {
                        this.showPreloader = false;
                        this.stopUpload = false;
                        this.sessionLogout.emit(true);
                    } else {
                        this.showPreloader = false;
                        this.stopUpload = false;
                        this.image_upload = null;
                        this.file_type = null;
                        this.show_image_question = 1;
                        this.alertMsg['msg'] = responseData.ERROR;
                        this.alertMsg['type'] = 2;
                        this.alertMsg['error_msg'] = responseData.ERROR_MSG;
                        this.alert = true;
                        return false;
                    }
                }, error => {
                    var responseData = error;
                    if (responseData.status == 500) {
                        this._router.navigate(['500']);
                    }
                });
            } else {
                this.alertMsg['msg'] = "STUDY24X7";
                this.alertMsg['type'] = 2;
                this.alertMsg['error_msg'] = "Unable to support the selected file";
                (<HTMLInputElement>document.getElementById('questionimage')).value = '';
                this.alert = true;
                this.stopUpload = false;
                this.show_image_question = 1;
                this.image_upload = null;
                this.file_type = null;
                this.showPreloader = false;

            }
        } else {
            this.alertMsg['msg'] = "STUDY24X7";
            this.alertMsg['type'] = 2;
            this.alertMsg['error_msg'] = "File above 10mb is not allowed";
            this.alert = true;
        }
    }

    addFile(event: any) {
        this.file_upload = event.target.files[0];
        if (this.file_upload.name.length < 150) {
            this.loader = true;
            var id = (<HTMLInputElement>document.getElementById('addPost'));
            if (id != null && id != undefined) {
                id.classList.add("desablebutton");
            }
            let type = this.file_upload.name;
            var reader = new FileReader();
            var typearr = type.split(".");
            var size = Math.round(this.file_upload.size / 1000 / 1000);
            if (size <= 10) {
                if (this.file_upload.name.match(/\.(pdf|PDF|ppt|PPT|pptx|PPTX|doc|DOC|docx|DOCX|txt|TEXT|TXT|csv|CSV)$/)) {
                    if (this.file_upload.name.match(/\.(pdf|PDF)$/)) {
                        this.file_type = 4;
                    } else if (this.file_upload.name.match(/\.(ppt|PPT|pptx|PPTX)$/)) {
                        this.file_type = 5;
                    } else {
                        this.file_type = 3;
                    }
                    this.showPreloader = true;
                    this.show_image = 2;
                    var filetype = typearr[typearr.length - 1];
                    this.image_upload_url = "assets/images/svg/" + filetype.toLowerCase() + ".svg";
                    let file: File = this.file_upload;
                    var upload = {};
                    upload['token'] = this._constantService.getSessionDataBYKey('token');
                    upload['token_param'] = {};
                    upload['token_param']['device_type'] = "w";
                    upload['token_param']['host'] = "";
                    var data = JSON.stringify(upload);
                    var encData = this._encryptionServices.encrypt(data);
                    let formData = new FormData();
                    formData.append("file", file);
                    formData.append("pattchid", "0");
                    formData.append("token", encData);
                    formData.append("type", "2");

                    this._constantService.uploadFileApi(this._constantService.getUploadFileServiceUrl(), formData).subscribe(data => {
                        var responseData: any = data;
                        var status = responseData.STATUS;
                        this.loader = false;
                        id.classList.remove("desablebutton");
                        this.showPreloader = false;
                        if (status == this._constantService.success_msg) {
                            this.showText = true;
                            this.imageUpload = false;
                            this.disabledPostBtn = false;
                            this.check(event);
                            this.file_path = responseData.FPATH;
                            this.attachmentPageCount = responseData.PAGE;
                            this.attachmentId = responseData.UUID;
                            //this._constantService.setToken(responseData.TOKEN);
                            this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                        } else if (status == this._constantService.error_token) {
                            this.showPreloader = false;
                            this.showText = true;
                            this.sessionLogout.emit(true);

                        } else {
                            this.showText = true;
                            this.show_image = 1;
                            this.alertMsg['msg'] = "Validations";
                            this.alertMsg['type'] = 2;
                            this.alertMsg['error_msg'] = responseData.ERROR_MSG;
                            this.alert = true;
                            return false;
                        }
                    }, error => {
                        var responseData = error;
                        if (responseData.status == 500) {
                            this._router.navigate(['500']);
                        }
                    });

                } else if (this.file_upload.name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
                    this.imageUpload = true;
                    this.showPreloader = true;
                    this.show_image = 2;
                    this.file_type = 1;
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
                    var encData = this._encryptionServices.encrypt(data);
                    let formData = new FormData();
                    formData.append("file", this.file_upload);
                    formData.append("pattchid", '0');
                    formData.append("token", encData);
                    formData.append("type", "2");

                    this._constantService.uploadFileApi(this._constantService.getUploadFileServiceUrl(), formData).subscribe(data => {
                        var responseData: any = data;
                        var status = responseData.STATUS;
                        this.loader = false;
                        id.classList.remove("desablebutton");
                        if (status == this._constantService.success_msg) {
                            if (document.getElementById('postData')) {
                                document.getElementById('postData').focus();
                            }
                            this.imageUpload = false;
                            this.disabledPostBtn = false;
                            this.imagePostSize = responseData.DIMENSION;
                            this.showText = true;
                            this.showPreloader = false;
                            this.file_path = responseData.FPATH;
                            this.check(event);
                            this.attachmentPageCount = responseData.PAGE;
                            this.attachmentId = responseData.UUID;
                            //this._constantService.setToken(responseData.TOKEN);
                            this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                        } else if (status == this._constantService.error_token) {
                            this.showText = true;
                            this.showPreloader = false;
                            this.sessionLogout.emit(true);
                        } else {
                            this.showPreloader = false;
                            this.showText = true;
                            this.show_image = 1;
                            this.file_upload = null;
                            this.file_type = null;
                            this.alertMsg['msg'] = responseData.ERROR;
                            this.alertMsg['type'] = 2;
                            this.alertMsg['error_msg'] = responseData.ERROR_MSG;
                            this.alert = true;
                            return false;
                        }
                    }, error => {
                        var responseData = error;
                        if (responseData.status == 500) {
                            this._router.navigate(['500']);
                        }
                    });
                } else {
                    this.alertMsg['msg'] = "STUDY24X7";
                    this.alertMsg['type'] = 2;
                    this.alertMsg['error_msg'] = "Unable to support the selected file";
                    this.alert = true;
                    this.showPreloader = false;
                    this.showText = true;
                    this.show_image = 1;
                    this.loader = false;
                    this.file_upload = null;
                    this.image_upload = null;
                    this.file_type = null;
                    this.file_upload = '';
                }
            } else {
                this.alertMsg['msg'] = "STUDY24X7";
                this.alertMsg['type'] = 2;
                this.alertMsg['error_msg'] = "File above 10mb is not allowed";
                this.alert = true;
                this.openConfirmation = true;
            }
        } else {
            this._constantService.showToast('File name too large. Max length 150 characters', '', '2');
        }
        (<HTMLInputElement>document.getElementById('fileupload')).value = '';
    }


    addImageFile(event) {
        this.loader = true;
        var id = (<HTMLInputElement>document.getElementById('addPost'));
        if (id != null && id != undefined) {
            id.classList.add("desablebutton");
        }
        this.image_upload = event.target.files[0];
        //        let type = this.image_upload.name;
        var reader = new FileReader();
        //        var typearr = type.split(".");
        var size = Math.round(this.image_upload.size / 1000 / 1000);
        if (size <= 10) {
            this.imageUpload = true;
            this.showPreloader = true;
            if (this.image_upload.name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
                this.imageUpload = true;
                this.showPreloader = true;
                this.show_image = 2;
                this.file_type = 1;
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
                var encData = this._encryptionServices.encrypt(data);
                let formData = new FormData();
                formData.append("file", this.image_upload);
                formData.append("pattchid", '0');
                formData.append("token", encData);
                formData.append("type", "2");

                this._constantService.uploadFileApi(this._constantService.getUploadFileServiceUrl(), formData).subscribe(data => {
                    var responseData: any = data;
                    var status = responseData.STATUS;
                    this.loader = false;
                    id.classList.remove("desablebutton");
                    if (status == this._constantService.success_msg) {
                        if (document.getElementById('postData')) {
                            document.getElementById('postData').focus();
                        }
                        this.imageUpload = false;
                        this.disabledPostBtn = false;
                        this.imagePostSize = responseData.DIMENSION;
                        this.showText = true;
                        this.showPreloader = false;
                        this.file_path = responseData.FPATH;
                        this.check(event);
                        this.attachmentPageCount = responseData.PAGE;
                        this.attachmentId = responseData.UUID;
                        //this._constantService.setToken(responseData.TOKEN);
                        this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                    } else if (status == this._constantService.error_token) {
                        this.showText = true;
                        this.showPreloader = false;
                        this.sessionLogout.emit(true);
                    } else {
                        this.showPreloader = false;
                        this.showText = true;
                        this.show_image = 1;
                        this.image_upload = null;
                        this.file_type = null;
                        this.alertMsg['msg'] = responseData.ERROR;
                        this.alertMsg['type'] = 2;
                        this.alertMsg['error_msg'] = responseData.ERROR_MSG;
                        this.alert = true;
                        return false;
                    }
                }, error => {
                    var responseData = error;
                    if (responseData.status == 500) {
                        this._router.navigate(['500']);
                    }
                });
            } else {
                this.showPreloader = false;
                this.showText = true;
                this.alertMsg['msg'] = "STUDY24X7";
                this.alertMsg['type'] = 2;
                this.alertMsg['error_msg'] = "Unable to support the selected file ";
                this.alert = true;
                this.show_image = 1;
                this.image_upload = null;
                this.file_type = null;
                return false;
            }

        } else {
            this.alertMsg['msg'] = "STUDY24X7";
            this.alertMsg['type'] = 2;
            this.alertMsg['error_msg'] = "File above 10mb is not allowed";
            this.alert = true;
        }
    }

    updLatestPostInterest(lastInt) {
        this.coverAll = true;
        var lastInterest = {};
        lastInterest['token'] = this._constantService.getSessionDataBYKey('token');
        lastInterest['token_param'] = {};
        lastInterest['token_param']['device_type'] = 'w';
        lastInterest['token_param']['host'] = '';
        lastInterest['interest_id'] = lastInt;
        if (this._router.url.split('/')[1] == 'page') {
            lastInterest['page_uuid'] = this.pageId;
        } else {
            lastInterest['page_uuid'] = "";
        }



        this._constantService.fetchDataApi(this._constantService.getUpdatePostInterestServiceUrl(), lastInterest).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this._constantService.setLtPostInterest(lastInt);
            }
            this.coverAll = false;
        }, error => {
            this.coverAll = false;
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }



    removeIntrest() {
        var element = document.querySelectorAll(".remTag");
        if (element != null) {
            Array.prototype.forEach.call(element, function (node) {
                node.parentNode.removeChild(node);
            });
        }
    }

    //    Addpost Previous Conditions

    check(event) {
        var x = this.textAreaPostDataElement;
        setTimeout(() => {
            if (x != undefined && x != null) {
                var postData = x.value;
                // var postData = this.post_data.removeUnwantedContent('postData');
                // postData = postData.replace(/<br>/g, "");
                var id = (<HTMLInputElement>document.getElementById('addPost'));

                //                if (postData) {
                // postData = postData.replace(/"ng-reflect-ng-if": "true"/g, "").replace(/<span _ngcontent-c4="" class="placeholder" id="post_placeholder" contenteditable="false"><\/span>/g, "").trim();
                this.postData = postData;

                if ((postData.length != 0 && this.postData != "" || this.image_upload != null || this.file_upload != undefined || this.file_path != null)) {
                    this.imageUpload = false; //console.log("4 ", this.postData, this.image_upload, this.file_upload);
                    var data = id.classList.remove('desablebutton');
                    this.disabledPostBtn = false;
                    this.ShowSubmitBtn = true;
                    this.enaleaddpostBtn = true;
                }

                if (postData.length == 0 && this.attachmentId == "") {
                    // x.blur();
                    postData = postData.replace(/ Discuss within your interest./g, "").trim();
                    this.show_placeholder = true;
                    // x.hideFocus() = true;
                    var data = id.classList.add('desablebutton');
                }

                if (this.file_upload == null && this.image_upload == null && (this.postData == undefined || this.postData == '')) {
                    if (x.innerText.length == 0 || x.innerText == "Discuss within your interest.") {
                        this.disabledPostBtn = true;
                        var data = id.classList.add('desablebutton')
                        this.ShowSubmitBtn = false;
                        this.showPlaceHolder();
                    }
                    postData = postData.trim();
                    var length = postData.length;
                }
            }
        }, 400);
        if (x != undefined && x != null) {
            this.show_placeholder = false;
        } else {
            this.show_placeholder = true;
        }
    }

    checkPaste() {
        setTimeout(() => {
            var x = document.getElementById('postData');
            if (x != undefined && x != null) {
                var postData = x.innerText;
                postData = this.post_data.removeUnwantedContent('postData');

                var id = (<HTMLInputElement>document.getElementById('addPost'));
                if (postData) {
                    if (postData != undefined) {
                        postData = postData.replace(/ /g, "");
                        postData = postData.toString().trim();
                    }
                    if (postData.length != 0 && postData != '' || this.image_upload != null && this.file_upload != undefined && this.file_path != null) {
                        this.imageUpload = false;
                        var data = id.classList.remove('desablebutton');
                        this.disabledPostBtn = false;
                        this.ShowSubmitBtn = true;
                    }
                    postData = postData.replace(/ Discuss within your interest./g, "").trim();
                    postData = postData.trim();
                    var length = postData.length;
                }

            }
        }, 400);
    }

    onEnter(event) {
        this.textAreaPostDataElement.style.height = 'auto';
        this.textAreaPostDataElement.style.height = this.textAreaPostDataElement.scrollHeight + 'px';
        var data = (<HTMLInputElement>document.getElementById('postData')).innerHTML;
        data = data.replace(/<br><br>/g, "<br>");
        return data;
    }


    dele(event) {
        this.textAreaPostDataElement.style.height = 'auto';
        this.textAreaPostDataElement.style.height = this.textAreaPostDataElement.scrollHeight + 'px';
        this.check(event);
    }

    check1(event) {
        setTimeout(() => {
            var x = document.getElementById('q_text');
            if (x != undefined && x != null) {
                var postData = x.innerText;
                postData = this.post_data.removeUnwantedContent("q_text");
                var id = (<HTMLInputElement>document.getElementById('addPost'));
                postData = postData.replace(/ Type Your Question?/g, "").trim();
                postData = postData.replace(/<br>/g, "").trim();
                postData = postData.trim();
                if (postData.length != 0 && postData != '' || this.image_upload_question_url != null && this.image_upload_question_url != '') {
                    var rem_class = id.classList.remove('desable');
                    this.disabledPostBtn = false;
                }
            }
        }, 400);
    }

    dele1(event) {
        var x = document.getElementById('q_text');
        var id = (<HTMLInputElement>document.getElementById('addPost'));
        if (x != undefined && x != null) {
            var postData = x.innerText;
            postData = postData.replace(/<br>/g, "").trim();
            if (postData.length == 1 || this.image_upload_question_url == null) {
                var rem_class = id.classList.add('desable');
                this.disabledPostBtn = true;
            } this.check1(event);
        }
    }
    //Conditions End

    addPost() {
        if (this.disabledPostBtn == false) {
            if (this.post_tags.indexOf(null) != -1) {
                var x = this.post_tags.indexOf(null);
                this.post_tags.splice(x, 1);
            }
            if (this.enaleaddpostBtn == true) {
                this.enaleaddpostBtn = false;
                this.loader = true;
                var validId;
                var id = (<HTMLInputElement>document.getElementById('addPost'));
                if (id != null && id != undefined) {
                    if (id.classList.contains("desablebutton")) {
                        return false;
                    } else {
                        validId = id;
                    }
                }
                this.showText = false;
                var interststags = this.post_tags.join();
                if (interststags != '') {
                    this.intrst = '1';

                }

                if (interststags == '') {
                    this.loader = false;
                    this.showText = true;
                    this.alertMsg['msg'] = "STUDY24X7";
                    this.alertMsg['type'] = 2;
                    this.alertMsg['error_msg'] = "Please enter a post interest";
                    this.alert = true;
                    this.enaleaddpostBtn = true;
                    this.openConfirmation = true;
                    return false;
                }
                if (this.selectedposttab == 1 || this.questionTypediv === 0) {

                    if (this.questionTypediv === 0) {
                        this.dataDiv = document.getElementById("q_text");
                        var postData = this.dataDiv.innerText;
                        } else {
                        // var postData = this.post_data.postDataManipulation("postData");
                        var postData = this.textAreaPostDataElement.value + '';
                    }

                    // if (this.show_placeholder && this.questionTypediv !== 0) {
                    //     postData = "";
                    // }
                    if ((postData == '' || postData == undefined) && this.file_upload == undefined && this.image_upload == undefined) {
                        this.alertMsg['msg'] = "STUDY24X7";
                        this.alertMsg['type'] = 2;
                        this.alertMsg['error_msg'] = "Please enter a text";
                        this.alert = true;
                        this.loader = false;
                        this.showText = true;
                        this.enaleaddpostBtn = true;
                        this.openConfirmation = true;
                        return false;
                    }

                    if (this.file_upload == null && this.image_upload == null) {
                        if (this.youtubeLinkPresent == false && this.vimeoLinkPresent == false) {
                            var addSimplePost = {};
                            addSimplePost['token'] = this._constantService.getSessionDataBYKey('token');
                            addSimplePost['token_param'] = {};
                            addSimplePost['token_param']['device_type'] = 'w';
                            addSimplePost['token_param']['host'] = '';
                            addSimplePost['pdt'] = this.post_data.encodeURIPostData(postData).trim();
                            if (this.questionTypediv === 0) {
                                addSimplePost['is_ques'] = 1;
                            }

                            if (addSimplePost['pdt'] == "" && addSimplePost['pdt'].length == 0) {
                                addSimplePost['pdt'] = '';
                                this.alertMsg['msg'] = "STUDY24X7";
                                this.alertMsg['type'] = 2;
                                this.alertMsg['error_msg'] = " Insert Some Text";
                                this.enaleaddpostBtn = true;
                                this.alert = true;
                                this.loader = false;
                                this.showText = true;
                                return false;
                            }

                            validId.classList.add("desablebutton");

                            addSimplePost['pv'] = this.visibilityTyp;
                            addSimplePost['pid'] = 0;
                            addSimplePost['ptyp'] = '1';
                            addSimplePost['iid'] = this.post_tags.join();
                            addSimplePost['shrlimage'] = this.linkImage;
                            addSimplePost['shrltitle'] = this.post_data.encodeURIPostData(this.linkTitle);
                            addSimplePost['shrldesc'] = this.post_data.encodeURIPostData(this.linkDescription);
                            addSimplePost['sharelink'] = this.shareLink;
                            if (this.urlArr[1] == 'page') {
                                addSimplePost['pg_id'] = this.pageId;
                            }


                            this._constantService.fetchDataApi(this._constantService.getAddGenPostServiceUrl(), addSimplePost).subscribe(data => {
                                this.coverAll = false;

                                var responseData: any = data;
                                var status = responseData.STATUS;
                                validId.classList.remove("desablebutton");
                                if (status == this._constantService.success_msg) {
                                    this.textAreaPostDataElement.value = '';
                                    this.textAreaPostDataElement.style.height = 'auto';
                                    if (this.questionTypediv === 0) {
                                        this.enaleaddpostBtn = true;
                                        this.post_tags = [];
                                        this.loader = false;
                                        this.showText = true;
                                        this.question_timer = false;
                                        this.showEditor = false;
                                        this.show_image_question = 1;
                                        this.image_upload_question_url = "";
                                        this.showOpt1 = 1;
                                        this.showOpt2 = 1;
                                        this.showOpt3 = 1;
                                        this.showOpt4 = 1;
                                        this.showOpt5 = 1;
                                        this.showOpt6 = 1;
                                        this.option_image1_url = "";
                                        this.option_image2_url = "";
                                        this.option_image3_url = "";
                                        this.option_image4_url = "";
                                        this.option_image5_url = "";
                                        this.option_image6_url = "";
                                        this.addOption = 0;
                                        this.addOptionHide = true;
                                        this.glowhide();

                                        if (responseData.POSTID != undefined) {
                                            this.postId.emit(this._constantService.getSessionDataBYKey('u_id') + ":" + responseData.POSTID + ":1" + "," + this.intrst);
                                        }
                                        if (this.urlArr[1] == 'page') {
                                            this.ltPgPostInt = this.post_tags;
                                        } else {
                                            this._constantService.setLtPostInterest(this.post_tags.join());
                                        }
                                        this.updLatestPostInterest(this.post_tags.join());
                                    } else {
                                        this.enaleaddpostBtn = true;
                                        var id = (<HTMLInputElement>document.getElementById('addPost'));
                                        var dat = id.classList.add('desablebutton');
                                        (<HTMLInputElement>document.getElementById('postData')).innerText = '';
                                        this.show_placeholder = true;
                                        if (this.urlArr[1] == 'page') {
                                            this.ltPgPostInt = this.post_tags;
                                        } else {
                                            this._constantService.setLtPostInterest(this.post_tags.join());
                                        }
                                        this.updLatestPostInterest(this.post_tags.join());

                                        this.post_tags = [];
                                        var element = document.querySelectorAll(".remTag");
                                        Array.prototype.forEach.call(element, function (node) {
                                            node.parentNode.removeChild(node);
                                        });
                                        this.loader = false;
                                        this.showText = true;
                                        //this._constantService.setToken(responseData.TOKEN);
                                        this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                                        document.getElementById("postData").innerText = '';
                                        this.glowhide();
                                        this.linkPreview = 3;
                                        if (responseData.POSTID != undefined) {
                                            this.postId.emit(this._constantService.getSessionDataBYKey('u_id') + ":" + responseData.POSTID + ":1" + "," + this.intrst);
                                        }
                                        this.emitToQuestionForYou.emit(false);

                                    }

                                } else if (status == this._constantService.error_token) {
                                    this.loader = false;
                                    this.showText = true;
                                    this.enaleaddpostBtn = true;
                                    if (this.logout == false) {
                                        this.loader = false;
                                        this.showText = true;
                                        this.sessionLogout.emit(true);

                                    }
                                } else {
                                    this.loader = false;
                                    this.showText = true;
                                    this.enaleaddpostBtn = true;
                                    this.alertMsg['msg'] = "STUDY24X7";
                                    this.alertMsg['type'] = 2;
                                    this.alertMsg['error_msg'] = responseData.ERROR_MSG;
                                    this.alert = true;
                                }

                                this.linkImage = '';
                                this.linkTitle = '';
                                this.linkDescription = '';
                                this.shareLink = '';
                            }, error => {
                                this.coverAll = false;
                                var responseData = error;
                                if (responseData.status == 500) {
                                    this._router.navigate(['500']);
                                }
                            });
                        } else {
                            var addVideoPost = {};
                            addVideoPost['token'] = this._constantService.getSessionDataBYKey('token');
                            addVideoPost['token_param'] = {};
                            addVideoPost['token_param']['device_type'] = "w";
                            addVideoPost['token_param']['host'] = "";
                            addVideoPost['pid'] = "0";
                            addVideoPost['pdt'] = this.post_data.encodeURIPostData(postData).trim();
                            addVideoPost['pv'] = this.visibilityTyp;;
                            addVideoPost['iid'] = this.post_tags.join();
                            if (this.urlArr[1] == 'page') {
                                addVideoPost['pg_id'] = this.pageId;
                            }
                            if (this.vimeoLinkPresent) {
                                addVideoPost['ptyp'] = 6;
                            } else if (this.youtubeLinkPresent) {
                                addVideoPost['ptyp'] = 5;
                            }
                            addVideoPost['title'] = this.post_data.encodeURIPostData(this.linkTitle);
                            addVideoPost['desc'] = "";
                            addVideoPost['vid'] = this.videoId;

                            validId.classList.add("desablebutton");


                            this._constantService.fetchDataApi(this._constantService.getVideoPostServiceUrl(), addVideoPost).subscribe(data => {
                                var responseData: any = data;
                                var status = responseData.STATUS;
                                validId.classList.remove("desablebutton");
                                if (status == this._constantService.success_msg) {
                                    this.enaleaddpostBtn = true;
                                    var id = (<HTMLInputElement>document.getElementById('addPost'));
                                    var dat = id.classList.add('desablebutton');
                                    this.updLatestPostInterest(this.post_tags.join());

                                    if (this.urlArr[1] == 'page') {
                                        this.ltPgPostInt = this.post_tags;
                                    } else {
                                        this._constantService.setLtPostInterest(this.post_tags.join());
                                    }
                                    (<HTMLInputElement>document.getElementById('postData')).innerHTML = '';
                                    this.post_tags = [];
                                    this.show_placeholder = true;
                                    this.loader = false;
                                    this.showText = true;
                                    //this._constantService.setToken(responseData.TOKEN);
                                    this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                                    this.linkPreview = 3;
                                    if (this.vimeoLinkPresent) {
                                        this.postId.emit(this._constantService.getSessionDataBYKey('u_id') + ":" + responseData.POSTID + ":6" + "," + this.intrst);
                                    } else if (this.youtubeLinkPresent) {
                                        this.postId.emit(this._constantService.getSessionDataBYKey('u_id') + ":" + responseData.POSTID + ":5" + "," + this.intrst);
                                    }
                                    var element = document.querySelectorAll(".remTag");
                                    Array.prototype.forEach.call(element, function (node) {
                                        node.parentNode.removeChild(node);
                                    });
                                    this.glowhide();
                                } else if (status == this._constantService.error_token) {
                                    this.loader = false;
                                    this.enaleaddpostBtn = true;
                                    this.showText = true;
                                    if (this.logout == false) {
                                        this.sessionLogout.emit(true);
                                        this.loader = false;
                                        this.showText = true;
                                    }
                                } else {
                                    this.loader = false;
                                    this.showText = true;
                                    this.enaleaddpostBtn = true;
                                    this.alertMsg['msg'] = "STUDY24X7";
                                    this.alertMsg['type'] = 2;
                                    this.alertMsg['error_msg'] = responseData.ERROR_MSG;
                                    this.alert = true;
                                }
                                this.linkImage = '';
                                this.linkTitle = '';
                                this.linkDescription = '';
                                this.shareLink = '';
                                this.youtubeLinkPresent = false;
                                this.vimeoLinkPresent = false;
                            }, error => {
                                var responseData = error;
                                if (responseData.status == 500) {
                                    this._router.navigate(['500']);
                                }
                            });

                        }
                    } else {
                        var upload = {};
                        upload['token'] = this._constantService.getSessionDataBYKey('token');
                        upload['token_param'] = {};
                        upload['token_param']['device_type'] = "w";
                        upload['token_param']['host'] = "";
                        upload['pdt'] = this.post_data.encodeURIPostData(postData).trim();
                        upload['pv'] = this.visibilityTyp;
                        upload['pid'] = 0;
                        upload['ptyp'] = '2';
                        upload['iid'] = this.post_tags.join();
                        upload['ftyp'] = this.file_type;

                        if (this.urlArr[1] == 'page') {
                            upload['pg_id'] = this.pageId;
                        }
                        if (this.file_type == 3 || this.file_type == 4 || this.file_type == 5) {
                            upload['pcap'] = this.file_upload.name;
                        } else if (this.file_type == 1) {
                            upload['pcap'] = this.file_upload.name;
                            upload['dimns'] = this.imagePostSize;
                        }
                        upload['fpath'] = this.file_path;
                        upload['uuid'] = this.attachmentId;
                        if (this.questionTypediv === 0) {
                            upload['is_ques'] = 1;
                            upload['pages'] = 0;
                        } else {
                            upload['pages'] = this.attachmentPageCount;
                        }

                        validId.classList.add("desablebutton");



                        this._constantService.fetchDataApi(this._constantService.getAddPostWithAttachemntServiceUrl(), upload).subscribe(data => {
                            var responseData: any = data;
                            var status = responseData.STATUS;
                            validId.classList.remove("desablebutton");
                            if (status == this._constantService.success_msg) {
                                this.textAreaPostDataElement.value = '';
                                this.textAreaPostDataElement.style.height = 'auto';
                                this.textAreaPostDataElement.style.height = this.textAreaPostDataElement.scrollHeight + 'px';
                                this.postData = '';
                                this._constantService.showToast(responseData.SUCCESS_MSG, '', '1');
                                if (this.questionTypediv === 0) {
                                    this.enaleaddpostBtn = true;
                                    this.post_tags = [];
                                    this.loader = false;
                                    this.showText = true;
                                    this.question_timer = false;
                                    this.showEditor = false;
                                    this.show_image_question = 1;
                                    this.image_upload_question_url = "";
                                    this.showOpt1 = 1;
                                    this.showOpt2 = 1;
                                    this.showOpt3 = 1;
                                    this.showOpt4 = 1;
                                    this.showOpt5 = 1;
                                    this.showOpt6 = 1;
                                    this.option_image1_url = "";
                                    this.option_image2_url = "";
                                    this.option_image3_url = "";
                                    this.option_image4_url = "";
                                    this.option_image5_url = "";
                                    this.option_image6_url = "";
                                    this.addOption = 0;
                                    this.addOptionHide = true;
                                    this.glowhide();

                                    if (responseData.POSTID != undefined) {
                                        this.postId.emit(this._constantService.getSessionDataBYKey('u_id') + ":" + responseData.POSTID + ":2" + "," + this.intrst);
                                    }
                                    if (this.urlArr[1] == 'page') {
                                        this.ltPgPostInt = this.post_tags;
                                    } else {
                                        this._constantService.setLtPostInterest(this.post_tags.join());
                                    }
                                    this.updLatestPostInterest(this.post_tags.join());
                                } else {
                                    this.enaleaddpostBtn = true;
                                    var id = (<HTMLInputElement>document.getElementById('addPost'));
                                    var dat = id.classList.add('desablebutton');
                                    this.updLatestPostInterest(this.post_tags.join());

                                    if (this.urlArr[1] == 'page') {
                                        this.ltPgPostInt = this.post_tags;
                                    } else {
                                        this._constantService.setLtPostInterest(this.post_tags.join());
                                    }
                                    this.post_tags = [];
                                    this.show_placeholder = true;
                                    this.loader = false;
                                    this.showText = true;
                                    this.show_image = 1;
                                    var element = document.querySelectorAll(".remTag");
                                    Array.prototype.forEach.call(element, function (node) {
                                        node.parentNode.removeChild(node);
                                    });
                                    this.glowhide();
                                    //this._constantService.setToken(responseData.TOKEN);
                                    this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                                    document.getElementById("postData").innerHTML = '';
                                    if (responseData.POSTID != undefined) {
                                        this.postId.emit(this._constantService.getSessionDataBYKey('u_id') + ":" + responseData.POSTID + ":2" + "," + this.intrst);
                                    }
                                }
                            } else if (status == this._constantService.error_token) {
                                if (this.logout == false) {
                                    this.loader = false;
                                    this.enaleaddpostBtn = true;
                                    this.showText = true;
                                    this.sessionLogout.emit(true);

                                }
                            } else {
                                this.loader = false;
                                this.showText = true;
                                this.enaleaddpostBtn = true;
                                this.alertMsg['msg'] = "STUDY24X7";
                                this.alertMsg['type'] = 2;
                                this.alertMsg['error_msg'] = responseData.ERROR_MSG;
                                this.alert = true;
                            }
                            this.file_upload = null;
                            this.show_image = 1;
                        }, error => {
                            var responseData = error;
                            if (responseData.status == 500) {
                                this._router.navigate(['500']);
                            }
                        });
                    }
                } else if (this.selectedposttab == 3) {
                    this.loader = false;
                    this.showText = true;
                    if (this.questionBlock == false) {
                        var questionPost = {};
                        var questiondata = this.getQuestionTextToSave();
                        // var  questiondata = (this.post_data.removeUnwantedContent("q_text") || this.image_upload_question_url);
                        if (this.questionBlock) {
                            questiondata = '';
                        }
                        if (questiondata == '' && this.image_upload_question_url == '') {
                            this.loader = false;
                            this.showText = true;
                            this.enaleaddpostBtn = true;
                            this.alertMsg['msg'] = "STUDY24X7";
                            this.alertMsg['type'] = 2;
                            this.alertMsg['error_msg'] = "Please enter some data";
                            this.alert = true;
                            return false;

                        }

                        questionPost['token'] = this._constantService.getSessionDataBYKey('token');
                        questionPost['token_param'] = {};
                        questionPost['token_param']['device_type'] = 'w';
                        questionPost['token_param']['host'] = '';
                        questionPost['pdt'] = questiondata.replace(/What's%20on%20your%20mind%3F/g, "");
                        questionPost['pv'] = this.visibilityTyp;
                        questionPost['pid'] = 0;
                        questionPost['qd'] = questiondata;
                        questionPost['ptyp'] = 3;
                        questionPost['iid'] = this.post_tags.join();
                        questionPost['uuid'] = this.uuid;
                        questionPost['dimns'] = this.imageSet;
                        questionPost['qsol_mtyp'] = this.solType;
                        if (this.qstnSolUrl != '') {
                            questionPost['qsol_mpath'] = this.qstnSolUrl;
                        }
                        if (this.pdfOriginalname != '') {
                            questionPost['qsol_mnm'] = this.pdfOriginalname;
                        }
                        if (this.solText != '') {
                            questionPost['qsol'] = this.post_data.encodeURIPostData(this.solText);
                        }




                        if (this.urlArr[1] == 'page') {
                            questionPost['pg_id'] = this.pageId;
                        }
                        if (this.question_timer) {
                            this.timer = (<HTMLInputElement>document.getElementById('timer')).value;
                            var hour = parseInt(this.timer.slice(0, 2));
                            var min = parseInt(this.timer.slice(2, 5));
                            if (isNaN(hour) || isNaN(min)) {
                                this.loader = false;
                                this.showText = true;
                                this.enaleaddpostBtn = true;
                                this.alertMsg['type'] = 2;
                                this.alertMsg['msg'] = "STUDY24X7";
                                this.alertMsg['error_msg'] = "Question attempt time must be in acceptable time format.";
                                this.alert = true;
                                return false;
                            } else if (hour > 24) {
                                this.loader = false;
                                this.showText = true;
                                this.enaleaddpostBtn = true;
                                this.alertMsg['type'] = 2;
                                this.alertMsg['msg'] = "STUDY24X7";
                                this.alertMsg['error_msg'] = "Question attempt time must be within 24 hrs";
                                this.alert = true;
                                return;
                            } else if (min > 60) {
                                this.loader = false;
                                this.showText = true;
                                this.enaleaddpostBtn = true;
                                this.alertMsg['type'] = 2;
                                this.alertMsg['msg'] = "STUDY24X7";
                                this.alertMsg['error_msg'] = "Question attempt time must be within 60 mins";
                                this.alert = true;
                                return;
                            }
                            else if (hour == 24 && min > 0) {
                                this.loader = false;
                                this.showText = true;
                                this.enaleaddpostBtn = true;
                                this.alertMsg['type'] = 2;
                                this.alertMsg['msg'] = "STUDY24X7";
                                this.alertMsg['error_msg'] = "Question attempt time must be within 24 hrs";
                                this.alert = true;
                                return;
                            }
                            if (isNaN(hour) && isNaN(min)) {
                                questionPost['qattmtm'] = 0;
                            } else {
                                questionPost['qattmtm'] = (hour * 60) + min;
                                if (questionPost['qattmtm'] > 1440) {
                                    questionPost['qattmtm'] = 1440;
                                }
                            }
                        } else {
                            questionPost['qattmtm'] = 0;
                        }
                        if (this.image_upload_question_url != "") {
                            questionPost['qstimg'] = this.image_upload_question_url.split("?")[0];
                        } else {
                            questionPost['qstimg'] = '';
                        }
                        if (this.questionTypediv == 1 || this.questionTypediv == 2) {
                            var optt1 = (this.getOption1TextToSave()).trim().replace(/%3Cbr%3E$/g, "");
                            var opti1 = (this.option_image1_url);

                            var optt2 = (this.getOption2TextToSave()).trim().replace(/%3Cbr%3E$/g, "");
                            var opti2 = (this.option_image2_url);
                            var optt3 = (this.getOption3TextToSave());
                            var opti3 = (this.option_image3_url);
                            var optt4 = (this.getOption4TextToSave());
                            var opti4 = (this.option_image4_url);

                            if ((postData == "") || (optt1 == "" && opti1 == '') && (optt2 == "" && opti2 == '')) {
                                this.loader = false;
                                this.showText = true;
                                this.enaleaddpostBtn = true;
                                this.alertMsg['type'] = 2;
                                this.alertMsg['msg'] = "STUDY24X7";
                                this.alertMsg['error_msg'] = "Please complete the data to post this question";
                                this.alert = true;
                                return;
                            }
                            let QuestionOptions = [];

                            if (this.option_image1_url != "") {
                                QuestionOptions.push({ 'optt': optt1, 'opti': this.option_image1_url.split("?")[0] });
                                optt1.replace(/%3Cbr%3E$/g, "");
                            } else if (optt1.trim() != "") {
                                optt1 = optt1.replace(/%3Cbr%3E/g, "");
                                optt1 = optt1.replace(/%3Cdiv%20%20style%3D%22left%3A%200px%3B%20bottom%3A%200px%3B%22%3E%3Cdiv%20%20tabindex%3D%220%22%20style%3D%22left%3A%200px%3B%20width%3A%200px%3B%22%3E%3C%2Fdiv%3E%3C%2Fdiv%3E%3Cdiv%20%20style%3D%22top%3A%200px%3B%20right%3A%200px%3B%22%3E%3Cdiv%20%20tabindex%3D%220%22%20style%3D%22top%3A%200px%3B%20height%3A%200px%3B%22%3E%3C%2Fdiv%3E%3C%2Fdiv%3E/g, "").trim();
                                optt1 = optt1.trim();
                                QuestionOptions.push({ 'optt': optt1, 'opti': '' });
                            } else {
                                this.loader = false;
                                this.showText = true;
                                this.enaleaddpostBtn = true;
                                this.alertMsg['type'] = 2;
                                this.alertMsg['msg'] = "STUDY24X7";
                                this.alertMsg['error_msg'] = "Please complete the data to post this question";
                                this.alert = true;
                                return;
                            }

                            if (this.option_image2_url != "") {
                                QuestionOptions.push({ 'optt': optt2, 'opti': this.option_image2_url.split("?")[0] });
                            } else if (optt2.trim() != "") {
                                optt2 = optt2.replace(/%3Cdiv%20%20style%3D%22left%3A%200px%3B%20botto%3A%200px%3B%22%3E%3Cdiv%20%20tabindex%3D%220%22%20style%3D%22left%3A%200px%3B%20width%3A%200px%3B%22%3E%3C%2Fdiv%3E%3C%2Fdiv%3E%3Cdiv%20%20style%3D%22top%3A%200px%3B%20right%3A%200px%3B%22%3E%3Cdiv%20%20tabindex%3D%220%22%20style%3D%22top%3A%200px%3B%20height%3A%200px%3B%22%3E%3C%2Fdiv%3E%3C%2Fdiv%3E/g, "").trim();
                                optt2 = optt2.replace(/%3Cbr%3E/g, "");
                                optt2 = optt2.trim();
                                QuestionOptions.push({ 'optt': optt2, 'opti': '' });
                            } else if (optt2.length == 0 && opti2.length == 0) {
                                this.loader = false;
                                this.showText = true;
                                this.enaleaddpostBtn = true;
                                this.alertMsg['type'] = 2;
                                this.alertMsg['msg'] = "STUDY24X7";
                                this.alertMsg['error_msg'] = "Please complete the data to post this question";
                                this.alert = true;
                                return;
                            }


                            if (this.option_image3_url != "") {
                                QuestionOptions.push({ 'optt': optt3, 'opti': this.option_image3_url.split("?")[0] });
                            } else if (optt3 != "") {
                                if (optt2 != "") {
                                    optt3 = optt3.replace(/%3Cdiv%20%20style%3D%22left%3A%200px%3B%20bottom%3A%200px%3B%22%3E%3Cdiv%20%20tabindex%3D%220%22%20style%3D%22left%3A%200px%3B%20width%3A%200px%3B%22%3E%3C%2Fdiv%3E%3C%2Fdiv%3E%3Cdiv%20%20style%3D%22top%3A%200px%3B%20right%3A%200px%3B%22%3E%3Cdiv%20%20tabindex%3D%220%22%20style%3D%22top%3A%200px%3B%20height%3A%200px%3B%22%3E%3C%2Fdiv%3E%3C%2Fdiv%3E/g, "").trim();
                                    optt3 = optt3.replace(/%3Cbr%3E/g, "");
                                    optt3 = optt3.trim();
                                    QuestionOptions.push({ 'optt': optt3, 'opti': '' });
                                } else if (opti2 == '') {
                                    this.loader = false;
                                    this.showText = true;
                                    this.enaleaddpostBtn = true;
                                    this.alertMsg['type'] = 2;
                                    this.alertMsg['msg'] = "STUDY24X7";
                                    this.alertMsg['error_msg'] = "Please enter some data in option B";
                                    this.alert = true;
                                    return;
                                }
                            }

                            if (this.option_image4_url != "") {
                                QuestionOptions.push({ 'optt': optt4, 'opti': this.option_image4_url.split("?")[0] });
                            } else if (optt4 != "") {
                                if (optt3 != "") {
                                    optt4 = optt4.replace(/%3Cdiv%20%20style%3D%22left%3A%200px%3B%20bottom%3A%200px%3B%22%3E%3Cdiv%20%20tabindex%3D%220%22%20style%3D%22left%3A%200px%3B%20width%3A%200px%3B%22%3E%3C%2Fdiv%3E%3C%2Fdiv%3E%3Cdiv%20%20style%3D%22top%3A%200px%3B%20right%3A%200px%3B%22%3E%3Cdiv%20%20tabindex%3D%220%22%20style%3D%22top%3A%200px%3B%20height%3A%200px%3B%22%3E%3C%2Fdiv%3E%3C%2Fdiv%3E/g, "").trim();
                                    optt4 = optt4.replace(/%3Cbr%3E/g, "");
                                    optt4 = optt4.trim();
                                    QuestionOptions.push({ 'optt': optt4, 'opti': '' });
                                } else if (opti3 == '') {
                                    this.loader = false;
                                    this.showText = true;
                                    this.enaleaddpostBtn = true;
                                    this.alertMsg['type'] = 2;
                                    this.alertMsg['msg'] = "STUDY24X7";
                                    this.alertMsg['error_msg'] = "Please enter some data in option C";
                                    this.alert = true;
                                    return;
                                }

                            }

                            if (this.addOption > 0) {
                                var option5 = this.getOption5TextToSave();
                                if (option5 != "" || this.option_image5_url != "") {
                                    if (this.option_image5_url != "") {
                                        QuestionOptions.push({ 'optt': option5, 'opti': this.option_image5_url.split("?")[0] });
                                    } else if (option5 != "") {
                                        if (optt4 != "") {
                                            option5 = option5.replace(/%3Cdiv%20%20style%3D%22left%3A%200px%3B%20bottom%3A%200px%3B%22%3E%3Cdiv%20%20tabindex%3D%220%22%20style%3D%22left%3A%200px%3B%20width%3A%200px%3B%22%3E%3C%2Fdiv%3E%3C%2Fdiv%3E%3Cdiv%20%20style%3D%22top%3A%200px%3B%20right%3A%200px%3B%22%3E%3Cdiv%20%20tabindex%3D%220%22%20style%3D%22top%3A%200px%3B%20height%3A%200px%3B%22%3E%3C%2Fdiv%3E%3C%2Fdiv%3E/g, "").trim();
                                            option5 = option5.replace(/%3Cbr%3E/g, "");
                                            option5 = option5.trim();
                                            QuestionOptions.push({ 'optt': option5, 'opti': '' });
                                        } else if (opti4 == '') {
                                            this.loader = false;
                                            this.showText = true;
                                            this.enaleaddpostBtn = true;
                                            this.alertMsg['type'] = 2;
                                            this.alertMsg['msg'] = "STUDY24X7";
                                            this.alertMsg['error_msg'] = "Please enter some data in option D";
                                            this.alert = true;
                                            return;
                                        }
                                    }
                                }

                            }

                            if (this.addOption > 1) {
                                var option6 = this.getOption6TextToSave();
                                if (option6 != "" || this.option_image6_url != "") {
                                    if (this.option_image6_url != "") {
                                        QuestionOptions.push({ 'optt': option6, 'opti': this.option_image6_url.split("?")[0] });
                                    } else if (option6 != "") {
                                        if (option5 != "") {
                                            QuestionOptions.push({ 'optt': option6, 'opti': '' });
                                        } else {
                                            this.loader = false;
                                            this.showText = true;
                                            this.enaleaddpostBtn = true;
                                            this.alertMsg['type'] = 2;
                                            this.alertMsg['msg'] = "STUDY24X7";
                                            this.alertMsg['error_msg'] = "Please enter some data in option E";
                                            this.alert = true;
                                            return;
                                        }

                                    }
                                }
                            }

                            var optionsText = [];

                            for (var i = 0; i < QuestionOptions.length; i++) {
                                if (QuestionOptions[i]['optt'] != "" || QuestionOptions[i]['optt'] != undefined) {
                                    optionsText[i] = {};
                                    optionsText[i]['optt'] = QuestionOptions[i]['optt'].replace(/%20/g, '').toString().trim().toLowerCase();
                                }
                            }

                            this.isText = [];
                            if (this.option_image1_url == "") {
                                this.isText.push((document.getElementById('opt1_text')).innerText);
                            }
                            if (this.option_image2_url == "") {
                                this.isText.push((document.getElementById('opt2_text')).innerText);
                            }
                            if (this.option_image3_url == "") {
                                this.isText.push((document.getElementById('opt3_text')).innerText);
                            }
                            if (this.option_image4_url == "") {
                                this.isText.push((document.getElementById('opt4_text')).innerText);
                            }

                            var element5 = document.getElementById('opt5_text');
                            var element6 = document.getElementById('opt6_text');

                            if (element5 != undefined && element5 != null) {
                                if (this.option_image5_url == "") {
                                    this.isText.push((document.getElementById('opt5_text')).innerText);
                                }

                            }

                            if (element6 != undefined && element6 != null) {
                                if (this.option_image6_url == "") {
                                    this.isText.push((document.getElementById('opt6_text')).innerText);
                                }
                            }

                            for (var i = 0; i < optionsText.length; i++) {
                                for (var j = i + 1; j < optionsText.length; j++) {
                                    if (optionsText[i]['optt'] && optionsText[j]['optt']) {
                                        if (optionsText[i]['optt'] == optionsText[j]['optt']) {
                                            this.loader = false;
                                            this.showText = true;
                                            this.enaleaddpostBtn = true;
                                            this.alertMsg['type'] = 2;
                                            this.alertMsg['msg'] = "STUDY24X7";
                                            this.alertMsg['error_msg'] = "Duplicate option";
                                            this.alert = true;
                                            return false;
                                        }
                                    }
                                }
                            }

                            questionPost['options'] = QuestionOptions;
                            if (this.questionTypediv == 1) {
                                questionPost['qtyp'] = 1;
                                var selectedAns = (<HTMLInputElement>document.querySelector('input[name="multiplechoice"]:checked'));
                                if (selectedAns != null) {
                                    var arr = [];
                                    arr.push(selectedAns.value);
                                    questionPost['qans'] = arr;
                                } else {
                                    this.loader = false;
                                    this.showText = true;
                                    this.enaleaddpostBtn = true;
                                    this.alertMsg['type'] = 2;
                                    this.alertMsg['msg'] = "STUDY24X7";
                                    this.alertMsg['error_msg'] = "Select a correct answer";
                                    this.alert = true;
                                    return false;
                                }

                            } else if (this.questionTypediv == 2) {
                                questionPost['qtyp'] = 2;
                                let selectedAns1 = document.querySelectorAll('input[name="multipleresponse"]:checked');
                                var length = selectedAns1.length;

                                var selectedAns = (<HTMLInputElement><any>document.querySelectorAll('input[name="multipleresponse"]:checked'));

                                var arr = [];
                                for (var i = 0; i < length; i++) {
                                    arr.push(selectedAns[i].value);
                                }
                                if (arr.length != 0) {
                                    questionPost['qans'] = arr;
                                } else {
                                    this.loader = false;
                                    this.showText = true;
                                    this.enaleaddpostBtn = true;
                                    this.alertMsg['type'] = 2;
                                    this.alertMsg['msg'] = "STUDY24X7";
                                    this.alertMsg['error_msg'] = "Select a correct answer";
                                    this.alert = true;
                                    return false;
                                }
                            }
                        } else if (this.questionTypediv == 3) {
                            questionPost['qtyp'] = 3;
                            var QuestionOptions = [];
                            QuestionOptions.push({ 'optt': "true", 'opti': '' });
                            QuestionOptions.push({ 'optt': "false", 'opti': '' });
                            questionPost['options'] = QuestionOptions;
                            var selectedAns = (<HTMLInputElement>document.querySelector('input[name="truefalse"]:checked'));
                            if (selectedAns != null) {
                                var arr = [];
                                arr.push(selectedAns.value);
                                questionPost['qans'] = arr;
                            } else {
                                this.loader = false;
                                this.showText = true;
                                this.enaleaddpostBtn = true;
                                this.alertMsg['error_msg'] = "Please select correct choice";
                                this.alert = true;
                                return false;
                            }
                        }

                        this.loader = false;
                        this.showText = true;
                        this._constantService.fetchDataApi(this._constantService.putQuestionPostServiceUrl(), questionPost).subscribe(data => {
                            var responseData: any = data;
                            var status = responseData.STATUS;
                            if (status == this._constantService.success_msg) {
                                this.solText = '';
                                this.qstnSolUrl = '';
                                this.solType = 0;
                                this.pdfOriginalname = '';
                                this.enaleaddpostBtn = true;;
                                this.updLatestPostInterest(this.post_tags.join());
                                if (this.urlArr[1] == 'page') {
                                    this.ltPgPostInt = this.post_tags;
                                } else {
                                    this._constantService.setLtPostInterest(this.post_tags.join());
                                }
                                this.post_tags = [];
                                this.loader = false;
                                this.showText = true;
                                this.question_timer = false;
                                if (responseData.POSTID != undefined) {
                                    this.postId.emit(this._constantService.getSessionDataBYKey('u_id') + ":" + responseData.POSTID + ":3" + "," + this.intrst);

                                }
                                this.showEditor = false;
                                this.show_image_question = 1;
                                this.image_upload_question_url = "";
                                this.showOpt1 = 1;
                                this.showOpt2 = 1;
                                this.showOpt3 = 1;
                                this.showOpt4 = 1;
                                this.showOpt5 = 1;
                                this.showOpt6 = 1;
                                this.option_image1_url = "";
                                this.option_image2_url = "";
                                this.option_image3_url = "";
                                this.option_image4_url = "";
                                this.option_image5_url = "";
                                this.option_image6_url = "";
                                this.addOption = 0;
                                this.addOptionHide = true;
                                var element = document.querySelectorAll(".remTag");
                                Array.prototype.forEach.call(element, function (node) {
                                    node.parentNode.removeChild(node);
                                });
                                this.glowhide();
                                //this._constantService.setToken(responseData.TOKEN);
                                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                            } else if (status == this._constantService.error_token) {
                                this.enaleaddpostBtn = true;
                                this.loader = false;
                                this.showText = true;
                                if (this.logout == false) {
                                    this.loader = false;
                                    this.showText = true;
                                    this.sessionLogout.emit(true);
                                }
                            } else {
                                this.loader = false;
                                this.showText = true;
                                this.enaleaddpostBtn = true;
                                this.alertMsg['msg'] = "Error";
                                this.alertMsg['type'] = 2;
                                this.alertMsg['error_msg'] = responseData.ERROR_MSG;
                                this.alert = true;
                            }
                        }, error => {
                            var responseData = error;
                            if (responseData.status == 500) {
                                this._router.navigate(['500']);
                            }
                        });
                    }
                    this.attmptHour = ``;
                    this.attmptMin = ``;
                    //this.selectedQuestionType = `Multiple choice`;
                } else {
                    this.loader = false;
                    this.showText = true;
                }
            }
        }
    }


    checkLink(event) {
        this.textAreaPostDataElement = document.getElementById('postData');
        this.textAreaPostDataElement.style.height = 'auto';
        this.textAreaPostDataElement.style.height = this.textAreaPostDataElement.scrollHeight + 'px';
        if (event.keyCode === 32) {
            if (this.ret == 0) {
                var text = (<HTMLTextAreaElement>document.getElementById('postData')).value.replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/\uFFFD/g, '').replace(/‘|’|‘’/g, "").trim();
                // var showText = "<a href='" + text + "'>'" + text + "'</a>";
                text = text.replace(/<br>/g, " <br> ");
                var arr = text.split(' ');
                var i = 0;
                var videoLink = "";
                for (i; i < arr.length; i++) {
                    if (!this.linkPresent && !this.youtubeLinkPresent && !this.vimeoLinkPresent) {
                        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
                        var vimeoRegEx = /^(http:\/\/|https:\/\/)(vimeo\.com)\/([\w\/]+)([\?].*)?$/;
                        if (regExp.exec(arr[i])) {
                            this.youtubeLink = arr[i];
                            this.youtubeLinkPresent = true;
                            this.linkPresent = false;
                            var match = arr[i].match(regExp);
                            if (match && match[2].length == 11) {
                                videoLink = match[2];
                                //                                this.post_data.linkActivate(videoLink);
                            }
                        } else if (vimeoRegEx.exec(arr[i])) {
                            this.vimeoLinkPresent = true;
                            this.vimeoLink = arr[i];
                            var arrtyp = arr[i].split("/");
                            videoLink = arrtyp[arrtyp.length - 1];
                            //                            if (match) {
                            //                                videoLink = match[match.length-1];
                            //                            }
                        } else if (this._constantService.url_pattern.exec(arr[i])) {
                            this.linkPresent = true;
                            this.youtubeLinkPresent = false;
                            this.shareLink = arr[i].trim();
                        }
                    }
                }

                if (this.youtubeLinkPresent) {
                    this.ret = 1;
                    //                    this.linkPresent=true;
                    this.linkPreview = 1;
                    this.getYoutubeData(videoLink);

                }
                if (this.vimeoLinkPresent) {
                    this.ret = 1;
                    this.getVimeoData(videoLink)
                }
                if (this.linkPresent) {
                    this.ret = 1;
                    this.getLinkData(this.shareLink);

                }
            }
        }

    }

    getLinkData(link: string) {
        var linkData = {};
        linkData['token'] = this._constantService.getSessionDataBYKey('token');
        linkData['token_param'] = {};
        linkData['token_param']['device_type'] = 'w';
        linkData['token_param']['host'] = '';
        linkData['link'] = link.trim();



        this._constantService.fetchDataApi(this._constantService.getLinkDataServiceUrl(), linkData).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status === 'success') {
                this.linkPreview = 2;
                this.show_image = 1;
                this.linkPresent = true;
                this.linkImage = responseData.SHARE_LINK_IMAGE

                this.linkAttrTitle = responseData.SHARE_LINK_TITLE;
                this.linkAttrDesc = responseData.SHARE_LINK_DESCRIPTION;

                if (responseData.SHARE_LINK_TITLE.length > 100) {
                    this.linkTitle = responseData.SHARE_LINK_TITLE.slice(0, 100) + "...";
                } else {
                    this.linkTitle = responseData.SHARE_LINK_TITLE;
                }
                if (responseData.SHARE_LINK_DESCRIPTION.length > 150) {
                    this.linkDescription = responseData.SHARE_LINK_DESCRIPTION.slice(0, 150) + "...";
                } else {
                    this.linkDescription = responseData.SHARE_LINK_DESCRIPTION;
                }
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
            } else if (status === 'error') {

                this.linkPresent = false;
                this.shareLink = "";
                this.ret = 0;
                this.linkPreview = 1;
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    updateSourcePic(event) {
        this.linkImage = "";
    }

    getYoutubeData(link) {

        //var url2 = "https://gdata.youtube.com/feeds/api/videos/"+link+"?v=2&alt=json&orderby=published&prettyprint=true"
        //var url = "https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=" + link + "&format=json";
        var url3 = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + link + "&fields=items/snippet/title,items/snippet/description&key=AIzaSyDvBT5SIRntta660lUcTK85ryaSIZQwSI0"
        this._constantService.getDataApi(url3).subscribe(data => {
            this.videoId = link;
            var responseData: any = data;
            this.linkImage = "https://img.youtube.com/vi/" + link + "/maxresdefault.jpg";
            if (responseData['items'][0]) {
                this.linkAttrTitle = responseData['items'][0]['snippet']['title'];
                if (responseData['items'][0]['snippet']['title'].length > 100) {
                    this.linkTitle = responseData['items'][0]['snippet']['title'].slice(0, 100) + "...";
                } else {
                    this.linkTitle = responseData['items'][0]['snippet']['title'];
                }
            }
            this.linkPreview = 2;
            this.show_image = 1;
        });

    }

    getVimeoData(id) {
        var VIMEO_BASE_URL = "https://vimeo.com/api/oembed.json?url=https://vimeo.com/" + id;
        this._constantService.getDataApi(VIMEO_BASE_URL).subscribe(data => {
            var responseData: any = data;
            this.videoId = id;
            this.linkImage = responseData.thumbnail_url_with_play_button;
            this.linkTitle = responseData.title;
            this.linkPreview = 2;
            this.show_image = 1;
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    getUserInterest() {
        var usr_interest = {};
        usr_interest['token'] = this._constantService.getSessionDataBYKey('token');
        usr_interest['token_param'] = {};
        usr_interest['token_param']['device_type'] = 'w';
        usr_interest['token_param']['host'] = '';



        this._constantService.fetchDataApi(this._constantService.getUserInterestServiceUrl(), usr_interest).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.showPreloader = false;
                this.user_interest = responseData.INTEREST_ID;
                var usrInt = [];
                for (var i = 0; i < this.user_interest.length; i++) {
                    usrInt.push(this.user_interest[i].INTEREST_ID);
                    this.user_interest[i].STATUS = true;
                }
                this._constantService.setUserInterest(usrInt.length.toString());
                this._constantService.setSessionJsonPair('user_interest_id', usrInt.join());
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                setTimeout(() => {
                    if (this._router.url.split('/')[1] != 'page') {
                        this.removeIntrest();
                        this.latestPostInterest();
                    } else {
                        if (this.pageInterest != undefined) {
                            var interestall = JSON.parse(this._constantService.getSessionDataBYKey('interests'));
                            this.user_interest = [];
                            for (var j = 0; j < this.pageInterest.length; j++) {
                                var obj = { "STATUS": true, "INTEREST_ID": this.pageInterest[j], "INTEREST_NAME": interestall[this.pageInterest[j]] };
                                this.user_interest.push(obj);
                            }
                            this.latestPostInterest();
                        }
                    }
                }, 100);
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
                this.showPreloader = false;

            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    showwalldropdown() {
        this.walldropdown = !this.walldropdown;
    }

    closewalldropdown() {
        this.walldropdown = false;
    }

    shwwalltags() {

        var found = this.user_interest.some(function (el) {
            return el.STATUS === true;
        });
        if (found) {
            this.shwwallshowInterest = !this.shwwallshowInterest;
        }
    }


    timer_switch() {
        this.question_timer = !this.question_timer;

    }


    getQuestionTextToSave() {
        if ((<HTMLElement>document.getElementById("q_text")).innerText != null) {
            var postData = (<HTMLElement>document.getElementById("q_text")).innerHTML.replace(/&nbsp;/g, " ");
            postData = this.post_data.postDataManipulation("q_text");
            var que_text_data = this.post_data.encodeURIPostData(postData);
            return que_text_data;
        }
    }

    getOption1TextToSave() {
        var postData = this.post_data.postDataManipulation("opt1_text");
        var opt_1_text_data = this.post_data.encodeURIPostData(postData);
        return opt_1_text_data;
    }

    getOption2TextToSave() {
        var postData = this.post_data.postDataManipulation("opt2_text");
        var opt_2_text_data = this.post_data.encodeURIPostData(postData);
        return opt_2_text_data;


    }

    getOption3TextToSave() {
        var postData = this.post_data.postDataManipulation("opt3_text");
        var opt_3_text_data = this.post_data.encodeURIPostData(postData);
        return opt_3_text_data;
    }

    getOption4TextToSave() {
        var postData = this.post_data.postDataManipulation("opt4_text");
        var opt_4_text_data = this.post_data.encodeURIPostData(postData);
        return opt_4_text_data;
    }

    getOption5TextToSave() {
        var postData = this.post_data.postDataManipulation("opt5_text");
        var opt_5_text_data = this.post_data.encodeURIPostData(postData);
        return opt_5_text_data;
    }


    getOption6TextToSave() {
        var postData = this.post_data.postDataManipulation("opt6_text");
        var opt_6_text_data = this.post_data.encodeURIPostData(postData);
        return opt_6_text_data;
    }


    handleClick(event) {
        var clickedComponent = event.target;
        var headerInside = 0;
        var visible = 0;
        do {
            if (this.showglow) {
                if (this.interest != undefined) {
                    if (clickedComponent === this.interest.nativeElement) {
                        headerInside = 1;
                    }
                }
            }
            if (this.visibility != undefined) {
                if (clickedComponent === this.visibility.nativeElement) {
                    visible = 1;
                }
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (headerInside != 1) {
            this.showInterest = false;
        }
        if (visible != 1) {

        }
    }


    showlable() {
        this.tymlable.nativeElement.style.display = "block";
        this.tymlable1.nativeElement.style.display = "block";
        this.focustime.nativeElement.style.letterSpacing = "1.5px";
        this.timePlaceholder = "      ";
    }

    hidelable() {
        if (this.focustime.nativeElement.value) {
            this.tymlable.nativeElement.style.display = "block";
            this.tymlable1.nativeElement.style.display = "block";
            this.timePlaceholder = "HH:MM";
        }
        else {
            this.tymlable.nativeElement.style.display = "none";
            this.tymlable1.nativeElement.style.display = "none";
            this.timePlaceholder = "HH:MM";
            this.focustime.nativeElement.style.letterSpacing = "0px";
        }
    }
    inputvalue() {
        this.focustime.nativeElement.style.value;

    }


    showPlaceHolder() {
        var data = <HTMLElement>document.getElementById("postData");
        var text = data.innerHTML.replace(/<br>/, "");
        if (data.innerHTML == "&zwnj;" || data.innerHTML == "" || data.innerHTML == "<br>") {
            this.show_placeholder = true;
            //data.innerText ="Discuss within your interest.";
            //this.check(e);
            //data.hideFocus = true;
        }
    }



    keydown(e) {
        if (e.keyCode == 13) {
            // insert 2 br tags (if only one br tag is inserted the cursor won't go to the second line)
            document.execCommand('insertHTML', false, '<br><br>');
            // prevent the default behaviour of return key pressed
            return false;
        }
    }
    OnFocus(event) {
        this.show_placeholder = false;
        (<HTMLInputElement>document.getElementById("postData")).focus();
        this.shadowglow = true;
    }

    @HostListener('document:click', ['$event'])
    clickout(event) {
        var placeHolder;
        if (this.shadow.nativeElement.contains(event.target)) {

        } else {
            this.shadowglow = false;
            placeHolder = (<HTMLInputElement>document.getElementById("postData"));
            if (placeHolder != undefined && placeHolder != null) {
                if ((placeHolder.innerText.length == 0 || placeHolder.innerText == "") && this.shadowglow == false) {
                    this.show_placeholder = true;
                }
            }
        }
        if (this.showInterest == true) {
            if (event.target.className == "darkbackground-close") {
                this.showInterest = false;
            }
        }

    }

    changeVisibility(id) {
        this.visibilityimg = "Public";
        this.pic = "public";
        // var add = "assets/images/svg-three/add_post/wall/";
        if (id == 3) {
            this.visibilityText = "Public";
            this.visibilityTyp = 3;
            this.pic = "public";
            this.visibilityimg = "Public";
        } else if (id == 2) {
            this.visibilityText = "Connections";
            this.visibilityTyp = 2;
            this.pic = "connection";
            this.visibilityimg = "connection";
        } else if (id == 1) {
            this.pic = "private_new";
            this.visibilityText = "Private";
            this.visibilityTyp = 1;
            this.pic = "private_new";
        }
    }


    getpageDetails(id) {
        var pageDetail = {};
        pageDetail['token'] = this._constantService.getSessionDataBYKey('token');
        pageDetail['token_param'] = {};
        pageDetail['token_param']['device_type'] = 'w';
        pageDetail['token_param']['host'] = '';
        pageDetail['pg_uuid'] = id;



        this._constantService.fetchDataApi(this._constantService.getPageDetailsServiceUrl(), pageDetail).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == "success") {
                this.user_type = responseData.PAGE_ABOUT.USER_TYPE;

                this.pageData = responseData.PAGE_ABOUT;
                this.interest = responseData.PAGE_ABOUT.INTEREST;
                this.pageInterest = responseData.PAGE_ABOUT.INTEREST;
            } else if (status == "error_token") {

            } else {

            }
        })
    }
    shwpageint() {
        if (this.pageInt == true) {
            this.pgIntArr = JSON.parse(this._constantService.getSessionDataBYKey('interests'));
            for (var i = 0; i < this.pageInterest.length; i++) {
                for (var j = 0; j < this.pgIntArr.length; j++) {
                    if (this.pageInterest[i] == this.pgIntArr[j]) {
                        this.arrr.push(this.pgIntArr[i]);
                    }
                }
            }

        }
    }

    onPasteTesting(event) {
        this.post_data.removeUnwantedContent('postData');
        setTimeout(() => {
            var data = document.getElementById('postData').innerHTML;
            var StrippedString = data.replace(/(<([^>]+)>)/ig, "");


            $("#postData").find("*").not("span,br").each(function () {
                $(this).replaceWith(this.innerHTML);
            });

            $("#postData").find("*").not(".s247,br").each(function () {
                $(this).replaceWith(this.innerHTML);
            });

            document.getElementById('postData').innerHTML = StrippedString;
        }, 2000);
    }

    pastedData(event) {
        this.show_placeholder = false;
        this.questionBlock = false;
        this.post_data.onPaste(event);
    }

    shoewmorewallint() {
        this.morewallint = !this.morewallint;
    }

    onactive(index) {
        this.quesactive = index;
    }

    showArticleByPop() {
        this.seemoreint = false;
        this.selectedposttab = 1;
    }

    closePopup(event) {
        this.alert = false;
    }

    openHourList() {
        this.showHrDropList = true;
    }
    openMinList() {
        this.showMinDropList = true;
    }
    getDivId(event) {

    }

    removeSelIOption(id) {
        var index = this.multipleResponseAns.indexOf(id);
        this.multipleResponseAns.splice(index, 1);
    }

    moreint() {
        if (this.seemoreint == false) {
            this.seemoreint = true;
        }
        else {
            this.seemoreint = false;
        }

    }

    hidemoreint() {
        this.seemoreint = false;
    }

    enterplacehldr() {
        this.timePlaceholder = "      ";
    }
    leaveplacehldr() {
        this.timePlaceholder = "Ex: 23:59";

    }
    timefocus() {
        this.focustime.nativeElement.focus();

    }

    selectOption(hrs) {
        this.showHrDropList = false;
        this.hh = hrs;
        this.pholder = false
        this.attmptHour = hrs;
        if (hrs == '24') {
            this.mm = "00";
            this.attmptMin = "00";
        }
        if (this.hh != "HH" && this.mm != "MM") {
            this.questionduration = false;
        }
    }

    selectMinOption(mins) {
        this.showMinDropList = false;
        if (this.hh != "24") {
            this.mm = mins;
            this.attmptMin = mins
        }
        this.Minpholder = false
        if (this.hh != "HH" && this.mm != "MM") {
            this.questionduration = false;
        }
    }

    checkData(event) {
        if (event.target.textContent == "") {
            this.show_placeholder = true;
            this.shadowglow = false;
            this.showPlaceHolder();
        }
    }

    articleRoute() {
        //        console.log(window.location.href);
        //        let url = window.location.href;
        //        let isPage = url.includes('page');
        if (this.pageId) {
            this._router.navigate((['article/page/' + this.pageId]));
        } else {
            this._router.navigate((['article']));
        }
    }

    getUrl(index) {
        if (index != '') {
            var imgUrl = "url('" + index + "')";
            return imgUrl;
        }
        else {
            this.linkImage = "";
            return this.linkImage;
        }
    }

    onKey(event: any) {
        var values = event.target.value;
        values = values.replace(/\s/g, '');
        if (!isNaN(values)) {
            return;
        } else if (values) {
            this._constantService.showToast("Only numeric digits allowed", "", "2");

        }
    }
    ngOnDestroy() {
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }
    solutiontext($event) {
        this.solText = $event
    }

    clearPostImage() {

        this.show_image_question = 1;
        this.image_upload = null;
        this.file_type = null;
        this.loader = false;
        this.image_upload_question_url = "";
        this.changeDetecotor.detectChanges();

    }
}
