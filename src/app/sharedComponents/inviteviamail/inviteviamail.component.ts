import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inviteviamail',
  templateUrl: './inviteviamail.component.html',
  styleUrls: ['./inviteviamail.component.scss']
})
export class InviteviamailComponent implements OnInit {
  config:any;
  maillist:boolean=false;
  invite_container:boolean=true;
  constructor() { }
  showmaillist(){
    this.maillist=true;
    this.invite_container=false

  }
  ngOnInit() {
  }

}
