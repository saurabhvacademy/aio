import {Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, HostListener} from '@angular/core';
import {Router} from '@angular/router';
import {ConstantService} from './../../services/constant.service';
import {EncryptionService} from './../../services/encryption.service';
import {PostdataService} from './../../services/postdata.service';

@Component({
    selector: 'app-createcourseandpagewidget',
    templateUrl: './createcourseandpagewidget.component.html',
    styleUrls: ['./createcourseandpagewidget.component.scss']
})
export class CreatecourseandpagewidgetComponent implements OnInit {
    createpagePopupShow : boolean = false;
    selectedPageIndex: any;
    pageDetails: {"PAGE_TITLE": any; "PAGE_NAME": any; "COURSE_COUNT": any; "FOLLOWER_COUNT": any; "PAGE_ID": any; "POST_ID": any; "PROFILE_PHOTO_PATH": any; "ACKNOWLEDGEMENT": any;};
    selectedPage: any = 'Select a Page';
    pageList = [];
    continueScroll: boolean = true;
    isPagePresent: boolean = true;
    paginationCount: any = 1;
    openConfirmation: boolean;
    dataConf: any;
    isShowList: boolean = false;
    config:any;
    constructor(
        public _constantService: ConstantService,
        private _encryptData: EncryptionService,
        private _postdataService: PostdataService,
        private _router: Router,
    ) {}


    ngOnInit() {
        this.getUsrPgFxn();
    }

    showDropDown() {
        this.isShowList = !this.isShowList;
    }

    getUsrPgFxn() {
        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";
        hitObj['count'] = this.paginationCount;

       

        this._constantService.fetchDataApi(this._constantService.getUsrPageListServiceUrl(),hitObj).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                var pgList = responseData.PAGE_LIST;
                if (pgList.length == 0) {
                    if (this.paginationCount == 1) {
                        this.isPagePresent = false;
                    } else {
                        this.continueScroll = false;
                    }
                } else {
                    for (var i = 0; i < pgList.length; i++) {
                        pgList[i].TITLE = this._postdataService.decodeURIPostData(pgList[i].TITLE);
                        pgList['IS_SELECTED'] = false;
                    }
                    this.pageList.push.apply(this.pageList, pgList);
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
    
    onScrollDown(){
        if (this.continueScroll){
            this.paginationCount++;
            this.getUsrPgFxn();
        }
    }

    pageSelectionFxn(index) {
        this.pageList[index].IS_SELECTED = true;
        this.selectedPageIndex = index;
        this.selectedPage = this.pageList[index].TITLE;
    }

    createCourseHandler() {
        if(this.selectedPageIndex || this.selectedPageIndex==0 ){
            this.pageDetails = {
                "PAGE_TITLE": this.pageList[this.selectedPageIndex].TITLE,
                "PAGE_NAME": '',
                "COURSE_COUNT": '',
                "FOLLOWER_COUNT": '',
                "PAGE_ID": this.pageList[this.selectedPageIndex].PAGE_UUID,
                "POST_ID": '',
                "PROFILE_PHOTO_PATH": this.pageList[this.selectedPageIndex].PROFILE_PHOTO_PATH,
                "ACKNOWLEDGEMENT": this.pageList[this.selectedPageIndex].ACKNOWLEDGMENT,
            }
            //this._constantService.setPageDetails(this.pageDetails);
            this._constantService.setSessionJsonPair('page_details', JSON.stringify(this.pageDetails));
            //this._constantService.setPageIdForCourse(this.pageList[this.selectedPageIndex].PAGE_UUID);
            this._constantService.setSessionJsonPair('page_id_course', this.pageList[this.selectedPageIndex].PAGE_UUID);
            //this._constantService.setPageTitle(this.pageList[this.selectedPageIndex].TITLE)
            this._constantService.setSessionJsonPair('page_title', this.pageList[this.selectedPageIndex].TITLE);
    
            this._router.navigate(['addcourse']);
        }else{
            this.selectedPageIndex=-1;
        }
       
    }

    createpageopenpopup() {
        this.createpagePopupShow = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }

    closeCreatePagePopup(event) {
        this.createpagePopupShow = event;
    }
}
