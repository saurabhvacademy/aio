import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ConstantService } from './../../services/constant.service';
import { EncryptionService } from './../../services/encryption.service';
import { Router } from '@angular/router';
import { InternalMessageService } from './../../services/internal-message.service';


@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss', './newreports.component.scss']
})
export class ReportsComponent implements OnInit {
    dataConf = {};
    openConfirmation: boolean = false;

    reportsucess = false;
    reportlist = true;
    report_input_option: boolean = false;
    @Output() closeReportPopup = new EventEmitter<boolean>()
    @Input() postId: string;
    @Input() postTyp: string;
    reportText = "";
    hideoptioncontent: boolean = true;
    hide_option() {
        this.hideoptioncontent = !this.hideoptioncontent;
        this.report_input_option = !this.report_input_option;
    }


    constructor(
        public _constantService: ConstantService,
        private _encrypt: EncryptionService,
        private _router: Router,
        private _message: InternalMessageService
    ) { }



    ngOnInit() {

    }

    reportsucessshow() {
        this.reportlist = false;
        this.reportsucess = true;
    }

    reportpopuphide() {
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
        this.closeReportPopup.emit(this.reportsucess);
    }

    otherReport(event) {
        if (event.target.value == '6') {
            this.report_input_option = true;
        } else {
            this.report_input_option = false;
            this.reportText = "";
        }
    }

    reportPost() {
        var report = {};
        report['token'] = this._constantService.getSessionDataBYKey('token');
        report['token_param'] = {};
        report['token_param']['device_type'] = 'w';
        report['token_param']['host'] = '';
        report['pid'] = this.postId;
        if (this.postTyp) {
            report['post_typ'] = this.postTyp;
        }
        var reportId = (<HTMLInputElement>document.querySelector('input[name="radioreport"]:checked'));
        if (reportId != null) {
            if (reportId.value == '6' && this.reportText.trim() == "") {
                alert("Please Enter Reason for report");
                return false;
            } else {
                report['reptyp'] = reportId.value;
                report['txt'] = this.reportText.trim();
            }
        } else {
            alert("Please select Report Option");
            return false;
        }

        this._constantService.fetchDataApi(this._constantService.getReportPostServiceUrl(), report).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this._constantService.showToast("Reported successfully", "", "1");
                // this.closeReportPopup.emit(true);

                if (responseData['IS_ANSWERED'] == 0) {
                    this._message.setCommand(1, 'notAnswered');
                } else {
                    this._message.setCommand(1, 'answered');
                }

                this._constantService.callEmptyStateMethod();
                if (this._router.url.split('/')[1] == 'post') {
                    this._router.navigate(['home']);
                }
                this.reportpopuphide();

            } else if (status == this._constantService.error_token) {
                this._constantService.clearUserInfo();
                this._router.navigate(['']);
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
}
