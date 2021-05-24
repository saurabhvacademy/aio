import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ConstantService } from 'src/app/services/constant.service';
import { CookieService } from 'ngx-cookie-service';
import { EncryptionService } from 'src/app/services/encryption.service';
import { Router } from '@angular/router';
import { GoogleAnalyticsService } from "../../services/google-analytics.service";
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { MaxLengthValidator } from '@angular/forms';
declare var $: any;
// declare var ga: any;



@Component({
  selector: 'app-get-user-information',
  templateUrl: './get-user-information.component.html',
  styleUrls: ['./get-user-information.component.scss',]
})
export class GetUserInformationComponent implements OnInit {
  officialEmail = "sales@aio.com";
  fullName = '';
  contactNumber = '';
  emailAddress = '';
  organization = '';
  userData: any = {};
  isDataNotCorrect: boolean = false;
  firstName = "";
  lastName = "";
  showThankyou = false;
  errorMessage = "";
  showPopupRegistrationFields = false;
  field = {
    isFullNameValid: false,
    isContactNumberValid: false,
    isEmailAddressValid: false,
  }
  showForm: boolean = true;
  showQuestions: boolean = false;
  learners: any = '';
  profession: any = '';
  interests: any = '';
  experience: any = '';
  remarks = '';
  daysInMonth: any = this.getArrayOfNumbers(1, 31);
  months = [{ name: 'Jan', val: 1 },
  { name: 'Feb', val: 2 },
  { name: 'Mar', val: 3 },
  { name: 'Apr', val: 4 },
  { name: 'May', val: 5 },
  { name: 'Jun', val: 6 },
  { name: 'Jul', val: 7 },
  { name: 'Aug', val: 8 },
  { name: 'Sep', val: 9 },
  { name: 'Oct', val: 10 },
  { name: 'Nov', val: 11 },
  { name: 'Dec', val: 12 },
  ];


  options1 = [
    "Govt. Jobs",
    "Competitive Exams",
    "K -12 (School Education System)",
    "Technology",
    "Higher Education",
    "Other",
  ];

  options3 = [
    "I'm a beginner",
    "I have some knowledge",
    "I'm Experienced",
    "I have Videos ready to be uploaded",

  ];

  options2 = [
    "Teacher (In-Person Tutor )",
    "Owner/Teacher (Private Academy / Coaching Classes / College / School)",
    "Corporate Professional",
    "Designer/Teacher (Online Courses )",
    "Any Other",

  ];

  options4 = [
    "0-50",
    "50-200",
    "200-1000",
    "1000-10,000",

  ]
  states: any = [

  ];
  state = '';
  country = "INDIA";
  countries = [
    {
      value: 'INDIA',
      label: 1
    }
  ]
  city = '';
  cities = [];
  showAddressForm: boolean;
  stateVsIds: any = [];
  gender: any = 'Select gender';
  genderList = [{ val: 'Male', key: 1 }, { val: 'Female', key: 2 }];
  password: any = '';
  dob: any = '';
  doby: number;
  dobm: number;
  dobd: number;
  showPreloader: boolean;
  years = Array(100).fill(1951, 2050);
  errorMsg: string;
  showError: boolean;
  missing: string;
  sentFormData: any;



  constructor(
    private _constantService: ConstantService,
    private _changeDetector: ChangeDetectorRef,
    private _cookie: CookieService,
    private _encryptionService: EncryptionService,
    private _router: Router,
    private googleAnalyticsService: GoogleAnalyticsService,



  ) { }

  ngOnInit() {

    if (window.location.pathname == "/form/thankyou") {
      this.showThankyou = true;
      this.showPopupRegistrationFields = false;
      this.showQuestions = false;
      this.showForm = false;
    } else {
      setTimeout(() => {
        this.getStates();
        var currentYear = new Date().getFullYear();
        this.years = this.getArrayOfNumbers(currentYear - 100, currentYear);

      }, 4000);

      this.setJquery();


    }


  }
  setJquery() {
    setTimeout(() => {
      $('input').focus(function () {
        $(this).parents('.form-group').addClass('focused');
      });

      $('input').blur(function () {
        var inputValue = $(this).val();
        if (inputValue == "") {
          $(this).removeClass('filled');
          $(this).parents('.form-group').removeClass('focused');
        } if (inputValue != "") {
          $(this).addClass('filled');
        }
      })
      document.getElementById('fullName').focus();
    }, 500);
  }

