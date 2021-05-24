import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {ConstantService} from './../../../services/constant.service';
import {EncryptionService} from './../../../services/encryption.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-savepopupdelete',
    templateUrl: './savepopupdelete.component.html',
    styleUrls: ['./savepopupdelete.component.scss']
})
export class SavepopupdeleteComponent implements OnInit {
    @Output() deletefolderpara = new EventEmitter<object>();
    @Input() folderId: number;
    deletefolderhidevar = {};
    data = "Are you sure you want to delete this collection?";
    constructor(
        public _constantService: ConstantService,
        private _encrypt: EncryptionService,
        private router: Router,
    ) {}

    ngOnInit() {
    }
    deletefolderhide() {
        this.deletefolderhidevar['popupstatus'] = false;
        this.deletefolderhidevar['folderDelStatus'] = false;
        this.deletefolderpara.emit(this.deletefolderhidevar);
    }

    deleteSavedFolder() {
        var deleteSavedFolder = {};
        deleteSavedFolder['token'] = this._constantService.getSessionDataBYKey('token');
        deleteSavedFolder['token_param'] = {};
        deleteSavedFolder['token_param']['device_type'] = 'w';
        deleteSavedFolder['token_param']['host'] = '';
        deleteSavedFolder['sfldid'] = this.folderId;


        this._constantService.fetchDataApi(this._constantService.getDeleteSavedFolderServiceUrl(), deleteSavedFolder).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                this.deletefolderhidevar['popupstatus'] = false;
                this.deletefolderhidevar['folderDelStatus'] = true;
                this.deletefolderhidevar['fldid'] = this.folderId;
                this.deletefolderpara.emit(this.deletefolderhidevar);
            } else if (status == 'error_token') {
                this._constantService.clearUserInfo();
                this.router.navigate(['']);
                alert("This session has expired");
            } else {
                this.data = responseData.ERROR_MSG;
            }
        })
    }
}
