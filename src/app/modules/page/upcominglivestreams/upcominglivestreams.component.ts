import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upcominglivestreams',
  templateUrl: './upcominglivestreams.component.html',
  styleUrls: ['./upcominglivestreams.component.scss']
})
export class UpcominglivestreamsComponent implements OnInit {
  // remaindershow:boolean = true;
  config:any;
  remaindershow: boolean = false;
  constructor() { }
  showdrop(){
    this.remaindershow = !this.remaindershow;
  }
  ngOnInit() {
  }

}