  sendData() {
    // this.googleAnalyticsService.eventEmitter(
    //   "submitClicked",
    //   "Mentor Leads",
    //   "clicked",
    //   "submitClickedOnAddressForm",
    //   0
    // );
    var formData: any = {};
    formData.First_Name = this.firstName;
    formData.Last_Name = this.lastName;
    formData.Email = this.emailAddress;
    formData.Mobile = this.contactNumber;
    formData.Query = "testing";
    formData.Stream = "1";
    formData.Center_Interested = "1";
    formData.Organization = this.organization;
    formData.experience = this.experience;
    formData.learners = this.learners;
    formData.profession = this.profession;
    formData.interests = this.interests
    formData.country = this.country;
    formData.city = this.city;
    formData.state = this.state;
    formData.remarks = this.remarks;

    if (JSON.stringify(formData) != JSON.stringify(this.sentFormData)) {
      this._constantService.postFormDataApi("https://www.aio.com/zh/zoho.php", formData).subscribe(data => {
        this.sentFormData = formData;
      })

    }
    // ga('event', 'Mentor Lead submitted', {
    //   'event_category': 'Mentor Leads',
    //   'event_label': 'Mentor Leads',
    //   'value': 100
    // });


    this.register();
    this.showForm = false;
    this.showThankyou = true;
    // this.showPopupRegistrationFields = true;
  }

  validateAndSendData() {
    var names = this.fullName.trim().split(' ');
    this.firstName = names[0];
    if (names[1]) {
      this.lastName = names[1];
    } else this.lastName = names[0];

    if (this._constantService.isMobile(this.contactNumber)) {
      this.field.isContactNumberValid = true;
      if (this._constantService.isEmail(this.emailAddress)) {
        this.field.isEmailAddressValid = true;
        if (this.fullName == '') {
          this.field.isFullNameValid = false;
          this.errorMessage = "Please enter your name"

        } else this.field.isFullNameValid = true;
      } else {
        this.errorMessage = "Please enter valid email"
        this.field.isEmailAddressValid = false;

      }
    } else {
      this.errorMessage = "Please enter valid mobile number";
      this.field.isContactNumberValid = false;
    }


    if (this.field.isFullNameValid && this.field.isContactNumberValid && this.field.isEmailAddressValid) {
      this.isDataNotCorrect = false;
    } else this.isDataNotCorrect = true;

    if (!this.isDataNotCorrect) {
      this.showQuestions = true;
      this.showForm = false;
      this.showThankyou = false;
      // this._googleAnalyticsService.eventEmitter(
      //   "nextClicked",
      //   "Mentor Leads",
      //   "clicked",
      //   "nextClickedOnDetailsForm",
      //   0
      // );
    }
   
  }

  redirectTo(target, id) {
    this._router.navigate(["/home"]);
  }

  submitAnswers() {
    this.showQuestions = false;
    this.showThankyou = true;

  }



  submitAnswer() {
    this.showThankyou = false;
    this.showForm = false;
    this.showQuestions = false;
    this.showAddressForm = true;
    // this._googleAnalyticsService.eventEmitter(
    //   "nextClicked",
    //   "Mentor Leads",
    //   "clicked",
    //   "nextClickedOnQuestionForm",
    //   0
    // );

  }
  submitData() {
    if (this.remarks.length <= 150) {
      this.googleAnalyticsService.eventEmitter(
        "Mentor page:",
        "Mentor form",
        "Mentor form submit",
        "Mentor Form label",
        0
        );
      this.showAddressForm = false;
      this.sendData();
    }

  }

  getStates() {
    var data = {};
    data['conid'] = 1;

    this._constantService.fetchDataApi(this._constantService.getStateServiceUrl(), data).subscribe(data => {
      var responseData:any = data;
      var status = responseData.STATUS;
      if (status == this._constantService.success_msg) {
        this.states = responseData.STATE_ID;
        this._changeDetector.detectChanges();
        this.states.forEach(state => {
          this.stateVsIds[state.STATE_NAME] = state.STATE_ID;
        });
      }
    });
  }

  getCities() {
    var data = {};
    data['stid'] = this.stateVsIds[this.state];
    this._constantService.fetchDataApi(this._constantService.getCityServiceUrl(), data).subscribe(data => {
      var responseData:any = data;
      var status = responseData.STATUS;
      if (status == this._constantService.success_msg) {
        this.city = '';
        this.cities = responseData.CITY_ID;
        setTimeout(() => {
          this._changeDetector.detectChanges();
        }, 500);
      }

    });

  }

