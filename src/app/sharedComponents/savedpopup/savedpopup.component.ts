import {Component, OnInit, Input, Output, EventEmitter, AfterViewInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {EncryptionService} from './../../services/encryption.service';
import {ConstantService} from './../../services/constant.service';
import {PostdataService} from './../../services/postdata.service';
@Component({
    selector: 'app-savedpopup',
    templateUrl: './savedpopup.component.html',
    providers: [ ConstantService, EncryptionService, PostdataService],
    // styleUrls: ['./savedpopup.component.scss']
    styleUrls: ['./savedpopup.component.scss', './../postComponents/textpost/allpost.css', './newsavedpopup.component.scss']
})
export class SavedpopupComponent implements OnInit, AfterViewInit {
    totalRatings: any;
    isEnrolled: boolean;
    showFree: boolean = false;
    showUnlimited: boolean = false;
    pageTitle: any;
    courseRating: any;
    courseLevel: string;
    showDays: boolean;
    validity: string = "";
    t_pic: any;
    Text_image = false;
    titleText: any;
    videoVsrc: string;
    showVimeoVedio: boolean;
    text = '';
    videosrc: string;
    showVedio: boolean = false;
    ltIntShow = [];
    showIntArr: boolean = false;
    profile_pic_path: string;
    @Input() postData: any;
    @Output() closeSavedPopup = new EventEmitter<boolean>();
    @Output() savedStatus = new EventEmitter<boolean>();
    @Output() folder_id = new EventEmitter<number>();
    config: string;
    loader: boolean = false;
    showText: boolean = true;
    saveddiv = 3;
    savedFolder = [];
    folder_name = "";
    interestObj = {};
    ImagePath = "";
    tagsArr = [];
    postdata: string = "";
    dataConf = {};
    openConfirmation: boolean = false;
    popup = true;
    courseLanguage = '';
    languageList = [];
    coursePrice: any;
    courseDiscountedPrice: any;
    courseTitle: any;
    showCourse: boolean = false;
    courseType;
    isAdmin;

    closePopup() {
        //this.closeSavedPopup.emit(false);
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
        this.popup = true;
        this.openConfirmation = false;
    }
    close() {
        this.closeSavedPopup.emit(false);
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }

    savedclick(index) {
        this.saveddiv = index;
    }
    public folder = [];



    constructor(
        public _constantService: ConstantService,
        public _router: Router,
        public _encryptionService: EncryptionService,
        private post_service: PostdataService
    ) {

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
        this.setInterestObj();
        if (this.postData.TYPE != 7) {
            this.tagsArr = this.postData.INTERESTS;
            for (var i = 0; i < 4; i++) {
                this.tagsArr[i] = this.postData.INTERESTS[i];
            }
            if (this.postData.TEXT_IMAGE != "") {
                this.Text_image = true;
                this.t_pic = this.postData.TEXT_IMAGE;
            }
            this.ltIntShow = this.postData.INTERESTS;
            if (this.postData.INTERESTS.length > 4) {
                this.showIntArr = true;
                //            for(var i = 4; i <this.arr['INTERESTS'].length ; i++){
                //                this.ltIntShow[i]=this.arr['INTERESTS'][i];
                //            }
            }
        }
        if (this.postData.TYPE == 5) {
            this.showVedio = true;
            this.videosrc = "https://www.youtube.com/embed/" + this.postData['SHARE_LINK'];
            this.text = this.postData.TEXT.replace(/%3C!--bindings%3D%7B%0A%20%20%22ng-reflect-ng-if%22%3A%20%22false%22%0A%7D--%3E/g, "");
            this.text = this.post_service.decodeURIPostData(this.text);
        }
        if (this.postData.TYPE == 4 && this.postData.SHARED_POST_DATA.TYPE == 5) {
            this.showVedio = true;
            this.videosrc = "https://www.youtube.com/embed/" + this.postData['SHARED_POST_DATA']['SHARE_LINK'];
            this.text = this.postData.SHARED_POST_DATA.TEXT.replace(/%3C!--bindings%3D%7B%0A%20%20%22ng-reflect-ng-if%22%3A%20%22false%22%0A%7D--%3E/g, "");
            this.text = this.post_service.decodeURIPostData(this.text);
        }
        if (this.postData.TYPE == 6) {
            this.showVimeoVedio = true;
            this.videoVsrc = "https://player.vimeo.com/video/" + this.postData['SHARE_LINK'];
            this.text = this.postData.TEXT.replace(/%3C!--bindings%3D%7B%0A%20%20%22ng-reflect-ng-if%22%3A%20%22false%22%0A%7D--%3E/g, "");
            this.text = this.post_service.decodeURIPostData(this.text);
        }
        

        //            this.profile_pic_path = this._constantService.defaultImgPath;
        //        }
        this.getUserSavedFolder();
        if (this.postData.TYPE != 4) {

            if (this.postData.PAGE_UUID != "" && this.postData.PAGE_UUID != null) {
                this.postData.ADD_DATE_TIME = this.postData.ADD_DATE_TIME;
                this.postData.USER_FULL_NAME = this.post_service.decodeURIPostData(this.postData.TITLE);
                if (this.postData.PAGE_PROFILE_PHOTO_PATH || this.postData.PAGE_PROFILE_PHOTO_PATH != "") {
                    this.profile_pic_path = this.postData.PAGE_PROFILE_PHOTO_PATH + 'profile/' + this.postData.PAGE_UUID + '_60x60.png';
                } else {
                    if (this.postData.PAGE_TYPE == 0 || this.postData.PAGE_TYPE == "0") {
                        this.profile_pic_path = this._constantService.defaultPageIndImgPath;
                    } else if (this.postData.PAGE_TYPE == 1 || this.postData.PAGE_TYPE == "1") {
                        this.profile_pic_path = this._constantService.defaultPageCollgImgPath;
                    }
                }
                if (this.postData.TEXT_IMAGE != "") {
                    this.Text_image = true;
                    this.t_pic = this.postData.TEXT_IMAGE;
                }

            } else {
                if (this.postData.PAGE_TYPE != undefined && this.postData.PAGE_TYPE != "undefined" && this.postData.PAGE_TYPE != null && this.postData.PAGE_TYPE != "") {
                    if (this.postData.PAGE_PROFILE_PHOTO_PATH && this.postData.PAGE_PROFILE_PHOTO_PATH != "") {
                        this.profile_pic_path = this.postData.PROFILE_PHOTO_PATH + 'profile/' + this.postData.USER_ID + '_60x60.png';
                    } else {
                        if (this.postData.PAGE_TYPE == 0 || this.postData.PAGE_TYPE == "0") {
                            this.profile_pic_path = this._constantService.defaultPageIndImgPath;
                        } else if (this.postData.PAGE_TYPE == 1 || this.postData.PAGE_TYPE == "1") {
                            this.profile_pic_path = this._constantService.defaultPageCollgImgPath;
                        }
                    }

                } else {
                    if (this.postData.PROFILE_PHOTO_PATH) {
                        this.profile_pic_path = this.postData.PROFILE_PHOTO_PATH + 'profile/' + this.postData.USER_ID + '_60x60.png';
                    }
                }
            }

        }

        if (this.postData.TYPE == 2) {
            if (this.postData.TEXT) {
                this.postData.TEXT = this.post_service.decodeURIPostData(this.postData.TEXT);
            } else {
                this.postData.TEXT = "";
            }
            if (this.postData.FILE_TYPE == 3 || this.postData.FILE_TYPE == 4 || this.postData.FILE_TYPE == 5) {
                this.postData.FILE_TYPE = 3;
            }
            if (this.postData.FILE_TYPE == 1) {
                this.ImagePath = "";
                this.ImagePath = this.postData.PATH + "img/" + this.postData.USER_POST_ATTACHMENT_UUID + ".png";
            }

        } else if (this.postData.TYPE == 3) {
            this.postdata = this.post_service.decodeURIPostData(this.postData.TEXT);
        } else if (this.postData.TYPE == 4) {

            this.postdata = this.post_service.decodeURIPostData(this.postData.SHARED_POST_DATA.TEXT);
            if (this.postData.SHARED_POST_DATA.PAGE_UUID) {
                if (this.postData.SHARED_POST_DATA.PAGE_PROFILE_PHOTO_PATH) {
                    this.profile_pic_path = this.postData.SHARED_POST_DATA.PAGE_PROFILE_PHOTO_PATH + 'profile/' + this.postData.SHARED_POST_DATA.PAGE_UUID + '_60x60.png';
                } else {
                    if (this.postData.SHARED_POST_DATA.PAGE_TYPE == 0) {
                        this.profile_pic_path = this._constantService.defaultPageIndImgPath;
                    } else {
                        this.profile_pic_path = this._constantService.defaultPageCollgImgPath;
                    }
                }

            } else {
                this.profile_pic_path = this.postData.SHARED_POST_DATA.PROFILE_PHOTO_PATH + 'profile/' + this.postData.SHARED_POST_DATA.USER_ID + '_60x60.png';
            }

            if (this.postData.SHARED_POST_DATA.FILE_TYPE == 2) {
                if (this.postData.SHARED_POST_DATA.FILE_TYPE == 3 || this.postData.SHARED_POST_DATA.FILE_TYPE == 4 || this.postData.SHARED_POST_DATA.FILE_TYPE == 5) {
                    this.postData.SHARED_POST_DATA.FILE_TYPE = 3;
                }
                if (this.postData.SHARED_POST_DATA.FILE_TYPE == 1) {
                    this.ImagePath = "";
                    this.ImagePath = this.postData.SHARED_POST_DATA.PATH + "img/" + this.postData.SHARED_POST_DATA.USER_POST_ATTACHMENT_UUID + ".png";
                }
                if (this.postData.SHARED_POST_DATA.PAGE_UUID != "" || this.postData.SHARED_POST_DATA.PAGE_UUID != null) {
                    this.postData.USER_FULL_NAME = this.postData.SHARED_POST_DATA.TITLE;
                }
            } else if (this.postData.SHARED_POST_DATA.TYPE == 3) {
                this.postdata = this.post_service.decodeURIPostData(this.postData.SHARED_POST_DATA.TEXT);
            }
            if (this.postData.SHARED_POST_DATA.TEXT_IMAGE != "") {
                this.Text_image = true;
                this.t_pic = this.postData.SHARED_POST_DATA.TEXT_IMAGE;
            }

            if (this.postData['SHARED_POST_DATA']['TYPE'] == 7) {
                this.showCourse = true;
                this.courseType = this.postData['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_TYPE'];
                this.isAdmin = this.postData['SHARED_POST_DATA']['IS_ADMIN'];
                this.getAllLanguage(this.postData['TYPE']);
                var courseLevelId = this.postData['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_LEVEL'];
                this.getCourseLevel(courseLevelId);
                if (this.postData['SHARED_POST_DATA']['COURSE_DETAIL']['RVALIDITY']) {
                    this.validity = this.postData['SHARED_POST_DATA']['COURSE_DETAIL']['RVALIDITY'];
                }

                this.courseRating = this.postData['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_RATING'];

                if (this.postData['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_TITLE'] != null) {
                    this.courseTitle = this.post_service.decodeURIPostData(this.postData['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_TITLE']);
                }

                if (this.postData['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_TYPE'] == 1) {
                    if (this.postData['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_PRICE'][0]['COST']) {
                        this.coursePrice = this.postData['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_PRICE'][0]['COST'];
                    }
                    if (this.postData['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_PRICE'][0]['DISCOUNT_COST']) {
                        this.courseDiscountedPrice = this.postData['SHARED_POST_DATA']['COURSE_DETAIL']['COURSE_PRICE'][0]['DISCOUNT_COST'];
                    }
                } else {
                    this.showFree = true;
                    //  this.courseDiscountedPrice = "Free";
                }
                if (this.isAdmin == undefined || this.isAdmin == null || this.isAdmin == '') {
                    this.isAdmin = 2;
                }
                if (this.postData['SHARED_POST_DATA']['COURSE_DETAIL']['IS_ENROLLED'] == "0") {
                    this.isEnrolled = false;
                } else {
                    this.isEnrolled = true;
                }
                this.totalRatings = this.postData['SHARED_POST_DATA']['COURSE_DETAIL']['TOTAL_COURSE_RATING_COUNT'];

            }

        } else if (this.postData.TYPE == 1) {
            this.postData.TEXT = this.post_service.decodeURIPostData(this.postData.TEXT);
        }
        //        if (this.postData.PROFILE_PHOTO_PATH != null && this.postData.PROFILE_PHOTO_PATH != '') {
        //            this.profile_pic_path = this.postData.PROFILE_PHOTO_PATH + "profile/" + this.postData.USER_ID + "_60x60.png";
        //        }
        if (this.postData.TEXT) {
            this.titleText = this.postData.TEXT;
            this.titleText = this.titleText.replace(/<br>/g, "\n");
        }


        if (this.postData.TYPE == 7) {
            this.showCourse = true;
            if (this.postData['COURSE_DETAIL'] == undefined) {
                this.courseType = this.postData['COURSE_TYPE'];
                this.isAdmin = this.postData['IS_ADMIN'];
                var courseLevelId = this.postData['COURSE_LEVEL'];
                this.getCourseLevel(courseLevelId);
                if (this.postData['COURSE_TITLE'] != null) {
                    this.courseTitle = this.postData['COURSE_TITLE'];
                }
                this.validity = this.postData['RVALIDITY'];
                if (this.postData.PAGE_PROFILE_PHOTO_PATH) {
                    this.profile_pic_path = this.postData.PAGE_PROFILE_PHOTO_PATH;
                } else {
                    this.profile_pic_path = this._constantService.defaultPageIndImgPath;
                }

                this.courseRating = this.postData['COURSE_RATING'];
                //            this.getAllLanguage(this.postData['TYPE']);
                this.courseLanguage = this.postData['LANGUAGE'];
                if (this.postData['COST']) {
                    this.coursePrice = this.postData['COST'];
                }
                this.courseDiscountedPrice = this.postData['DISCOUNT_COST'];
                this.pageTitle = this.postData['PAGE_TITLE'];
                if (this.isAdmin == undefined) {
                    this.isAdmin = 2;
                }
                if (this.postData['IS_ENROLLED'] == "0") {
                    this.isEnrolled = false;
                } else {
                    this.isEnrolled = true;
                }
                if (this.postData['COURSE_POST_ID']) {
                    var id = this.postData['COURSE_POST_ID'];
                    id = id.split(':');
                    this.postData['USER_ID'] = id[0];
                    this.postData['USER_POST_ID'] = id[1];

                }
                this.totalRatings = this.postData['TOTAL_COURSE_RATING_COUNT'];
            } else {
                this.totalRatings = this.postData['COURSE_DETAIL']['TOTAL_COURSE_RATING_COUNT'];
                this.courseType = this.postData['COURSE_DETAIL']['COURSE_TYPE'];
                this.isAdmin = this.postData['IS_ADMIN'];
                var courseLevelId = this.postData['COURSE_DETAIL']['COURSE_LEVEL'];
                this.getCourseLevel(courseLevelId);
                if (this.postData['COURSE_DETAIL']['COURSE_TITLE'] != null) {
                    this.courseTitle = this.post_service.decodeURIPostData(this.postData['COURSE_DETAIL']['COURSE_TITLE']);
                }
                if (this.postData['COURSE_DETAIL']['RVALIDITY']) {
                    this.validity = this.postData['COURSE_DETAIL']['RVALIDITY'];
                } 
                
                if (this.postData['COURSE_DETAIL']['COURSE_POST_ID']) {
                    var id = this.postData['COURSE_DETAIL']['COURSE_POST_ID'];
                    id = id.split(':');
                    this.postData['USER_ID'] = id[0];
                    this.postData['USER_POST_ID'] = id[1];

                }

                if (this.postData.PAGE_PROFILE_PHOTO_PATH != null) {
                    this.profile_pic_path = this.postData.PAGE_PROFILE_PHOTO_PATH + 'profile/' + this.postData.PAGE_UUID + '_60x60.png';
                } else {
                    this.profile_pic_path = this._constantService.defaultPageIndImgPath;
                }
                this.courseRating = this.postData['COURSE_DETAIL']['COURSE_RATING'];
                this.getAllLanguage(this.postData['TYPE']);
                //                this.courseLanguage = this.postData['COURSE_DETAIL']['LANGUAGE'];
                if (this.postData['COURSE_DETAIL']['COURSE_TYPE'] == 1) {
                    if (this.postData['COURSE_DETAIL']['COURSE_PRICE'][0]['COST']) {
                        this.coursePrice = this.postData['COURSE_DETAIL']['COURSE_PRICE'][0]['COST'];
                    }
                    if (this.postData['COURSE_DETAIL']['COURSE_PRICE'][0]['DISCOUNT_COST']) {
                        this.courseDiscountedPrice = this.postData['COURSE_DETAIL']['COURSE_PRICE'][0]['DISCOUNT_COST'];
                    }
                } else {
                    this.showFree = true;
                    //this.courseDiscountedPrice = "Free";
                }

                this.pageTitle = this.postData['TITLE'];
                if (this.isAdmin == undefined || this.isAdmin == null || this.isAdmin == '') {
                    this.isAdmin = 2;
                }
                if (this.postData['COURSE_DETAIL']['IS_ENROLLED'] == "0") {
                    this.isEnrolled = false;
                } else {
                    this.isEnrolled = true;
                }

            }
        }
    }

    ngAfterViewInit() {
        if (this.postData.TYPE == 3) {
            if (this.postdata != "") {
                this.postdata = this.post_service.decodeURIPostData(this.postdata);
                this.postdata = this.post_service.getQuestionTextToSave("postdata");
            }
        }
        if (this.postData.TYPE == 4 && this.postData.SHARED_POST_DATA.TYPE == 3) {
            if (this.postdata != "") {
                this.postdata = this.post_service.decodeURIPostData(this.postdata);
                this.postdata = this.post_service.getQuestionTextToSave("postdata");
            }
        }
        // this.setCoursePostData();
    }

    getUserSavedFolder() {
        var savedFolder = {};
        savedFolder['token'] = this._constantService.getSessionDataBYKey('token');
        savedFolder['token_param'] = {};
        savedFolder['token_param']['device_type'] = 'w';
        savedFolder['token_param']['host'] = '';
        savedFolder['fldid'] = 0;
        savedFolder['count'] = 10;
        savedFolder['flow'] = 'a';

        this._constantService.fetchDataApi(this._constantService.getUserSavedFolderServiceUrl(), savedFolder).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token',responseData.TOKEN);
                this.savedFolder = responseData.SAVED_FOLDER;
                if (this.savedFolder.length != 0) {
                    this.saveddiv = 1;
                }
            } else if (status == this._constantService.error_token) {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session expired";
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
                this._router.navigate(['500']);
            }
        });
    }

    createSavedFolder() {

        if (this.folder_name == '') {
            this.loader = false;
            this.showText = true;
            this.dataConf['type'] = 2;
            this.dataConf['msg'] = "STUDY24X7";
            this.dataConf['error_msg'] = "Folder name should range between 1 to 50 characters";
            this.openConfirmation = true;

            return false;
        }
        this.loader = true;
        this.showText = false;
        var newSavedFolder = {};
        newSavedFolder['token'] = this._constantService.getSessionDataBYKey('token');
        newSavedFolder['token_param'] = {};
        newSavedFolder['token_param']['device_type'] = 'w';
        newSavedFolder['token_param']['host'] = '';
        newSavedFolder['ssfldnm'] = this.folder_name;
        if (this.folder_name.trim().length != 0 && this.folder_name.trim().length < 51) {
            newSavedFolder['ssfldnm'] = this.folder_name.trim();
        } else {
            this.loader = false;
            this.showText = true;
            this.dataConf['type'] = 2;
            this.dataConf['msg'] = "STUDY24X7";
            this.dataConf['error_msg'] = "Folder name should range between 1 to 50 characters";
            this.openConfirmation = true;
            return false;
        }
        newSavedFolder['sfid'] = 0;

        this._constantService.fetchDataApi(this._constantService.putUserSavedFolderServiceUrl(), newSavedFolder).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.loader = false;
                this.showText = true;
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token',responseData.TOKEN);
                var sfldIf = responseData.SAVED_FOLDER_ID;
                this.saveddiv = 1;
                this.folder_name = "";
                this.savePostTofolder(sfldIf);
            } else if (status == this._constantService.error_token) {
                this.loader = false;
                this.showText = true;
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "This session has expired";
                this.openConfirmation = true;
            } else {
                this.loader = false;
                this.showText = true;
                this.popup = true;
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
                return;
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    cancelSaved() {
        if (this.savedFolder.length == 0) {
            this.closePopup();
        } else {
            this.saveddiv = 1;
        }
    }

    savePostTofolder(folder_id) { 
        var postSaved = {};
        postSaved['token'] = this._constantService.getSessionDataBYKey('token');
        postSaved['token_param'] = {};
        postSaved['token_param']['device_type'] = 'w';
        postSaved['token_param']['host'] = '';
        postSaved['pid'] = this.postData.USER_POST_ID;
        postSaved['sfldid'] = folder_id;
        postSaved['pownid'] = this.postData.USER_ID;

        this._constantService.fetchDataApi(this._constantService.putPostToSavedFolder(), postSaved).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.close();
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token',responseData.TOKEN);
                this.closePopup();
                this.savedStatus.emit(true);
                this.folder_id.emit(folder_id);
                this._constantService.showToast("Saved successfully","Post","1");
            } else if (status == this._constantService.error_token) {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "This session has expired";
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
                this._router.navigate(['500']);
            }
        });
    }

    updateProfilePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }
    backsavedclick() {
        this.saveddiv = 1;
    }

