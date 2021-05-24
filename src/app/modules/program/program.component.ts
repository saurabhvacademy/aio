import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare let gtag: Function;



@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./../scholarship/accordian.css', '../career/freequently-asked-questions/freequently-asked-questions.component.scss', './program.component.scss'],
  host: {
    '(window:scroll)': 'onScroll($event)'
  }
})
export class ProgramComponent implements OnInit {
  profiletab: number = 0;
  programTab: number = 1;
  isScrolledstick: boolean = false;
  isScrolledstick1: boolean = false;
  currPos: number = 0;
  startPos: number = 0;
  changePos: number = 0;
  menuselect = 1;
  name: string = '';
  contactNumber: number;
  email = '';
  showContactDetailsPopup = false;
  showThankyou = false;
  loader = false;
  targetMailId = "saurabh.sharma@aio.com";
  scrolled = false;
  error: any = {};
  constructor(
    private http: HttpClient
  ) { }


  menuactive(evt) {
    this.menuselect = evt;
  }

  ngOnInit(): void {
    document.cookie = "study247=study247";
    var coursedesc = document.getElementsByClassName("head");
    var i;

    for (i = 0; i < coursedesc.length; i++) {
      coursedesc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }

  }

  onScroll(evt) {
    if (!this.scrolled) {
      this.scrolled = true;
      setTimeout(() => {
        var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
          acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
              panel.style.maxHeight = null;
            } else {
              panel.style.maxHeight = panel.scrollHeight + "px";
            }
          });
        }

      }, 1000);
    }
    if (window.innerWidth > 0) {
      var secHeight = document.getElementById('menuDiv').offsetHeight;
      var innerWindHeight = window.innerHeight;
      if (secHeight < innerWindHeight) {

        this.changePos = secHeight + 600;
        this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
        if (this.currPos > this.changePos) {
          this.isScrolledstick = true;
        } else {
          this.isScrolledstick = false;
        }
      }
    } else {
      this.isScrolledstick = false;
    }
  }
  scrollTo(id) {
    var element = <HTMLDivElement>document.getElementById(id);
    $("body, html").animate({
      scrollTop: $(element).offset().top - 90
    }, 800);

    document.getElementsByTagName('body')[0].classList.remove('body-overflow');

  }

  fetchDataApi() {

    this.loader = true;
    if (!this.validate()) {
      this.loader = false;
      return;
    }
    var date = new Date();

    var url = "http://192.168.0.237:8123/4.0.0.1/mail/sndDynmcMlV1";
    var origin = window.location.origin;
    // if (this._constantService.platformDefinition == 'development') {
    //   url = "http://192.168.0.237:8123/4.0.0.1/mail/sndDynmcMlV1";
    // }
    if (origin.includes('study.hellouser.co.in')) {
      url = "https://mailuat.aio.net:8443/4.0.0.1/mail/sndDynmcMlV1";
      this.email = "saurabh.sharma@aio.com"
    }
    if (origin.includes('aio.com')) {
      url = " https://mail.aio.net/4.0.0.1/mail/sndDynmcMlV1";
      this.email = "aghor.singh@gingerwebs.in";
    }
    var options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    var params = {
      email: this.email,
      name: this.name,
      mail_body: "",
      to_email: this.targetMailId,
      mobile: this.contactNumber + '',
      subject: this.name + " - NDA Inquiry - " + date.toLocaleDateString() + " CADETS PRIME DEFENCE",
      data: []
    }


    var hitObjStr = JSON.stringify(params);
    var encData = btoa(hitObjStr);
    var body = JSON.stringify({ 'data': encData });
    // var options = new RequestOptions({ headers: headers });
    this.http.post(url, body, options).subscribe(data => {
      console.log(data);
      var responseData: any = data;
      if (responseData.STATUS == 'success') {
        gtag('event', 'conversion', { 'send_to': 'AW-737674678/MjjZCPm14vUBELaL4N8C' });
        this.showThankyou = true;
        setTimeout(() => {
          this.showThankyou = false;
          this.showContactDetailsPopup = false;
          this.loader = false;
          window.open(window.location.origin, '_blank');
        }, 5000);


      } else {
        this.loader = false;
      }
    });
  }

  validate() {
    this.error = {};
    this.error.exist = false;
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email)) {
    } else {
      this.error.emailErrorMessage = "Invalid email";
      this.error.exist = true;
    }

    if (isNaN(this.contactNumber) || (this.contactNumber + '').length != 10) {
      this.error.numberErrorMessage = "Invalid contact number";
      this.error.exist = true;
    }
    var numberString = this.contactNumber + '';
    var firstTowDigit = parseInt('' + numberString[0] + numberString[1]);
    if (firstTowDigit < 60) {
      this.error.numberErrorMessage = "Invalid contact number"
      this.error.exist = true;
    }
    if (this.name == '') {
      this.error.nameErrorMessage = "Please enter your name";
      this.error.exist = true;
    } else {
      for (var i = 0; i < 9; i++) {
        if (this.name.includes(i + '')) {
          this.error.nameErrorMessage = "Name can't contains number";
          this.error.exist = true;
        }
      }
    }
    return !this.error.exist;
  }

}
