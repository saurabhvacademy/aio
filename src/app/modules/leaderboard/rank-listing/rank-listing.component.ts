import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ConstantService } from 'src/app/services/constant.service';
import { CommonLeaderboardMethodsService } from '../common-leaderboard-methods.service';
import { LocalDataService } from 'src/app/services/local-data.service';

@Component({
  selector: 'app-rank-listing',
  templateUrl: './rank-listing.component.html',
  styleUrls: ['./rank-listing.component.scss']
})
export class RankListingComponent implements OnInit {
  @Output() topThreeFilter = new EventEmitter<any>();

  disableOnScrollDown = false;
  allLeaders: any = [];
  count: any = 1;
  lastUsrId: any = 0;
  filterInterestId: any = 0;
  config: any = {
    minScrollbarLength: 50,

  };
  userDetails: any = {};

  constructor(
    private _constantService: ConstantService,
    public _localDataService: LocalDataService,
    public _commonMethodsService: CommonLeaderboardMethodsService
  ) { }




  ngOnInit() {
    this.fetchUsersWithPoints();
    this.fetchUserDetails();

  }
  fetchUserDetails() {
    var userDetailsRequest: any = {};
    userDetailsRequest.token = this._constantService.getSessionDataBYKey('token');
    userDetailsRequest.token_param = { "device_type": "w", "host": "" };
    if (this.filterInterestId != 0) {
      userDetailsRequest.intrst_id = this.filterInterestId;
    }
    this._constantService.fetchDataApi(this._constantService.getUserDetailsForLeaderBoard(), userDetailsRequest).subscribe(response => {
      var responseData: any = response;
      this.userDetails = responseData.USER_DETAIL;
      this.userDetails.OVERALL_RANK = parseInt(this.userDetails.OVERALL_RANK);
      this.userDetails.SELECTED_INTRST_RANK = parseInt(this.userDetails.SELECTED_INTRST_RANK);
      this.userDetails.PROFILE_PHOTO_PATH = this._localDataService.getProfilePicUrl();
      if(!this.userDetails.PROFILE_PHOTO_PATH){
      this.userDetails.PROFILE_PHOTO_PATH = this._constantService.defaultImgPathForSuggestedConnections;

      }
    })

  }

  fetchUsersWithPoints() {
    var leaderBoardRequest: any = {};
    leaderBoardRequest.token = this._constantService.getSessionDataBYKey('token');
    leaderBoardRequest.token_param = { "device_type": "w", "host": "" };
    if (this.filterInterestId != 0)
      leaderBoardRequest.intrst_id = this.filterInterestId;
    // myPointsRequest.intrst_ids = this._constantService.getSessionDataBYKey("user_interest_id");
    leaderBoardRequest.r_count = 50;
    leaderBoardRequest.count = this.count;
    leaderBoardRequest.last_usr_id = this.lastUsrId;
    this._constantService.fetchDataApi(this._constantService.getLeaderboard(), leaderBoardRequest).subscribe(data => {
      var responseData: any = data;
      var status = responseData.STATUS;
      if (status == this._constantService.success_msg) {
        if (responseData.LEADER_BOARD.leangth == 0) {
          this.disableOnScrollDown = true;
        }

        responseData.LEADER_BOARD.forEach(element => {
          if (element.PROFILE_PHOTO_PATH && element.PROFILE_PHOTO_PATH != null) {
            element.PROFILE_PHOTO_PATH = element.PROFILE_PHOTO_PATH + 'profile/' + element.USER_ID + '_60x60.png?v=' + element.UPDATE_DATE_TIME;
          } else {
            element.PROFILE_PHOTO_PATH = this._constantService.defaultImgPath;
          }
        });
        this.allLeaders = this.allLeaders.concat(responseData.LEADER_BOARD);
        if (this.lastUsrId == 0) {
          setTimeout(() => {
            document.getElementById('rankListing').scrollBy(0, 2);
          }, 200);
        }
        this.lastUsrId = responseData.LAST_USR_ID;
      } else if (status == this._constantService.error_token) {

      }
    }, error => {
      var responseData = error;
      if (responseData.status == 500) {
        window.location.replace('500');
      }
    });
  }

  onScrollDownQues() {
    // if (!this.disableOnScrollDown) {
    //   this.count++;
    //   if (this.count == 2) {
    //     this.disableOnScrollDown = true;
    //   }
    //   this.fetchUsersWithPoints();
    //
    // }
  }

  filter(str) {
    if (this.filterInterestId != str) {
      this.filterInterestId = str;
      this.count = 1;
      this.allLeaders = [];
      this.lastUsrId = 0;
      this.fetchUsersWithPoints();
      this.fetchUserDetails();
      document.getElementById('rankListing').scrollTo(0, 0);
      this.disableOnScrollDown = false;
    }
  }



}