//    calValidityPeriod(days) {
//        this.showUnlimited = false;
//        if (days < 30) {
//            this.showDays = true;
//            this.validity = days;
//        } else if (days == 30 || days == 31) {
//            this.showDays = false;
//            this.validity = 1;
//        } else if (days == "null") {
//            this.showUnlimited = true;
//        } else {
//            this.showDays = false;
//            var x = days / 30;
//            this.validity = Math.floor(x);
//        }
//    }

    getAllLanguage(postDataType) {
       
        this._constantService.fetchDataApiWithoutBody(this._constantService.getAllLanguageServiceUrl())
            .subscribe(data => {
                let responseData:any = data;
                if (responseData.success = this._constantService.success_msg) {
                    this.languageList = responseData.LNG_LIST;
                    if (this.postData['COURSE_DETAIL'] == undefined) {
                        if (postDataType == 4) {
                            if (this.postData['SHARED_POST_DATA']['COURSE_DETAIL']['LANGUAGE'] != null && this.postData['SHARED_POST_DATA']['COURSE_DETAIL']['LANGUAGE'] != undefined) {
                                for (var i = 0; i < this.languageList.length; i++) {
                                    if (this.postData['SHARED_POST_DATA']['COURSE_DETAIL']['LANGUAGE'] == this.languageList[i].LANGUAGE_ID) {
                                        this.courseLanguage = this.languageList[i].LANGUAGE;
                                    }
                                }
                            }
                        } else {
                            if (this.postData['LANGUAGE'] != null && this.postData['LANGUAGE'] != undefined) {
                                for (var i = 0; i < this.languageList.length; i++) {
                                    if (this.postData['LANGUAGE'] == this.languageList[i].LANGUAGE_ID) {
                                        this.courseLanguage = this.languageList[i].LANGUAGE;
                                    }
                                }
                            }
                        }
                    } else {
                        if (postDataType == 4) {
                            if (this.postData['COURSE_DETAIL']['SHARED_POST_DATA']['LANGUAGE'] != null && this.postData['COURSE_DETAIL']['SHARED_POST_DATA']['LANGUAGE'] != undefined) {
                                for (var i = 0; i < this.languageList.length; i++) {
                                    if (this.postData['COURSE_DETAIL']['SHARED_POST_DATA']['LANGUAGE'] == this.languageList[i].LANGUAGE_ID) {
                                        this.courseLanguage = this.languageList[i].LANGUAGE;
                                    }
                                }
                            }
                        } else {
                            if (this.postData['COURSE_DETAIL']['LANGUAGE'] != null && this.postData['COURSE_DETAIL']['LANGUAGE'] != undefined) {
                                for (var i = 0; i < this.languageList.length; i++) {
                                    if (this.postData['COURSE_DETAIL']['LANGUAGE'] == this.languageList[i].LANGUAGE_ID) {
                                        this.courseLanguage = this.languageList[i].LANGUAGE;
                                    }
                                }
                            }
                        }

                    }
                }
            });
    }

    getCourseLevel(courseLevelId) {
        if (courseLevelId == 1) {
            this.courseLevel = 'Beginner Level';
        } else if (courseLevelId == 2) {
            this.courseLevel = 'Intermediate Level';
        } else if (courseLevelId == 3) {
            this.courseLevel = 'Advance Level';
        } else if (courseLevelId == 4) {
            this.courseLevel = 'All Levels';
        }
    }
}
