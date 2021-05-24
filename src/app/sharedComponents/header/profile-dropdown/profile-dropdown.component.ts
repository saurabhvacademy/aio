import { Component, OnInit } from '@angular/core';
import { ConstantService } from 'src/app/services/constant.service';
import { PostdataService } from 'src/app/services/postdata.service';
import { Router } from '@angular/router';
import { LogoutService } from 'src/app/services/logout.service';

@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  // styleUrls: ['../../../modules/search/searchfilter/searchfilter.component.scss','./profile-dropdown.component.scss'],
  styleUrls: ['./profile-dropdown.component.scss']
})
export class ProfileDropdownComponent implements OnInit {
  sessionLogout: any;
  dataConf: any;
  openConfirmation: boolean;

  constructor(
    private _constantService: ConstantService,
    private postData: PostdataService,
    private _logoutService:LogoutService

  ) { }

  userName = "";
  fullName = "";

  ngOnInit() {
    this.userName = this._constantService.getSessionDataBYKey("username");
    this.fullName = this._constantService.getSessionDataBYKey("full_name");


  }

  copy() {
    var url = window.location.origin + "/profile/" + this.userName;
    this.postData.copyPostURL(url);
  }

  logout() {
    this._logoutService.userLogout();
  }

}
