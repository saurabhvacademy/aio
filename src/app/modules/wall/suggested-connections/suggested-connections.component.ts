import { Component, HostListener, OnInit } from '@angular/core';
import { ConstantService } from 'src/app/services/constant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suggested-connections',
  templateUrl: './suggested-connections.component.html',
  styleUrls: ['./suggested-connections.component.scss']

})
export class SuggestedConnectionsComponent implements OnInit {
  t: string;
  suggestion_id = [];
  alertMsg = {};
  details: any;
  public people = [];
  alert: boolean;
  dataConf = {};
  suggestionPresent: boolean;



  constructor(
    public _constantService: ConstantService,
    private _router: Router,

  ) { }

  ngOnInit(): void {
    this.onResize(null);
    this.t = this._constantService.getSessionDataBYKey('token');
        if (this.t != null && this.t != undefined && this.t != "") {
            this.get10Suggestion();
        }
  }

  slideConfigSuggestedConnection = {
    slidesToShow: 3.5,
    slidesToScroll: 2,
    infinite: false
  };

  @HostListener('window:resize', ['$event'])


  onResize(event) {
    console.log(event);
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

  get10Suggestion() {
    var suggestionData = {};
    suggestionData['token'] = this._constantService.getSessionDataBYKey('token');
    suggestionData['token_param'] = {};
    suggestionData['token_param']['device_type'] = 'w';
    suggestionData['token_param']['host'] = '';

    this._constantService.fetchDataApi(this._constantService.get10UserSuggestionServiceUrl(), suggestionData).subscribe(data => {
        var responseData:any = data;
        var status = responseData.STATUS;
        if (status == this._constantService.success_msg) {
            this._constantService.setSessionJsonPair('token', responseData.TOKEN);
            this.suggestion_id = responseData.SUGG_ID;
            if (this.suggestion_id.length != 0) {

                this.get10SuggestionDetails(this.suggestion_id.join());
            }
        }
         else {
          this.dataConf['type'] = 2;
          this.dataConf['msg'] = "STUDY24X7";
          this.dataConf['error_msg'] = responseData.ERROR_MSG;
          this.alert = true;
        }

    }, error => {
        var responseData = error;
        if (responseData.status == 500) {
            this._router.navigate(['500']);
        }
    });
}

get10SuggestionDetails(ids) {
  var suggDetails = {};
  suggDetails['token'] = this._constantService.getSessionDataBYKey('token');
  suggDetails['token_param'] = {};
  suggDetails['token_param']['device_type'] = 'w';
  suggDetails['token_param']['host'] = '';
  suggDetails['fid'] = ids;

  this._constantService.fetchDataApi(this._constantService.getConnectionDetailsServiceUrl(), suggDetails).subscribe(data => {
      this.details = data["_body"];
      let responseData:any=data;
      var status = responseData.STATUS;
      if (status == this._constantService.success_msg) {
          this._constantService.setSessionJsonPair('token', responseData.TOKEN);
          this.people = responseData.FRIENDS_DETAIL.reverse();
          this.suggestionPresent = true;
          for (var i = 0; i < this.people.length; i++) {
              if (this.people[i].PROFILE_PHOTO_PATH != null) {
                  this.people[i].PROFILE_PHOTO_PATH = this.people[i].PROFILE_PHOTO_PATH + "profile/" + this.people[i].USER_ID + "_120x120.png?v=" + responseData.IMG_UPD_DT
              } else {
                  this.people[i].PROFILE_PHOTO_PATH = this._constantService.defaultImgPathForSuggestedConnections;
              }
              this.people[i].FULL_NAME = this.people[i].FIRST_NAME + " " + this.people[i].LAST_NAME;
              this.people[i]['connectStatus'] = false;
          }
      }

  }, error => {
      var responseData = error;
      if (responseData.status == 500) {
          this._router.navigate(['500']);
      }
  });
}
updateSourcePic(event) {
  event.target.src = this._constantService.defaultImgPath;
}

delSuggestion(id, i) {
  var delSuggestion = {};
  delSuggestion['token'] = this._constantService.getSessionDataBYKey('token');
  delSuggestion['token_param'] = {};
  delSuggestion['token_param']['device_type'] = "w";
  delSuggestion['token_param']['host'] = '';
  delSuggestion['suggid'] = id;

  this._constantService.fetchDataApi(this._constantService.getDelSuggestionServiceUrl(), delSuggestion).subscribe(data => {
      var responseData:any = data;
      var status = responseData.STATUS;
      if (status == 'success') {
          this._constantService.setSessionJsonPair('token', responseData.TOKEN);
          this.people.splice(i, 1);
          if (this.people.length == 0) {
              this.get10Suggestion();
          }
      }
      else {
        this.dataConf['type'] = 2;
        this.dataConf['msg'] = "STUDY24X7";
        this.dataConf['error_msg'] = responseData.ERROR_MSG;
        this.alert = true;
      }

  }, error => {
      var responseData = error;
      this.dataConf['type'] = 2;
        this.dataConf['msg'] = "STUDY24X7";
        this.dataConf['error_msg'] = "Network Problem";
        ;
        this.alert = true;
      if (responseData.status == 500) {
          this._router.navigate(['500']);
      }
  });
}

sendRequest(event, i) {
  var sendSuggestionRequest = {};
  sendSuggestionRequest['token'] = this._constantService.getSessionDataBYKey('token');
  sendSuggestionRequest['token_param'] = {};
  sendSuggestionRequest['token_param']['device_type'] = 'w';
  sendSuggestionRequest['token_param']['host'] = '';
  sendSuggestionRequest['conrecid'] = event.target.id;
  var id = "sugg_" + event.target.id;

  this._constantService.fetchDataApi(this._constantService.getSendConnectionRequestServiceUrl(), sendSuggestionRequest).subscribe(data => {
      var responseData:any = data;
      var status = responseData.STATUS;
      if (status == this._constantService.success_msg) {
          this.people[i]['connectStatus'] = true;
          this._constantService.setSessionJsonPair('token', responseData.TOKEN);
          if (this.people.length == 0) {
              this.get10Suggestion();
          }
      } else if (status == this._constantService.success_msg) {
      } else {
        this.dataConf['type'] = 2;
        this.dataConf['msg'] = "STUDY24X7";
        this.dataConf['error_msg'] = responseData.ERROR_MSG;
        this.alert = true;

      }
  }, error => {
      var responseData = error;
      if (responseData.status == 500) {
          this._router.navigate(['500']);
      }
  });
}
cancelFrndReq(i) {
  var cancelReq = {};
  cancelReq['token'] = this._constantService.getSessionDataBYKey('token');
  cancelReq['token_param'] = {};
  cancelReq['token_param']['device_type'] = 'w';
  cancelReq['token_param']['host'] = '';
  cancelReq['conrecid'] = this.people[i].USER_ID;

  this._constantService.fetchDataApi(this._constantService.getCancelFrndReqServiceUrl(), cancelReq).subscribe(data => {
      var responseData:any = data;
      var status = responseData.STATUS;
      if (status == this._constantService.success_msg) {
          this.people[i]['connectStatus'] = false;
      }
  })
}
closePopup(event) {
  if (event['error'] == false) {
      this.alert = false;
  }
}
}
