import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../sharedData/shared-data.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  @Input() testDetails:any={};
  routing: boolean;

  constructor(
    private _router:Router,
    private _sharedDataService: SharedDataService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.testDetails=this._sharedDataService.testDetails;
  }
  routTo(rout){
    this.routing=true;
    this._router.navigate([rout]);
  }
  reloadPage(){
    window.location.reload();

  }

}
