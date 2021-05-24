import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConstantService } from './../../services/constant.service';
import {EncryptionService} from './../../services/encryption.service';
import { PostdataService } from './../../services/postdata.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-courselist',
  templateUrl: './courselist.component.html',
  styleUrls: ['./courselist.component.scss']
})
export class CourselistComponent implements OnInit {
 
   nonDraftCourseLength:boolean = true;
   @Input() pageId:string;
   @Input() user_type:number;
   @Output() pgTab = new EventEmitter<number>();
   uType;
   coursePack = [];
   notshowImage: boolean=true;
   rpsign: boolean = true;
   hideCose: boolean = false;
   seeAll:boolean = false;

  constructor(
    public _constantService : ConstantService,
    private _encrypt : EncryptionService,
    private _router : Router,
    private postData : PostdataService,
   
  ) {}

  ngOnInit() {
   
  }
  
  ngDoCheck(){ 
    if (this.user_type == 1){
          this.getNonDraftCourses();
          this.user_type = 3;
          this.uType = 1;
      }
    if (this.user_type == 0){
          this.getCourseList();
          this.user_type = 3;
          this.uType = 0;
      }
    
  }

getNonDraftCourses(){
    this.coursePack = [];
    var nonDraft = {};
    nonDraft['token'] = this._constantService.getSessionDataBYKey('token');
    nonDraft['token_param'] = {};
    nonDraft['token_param']['device_type'] = 'w';
    nonDraft['token_param']['host'] = '';
    nonDraft['flow_id'] = 0;
    nonDraft['pg_uuid'] = this.pageId;
    nonDraft['order'] = "";
    nonDraft['cor_ty'] = "";
    nonDraft['search_text'] = "";
    
    this._constantService.fetchDataApi(this._constantService.getPageNonDraftCourseServiceUrl(), nonDraft).subscribe(data=>{
        var responseData:any = data;
        if (responseData.STATUS == this._constantService.success_msg){ 
               //this._constantService.setToken(responseData.TOKEN);
               this._constantService.setSessionJsonPair('token',responseData.TOKEN);
               var cData = responseData.NON_DRAFTED_COURSE;
               if(cData.length==0){
                   this.nonDraftCourseLength=false;
               }
               if(cData.length > 3){
                   this.seeAll = true;
                    this.coursePack = cData.slice(0,4);
               }
                if (responseData.IS_ADMIN == 1){
                    for (var i=0; i<4; i++){  
                       
                        if (this.coursePack[i].COURSE_TYPE == 1){
                            var costObj = this.coursePack[i].COURSE_PRICE;
                            this.coursePack[i].COST = ' ';      
                            for(var j=0; j<costObj.length; j++){
                                if(costObj[j].CURRENCY_TYPE == 'INR'){
                                  if(costObj[j].DISCOUNT_COST != '' && costObj[j].DISCOUNT_COST != null){
                                     this.coursePack[i].COST = costObj[j].DISCOUNT_COST; 
                                    }else{
                                         this.coursePack[i].COST = costObj[j].COST;      
                                  }
                                 }                
                             }    
                        }else{
                            this.coursePack[i].COST = 'FREE';
                        }
                        
                        if (this.coursePack[i].PUBLISH == 1){
                            this.coursePack[i].STATUS = 'Published';
                        }else{
                            this.coursePack[i].STATUS = 'Reviewed';
                        }
                        if(this.coursePack[i].PAGE_TITLE != null){
                            this.coursePack[i].PAGE_TITLE = this.postData.decodeURIPostData(this.coursePack[i].PAGE_TITLE);
                            }
                        if(this.coursePack[i].PAGE_NAME != null){
                            this.coursePack[i].PAGE_NAME = this.postData.decodeURIPostData(this.coursePack[i].PAGE_NAME);
                            }
                        if(this.coursePack[i].COURSE_COVER_PHOTO_PATH != null){
                            if(this.coursePack[i].COVER_TYPE == "0"){
                            this.coursePack[i].COURSE_COVER_PHOTO_PATH = this.coursePack[i].COURSE_COVER_PHOTO_PATH + this.coursePack[i].COURSE_UUID + '_1235x330.png';
                        }else{
                            this.coursePack[i].COURSE_COVER_PHOTO_PATH = this.coursePack[i].COURSE_COVER_PHOTO_PATH ;
                        }
                        } else {
                            this.coursePack[i].COURSE_COVER_PHOTO_PATH = this._constantService.defaultCoverImgPath;
                        }
                        if (this.coursePack[i].PAGE_PROFILE_PHOTO_PATH != null) {
                            this.coursePack[i].PAGE_PROFILE_PHOTO_PATH = this.coursePack[i].PAGE_PROFILE_PHOTO_PATH +'profile/'+ this.coursePack[i].PAGE_UUID + '_120x120.png';
                        } else {
                            this.coursePack[i].PAGE_PROFILE_PHOTO_PATH = this._constantService.defaultImgPath;
                        }

                        this.coursePack[i].TITLE = this.postData.decodeURIPostData(this.coursePack[i].COURSE_TITLE);
                        this.coursePack[i].ADD_DATE_TIME = this.postData.getPostDateTime(this.coursePack[i].ADD_DATE_TIME);
                        if (this.coursePack[i].PUBLISH_DATE_TIME != null) {
                            this.coursePack[i].PUBLISH_DATE_TIME = this.postData.getPostDateTime(this.coursePack[i].PUBLISH_DATE_TIME);
                        }
                        if (this.coursePack[i].TOTAL_ENROLLED_USER == 0){
                            this.coursePack[i].TOTAL_ENROLLED_USER = '--';
                        }
                    }
                   
                }
             
        }
    });
    
}

getCourseList(){
    this.coursePack = []; 
    var courseList = {};
    courseList['token'] = this._constantService.getSessionDataBYKey('token');
    courseList['token_param'] = {};
    courseList['token_param']['device_type'] = 'w';
    courseList['token_param']['host'] = '';
    courseList['flow_id'] = 0;
    courseList['pg_uuid'] = this.pageId;
    courseList['order'] = "";
    courseList['cor_ty'] = "";
    courseList['search_text'] = "";
    
    this._constantService.fetchDataApi(this._constantService.getPageCoursesServiceUrl(), courseList).subscribe(data=>{
        var responseData:any = data;
        if (responseData.STATUS == this._constantService.success_msg){  
               //this._constantService.setToken(responseData.TOKEN);
               this._constantService.setSessionJsonPair('token',responseData.TOKEN);
               var cData = responseData.PAGE_COURSES;
                if(cData.length > 3){
                   this.seeAll = true;
                    this.coursePack = cData.slice(0,4);
               }
               for (var i = 0; i < 4; i++) {
                        
                        if(this.coursePack[i].COURSE_TITLE != null){
                            this.coursePack[i].COURSE_TITLE = this.postData.decodeURIPostData(this.coursePack[i].COURSE_TITLE);
                            }
                        if(this.coursePack[i].PAGE_TITLE != null){
                            this.coursePack[i].PAGE_TITLE = this.postData.decodeURIPostData(this.coursePack[i].PAGE_TITLE);
                            }
                        if(this.coursePack[i].PAGE_NAME != null){
                            this.coursePack[i].PAGE_NAME = this.postData.decodeURIPostData(this.coursePack[i].PAGE_NAME);
                            }
                        if (this.coursePack[i].DESCRIPTION != null) {
                            this.coursePack[i].DESCRIPTION = this.postData.decodeURIPostData(this.coursePack[i].DESCRIPTION);
                        }
                        if (this.coursePack[i].COURSE_COVER_PHOTO_PATH != null) {
                            if(this.coursePack[i].COVER_TYPE == "0"){
                            this.coursePack[i].COURSE_COVER_PHOTO_PATH = this.coursePack[i].COURSE_COVER_PHOTO_PATH + this.coursePack[i].COURSE_UUID + '_1235x330.png';
                        }else{
                            this.coursePack[i].COURSE_COVER_PHOTO_PATH = this.coursePack[i].COURSE_COVER_PHOTO_PATH ;
                        }
                        } else {
                            this.coursePack[i].COURSE_COVER_PHOTO_PATH = this._constantService.defaultCoverImgPath;
                        }
                        if (this.coursePack[i].PAGE_PROFILE_PHOTO_PATH != null) {
                            this.coursePack[i].PAGE_PROFILE_PHOTO_PATH = this.coursePack[i].PAGE_PROFILE_PHOTO_PATH + 'profile/'+this.coursePack[i].PAGE_UUID + '_120x120.png';
                        } else {
                            this.coursePack[i].PAGE_PROFILE_PHOTO_PATH = this._constantService.defaultImgPath;
                        }
                        if (this.coursePack[i].PUBLISH_DATE_TIME != null) {
                            this.coursePack[i].PUBLISH_DATE_TIME = this.postData.getPostDateTime(this.coursePack[i].PUBLISH_DATE_TIME);
                        }
                        if (this.coursePack[i].ADD_DATE_TIME != null) {
                            this.coursePack[i].ADD_DATE_TIME = this.postData.getPostDateTime(this.coursePack[i].ADD_DATE_TIME);
                        }
                  
                        if (this.coursePack[i].COURSE_TYPE == 1) {
                            var cost = this.coursePack[i].COURSE_PRICE;
                            for (var j = 0; j < cost.length; j++) {

                                if (cost[j].DISCOUNT_COST != '' && cost[j].DISCOUNT_COST != null) {
                                    this.coursePack[i].DISCOUNT_COST = cost[j].DISCOUNT_COST;
                                } else {
                                    this.coursePack[i].DISCOUNT_COST = '';
                                } if (cost[j].COST != '' && cost[j].COST != null) {
                                    this.coursePack[i].COST = cost[j].COST;
                                }
                            }
                        } else {
                        this.coursePack[i].DISCOUNT_COST = "FREE";
                            this.hideCose = true; this.rpsign = false;
                        }
                 
                        if (this.coursePack[i].TOTAL_ENROLLED_USER != 0) {
                            if (this.coursePack[i].RECENT_ENROLLED[0] ) {
                            this.coursePack[i].ENROLLED1 = this.coursePack[i].RECENT_ENROLLED[0].PROFILE_PHOTO_PATH + "profile/" + this.coursePack[i].RECENT_ENROLLED[0].USER_ID + "_60x60.png?v=";
                            } else {this.coursePack[i].ENROLLED1 = this._constantService.defaultImgPath;}


                            if (this.coursePack[i].RECENT_ENROLLED[1]) {
                        this.coursePack[i].ENROLLED2 = this.coursePack[i].RECENT_ENROLLED[1].PROFILE_PHOTO_PATH + "profile/" + this.coursePack[i].RECENT_ENROLLED[1].USER_ID + "_60x60.png?v=";
                            } else {this.coursePack[i].ENROLLED2 = this._constantService.defaultImgPath;}

                        } else {
                           this.notshowImage=false;
                      }
                  }
        
        }
    });
 }

allCoursesTab(event){
   // this.seeAll = false;
    this.pgTab.emit(3);
  }
}
