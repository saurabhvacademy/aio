import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { SlickCarouselComponent } from "ngx-slick-carousel";

@Component({
  selector: 'app-sales-and-marketing',
  templateUrl: './sales-and-marketing.component.html',
  styleUrls: ['./../how-to-apply/steps.css', './sales-and-marketing.component.scss']
})
export class SalesAndMarketingComponent implements OnInit {
  @ViewChild('slickModal2') slickModal2: SlickCarouselComponent;
 items:any[] = [1, 2, 3, 4, 5, 6, 7];


  constructor() { }

  ngOnInit(): void {
    // this.onResize(null);
  }
  slideConfig = { slidesToShow: 1, slidesToScroll: 1, infinite: false };
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
}
