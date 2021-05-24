import { Component, OnInit, EventEmitter,Output,Input } from '@angular/core';

@Component({
  selector: 'app-socialinvitepopup',
  templateUrl: './socialinvitepopup.component.html',
  styleUrls: ['./socialinvitepopup.component.scss','./newsocialinvite.component.scss']
})
export class SocialinvitepopupComponent {
@Input() mediaName:number;
@Input() showInnerPopupWrap: boolean;
@Output() closePopupThread = new EventEmitter<boolean>();
closePopStatus:boolean=false;
successPopupStatus:boolean = false;
  constructor() { }

hideInvitePopup(){
  this.closePopupThread.emit(this.closePopStatus);
  let leftmenufixed = document.getElementsByClassName('rightmenu_fixed');
  for(let i=0;i<=leftmenufixed.length;i++){
    leftmenufixed[i].classList.remove("fixedposition");
  }
}
closeByCancel(event){
  this.closePopupThread.emit(event);
}
successPopupFnClose(){
  this.closePopStatus = false;
  this.closePopupThread.emit(this.closePopStatus);
}
successPopupShow(event){
this.successPopupStatus = event;
this.showInnerPopupWrap = !event;
}
}
