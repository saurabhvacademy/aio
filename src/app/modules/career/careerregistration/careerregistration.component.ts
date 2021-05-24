import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConstantService } from 'src/app/services/constant.service';
import { EncryptionService } from 'src/app/services/encryption.service';
import { PostdataService } from 'src/app/services/postdata.service';
import { SharedDataService } from '../sharedData/shared-data.service';

@Component({
  selector: 'app-careerregistration',
  templateUrl: './careerregistration.component.html',
  styleUrls: ['./../ripple.css', './careerregistration.component.scss']
})
export class CareerregistrationComponent implements OnInit {
  years: any = [];
  qualificationsList: any = [];
  city: any = { id: '', name: 'Select City' };

  @Output() profileImageUpdateEmitter = new EventEmitter<any>()
  submittingForm: boolean;
  detailsForm: {
    summary: string,
    experiences: [
      {
        college: {
          name: string,
          id: string
        },
        degree: {
          name: string,
          id: string
        },
        fromMonth: string,
        fromYear: string,
        toMonth: string,
        toYear: string,
        gradingSystem: string,
        gradeMarks: string,
        eduid: string,
        summary: string,
        expType: string,
        error: any,
        branchName: string,
        saved: boolean

      }
    ]
  } = {
      summary: '',
      experiences: [
        {
          college: {
            name: '',
            id: '0'
          },
          degree: {
            name: '',
            id: '0'
          },
          fromMonth: '',
          fromYear: '',
          toMonth: '',
          toYear: '',
          gradingSystem: '',
          gradeMarks: '',
          eduid: '0',
          summary: '',
          expType: '',
          error: {},
          branchName: '',
          saved: false

        }
      ]
    }
  experience: {
    college: {
      name: string,
      id: string
    },
    degree: string,
    fromMonth: string,
    fromYear: string,
    toMonth: string,
    toYear: string,
    gradingSystem: string,
    gradeMarks: string
  }
  profileImage: any;
  userName: string;
  searchedInsArr: any[];
  searchInstList: number = -1;
  continueScroll: boolean;
  count: number;
  courseArr: any;
  searchedCouArr: any[];
  searchListCou: any = -1;
  testType: any;
  showForm: boolean;
  dob: any = '';
  gender: any = '';
  @Output() emitRegstrationSuccessful = new EventEmitter<any>();
  error: any = {};
  profilePic: boolean;
  profilePicPath: string = this._constantService.profilePic();
  profilePicPathOrg: string;
  CommentPPath: any;
  dataopen: boolean;
  userSummary: any = this._postDataService.decodeURIPostData(this._constantService.getSummary());
  profileImagePathExist: boolean = true;
  maxDate = this._constantService.getDateFromMilliseconds('yyyy-mm-dd', new Date().getTime());
  minDate = '';
  errorMessage: any;
  openConfirmation: boolean;
  dataConf: any = {};
  states: any = [{ STATE_ID: '', STATE_NAEM: 'Select State' }];
  stateVsIds: any;
  cities: any = [];
  cityId: any = '';
  stateId: any = '';
  continueCourseScroll: any = true;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private _constantService: ConstantService,
    private _postDataService: PostdataService,
    public _encryptionService: EncryptionService,
    private _sharedDataService: SharedDataService,
    private _changeDetector: ChangeDetectorRef

  ) { }

  ngOnInit(): void {
    this.setQulificationsList();
    if (this.userSummary == 'null' || this.userSummary == null || !this.userSummary)
      this.userSummary = '';
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    year = year - 30;
    this.minDate = year + '-' + month + '-' + day;
    year = today.getFullYear() - 10;
    this.maxDate = year + '-' + month + '-' + day;

    var dob = this._constantService.getSessionDataBYKey('dob');
    var gender = this._constantService.getSessionDataBYKey('gender');
    if (dob && dob != null) {
      this.dob = dob;
    }
    if (gender) {
      if (gender == 1)
        this.gender = 'M';
      if (gender == 2)
        this.gender = 'F';

    }
    window.scrollTo(0, 0);
    this.getUserEducationDetails()
    this.profileImage = this._constantService.profilePic();
    this.userName = this._constantService.getSessionDataBYKey('full_name')
    this.generateYearsList();
    this.detailsForm.summary = '';

    setTimeout(() => {
      var data = {};
      data['conid'] = 1;

      this._constantService.fetchDataApi(this._constantService.getStateServiceUrl(), data).subscribe(data => {
        var responseData: any = data;
        var status = responseData.STATUS;
        if (status == this._constantService.success_msg) {
          this.states = responseData.STATE_ID;
        }
      }, error => {
        this.dataConf['type'] = 2;
        this.dataConf['msg'] = 'STUDY24X7';
        this.dataConf['error_msg'] = 'Something went wrong ';
        this.openConfirmation = true;

      });

    }, 500);



  }

  changeCity(event) {
    if (event.target.value == '') {
      this.cities = [];
      this.city = { id: '', name: '' };
    } else {
      this.getCities(event.target.value);
    }
  }
  setCity(event) {
    if (event.target.value == '') {
      this.city = { id: '', name: '' };
    } else {
      this.city.id = event.target.value;
      this.cities.forEach(element => {
        if (element.CITY_ID == this.city.id) {
          this.city.name = element.CITY_NAME;
        }

      });
    }
  }
  getCities(stateId) {
    var data = {};
    data['stid'] = stateId;
    this._constantService.fetchDataApi(this._constantService.getCityServiceUrl(), data).subscribe(data => {
      var responseData: any = data;
      var status = responseData.STATUS;
      if (status == this._constantService.success_msg) {
        if (this.city.name) {
          this.city = { name: 'Select City', id: '' };
        } else if (!this.city.name && this.city.id) {
          responseData.CITY_ID.forEach(element => {
            if (element.CITY_ID == this.city.id) {
              this.city.name = element.CITY_NAME;
            }
          });
        }
        this.cities = responseData.CITY_ID;

      }

    });

  }

  setQulificationsList() {
    this.qualificationsList = [{
      value: '0', key: 'Class 10th', disabled: false
    },
    {
      value: '1', key: 'Class 12th', disabled: false
    },
    {
      value: '2', key: 'Graduation', disabled: false
    },
    {
      value: '3', key: 'Post Graduation', disabled: false
    }
    ]
    // for (var i = 0; i < this.detailsForm.experiences.length; i++) {
    //   if (this.detailsForm.experiences[i].expType) {
    //     this.qualificationsList[this.detailsForm.experiences[i].expType].disabled=true;
    //   }
    // }
  }
  showOrganisation(i, exp, type) {

    this.count = 1;
    if (exp == 'college' && (type == 3 || type == 4)) {
      if (this.detailsForm.experiences[i].college.name != '') {
        this.detailsForm.experiences[i].college.id = '0';
        this.getSolarSrchInst(1, i, exp);
      }
    } else {
      this.searchedInsArr = [];
    }

  }

  getSolarSrchInst(count, i, exp) {
    var searchIns = {};
    searchIns['token'] = this._constantService.getSessionDataBYKey('token');
    searchIns['token_param'] = {};
    searchIns['token_param']['device_type'] = 'w';
    searchIns['token_param']['host'] = '';
    searchIns['sdt'] = this.detailsForm.experiences[i].college.name;
    searchIns['count'] = count;

    this._constantService.fetchDataApi(this._constantService.getSolarSrchInsServiceUrl(), searchIns).subscribe(data => {
      var responseData: any = data;
      if (responseData.STATUS == this._constantService.success_msg) {
        if (count == 1) {
          this.searchedInsArr = [];
        }
        this.searchInstList = i + exp;
        //                if(responseData.SEARCHED_TEXT.length!=0){
        //
        //                }
        if (responseData.SEARCHED_TEXT.length < 10) {
          this.continueScroll = false;
        } else {
          this.count += 1;
          this.continueScroll = true;
        }
        this.searchedInsArr.push.apply(this.searchedInsArr, responseData.SEARCHED_TEXT);
      }
    });
  }

  onScrollDown(i, exp) {
    if (this.continueScroll) {
      this.getSolarSrchInst(this.count, i, exp);
    }

  }

  onScrollDownCourse(i, exp) {
    if (this.continueCourseScroll) {
      this.getSolarSrchCour(this.count, i, exp)
    }
  }

  generateYearsList() {
    const fromyear: number = new Date().getFullYear() - 15;
    const toyear = new Date().getFullYear() + 1;
    const arrNum = [];
    for (var i = toyear; i > fromyear; i--) {
      this.years.push(i);
    }
  }

  removeExperience(i) {
    if (this.detailsForm.experiences.length >= 2)

      this.detailsForm.experiences.splice(i, 1);
  }

  addCollegeExperience(i) {
    var experience = {
      college: { name: '', id: '' },
      degree: {
        name: '',
        id: ''
      },
      fromMonth: '',
      fromYear: '',
      gradeMarks: '',
      gradingSystem: '',
      toMonth: '',
      toYear: '',
      eduid: '0',
      summary: '',
      expType: '',
      error: {},
      branchName: '',
      saved: false


    }
    if (this.detailsForm.experiences.length < 4) {
      // this.detailsForm.experiences.splice(i + 1, 0, experience);
      this.detailsForm.experiences.push(experience);
    }

  }

  addMatriculationExperience(i) {
    var experience = {
      school: { name: '', id: '' },
      degree: {
        name: '',
        id: ''
      },
      fromMonth: '',
      fromYear: '',
      gradeMarks: '',
      gradingSystem: '',
      toMonth: '',
      toYear: '',
      eduid: '0',
      summary: '',
      expType: '0',
      error: {},
      saved: false


    }


  }

  setOrganization(i, name, id, exp) {
    if (exp == 'college') {
      this.detailsForm.experiences[i].college.name = name;
      this.detailsForm.experiences[i].college.id = id;
    }

    this.count = 1;
    this.searchInstList = -1;
  }

  closelist() {
    setTimeout(() => {
      this.searchInstList = -1;
      this.count = 1;
      this.searchedInsArr = [];
    }, 1000);

  }
  getList() {
    this._constantService.fetchDataApiWithoutBody(this._constantService.getCourseServiceUrl()).subscribe(data => {
      //this.register_re:any = data;
      let responseData: any = data;
      this.courseArr = responseData.COURS_LIST;
      var other = { 'COURSE_ID': 'others', 'COURSE_NAME': 'Others' };
      this.courseArr.push(other);
    });
  }

  showCourse(i, exp, type) {
    this.count = 1;
    if (exp == 'college' && (type == 3 || type == 4)) {
      if (this.detailsForm.experiences[i].degree.name != '') {
        this.detailsForm.experiences[i].degree.id = '0';
      }
    } else {
      this.searchedCouArr = [];
    }

    this.getSolarSrchCour(1, i, exp);

  }

  getSolarSrchCour(count, i, exp) {
    var searchIns = {};
    searchIns['token'] = this._constantService.getSessionDataBYKey('token');
    searchIns['token_param'] = {};
    searchIns['token_param']['device_type'] = 'w';
    searchIns['token_param']['host'] = '';
    searchIns['sdt'] = this.detailsForm.experiences[i].degree.name;
    searchIns['count'] = count;

    this._constantService.fetchDataApi(this._constantService.getSolarSrchCouServiceUrl(), searchIns).subscribe(data => {
      var responseData: any = data;
      if (responseData.STATUS == this._constantService.success_msg) {
        if (count == 1) {
          this.searchedCouArr = [];
        }
        this.searchListCou = i + exp;
        if (responseData.SEARCHED_TEXT.length < 10) {
          this.continueCourseScroll = false;
        } else {
          this.count += 1;
          this.continueCourseScroll = true;
        }
        this.searchedCouArr.push.apply(this.searchedCouArr, responseData.SEARCHED_TEXT);
      } else if (responseData.STATUS == 'error') {

      }
    }, error => {
      this.dataConf['type'] = 2;
      this.dataConf['msg'] = 'STUDY24X7';
      this.dataConf['error_msg'] = 'Something went wrong ';
      this.openConfirmation = true;

    });
  }
  setCourse(i, name, id, exp) {
    if (exp == 'college') {
      this.detailsForm.experiences[i].degree.name = name;
      this.detailsForm.experiences[i].degree.id = id;
    }

    this.searchListCou = -1;
    this.count = 1;

  }

  getUserEducationDetails() {
    var userEdu = {};
    userEdu['token'] = this._constantService.getSessionDataBYKey('token');
    userEdu['token_param'] = {};
    userEdu['token_param']['device_type'] = 'w';
    userEdu['token_param']['host'] = '';

    userEdu['username'] = this._constantService.getSessionDataBYKey('username');

    userEdu['myprofile'] = 'yes';

    this._constantService.fetchDataApi(this._constantService.getUserEduDetailsServiceUrl(), userEdu).subscribe(data => {
      // this.register_re = data["_body"];
      // let responseData = JSON.parse(this.register_re);
      var responseData: any = data;
      var status = responseData.STATUS;
      var experiences: any = [];
      var metriculationExperiences: any = [];
      if (status == this._constantService.success_msg) {
        this.dob = responseData.DOB;
        this.gender = (responseData.GENDER == '1') ? 'M' : (responseData.GENDER == '2' ? 'F' : '');
        this.userSummary = this._postDataService.decodeURIPostData(responseData.SUMMARY);
        this.stateId = responseData.STATE_ID == null ? '' : responseData.STATE_ID;
        this.city.id = responseData.CITY_ID;
        this.getCities(this.stateId);
        if (responseData.USER_QUAL.length > 0) {
          for (var i = 0; i < responseData.USER_QUAL.length; i++) {
            var fromArr = responseData.USER_QUAL[i].FROM.split('-');
            var toArr = responseData.USER_QUAL[i].TO.split('-');
            var experience: any = {
              degree: {
                name: this._postDataService.decodeURIPostData(responseData.USER_QUAL[i].COURSE),
                id: responseData.USER_QUAL[i].COURSE_ID
              },
              fromMonth: fromArr[1],
              fromYear: fromArr[0],
              toMonth: toArr[1],
              toYear: toArr[0],
              gradingSystem: responseData.USER_QUAL[i].GRADE_TYPE,
              gradeMarks: responseData.USER_QUAL[i].GRADES,
              eduid: responseData.USER_QUAL[i].USER_EDUCATION_ID,
              summary: this._postDataService.decodeURIPostData(responseData.USER_QUAL[i].SUMMARY),
              expType: responseData.USER_QUAL[i].QUAL_TYPE,
              saved: false,
              error: {}
            }

            experience['college'] = {
              name: this._postDataService.decodeURIPostData(responseData.USER_QUAL[i].INSTITUTE),
              id: responseData.USER_QUAL[i].INSTITUTE_ID
            };
            experience['branchName'] = this._postDataService.decodeURIPostData(responseData.USER_QUAL[i].BRANCH_NAME);
            experiences.push(experience);

          }



          if (experiences.length > 0) {
            this.detailsForm.experiences = experiences;
          }


        }
      } else if (responseData.STATUS == 'error') {
        this.errorMessage = responseData.ERROR_MSG;
        this.dataConf['type'] = 2;
        this.dataConf['msg'] = 'STUDY24X7';
        this.dataConf['error_msg'] = this.errorMessage;
        this.openConfirmation = true;
      }
    }, error => {
      this.dataConf['type'] = 2;
      this.dataConf['msg'] = 'STUDY24X7';
      this.dataConf['error_msg'] = 'Something went wrong';
      this.openConfirmation = true;

    });
  }

  checkAndRegisterForCareer() {


    this.registerForCareerTest();
  }
  startFormSubmission() {
    this.submittingForm = true;
    setTimeout(() => {
      document.getElementsByClassName('alert_msg')[0].parentElement.parentElement.scrollIntoView();
    }, 500);

    if (!this.userSummary) {
      this.error['summary'] = true;
      this.error.val = 'Please summarize your experience and profession in brief';
      this.submittingForm = false;
      return
    } else {
      this.error['summary'] = false;
      this.error.val = ''
    }
    if (!this.dob) {
      this.error.dob = true;
      this.error.val = 'Please enter date of birth'
      this.submittingForm = false;
      return
    } else {
      this.error.dob = false;
    }
    if (!this.gender) {
      this.error.gender = true;
      this.error.val = 'Please select gender'
      this.submittingForm = false;
      return
    } else {
      this.error.gender = false;
    }
    if (!this.city.name) {
      this.error.city = true;
      this.error.val = 'Please select city'
      this.submittingForm = false;
      return
    } else {
      this.error.city = false;
    }
    if (this.userSummary) {
      this.updateGeneralInfo();
      this.error.summary = false;
    }


  }

  submitForm(): any {
    var educationsArray: any = [];
    this.detailsForm.experiences.forEach(exp => {

      if (!this.city.name) {
        this.error['city'] = true;
        this.error.val = 'please enter your city';
        this.submittingForm = false;
        return false;
      } else {
        this.error['city'] = false;
        this.error.val = '';

      }
      if (exp.expType != '0' && !exp.expType) {
        exp.error['expType'] = true;
        exp.error.val = 'Please select a qualification';
        this.submittingForm = false;
        return false;

      } else {
        exp.error['expType'] = false;
        exp.error.val = '';
      }
      if (!exp.college.name) {
        exp.error['collegeName'] = true;
        exp.error.val = 'Please enter a institute name.';
        this.submittingForm = false;
        return false;
      } else {
        exp.error['collegeName'] = false;
        exp.error.val = '';
      }
      if (!exp.degree.name) {
        exp.error['degreeName'] = true;
        exp.error.val = 'Please enter a course name.';
        this.submittingForm = false;
        return false;
      } else {
        exp.error['degreeName'] = false;
        exp.error.val = '';
      }
      if ((exp.expType == '3' || exp.expType == '4') && !exp.branchName) {
        exp.error['branchName'] = true;
        exp.error.val = 'Please enter your branch or stream';
        this.submittingForm = false;
        return false;
      } else {
        exp.error['branchName'] = false;
        exp.error.val = '';
      }
      if (!exp.toMonth) {
        exp.error['date'] = true;
        exp.error.val = 'Please select to Month.';
        this.submittingForm = false;
        return false;
      } else {
        exp.error['date'] = false;
        exp.error.val = '';
      }
      if (!exp.toYear) {
        exp.error['date'] = true;
        exp.error.val = 'Please select to Year.';
        this.submittingForm = false;
        return false;
      } else {
        exp.error['date'] = false;
        exp.error.val = '';
      }
      if (!exp.fromMonth) {
        exp.error['date'] = true;
        exp.error.val = 'Please select from Month';
        this.submittingForm = false;
        return false;
      } else {
        exp.error['date'] = false;
        exp.error.val = '';
      }
      if (!exp.fromYear) {
        exp.error['date'] = true;
        exp.error.val = 'Please select from Year';
        this.submittingForm = false;
        return false;
      } else {
        exp.error['date'] = false;
        exp.error.val = '';
      }
      if (exp.gradingSystem != '0' && exp.gradingSystem != '1') {
        exp.error['gradingSystem'] = true;
        exp.error.val = 'Please select grading system';
        this.submittingForm = false;
        return false;
      } else {
        exp.error['gradingSystem'] = false;
        exp.error.val = '';
      }
      if (!exp.gradeMarks) {
        exp.error['gradeMarks'] = true;
        exp.error.val = 'Please enter your grades';
        this.submittingForm = false;
        return false;
      } else {
        exp.error['gradeMarks'] = false;
        exp.error.val = '';
      }

      var isNANumber = isNaN(Number(exp.gradeMarks));
      if (isNANumber) {
        exp.error['gradeMarks'] = true;
        exp.error.val = 'Please enter number only';
        this.submittingForm = false;
        return false;
      } else {
        exp.error['gradeMarks'] = false;
        exp.error.val = '';
      }

      if (exp.fromYear > exp.toYear) {
        exp.error.date = true;
        exp.error.val = 'From year can\'t be greater than to year';
        this.submittingForm = false;
        return false;
      }
      exp.error.date = false;

      if (exp.fromYear == exp.toYear) {
        if (exp.fromMonth > exp.toMonth) {
          exp.error.date = true;
          exp.error.val = 'To date can\'t be greater than from date'
          this.submittingForm = false;
          return false;
        }
      }
      exp.error.date = false;

      if (exp.gradingSystem == '0') {
        var gradeMarks: any = exp.gradeMarks
        if (gradeMarks < 0 || gradeMarks > 10) {
          exp.error.gradeMarks = true;
          exp.error.val = 'CGPA must be in inclusive range of 1-10';
          this.submittingForm = false;
          return false;
        }
      }
      exp.error.gradeMarks = false;

      if (exp.gradingSystem == '1') {
        var gradMarks: any = exp.gradeMarks
        if (gradMarks < 0 || gradMarks > 100) {
          exp.error.gradeMarks = true;
          exp.error.val = 'Percentage must be in inclusive range of 1-100';
          this.submittingForm = false;
          return false;
        }
      }
      exp.error.gradeMarks = false;
      var education: any = {

      }
      if (exp.toMonth != '00') {
        education['to'] = exp.toYear + '-' + exp.toMonth + '-' + '01';
      } else {
        education['to'] = '';
      }
      education['from'] = exp.fromYear + '-' + exp.fromMonth + '-' + '01';
      education['eduid'] = exp.eduid;
      if (exp.college.id == '0' || exp.college.id == null || exp.college.id == '') {
        education['instid'] = '';
        education['inst'] = this._postDataService.encodeURIPostData(exp.college.name);
      } else {
        education['instid'] = exp.college.id;
        education['inst'] = '';
      }

      if (exp.degree.id == '0' || exp.degree.id == null || exp.degree.id == '') {
        education['couid'] = '';
        education['cou'] = this._postDataService.encodeURIPostData(exp.degree.name);
      } else {
        education['couid'] = exp.degree.id;
        education['cou'] = '';
      }
      education['summ'] = exp.summary;
      education['grades'] = exp.gradeMarks;
      education['qual_type'] = exp.expType;
      education['grade_typ'] = exp.gradingSystem;
      education['branch_name'] = this._postDataService.encodeURIPostData(exp.branchName);
      educationsArray.push(education);

    });

    if (!this.submittingForm) {
      return false;
    }


    var user_eduDetails = {};
    user_eduDetails['token_param'] = {};
    user_eduDetails['token_param']['device_type'] = 'w';
    user_eduDetails['token_param']['host'] = '';
    user_eduDetails['token'] = this._constantService.getSessionDataBYKey('token');
    user_eduDetails['quals'] = educationsArray;




    this._constantService.fetchDataApi(this._constantService.getAddUpdateQualificationUrl(), user_eduDetails).subscribe(data => {
      var responseData: any = data;
      var status = responseData.STATUS;

      if (status == this._constantService.success_msg) {
        for (var i = 0; i < responseData.EDUCATION_RESPONSE.length; i++) {
          if (responseData.EDUCATION_RESPONSE[i].STATUS == 'success') {
            this.detailsForm.experiences[i].eduid = responseData.EDUCATION_RESPONSE[i].USER_EDUCATION_ID;
          }
        }
        for (var i = 0; i < responseData.EDUCATION_RESPONSE.length; i++) {
          if (responseData.EDUCATION_RESPONSE[i].STATUS != 'success') {
            this.submittingForm = false;
            this.errorMessage = responseData.EDUCATION_RESPONSE[i].ERROR_MSG;
            this.dataConf['type'] = 2;
            this.dataConf['msg'] = 'STUDY24X7';
            this.dataConf['error_msg'] = this.errorMessage;
            this.openConfirmation = true;
            return false;

          }
        }
        this._constantService.setSessionJsonPair('token', responseData.TOKEN);

        this.checkAndRegisterForCareer();
      }
      else if (responseData.STATUS == 'error') {
        this.errorMessage = responseData.ERROR_MSG;
        this.dataConf['type'] = 2;
        this.dataConf['msg'] = 'STUDY24X7';
        this.dataConf['error_msg'] = this.errorMessage;
        this.openConfirmation = true;
      } else {
        this.submittingForm = false;

      }
    }, error => {
      this.dataConf['type'] = 2;
      this.dataConf['msg'] = 'STUDY24X7';
      this.dataConf['error_msg'] = 'Something went wrong ';
      this.openConfirmation = true;
      return false;

    });



  }
  closeCourselist() {
    setTimeout(() => {
      this.searchListCou = -1;

    }, 200);
  }
  setTestType(type) {
    window.scrollTo(0, 0);
    this.testType = type;
    this.showForm = true;
    // this.updateTestType();
  }

  updateTestType() {
    var params = {
      'token': this._constantService.getSessionDataBYKey('token'),
      'token_param': {
        'device_type': 'w', 'host': ''
      },
      'type': this.testType
    }
    this._constantService.fetchDataApi(this._constantService.getUpdateUserCareerTestTypeUrl(), params).subscribe(data => {
      var responseData: any = data;
      if (responseData.STATUS == 'success') {
        this.submittingForm = false;
        var testDetails = responseData.TEST_DETAIL;
        this._sharedDataService.testDetails = testDetails;
        this.emitRegstrationSuccessful.emit({
          success: true,
          testDetails: testDetails
        });
      } else if (responseData.STATUS == 'error') {
        this.errorMessage = responseData.ERROR_MSG;
        this.dataConf['type'] = 2;
        this.dataConf['msg'] = 'STUDY24X7';
        this.dataConf['error_msg'] = this.errorMessage;
        this.openConfirmation = true;

      } else {
        this.submittingForm = false;

      }
    }, error => {
      this.dataConf['type'] = 2;
      this.dataConf['msg'] = 'STUDY24X7';
      this.dataConf['error_msg'] = 'Something went wrong ';
      this.openConfirmation = true;

    });
  }

  registerForCareerTest() {
    var params: any = {
      'token': this._constantService.getSessionDataBYKey('token'),
      'token_param': {
        'device_type': 'w',
        'host': ''
      },
      'branch': this.detailsForm.experiences[0].branchName,
      'DOB': this._constantService.getDateFromMilliseconds('dd-mm-yyyy', Date.parse(this.dob)),
      'gender': this.gender,
      'qual': this.detailsForm.experiences[0].degree.name
    };
    var quals: any = [];
    for (var i = 0; i < this.detailsForm.experiences.length; i++) {
      var to = '';
      var from = '';
      if (this.detailsForm.experiences[i].toMonth != '00') {
        to = this.detailsForm.experiences[i].toYear + '-' + this.detailsForm.experiences[i].toMonth + '-' + '01';
      } else {
        to = '';
      }
      from = this.detailsForm.experiences[i].fromYear + '-' + this.detailsForm.experiences[i].fromMonth + '-' + '01';
      quals.push({
        'qual_type': this.detailsForm.experiences[i].expType,
        'inst_name': this.detailsForm.experiences[i].college.name,
        'branch': this.detailsForm.experiences[i].branchName,
        'course': this.detailsForm.experiences[i].degree.name,
        'grade_type': this.detailsForm.experiences[i].gradingSystem,
        'grade_value': this.detailsForm.experiences[i].gradeMarks
      })
    }
    params['quals'] = quals;
    params['city'] = this.city.name;
    params['career_type'] = this.testType;
    this._constantService.fetchDataApi(this._constantService.getRegisterForCareerUrl(), params).subscribe(data => {
      var responseData: any = data;
      if (responseData.STATUS == 'success') {
        this.submittingForm = false;
        var testDetails = responseData.TEST_DETAIL;
        this._sharedDataService.testDetails = testDetails;
        this.emitRegstrationSuccessful.emit({
          success: true,
          testDetails: testDetails
        });

      } else if (responseData.STATUS == 'error') {
        this.errorMessage = responseData.ERROR_MSG;
        this.dataConf['type'] = 2;
        this.dataConf['msg'] = 'STUDY24X7';
        this.dataConf['error_msg'] = this.errorMessage;
        this.openConfirmation = true;
      } else {
        this.submittingForm = false;

      }
    }, error => {
      this.dataConf['type'] = 2;
      this.dataConf['msg'] = 'STUDY24X7';
      this.dataConf['error_msg'] = 'Something went wrong ';
      this.openConfirmation = true;

    });
  }

  deleteUserQualification(i, exp) {
    if (exp == 'college') {
      if (this.detailsForm.experiences.length < 2) { return; }
      if (this.detailsForm.experiences[i].eduid == '' || this.detailsForm.experiences[i].eduid == '0' || this.detailsForm.experiences[i].eduid == null) {
        this.detailsForm.experiences.splice(i, 1);
        return;
      }
    }
    var params = {
      'token': this._constantService.getSessionDataBYKey('token'),
      'eduid': this.detailsForm.experiences[i].eduid,
      'token_param': {
        'device_type': 'w',
        'host': ''
      }
    };
    this._constantService.fetchDataApi(this._constantService.getDelUsrEduServiceUrl(), params).subscribe(data => {
      var responseData: any = data;
      if (responseData.STATUS == 'success') {
        if (exp == 'college') {
          this.detailsForm.experiences.splice(i, 1);

        }
      } else if (responseData.STATUS == 'error') {
        this.errorMessage = responseData.ERROR_MSG;
        this.dataConf['type'] = 2;
        this.dataConf['msg'] = 'STUDY24X7';
        this.dataConf['error_msg'] = this.errorMessage;
        this.openConfirmation = true;
      }
    }, error => {
      this.dataConf['type'] = 2;
      this.dataConf['msg'] = 'STUDY24X7';
      this.dataConf['error_msg'] = 'Something went wrong ';
      this.openConfirmation = true;

    });
  }

  profilepopup(event) {
    console.log('fetch in');
    this.dataopen = false;
    if (event['status']) {
      //this.profilePicPath = event['image'];
      //this.orgImagePath = event['image'];
      fetch(event['image']).then(res => res.blob()).then(blob => {
        event['image'] = blob;
        this.uploadProfileFile(event, 1);
      });

    }
  }
  uploadProfileFile(event, typ) {
    var upload = {};
    upload['token'] = this._constantService.getSessionDataBYKey('token');
    upload['token_param'] = {};
    upload['token_param']['device_type'] = 'w';
    upload['token_param']['host'] = '';
    var data = JSON.stringify(upload);
    var encData = this._encryptionService.encrypt(data);
    let formData = new FormData();
    if (typ == 1) {
      formData.append('file', event['image']);
      formData.append('type', 'pp');
    } else {
      formData.append('file', event['orgFile']);
      formData.append('type', 'pp_org');
    }
    formData.append('pattchid', '');
    formData.append('token', encData);


    var url = '';
    if (typ == 1) {
      url = this._constantService.getUploadFileServiceUrl();
    } else {
      url = this._constantService.getUploadOrgServiceUrl();
    }
    this._constantService.uploadFileApi(url, formData).subscribe(data => {
      var responseData: any = data;
      var status = responseData.STATUS;
      if (status == this._constantService.success_msg) {
        if (typ == 1) {
          var date = new Date();
          responseData.FPATH

          this.profilePic = true;
          this.profilePicPath = responseData.FPATH + 'profile/' + this._constantService.getSessionDataBYKey('u_id') + '_150x150.png?v=' + responseData.IMG_UPD_DT;
          this.profilePicPathOrg = responseData.FPATH + 'profile/' + this._constantService.getSessionDataBYKey('u_id') + '_2000.png?v=' + responseData.IMG_UPD_DT;
          this.CommentPPath = responseData.FPATH;
          this._constantService.setSessionJsonPair('p_pic', this.profilePicPath);
          this._constantService.setSessionJsonPair('profile_pic_s3', this.CommentPPath);
          this.profileImage = this._constantService.getSessionDataBYKey('p_pic');
          if (this.profileImage == this._constantService.defaultImgPath) {
            this.profileImagePathExist = false;
          }
          this.profileImageUpdateEmitter.emit(true);
          this.changeDetector.detectChanges();
        }
      } else {
      }
    }, error => {
      var responseData = error;
      if (responseData.status == 500) {
      }
    });

  }

  updateGeneralInfo() {
    var params = {};
    params['token'] = this._constantService.getSessionDataBYKey('token');
    this.userSummary = this.userSummary.replace(/</g, '&lt;');
    this.userSummary = this.userSummary.replace(/>/g, '&gt;');

    params['summ'] = this._postDataService.encodeURIPostData(this.userSummary).replace(/\%3C(?!span|br|a|href="([^"]*)"|\/span|\/br|\/a).*?\%3E/g, '').trim();
    params['token_param'] = {};
    params['token_param']['device_type'] = 'w';
    params['token_param']['host'] = '';
    var dob = this._constantService.getDateFromMilliseconds('yyyy-mm-dd', Date.parse(this.dob));
    params['dob'] = dob;
    params['fn'] = this._constantService.getSessionDataBYKey('full_name').split(' ')[0];
    params['ln'] = this._constantService.getSessionDataBYKey('full_name').split(' ')[1];
    params['gender'] = this.gender == 'M' ? 1 : 2;
    params['couid'] = '1';
    params['cityid'] = this.city.id;
    params['stid'] = this.stateId;

    this._constantService.fetchDataApi(this._constantService.getUpdateGeneralInfoUrl(), params).subscribe(data => {
      var responseData: any = data;
      var status = responseData.STATUS;
      if (status == this._constantService.success_msg) {
        this._constantService.setSummary(this._postDataService.decodeURIPostData(this.userSummary));
        if (!this.submitForm()) {
          setTimeout(() => {
            document.getElementsByClassName('alert_msg')[0].parentElement.parentElement.scrollIntoView();
          }, 500);

        }
      } else if (responseData.STATUS == 'error') {
        this.errorMessage = responseData.ERROR_MSG;
        this.dataConf['type'] = 2;
        this.dataConf['msg'] = 'STUDY24X7';
        this.dataConf['error_msg'] = this.errorMessage;
        this.openConfirmation = true;
      } else {
        this.submittingForm = false;

      }
    }, error => {
      this.submittingForm = false;
      this.dataConf['type'] = 2;
      this.dataConf['msg'] = 'STUDY24X7';
      this.dataConf['error_msg'] = 'Something went wrong ';
      this.openConfirmation = true;
      return false;

    });
  }
  closePopup() {
    this.openConfirmation = false;
    this.submittingForm = false;

  }
  setQualificationList() {
    for (var i = 0; i < this.detailsForm.experiences.length; i++) {
      if (this.detailsForm.experiences[i].expType != '') {
        this.qualificationsList[Number(this.detailsForm.experiences[i].expType) - 1].hide = true;
      } else {
        this.qualificationsList[Number(this.detailsForm.experiences[i].expType) - 1].hide = false;

      }
    }
  }

}
