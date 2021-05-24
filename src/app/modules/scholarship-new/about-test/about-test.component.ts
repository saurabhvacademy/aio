import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-about-test',
  templateUrl: './about-test.component.html',
  styleUrls: ['../scholarship.component.scss']
})
export class AboutTestComponent implements OnInit {
  endpoint: any = '';

  constructor(
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.endpoint = params['id'];

      }
    });

  }



}
