import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConstantService } from './../../../services/constant.service';


@Component({
  selector: 'app-earn-points',
  templateUrl: './earn-points.component.html',
  styleUrls: ['./earn-points.component.scss','./../point-system.component.scss']
})
export class EarnPointsComponent implements OnInit {
  username: string;
  datatext: boolean;

  constructor(
    public _router: Router,
    public _constantService: ConstantService,
    private activatedRoute: ActivatedRoute,


  ) { }

  ngOnInit() {
    this.username = this._constantService.getSessionDataBYKey('username');
  }

  earnPointTabClick(tab){
    if(tab=="bio"){
      this._router.navigate(['profile/' + this.username + '/#About']);
    }
    if(tab=="question"){
      this._router.navigate(['home/questionforyou']);
    }
    if(tab=="sharePost"){
      this._router.navigate(['/home']);
    }
    if(tab=="createpage"){
      this.datatext = !this.datatext;
      let body = document.getElementsByTagName('body')[0];
      body.classList.add("body-overflow");
    }
  }
  hidePageCreatePopup(event) {
    this.datatext = event;
}

}
