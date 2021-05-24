import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SlickCarouselComponent } from "ngx-slick-carousel";

@Component({
  selector: 'app-test-highlights',
  templateUrl: './test-highlights.component.html',
  styleUrls: ['../scholarship.component.scss']
})
export class TestHighlightsComponent implements OnInit {
  hoveractive = 1;
@ViewChild('slickModal2') slickModal2: SlickCarouselComponent;
  endpoint: any;
  constructor(
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.onResize(null);
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.endpoint = params['id'];

      }
    });
  }
  slideConfig = { slidesToShow: 3, slidesToScroll: 3, infinite: false };
  slideConfigFeaturedCourses = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true
  };
  slickInit(e) {
    console.log(new Date().getMilliseconds() + "slickkkkk")
    console.log("slick initialized");

  }

  breakpoint(e) {
    console.log("breakpoint");
  }

  afterChange(e) {
    console.log("afterChange");
  }

  beforeChange(e) {
    console.log("beforeChange");
  }
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    if (window.innerWidth > 767) {
      // this.isMobileMenue = false;
      this.slideConfig = {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: false,
      };
    }
  else  if (window.innerWidth > 580) {
      // this.isMobileMenue = false;
      this.slideConfig = {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: false,
      };
    } else {
      // this.isMobileMenue = true;
      this.slideConfig = {
        slidesToShow: 1.1,
        slidesToScroll: 1,
        infinite: false,
      };
    }
  }
  mouseup(evt){
    this.hoveractive = evt;
  }
}
