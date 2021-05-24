import { Component, OnInit } from '@angular/core';
import { ConstantService } from './../../../services/constant.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
const daymilliseconds = 24 * 60 * 60 * 1000
const weekMilliseconds = 7 * daymilliseconds;
const monthMilliseconds = 30 * daymilliseconds;

@Component({
  selector: 'app-my-point',
  templateUrl: './my-point.component.html',
  styleUrls: ['./my-point.component.scss', './../point-system.component.scss']
})
export class MyPointComponent implements OnInit {
  filterTab = '';
  days: any;
  all: any;
  date: any;
  count: any;
  rcount: any;
  myPointsData: any = [];
  dataConf = {};
  config = {};
  overAllPoints: any;
  fromDate: string = '';
  yesterDayDate: string;
  todayDate: string;

  constructor(
    public _constantService: ConstantService,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.filteritems('today');
  }

  filteritems(tab) {
    this.all = 0;
    this.count = 1;
    this.filterTab = tab;
    this.date = 0;
    switch (tab) {
      case 'today':
        this.days = 0;
        break;
      case 'yesterday':
        this.days = 1;
        break;
      case 'lastWeek':
        this.days = 7;
        break;
      case 'lastMonth':
        this.days = 30;
        break;
    }
    this.getDataForMyPoints();

  }

  getDataForMyPoints() {
    const hitObj = {};
    hitObj['token'] = this._constantService.getSessionDataBYKey('token');
    hitObj['token_param'] = { "device_type": "w", "host": "" };
    hitObj['days'] = this.days;
    hitObj['all'] = this.all;
    hitObj['by_date'] = this.date;
    hitObj['count'] = this.count;
    hitObj['r_count'] = 50;

    this._constantService.fetchDataApi(this._constantService.getUserRewardDetails(), hitObj).subscribe(data => {
      const responseData:any = data;
      const status = responseData.STATUS;
      if (status == this._constantService.success_msg) {
        this.myPointsData = responseData.USER_POINT_HISTORY;
        this.overAllPoints = responseData.CURRENT_POINT;


      } else if (status == this._constantService.error_token) {
        this.dataConf['type'] = 4;
        this.dataConf['msg'] = "Session Expire";
        this.dataConf['error_msg'] = "Session Expired!";
        return false;
      } else {
        // this._router.navigate(['404']);
      }
    }), error => {
      var err = error;
      if (err.status == 500) {
        // this._router.navigate(['500']);
      }
    };
  }

}
