import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ConstantService } from './../../services/constant.service';
import { EncryptionService } from './../../services/encryption.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-privacy',
    templateUrl: './privacy.component.html',
    styleUrls: ['./privacy.component.scss', './../interestpopup/interestpopup.component.scss'],
    providers: [ConstantService, EncryptionService]
})
export class PrivacyComponent implements OnInit, AfterViewInit {
    config;
    PData: any;
    openConfirmation: boolean = false;
    @Output() sessionLogout = new EventEmitter<boolean>();
    dataConf = {};
    t: string;
    pageprofiletab = 1;
    leftmenutab = 1;
    leftmenutab1 = 1;
    leftmenutab2 = 1;
    constructor(
        public _constantService: ConstantService,
        private _router: Router,
    ) { }


    taggleClass(index) {
               let element = document.getElementById(index);

        if (element.classList.contains("add_height")) {
            element.classList.remove("add_height");
        }
        else {
            element.classList.add("add_height");
        }


    }


    tagglesubClass(index) {
      

        let id = document.getElementById(index);
        if (id.classList.contains("add_sub_height")) {
            id.classList.remove("add_sub_height");
        }
        else {
            id.classList.add("add_sub_height");
        }

    }




    pageprofiletabClick(index) {
        //this.pageprofiletab=index;
        window.scrollTo(0, 0);
        this.pageprofiletab = index;
        this.leftmenutab = 1;
        this.leftmenutab1 = 1;
    }
    leftmenutabClick(index) {
        this.leftmenutab = index;
        let el = document.getElementById(index);
        el.scrollIntoView(true);
        //
        window.scrollTo(0, (el.offsetTop + 20));

    }
    leftmenutabClick1(index) {
        this.leftmenutab1 = index;
        let el = document.getElementById(index);
        el.scrollIntoView(true);
        window.scrollTo(0, (el.offsetTop + 20));

    }
    leftmenutabClick2(index) {
        this.leftmenutab2 = index;
        let el = document.getElementById(index);
        el.scrollIntoView(true);
        window.scrollTo(0, (el.offsetTop + 20));

    }
    @HostListener('window:resize', ['$event'])
    onResize(event) {

        if (window.innerWidth >= 1200) {
            var innerWindWidth = window.innerWidth - 18;
            // event.target.innerWidth;
            document.getElementById("windiv").style.width = innerWindWidth + "px";
        } else {
            document.getElementById("windiv").style.width = "100%";
        }
        if (window.innerWidth >= 768) {
            var rightwidth = document.getElementById("outerDivleft").offsetWidth;
            var rightinnwidth = rightwidth - 15;
            document.getElementById("accordion").style.width = rightinnwidth + "px";
        }
    }
    private checkScreenWidth() {

        var winwidth = window.innerWidth - 18;
        // event.target.innerWidth;
        if (window.innerWidth >= 1200) {
            document.getElementById("windiv").style.width = winwidth + "px";
        } else {
            document.getElementById("windiv").style.width = "100%";
        }
        if (window.innerWidth >= 768) {
            var rightwidth = document.getElementById("outerDivleft").offsetWidth;
            var rightinnwidth = rightwidth - 15;
            document.getElementById("accordion").style.width = rightinnwidth + "px";
        }
    }

    ngAfterViewInit() {
        this.checkScreenWidth();
        
        if(window.location.pathname=="/privacy"){
            this.taggleClass('list1')
        }else{
            this.taggleClass('list2')
        }
    
    }
    ngOnInit() {
        this.checkScreenWidth();
        window.scrollTo(0, 0);
        var url = this._router.url.split("/");
        if (url[1] == "termandcondition") {
            this.pageprofiletab = 2;

        }
      
    }


    gotoPrivacy() {

        var privacy = {};
        privacy['token'] = this._constantService.getSessionDataBYKey('token');
        privacy['token_param'] = {};
        privacy['token_param']['device_type'] = 'w';
        privacy['token_param']['host'] = '';

        this._constantService.fetchDataApi(this._constantService.getPrivacyData(), privacy).subscribe(data => {
            var responseData: any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.PData = responseData.PRIVPLCY;

            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            }
            else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });

    }
    closePopup(event) {
        if (event['error'] == false) {
            this.openConfirmation = false;
        }
    }



    dropDown(index) {
        var x = document.getElementById(index).classList.contains("showdropdown")
        if (!x) {
            document.getElementById(index).classList.add("showdropdown");
        }
        else {
            document.getElementById(index).classList.remove("showdropdown");
        }
    }


}
