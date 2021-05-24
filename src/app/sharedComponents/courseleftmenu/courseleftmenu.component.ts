import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ConstantService} from 'src/app/services/constant.service';
import {PostdataService} from 'src/app/services/postdata.service';
import {EncryptionService} from 'src/app/services/encryption.service';
import {ActivatedRoute, Router, Params} from '@angular/router';

@Component({
    selector: 'app-courseleftmenu',
    templateUrl: './courseleftmenu.component.html',
    styleUrls: ['./courseleftmenu.component.scss', './../../modules/test/testpage/testpage.component.scss']
})
export class CourseleftmenuComponent implements OnInit {
    courseURL: string;
    startflow: boolean = true;
    oldId: string;
    config;
    @Output() closeMenu = new EventEmitter<any>();
    @Input() contentId: string;
    @Input() remain: number;
    courseUUID: any;
    openConfirmation: boolean;
    dataConf: {};
    sectionArr = [];
    isenrolled: boolean;
    isadmin: boolean;
    isEmbeddedActive: boolean = false;
    preLoaderLeftPannel: boolean = true;

    constructor(
        public postdata: PostdataService,
        public _constantService: ConstantService,
        public _encrypt: EncryptionService,
        public activatedRoute: ActivatedRoute,
        public router: Router,
        private _postData: PostdataService,
    ) {}

    ngOnInit() {
        this.getContentDetails();
       
    }

   

