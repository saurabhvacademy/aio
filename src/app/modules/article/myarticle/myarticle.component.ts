import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ConstantService } from './../../../services/constant.service';
import { EncryptionService } from './../../../services/encryption.service';
import { PostdataService } from './../../../services/postdata.service';
import { Router } from '@angular/router';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';


@Component({
  selector: 'app-myarticle',
  templateUrl: './myarticle.component.html',
  styleUrls: ['./myarticle.component.scss'],
})
export class MyarticleComponent implements OnInit {
  isDraft: boolean = false;
  isPublish: boolean = false;
  isEmptyState: boolean = false;
  articaleData = [];
  continueScroll: boolean = false;
  pageCount: number = 1;
  draftcount: number = 0;
  publishcount: number = 0;
  searchArticleText = '';
  selectedIndex: any;
  config: PerfectScrollbarConfigInterface = {};

  constructor(
    public _constantService: ConstantService,
    private _encrtpy: EncryptionService,
    private _router: Router,
    private _postdataService: PostdataService,

  ) { }

  ngOnInit() {
    if (this._router.url == "/article/myarticle/draft") {
      this.isDraft = true;
      this.isPublish = false;
      this.setArticle(0);
    }
    if (this._router.url == "/article/myarticle/publish" || this._router.url == "/article/myarticle") {
      this.isDraft = false;
      this.isPublish = true;
      this.setArticle(1);
    }
  }

  setArticle(index) {
    this.selectedIndex = index;
    this.getArticle(index);
  }
  onEdit(articleid) {
    let routing = "/article/edit/" + articleid;
    this._router.navigate([routing]);
  }
  redirectPublishArticle(articleId, articleUrl) {
    let routing = "/article/" + articleId;
    this._router.navigate([routing]);
  }
  searchArticle(index) {
    if (this.searchArticleText.length >= 0  ) {
      this.getArticle(index);
    }

  }
  crossSearch(index){
    this.searchArticleText='';
    this.getArticle(index);
  }
  getArticle(index) {
    var artical = {};
    artical['token'] = this._constantService.getSessionDataBYKey('token');
    artical['token_param'] = {};
    artical['token_param']['device_type'] = 'w';
    artical['token_param']['host'] = '';
    artical['search_text'] = this._postdataService.encodeURIPostData(this.searchArticleText);
    artical['artl_typ'] = index;
    artical['count'] = this.pageCount;
    artical['r_count'] = 15;
    this._constantService.fetchDataApi(this._constantService.getArticleServiceUrl(),artical).subscribe(data => {
      var responseData:any = data;
      var status = responseData.STATUS;
      var articale = [];
      articale = responseData.ARTICLE_DATA;

      if (responseData.ARTICLE_DATA.length == 15) {
        this.continueScroll = true;
      }
      else {
        this.continueScroll = false;
      }
      if (this.pageCount == 1) {
        this.articaleData.length = 0;
      }


      if (status == this._constantService.success_msg) {

        if (articale.length == 0) {
          this.isEmptyState = true;
        }
        else {
          this.isEmptyState = false;
        }
        this.publishcount = responseData.PUBLISHED_COUNT;
        this.draftcount = responseData.DRAFTED_COUNT;

        for (let i = 0; i < articale.length; i++) {
          // this.articale[i].ARTICLE_TEXT  =  this._postdataService.decodeURIPostData( this._encrtpy.decrypt(this.articale[i].ARTICLE_TEXT));
          articale[i].ARTICLE_TITLE = this._postdataService.decodeURIPostData(articale[i].ARTICLE_TITLE);
          articale[i].ADD_DATE_TIME = this._postdataService.getPostDateTime(articale[i].UPDATE_DATE_TIME);
          articale[i].ARTICLE_INNER_TEXT = this._postdataService.decodeURIPostData(articale[i].ARTICLE_INNER_TEXT);
        }

        // this.articaleData.apply(articale);
        this.articaleData.push.apply(this.articaleData, articale);

      }
    });
  }


  delArticle(event, articleUUID, index) {
    var artical = {};
    artical['token'] = this._constantService.getSessionDataBYKey('token');
    artical['token_param'] = {};
    artical['token_param']['device_type'] = 'w';
    artical['token_param']['host'] = '';
    artical['artl_uuid'] = articleUUID;
    this._constantService.fetchDataApi(this._constantService.delArticleServiceUrl(),artical).subscribe(data => {
      var responseData:any = data;
      var status = responseData.STATUS;
      if (status == this._constantService.success_msg) {
        this.articaleData.splice(index, 1);
        this.ngOnInit();
      }
    });


  }

  searchAmimation() {
  }

  showMenue(index, parentId) {
    if (document.getElementById(index).classList.contains('hide')) {
      document.getElementById(index).classList.remove('hide');
      document.getElementById(parentId).classList.add('ativeArticle');
    }
    else {
      document.getElementById(index).classList.add('hide');
      document.getElementById(parentId).classList.remove('ativeArticle');
    }
  }
  hide(index, parentId) {
    document.getElementById(index).classList.add('hide');
    document.getElementById(parentId).classList.remove('ativeArticle');
  }

  onScrollDown() {
    if (this.continueScroll) {
      this.pageCount++;
      if (this.isDraft) {
        this.getArticle(0);
      }
      else {
        this.getArticle(1);
      }
    }

  }


}
