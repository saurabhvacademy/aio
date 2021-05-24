import { Component, OnInit } from '@angular/core';
import { ConstantService } from 'src/app/services/constant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-visitors-widget',
  templateUrl: './profile-visitors-widget.component.html',
  styleUrls: ['./../profile-visitors-page/profile-visitors-page.component.scss', './profile-visitors-widget.component.scss']
})
export class ProfileVisitorsWidgetComponent implements OnInit {

  recentVisitorsData: { PERCENT_SIGN: string, LABEL: string; LAST_WEEK_VISITORS_COUNT: string; RECENT_VISITORS_COUNT: string; VISITORS: any[]; }
    = {
      PERCENT_SIGN: '',
      LABEL: '',
      LAST_WEEK_VISITORS_COUNT: '',
      RECENT_VISITORS_COUNT: '',
      VISITORS: []
    };
  similarInterestVisitorsData: { LABEL: string; VISITORS: any[]; } = { LABEL: '', VISITORS: [] };
  lpvwId: any = 0;
  showDataList: boolean = false;
  dataConf = {};
  headerLabel: any = '';
  constructor(
    private _constantService: ConstantService,
    public _router: Router

  ) { }

  ngOnInit(): void {
    this.recentVisitorsData.VISITORS = [];
    this.similarInterestVisitorsData.VISITORS = [];
    this.getVisitors();
  }

  getVisitors() {
    var params = {
      "token": this._constantService.getSessionDataBYKey('token'),
      "token_param": { "device_type": "w", "host": "" },
      "lpvw_id": this.lpvwId,
      "count": "10",
      "flow": "d"
    }
    this._constantService.fetchDataApi(this._constantService.getVisitorsListApiUrl(), params).subscribe(data => {
      var response: any = data;
      var status = response.STATUS;
      if (status == this._constantService.success_msg) {
        this.headerLabel = response.HEADER_LABEL;

        this.recentVisitorsData = response.RECENT_VISITORS;
        this.similarInterestVisitorsData = response.SIMILAR_INTEREST_VISITORS;
        this.recentVisitorsData.VISITORS.splice(response.RECENT_VISITORS.RECENT_VISITORS_COUNT<4?response.RECENT_VISITORS.RECENT_VISITORS_COUNT:3);
        // this.similarInterestVisitorsData.VISITORS.splice(1);
      } else {
        this.dataConf['type'] = 2;
        this.dataConf['msg'] = "STUDY24X7";
        this.dataConf['error_msg'] = response.ERROR_MSG;
      }
    }, error => {
      var response = error;
      if (response.status == 500) {
        this._router.navigate(['500']);
      }
    });
  }
  sendToInbox(visitor) {
    this._constantService.setSessionJsonPair('user_name', visitor.FULL_NAME);
    this._constantService.setSessionJsonPair('friend_user_id', visitor.USER_ID);
    this._router.navigate(['/inbox/' + visitor.USER_NAME]);
    this._constantService.setSessionJsonPair('fom_res', 1);
  }
  updateRecentVisitorProfilePic(i) {
    this.recentVisitorsData.VISITORS[i].img = false;

  }
  updateSimilarInterestVisitorProfilePic(event) {
    event.target.src = this._constantService.defaultImgPathForSuggestedConnections;

  }
  showVisitorData() {
    if (this.showDataList == false) {
      this.showDataList = true;
    } else {
      this.showDataList = false
    }
  }
}
