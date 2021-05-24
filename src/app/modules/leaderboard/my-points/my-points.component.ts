import { Component, OnInit } from '@angular/core';
import { ConstantService } from 'src/app/services/constant.service';

@Component({
  selector: 'app-my-points',
  templateUrl: './my-points.component.html',
  styleUrls: ['../rank-listing/rank-listing.component.scss', './my-points.component.scss']
})
export class MyPointsComponent implements OnInit {
  usePointHistory:any=[];
  currentPoint: any;

  constructor(private _constantService:ConstantService) { }

  ngOnInit() {
    this.getRewardDetails();
    
  }

  getRewardDetails(){
    const rewardDetailsRequestData = {};
    rewardDetailsRequestData['token'] = this._constantService.getSessionDataBYKey('token');
    rewardDetailsRequestData['token_param'] = {"device_type":"w","host":""};
    rewardDetailsRequestData['days']=0;
    rewardDetailsRequestData['all']=1;
    rewardDetailsRequestData['by_date']=0;
    rewardDetailsRequestData['count']=1;
    rewardDetailsRequestData['r_count']=50;

    this._constantService.fetchDataApi(this._constantService.getUserRewardDetails(), rewardDetailsRequestData).subscribe(data => {
      const responseData:any = data;
      const status = responseData.STATUS;
      if (status == this._constantService.success_msg) {
        this.usePointHistory = responseData.USER_POINT_HISTORY;
        this.currentPoint = responseData.CURRENT_POINT;


      } else if (status == this._constantService.error_token) {
        
    } else {
        
    }
    }), error => {
      var err = error;
      if (err.status == 500) {
      }
  };
  }


}
