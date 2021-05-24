import { Component, OnInit, ChangeDetectorRef, EventEmitter, Input, AfterViewInit, Output, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ConstantService } from './../../services/constant.service';
import { RegisterService } from 'src/app/services/register.service';
import { LoginService } from 'src/app/services/login.service';
import { EmitService } from '../../sharedComponents/addpost/emit.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-loginpopup',
    templateUrl: './loginpopup.component.html',
    // styleUrls: ['../../modules/prepare/prepare.component.scss', '../../modules/prepare/prepareresponsive.css', '../../modules/login/login.component.scss',  './loginpopup.component.scss']
    styleUrls: ['./newloginpopup.component.scss', './../../modules/prepare/prepare.component.scss', './../../modules/prepare/prepareresponsive.css', './../../modules/login/login.component.scss', './../../modules/login/newlogin.component.scss', './../../modules/login/newlogin.css', './loginpopup.component.scss']
})
export class LoginpopupComponent implements OnInit {
    logincloseright = false;
    loginright: any = 2;
    forgotPasswordType = "";
    showForgotPasswordPopup = false;
    regiterDetails: any = {
        lastName: {
            msg: '',
            error: false
        },
        firstName: {
            msg: '',
            error: false
        },
        email: {
            msg: '',
            error: false
        },
        mobileNumber: {
            msg: '',
            error: false
        },
        countryId: {
            msg: '',
            error: false
        },
        password: {
            msg: '',
            error: false
        },
        dateOfBirth: {
            msg: '',
            error: false
        },
        noOfErrors: 0,
        ERROR_MSG: ''
    };
    registrationDetails = {
        email: '',
        mobileNumber: '',
        firstName: '',
        lastName: '',
        countryId: 1,
        dateOfBirth: '',
        gd: '',
        password: ''
    };
    loginMessage = { errorMessage: '', error: false, type: '' };
    // loginId: any;
    // password: any;
    isLoggedIn: boolean;
    sighup_container: boolean = true;
    @Output() messageEvent = new EventEmitter<boolean>();
    isWebView = true;
    closePopupObj = {};
    showloginpopup: boolean = true;
    @Output() closePopup = new EventEmitter<object>();
    @Input() openLoginPopupType: number;
    showPreloader: boolean;
    model = { "loginId": '', "password": '', }


    constructor(
        private registerService: RegisterService,
        private loginService: LoginService,
        private _constantService: ConstantService,
        private emitService: EmitService,
        private changeDetector: ChangeDetectorRef,
        private _router: Router



    ) {
        if (this._constantService.getSessionDataBYKey('token')) {
            this.isLoggedIn = true;
        } else {
            this.isLoggedIn = false;
        }
        this.emitService.objectEmitter.subscribe($event => {
            this.loginMessage = ($event);
            if (this.loginService.loginAttemptExceeded) {
                this.forgotPasswordType = "tooManyLoginAttempts";
            }
            this.changeDetector.detectChanges();
            this.showPreloader = false;

        });
        this.emitService.registerErrorObjectEmitter.subscribe($event => {
            this.regiterDetails = $event;
        })
    }

    ngOnInit(): void {

        if (window.innerWidth > 960) {
            this.isWebView = true;
        }
        else { this.isWebView = false; }

        if (this.openLoginPopupType) {
            this.loginright = this.openLoginPopupType;

        }

    }

    @HostListener('window:resize', ['$event'])

    onResize(event) {
    }




    loginbtn(id) {
        this.loginright = id;
    }
    registerSubmit() {
        this.regiterDetails = this.registerService.registerSubmit(this.registrationDetails);
    }
    loginSubmit() {
        // if(this.password  && this.loginId){
        this.showPreloader = true;
        this.loginMessage = this.loginService.loginSubmit(this.model.loginId, this.model.password);
        this.showPreloader = false;
            if (!this.model.loginId) {
                document.getElementById('l_c').focus();
            }
            if (!this.model.password && this.model.loginId) {
               document.getElementById('l_p').focus();
            }

    }
    formatDate() {
        this.regiterDetails.dateOfBirth = this.registerService.formatDate(this.registrationDetails.dateOfBirth);
        console.log(this.regiterDetails.dateOfBirth);
    }
    hidepopup() {
        this.showloginpopup = false;
        this.closePopupObj['STATUS'] = false;
        document.getElementById('loginPopupContainer').style.width = '0px';
        setTimeout(() => {
            this.closePopup.emit(this.closePopupObj);

        }, 100);
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }
    receiveMessage($event) {
        this.forgotPasswordType = '';
    }
    routTo(endpoint) {
        this._router.navigate([endpoint]);
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }

    setMobileNumberAndCountryCode(emittedObject) {
        this.registrationDetails.mobileNumber = emittedObject.mobileNumber;
        this.registrationDetails.countryId = emittedObject.countryId;
    }
    isEmail(search: string): boolean {
        var regexp = new RegExp(
            /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
        );
        return regexp.test(search);
    }
    isMobile(search: string): boolean {
        var regexp = new RegExp(/^[0-9]{10}$/);
        return regexp.test(search);
    }
}
