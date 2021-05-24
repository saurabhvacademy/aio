import { Component, OnInit } from '@angular/core';
import {ConstantService} from './../../../services/constant.service';
import {PostdataService} from './../../../services/postdata.service';


@Component({
  selector: 'app-messageotherview',
  templateUrl: './messageotherview.component.html',
   styleUrls: ['./messageotherview.component.scss','./../../../sharedComponents/peopleyouknow/peopleyouknow.component.scss']
})


export class MessageotherviewComponent implements OnInit {
    arr:any;
    profile_pic;
    u_name;
    name;
    time;
    msg;
    displayAssistant;
    sureToDelStatus:boolean=false;
  pageUuid: any;
  routing: string;
    delThisMsg(){
      this.sureToDelStatus = true;
      let body = document.getElementsByTagName('body')[0];
      body.classList.add("body-overflow");
    }
    closeMe(event){
      let body = document.getElementsByTagName('body')[0];
      body.classList.remove("body-overflow");
    this.sureToDelStatus = event;
    }
    constructor(
        public _constantService:ConstantService,
        private postData: PostdataService
    ){
        if(this.arr!=null){

        }
    }

    ngOnInit(){
      this.pageUuid=this.arr['PAGE_UUID'];
      this.u_name = this.arr['USER_NAME'];

      if(this.arr['PAGE_UUID']){
        this.routing = '/page/'+this.pageUuid;
      }else{
        this.routing = '/profile/'+ this.u_name;
      }
        this.displayAssistant = this.arr['USER_ID'];
        this.profile_pic = this.arr['PROFILE_PHOTO_PATH'];
        this.name = this.arr['USER_FULL_NAME'];
        this.time = this.arr['UPDATE_DATE_TIME'];
        this.msg = this.postData.decodeURIPostData(this.arr['MESSAGE']);
        console.log( this.msg ," this.msg ");
        
    }

    updateProfilePic(event){
        event.target.src = this._constantService.defaultImgPath;
    }
}
