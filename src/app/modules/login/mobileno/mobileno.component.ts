import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantService } from 'src/app/services/constant.service';
import { EmitService } from 'src/app/sharedComponents/addpost/emit.service';

@Component({
  selector: 'app-mobileno',
  templateUrl: './mobileno.component.html',
  styleUrls: ['./mobileno.component.scss']
})
export class MobilenoComponent implements OnInit {
  showCountryCodeAndFlag: boolean;
  @Input() mobileNumber = '';
  activeInput = 0;
  hideCountryList: boolean = true;
  searchCountryString = '';
  countryIsdCode = '91';
  @Input() countryId = '1'
  countryCode = 'IN';
  countryList: any = [];
  filteredCountryList: any = [];
  @Input() className = '';
  @Output() emitter = new EventEmitter<any>();
  placeholder: string = 'Enter mobile no.';
  subscribe: any;

  constructor(
    private _constantService: ConstantService,
    private _router: Router,
    private emitService:EmitService

  ) {
    
  }

  ngOnInit(): void {
    if (this.className == 'loginPg' || this.className == 'loginPgRes') {
      this.placeholder = '';
    }
    this.countryId = this._constantService.getSessionDataBYKey('MOBILE_CNTRY_ID');
    if (!this.countryId) {
      this.countryId = '1';
    }
    this.getCountryName();
    setTimeout(() => {
      console.log(this.className);

    }, 3000);
  }
  emitMobileNumber() {
    this.mobileNumber = this.mobileNumber.trim();
    this.emitter.emit({
      mobileNumber: this.mobileNumber,
      countryId: this.countryId,
      countryCode: this.countryIsdCode
    })

  }
  filterCountry(name) {
    name = name.toLowerCase();
    this.filteredCountryList = [];
    for (var i = 0; i < this.countryList.length; i++) {
      if (this.countryList[i].COUNTRY_NAME.toLowerCase().includes(name)) {
        this.filteredCountryList.push(this.countryList[i]);
      }
    }

  }

  getCountryName() {

    this._constantService.fetchDataApiWithoutBody(this._constantService.getCountryv1ServiceUrl()).subscribe(data => {
      const responseData: any = data;
      this.countryList = responseData.COUNTRY_LIST;
      for (var i = 0; i < this.countryList.length; i++) {
        // this.countryList[i].COUNTRY_SHORT_NAME = this.countryList[i].COUNTRY_SHORT_NAME.toLowerCase();
        this.filteredCountryList.push(this.countryList[i]);
        if (this.countryList[i].COUNTRY_ID == this.countryId) {
          this.countryIsdCode = this.countryList[i].COUNTRY_CODE;
          this.countryCode = this.countryList[i].COUNTRY_SHORT_NAME;
        }
      }
    }, error => {
      const responseData = error;
      if (responseData.status == 500) {
        this._router.navigate(['500']);
      }
    });
  }
  countryListUpdate() {
    this.hideCountryList = false;
    this.searchCountryString = '';
    this.getCountryName();
  }

}
