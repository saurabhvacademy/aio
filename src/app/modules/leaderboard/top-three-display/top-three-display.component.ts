import { Component, OnInit } from '@angular/core';
import { ConstantService } from 'src/app/services/constant.service';
import { CommonLeaderboardMethodsService } from '../common-leaderboard-methods.service';

@Component({
  selector: 'app-top-three-display',
  templateUrl: './top-three-display.component.html',
  styleUrls: ['./top-three-display.component.scss']
})
export class TopThreeDisplayComponent implements OnInit {
  top3Leaders: any = [{}, {}, {}];
  temp = '';
  spaceFound = false;
  constructor(
    private _constantService: ConstantService,
    private _commonMethodsService: CommonLeaderboardMethodsService

  ) { }

  ngOnInit() {
    this.fetchTop3leaders(0);
  }


  fetchTop3leaders(intrst_id) {
    var leaderBoardRequest: any = {};
    leaderBoardRequest.token = this._constantService.getSessionDataBYKey('token');
    leaderBoardRequest.token_param = { "device_type": "w", "host": "" };
    // leaderBoardRequest.intrst_ids = "1,2";
    // myPointsRequest.intrst_ids = this._constantService.getSessionDataBYKey("user_interest_id");
    leaderBoardRequest.r_count = 3;
    leaderBoardRequest.count = 1;
    leaderBoardRequest.last_usr_id = 0;
    if (intrst_id)
      leaderBoardRequest.intrst_id = intrst_id;


    this._constantService.fetchDataApi(this._constantService.getLeaderboard(), leaderBoardRequest).subscribe(data => {
      var responseData: any = data;
      if (responseData.STATUS == 'success') {
        if (responseData.LEADER_BOARD.length >= 3) {
          this.top3Leaders = responseData.LEADER_BOARD;
        }
        this.top3Leaders.forEach(element => {
          var name = element.USER_FULL_NAME.split(' ');
          if (name.length >= 2) {
            element.firstName = name[0][0].toUpperCase() + name[0].substring(1);
            element.secondName = name[1][0].toUpperCase() + name[1].substring(1);
          } else if (name.length == 1) {
            element.firstName = name[0][0].toUpperCase() + name[0].substring(1);
            element.secondName = " ";
          }
          if (element.PROFILE_PHOTO_PATH && element.PROFILE_PHOTO_PATH != null) {
            element.PROFILE_PHOTO_PATH = element.PROFILE_PHOTO_PATH + 'profile/' + element.USER_ID + '_60x60.png?v=' + element.UPDATE_DATE_TIME;
          } else {
            element.PROFILE_PHOTO_PATH = this._constantService.defaultImgPath;
          }

        });
      }else{
        
      }
    });
  }

}
