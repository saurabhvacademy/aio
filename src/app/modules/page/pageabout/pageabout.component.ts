import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EncryptionService } from './../../../services/encryption.service';
import { ConstantService } from './../../../services/constant.service';
import { PostdataService } from './../../../services/postdata.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-pageabout',
  templateUrl: './pageabout.component.html',
  styleUrls: ['./pageabout.component.scss', './../../interest/interest.component.scss', './newpageabout.component.scss']
})
export class PageaboutComponent implements OnInit {
  showerror4: boolean = false;
  showerror3: boolean = false;
  showerror2: boolean = false;
  pgUrl: any;
  pageprofiletab = 1;
  pagepublishPopup: boolean = false;
  sanitisedURL: any;
  oldURL: any;
  emailvalue: any;
  UsrTyp: any;
  enter = false;
  emptyaddress = false
  ltIntShow = [];
  Arr = [];
  showIntArr: boolean = true;
  collegeTyp: boolean = false;
  indivisualTyp: boolean = false;
  showErrorDate = false;
  showerror = false;
  showerrorr = false;
  em: string;
  nn: string;
  about: string;
  usrname: string;
  usrphone: string;
  usremailid: string;
  usrwebsite: string;
  idd = [];
  iddd = [];
  id = [];
  IntArr = [];
  chckarr = []
  arr = [];
  intst;
  intId = [];
  pg_uuid: any;
  pg_intrest = [];
  userInterest = [];
  Array = [];
  index = [];
  interestArrr = [];
  interestAr = [];
  interestArr = [];
  pg_interest: any;
  pgIntArr = [];
  pageInterest: any;
  pageInterestOut: any;
  time: any;
  arrr = [];
  email: any;
  website: any;
  desc: any;
  phone: any;
  addrss: any;
  title: any;
  state: string;
  stateDummy: string;
  statuscheck: boolean = false;
  check: boolean = false;
  has_strtAddrss = 0;
  address: any;
  url;
  staticURL;
  city = "";
  cityDummy = "";
  street = '';
  streetDummy = '';
  postal_code = "";
  postal_Dummy = "";
  @Input() pagedata: object;
  @Input() withoutToken: boolean = false;
  @Output() changeInterest = new EventEmitter();
  @Output() sessionLogout = new EventEmitter<boolean>();
  @Output() changeData = new EventEmitter();
  @Output() PageTitle = new EventEmitter<string>();
  pageDetails: object = { 'title': '', 'address': '', 'pageDesc': '', 'email': '', 'website': '', 'pagename': '','PAGE_AUTH_TOKEN':'' };
  pageDetailsEdit: object = { 'title': '', 'address': '', 'pageDesc': '', 'email': '', 'website': '', 'pagename': '' };
  pageaboutedit: boolean = false;
  pagenameedit: boolean = false;
  pageName: string = '';
  lockPage: boolean = false;
  openConfirmation: boolean = false;
  dataConf = {};
  oldDetails:any = {};
  alertMsg: string = "";
  alert: number = 0;
  pageinfo: boolean = false;
  generalpopup: boolean = false;
  interestpopup: boolean = false;
  locationpopup: boolean = false;
  showemptyNum: boolean = false;
  showemptyEmail: boolean = false;
  showemptyWeb: boolean = false;
  showemptyAbout: boolean = false;
  interestObj = {};
  user_type = 0;
  showemptymessage: boolean = false;
  mapHitted: boolean = false;
  loadPageAbout: boolean = true;
  pageToken: any;

  constructor(
    public _constantService: ConstantService,
    private _encryptionService: EncryptionService,
    private _router: Router,
    private activatedRoute: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    private postData: PostdataService
  ) {
  }
  location_popus() {
    this.locationpopup = !this.locationpopup;
    setTimeout(() => {
      if (this.has_strtAddrss == 1) {
        (<HTMLInputElement>document.getElementById("hasaddress")).checked = true;
      }
    }, 400)
    let body = document.getElementsByTagName('body')[0];
    body.classList.add("body-overflow");

  }

  methodToGetURL() {
    if (this.locationpopup && this.url != this.oldURL) {
      this.oldURL = this.url;
      this.sanitisedURL = this.domSanitizer.bypassSecurityTrustResourceUrl(this.url);
      return this.domSanitizer.bypassSecurityTrustResourceUrl(this.url);
    } else {
      return this.sanitisedURL;
    }
  }

  holdData() {
    setTimeout(() => {
      this.checkData();
    }, 4000);
  }

  close_popup() {
    this.locationpopup = false;
    this.pageinfo = false;
    this.generalpopup = false;
    this.interestpopup = false;
    this.oldDetails['title'] = this.title;;
    this.oldDetails['phone'] = this.phone;
    this.oldDetails['email'] = this.email;
    this.oldDetails['website'] = this.website;
    this.alert = 0;
    this.showerror = false;
    this.showerror2 = false;
    this.showerror3 = false;
    this.showerror4 = false;
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove("body-overflow");
  }

  stopPropagation(event) {
    event.stopPropagation();
    return false;
  }

