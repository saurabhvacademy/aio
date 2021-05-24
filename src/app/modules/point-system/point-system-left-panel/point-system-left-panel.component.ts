import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-point-system-left-panel',
  templateUrl: './point-system-left-panel.component.html',
  styleUrls: ['./point-system-left-panel.component.scss','./../point-system.component.scss']
})
export class PointSystemLeftPanelComponent implements OnInit {
  activeTableft = 1;
  constructor() { }
@Output() messageEvent = new EventEmitter<number>();
   sendTabMessage(event){
     this.messageEvent.emit(event);
     this.activeTableft = event
   }
  ngOnInit() {
  }

}
