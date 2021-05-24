import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ConstantService } from 'src/app/services/constant.service';

@Component({
  selector: 'app-filter-by-interest',
  templateUrl: './filter-by-interest.component.html',
  styleUrls: ['./filter-by-interest.component.scss', './responsiveui.css',]
})
export class FilterByInterestComponent implements OnInit {
  userInterests: any = [];
  config={

  }

  @Output() filterEmitter = new EventEmitter<any>();
  @Output() topThreeFilter = new EventEmitter<any>();

  filterid: any = 0;
  lstInteretId: any;

  constructor(private _constantService: ConstantService) { }

  ngOnInit() {
    this.getUserInterest()

  }
  getUserInterest() {
    var usr_interest = {};
    usr_interest['token'] = this._constantService.getSessionDataBYKey('token');
    usr_interest['token_param'] = {};
    usr_interest['token_param']['device_type'] = 'w';
    usr_interest['token_param']['host'] = '';

    this._constantService.fetchDataApi(this._constantService.getUserInterestServiceUrl(), usr_interest).subscribe(data => {
      var responseData:any = data;
      var status = responseData.STATUS;
      if (status == this._constantService.success_msg) {
        this.userInterests = responseData.INTEREST_ID;
        this.lstInteretId = responseData.LAST_USR_ID;


      } else if (status == this._constantService.error_token) {


      }
    }, error => {
      var responseData = error;
      if (responseData.status == 500) {
      }
    });
  }

  setFilter(id) {
    this.filterid = id;
    this.filterEmitter.emit(id);
  }


}
