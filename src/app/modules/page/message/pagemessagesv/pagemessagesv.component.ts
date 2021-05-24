import { Component, OnInit } from '@angular/core';
import {ConstantService} from './../../../../services/constant.service';
import {PostdataService} from './../../../../services/postdata.service';

@Component({
  selector: 'app-pagemessagesv',
  templateUrl: './pagemessagesv.component.html',
  styleUrls: ['./pagemessagesv.component.scss']
})
export class PagemessagesvComponent implements OnInit {
  arr: any={};
  profile_pic;
  u_name;
  name;
  time;
  msg;
  sureToDelStatus:boolean=false;

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
      private postData:PostdataService
  ){
      if(this.arr!=null){
      
      }
  }

  ngOnInit(){
    console.log("username12345",this.arr);
    
      this.profile_pic = (this.arr['view']?this.arr['view']['PROFILE_PHOTO_PATH']:'');
      this.name = this.arr['view']['USER_FULL_NAME'];
      this.time = this.arr['view']['UPDATE_DATE_TIME'];
      this.u_name = this.arr['view']['USER_NAME'];
      this.msg = this.postData.decodeURIPostData(this.arr.view.MESSAGE).replace(/  /g," &#160;");
  }

  updateProfilePic(event){
      event.target.src = this._constantService.defaultImgPath;
  }

}
