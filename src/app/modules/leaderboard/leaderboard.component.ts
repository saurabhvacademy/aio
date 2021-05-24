import { Component, OnInit, ViewChild } from '@angular/core';
import { FilterByInterestComponent } from './filter-by-interest/filter-by-interest.component';
import { RankListingComponent } from './rank-listing/rank-listing.component';
import { TopThreeDisplayComponent } from './top-three-display/top-three-display.component';
import { ConstantService } from 'src/app/services/constant.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss', './filter-by-interest/responsiveui.css']
})
export class LeaderboardComponent implements OnInit {
  @ViewChild(RankListingComponent) rankListingComponent: RankListingComponent;
  @ViewChild(TopThreeDisplayComponent) TopThreeDisplayComponent: TopThreeDisplayComponent;
  leftFilterMenu: boolean = false;
  leftFilterslidebg: boolean = true;
  isMobileMenue: boolean;

  constructor(
    private _constantService: ConstantService,
    private _titleService: Title
  ) { }

  ngOnInit() {
    this._titleService.setTitle("Leader Board");
    if (!this._constantService.getSessionDataBYKey('token')
      || this._constantService.getSessionDataBYKey('token') == ''
      || this._constantService.getSessionDataBYKey('token') == undefined) {
      window.location.replace('');
    }


  }

  onResize(event) {
    if (window.innerWidth > 991) {
      this.isMobileMenue = false;
    } else {
      this.isMobileMenue = true;
    }

  }
  filterByInterest($event) {
    this.rankListingComponent.filter($event);
    this.TopThreeDisplayComponent.fetchTop3leaders($event);

  }
  leftSideFilter() {
    this.leftFilterMenu = !this.leftFilterMenu;
    if (this.leftFilterMenu == true) {
      let body = document.getElementsByTagName('body')[0];
      body.classList.add("body-overflow");
    } else {
      let body = document.getElementsByTagName('body')[0];
      body.classList.remove("body-overflow");
    }
  }
  leftSidemenu() {
    // this.leftFilterslidebg = !this.leftFilterslidebg;
    this.isMobileMenue = !this.isMobileMenue;
    if (this.leftFilterslidebg == true) {
      let body = document.getElementsByTagName('body')[0];
      body.classList.add("body-overflow");
    } else {
      let body = document.getElementsByTagName('body')[0];
      body.classList.remove("body-overflow");
    }
  }

  displayMobileMenu() {
    this.isMobileMenue = !this.isMobileMenue;
  }
  hideMobileMenu() {
    this.isMobileMenue = false;
  }

}
