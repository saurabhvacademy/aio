import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConstantService } from 'src/app/services/constant.service';

@Component({
  selector: 'app-registration-details-popup',
  templateUrl: './registration-details-popup.component.html',
  styleUrls: ['../../page/createpage/createpage.component.scss', './registration-details-popup.component.scss']
})
export class RegistrationDetailsPopupComponent implements OnInit, AfterViewInit {
  loader: boolean;
  dataForScholarshipTestRegistration: any = {};
  @Output() emitter = new EventEmitter<any>();
  @Input() test: any = {};

  dataConf: any = {};
  openErrorConfirmation: boolean;
  hideForm: boolean;

  constructor(
    private _constantService: ConstantService
  ) { }

  ngOnInit(): void {
    var fullName = this._constantService.getSessionDataBYKey('full_name');
    var firstName = fullName.split(' ')[0];
    var lastName = fullName.split(' ')[1];
    this.dataForScholarshipTestRegistration.firstName = firstName;
    this.dataForScholarshipTestRegistration.lastName = lastName;
    this.dataForScholarshipTestRegistration.email = this._constantService.getSessionDataBYKey('em');
    setTimeout(()=>{
     var element=<HTMLInputElement>document.getElementById('university');
     element.focus();
  
  
      },500)

  }
  ngAfterViewInit() {
   
  }

  submitDetailsForScholarshipTest() {
    if (!this.isDataValid(this.dataForScholarshipTestRegistration)) {
      return false;
    }
    this.loader = true;
    var params: any = {};
    params.token = this._constantService.getSessionDataBYKey('token');
    params.token_param = {
      "device_type": "w",
      "host": ""
    };
    params.et_unq_id = this.test.exitTestUniqueId;
    params.rqrd_fld_dt = JSON.stringify(this.dataForScholarshipTestRegistration);
    // alert("successfully registered :"+JSON.stringify(this.dataForScholarshipTestRegistration));//remove this
    this._constantService.fetchDataApi(this._constantService.getScholarshipRegistrationUrl(), params).subscribe(data => {
      var response: any = data;
      // alert("response is : "+JSON.stringify(response));
      if (response.STATUS == 'success') {
        this.emitter.emit({
          show: false,
          registered: true
        });
      }
      else {
        this.dataConf['type'] = 2;
        this.dataConf['error_msg'] = response.ERROR_MSG;
        this.openErrorConfirmation = true;
        this.hideForm=true;

        document.getElementsByTagName('body')[0].style.overflow = "auto";

      }


    })
  }
  isDataValid(dataForScholarshipTestRegistration) {
    if (dataForScholarshipTestRegistration.firstName
      && dataForScholarshipTestRegistration.lastName
      && dataForScholarshipTestRegistration.university
      && this._constantService.isEmail(dataForScholarshipTestRegistration.email)) {
      return true;
    } else
      return false;
  }
  closeScholarShipForm() {
    this.emitter.emit({
      show: false,
      registered: false
    })
  }
  closeErrorConfirmation(){
    this.openErrorConfirmation=false;
    this.emitter.emit({
      show: false,
      registered: false
    })
  }

}
