import { Component, OnInit } from '@angular/core';
import { ConstantService } from './../../../services/constant.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-rank-statistics',
  templateUrl: './rank-statistics.component.html',
  styleUrls: ['./rank-statistics.component.scss','./../point-system.component.scss']
})
export class RankStatisticsComponent implements OnInit {
  dataConf = {};
  usetDtlsData: any = {};
  HIGHEST_RANK_INTEREST_NAME:any;
  HIGHEST_INTEREST_RANK:any;
  change: any;
  red: number;

  constructor(
    public _constantService: ConstantService,
    private _router: Router,


  ) { }

  ngOnInit() {
    this.getDataForRankStatics()

    
  }
  getDataForRankStatics(){
    const hitObj = {};
    hitObj['token'] = this._constantService.getSessionDataBYKey('token');
    hitObj['token_param'] = {};
    hitObj['token_param']['device_type'] = "w";
    hitObj['token_param']['host'] = "";
    this._constantService.fetchDataApi(this._constantService.getRankStatics(), hitObj).subscribe(data => {
      const responseData:any = data;
      const status = responseData.STATUS;
      if (status == this._constantService.success_msg) {
        this.usetDtlsData=responseData;
        this.change = responseData.OVERALL_RANK-responseData.PREVIOUS_OVERALL_RANK; 
      } else if (status == this._constantService.error_token) {
        this.dataConf['type'] = 4;
        this.dataConf['msg'] = "Session Expire";
        this.dataConf['error_msg'] = "Session Expired!";
        return false;
    } else {
        this._router.navigate(['404']);
    }
    }), error => {
      var err = error;
      if (err.status == 500) {
          this._router.navigate(['500']);
      }
  };
  }
  routerleaderboard(){
     this._router.navigate(['/leaderboard']); }
}
