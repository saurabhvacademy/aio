import { Component, OnInit, Input, AfterViewInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { ConstantService } from 'src/app/services/constant.service';
import { PostdataService } from 'src/app/services/postdata.service';
import { EncryptionService } from 'src/app/services/encryption.service';
import { ActivatedRoute, Router, Params, RoutesRecognized } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { filter, pairwise } from 'rxjs/operators';


@Component({
    selector: 'app-pdf-reader',
    templateUrl: './pdf-reader.component.html',
    styleUrls: ['./pdf-reader.component.scss', './../test/testpage/testpage.component.scss']
})
export class PdfReaderComponent implements OnInit, AfterViewInit {
    totalRequests: any = -10;
    isResumeContent: boolean = false;
    remain: number = 0;
    oldId: string = '';
    activeDoCheck: boolean = false;
    code: any = "g//ncJEJsldTou1jHgAAAARBJREFUeNrs2EEKgCAQBVDLuv+V20dENbMY831wKz4Y/VHb/5RGQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0PzMWtyaGhoaGhoaGhoaGhoaGhoxtb0QGhoaGhoaGhoaGhoaGhoaMbRLEvv50VTQ9OTQ5OpyZ01GpM2g0bfmDQaL7S+ofFC6xv3ZpxJiywakzbvd9r3RWPS9I2+MWk0+kbf0Hih9Y17U0nTHibrDDQ0NDQ0NDQ0NDQ0NDQ0NTXbRSL/AK72o6GhoaGhoRlL8951vwsNDQ0NDQ1NDc0WyHtDTEhDQ0NDQ0NTS5MdGhoaGhoaGhoaGhoaGhoaGhoaGhoaGposzSHAAErMwwQ2HwRQAAAAAElFTkSuQmCC";
    pdfReader: boolean = true;
    zoomIn: boolean = false;
    totalPage: number = 0;
    upcomingStreams = {};
    pdfDefaultImage = "";
    pdfLoading = true;
    contentUUID: string = "";
    currentPage: number = 1;
    isFullScreen: boolean = false;
    popupToggle: boolean = true;
    courseUUID = "";
    config: any = {
        minScrollbarLength: 50,

    };
    ip;
    contentType;
    videoSource = "";
    sectionArr = [];
    dataConf = {};
    openConfirmation = false;
    isadmin: boolean = false;
    isenrolled: boolean = false;
    heading;
    Dimension;
    popupToggleMob: boolean = false;
    isLiveStream: boolean = false;
    preLoaderLeftPannel: boolean = false;
    LiveStreamData: any = {};
    livestreamStarted: number = 0;
    outerPDF: any;
    pdfImages: any = [];
    onPage: number = 1;
    pageNumber: number = 1;
    constructor(public postdata: PostdataService,
        public _constantService: ConstantService,
        public _encrypt: EncryptionService,
        public activatedRoute: ActivatedRoute,
        public _DomSanitizationService: DomSanitizer,
        public router: Router,
        private _postData: PostdataService,
        private changeDetector: ChangeDetectorRef
    ) { }



    ngOnInit() {
        this.totalRequests = -10;
        this.pdfImages = [];
        this.onPage = 0;
        this.checkScreenWidth();
        this.currentPage = 1;
        this.activatedRoute.params.subscribe((params: Params) => {
            if (params['uuid'] != null) {
                var id = params['uuid'];
                this.contentUUID = id;
                this.getContentDetails();
                this.activeDoCheck = true;
            }
        });

    }

    addToQue() {
        if (this.currentPage < this.totalPage) {
            this.totalRequests++;
            if (this.totalRequests <= 0)
                this.totalRequests = 1;
            if (this.totalRequests == 1)
                this.fetchNextPage();
        }

    }


    setPageNo() {
        var scrollTop = document.getElementById('outerPDF').scrollTop;
        if (document.getElementById('pdfImg0')) {
            var imageHeight = document.getElementById('pdfImg0').clientHeight;
            this.pageNumber = Math.floor(scrollTop / ((Number)(imageHeight) + 4)) + 1;
            document.getElementById('pagenumber').innerText = (this.pageNumber) + '';
        }
    }

    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        clearInterval(this.countDown);
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (window.innerWidth < 768) {
            this.popupToggleMob = true;
        } else {
            this.popupToggleMob = false;
        }
    }

    private checkScreenWidth() {
        if (window.innerWidth < 768) {
            this.popupToggleMob = true;
        } else {
            this.popupToggleMob = false;
        }
    }

    ngDoCheck() {
        if (this.activeDoCheck) {
            this.activatedRoute.params.subscribe((params: Params) => {
                if (params['uuid'] != null) {
                    if (this.oldId == '') {
                        this.oldId = params['uuid'];
                    } else if (params['uuid'] != this.oldId) {
                        this.oldId = params['uuid'];
                        this.totalRequests=-10;
                        this.currentPage=1;
                        this.ngOnInit();
                    }
                }
            });
        }
    }

    ngAfterViewInit() {
        this.outerPDF = document.getElementById("outerPDF");
        this.router.events
            .pipe(filter((e: any) => e instanceof RoutesRecognized),
                pairwise()
            ).subscribe((e: any) => {
                var previousUrl = e[0].urlAfterRedirects.split('/');
                if (previousUrl[1] == 'profile') {
                    this.isResumeContent = true;
                    this.popupToggle = true;
                }
            });
    }



    getContentDetails() {
        var contentDetails = {};
        contentDetails['token'] = this._constantService.getSessionDataBYKey('token');
        contentDetails['token_param'] = {};
        contentDetails['token_param']['device_type'] = "w";
        contentDetails['token_param']['host'] = "";
        contentDetails['cntnt_uuid'] = this.contentUUID;

        this._constantService.fetchDataApi(this._constantService.getContentDetailsServiceUrl(), contentDetails).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.heading = this.postdata.decodeURIPostData(responseData.CONTENT_DETAILS.TITLE);
                this.courseUUID = responseData.CONTENT_DETAILS.COURSE_UUID;
                this.contentType = responseData.CONTENT_DETAILS.CONTENT_TYPE;
                this.contentUUID = responseData.CONTENT_DETAILS.CONTENT_UUID;
                if (this.contentType == 6) {
                    this.pdfReader = false;
                    this.isLiveStream = false;
                }
                if (this.contentType == 7) {
                    this.pdfReader = false;
                    this.isLiveStream = true;
                }
                this.getTestContentStatus();

            }
        });
    }




    getTestContentStatus() {
        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";
        hitObj['cors_uuid'] = this.courseUUID;
        this._constantService.fetchDataApi(this._constantService.getTestContentStatusServiceUrl(), hitObj).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            var testData = responseData.Test_Details;
            if (status == this._constantService.success_msg) {
                if (responseData.CONTENT.length != 0) {
                    if (Object.keys(responseData.LAST_OPEN_CONTENT)) {
                        if (responseData.LAST_OPEN_CONTENT.CONTENT_TYPE == 2 && responseData.LAST_OPEN_CONTENT.REMAIN) {
                            // this.currentPage = responseData.LAST_OPEN_CONTENT.REMAIN;

                        }
                    } else {
                        this.currentPage = 1;
                    }

                    if (this.contentType == 2) {

                            //true preloader
                            this.preLoaderLeftPannel = true;
                            this.getPdfPage(this.currentPage, this.contentUUID);


                            this.pdfReader = true;


                    } else if (this.contentType == 6) {

                    } else if (this.contentType == 7) {
                        this.pdfReader = false;
                        this.getLiveStreamData(this.contentUUID);
                    } else {
                        this.pdfReader = false;
                        this.getVideoUrl(this.contentType, this.contentUUID);
                    }
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
                this.router.navigate(['500']);
            }
        };
    }




    goToCourseContent(CONTENT_TYPE, CONTENT_UUID, visiblity, title) {
        this.heading = this.postdata.decodeURIPostData(title);
        if (this.isadmin || this.isenrolled) {

            if (this.isResumeContent) {
                this.isResumeContent = false;
            } else {
                this.popupToggle = false;
            }

            this.contentUUID = CONTENT_UUID;
            if (CONTENT_TYPE == 1 || CONTENT_TYPE == 4 || CONTENT_TYPE == 5) {
                this.pdfReader = false;
                this.getVideoUrl(this.contentType, CONTENT_UUID);
            } else if (CONTENT_TYPE == 2) {
                this.pdfReader = true;
                this.getPdfPage(this.currentPage, CONTENT_UUID);
            } else if (CONTENT_TYPE == 3) {
                if (this.isadmin) {
                    this.router.navigate(['/addquiz/' + CONTENT_UUID]);
                } else {
                    this.router.navigate(['/test/' + CONTENT_UUID]);
                }
            } else if (CONTENT_TYPE == 6) {
                this.pdfReader = false;
                this.contentType = 6;
                // this.getLinkedBasedTest(this.contentType, CONTENT_UUID);
            }

        } else if (visiblity == 0) {
            // this.popupToggle = false;
            this.contentUUID = CONTENT_UUID;
            if (CONTENT_TYPE == 1 || CONTENT_TYPE == 4 || CONTENT_TYPE == 5) {
                this.pdfReader = false;
                this.getVideoUrl(this.contentType, CONTENT_UUID);
            } else if (CONTENT_TYPE == 2) {
                this.pdfReader = true;
                this.getPdfPage(this.currentPage, CONTENT_UUID);
            } else if (CONTENT_TYPE == 3) {
                if (this.isadmin) {
                    this.router.navigate(['/addquiz/' + CONTENT_UUID]);
                } else {
                    this.router.navigate(['/test/' + CONTENT_UUID]);
                }
            } else if (CONTENT_TYPE == 6) {
                this.pdfReader = false;
                this.contentType = 6;
                // this.getLinkedBasedTest(this.contentType, CONTENT_UUID);
            }
        } else if (visiblity == 1) {
            this.dataConf['type'] = 2;
            this.dataConf['msg'] = "Study24x7";
            this.dataConf['error_msg'] = "Please enroll to view this course";
            this.openConfirmation = true;
            return false;
        }
    }





    getPdfPage(pageCount, contentUUId) {
        if (this.totalRequests <= -1) {
            this.pdfImages = [];
            this.currentPage = 1;
            pageCount=1;
            this.onPage = 1;
            this.pageNumber = 1;
        }

        this.pdfReader = true;
        var pdfpage = {};
        pdfpage['token'] = this._constantService.getSessionDataBYKey('token');
        pdfpage['token_param'] = {};
        pdfpage['token_param']['device_type'] = 'w';
        pdfpage['token_param']['host'] = '';
        // pdfpage['cntnt_uuid'] = this.contentUUID;
        pdfpage['cntnt_uuid'] = contentUUId;
        pdfpage['pg_no'] = pageCount;
        var scrollY = window.scrollY;


        this._constantService.fetchDataApi(this._constantService.getpdfviewerServiceUrl(), pdfpage).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                //false preloader
                this.preLoaderLeftPannel = false;
                if (this.totalRequests <= -1)
                    this.pdfImages[0] = "data:image/jpg;base64," + responseData.FILE
                else
                    this.pdfImages.push("data:image/jpg;base64," + responseData.FILE);
                this.totalPage = responseData.PAGES;
                this.Dimension = responseData.DIMENSION.split("x");
                setTimeout(() => {
                    this.getDimension('pdfImg' + (this.pdfImages.length - 1));
                    if (this.totalRequests <= -1)
                        document.getElementById('outerPDF').scrollBy(0, 2);

                }, 100);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.totalRequests--;
                if (this.totalRequests > 0) {
                    this.fetchNextPage();
                }
                this.changeDetector.detectChanges();
            }
        });
    }


    pdfOriginalWidth;
    pdfOriginalHeight;
    pdfHeight;
    pdfWidth;

    getDimension(id) {
        this.pdfOriginalWidth = this.Dimension[0];
        this.pdfOriginalHeight = this.Dimension[1];
        this.pdfWidth = (this.pdfOriginalWidth / this.pdfOriginalHeight) * 1170;

        if (document.getElementById('outerPDF').offsetWidth < this.pdfWidth) {
            document.getElementById(id).style.width = "100%";
        } else {
            document.getElementById(id).style.width = this.pdfWidth + "px";
        }
    }



    closepdf() {
        this.pdfReader = false;
    }

    zoomPdf() {
        if (this.pdfWidth < 2400) {
            this.pdfWidth = this.pdfWidth + 100;
            for (var i = 0; i < this.pdfImages.length; i++) {
                document.getElementById('pdfImg' + i).style.width = this.pdfWidth + "px";
            }
        }
    }

    zoomoutPdf() {
        if (this.pdfWidth > 500) {
            this.pdfWidth = this.pdfWidth - 100;
            for (var i = 0; i < this.pdfImages.length; i++) {
                document.getElementById('pdfImg' + i).style.width = this.pdfWidth + "px";
            }
        }
    }

    fetchNextPage() {
        if (this.currentPage == this.totalPage) {

        } else {
            //true preloader
            this.preLoaderLeftPannel = true;
            this.currentPage++;
            this.remain = this.remain + 1;
            this.getPdfPage(this.currentPage, this.contentUUID);
            this.UpdateSeenContent(this.currentPage);
        }
    }

    nextPage() {
        if (!this.preLoaderLeftPannel) {
            this.onPage = this.pageNumber;

            if (this.onPage == (this.currentPage) && this.currentPage < this.totalPage) {
                this.addToQue();
                if (document.getElementById('pdfBottom' + (this.onPage - 1))) {
                    document.getElementById('pdfBottom' + (this.onPage - 1)).scrollIntoView();
                }
            } else
                if (this.onPage < this.totalPage) {
                    this.onPage++;
                    if (document.getElementById('pdfTop' + (this.onPage - 1)))
                        document.getElementById('pdfTop' + (this.onPage - 1)).scrollIntoView();
                }
            this.pageNumber = this.onPage;
            document.getElementById('outerPDF').scrollBy(0, 2);
            document.getElementById('pagenumber').innerText = this.pageNumber + '';
        }


    }

    previousPage() {
        this.onPage = this.pageNumber;

        if (this.onPage > 1 && document.getElementById('pdfTop' + (this.onPage - 2))) {
            document.getElementById('pdfTop' + (this.onPage - 2)).scrollIntoView();
            this.onPage--;
        }
        this.pageNumber = this.onPage;
        document.getElementById('pagenumber').innerText = this.pageNumber + '';
        document.getElementById('outerPDF').scrollBy(0, 2);



    }

    gotoPage() {
        var toPage = document.getElementById("pagenumber").innerText;
        var pageBottomDiv = document.getElementById("pdfTop" + (Number(toPage) - 1));
        if (pageBottomDiv) {
            pageBottomDiv.scrollIntoView();
        }
    }


    showMenu() {
        this.popupToggle = !this.popupToggle;
        // this.popupToggle = !this.popupToggle;
    }

    popupToggleOpen(event) {
        this.popupToggle = false;
    }

    // getIpAddress() {
    //    this.http.get('http://ipinfo.io').subscribe(data =>
    //          this.ip = data['ip']  )
    //          const match = navigator.userAgent;
    // }

    getVideoUrl(contentType, contentId) {
        this.pdfReader = false;

        // if(contentType == 4 || contentType == 5 ){
        var published = {};
        published['token'] = this._constantService.getSessionDataBYKey('token');
        published['token_param'] = {};
        published['token_param']['device_type'] = 'w';
        published['token_param']['host'] = '';
        published['cntnt_uuid'] = contentId;

        this._constantService.fetchDataApi(this._constantService.getVideoUrlServiceUrl(), published).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                if (responseData.CONTENT_TYPE == 4) {
                    var path = responseData.PATH.replace('https://youtu.be/', '');
                    path = path.replace('https://www.youtube.com/watch?v=', '');
                    path=path.replace('&t=','?t=');

                    this.videoSource = "https://www.youtube.com/embed/" + path;
                } else if (responseData.CONTENT_TYPE == 5) {
                    this.videoSource = "https://player.vimeo.com/video/" + responseData.PATH;
                }
                else if (responseData.CONTENT_TYPE == 1) {
                    var redirectionPath = this._constantService.videoServerURL;
                    var src = responseData.PATH + responseData.EXT_PATH;
                    var urls = redirectionPath + '?src=' + src;
                    this.videoSource = urls;


                }
            }
        });
    }

    getLinkedBasedTest(contentId) {
        this.pdfReader = false;
        this.contentType = 6;
        this.createlinkedbasedToken(contentId);


    }

    getLiveStreamData(contentId) {
        var liveStream = {};
        liveStream['token'] = this._constantService.getSessionDataBYKey('token');
        liveStream['token_param'] = {};
        liveStream['token_param']['device_type'] = 'w';
        liveStream['token_param']['host'] = '';
        liveStream['cntnt_uuid'] = contentId;
        this._constantService.fetchDataApi(this._constantService.getStreamDataServiceUrl(), liveStream).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;

            if (status == 'success') {
                this.LiveStreamData = responseData.STREAM_DATA;
                this.LiveStreamData['MENTOR_DATA'].FIRST_NAME = this.postdata.decodeURIPostData(this.LiveStreamData['MENTOR_DATA'].FIRST_NAME);
                this.LiveStreamData['MENTOR_DATA'].LAST_NAME = this.postdata.decodeURIPostData(this.LiveStreamData['MENTOR_DATA'].LAST_NAME);
                this.LiveStreamData.STREAM_DESCRIPTION = this.postdata.decodeURIPostData(this.LiveStreamData.STREAM_DESCRIPTION);
                this.LiveStreamData.LIVE_STREAM_TITLE = this.postdata.decodeURIPostData(this.LiveStreamData.LIVE_STREAM_TITLE);
                this.setCount(this.LiveStreamData.START_TIME, this.LiveStreamData.DURATION);
                if (this.LiveStreamData['MENTOR_DATA'].PROFILE_PHOTO_PATH) {
                    this.LiveStreamData['MENTOR_DATA'].PROFILE_PHOTO_PATH = this.LiveStreamData['MENTOR_DATA'].PROFILE_PHOTO_PATH + "profile/" + this.LiveStreamData['MENTOR_DATA'].USER_ID + "_60x60.png?v=" + this.LiveStreamData['MENTOR_DATA'].IMG_UPD_DT;
                }
                else {
                    this.LiveStreamData['MENTOR_DATA'].PROFILE_PHOTO_PATH = "./assets/images/defaultProfilePic.svg";
                }


            }
        });
    }

    // ==============================counter function start=====================================
    timer = [];
    countDown;
    XsetCount(duration, MaxTime) {
        let courseStartTime = new Date(duration);
        var countDownDate = new Date(courseStartTime).getTime();
        // Update the count down every 1 second
        this.countDown = setInterval(() => {
            // Get today's date and time
            var now = new Date().getTime();
            // Find the distance between now and the count down date
            var distance = countDownDate - now;
            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            // Output the result in an element with id="demo"

            if (this.LiveStreamData.START_TIME) {
                this.timer['day'] = days;
                this.timer['min'] = minutes;
                this.timer['hr'] = hours;
                this.timer['sec'] = seconds;


            }
            else {
                clearInterval(this.countDown);
            }
            // If the count down is over, write some text
            if (distance < 0) {
                this.timer['day'] = '00';
                this.timer['min'] = '00';
                this.timer['hr'] = '00';
                this.timer['sec'] = '00';
                clearInterval(this.countDown);
                this.livestreamStarted = 1;
                if (distance + MaxTime * 60 * 1000 < 0) {
                    this.livestreamStarted = 2;
                }
            }

        }, 1000);
    }
    // ==============================counter function end ======================================








    startStream(data) {

        this.router.navigate(['/livestream/' + data.CONTENT_UUID]);

    }



    fullScreenWidth() {
        // var element = document.getElementById("outerPDF");
        // window.scrollTo(0,30);
        document.getElementById('outerPDF').scrollBy(0, 2);

        this.isFullScreen = !this.isFullScreen;
        if (this.isFullScreen) {
            document.getElementById('closeMenuEmit').click();
        }
    }

    onrightClick() {

        return false;

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

    createlinkedbasedToken(CONTENT_UUID) {
        // getTokenforLinkedBasedDataServiceUrl
        var linkbasedToken = {};
        linkbasedToken['token'] = this._constantService.getSessionDataBYKey('token');
        linkbasedToken['token_param'] = {};
        linkbasedToken['token_param']['device_type'] = 'w';
        linkbasedToken['token_param']['host'] = '';
        linkbasedToken['cntnt_uuid'] = CONTENT_UUID;

        this._constantService.fetchDataApi(this._constantService.getTokenforLinkedBasedDataServiceUrl(), linkbasedToken).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.post(responseData.PATH, responseData.URL_TOKEN);
            }
        });
    }

    UpdateSeenContent(value) {
        var Courseseen = {};
        Courseseen['token'] = this._constantService.getSessionDataBYKey('token');
        Courseseen['token_param'] = {};
        Courseseen['token_param']['device_type'] = 'w';
        Courseseen['token_param']['host'] = '';
        Courseseen['cors_uuid'] = this.courseUUID;
        Courseseen['cntnt_uuid'] = this.contentUUID;
        Courseseen['remain'] = value;

        this._constantService.fetchDataApi(this._constantService.getCourseSeentUpdateServiceUrl(), Courseseen).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == 'success') {

            }
        });
    }


    setCount(duration, MaxTime) {
        var now = Date.now();
        var timeLeft = Math.floor(((parseInt(duration) - now) / (1000)));
        if (this.countDown) {
            clearInterval(this.countDown);
        }


        this.countDown = setInterval(() => {
            this.timer['day'] = Math.floor(timeLeft / (60 * 60 * 24));
            this.timer['hr'] = Math.floor((timeLeft % (60 * 60 * 24)) / (60 * 60)).toString();
            this.timer['min'] = Math.floor((timeLeft % (60 * 60)) / (60)).toString();
            this.timer['sec'] = Math.floor((timeLeft % (60))).toString();

            if (parseInt(this.timer['day']) < 10) {
                this.timer['day'] = '0' + this.timer['day'].toString();
            } else {
                this.timer['day'] = this.timer['day'].toString();
            }
            if (parseInt(this.timer['hr']) < 10) {
                this.timer['hr'] = '0' + this.timer['hr'].toString();
            } else {
                this.timer['hr'] = this.timer['hr'].toString();
            }
            if (parseInt(this.timer['min']) < 10) {
                this.timer['min'] = '0' + this.timer['min'].toString();
            } else {
                this.timer['min'] = this.timer['min'].toString();
            }
            if (parseInt(this.timer['sec']) < 10) {
                this.timer['sec'] = '0' + this.timer['sec'].toString();
            } else {
                this.timer['sec'] = this.timer['sec'].toString();
            }
            timeLeft--;
            if (timeLeft < 0) {
                clearInterval(this.countDown);
                this.timer['day'] = '00';
                this.timer['min'] = '00';
                this.timer['hr'] = '00';
                this.timer['sec'] = '00';
                this.livestreamStarted = 1;
                if (timeLeft + MaxTime * 60 < 0) {
                    this.livestreamStarted = 2;
                }
            }
        }, 1000);
    }

}