  checkData() {
    this.street = this.streetDummy;
    this.state = this.stateDummy;
    this.city = this.cityDummy;
    this.postal_code = this.postal_Dummy;
    if ((<HTMLInputElement>document.getElementById("hasaddress")) != null) {
      if ((<HTMLInputElement>document.getElementById("hasaddress")).checked) {
        if (this.street != '') {
          this.street = this.street.replace(/ /g, "+");
        }
      } else {
        if (this.state != '') {
          this.state = this.state.replace(/ /g, "+");
        }
      }
    }

    if (this.city != '') {
      this.city = this.city.replace(/ /g, "+");
    }
    if (this.postal_code != '') {
      this.postal_code = this.postal_code.replace(/ /g, "+");
    }
    if ((<HTMLInputElement>document.getElementById("hasaddress")) != null) {
      if ((<HTMLInputElement>document.getElementById("hasaddress")).checked) {
        this.url = "https://www.google.com/maps/embed/v1/place?q=" + this.street + "," + this.city + "," + this.postal_code + "&key=AIzaSyDSpLLhxp3CNHJgaF9WVSYqmk26Z1JVGMM";
      } else {
        this.url = "https://www.google.com/maps/embed/v1/place?q=" + this.state + "," + this.city + "," + this.postal_code + "&key=AIzaSyDSpLLhxp3CNHJgaF9WVSYqmk26Z1JVGMM";
      }
    }



  }

  interest_popus() {
    this.interestpopup = !this.interestpopup;
    if (this.interestpopup == true) {
      setTimeout(() => {
        for (var i = 0; i < this.pageInterest.length; i++) {
          var x = document.getElementById("ids_" + this.pageInterest[i]);
          if (x != null && x != undefined) {
            x.setAttribute("checked", "checked");
          }
        }
      }, 200);
    } else {
      this.changeInterest.emit(this.pageInterest);
    }

    let body = document.getElementsByTagName('body')[0];
    body.classList.add("body-overflow");
  }
  general_popus() {
    this.oldDetails['title'] = this.title;
    this.oldDetails['email'] = this.email;
    this.oldDetails['phone'] = this.phone;
    this.oldDetails['website'] = this.website;
    this.generalpopup = !this.generalpopup;
    let body = document.getElementsByTagName('body')[0];
    body.classList.add("body-overflow");
  }
  popupClose() {
    this.generalpopup = !this.generalpopup;
    let body = document.getElementsByTagName('body')[0];
    body.classList.add("body-overflow");
  }
  hide_popus() {
    this.oldDetails['pageDesc'] = this.pageDetails['pageDesc'];
    this.pageinfo = !this.pageinfo;
    let body = document.getElementsByTagName('body')[0];
    body.classList.add("body-overflow");
  }


  ngOnInit() {
    this.oldDetails.countryId=this._constantService.getSessionDataBYKey('country');
    console.log("pagedata : ", this.pagedata);
    this.user_type = this.pagedata['user_type'];
    console.log('aaa', this.user_type)
    this.interestObj = JSON.parse(this._constantService.getSessionDataBYKey('interests'));
    if (!this.withoutToken) {
      this.getpageDetails(this.pagedata['pageid']);
    } else {
      this.getpageDetailsPublic(this.pagedata['pageid']);

    }
    this.dataConf['type'] = 2;
    this.dataConf['msg'] = "Validation Error";
    if (this.pagedata['EDIT'] == 1) {
      setTimeout(() => {
        console.log("pagedata : hai");
        this.abouteditshow();
      }, 100);
    }


  }
  checked() {
    this.check = (<HTMLInputElement>document.getElementById("hasaddress")).checked;
    if (this.check == true) {
      this.statuscheck = true;
      this.has_strtAddrss = 1;
    } else { this.statuscheck = false; this.has_strtAddrss = 0; }
  }

  ngOnDestroy() {
    this.noUpdate();
    this.noNameUpd();
    this.changeData.emit(true);
  }