    getContentDetails() {
        var contentDetails = {};
        contentDetails['token'] = this._constantService.getSessionDataBYKey('token');
        contentDetails['token_param'] = {};
        contentDetails['token_param']['device_type'] = "w";
        contentDetails['token_param']['host'] = "";
        contentDetails['cntnt_uuid'] = this.contentId;

      

        this._constantService.fetchDataApi(this._constantService.getContentDetailsServiceUrl(),contentDetails).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.courseUUID = responseData.CONTENT_DETAILS.COURSE_UUID;
                this.courseURL = responseData.CONTENT_DETAILS.COURSE_URL;
                this.getViewContentStatus();

            }else if(status==this._constantService.error_token){
                this.router.navigate(['']);
            }
        });
    }

    stopPropogation(event) {
        console.log("ayush sahu");
        event.stopPropogation;
    }

    getViewContentStatus() {
        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";
        hitObj['cors_uuid'] = this.courseUUID;
        //        if (hitObj['cors_uuid'] == null || hitObj['cors_uuid'] == undefined || hitObj['cors_uuid'] == "undefined") {
        //            return;
        //        }
       
        this._constantService.fetchDataApi(this._constantService.getTestContentStatusServiceUrl(),hitObj).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            console.log(responseData);
            var testData = responseData.Test_Details;
            if (status == this._constantService.success_msg) {
                this.courseURL = responseData.COURSE_URL;
                this.preLoaderLeftPannel = false;
                this.startflow = true;
                if (responseData.IS_EMBEDDED == 1) {
                    this.isEmbeddedActive = true;
                } else {
                    this.isEmbeddedActive = false;
                }
                responseData.IS_ADMIN == 1 ? this.isadmin = true : this.isadmin = false;
                responseData.IS_ENROLLED == 1 ? this.isenrolled = true : this.isenrolled = false;
                if (responseData.CONTENT.length != 0) {
                    this.sectionArr = responseData.CONTENT;
                    this.sectionArr.forEach(section => {
                        section.SECTION_TITLE = this._postData.decodeURIPostData(section.SECTION_TITLE);
                        var secContent = section.SECTION_CONTENT_DATA;
                        if(section.SECTION_CONTENT_DATA){
                        secContent.forEach(content => {
                            content.TITLE = this._postData.decodeURIPostData(content.TITLE);

                            
                            if (content.CONTENT_TYPE == 7) {
                                console.log("qqqqqqqqqq",responseData)
                                content.DURATION = this.setliveStreaduration(content.DURATION);
                            }else{
                                if (content.DURATION > 60) {
                                    var timeInSeconds = content.DURATION;
                                    var timeInMinutes = Math.floor(timeInSeconds / 60);
                                    content.DURATION = timeInMinutes;
                                }
                            }
                        })
                    }


                        // secContent.forEach(content => {
                        //     content.TITLE = this._postData.decodeURIPostData(content.TITLE);

                        //     if (content.DURATION > 60) {
                        //         var timeInSeconds = content.DURATION;
                        //         var timeInMinutes = Math.floor(timeInSeconds / 60);
                        //         content.DURATION = timeInMinutes;
                        //     }
                        // })
                    });
                    // filter data waith type 6 and embeded false
                    // this.sectionArr.filter(data => data.CONTENT.foreach(data2 => data2.SECTION_CONTENT_DATA.foreach(data3 => data3.CONTENT_TYPE != 6 )))
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
                this.router.navigate(['500']);
            }
        };
    }

    setliveStreaduration(duration) {
        console.log("dddddddddddddddddd",duration);
        if (duration > 59) {
            let h = Math.floor(duration / 60);
            let min = duration % 60;
            return h + "h" + " " + min + "m";
        }
        else {
            return duration + " " + "m";
        }

    }

    goToCourseContent(content) {
        if (this.isadmin || this.isenrolled) {
            if (content.CONTENT_TYPE != 3) {
                this.router.navigate(['/viewer/' + content.CONTENT_UUID]);
            } else if (content.CONTENT_TYPE == 3) {
                if (this.isadmin) {
                    this.router.navigate(['/addquiz/' + content.CONTENT_UUID]);
                } else {
                    this.router.navigate(['/test/' + content.CONTENT_UUID]);
                }
            }
            // this.changeRoute(content);
            this.ngOnInit();

        } else if (content.VISIBILITY == 0) {
            if (content.CONTENT_TYPE != 3) {
                this.router.navigate(['/viewer/' + content.CONTENT_UUID]);
            } else if (content.CONTENT_TYPE == 3) {
                if (this.isadmin) {
                    this.router.navigate(['/addquiz/' + content.CONTENT_UUID]);
                } else {
                    this.router.navigate(['/test/' + content.CONTENT_UUID]);
                }
            }
            // this.changeRoute(content);
            this.ngOnInit();


        } else if (content.VISIBILITY == 1) {
            this.dataConf['type'] = 2;
            this.dataConf['msg'] = "Study24x7";
            this.dataConf['error_msg'] = "Please enroll to view this course";
            this.openConfirmation = true;
            return false;
        }
    }

    closePopup() {
        this.openConfirmation = false;
    }

    UpdateSeenContent(content) {
    
        this.contentId = content.CONTENT_UUID;
        if (this.isadmin) {
            this.goToCourseContent(content);
            return;

        }
        if (content.VISIBILITY == 0) {
            var Courseseen = {};
            Courseseen['token'] = this._constantService.getSessionDataBYKey('token');
            Courseseen['token_param'] = {};
            Courseseen['token_param']['device_type'] = 'w';
            Courseseen['token_param']['host'] = '';
            Courseseen['cors_uuid'] = this.courseUUID;
            Courseseen['cntnt_uuid'] = content.CONTENT_UUID;
            Courseseen['cntnt_typ'] = content.CONTENT_TYPE;
            Courseseen['remain'] = this.remain;
           
            this._constantService.fetchDataApi(this._constantService.getCourseSeentUpdateServiceUrl(),Courseseen).subscribe(data => {
                var responseData:any = data;
                var status = responseData.STATUS;
                if (status == 'success') {
                    this.goToCourseContent(content);
                }
            });
            // this.goToCourseContent(content);
        } else if (this.isenrolled) {
            if (content.SEEN == 1) {
                this.goToCourseContent(content);
            } else {
                var Courseseen = {};
                Courseseen['token'] = this._constantService.getSessionDataBYKey('token');
                Courseseen['token_param'] = {};
                Courseseen['token_param']['device_type'] = 'w';
                Courseseen['token_param']['host'] = '';
                Courseseen['cors_uuid'] = this.courseUUID;
                Courseseen['cntnt_uuid'] = content.CONTENT_UUID;
                Courseseen['remain'] = this.remain;
               

                this._constantService.fetchDataApi(this._constantService.getCourseSeentUpdateServiceUrl(),Courseseen).subscribe(data => {
                    var responseData:any = data;
                    var status = responseData.STATUS;
                    if (status == 'success') {
                        this.goToCourseContent(content);
                    }
                });
            }
        }
        else {
            this.dataConf['type'] = 2;
            this.dataConf['msg'] = "Study24x7";
            this.dataConf['error_msg'] = "Please enroll to view this course";
            this.openConfirmation = true;
            return false;
        }
    
}

    closeMenuEmit() {
        this.closeMenu.emit();
    }

    goBackToCourse() {
        if (this.isadmin) {
            this._constantService.setBackToCourse("3");
            this.router.navigate(['/addcourse/' + this.courseUUID]);
        } else {
            this.router.navigate(['/course/' + this.courseURL]);
        }
    }

    changeRoute(content) {
        this.activatedRoute.params.subscribe((params: Params) => {
            if (params['id'] != null) {
                if (this.oldId == '') {
                    this.oldId = params['id'];
                } else if (params['id'] != this.oldId) {
                    this.oldId = params['id'];
                    if (content.CONTENT_TYPE == 3) {
                        this.router.navigate(['/test/' + content.CONTENT_UUID]);
                    } else if (content.CONTENT_TYPE == 2) {
                        this.router.navigate(['/viewer/' + content.CONTENT_UUID]);
                    } else if (content.CONTENT_TYPE == 1) {
                        this.router.navigate(['/viewer/' + content.CONTENT_UUID]);
                    } else if (content.CONTENT_TYPE == 4) {
                        this.router.navigate(['/viewer/' + content.CONTENT_UUID]);
                    } else if (content.CONTENT_TYPE == 5) {
                        this.router.navigate(['/viewer/' + content.CONTENT_UUID]);
                    } else if (content.CONTENT_TYPE == 6) {
                        this.router.navigate(['/viewer/' + content.CONTENT_UUID]);
                    }

                    //                    window.location.reload();
                }
            }
        });
    }

}
