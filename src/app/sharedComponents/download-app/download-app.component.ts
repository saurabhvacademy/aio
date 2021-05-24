import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-download-app',
  templateUrl: './download-app.component.html',
  styleUrls: ['./download-app.component.scss']
})
export class DownloadAppComponent implements OnInit {
  deviceOperatingSystem: string;
  @Output() downloadApp = new EventEmitter<boolean>()

  constructor(
    public router: Router,
  ) { }

  ngOnInit(): void {
    if (window.navigator.userAgent.match(/Android/i)) {
      this.deviceOperatingSystem='Android';
      console.log("Android");
    } else if (window.navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
      console.log("IOS");
      this.deviceOperatingSystem='IOS';
    } 
  }

  setUserStatus(){
    if(this.deviceOperatingSystem=='Android'){
      window.open('https://play.google.com/store/apps/details?id=com.stdy24x7&hl=en', "_blank");
    }else if(this.deviceOperatingSystem=='IOS'){
      window.open('https://itunes.apple.com/in/app/study24x7/id1444868244?ls=1&mt=8', "_blank");
    }

  }
  closePopupForContinueWeb(){
    this.downloadApp.emit(false)
    }



}
