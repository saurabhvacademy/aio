import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-careervideo',
  templateUrl: './careervideo.component.html',
  styleUrls: [ './careervideo.component.scss']
})
export class CareervideoComponent implements OnInit {
   closeVideoSec:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  close() {
    this.closeVideoSec = false;
  }
  showVideo(){
    this.closeVideoSec = true;
  }
}
