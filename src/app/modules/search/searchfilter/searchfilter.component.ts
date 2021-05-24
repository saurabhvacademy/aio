import { Component, OnInit, Input } from '@angular/core';
// import { searchFilter } from '../searchFilter.service';
import { InternalMessageService } from '../../../services/internal-message.service';
import { ConstantService } from './../../../services/constant.service';


@Component({
  selector: 'app-searchfilter',
  templateUrl: './searchfilter.component.html',
  styleUrls: ['./checkbox.css', './searchfilter.component.scss']
})
export class SearchfilterComponent implements OnInit {

  filterCoursePrice: number = 0;
  filterCourseValidity: number = 0;
  @Input() childValues: number = 0;

  theAllTab = { "all": false, "people": false, "pages": false, "pAll": false, "pQuestion": false, "pAttachment": false }
  thePageTab = { "Me": false, "Individual": false, "Oragization": false };
  thePeopleTab = { "all": false, "Connection": false, "Followers": false, "Following": false, };
  thePostTab = { "all": false, "people": false, "pages": false, "pAll": false, "pQuestion": false, "pAttachment": false }
  theCourseTab = { "all": false, "advance": false, "intermediate": false, "beginer": false };
  theCourseTabLevels = { "all": 4, "advance": 3, "intermediate": 2, "beginer": 1 };
  theCorPriceValidity = { "pall": false, "ppaid": false, "pfree": false };
  theCorValidity = { "vall": false, "vunlimited": false, "vlimiited": false };
  header: boolean;
  t: any;
  constructor(
    public searchFilterMessageEmit: InternalMessageService,
    public _constantService: ConstantService,

  ) { }

  ngOnInit() {
    this.t = this._constantService.getSessionDataBYKey('token');
    if(this.t){
        this.header=true;
    }
  }
  searchPriceClick(index) {
    this.filterCoursePrice = index;
  }
  searchValidityClick(index) {
    this.filterCourseValidity = index;
  }



