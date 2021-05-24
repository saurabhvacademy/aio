import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ConstantService } from 'src/app/services/constant.service';
import { PostdataService } from 'src/app/services/postdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promotional-popup',
  templateUrl: './promotional-popup.component.html',
  styleUrls: ['./promotional-popup.component.scss']
})
export class PromotionalPopupComponent implements OnInit {

  @Output() promotionalpopup = new EventEmitter<boolean>();
  promotionalPopupShowClass=false;
  coupunmessage: boolean =false;
  constructor(
    private _constantService: ConstantService,
    public postdata: PostdataService,
    public router: Router,



  ) { }

  ngOnInit(): void {  

  }

  closePromotionalPopup(){
    sessionStorage.setItem('holiPopup','1');
    this._constantService.setSessionJsonPair("for-holi-popup", 1);
    this.promotionalpopup.emit(false)
    }

    CouponCopied(){
      this.coupunmessage=true;

    }
    routeToAllCourse(time){
    sessionStorage.setItem('holiPopup','1');
      setTimeout(() => {
        this.coupunmessage=false;
        this.promotionalpopup.emit(false);
        this.router.navigate(["/all-courses"]);        
      }, time);
    }
    
}
