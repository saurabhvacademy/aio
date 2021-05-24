import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-msg-after-sample',
  templateUrl: './msg-after-sample.component.html',
  styleUrls: ['./msg-after-sample.component.scss']
})
export class MsgAfterSampleComponent implements OnInit {
  @Input() content: any = {};

  constructor() { }

  ngOnInit(): void {
    console.log(this.content);
  }

}
