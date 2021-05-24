import {Component, OnInit, AfterViewInit, Output, EventEmitter, HostListener} from '@angular/core';
import {ConstantService} from './../../services/constant.service';
import {EncryptionService} from './../../services/encryption.service';
import {Router} from '@angular/router';
import { WallStateService } from '../wall/services/wall-state.service';
//import { InterestPipe } from './interest.pipe';

@Component({
    selector: 'app-interest',
    templateUrl: './interest.component.html',
    providers: [ ConstantService, EncryptionService],
  styleUrls: ['./interest.component.scss'],
  host: {
      '(window:scroll)': 'onScroll($event)'
  }
})
export class InterestComponent implements OnInit, AfterViewInit {
    @Output() closePopup = new EventEmitter<boolean>();
    t: string;
    interests = [];
    public interestArr = [];
    user_interest = [];
    public value = "";
    register_re: string;
    config = 'string';
    interestpopup: boolean = true;
    interestlist: boolean = false;
    objectKeys = Object.keys;
    secWidth = 0;
    dataConf = {};
    openConfirmation: boolean = false;
    isScrolled = false;
    currPos: Number = 0;
    startPos: Number = 0;
    changePos: Number = 0;
    isCratePagePopup: boolean = false;
    accordianList: Number = 0;
    showHeader: boolean;
    loader: boolean;
    coverAll:boolean;

    constructor(
        public _constantService: ConstantService,
        private _router: Router,
        private _wallStateService: WallStateService
    ) {}
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        var innerWindWidth = window.innerWidth - 18;
        event.target.innerWidth;
        document.getElementById("windivinterest").style.width =  "100%";
        // document.getElementById("windivinterest").style.width = innerWindWidth + "px";

