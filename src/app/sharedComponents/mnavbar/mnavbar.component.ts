import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAnalyticsService } from 'src/app/services/google-analytics.service';
import {ConstantService} from './../../services/constant.service';
@Component({
    selector: 'app-mnavbar',
    templateUrl: './mnavbar.component.html',
    styleUrls: ['./mnavbar.component.scss']
})
export class MnavbarComponent implements OnInit {
    username: any;
    profiletab: number = 1;

    isActiveMenu: boolean;
  datatext: boolean = false;
    @Output() showMobileMenu = new EventEmitter();
    @Output() hideMenu = new EventEmitter();
    clickedNavigation: string;
    constructor(
        public _constantService: ConstantService,
        private googleAnalyticsService: GoogleAnalyticsService,
        private _router: Router
        
    ) {}

    ngOnInit() {
        this._constantService.GetcloseMmmenuObservable$.subscribe(() => {
            this.hideMmenu();
        });
        this.username = this._constantService.getSessionDataBYKey('username');
    }

    showMobileMmenu() {
        this.showMobileMenu.emit(true);
        window.scroll(0,0);
        this.isActiveMenu = !this.isActiveMenu;
        this.clickedNavigation='';
    }

    // showPageCreatePopup(event) {
    //     this.datatext = event;
    //     console.log(event);
    // }
    createnewpage() {
        this.datatext = !this.datatext;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }
    profiletabClick(index) {
        this.profiletab = index;
    }

    hideMmenu() {

        this.hideMenu.emit(true);
    }
    routTo(endpoint){
        var filter=0;
        if(endpoint=='questionforyou'){
            this.googleAnalyticsService.eventEmitter(
                "web_Access",
                "web_Activity",
                "web_Questions",
                "web_Access",0
              );
              filter=2;
              
        }
       
    
        if(endpoint=='saved'){
            filter=3;   
        }
        if(endpoint == 'interests'){
            filter=4
        }
        this.clickedNavigation="endpoint";    
        this._router.navigate(['home/'+ endpoint],{queryParams: {filter: filter}});
        // window.location.replace(endpoint);
    
    }
}
