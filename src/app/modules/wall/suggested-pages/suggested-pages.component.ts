import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { ConstantService } from 'src/app/services/constant.service';
import { Router } from '@angular/router';
import { PostdataService } from 'src/app/services/postdata.service';

@Component({
  selector: 'app-suggested-pages',
  templateUrl: './suggested-pages.component.html',
  styleUrls: ['../suggested-connections/suggested-connections.component.scss', './suggested-pages.component.scss'],
})
export class SuggestedPagesComponent implements OnInit {
  [x: string]: any;
  t: string;
  suggestion_id = [];
  alertMsg = {};
  details: any;
  public people = [];
  alert: boolean;
  dataConf = {};
  suggestionPresent: boolean;
  pageSugg:any = [];
  username: any;
  datatext: boolean = false;
  slideConfigSuggestedConnection = {
    slidesToShow: 3.5,
    slidesToScroll: 2,
    infinite: false
  };



  constructor(
    public _constantService: ConstantService,
    private _router: Router,
    private postData: PostdataService,
    private _changeDetector:ChangeDetectorRef



  ) { }

  ngOnInit(): void {
    this.onResize(null);
    this.t = this._constantService.getSessionDataBYKey('token');
        if (this.t != null && this.t != undefined && this.t != "") {
        this.getPageSuggestion();
        }
        this.username = this._constantService.getSessionDataBYKey('username');

  }

  @HostListener('window:resize', ['$event'])


  onResize(event) {
    if(window.innerWidth<=540 && window.innerWidth>=480){
    this.slideConfigSuggestedConnection = {
      slidesToShow: 2.9,
      slidesToScroll: 2,
      infinite: false
    }
  };
    if(window.innerWidth<480 && window.innerWidth>=420){
    this.slideConfigSuggestedConnection = {
      slidesToShow: 2.5,
      slidesToScroll: 2,
      infinite: false
    }
  };
    if(window.innerWidth<420 && window.innerWidth>=360){
    this.slideConfigSuggestedConnection = {
      slidesToShow: 2.2,
      slidesToScroll: 2,
      infinite: false
    }
  };

    if(window.innerWidth<360)
    this.slideConfigSuggestedConnection = {
      slidesToShow: 1.9,
      slidesToScroll: 1,
      infinite: false
    };

  }







  slickInit(e) {
    console.log(new Date().getMilliseconds() + "slickkkkk")
    console.log("slick initialized");

  }

  breakpoint(e) {
    console.log("breakpoint");
  }

  afterChange(e) {
    console.log("afterChange");
  }

  beforeChange(e) {
    console.log("beforeChange");
  }


closePopup(event) {
  if (event['error'] == false) {
      this.alert = false;
  }
}

getPageSuggestion() {
  var pageSugg = {};
  pageSugg['token'] = this._constantService.getSessionDataBYKey('token');
  pageSugg['token_param'] = {};
  pageSugg['token_param']['device_type'] = 'w';
  pageSugg['token_param']['host'] = '';
  pageSugg['user_interest'] = this._constantService.getSessionDataBYKey('user_interest_id');



  this._constantService.fetchDataApi(this._constantService.getPageSuggestionServiceUrl(),pageSugg).subscribe(data => {
      var responseData:any = data;
      var status = responseData.STATUS;
      if (status == this._constantService.success_msg) {
          this._constantService.setSessionJsonPair('token',responseData.TOKEN);
          this.pageSugg = responseData.PAGE_SUGG;
          // this.suggestionPresent=true;
          for (var i = 0; i < this.pageSugg.length; i++) {
              this.pageSugg[i].TITLE = this.postData.decodeURIPostData(this.pageSugg[i].TITLE);
              if (this.pageSugg[i].PROFILE_PHOTO_PATH != null) {
                  this.pageSugg[i].PROFILE_PHOTO_PATH = this.pageSugg[i].PROFILE_PHOTO_PATH + "profile/" + this.pageSugg[i].PAGE_UUID + "_120x120.png?v=" + responseData.IMG_UPD_DT
              } else {
                  if (this.pageSugg[i].TYPE == 0) {
                      this.pageSugg[i].PROFILE_PHOTO_PATH = this._constantService.defaultPageIndImgPath;
                  } else {
                      this.pageSugg[i].PROFILE_PHOTO_PATH = this._constantService.defaultPageCollgImgPath;
                  }
              }
              if (this.pageSugg[i].PAGE_NAME != null) {
                  this.pageSugg[i].ID = this.pageSugg[i].PAGE_NAME;
              } else {
                  this.pageSugg[i].ID = this.pageSugg[i].PAGE_UUID;
              }
              this.pageSugg[i]['followStatus'] = false;
          }
          if(this.pageSugg.length>0){
          this.pageSugg.push({})}

      }
  })
}
pageFollowUnFollow(id, ind) {
  var followUnfollow = {};
  followUnfollow['token'] = this._constantService.getSessionDataBYKey('token');
  followUnfollow['token_param'] = {};
  followUnfollow['token_param']['device_type'] = 'w';
  followUnfollow['token_param']['host'] = '';
  followUnfollow['pg_uuid'] = id;
  followUnfollow['followed']=false;


  this._constantService.fetchDataApi(this._constantService.getPageFollowServiceUrl(),followUnfollow).subscribe(data => {
      var responseData:any = data;
      var status = responseData.STATUS;
      if (status == 'success') {
               this.pageSugg[ind]['followStatus'] = true;
               setTimeout(() => {
                  this.pageSugg.splice(ind, 1);
               }, 3000);
          }

  })
}
delSuggestion(i) {

          this.pageSugg.splice(i, 1);
}
hidePageCreatePopup(event) {
  this.datatext = event;
}

createnewpage() {
  this.datatext = !this.datatext;
  let body = document.getElementsByTagName('body')[0];
  body.classList.add("body-overflow");
}
}
