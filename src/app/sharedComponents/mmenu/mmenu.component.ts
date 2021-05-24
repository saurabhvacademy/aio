import { Component, OnInit,  Output, EventEmitter, } from '@angular/core';
import {Router} from '@angular/router';
import {EncryptionService} from './../../services/encryption.service';
import {ConstantService} from './../../services/constant.service';
import { GoogleAnalyticsService } from 'src/app/services/google-analytics.service';
import { LogoutService } from 'src/app/services/logout.service';

@Component({
  selector: 'app-mmenu',
  templateUrl: './mmenu.component.html',
  styleUrls: [
    './mmenu.component.scss',
   // './slidemenu.css'
 ]
})
export class MmenuComponent implements OnInit {
    uname: any='';
    @Output() sessionLogout = new EventEmitter<boolean>();
    @Output() showPopup = new EventEmitter<boolean>();
    // @Output() hidePopup = new EventEmitter();
    dataConf = {};
    openConfirmation:boolean=false;
    connections: any='';
    followings: any='';
    followers: any='';
    fullName: any='';
    profilePicUrl: any='';
    u_id: any='';
  constructor(
    public _encryptionService: EncryptionService,
    public _constantService: ConstantService,
    public _router: Router,
    private googleAnalyticsService:GoogleAnalyticsService,
    private _logoutService: LogoutService

  ) { }

  ngOnInit() {
  this.uname = this._constantService.getSessionDataBYKey('username');
  this.connections=this._constantService.getSessionDataBYKey('connection');
  this.followings=this._constantService.getSessionDataBYKey('followings');
  this.followers=this._constantService.getSessionDataBYKey('followers');
  this.fullName = this._constantService.getSessionDataBYKey('full_name');
  this.u_id = this._constantService.getSessionDataBYKey("u_id");
  console.log(this.connections+' '+this.followers+' '+this.followings);
  this.profilePicUrl = this._constantService.getSessionDataBYKey("profile_pic_s3");
  if(this.profilePicUrl==''){
      this.profilePicUrl=this._constantService.defaultImgPath;
  }else {
      this.profilePicUrl=this.profilePicUrl+'profile/'+this.u_id+'_60x60.png';

  }

  }

  hideMmenu(){

    this._constantService.callMmmenu();
  }

  scrollToBottom(id){
      setTimeout(()=>{
      document.getElementById(id).scrollBy(0,1000);
      },400)
  }
  showPageCreatePopup() {
      this.showPopup.emit(true);
      console.log("show create popups");
  }

  logout() {
     localStorage.setItem('startTime', "");
      this._logoutService.userLogout();
  }
  articleFilter() {
    //      this._message.setWallFilter(1);
    this._router.navigate(['/home'], {queryParams: {filter: 'articles'}});
}
routeTo(url){
    this._router.navigate([url]);
}
routeToEducator(url){
    window.location.href=url;
    // window.location.reload();

}
redirectTo(index){
    if(index=='1'){
        window.open('/termandcondition');
    }
    if(index=='2'){
        window.open('/privacy');
    }
}
routTo(endpoint){
    var filter=0;
    if(endpoint=='/questionforyou'){
        this.googleAnalyticsService.eventEmitter(
            "web_Access",
            "web_Activity",
            "web_Questions",
            "web_Access",0
          );
          filter=2;

    }
    if(endpoint == 'interests'){
        this.googleAnalyticsService.eventEmitter(
            "web_Access",
            "web_Activity",
            "web_Interests",
            "web_Access",0
          );
          filter=1;

    }

    if(endpoint=='saved'){
        filter=3;
    }
    if(endpoint == 'interests'){
        filter=4
    }

    this._router.navigate(['home/'+ endpoint],{queryParams: {filter: filter}});
    // window.location.replace(endpoint);

}
}
