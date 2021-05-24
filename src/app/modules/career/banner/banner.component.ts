import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConstantService } from 'src/app/services/constant.service';
import { SharedDataService } from '../sharedData/shared-data.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  loader = false;
  @Input() endpoint = "";
  @Output() openRegistrationForm = new EventEmitter<any>();
  isEnrolled: any;
  isLoggedin: boolean;
  testURL: any;
  testStartTime: any;
  timeLeft: number = 0;
  timeOver: number = 0;
  isAttempted: any;
  lastTime: number;
  testTimeOver: boolean;
  demoTest: boolean = false;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _constantService: ConstantService,
    private _sharedDataService: SharedDataService
  ) {
    if (this._constantService.getSessionDataBYKey('token')) {
      this.isLoggedin = true;
    } else {
      this.isLoggedin = false;
    }
  }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(queryParams => {
      if (queryParams.testing == '123') {
        this.demoTest = true;
      }
    });
    this.endpoint = this._sharedDataService.endpoint;
    if (this.endpoint == 'fresher') {
      this.getEnrolmentStatus();
    }
  }

  getEnrolmentStatus() {
    this.loader = true;
    var params = {
      "token": this._constantService.getSessionDataBYKey('token'),
      "token_param": {
        "device_type": "w",
        "host": ""
      }
    }
    this._constantService.fetchDataApi(this._constantService.getErnollStatusApiUrl(), params).subscribe(data => {
      var responseData: any = data;
      if (responseData.STATUS == 'success') {
        this.loader = false;
        this.isEnrolled = responseData.IS_ENROLLED;
        if (this.isEnrolled == 1) {
          localStorage.removeItem('applyFresherJob');
          this.isAttempted = responseData.CAREER_RESULT;
          this.testURL = responseData.TEST_URL;
          this.testStartTime = responseData.TEST_START_TIME ? responseData.TEST_START_TIME : 0;
          if (this.demoTest) {
            this.testStartTime = 1608519300000;
          }

          this.timeOver = new Date().getTime() - this.testStartTime;
          this.timeLeft = this.testStartTime - (new Date().getTime());
          if (this.timeLeft > 0) {
            setTimeout(() => {
              this.timeLeft = -1;

            }, this.timeLeft);
          }
          console.log(this.timeLeft);
          if (this.timeLeft > 0) {
            setTimeout(() => {
              this.timeLeft = this.testStartTime - (new Date().getTime());

            }, this.timeLeft);
          }
        } else if (!this.isEnrolled && localStorage.getItem('applyFresherJob') == '1') {
          localStorage.removeItem('applyFresherJob');
          this.openRegistrationForm.emit(true);


        }
      } else {
        this.loader = false;
      }

    }, error => {
      this.loader = false;
    })
  }

  emitOpenRegistrationForm() {
    if (this.isLoggedin)
      this.openRegistrationForm.emit(true);
    else {
      window.localStorage.setItem("applyFresherJob", '1');
      this.openSignupPopup();
    }
  }
  openLoginPopup() {
    document.getElementById('headerLogin').click();
  }

  openSignupPopup() {
    document.getElementById("headerSignup").click();
  }

  startTest() {
    if (!this.isAttempted) {
      if (this.timeOver <= 3600000)
        window.location.replace(this.testURL);
      else this._constantService.showToast("Test time over", "STUDY24X7", 4);
    }

  }
  scrollTo(id) {
    var element = <HTMLDivElement>document.getElementById(id);
    element.scrollIntoView();
  }

}
