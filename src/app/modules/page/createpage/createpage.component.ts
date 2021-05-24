import {
  Component,
  OnInit,
  AfterViewInit,
  Output,
  Input,
  EventEmitter,
} from "@angular/core";
import { ConstantService } from "./../../../services/constant.service";
import { PostdataService } from "./../../../services/postdata.service";
import { EncryptionService } from "./../../../services/encryption.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-createpage",
  templateUrl: "./createpage.component.html",
  styleUrls: [
    "./createpage.component.scss",
    "./../../interest/interest.component.scss",
    "./newcreatepage.component.scss",
  ],
})
export class CreatepageComponent implements OnInit {
  @Output() sessionLogout = new EventEmitter<boolean>();
  public interests = {};
  public interestArr = [];
  public value = "";
  register_re: string;
  config = "string";
  interestpopup: boolean = true;
  interestlist: boolean = false;
  objectKeys = Object.keys;
  registerPopupStatus = true;
  @Output() hidecreatepagePopup = new EventEmitter<boolean>();
  closePopStatus: boolean = false;
  show_page_type = 0;
  step1_createpage = true;
  step2_createpage = false;
  pageTitle: string = "";
  category: string = "";
  openConfirmation: boolean = false;
  dataConf = {};
  alert: boolean = false;
  preloder: boolean = false;
  alertMsg: string = "";
  isHitted: boolean = false;
  pageName = "";
  pageNameAvailable = "-1";
  pageUUID: any;
  checkPageNameRsponseMessage: any;
  constructor(
    public _constantService: ConstantService,
    private _encryptionService: EncryptionService,
    private _router: Router,
    private postData: PostdataService
  ) {}

  ngOnInit() {
    this.getUserInterest();
  }

  getInterest() {
    this._constantService
      .fetchDataApiWithoutBody(this._constantService.getInterestv1ServiceUrl())
      .subscribe((data) => {
        let responseData: any = data;
        let interestData = {};
        for (let i = 0; i < responseData.INTERESTS_DATA.length; i++) {
          for (
            let j = 0;
            j < responseData.INTERESTS_DATA[i].INTERESTS.length;
            j++
          ) {
            interestData[
              responseData.INTERESTS_DATA[i].INTERESTS[j].INTEREST_ID
            ] = responseData.INTERESTS_DATA[i].INTERESTS[j].INTEREST_NAME;
          }
        }
        this.interests = interestData;
      });
  }

  getUserInterest() {
    var usr_interest = {};
    usr_interest["token"] = this._constantService.getSessionDataBYKey("token");
    usr_interest["token_param"] = {};
    usr_interest["token_param"]["device_type"] = "w";
    usr_interest["token_param"]["host"] = "";

    this._constantService
      .fetchDataApi(
        this._constantService.getUserInterestServiceUrl(),
        usr_interest
      )
      .subscribe((data) => {
        var responseData: any = data;
        var status = responseData.STATUS;
        if (status == "success") {
          this.interests = responseData.INTEREST_ID;
          //this._constantService.setToken(responseData.TOKEN);
          this._constantService.setSessionJsonPair("token", responseData.TOKEN);
        } else if (status == "error_token") {
          this.sessionLogout.emit(true);
        }
      });
  }

  createpageClick(index) {
    this.show_page_type = index;
  }
  hidePagePopup() {
    // alert(this.closePopupcreatepage);
    this.hidecreatepagePopup.emit(false);
    console.log("enter");
    let body = document.getElementsByTagName("body")[0];
    body.classList.remove("body-overflow");
  }
  select_pageinterest() {
    this.alert = false;
    if (this.pageTitle == "") {
      this.alert = true;
      this.alertMsg = "Please enter title of the page.";
      return false;
    } else if (this.pageTitle.length < 5) {
      this.alert = true;
      this.alertMsg = "Please enter minimum 5 characters.";
      return false;
    } else {
      if (this.pageTitle.trim().match(/^[a-zA-Z0-9_ ]{4,200}$/)) {
        this.step1_createpage = false;
        this.step2_createpage = true;
        let body = document.getElementsByTagName(
          "addpost_outer relative popup-open-wrapper"
        )[0];
      } else {
        this.alert = true;
        this.alertMsg =
          "Please enter a valid title of the page.(Special characters are not allowed)";
        return false;
      }
    }
  }

  checkboxupdate(id, event) {
    console.log("data : ", id, event);
    if (event.target.checked) {
      this.interestArr.push(id);
    } else if (!event.target.checked) {
      var index = this.interestArr.indexOf(id);
      this.interestArr.splice(index, 1);
    }
  }

