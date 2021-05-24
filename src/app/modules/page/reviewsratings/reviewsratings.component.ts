import { Component, OnInit ,Output, Input, EventEmitter } from '@angular/core';
import {ConstantService} from './../../../services/constant.service';
@Component({
  selector: 'app-reviewsratings',
  templateUrl: './reviewsratings.component.html',
  styleUrls: ['./reviewsratings.component.scss']
})
export class ReviewsratingsComponent implements OnInit {
    Page_details: any;
    Page_id: string;
    isScrolled;
    isScrolledright;
    isScrolledleft;
    tab;
    title;
    @Output() reviewTab = new EventEmitter<number>();
    @Output() scrollVar = new EventEmitter();

  constructor(public _constantService: ConstantService) { }

  ngOnInit() {
      this.Page_details = JSON.parse(this._constantService.getSessionDataBYKey('page_details')); console.log(this.Page_details);
      this.Page_id = this.Page_details.PAGE_ID;
      this.title = this.Page_details['PAGE_TITLE'];
  }
  setTab(event){
    this.tab = 4;
        this.reviewTab.emit(this.tab);

  }
  removestricky() {
      this.isScrolled = false;
      this.isScrolledright = false;
      this.scrollVar.emit(true);
  }




}