  abouteditshow() {
    if (this.pageaboutedit === false) {
      this.pageaboutedit = true;
      this.pageDetailsEdit = this.pageDetails;
      this.pageDetailsEdit['pageDesc'] = this.pageDetailsEdit['pageDesc'].replace(/<br>/g, '\n').replace(/\<(?!br|\/br).*?\>/g, "");
      this.pageDetailsEdit['pageDesc'] = this.pageDetailsEdit['pageDesc'].replace(/class="([^"]*)"/g, "");
      this.pageDetailsEdit['pageDesc'] = this.pageDetailsEdit['pageDesc'].replace(/title="([^"]*)"/g, "");
      this.pageDetailsEdit['pageDesc'] = this.pageDetailsEdit['pageDesc'].replace(/target="([^"]*)"/g, 'target=""');
      this.pageDetailsEdit['pageDesc'] = this.pageDetailsEdit['pageDesc'].replace(/<!---->/g, "");
      this.pageDetailsEdit['pageDesc'] = this.pageDetailsEdit['pageDesc'].replace(/&nbsp/g, "");
      this.pageDetailsEdit['address'] = this.pageDetailsEdit['address'].replace(/<br>/g, '\n');
    } else {
      this.pageaboutedit = false;
    }
  }

  changePageName() {
    if (!this.pagenameedit) {
      this.pagenameedit = true;
    }
  }

  getpageDetails(id) {
    var pageDetail = {};
    pageDetail['token'] = this._constantService.getSessionDataBYKey('token');
    pageDetail['token_param'] = {};
    pageDetail['token_param']['device_type'] = 'w';
    pageDetail['token_param']['host'] = '';
    pageDetail['pg_uuid'] = id;

    this._constantService.fetchDataApi(this._constantService.getPageDetailsServiceUrl(), pageDetail).subscribe(data => {
      var responseData:any = data;
      var status = responseData.STATUS;
      if (status == "success") {
        this.loadPageAbout = false;
        this.UsrTyp = responseData.PAGE_ABOUT.TYPE;
        if (this.UsrTyp == 0) {
          this.indivisualTyp = true;
        } else if (this.UsrTyp == 1) {
          this.collegeTyp = true;
        }
        if (responseData.PAGE_ABOUT.POSTAL_CODE == null) {
          responseData.PAGE_ABOUT.POSTAL_CODE = '';
        }
        if (responseData.PAGE_ABOUT.CITY == null) {
          responseData.PAGE_ABOUT.CITY = '';
        }
        if (responseData.PAGE_ABOUT.STATE == null) {
          responseData.PAGE_ABOUT.STATE = '';
        }
        if (responseData.PAGE_ABOUT.POSTAL_CODE == '' && responseData.PAGE_ABOUT.CITY == '' && responseData.PAGE_ABOUT.STATE == '') {
          this.emptyaddress = true;
        }
        if (responseData.PAGE_ABOUT.TITLE != null) {
          this.pageDetails['title'] = this.postData.decodeURIPostData(responseData.PAGE_ABOUT.TITLE).trim();
          this.oldDetails['title'] = this.pageDetails['title'].trim();
          this.title = this.pageDetails['title'];

        }

        if (responseData.PAGE_ABOUT.ADDRESS != null && responseData.PAGE_ABOUT.ADDRESS != '') {
          this.pageDetails['address'] = this.postData.decodeURIPostData(responseData.PAGE_ABOUT.ADDRESS);
          this.oldDetails['address'] = this.pageDetails['address'].trim();
          this.addrss = this.pageDetails['address'];
        }
        if (responseData.PAGE_ABOUT.PHONE != null) {
          this.pageDetails['phone'] = this.postData.decodeURIPostData(responseData.PAGE_ABOUT.PHONE);
          this.oldDetails['phone'] = this.pageDetails['phone'].trim();
          this.phone = this.pageDetails['phone'];
          if (this.phone == "") {
            this.showemptyNum = true;
          }
        }
        if (responseData.PAGE_ABOUT.DESCRIPTION != null) {
          this.pageDetails['pageDesc'] = this.postData.decodeURIPostData(responseData.PAGE_ABOUT.DESCRIPTION);
          //this.pageDetails['pageDesc'] = this.postData.decodeURIPostData(responseData.PAGE_ABOUT.SHORT_DESCRIPTION);
          this.oldDetails['pageDesc'] = this.pageDetails['pageDesc'].trim();
          this.desc = this.pageDetails['pageDesc'];
          if (this.desc == "") {
            this.showemptyAbout = true;
          } else {
            this.showemptyAbout = false;
          }
        } else {
          this.pageDetails['pageDesc'] = "No page Description";
        }
        if (responseData.PAGE_ABOUT.ADD_DATE_TIME != null) {
          this.pageDetails['time'] = this.postData.decodeURIPostData(responseData.PAGE_ABOUT.ADD_DATE_TIME);
          this.oldDetails['time'] = this.postData.getPostDateTime(this.pageDetails['time']);
          this.time = this.pageDetails['time'];
        }
        this.pg_uuid = responseData.PAGE_ABOUT.PAGE_UUID;

        if (responseData.PAGE_ABOUT.EMAIL != null) {
          this.pageDetails['email'] = responseData.PAGE_ABOUT.EMAIL;
          this.oldDetails['email'] = this.pageDetails['email'].trim();
          this.email = this.pageDetails['email'];
          if (this.email == "") {
            this.showemptyEmail = true;
          }
        }
        if (responseData.PAGE_ABOUT.WEBSITE != null) {
          var website = responseData.PAGE_ABOUT.WEBSITE;
          this.pageDetails['website'] = website;
          this.oldDetails['website'] = this.pageDetails['website'].trim();
          this.website = this.pageDetails['website'];
          if (this.website == "") {
            this.showemptyWeb = true;
          }
        }
        this.pgUrl;
        if (responseData.PAGE_ABOUT.WEBSITE.match("https://")) {
          this.pgUrl = responseData.PAGE_ABOUT.WEBSITE;
        } else {
          this.pgUrl = "https://" + responseData.PAGE_ABOUT.WEBSITE;
        }
        this.pageDetails['interest'] = responseData.PAGE_ABOUT.INTEREST.join();

        this.intId = this.pageDetails['interest'];
        this.intst = Object.keys(this.pageDetails['interest']).length;
        this.arr = Object.keys(this.pageDetails['interest']);
        this.chckarr = responseData.PAGE_ABOUT.INTEREST;
        this.pageInterest = responseData.PAGE_ABOUT.INTEREST;
        this.pageInterestOut = this.pageInterest;
        this.userInterest = this._constantService.getSessionDataBYKey('user_interest_id').split(',');
        for (var i = 0; i < this.pageInterestOut.length; i++) {
          if (this.userInterest.indexOf(this.pageInterestOut[i]) == -1) {
            this.userInterest.push(this.pageInterestOut[i]);
          }
        }
        this.IntArr = JSON.parse(this._constantService.getSessionDataBYKey('interests'));
        for (var i = 0; i < this.userInterest.length; i++) {
          for (var j = 1; j < 15; j++) {
            if (this.userInterest[i] == j) {
              this.arrr.push(j);
              this.index.push(j);
            }
          }
        }
        for (var i = 0; i < this.index.length; i++) {
          this.interestArr.push(this.IntArr[this.index[i]]);
        }
        if (responseData.PAGE_ABOUT.PAGE_NAME != null) {
          this.pageDetails['pagename'] = responseData.PAGE_ABOUT.PAGE_NAME;
          this.oldDetails['g'] = this.pageDetails['pagename'].trim();
        }
        this.cityDummy = responseData.PAGE_ABOUT.CITY;
        this.city = responseData.PAGE_ABOUT.CITY;
        this.postal_Dummy = responseData.PAGE_ABOUT.POSTAL_CODE;
        this.postal_code = responseData.PAGE_ABOUT.POSTAL_CODE;
        if (responseData.PAGE_ABOUT.HAS_STREET_ADDRESS == 1) {
          this.url = "https://www.google.com/maps/embed/v1/place?q=" + responseData.PAGE_ABOUT.ADDRESS + "," + responseData.PAGE_ABOUT.CITY + "," + responseData.PAGE_ABOUT.POSTAL_CODE + "&key=AIzaSyDSpLLhxp3CNHJgaF9WVSYqmk26Z1JVGMM";
          this.addrss = responseData.PAGE_ABOUT.ADDRESS + " " + responseData.PAGE_ABOUT.CITY + " " + responseData.PAGE_ABOUT.POSTAL_CODE;
          this.streetDummy = responseData.PAGE_ABOUT.ADDRESS;
          this.street = responseData.PAGE_ABOUT.ADDRESS;
          this.statuscheck = true;
          this.has_strtAddrss = 1;

        } else {
          this.addrss = responseData.PAGE_ABOUT.STATE + " " + responseData.PAGE_ABOUT.CITY + " " + responseData.PAGE_ABOUT.POSTAL_CODE;
          this.stateDummy = responseData.PAGE_ABOUT.STATE;
          this.state = responseData.PAGE_ABOUT.STATE;
          this.url = "https://www.google.com/maps/embed/v1/place?q=" + responseData.PAGE_ABOUT.STATE + "," + responseData.PAGE_ABOUT.CITY + "," + responseData.PAGE_ABOUT.POSTAL_CODE + "&key=AIzaSyDSpLLhxp3CNHJgaF9WVSYqmk26Z1JVGMM";
          this.statuscheck = false;
          this.has_strtAddrss = 0;
        }
        this.oldURL = this.url;
        this.staticURL = this.domSanitizer.bypassSecurityTrustResourceUrl(this.url);
        this.sanitisedURL = this.staticURL;
        this.pageDetails['PAGE_AUTH_TOKEN']=responseData.PAGE_ABOUT.PAGE_AUTH_TOKEN;
        this.pageToken = responseData.PAGE_ABOUT.PAGE_AUTH_TOKEN;
      } else if (status == "error_token") {
        this.sessionLogout.emit(true);
      } else {

      }
    });
  }

  getpageDetailsPublic(id) {
    var pageDetail = {};
    pageDetail['pg_uuid'] = id;

    this._constantService.fetchDataApi(this._constantService.getpgDetailPublic(), pageDetail).subscribe(data => {
      var responseData:any = data;
      var status = responseData.STATUS;
      if (status == "success") {
        this.loadPageAbout = false;
        this.UsrTyp = responseData.PAGE_ABOUT.TYPE;
        if (this.UsrTyp == 0) {
          this.indivisualTyp = true;
        } else if (this.UsrTyp == 1) {
          this.collegeTyp = true;
        }
        if (responseData.PAGE_ABOUT.POSTAL_CODE == null) {
          responseData.PAGE_ABOUT.POSTAL_CODE = '';
        }
        if (responseData.PAGE_ABOUT.CITY == null) {
          responseData.PAGE_ABOUT.CITY = '';
        }
        if (responseData.PAGE_ABOUT.STATE == null) {
          responseData.PAGE_ABOUT.STATE = '';
        }
        if (responseData.PAGE_ABOUT.POSTAL_CODE == '' && responseData.PAGE_ABOUT.CITY == '' && responseData.PAGE_ABOUT.STATE == '') {
          this.emptyaddress = true;
        }
        if (responseData.PAGE_ABOUT.TITLE != null) {
          this.pageDetails['title'] = this.postData.decodeURIPostData(responseData.PAGE_ABOUT.TITLE).trim();
          this.oldDetails['title'] = this.pageDetails['title'].trim();
          this.title = this.pageDetails['title'];

        }

        if (responseData.PAGE_ABOUT.ADDRESS != null && responseData.PAGE_ABOUT.ADDRESS != '') {
          this.pageDetails['address'] = this.postData.decodeURIPostData(responseData.PAGE_ABOUT.ADDRESS);
          this.oldDetails['address'] = this.pageDetails['address'].trim();
          this.addrss = this.pageDetails['address'];
        }
        if (responseData.PAGE_ABOUT.PHONE != null) {
          this.pageDetails['phone'] = this.postData.decodeURIPostData(responseData.PAGE_ABOUT.PHONE);
          this.oldDetails['phone'] = this.pageDetails['phone'].trim();
          this.phone = this.pageDetails['phone'];
          if (this.phone == "") {
            this.showemptyNum = true;
          }
        }
        if (responseData.PAGE_ABOUT.DESCRIPTION != null) {
          this.pageDetails['pageDesc'] = this.postData.decodeURIPostData(responseData.PAGE_ABOUT.DESCRIPTION);
          this.oldDetails['pageDesc'] = this.pageDetails['pageDesc'].trim();
          this.desc = this.pageDetails['pageDesc'];
          if (this.desc == "") {
            this.showemptyAbout = true;
          } else {
            this.showemptyAbout = false;
          }
        } else {
          this.pageDetails['pageDesc'] = "No page Description";
        }
        if (responseData.PAGE_ABOUT.ADD_DATE_TIME != null) {
          this.pageDetails['time'] = this.postData.decodeURIPostData(responseData.PAGE_ABOUT.ADD_DATE_TIME);
          this.oldDetails['time'] = this.postData.getPostDateTime(this.pageDetails['time']);
          this.time = this.pageDetails['time'];
        }
        this.pg_uuid = responseData.PAGE_ABOUT.PAGE_UUID;

        if (responseData.PAGE_ABOUT.EMAIL != null) {
          this.pageDetails['email'] = responseData.PAGE_ABOUT.EMAIL;
          this.oldDetails['email'] = this.pageDetails['email'].trim();
          this.email = this.pageDetails['email'];
          if (this.email == "") {
            this.showemptyEmail = true;
          }
        }
        if (responseData.PAGE_ABOUT.WEBSITE != null) {
          var website = responseData.PAGE_ABOUT.WEBSITE;
          this.pageDetails['website'] = website;
          this.oldDetails['website'] = this.pageDetails['website'].trim();
          this.website = this.pageDetails['website'];
          if (this.website == "") {
            this.showemptyWeb = true;
          }
        }
        this.pgUrl;
        if (responseData.PAGE_ABOUT.WEBSITE.match("https://")) {
          this.pgUrl = responseData.PAGE_ABOUT.WEBSITE;
        } else {
          this.pgUrl = "https://" + responseData.PAGE_ABOUT.WEBSITE;
        }
        this.pageDetails['interest'] = responseData.PAGE_ABOUT.INTERESTS.join();

        this.intId = this.pageDetails['interest'];
        this.intst = Object.keys(this.pageDetails['interest']).length;
        this.arr = Object.keys(this.pageDetails['interest']);
        this.chckarr = responseData.PAGE_ABOUT.INTERESTS;

        this.pageInterest = responseData.PAGE_ABOUT.INTERESTS;
        this.pageInterestOut = this.pageInterest;
        // this.userInterest = this._constantService.getSessionDataBYKey('user_interest_id').split(',');
        // for (var i = 0; i < this.pageInterestOut.length; i++) {
        //   if (this.userInterest.indexOf(this.pageInterestOut[i]) == -1) {
        //     this.userInterest.push(this.pageInterestOut[i]);
        //   }
        // }
        // this.IntArr = JSON.parse(this._constantService.getSessionDataBYKey('interests'));
        // for (var i = 0; i < this.userInterest.length; i++) {
        //   for (var j = 1; j < 15; j++) {
        //     if (this.userInterest[i] == j) {
        //       this.arrr.push(j);
        //       this.index.push(j);
        //     }
        //   }
        // }
        for (var i = 0; i < this.index.length; i++) {
          this.interestArr.push(this.IntArr[this.index[i]]);
        }
        if (responseData.PAGE_ABOUT.PAGE_NAME != null) {
          this.pageDetails['pagename'] = responseData.PAGE_ABOUT.PAGE_NAME;
          this.oldDetails['g'] = this.pageDetails['pagename'].trim();
        }
        this.cityDummy = responseData.PAGE_ABOUT.CITY;
        this.city = responseData.PAGE_ABOUT.CITY;
        this.postal_Dummy = responseData.PAGE_ABOUT.POSTAL_CODE;
        this.postal_code = responseData.PAGE_ABOUT.POSTAL_CODE;
        if (responseData.PAGE_ABOUT.HAS_STREET_ADDRESS == 1) {
          this.url = "https://www.google.com/maps/embed/v1/place?q=" + responseData.PAGE_ABOUT.ADDRESS + "," + responseData.PAGE_ABOUT.CITY + "," + responseData.PAGE_ABOUT.POSTAL_CODE + "&key=AIzaSyDSpLLhxp3CNHJgaF9WVSYqmk26Z1JVGMM";
          this.addrss = responseData.PAGE_ABOUT.ADDRESS + " " + responseData.PAGE_ABOUT.CITY + " " + responseData.PAGE_ABOUT.POSTAL_CODE;
          this.streetDummy = responseData.PAGE_ABOUT.ADDRESS;
          this.street = responseData.PAGE_ABOUT.ADDRESS;
          this.statuscheck = true;
          this.has_strtAddrss = 1;

        } else {
          this.addrss = responseData.PAGE_ABOUT.STATE + " " + responseData.PAGE_ABOUT.CITY + " " + responseData.PAGE_ABOUT.POSTAL_CODE;
          this.stateDummy = responseData.PAGE_ABOUT.STATE;
          this.state = responseData.PAGE_ABOUT.STATE;
          this.url = "https://www.google.com/maps/embed/v1/place?q=" + responseData.PAGE_ABOUT.STATE + "," + responseData.PAGE_ABOUT.CITY + "," + responseData.PAGE_ABOUT.POSTAL_CODE + "&key=AIzaSyDSpLLhxp3CNHJgaF9WVSYqmk26Z1JVGMM";
          this.statuscheck = false;
          this.has_strtAddrss = 0;
        }
        this.oldURL = this.url;
        this.staticURL = this.domSanitizer.bypassSecurityTrustResourceUrl(this.url);
        this.sanitisedURL = this.staticURL;
        console.log("mapmapmapmapmapmapmapmapmapmapmapmapmapmapmapmapmapmap");
        console.log(this.url);
      } else if (status == "error_token") {
        this.sessionLogout.emit(true);
      } else {

      }
    });
  }

  updatePageDetails() {
    var updatePageDetails = {};
    updatePageDetails['token'] = this._constantService.getSessionDataBYKey('token');
    updatePageDetails['token_param'] = {};
    updatePageDetails['token_param']['device_type'] = 'w';
    updatePageDetails['token_param']['host'] = '';

    if (this.pageDetails['title'].length > 3 && this.pageDetails['title'].length < 61 && this.pageDetails['title'].trim().match(/^[a-zA-Z0-9_ ]{4,200}$/)) {
      updatePageDetails['pg_title'] = this.postData.encodeURIPostData(this.pageDetailsEdit['title'].trim().toLowerCase());
    } else {
      this.alert = 1;
      this.alertMsg = "Page title should be in valid range";
      return false;
    }

    if (this.pageDetails['pageDesc'] != "") {
      if (this.pageDetails['pageDesc'].length > 3 && this.pageDetails['pageDesc'].length < 251) {
        updatePageDetails['pg_desc'] = this.postData.encodeURIPostData(this.pageDetailsEdit['pageDesc'].trim().replace(/\n/g, "<br>"));
      } else {
        this.dataConf['type'] = 2;
        this.dataConf['msg'] = "STUDY24X7";
        this.dataConf['error_msg'] = "Page description should be in valid range";
        this.openConfirmation = true;
        return false;
      }
    } else {
      updatePageDetails['pg_desc'] = "";
    }

    if (this.pageDetails['address'] != '') {
      if (this.pageDetails['address'].length > 3 && this.pageDetails['address'].length < 201) {
        updatePageDetails['pg_addr'] = this.postData.encodeURIPostData(this.pageDetailsEdit['address'].trim().replace(/\n/g, "<br>"));
      } else {
        this.alert = 1;
        this.alertMsg = "Page address should be in valid range";
        return false;
      }
    } else {
      updatePageDetails['pg_addr'] = "";
    }

    if (this.pageDetails['email'] != '') {
      if (this._constantService.isEmail(this.pageDetailsEdit['email'].trim())) {
        updatePageDetails['pg_email'] = this.pageDetailsEdit['email'].trim();
      } else {
        this.alert = 1;
        this.alertMsg = "Please enter a valid email address";
        return false;
      }

    } else {
      updatePageDetails['pg_email'] = "";
    }


    if (this.pageDetails['phone'] != '') {
      if (this._constantService.isMobileUni(this.pageDetailsEdit['phone'].trim())) {
        updatePageDetails['pg_phone'] = this.pageDetailsEdit['phone'].trim();
      } else {
        this.alert = 1;
        this.alertMsg = "Please enter a valid phone number";
        return false;
      }
    } else {
      updatePageDetails['pg_phone'] = "";
    }

    if (this.pageDetails['website'] != '') {
      if (this._constantService.isWebsite(this.pageDetailsEdit['website'].trim())) {
        updatePageDetails['pg_web'] = this.pageDetailsEdit['website'].trim();
      } else {

        this.alert = 1;
        this.alertMsg = "Invalid website/URL";
        return false;
      }
    } else {
      updatePageDetails['pg_web'] = "";
    }

    updatePageDetails['pg_uuid'] = this.pagedata['pageid'];

    this._constantService.fetchDataApi(this._constantService.getUpdatePageAboutServiceUrl(), updatePageDetails).subscribe(data => {
      var responseData:any = data;
      var status = responseData.STATUS;
      if (status == 'success') {
        var change = {};
        change['title'] = this.pageDetails['title'].trim();
        change['website'] = this.pageDetails['website'].trim();
        this.pageDetails['pageDesc'] = this.pageDetails['pageDesc'].trim().replace(/\n/g, "<br>");
        this.pageDetails['address'] = this.pageDetails['address'].trim().replace(/\n/g, "<br>")
        this.changeData.emit(change);
        //this._constantService.setToken(responseData.TOKEN);
        this._constantService.setSessionJsonPair('token', responseData.TOKEN);
        this.pageDetails = this.pageDetailsEdit;
        this.oldDetails['title'] = this.pageDetailsEdit['title'].trim();
        this.oldDetails['address'] = this.pageDetailsEdit['address'].trim();
        this.oldDetails['phone'] = this.pageDetailsEdit['phone'].trim();
        this.oldDetails['pageDesc'] = this.pageDetailsEdit['pageDesc'].trim();
        this.oldDetails['email'] = this.pageDetailsEdit['email'].trim();

        this.oldDetails['website'] = this.pageDetailsEdit['website'].trim();
        this.pageaboutedit = false;
        this.noUpdate();
      } else if (status == 'error_token') {
        this.sessionLogout.emit(true);
      } else {
        this.alert = 1;
        this.alertMsg = responseData.ERROR_MSG;
        this.openConfirmation = true;
      }
    });
  }

  checkPageName() {
    var checkPageName = {};
    checkPageName['token'] = this._constantService.getSessionDataBYKey('token');
    checkPageName['token_param'] = {};
    checkPageName['token_param']['device_type'] = 'w';
    checkPageName['token_param']['host'] = '';
    checkPageName['pg_unm'] = this.pageDetailsEdit['pagename'];

    this._constantService.fetchDataApi(this._constantService.getCheckPageNameServiceUrl(), checkPageName).subscribe(data => {
      var responseData:any = data;
      var status = responseData.STATUS;
      if (status == 'success') {
        if (responseData.ISEXIST == 0) {
          this.lockPage = true;
        } else {
          this.alert = 2;
          this.alertMsg = responseData.SUCCESS_MSG;
          this.openConfirmation = true;
        }
      } else if (status == 'error_token') {
        this.sessionLogout.emit(true);
      } else {
        this.dataConf['type'] = 2;
        this.dataConf['msg'] = "STUDY24X7";
        this.dataConf['error_msg'] = responseData.ERROR_MSG;
        this.openConfirmation = true;
      }
    })
  }

  closePopup(event) {
    this.openConfirmation = false;
  }

  updatePageName() {
    var checkPageName = {};
    checkPageName['token'] = this._constantService.getSessionDataBYKey('token');
    checkPageName['token_param'] = {};
    checkPageName['token_param']['device_type'] = 'w';
    checkPageName['token_param']['host'] = '';
    checkPageName['pg_uuid'] = this.pagedata['pageid'];
    checkPageName['pg_unm'] = this.pageDetailsEdit['pagename'];

    this._constantService.fetchDataApi(this._constantService.getUpdatePageNameServiceUrl(), checkPageName).subscribe(data => {
      var responseData:any = data;
      var status = responseData.STATUS;
      if (status == 'success') {
        this.pageDetails = this.pageDetailsEdit;
        this.oldDetails['g'] = this.pageDetailsEdit['pagename'];
        this.pagenameedit = false;
      } else if (status == 'error_token') {
        this.sessionLogout.emit(true);
      } else {

        this.dataConf['type'] = 2;
        this.dataConf['msg'] = "STUDY24X7";
        this.dataConf['error_msg'] = responseData.ERROR_MSG;
        this.openConfirmation = true;
      }
    })
  }

  noUpdate() {
    this.pageaboutedit = false;
    this.pageDetailsEdit['title'] = this.oldDetails['a']
    this.pageDetailsEdit['address'] = this.oldDetails['b']
    this.pageDetailsEdit['phone'] = this.oldDetails['c']
    this.pageDetailsEdit['pageDesc'] = this.oldDetails['d']
    this.pageDetailsEdit['email'] = this.oldDetails['e']
    this.pageDetailsEdit['website'] = this.oldDetails['f']
  }

  noNameUpd() {
    this.pagenameedit = false;
    this.lockPage = false;
    this.pageDetailsEdit['pagename'] = "";
  }

  hidealertmsg() {
    this.alert = 0;
  }

  updateAdress() {
    var updateAdress = {};
    updateAdress['token'] = this._constantService.getSessionDataBYKey('token');
    updateAdress['token_param'] = {};
    updateAdress['token_param']['device_type'] = 'w';
    updateAdress['token_param']['host'] = '';
    updateAdress['pg_uuid'] = this.pagedata['pageid'];
    if ((<HTMLInputElement>document.getElementById("hasaddress")).checked) {
      updateAdress['state'] = "";
      updateAdress['strt_adrs'] = this.street.replace(/\+/g, " ");
      updateAdress['has_strt_adrs'] = 1;
    } else {
      updateAdress['has_strt_adrs'] = 0;
      updateAdress['state'] = this.state.replace(/\+/g, " ");
      updateAdress['strt_adrs'] = "";
    }
    updateAdress['city'] = this.city.replace(/\+/g, " ");
    updateAdress['postal_cod'] = this.postal_code;

    this._constantService.fetchDataApi(this._constantService.getUpdatePageAddress(), updateAdress).subscribe(data => {
      var responseData:any = data;
      var status = responseData.STATUS;
      if (status == this._constantService.success_msg) {
        this.locationpopup = false;
        this.emptyaddress = false;

        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");

        if ((<HTMLInputElement>document.getElementById("hasaddress")).checked) {
          this.addrss = this.streetDummy + " " + this.cityDummy + " " + this.postal_Dummy;
          this.url = "https://www.google.com/maps/embed/v1/place?q=" + this.streetDummy + "," + this.cityDummy + "," + this.postal_Dummy + "&key=AIzaSyDSpLLhxp3CNHJgaF9WVSYqmk26Z1JVGMM";
        } else {
          this.addrss = this.stateDummy + " " + this.cityDummy + " " + this.postal_Dummy;
          this.url = "https://www.google.com/maps/embed/v1/place?q=" + this.stateDummy + "," + this.cityDummy + "," + this.postal_Dummy + "&key=AIzaSyDSpLLhxp3CNHJgaF9WVSYqmk26Z1JVGMM";
        }
        this.staticURL = this.domSanitizer.bypassSecurityTrustResourceUrl(this.url);
      } else if (status == 'error_token') {
        this.sessionLogout.emit(true);
      } else {
        this.dataConf['type'] = 2;
        this.dataConf['msg'] = "STUDY24X7";
        this.dataConf['error_msg'] = responseData.ERROR_MSG;
        this.openConfirmation = true;
      }
    });
  }

  checkboxupdate(id, event) {
    if (event.target.checked) {
      this.pageInterestOut.push(id);
    } else if (!event.target.checked) {
      var index = this.pageInterestOut.indexOf(id);
      this.pageInterestOut.splice(index, 1);
    }
  }
  updatePageInterst() {
    var pageInterest = {};
    pageInterest['token'] = this._constantService.getSessionDataBYKey('token');
    pageInterest['token_param'] = {};
    pageInterest['token_param']['device_type'] = 'w';
    pageInterest['token_param']['host'] = '';
    pageInterest['pg_uuid'] = this.pg_uuid;
    pageInterest['pg_intrst'] = this.pageInterestOut.join();

    this._constantService.fetchDataApi(this._constantService.getUpdatePageInterest(), pageInterest).subscribe(data => {
      var responseData:any = data;
      var status = responseData.STATUS;
      if (status == 'success') {

        this.pageInterest = this.pageInterestOut;
        this._constantService.showToast( " Your Interests Saved Successfully.", "","1" );
        this.interest_popus();
        this.close_popup();
        let bodyabout = document.getElementsByTagName('body')[0];
        bodyabout.classList.remove("body-overflow");
      } else if (status == 'error_token') {
        this.sessionLogout.emit(true);
      } else {
        this.dataConf['type'] = 2;
        this.dataConf['msg'] = "STUDY24X7";
        this.dataConf['error_msg'] = responseData.ERROR_MSG;
        this.openConfirmation = true;
      }
    })

  }


  removeScroll() {
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove("body-overflow");

  }


  updatePageGenInfo() {
    this.removeScroll();
    var pageGenInfo = {};

    if (this.oldDetails['title'].length < 5) {
      this.showerror = true;
      this.alert = 1;
      this.alertMsg = "Please enter atleast 5 characters.";
      return;
    } else {
      this.showerror = false;
      this.alert = 0;
    }
    if (this.oldDetails['phone'].match(/^[0-9]{10}$/) || this.oldDetails['phone'] == "") {
      this.showerror2 = false;
      this.alert = 0;
    } else {
      this.showerror2 = true;
      this.alertMsg = "Please enter a valid phone number";
      this.alert = 1;
      return;
    }
    if (this.oldDetails['email'].match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/) || this.oldDetails['email'] == "") {
      this.showerror3 = false;
      this.alert = 0;
    } else {
      this.showerror3 = true;
      this.alertMsg = "Please enter a valid email address";
      this.alert = 1;
      return;
    }
    if (this.oldDetails['website'].match(/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/) || this.oldDetails['website'] == "") {
      this.showerror4 = false;
      this.alert = 0;
    } else {
      this.showerror4 = true;
      this.alertMsg = "Please enter a valid website url";
      this.alert = 1;
      return;
    }

    pageGenInfo['token'] = this._constantService.getSessionDataBYKey('token');
    pageGenInfo['token_param'] = {};
    pageGenInfo['token_param']['device_type'] = 'w';
    pageGenInfo['token_param']['host'] = '';
    pageGenInfo['pg_uuid'] = this.pg_uuid;
    pageGenInfo['name'] = this.postData.encodeURIPostData(this.oldDetails['title']);
    pageGenInfo['email'] = this.oldDetails['email'];
    pageGenInfo['phone'] = this.oldDetails['phone'];
    pageGenInfo['website'] = this.oldDetails['website'];
    pageGenInfo['conid']=this.oldDetails['countryId'];

    this._constantService.fetchDataApi(this._constantService.getUpdatePageGenInfo(), pageGenInfo).subscribe(data => {
      var responseData:any = data;
      var status = responseData.STATUS;
      if (status == 'success') {
        this._constantService.showToast("Page general information updated successfully.","",1)
        this.popupClose();
        this.title = this.postData.decodeURIPostData(pageGenInfo['name']);
        this.PageTitle.emit( this.title);
        //this.pageTitle.emit(pageGenInfo['name']);
        this.pageDetails = this.oldDetails;
        this.email = this.pageDetails['email'];
        this.phone = this.pageDetails['phone'];
        this.website = this.pageDetails['website'];
        if (this.pageDetails['email'] == "") {
          this.showemptyEmail = true;
        } else {
          this.showemptyEmail = false;
        }
        if (this.pageDetails['phone'] == "") {
          this.showemptyNum = true;
        } else {
          this.showemptyNum = false;
        }
        if (this.pageDetails['website'] == "") {
          this.showemptyWeb = true;
        } else {
          this.showemptyWeb = false;
        }
        let bodyabout = document.getElementsByTagName('body')[0];
        bodyabout.classList.remove("body-overflow");
      } else if (status == 'error_token') {
        this.sessionLogout.emit(true);
      } else {
        this.showerror = true;
        this.showerror = true;
        this.showerrorr = true;
        this.dataConf['type'] = 2;
        this.dataConf['msg'] = "STUDY24X7";
        this.dataConf['error_msg'] = responseData.ERROR_MSG;
        this.openConfirmation = true;
      }
    })


  }

  updatePageInfo() {
    this.about = (<HTMLInputElement>document.getElementById("about")).value;
    this.about = this.about.replace(/“/g, "&#8220;");
    this.about = this.about.replace(/”/g, "&#8221;");
    if (this.about == null || this.about == ' ') {
      return;
    }
    var pageGenInfo = {};
    pageGenInfo['token'] = this._constantService.getSessionDataBYKey('token');
    pageGenInfo['token_param'] = {};
    pageGenInfo['token_param']['device_type'] = 'w';
    pageGenInfo['token_param']['host'] = '';
    pageGenInfo['pg_uuid'] = this.pg_uuid;
    pageGenInfo['pg_about'] = this.postData.encodeURIPostData(this.about);

    this._constantService.fetchDataApi(this._constantService.getUpdatePageInfo(), pageGenInfo).subscribe(data => {
      var responseData:any = data;
      var status = responseData.STATUS;
      if (status == 'success') {
        this.about = this.about.replace(/&#8220;/g, "“");
        this.about = this.about.replace(/&#8221;/g, "”");
        this.pageDetails['pageDesc'] = this.about.replace(/\%3C(?!span|br|a|href="([^"]*)"|\/span|\/br|\/a).*?\%3E/g, "").trim();
        if (this.pageDetails['pageDesc'] == "") {
          this.showemptyAbout = true;
        } else {
          this.showemptyAbout = false;
        }
        this.hide_popus();
        let bodyabout = document.getElementsByTagName('body')[0];
        bodyabout.classList.remove("body-overflow");
      } else if (status == 'error_token') {
        this.sessionLogout.emit(true);
      } else {
        this.dataConf['type'] = 2;
        this.dataConf['msg'] = "STUDY24X7";
        this.dataConf['error_msg'] = responseData.ERROR_MSG;
        this.openConfirmation = true;
      }

    })

  }


  closePagePublish() {
    this.pagepublishPopup = false;
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove("body-overflow");
  }
  showpagefollow() {
    this.pageprofiletab = 20;
  }


  setMobileNumberAndCountryCode(emittedObject){
    this.oldDetails.phone=emittedObject.mobileNumber;
    this.oldDetails.countryId=emittedObject.countryId;
  }

}
