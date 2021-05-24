import {
  Component,
  OnInit,
  AfterViewInit,
  HostListener,
  ViewChild,
  ViewContainerRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";
import { ConstantService } from "./../../services/constant.service";
import { EncryptionService } from "./../../services/encryption.service";
import { PostdataService } from "./../../services/postdata.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DragulaService } from "ng2-dragula";
import { Subscription, BehaviorSubject } from "rxjs";
import {
  PerfectScrollbarDirective,
  PerfectScrollbarComponent,
} from "ngx-perfect-scrollbar";
import { Location } from "@angular/common";
// import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

declare var $: any;
import * as S3 from "aws-sdk/clients/s3";
import * as Quill from 'quill';


@Component({
  selector: "app-addcourse",
  templateUrl: "./addcourse.component.html",
  styleUrls: ["./addcourse.component.scss", "./coursepreview.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddcourseComponent implements OnInit, AfterViewInit {
  // model: NgbDateStruct;
  timeObj = { hour: 13, minute: 30 };
  refreshInterval: NodeJS.Timer;
  freeTrialEndDate: any = this._constantService.getDateFromMilliseconds(
    "yyyy-mm-dd",
    new Date().getTime()
  );
  freeTrialEndTime: any = "12:00";
  freeTrialStartTime: any = "12:00";
  freeTrialStartDate: any = this._constantService.getDateFromMilliseconds(
    "yyyy-mm-dd",
    new Date().getTime()
  );
  openDeleteConfirmation: boolean = false;
  contentInfoObj: {};
  buttonClicked: any = false;
  courseInt: any = [];
  interestObj: any;
  pageInterest: string;
  fileupldinprcss: boolean = true;
  UnderProcess: boolean = true;
  oneTimeBool: boolean = false;
  link: string;
  duration: any;
  time: number;
  jsonlist;
  showTagsInput: boolean = true;
  showThumbail: boolean = false;
  acknowledgeChecked: boolean = false;
  showpopup: boolean = false;
  show_placeholder2: boolean = true;
  unpublish: boolean = false;
  courseTypeForUnpublish: number = 0;
  Quiz_placeholder: boolean = true;
  show_placeholder: boolean = true;
  desableIcon: boolean = true;
  isQuizSummary: boolean;
  termOfUse: boolean = false;
  draftCourse: boolean = false;
  savedPageData: any;
  secWidth = 0;
  Editlesson_name: boolean = false;
  page_title: string = "";
  page_name: string = "";
  course_count: number = 0;
  follower_count: number = 0;
  sample: any;
  isSeeMoreMentor: boolean = true;
  pageId: string = "";
  profilePicPath: string = "";
  course_title: string = "Introduction to Chemistry: Reactions and Ratios";
  addDetails: boolean = true;
  courseId = "";
  libraryselect: boolean = false;
  showCoursePaid: boolean = false;
  activeCurriculum: boolean = false;
  dataUpload: boolean = false;
  uuid: string = "";
  coverPicPath = "";
  coverPicUploaded: boolean = false;
  courseTag = "";
  currency = [];
  addTest: boolean = false;
  courseDisPrice: string = "";
  coursePrice: string = "";
  openConfirmation: boolean = false;
  dataConf = {};
  courseCost = [];
  courseRenewableData = [];
  pageInterestList = [];

  file: any;
  file_name: string = "";
  video_free_popup: boolean = false;
  orgnl_file_name: string = "";
  pageData = {};
  contentId: string = "";
  sectionId = "";
  secName: string = "";
  sectionAdded: boolean = false;
  newSection: boolean = true;
  fileUpload: boolean = false;
  progress = 0;
  fileType = "";
  fileName = "ABC";
  sectionContent = [];
  selectedSectionIndex = 0;
  courseSection = [];
  showCourseInterestList: boolean = false;
  showConnections = false;
  connectionSearchData: any = {};
  connectionList: any = [];

  firstProcessLevel: boolean = false;
  secondProcessLevel: boolean = false;
  thirdProcessLevel: boolean = false;
  fourthProcessLevel: boolean = false;
  fifthProcessLevel: boolean = false;

  secondcurrentProcess: boolean = false;
  thirdcurrentProcess: boolean = false;
  fourthcurrentProcess: boolean = false;
  fifthcurrentProcess: boolean = false;

  preview: number = 1;
  deleteCourse: boolean = false;

  levelDropdown: boolean = false;
  langDropdown: boolean = false;
  courseLevel: string = "Select course level";
  courseLevelId: string = "";

  courseLang: string = "Select course language";
  courseLangId: string = "";
  videoLoader: boolean = true;
  library: boolean = false;
  config: any;
  image_gallery: boolean = false;
  uploadImgLoader: boolean = true;
  courseProcess: number = 1;
  courseyear: boolean = false;
  coursdays: boolean = false;
  c_month: number = 0;
  c_days: number = 0;
  c_currency: string = "INR";
  coursecurrency: boolean = false;
  courserenewable: boolean = false;
  c_renewable: string = "INR";
  deactivate: boolean = true;
  sectionNameEdit: boolean = false;
  editPdf: boolean = false;
  editvideo: boolean = false;
  addurl: boolean = false;
  videoedit: number = 0;
  activebutton: boolean = false;
  popuptab: number = 0;
  showlibrary: boolean = false;

  library_popup: boolean = false;
  coursePopup: boolean = false;
  courseSubsection: boolean = false;
  placeholderTextTitle: string =
    "Introduction to Chemistry: Reactions and Ratios";
  placeholderTextDesc: string =
    "Describe about your course content and its feature";

  nextButtonDisableTitle: boolean = true;
  titleMaxLength: number = 250;
  titleRemainingLength: number = 0;
  TitleReachedMax: boolean = false;
  contenteditable: boolean = false;
  titleInputClicked: boolean = false;
  descInputClicked: boolean = false;
  titlePlaceholder: boolean = true;
  descPlaceholder: boolean = true;
  warningTextClass: boolean = false;
  courseDesc: string = this.placeholderTextDesc;
  descRemainingLength: number = 0;
  descReachedMax: boolean = false;
  nextButtonDisableDesc: boolean = true;
  languageList = {};
  selectedLanguage: string = "";
  courseLevelList = [
    { levelId: "1", levelName: "Beginner Level" },
    { levelId: "2", levelName: "Intermediate Level" },
    { levelId: "3", levelName: "Advance Level" },
    { levelId: "4", levelName: "All Levels" },
  ];
  optionVal: string;
  selectedCourseLevel: string = "";
  dummyImagePath: string = "/assets/images/course_cover_pic_example.jpg";
  courseValidityCheck: boolean = false;
  coursePaymentCheck: boolean = false;
  courseRenewableCheck: boolean = false;
  courseRenewablePrice: string = "0";

  courseDownloadableCheck: boolean = true;
  courseDiscountEligibleCheck: boolean = false;
  validityPlaceHolder: string =
    "  If not checked your course <br>    will have <b>unlimited</b> validity";
  validityNote: string;
  tempCurrency = [];
  selectedCurrency = [];
  courseValidityDays: number = 0;
  courseCostTyp: string = "";
  public promoVideoPath = "";
  public promoVideoThumbnailPath = "";
  countRow: number = 1;
  courceDropDownVal: number = -1;
  courceCostlist = new Array({
    currenc_typ: "INR",
    cost: "",
    discount: "",
    r_costs: "0",
  });
  tempCourseListFromServer = new Array({
    currenc_typ: "",
    cost: "",
    discount: "",
    r_costs: "0",
  });
  courseContentSection = new Array({
    SECTION_UUID: "",
    SECTION_NAME: "",
    Sec_orderId: "",
    SECTION_CONTENT: [],
  });
  placeHolderSectionName =
    "Section Name (Ex.Physics Part 1, Advanced Mathematics)";
  placeholderSectionContent: boolean = true;
  SectionContentName: string = "";
  sectionEditButtonValue: number = -1;
  contentEditButtonValue: number = -1;
  addurlButtonValue: number = -1;
  uploadButtonValue: number = -1;
  onuploadvalue: number = -1;
  videoUploadedValue: number = -1;
  subscribe = new Subscription();
  editContentDataValue: number = -1;
  editContentDataSectionValue = -1;
  courseLibraryData = [];
  sectionContentLibraryData = [];
  AllContentOfLib = [];
  continueScrollForAllSectionLibrary: boolean = false;
  flowForAllCourseLibrary: number = 1;
  checkOpenSection: number = -1;
  @ViewChild("allSectionOfLibrary")
  componentForSectionLibrary: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective)
  directiveRef?: PerfectScrollbarDirective;
  selectedCorsIdForLibrary = "";
  selectedCourseNameforLibrary = "";
  currentSectionIndex = -1;
  isSearchedLib: boolean = false;
  keywordsCount: number = 0;
  blockClickRemovePicVid: boolean = false;
  selectedfromSectionLib = "";
  indexPosSectionLibrary;
  libraryCoverPath = [];
  currentDate = new Date();
  totalFreeCourse: number = 0;
  totalQuizCount: number = 0;
  totalPdfCount: number = 0;
  totalVideoCount: number = 0;
  totalLiveStreamCount: number = 0;
  mentorData = [];
  courseKeywords = "";
  previewActualPrice;
  previewDiscountPrice;
  testPending: boolean = false;
  isReportPopup: boolean = false;

  IsCourseReview: boolean = false;
  contentUUIDReport = "";
  imageForRejection = "";
  imageForRejectionPathToSend = "";
  rejectionuuid = "";
  rejectionReportStatus = "";
  reportMsgTrail = [
    {
      Name: "",
      ADDED_TYPE: "",
      TEXT: "",
      IMAGE_PATH: "",
      COURSE_REPORT_ATTACHMENT_UUID: "",
      UPDATE_DATE_TIME: "",
    },
  ];
  previewImage = "";
  dimentionForRejectedImage = "";
  step: number = 0.05;
  current_progress: number = 0;
  progressper: any = 0;
  progressStart: boolean = false;
  progressBar: number = 0;
  courseStatus: any;
  AcknowledgeMentStatus: number = 0;
  blockPointer = false;
  rejectionStatus;
  TitleContentPlaceHolder = "Enter Content Title";
  TitleContentVideoPlaceHolder = "Enter Content URL";
  courseContentRejected: boolean = false;
  placehoolderMsgRejectionTrail: string = "Something to send...";
  showPreloaderForRejectionAttachment: boolean = false;
  BlockLeftClick: boolean = false;
  languageFetched: boolean = false;
  setviewToLast: boolean = false;
  showLiveStreamPopup: boolean = false;
  showHourList: boolean = false;
  showMinList: boolean = false;
  showApproxList: boolean = false;
  embededCourseActive: boolean = false;
  courseUUID = "";
  minValDate;
  librarySearchString = "";
  newName = "";
  dateconfig = {
    firstDayOfWeek: "su",
    monthFormat: "MMM, YYYY",
    disableKeypress: false,
    allowMultiSelect: false,
    closeOnSelect: undefined,
    closeOnSelectDelay: 100,
    onOpenDelay: 0,
    weekDayFormat: "ddd",
    appendTo: document.body,
    drops: "up",
    opens: "right",
    showNearMonthDays: true,
    showWeekNumbers: false,
    enableMonthSelector: true,
    format: "YYYY-MM-DD HH:mm",
    yearFormat: "YYYY",
    showGoToCurrent: true,
    dayBtnFormat: "DD",
    monthBtnFormat: "MMM",
    hours12Format: "hh",
    hours24Format: "HH",
    meridiemFormat: "A",
    minutesFormat: "mm",
    minutesInterval: 1,
    secondsFormat: "ss",
    secondsInterval: 1,
    showSeconds: false,
    showTwentyFourHours: true,
    timeSeparator: ":",
    multipleYearsNavigateBy: 10,
    showMultipleYearsNavigation: false,
    locale: "en-us",
    min: "",
    // minTime:'2017-08-29 15:50'
  };

  freetrialdateconfig = {
    firstDayOfWeek: "su",
    monthFormat: "MMM, YYYY",
    disableKeypress: false,
    allowMultiSelect: false,
    closeOnSelect: undefined,
    closeOnSelectDelay: 100,
    onOpenDelay: 0,
    weekDayFormat: "ddd",
    appendTo: document.body,
    drops: "up",
    opens: "right",
    showNearMonthDays: true,
    showWeekNumbers: false,
    enableMonthSelector: true,
    format: "YYYY-MM-DD",
    yearFormat: "YYYY",
    showGoToCurrent: false,
    dayBtnFormat: "DD",
    monthBtnFormat: "MMM",
    hours12Format: "hh",
    hours24Format: "HH",
    meridiemFormat: "A",
    minutesFormat: "mm",
    minutesInterval: 1,
    secondsFormat: "ss",
    secondsInterval: 1,
    showSeconds: false,
    showTwentyFourHours: true,
    timeSeparator: ":",
    multipleYearsNavigateBy: 10,
    showMultipleYearsNavigation: false,
    locale: "en-us",
    min: "",
    // minTime:'2017-08-29 15:50'
  };
  isTrialCheck: boolean = false;
  showFreeTrial: boolean = false;
  setCourseUrl: string;
  isFreeTrialList: boolean = false;
  trialType: number = 1;
  freeTrialDays = 0;
  isEmptyState: boolean = false;
  isEmptyState1: boolean = false;
  publishvalue: number = 99;
  mentorUrl: any = "";
  showMentorUrlInput = true;
  disableScheduleStream: boolean;
  selectedConnection: any;
  lastVerticalScrollPosition: number;
  stopScroll: boolean = false;
  quiz_unsaved_name: string;
  quiz_saved: boolean;
  leftFilterMenu: boolean = false;
  cardevent: boolean = false;
  isEditable: any;
  crrprVal: number;
  quillEditor: any;
  toolbarOptions = {
    container: [
      ['bold', 'italic'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ]
  };
  descriptionTextLength: any;

  constructor(
    private cd: ChangeDetectorRef,
    public _constantService: ConstantService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public _encrypt: EncryptionService,
    public postData: PostdataService,
    public resolver: ViewContainerRef,
    public dragulaService: DragulaService,
    private location: Location
  ) {
    this.sample = this._constantService.getSessionDataBYKey("page_details");
    if (this.sample) {
      this.sample = JSON.parse(this.sample);
    }
    if (this.sample == null) {
      this.router.navigate([""]);
    } else {
      this.page_title = this.sample["PAGE_TITLE"];
      this.pageId = this.sample["PAGE_ID"];
      this.pageData["PAGE_UUID"] = this.sample["PAGE_ID"];
      this.pageData["COURSE_UUID"] = this.courseId;
      this.pageData["SECTION_UUID"] = this.sectionId;
      this.pageData["COURSE_TITLE"] = this.course_title;
      this.AcknowledgeMentStatus = this.sample["ACKNOWLEDGEMENT"];

      if (
        this.sample["PROFILE_PHOTO_PATH"] != null &&
        this.sample["PROFILE_PHOTO_PATH"] != ""
      ) {
        this.profilePicPath =
          this.sample["PROFILE_PHOTO_PATH"] +
          "profile/" +
          this.pageId +
          "_120x120.png";
      } else {
        this.profilePicPath = this._constantService.defaultPageIndImgPath;
      }
    }
    dragulaService.createGroup("section", {
      removeOnSpill: false,
      revertOnSpill: true,

      moves: (el, container, handle) => {
        //  console.log( handle.getAttribute("name"));
        //  var name  =  handle.getAttribute("name");

        var element = document.getElementById(handle.getAttribute("name"));
        // console.log(handle.localName);
        if (
          handle.className == "a_c_editpic middleAlign" &&
          element.classList.contains("content_wrapper_height")
        ) {
          return true;
        }
        return false;
      },
      //            // ignoreInputTextSelection: true,
    });

    this.subscribe.add(
      dragulaService.drop("section").subscribe(() => {
        this.updateSectionOrder();
      })
    );
  }

  enableEditorQuill() {
    if (!document.getElementById('editor')) {
      setTimeout(() => {
        this.enableEditorQuill();
      }, 500);
    } else if (!this.quillEditor) {
      try {
        this.quillEditor = new Quill('#editor', {
          modules: {
            toolbar: this.toolbarOptions,
            table: false

          },

          readOnly: false,
          placeholder: 'Describe about your course content and its feature.',
          theme: 'snow'
        });

        //                const tableModule = this.quillEditor.getModule('better-table');

        var tooltip = this.quillEditor.theme.tooltip;
        var input = tooltip.root.querySelector('input[data-link]');
        input.dataset.link = 'www.study24x7.com';



      } catch {
        setTimeout(() => { this.enableEditorQuill(); }, 200);
        // this.enableEditorQuill();
      }

      //          this.quillEditor.on('text-change', this.updateContent())
    }


  }
  seeMoreMentor() {
    this.isSeeMoreMentor = false;
  }

  setInterest(tag_id) {
    for (var i = 0; i < this.pageInterestList.length; i++) {
      if (this.pageInterestList[i].id == tag_id) {
        this.pageInterestList[i].status = "true";
      }
    }
  }

  ngOnInit() {
    this.enableEditorQuill();
    var scriptCkeditor = document.createElement("script");
    scriptCkeditor.type = "text/javascript";
    scriptCkeditor.src = "ckeditor/ckeditor.js"; //to run on live uncomment this
    // scriptCkeditor.src="http://192.168.0.228/dist/ckeditor/ckeditor.js"; //to run on local uncomment this
    document.getElementsByTagName('body')[0].appendChild(scriptCkeditor);
    this.languageFetched = false;
    this.getCurrency();
    this.getAllLanguage();
    this.checkScreenWidth();
    //        this.getPageIntFxn();
    //        this.pageInterest = this._constantService.getSessionDataBYKey('pgInterest');
    var interestObj = JSON.parse(
      this._constantService.getSessionDataBYKey("interests")
    );
    var count = 0;
    this.pageInterestList.length = 0;
    console.log("aaaaaa", interestObj);

    for (let key in interestObj) {
      var intPair = {};
      intPair["id"] = key;
      intPair["name"] = interestObj[key];
      intPair["status"] = true;
      this.pageInterestList.push(intPair);
    }
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.enableEditorQuill();
    // }, 200);
    // this.enableEditorQuill();
    this.secWidth = document.getElementById("left-side-bar").offsetWidth;
    this.secWidth = this.secWidth - 30;

    this.activatedRoute.params.subscribe((params: Params) => {
      if (params["id"] != null) {
        this.draftCourse = true;
        this.setviewToLast = true;
        this.getCourseDetails(params["id"]);
        this.courseUUID = params["id"];
        setTimeout(() => {
          this.setviewToLast = false;
        }, 1000);
      } else {
        this.draftCourse = false;
      }
    });

    this.minValDate = this.miliSecTodateConvertar(Date.now());
    this.dateconfig["minDate"] = (() => {
      var date = new Date(this.minValDate); // M-D-YYYY
      var d = date.getDate() + 1;
      var m = date.getMonth() + 1;
      var y = date.getFullYear();

      var dateString =
        y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);
      this.dateconfig["min"] = dateString;
    })();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.dragulaService.destroy("section");
  }

  refresh() {
    this.cd.detectChanges();
  }

  library_show() {
    this.libraryselect = true;
    let body = document.getElementsByTagName("body")[0];
    body.classList.add("body-overflow");
  }
  library_hide(lib_hide) {
    this.libraryselect = lib_hide;
    let body = document.getElementsByTagName("body")[0];
    body.classList.remove("body-overflow");
  }

  addTestShow() {
    //        if(this.sectionAdded){
    this.pageData["updateStatus"] = false;
    this.addTest = true;

    //        }
  }

  //=========================course title =================================
  titleInput() {
    if (
      !this.titleInputClicked &&
      document.getElementById("course_title").innerText ===
      this.placeholderTextTitle
    ) {
      this.titleInputClicked = true;
      this.course_title = "";
      document.getElementById("course_title").innerText = "";
      this.titlePlaceholder = false;
    }
  }

  check() {
    if (
      document.getElementById("course_title").innerText ===
      this.placeholderTextTitle
    ) {
      this.course_title = "";
      document.getElementById("course_title").innerText = "";
      this.titlePlaceholder = false;
    }
  }

  onKeyUpTitle() {
    this.course_title = document.getElementById("course_title").innerText;
    //        this.course_title  = this.course_title.toString().trimRight();
    this.titleRemainingLength = this.course_title.trim().length;
    if (this.titleRemainingLength >= 250) {
      // this.nextButtonDisableTitle = true;
      this.warningTextClass = true;
    } else if (this.course_title.length > 6) {
      // this.nextButtonDisableTitle = false;
      this.warningTextClass = false;
      if (this.course_title.length < 1 || this.course_title == "") {
        this.titlePlaceholder = true;
        //document.getElementById('course_title').innerText= "Introduction to Chemistry: Reactions and Ratios";
      } else {
        this.titlePlaceholder = false;
      }
    } else {
      // this.nextButtonDisableTitle = true;
      this.warningTextClass = false;
      if (this.course_title.length < 1 || this.course_title == "") {
        this.titlePlaceholder = true;
        //document.getElementById('course_title').innerText= "Introduction to Chemistry: Reactions and Ratios";
      } else {
        this.titlePlaceholder = false;
        this.titleInputClicked = false;
      }
    }
  }

  validateProcess1next() {
    if (this.course_title.trim().length < 6) {
      this.dataConf["type"] = 2;
      this.dataConf["msg"] = "STUDY24X7";
      this.dataConf["error_msg"] = "Please enter minimum 6 characters.";
      this.openConfirmation = true;
      return false;
    }
    if (this.course_title.trim().length > 250) {
      this.dataConf["type"] = 2;
      this.dataConf["msg"] = "STUDY24X7";
      this.dataConf["error_msg"] = "Please enter maximum 250 characters.";
      this.openConfirmation = true;
      return false;
    }
    if (
      this.course_title == this.placeholderTextTitle ||
      this.course_title == ""
    ) {
      this.dataConf["type"] = 2;
      this.dataConf["msg"] = "STUDY24X7";
      this.dataConf["error_msg"] = "Please enter the title.";
      this.openConfirmation = true;
      return false;
    }
    return true;
  }

  focusoutFromTitle() {
    if (
      (!this.draftCourse && this.titlePlaceholder) ||
      document.getElementById("course_title").innerText == ""
    ) {
      document.getElementById(
        "course_title"
      ).innerText = this.placeholderTextTitle;
      this.titleInputClicked = false;
      this.titlePlaceholder = true;
    }
  }

  createCourse() {
    if (this.buttonClicked) {
      return false;
    } else {
      this.buttonClicked = true;
      var courseAdd = {};
      courseAdd["token"] = this._constantService.getSessionDataBYKey("token");
      courseAdd["token_param"] = {};
      courseAdd["token_param"]["device_type"] = "w";
      courseAdd["token_param"]["host"] = "";
      courseAdd["pg_uuid"] = this._constantService.getSessionDataBYKey(
        "page_id_course"
      );
      if (this.titlePlaceholder) {
        this.dataConf["type"] = 2;
        this.dataConf["msg"] = "STUDY24X7";
        this.dataConf["error_msg"] =
          "Please provide an acceptable course title.";
        this.openConfirmation = true;
        this.buttonClicked = false;
        return false;
      } else if (this.course_title.trim().length > 250) {
        this.dataConf["type"] = 2;
        this.dataConf["msg"] = "STUDY24X7";
        this.dataConf["error_msg"] =
          "Please provide course title in acceptable character limit.";
        this.openConfirmation = true;
        this.buttonClicked = false;

        return false;
      } else if (
        this.postData.encodeURIPostData(this.course_title.trim()).length < 6
      ) {
        this.dataConf["type"] = 2;
        this.dataConf["msg"] = "STUDY24X7";
        this.dataConf["error_msg"] = "Please enter minimum 6 characters";
        this.openConfirmation = true;
        this.buttonClicked = false;

        return false;
      } else {
        courseAdd["cors_title"] = this.postData.encodeURIPostData(
          this.course_title
        );
      }
      courseAdd["p_type"] = this.coursePackageType;
      if (this.coursePackageType == 0) {
        this.regularCourse = true;
        this.streamCourse = false;
        this.regularStreamCourse = false;
      } else if (this.coursePackageType == 1) {
        this.streamCourse = true;
        this.regularCourse = false;
        this.regularStreamCourse = false;
      } else if (this.coursePackageType == 2) {
        this.regularStreamCourse = true;
        this.regularCourse = false;
        this.streamCourse = false;
      }

      this._constantService
        .fetchDataApi(
          this._constantService.getCourseCreateServiceUrl(),
          courseAdd
        )
        .subscribe(
          (data) => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
              this.buttonClicked = false;
              this.courseId = responseData.COURSE_UUID;
              this.pageData["COURSE_TITLE"] = this.course_title;
              this.pageData["COURSE_UUID"] = responseData.COURSE_UUID;

              this.course_count += 1;
              //this._constantService.setToken(responseData.TOKEN);
              this._constantService.setSessionJsonPair(
                "token",
                responseData.TOKEN
              );
              this.getCourseDetails(this.courseId);
              this.firstProcessLevel = true;
              this.secondcurrentProcess = true;
              this.courseProcess = 2;
              setTimeout(() => {
                this.enableEditorQuill();
              }, 500);

              this.refresh();
              // this.router.navigate(['addcourse/' + this.pageData['COURSE_UUID']]);
              this.location.go("addcourse/" + this.pageData["COURSE_UUID"]);
              this.draftCourse = true;
            } else {
              this.dataConf["type"] = 2;
              this.dataConf["msg"] = "STUDY24X7";
              this.dataConf["error_msg"] = responseData.ERROR_MSG;
              this.openConfirmation = true;
              this.buttonClicked = false;
            }
          },
          (error) => {
            var responseData = error;
            if (responseData.status == 500) {
              this.router.navigate(["500"]);
            }
          }
        );
    }
  }

  updateCourseTitle() {
    if (this.validateProcess1next()) {
      var updCourseTitle = {};
      updCourseTitle["token"] = this._constantService.getSessionDataBYKey(
        "token"
      );
      updCourseTitle["token_param"] = {};
      updCourseTitle["token_param"]["device_type"] = "w";
      updCourseTitle["token_param"]["host"] = "";
      updCourseTitle["pg_uuid"] = this.pageId;
      updCourseTitle["cors_title"] = this.postData.encodeURIPostData(
        this.course_title
      );
      updCourseTitle["cors_uuid"] = this.courseId;
      updCourseTitle["p_type"] = this.coursePackageType;

      this._constantService
        .fetchDataApi(
          this._constantService.getCourseTitleUpdateServiceUrl(),
          updCourseTitle
        )
        .subscribe(
          (data) => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
              this.pageData["COURSE_TITLE"] = this.course_title;
              this._constantService.setSessionJsonPair(
                "token",
                responseData.TOKEN
              );
              this.getCourseDetails(this.courseId);
              this.firstProcessLevel = true;
              this.courseProcess = 2;
              setTimeout(() => {
                if (this.courseProcess == 2)
                  this.enableEditorQuill();
              }, 1000);
              this.secondcurrentProcess = true;
              this.refresh();
              return true;
            } else if (status == this._constantService.error_token) {
              this.dataConf["type"] = 4;
              this.dataConf["msg"] = "Session Expire";
              this.dataConf["error_msg"] = "Session Expired!";
              this.openConfirmation = true;
              return false;
            } else {
              this.dataConf["type"] = 2;
              this.dataConf["msg"] = "Error";
              this.dataConf["error_msg"] = responseData.ERROR_MSG;
              this.openConfirmation = true;
              return false;
            }
          },
          (error) => {
            var responseData = error;
            if (responseData.status == 500) {
              this.router.navigate(["500"]);
            }
            return false;
          }
        );
    } else {
      return false;
    }
  }
  //=====================cource title ends============================//

  //=====================course description starts====================//

  getLibraryCoverPics() {
    this.libraryCoverPath.length = 0;
    for (var i = 1; i < 18; i++) {
      if (i < 10)
        this.libraryCoverPath.push({
          libCpic: this._constantService.libraryBucketPath + "0" + i + ".jpg",
        });
      if (i >= 10)
        this.libraryCoverPath.push({
          libCpic: this._constantService.libraryBucketPath + i + ".jpg",
        });
    }
  }

  // descInput() {
  //   if (
  //     !this.descInputClicked &&
  //     document.getElementById("course_Desc").innerText ===
  //     this.placeholderTextDesc
  //   ) {
  //     this.descInputClicked = true;
  //     this.courseDesc = "";
  //     document.getElementById("course_Desc").innerText = "";
  //     this.descPlaceholder = false;
  //   }
  // }

  // check_desc() {
  //   if (
  //     document.getElementById("course_Desc").innerText ===
  //     this.placeholderTextDesc
  //   ) {
  //     this.courseDesc = "";
  //     document.getElementById("course_Desc").innerText = "";
  //     this.descPlaceholder = false;
  //   }
  // }

  closedPopup($event) {
    this.openConfirmation = false;
  }

  validateCourseDescription() {
    var intArr = [];
    this.pageInterestList.forEach((obj) => {
      if (!obj.status) {
        intArr.push(obj.id);
      }
    });
    if (intArr.length == 0) {
      this.dataConf["type"] = 2;
      this.dataConf["msg"] = "STUDY24X7";
      this.dataConf["error_msg"] = "Please add atleast one course interest.";
      this.openConfirmation = true;
      return false;
    } else {
      this.updateCourseInterestFxn();
    }

    if (
      this.courseDesc.length < 6 ||
      this.courseDesc == this.placeholderTextDesc
    ) {
      this.dataConf["type"] = 2;
      this.dataConf["msg"] = "STUDY24X7";
      this.dataConf["error_msg"] =
        "Please enter minimum 6 characters in description.";
      this.openConfirmation = true;
      return false;
    } else if (this.quillEditor.root.innerText.length > 1000) {
      this.dataConf["type"] = 2;
      this.dataConf["msg"] = "STUDY24X7";
      this.dataConf["error_msg"] =
        "Please enter maximum 1000 characters in description.";
      this.openConfirmation = true;
      return false;
    } else if (this.courseLangId == "") {
      this.dataConf["type"] = 2;
      this.dataConf["msg"] = "STUDY24X7";
      this.dataConf["error_msg"] = "Please select a valid language.";
      this.openConfirmation = true;
      return false;
    } else if (this.courseLevelId == "") {
      this.dataConf["type"] = 2;
      this.dataConf["msg"] = "STUDY24X7";
      this.dataConf["error_msg"] = "Please select a valid course level.";
      this.openConfirmation = true;
      return false;
    } else if (this.coverPicPath == "") {
      this.dataConf["type"] = 2;
      this.dataConf["msg"] = "STUDY24X7";
      this.dataConf["error_msg"] = "Please add a cover pic.";
      this.openConfirmation = true;
      return false;
    }
    return true;
  }
  courseOnPasteDesc;
  isByPaste: boolean = false;

  // setDisData(event: ClipboardEvent) {
  //   event.preventDefault();
  //   let clipboardData = event.clipboardData || (<any>window).clipboardData;
  //   this.courseOnPasteDesc = clipboardData.getData("text");
  //   this.isByPaste = true;
  //   this.postData.onPastepreventDefault(this.courseOnPasteDesc, "course_Desc");
  //   this.onKeyUpDesc();
  // }

  onKeyUpDesc() {
    this.descriptionTextLength = this.quillEditor.root.innerText.length;
    if (this.isByPaste) {
      this.courseDesc = this.courseOnPasteDesc;
      this.isByPaste = false;
    } else {
      this.courseDesc = this.quillEditor.root.innerHTML;
      this.isByPaste = false;
    }
    this.descRemainingLength = this.courseDesc.length;
    if (this.descriptionTextLength > 1000) {
      this.warningTextClass = true;
      // this.nextButtonDisableDesc = true;
    } else if (this.courseDesc.length > 2) {
      // this.nextButtonDisableDesc = false;
      this.warningTextClass = false;
      if (this.courseDesc.length < 1 || this.courseDesc == "") {
        this.descPlaceholder = true;
        //document.getElementById('course_title').innerText= "Introduction to Chemistry: Reactions and Ratios";
      } else {
        this.descPlaceholder = false;
      }
    } else {
      this.warningTextClass = false;
      if (this.courseDesc.length < 1 || this.courseDesc == "") {
        this.descPlaceholder = true;
        //document.getElementById('course_title').innerText= "Introduction to Chemistry: Reactions and Ratios";
      } else {
        this.descPlaceholder = false;
        this.descInputClicked = false;
      }
    }
  }

  focusoutFromDesc() {
    if (this.courseDesc == "") {
      this.quillEditor.root.innerHTML = this.placeholderTextDesc;
      this.descInputClicked = false;
      this.descPlaceholder = true;
    } else {
      if (
        document.getElementById("editor").innerText.length > 3 &&
        document.getElementById("editor").innerText.length < 1000
      ) {
        this.updateCourseDesc();
      }
    }
  }
  src: string = "";

  getLibraryImg(index) {
    this.src = index;
    //this.selectedGalleryImage();
  }

  selectedGalleryImage() {
    if (this.src == "") {
      return false;
    }
    this.image_gallery = !this.image_gallery;
    this.coverPicPath = this.src;
    let body = document.getElementsByTagName("body")[0];
    body.classList.remove("body-overflow");
    var token = {};
    token["token"] = this._constantService.getSessionDataBYKey("token");
    token["token_param"] = {};
    token["token_param"]["device_type"] = "w";
    token["token_param"]["host"] = "";
    var data = JSON.stringify(token);
    var encData = this._encrypt.encryptutf8(data);
    var formdata = new FormData();
    formdata.append("token", encData);
    formdata.append("file", "");
    formdata.append("type", "cors_cp");
    formdata.append("cors_uuid", this.courseId);
    formdata.append("pg_uuid", this.pageId);
    formdata.append("cover_type", "1");
    formdata.append("path", this.src);
    var date = new Date();
    this._constantService
      .uploadFileApi(
        this._constantService.getCourseCoverPicUploadServiceUrl(),
        formdata
      )
      .subscribe(
        (data) => {
          var responseData: any = data;
          var status = responseData.STATUS;
          if (status == this._constantService.success_msg) {
            this.src = "";
            this.coverPicPath =
              responseData.FPATH + "?v=" + responseData.IMG_UPD_DT;
            this.coverPicUploaded = true;
          }
        },
        (error) => {
          var responseData = error;
          if (responseData.status == 500) {
            this.router.navigate(["500"]);
          }
        }
      );
  }

  uploadCoverPic1(event) {
    var file = event["image"];
    var token = {};
    token["token"] = this._constantService.getSessionDataBYKey("token");
    token["token_param"] = {};
    token["token_param"]["device_type"] = "w";
    token["token_param"]["host"] = "";
    var data = JSON.stringify(token);
    var encData = this._encrypt.encryptutf8(data);
    var formdata = new FormData();
    formdata.append("token", encData);
    formdata.append("file", file);
    formdata.append("type", "cors_cp");
    formdata.append("cors_uuid", this.courseId);
    formdata.append("pg_uuid", this.pageId);
    formdata.append("cover_type", "0");
    formdata.append("path", "");
    var date = new Date();
    this._constantService
      .uploadFileApi(
        this._constantService.getCourseCoverPicUploadServiceUrl(),
        formdata
      )
      .subscribe(
        (data) => {
          var responseData: any = data;
          var status = responseData.STATUS;
          if (status == this._constantService.success_msg) {
            this.coverPicPath =
              responseData.FPATH +
              "cover/" +
              this.courseId +
              "_1235x330.png?v=" +
              responseData.IMG_UPD_DT;
            this.coverPicUploaded = true;
          } else if (status == this._constantService.error_token) {
            this.dataConf["type"] = 4;
            this.dataConf["msg"] = "Session Expire";
            this.dataConf["error_msg"] = "Session Expired!";
            this.openConfirmation = true;
            return false;
          } else {
            this.dataConf["type"] = 2;
            this.dataConf["msg"] = "Error";
            this.dataConf["error_msg"] = responseData.ERROR_MSG;
            this.openConfirmation = true;
            return false;
          }
        },
        (error) => {
          var responseData = error;
          if (responseData.status == 500) {
            this.router.navigate(["500"]);
          }
        }
      );
  }

  opencover(event) {
    this.showpopup = false;
    if (event["status"]) {
      if (event["image"] == undefined) {
        return false;
      }
      this.coverPicPath = event["image"];
      fetch(event["image"])
        .then((res) => res.blob())
        .then((blob) => {
          event["image"] = blob;
          this.uploadCoverPic1(event);
        });
    }
  }
  uploadCoverPic() {
    this.showpopup = !this.showpopup;
    // this.crrprVal=1;
  }

  uploadPromoVideo(event) {
    var file = event.target.files[0];
    if (file.size / 1000 / 1000 < 50) {
      var token = {};
      token["token"] = this._constantService.getSessionDataBYKey("token");
      token["token_param"] = {};
      token["token_param"]["device_type"] = "w";
      token["token_param"]["host"] = "";
      var data = JSON.stringify(token);
      var encData = this._encrypt.encryptutf8(data);
      var formdata = new FormData();
      formdata.append("token", encData);
      formdata.append("file", file);
      formdata.append("type", "cors_pv");
      formdata.append("cors_uuid", this.courseId);
      formdata.append("pg_uuid", this.pageId);
      var date = new Date();
      this.progressStart = true;
      this.startProgress();

      this._constantService
        .uploadFileApi(
          this._constantService.getCoursePromoVideoUploadServiceUrl(),
          formdata
        )
        .subscribe(
          (data) => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
              this.progressStart = false;
              // setTimeout(() => {
              this.promoVideoPath =
                responseData.PATH +
                this.courseId +
                ".mp4?v=" +
                responseData.IMG_UPD_DT;
              this.promoVideoThumbnailPath =
                responseData.PATH +
                this.courseId +
                ".png?v=" +
                responseData.IMG_UPD_DT;
              if (this.promoVideoThumbnailPath) {
                this.showThumbail = true;
              }
              //     this.cd.detectChanges();
              // }, 2000);
            } else if (status == this._constantService.error_token) {
              this.progressStart = false;
              this.dataConf["type"] = 4;
              this.dataConf["msg"] = "Session Expire";
              this.dataConf["error_msg"] = "Session Expired!";
              this.openConfirmation = true;
              return false;
            } else {
              this.progressStart = false;
              this.dataConf["type"] = 2;
              this.dataConf["msg"] = "Error";
              this.dataConf["error_msg"] = responseData.ERROR_MSG;
              this.openConfirmation = true;
              return false;
            }
            this.cd.detectChanges();
          },
          (error) => {
            this.progressStart = false;
            var responseData = error;
            if (responseData.status == 500) {
              this.router.navigate(["500"]);
            }
          }
        );
    } else {
      this.dataConf["type"] = 2;
      this.dataConf["msg"] = "STUDY24X7";
      this.dataConf["error_msg"] = "Please upload Valid size file.";
      this.openConfirmation = true;
      return false;
    }
  }

  playPromoVideo() {
    this.showThumbail = true;
  }

  safeUrl() {
    //        return this.sanitizer.bypassSecurityTrustResourceUrl(this.promoVideoPath);
  }

  showDropdown(index) {
    if (index == 1) {
      this.levelDropdown = !this.levelDropdown;
      this.langDropdown = false;
    } else if (index == 2) {
      this.langDropdown = !this.langDropdown;
      this.levelDropdown = false;
    } else if (3) {
      this.levelDropdown = false;
      this.langDropdown = false;
    }
  }

  courseLevelSelect(index) {
    for (const key in this.courseLevelList) {
      if (this.courseLevelList.hasOwnProperty(key)) {
        const element = this.courseLevelList[key];
        if (element["levelId"] == index) {
          this.courseLevelId = element["levelId"];
          this.courseLevel = element["levelName"];
          this.updateLevelId();
        }
      }
    }

    this.levelDropdown = false;
  }

  updateLevelId() {
    var courseLevelDetails = {};
    courseLevelDetails["token"] = this._constantService.getSessionDataBYKey(
      "token"
    );
    courseLevelDetails["token_param"] = {};
    courseLevelDetails["token_param"]["device_type"] = "w";
    courseLevelDetails["token_param"]["host"] = "";
    courseLevelDetails["cors_lvl"] = this.courseLevelId;
    courseLevelDetails["pg_uuid"] = this.pageId;
    courseLevelDetails["cors_uuid"] = this.courseId;
    this._constantService
      .fetchDataApi(
        this._constantService.getCourseLevelDetailsServiceUrl(),
        courseLevelDetails
      )
      .subscribe(
        (data) => {
          var responseData: any = data;
          if (responseData.STATUS == this._constantService.success_msg) {
          } else if (status == this._constantService.error_token) {
            this.dataConf["type"] = 4;
            this.dataConf["msg"] = "Session Expire";
            this.dataConf["error_msg"] = "Session Expired!";
            this.openConfirmation = true;
            return false;
          } else if (status == "error") {
            this.dataConf["type"] = 2;
            this.dataConf["msg"] = "Session Expire";
            this.dataConf["error_msg"] = responseData.ERROR_MSG;
            this.openConfirmation = true;
            return false;
          }
        },
        (error) => {
          var responseData = error;
          if (responseData.status == 500) {
            this.router.navigate(["500"]);
          }
        }
      );
  }

  courseLanguageSelect(index) {
    for (const key in this.languageList) {
      if (this.languageList.hasOwnProperty(key)) {
        const element = this.languageList[key];
        if (element["LANGUAGE_ID"] == index) {
          this.courseLang = element["LANGUAGE"];
          this.courseLangId = element["LANGUAGE_ID"];
          this.updateLanguageId();
        }
      }
    }
    this.langDropdown = false;
  }

  updateLanguageId() {
    var courseLangDetails = {};
    courseLangDetails["token"] = this._constantService.getSessionDataBYKey(
      "token"
    );
    courseLangDetails["token_param"] = {};
    courseLangDetails["token_param"]["device_type"] = "w";
    courseLangDetails["token_param"]["host"] = "";
    courseLangDetails["lang_id"] = this.courseLangId;
    courseLangDetails["pg_uuid"] = this.pageId;
    courseLangDetails["cors_uuid"] = this.courseId;

    this._constantService
      .fetchDataApi(
        this._constantService.getCourseLangDetailsServiceUrl(),
        courseLangDetails
      )
      .subscribe(
        (data) => {
          var responseData: any = data;
          if (responseData.STATUS == this._constantService.success_msg) {
          } else if (status == this._constantService.error_token) {
            this.dataConf["type"] = 4;
            this.dataConf["msg"] = "Session Expire";
            this.dataConf["error_msg"] = "Session Expired!";
            this.openConfirmation = true;
            return false;
          } else {
            this.dataConf["type"] = 2;
            this.dataConf["msg"] = "Error";
            this.dataConf["error_msg"] = responseData.ERROR_MSG;
            this.openConfirmation = true;
            return false;
          }
        },
        (error) => {
          var responseData = error;
          if (responseData.status == 500) {
            this.router.navigate(["500"]);
          }
        }
      );
  }

  updateCourseDesc() {
    var updateCourDesc = {};
    updateCourDesc["token"] = this._constantService.getSessionDataBYKey(
      "token"
    );
    updateCourDesc["token_param"] = {};
    updateCourDesc["token_param"]["device_type"] = "w";
    updateCourDesc["token_param"]["host"] = "";
    updateCourDesc["pg_uuid"] = this.pageId;
    updateCourDesc["cors_uuid"] = this.courseId;
    var liArr = document.getElementsByTagName('li');
    for (var i = 0; i < liArr.length; i++) {
      if (liArr[i].dataset.list == 'ordered') {
        liArr[i].parentElement.classList.remove('orderedList');
        liArr[i].parentElement.classList.remove('bulletList');
        liArr[i].parentElement.classList.add('orderedList');


      }
      else if (liArr[i].dataset.list == 'bullet') {
        liArr[i].parentElement.classList.remove('bulletList');
        liArr[i].parentElement.classList.remove('orderedList');
        liArr[i].parentElement.classList.add('bulletList');

      }
    }
    updateCourDesc["cors_desc"] = this.postData.encodeURIPostData(this.quillEditor.root.innerHTML);

    this._constantService
      .fetchDataApi(
        this._constantService.getCourseDescUpdServiceUrl(),
        updateCourDesc
      )
      .subscribe(
        (data) => {
          var responseData: any = data;
          var status = responseData.STATUS;
          if (status == this._constantService.success_msg) {
            this._constantService.setSessionJsonPair(
              "token",
              responseData.TOKEN
            );
            this.courseDesc = this.postData.decodeURIPostData(this.quillEditor.root.innerHTML);


          } else if (status == this._constantService.error_token) {
            this.dataConf["type"] = 4;
            this.dataConf["msg"] = "Session Expire";
            this.dataConf["error_msg"] = "Session Expired!";
            this.openConfirmation = true;
            return false;
          } else {
            this.dataConf["type"] = 2;
            this.dataConf["msg"] = "Error";
            this.dataConf["error_msg"] = responseData.ERROR_MSG;
            this.openConfirmation = true;
            return false;
          }
        },
        (error) => {
          var responseData = error;
          if (responseData.status == 500) {
            this.router.navigate(["500"]);
          }
        }
      );
  }

  setAddedTags(tagName: string, tagId: string) {
    this.keywordsCount++;
    var keywordData =
      this.postData.decodeURIPostData(tagName) +
      '<img src="assets/images/svg/tagcross.svg" class="close" id="remove_' +
      tagId +
      '">';
    var keyword = document.createElement("span");
    keyword.id = "keyword_" + tagId;
    keyword.className = "c_tags";
    keyword.innerHTML = keywordData;
    var tagArea = document.getElementById("keywordtags");
    tagArea.insertBefore(
      keyword,
      tagArea.childNodes[tagArea.childNodes.length - 1]
    );
    var keywordrm = document.getElementById("remove_" + tagId);
    keywordrm.addEventListener("click", () => {
      this.deleteCourseTag(tagArea, keyword, tagId);
    });
    if (this.keywordsCount > 4) {
      this.showTagsInput = false;
    } else {
      this.showTagsInput = true;
    }
  }

  addTag(event) {
    if (event.keyCode == 13 || event.type == "focusout") {
      if (this.keywordsCount > 4) {
        this.dataConf["type"] = 2;
        this.dataConf["msg"] = "Error";
        this.dataConf["error_msg"] = "Maximum 5 tags are allowed";
        this.openConfirmation = true;
        this.courseTag = "";
        return false;
      }
      if (this.courseTag.length == 0) {
        return;
      }
      var addCourseTag = {};
      addCourseTag["token"] = this._constantService.getSessionDataBYKey(
        "token"
      );
      addCourseTag["token_param"] = {};
      addCourseTag["token_param"]["device_type"] = "w";
      addCourseTag["token_param"]["host"] = "";
      addCourseTag["cors_uuid"] = this.courseId;
      addCourseTag["pg_uuid"] = this.pageId;
      addCourseTag["cors_tag"] = this.postData.encodeURIPostData(
        this.courseTag
      );

      this._constantService
        .fetchDataApi(
          this._constantService.getAddCourseTagServiceUrl(),
          addCourseTag
        )
        .subscribe(
          (data) => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
              var inputElement = <HTMLInputElement>(
                document.getElementById("addTagInput")
              );
              inputElement.value = "";
              this.keywordsCount = this.keywordsCount + 1;

              if (this.keywordsCount > 4) {
                this.showTagsInput = false;
              } else {
                this.showTagsInput = true;
              }

              var keywordData =
                this.courseTag +
                '<img src="assets/images/svg/tagcross.svg" class="close" id="remove_' +
                responseData.CORS_TAG_UUID +
                '">';
              var keyword = document.createElement("span");
              keyword.className = "c_tags";
              keyword.id = "keyword_" + responseData.CORS_TAG_UUID;
              keyword.innerHTML = keywordData;
              var tagArea = document.getElementById("keywordtags");
              tagArea.insertBefore(
                keyword,
                tagArea.childNodes[tagArea.childNodes.length - 1]
              );
              var keywordrm = document.getElementById(
                "remove_" + responseData.CORS_TAG_UUID
              );
              keywordrm.addEventListener("click", () => {
                this.deleteCourseTag(
                  tagArea,
                  keyword,
                  responseData.CORS_TAG_UUID
                );
              });
              this.courseTag = "";
            } else if (status == this._constantService.error_token) {
              this.dataConf["type"] = 4;
              this.dataConf["msg"] = "Session Expire";
              this.dataConf["error_msg"] = "Session Expired!";
              this.openConfirmation = true;
              return false;
            } else {
              this.dataConf["type"] = 2;
              this.dataConf["msg"] = "Error";
              this.dataConf["error_msg"] = responseData.ERROR_MSG;
              this.openConfirmation = true;
              return false;
            }
            setTimeout(() => {
              this.cd.detectChanges();
            }, 400);
          },
          (error) => {
            var responseData = error;
            if (responseData.status == 500) {
              this.router.navigate(["500"]);
            }
          }
        );
    }
  }

  deleteCourseTag(parentObj, childObj, id) {
    var delCourseTag = {};
    delCourseTag["token"] = this._constantService.getSessionDataBYKey("token");
    delCourseTag["token_param"] = {};
    delCourseTag["token_param"]["device_type"] = "w";
    delCourseTag["token_param"]["host"] = "";
    delCourseTag["cors_tag_uuid"] = id;

    this._constantService
      .fetchDataApi(
        this._constantService.getDelCourseTagServiceUrl(),
        delCourseTag
      )
      .subscribe(
        (data) => {
          var responseData: any = data;
          var status = responseData.STATUS;
          if (status == this._constantService.success_msg) {
            parentObj.removeChild(childObj);
            this.keywordsCount = this.keywordsCount - 1;

            if (this.keywordsCount > 4) {
              this.showTagsInput = false;
            } else {
              this.showTagsInput = true;
            }
          } else if (status == this._constantService.error_token) {
            this.dataConf["type"] = 4;
            this.dataConf["msg"] = "Session Expire";
            this.dataConf["error_msg"] = "Session Expired!";
            this.openConfirmation = true;
            return false;
          } else {
            this.dataConf["type"] = 2;
            this.dataConf["msg"] = "Error";
            this.dataConf["error_msg"] = responseData.ERROR_MSG;
            this.openConfirmation = true;
            return false;
          }
        },
        (error) => {
          var responseData = error;
          if (responseData.status == 500) {
            this.router.navigate(["500"]);
          }
        }
      );
    setTimeout(() => {
      this.cd.detectChanges();
    }, 400);
  }

  removeCover(coverType) {
    if (!this.blockClickRemovePicVid) {
      this.blockClickRemovePicVid = true;
      var removeCoverPic = {};
      removeCoverPic["token"] = this._constantService.getSessionDataBYKey(
        "token"
      );
      removeCoverPic["token_param"] = {};
      removeCoverPic["token_param"]["device_type"] = "w";
      removeCoverPic["token_param"]["host"] = "";
      removeCoverPic["pg_uuid"] = this.pageId;
      removeCoverPic["cors_uuid"] = this.courseId;
      removeCoverPic["type"] = coverType;

      this._constantService
        .fetchDataApi(
          this._constantService.getCourseCRemoveCoverAndVideoServiceUrl(),
          removeCoverPic
        )
        .subscribe(
          (data) => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
              if (coverType == "ccp") {
                this.coverPicPath = "";
              } else if (coverType == "cpv") {
                this.promoVideoPath = "";
                this.promoVideoThumbnailPath = "";
                this.showThumbail = false;
              }
            } else if (status == this._constantService.error_token) {
              this.dataConf["type"] = 4;
              this.dataConf["msg"] = "Session Expire";
              this.dataConf["error_msg"] = "Session Expired!";
              this.openConfirmation = true;
              return false;
            } else {
              this.dataConf["type"] = 2;
              this.dataConf["msg"] = "Error";
              this.dataConf["error_msg"] = responseData.ERROR_MSG;
              this.openConfirmation = true;
              return false;
            }
            this.blockClickRemovePicVid = false;
            this.cd.detectChanges();
          },
          (error) => {
            var responseData = error;
            if (responseData.status == 500) {
              this.router.navigate(["500"]);
            }
          }
        );
    }
  }

  //=====================course description ends====================//

  //=====================pricing and setting starts====================//
  // course dropdown dynamic selection and set value================

  enableDisableDropDown(index) {
    if (this.courceDropDownVal == -1) {
      this.courceDropDownVal = index;
    } else if (this.courceDropDownVal == index) {
      this.courceDropDownVal = -1;
    } else if (this.courceDropDownVal != index) {
      this.courceDropDownVal = index;
    }
  }
  setValue(index, value) {
    this.courseCostTyp = value;
    this.courceCostlist[index].currenc_typ = value;
  }

  // =======================================================

  validateCoursePrice() {
    if (this.courseValidityCheck == true) {
      if (
        this.courseValidityDays == 0 &&
        this.c_month == 0 &&
        this.c_days == 0
      ) {
        this.dataConf["type"] = 2;
        this.dataConf["msg"] = "STUDY24X7";
        this.dataConf["error_msg"] = "Please select a valid number of days";
        this.openConfirmation = true;
        return false;
      }
    }

    if (this.coursePackageType == 2 || this.coursePackageType == 1) {
      if (this.coursePaymentCheck == true) {
        if (!this.validateCourseCost()) {
          return false;
        }
        if (!this.checkDuplicateCurrency()) {
          return false;
        }
      } else {
        //used to make live stream paid
        // this.dataConf['type'] = 2;
        // this.dataConf['msg'] = "STUDY24X7";
        // this.dataConf['error_msg'] = "You must select payment for course with live stream.";
        // this.openConfirmation = true;
        // return false;
      }
    } else {
      if (!this.validateCourseCost()) {
        return false;
      }
      if (!this.checkDuplicateCurrency()) {
        return false;
      }
    }

    return true;
  }

  setcourseValid() {
    this.courseValidityCheck = !this.courseValidityCheck;
    this.setValidityPlaceholder();
    if (this.courseValidityCheck == false) {
      this.courseValidityDays = 0;
      this.updateCoureseValidity();
    }
  }
  courseDuration(index) {
    if (index == 1) {
      this.courseyear = !this.courseyear;
    } else if (index == 2) {
      this.coursdays = !this.coursdays;
    }
  }
  closeDropDown() {
    this.courseyear = false;
    this.coursdays = false;
    this.isFreeTrialList = false;
  }

  setValidityPlaceholder() {
    var notes = document.createElement("span");
    if (this.courseValidityCheck == false) {
      notes.innerHTML = this.validityPlaceHolder;
      this.c_days = 0;
      this.c_month = 0;
      this.courseValidityDays = 0;
    } else {
      notes.innerHTML =
        "Course will expire in  <br> <b>" +
        this.courseValidityDays +
        " days</b> from purchase.";
    }

    var ParentNote = document.getElementById("notes");
    if (ParentNote) {
      ParentNote.innerHTML = "";
      ParentNote.appendChild(notes);
    }
  }

  setCourseRenewable() {
    this.courseRenewableCheck = !this.courseRenewableCheck;
    if (this.courseRenewableCheck == true) {
      if (this.coursePaymentCheck == false) {
        this.dataConf["type"] = 2;
        this.dataConf["msg"] = "STUDY24X7";
        this.dataConf["error_msg"] = "Course must be paid";
        this.openConfirmation = true;
        this.courseRenewableCheck = false;
        //document.getElementById("renewable").prop()  = false;
        $("#renewable").prop("checked", false);
        this.courseRenewableCheck = false;
      }
    }
    if (this.courseRenewableCheck == false) {
      for (const key in this.courceCostlist) {
        if (this.courceCostlist.hasOwnProperty(key)) {
          const element = this.courceCostlist[key];
          element["r_costs"] = "0";
        }
      }
    }
  }

  updateCoureseValidity() {
    var updateCourseValidity = {};
    updateCourseValidity["token"] = this._constantService.getSessionDataBYKey(
      "token"
    );
    updateCourseValidity["token_param"] = {};
    updateCourseValidity["token_param"]["device_type"] = "w";
    updateCourseValidity["token_param"]["host"] = "";
    updateCourseValidity["cors_uuid"] = this.courseId;
    updateCourseValidity["pg_uuid"] = this.pageId;
    updateCourseValidity["valid_days"] = this.courseValidityDays;
    this._constantService
      .fetchDataApi(
        this._constantService.setCourseValidityServiceUrl(),
        updateCourseValidity
      )
      .subscribe((data) => {
        var responseData: any = data;
        var status = responseData.STATUS;
        if (status == this._constantService.success_msg) {
          this._constantService.setSessionJsonPair("token", responseData.TOKEN);
          this.setValidityPlaceholder();
        } else if (status == this._constantService.error_token) {
          this.dataConf["type"] = 4;
          this.dataConf["msg"] = "Session Expire";
          this.dataConf["error_msg"] = "Session Expired!";
          this.openConfirmation = true;
          return false;
        } else {
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "Error";
          this.dataConf["error_msg"] = responseData.ERROR_MSG;
          this.openConfirmation = true;
          this.setValidityPlaceholder();
          return false;
        }
      });
  }

  acknowledgeCheck() {
    this.acknowledgeChecked = !this.acknowledgeChecked;
  }

  cancelAcknowledgement() {
    this.acknowledgeChecked = false;
    this.termOfUse = false;
    $("#currency").prop("checked", false);
    if (this.courseRenewableCheck == false) {
      for (const key in this.courceCostlist) {
        if (this.courceCostlist.hasOwnProperty(key)) {
          const element = this.courceCostlist[key];
          element["r_costs"] = "0";
        }
      }
    }
  }

  submitAcknowledgeMent() {
    if (this.acknowledgeChecked) {
      var acknowledge = {};
      acknowledge["token"] = this._constantService.getSessionDataBYKey("token");
      acknowledge["token_param"] = {};
      acknowledge["token_param"]["device_type"] = "w";
      acknowledge["token_param"]["host"] = "";
      acknowledge["pg_uuid"] = this.pageId;

      this._constantService
        .fetchDataApi(
          this._constantService.getUpdateAcknowledgeMentServiceUrl(),
          acknowledge
        )
        .subscribe((data) => {
          var responseData: any = data;
          var status = responseData.STATUS;
          if (status == "success") {
            this.updateCourseType();
            this.termOfUse = false;
            this.pageData["ACKNOWLEDGEMENT"] = 1;
            this.sample["ACKNOWLEDGEMENT"] = 1;
            //this._constantService.setPageDetails(this.sample);

            this._constantService.setSessionJsonPair(
              "page_details",
              JSON.stringify(this.sample)
            );
            $("#currency").prop("checked", true);
            this.AcknowledgeMentStatus = 1;
          }
        });
    } else {
      this.dataConf["type"] = 2;
      this.dataConf["msg"] = "STUDY24X7";
      this.dataConf["error_msg"] = "Please accept the terms and condition ";
      this.openConfirmation = true;
      return false;
    }
  }

  acknowledgementStatusCheck() {
    this.pageData["ACKNOWLEDGEMENT"] = this.AcknowledgeMentStatus;
    if (this.AcknowledgeMentStatus == 1) {
      this.updateCourseType();
    } else if (this.AcknowledgeMentStatus == 0) {
      this.termOfUse = true;
      $("#currency").prop("checked", false);
      $("#renewable").prop("checked", false);
      if (this.courseRenewableCheck == false) {
        for (const key in this.courceCostlist) {
          if (this.courceCostlist.hasOwnProperty(key)) {
            const element = this.courceCostlist[key];
            element["r_costs"] = "0";
          }
        }
      }
    }
  }

  updateCourseType() {
    var updateCourseType = {};
    this.coursePaymentCheck = !this.coursePaymentCheck;
    if (this.coursePaymentCheck) {
      this.courseCostTyp = this.tempCurrency[0].currenc_typ;
      this.coursePrice = "0";
      this.courseDisPrice = "0";
    } else {
      this.trialCheckHandler();
    }
    updateCourseType["token"] = this._constantService.getSessionDataBYKey(
      "token"
    );
    updateCourseType["token_param"] = {};
    updateCourseType["token_param"]["device_type"] = "w";
    updateCourseType["token_param"]["host"] = "";
    updateCourseType["pg_uuid"] = this.pageId;
    updateCourseType["cors_uuid"] = this.courseId;
    updateCourseType["cors_type"] = this.coursePaymentCheck ? 1 : 0;
    this._constantService
      .fetchDataApi(
        this._constantService.setCourseTypeServiceUrl(),
        updateCourseType
      )
      .subscribe(
        (data) => {
          var responseData: any = data;
          var status = responseData.STATUS;
          if (status == this._constantService.success_msg) {
            this._constantService.setSessionJsonPair(
              "token",
              responseData.TOKEN
            );
            if (this.coursePaymentCheck == false) {
              this.courseRenewableCheck = false;
              $("#renewable").prop("checked", false);
              if (this.courseRenewableCheck == false) {
                for (const key in this.courceCostlist) {
                  if (this.courceCostlist.hasOwnProperty(key)) {
                    const element = this.courceCostlist[key];
                    element["r_costs"] = "0";
                  }
                }
              }
            }
          } else if (status == this._constantService.error_token) {
            this.dataConf["type"] = 4;
            this.dataConf["msg"] = "Session Expire";
            this.dataConf["error_msg"] = "Session Expired!";
            this.openConfirmation = true;
            return false;
          } else {
            this.dataConf["type"] = 2;
            this.dataConf["msg"] = "Error";
            this.dataConf["error_msg"] = responseData.ERROR_MSG;
            this.openConfirmation = true;
            return false;
          }
        },
        (error) => {
          var responseData = error;
          if (responseData.status == 500) {
            this.coursePaymentCheck = !this.coursePaymentCheck;
            this.router.navigate(["500"]);
          }
        }
      );
  }

  getCurrency() {
    var currency = {};
    currency["token"] = this._constantService.getSessionDataBYKey("token");
    currency["token_param"] = {};
    currency["token_param"]["device_type"] = "w";
    currency["token_param"]["host"] = "";

    this._constantService
      .fetchDataApi(this._constantService.getCurrencyServiceUrl(), currency)
      .subscribe(
        (data) => {
          var responseData: any = data;
          var status = responseData.STATUS;
          if (status == this._constantService.success_msg) {
            this.currency = responseData.CURRENCY_DATA;
            this.tempCurrency = this.currency.slice();
            this.courseCostTyp = this.tempCurrency[0].CURRENCY_TYPE;
          } else if (status == this._constantService.error_token) {
            this.dataConf["type"] = 4;
            this.dataConf["msg"] = "Session Expire";
            this.dataConf["error_msg"] = "Session Expired!";
            this.openConfirmation = true;
            return false;
          } else {
            this.dataConf["type"] = 2;
            this.dataConf["msg"] = "Error";
            this.dataConf["error_msg"] = responseData.ERROR_MSG;
            this.openConfirmation = true;
            return false;
          }
        },
        (error) => {
          var responseData = error;
          if (responseData.status == 500) {
            this.router.navigate(["500"]);
          }
        }
      );
  }

  validateCourseCost() {
    //         $("#renewable").prop("checked", false);
    if ($("#renewable").prop("checked") == true) {
      for (var i = 0; i < this.courceCostlist.length; i++) {
        // (isNaN(Number(this.courceCostlist[i].discount)));

        if (isNaN(Number(this.courceCostlist[i].r_costs))) {
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "STUDY24X7";
          this.dataConf["error_msg"] = "Renewal Price must be a valid number";
          this.openConfirmation = true;
          return false;
        }

        if (this.courceCostlist[i].r_costs == "") {
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "STUDY24X7";
          this.dataConf["error_msg"] = "Renewal Price must be a valid number";
          this.openConfirmation = true;
          return false;
        }
      }
    }
    if ($("#currency").prop("checked") == true) {
      for (var i = 0; i < this.courceCostlist.length; i++) {
        // (isNaN(Number(this.courceCostlist[i].discount)));
        if (isNaN(Number(this.courceCostlist[i].discount))) {
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "STUDY24X7";
          this.dataConf["error_msg"] = "Discount Price must be a valid number";
          this.openConfirmation = true;
          return false;
        }

        if (isNaN(Number(this.courceCostlist[i].cost))) {
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "STUDY24X7";
          this.dataConf["error_msg"] = "Discount Price must be a valid number";
          this.openConfirmation = true;
          return false;
        }
        if (this.courceCostlist[i].currenc_typ == "") {
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "STUDY24X7";
          this.dataConf["error_msg"] = "Please Select a Currency";
          this.openConfirmation = true;
          return false;
        }
        if (
          this.courceCostlist[i].cost == "" ||
          this.courceCostlist[i].cost == "0"
        ) {
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "STUDY24X7";
          this.dataConf["error_msg"] = "Please Add Course Price";
          this.openConfirmation = true;
          return false;
        }
        if (
          this.courceCostlist[i].discount == "" ||
          parseInt(this.courceCostlist[i].discount, 10) == 0
        ) {
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "STUDY24X7";
          this.dataConf["error_msg"] = "Please Add Discount Price";
          this.openConfirmation = true;
          return false;
        }

        if (
          parseInt(this.courceCostlist[i].discount) >=
          parseInt(this.courceCostlist[i].cost)
        ) {
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "STUDY24X7";
          this.dataConf["error_msg"] =
            "Discount Price can't be greater than or equal to Actual price";
          this.openConfirmation = true;
          this.courceCostlist[i].discount = "";
          this.courceCostlist[i].cost = "";
          return false;
        }
      }
    }
    return true;
    //this.addcurrencyList();
  }

  addcurrencyList() {
    if (this.coursePaymentCheck) {
      if (this.currency.length > this.countRow) {
        this.courceCostlist.push({
          currenc_typ: "INR",
          cost: "",
          discount: "",
          r_costs: "0",
        });
        this.countRow++;
      } else {
        this.dataConf["type"] = 2;
        this.dataConf["msg"] = "STUDY24X7";
        this.dataConf["error_msg"] = "No more currency to choose";
        this.openConfirmation = true;
        return false;
      }
    }
  }

  checkDuplicateCurrency() {
    var duplicate = 0;
    for (const key in this.courceCostlist) {
      if (this.courceCostlist.hasOwnProperty(key)) {
        const element = this.courceCostlist[key];
        duplicate = 0;
        for (var i = 0; i < this.courceCostlist.length; i++) {
          if (element["currenc_typ"] == this.courceCostlist[i].currenc_typ) {
            duplicate++;
            if (duplicate > 1) {
              this.dataConf["type"] = 2;
              this.dataConf["msg"] = "STUDY24X7";
              this.dataConf["error_msg"] = "Please Select different Currency";
              this.openConfirmation = true;
              return false;
            }
          }
        }
      }
    }
    return true;
  }

  addCourseCosts(index) {
    if (this.coursePaymentCheck) {
      if (this.checkDuplicateCurrency()) {
        var addCost = {};
        addCost["token"] = this._constantService.getSessionDataBYKey("token");
        addCost["token_param"] = {};
        addCost["token_param"]["device_type"] = "w";
        addCost["token_param"]["host"] = "";
        addCost["pg_uuid"] = this.pageId;
        addCost["cors_uuid"] = this.courseId;
        addCost["costs"] = this.courceCostlist;

        this._constantService
          .fetchDataApi(
            this._constantService.getCourseAddCostServiceUrl(),
            addCost
          )
          .subscribe(
            (data) => {
              var responseData: any = data;
              if (responseData.STATUS == this._constantService.success_msg) {
                this.courseProcess = index;

                return true;
              } else if (status == this._constantService.error_token) {
                this.dataConf["type"] = 4;
                this.dataConf["msg"] = "Session Expire";
                this.dataConf["error_msg"] = "Session Expired!";
                this.openConfirmation = true;
                return false;
              } else {
                this.dataConf["type"] = 2;
                this.dataConf["msg"] = "Error";
                this.dataConf["error_msg"] = responseData.ERROR_MSG;
                this.openConfirmation = true;
                return false;
              }
            },
            (error) => {
              var responseData = error;
              if (responseData.status == 500) {
                this.router.navigate(["500"]);
              }
            }
          );
      }
    } else {
      this.courseProcess = index;

    }
  }
  deleteCourseCost(cost_typ) {
    if (this.checkDuplicateCurrency()) {
      if (this.tempCourseListFromServer.length > 0) {
        for (const key in this.tempCourseListFromServer) {
          if (this.tempCourseListFromServer.hasOwnProperty(key)) {
            const element = this.tempCourseListFromServer[key];
            if (element["currenc_typ"] == cost_typ) {
              var delCost = {};
              delCost["token"] = this._constantService.getSessionDataBYKey(
                "token"
              );
              delCost["token_param"] = {};
              delCost["token_param"]["device_type"] = "w";
              delCost["token_param"]["host"] = "";
              delCost["pg_uuid"] = this.pageId;
              delCost["cors_uuid"] = this.courseId;
              delCost["currenc_typ"] = cost_typ;

              this._constantService
                .fetchDataApi(
                  this._constantService.getCourseCostDelServiceUrl(),
                  delCost
                )
                .subscribe(
                  (data) => {
                    var responseData: any = data;
                    var status = responseData.STATUS;
                    if (status == this._constantService.success_msg) {
                      //this._constantService.setToken(responseData.TOKEN);
                      this._constantService.setSessionJsonPair(
                        "token",
                        responseData.TOKEN
                      );
                      for (const key in this.courceCostlist) {
                        if (this.courceCostlist.hasOwnProperty(key)) {
                          const element = this.courceCostlist[key];
                          if (element.currenc_typ == cost_typ) {
                            //this.courceCostlist.slice(element);
                            var indexvalue = this.courceCostlist.findIndex(
                              (x) => x.currenc_typ == cost_typ
                            );
                            this.courceCostlist.splice(indexvalue, 1);
                            this.countRow--;
                          }
                        }
                      }
                      var indexvalue = this.selectedCurrency.findIndex(
                        (x) => x.CURRENCY_TYPE == cost_typ
                      );
                      this.selectedCurrency.splice(indexvalue, 1);
                      this.courseCost.some((item, index) => {
                        return this.courseCost[index]["COST_TYPE"] === cost_typ
                          ? !!this.courseCost.splice(index, 1)
                          : false;
                      });
                    }
                  },
                  (error) => {
                    var responseData = error;
                    if (responseData.status == 500) {
                      this.router.navigate(["500"]);
                    }
                  }
                );
            } else {
              for (const key in this.courceCostlist) {
                if (this.courceCostlist.hasOwnProperty(key)) {
                  const element = this.courceCostlist[key];
                  if (element.currenc_typ == cost_typ) {
                    var indexvalue = this.courceCostlist.findIndex(
                      (x) => x.currenc_typ == cost_typ
                    );
                    this.courceCostlist.splice(indexvalue, 1);
                    this.countRow--;
                  }
                }
              }
            }
          } else {
            for (const key in this.courceCostlist) {
              if (this.courceCostlist.hasOwnProperty(key)) {
                const element = this.courceCostlist[key];
                if (element.currenc_typ == cost_typ) {
                  //this.courceCostlist.slice(element);
                  var indexvalue = this.courceCostlist.findIndex(
                    (x) => x.currenc_typ == cost_typ
                  );
                  this.courceCostlist.splice(indexvalue, 1);
                  this.countRow--;
                }
              }
            }
          }
        }
      } else {
        for (const key in this.courceCostlist) {
          if (this.courceCostlist.hasOwnProperty(key)) {
            const element = this.courceCostlist[key];
            if (element.currenc_typ == cost_typ) {
              //this.courceCostlist.slice(element);
              var indexvalue = this.courceCostlist.findIndex(
                (x) => x.currenc_typ == cost_typ
              );
              this.courceCostlist.splice(indexvalue, 1);
              this.countRow--;
            }
          }
        }
      }
    } else {
      for (const key in this.courceCostlist) {
        if (this.courceCostlist.hasOwnProperty(key)) {
          const element = this.courceCostlist[key];
          if (element.currenc_typ == cost_typ) {
            //this.courceCostlist.slice(element);
            var indexvalue = this.courceCostlist.findIndex(
              (x) => x.currenc_typ == cost_typ
            );
            this.courceCostlist.splice(indexvalue, 1);
            this.countRow--;
          }
        }
      }
    }
  }

  updateCouponApplied() {
    var couponApplied = {};
    couponApplied["token"] = this._constantService.getSessionDataBYKey("token");
    couponApplied["token_param"] = {};
    couponApplied["token_param"]["device_type"] = "w";
    couponApplied["token_param"]["host"] = "";
    couponApplied["pg_uuid"] = this.pageId;
    couponApplied["cors_uuid"] = this.courseId;
    this.courseDiscountEligibleCheck = !this.courseDiscountEligibleCheck;
    if (this.courseDiscountEligibleCheck) {
      couponApplied["status"] = 1;
    } else {
      couponApplied["status"] = 0;
    }

    this._constantService
      .fetchDataApi(
        this._constantService.getCourseCouponApplyServiceUrl(),
        couponApplied
      )
      .subscribe((data) => {
        var responseData: any = data;
        var status = responseData.STATUS;
        if (status == "success") {
          this._constantService.setSessionJsonPair("token", responseData.TOKEN);
        } else if (status == this._constantService.error_token) {
          this.dataConf["type"] = 4;
          this.dataConf["msg"] = "Session Expire";
          this.dataConf["error_msg"] = "Session Expired!";
          this.openConfirmation = true;
          return false;
        } else {
          this.courseDiscountEligibleCheck = !this.courseDiscountEligibleCheck;
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "Error";
          this.dataConf["error_msg"] = responseData.ERROR_MSG;
          this.openConfirmation = true;
          return false;
        }
      });
  }

  updatCourseDownloadable() {
    var courseDownloadable = {};
    courseDownloadable["token"] = this._constantService.getSessionDataBYKey(
      "token"
    );
    courseDownloadable["token_param"] = {};
    courseDownloadable["token_param"]["device_type"] = "w";
    courseDownloadable["token_param"]["host"] = "";
    courseDownloadable["pg_uuid"] = this.pageId;
    courseDownloadable["cors_uuid"] = this.courseId;
    this.courseDownloadableCheck = !this.courseDownloadableCheck;
    if (this.courseDownloadableCheck) {
      courseDownloadable["status"] = 1;
    } else {
      courseDownloadable["status"] = 0;
    }

    this._constantService
      .fetchDataApi(
        this._constantService.getCourseDownloadableServiceUrl(),
        courseDownloadable
      )
      .subscribe((data) => {
        var responseData: any = data;
        var status = responseData.STATUS;
        if (status == "success") {
          this._constantService.setSessionJsonPair("token", responseData.TOKEN);
        } else if (status == this._constantService.error_token) {
          this.dataConf["type"] = 4;
          this.dataConf["msg"] = "Session Expire";
          this.dataConf["error_msg"] = "Session Expired!";
          this.openConfirmation = true;
          return false;
        } else {
          this.courseDiscountEligibleCheck = !this.courseDiscountEligibleCheck;
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "Error";
          this.dataConf["error_msg"] = responseData.ERROR_MSG;
          this.openConfirmation = true;
          return false;
        }
      });
  }

  setMonthAndDays() {
    this.c_month = Math.floor(this.courseValidityDays / 30);
    this.c_days = this.courseValidityDays % 30;
  }

  courseMonth(index) {
    this.c_month = index;
    this.getNoOfDays();
  }

  courseDays(index) {
    this.c_days = index;
    this.getNoOfDays();
  }

  getNoOfDays() {
    this.courseValidityDays = this.c_month * 30 + this.c_days;
    this.updateCoureseValidity();
  }

  //======================course price ends========================================//

  //===========================course content starts===================================//

  AddSection() {
    if (this.courseContentSection.length > 0) {
      if (
        this.courseContentSection[this.courseContentSection.length - 1]
          .SECTION_UUID != ""
      ) {
        this.courseContentSection.push({
          SECTION_UUID: "",
          SECTION_NAME: "",
          Sec_orderId: "",
          SECTION_CONTENT: [],
        });
      } else {
        this.dataConf["msg"] = "STUDY24X7";
        this.dataConf["type"] = 2;
        this.dataConf["error_msg"] = "Only one section can be added at a time.";
        this.openConfirmation = true;
      }
    } else {
      this.courseContentSection.push({
        SECTION_UUID: "",
        SECTION_NAME: "",
        Sec_orderId: "",
        SECTION_CONTENT: [],
      });
    }

    if (
      this.courseContentSection[this.courseContentSection.length - 1]
        .SECTION_UUID.length == 0
    ) {
      this.desableIcon = true;
    }
  }

  SectionNameInputField(event) {
    var inputElement = <HTMLInputElement>document.getElementById("sectionName");
    this.secName = inputElement.value;
    if (
      this.secName[this.secName.length - 1] == " " &&
      this.secName[this.secName.length - 2] == " "
    ) {
      this.secName = this.secName.substring(0, this.secName.length - 1);
      inputElement.value = this.secName;
      this.SectionNameInputField(false);
    }
    if (this.secName.length == 1 && this.secName == " ") {
      this.secName = "";
      inputElement.value = "";
    }
    if (event == false) {
      return false;
    }
    this.secName = this.secName.replace(/(\r\n\t|\n|\r\t)/gm, "");
    if (this.secName == "") {
      this.placeholderSectionContent = true;
      return false;
    }
    this.addUpdateSection(0);
  }

  focusoutFromSectionName() { }

  validateSectionAndContent() {
    if (
      this.courseContentSection.length == 0 ||
      this.courseContentSection[0].SECTION_UUID == ""
    ) {
      this.dataConf["msg"] = "STUDY24X7";
      this.dataConf["type"] = 2;
      this.dataConf["error_msg"] = "Please create some section";
      this.openConfirmation = true;
      return false;
    } else {
      for (var i = 0; i < this.courseContentSection.length; i++) {
        if (this.courseContentSection[i].SECTION_CONTENT[0] == null) {
          this.dataConf["msg"] = "STUDY24X7";
          this.dataConf["type"] = 2;
          this.dataConf["error_msg"] = "Please add some content";
          this.openConfirmation = true;
          return false;
        } else {
          if (
            this.courseContentSection[i].SECTION_CONTENT[0].CONTENT_UUID == ""
          ) {
            this.dataConf["msg"] = "STUDY24X7";
            this.dataConf["type"] = 2;
            this.dataConf["error_msg"] = "Please add some content";
            this.openConfirmation = true;
            return false;
          }
        }
      }
    }
    return true;
  }

  getDuration(event) {
    this.link = "";
    setTimeout(() => {
      this.postData.onPaste(event);
      var data = (<HTMLInputElement>document.getElementById(event.target.id))
        .innerText;
      this.link = data;
      if (this.checkURLType(this.link) == 4) {
        var id = this.getVideoId(this.link);
        var duration = 0;
        var url =
          "https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=" +
          id +
          "&key=AIzaSyDvBT5SIRntta660lUcTK85ryaSIZQwSI0";
        this._constantService
          .getDataApi(url)
          .toPromise()
          .then((response) => {
            var json = response;
            this.jsonlist = json;
            duration = this.jsonlist["items"][0]["contentDetails"]["duration"];
            this.duration = this.convertISO8601ToSeconds(duration);
            //                return this.duration;
          });
      } else if (this.checkURLType(this.link) == 5) {
        var id = this.getVideoId(this.link);
        var url =
          "https://vimeo.com/api/oembed.json?url=https://vimeo.com/" + id;
        this._constantService.getDataApi(url).subscribe((data) => {
          var response: any = data;
          this.duration = response.duration;
          //                return this.duration;
        });
      }
    }, 500);
  }

  convertISO8601ToSeconds(input) {
    var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
    var hours = 0,
      minutes = 0,
      seconds = 0,
      totalseconds;

    if (reptms.test(input)) {
      var matches = reptms.exec(input);
      if (matches[1]) hours = Number(matches[1]);
      if (matches[2]) minutes = Number(matches[2]);
      if (matches[3]) seconds = Number(matches[3]);
      totalseconds = hours * 3600 + minutes * 60 + seconds;
    }
    return totalseconds;
  }

  createVideoContent(index) {
    this.courseContentSection[index].SECTION_CONTENT.push({
      CONTENT_UUID: "",
      file: "",
      CONTENT_FILE_NAME: this.TitleContentPlaceHolder,
      CONTENT_TYPE: 1,
      CONTENT_OLD_NAME: "",
      edit: "true",
      CONTENT_DATA_TYPE: "",
      download: "false",
      addURL: "false",
      progress: "false",
      content_orderId: "",
      urlType: "",
      path: "",
      lock: "1",
      INFO: "",
      reviewStatus: "",
      placeholder: "",
      CONTENT_URL_NAME: "",
      progressPercentage: 0,
      progressBar: 339.292,
    });
  }
  createQuizContent(index) {
    this.courseContentSection[index].SECTION_CONTENT.push({
      CONTENT_UUID: "",
      file: "",
      CONTENT_FILE_NAME: this.TitleContentPlaceHolder,
      CONTENT_TYPE: 3,
      CONTENT_OLD_NAME: "",
      edit: "true",
      CONTENT_DATA_TYPE: "",
      download: "false",
      addURL: "false",
      progress: "false",
      content_orderId: "",
      urlType: "",
      path: "",
      lock: "1",
      INFO: "",
      reviewStatus: "",
      placeholder: "",
      CONTENT_URL_NAME: "",
      progressPercentage: 0,
      progressBar: 339.292,
    });
  }

  cancelNameButtonSection(index) {
    this.sectionEditButtonValue = -1;
  }

  cancelNameButtonContent(index, conteneIndex) {
    this.courseContentSection[index].SECTION_CONTENT[conteneIndex].edit =
      "false";
  }

  getDurationOfMp4Video(file, index, conteneIndex) {
    return new Promise((resolve, reject) => {
      console.log(file);
      var video = document.createElement("video");
      video.preload = "metadata";
      var error = setTimeout(() => {
        resolve(
          (this.courseContentSection[index].SECTION_CONTENT[conteneIndex].INFO =
            "")
        );
      }, 3000);
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        clearTimeout(error);
        resolve(
          (this.courseContentSection[index].SECTION_CONTENT[
            conteneIndex
          ].INFO = video.duration.toString())
        );
      };

      video.src = URL.createObjectURL(file);
    });
  }

  getNoOfPdfPage(file, index) {
    return new Promise((resolve) => {
      var reader = new FileReader();
      reader.readAsBinaryString(file);
      var error = setTimeout(() => {
        resolve(
          (this.courseContentSection[index].SECTION_CONTENT[length - 1].INFO =
            "")
        );
      }, 3000);
      reader.onloadend = () => {
        var count = reader.result.toString().match(/\/Type[\s]*\/Page[^s]/g)
          .length;
        var length = this.courseContentSection[index].SECTION_CONTENT.length;
        clearTimeout(error);
        console.log(length);
        clearTimeout(error);
        resolve(
          (this.courseContentSection[index].SECTION_CONTENT[
            length - 1
          ].INFO = count.toString())
        );
        console.log(this.courseContentSection);
        console.log(this.courseContentSection[index]);
      };
    });
  }

  async uploadContent(event, typ, index, conteneIndex) {
    var file = event.target.files[0];
    var orgnl_file_name = file.name;
    var fileType = file.name.split(".");
    if (fileType[fileType.length - 1] == "pdf" && typ == "doc") {
      var size = file.size / 1000 / 1000;
      if (size > 30) {
        this.dataConf["msg"] = "STUDY24X7";
        this.dataConf["type"] = 2;
        this.dataConf["error_msg"] = "File above 30mb is not allowed";
        this.openConfirmation = true;
      } else {
        this.courseContentSection[index].SECTION_CONTENT.push({
          CONTENT_UUID: "",
          file: file,
          CONTENT_FILE_NAME: fileType[0],
          CONTENT_TYPE: 2,
          CONTENT_OLD_NAME: orgnl_file_name,
          edit: "true",
          CONTENT_DATA_TYPE: "",
          download: "false",
          addURL: "false",
          progress: "false",
          content_orderId: "",
          urlType: "",
          path: "",
          lock: "1",
          INFO: "",
          reviewStatus: "",
          placeholder: "",
          CONTENT_URL_NAME: "",
          progressPercentage: 0,
          progressBar: 339.292,
        });

        await this.getNoOfPdfPage(file, index);
        this.refresh();
      }
    } else if (fileType[fileType.length - 1] == "mp4" && typ == "lec") {
      var size = file.size / 1000 / 1000;
      if (size > 3000) {
        this.dataConf["msg"] = "STUDY24X7";
        this.dataConf["type"] = 2;
        this.dataConf["error_msg"] = "File above 3gb is not allowed";
        this.openConfirmation = true;
      } else {
        this.fileUpload = true;
        this.fileType = "cors_vdo";

        await this.getDurationOfMp4Video(file, index, conteneIndex);
        this.courseContentSection[index].SECTION_CONTENT[
          conteneIndex
        ].CONTENT_OLD_NAME = file.name;
        this.courseContentSection[index].SECTION_CONTENT[
          conteneIndex
        ].file = file;
        this.courseContentSection[index].SECTION_CONTENT[
          conteneIndex
        ].CONTENT_OLD_NAME = file.name;
        this.courseContentSection[index].SECTION_CONTENT[
          conteneIndex
        ].CONTENT_FILE_NAME = fileType[0];
        this.courseContentSection[index].SECTION_CONTENT[
          conteneIndex
        ].CONTENT_DATA_TYPE = 2;
        this.courseContentSection[index].SECTION_CONTENT[
          conteneIndex
        ].download = "true";
        this.courseContentSection[index].SECTION_CONTENT[conteneIndex].edit =
          "true";
        this.courseContentSection[index].SECTION_CONTENT[conteneIndex].addURL =
          "false";
        this.courseContentSection[index].SECTION_CONTENT[
          conteneIndex
        ].progress = "false";
        this.removeContentPlaceHolder(index, conteneIndex, typ);
        this.refresh();
      }
    } else {
      this.dataConf["msg"] = "STUDY24X7";
      this.dataConf["type"] = 2;
      this.dataConf["error_msg"] = "File not supported";
      this.openConfirmation = true;
    }
  }

  updateContentName(Sectionindex, contentIndex) {
    if (
      this.courseContentSection[Sectionindex].SECTION_CONTENT[contentIndex]
        .CONTENT_UUID != ""
    ) {
      var contentNameData = {};
      contentNameData["token"] = this._constantService.getSessionDataBYKey(
        "token"
      );
      contentNameData["token_param"] = {};
      contentNameData["token_param"]["device_type"] = "w";
      contentNameData["token_param"]["host"] = "";
      contentNameData["pg_uuid"] = this.pageId;
      contentNameData["cntnt_uuid"] = this.courseContentSection[
        Sectionindex
      ].SECTION_CONTENT[contentIndex].CONTENT_UUID;
      if (
        this.courseContentSection[Sectionindex].SECTION_CONTENT[contentIndex]
          .CONTENT_TYPE == 3
      ) {
        if (
          document.getElementById("quiz" + Sectionindex + "." + contentIndex)
            .innerText != null
        ) {
          this.courseContentSection[Sectionindex].SECTION_CONTENT[
            contentIndex
          ].CONTENT_FILE_NAME = (<HTMLInputElement>(
            document.getElementById("quiz" + Sectionindex + "." + contentIndex)
          )).value;
        } else {
          this.courseContentSection[Sectionindex].SECTION_CONTENT[
            contentIndex
          ].CONTENT_FILE_NAME = this.TitleContentPlaceHolder;
        }
      }
      if (
        this.courseContentSection[Sectionindex].SECTION_CONTENT[contentIndex]
          .CONTENT_TYPE == 6
      ) {
        if (
          document.getElementById("quiz" + Sectionindex + "." + contentIndex)
            .innerText != null
        ) {
          this.courseContentSection[Sectionindex].SECTION_CONTENT[
            contentIndex
          ].CONTENT_FILE_NAME = (<HTMLInputElement>(
            document.getElementById("quiz" + Sectionindex + "." + contentIndex)
          )).value;
        } else {
          this.courseContentSection[Sectionindex].SECTION_CONTENT[
            contentIndex
          ].CONTENT_FILE_NAME = this.TitleContentPlaceHolder;
        }
      }
      if (
        this.courseContentSection[Sectionindex].SECTION_CONTENT[contentIndex]
          .CONTENT_TYPE == 2
      ) {
        if (
          document.getElementById("name" + Sectionindex + "." + contentIndex)
            .innerText != null
        ) {
          this.courseContentSection[Sectionindex].SECTION_CONTENT[
            contentIndex
          ].CONTENT_FILE_NAME = (<HTMLInputElement>(
            document.getElementById("name" + Sectionindex + "." + contentIndex)
          )).value;
        } else {
          this.courseContentSection[Sectionindex].SECTION_CONTENT[
            contentIndex
          ].CONTENT_FILE_NAME = this.TitleContentPlaceHolder;
        }
      } else if (
        this.courseContentSection[Sectionindex].SECTION_CONTENT[contentIndex]
          .CONTENT_TYPE == 1
      ) {
        if (
          document.getElementById(
            "namevideo" + Sectionindex + "." + contentIndex
          ).innerText != null
        ) {
          this.courseContentSection[Sectionindex].SECTION_CONTENT[
            contentIndex
          ].CONTENT_FILE_NAME = (<HTMLInputElement>(
            document.getElementById(
              "namevideo" + Sectionindex + "." + contentIndex
            )
          )).value;
        } else {
          this.courseContentSection[Sectionindex].SECTION_CONTENT[
            contentIndex
          ].CONTENT_FILE_NAME = this.TitleContentPlaceHolder;
        }
      }

      contentNameData["name"] = this.postData.encodeURIPostData(
        this.courseContentSection[Sectionindex].SECTION_CONTENT[contentIndex]
          .CONTENT_FILE_NAME
      );

      this._constantService
        .fetchDataApi(
          this._constantService.getCourseContentNameUpdateServiceUrl(),
          contentNameData
        )
        .subscribe((data) => {
          var responseData: any = data;
          var status = responseData.STATUS;

          if (status == this._constantService.success_msg) {
            this.courseContentSection[Sectionindex].SECTION_CONTENT[
              contentIndex
            ].edit = "false";
            this.courseContentSection[Sectionindex].SECTION_CONTENT[
              contentIndex
            ].progress = "false";
            this.refresh();
          } else if (status == this._constantService.error_token) {
            this.dataConf["type"] = 4;
            this.dataConf["msg"] = "Session Expire";
            this.dataConf["error_msg"] = "Session Expired!";
            this.openConfirmation = true;
            return false;
          } else {
            this.dataConf["type"] = 2;
            this.dataConf["msg"] = "Error";
            this.dataConf["error_msg"] = responseData.ERROR_MSG;
            this.openConfirmation = true;
            return false;
          }
        });
    }
  }

  async send(Sectionindex, contentIndex) {
    // this.onuploadvalue = contentIndex;
    if (
      this.courseContentSection[Sectionindex].SECTION_CONTENT[contentIndex]
        .CONTENT_UUID != ""
    ) {
      this.updateContentName(Sectionindex, contentIndex);
    } else if (
      this.courseContentSection[Sectionindex].SECTION_CONTENT[contentIndex]
        .CONTENT_TYPE == 3
    ) {
      //For type quiz
      if (
        this.courseContentSection[Sectionindex].SECTION_CONTENT[contentIndex]
          .CONTENT_DATA_TYPE != 6
      ) {
        var createQuiz = {};
        createQuiz["token"] = this._constantService.getSessionDataBYKey(
          "token"
        );
        createQuiz["token_param"] = {};
        createQuiz["token_param"]["device_type"] = "w";
        createQuiz["token_param"]["host"] = "";
        createQuiz["pg_uuid"] = this.pageId;
        createQuiz["sec_uuid"] = this.courseContentSection[
          Sectionindex
        ].SECTION_UUID;
        createQuiz["cors_uuid"] = this.courseId;
        //lxy
        this.courseContentSection[Sectionindex].SECTION_CONTENT[
          contentIndex
        ].CONTENT_FILE_NAME = this.postData.pastedDataStrippingByData(
          (<HTMLInputElement>(
            document.getElementById("quiz" + Sectionindex + "." + contentIndex)
          )).value.trim()
        );
        createQuiz["test_nm"] = this.postData.encodeURIPostData(
          this.courseContentSection[Sectionindex].SECTION_CONTENT[contentIndex]
            .CONTENT_FILE_NAME
        );
        if (createQuiz["test_nm"] == undefined) {
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "Error";
          this.dataConf["error_msg"] = "Enter a valid content title";
          this.openConfirmation = true;
          this.courseContentSection[Sectionindex].SECTION_CONTENT[
            contentIndex
          ].edit = "true";
          return true;
        }

        this._constantService
          .fetchDataApi(
            this._constantService.getCreateQuizServiceUrl(),
            createQuiz
          )
          .subscribe((data) => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
              this.courseContentSection[Sectionindex].SECTION_CONTENT[
                contentIndex
              ].CONTENT_UUID == responseData.CONTENT_UUID;
              this.courseContentSection[Sectionindex].SECTION_CONTENT[
                contentIndex
              ].edit = "false";
              this.courseContentSection[Sectionindex].SECTION_CONTENT[
                contentIndex
              ].CONTENT_UUID = responseData.CONTENT_UUID;
              this.router.navigate([
                "/addquiz/" +
                this.courseContentSection[Sectionindex].SECTION_CONTENT[
                  contentIndex
                ].CONTENT_UUID,
              ]);
              this.refresh();
            } else if (status == this._constantService.error_token) {
              this.dataConf["type"] = 4;
              this.dataConf["msg"] = "Session Expire";
              this.dataConf["error_msg"] = "Session Expired!";
              this.openConfirmation = true;
              return false;
            } else {
              this.dataConf["type"] = 2;
              this.dataConf["msg"] = "Error";
              this.dataConf["error_msg"] = responseData.ERROR_MSG;
              this.openConfirmation = true;
              return false;
            }
          });
        // this.addTestShow();
      } else {
        //for linked based test
        var createLinkedURLQuiz = {};
        createLinkedURLQuiz[
          "token"
        ] = this._constantService.getSessionDataBYKey("token");
        createLinkedURLQuiz["token_param"] = {};
        createLinkedURLQuiz["token_param"]["device_type"] = "w";
        createLinkedURLQuiz["token_param"]["host"] = "";
        createLinkedURLQuiz["pg_uuid"] = this.pageId;
        createLinkedURLQuiz["sec_uuid"] = this.courseContentSection[
          Sectionindex
        ].SECTION_UUID;
        createLinkedURLQuiz["cors_uuid"] = this.courseId;
        createLinkedURLQuiz["cntnt_uuid"] = "";

        this.courseContentSection[Sectionindex].SECTION_CONTENT[
          contentIndex
        ].CONTENT_FILE_NAME = (<HTMLInputElement>(
          document.getElementById("quiz" + Sectionindex + "." + contentIndex)
        )).value;
        this.courseContentSection[Sectionindex].SECTION_CONTENT[
          contentIndex
        ].CONTENT_OLD_NAME = (<HTMLInputElement>(
          document.getElementById(
            "addlinkurl" + Sectionindex + "." + contentIndex
          )
        )).value;
        createLinkedURLQuiz["name"] = this.postData.encodeURIPostData(
          this.courseContentSection[Sectionindex].SECTION_CONTENT[contentIndex]
            .CONTENT_FILE_NAME
        );
        createLinkedURLQuiz["path"] = this.courseContentSection[
          Sectionindex
        ].SECTION_CONTENT[contentIndex].CONTENT_OLD_NAME;
        if (
          createLinkedURLQuiz["name"] == "" ||
          createLinkedURLQuiz["name"] == this.TitleContentPlaceHolder
        ) {
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "Error";
          this.dataConf["error_msg"] = "Enter a valid content title";
          this.openConfirmation = true;
          this.courseContentSection[Sectionindex].SECTION_CONTENT[
            contentIndex
          ].edit = "true";
          return true;
        }
        if (
          createLinkedURLQuiz["path"] == "" ||
          createLinkedURLQuiz["path"] == this.TitleContentVideoPlaceHolder
        ) {
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "Error";
          this.dataConf["error_msg"] = "Enter a valid content title";
          this.openConfirmation = true;
          this.courseContentSection[Sectionindex].SECTION_CONTENT[
            contentIndex
          ].edit = "true";
          return true;
        }

        this._constantService
          .fetchDataApi(
            this._constantService.getLinkedURLEmbedeQuizServiceUrl(),
            createLinkedURLQuiz
          )
          .subscribe((data) => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
              this.courseContentSection[Sectionindex].SECTION_CONTENT[
                contentIndex
              ].CONTENT_UUID == responseData.CONTENT_UUID;
              this.courseContentSection[Sectionindex].SECTION_CONTENT[
                contentIndex
              ].CONTENT_TYPE = 6;
              this.courseContentSection[Sectionindex].SECTION_CONTENT[
                contentIndex
              ].edit = "false";
              this.courseContentSection[Sectionindex].SECTION_CONTENT[
                contentIndex
              ].CONTENT_UUID = responseData.CONTENT_UUID;
              this.refresh();
            } else if (status == this._constantService.error_token) {
              this.dataConf["type"] = 4;
              this.dataConf["msg"] = "Session Expire";
              this.dataConf["error_msg"] = "Session Expired!";
              this.openConfirmation = true;
              return false;
            } else {
              this.dataConf["type"] = 2;
              this.dataConf["msg"] = "Error";
              this.dataConf["error_msg"] = responseData.ERROR_MSG;
              this.openConfirmation = true;
              return false;
            }
          });
      }
    } else if (
      this.courseContentSection[Sectionindex].SECTION_CONTENT[contentIndex]
        .CONTENT_TYPE == 1 &&
      this.courseContentSection[Sectionindex].SECTION_CONTENT[contentIndex]
        .CONTENT_DATA_TYPE == 1
    ) {
      var courseURLData = {};
      courseURLData["token"] = this._constantService.getSessionDataBYKey(
        "token"
      );
      courseURLData["token_param"] = {};
      courseURLData["token_param"]["device_type"] = "w";
      courseURLData["token_param"]["host"] = "";
      courseURLData["pg_uuid"] = this.pageId;
      courseURLData["sec_uuid"] = this.courseContentSection[
        Sectionindex
      ].SECTION_UUID;
      courseURLData["cors_uuid"] = this.courseId;
      this.courseContentSection[Sectionindex].SECTION_CONTENT[
        contentIndex
      ].CONTENT_FILE_NAME = (<HTMLInputElement>(
        document.getElementById("namevideo" + Sectionindex + "." + contentIndex)
      )).value;
      this.courseContentSection[Sectionindex].SECTION_CONTENT[
        contentIndex
      ].CONTENT_OLD_NAME = document.getElementById(
        "nameurl" + Sectionindex + "." + contentIndex
      ).innerText;
      courseURLData["name"] = this.postData.encodeURIPostData(
        this.courseContentSection[Sectionindex].SECTION_CONTENT[contentIndex]
          .CONTENT_FILE_NAME
      );
      if (
        courseURLData["name"] == "" ||
        courseURLData["name"] == this.TitleContentPlaceHolder
      ) {
        this.dataConf["type"] = 2;
        this.dataConf["msg"] = "Error";
        this.dataConf["error_msg"] = "Enter a valid content title";
        this.openConfirmation = true;
        this.courseContentSection[Sectionindex].SECTION_CONTENT[
          contentIndex
        ].edit = "true";
        return true;
      }

      courseURLData["cntnt_type"] = this.checkURLType(
        this.courseContentSection[Sectionindex].SECTION_CONTENT[contentIndex]
          .CONTENT_OLD_NAME
      );
      if (courseURLData["cntnt_type"] == 4) {
        this.courseContentSection[Sectionindex].SECTION_CONTENT[
          contentIndex
        ].CONTENT_OLD_NAME = this.courseContentSection[
          Sectionindex
        ].SECTION_CONTENT[contentIndex].CONTENT_OLD_NAME.replace(
          "https://youtu.be/",
          ""
        );
        this.courseContentSection[Sectionindex].SECTION_CONTENT[
          contentIndex
        ].CONTENT_OLD_NAME = this.courseContentSection[
          Sectionindex
        ].SECTION_CONTENT[contentIndex].CONTENT_OLD_NAME.replace(
          "https://www.youtube.com/watch?v=",
          ""
        );
      }
      courseURLData["path"] = this.courseContentSection[
        Sectionindex
      ].SECTION_CONTENT[contentIndex].CONTENT_OLD_NAME;
      courseURLData["cntnt_uuid"] = this.courseContentSection[
        Sectionindex
      ].SECTION_CONTENT[contentIndex].CONTENT_UUID;
      courseURLData["duration"] = this.duration;
      if (courseURLData["cntnt_type"] == -1) {
        this.dataConf["type"] = 2;
        this.dataConf["msg"] = "Error";
        this.dataConf["error_msg"] = "Enter valid URL from youtube or vimeo";
        this.openConfirmation = true;
        this.courseContentSection[Sectionindex].SECTION_CONTENT[
          contentIndex
        ].edit = "true";
        this.courseContentSection[Sectionindex].SECTION_CONTENT[
          contentIndex
        ].addURL = "true";
        this.courseContentSection[Sectionindex].SECTION_CONTENT[
          contentIndex
        ].progress = "false";
        return true;
      }

      this.courseContentSection[Sectionindex].SECTION_CONTENT[
        contentIndex
      ].progress = "true";
      this.courseContentSection[Sectionindex].SECTION_CONTENT[
        contentIndex
      ].addURL = "false";
      this.courseContentSection[Sectionindex].SECTION_CONTENT[
        contentIndex
      ].edit = "false";

      this._constantService
        .fetchDataApi(
          this._constantService.getURLContentUploadServiceUrl(),
          courseURLData
        )
        .subscribe((data) => {
          var responseData: any = data;
          var status = responseData.STATUS;
          if (status == "success") {
            //this._constantService.setToken(responseData.TOKEN);
            this._constantService.setSessionJsonPair(
              "token",
              responseData.TOKEN
            );

            this.courseContentSection[Sectionindex].SECTION_CONTENT[
              contentIndex
            ].CONTENT_UUID = responseData.CONTENT_UUID;
            this.courseContentSection[Sectionindex].SECTION_CONTENT[
              contentIndex
            ].edit = "false";
            this.courseContentSection[Sectionindex].SECTION_CONTENT[
              contentIndex
            ].addURL = "true";
            this.courseContentSection[Sectionindex].SECTION_CONTENT[
              contentIndex
            ].progress = "false";
            this.courseContentSection[Sectionindex].SECTION_CONTENT[
              contentIndex
            ].urlType = this.checkURLType(
              this.courseContentSection[Sectionindex].SECTION_CONTENT[
                contentIndex
              ].CONTENT_OLD_NAME
            );
            this.courseContentSection[Sectionindex].SECTION_CONTENT[
              contentIndex
            ].file = this.getVideoId(
              this.courseContentSection[Sectionindex].SECTION_CONTENT[
                contentIndex
              ].CONTENT_OLD_NAME
            );
            this.courseContentSection[Sectionindex].SECTION_CONTENT[
              contentIndex
            ].content_orderId = responseData.ORDERING;
            this.insertDragContent(
              Sectionindex,
              '"content" + courseContentSection[Sectionindex].SECTION_UUID'
            );
            this.refresh();
          } else if (status == this._constantService.error_token) {
            this.dataConf["type"] = 4;
            this.dataConf["msg"] = "Session Expire";
            this.dataConf["error_msg"] = "Session Expired!";
            this.openConfirmation = true;
            return false;
          } else {
            this.courseContentSection[Sectionindex].SECTION_CONTENT[
              contentIndex
            ].edit = "true";
            this.courseContentSection[Sectionindex].SECTION_CONTENT[
              contentIndex
            ].addURL = "true";
            this.courseContentSection[Sectionindex].SECTION_CONTENT[
              contentIndex
            ].progress = "false";
            this.dataConf["type"] = 2;
            this.dataConf["msg"] = "Error";
            this.dataConf["error_msg"] = responseData.ERROR_MSG;
            this.openConfirmation = true;
            return false;
          }
        });
    } else if (
      this.courseContentSection[Sectionindex].SECTION_CONTENT[contentIndex]
        .CONTENT_UUID == ""
    ) {
      //file uploading pdf video
      if (this.fileupldinprcss == true) {
        if (
          this.courseContentSection[Sectionindex].SECTION_CONTENT[contentIndex]
            .CONTENT_TYPE == 2
        ) {
          if (
            (<HTMLInputElement>(
              document.getElementById(
                "name" + Sectionindex + "." + contentIndex
              )
            )).value != null
          ) {
            this.courseContentSection[Sectionindex].SECTION_CONTENT[
              contentIndex
            ].CONTENT_FILE_NAME = (<HTMLInputElement>(
              document.getElementById(
                "name" + Sectionindex + "." + contentIndex
              )
            )).value;
          } else {
            this.courseContentSection[Sectionindex].SECTION_CONTENT[
              contentIndex
            ].CONTENT_FILE_NAME = this.TitleContentPlaceHolder;
          }
        } else if (
          this.courseContentSection[Sectionindex].SECTION_CONTENT[contentIndex]
            .CONTENT_TYPE == 1
        ) {
          if (
            document.getElementById(
              "namevideo" + Sectionindex + "." + contentIndex
            ).innerText != null
          ) {
            this.courseContentSection[Sectionindex].SECTION_CONTENT[
              contentIndex
            ].CONTENT_FILE_NAME = (<HTMLInputElement>(
              document.getElementById(
                "namevideo" + Sectionindex + "." + contentIndex
              )
            )).value;
          } else {
            this.courseContentSection[Sectionindex].SECTION_CONTENT[
              contentIndex
            ].CONTENT_FILE_NAME = this.TitleContentPlaceHolder;
          }
        }
        var courseuploadData = {};
        courseuploadData["token"] = this._constantService.getSessionDataBYKey(
          "token"
        );
        courseuploadData["token_param"] = {};
        courseuploadData["token_param"]["device_type"] = "w";
        courseuploadData["token_param"]["host"] = "";

        setTimeout(() => {
          courseuploadData["type"] = this.courseContentSection[
            Sectionindex
          ].SECTION_CONTENT[contentIndex].CONTENT_TYPE;
          courseuploadData["sec_uuid"] = this.courseContentSection[
            Sectionindex
          ].SECTION_UUID;
          courseuploadData["cors_uuid"] = this.courseId;
          courseuploadData["pg_uuid"] = this.pageId;
          courseuploadData["name"] = this.postData.encodeURIPostData(
            this.courseContentSection[Sectionindex].SECTION_CONTENT[
              contentIndex
            ].CONTENT_FILE_NAME
          );
          courseuploadData["original_name"] = this.courseContentSection[
            Sectionindex
          ].SECTION_CONTENT[contentIndex].CONTENT_OLD_NAME;
          courseuploadData["fsize"] =
            this.courseContentSection[Sectionindex].SECTION_CONTENT[
              contentIndex
            ].file.size / 1000;
          if (
            this.courseContentSection[Sectionindex].SECTION_CONTENT[
              contentIndex
            ].CONTENT_TYPE == 1
          ) {
            courseuploadData["duration"] = this.courseContentSection[
              Sectionindex
            ].SECTION_CONTENT[contentIndex].INFO;
            courseuploadData["pages"] = "";
          } else if (
            this.courseContentSection[Sectionindex].SECTION_CONTENT[
              contentIndex
            ].CONTENT_TYPE == 2
          ) {
            courseuploadData["duration"] = "";
            courseuploadData["pages"] = this.courseContentSection[
              Sectionindex
            ].SECTION_CONTENT[contentIndex].INFO;
          }

          if (
            this.courseContentSection[Sectionindex].SECTION_CONTENT[
              contentIndex
            ].CONTENT_FILE_NAME == "" ||
            this.courseContentSection[Sectionindex].SECTION_CONTENT[
              contentIndex
            ].CONTENT_FILE_NAME == this.TitleContentPlaceHolder
          ) {
            this.dataConf["type"] = 2;
            this.dataConf["msg"] = "Error";
            this.dataConf["error_msg"] = "Enter a valid content title";
            this.openConfirmation = true;
            this.courseContentSection[Sectionindex].SECTION_CONTENT[
              contentIndex
            ].edit = "true";
            this.courseContentSection[Sectionindex].SECTION_CONTENT[
              contentIndex
            ].file = "";

            return true;
          }

          if (
            !this.courseContentSection[Sectionindex].SECTION_CONTENT[
              contentIndex
            ].INFO
          ) {
            // this.dataConf['type'] = 2;
            // this.dataConf['msg'] = 'Error';
            // this.dataConf['error_msg'] = "File may be corrupted or try again.";
            // this.openConfirmation = true;
            // this.courseContentSection[Sectionindex].SECTION_CONTENT[contentIndex].edit = "true";
            // this.courseContentSection[Sectionindex].SECTION_CONTENT[contentIndex].file = "";
            // return true;
            this.courseContentSection[Sectionindex].SECTION_CONTENT[
              contentIndex
            ].INFO = 0;
          }

          this.courseContentSection[Sectionindex].SECTION_CONTENT[
            contentIndex
          ].edit = "false";
          this.courseContentSection[Sectionindex].SECTION_CONTENT[
            contentIndex
          ].progress = "true";
          this.courseContentSection[Sectionindex].SECTION_CONTENT[
            contentIndex
          ].download = "false";
          this._constantService
            .fetchDataApi(
              this._constantService.getTestContentUploadServiceUrlFrontEnd(),
              courseuploadData
            )
            .subscribe((data) => {
              var responseData: any = data;
              var status = responseData.STATUS;
              if (status == this._constantService.success_msg) {
                this.courseContentSection[Sectionindex].SECTION_CONTENT[
                  contentIndex
                ].CONTENT_UUID = responseData.CONTENT_UUID;
                this.courseContentSection[Sectionindex].SECTION_CONTENT[
                  contentIndex
                ].content_orderId = responseData.ORDERING;
                var folderName;
                if (responseData.FOLDER_NAME != "") {
                  folderName = responseData.FOLDER_NAME + "/";
                } else {
                  folderName = "";
                }
                var typeFormat;
                if (
                  this.courseContentSection[Sectionindex].SECTION_CONTENT[
                    contentIndex
                  ].CONTENT_TYPE == 1
                ) {
                  typeFormat = ".mp4";
                } else if (
                  this.courseContentSection[Sectionindex].SECTION_CONTENT[
                    contentIndex
                  ].CONTENT_TYPE == 2
                ) {
                  typeFormat = ".pdf";
                }
                var bucket = new S3(this._constantService.awsKey);
                var params = {
                  Bucket: responseData.BUCKET_NAME,
                  Key: folderName + responseData.CONTENT_UUID + typeFormat,
                  Body: this.courseContentSection[Sectionindex].SECTION_CONTENT[
                    contentIndex
                  ].file,
                  ContentType: "",
                  ACL: "public-read",
                };

                var upload_obj = bucket.upload(params, function (err, data) {
                  if (err) {
                    this.progressStart = false;
                    this.fileupldinprcss = true;
                    setTimeout(() => {
                      this.onuploadvalue = -1;
                      this.courseContentSection[Sectionindex].SECTION_CONTENT[
                        contentIndex
                      ].edit = "true";
                      this.courseContentSection[Sectionindex].SECTION_CONTENT[
                        contentIndex
                      ].download = "false";
                    }, 3000);
                    this.dataConf["type"] = 2;
                    this.dataConf["msg"] = "Error";
                    this.dataConf["error_msg"] =
                      "Failed to upload file due to internal error";
                    this.openConfirmation = true;
                    return false;
                  } else {
                  }
                });

                this.refresh();
                let refreshInterval = setInterval(() => {
                  var isOnline = window.navigator.onLine;
                  if (isOnline) {
                    // this._constantService.showToast("","",2);
                  } else {
                    this._constantService.showToast("Net connection lost", "", 2);

                    console.log("offline");
                  }
                  this.refresh();
                }, 3000);

                upload_obj.on("httpUploadProgress", (progress) => {
                  var percentDone = progress.loaded;
                  var totalPercent = progress.total;
                  percentDone = (percentDone / totalPercent) * 100;
                  let progresscount = 1 - percentDone / 100;
                  this.courseContentSection[Sectionindex].SECTION_CONTENT[
                    contentIndex
                  ].progressBar = 339.292 * progresscount;

                  this.courseContentSection[Sectionindex].SECTION_CONTENT[
                    contentIndex
                  ].progressPercentage = Math.round(percentDone);
                });

                upload_obj.promise().then((data) => {
                  this.callSuccessFulUploadApi(Sectionindex, contentIndex);
                  clearInterval(refreshInterval);
                });
              } else if (status == this._constantService.error_token) {
                this.dataConf["type"] = 4;
                this.dataConf["msg"] = "Session Expire";
                this.dataConf["error_msg"] = "Session Expired!";
                this.openConfirmation = true;
                return false;
              } else {
                this.progressStart = false;
                this.fileupldinprcss = true;
                setTimeout(() => {
                  this.onuploadvalue = -1;
                  this.courseContentSection[Sectionindex].SECTION_CONTENT[
                    contentIndex
                  ].edit = "true";
                  this.courseContentSection[Sectionindex].SECTION_CONTENT[
                    contentIndex
                  ].download = "false";
                }, 3000);
                this.dataConf["type"] = 2;
                this.dataConf["msg"] = "Error";
                this.dataConf["error_msg"] = responseData.ERROR_MSG;
                this.openConfirmation = true;
                return false;
              }
            });
        }, 100);
      }
    }
  }

  consoleFun() {
    console.log("file uploaded");
  }

  callSuccessFulUploadApi(Sectionindex, contentIndex) {
    var courseuploadsuccessData = {};
    courseuploadsuccessData[
      "token"
    ] = this._constantService.getSessionDataBYKey("token");
    courseuploadsuccessData["token_param"] = {};
    courseuploadsuccessData["token_param"]["device_type"] = "w";
    courseuploadsuccessData["token_param"]["host"] = "";
    courseuploadsuccessData["cntnt_uuid"] = this.courseContentSection[
      Sectionindex
    ].SECTION_CONTENT[contentIndex].CONTENT_UUID;
    courseuploadsuccessData["pg_uuid"] = this.pageId;
    courseuploadsuccessData["type"] = this.courseContentSection[
      Sectionindex
    ].SECTION_CONTENT[contentIndex].CONTENT_TYPE;

    this._constantService
      .fetchDataApi(
        this._constantService.getCourseUploadSuccessfulServiceUrl(),
        courseuploadsuccessData
      )
      .subscribe((data) => {
        var responseData2: any = data;
        var status = responseData2.STATUS;
        if (status == this._constantService.success_msg) {
          this.progressStart = false;
          this.fileupldinprcss = true;
          this.progress = 100;
          setTimeout(() => {
            this.fileUpload = false;
            this.progress = 0;
            this.videoUploadedValue = contentIndex;
            this.courseContentSection[Sectionindex].SECTION_CONTENT[
              contentIndex
            ].edit = "false";
            this.courseContentSection[Sectionindex].SECTION_CONTENT[
              contentIndex
            ].progress = "false";
            this.courseContentSection[Sectionindex].SECTION_CONTENT[
              contentIndex
            ].path = responseData2.PATH;

            this.onuploadvalue = -1;
            this.insertDragContent(
              Sectionindex,
              "content" + this.courseContentSection[Sectionindex].SECTION_UUID
            );
            if (
              this.courseContentSection[Sectionindex].SECTION_CONTENT[
                contentIndex
              ].CONTENT_TYPE == 1
            ) {
              this.courseContentSection[Sectionindex].SECTION_CONTENT[
                contentIndex
              ].addURL = "false";
              this.courseContentSection[Sectionindex].SECTION_CONTENT[
                contentIndex
              ].download = "true";
            } else {
              this.courseContentSection[Sectionindex].SECTION_CONTENT[
                contentIndex
              ].addURL = "false";
              this.courseContentSection[Sectionindex].SECTION_CONTENT[
                contentIndex
              ].download = false;
            }
            this.fileName = "";
            this.refresh();
          }, 3000);
        } else {
          this.progressStart = false;
          this.fileupldinprcss = true;
          setTimeout(() => {
            this.onuploadvalue = -1;
            this.courseContentSection[Sectionindex].SECTION_CONTENT[
              contentIndex
            ].edit = "true";
            this.courseContentSection[Sectionindex].SECTION_CONTENT[
              contentIndex
            ].download = "false";
          }, 3000);
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "Error";
          this.dataConf["error_msg"] = responseData2.ERROR_MSG;
          this.openConfirmation = true;
          return false;
        }
      });
  }

  checkURLType(URL) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    var vimeoRegEx = /^(http:\/\/|https:\/\/)(vimeo\.com)\/([\w\/]+)([\?].*)?$/;
    if (regExp.exec(URL)) {
      return 4;
    } else if (vimeoRegEx.exec(URL)) {
      return 5;
    } else return -1;
  }

  viewContent(Sectionindex, contentIndex) {
    this._constantService.setCourseUuid(this.courseId);
    if (
      this.courseContentSection[Sectionindex].SECTION_CONTENT[contentIndex]
        .CONTENT_TYPE == 6
    ) {
      this.openLinkedBasedTest(Sectionindex, contentIndex);
    } else if (
      this.courseContentSection[Sectionindex].SECTION_CONTENT[contentIndex]
        .CONTENT_TYPE == 3
    ) {
      this.router.navigate([
        "/addquiz/" +
        this.courseContentSection[Sectionindex].SECTION_CONTENT[contentIndex]
          .CONTENT_UUID,
      ]);
    } else if (
      this.courseContentSection[Sectionindex].SECTION_CONTENT[contentIndex]
        .CONTENT_TYPE == 2
    ) {
      // this.router.navigate(['/pdfreader/' + this.courseContentSection[Sectionindex].SECTION_CONTENT[contentIndex].CONTENT_UUID + "study2"]);
      this.router.navigate([
        "/viewer/" +
        this.courseContentSection[Sectionindex].SECTION_CONTENT[contentIndex]
          .CONTENT_UUID,
      ]);
    } else if (
      this.courseContentSection[Sectionindex].SECTION_CONTENT[contentIndex]
        .CONTENT_TYPE == 7
    ) {
      this.router.navigate([
        "/viewer/" +
        this.courseContentSection[Sectionindex].SECTION_CONTENT[contentIndex]
          .CONTENT_UUID,
      ]);
    } else if (
      this.courseContentSection[Sectionindex].SECTION_CONTENT[contentIndex]
        .CONTENT_TYPE == 1
    ) {
      if (
        this.courseContentSection[Sectionindex].SECTION_CONTENT[contentIndex]
          .urlType == 4
      ) {
        this.router.navigate([
          "/viewer/" +
          this.courseContentSection[Sectionindex].SECTION_CONTENT[
            contentIndex
          ].CONTENT_UUID,
        ]);
      } else if (
        this.courseContentSection[Sectionindex].SECTION_CONTENT[contentIndex]
          .urlType == 5
      ) {
        this.router.navigate([
          "/viewer/" +
          this.courseContentSection[Sectionindex].SECTION_CONTENT[
            contentIndex
          ].CONTENT_UUID,
        ]);
      } else if (
        this.courseContentSection[Sectionindex].SECTION_CONTENT[contentIndex]
          .CONTENT_TYPE == 1
      ) {
        this.router.navigate([
          "/viewer/" +
          this.courseContentSection[Sectionindex].SECTION_CONTENT[
            contentIndex
          ].CONTENT_UUID,
        ]);
      }
    }
  }

  openLinkedBasedTest(Sectionindex, contentIndex) {
    var token = this.createlinkedbasedToken(Sectionindex, contentIndex);
    // this.post(url,token);
  }

  post(url, token) {
    var mapForm = document.createElement("form");
    mapForm.target = "_blank";
    mapForm.method = "POST"; // or "post" if appropriate
    mapForm.action = url;
    var mapInput = document.createElement("input");
    mapInput.type = "hidden";
    mapInput.name = "enrollmentNo";
    mapInput.setAttribute("value", token);
    mapForm.appendChild(mapInput);

    document.body.appendChild(mapForm);
    mapForm.submit();
  }

  createlinkedbasedToken(Sectionindex, contentIndex) {
    // getTokenforLinkedBasedDataServiceUrl
    var linkbasedToken = {};
    linkbasedToken["token"] = this._constantService.getSessionDataBYKey(
      "token"
    );
    linkbasedToken["token_param"] = {};
    linkbasedToken["token_param"]["device_type"] = "w";
    linkbasedToken["token_param"]["host"] = "";
    linkbasedToken["cntnt_uuid"] = this.courseContentSection[
      Sectionindex
    ].SECTION_CONTENT[contentIndex].CONTENT_UUID;

    this._constantService
      .fetchDataApi(
        this._constantService.getTokenforLinkedBasedDataServiceUrl(),
        linkbasedToken
      )
      .subscribe((data) => {
        var responseData: any = data;
        var status = responseData.STATUS;
        if (status == this._constantService.success_msg) {
          var url = this.courseContentSection[Sectionindex].SECTION_CONTENT[
            contentIndex
          ].CONTENT_OLD_NAME;
          this.post(url, responseData.URL_TOKEN);
        }
      });
  }

  getVideoId(URL) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    var vimeoRegEx = /^(http:\/\/|https:\/\/)(vimeo\.com)\/([\w\/]+)([\?].*)?$/;
    var videoLink;
    if (this.checkURLType(URL) == 4) {
      var match;
      var match = URL.match(regExp);
      if (match && match[2].length == 11) {
        videoLink = match[2];
        return videoLink;
      }
    } else if (this.checkURLType(URL) == 5) {
      var arrtyp = URL.split("/");
      videoLink = arrtyp[arrtyp.length - 1];
      return videoLink;
    } else if (this.checkURLType(URL) == -1) {
      return URL;
    }
  }
  slice(file, start, end) {
    var slice = file.mozSlice
      ? file.mozSlice
      : file.webkitSlice
        ? file.webkitSlice
        : file.slice
          ? file.slice
          : this.noop;

    return slice.bind(file)(start, end);
  }

  noop() {
    this.progress = this.progress + 5;
    (<HTMLElement>document.getElementById("progressBar")).style.width =
      this.progress + "%";
    if (this.progress < 95 && this.fileUpload) {
      setTimeout(() => {
        this.noop();
      }, 3000);
    }
  }

  public blobToFile = (theBlob: Blob, fileName: string): File => {
    var b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return <File>theBlob;
  };
  showpopup_video_link() {
    this.video_free_popup = true;
    let body = document.getElementsByTagName("body")[0];
    body.classList.add("body-overflow");
  }
  hidepopup_video_link() {
    this.video_free_popup = false;
    let body = document.getElementsByTagName("body")[0];
    body.classList.remove("body-overflow");
  }

  addUpdateSection(index) {
    if (this.secName.length > 5 && this.secName.length < 500) {
      var addUpdSection = {};
      addUpdSection["token"] = this._constantService.getSessionDataBYKey(
        "token"
      );
      addUpdSection["token_param"] = {};
      addUpdSection["token_param"]["device_type"] = "w";
      addUpdSection["token_param"]["host"] = "";
      addUpdSection["pg_uuid"] = this.pageId;
      addUpdSection["cors_uuid"] = this.courseId;
      addUpdSection["sec_nm"] = this.postData.encodeURIPostData(this.secName);
      this.sectionId = this.courseContentSection[
        this.courseContentSection.length - 1
      ].SECTION_UUID;
      if (this.sectionId == "") {
        addUpdSection["sec_uuid"] = "";
        index = this.courseContentSection.length - 1;
      } else {
        addUpdSection["sec_uuid"] = this.courseContentSection[
          index
        ].SECTION_UUID;
      }

      this._constantService
        .fetchDataApi(
          this._constantService.getAddUpdSectionServiceUrl(),
          addUpdSection
        )
        .subscribe(
          (data) => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
              this.sectionId = responseData.SECTION_UUID;
              this.desableIcon = false;
              this.pageData["SECTION_UUID"] = responseData.SECTION_UUID;
              this._constantService.setSessionJsonPair(
                "token",
                responseData.TOKEN
              );
              this.sectionAdded = true;
              this.newSection = false;
              if (this.courseContentSection[index].SECTION_UUID == "") {
                this.courseContentSection[index].SECTION_CONTENT = [];
              }
              this.courseContentSection[index].SECTION_UUID =
                responseData.SECTION_UUID;
              this.courseContentSection[index].SECTION_NAME = this.secName;

              this.sectionEditButtonValue = -1;

              if (this.courseSection.length == 10) {
                this.newSection = false;
              }
              this.refresh();
            } else if (status == this._constantService.error_token) {
              this.dataConf["type"] = 4;
              this.dataConf["msg"] = "Session Expire";
              this.dataConf["error_msg"] = "Session Expired!";
              this.openConfirmation = true;
              return false;
            } else {
              this.dataConf["type"] = 2;
              this.dataConf["msg"] = "Error";
              this.dataConf["error_msg"] = responseData.ERROR_MSG;
              this.openConfirmation = true;
              return false;
            }
          },
          (error) => {
            var responseData = error;
            if (responseData.status == 500) {
              this.router.navigate(["500"]);
            }
          }
        );
    } else {
      this.dataConf["type"] = 2;
      this.dataConf["msg"] = "Error";
      this.dataConf["error_msg"] =
        "Short name please enter minimum 6 characters.";
      this.openConfirmation = true;
    }
  }

  insertDragContent(Sectionindex, dragContName) {
    if (this.dragulaService.find(dragContName) == undefined) {
      this.dragulaService.createGroup(dragContName, {
        removeOnSpill: false,
        moves: (el, container, handle) => {
          // console.log(handle);
          if (handle.className != "showOnEdit") {
            return false;
          } else {
            return true;
          }
        },
      });
    }
  }

  editContent(sectionIndex, ContentIndex) {
    if (
      this.courseContentSection[sectionIndex].SECTION_CONTENT[ContentIndex]
        .CONTENT_TYPE == 7
    ) {
      this.setliveStream(sectionIndex, ContentIndex);
      scrollTo(0, -500);
      return;
    }
    this.show_placeholder = false;
    this.Quiz_placeholder = false;
    this.editContentDataValue = ContentIndex;
    this.editContentDataSectionValue = sectionIndex;
    this.courseContentSection[sectionIndex].SECTION_CONTENT[ContentIndex].edit =
      "true";
  }

  addnewSection() {
    this.newSection = true;
    this.sectionId = "";
    this.sectionAdded = false;
    this.secName = "";
    this.sectionContent = [];
  }

  getAllLanguage() {
    this._constantService
      .fetchDataApi(this._constantService.getAllLanguageServiceUrl(), {})
      .subscribe((data) => {
        let responseData: any = data;
        if ((responseData.success = this._constantService.success_msg)) {
          this._constantService.setAllLanguageObj(responseData.LNG_LIST);
          this.languageList = responseData.LNG_LIST;
          responseData.LNG_LIST;
          this.languageFetched = true;
        } else if (status == this._constantService.error_token) {
          this.dataConf["type"] = 4;
          this.dataConf["msg"] = "Session Expire";
          this.dataConf["error_msg"] = "Session Expired!";
          this.openConfirmation = true;
          return false;
        } else {
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "Error";
          this.dataConf["error_msg"] = responseData.ERROR_MSG;
          this.openConfirmation = true;
          return false;
        }
      });
  }

  createContent(type) {
    var createCont = {};
    createCont["token"] = this._constantService.getSessionDataBYKey("token");
    createCont["token_param"] = {};
    createCont["token_param"]["device_type"] = "w";
    createCont["token_param"]["host"] = "";
    createCont["sec_uuid"] = this.sectionId;
    createCont["pg_uuid"] = this.pageId;
    createCont["cors_uuid"] = this.courseId;
    createCont["cntnt_type"] = type;
    createCont["cntnt_title"] = this.postData.encodeURIPostData(
      this.course_title
    );

    this._constantService
      .fetchDataApi(this._constantService.getAddContentServiceUrl(), createCont)
      .subscribe((data) => {
        var responseData: any = data;
        var status = responseData.STATUS;
        if (status == this._constantService.success_msg) {
          this._constantService.setSessionJsonPair("token", responseData.TOKEN);
          this.contentId = responseData.CONTENT_UUID;
          this.fileUpload = true;
        } else if (status == this._constantService.error_token) {
          this.dataConf["type"] = 4;
          this.dataConf["msg"] = "Session Expire";
          this.dataConf["error_msg"] = "Session Expired!";
          this.openConfirmation = true;
          return false;
        } else {
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "Error";
          this.dataConf["error_msg"] = responseData.ERROR_MSG;
          this.openConfirmation = true;
          return false;
        }
      });
  }

  editSection(index) {
    this.selectedSectionIndex = index;
    this.sectionAdded = true;
    this.sectionId = this.courseSection[index].SECTION_UUID;
    this.secName = this.courseSection[index].SECTION_NAME;
    this.newSection = false;
  }

  closeAddQuiz(e) {
    if (e["status"]) {
      this.addTest = false;
      this.courseSection[this.selectedSectionIndex].SECTION_CONTENT.push({
        CONTENT_UUID: e["cntnt_id"],
        CONTENT_NAME: e["title"],
        CONTENT_TYPE: 3,
        CONTENT_OLD_NAME: "",
      });
    }
  }

  updateContent(id) {
    if (
      this.courseSection[this.selectedSectionIndex].SECTION_CONTENT[id]
        .CONTENT_TYPE == 3
    ) {
      this.pageData["updateStatus"] = true;
      this.pageData["cntnt_uuid"] = this.courseSection[
        this.selectedSectionIndex
      ].SECTION_CONTENT[id].CONTENT_UUID;
      this.addTest = true;
    }
  }

  deleteSectionConfirm(Sectionindex) {
    this.contentInfoObj = { section: Sectionindex, type: 1 };
    this.dataConf["type"] = 0;
    this.dataConf["msg"] = "STUDY24X7";
    this.dataConf["error_msg"] = "Do you really want to delete?";
    this.openDeleteConfirmation = true;
  }

  deleteCourseSection(Sectionindex) {
    var delSection = {};
    delSection["token"] = this._constantService.getSessionDataBYKey("token");
    delSection["token_param"] = {};
    delSection["token_param"]["device_type"] = "w";
    delSection["token_param"]["host"] = "";
    delSection["pg_uuid"] = this.pageId;
    delSection["cors_uuid"] = this.courseId;
    delSection["sec_uuid"] = this.courseContentSection[
      Sectionindex
    ].SECTION_UUID;

    this._constantService
      .fetchDataApi(
        this._constantService.getDeleteCourseSectionServiceUrl(),
        delSection
      )
      .subscribe((data) => {
        var responseData: any = data;
        var status = responseData.STATUS;
        if (status == "success") {
          this.courseContentSection.splice(Sectionindex, 1);
          this.currentSectionIndex = -1;
          this.refresh();
          //Test purpose
          //this.sectionAdded = false;
        } else if (status == this._constantService.error_token) {
          this.dataConf["type"] = 4;
          this.dataConf["msg"] = "Session Expire";
          this.dataConf["error_msg"] = "Session Expired!";
          this.openConfirmation = true;
          return false;
        } else {
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "Error";
          this.dataConf["error_msg"] = responseData.ERROR_MSG;
          this.openConfirmation = true;
          return false;
        }
      });
  }

  deleteContentConfirm(Sectionindex, contentIndex) {
    this.quiz_saved = false;
    this.quiz_unsaved_name = "";
    this.contentInfoObj = {
      section: Sectionindex,
      content: contentIndex,
      type: 2,
    };
    this.dataConf["type"] = 0;
    this.dataConf["msg"] = "STUDY24X7";
    this.dataConf["error_msg"] = "Do you really want to delete?";
    this.openDeleteConfirmation = true;
  }

  responseHandler(event) {
    let body = document.getElementsByTagName("body")[0];
    body.classList.remove("body-overflow");
    this.openDeleteConfirmation = false;

    if (event["userConfirmation"]) {
      if (this.contentInfoObj["type"] === 1) {
        this.deleteCourseSection(this.contentInfoObj["section"]);
      } else if (this.contentInfoObj["type"] === 2) {
        this.deleteCourseContent(
          this.contentInfoObj["section"],
          this.contentInfoObj["content"]
        );
      }
    }
  }

  deleteCourseContent(Sectionindex, contentIndex) {
    var delContent = {};
    delContent["token"] = this._constantService.getSessionDataBYKey("token");
    delContent["token_param"] = {};
    delContent["token_param"]["device_type"] = "w";
    delContent["token_param"]["host"] = "";
    delContent["pg_uuid"] = this.pageId;
    delContent["cors_uuid"] = this.courseId;
    delContent["cntnt_uuid"] = this.courseContentSection[
      Sectionindex
    ].SECTION_CONTENT[contentIndex].CONTENT_UUID;
    delContent["cntnt_typ"] = this.courseContentSection[
      Sectionindex
    ].SECTION_CONTENT[contentIndex].CONTENT_TYPE;

    this._constantService
      .fetchDataApi(
        this._constantService.getDeleteCourseSectionContentServcieUrl(),
        delContent
      )
      .subscribe((data) => {
        var responseData: any = data;
        var status = responseData.STATUS;
        if (status == "success") {
          this.courseContentSection[Sectionindex].SECTION_CONTENT.splice(
            contentIndex,
            1
          );
          this.refresh();
        } else if (status == this._constantService.error_token) {
          this.dataConf["type"] = 4;
          this.dataConf["msg"] = "Session Expire";
          this.dataConf["error_msg"] = "Session Expired!";
          this.openConfirmation = true;
          return false;
        } else {
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "Error";
          this.dataConf["error_msg"] = responseData.ERROR_MSG;
          this.openConfirmation = true;
          return false;
        }
      });
  }

  cancelEditCourseContent(Sectionindex, contentIndex) {
    if (
      this.courseContentSection[Sectionindex].SECTION_CONTENT[contentIndex]
        .CONTENT_UUID == ""
    ) {
      this.courseContentSection[Sectionindex].SECTION_CONTENT.splice(
        contentIndex,
        1
      );
    } else {
      this.courseContentSection[Sectionindex].SECTION_CONTENT[
        contentIndex
      ].edit = "false";
    }
    this.show_placeholder = true;
    this.show_placeholder2 = true;
  }

  lockVisiblityContent(Sectionindex, contentIndex) {
    var value =
      this.courseContentSection[Sectionindex].SECTION_CONTENT[contentIndex]
        .lock == "0"
        ? 1
        : 0;
    this.courseContentSection[Sectionindex].SECTION_CONTENT[
      contentIndex
    ].lock = value;
    var contentVisible = {};
    contentVisible["token"] = this._constantService.getSessionDataBYKey(
      "token"
    );
    contentVisible["token_param"] = {};
    contentVisible["token_param"]["device_type"] = "w";
    contentVisible["token_param"]["host"] = "";
    contentVisible["pg_uuid"] = this.pageId;
    contentVisible["cntnt_uuid"] = this.courseContentSection[
      Sectionindex
    ].SECTION_CONTENT[contentIndex].CONTENT_UUID;
    contentVisible["status"] = this.courseContentSection[
      Sectionindex
    ].SECTION_CONTENT[contentIndex].lock;

    this._constantService
      .fetchDataApi(
        this._constantService.getCourseContentVisiblityServiceUrl(),
        contentVisible
      )
      .subscribe((data) => {
        var responseData: any = data;
        var status = responseData.STATUS;
        if (status == "success") {
          //this._constantService.setToken(responseData.TOKEN);
          this._constantService.setSessionJsonPair("token", responseData.TOKEN);
        } else if (status == this._constantService.error_token) {
          this.dataConf["type"] = 4;
          this.dataConf["msg"] = "Session Expire";
          this.dataConf["error_msg"] = "Session Expired!";
          this.openConfirmation = true;
          return false;
        } else {
          var value =
            this.courseContentSection[Sectionindex].SECTION_CONTENT[
              contentIndex
            ].lock == "0"
              ? 1
              : 0;
          this.courseContentSection[Sectionindex].SECTION_CONTENT[
            contentIndex
          ].lock = value;
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "Error";
          this.dataConf["error_msg"] = responseData.ERROR_MSG;
          this.openConfirmation = true;
          return false;
        }
      });
  }

  delayFunc = (ms) => new Promise((res) => setTimeout(res, ms));

  //=========================Drag Drop And Ordering============================//
  async updateContentOrder(Sectionindex) {
    var contentOrder = {};
    contentOrder["token"] = this._constantService.getSessionDataBYKey("token");
    contentOrder["token_param"] = {};
    contentOrder["token_param"]["device_type"] = "w";
    contentOrder["token_param"]["host"] = "";
    contentOrder["pg_uuid"] = this.pageId;
    contentOrder["cors_uuid"] = this.courseId;
    contentOrder["sec_uuid"] = this.courseContentSection[
      Sectionindex
    ].SECTION_UUID;
    contentOrder["cntnt_ordr_arr"] = [];
    for (
      var i = 0;
      i < this.courseContentSection[Sectionindex].SECTION_CONTENT.length;
      i++
    ) {
      var contentArray = {};
      contentArray["cntnt_uuid"] = this.courseContentSection[
        Sectionindex
      ].SECTION_CONTENT[i].CONTENT_UUID;
      contentArray["order"] = i + 1;
      contentOrder["cntnt_ordr_arr"].push(contentArray);
    }
    await this.delayFunc(1000);
    this._constantService
      .fetchDataApi(
        this._constantService.getUpdateContentOrderServiceUrl(),
        contentOrder
      )
      .subscribe((data) => {
        this.refresh();
      });
  }

  updateSectionOrder() {
    var sectionOrder = {};
    sectionOrder["token"] = this._constantService.getSessionDataBYKey("token");
    sectionOrder["token_param"] = {};
    sectionOrder["token_param"]["device_type"] = "w";
    sectionOrder["token_param"]["host"] = "";
    sectionOrder["pg_uuid"] = this.pageId;
    sectionOrder["cors_uuid"] = this.courseId;
    sectionOrder["sec_ordr_arr"] = [];
    for (var i = 0; i < this.courseContentSection.length; i++) {
      var sectionArray = {};
      sectionArray["sec_uuid"] = this.courseContentSection[i].SECTION_UUID;
      sectionArray["order"] = i + 1;
      sectionOrder["sec_ordr_arr"].push(sectionArray);
    }
    this._constantService
      .fetchDataApi(
        this._constantService.getUpdateSectionOrderServiceUrl(),
        sectionOrder
      )
      .subscribe((data) => {
        var responseData: any = data;
      });
  }

  updateContentOrderOnNext() {
    if (this.selectedSectionIndex != -1) {
      this.updateContentOrder(this.selectedSectionIndex);
    }
  }
  //=========================End Drag Drop And Ordering End============================//

  getAllCourseForLibrary(count) {
    var sectionLibraryData = {};
    sectionLibraryData["token"] = this._constantService.getSessionDataBYKey(
      "token"
    );
    sectionLibraryData["token_param"] = {};
    sectionLibraryData["token_param"]["device_type"] = "w";
    sectionLibraryData["token_param"]["host"] = "";
    sectionLibraryData["pg_uuid"] = this.pageId;
    sectionLibraryData["cors_uuid"] = this.courseId;

    this._constantService
      .fetchDataApi(
        this._constantService.getAllCourseLibraryServiceUrl(),
        sectionLibraryData
      )
      .subscribe((data) => {
        var responseData: any = data;
        //(responseData.COURSE_IMPORT_DATA[1].COURSE_UUID);
        if (responseData.STATUS == this._constantService.success_msg) {
          if (responseData.COURSE_IMPORT_DATA.length == 10) {
            this.continueScrollForAllSectionLibrary = true;
            this.flowForAllCourseLibrary++;
          } else {
            this.continueScrollForAllSectionLibrary = false;
          }
          if (responseData.COURSE_IMPORT_DATA.length > 0) {
            ///*******add by vijay**********///

            this.isEmptyState1 = true;
          } else {
            this.isEmptyState = true;
          }
          ///****end by vijay**********///
          for (var i = 0; i < responseData.COURSE_IMPORT_DATA.length; i++) {
            var courseSection = {};

            courseSection["COURSE_UUID"] =
              responseData.COURSE_IMPORT_DATA[i].COURSE_UUID;
            courseSection["TITLE"] = this.postData.decodeURIPostData(
              responseData.COURSE_IMPORT_DATA[i].TITLE
            );
            for (const key in this.languageList) {
              if (this.languageList.hasOwnProperty(key)) {
                const element = this.languageList[key];
                if (
                  element.LANGUAGE_ID ==
                  responseData.COURSE_IMPORT_DATA[i].LANGUAGE
                ) {
                  courseSection["LANGUAGE"] = element.LANGUAGE;
                }
              }
            }
            courseSection["PDF_COUNT"] =
              responseData.COURSE_IMPORT_DATA[i].PDF_COUNT;
            courseSection["QUIZ_COUNT"] =
              responseData.COURSE_IMPORT_DATA[i].QUIZ_COUNT;
            courseSection["SECTION_COUNT"] =
              responseData.COURSE_IMPORT_DATA[i].SECTION_COUNT;
            courseSection["VIDEO_COUNT"] =
              responseData.COURSE_IMPORT_DATA[i].VIDEO_COUNT;
            var date = new Date();

            if (responseData.COURSE_IMPORT_DATA[i].COVER_TYPE == "1") {
              courseSection["COURSE_COVER_PHOTO_PATH"] =
                responseData.COURSE_IMPORT_DATA[i].COURSE_COVER_PHOTO_PATH +
                "?v=" +
                responseData.IMG_UPD_DT;
            } else {
              courseSection["COURSE_COVER_PHOTO_PATH"] =
                responseData.COURSE_IMPORT_DATA[i].COURSE_COVER_PHOTO_PATH +
                "cover/" +
                responseData.COURSE_IMPORT_DATA[i].COURSE_UUID +
                "_1235x330.png?v=" +
                responseData.IMG_UPD_DT;
            }
            courseSection["CONTENT"] = {};
            this.courseLibraryData.push(courseSection);
            //this.componentForSectionLibrary.directiveRef.scrollToTop();
            if (this.componentForSectionLibrary) {
              this.componentForSectionLibrary.autoPropagation = true;
              this.componentForSectionLibrary.disabled = false;
            }
            this.refresh();
          }
        } else if (status == this._constantService.error_token) {
          this.dataConf["type"] = 4;
          this.dataConf["msg"] = "Session Expire";
          this.dataConf["error_msg"] = "Session Expired!";
          this.openConfirmation = true;
          return false;
        } else {
          this.continueScrollForAllSectionLibrary = false;
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "Error";
          this.dataConf["error_msg"] = responseData.ERROR_MSG;
          this.openConfirmation = true;
          return false;
        }
      });
  }

  getAllCourseForLibraryScrollToBottom() {
    if (this.continueScrollForAllSectionLibrary) {
      this.getAllCourseForLibrary(this.flowForAllCourseLibrary);
    }
  }

  getAllDataFromCourseLibrary() {
    this.sectionContentLibraryData = [];
    var courseSectionList = {};
    courseSectionList["token"] = this._constantService.getSessionDataBYKey(
      "token"
    );
    courseSectionList["token_param"] = {};
    courseSectionList["token_param"]["device_type"] = "w";
    courseSectionList["token_param"]["host"] = "";
    courseSectionList["pg_uuid"] = this.pageId;
    courseSectionList["cors_uuid"] = this.selectedCorsIdForLibrary;
    this._constantService
      .fetchDataApi(
        this._constantService.getCourseDataServiceUrl(),
        courseSectionList
      )
      .subscribe((data) => {
        var responseData: any = data;
        if ((responseData.STATUS = this._constantService.success_msg)) {
          responseData;
          for (var i = 0; i < responseData.CONTENT_DETAILS.length; i++) {
            var courseSection = {};
            courseSection["SECTION_UUID"] =
              responseData.CONTENT_DETAILS[i].SECTION_UUID;
            courseSection["TITLE"] = this.postData.decodeURIPostData(
              responseData.CONTENT_DETAILS[i].SECTION_TITLE
            );
            courseSection["selection"] = false;
            courseSection["CONTENT_DATA"] = [];
            if (responseData.CONTENT_DETAILS[i].SECTION_CONTENT_DATA != null) {
              for (
                var j = 0;
                j < responseData.CONTENT_DETAILS[i].SECTION_CONTENT_DATA.length;
                j++
              ) {
                var course_content_data = {};
                course_content_data["CONTENT_UUID"] =
                  responseData.CONTENT_DETAILS[i].SECTION_CONTENT_DATA[
                    j
                  ].CONTENT_UUID;
                course_content_data["CONTENT_TYPE"] =
                  responseData.CONTENT_DETAILS[i].SECTION_CONTENT_DATA[
                    j
                  ].CONTENT_TYPE;
                course_content_data["SECTION_UUID"] =
                  responseData.CONTENT_DETAILS[i].SECTION_UUID;
                course_content_data["TITLE"] = this.postData.decodeURIPostData(
                  responseData.CONTENT_DETAILS[i].SECTION_CONTENT_DATA[j].TITLE
                );
                course_content_data["selection"] = false;
                if (
                  course_content_data["CONTENT_TYPE"] == 1 ||
                  course_content_data["CONTENT_TYPE"] == 4 ||
                  course_content_data["CONTENT_TYPE"] == 5
                ) {
                  course_content_data["INFO"] =
                    responseData.CONTENT_DETAILS[i].SECTION_CONTENT_DATA[j]
                      .DURATION == null
                      ? ""
                      : responseData.CONTENT_DETAILS[i].SECTION_CONTENT_DATA[j]
                        .DURATION + "min";
                } else if (course_content_data["CONTENT_TYPE"] == 2) {
                  course_content_data["INFO"] =
                    responseData.CONTENT_DETAILS[i].SECTION_CONTENT_DATA[j]
                      .PAGES == null
                      ? ""
                      : responseData.CONTENT_DETAILS[i].SECTION_CONTENT_DATA[j]
                        .PAGES + "pages";
                } else if (course_content_data["CONTENT_TYPE"] == 3) {
                  course_content_data["INFO"] =
                    responseData.CONTENT_DETAILS[i].SECTION_CONTENT_DATA[j]
                      .QUESTION_COUNT == null
                      ? ""
                      : responseData.CONTENT_DETAILS[i].SECTION_CONTENT_DATA[j]
                        .QUESTION_COUNT + "ques";
                } else if (course_content_data["CONTENT_TYPE"] == 6) {
                  course_content_data["INFO"] = "1 Test";
                }
                courseSection["CONTENT_DATA"].push(course_content_data);
              }
            }
            this.sectionContentLibraryData.push(courseSection);
          }
          this.getAllContentOfLibrary();
        } else if (status == this._constantService.error_token) {
          this.dataConf["type"] = 4;
          this.dataConf["msg"] = "Session Expire";
          this.dataConf["error_msg"] = "Session Expired!";
          this.openConfirmation = true;
          return false;
        } else {
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "Error";
          this.dataConf["error_msg"] = responseData.ERROR_MSG;
          this.openConfirmation = true;
          return false;
        }
      });
  }

  clickCheckBoxSectionLib(id, uuid) {
    // $(id).prop("checked", true);
    var selectedSection = <HTMLInputElement>(<any>document.getElementById(id));
    selectedSection.checked = !selectedSection.checked;
    this.sectionContentLibraryData[
      this.sectionContentLibraryData.findIndex(
        (data) => data.SECTION_UUID == uuid
      )
    ].selection = selectedSection.checked;
    var selectedContent = document.getElementsByName(
      "contentCheckGroup" + uuid
    );
    for (var i = 0; i < selectedContent.length; i++) {
      (<HTMLInputElement>(<any>selectedContent[i])).checked =
        selectedSection.checked;
    }
    // var temArray = this.AllContentOfLib.filter((data) => data.SECTION_UUID == uuid);
    this.AllContentOfLib.filter((data) => data.SECTION_UUID == uuid).forEach(
      (data2) => (data2.selection = selectedSection.checked)
    );
    this.AllContentOfLib;
    this.getSelectedContent();
  }

  getAllContentsFromSection() {
    return this.courseLibraryData;
  }

  clickCheckBoxContentLib(id, section_UUID, content_UUID, index) {
    // $(id).prop("checked", true);
    var selectedContent = <HTMLInputElement>(<any>document.getElementById(id));
    selectedContent.checked = !selectedContent.checked;
    if (index == -2) {
      index = this.sectionContentLibraryData
        .filter((data) => data.CONTENT_DATA.length > 0)
        .findIndex((data) => data.SECTION_UUID == section_UUID);
      this.AllContentOfLib[
        this.AllContentOfLib.findIndex(
          (data) => data.CONTENT_UUID == content_UUID
        )
      ].selection = selectedContent.checked;
      //("filter",this.AllContentOfLib,this.AllContentOfLib.filter((data) => data.SECTION_UUID == this.sectionContentLibraryData[this.sectionContentLibraryData.findIndex((data)=> data.SECTION_UUID == section_UUID)].SECTION_UUID).every((data2)=>data2.selection == true));
      if (
        this.AllContentOfLib.filter(
          (data) =>
            data.SECTION_UUID ==
            this.sectionContentLibraryData[
              this.sectionContentLibraryData.findIndex(
                (data) => data.SECTION_UUID == section_UUID
              )
            ].SECTION_UUID
        ).every((data) => data.selection == true)
      ) {
        this.sectionContentLibraryData[
          this.sectionContentLibraryData.findIndex(
            (data) => data.SECTION_UUID == section_UUID
          )
        ].selection = true;
      } else {
        this.sectionContentLibraryData[
          this.sectionContentLibraryData.findIndex(
            (data) => data.SECTION_UUID == section_UUID
          )
        ].selection = false;
      }
    } else {
      var selectedSectionTab = <HTMLInputElement>(
        (<any>document.getElementById("sectionCheck" + index))
      );
      this.AllContentOfLib[
        this.AllContentOfLib.findIndex(
          (data) => data.CONTENT_UUID == content_UUID
        )
      ].selection = selectedContent.checked;
      //("filter",this.AllContentOfLib,this.AllContentOfLib.filter((data) => data.SECTION_UUID == this.sectionContentLibraryData[this.sectionContentLibraryData.findIndex((data)=> data.SECTION_UUID == section_UUID)].SECTION_UUID).every((data2)=>data2.selection == true));
      if (
        this.AllContentOfLib.filter(
          (data) =>
            data.SECTION_UUID ==
            this.sectionContentLibraryData[
              this.sectionContentLibraryData.findIndex(
                (data) => data.SECTION_UUID == section_UUID
              )
            ].SECTION_UUID
        ).every((data) => data.selection == true)
      ) {
        this.sectionContentLibraryData[
          this.sectionContentLibraryData.findIndex(
            (data) => data.SECTION_UUID == section_UUID
          )
        ].selection = true;
        selectedSectionTab.checked = true;
      } else {
        this.sectionContentLibraryData[
          this.sectionContentLibraryData.findIndex(
            (data) => data.SECTION_UUID == section_UUID
          )
        ].selection = false;
        selectedSectionTab.checked = false;
      }
    }
    this.getSelectedContent();
  }

  clickCheckBoxexceptSetion(id, section_UUID, content_UUID) {
    // $(id).prop("checked", true);
    var selectedSection = <HTMLInputElement>(<any>document.getElementById(id));
    selectedSection.checked = !selectedSection.checked;
    this.AllContentOfLib[
      this.AllContentOfLib.findIndex(
        (data) => data.CONTENT_UUID == content_UUID
      )
    ].selection = selectedSection.checked;
    if (
      this.AllContentOfLib.filter(
        (data) =>
          data.SECTION_UUID ==
          this.sectionContentLibraryData[
            this.sectionContentLibraryData.findIndex(
              (data) => data.SECTION_UUID == section_UUID
            )
          ].SECTION_UUID
      ).every((data) => data.selection == true)
    ) {
      this.sectionContentLibraryData[
        this.sectionContentLibraryData.findIndex(
          (data) => data.SECTION_UUID == section_UUID
        )
      ].selection = true;
    } else {
      this.sectionContentLibraryData[
        this.sectionContentLibraryData.findIndex(
          (data) => data.SECTION_UUID == section_UUID
        )
      ].selection = false;
    }
    this.getSelectedContent();
  }

  searchKeyUp() {
    if (this.librarySearchString == "") {
      this.isSearchedLib = false;
      this.filterContentTypePDF();
      this.filterContentTypeQUIZ();
      this.filterContentTypeVideo();
      this.getAllContentsFromSection();
    } else {
      this.isSearchedLib = true;
      this.filterContentTypePDF();
      this.filterContentTypeQUIZ();
      this.filterContentTypeVideo();
      this.filterContentTypeSECTION();
      this.getAllContentsFromSection();
    }
  }

  getAllContentOfLibrary() {
    this.AllContentOfLib = [];
    for (var i = 0; i < this.sectionContentLibraryData.length; i++) {
      for (
        var j = 0;
        j < this.sectionContentLibraryData[i].CONTENT_DATA.length;
        j++
      ) {
        this.AllContentOfLib.push(
          this.sectionContentLibraryData[i].CONTENT_DATA[j]
        );
      }
    }
    // (this.AllContentOfLib);
    this.refresh();
  }

  filterContentTypePDF() {
    if (!(this.librarySearchString.length > 0)) {
      return this.AllContentOfLib.filter((data) => data.CONTENT_TYPE == 2);
    } else {
      return this.AllContentOfLib.filter(
        (data) =>
          data.CONTENT_TYPE == 2 &&
          data.TITLE.toString()
            .toLowerCase()
            .includes(this.librarySearchString.toLowerCase())
      );
    }
  }

  filterContentTypeSECTION() {
    if (this.librarySearchString.length > 0) {
      return this.AllContentOfLib.filter((data) =>
        data.TITLE.toString()
          .toLowerCase()
          .includes(this.librarySearchString.toLowerCase())
      );
    } else {
      var filteredData = this.sectionContentLibraryData.filter(
        (data) => data.CONTENT_DATA.length > 0
      );
      return filteredData;
    }
  }

  filterContentTypeVideo() {
    if (this.librarySearchString.length > 0) {
      return this.AllContentOfLib.filter(
        (data) =>
          (data.CONTENT_TYPE == 1 ||
            data.CONTENT_TYPE == 4 ||
            data.CONTENT_TYPE == 5) &&
          data.TITLE.toString()
            .toLowerCase()
            .includes(this.librarySearchString.toLowerCase())
      );
    } else {
      return this.AllContentOfLib.filter(
        (data) =>
          data.CONTENT_TYPE == 1 ||
          data.CONTENT_TYPE == 4 ||
          data.CONTENT_TYPE == 5
      );
    }
  }

  filterContentTypeQUIZ() {
    if (this.librarySearchString.length > 0) {
      return this.AllContentOfLib.filter(
        (data) =>
          (data.CONTENT_TYPE == 3 || data.CONTENT_TYPE == 6) &&
          data.TITLE.toString()
            .toLowerCase()
            .includes(this.librarySearchString.toLowerCase())
      );
    } else {
      return this.AllContentOfLib.filter(
        (data) => data.CONTENT_TYPE == 3 || data.CONTENT_TYPE == 6
      );
    }
  }

  getSelectedContent() {
    return this.AllContentOfLib.filter((data) => data.selection == true);
  }

  importLibraryContent() {
    this.librarySearchString = "";
    if (this.UnderProcess == true) {
      this.UnderProcess = false;
      this.oneTimeBool = true;
      if (!this.oneTimeBool) {
        return;
      }
      let body = document.getElementsByTagName("body")[0];
      body.classList.remove("body-overflow");

      // getImportedLibraryServiceUrl
      if (
        this.AllContentOfLib.filter((data) => data.selection == true).length > 0
      ) {
        var importLib = {};
        importLib["token"] = this._constantService.getSessionDataBYKey("token");
        importLib["token_param"] = {};
        importLib["token_param"]["device_type"] = "w";
        importLib["token_param"]["host"] = "";
        importLib["pg_uuid"] = this.pageId;
        importLib["cors_uuid"] = this.courseId;
        var selectedImportData = this.AllContentOfLib.filter(
          (data) => data.selection == true
        );
        importLib["to_sec_uuid"] = this.selectedfromSectionLib;
        selectedImportData;
        var selectedobject = "";
        for (var i = 0; i < selectedImportData.length; i++) {
          selectedobject =
            selectedobject + selectedImportData[i].CONTENT_UUID + ",";
        }
        importLib["from_cntnt_uuid"] = selectedobject;

        this._constantService
          .fetchDataApi(
            this._constantService.getImportedLibraryServiceUrl(),
            importLib
          )
          .subscribe((data) => {
            var responseData: any = data;
            if (responseData.STATUS == "success") {
              this.UnderProcess = true;
              for (var j = 0; j < responseData.IMPORT_IMFORMATION.length; j++) {
                var content_typevideoPDfQuiz;
                var content_typeUploadorURl;
                var content_typeYoutubeorVimeo;
                var editTypeURL;
                var OldFilename;
                if (
                  responseData.IMPORT_IMFORMATION[j].CONTENT_TYPE == 4 ||
                  responseData.IMPORT_IMFORMATION[j].CONTENT_TYPE == 5
                ) {
                  content_typevideoPDfQuiz = 1;
                  content_typeUploadorURl = 1;
                  editTypeURL = "true";
                  OldFilename =
                    responseData.IMPORT_IMFORMATION[j].ORIGINAL_NAME;
                  content_typeYoutubeorVimeo =
                    responseData.IMPORT_IMFORMATION[j].CONTENT_TYPE;
                } else if (
                  responseData.IMPORT_IMFORMATION[j].CONTENT_TYPE == 2
                ) {
                  content_typevideoPDfQuiz = 2;
                  content_typeUploadorURl = 0;
                  content_typeYoutubeorVimeo = 0;
                  OldFilename =
                    responseData.IMPORT_IMFORMATION[j].ORIGINAL_NAME;
                  editTypeURL = "false";
                } else if (
                  responseData.IMPORT_IMFORMATION[j].CONTENT_TYPE == 3
                ) {
                  content_typevideoPDfQuiz = 3;
                  content_typeUploadorURl = 0;
                  editTypeURL = "false";
                  content_typeYoutubeorVimeo = 0;
                } else if (
                  responseData.IMPORT_IMFORMATION[j].CONTENT_TYPE == 1
                ) {
                  content_typevideoPDfQuiz = 1;
                  content_typeUploadorURl = 2;
                  OldFilename =
                    responseData.IMPORT_IMFORMATION[j].ORIGINAL_NAME;
                  editTypeURL = "false";
                  content_typeYoutubeorVimeo = 0;
                } else if (
                  responseData.IMPORT_IMFORMATION[j].CONTENT_TYPE == 6
                ) {
                  content_typevideoPDfQuiz = 6;
                  content_typeUploadorURl = 0;
                  editTypeURL = "false";
                  content_typeYoutubeorVimeo = 0;
                }
                var path;
                if (responseData.IMPORT_IMFORMATION[j].CONTENT_TYPE == 1) {
                  path =
                    responseData.IMPORT_IMFORMATION[j].PATH +
                    "/lectures/" +
                    this.courseId +
                    ".mp4";
                } else if (
                  responseData.IMPORT_IMFORMATION[j].CONTENT_TYPE == 2
                ) {
                  path =
                    responseData.IMPORT_IMFORMATION[j].PATH +
                    "/docs/" +
                    this.courseId +
                    ".pdf";
                  if (OldFilename == null) {
                    OldFilename = "";
                  }
                } else if (
                  responseData.IMPORT_IMFORMATION[j].CONTENT_TYPE == 3
                ) {
                } else if (
                  responseData.IMPORT_IMFORMATION[j].CONTENT_TYPE == 4
                ) {
                  path =
                    "https://www.youtube.com/watch?v=" +
                    responseData.IMPORT_IMFORMATION[j].PATH;
                  OldFilename = path;
                } else if (
                  responseData.IMPORT_IMFORMATION[j].CONTENT_TYPE == 5
                ) {
                  path =
                    "https://vimeo.com/" +
                    responseData.IMPORT_IMFORMATION[j].PATH;
                  OldFilename = path;
                }
                this.courseContentSection[
                  this.indexPosSectionLibrary
                ].SECTION_CONTENT.push({
                  CONTENT_UUID: responseData.IMPORT_IMFORMATION[j].CONTENT_UUID,
                  file: "",
                  CONTENT_FILE_NAME: this.postData.decodeURIPostData(
                    responseData.IMPORT_IMFORMATION[j].TITLE
                  ),
                  CONTENT_TYPE: content_typevideoPDfQuiz,
                  CONTENT_OLD_NAME: OldFilename,
                  DocumentPath:
                    responseData.IMPORT_IMFORMATION[j].DOCUMENT_PATH,
                  edit: "false",
                  CONTENT_DATA_TYPE: content_typeUploadorURl,
                  download: editTypeURL == "false" ? "true" : "false",
                  addURL: editTypeURL,
                  progress: "false",
                  content_orderId: responseData.IMPORT_IMFORMATION[j].ORDERING,
                  urlType: content_typeYoutubeorVimeo,
                  path: path,
                  lock: responseData.IMPORT_IMFORMATION[j].VISIBILITY,
                  INFO: "",
                  reviewStatus: "",
                  placeholder: "",
                  CONTENT_URL_NAME: "",
                  progressPercentage: 0,
                  progressBar: 339.292,
                });
              }
              this.showlibrary = false;
              this.coursePopup = true;
              this.oneTimeBool = false;
              this.refresh();
            }
          });
      } else {
        this.dataConf["msg"] = "STUDY24X7";
        this.dataConf["type"] = 2;
        this.dataConf["error_msg"] = "Please select files to import";
        this.openConfirmation = true;
      }
    }
  }

  sessionExpire(event) {
    if (event) {
      this.dataConf["type"] = 4;
      this.dataConf["msg"] = "Session Expire";
      this.dataConf["error_msg"] = "Session Expired";
      this.openConfirmation = true;
    }
  }

  can_video_loading() {
    this.videoLoader = false;
  }

  switcher(index) {
    if (index == 1) {
      this.library = false;
    } else if (index == 2) {
      this.library = true;
    }
  }

  showimageGallery() {
    this.image_gallery = true;
    let body = document.getElementsByTagName("body")[0];
    body.classList.add("body-overflow");
    this.getLibraryCoverPics();
  }
  hideimageGallery() {
    this.image_gallery = false;
    let body = document.getElementsByTagName("body")[0];
    body.classList.remove("body-overflow");
  }
  galleryimageuploader() {
    this.uploadImgLoader = false;
  }

  courseProcessFunc(index) {
   
    if (this.BlockLeftClick) {
      return;
    }
    this.desableIcon = false;
    if (index == 1) {
      setTimeout(()=>{
        this.quillEditor=undefined;
      },100);

      this.getCourseDetails(this.courseId);
      this.firstProcessLevel = true;
      this.secondcurrentProcess = true;
      this.courseProcess = index;

    }
    if (index == 2) {

      if (this.draftCourse == false) {
        if (this.validateProcess1next()) {
          this.createCourse();
        }
      } else if (this.draftCourse == true) {
        if (this.courseProcess!=index && this.validateProcess1next()) {
          if (this.updateCourseTitle()) {
            this.getCourseDetails(this.courseId);
            this.firstProcessLevel = true;
            this.courseProcess = index;
            this.secondcurrentProcess = true;
          }
        }
      }
      setTimeout(() => {
        this.enableEditorQuill();
      }, 200);
    } else if (index == 3) {
      setTimeout(()=>{
        this.quillEditor=undefined;
      },100);
      // this.getCourseDetails(this.courseId);
      if (this.validateCourseDescription()) {
        this.getCourseDetails(this.courseId);
        this.firstProcessLevel = true;
        this.secondProcessLevel = true;
        this.thirdcurrentProcess = true;
        this.courseProcess = index;
      }
    } else if (index == 4) {
      setTimeout(()=>{
        this.quillEditor=undefined;
      },100);
      if (this.validateCoursePrice() && this.validateTrialData()) {
        this.addCourseCosts(index);
        this.addUpdTrialStatus();

        this.getCourseDetails(this.courseId);
        this.firstProcessLevel = true;
        this.secondProcessLevel = true;
        this.thirdProcessLevel = true;
        this.fourthcurrentProcess = true;
        this.courseProcess = index;
      }
    } else if (index == 5) {
      setTimeout(()=>{
        this.quillEditor=undefined;
      },100);
      if (this.quiz_saved) {
        this.dataConf["type"] = 2;
        this.dataConf["msg"] = "Error";
        this.dataConf["error_msg"] =
          "Your quiz " +
          "(" +
          this.quiz_unsaved_name +
          ")" +
          " is unsaved. Please first save it.";
        this.openConfirmation = true;
        return false;
      } else {
        if (!this.validateSectionAndContent()) {
          return;
        } else {
          this.firstProcessLevel = true;
          this.secondProcessLevel = true;
          this.thirdProcessLevel = true;
          this.fourthProcessLevel = true;
          this.fifthcurrentProcess = true;
          this.courseProcess = index;
          this.fifthcurrentProcess = true;
          this.fifthProcessLevel = false;
          this.updateContentOrderOnNext();
          var sectionNameInput = <HTMLInputElement>(
            document.getElementById("sectionName")
          );
          if (sectionNameInput) {
            var data = sectionNameInput.value;
            data = data.replace(this.placeholderTextDesc, "").trim();
            if (data.length == 0) {
              this.dataConf["msg"] = "STUDY24X7";
              this.dataConf["type"] = 2;
              this.dataConf["error_msg"] =
                "Please enter some content in section";
              this.openConfirmation = true;
              return;
            }
          }

          this.getCourseDetails(this.courseId);
        }
      }
    } else if (index == 6) {
      this.fifthcurrentProcess = true;
      this.fifthProcessLevel = true;
      this.preview = 2;
      this.courseProcess = index;
    }
    
  }

  moveToLastProcessOnStart(id, progreesbutton) {
    var courseDetails = {};
    courseDetails["token"] = this._constantService.getSessionDataBYKey("token");
    courseDetails["token_param"] = {};
    courseDetails["token_param"]["device_type"] = "w";
    courseDetails["token_param"]["host"] = "";
    courseDetails["pg_uuid"] = this.pageId;
    courseDetails["cors_uuid"] = this.courseId;

    this._constantService
      .fetchDataApi(
        this._constantService.getCourseDetailsServiceUrl(),
        courseDetails
      )
      .subscribe((data) => {
        var responseData: any = data;
        var status = responseData.STATUS;
        if (status == "success") {
          var savedPageData;

          savedPageData = responseData.COURSE_DETAILS;
          // this.setCourseUrl = savedPageData.COURSE_URL;
          if (progreesbutton == 0) {
            if (
              savedPageData.COURSE_TITLE != "" &&
              savedPageData.COURSE_TITLE != null
            ) {
            }
          }
          if (progreesbutton == 1) {
            if (
              savedPageData.COURSE_TITLE != "" &&
              savedPageData.COURSE_TITLE != null &&
              savedPageData.DESCRIPTION != "" &&
              savedPageData.DESCRIPTION != null &&
              savedPageData.LANGUAGE != "" &&
              savedPageData.LANGUAGE != null &&
              savedPageData.COURSE_LEVEL != "" &&
              savedPageData.COURSE_LEVEL != null &&
              savedPageData.COURSE_COVER_PHOTO_PATH != "" &&
              savedPageData.COURSE_COVER_PHOTO_PATH != null
            ) {
            }
          }
          if (progreesbutton == 2) {
            if (
              savedPageData.COURSE_TITLE != "" &&
              savedPageData.COURSE_TITLE != null &&
              savedPageData.DESCRIPTION != "" &&
              savedPageData.DESCRIPTION != null &&
              savedPageData.LANGUAGE != "" &&
              savedPageData.LANGUAGE != null &&
              savedPageData.COURSE_LEVEL != "" &&
              savedPageData.COURSE_LEVEL != null &&
              savedPageData.COURSE_COVER_PHOTO_PATH != "" &&
              savedPageData.COURSE_COVER_PHOTO_PATH != null
            ) {
            }
          }
          if (progreesbutton == 3) {
            if (
              savedPageData.COURSE_TITLE != "" &&
              savedPageData.COURSE_TITLE != null &&
              savedPageData.DESCRIPTION != "" &&
              savedPageData.DESCRIPTION != null &&
              savedPageData.LANGUAGE != "" &&
              savedPageData.LANGUAGE != null &&
              savedPageData.COURSE_LEVEL != "" &&
              savedPageData.COURSE_LEVEL != null &&
              savedPageData.COURSE_COVER_PHOTO_PATH != "" &&
              savedPageData.COURSE_COVER_PHOTO_PATH != null
            ) {
            }
          }
          if (progreesbutton == 4) {
            if (
              savedPageData.COURSE_TITLE != "" &&
              savedPageData.COURSE_TITLE != null &&
              savedPageData.DESCRIPTION != "" &&
              savedPageData.DESCRIPTION != null &&
              savedPageData.LANGUAGE != "" &&
              savedPageData.LANGUAGE != null &&
              savedPageData.COURSE_LEVEL != "" &&
              savedPageData.COURSE_LEVEL != null &&
              savedPageData.COURSE_COVER_PHOTO_PATH != "" &&
              savedPageData.COURSE_COVER_PHOTO_PATH != null &&
              savedPageData.SECTION_DATA != "" &&
              savedPageData.SECTION_DATA != null
            ) {
            }
          }
        }
      });
  }

  del_courese() {
    this.preview = 3;
  }

  editSectionName(index) {
    if (this.sectionEditButtonValue != -1) {
      this.secName = document.getElementById("editable" + index).innerText;
      this.addUpdateSection(index);
    }
    this.sectionEditButtonValue = index;
  }

  editpdfName() {
    this.editPdf = !this.editPdf;
  }
  editVideoName() {
    this.editvideo = !this.editvideo;
  }

  setViewOfSection() {
    for (var i = 0; i < this.courseContentSection.length - 1; i++) {
      document.getElementById("content_Inner_Wrapper" + i), i;
      document
        .getElementById("content_Inner_Wrapper" + i.toString())
        .classList.add("content_wrapper_height");
      document
        .getElementById("content_Inner_sibling" + i.toString())
        .classList.add("content_wrapper_height");
    }
  }

  sliderContent(index, sectionClass) {
    console.log("in");
    let footerId = "content_Inner_sibling" + index;
    console.log(footerId);

    if (this.currentSectionIndex != -1) {
      this.updateContentOrder(this.currentSectionIndex);
    }
    this.currentSectionIndex = index;

    var y = document.getElementsByClassName("section_name_wrapper2");

    if (
      document
        .getElementById(sectionClass)
        .classList.contains("content_wrapper_height")
    ) {
      for (var i = 0; i < y.length; i++) {
        if (!y[i].classList.contains("content_wrapper_height")) {
          y[i].classList.add("content_wrapper_height");
        }
      }
      document
        .getElementById(sectionClass)
        .classList.remove("content_wrapper_height");
      document
        .getElementById(footerId)
        .classList.remove("content_wrapper_height");
    } else {
      for (var i = 0; i < y.length; i++) {
        if (!y[i].classList.contains("content_wrapper_height")) {
          y[i].classList.add("content_wrapper_height");
        }
      }
      document
        .getElementById(sectionClass)
        .classList.add("content_wrapper_height");
    }
    // (this.courseContentSection.length-1, index,"last");
    // if(this.courseContentSection.length-1  == index){
    if (
      this.courseContentSection[this.courseContentSection.length - 1]
        .SECTION_UUID == ""
    ) {
      document
        .getElementById(
          "content_wrapper" + (this.courseContentSection.length - 1)
        )
        .classList.remove("content_wrapper_height");
      this.courseContentSection.pop();
    }
    // }
  }

  sectionListLib(index) {
    index;
    let y = document
      .getElementById(index)
      .classList.contains("acc_wrapper_height");
    if (!y) {
      document.getElementById(index).classList.add("acc_wrapper_height");
      //this.getAllSectionContentFromCourseLibrary(sectionId);
    } else {
      document.getElementById(index).classList.remove("acc_wrapper_height");
    }
  }

  addURL(sectionIndex, contentIndex) {
    this.courseContentSection[sectionIndex].SECTION_CONTENT[
      contentIndex
    ].addURL = "true";
    this.courseContentSection[sectionIndex].SECTION_CONTENT[
      contentIndex
    ].CONTENT_DATA_TYPE = 1;
    this.courseContentSection[sectionIndex].SECTION_CONTENT[
      contentIndex
    ].download = "false";
    this.courseContentSection[sectionIndex].SECTION_CONTENT[
      contentIndex
    ].CONTENT_URL_NAME = this.TitleContentVideoPlaceHolder;
  }

  addLinkTest(sectionIndex, contentIndex) {
    this.courseContentSection[sectionIndex].SECTION_CONTENT[
      contentIndex
    ].addURL = "true";
    this.courseContentSection[sectionIndex].SECTION_CONTENT[
      contentIndex
    ].CONTENT_DATA_TYPE = 6;
    this.courseContentSection[sectionIndex].SECTION_CONTENT[
      contentIndex
    ].download = "false";
    this.courseContentSection[sectionIndex].SECTION_CONTENT[
      contentIndex
    ].CONTENT_URL_NAME = this.TitleContentVideoPlaceHolder;
  }

  showvideo(index) {
    this.videoedit = index;
    this.addurl = false;
  }

  // library_popup(index){
  //   this.library_popup=!this.library_popup;
  //   this.coursePopup=true;
  // }

  showLibrary(fromSectionLib, index) {
    let body = document.getElementsByTagName("body")[0];
    body.classList.add("body-overflow");

    this.showlibrary = !this.showlibrary;
    this.coursePopup = true;
    this.getAllCourseForLibrary(this.flowForAllCourseLibrary);
    this.selectedfromSectionLib = fromSectionLib;
    this.indexPosSectionLibrary = index;
    this.courseLibraryData = [];
    this.refresh();
  }

  hideLibraryPopup() {
    let body = document.getElementsByTagName("body")[0];
    body.classList.add("body-overflow");
  }

  hideLibrary() {
    this.librarySearchString = "";

    let body = document.getElementsByTagName("body")[0];
    body.classList.remove("body-overflow");

    this.coursePopup = false;
    this.courseLibraryData = [];
    this.flowForAllCourseLibrary = 1;
    if (this.componentForSectionLibrary) {
      this.componentForSectionLibrary.directiveRef.update();
      this.componentForSectionLibrary.disabled = true;
    }
    this.showlibrary = !this.showlibrary;
  }
  showsubsection(corsID, name) {
    this.coursePopup = false;
    this.popuptab = 1;
    this.selectedCorsIdForLibrary = corsID;
    this.selectedCourseNameforLibrary = name;
    this.refresh();
    //this.getAllDataFromCourseLibrary();
  }

  showPdfsection() {
    this.coursePopup = false;
    this.popuptab = 2;
    //HIT FOR PDF LIST
  }
  showVideosection() {
    this.coursePopup = false;
    this.popuptab = 3;
    //HIT FOR video LIST
  }
  showQuizsection() {
    this.coursePopup = false;
    this.popuptab = 4;
    //HIT FOR quiz LIST
  }

  idContent;
  contentHeight;
  setContentHeight;

  preview_dropdown(index, count) {
    this.idContent = document.getElementById("previewlist" + count);
    this.contentHeight = this.idContent.offsetHeight;
    this.setContentHeight = document.getElementById(
      "previewInnerlist" + count
    ).offsetHeight;
    if (this.contentHeight > 0) {
      document.getElementById("previewlist" + count).style.height = 0 + "px";
    } else {
      document.getElementById("previewlist" + count).style.height =
        this.setContentHeight + "px";
    }

    // let y = document.getElementById(index).classList.contains("hidelist")
    // if (!y) {
    //     document.getElementById(index).classList.add("hidelist");
    // }
    // else {
    //     document.getElementById(index).classList.remove("hidelist");
    // }

    this.arrowRotate(count);
  }

  arrowRotate(index) {
    let head = "coursepreviewlisthead" + index;
    let x = document.getElementById(head).classList.contains("rotateImg");

    if (!x) {
      document.getElementById(head).classList.add("rotateImg");
    } else {
      document.getElementById(head).classList.remove("rotateImg");
    }
  }

  getActualAndDiscountPrice() {
    if (this.coursePaymentCheck) {
      if (
        this.courceCostlist.findIndex((data1) => data1.currenc_typ == "INR") >
        -1
      ) {
        this.previewActualPrice = this.courceCostlist.filter(
          (data) => data.currenc_typ == "INR"
        )[0].cost;
        this.previewDiscountPrice = this.courceCostlist.filter(
          (data) => data.currenc_typ == "INR"
        )[0].discount;
      } else {
        this.previewActualPrice = this.courceCostlist[0].cost;
        this.previewDiscountPrice = this.courceCostlist[0].discount;
      }
    } else {
    }
  }

  getCourseDetails(id) {
    var courseDetails = {};
    courseDetails["token"] = this._constantService.getSessionDataBYKey("token");
    courseDetails["token_param"] = {};
    courseDetails["token_param"]["device_type"] = "w";
    courseDetails["token_param"]["host"] = "";
    courseDetails["pg_uuid"] = this.pageId;
    courseDetails["cors_uuid"] = id;

    this._constantService
      .fetchDataApi(
        this._constantService.getCourseDetailsServiceUrl(),
        courseDetails
      )
      .subscribe((data) => {
        var responseData: any = data;
        var status = responseData.STATUS;
        if (status == "success") {
          if (responseData.COURSE_DETAILS.SECTION_DATA.length != 0) {
            let sectionArr = responseData.COURSE_DETAILS.SECTION_DATA;
            sectionArr.forEach((section) => {
              let contentArr = section.SECTION_CONTENT_DATA;
              contentArr.forEach((content) => {
                if (content.CONTENT_TYPE == 3) {
                  if (content.STATUS == 2) {
                    this.quiz_saved = true;
                    this.quiz_unsaved_name = this.postData.decodeURIPostData(
                      content.CONTENT_TITLE
                    );
                  }
                }
              });
            });
          }

          if (Object.entries(responseData.COURSE_DETAILS).length == 0) {
            this.router.navigate(["/400"]);
          }
          this.courseInt = responseData.COURSE_DETAILS.INTEREST;
          this.draftCourse = true;
          if (responseData.IS_EMBEDDED == 1) {
            this.embededCourseActive = true;
          } else {
            this.embededCourseActive = false;
          }
          this.savedPageData = responseData.COURSE_DETAILS;
          this.isEditable = responseData.COURSE_DETAILS.IS_EDITABLE;
          if (this.isEditable == 0) {
            this.IsCourseReview = true;
          } else {
            this.IsCourseReview = false;

          }

          this.cd.markForCheck();
          this.publishvalue = responseData.COURSE_DETAILS.PUBLISH;
          // if (this.savedPageData.COURSE_TAGS.length > 4) {
          //     this.showTagsInput = false;
          // } else {
          //     this.showTagsInput = true
          // }
          //                if (responseData.COURSE_DETAILS.PUBLISH == "1" || responseData.COURSE_DETAILS.PUBLISH == "5" || responseData.COURSE_DETAILS.PUBLISH == "4") {
          if (responseData.COURSE_DETAILS.PUBLISH == "1") {
            this.courseStatus = "published";
            this.unpublish = true;
            // this.IsCourseReview = true;
            this.blockPointer = true;
          } else if (responseData.COURSE_DETAILS.PUBLISH == "5") {
            this.courseStatus = "Rejected";
            this.unpublish = false;
            this.IsCourseReview = true;
            this.blockPointer = false;
          } else if (responseData.COURSE_DETAILS.PUBLISH == "4") {
            this.courseStatus = "Unpublished";
            this.unpublish = false;
            this.IsCourseReview = false;
            this.draftCourse = true;
            this.blockPointer = false;
          } else if (responseData.COURSE_DETAILS.PUBLISH == "2") {
            this.courseStatus = "drafted";
            this.IsCourseReview = false;
            this.unpublish = false;
            this.draftCourse = true;
            this.blockPointer = false;
          }
          this.courseTypeForUnpublish = responseData.COURSE_DETAILS.COURSE_TYPE;
          var date = new Date();
          this.promoVideoPath =
            responseData.COURSE_DETAILS.PROMOTIONAL_VIDEO_PATH +
            this.courseId +
            ".mp4?v=" +
            responseData.IMG_UPD_DT;
          if (!this.languageFetched) {
            setTimeout(() => {
              this.setCourseView(this.savedPageData, this.courseProcess);
            }, 200);
          } else {
            this.setCourseView(this.savedPageData, this.courseProcess);
          }
          // if(this.courseProcess==2){            
          // this.enableEditorQuill();
          // setTimeout(() => {
          //   this.quillEditor.root.innerHTML = this.postData.decodeURIPostData(responseData.COURSE_DETAILSDESCRIPTION);
          // }, 500);}
        } else if (status == this._constantService.error_token) {
          this.dataConf["type"] = 4;
          this.dataConf["msg"] = "Session Expire";
          this.dataConf["error_msg"] = "Session Expired!";
          this.openConfirmation = true;
          return false;
        } else {
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "Error";
          this.dataConf["error_msg"] = responseData.ERROR_MSG;
          this.openConfirmation = true;
          return false;
        }
      });
  }

  setCourseView(data, courseProcess) {
    this.addDetails = false;
    this.courseId = data.COURSE_UUID;
    this.setCourseUrl = data.COURSE_URL;
    if (this.draftCourse) {
      if (data.COURSE_TITLE != "" && this.courseProcess == 1) {
        document.getElementById(
          "course_title"
        ).innerText = this.postData.decodeURIPostData(data.COURSE_TITLE);
        this.course_title = this.postData.decodeURIPostData(data.COURSE_TITLE);
        this.onKeyUpTitle();
        // if (this._constantService.getBackToCourse() == "3") {
        //     this.courseProcessFunc(2);
        // }
        if (
          data.COURSE_TITLE != "" &&
          data.COURSE_TITLE != null &&
          this.setviewToLast
        ) {
          this.firstProcessLevel = true;
          this.secondcurrentProcess = true;
          this.courseProcess = 2;
          this.getCourseDetails(this.courseId);
          this.refresh();
        }
        this.coursePackageType = data.PACKAGE_TYPE;
        if (this.coursePackageType == 0) {
          this.regularCourse = true;
          this.streamCourse = false;
          this.regularStreamCourse = false;
        } else if (this.coursePackageType == 1) {
          this.streamCourse = true;
          this.regularCourse = false;
          this.regularStreamCourse = false;
        } else if (this.coursePackageType == 2) {
          this.regularStreamCourse = true;
          this.regularCourse = false;
          this.streamCourse = false;
        }
      }
      if (this.courseProcess == 2) {
        if (data.DESCRIPTION != "" && data.DESCRIPTION != null) {
          setTimeout(() => {
            if (this.quillEditor && this.quillEditor.root) {
              this.quillEditor.root.innerHTML = this.postData.decodeURIPostData(data.DESCRIPTION);
              this.descriptionTextLength = this.quillEditor.root.innerText.length;

              this.courseDesc = this.postData.decodeURIPostData(data.DESCRIPTION);
            }
          }, 500);

          // this.onKeyUpDesc();


        }
        if (data.COURSE_TAGS != "" && data.COURSE_TAGS != null) {
          var tagList = data.COURSE_TAGS;
          this.keywordsCount = 0;
          if (this.keywordsCount > 4) {
            this.showTagsInput = false;
          } else {
            this.showTagsInput = true;
          }
          for (var i = 0; i < tagList.length; i++) {
            this.setAddedTags(tagList[i].TAG_NAME, tagList[i].COURSE_TAG_UUID);
          }
        }

        if (this.courseInt && this.courseInt.length != 0) {
          for (var i = 0; i < this.courseInt.length; i++) {
            var index = this.pageInterestList.findIndex(
              (x) => x.id == this.courseInt[i]
            );
            if (index > -1) {
              this.addTags(
                this.pageInterestList[index].id,
                this.pageInterestList[index].name
              );
            }
          }
        }

        if (data.LANGUAGE != null && data.LANGUAGE != "") {
          for (const key in this.languageList) {
            if (this.languageList.hasOwnProperty(key)) {
              const element = this.languageList[key];
              if (element["LANGUAGE_ID"] == data.LANGUAGE) {
                this.courseLang = element["LANGUAGE"];
                this.courseLangId = element["LANGUAGE_ID"];
              }
            }
          }
        }
        if (data.COURSE_LEVEL != null && data.COURSE_LEVEL != "") {
          for (const key in this.courseLevelList) {
            if (this.courseLevelList.hasOwnProperty(key)) {
              const element = this.courseLevelList[key];
              if (element["levelId"] == data.COURSE_LEVEL) {
                this.courseLevelId = element["levelId"];
                this.courseLevel = element["levelName"];
              }
            }
          }
        }
        if (data.COVER_TYPE == 0) {
          if (
            data.COURSE_COVER_PHOTO_PATH != null &&
            data.COURSE_COVER_PHOTO_PATH != ""
          ) {
            var date = new Date();
            this.coverPicPath =
              data.COURSE_COVER_PHOTO_PATH +
              "cover/" +
              this.courseId +
              "_1235x330.png?v=" +
              data.IMG_UPD_DT;
            this.coverPicUploaded = true;
          } else {
            this.coverPicPath = "";
          }
        } else {
          this.coverPicPath = data.COURSE_COVER_PHOTO_PATH;
        }

        if (
          data.PROMOTIONAL_VIDEO_PATH != null &&
          data.PROMOTIONAL_VIDEO_PATH != ""
        ) {
          var date = new Date();
          this.promoVideoThumbnailPath =
            data.PROMOTIONAL_VIDEO_PATH +
            this.courseId +
            ".png?v=" +
            data.IMG_UPD_DT;
        } else {
          this.promoVideoThumbnailPath = "";
        }
        // console.log('aaaaaaaaabbbb', this.courseInt.length);
        if (
          data.DESCRIPTION != "" &&
          data.DESCRIPTION != null &&
          data.LANGUAGE != "" &&
          data.LANGUAGE != null &&
          data.COURSE_LEVEL != "" &&
          data.COURSE_LEVEL != null &&
          data.COURSE_COVER_PHOTO_PATH != "" &&
          data.COURSE_COVER_PHOTO_PATH != null &&
          this.courseInt.length != 0 &&
          this.setviewToLast
        ) {
          this.firstProcessLevel = true;
          this.secondProcessLevel = true;
          this.thirdcurrentProcess = true;
          this.courseProcess = 3;
          this.getCourseDetails(this.courseId);
        }
        // if (this._constantService.getBackToCourse() == "3") {
        //     this.courseProcessFunc(3);
        // }
      }

      if (this.courseProcess == 3) {
        if (data.SUBSCRIPTION == 1) {
          if (
            data.END_DATE_TIME != null &&
            data.START_DATE_TIME != null &&
            data.DAYS == null
          ) {
            this.isTrialCheck = true;
            this.freeTrialEndDate = data.END_DATE_TIME;
            this.freeTrialStartDate = data.START_DATE_TIME;
            this.trialType = 1;
            this.isTrialCheck = true;
          } else if (
            data.END_DATE_TIME == null &&
            data.START_DATE_TIME == null &&
            data.DAYS == null
          ) {
            this.trialType = 3;
            this.isTrialCheck = true;
          } else if (
            data.END_DATE_TIME == null &&
            data.START_DATE_TIME == null &&
            data.DAYS != null
          ) {
            this.trialType = 2;
            this.freeTrialDays = data.DAYS;
            this.isTrialCheck = true;
          }
          console.log("ayush sahu");
          console.log(data);
        }

        if (
          data.VALIDITY == "0" ||
          data.VALIDITY == "" ||
          data.VALIDITY == null
        ) {
          this.courseValidityCheck = false;
        } else {
          this.courseValidityDays = data.VALIDITY;

          this.courseValidityCheck = true;
          this.setValidityPlaceholder();
          this.setMonthAndDays();
        }
        if (
          data.COURSE_TYPE == 0 ||
          data.COURSE_TYPE == "" ||
          data.COURSE_TYPE == null
        ) {
          this.courseCostTyp = "0";
          this.coursePaymentCheck = false;
          this.courceCostlist = [];
          this.countRow = 1;
          if (data.COURSE_PRICE.length == 0) {
            this.courceCostlist.push({
              currenc_typ: "INR",
              cost: "",
              discount: "",
              r_costs: "0",
            });
          }
        } else if (data.COURSE_TYPE == 1) {
          this.coursePaymentCheck = true;
          //var obj =  new Array();

          this.tempCourseListFromServer = [];

          for (var i = 0; i < data.COURSE_PRICE.length; i++) {
            if (data.COURSE_PRICE[i].RENEWAL_COST == null) {
              var rcost = "0";
            } else {
              rcost = data.COURSE_PRICE[i].RENEWAL_COST;
            }
            this.tempCourseListFromServer.push({
              currenc_typ: data.COURSE_PRICE[i].CURRENCY_TYPE,
              cost: data.COURSE_PRICE[i].COST,
              discount: data.COURSE_PRICE[i].DISCOUNT_COST,
              r_costs: rcost == "" ? "0" : rcost,
            });
          }

          this.courceCostlist = []; // new Array({ 'currenc_typ': 'INR', 'costs': '', 'discount': '', 'r_costs': '' });
          this.countRow = 1;
          if (data.COURSE_PRICE.length == 0) {
            this.courceCostlist.push({
              currenc_typ: "INR",
              cost: "",
              discount: "",
              r_costs: "0",
            });
          }
          for (var i = 0; i < data.COURSE_PRICE.length; i++) {
            if (i > 0) {
              this.countRow = this.countRow + 1;
            }
            if (
              data.COURSE_PRICE[i].RENEWAL_COST == null ||
              data.COURSE_PRICE[i].RENEWAL_COST == 0
            ) {
              var rcost = "0";
            } else {
              rcost = data.COURSE_PRICE[i].RENEWAL_COST;
            }
            this.courceCostlist.push({
              currenc_typ: data.COURSE_PRICE[i].CURRENCY_TYPE,
              cost: data.COURSE_PRICE[i].COST,
              discount: data.COURSE_PRICE[i].DISCOUNT_COST,
              r_costs: rcost,
            });
            if (
              data.COURSE_PRICE[i].RENEWAL_COST != null &&
              data.COURSE_PRICE[i].RENEWAL_COST != 0
            ) {
              this.courseRenewableCheck = true;
            }
          }
        }
        if (
          data.IS_DOWNLOADABLE == "0" ||
          data.IS_DOWNLOADABLE == null ||
          data.IS_DOWNLOADABLE == ""
        ) {
          this.courseDownloadableCheck = false;
        } else {
          this.courseDownloadableCheck = true;
        }

        if (
          data.COUPON_VALID == 0 ||
          data.COUPON_VALID == "" ||
          data.COUPON_VALID == null
        ) {
          this.courseDiscountEligibleCheck = false;
        } else {
          this.courseDiscountEligibleCheck = true;
        }

        if (
          data.SECTION_DATA != "" &&
          data.SECTION_DATA != null &&
          this.setviewToLast
        ) {
          // this.courseProcessFunc(4);
          this.firstProcessLevel = true;
          this.secondProcessLevel = true;
          this.thirdProcessLevel = true;
          this.fourthcurrentProcess = true;
          this.courseProcess = 4;
          this.getCourseDetails(this.courseId);
          this.setviewToLast = false;
        }
      } else if (this.courseProcess == 4) {
        // (data.SECTION_DATA);
        if (data.SECTION_DATA != "" && data.SECTION_DATA != null) {
          for (var i = 0; i < data.SECTION_DATA.length; i++) {
            if (i == 0) {
              this.courseContentSection = [];
            }
            this.courseContentSection.push({
              SECTION_UUID: data.SECTION_DATA[i].SECTION_UUID,
              SECTION_NAME: this.postData.decodeURIPostData(
                data.SECTION_DATA[i].SECTION_TITLE
              ),
              Sec_orderId: "data.ORDERING",
              SECTION_CONTENT: [],
            });

            // this.sectionEditButtonValue =-1;
            for (
              var j = 0;
              j < data.SECTION_DATA[i].SECTION_CONTENT_DATA.length;
              j++
            ) {
              var content_typevideoPDfQuiz;
              var content_typeUploadorURl;
              var content_typeYoutubeorVimeo;
              var editTypeURL;
              var OldFilename;
              var reviewStatus;
              if (
                (data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA
                  .REPORT_STATUS != null ||
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA
                    .REPORT_STATUS != "") &&
                this.IsCourseReview
              ) {
                reviewStatus =
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA
                    .REPORT_STATUS == ""
                    ? "1"
                    : data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA
                      .REPORT_STATUS;
                if (reviewStatus == "1" || reviewStatus == "3") {
                  this.courseContentRejected = true;
                }
              } else if (this.IsCourseReview == false) {
                reviewStatus = "";
                this.courseContentRejected = false;
              } else {
                reviewStatus = "";
                this.courseContentRejected = false;
              }
              if (
                data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE ==
                4 ||
                data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE == 5
              ) {
                content_typevideoPDfQuiz = 1;
                content_typeUploadorURl = 1;
                editTypeURL = "true";
                OldFilename =
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA
                    .LECTURE_NAME;
                content_typeYoutubeorVimeo =
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE;
              } else if (
                data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE == 2
              ) {
                content_typevideoPDfQuiz = 2;
                content_typeUploadorURl = 0;
                content_typeYoutubeorVimeo = 0;
                OldFilename =
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA
                    .DOCUMENT_NAME;
                editTypeURL = "false";
              } else if (
                data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE == 3
              ) {
                content_typevideoPDfQuiz = 3;
                content_typeUploadorURl = 0;
                editTypeURL = "false";
                content_typeYoutubeorVimeo = 0;
              } else if (
                data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE == 6
              ) {
                content_typevideoPDfQuiz = 6;
                content_typeUploadorURl = 0;
                editTypeURL = "false";
                content_typeYoutubeorVimeo = 0;
              } else if (
                data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE == 1
              ) {
                content_typevideoPDfQuiz = 1;
                content_typeUploadorURl = 2;
                OldFilename =
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA
                    .LECTURE_NAME;
                editTypeURL = "false";
                content_typeYoutubeorVimeo = 0;
              }
              var path;
              var file;
              if (
                data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE == 1
              ) {
                path =
                  data.LECTURE_PATH + "/lectures/" + this.courseId + ".mp4";
              } else if (
                data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE == 2
              ) {
                path = data.DOCUMENT_PATH + "/docs/" + this.courseId + ".pdf";
              } else if (
                data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE == 3
              ) {
                OldFilename = "";
              } else if (
                data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE == 4
              ) {
                path =
                  "https://www.youtube.com/watch?v=" +
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA
                    .LECTURE_PATH;
                OldFilename = path;
              } else if (
                data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE == 5
              ) {
                path =
                  "https://vimeo.com/" +
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA
                    .LECTURE_PATH;
                OldFilename = path;
              } else if (
                data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE == 6
              ) {
                OldFilename =
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA
                    .EMBEDDED_TEST_PATH;
              } else if (
                data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE == 7
              ) {
                var liveStreamdata = {};
                liveStreamdata["LiveStreamTitle"] =
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[
                    j
                  ].CONTENT_DATA.LIVE_STREAM_TITLE;
                liveStreamdata["LiveStreamDes"] =
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[
                    j
                  ].CONTENT_DATA.DESCRIPTION;
                liveStreamdata["LiveStreamDate"] = this.miliSecTodateConvertar(
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA
                    .START_TIME
                );
                liveStreamdata["liveStreamMentorName"] =
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[
                    j
                  ].CONTENT_DATA.MENTOR_DATA.USER_FULL_NAME;

                if (
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA
                    .MENTOR_DATA.PROFILE_PHOTO_PATH
                ) {
                  liveStreamdata["liveStreamMentorImage"] =
                    data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA
                      .MENTOR_DATA.PROFILE_PHOTO_PATH +
                    "profile/" +
                    data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA
                      .MENTOR_DATA.USER_ID +
                    "_150x150.png?v=" +
                    data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA
                      .MENTOR_DATA.IMG_UPD_DT;
                } else {
                  liveStreamdata["liveStreamMentorImage"] =
                    "./assets/images/defaultProfilePic.svg";
                }
                liveStreamdata["mentorUUid"] =
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[
                    j
                  ].CONTENT_DATA.MENTOR_DATA.USER_UUID;

                liveStreamdata["LiveStreamDuration"] =
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[
                    j
                  ].CONTENT_DATA.DURATION;

                content_typevideoPDfQuiz = 7;
                OldFilename = liveStreamdata["LiveStreamDate"];
                file = liveStreamdata;
              }

              if (
                data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].VISIBILITY == 0
              ) {
                // this.totalFreeCourse++;
              }
              this.insertDragContent(
                i,
                "content" + this.courseContentSection[i].SECTION_UUID
              );
              this.courseContentSection[i].SECTION_CONTENT.push({
                CONTENT_UUID:
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA
                    .CONTENT_UUID,
                file: file,
                CONTENT_FILE_NAME: this.postData.decodeURIPostData(
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TITLE
                ),
                CONTENT_TYPE: content_typevideoPDfQuiz,
                CONTENT_OLD_NAME: OldFilename,
                DocumentPath:
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA
                    .DOCUMENT_PATH,
                edit: "false",
                CONTENT_DATA_TYPE: content_typeUploadorURl,
                download: editTypeURL == "false" ? "true" : "false",
                addURL: editTypeURL,
                progress: "false",
                content_orderId:
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].ORDERING,
                urlType: content_typeYoutubeorVimeo,
                path: path,
                lock: data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].VISIBILITY,
                INFO: "",
                reviewStatus: reviewStatus,
                placeholder: "",
                CONTENT_URL_NAME: "",
                progressPercentage: 0,
                progressBar: 339.292,
              });
            }
          }
        }
        setTimeout(() => this.setViewOfSection(), 500);
        // if (this._constantService.getBackToCourse() == "3") {
        //     this._constantService.setBackToCourse("0");
        // }
      } else if (this.courseProcess == 5) {
        if (data.SECTION_DATA != "" || data.SECTION_DATA != null) {
          this.totalFreeCourse = 0;
          this.totalVideoCount = 0;
          this.totalPdfCount = 0;
          this.totalQuizCount = 0;
          this.totalLiveStreamCount = 0;

          for (var i = 0; i < data.SECTION_DATA.length; i++) {
            for (
              var j = 0;
              j < data.SECTION_DATA[i].SECTION_CONTENT_DATA.length;
              j++
            ) {
              if (
                data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].VISIBILITY == "0"
              ) {
                this.totalFreeCourse++;
              }
              if (
                data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE ==
                "1" ||
                data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE ==
                "4" ||
                data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE == "5"
              ) {
                this.totalVideoCount++;
              }
              if (
                data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE == "2"
              ) {
                this.totalPdfCount++;
              }
              if (
                data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE ==
                "3" ||
                data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE == "6"
              ) {
                this.totalQuizCount++;
              }
              if (
                data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE == "7"
              ) {
                this.totalLiveStreamCount++;
              }
            }
          }
          console.log(this.totalQuizCount, "abcd");
          if (data.MENTOR_DATA) {
            this.mentorData = data.MENTOR_DATA;

            for (let i = 0; i < this.mentorData.length; i++) {
              this.mentorData[
                i
              ].USER_FULL_NAME = this.postData.decodeURIPostData(
                this.mentorData[i].USER_FULL_NAME
              );
              this.mentorData[i].SUMMARY = this.postData.decodeURIPostData(
                this.mentorData[i].SUMMARY
              );
              if (data.MENTOR_DATA[i].PROFILE_PHOTO_PATH) {
                this.mentorData[i].PROFILE_PHOTO_PATH =
                  this.mentorData[i].PROFILE_PHOTO_PATH +
                  "profile/" +
                  this.mentorData[i].USER_ID +
                  "_150x150.png?v=" +
                  this.mentorData[i].IMG_UPD_DT;
              } else {
                this.mentorData[i].PROFILE_PHOTO_PATH =
                  "./assets/images/defaultProfilePic.svg";
              }
            }
            console.log(this.mentorData);
          }
        }

        if (data.COURSE_TAGS != "" && data.COURSE_TAGS != null) {
          var tagList = data.COURSE_TAGS;
          this.courseKeywords = "";
          for (var i = 0; i < tagList.length; i++) {
            if (tagList.length == 1) {
              this.courseKeywords =
                this.courseKeywords +
                this.postData.decodeURIPostData(tagList[i].TAG_NAME);
            } else {
              this.courseKeywords =
                this.courseKeywords +
                this.postData.decodeURIPostData(tagList[i].TAG_NAME);
              if (tagList.length - 1 != i) {
                this.courseKeywords = this.courseKeywords + ", ";
              }
            }
          }
        }

        this.getActualAndDiscountPrice();

        if (data.SECTION_DATA != "" || data.SECTION_DATA != null) {
          for (var i = 0; i < data.SECTION_DATA.length; i++) {
            if (i == 0) {
              this.courseContentSection = [];
            }

            this.courseContentSection.push({
              SECTION_UUID: data.SECTION_DATA[i].SECTION_UUID,
              SECTION_NAME: this.postData.decodeURIPostData(
                data.SECTION_DATA[i].SECTION_TITLE
              ),
              Sec_orderId: "data.ORDERING",
              SECTION_CONTENT: [],
            });
            // (data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE);

            for (
              var j = 0;
              j < data.SECTION_DATA[i].SECTION_CONTENT_DATA.length;
              j++
            ) {
              var content_typevideoPDfQuiz;
              var content_typeUploadorURl;
              var content_typeYoutubeorVimeo;
              var editTypeURL;
              var OldFilename;
              var info;
              var duration = "";
              // if(data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].STATUS == 2){
              //     this.testPending = true;
              // }
              if (
                data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE ==
                4 ||
                data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE == 5
              ) {
                content_typevideoPDfQuiz = 1;
                content_typeUploadorURl = 1;
                editTypeURL = "true";
                OldFilename =
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA
                    .LECTURE_NAME;
                content_typeYoutubeorVimeo =
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE;
              } else if (
                data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE == 2
              ) {
                content_typevideoPDfQuiz = 2;
                content_typeUploadorURl = 0;
                content_typeYoutubeorVimeo = 0;
                OldFilename =
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA
                    .DOCUMENT_NAME;
                editTypeURL = "false";
              } else if (
                data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE == 3
              ) {
                content_typevideoPDfQuiz = 3;
                content_typeUploadorURl = 0;
                editTypeURL = "false";
                content_typeYoutubeorVimeo = 0;
              } else if (
                data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE == 6
              ) {
                content_typevideoPDfQuiz = 6;
                content_typeUploadorURl = 0;
                editTypeURL = "false";
                content_typeYoutubeorVimeo = 0;
              } else if (
                data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE == 1
              ) {
                content_typevideoPDfQuiz = 1;
                content_typeUploadorURl = 2;
                OldFilename =
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA
                    .LECTURE_NAME;
                editTypeURL = "false";
                content_typeYoutubeorVimeo = 0;
              }
              var path;
              if (
                data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE == 1
              ) {
                path =
                  data.LECTURE_PATH + "/lectures/" + this.courseId + ".mp4";
                info =
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA
                    .LECTURE_DURATION == null
                    ? ""
                    : this.calculateTimeDuration(
                      data.SECTION_DATA[i].SECTION_CONTENT_DATA[j]
                        .CONTENT_DATA.LECTURE_DURATION
                    );
              } else if (
                data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE == 2
              ) {
                path = data.DOCUMENT_PATH + "/docs/" + this.courseId + ".pdf";
                info =
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA
                    .PAGES == null
                    ? ""
                    : data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA
                      .PAGES + " pages";
              } else if (
                data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE == 3
              ) {
                // OldFilename =
                info =
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA
                    .QUESTION_COUNT == null
                    ? ""
                    : data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA
                      .QUESTION_COUNT + " ques";
              } else if (
                data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE == 4
              ) {
                path =
                  "https://www.youtube.com/watch?v=" +
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA
                    .LECTURE_PATH;
                OldFilename = path;
                info =
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA
                    .LECTURE_DURATION == null
                    ? ""
                    : this.calculateTimeDuration(
                      data.SECTION_DATA[i].SECTION_CONTENT_DATA[j]
                        .CONTENT_DATA.LECTURE_DURATION
                    );
              } else if (
                data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE == 5
              ) {
                path =
                  "https://vimeo.com/" +
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA
                    .LECTURE_PATH;
                OldFilename = path;
                info =
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA
                    .LECTURE_DURATION == null
                    ? ""
                    : this.calculateTimeDuration(
                      data.SECTION_DATA[i].SECTION_CONTENT_DATA[j]
                        .CONTENT_DATA.LECTURE_DURATION
                    );
              } else if (
                data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE == 6
              ) {
                info = "1 Test";
              } else if (
                data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE == 7
              ) {
                if (this.coursePackageType == 0) {
                  this.isLiveStreamFree = true;
                }
                duration = this.setliveStreaduration(
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA
                    .DURATION
                );
                OldFilename = path;
                content_typevideoPDfQuiz = 7;
                info = this.miliSecTodateConvertar(
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA
                    .START_TIME
                );
              }

              this.courseContentSection[i].SECTION_CONTENT.push({
                CONTENT_UUID:
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA
                    .CONTENT_UUID,
                file: duration,
                CONTENT_FILE_NAME: this.postData.decodeURIPostData(
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TITLE
                ),
                CONTENT_TYPE: content_typevideoPDfQuiz,
                CONTENT_OLD_NAME: OldFilename,
                DocumentPath:
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA
                    .DOCUMENT_PATH,
                edit: "false",
                CONTENT_DATA_TYPE: content_typeUploadorURl,
                download: editTypeURL == "false" ? "true" : "false",
                addURL: editTypeURL,
                progress: "false",
                content_orderId:
                  data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].ORDERING,
                urlType: content_typeYoutubeorVimeo,
                path: path,
                lock: data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].VISIBILITY,
                INFO: info,
                reviewStatus: "",
                placeholder: "",
              });
            }
          }
          for (var i = 0; i < data.SECTION_DATA.length; i++) {
            for (
              var j = 0;
              j < data.SECTION_DATA[i].SECTION_CONTENT_DATA.length;
              j++
            ) {
              if (data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].STATUS == 2) {
                this.testPending = true;
                break;
              } else {
                this.testPending = false;
              }
            }
          }
        }
      }

      //        if (data.COURSE_COVER_PHOTO_PATH != null) {
      //            this.coverPicUploaded = true;
      //            this.coverPicPath = data.COURSE_COVER_PHOTO_PATH + "cover/" + this.courseId + "_1235x330.png";
      //        } else {
      //            this.coverPicUploaded = false;
      //        }
      //        this.courseDesc = this.postData.decodeURIPostData(data.DESCRIPTION);
      //        if (data.VALIDITY) {
      //            (<HTMLInputElement>document.querySelector('input[value="' + data.VALIDITY + '"]')).checked = true;
      //        }
      //        if (data.COURSE_TYPE == 1) {
      //            (<HTMLInputElement>document.querySelector('input[name="courseTyp"]')).checked = true;
      //            this.showCoursePaid = !this.showCoursePaid;
      //            for (var i = 0; i < data.COURSE_PRICE.length; i++) {
      //                //cost['COST_ID'] = data.COURSE_COST.CORS_COST_UUID;
      //                var cost = {};
      //                cost['COST_ID'] = "";
      //                cost['COST_TYPE'] = data.COURSE_PRICE[i].CURRENCY_TYPE;
      //                cost['COURSE_PRICE'] = data.COURSE_PRICE[i].COST;
      //                cost['DISCOUNT_PRICE'] = data.COURSE_PRICE[i].DISCOUNT_COST;
      //                this.courseCost.push(cost);
      //            }
      //        }
      //        if (data.COUPON_VALID == 1) {
      //            (<HTMLInputElement>document.querySelector('input[name="couponApp"]')).checked = true;
      //        }
      //        if (data.COURSE_TAGS.length != 0) {
      //            for (var j = 0; j < data.COURSE_TAGS.length; j++) {
      //                var keywordData = data.COURSE_TAGS[j].TAG_NAME + "<img src='assets/images/svg/tagcross-wh.svg' class='white-cross' id='remove_" + data.COURSE_TAGS.COURSE_TAG_UUID + "'>";
      //                var keyword = document.createElement('span');
      //                keyword.id = "keyword_" + data.COURSE_TAGS.COURSE_TAG_UUID;
      //                keyword.className = "tags";
      //                keyword.innerHTML = keywordData;
      //                var tagArea = document.getElementById('posttags');
      //                tagArea.insertBefore(keyword, tagArea.childNodes[0]);
      //                var keywordrm = document.getElementById('remove_' + data.COURSE_TAGS.COURSE_TAG_UUID);
      //                this.courseTag = "";
      //                keywordrm.addEventListener('click', () => {
      //                    this.deleteCourseTag(tagArea, keyword, data.COURSE_TAGS.COURSE_TAG_UUID);
      //                });
      //            }
      //        }
      //
      //        if (data.SECTION_DATA.length != 0) {
      //            for (var i = 0; i < data.SECTION_DATA.length; i++) {
      //                var section = {};
      //                section['SECTION_UUID'] = data.SECTION_DATA[i].SECTION_UUID;
      //                section['SECTION_NAME'] = this.postData.decodeURIPostData(data.SECTION_DATA[i].SECTION_TITLE);
      //                section['SECTION_CONTENT'] = [];
      //                for (var j = 0; j < data.SECTION_DATA[i].SECTION_CONTENT_DATA.length; j++) {
      //                    var content = {};
      //                    content['CONTENT_UUID'] = data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA.CONTENT_UUID;
      //                    content['CONTENT_NAME'] = this.postData.decodeURIPostData(data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TITLE);
      //                    content['CONTENT_TYPE'] = data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE;
      //                    if (data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE == 1 && data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA.LECTURE_NAME != null) {
      //                        content['CONTENT_OLD_NAME'] = this.postData.decodeURIPostData(data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA.LECTURE_NAME);
      //                    }
      //                    if (data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE == 2 && data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA.DOCUMENT_NAME) {
      //                        content['CONTENT_OLD_NAME'] = this.postData.decodeURIPostData(data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA.DOCUMENT_NAME);
      //                    }
      //                    if (data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_TYPE == 3 && data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA.QUESTION_COUNT != null) {
      //                        content['CONTENT_OLD_NAME'] = this.postData.decodeURIPostData(data.SECTION_DATA[i].SECTION_CONTENT_DATA[j].CONTENT_DATA.QUESTION_COUNT);
      //                    }
      //                    section['SECTION_CONTENT'].push(content);
      //                }
      //                this.courseSection.push(section);
      //            }
      //        }
      //        if (data.SECTION_DATA.length < 10) {
      //            this.newSection = true;
      //        } else {
      //            this.newSection = false;
      //        }
    }
  }

  calculateTimeDuration(duration) {
    var durationminutes;
    var durationHour;
    if (duration <= 59) {
      return Math.floor(duration) + " sec";
    } else {
      durationminutes = Math.floor(duration / 60);
      if (durationminutes <= 59) {
        return durationminutes + " minutes";
      } else {
        durationHour = Math.floor(durationminutes / 60);
        durationminutes = Math.floor(durationminutes % 60);
        return durationHour + " hour " + durationminutes + " min";
      }
    }
  }

  publishConfirm() {
    var published = {};
    published["token"] = this._constantService.getSessionDataBYKey("token");
    published["token_param"] = {};
    published["token_param"]["device_type"] = "w";
    published["token_param"]["host"] = "";
    published["pg_uuid"] = this.pageId;
    published["cors_uuid"] = this.courseId;

    this._constantService
      .fetchDataApi(
        this._constantService.getCoursePublishedServiceUrl(),
        published
      )
      .subscribe((data) => {
        var responseData: any = data;
        var status = responseData.STATUS;
        if (status == "success") {
          //this._constantService.setToken(responseData.TOKEN);
          this._constantService.setSessionJsonPair("token", responseData.TOKEN);
          this.BlockLeftClick = true;
        } else if (status == this._constantService.error_token) {
          this.dataConf["type"] = 4;
          this.dataConf["msg"] = "Session Expire";
          this.dataConf["error_msg"] = "Session Expired!";
          this.openConfirmation = true;
          return false;
        } else {
          this.courseDiscountEligibleCheck = !this.courseDiscountEligibleCheck;
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "Error";
          this.dataConf["error_msg"] = responseData.ERROR_MSG;
          this.openConfirmation = true;
          return false;
        }
      });
  }

  unpublishCourseView() {
    this.preview = 4;
    this.courseProcess = 5;
    this.BlockLeftClick = true;
    this.cd.detectChanges();
  }

  back_Course() {
    this.courseProcess = 4;
    this.preview = 1;
    this.getCourseDetails(this.courseId);
  }

  preview_Course(index) {
    if (index == 31) {
      //check for rejected content
      if (this.courseContentRejected) {
        this.dataConf["type"] = 2;
        this.dataConf["msg"] = "study24x7";
        this.dataConf["error_msg"] =
          "You must resolve all rejected contents to proceed further.";
        this.openConfirmation = true;
        return false;
      }
      if (this.testPending) {
        this.dataConf["type"] = 2;
        this.dataConf["msg"] = "study24x7";
        this.dataConf["error_msg"] = "You must submit quiz to proceed further";
        this.openConfirmation = true;
        return false;
      }
      if (this.isLiveStreamFree && this.coursePackageType != 1) {
        this.dataConf["type"] = 2;
        this.dataConf["msg"] = "study24x7";
        this.dataConf["error_msg"] = "Please select the valid package type";
        this.openConfirmation = true;
        return false;
      }
      if (
        (this.totalVideoCount != 0 ||
          this.totalPdfCount != 0 ||
          this.totalQuizCount != 0) &&
        this.coursePackageType == 2
      ) {
        this.dataConf["type"] = 2;
        this.dataConf["msg"] = "study24x7";
        this.dataConf["error_msg"] = "Please select the valid package type";
        this.openConfirmation = true;
        return false;
      }

      //lxy
      if (this.isTrialCheck) {
        let sectionArr = this.savedPageData.SECTION_DATA;
        let flag = false;
        sectionArr.forEach((section) => {
          let contentArr = section.SECTION_CONTENT_DATA;
          contentArr.forEach((content) => {
            if (content.VISIBILITY == 0) {
              flag = true;
            }
          });
        });

        if (!flag) {
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "study24x7";
          this.dataConf["error_msg"] =
            "You have chosen Free Trial for this course. Please provide atleast one trial content.";
          this.openConfirmation = true;
          return false;
        }
      }
      //lxy

      this.preview = index;
      this.fifthProcessLevel = true;
      this.fifthcurrentProcess = true;

      // this.courseProcess = index;
    } else if (index == 21) {
      if ((this.courseStatus == "Unpublished" || "published") && (this.courseStatus != "drafted")) {
        this.RepublishCourse();
        this.preview = index;
      } else {
        this.publishConfirm();
        this.preview = index;
      }
    }
    if (index == 3) {
      this.courseProcess = 6;
      this.preview = index;
    }
    if (index == 2) {
      this.deleteCourseArchive();
    }
    if (index == 5) {
      this.courseProcess = 1;
      //            this.preview = index;
    }
    this.cd.detectChanges();
  }

  reportPopup(content_UUID) {
    this.isReportPopup = true;
    var reportTrail = {};
    reportTrail["token"] = this._constantService.getSessionDataBYKey("token");
    reportTrail["token_param"] = {};
    reportTrail["token_param"]["device_type"] = "w";
    reportTrail["token_param"]["host"] = "";
    reportTrail["cntnt_uuid"] = content_UUID;
    reportTrail["pg_uuid"] = this.pageId;
    var date = new Date();
    this._constantService
      .fetchDataApi(
        this._constantService.getCourseRejectionTrailServiceUrl(),
        reportTrail
      )
      .subscribe((data) => {
        var responseData: any = data;
        var status = responseData.STATUS;
        this.reportMsgTrail.length = 0;
        if (status == "success") {
          this.contentUUIDReport = content_UUID;
          this.rejectionStatus = "Resolve";
          this.rejectionuuid = responseData.COURSE_REPORT_UUID;
          this.rejectionReportStatus = responseData.REPORT_STATUS;
          for (var i = 0; i < responseData.REPORTED_TRAIL.length; i++) {
            this.reportMsgTrail.push({
              Name:
                responseData.REPORTED_TRAIL[i].ADDED_TYPE == "1"
                  ? "Reviewer"
                  : "You",
              ADDED_TYPE: responseData.REPORTED_TRAIL[i].ADDED_TYPE,
              TEXT: responseData.REPORTED_TRAIL[i].TEXT,
              COURSE_REPORT_ATTACHMENT_UUID:
                responseData.REPORTED_TRAIL[i].COURSE_REPORT_ATTACHMENT_UUID ==
                  null
                  ? ""
                  : responseData.REPORTED_TRAIL[i]
                    .COURSE_REPORT_ATTACHMENT_UUID,
              IMAGE_PATH:
                responseData.REPORTED_TRAIL[i].IMAGE_PATH == null
                  ? ""
                  : responseData.REPORTED_TRAIL[i].IMAGE_PATH +
                  "rejected/" +
                  this.contentUUIDReport +
                  "/" +
                  responseData.REPORTED_TRAIL[i]
                    .COURSE_REPORT_ATTACHMENT_UUID +
                  ".png?v=" +
                  responseData.IMG_UPD_DT,
              UPDATE_DATE_TIME: responseData.REPORTED_TRAIL[i].UPDATE_DATE_TIME,
            });
          }
        } else if (status == this._constantService.error_token) {
          this.dataConf["type"] = 4;
          this.dataConf["msg"] = "Session Expire";
          this.dataConf["error_msg"] = "Session Expired!";
          this.openConfirmation = true;
          return false;
        } else {
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "Error";
          this.dataConf["error_msg"] = responseData.ERROR_MSG;
          this.openConfirmation = true;
          return false;
        }
      });
  }

  hidePopup() {
    this.isReportPopup = false;
    if (this.rejectionStatus == "Resolved") {
      this._constantService.setBackToCourse("3");
      window.location.reload();
    }
  }
  quizSummaryPopup() {
    // this.isQuizSummary = !this.isQuizSummary
  }

  previewImageForRejection(event, contentUUId) {
    this.imageForRejection = "";
    // this.contentUUIDReport = contentUUId;
    this.uploadImageForRejection(event);
  }

  createMsgTrail() { }

  cancelImageuploadRejection() {
    this.imageForRejection = "";
  }

  removeRejectedImage() {
    this.showPreloaderForRejectionAttachment = false;
    this.imageForRejection = "";
    this.previewImage = "";
    this.dimentionForRejectedImage = "";
    this.imageForRejectionPathToSend = "";
  }
  uploadImageForRejection(event) {
    this.showPreloaderForRejectionAttachment = true;
    var formData = new FormData();
    var xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      this._constantService.getRejecteionTrailImageUploadServiceUrl(),
      true
    );
    var token = {};
    token["token"] = this._constantService.getSessionDataBYKey("token");
    token["token_param"] = {};
    token["token_param"]["device_type"] = "w";
    token["token_param"]["host"] = "";
    var encData = this._encrypt.encryptutf8(JSON.stringify(token));
    formData.append("token", encData);
    formData.append("file", event.target.files[0]);
    formData.append("pg_uuid", this.pageId);
    formData.append("cntnt_uuid", this.contentUUIDReport);
    formData.append("cors_uuid", this.courseId);
    formData.append("cmmnt", "");
    this._constantService
      .uploadFileApi(
        this._constantService.getRejecteionTrailImageUploadServiceUrl(),
        formData
      )
      .subscribe((data) => {
        var responseData: any = data;
        var status = responseData.STATUS;
        if (status == this._constantService.success_msg) {
          this.showPreloaderForRejectionAttachment = false;

          var date = new Date();
          this.imageForRejection =
            responseData.PATH +
            "rejected/" +
            this.contentUUIDReport +
            "/" +
            responseData.UUID +
            ".png?v=" +
            responseData.IMG_UPD_DT;
          this.previewImage = responseData.UUID;
          this.dimentionForRejectedImage = responseData.DIMENSION;
          this.imageForRejectionPathToSend = responseData.PATH;
        } else {
          this.showPreloaderForRejectionAttachment = false;
        }
      });
  }

  inputFieldRejectionTrail(event) {
    if (event.type == "focusout") {
      if (document.getElementById("rejectionSend").innerText == "") {
        document.getElementById(
          "rejectionSend"
        ).innerText = this.placehoolderMsgRejectionTrail;
      }
    } else if (event.type == "focusin" || event.type == "click") {
      if (
        document.getElementById("rejectionSend").innerText ==
        this.placehoolderMsgRejectionTrail
      ) {
        document.getElementById("rejectionSend").innerText = "";
      }
    }
  }

  sendRejectionMsg() {
    var sendmsg = {};
    sendmsg["token"] = this._constantService.getSessionDataBYKey("token");
    sendmsg["token_param"] = {};
    sendmsg["token_param"]["device_type"] = "w";
    sendmsg["token_param"]["host"] = "";
    sendmsg["cntnt_uuid"] = this.contentUUIDReport;
    sendmsg["course_report_uuid"] = this.rejectionuuid;
    sendmsg["path"] = this.imageForRejectionPathToSend;
    sendmsg["dimns"] = this.dimentionForRejectedImage;
    sendmsg["cmmnt"] = document.getElementById("rejectionSend").innerText;
    sendmsg["pg_uuid"] = this.pageId;
    sendmsg["uuid"] = this.previewImage;

    this._constantService
      .fetchDataApi(
        this._constantService.getCoursesendRejectionMsgServiceUrl(),
        sendmsg
      )
      .subscribe((data) => {
        var responseData: any = data;
        var status = responseData.STATUS;
        if (status == "success") {
          this.reportPopup(this.contentUUIDReport);
          this.dimentionForRejectedImage = "";
          this.imageForRejectionPathToSend = "";
          document.getElementById(
            "rejectionSend"
          ).innerText = this.placehoolderMsgRejectionTrail;
          this.removeRejectedImage();
        } else if (status == this._constantService.error_token) {
          this.dataConf["type"] = 4;
          this.dataConf["msg"] = "Session Expire";
          this.dataConf["error_msg"] = "Session Expired!";
          this.openConfirmation = true;
          return false;
        } else {
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "Error";
          this.dataConf["error_msg"] = responseData.ERROR_MSG;
          this.openConfirmation = true;
          return false;
        }
      });
  }

  startProgress() {
    this.progressBar = 339.292;
    var interval = setInterval(() => {
      this.current_progress = this.current_progress + this.step;
      this.progressper =
        Math.round(
          (Math.atan(this.current_progress) / (Math.PI / 2)) * 100 * 1000
        ) / 1000;
      let progresscount = 1 - this.progressper / 100;
      this.progressBar = 339.292 * progresscount;
      // 339.292 * (1 - 0.6)
      this.progressBar;

      if (this.progressper >= 100) {
        this.current_progress = 100;
        this.progressper = 100;
        clearInterval(interval);
      } else if (this.progressper >= 70) {
        this.step = 0.1;
      }

      if (!this.progressStart) {
        this.current_progress = 100;
        this.progressper = 100;
        this.step = 0.5;
        setTimeout(() => {
          this.current_progress = 0;
          this.progressper = 0;
          this.step = 0.05;
          this.progressStart = false;
        }, 2000);
        clearInterval(interval);
      }
      this.cd.detectChanges();
    }, 50);
  }

  unpublishCourse() {
    var unpublished = {};
    unpublished["token"] = this._constantService.getSessionDataBYKey("token");
    unpublished["token_param"] = {};
    unpublished["token_param"]["device_type"] = "w";
    unpublished["token_param"]["host"] = "";
    unpublished["cors_uuid"] = this.courseId;
    unpublished["pg_uuid"] = this.pageId;
    unpublished["cors_type"] = this.courseTypeForUnpublish;

    this._constantService
      .fetchDataApi(
        this._constantService.getCourseUnpublishedServiceUrl(),
        unpublished
      )
      .subscribe((data) => {
        var responseData: any = data;
        var status = responseData.STATUS;
        if (status == "success") {
          responseData;
          this.preview = 41;

          window.location.replace("addcourse/" + this.courseUUID);
        } else if (status == this._constantService.error_token) {
          this.dataConf["type"] = 4;
          this.dataConf["msg"] = "Session Expire";
          this.dataConf["error_msg"] = "Session Expired!";
          this.openConfirmation = true;
          return false;
        } else {
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "Error";
          this.dataConf["error_msg"] = responseData.ERROR_MSG;
          this.openConfirmation = true;
          return false;
        }
      });
  }

  updateReportStatus() {
    if (this.rejectionStatus == "Resolved") {
      return;
    }
    var reportStatus = {};
    reportStatus["token"] = this._constantService.getSessionDataBYKey("token");
    reportStatus["token_param"] = {};
    reportStatus["token_param"]["device_type"] = "w";
    reportStatus["token_param"]["host"] = "";
    reportStatus["pg_uuid"] = this.pageId;
    reportStatus["course_report_uuid"] = this.rejectionuuid;
    this._constantService
      .fetchDataApi(
        this._constantService.getUpdateContentStatusServiceUrl(),
        reportStatus
      )
      .subscribe((data) => {
        var responseData: any = data;
        var status = responseData.STATUS;
        if (status == "success") {
          this.rejectionStatus = "Resolved";
        }
      });
  }

  // TitleContentPlaceHolder
  focusIn(event) {
    setTimeout(() => {
      var id = event.target.id;
      if (id.includes("nameurl") == true) {
        if (
          document.getElementById(event.target.id).innerText ==
          this.TitleContentVideoPlaceHolder
        ) {
          document.getElementById(event.target.id).innerHTML = "";
          if (
            document
              .getElementById(event.target.id)
              .classList.contains("courseplaceholder")
          ) {
            document
              .getElementById(event.target.id)
              .classList.remove("courseplaceholder");
          }
        }
      } else if (id.includes("addlinkurl") == true) {
        if (
          document.getElementById(event.target.id).innerText ==
          this.TitleContentVideoPlaceHolder
        ) {
          document.getElementById(event.target.id).innerHTML = "";
          if (
            document
              .getElementById(event.target.id)
              .classList.contains("courseplaceholder")
          ) {
            document
              .getElementById(event.target.id)
              .classList.remove("courseplaceholder");
          }
        }
      } else {
        if (
          document.getElementById(event.target.id).innerText ==
          this.TitleContentPlaceHolder
        ) {
          document.getElementById(event.target.id).innerHTML = "";
          if (
            document
              .getElementById(event.target.id)
              .classList.contains("courseplaceholder")
          ) {
            document
              .getElementById(event.target.id)
              .classList.remove("courseplaceholder");
          }
        }
      }
    }, 100);
  }

  check_pdf(event) {
    var id = event.target.id;
    if (id.includes("nameurl") == true) {
      if (
        document.getElementById(event.target.id).innerText ==
        this.TitleContentVideoPlaceHolder
      ) {
        document.getElementById(event.target.id).innerHTML = "";
        if (
          document
            .getElementById(event.target.id)
            .classList.contains("courseplaceholder")
        ) {
          document
            .getElementById(event.target.id)
            .classList.remove("courseplaceholder");
        }
      }
    } else {
      if (
        document.getElementById(event.target.id).innerText ==
        this.TitleContentPlaceHolder
      ) {
        document.getElementById(event.target.id).innerHTML = "";
        if (
          document
            .getElementById(event.target.id)
            .classList.contains("courseplaceholder")
        ) {
          document
            .getElementById(event.target.id)
            .classList.remove("courseplaceholder");
        }
      }
    }
  }

  focusOut(event) {
    setTimeout(() => {
      var id = event.target.id;
      if (id.includes("nameurl") == true || id.includes("addlinkurl") == true) {
        if (document.getElementById(event.target.id).innerText == "") {
          document.getElementById(
            event.target.id
          ).innerHTML = this.TitleContentVideoPlaceHolder;
          document
            .getElementById(event.target.id)
            .classList.add("courseplaceholder");
        }
      } else {
        if (document.getElementById(event.target.id).innerText == "") {
          document.getElementById(
            event.target.id
          ).innerHTML = this.TitleContentPlaceHolder;
          document
            .getElementById(event.target.id)
            .classList.add("courseplaceholder");
        }
      }
      // if(document.getElementById(event.target.id).innerText == ""){
      //     document.getElementById(event.target.id).innerText = this.TitleContentPlaceHolder;
      // }
    }, 0);
  }

  RemovePlaceHolderForContent(event) {
    setTimeout(() => {
      var id = event.target.id;
      if (
        document
          .getElementById(event.target.id)
          .classList.contains("courseplaceholder")
      ) {
        document
          .getElementById(event.target.id)
          .classList.remove("courseplaceholder");
      }
    }, 100);
  }

  removeContentPlaceHolder(index, contentIndex, typ) {
    // namevideo / namae
    var id;
    if (typ == "doc") {
      id = "name" + index + "." + contentIndex;
    } else if (typ == "lec") {
      id = "namevideo" + index + "." + contentIndex;
    }
    if (document.getElementById(id).classList.contains("courseplaceholder")) {
      document.getElementById(id).classList.remove("courseplaceholder");
    }
  }

  OnFocus() {
    this.show_placeholder = false;
  }
  OnFocus2() {
    this.show_placeholder2 = false;
  }

  OnFocusQuiz() {
    this.Quiz_placeholder = false;
  }

  focusoutquiz(event) {
    if (<HTMLInputElement>document.getElementById(event.target)) {
      var val = (<HTMLInputElement>document.getElementById(event.target.id))
        .innerText;
      if (val.length == 0) {
        this.Quiz_placeholder = true;
      }
    }
  }

  deleteCourseArchive() {
    var deleteCourse = {};
    deleteCourse["token"] = this._constantService.getToken();
    deleteCourse["token_param"] = {};
    deleteCourse["token_param"]["device_type"] = "w";
    deleteCourse["token_param"]["host"] = "";
    deleteCourse["cors_uuid"] = this.courseId;
    deleteCourse["pg_uuid"] = this.pageId;
    deleteCourse["cors_type"] = this.coursePaymentCheck ? 1 : 0;

    this._constantService
      .fetchDataApi(
        this._constantService.getCourseArchiveServiceUrl(),
        deleteCourse
      )
      .subscribe((data) => {
        var responseData: any = data;
        var status = responseData.STATUS;
        if (status == "success") {
          this.courseProcess = 6;
          this.fifthProcessLevel = true;
          this.fifthcurrentProcess = true;
          this.preview = 2;
          this.BlockLeftClick = true;
        }
      });
  }

  // ================================================================================
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    if (window.innerWidth < 2000 && window.innerWidth > 992) {
      var innerWindWidth = window.innerWidth - 18;
      //        event.target.innerWidth;
      //        this.resize_window = true;
      document.getElementById("windiv").style.width = innerWindWidth + "px";
    } else {
      document.getElementById("windiv").style.width = "100%";
    }
    if (window.innerWidth <= 992) {
      this.cardevent = true;
      console.log("workinggggggggg");
      // document.getElementById("pointerone").style.pointerEvents = "none";
    } else {
      this.cardevent = false;
      // document.getElementById("pointerone").style.pointerEvents = "auto";
    }
  }

  private checkScreenWidth() {
    var winwidth = window.innerWidth - 18;
    if (window.innerWidth < 2000 && window.innerWidth > 992) {
      document.getElementById("windiv").style.width = winwidth + "px";
    } else {
      document.getElementById("windiv").style.width = "100%";
    }
    if (window.innerWidth <= 992) {
      this.cardevent = true;
      console.log("workinggggggggg");
      // document.getElementById("pointerone").style.pointerEvents = "none";
    } else {
      this.cardevent = false;
      // document.getElementById("pointerone").style.pointerEvents = "auto";
    }
  }
  getPageIntFxn() {
    var hitObj = {};
    hitObj["token"] = this._constantService.getSessionDataBYKey("token");
    hitObj["token_param"] = {};
    hitObj["token_param"]["device_type"] = "w";
    hitObj["token_param"]["host"] = "";
    hitObj["pg_uuid"] = this.pageId;
    this._constantService
      .fetchDataApi(this._constantService.getInterestPageServiceUrl(), hitObj)
      .subscribe((data) => {
        var responseData: any = data;
        var status = responseData.STATUS;
        if (status == this._constantService.success_msg) {
          this.pageInterest = JSON.parse(
            this._constantService.getSessionDataBYKey("interests")
          );
          if (this.pageInterest != undefined) {
            var interestObj = JSON.parse(
              this._constantService.getSessionDataBYKey("interests")
            );
            //                    for (var i = 0; i < this.pageInterest.length; i++) {
            //                        var intPair = {};
            //                        intPair['id'] = this.pageInterest[i];
            //                        intPair['name'] = this.pageInterest[i];
            //                        intPair['status'] = true;
            //                        this.pageInterestList.push(intPair);
            //                    }
            for (let [key, value] of Object.entries(interestObj)) {
              var intPair = {};
              intPair["id"] = key;
              intPair["name"] = value;
              intPair["status"] = true;
              this.pageInterestList.push(intPair);
            }
          }
        } else if (status == this._constantService.error_token) {
          this.dataConf["type"] = 4;
          this.dataConf["msg"] = "Session Expire";
          this.dataConf["error_msg"] = "Session Expired!";
          this.openConfirmation = true;
          return false;
        } else {
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "Error";
          this.dataConf["error_msg"] = responseData.ERROR_MSG;
          this.openConfirmation = true;
          return false;
        }
      }),
      (error) => { };
  }

  showInterestList() {
    this.showCourseInterestList = true;
  }
  hideInterestList() {
    this.showCourseInterestList = false;
  }
  clickout() {
    // this.showCourseInterestList = false;
  }

  clickIn() {
    // console.log("::::::::::::::::::::::");
    // this.showCourseInterestList = true;
  }
  addTags(tag_id, tag_Name) {
    var listIndex = this.pageInterestList.findIndex((x) => x.id == tag_id);
    if (listIndex > -1) {
      this.pageInterestList[listIndex]["status"] = false;
    }

    var tag = document.createElement("span");
    tag.id = "tag_" + tag_id;
    tag.className = "courseInterest";
    tag.innerText = tag_Name;
    var img = document.createElement("IMG");
    img.setAttribute("src", "assets/images/svg/tagcross.svg");
    img.setAttribute("id", "remove_" + tag_id);
    tag.appendChild(img);
    document.getElementById("interestWrapper").appendChild(tag);

    var tag_dom = document.getElementById("remove_" + tag_id);
    var post_tagArr = this.pageInterestList;
    tag_dom.addEventListener("click", () => {
      var tagName = document.getElementById("tag_" + tag_id).innerText;
      document.getElementById("tag_" + tag_id).remove();
      var remIndex = post_tagArr.findIndex((x) => x.id == tag_id);
      this.pageInterestList[remIndex].status = true;
    });
    if (event) {
      event.stopPropagation();
    }
    this.showCourseInterestList = false;
  }

  setInterestArray() {
    var intArr = [];
    this.pageInterestList.forEach((obj) => {
      if (!obj.status) {
        intArr.push(obj.id);
      }
    });
    setTimeout(() => {
      this.updateCourseInterestFxn();
    }, 100);
  }

  updateCourseInterestFxn() {
    var intArr = [];
    this.pageInterestList.forEach((obj) => {
      if (!obj.status) {
        intArr.push(obj.id);
      }
    });

    var hitObj = {};
    hitObj["token"] = this._constantService.getSessionDataBYKey("token");
    hitObj["token_param"] = {};
    hitObj["token_param"]["device_type"] = "w";
    hitObj["token_param"]["host"] = "";
    hitObj["pg_uuid"] = this.pageId;
    hitObj["cors_uuid"] = this.courseId;
    hitObj["inrt"] = intArr.toString();

    this._constantService
      .fetchDataApi(this._constantService.getUpdateInterestServiceUrl(), hitObj)
      .subscribe((data) => {
        var responseData: any = data;
        var status = responseData.STATUS;
        if (status == this._constantService.success_msg) {
        } else if (status == this._constantService.error_token) {
          this.dataConf["type"] = 4;
          this.dataConf["msg"] = "Session Expire";
          this.dataConf["error_msg"] = "Session Expired!";
          this.openConfirmation = true;
          return false;
        } else {
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "Error";
          this.dataConf["error_msg"] = responseData.ERROR_MSG;
          this.openConfirmation = true;
          return false;
        }
      }),
      (error) => { };
  }

  //    creteCkeditorForDescription(id){
  //
  //
  //        if (CKEDITOR.instances[id]) {
  //            CKEDITOR.instances[id].destroy(true);
  //            console.log("asif");
  //        }
  //        setTimeout(() => {
  //            CKEDITOR.replace(id, {
  //               // readOnly: this.ckeditorReadonly,
  //                width: '100%',
  //                height: 100,
  //                resize_maxWidth: 1000,
  //                resize_minWidth: 800,
  //                //                extraPlugins:'mathjax, mathJaxLib : 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/latest.js?config=TeX-MML-AM_CHTML',
  //                //extraPlugins : 'uploadimage',
  ////                filebrowserBrowseUrl: this._constantService.ckeditorPath + 'ckfinder/ckfinder.html?command=QuickUpload&type=ImagesQuickUpload&type=Images&environment=' + this._constantService.platformDefinition + '&testId=' + this.contentId + '&userId=' + this._constantService.getSessionDataBYKey('u_id'),
  ////                filebrowserImageBrowseUrl: this._constantService.ckeditorPath + 'ckfinder/ckfinder.html?type=Images?command=QuickUpload&type=ImagesQuickUpload&type=Images&environment=' + this._constantService.platformDefinition + '&testId=' + this.contentId + '&userId=' + this._constantService.getSessionDataBYKey('u_id'),
  ////                filebrowserFlashBrowseUrl: this._constantService.ckeditorPath + 'ckfinder/ckfinder.html?type=Flash?command=QuickUpload&type=ImagesQuickUpload&type=Images&environment=' + this._constantService.platformDefinition + '&testId=' + this.contentId + '&userId=' + this._constantService.getSessionDataBYKey('u_id'),
  ////                filebrowserUploadUrl: this._constantService.ckeditorPath + 'ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files&type=ImagesQuickUploads&environment=' + this._constantService.platformDefinition + '&testId=' + this.contentId + '&userId=' + this._constantService.getSessionDataBYKey('u_id'),
  ////                filebrowserImageUploadUrl: this._constantService.ckeditorPath + 'ckfinder/core/connector/php/connector.php?command=QuickUpload&type=ImagesQuickUpload&type=Images&environment=' + this._constantService.platformDefinition + '&testId=' + this.contentId + '&userId=' + this._constantService.getSessionDataBYKey('u_id'),
  ////                filebrowserFlashUploadUrl: this._constantService.ckeditorPath + 'ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Flash',
  //                customConfig: 'config.js',
  //            });
  //        }, 200);
  //
  //
  //        console.log(CKEDITOR.instances, id);
  //
  //
  //
  //    }

  // =============================================================================
  // live straming code
  liveStreamTitle: string = "";
  liveStreamDescriton: string = "";
  liveStreamTitleLimit: number = 0;
  liveStreamDescritonLimit: number = 0;
  isLiveStreamTitleLimit: boolean = false;
  isMentor: boolean = false;
  isLiveStreamDescritonLimit: boolean = false;
  liveStreamMentor: any;
  isMentorList: boolean = false;
  liveStreamMentorName: any;
  liveStreamHour: any;
  liveStreamMint: any;
  liveStreamTimeHour: any = 1;
  regularCourse: boolean = true;
  regularStreamCourse: boolean = false;
  streamCourse: boolean = false;
  coursePackageType: number = 0;
  isLiveStreamFree: boolean = false;
  liveStreamIndex = { sectionIndex: -1, ContentIndex: -1 };
  fromDate: any;
  liveStreamMentorDetail = {
    mentorUUid: "",
    mentorName: "",
    mentorProfilePhoto: "",
    mentorId: "",
    follow: "",
  };
  liveStreamDate: any = this._constantService.getDateFromMilliseconds(
    "yyyy-mm-dd",
    new Date().getTime()
  );
  //  this._constantService.getDateFromMilliseconds('yyyy-mm-dd', Date.now());
  liveStreamTime = "12:00";
  liveStreamTimeInMin: number = 0;
  showapproxList2: boolean = false;
  liveStreamDateInMiliSec;
  followvalue: boolean = false;
  private popupPos() {
    var scrollHeight = window.pageYOffset;
    // var heightTop = scrollHeight - 110;
    var heightTop = scrollHeight - 0;
    setTimeout(() => {
      // document.getElementById("LivestreamPopup").style.top = (heightTop + 'px');
    }, 100);
  }
  showliveStream(sectionIndex) {
    this.lastVerticalScrollPosition = window.pageYOffset;
    window.scrollTo(0, 0);
    setTimeout(() => {
      var inputDate: any = document.getElementById("liveStreamDate");
      inputDate.value = this.liveStreamDate;
    }, 500);
    this.liveStreamIndex["sectionIndex"] = sectionIndex;
    this.showLiveStreamPopup = true;
    this.createLiveStreamContent(sectionIndex);
    this.popupPos();
  }

  hideliveStream() {
    window.scrollTo(0, this.lastVerticalScrollPosition);
    this.showConnections = false;
    this.connectionSearchData.sdt = "";
    this.liveStreamDate = this._constantService.getDateFromMilliseconds(
      "yyyy-mm-dd",
      new Date().getTime()
    );
    this.liveStreamTime = this._constantService.getDateFromMilliseconds(
      "hh:mm",
      new Date().getTime()
    );
    if (
      this.courseContentSection[this.liveStreamIndex.sectionIndex]
        .SECTION_CONTENT[this.liveStreamIndex.ContentIndex].CONTENT_UUID == ""
    ) {
      this.courseContentSection[
        this.liveStreamIndex.sectionIndex
      ].SECTION_CONTENT.splice(
        this.courseContentSection[this.liveStreamIndex.sectionIndex]
          .SECTION_CONTENT.length - 1,
        1
      );
    } else {
    }
    // this.hideMentor();
    this.liveStreamDescriton = "";
    this.liveStreamTitle = "";
    this.liveStreamTimeHour = 1;
    // this.isMentor = false;
    setTimeout(function () {
      this.showLiveStreamPopup = false;
    }, 500);
    this.showLiveStreamPopup = false;

    this.cd.detectChanges();
  }

  showhourLiveStreamList() {
    this.showHourList = !this.showHourList;
    this.showMinList = false;
  }
  showminLiveStreamList() {
    this.showMinList = !this.showMinList;
    this.showHourList = false;
  }

  showApproxlist() {
    this.showApproxList = true;
  }
  hideApproxlist() {
    this.showApproxList = false;
  }
  showApproxlist2() {
    this.showapproxList2 = true;
  }
  hideApproxlist2() {
    this.showapproxList2 = false;
  }

  titleValidation(event) {
    let title = event.srcElement.innerText.trim();
    this.liveStreamTitleLimit = title.length;
    if (this.liveStreamTitleLimit > 50) {
      this.isLiveStreamTitleLimit = true;
    } else {
      this.isLiveStreamTitleLimit = false;
    }
  }

  liveStreamingTitle(event) {
    if (document.getElementById("liveStreamTitleId").innerText != "") {
      this.liveStreamTitle = this.postData.pastedDataStripping(
        "liveStreamTitleId"
      );
      if (document.getElementById("liveStreamTitleId")) {
        document.getElementById(
          "liveStreamTitleId"
        ).innerHTML = this.liveStreamTitle;
        this.liveStreamTitle = document.getElementById(
          "liveStreamTitleId"
        ).innerText;
      }
    }
  }

  descritonValidation(event) {
    let descriton = event.srcElement.innerText.trim();
    this.liveStreamDescritonLimit = descriton.length;
    if (this.liveStreamDescritonLimit > 100) {
      this.isLiveStreamDescritonLimit = true;
    } else {
      this.isLiveStreamDescritonLimit = false;
    }
  }

  liveStreamingDescriton(event) {
    if (document.getElementById("liveStreamDescription").innerText != "") {
      this.liveStreamDescriton = this.postData.pastedDataStripping(
        "liveStreamDescription"
      );
      if (document.getElementById("liveStreamDescription")) {
        document.getElementById(
          "liveStreamDescription"
        ).innerHTML = this.postData.decodeURIPostData(this.liveStreamDescriton);
        this.liveStreamDescriton = document.getElementById(
          "liveStreamDescription"
        ).innerText;
      }
    }
  }

  hideMentor() {
    this.isMentor = false;
    this.liveStreamMentorDetail["mentorUUid"] = this.liveStreamMentorDetail[
      "mentorProfilePhoto"
    ] = this.liveStreamMentorDetail["mentorName"] = "";
    this.liveStreamTimeInMin = 1;
    this.liveStreamTimeHour = 0;
    this.showMentorUrlInput = true;
  }

  showConnectionList() {
    this.connectionSearchData.sdt = "";
    if(this.connectionSearchData)
    this.showConnections = !this.showConnections;
  }
  hideConnectionList() {
    this.showConnections = false;
  }

  setSelectedConnection(connection) {
    this.selectedConnection = connection;
    this.showConnections = false;
    this.liveStreamMentorDetail["mentorUUid"] = connection.USER_UUID;
    this.liveStreamMentorDetail["mentorName"] = connection.USER_FULL_NAME;
    this.liveStreamMentorDetail["mentorId"] = connection.USER_ID;
    if (connection.PROFILE_PHOTO_PATH && connection.PROFILE_PHOTO_PATH != null) {
      this.liveStreamMentorDetail["mentorProfilePhoto"] =
        connection.PROFILE_PHOTO_PATH +
        "profile/" +
        connection.USER_ID +
        "_150x150.png?v=" +
        connection.IMG_UPD_DT;
    } else {
      this.liveStreamMentorDetail["mentorProfilePhoto"] =
        "../assets/images/defaultImgPathForSuggestedConnections.png";
    }
    this.selectedConnection.PROFILE_PHOTO_PATH=this.liveStreamMentorDetail.mentorProfilePhoto;
  }

  cancelAssignedMentor() {
    this.selectedConnection = undefined;
    this.connectionSearchData.sdt = "";
    this.liveStreamMentorDetail = {
      mentorUUid: "",
      mentorName: "",
      mentorProfilePhoto: "",
      mentorId: "",
      follow: "",
    };
  }
  onScrollDown() {
    if (!this.stopScroll) this.fetchConnectionList(false);
  }

  fetchConnectionList(isFreshFetch) {
    if (isFreshFetch) {
      this.connectionList = []; //making connectionlist empty if search text changed
      this.connectionSearchData.count = 1;
    } else {
      this.connectionSearchData.count++;
    }
    this.showConnections = true;
    if (
      this.connectionSearchData.sdt &&
      this.connectionSearchData.sdt.length > 2
    ) {
      this.connectionSearchData.token_param = { device_type: "w", host: "" };
      this.connectionSearchData.r_count = 5;
      this.connectionSearchData.token = this._constantService.getSessionDataBYKey(
        "token"
      );
      this._constantService
        .fetchDataApi(
          this._constantService.getSearchedConnectionUser(),
          this.connectionSearchData
        )
        .subscribe((data) => {
          var responseData: any = data;
          var status = responseData.STATUS;
          if (
            status == this._constantService.success_msg &&
            responseData.CONNECTION_USERS_DATA.length > 0
          ) {
            this.connectionList = this.connectionList.concat(
              responseData.CONNECTION_USERS_DATA
            );
            this.cd.detectChanges();
          } else {
            this.stopScroll = true;
          }
        });
    } else {
      this.connectionList = [];
    }
  }

  showMentor() {
    this.dateToMiliSecConverter();
    this.showMentorUrlInput = false;
    this.liveStreamMentorName = this.mentorUrl.trim().split("/");
    if (!this.liveStreamMentorName[4]) {
      this.dataConf["type"] = 2;
      this.dataConf["msg"] = "STUDY24X7";
      this.dataConf["error_msg"] = "Please provide valid user profile path";
      this.openConfirmation = true;
      this.showMentorUrlInput = true;

      return false;
    }
    var hitObj = {};
    hitObj["token"] = this._constantService.getSessionDataBYKey("token");
    hitObj["token_param"] = {};
    hitObj["token_param"]["device_type"] = "w";
    hitObj["token_param"]["host"] = "";
    hitObj["username"] = this.liveStreamMentorName[4];
    this._constantService
      .fetchDataApi(this._constantService.getUrlForLiveStreamMentor(), hitObj)
      .subscribe((data) => {
        var responseData: any = data;
        var status = responseData.STATUS;
        if (status == "success") {
          if (responseData.PROFILE_PHOTO_PATH) {
            this.liveStreamMentorDetail["mentorProfilePhoto"] =
              responseData.PROFILE_PHOTO_PATH +
              "profile/" +
              responseData.USER_ID +
              "_150x150.png?v=" +
              responseData.IMG_UPD_DT;
          } else {
            this.liveStreamMentorDetail["mentorProfilePhoto"] =
              "../assets/images/defaultImgPathForSuggestedConnections.png";
          }

          this.liveStreamMentorDetail[
            "mentorName"
          ] = this.postData.decodeURIPostData(responseData.USER_FULL_NAME);
          this.liveStreamMentorDetail["mentorUUid"] = responseData.USER_UUID;
          this.liveStreamMentorDetail["mentorId"] = responseData.USER_ID;
          this.liveStreamMentorDetail["follow"] = responseData.IS_FOLLOW;
          this.isMentor = true;
          this.cd.detectChanges();
        } else {
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "STUDY24X7";
          this.dataConf["error_msg"] = responseData.ERROR_MSG;
          this.openConfirmation = true;
          this.showMentorUrlInput = true;
          return false;
        }
      });
  }

  liveStreamingHour(event) {
    this.liveStreamHour = event.srcElement.innerText.trim();
  }

  liveStreamingMint(event) {
    this.liveStreamMint = event.srcElement.innerText.trim();
  }

  liveStreamingApproxTime(index, event) {
    event.stopPropagation();
    this.liveStreamTimeHour = index;
    this.hideApproxlist();
  }

  liveStreamingApproxTime2(index, event) {
    event.stopPropagation();
    this.liveStreamTimeInMin = index;
    this.hideApproxlist2();
  }

  coursePtype(index) {
    this.coursePackageType = index;
    if (this.coursePackageType == 0) {
      this.regularCourse = true;
      this.streamCourse = false;
      this.regularStreamCourse = false;
    } else if (this.coursePackageType == 1) {
      this.streamCourse = true;
      this.regularCourse = false;
      this.regularStreamCourse = false;
    } else if (this.coursePackageType == 2) {
      this.regularStreamCourse = true;
      this.regularCourse = false;
      this.streamCourse = false;
    }
  }

  createLiveStreamContent(index) {
    if (
      this.courseContentSection[index].SECTION_CONTENT ||
      this.courseContentSection[this.liveStreamIndex.sectionIndex]
        .SECTION_CONTENT[this.liveStreamIndex.ContentIndex].CONTENT_UUID == ""
    ) {
      this.courseContentSection[index].SECTION_CONTENT.push({
        CONTENT_UUID: "",
        file: "",
        CONTENT_FILE_NAME: "",
        CONTENT_TYPE: 7,
        CONTENT_OLD_NAME: "",
        edit: "false",
        CONTENT_DATA_TYPE: "",
        download: "false",
        addURL: "false",
        progress: "false",
        content_orderId: "",
        urlType: "",
        path: "",
        lock: "1",
        INFO: "",
        reviewStatus: "",
        placeholder: "",
        CONTENT_URL_NAME: "",
        progressPercentage: 0,
        progressBar: 339.292,
      });
      this.showLiveStreamPopup = true;
      this.liveStreamIndex["ContentIndex"] =
        this.courseContentSection[index].SECTION_CONTENT.length - 1;
    } else {
      this.showLiveStreamPopup = true;
      this.courseContentSection[index].SECTION_CONTENT.push({
        CONTENT_UUID: "",
        file: "",
        CONTENT_FILE_NAME: "",
        CONTENT_TYPE: 7,
        CONTENT_OLD_NAME: "",
        edit: "false",
        CONTENT_DATA_TYPE: "",
        download: "false",
        addURL: "false",
        progress: "false",
        content_orderId: "",
        urlType: "",
        path: "",
        lock: "1",
        INFO: "",
        reviewStatus: "",
        placeholder: "",
        CONTENT_URL_NAME: "",
        progressPercentage: 0,
        progressBar: 339.292,
      });
    }
  }

  validateLiveStreming() {
    if (this.liveStreamTitle.length > 50 || this.liveStreamTitle.length < 3) {
      this.dataConf["type"] = 2;
      this.dataConf["msg"] = "STUDY24X7";
      this.dataConf["error_msg"] = "Please provide acceptable data in title";
      this.openConfirmation = true;
      return false;
    } else if (this.liveStreamTimeHour == 0 && this.liveStreamTimeInMin == 0) {
      this.dataConf["type"] = 2;
      this.dataConf["msg"] = "STUDY24X7";
      this.dataConf["error_msg"] =
        "please provide acceptable Approx Stream Time.";
      this.openConfirmation = true;
      return false;
    } else if (
      this.liveStreamDescriton.length > 100 ||
      this.liveStreamDescriton.length < 3
    ) {
      this.dataConf["type"] = 2;
      this.dataConf["msg"] = "STUDY24X7";
      this.dataConf["error_msg"] =
        "please provide acceptable data in description.";
      this.openConfirmation = true;
      return false;
    }
    return true;
  }

  addUpdateLiveStreamContent() {
    this.dateToMiliSecConverter();
    this.showConnections = false;
    this.disableScheduleStream = true;
    this.connectionSearchData.sdt = "";

    var hitObj = {};
    hitObj["token"] = this._constantService.getSessionDataBYKey("token");
    hitObj["token_param"] = {};
    hitObj["token_param"]["device_type"] = "w";
    hitObj["token_param"]["host"] = "";
    hitObj["pg_uuid"] = this.pageId;
    hitObj["cors_uuid"] = this.courseId;
    hitObj["sec_uuid"] = this.courseContentSection[
      this.liveStreamIndex["sectionIndex"]
    ].SECTION_UUID;
    hitObj["live_stream_title"] = this.liveStreamTitle;
    hitObj["duration"] =
      this.liveStreamTimeHour * 60 + this.liveStreamTimeInMin;
    hitObj["start_date"] = this.liveStreamDateInMiliSec;
    hitObj["mentor_uuid"] = this.liveStreamMentorDetail["mentorUUid"] || " ";
    hitObj["desc"] = this.postData.encodeURIPostData(this.postData.decodeURIPostData(this.liveStreamDescriton));
    hitObj["cntnt_uuid"] = this.courseContentSection[
      this.liveStreamIndex["sectionIndex"]
    ].SECTION_CONTENT[this.liveStreamIndex["ContentIndex"]].CONTENT_UUID;

    if (this.validateLiveStreming()) {
      this._constantService
        .fetchDataApi(
          this._constantService.getUrlForLiveStreamingData(),
          hitObj
        )
        .subscribe((data) => {
          var responseData: any = data;
          var status = responseData.STATUS;
          if (status == "success") {
            this.courseContentSection[
              this.liveStreamIndex["sectionIndex"]
            ].SECTION_CONTENT[
              this.liveStreamIndex["ContentIndex"]
            ].CONTENT_OLD_NAME = this.miliSecTodateConvertar(
              this.liveStreamDateInMiliSec
            );
            this.courseContentSection[
              this.liveStreamIndex["sectionIndex"]
            ].SECTION_CONTENT[
              this.liveStreamIndex["ContentIndex"]
            ].CONTENT_UUID = responseData.CONTENT_UUID;
            this.courseContentSection[
              this.liveStreamIndex["sectionIndex"]
            ].SECTION_CONTENT[
              this.liveStreamIndex["ContentIndex"]
            ].CONTENT_FILE_NAME = this.liveStreamTitle;
            var liveStreamdata = {};
            liveStreamdata["LiveStreamTitle"] = this.postData.decodeURIPostData(
              this.liveStreamTitle
            );
            liveStreamdata["LiveStreamDes"] = this.postData.decodeURIPostData(
              this.liveStreamDescriton
            );
            liveStreamdata["LiveStreamDate"] = this.liveStreamDateInMiliSec;
            liveStreamdata[
              "liveStreamMentorName"
            ] = this.postData.decodeURIPostData(
              this.liveStreamMentorDetail["mentorName"]
            );
            liveStreamdata[
              "liveStreamMentorImage"
            ] = this.liveStreamMentorDetail["mentorProfilePhoto"];
            liveStreamdata["LiveStreamDuration"] =
              this.liveStreamTimeHour * 60 + this.liveStreamTimeInMin;
            liveStreamdata[
              "LiveStreamMentor_UUID"
            ] = this.liveStreamMentorDetail["mentorUUid"];
            this.courseContentSection[
              this.liveStreamIndex["sectionIndex"]
            ].SECTION_CONTENT[
              this.liveStreamIndex["ContentIndex"]
            ].file = liveStreamdata;
            this.courseContentSection[
              this.liveStreamIndex["sectionIndex"]
            ].SECTION_CONTENT[
              this.liveStreamIndex["ContentIndex"]
            ].file.LiveStreamDate = this.miliSecTodateConvertar(
              this.courseContentSection[this.liveStreamIndex["sectionIndex"]]
                .SECTION_CONTENT[this.liveStreamIndex["ContentIndex"]].file
                .LiveStreamDate
            );

            this.showLiveStreamPopup = false;
            // this.isMentor = false;
            this.hideliveStream();
          } else {
            this.dataConf["type"] = 2;
            this.dataConf["msg"] = "STUDY24X7";
            this.dataConf["error_msg"] = responseData.ERROR_MSG;
            this.openConfirmation = true;
            return false;
          }
        });
    }
    this.disableScheduleStream = false;
    this.cd.detectChanges();
  }

  setLiveStreamingTime() {
    let startDate = Math.floor(this.fromDate.getTime());
    let timeMili =
      startDate +
      this.liveStreamHour * 60 * 60 * 1000 +
      this.liveStreamMint * 60 * 1000;
    return timeMili;
  }

  miliSecTodateConvertar(milliseconds) {
    let d = new Date(milliseconds);
    let p = d.toString();
    let Q = p.split("G");
    return Q[0];
  }

  dateToMiliSecConverter() {
    var liveStreamDate = this.liveStreamDate + " " + this.liveStreamTime;
    let d = new Date(liveStreamDate);
    this.liveStreamDateInMiliSec = d.getTime();
  }

  setliveStream(sectionIndex, ContentIndex) {
    this.liveStreamDate = this.courseContentSection[
      sectionIndex
    ].SECTION_CONTENT[ContentIndex].file.LiveStreamDate;
    this.liveStreamDate = new Date(this.liveStreamDate).getTime();
    this.liveStreamTime = this._constantService.getDateFromMilliseconds(
      "hh:mm",
      this.liveStreamDate
    );
    this.liveStreamDate = this._constantService.getDateFromMilliseconds(
      "yyyy-mm-dd",
      this.liveStreamDate
    );

    this.showLiveStreamPopup = true;
    this.liveStreamIndex["ContentIndex"] = ContentIndex;
    this.liveStreamIndex["sectionIndex"] = sectionIndex;
    // this.isMentor = true;
    this.liveStreamTitle = this.courseContentSection[
      sectionIndex
    ].SECTION_CONTENT[ContentIndex].file.LiveStreamTitle;
    this.liveStreamTimeHour = Math.floor(
      this.courseContentSection[sectionIndex].SECTION_CONTENT[ContentIndex].file
        .LiveStreamDuration / 60
    );
    this.liveStreamTimeInMin =
      this.courseContentSection[sectionIndex].SECTION_CONTENT[ContentIndex].file
        .LiveStreamDuration % 60;
    this.liveStreamDescriton = this.courseContentSection[
      sectionIndex
    ].SECTION_CONTENT[ContentIndex].file.LiveStreamDes;

    if (
      this.courseContentSection[sectionIndex].SECTION_CONTENT[ContentIndex].file
        .liveStreamMentorName == ""
    ) {
      this.isMentor = false;
      this.liveStreamMentorDetail["mentorName"] = "";
      this.liveStreamMentorDetail["mentorUUid"] = "";
      this.liveStreamMentorDetail["mentorProfilePhoto"] = "";
    } else {
      this.liveStreamMentorDetail[
        "mentorName"
      ] = this.postData.decodeURIPostData(
        this.courseContentSection[sectionIndex].SECTION_CONTENT[ContentIndex]
          .file.liveStreamMentorName
      );
      this.liveStreamMentorDetail["mentorUUid"] = this.courseContentSection[
        sectionIndex
      ].SECTION_CONTENT[ContentIndex].file.mentorUUid;
      this.liveStreamMentorDetail["mentorProfilePhoto"] =
        this.courseContentSection[sectionIndex].SECTION_CONTENT[ContentIndex]
          .file.liveStreamMentorImage ||
        "../assets/images/defaultImgPathForSuggestedConnections.png";
      this.selectedConnection = {};
      this.selectedConnection.USER_FULL_NAME = this.liveStreamMentorDetail.mentorName;
      this.selectedConnection.USER_UUID = this.liveStreamMentorDetail.mentorUUid;
      if(this.selectedConnection.PROFILE_PHOTO_PATH==null){
        this.selectedConnection.PROFILE_PHOTO_PATH=this._constantService.defaultImgPathForSuggestedConnections;
      }else
      this.selectedConnection.PROFILE_PHOTO_PATH = this.selectedConnection.PROFILE_PHOTO_PATH +'profile/' +this.selectedConnection.USER_ID + '_150x150.png?v=' + this.selectedConnection.IMG_UPD_DT;
    }
  }

  mentorDataFun() {
    return this.mentorData;
  }

  changefollow(FOLLOW_STATUE, mentorIndex) {
    if (FOLLOW_STATUE == 0) {
      var requestFollow = {};
      requestFollow["token"] = this._constantService.getSessionDataBYKey(
        "token"
      );
      requestFollow["token_param"] = {};
      requestFollow["token_param"]["device_type"] = "w";
      requestFollow["token_param"]["host"] = "";
      requestFollow["conrecid"] = this.mentorData[mentorIndex].USER_ID;

      this._constantService
        .fetchDataApi(
          this._constantService.getRequestFollowServiceUrl(),
          requestFollow
        )
        .subscribe((data) => {
          var responseData: any = data;
          var status = responseData.STATUS;
          if (status == "success") {
            // this.followvalue = false;
            this.mentorData[mentorIndex].IS_FOLLOW = 1;
            this.mentorDataFun();
          }
        });
    } else {
      var requestUnfollow = {};
      requestUnfollow["token"] = this._constantService.getSessionDataBYKey(
        "token"
      );
      requestUnfollow["token_param"] = {};
      requestUnfollow["token_param"]["device_type"] = "w";
      requestUnfollow["token_param"]["host"] = "";
      requestUnfollow["conrecid"] = this.mentorData[mentorIndex].USER_ID;

      this._constantService
        .fetchDataApi(
          this._constantService.getRequestUnfollowServiceUrl(),
          requestUnfollow
        )
        .subscribe((data) => {
          var responseData: any = data;
          var status = responseData.STATUS;
          if (status == this._constantService.success_msg) {
            // this.followvalue = true;
            this.mentorData[mentorIndex].IS_FOLLOW = 0;
            this.mentorDataFun();
          }
        });
    }
  }

  setliveStreaduration(duration) {
    if (duration > 59) {
      let h = Math.floor(duration / 60);
      let min = duration % 60;
      return h + "h" + " " + min + "m";
    } else {
      return duration + " " + "m";
    }
  }

  trialCheckHandler() {
    this.isTrialCheck = !this.isTrialCheck;
    if (!this.coursePaymentCheck) {
      this.isTrialCheck = false;
    }
    if (!this.isTrialCheck) {
      this.freeTrialEndDate = "";
      this.freeTrialStartDate = "";
      this.freeTrialDays = 0;
    }
  }

  validateTrialData() {
    if (this.isTrialCheck) {
      if (this.trialType == 1) {
        if (this.freeTrialStartDate && this.freeTrialEndDate) {
          let currDate = new Date();
          let startDate = new Date(this.freeTrialStartDate);
          let endDate = new Date(this.freeTrialEndDate);
          //                    console.log(currDate.getTime(), startDate.getTime(), endDate.getTime());
          let currTime = currDate.getTime();
          let startTime = startDate.getTime();
          let endTime = endDate.getTime();

          if (endTime <= startTime) {
            this.dataConf["msg"] = "STUDY24X7";
            this.dataConf["type"] = 2;
            this.dataConf["error_msg"] =
              "Please enter end date lesser than start date";
            this.openConfirmation = true;
            return false;
          } else if (startTime < currTime) {
            // this.dataConf['msg'] = "STUDY24X7";
            // this.dataConf['type'] = 2;
            // this.dataConf['error_msg'] = "Please enter acceptable start date";
            // this.openConfirmation = true;
            // return false;
            return true;
          } else {
            return true;
          }
        } else if (!this.freeTrialStartDate) {
          this.dataConf["msg"] = "STUDY24X7";
          this.dataConf["type"] = 2;
          this.dataConf["error_msg"] = "Please enter start trial date";
          this.openConfirmation = true;
          return false;
        } else if (!this.freeTrialEndDate) {
          this.dataConf["msg"] = "STUDY24X7";
          this.dataConf["type"] = 2;
          this.dataConf["error_msg"] = "Please enter end trial date";
          this.openConfirmation = true;
          return false;
        }
      } else if (this.trialType == 2) {
        if (this.freeTrialDays == 0) {
          this.dataConf["msg"] = "STUDY24X7";
          this.dataConf["type"] = 2;
          this.dataConf["error_msg"] = "Please enter trial days";
          this.openConfirmation = true;
          return false;
        }
      }
      return true;
    } else {
      this.freeTrialEndDate = "";
      this.freeTrialStartDate = "";
      return true;
    }
  }

  addUpdTrialStatus() {
    var hitObj = {};
    hitObj["token"] = this._constantService.getSessionDataBYKey("token");
    hitObj["token_param"] = {};
    hitObj["token_param"]["device_type"] = "w";
    hitObj["token_param"]["host"] = "";
    hitObj["cors_uuid"] = this.courseId;
    hitObj["pg_uuid"] = this.pageId;
    hitObj["publish"] = this.publishvalue;
    if (this.isTrialCheck) {
      if (this.trialType == 1) {
        hitObj["start_date"] = this.freeTrialStartDate;
        hitObj["end_date"] = this.freeTrialEndDate;
        hitObj["days"] = "";
        hitObj["is_subs"] = "1";
      } else if (this.trialType == 2) {
        hitObj["start_date"] = "";
        hitObj["end_date"] = "";
        hitObj["days"] = this.freeTrialDays;
        hitObj["is_subs"] = "1";
      } else if (this.trialType == 3) {
        hitObj["start_date"] = "";
        hitObj["end_date"] = "";
        hitObj["days"] = "";
        hitObj["is_subs"] = "1";
      }
    } else {
      hitObj["start_date"] = "";
      hitObj["end_date"] = "";
      hitObj["days"] = "";
      hitObj["is_subs"] = "0";
    }

    this._constantService
      .fetchDataApi(this._constantService.getAddUpdTrialRestUrl(), hitObj)
      .subscribe((data) => {
        var responseData: any = data;
        var status = responseData.STATUS;
        if (status == "success") {
        } else {
          this.courseProcessFunc(3);
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "STUDY24X7";
          this.dataConf["error_msg"] = responseData.ERROR_MSG;
          this.openConfirmation = true;
          return false;
        }
      });
  }

  showFreeTrialListFn() {
    this.showFreeTrial = !this.showFreeTrial;
  }

  freeTrialDaysList() {
    this.isFreeTrialList = !this.isFreeTrialList;
  }

  selectFreeTrialDays(index) {
    this.freeTrialDays = index;
  }

  trialTypFun(index) {
    this.trialType = index;
  }

  RepublishCourse() {
    var hitObj = {};
    hitObj["token"] = this._constantService.getSessionDataBYKey("token");
    hitObj["token_param"] = {};
    hitObj["token_param"]["device_type"] = "w";
    hitObj["token_param"]["host"] = "";
    hitObj["cors_uuid"] = this.courseId;
    hitObj["pg_uuid"] = this.pageId;
    hitObj["pub_state"] = this.publishvalue;



    this._constantService
      .fetchDataApi(
        this._constantService.getRepublishcourseServiceUrl(),
        hitObj
      )
      .subscribe((data) => {
        var responseData: any = data;
        var status = responseData.STATUS;
        if (status == "success") {
          this._constantService.setSessionJsonPair("token", responseData.TOKEN);
          this.BlockLeftClick = true;
        } else {
          this.courseProcessFunc(3);
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "STUDY24X7";
          this.dataConf["error_msg"] = responseData.ERROR_MSG;
          this.openConfirmation = true;
          return false;
        }
      });
  }

  trackSectionChange(index, elem) {
    console.log("yesssss!", "Section :" + index);
    return elem ? elem.SECTION_UUID : undefined;
  }

  trackContentChange(index, elem) {
    console.log("Content : " + index);
    return elem ? elem.CONTENT_UUID : undefined;
  }
  leftSideFilter() {
    this.leftFilterMenu = !this.leftFilterMenu;
    if (this.leftFilterMenu == true) {
      let body = document.getElementsByTagName("body")[0];
      body.classList.add("body-overflow");
    } else {
      let body = document.getElementsByTagName("body")[0];
      body.classList.remove("body-overflow");
    }
  }
  Edityourcourse() {
    var hitObj = {};
    hitObj['token'] = this._constantService.getSessionDataBYKey('token');
    hitObj['token_param'] = {};
    hitObj['token_param']['device_type'] = "w";
    hitObj['token_param']['host'] = "";
    hitObj['cors_uuid'] = this.courseId;
    hitObj['pg_uuid'] = this.pageId;
    hitObj['status'] = 1;

    this._constantService.fetchDataApi(this._constantService.edityourcourse(), hitObj).subscribe(data => {
      var responseData: any = data;
      var status = responseData.STATUS;
      if (status == "success") {
        this.getCourseDetails(this.courseId);
      }
      else {
        this.courseProcessFunc(3);
        this.dataConf['type'] = 2;
        this.dataConf['msg'] = "STUDY24X7";
        this.dataConf['error_msg'] = responseData.ERROR_MSG;
        this.openConfirmation = true;
        return false;
      }
    });
  }



}
