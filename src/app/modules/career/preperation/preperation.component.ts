import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preperation',
  templateUrl: './preperation.component.html',
  styleUrls: ['./../why-join-study/why-join-study.component.scss', './preperation.component.scss']
})
export class PreperationComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  routTo(rout){
    this.router.navigate([rout]);
  }

}
