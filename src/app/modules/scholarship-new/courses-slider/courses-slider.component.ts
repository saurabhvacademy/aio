import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { SlickCarouselComponent } from "ngx-slick-carousel";

@Component({
  selector: 'app-courses-slider',
  templateUrl: './courses-slider.component.html',
  styleUrls: ['../scholarship.component.scss']
})
export class CoursesSliderComponent implements OnInit {
  @ViewChild('slickModal2') slickModal2: SlickCarouselComponent;
  items:any[] = [1, 2, 3, 4, 5, 6, 7];

  constructor() { }

  ngOnInit(): void {
    this.onResize(null);
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
        slidesToShow: 1.3,
        slidesToScroll: 1,
        infinite: false,
      };
    }
  }

}
