import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {EncryptionService} from '../../../services/encryption.service';
import {ConstantService} from '../../../services/constant.service';
import {PostdataService} from '../../../services/postdata.service';
import { PagerService } from '../../../services/pager.service';
import {ActivatedRoute, Router} from '@angular/router';
import {_} from 'underscore';

``

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss', './../page-list/page-list.component.scss'],
    providers: [PagerService]
})
export class PostListComponent implements OnInit {
    showPreloader: boolean;
    pageList = true;
    searchChar = 'A';
    fakeArray = [];
    totalCount = 0;
    count = 0;
    directoryArray = [];
    queryString = '';
    queryData = "";
    upper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
// userpostid:any;
    constructor(

        public _constantService: ConstantService,
        public _encrypt: EncryptionService,
        public post: PostdataService,
        private router: Router,
        private pagerService: PagerService,
        ) {

    }
    private allItems: any[];
    // pager object
    pager: any = {};
    // paged items
    pagedItems: any[];
    ngOnInit() {
        this.getPublicProfile('A', 1);
    }

    getPublicProfile(char, page) {
        const hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = 'w';
        hitObj['token_param']['host'] = '';
        hitObj['type'] = '3';
        hitObj['srch_char'] = char;
        hitObj['count'] = page;
        hitObj['r_count'] = '60';
        

        this._constantService.fetchDataApi(this._constantService.getPageDirectoryServiceUrl(),hitObj).subscribe(data => {

            const responseData:any = data;
            const status = responseData.STATUS;
            if (status == this._constantService.success_msg) {

                this.searchChar = char;
                this.directoryArray = responseData.DIRECTORY_DATA;
                 //this.postData.encodeURIPostData(this.testName.trim());
                 // console.log(this.directoryArray);
                this.totalCount = responseData.TOTAL_COUNT;
                this.count = responseData.DIRECTORY_DATA.length;
                 //console.log(responseData);
                 // console.log(responseData.DIRECTORY_DATA.TEXT);
                 /* added by shreya*/
                 // console.log(this.pager.totalPages);
                 for ( var i = 0; i < this.directoryArray.length; i++) {
                    console.log(this.directoryArray[i]);
                    this .directoryArray[i]['TEXT'] = this.post.decodeURIPostData(this.directoryArray[i]['TEXT']).replace(/&amp;/g, '&').replace(/&lt;/g, "<").replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ');
                    console.log(this.directoryArray[i]);
                     // this.userpostid = this.directoryArray[i].USER_POST_ID;
                       // console.log(this.userpostid);

                 }
                 //* done by vijay*//
                 //*end by vijay*//
                 if (page < 1 || page > this.pager.totalPages) {
                    //this.getPublicProfile(char,1)
                    return;
                 }

                // get pager object from service
                this.pager = this.pagerService.getPager(this.totalCount, page);
                // console.log(this.pager);
                // get current page of items
                this.pagedItems = this.directoryArray.slice(this.pager.startIndex, this.pager.endIndex + 1);

                /*
                        ended by shreya
                console.log(responseData);*/


            } else if (status == this._constantService.error_token) {
                /*   this.dataConf['type'] = 4;
                   this.dataConf['msg'] = 'Session Expire';
                   this.dataConf['error_msg'] = 'Session Expired!';
                   this.openConfirmation = true;
                   return false;*/
            } else {
                /*   this.dataConf['type'] = 2;
                   this.dataConf['msg'] = 'Error';
                   this.dataConf['error_msg'] = responseData.ERROR_MSG;
                   this.openConfirmation = true;
                   return false;*/
            }
        }), error => {
            const err = error;
            /*  if (err.status == 500) {
                  this._router.navigate(['500']);
              }*/
        };
    }
    pageRedirect(directory) {
        this.router.navigate(['post/' + directory.USER_POST_ID + '/' + directory.url])
        return directory.url;
    }
    onchangeData(){

      this.queryData = this.queryString.toLowerCase().trim();
      this.queryData = this.queryData;

  }





}