        if (window.innerWidth < 2000 && window.innerWidth > 992){
          var innerWindWidth = window.innerWidth - 18;
          event.target.innerWidth;
          // document.getElementById("windivinterest").style.width = innerWindWidth + "px";
          document.getElementById("windivinterest").style.width =   "100%";
        }else{
          document.getElementById("windivinterest").style.width = "100%";
        }
        if(window.innerWidth < 1200 && window.innerWidth >= 768){
        var rightwidth = document.getElementById("left-side-bar").offsetWidth;
        var rightinnwidth = rightwidth - 15;

          document.getElementById("someDivleft").style.width = rightinnwidth + "px";

          // window.alert(rightwidthright + 'right');
       }else{
         document.getElementById("someDivleft").style.width = "278px";

       }

    }
    private checkScreenWidth() {
        var winwidth = window.innerWidth - 18;
        if (window.innerWidth < 2000 && window.innerWidth >= 992) {
            document.getElementById("windivinterest").style.width =   "100%";
            // document.getElementById("windivinterest").style.width = winwidth + "px";
        } else {
            document.getElementById("windivinterest").style.width = "100%";
        }
        if(window.innerWidth < 1200 && window.innerWidth >= 768){
        var rightwidth = document.getElementById("left-side-bar").offsetWidth;
        var rightinnwidth = rightwidth - 15;

          document.getElementById("someDivleft").style.width = rightinnwidth + "px";

          // window.alert(rightwidthright + 'right');
       }else{
         document.getElementById("someDivleft").style.width = "278px";

       }
    }
    onScroll(evt) {
        // var secHeight = document.getElementById('someDiv').offsetHeight;
        var secHeightleft = document.getElementById('someDivleft').offsetHeight;
        var innerWindHeight = window.innerHeight - 50;
        var secHeightcenter = document.getElementById('centersection').offsetHeight;
        if (secHeightcenter > secHeightleft) {
            if (secHeightleft > innerWindHeight) {

                var topHeight = secHeightleft - innerWindHeight;
                this.changePos = secHeightleft - innerWindHeight;
                this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
                if (this.currPos >= this.changePos) {
                    this.isScrolled = true;
                    document.getElementById("someDivleft").style.top = -topHeight + "px";
                } else {
                    this.isScrolled = false;
                }
            } else {
                var topHeight = secHeightleft - innerWindHeight;
                this.changePos = secHeightleft - innerWindHeight;
                this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
                if (this.currPos >= this.changePos) {
                    this.isScrolled = true;
                    document.getElementById("someDivleft").style.top = 72 + "px";
                } else {
                    this.isScrolled = false;
                }

            }
        }else {
            this.isScrolled = false;
        }

    }

    ngOnInit() {
        const url =""+ window.location.href
        const UrlArr = url.split('/');

        if(UrlArr[UrlArr.length-1]=="interest"){
          this.showHeader=true;
        }
        document.body.classList.remove("body-overflow-y");
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("stopClicking");

        document.title = "Study24x7 - A best place for collaborative learning & sharing";
        this.checkScreenWidth();
        this.t = this._constantService.getSessionDataBYKey('token');
        if (this.t != '' && this.t != "undefined" && this.t != undefined && this.t != null) {

            if (this._constantService.getSessionDataBYKey('mobile_verify') == 'false' && this._constantService.getEmailVer() == 'false') {
                this._router.navigate(['verification']);
            }

            if (this._constantService.getUserInterest() == '0') {
                this._router.navigate(['verification']);
            }
            this.getInterest();
        } else {
            this._constantService.clearUserInfo();
            this._router.navigate(['']);
        }
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.secWidth = document.getElementById('left-side-bar').offsetWidth;
            this.secWidth = this.secWidth - 30;
        }, 200);
    }

    getInterest() {
        if(!this._wallStateService.getInterests()){
        this._constantService.fetchDataApiWithoutBody(this._constantService.getInterestv1ServiceUrl()).subscribe(data => {
            this.coverAll=true;
            let responseData:any = data;
            console.log("qqqqqq",responseData.INTERESTS_DATA);
            this.interests = responseData.INTERESTS_DATA;
            this._wallStateService.setInterests(responseData.INTERESTS_DATA);
            this.getUserInterest();
            this.coverAll=false;

        }, error => {
            this.coverAll=false;

            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });}else{
            this.interests=this._wallStateService.getInterests();
            this.getUserInterest();
        }
    }

    getUserInterest() {
        if(!this._wallStateService.getUserInterestState()){
        var usr_interest = {};
        usr_interest['token'] = this._constantService.getSessionDataBYKey('token');
        usr_interest['token_param'] = {};
        usr_interest['token_param']['device_type'] = 'w';
        usr_interest['token_param']['host'] = '';
        this._constantService.fetchDataApi(this._constantService.getUserInterestServiceUrl(), usr_interest).subscribe(data => {
            this.coverAll=true;

            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                this._wallStateService.setUserInterestState(responseData.INTEREST_ID);
                this.user_interest = responseData.INTEREST_ID;
                setTimeout(() => {
                    for (var i = 0; i < this.user_interest.length; i++) {
                        document.getElementById(this.user_interest[i].INTEREST_ID).setAttribute("checked", "checked");
                        this.interestArr.push(String(this.user_interest[i].INTEREST_ID));
                    }
                },0);
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token',responseData.TOKEN);
            } else if (status == 'error_token') {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;
            }
            this.coverAll=false;

        }, error => {
            this.coverAll=false;

            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });}else {
            this.user_interest=this._wallStateService.getUserInterestState();
            setTimeout(() => {
                for (var i = 0; i < this.user_interest.length; i++) {
                    document.getElementById(this.user_interest[i].INTEREST_ID).setAttribute("checked", "checked");
                    this.interestArr.push(String(this.user_interest[i].INTEREST_ID));
                }
            }, 0);

        }
    }

    updateUserInterest() {
        this.loader=true;
        var user_interest = {};
        var str = this.interestArr.join();
        user_interest['token'] = this._constantService.getSessionDataBYKey('token');
        user_interest['token_param'] = {};
        user_interest['token_param']["device_type"] = "w";
        user_interest['token_param']["host"] = "";
        user_interest['iid'] = str;
        this._constantService.fetchDataApi(this._constantService.getAddInterstServiceUrl(), user_interest).subscribe(data => {
            this.coverAll=true;

            this.register_re = data["_body"];
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                this._constantService.showToast( " Your Interests Saved Successfully.", "","1" );
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token',responseData.TOKEN);
                this._constantService.setUserInterest(this.interestArr.length.toString());
                // this._router.navigate(['home']);
                this.closePopup.emit(false);
                this._wallStateService.setUserInterestState(undefined);
                this.ngOnInit();
                this._router.navigate(['home']);
            } else if (status == 'error_token') {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;

            } else if (status == "error" && responseData.ERROR_MSG == "Interest already saved") {
                this._router.navigate(['home']);
            }
            else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }
        this.loader=false;
        this.coverAll=false;


        }, error => {
            this.coverAll=false;

        this.loader=false;

            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }
    closedPopup(event) {
        if (event['error'] == false) {
            this.openConfirmation = false;
        }
        else {
            if (event) {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;
            }
        }
    }
    toggleShowHide(index){
      var interestList = document.getElementById("interest_"+index);
      var interestmenutoggle = document.getElementById("interestmenuup_"+index);
      if (interestList.classList.contains('show')) {
         interestList.classList.remove('show');
        } else {
          interestList.classList.add('show');
        }
      if (interestmenutoggle.classList.contains('glyphicon-menu-up')) {
       interestmenutoggle.classList.remove('glyphicon-menu-up');
     } else {
    interestmenutoggle.classList.add('glyphicon-menu-up');
    }



    }
    checkboxupdate(id, event) {
        if (event.target.checked) {
            this.interestArr.push(id);
        } else if (!event.target.checked) {
            var index = this.interestArr.indexOf(id);
            this.interestArr.splice(index, 1);
        }
    }

    closeConfirmation(event) {
        this.openConfirmation = false;
    }
    goBack() {
        this.closePopup.emit(false);
    }

    sessionExpire(event) {
        if (event) {
            this.dataConf['type'] = 4;
            this.dataConf['msg'] = "Session Expire";
            this.dataConf['error_msg'] = "Session Expired";
            this.openConfirmation = true;
        }
    }

    displayPageCreatePopup($event) {
        console.log("show create popup wall");
        this.isCratePagePopup = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }

    hidePageCreatePopup($event) {
      console.log("ayush sahu");
      this.isCratePagePopup = false;
    }
    goBackToUrl(){
        window.history.back();

    }
}
