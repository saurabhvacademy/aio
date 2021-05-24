import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {ConstantService} from './../../../services/constant.service';
import {EncryptionService} from './../../../services/encryption.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-savepopupedit',
    templateUrl: './savepopupedit.component.html',
    styleUrls: ['./savepopupedit.component.scss','./newsavepopupedit.component.scss']
})
export class SavepopupeditComponent implements OnInit {
    @Output() editfolderpara = new EventEmitter<object>();
    @Input() folder_id: Object;
    editfolderhidevar = {};
    folder_name: string = "";
    constructor(
        public _constantService: ConstantService,
        private _encrypt: EncryptionService,
        private router: Router,
    ) {}

    ngOnInit() {
        this.folder_name = this.folder_id['name'];
    }
    editfolderhide() {
        this.editfolderhidevar['popupstatus'] = false;
        this.editfolderhidevar['editfolderstatus'] = false;
        this.editfolderpara.emit(this.editfolderhidevar);
    }

    editSavedFolder() {
        var editSavedFolder = {};
        editSavedFolder['token'] = this._constantService.getSessionDataBYKey('token');
        editSavedFolder['token_param'] = {};
        editSavedFolder['token_param']['device_type'] = 'w';
        editSavedFolder['token_param']['host'] = '';
        if (this.folder_name.trim().length != 0 && this.folder_name.trim().length < 41) {
            editSavedFolder['ssfldnm'] = this.folder_name.trim().toLowerCase();
        } else {
            alert("Invalid Folder Name");
            return false;
        }
        editSavedFolder['sfid'] = this.folder_id['id'];

        this._constantService.fetchDataApi(this._constantService.putUserSavedFolderServiceUrl(), editSavedFolder).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token',responseData.TOKEN);
                this.editfolderhidevar['popupstatus'] = false;
                this.editfolderhidevar['editfolderstatus'] = true;
                this.editfolderhidevar['fldname'] = this.folder_name;
                this.editfolderpara.emit(this.editfolderhidevar);
            } else if (status == "error_token") {
                this._constantService.clearUserInfo();
                this.router.navigate(['']);
                alert("This session has expired");
            } else {
                this.editfolderhide();
//                alert(responseData.ERROR_MSG);
            }
        });
    }
}
