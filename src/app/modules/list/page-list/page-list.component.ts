import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {EncryptionService} from '../../../services/encryption.service';
import {ConstantService} from '../../../services/constant.service';
import {PostdataService} from '../../../services/postdata.service';
import { PagerService } from '../../../services/pager.service';
import {ActivatedRoute, Router} from '@angular/router';

import {_} from 'underscore';


@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss'],
  providers: [PagerService]
})
export class PageListComponent implements OnInit {
  showPreloader: boolean;
  pageList = true;
  searchChar ='A';
  directoryArray =[];
  totalCount= 0;
  count = 0;
  collection = [];
  shouldShow = false;
  flag = 2;
  queryString='';
  queryData='';

  upper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

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
      this.getPublicPage('A', 1);
  }

    getPublicPage(char, page) {



        const hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = 'w';
        hitObj['token_param']['host'] = '';
        hitObj['type'] = '2';
        hitObj['srch_char'] = char;
        hitObj['count'] = page;
        hitObj['r_count'] = '60';

        this._constantService.fetchDataApi(this._constantService.getPageDirectoryServiceUrl(), hitObj).subscribe(data => {

            const responseData:any = data;
            const status = responseData.STATUS;
            if (status == this._constantService.success_msg) {

                this.searchChar = char;
                this.totalCount = responseData.TOTAL_COUNT;


                this.directoryArray = responseData.DIRECTORY_DATA;

                this.count = responseData.DIRECTORY_DATA.length;

                for(var i=0 ; i<this.count ; i++){
                    responseData.DIRECTORY_DATA[i].TITLE = this.post.decodeURIPostData(responseData.DIRECTORY_DATA[i].TITLE);
                }


               // console.log(responseData);
               /* added by shreya*/
                 //console.log(this.pager.totalPages+'totalPAges');
                // console.log(page+'page');
                  if (page < 1 && page > this.pager.totalPages) {
               //  console.log("here1");

                 return false;
        }
       // if(this.pager.totalPages < page  ){
          //   return false;
        //}

        // get pager object from service
       // console.log("here");
      // console.log(page);
        this.pager = this.pagerService.getPager(this.totalCount, page);
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
    pageRedirect(url) {
     this.router.navigate(['page/'+ url ]);
    return url;
  }

  onchangeData(){

      this.queryData = this.queryString.toLowerCase().trim();
      console.log(this.queryData);
      this.queryData = this.queryData;

  }



}