  dataFromFilter(event, val) {
    window.scrollTo(0,0);
    let data = {};
    data['validity'] = '';
    data['level'] = '';
    data['course_type'] = '';
    data['filter_type'] = '';
    data['postedby'] = '';
    data['mypage'] = '';
    data['pgfiltertyp'] = '';
    data['usr_fl'] = '';

    //////////////////////////////////////////*****************for all tab*************/////////////////////////////////////////////
    if (this.childValues == 0) {
      if (event.target.id == "pAll" && this.theAllTab.all) {
        this.theAllTab.all = event.target.checked;
        this.theAllTab.people = false;
        this.theAllTab.pages = false;
      } else if (event.target.id == "pAll") {
        this.theAllTab.all = event.target.checked;
        this.theAllTab.people = true;
        this.theAllTab.pages = true;

      }
      if (event.target.id == "pPeople") {
        this.theAllTab.people = event.target.checked;
        if (this.theAllTab.all) {
          this.theAllTab.all = false;
        }
      }
      if (event.target.id == "ppages") {
        this.theAllTab.pages = event.target.checked;
        if (this.theAllTab.all) {
          this.theAllTab.all = false;
        }
      }

      if (this.theAllTab.people && this.theAllTab.pages) {
        this.theAllTab.all = true;
      }

      if (event.target.id == "postall" && this.theAllTab.pAll) {
        this.theAllTab.pAll = event.target.checked;
        this.theAllTab.pQuestion = false;
        this.theAllTab.pAttachment = false;
      } else if (event.target.id == "postall") {
        this.theAllTab.pAll = event.target.checked;
        this.theAllTab.pQuestion = true;
        this.theAllTab.pAttachment = true;

      }
      if (event.target.id == "postQuestion") {
        this.theAllTab.pQuestion = event.target.checked;
        if (this.theAllTab.pAll) {
          this.theAllTab.pAll = false;
        }
      }
      if (event.target.id == "pAttachment") {
        this.theAllTab.pAttachment = event.target.checked;
        if (this.theAllTab.pAll) {
          this.theAllTab.pAll = false;
        }
      }
      if (this.theAllTab.pQuestion && this.theAllTab.pAttachment) {
        this.theAllTab.pAll = true;
      }

      if (this.theAllTab.all == true) {
        data['postedby'] = '';

      } else if (this.theAllTab.people == true && this.theAllTab.pages != true) {
        data['postedby'] = 1;


      } else if (this.theAllTab.people != true && this.theAllTab.pages == true) {
        data['postedby'] = 2;

      }
      else if (this.theAllTab.people == true && this.theAllTab.pages == true) {
        data['postedby'] = '1,2';
      }
      if (this.theAllTab.pAll == true) {
        data['filter_type'] = '';

      } else if (this.theAllTab.pQuestion == true && this.theAllTab.pAttachment != true) {
        data['filter_type'] = 1;

      } else if (this.theAllTab.pQuestion != true && this.theAllTab.pAttachment == true) {
        data['filter_type'] = 2;
      }
      else if (this.theAllTab.pQuestion == true && this.theAllTab.pAttachment == true) {
        data['filter_type'] = '1,2';
      }
    }

    /////////////////////////////////////////////////***************for course tab//////////////////////////////////////////

    if (this.childValues == 1) {
      if (event.target.name == "postedbyfilter1") {
        for (var property in this.theCorPriceValidity) {
          if (this.theCorPriceValidity.hasOwnProperty(property)) {
            this.theCorPriceValidity[property] = false;
          }
        }
      }
      if (event.target.name == "postedbyfilter") {
        for (var property in this.theCorValidity) {
          if (this.theCorValidity.hasOwnProperty(property)) {
            this.theCorValidity[property] = false;
          }
        }
      }
      if (event.target.id == "CAll") {
        this.theCorPriceValidity.pall = event.target.checked;
      }
      if (event.target.id == "CPaid") {
        this.theCorPriceValidity.ppaid = event.target.checked;
      }
      if (event.target.id == "CFree") {
        this.theCorPriceValidity.pfree = event.target.checked;
      }
      if (event.target.id == "ValidityAll") {
        this.theCorValidity.vall = event.target.checked;
      }
      if (event.target.id == "ValidityUnlimited") {
        this.theCorValidity.vunlimited = event.target.checked;
      }
      if (event.target.id == "ValidityLimited") {
        this.theCorValidity.vlimiited = event.target.checked;
      }

      if (event.target.id == "CourseAll") {
        this.theCourseTab.all = event.target.checked;

      }
      if (event.target.id == "CourseAdv") {
        this.theCourseTab.advance = event.target.checked;

      }
      if (event.target.id == "CourseInt") {
        this.theCourseTab.intermediate = event.target.checked;
      }
      if (event.target.id == "CourseBeg") {
        this.theCourseTab.beginer = event.target.checked;
      }


      if (this.theCorValidity.vall == true) {
        data['validity'] = '';
      }
      if (this.theCorValidity.vunlimited == true) {
        data['validity'] = 0;
      }
      if (this.theCorValidity.vlimiited == true) {
        data['validity'] = 1;
      }

      if (this.theCorPriceValidity.pall == true) {
        data['course_type'] = '';
      }
      if (this.theCorPriceValidity.ppaid == true) {
        data['course_type'] = 1;
      }
      if (this.theCorPriceValidity.pfree == true) {
        data['course_type'] = 0;
      }



      data['level'] = this.getCourseDataLevel();

    }
    //////////////////////////////////////////////////////*********** for page tab *****************//////////////////////////////////// 

    if (this.childValues == 2) {
      if (event.target.id == "pageMe") {
        this.thePageTab.Me = event.target.checked;
      }
      if (event.target.id == "pgIndividual") {
        this.thePageTab.Individual = event.target.checked;
      }
      if (event.target.id == "pgOrganization") {
        this.thePageTab.Oragization = event.target.checked;
      }
      if (this.thePageTab.Me == true && this.thePageTab.Individual != true && this.thePageTab.Oragization != true) {
        data['mypage'] = 1;
      } else if (this.thePageTab.Me != true && this.thePageTab.Individual == true && this.thePageTab.Oragization != true) {
        data['pgfiltertyp'] = 0;
      } else if (this.thePageTab.Me != true && this.thePageTab.Individual != true && this.thePageTab.Oragization == true) {
        data['pgfiltertyp'] = 1;
      } else if (this.thePageTab.Me == true && this.thePageTab.Individual == true && this.thePageTab.Oragization != true) {
        data['mypage'] = 1;
        data['pgfiltertyp'] = 0;
      } else if (this.thePageTab.Me != true && this.thePageTab.Individual == true && this.thePageTab.Oragization == true) {
        data['pgfiltertyp'] = '0,1';
      } else if (this.thePageTab.Me == true && this.thePageTab.Individual != true && this.thePageTab.Oragization == true) {
        data['mypage'] = 1;
        data['pgfiltertyp'] = 1;
      } else if (this.thePageTab.Me == true && this.thePageTab.Individual == true && this.thePageTab.Oragization == true) {
        data['pgfiltertyp'] = '1,0,';
        data['mypage'] = 1;

      }
    }


    ////////////////////////////////////*************** for people tab************************////////////////////////////////////////

    if (this.childValues == 3) {
      for (var property in this.thePeopleTab) {
        if (this.thePeopleTab.hasOwnProperty(property)) {
          this.thePeopleTab[property] = false;
        }
      }
      if (event.target.id == "allPeople") {
        this.thePeopleTab.all = event.target.checked;

      }
      if (event.target.id == "ConnectionPeople") {
        this.thePeopleTab.Connection = event.target.checked;
      }
      if (event.target.id == "followerspeople") {
        this.thePeopleTab.Followers = event.target.checked;
      }
      if (event.target.id == "followinghPeople") {
        this.thePeopleTab.Following = event.target.checked;
      }

      if (this.thePeopleTab.all == true) {
        data['usr_fl'] = '';
      }
      else if (this.thePeopleTab.Connection == true) {
        data['usr_fl'] = 1;
      }
      else if (this.thePeopleTab.Followers == true) {
        data['usr_fl'] = 2;
      }
      else if (this.thePeopleTab.Following == true) {
        data['usr_fl'] = 3;
      }

    }

    /////////////////////////////////////////***************************** for post tab ***********************////////////////////////////////////

    if (this.childValues == 4) {
      if (event.target.id == "pAll" && this.theAllTab.all) {
        this.theAllTab.all = event.target.checked;
        this.theAllTab.people = false;
        this.theAllTab.pages = false;
      } else if (event.target.id == "pAll") {
        this.theAllTab.all = event.target.checked;
        this.theAllTab.people = true;
        this.theAllTab.pages = true;

      }
      if (event.target.id == "pPeople") {
        this.theAllTab.people = event.target.checked;
        if (this.theAllTab.all) {
          this.theAllTab.all = false;
        }
      }
      if (event.target.id == "ppages") {
        this.theAllTab.pages = event.target.checked;
        if (this.theAllTab.all) {
          this.theAllTab.all = false;
        }
      }

      if (this.theAllTab.people && this.theAllTab.pages) {
        this.theAllTab.all = true;
      }

      if (event.target.id == "postall" && this.theAllTab.pAll) {
        this.theAllTab.pAll = event.target.checked;
        this.theAllTab.pQuestion = false;
        this.theAllTab.pAttachment = false;
      } else if (event.target.id == "postall") {
        this.theAllTab.pAll = event.target.checked;
        this.theAllTab.pQuestion = true;
        this.theAllTab.pAttachment = true;

      }
      if (event.target.id == "postQuestion") {
        this.theAllTab.pQuestion = event.target.checked;
        if (this.theAllTab.pAll) {
          this.theAllTab.pAll = false;
        }
      }
      if (event.target.id == "pAttachment") {
        this.theAllTab.pAttachment = event.target.checked;
        if (this.theAllTab.pAll) {
          this.theAllTab.pAll = false;
        }
      }
      if (this.theAllTab.pQuestion && this.theAllTab.pAttachment) {
        this.theAllTab.pAll = true;
      }
      if (this.theAllTab.all == true) {
        data['postedby'] = '';

      } else if (this.theAllTab.people == true && this.theAllTab.pages != true) {
        data['postedby'] = 1;

      } else if (this.theAllTab.people != true && this.theAllTab.pages == true) {
        data['postedby'] = 2;
      }
      else if (this.theAllTab.people == true && this.theAllTab.pages == true) {
        data['postedby'] = '1,2';
      }
      if (this.theAllTab.pAll == true) {
        data['filter_type'] = '';

      } else if (this.theAllTab.pQuestion == true && this.theAllTab.pAttachment != true) {
        data['filter_type'] = 1;

      } else if (this.theAllTab.pQuestion != true && this.theAllTab.pAttachment == true) {
        data['filter_type'] = 2;
      }
      else if (this.theAllTab.pQuestion == true && this.theAllTab.pAttachment == true) {
        data['filter_type'] = '1,2';
      }
    }
    this.searchFilterMessageEmit.setMessage(data);

  }
  clearFilter() {
    let data = {};
    data['validity'] = '';
    data['level'] = '';
    data['course_type'] = '';
    data['filter_type'] = '';
    data['postedby'] = '';
    data['mypage'] = '';
    data['pgfiltertyp'] = '';
    data['usr_fl'] = '';
    if (this.childValues == 0) {
      Object.keys(this.theAllTab).forEach(v => this.theAllTab[v] = false);

    }
    if (this.childValues == 1 || this.childValues == 0) {
      Object.keys(this.theCourseTab).forEach(v => this.theCourseTab[v] = false);
      Object.keys(this.theCorPriceValidity).forEach(v => this.theCorPriceValidity[v] = false);
      Object.keys(this.theCorValidity).forEach(v => this.theCorValidity[v] = false);

    }
    if (this.childValues == 2 || this.childValues == 0) {
      Object.keys(this.thePageTab).forEach(v => this.thePageTab[v] = false);

    }
    if (this.childValues == 3 || this.childValues == 0) {
      Object.keys(this.thePeopleTab).forEach(v => this.thePeopleTab[v] = false);

    }
    if (this.childValues == 4) {
      Object.keys(this.theAllTab).forEach(v => this.theAllTab[v] = false);

    }
    this.searchFilterMessageEmit.setMessage(data);

  }
  getCourseDataLevel() {
    var courseDataLevel = '';
    for (var key in this.theCourseTab) {
      if (this.theCourseTab[key]) {
        if (!courseDataLevel) {
          courseDataLevel = courseDataLevel + this.theCourseTabLevels[key];
        }
        else {
          courseDataLevel = courseDataLevel + ',' + this.theCourseTabLevels[key];
        }
      }
    }
    return courseDataLevel;
  }

}
