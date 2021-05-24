import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConstantService } from 'src/app/services/constant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interests-dropdown',
  templateUrl: './interests-dropdown.component.html',
  styleUrls: [
    './interests-dropdown.component.scss',
    '../../../modules/login/login.component.scss',
    '../../../modules/login/newlogin.component.scss',
    '../../../modules/login/newlogin.css'
]
})
export class InterestsDropdownComponent implements OnInit {

  interests: any = [];
  openHideIntersePopUp: boolean;
  interestAlreadyGet: any;
  selectedCategory=0;
  @Output() emmiter = new EventEmitter<any>();
  constructor(
    private _constantService: ConstantService,
    private _router: Router,
  ) { }


  ngOnInit(){
    console.log("interst drop down init");
    this.getInterest();
  }

  getInterest() {
    this._constantService.fetchDataApiWithoutBody(this._constantService.getInterestv1ServiceUrl()).subscribe(data => {
      const responseData: any = data;
      this.interests = responseData.INTERESTS_DATA;
      this.interestAlreadyGet=true;
    }, error => {
      const responseData = error;
      if (responseData.status == 500) {
        this._router.navigate(['500']);
      }
    });
  }

  interestPopUp() {
    this.openHideIntersePopUp = true;
    // if (!this.interestAlreadyGet) {
      // this.getInterest();
    // }
  }
  routTo(name) {
    this._router.navigate(['prepare/' + name]).finally(()=>{
      window.location.reload();
    })
    // window.open(window.location.host+'/prepare/'+name,'_self');
    // location.href = '/prepare/'+name;
    this.emmiter.emit('close');
  }


}