  createPage() {
    this.preloder = true;
    if (this.interestArr.join() == "") {
      this.preloder = false;
      this.alert = true;
      this.alertMsg = "Please select interest for the page.";
      return false;
    }
    if (this.isHitted == false) {
      this.isHitted = true;
      var createPage = {};
      createPage["token"] = this._constantService.getSessionDataBYKey("token");
      createPage["token_param"] = {};
      createPage["token_param"]["device_type"] = "w";
      createPage["token_param"]["host"] = "";
      createPage["pg_title"] = this.postData.encodeURIPostData(this.pageTitle);
      createPage["pg_desc"] = "";
      createPage["pg_addr"] = "";
      createPage["pg_email"] = "";
      createPage["pg_phone"] = "";
      createPage["pg_web"] = "";
      createPage["pg_sdesc"] = "";
      createPage["pg_irt"] = this.interestArr.join();
      createPage["pg_pp"] = "";
      createPage["pg_cp"] = "";
      createPage["pg_id"] = "";
      if (this.show_page_type == 1) {
        createPage["pg_typ"] = 1;
      } else {
        createPage["pg_typ"] = 0;
      }

      this._constantService
        .fetchDataApi(
          this._constantService.getPageCreateServiceUrl(),
          createPage
        )
        .subscribe((data) => {
          var responseData: any = data;
          var status = responseData.STATUS;
          if (status == "success") {
            //this._constantService.setToken(responseData.TOKEN);
            this._constantService.setSessionJsonPair(
              "token",
              responseData.TOKEN
            );
            this.pageUUID = responseData.PAGE_UUID;
            this.updatePageName();
          } else if (status == "error_token") {
            this.dataConf["type"] = 4;
            this.dataConf["msg"] = "Session Expire";
            this.dataConf["error_msg"] = "Session expired";
            this.openConfirmation = true;
          } else {
            this.preloder = false;
            this.alert = true;
            this.alertMsg = responseData.ERROR_MSG;
          }
        });
    }
    let body = document.getElementsByTagName("body")[0];
    body.classList.remove("body-overflow");
  }

  updatePageName() {
    let bodyy = document.getElementsByTagName("body")[0];
    bodyy.classList.remove("body-overflow");

    this.checkPageName();
    var checkPageName = {};
    checkPageName["token"] = this._constantService.getSessionDataBYKey("token");
    checkPageName["token_param"] = {};
    checkPageName["token_param"]["device_type"] = "w";
    checkPageName["token_param"]["host"] = "";
    checkPageName["pg_uuid"] = this.pageUUID;
    checkPageName["pg_unm"] = this.postData.encodeURIPostData(this.pageName);

    this._constantService
      .fetchDataApi(
        this._constantService.getUpdatePageNameServiceUrl(),
        checkPageName
      )
      .subscribe((data) => {
        var responseData: any = data;
        var status = responseData.STATUS;

        if (status == "success") {
          this._router.navigate(["page/" + this.pageName.toLowerCase()]);
        } else if (status == "error_token") {
        } else {
          this.dataConf["type"] = 2;
          this.dataConf["msg"] = "STUDY24x7";
          this.dataConf["error_msg"] = responseData.ERROR_MSG;
          this.openConfirmation = true;
          this._router.navigate(["page/" + this.pageUUID]);
        }
      });
  }

  closeConfirmation(event) {
    if (event["error"] == false) {
      this.openConfirmation = false;
    }
  }

  hidealertmsg() {
    this.alert = false;
  }
  check() {}
  check1() {}

  checkPageName() {
    if (this.pageName.length > 3) {
      var checkPageName = {};
      checkPageName["token"] = this._constantService.getSessionDataBYKey(
        "token"
      );
      checkPageName["token_param"] = {};
      checkPageName["token_param"]["device_type"] = "w";
      checkPageName["token_param"]["host"] = "";
      checkPageName["pg_unm"] = this.postData.encodeURIPostData(this.pageName);

      this._constantService
        .fetchDataApi(
          this._constantService.getCheckPageNameServiceUrl(),
          checkPageName
        )
        .subscribe((data) => {
          var responseData: any = data;
          var status = responseData.STATUS;
          if (status == "success") {
            this.checkPageNameRsponseMessage = responseData.SUCCESS_MSG;
            if (responseData.ISEXIST == 0) {
              this.pageNameAvailable = "1";
            } else {
              this.pageNameAvailable = "0";
              this.dataConf["type"] = 2;
              this.dataConf["msg"] = "STUDY24x7";
              this.dataConf["error_msg"] = responseData.SUCCESS_MSG;
              // this.openConfirmation = true;
            }
          } else if (status == "error_token") {
          } else {
            this.checkPageNameRsponseMessage = responseData.ERROR_MSG;

            this.pageNameAvailable = "0";
            this.dataConf["type"] = 2;
            this.dataConf["msg"] = "STUDY24x7";
            this.dataConf["error_msg"] = responseData.ERROR_MSG;
            // this.openConfirmation = true;
          }
        });
    } else {
      this.pageNameAvailable = "0";
      this.checkPageNameRsponseMessage = "";
    }
  }
}
