import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-browsetest',
  templateUrl: './browsetest.component.html',
  styleUrls: [ './browsetest.component.scss']
})
export class BrowsetestComponent implements OnInit {
openHideIntersePopUp:boolean = false;
  endPoint: any;
  browsemessage:boolean = false;
  @Output() messageEvent = new EventEmitter<boolean>();
  constructor(
    public _router: Router,
    private activatedRoute: ActivatedRoute,


  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.endPoint=params['id'];
      }
  });
  }
  interestPopUp() {
    this.openHideIntersePopUp = true;

  }
  redirectTo(pathname) {
    setTimeout(() => {
     this.messageEvent.emit(this.browsemessage);      
    }, 200);
    var endPoint;
    if (pathname == 'scholarship') {
      this._router.navigate(['/scholarship/scholarship']);
    }
    if (pathname == 'nat') {
      this._router.navigate(['/scholarship/nat']);
    }
    if (pathname == 'ntt') {
      this._router.navigate(['/scholarship/ntt']);
    }

    window.scrollTo(0,0);
  }

}
