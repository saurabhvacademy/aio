import { Component, OnInit, ViewChild } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantService } from 'src/app/services/constant.service';
import { HeaderComponent } from 'src/app/sharedComponents/header/header.component';
import { SharedDataService } from './sharedData/shared-data.service';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./careerregistration/careerregistration.component.scss', './career.component.scss']
})
export class CareerComponent implements OnInit {
  isLoggedIn: boolean;
  showRegistrationForm: boolean = false;
  showConfirmation: boolean;
  endpoint: string;
  showFresherJobs = true;
  testDetails: any = {};
  @ViewChild('headerComponent') headerComponent: HeaderComponent;

  constructor(
    private _constantService: ConstantService,
    private _router: Router,
    private activatedRoute: ActivatedRoute,
    private sharedDataService: SharedDataService,
    private _titleService: Title,
    private _metaTagService: Meta
  ) {
    if (this._constantService.getSessionDataBYKey('token')) {
      console.log(this._constantService.getSessionDataBYKey('token'))
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
      localStorage.setItem('rfc', 'career');
      this._constantService.setSessionJsonPair('publicClickedURL', window.location.href);
    }
    if (window.location.pathname == '/careers') {
      this.endpoint == 'jobs';
      this.sharedDataService.endpoint = 'jobs';
    } else if (window.location.pathname == '/campushiring') {
      this.endpoint == 'fresher';
      this.sharedDataService.endpoint = 'fresher';
    }

  }

  ngOnInit(): void {

    if (this.isLoggedIn && !this._constantService.getSessionDataBYKey('p_pic')) {
      this.getUserDetail()
    }
    window.scrollTo(0, 0);
    if (window.location.pathname == '/careers') {
      this.endpoint = 'jobs';
      this.sharedDataService.endpoint = 'jobs';
    } else if (window.location.pathname == '/campushiring') {
      this.endpoint = 'fresher';
      this.sharedDataService.endpoint = 'fresher';
    } else if (window.location.pathname == '/career' || window.location.pathname == '/career/fresher') {
      this.activatedRoute.queryParams.subscribe(queryParams => {
        console.log("QUERY-PARAMS:", queryParams)
        if (queryParams.testing == '123') {
          this.showRegistrationForm = true;
        }
      });
      this.activatedRoute.params.subscribe(params => {
        console.log("PARAMS:", params)
        if (params['id']) {
          if (params['id'] != 'fresher') {
            this._router.navigate(["404"]);
            return;
          }
          this.endpoint = params['id'];
          this.sharedDataService.endpoint = this.endpoint;
          this._titleService.setTitle("Careers For Freshers At Study24x7 - Check for latest career options");
          this._metaTagService.updateTag(
            { name: 'description', content: 'Are you a fresher looking to kickstart your career? Check all the career options  at  Study24x7, India’s 1st Social Learning Network. Join our community and make learning & teaching easy.' }
          );
        } else {
          this._titleService.setTitle("Careers at Study24x7 - Check for latest career options");
          this._metaTagService.updateTag(
            { name: 'description', content: 'Check out the career options available at Study24x7, India’s 1st Social Learning Network. Join our community and make learning & teaching easy.' }
          );
          this.endpoint = 'jobs';
          this.sharedDataService.endpoint = this.endpoint
        }
      });
    } else {
      this._router.navigate(['400'])
    }
    var root = document.getElementsByTagName('html')[0];
    root.classList.add("smoothslide");
  }
  getUserDetail() {
    var user_details = {};
    user_details['token'] = this._constantService.getSessionDataBYKey('token');
    user_details['token_param'] = {};
    user_details['token_param']['device_type'] = "w";
    user_details['token_param']['host'] = '';
    user_details['myprofile'] = 'yes';
    user_details['username'] = '';



    this._constantService.fetchDataApi(this._constantService.getUserDetailsServiceUrl(), user_details).subscribe(data => {
      var responseData: any = data;
      var status = responseData.STATUS;
      var date = new Date();
      if (status == this._constantService.success_msg) {
        this._constantService.setSessionJsonPair('full_name', responseData.FULL_NAME);
        this._constantService.setSessionJsonPair('u_id', responseData.USER_ID);
        this._constantService.setSessionJsonPair('username', responseData.USER_NAME.trim());
        this._constantService.setSummary(responseData.SUMMARY);
        this._constantService.setSessionJsonPair('connection', responseData.CONNECTIONS);
        this._constantService.setSessionJsonPair('followers', responseData.FOLLOWER);
        this._constantService.setSessionJsonPair('followings', responseData.FOLLOWING);
        this._constantService.setSessionJsonPair('profile_pic_s3', responseData.PROFILE_PHOTO_PATH);
        this._constantService.setSessionJsonPair('dob', responseData.DOB);
        this._constantService.setSessionJsonPair('gender', responseData.GENDER);
        if (responseData.PROFILE_PHOTO_PATH)
          this._constantService.setSessionJsonPair('p_pic', responseData.PROFILE_PHOTO_PATH + "profile/" + this._constantService.getSessionDataBYKey('u_id') + "_60x60.png?v=" + date.getTime());

      }
    });
  }

  routTo(rout) {
    this._router.navigate([rout]);
  }

  updateProfileImageInHeader(event) {
    if (event) {
      this.headerComponent.ngOnInit();

    }
  }

}
