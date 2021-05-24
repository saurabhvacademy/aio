import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ConstantService} from './../../../services/constant.service';
import {Router, } from '@angular/router';
import { PostdataService } from 'src/app/services/postdata.service';


@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    providers: [ConstantService],
    styleUrls: ['./about.component.scss', './newabout.component.scss']
})
export class AboutComponent implements OnInit {
    emptystate: boolean;
    profile: boolean = false;
    myProfile: any;
    openConfirmation: boolean = false;
    dataConf = {};
    @Output() changeTab = new EventEmitter<number>();
    @Input() user_summary: string;
    @Input() aboutArr: any;
    @Input() tokenStatus: any;
    @Input() userName:any;
    @Output() sessionLogout = new EventEmitter<boolean>();
    summaryView = 1;
    seeMore: boolean = false;
    summary = "";
    cityView = 1;
    stateView = 2;
    expView = 1;
    eduView = 1;
    cityName = "";
    CountryName = "";
    EduCou = "";
    EduIns = "";
    ExpOrg = "";
    emptystate1:boolean= true;
    ExpPos = "";
    loaderscreen: boolean = true;
    constructor(
        public _constantService: ConstantService,
        private _router: Router,
        public postDataService: PostdataService
    ) {

    }

    ngDoCheck() {
         if(this.aboutArr.city != ''){
             this.emptystate1 = false;
         }else{
           this.emptystate1 = true;
         }
         if(this.aboutArr.state != ''){
             this.emptystate1 = false;
         }
         else{
           this.emptystate1 = true;
         }
         if(this.aboutArr.user_edu){
           if(this.aboutArr.user_edu.hasOwnProperty('FROM')){
              this.emptystate1 = false;
           }
         }
         else{
           this.emptystate1 = true;
         }
         if(this.aboutArr.user_edu){
           if(this.aboutArr.user_exp.hasOwnProperty('FROM')){
              this.emptystate1 = false;
           }
         }
         else{
           this.emptystate1 = true;
         }

        if (this.aboutArr['state']) {
            this.emptystate = true;
        } else {
            this.emptystate = false;
        }
        if (this.user_summary == "" || this.user_summary == null || this.user_summary === 'null') {
            this.summaryView = 2;

        } else {
            this.loaderscreen = false;
            if (this.user_summary.length > 80) {
                this.summary = this.user_summary.slice(0, 80) + "...";
                this.seeMore = true;
            } else {
                this.summary = this.user_summary;
            }
            this.summaryView = 1;

        }
        if (Object.keys(this.aboutArr).length == 5) {
            this.loaderscreen = false;
            if (this.aboutArr['city'] != "") {
                this.cityView = 2;
            } else {
                this.cityView = 1;
            }
            if (this.aboutArr['state'] == "") {
                this.stateView = 1;
            } else {
                this.stateView = 2;
            }
            if (Object.keys(this.aboutArr['user_exp']).length != 0) {
                this.expView = 2;
            } else {
                this.expView = 1;
            }
            if (Object.keys(this.aboutArr['user_edu']).length != 0) {
                this.eduView = 2;
            } else {
                this.eduView = 1;
            }
        }

        this.myProfile = this._constantService.getSessionDataBYKey('my_profile');
        if (this.myProfile == 2) {
            this.profile = true;
        }else{
            this.profile = false;
        }

    }


    ngOnInit() {
        this.summaryView = 2;
    }

    goToAboutUs() {
        var url = "profile/"+this.userName+"/#About"
        this._router.navigate([url]);
        this.changeTab.emit(2);

    }

}
