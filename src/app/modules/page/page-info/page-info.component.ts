import { Input, Output, EventEmitter, Component, OnInit } from '@angular/core';
import { EncryptionService } from './../../../services/encryption.service';
import { ConstantService } from './../../../services/constant.service';
import { PostdataService } from 'src/app/services/postdata.service';
@Component({
    selector: 'app-page-info',
    templateUrl: './page-info.component.html',
    styleUrls: ['./page-info.component.scss', './newpage-info.component.scss']
})
export class PageInfoComponent implements OnInit {
    myprofile: any;

    updBtnEnable: boolean = false;
    inputboxDisabled: false;
    showEditBtn: boolean = false;
    @Input() profilePicPath: string;
    @Input() user_type: number;
    @Input() page_uuid: string;
    @Input() pg_name: string;
    @Input() pagenm: string;
    @Output() pg_nameSet = new EventEmitter;
    @Input() pageTitle: string;
    @Input() PageTitle: string;
    @Input() editPops: boolean;
    @Output() editPopsClose = new EventEmitter<boolean>();
    length = 0;
    post_data = '';
    writelmt: boolean = false;
    error = 0;
    generalpopup: boolean = false;
    emptymessage: boolean = true;
    @Input() pagedata: object;
    pageDetails: object = { 'title': '', 'address': '', 'pageDesc': '', 'email': '', 'website': '', 'pagename': '' };
    pageDetailsEdit: object = { 'title': '', 'address': '', 'pageDesc': '', 'email': '', 'website': '', 'pagename': '' };
    pageaboutedit: boolean = false;
    pagenameedit: boolean = false;
    pageName: string = '';
    lockPage: boolean = false;
    openConfirmation: boolean = false;
    dataConf = {};
    oldDetails = {};
    alertMsg: string = "";
    alert: number = 0;
    usrtyp: number = 0;
    pageinfo: boolean = false;
    interestpopup: boolean = false;
    locationpopup: boolean = false;
    showemptymessage: boolean = false;
    pagetitle: any;
    pageNameTextToCheck: string;

    general_popus() {
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");

        if (this.generalpopup) {
            this.editPopsClose.emit(false);
        }
        this.generalpopup = !this.generalpopup;
        this.lockPage = false;
        this.updBtnEnable = false;
        this.length = 0;
        this.error = 0;
    }

    constructor(
        private _encryptionService: EncryptionService,
        public _constantService: ConstantService,
        public postdata: PostdataService,
    ) { }

    ngOnInit() {
        if (this.pagedata['user_type']) {
            this.usrtyp = this.pagedata['user_type'];
        }

        if (!this.pg_name) {
            this.showEditBtn = true;
        } else {
            this.showEditBtn = false;
        }
        if (this.editPops == true) {
            this.generalpopup = true;
        }
    }

    ngDoCheck() {
        if (this.pagedata['user_type']) {
            if (this.pagedata['user_type'] != this.usrtyp) {
                this.usrtyp = this.pagedata['user_type'];
            }
        }

        if (!this.pg_name) {
            this.showEditBtn = true;
        } else {
            this.showEditBtn = false;
        }
    }

    check(event) {
        //        this.post_data = (<HTMLInputElement> document.getElementById('pagename')).value;
        //        console.log(document.getElementsByName("nameabc"));
        setTimeout(() => {
            this.post_data = event.target.value;
            this.length = this.post_data.length;
            if (this.length > 50) {
                this.writelmt = true;
                // this.check(event);
            }
        }, 500);
        //        console.log(event);
    }


    checkPageName() {
        this.post_data = (<HTMLInputElement>document.getElementById('pagename')).value;
        var checkPageName = {};
        checkPageName['token'] = this._constantService.getSessionDataBYKey('token');
        checkPageName['token_param'] = {};
        checkPageName['token_param']['device_type'] = 'w';
        checkPageName['token_param']['host'] = '';
        if(this.post_data==""){
           this.post_data=this.pageNameTextToCheck;
        }
        checkPageName['pg_unm'] = this.postdata.encodeURIPostData(this.post_data);

        this._constantService.fetchDataApi(this._constantService.getCheckPageNameServiceUrl(), checkPageName).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                this.updBtnEnable = true;
                if (responseData.ISEXIST == 0) {
                    this.lockPage = true;
                    this.error = 1;
                } else {
                    this.updBtnEnable = false;
                    this.dataConf['type'] = 2;
                    this.dataConf['msg'] = "STUDY24x7";
                    this.error = 2;
                    this.dataConf['error_msg'] = responseData.SUCCESS_MSG;
                    // this.openConfirmation = true;

                }
            } else if (status == 'error_token') {

            } else {
                this.updBtnEnable = false;
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24x7";
                this.error = 3;
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                // this.openConfirmation = true;
            }
        })
    }


    updatePageName() {
        let bodyy = document.getElementsByTagName('body')[0];
        bodyy.classList.remove("body-overflow");

        this.checkPageName();
        var checkPageName = {};
        checkPageName['token'] = this._constantService.getSessionDataBYKey('token');
        checkPageName['token_param'] = {};
        checkPageName['token_param']['device_type'] = 'w';
        checkPageName['token_param']['host'] = '';
        checkPageName['pg_uuid'] = this.page_uuid;
        checkPageName['pg_unm'] = this.post_data;

        this._constantService.fetchDataApi(this._constantService.getUpdatePageNameServiceUrl(), checkPageName).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                this.pageDetails = this.pageDetailsEdit;
                this.oldDetails['g'] = this.pageDetailsEdit['pagename'];
                this.pg_name = this.postdata.decodeURIPostData(this.post_data);
                this.pg_nameSet.emit(this.pg_name);
                this.pagenameedit = false;
                this.showEditBtn = false;
                this.general_popus();
            } else if (status == 'error_token') {
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24x7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }
        })
    }

    closePopup(event) {
        if (event['error'] == false) {
            this.openConfirmation = false;
        }
    }


}
