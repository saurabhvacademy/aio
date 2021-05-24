import { Component, OnInit, HostListener, AfterViewChecked} from '@angular/core';
import { ConstantService } from 'src/app/services/constant.service';

@Component({
  selector: 'app-point-system',
  templateUrl: './point-system.component.html',
  styleUrls: ['./point-system.component.scss',
  './../leaderboard/filter-by-interest/responsiveui.css', 
  // '../../sharedComponents/mmenu/slidemenu.css'
],
  host: {
      '(window:scroll)': 'onScroll($event)'
  }
})
export class PointSystemComponent implements OnInit {
  activeTab = 1;
  leftFilterMenu: boolean = false;
  isMobileMenue: boolean;
  resize_window: boolean = true;
  isScrolled = false;
  isScrolled1 = false;
  currPos: Number = 0;
  startPos: Number = 0;
  changePos: Number = 0;
  constructor(private _constantService: ConstantService) { }
  receiveMessage($event) {
    this.activeTab = $event;
  }
  ngOnInit() {
    if (!this._constantService.getSessionDataBYKey('token')
      || this._constantService.getSessionDataBYKey('token') == ''
      || this._constantService.getSessionDataBYKey('token') == undefined) {
      window.location.replace('');
    }
    this.checkScreenWidth();
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

  displayMobileMenu() {
    this.isMobileMenue = !this.isMobileMenue;
  }
  hideMobileMenu() {
    this.isMobileMenue = false;
  }
  leftSidemenu() {
    // this.leftFilterslidebg = !this.leftFilterslidebg;
    this.isMobileMenue = !this.isMobileMenue;
    // if (this.leftFilterslidebg == true) {
    //   let body = document.getElementsByTagName('body')[0];
    //   body.classList.add("body-overflow");
    // } else {
    //   let body = document.getElementsByTagName('body')[0];
    //   body.classList.remove("body-overflow");
    // }
  }
    @HostListener('window:resize', ['$event'])
  onResize(event) {
      if (window.innerWidth >= 1200) {
          var innerWindWidth = window.innerWidth - 18;
          event.target.innerWidth;
          this.resize_window = true;
          document.getElementById('windiv').style.width = innerWindWidth + 'px';
      } else {
          document.getElementById('windiv').style.width = '100%';
      }
      if (window.innerWidth >= 992) {
          var rightwidth = document.getElementById('wall-sidebar-wrap').offsetWidth;
          var rightinnwidth = rightwidth - 15;
          document.getElementById('someDiv').style.width = rightinnwidth + 'px';
          document.getElementById('someDivleft').style.width = rightinnwidth + 'px';
      } else {
          document.getElementById('someDiv').style.width = '100%';
          document.getElementById('someDivleft').style.width = '100%';
      }
  }
  private checkScreenWidth() {
      var winwidth = window.innerWidth - 18;
      if (window.innerWidth >= 1200) {

          document.getElementById('windiv').style.width = winwidth + 'px';
      } else {
          document.getElementById('windiv').style.width = '100%';
      }
      if (window.innerWidth >= 992) {
          var rightwidth = document.getElementById('wall-sidebar-wrap').offsetWidth;
          var rightinnwidth = rightwidth - 15;
          document.getElementById('someDiv').style.width = rightinnwidth + 'px';
          document.getElementById('someDivleft').style.width = rightinnwidth + 'px';
      } else {
          document.getElementById('someDiv').style.width = '100%';
          document.getElementById('someDivleft').style.width = '100%';
      }
  }
  onScroll(evt) {
      var secHeight = document.getElementById('someDiv').offsetHeight;
      var secHeightleft = document.getElementById('someDivleft').offsetHeight;
      var innerWindHeight = window.innerHeight - 50;
      if (secHeight > innerWindHeight) {

          var topHeight = secHeight - innerWindHeight;
          this.changePos = secHeight - innerWindHeight;
          this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
          if (this.currPos >= this.changePos) {
              this.isScrolled = true;
              document.getElementById('someDiv').style.top = -topHeight + 'px';
          } else {
              this.isScrolled = false;
          }
      } else {
          var topHeight = secHeight - innerWindHeight;
          this.changePos = secHeight - innerWindHeight;
          this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
          if (this.currPos >= this.changePos) {
              this.isScrolled = true;
              document.getElementById('someDiv').style.top = 72 + 'px';
          } else {
              this.isScrolled = false;
          }

      }
      if (secHeightleft > innerWindHeight) {

          var topHeightleft = secHeightleft - innerWindHeight;
          this.changePos = secHeightleft - innerWindHeight;
          this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
          if (this.currPos >= this.changePos) {
              this.isScrolled1 = true;
              document.getElementById('someDivleft').style.top = -topHeightleft + 'px';
          } else {
              this.isScrolled1 = false;
          }
      } else {
          var topHeightleft = secHeightleft - innerWindHeight;
          this.changePos = secHeightleft - innerWindHeight;
          this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
          if (this.currPos >= this.changePos) {
              this.isScrolled1 = true;
              document.getElementById('someDivleft').style.top = 72 + 'px';
          } else {
              this.isScrolled1 = false;
          }

      }

  }
  ngAfterViewChecked() {
      this.checkScreenWidth();
  }
}
