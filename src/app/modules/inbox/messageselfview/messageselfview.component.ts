import {Component, OnInit} from '@angular/core';
import {ConstantService} from './../../../services/constant.service';
import {PostdataService} from './../../../services/postdata.service';

@Component({
  selector: 'app-messageselfview',
  templateUrl: './messageselfview.component.html',
  providers:[ConstantService],
   styleUrls: ['./messageselfview.component.scss','./../../../sharedComponents/peopleyouknow/peopleyouknow.component.scss']
})


export class MessageselfviewComponent implements OnInit {
    arr: any;
    profile_pic;
    u_name;
    name;
    time;
    msg;
    sureToDelStatus: boolean = false;

    delThisMsg() {
        this.sureToDelStatus = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }
    closeMe(event) {
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
        this.sureToDelStatus = event;
    }
    constructor(
        public _constantService: ConstantService,
        private postData: PostdataService
    ) {
        if (this.arr != null) {

        }
    }

    ngOnInit() {
        if (this.profile_pic = "./assets/images/svg-three/wall/help2.svg") {
            this.profile_pic = this._constantService.getSessionDataBYKey('p_pic');
        }
        else {
            this.profile_pic = this.arr['PROFILE_PHOTO_PATH'];
        }
        this.name = this.arr['USER_FULL_NAME'];
        this.time = this.arr['UPDATE_DATE_TIME'];
        this.u_name = this.arr['USER_NAME'];
        this.msg = this.postData.decodeURIPostData(this.arr['MESSAGE']).replace(/  /g, " &#160;");
        console.log( this.msg ," this.msg self");

    }

    updateProfilePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }
}
