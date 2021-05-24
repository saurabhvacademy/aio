import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ConstantService} from './../../../services/constant.service';
import {EncryptionService} from './../../../services/encryption.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-page-report-popup',
    templateUrl: './page-report-popup.component.html',
    styleUrls: ['./page-report-popup.component.scss']
})
export class PageReportPopupComponent implements OnInit {
    myProfile: boolean = false;
    success: boolean = false;
    userId: any;
    hideoptioncontent: boolean = true;
    report_input_option: boolean = false;
    @Output() pageReportPopupClose = new EventEmitter<boolean>();
    constructor(public _constantService: ConstantService,
        private _encryptionService: EncryptionService,
        private _router: Router,
        ) {}

    ngOnInit() {
        
    }

    hide_option() {
        this.hideoptioncontent = !this.hideoptioncontent;
        this.report_input_option = !this.report_input_option;
    }
    closePopup() {
        this.pageReportPopupClose.emit(false);
    }

    getpageReport() {
        if ((<HTMLInputElement> document.getElementById("other1"))) {
            var text = (<HTMLInputElement> document.getElementById("other1")).value;
            var reptyp = 6;
        } else {
            text = '';
        }
        for (let i = 1; i <= 5; i++) {
            let id = "report" + i;
            if ((<HTMLInputElement> document.getElementById(id))) {
                if ((<HTMLInputElement> document.getElementById(id)).checked == true) {
                    reptyp = i;
                }
            }
        }
        var pageReport = {};
        pageReport['token'] = this._constantService.getSessionDataBYKey('token');
        pageReport['token_param'] = {};
        pageReport['token_param']['device_type'] = 'w';
        pageReport['token_param']['host'] = '';
        var uuid = JSON.parse(this._constantService.getSessionDataBYKey('page_details'));
        this.userId = uuid.PAGE_ID;
        pageReport['usr_id'] = this.userId;
        pageReport['reptyp'] = reptyp;
        pageReport['txt'] = text;
        pageReport['img_typ'] = 5;
        this._constantService.fetchDataApi(this._constantService.getpageReport(), pageReport).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.success = true;
                this.closePopup();
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });

    }


}
