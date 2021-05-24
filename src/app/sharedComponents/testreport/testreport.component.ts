import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {ConstantService} from './../../services/constant.service';
import {EncryptionService} from './../../services/encryption.service';
import {Router} from "@angular/router";
@Component({
  selector: 'app-testreport',
  templateUrl: './testreport.component.html',
  styleUrls: ['./testreport.component.scss', './../../modules/test/testpage/testpage.component.scss']
})
export class TestreportComponent implements OnInit {
  reportQuesCount;
  reportSpeed;
  reportTimeTaken;
  reportQuesAttempted;
  reportTotalMarks;
  reportPercentage;
  reportTestMarks;
  reportAccuracy;
  timeStatus;
  speedStatus;
  accuracyStatus;
  percentageStatus;
  attemptedStatus;
  scoreStatus;
  contentId;
  @Input() courseTestReport;
  @Input() contentUuid;
  @Output() hideReport = new EventEmitter();
  @Input() testType;
  constructor(
    private _constantService: ConstantService,
    private _encrypt: EncryptionService,
    private router: Router
  ) { }

  ngOnInit() {
     var report = this.courseTestReport;
     this.contentId = this.contentUuid;
     this.reportQuesCount = report.QUESTION_COUNT;
     this.reportSpeed = report.SPEED;
     this.reportTimeTaken = report.TIME_TAKEN;
     this.reportQuesAttempted = report.ATTEMPTED_COUNT;
     this.reportTotalMarks = report.TOTAL_MARKS;
     this.reportPercentage = report.PERCENTAGE;
     this.reportTestMarks = report.TOTAL_OBTAINED_MARKS;
     this.reportAccuracy = report.ACCURACY;
     this.timeStatus = report.TIME_TAKEN_STATUS;
     this.speedStatus = report.SPEED_STATUS;
     this.accuracyStatus = report.ACCRACY_STATUS;
     this.percentageStatus = report.PERCENTAGE_STATUS;
     this.attemptedStatus = report.ATTEMPTED_STATUS;
     this.scoreStatus = report.TOTAL_MARKS_STATUS;


  }

  hidetestReport(){
    this.hideReport.emit();
  }

  goToTestSolution(){
    if(this.testType == 3){
      this.router.navigate(['/test/testsolution/'+this.contentId]);
    }
    else{
      this.createlinkedbasedToken();
    }
  }


  post(url,token) {
    var mapForm = document.createElement("form");
    mapForm.target = "_blank";
    mapForm.method = "POST"; // or "post" if appropriate
    mapForm.action = url;
    var mapInput = document.createElement("input");
    mapInput.type = "hidden";
    mapInput.name = "enrollmentNo";
    mapInput.setAttribute("value", token);
    mapForm.appendChild(mapInput);
    
    document.body.appendChild(mapForm);
    mapForm.submit();
}

createlinkedbasedToken(){
    // getTokenforLinkedBasedDataServiceUrl
     var linkbasedToken = {};
        linkbasedToken['token'] = this._constantService.getSessionDataBYKey('token');
        linkbasedToken['token_param'] = {};
        linkbasedToken['token_param']['device_type'] = 'w';
        linkbasedToken['token_param']['host'] = '';
        linkbasedToken['cntnt_uuid'] =  this.contentUuid;

        this._constantService.fetchDataApi(this._constantService.getTokenforLinkedBasedDataServiceUrl(), linkbasedToken).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if(status == this._constantService.success_msg){
                this.post(responseData.PATH,responseData.URL_TOKEN);
            }
    });
}
    
}
