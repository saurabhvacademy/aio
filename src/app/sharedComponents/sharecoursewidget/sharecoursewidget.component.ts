import { Component, OnInit, Input } from '@angular/core';
import {ConstantService} from './../../services/constant.service';
@Component({
  selector: 'app-sharecoursewidget',
  templateUrl: './sharecoursewidget.component.html',
  styleUrls: ['./sharecoursewidget.component.scss']
})
export class SharecoursewidgetComponent implements OnInit {
  socialFbShareUrl;
  socialTeitterShareUrl;
  socialLinkedInShareUrl;
  socialGooglePlusUrl;
  socialMailUrl;
  postPublicShareLink;
  socialWhatsappLink;
  socialTelegramLink;
  addcourse:boolean = false;
  @Input() url;
  constructor(
      public _constantService: ConstantService,
  ) { }

  ngOnInit() {
    // this.postPublicShareLink= window.location.href;
    if(window.location.pathname.match('addcourse')){
      if(window.location.pathname.match('addcourse')[0] == 'addcourse'){
        this.addcourse = true;
      }else{
        this.addcourse= false;

      }

    }else{
      this.addcourse= false;
    }
    this.postPublicShareLink= window.location.hostname+"/course/"+this.url;

    this.socialGooglePlusUrl = "https://plus.google.com/share?url="+this.postPublicShareLink;
    this.socialMailUrl = "mailto:";
    this.socialFbShareUrl = "https://www.facebook.com/dialog/feed?app_id="+this._constantService.facebookAppId+"&link="+this.postPublicShareLink;
    this.socialTeitterShareUrl ="https://twitter.com/intent/tweet?text="+this.postPublicShareLink;
    this.socialLinkedInShareUrl = "https://www.linkedin.com/sharing/share-offsite/?url="+this.postPublicShareLink;
    this.socialWhatsappLink = "https://api.whatsapp.com/send?text="+"http://"+this.postPublicShareLink;
    this.socialTelegramLink ="https://telegram.me/share/url?url="+this.postPublicShareLink;
  }

}
