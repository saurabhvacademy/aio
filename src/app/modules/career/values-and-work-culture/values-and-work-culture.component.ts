import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../sharedData/shared-data.service';

@Component({
  selector: 'app-values-and-work-culture',
  templateUrl: './values-and-work-culture.component.html',
  styleUrls: ['./values-and-work-culture.component.scss']
})
export class ValuesAndWorkCultureComponent implements OnInit {
 // imageseltab = 1;
  endpoint: any;
  constructor(
    private sharedDataService: SharedDataService
  ) { }

  ngOnInit(): void {
    this.endpoint=this.sharedDataService.endpoint;

  }

}
