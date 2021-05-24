import { Component, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-documentviewer',
  templateUrl: './documentviewer.component.html',
  styleUrls: ['./documentviewer.component.scss']
})
export class DocumentviewerComponent implements OnInit {
@Output() closeDocViewEvent = new EventEmitter<boolean>();
closeDocumentView(){
  this.closeDocViewEvent.emit(false);
}
  constructor() { }

  ngOnInit() {
  }

}
