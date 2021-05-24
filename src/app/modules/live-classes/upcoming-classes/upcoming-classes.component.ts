import { Component, OnInit, ViewChild, HostListener, AfterViewInit  } from '@angular/core';
import { ConstantService } from '../../../services/constant.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PostdataService } from './../../../services/postdata.service';


@Component({
  selector: 'app-upcoming-classes',
  templateUrl: './upcoming-classes.component.html',
  styleUrls: [
    './upcoming-classes.component.scss',
    './../../all-courses/slidercntr.css'
    // '../../../sharedComponents/mmenu/slidemenu.css'
  ],
  host: {
    '(window:scroll)': 'onScroll($event)'
  }
})
export class UpcomingClassesComponent implements OnInit {
  dataConf: {};
  pageCount: number = 1;
  upComingClasses= [];
  continueScroll: boolean;
  isScrolled: boolean = false;
  currPos: Number = 0;
  startPos: Number = 0;
  changePos: Number = 0;
  isMobileMenue: boolean = false;
  t: any;
  token: boolean;

  constructor(
    public _constantService: ConstantService,
    private postData: PostdataService,
    public _router: Router



  ) { }

  ngOnInit(): void {
    this.t = this._constantService.getSessionDataBYKey('token');
    if(this.t != '' && this.t != "undefined" && this.t != undefined && this.t != null){
    this.getUpcomingClassesDtl();
    this.token=true;

    }else{
      this.getUpcomingClassesDtlwthOtTkn();
    this.token=false;

    }
    this.checkScreenWidth();
  }
  getUpcomingClassesDtl() {
    var postData = {};
    postData['token'] = this._constantService.getSessionDataBYKey('token');
    postData['token_param'] = {};
    postData['token_param']['device_type'] = 'w';
    postData['token_param']['host'] = '';
    postData['type'] = 2;
    postData['count'] = this.pageCount;
    postData['r_count'] = 5;

    this._constantService.fetchDataApi(this._constantService.getLiveClassesDtl(), postData).subscribe(data => {
      var responseData: any = data;
      var status = responseData.STATUS;
      if (status == this._constantService.success_msg) {
        // this.upComingClasses = responseData.STREAM_DATA;
        for (var i = 0; i < responseData.STREAM_DATA.length; i++) {

          this.upComingClasses.push(responseData.STREAM_DATA[i]);
        }
        if (responseData.STREAM_DATA.length == 5) {
          this.continueScroll = true;
        }
        else {
          this.continueScroll = false;
        }

      }
      else if (status == this._constantService.error_token) {
        this._constantService.clearUserInfo();
        this._router.navigate(['']);
        this.dataConf['type'] = 4;
        this.dataConf['msg'] = "Session Expire";
        this.dataConf['error_msg'] = "Session Expired";
      } else {
        this.dataConf['type'] = 2;
        this.dataConf['msg'] = "STUDY24X7";
        this.dataConf['error_msg'] = responseData.ERROR_MSG;
      }
    }, error => {
      var responseData = error;
      if (responseData.status == 500) {
        this._router.navigate(['500']);
      }
    });
  }

  getUpcomingClassesDtlwthOtTkn() {
    var postData = {};
    postData['type'] = 2;
    postData['count'] = this.pageCount;
    postData['r_count'] = 5;

    this._constantService.fetchDataApi(this._constantService.getLiveClassesDtlWthOtTkn(), postData).subscribe(data => {
      var responseData: any = data;
      var status = responseData.STATUS;
      if (status == this._constantService.success_msg) {
        // this.upComingClasses = responseData.STREAM_DATA;
        for (var i = 0; i < responseData.STREAM_DATA.length; i++) {

          this.upComingClasses.push(responseData.STREAM_DATA[i]);
        }
        if (responseData.STREAM_DATA.length == 5) {
          this.continueScroll = true;
        }
        else {
          this.continueScroll = false;
        }

      }
      else if (status == this._constantService.error_token) {
        this._constantService.clearUserInfo();
        this._router.navigate(['']);
        this.dataConf['type'] = 4;
        this.dataConf['msg'] = "Session Expire";
        this.dataConf['error_msg'] = "Session Expired";
      } else {
        this.dataConf['type'] = 2;
        this.dataConf['msg'] = "STUDY24X7";
        this.dataConf['error_msg'] = responseData.ERROR_MSG;
      }
    }, error => {
      var responseData = error;
      if (responseData.status == 500) {
        this._router.navigate(['500']);
      }
    });
  }


  onScrollDown() {
    if (this.continueScroll) {
      this.pageCount++;
      this.getUpcomingClassesDtl();
    }
  }
  ngAfterViewInit() {
    this.checkScreenWidth();
  }
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    if (window.innerWidth >= 992) {
      var rightwidth = document.getElementById("sideThreeCol").offsetWidth;
      var rightinnwidth = rightwidth - 15;
      document.getElementById("leftsectionfixed").style.width = rightinnwidth + "px";

    }
  }
  private checkScreenWidth() {
    if (window.innerWidth >= 992) {
      var rightwidth = document.getElementById("sideThreeCol").offsetWidth;
      var rightinnwidth = rightwidth - 15;
      document.getElementById("leftsectionfixed").style.width = rightinnwidth + "px";
      // document.getElementById("someDivleft").style.width = rightinnwidth + "px";
    }
  }
  onScroll(evt) {

    var secHeight = document.getElementById('leftsectionfixed').offsetHeight;
    // var secHeightleft = document.getElementById('someDivleft').offsetHeight;
    var innerWindHeight = window.innerHeight - 10;
    var secHeightcenter = document.getElementById('centersection').offsetHeight;
    if (secHeightcenter > secHeight) {
      if (secHeight > innerWindHeight) {
        var topHeight = secHeight - innerWindHeight;
        this.changePos = secHeight - innerWindHeight;
        this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
        if (this.currPos >= this.changePos) {
          this.isScrolled = true;
          document.getElementById("leftsectionfixed").style.top = -topHeight + "px";
        } else {
          this.isScrolled = false;
        }
      } else {
        var topHeight = secHeight - innerWindHeight;
        this.changePos = secHeight - innerWindHeight;
        this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
        if (this.currPos >= this.changePos) {
          this.isScrolled = true;
          document.getElementById("leftsectionfixed").style.top = 72 + "px";
        } else {
          this.isScrolled = false;
        }

      }
    }
    else {
      this.isScrolled = false;
    }

  }
  leftSidemenu() {
    // this.leftFilterslidebg = !this.leftFilterslidebg;
    this.isMobileMenue = !this.isMobileMenue;
    if (this.isMobileMenue == true) {
      let body = document.getElementsByTagName("body")[0];
      body.classList.add("body-overflow");
    } else {
      let body = document.getElementsByTagName("body")[0];
      body.classList.remove("body-overflow");
    }
  }
  displayMobileMenu() {
    this.isMobileMenue = !this.isMobileMenue;
  }
  hideMobileMenu() {
    this.isMobileMenue = false;
  }
  routeToLiveClassPage(){
  this._router.navigate(['/live-classes']);

  }
  routToStream(contentUUID){
    this._router.navigate(['/livestream/'+contentUUID]);
  }
  redirectTo(pathname, routeData) {
    var endPoint;
    if (pathname == 'page') {
        endPoint = routeData.PAGE_NAME ? routeData.PAGE_NAME : routeData.PAGE_UUID;

    }
    if (pathname == 'course') {
      endPoint = routeData.COURSE_URL;

  }
    window.open('/' + pathname + '/' + endPoint);

  }
}
