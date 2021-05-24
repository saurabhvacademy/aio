import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paymenttransaction',
  templateUrl: './paymenttransaction.component.html',
  styleUrls: ['./paymenttransaction.component.scss']
})
export class PaymenttransactionComponent implements OnInit {
 paymentTab = 1;
 paymentTabClick(index){
   this.paymentTab = index;
 }
  constructor() { }

  ngOnInit() {
  }

}
