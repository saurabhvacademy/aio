import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EncryptionService} from './../../services/encryption.service';
import {ConstantService} from './../../services/constant.service';
// import { UserInfo } from './../login/userInfo';
@Component({
    selector: 'app-registerinvite',
    templateUrl: './registerinvite.component.html',
    providers: [ConstantService, EncryptionService],
    styleUrls: ['./registerinvite.component.scss']
})
export class RegisterinviteComponent implements OnInit {

    constructor() {}

    ngOnInit() {
    }
    popupOverflowStatus(event) {
        if (event == true) {
            let body = document.getElementsByTagName('body')[0];
            body.classList.add("body-overflow");
        }
        else {
            let body = document.getElementsByTagName('body')[0];
            body.classList.remove("body-overflow");
        }
    }
    //
    // overFlowStatus(status){
    //   if(status==true){
    //   let body = document.getElementsByTagName('body')[0];
    //   body.classList.add("body-overflow");
    //   }
    //   else{
    //   let body = document.getElementsByTagName('body')[0];
    //   body.classList.remove("body-overflow");
    //   }
    // }








}