  register() {
    var registrationData: any = {};
    this._constantService.setEmail(this._encryptionService.encrypt(this.emailAddress.toLowerCase().trim()));
    this._constantService.setMobile(this._encryptionService.encrypt(this.contactNumber));
    //this._constantService.setMobile(this.modelRegister.mn.trim());
    this._constantService.setSessionJsonPair('em', this.emailAddress.toLowerCase().trim());
    this._constantService.setSessionJsonPair('mobile', this.contactNumber.trim());
    this._constantService.setCountry('1');
    registrationData.em = this.emailAddress;
    registrationData.mn = this.contactNumber;
    registrationData.fn = this.firstName;
    registrationData.ln = this.lastName;
    registrationData.conid = 1;
    registrationData.dob = '';
    registrationData.gd = 1;
    registrationData.pd = '';
    registrationData.istchr = '1';
    registrationData.token_param = { "device_type": "w", "host": "" };
    this._constantService.fetchDataApi(this._constantService.getRegistrationForTeacherUrl(), registrationData).subscribe(data => {
      var responseData:any = data;
      var status = responseData.STATUS;

      if (status == 'success') {

        var expiredDate = new Date();
        expiredDate.setDate(expiredDate.getDate() + 90);
        this._cookie.set('study247', this._encryptionService.encrypt(responseData.TOKEN), expiredDate, '/');
        this._cookie.set('urlcors', '1', expiredDate, '/');

        this._constantService.setSessionJsonPair('country', "1");
        this.showPreloader = false;
        this._constantService.setUserInterest("0");
        this._constantService.setSessionJsonPair('token', responseData.TOKEN);
        this._constantService.setSessionJsonPair('isInterestSet', responseData.INTEREST_UPD_STATUS);
        this._constantService.setEmailVer("false");
        this._constantService.setSessionJsonPair('v_e', 'false');
        this._constantService.setSessionJsonPair('v_m', 'false');
        window.location.replace("");
      } else if (responseData.STATUS == 'error_token') {
        this.showPreloader = false;
        this._constantService.setSessionJsonPair('token', '');
        this._constantService.clearUserInfo();

        window.location.reload();
      } else if (status == 'error') {
        this.errorMsg = responseData.ERROR_MSG;
        this.showError = true;
        this._constantService.showToast(this.errorMsg, "", 1);
      }

    }, error => {
      var responseData = error;
      if (responseData.status == 500) {
        this._router.navigate(['500']);
      }
    });




  }

  validateDate() {
    var numberOfDays = {
      '1': 31,
      '2': 28,
      '3': 31,
      '4': 30,
      '5': 31,
      '6': 30,
      '7': 31,
      '8': 31,
      '9': 30,
      '10': 31,
      '11': 30,
      '12': 31

    }
    if (this.dobm > 0 && this.dobm < 12) {
      if (this.doby % 4 == 0) {  //leap year
        numberOfDays['2'] = 29;
      } else numberOfDays['2'] = 28;
      if (this.dobd > 0 && this.dobd <= numberOfDays[this.dobm]) {
        return true;
      }
    }
    return false
  }

  validateRegistrationData() {

    var missing = 'none';
    if (this.gender == 1 || this.gender == 2) {
      if (this.password.length >= 7) {
        if (this.validateDate()) {
          return missing;
        } else {
          missing = "DOB";
        }

      } else {
        missing = "Password"
      }
    } else {
      missing = 'gender';
    }

    return missing;

  }

  removeClass(id, className) {
    document.getElementById(id).classList.remove(className);
  }

  addClass(id, className) {
    document.getElementById(id).classList.add(className);
  }

  getArrayOfNumbers(start, end) {
    var arrNumbers = [];
    for (var i = start; i <= end; i++) {
      arrNumbers.push(i);
    }
    return arrNumbers;
  }

  setDobInputOptions(selected) {
    switch (selected) {
      case 'year': this.dobm = undefined;
        this.dobd = undefined;
        break;
      case 'month':
        this.dobd = undefined;
        var numberOfDays = {
          '1': 31,
          '2': 28,
          '3': 31,
          '4': 30,
          '5': 31,
          '6': 30,
          '7': 31,
          '8': 31,
          '9': 30,
          '10': 31,
          '11': 30,
          '12': 31
        }
        if (this.doby % 4 == 0) {
          numberOfDays[2] = 29;
        }

        this.daysInMonth = this.getArrayOfNumbers(1, numberOfDays[this.dobm + '']);
        break;
    }
  }
  back() {
    if (this.showQuestions) {
      this.showQuestions = false;
      this.showForm = true;
      this.setJquery();
    } else if (this.showAddressForm) {
      this.showQuestions = true;
      this.showAddressForm = false;
    }
  }

  cancelRegistrationForm() {
    this.showPopupRegistrationFields = false;
    this.showThankyou = true;
  }

}
