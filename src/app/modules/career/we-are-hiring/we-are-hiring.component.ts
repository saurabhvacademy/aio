import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-we-are-hiring',
  templateUrl: './we-are-hiring.component.html',
  styleUrls: ['./we-are-hiring.component.scss']
})
export class WeAreHiringComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  routTo(rout) {
    this.router.navigate([rout]);
  }
  goToFresherJobs() {
    if (window.location.pathname == '/career') {
      window.open(window.location.href + "/fresher", "_self");
    }else if(window.location.pathname=='/careers'){
      window.open(window.location.origin+'/campushiring',"_self");
    }
  }

}
