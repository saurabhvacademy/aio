import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantService } from 'src/app/services/constant.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['../scholarship.component.scss']
})
export class BannerComponent implements OnInit {
  endpoint='nat';
  showScholarShipForm=false;
  dataConf: any = {};
  loggedIn: boolean;
  test: any = {};
  hh: any = 0;
  mm: any = 0;
  ss: any = 0;
  days: number;
  timer: any;
  registered: boolean;
  openLoginPopup = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private _constantService: ConstantService


  ) {
    if (this._constantService.getSessionDataBYKey('token')) {
      this.loggedIn = true;
    }
   }

  ngOnInit(): void {
    this.getUpcomingScholarshipTestDetails();

  }

  openRegistrationForm(){
  this.showScholarShipForm=true;
  }
  openLoginPopUp(){
  this.openLoginPopup=true;
  window.localStorage.setItem("regSchTest", "1");

  }

  getUpcomingScholarshipTestDetails() {
    // this.loader = true;
    var params = {
      token: this._constantService.getSessionDataBYKey('token'),
      token_param: {
        device_type: 'w',
        host: ''
      }
    }
    if (this.loggedIn) {
      var url = this._constantService.getUpcomingScholarshipTestDetailsUrl();
    } else {
      var url = this._constantService.getUpcomingScholarshipTestDetatilsPblcUrl();

    }
    this._constantService.fetchDataApi(url, params).subscribe(data => {
      var response: any = data;
      if (response.STATUS == "success") {
        // this.loader = false;
        // if (!response.SCHOLARSHIP_TEST_DETAIL.ET_UNIQUE_ID) {
        //   this.test.testStartTime = undefined;
        //   this.test.examDate = undefined;
        //   this.test.timeLeft = undefined;
        //   this.loader=false;
        //   return false;
        // }
        this.test.isEnrolled = response.SCHOLARSHIP_TEST_DETAIL.IS_ENROLLED;
        // // alert(JSON.stringify(response));
        // this.test.testStartTime = response.SCHOLARSHIP_TEST_DETAIL.TEST_START_TIME;
        this.test.examDate = response.SCHOLARSHIP_TEST_DETAIL.TEST_START_TIME;
        this.test.timeLeft = Math.floor((this.test.examDate - new Date().getTime()) / 1000);
        this.test.exitTestUniqueId = response.SCHOLARSHIP_TEST_DETAIL.ET_UNIQUE_ID
        // this.test.isEnrolled = response.SCHOLARSHIP_TEST_DETAIL.IS_ENROLLED;
        this.hh = Math.floor(this.test.timeLeft / 3600);
        var secondsRemaining = this.test.timeLeft % 3600;
        this.mm = Math.floor(secondsRemaining / 60);
        this.ss = secondsRemaining % 60;
        this.days = Math.floor(this.test.timeLeft / 86400);
        if (this.timer) {
          clearInterval(this.timer);
        }
        this.timer = setInterval(() => {
          this.test.timeLeft -= 1;
          this.days=Math.floor(this.test.timeLeft /( 60 * 60 * 24));
          var secondsRemaining = this.test.timeLeft % 3600*24;
          this.hh = Math.floor(secondsRemaining / 3600);
          var secondsRemaining = this.test.timeLeft % 3600;
          this.mm = Math.floor(secondsRemaining / 60);
          this.ss = secondsRemaining % 60;
          this.hh = this.hh < 10 ? '0' + this.hh : this.hh;
          this.mm = this.mm < 10 ? '0' + this.mm : this.mm;
          this.ss = this.ss < 10 ? '0' + this.ss : this.ss;

          if (this.test.timeLeft <= 0) {
            this.test.timeLeft = 0;
            clearInterval(this.timer);
          }

        }, 1000)
        
        this.getScholarshipTestDetails();
      } else {
        this.dataConf['type'] = 4;
        this.dataConf['error_msg'] = response.ERROR_MSG;
        // this.openErrorConfirmation = true;
        document.getElementsByTagName('body')[0].style.overflow = "auto";
        this.showScholarShipForm = false;

      }
      // this.loader = false;
    })
  }

  updateValues(event) {
    this.registered = event.registered;
    this.showScholarShipForm = event.close;
    if (!event.close) {
      document.getElementsByTagName('body')[0].style.overflow = "auto";
      this.showScholarShipForm = false;
    }
    if (event.registered) {
      this.getUpcomingScholarshipTestDetails();
    }
  }
  getScholarshipTestDetails() {
    var params = {
      token: this._constantService.getSessionDataBYKey('token'),
      token_param: {
        device_type: 'w',
        host: ''
      },
      et_unq_id: this.test.exitTestUniqueId

    }
    this._constantService.fetchDataApi(this._constantService.getScholarshipTestDetailsUrl(), params).subscribe(data => {
      var response: any = data;
      if (response.STATUS == 'success') {
        this.test.name=response.SCHOLARSHIP_TEST_DETAIL.TEST_NAME;
        this.test.isSubmitted=response.SCHOLARSHIP_TEST_DETAIL.IS_SUBMITTED;
        // this.loader=false;
        setTimeout(() => {
          if (window.localStorage.getItem('regSchTest') == '1' && this.test.isEnrolled != 1) {
            document.getElementById("register_for_free").click();
            window.localStorage.removeItem('regSchTest');
          }
          
        }, 500);

      }else{
        // this.loader=false;
      }
    })

  }

  startTest(id) {
    var params = {
      token: this._constantService.getSessionDataBYKey('token'),
      token_param: {
        device_type: 'w',
        host: ''
      },
      et_unq_id: id
    };
    this._constantService.fetchDataApi(this._constantService.getScholarshipTestLinkUrl(), params).subscribe(data => {
      var response: any = data;
      if (response.STATUS == 'success') {
        window.open(response.TEST_URL);
      } else {
        this.dataConf['type'] = 4;
        this.dataConf['error_msg'] = response.ERROR_MSG;
        // this.openErrorConfirmation = true;

      }
    })




  }
  downloadTestResult() {
    // this.loader=true;
    var params = {
      token: this._constantService.getSessionDataBYKey('token'),
      token_param: {
        device_type: 'w',
        host: ''
      },
      et_unq_id: this.test.exitTestUniqueId
    }
    // window.open("http://192.168.0.250:70/PDF/assessmentReport/MTQ2Mg==/RnFMMDdXQ0pBaFR4cVE4Ym10dURiRExobUw2VnhxOWtRT3FQV2FadWFWTUR4YjRaRGhFSHlpZHFrd3I4MTQxUw==");

    this._constantService.fetchDataApi(this._constantService.getDownloadScholarshipTestResultUrl(), params).subscribe(response => {
      var responseData:any=response;
      console.log(responseData);
      window.open(responseData.REPORT_URL);
      //######################################################################################################
      // var newBlob = new Blob([response], { type: "application/pdf" });

      // // IE doesn't allow using a blob object directly as link href
      // // instead it is necessary to use msSaveOrOpenBlob
      // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      //   window.navigator.msSaveOrOpenBlob(newBlob);
      //   return;
      // }

      // // For other browsers: 
      // // Create a link pointing to the ObjectURL containing the blob.
      // const data = window.URL.createObjectURL(newBlob);

      // var link = document.createElement('a');
      // link.href = data;
      // link.download = this.test.name+'_' + this._constantService.getSessionDataBYKey('full_name') + "_result";
      // // this is necessary as link.click() does not work on the latest firefox
      // link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      // setTimeout(function () {
      //   // For Firefox it is necessary to delay revoking the ObjectURL
      //   window.URL.revokeObjectURL(data);
      //   link.remove();
      // }, 100);
      //#########################################################################################################
      // this.loader=false;
    })
  }
}
