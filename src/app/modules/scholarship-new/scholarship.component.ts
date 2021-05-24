import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantService } from 'src/app/services/constant.service';
import { AboutTestComponent } from './about-test/about-test.component';
import { BannerComponent } from './banner/banner.component';
import { TestHighlightsComponent } from './test-highlights/test-highlights.component';


@Component({
  selector: 'app-scholarship',
  templateUrl: './scholarship.component.html',
  styleUrls: ['./scholarship.component.scss']
})
export class ScholarshipComponent implements OnInit {
  isLoggedin: boolean;
  endPoint: any;
  loggedIn: boolean;
  @ViewChild('BannerComponent') bannerComponent:BannerComponent
  @ViewChild('aboutTestComponent') aboutTestComponent:AboutTestComponent
  @ViewChild('testHightligtsComponent') testHightligtsComponent: TestHighlightsComponent


  constructor(
    private _constantService: ConstantService,
    private activatedRoute: ActivatedRoute,
    private _router:Router
  ) {

  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.endPoint=params['id'];
        setTimeout(() => {
          this.bannerComponent.endpoint=this.endPoint;
          this.aboutTestComponent.endpoint==this.endPoint;
          this.testHightligtsComponent.endpoint==this.endPoint;
        }, 500);
      } else {
        this._router.navigate(["scholarship/nat"])
    }});

    if (this._constantService.getSessionDataBYKey('token')) {
      this.isLoggedin = true;
    }


    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }



    if (this._constantService.getSessionDataBYKey('token')) {
      this.loggedIn = true;
    }

  }
  myFunction(x) {
    x.classList.toggle("change");
    var y = document.getElementById("myNav");
    // let body = document.getElementsByTagName('body')[0];
    if (y.style.height == "0%") {
      // console.log("dsfaaaaaa");
      y.style.height = "100%";
      // body.classList.add("body-overflow");
    } else {
      y.style.height = "0%";
      // body.classList.remove("body-overflow");
    }
  }

  ngAfterViewInit() {

    if (!this.loggedIn) {
      this._constantService.setSessionJsonPair('publicClickedURL', window.location.href);
    } else {
      this._constantService.setSessionJsonPair('publicClickedURL', '');
    }
  }

}
