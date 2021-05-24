import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {EncryptionService} from './../../../services/encryption.service';
import {ConstantService} from './../../../services/constant.service';
import {UserInfo} from './../../login/userInfo';
import {PostdataService} from './../../../services/postdata.service';
import {PlatformLocation, Location} from '@angular/common'

@Component({
    selector: 'app-mypagewall',
    templateUrl: './mypagewall.component.html',
    providers: [ConstantService, EncryptionService, PostdataService],
    styleUrls: ['./mypagewall.component.scss']
})
export class MypagewallComponent implements OnInit {
    username: any;
    userInfo: UserInfo;

    @Input() pageTab: number;
    @Input() usrTyp: number;
    @Input() usrName;
    secWidth = 0;
    pageTabContent: number = 1;

    constructor(
        public _constantService: ConstantService,
        public _router: Router,
        public _encryptionService: EncryptionService,
        private activatedRoute: ActivatedRoute,
        private location: PlatformLocation,
        private _location: Location
    ) {}

    ngOnInit() {
        this.pageTabContent = this.pageTab;
        this.username = this._constantService.getSessionDataBYKey('username');
        this.activatedRoute.params.subscribe((params: Params) => {
            console.log("::", params);
            if (params['id'] == undefined) {
                params['id'] = this.username;
            }
            if (params['tabid'] != undefined && params['tabid'] != null) {
                if (params['tabid'] == "#Pages:mypages") {
                    this.pageTabClick(1);
                } else if (params['tabid'] == "#Pages:followedpages") {
                    this.pageTabClick(2);
                } else if (params['tabid'] == "#Pages:suggestedpages") {
                    this.pageTabClick(3);
                }
            }
        });


    }

    pageTabClick(i) {
        this.pageTabContent = i;
        if (i == 1) {
            this._router.navigate(['profile/' + this.username + '/#Pages:mypages']);
        } else if (i == 2) {
            this._router.navigate(['profile/' + this.username + '/#Pages:followedpages']);
        } else if (i == 3) {
            this._router.navigate(['profile/' + this.username + '/#Pages:suggestedpages']);
        }
    }
}
