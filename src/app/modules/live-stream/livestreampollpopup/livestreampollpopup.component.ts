import { Component, OnInit } from '@angular/core';
import {Chart} from 'angular-highcharts';

@Component({
  selector: 'app-livestreampollpopup',
  templateUrl: './livestreampollpopup.component.html',
  styleUrls: ['./livestreampollpopup.component.scss','./../../../sharedComponents/addpost/addpost.component.scss']
})
export class LivestreampollpopupComponent implements OnInit {
  livestreamTab: number = 1;
  remaindershow: boolean = false;
  walldropdown: boolean = false;
  walldrop: boolean = false;
  AllCourse: any[];
  AllMyCourse: any[];
  flag = 1;
  order: string = '';
  countAllCourse: number = 1;
  // visibilityText: string = "Filters";
  visibilityfilter: string = "Create Poll";
  corsTyp:number=0;
  quesactive:number = -1;
  published: boolean = false;
  config:any;

  public chart = new Chart({
      chart: {
          type: 'pie',
          plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
        renderTo: 'container'
      },
      // title: {
      //     text: ''
      // },
      title: {
          text: 'Browser<br>shares<br>2017',
          // align: 'center',
          verticalAlign: 'middle',
          floating: true,
          // y: 40,
      },
      tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
      plotOptions: {
              pie: {
                  dataLabels: {
                      enabled: false,
                      // distance: -50,
                      style: {
                          fontWeight: 'bold',
                          color: 'black'
                      }
                  },
                  startAngle: 0,
                  endAngle: 360,
                  center: ['50%', '25%'],
                  size: '60%'
              },
              series: {
                 states: {
                     hover: {
                         enabled: false
                     }
                 }
             },
          },
      credits: {
              enabled: false
          },
      series: [
          {
              name: 'Poll',
              data: [
                {y:5, color:"#ff6262"},
                {y:2, color:"#ffcaca"},
                {y:3, color:"#feb1b1"},
                {y:4, color:"#ff8b8b"},
                ],
              innerSize: '85%',
          }
      ]
  } as any);
  constructor() { }
  livestreamTabUrlFxn(index) {
    this.livestreamTab = index;
  }
  showdrop(){
    this.remaindershow = !this.remaindershow;
  }
  // closewalldropdown() {
  //     this.walldropdown = false;
  // }
  // showwalldropdown() {
  //     this.walldropdown = !this.walldropdown;
  //     if (this.walldropdown == false) {
  //         this.closewalldropdown();
  //     }
  // }
  onactive(index) {
      this.quesactive = index;
  }
  closewalldrop() {
      this.walldrop = false;
  }
  showwalldrop() {
      this.walldrop = !this.walldrop;
      if (this.walldrop == false) {
          this.closewalldrop();
      }
  }
  // changeVisibility(id) {
  //     this.walldropdown = !this.walldropdown;
  //     this.AllCourse = [];
  //     this.AllMyCourse = [];
  //     this.countAllCourse = 1;
  //     this.flag = 1;
  //     // visibilityText: string = "Sort by";
  //     // visibilityfilter: string = "Filter";
  //     if (id == 2) {
  //         this.visibilityText = 'A-Z';
  //         //this.visibilityTyp = 2;
  //         this.order = 'atoz';
  //
  //     } else if (id == 3) {
  //         this.visibilityText = 'Z-A';
  //         // this.visibilityTyp = 1;
  //         this.order = 'ztoa';
  //
  //     }
  //     // this.getAllCourseDetailProfile();
  // }
  onPublished(){
    this.published = true;
  }
  noPublished(){
    this.published = false;
  }
  changeVisibilitySort(id) {
      this.walldrop = !this.walldrop;
      this.countAllCourse = 1;
      this.flag = 1;
      this.AllCourse = [];
      this.AllMyCourse = [];
      // if (id == 3) {
      //     this.visibilityfilter = 'All';
      //     //this.visibilityTyp = 3;
      //     this.corsTyp = '';
      // } else
      if (id == 2) {
          this.visibilityfilter = 'New Poll';
          //this.visibilityTyp = 2;
          this.corsTyp = 0;
      } else if (id == 1) {
          this.visibilityfilter = 'Recent Poll';
          //this.visibilityTyp = 1;
          this.corsTyp = 1;

      }
      // this.getAllCourseDetailProfile();
  }
  ngOnInit() {
  }

}
