import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-linkloginpopup',
  templateUrl: './linkloginpopup.component.html',
  styleUrls: ['./linkloginpopup.component.scss','./../login.component.scss']
})
export class LinkloginpopupComponent implements OnInit {
 login_container:boolean=true;
 sighup_container:boolean=false;
 paaceholde:string="Enter the Email or Mobile";
 forgotpassword:number=0;
 showloginpopup:boolean=true;
showPreloader:boolean = false;
  constructor() { }

  ngOnInit() {

  }
  open_signupform(){
    this.login_container=true;
    this.sighup_container=false;
  }
  open_loginform(){
    this.forgotpassword=0;
    this.sighup_container=true;
    this.login_container=false;
  }

  close_signupform(){
    this.sighup_container=false;
  }
  close_loginform(){
    this.login_container=false;
  }
  chengeplaceholder(index){
    if(index==1){
      this.paaceholde="Mobile";
    }
    else if(index==2){
      this.paaceholde="Email";
    }

  }
  forgetpasscont(index){
      this.forgotpassword=index;

  }

    showpopup(index){
      if(index==1){
      this.showloginpopup=true;
      this.login_container=true;
      this.sighup_container=false;
      }
      else if(index==2){
      this.sighup_container=true;
      this.showloginpopup=true;
      this.login_container=false;
      }
      let body = document.getElementsByTagName('body')[0];
      body.classList.add("body-overflow");
    }
    hidepopup(){
      this.showloginpopup=false;
      let body = document.getElementsByTagName('body')[0];
      body.classList.remove("body-overflow");
    }

}
