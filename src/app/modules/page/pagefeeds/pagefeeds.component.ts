import { Component, ViewChild, OnInit, ComponentFactoryResolver, ViewContainerRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConstantService } from './../../../services/constant.service';
import { PostdataService } from './../../../services/postdata.service';
import { EncryptionService } from './../../../services/encryption.service';
import { LinkpostComponent } from './../../../sharedComponents/postComponents/linkpost/linkpost.component';
import { ImagepostComponent } from './../../../sharedComponents/postComponents/imagepost/imagepost.component';
import { FileattachmentpostComponent } from './../../../sharedComponents/postComponents/fileattachmentpost/fileattachmentpost.component';
import { SharedimagepostComponent } from './../../../sharedComponents/postComponents/sharedimagepost/sharedimagepost.component';
import { SharedfileattachmentComponent } from './../../../sharedComponents/postComponents/sharedfileattachment/sharedfileattachment.component';
import { SharedlinkpostComponent } from './../../../sharedComponents/postComponents/sharedlinkpost/sharedlinkpost.component';
import { SinglechoicepostComponent } from './../../../sharedComponents/postComponents/singlechoicepost/singlechoicepost.component';
import { MultiplechoicepostComponent } from './../../../sharedComponents/postComponents/multiplechoicepost/multiplechoicepost.component';
import { TruefalsepostComponent } from './../../../sharedComponents/postComponents/truefalsepost/truefalsepost.component';
import { SharedtruefalsepostComponent } from './../../../sharedComponents/postComponents/sharedtruefalsepost/sharedtruefalsepost.component';
import { SharedsinglechoicepostComponent } from './../../../sharedComponents/postComponents/sharedsinglechoicepost/sharedsinglechoicepost.component';
import { SharedmultiplechoicepostComponent } from './../../../sharedComponents/postComponents/sharedmultiplechoicepost/sharedmultiplechoicepost.component';
import { VideopostComponent } from './../../../sharedComponents/postComponents//videopost/videopost.component';
import { SharedvideopostComponent } from './../../../sharedComponents/postComponents/sharedvideopost/sharedvideopost.component';
import { PostotherviewComponent } from './../../../sharedComponents/postComponents/postotherview/postotherview.component';
import { CoursepostComponent } from './../../../sharedComponents/postComponents/coursepost/coursepost.component';
import { SharedcoursepostComponent } from './../../../sharedComponents/postComponents/sharedcoursepost/sharedcoursepost.component';
import { SharedPostComponent } from 'src/app/sharedComponents/postComponents/post/shared-post/shared-post.component';
import { PostComponent } from 'src/app/sharedComponents/postComponents/post/post.component';
@Component({
  selector: 'app-pagefeeds',
  templateUrl: './pagefeeds.component.html',
  styleUrls: ['./pagefeeds.component.scss', './../../../sharedComponents/postComponents/textpost/allpost.css']
})
export class PagefeedsComponent implements OnInit {
  openConfirmation: boolean = false;
  dataConf = {};
  @ViewChild('container', { read: ViewContainerRef }) container;
  @Input() pageId;
  @Input() postId;
  @Input() user_type;
  @Input() pageUuid;
  @Input() postFilter;
  @Input() postSearch: boolean;
  @Input() postTyp: string;
  @Output() sessionLogout = new EventEmitter<boolean>();
  @Output() postIdDlt = new EventEmitter();
  profileView: boolean = false;
  postmenu = false;
  saveCondition = false;
  importantCondition = false;
  savepagepopup = false;
  simplePost = "";
  postDataDetails = {};
  userName = '';
  t: string;
  postPresent: boolean = true;
  loadPageFeeds: boolean = true;
  continueScroll: boolean = false;
  continueScrollSearch: boolean = false;
  factory;
  ref;
  publicPostLstPid = 0;
  urlArr = [];
  current_user = "";
  postIdChange = "blank";
  logout;
  lstTypePostId = "";
  lstUpdTime: string = "";
  oldId: string = "";
  lastPostCount_1: any = 0;
  constructor(
    public _constantService: ConstantService,
    public _encrypt: EncryptionService,
    public post: PostdataService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.t = this._constantService.getSessionDataBYKey('token');
    if (this.t && this.t != 'undefined') {
      this.oldId = this.pageId;
      this.activatedRoute.params.subscribe((params: Params) => {
        if (params['id'] == "#Articles") {
          setTimeout(() => {
            this.getArticlePost(this.pageId);

          }, 300);
        } else if (this.postSearch) {
          this.getTypeWisePost(this.lstUpdTime);
        }
        else {
          this.getPagePost("");
        }

      })


    } else {
      this.activatedRoute.params.subscribe((params: Params) => {
        this.pageId = params['tabid'];
        this.oldId = this.pageId;
        if (params['id'] != "#Question" && params['id'] != "#Articles") {
          this.getLatestPids10PublicPost(this.pageId);
        }
        if (params['id'] == "#Articles") {
          this.getArticlePost(this.pageId);
        }
        if (params['id'] == "#Question") {
          setTimeout(() => {
            this.getQuestionPublicPost();
          }, 300);
        }
      })
    }
  }

  ngDoCheck() {
    if (this.t && this.t != 'undefined') {

      if (this.postId != '' && this.postId != this.postIdChange) {
        console.log("page changed");

        this.postIdChange = this.postId;
        var post_ids = this.postId.split(',')[0];
        if (post_ids.length != 0) {

          if (post_ids.split(":")[2] != "3") {
            this.getLatestPostData(post_ids, "flow", true);
          } else if (post_ids.split(":")[2] == "3") {
            this.getQuestionPostData(post_ids, this._constantService.getQuestionPostDataWallServiceUrl(), true);
          }
        }
      }
      if (this.pageId != this.oldId) {
        console.log("page changed2");

        this.oldId = this.pageId;
        // this.ngOnInit();
        this.container.clear();
        setTimeout(() => {
          this.getPagePost("");

        }, 500);
      }
      this.postId = '';
    }
  }

  ngOnDestroy() {
    this.postId == "";
    this.postIdDlt.emit(true);
  }

  getPagePost(lspid) {
    var pagePost = {};

    pagePost['token'] = this._constantService.getSessionDataBYKey('token');
    pagePost['token_param'] = {};
    pagePost['token_param']['device_type'] = 'w';
    pagePost['token_param']['host'] = '';
    pagePost['pg_uuid'] = this.pageId;
    pagePost['lspid'] = lspid;
    pagePost['flow'] = 'd';
    pagePost['count'] = 10;

    this._constantService.fetchDataApi(this._constantService.getPagePostsRestUrl(), pagePost).subscribe(data => {
      var responseData:any = data;
      var post_ids = responseData.POST_DATA;

      if (post_ids.length != 0) {
        this.loadPageFeeds = false;
        this.lstTypePostId = responseData.LSPID;
        if (post_ids.length < 10) {
          this.continueScroll = false;
        } else {
          this.continueScroll = true
        }

        let postDataArr = responseData.POST_DATA;
        for (let i = 0; i < postDataArr.length; i++) {
          let postData = postDataArr[i];
          if (postData['REPORTED'] == 0) {
            postData['PROFILE_VIEW'] = this.profileView;
            if (this.user_type == 1) {
              postData['MY_PROFILE'] = true;
            } else {
              postData['MY_PROFILE'] = false;
            }
            postData['IS_PAGEFEED'] = true;

            if (postData['TYPE'] != 3) {
              this.postBuilder(postData, false);
            } else {
              this.QuesPostBuilder(postData, false);
            }
          }
        }
      } else {
        this.loadPageFeeds = false;
        if (lspid == 0) {
          this.postPresent = false;
          this.continueScroll = false;
        }
      }
    }, error => {
      var responseData = error;
      if (responseData.status == 500) {
        this.router.navigate(['500']);
      }
    });

  }


  getLatestPostData(postIds: string, flow: string, newPost: boolean) {
    this.postPresent = true;
    var postData = {};

    postData['token'] = this._constantService.getSessionDataBYKey('token');
    postData['token_param'] = {};
    postData['token_param']['device_type'] = 'w';
    postData['token_param']['host'] = '';
    postData['pid'] = postIds;

    this._constantService.fetchDataApi(this._constantService.getLatestPostDataServiceUrl(), postData).subscribe(data => {
      var responseData:any = data;
      var status = responseData.STATUS;
      if (status == this._constantService.success_msg) {
        this._constantService.setSessionJsonPair('token', responseData.TOKEN);
        if (responseData.POST_DATA.length != 0) {
          postData = responseData.POST_DATA[0];
          if (postData['REPORTED'] == 0) {
            postData['PROFILE_VIEW'] = this.profileView;
            if (this.user_type == 1) {
              postData['MY_PROFILE'] = true;
            } else {
              postData['MY_PROFILE'] = false;
            }
            postData['IS_PAGEFEED'] = true;

            this.postBuilder(postData, newPost);
          }
        }
      }
    }, error => {
      var responseData = error;
      if (responseData.status == 500) {
        this.router.navigate(['500']);
      }
    });
  }

  postBuilder(postData, newPost: boolean) {
    postData['ADD_DATE_TIME'] = this.getPostDateTime(postData['ADD_DATE_TIME']);
    if (postData['TYPE'] == 1) {
      if (postData['SHARE_LINK_TITLE'] == null || postData['SHARE_LINK_TITLE'] == "") {

        this.factory = this.componentFactoryResolver.resolveComponentFactory(PostComponent);
        if (newPost) {
          this.ref = this.container.createComponent(this.factory, 0);
        } else {
          this.ref = this.container.createComponent(this.factory);
        }

        this.ref.instance._ref = this.ref;
        this.ref.instance.arr = postData;
      } else {

        this.factory = this.componentFactoryResolver.resolveComponentFactory(LinkpostComponent);
        if (newPost) {
          this.ref = this.container.createComponent(this.factory, 0);
        } else {
          this.ref = this.container.createComponent(this.factory);
        }
        this.ref.instance._ref = this.ref;
        this.ref.instance.arr = postData;
      }
    } else if (postData['TYPE'] == 2) {
      if (postData['FILE_TYPE'] == 1) {
        this.factory = this.componentFactoryResolver.resolveComponentFactory(ImagepostComponent);
        if (newPost) {
          this.ref = this.container.createComponent(this.factory, 0);
        } else {
          this.ref = this.container.createComponent(this.factory);
        }
        this.ref.instance._ref = this.ref;
        this.ref.instance.arr = postData;
      }
      if (postData['FILE_TYPE'] == 3 || postData['FILE_TYPE'] == 4 || postData['FILE_TYPE'] == 5) {
        this.factory = this.componentFactoryResolver.resolveComponentFactory(FileattachmentpostComponent);
        if (newPost) {
          this.ref = this.container.createComponent(this.factory, 0);
        } else {
          this.ref = this.container.createComponent(this.factory);
        }
        this.ref.instance._ref = this.ref;
        this.ref.instance.arr = postData;
      }
    } else if (postData['TYPE'] == 4) {
      postData['SHARED_POST_DATA']['ADD_DATE_TIME'] = this.getPostDateTime(postData['SHARED_POST_DATA']['ADD_DATE_TIME']);
      if (postData['SHARED_POST_DATA'].TYPE == 1) {
        if (postData['SHARED_POST_DATA'].SHARE_LINK_TITLE == "" || postData['SHARED_POST_DATA'].SHARE_LINK_TITLE == null) {
          this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedPostComponent);
          if (newPost) {
            this.ref = this.container.createComponent(this.factory, 0);
          } else {
            this.ref = this.container.createComponent(this.factory);
          }
          this.ref.instance._ref = this.ref;
          this.ref.instance.arr = postData;
        } else {
          this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedlinkpostComponent);
          if (newPost) {
            this.ref = this.container.createComponent(this.factory, 0);
          } else {
            this.ref = this.container.createComponent(this.factory);
          }
          this.ref.instance._ref = this.ref;
          this.ref.instance.arr = postData;
        }
      } else if (postData['SHARED_POST_DATA'].TYPE == 2) {
        if (postData['SHARED_POST_DATA'].FILE_TYPE == 1) {
          this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedimagepostComponent);
          if (newPost) {
            this.ref = this.container.createComponent(this.factory, 0);
          } else {
            this.ref = this.container.createComponent(this.factory);
          }
          this.ref.instance._ref = this.ref;
          this.ref.instance.arr = postData;
        }
        if (postData['SHARED_POST_DATA'].FILE_TYPE == 3 || postData['SHARED_POST_DATA'].FILE_TYPE == 4 || postData['SHARED_POST_DATA'].FILE_TYPE == 5) {

          this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedfileattachmentComponent);
          if (newPost) {
            this.ref = this.container.createComponent(this.factory, 0);
          } else {
            this.ref = this.container.createComponent(this.factory);
          }
          this.ref.instance._ref = this.ref;
          this.ref.instance.arr = postData;
        }
      } else if (postData['SHARED_POST_DATA'].TYPE == 3) {
        postData['MY_PROFILE'] = false;
        if (postData['SHARED_POST_DATA']['QUESTION_TYPE'] == 1) {
          this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedsinglechoicepostComponent);
          if (newPost) {
            this.ref = this.container.createComponent(this.factory, 0);
          } else {
            this.ref = this.container.createComponent(this.factory);
          }
          this.ref.instance._ref = this.ref;
          this.ref.instance.arr = postData;
        } else if (postData['SHARED_POST_DATA']['QUESTION_TYPE'] == 2) {
          this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedmultiplechoicepostComponent);
          if (newPost) {
            this.ref = this.container.createComponent(this.factory, 0);
          } else {
            this.ref = this.container.createComponent(this.factory);
          }
          this.ref.instance._ref = this.ref;
          this.ref.instance.arr = postData;
        } else if (postData['SHARED_POST_DATA']['QUESTION_TYPE'] == 3) {
          this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedtruefalsepostComponent);
          if (newPost) {
            this.ref = this.container.createComponent(this.factory, 0);
          } else {
            this.ref = this.container.createComponent(this.factory);
          }
          this.ref.instance._ref = this.ref;
          this.ref.instance.arr = postData;
        }
      } else if (postData['SHARED_POST_DATA'].TYPE == 5 || postData['SHARED_POST_DATA'].TYPE == 6) {
        this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedvideopostComponent);
        if (newPost) {
          this.ref = this.container.createComponent(this.factory, 0);
        } else {
          this.ref = this.container.createComponent(this.factory);
        }
        this.ref.instance._ref = this.ref;
        this.ref.instance.arr = postData;
      } else if (postData['SHARED_POST_DATA']['TYPE'] == 7) {
        this.factory = this.componentFactoryResolver.resolveComponentFactory(SharedcoursepostComponent);
        if (newPost) {
          this.ref = this.container.createComponent(this.factory, 0);
        } else {
          this.ref = this.container.createComponent(this.factory);
        }
        this.ref.instance._ref = this.ref;
        this.ref.instance.arr = postData;
      }

    } else if (postData['TYPE'] == 5 || postData['TYPE'] == 6) {
      this.factory = this.componentFactoryResolver.resolveComponentFactory(VideopostComponent);
      if (newPost) {
        this.ref = this.container.createComponent(this.factory, 0);
      } else {
        this.ref = this.container.createComponent(this.factory);
      }
      this.ref.instance._ref = this.ref;
      this.ref.instance.arr = postData;
    } else if (postData['TYPE'] == 7) {
      this.factory = this.componentFactoryResolver.resolveComponentFactory(CoursepostComponent);
      if (newPost) {
        this.ref = this.container.createComponent(this.factory, 0);
      } else {
        this.ref = this.container.createComponent(this.factory);
      }
      this.ref.instance._ref = this.ref;
      this.ref.instance.arr = postData;
      this.ref.instance.onWall=true;
    }
  }

  getQuestionPostData(post_id, url, newPost: boolean) {
    this.postPresent = true;
    var postData = {};

    postData['token'] = this._constantService.getSessionDataBYKey('token');
    postData['token_param'] = {};
    postData['token_param']['device_type'] = 'w';
    postData['token_param']['host'] = '';
    postData['pid'] = post_id;
    this._constantService.fetchDataApi(url, postData).subscribe(data => {
      var responseData:any = data;
      var status = responseData.STATUS;
      if (status == this._constantService.success_msg) {
        this._constantService.setSessionJsonPair('token', responseData.TOKEN);
        postData = responseData.POST_DATA[0];
        if (postData['REPORTED'] == 0) {
          postData['PROFILE_VIEW'] = this.profileView;
          if (this.user_type == 1) {
            postData['MY_PROFILE'] = true;
          } else {
            postData['MY_PROFILE'] = false;
          }
          postData['IS_PAGEFEED'] = true;
          this.QuesPostBuilder(postData, newPost);
        }
      } else if (status == this._constantService.error_token) {
        this.sessionLogout.emit(true);
      } else {
        this.dataConf['type'] = 2;
        this.dataConf['msg'] = "STUDY24X7";
        this.dataConf['error_msg'] = responseData.ERROR_MSG;
        this.openConfirmation = true;
      }
    }, error => {
      var responseData = error;
      if (responseData.status == 500) {
        this.router.navigate(['500']);
      }
    });
  }



  QuesPostBuilder(postData, newPost) {
    postData['ADD_DATE_TIME'] = this.getPostDateTime(postData['ADD_DATE_TIME']);
    if (postData['QUESTION_TYPE'] == 1) {
      this.factory = this.componentFactoryResolver.resolveComponentFactory(SinglechoicepostComponent);
      if (newPost) {
        this.ref = this.container.createComponent(this.factory, 0);
      } else {
        this.ref = this.container.createComponent(this.factory);
      }
      this.ref.instance._ref = this.ref;
      this.ref.instance.arr = postData;
    } else if (postData['QUESTION_TYPE'] == 2) {
      this.factory = this.componentFactoryResolver.resolveComponentFactory(MultiplechoicepostComponent);
      if (newPost) {
        this.ref = this.container.createComponent(this.factory, 0);
      } else {
        this.ref = this.container.createComponent(this.factory);
      }
      this.ref.instance._ref = this.ref;
      this.ref.instance.arr = postData;
    } else if (postData['QUESTION_TYPE'] == 3) {
      this.factory = this.componentFactoryResolver.resolveComponentFactory(TruefalsepostComponent);
      if (newPost) {
        this.ref = this.container.createComponent(this.factory, 0);
      } else {
        this.ref = this.container.createComponent(this.factory);
      }
      this.ref.instance._ref = this.ref;
      this.ref.instance.arr = postData;
    }
  }


  getPostDateTime(posttime: any) {
    var date = new Date(posttime);
    var day = date.getDate();
    var month = date.toLocaleString("en-us", { month: "short" });
    var time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    var year = date.getFullYear();
    var currentTime = new Date();
    var currentTimetoday = Math.floor(Date.now());
    var diff = Math.abs(currentTimetoday - posttime) / 1000;
    var days = Math.floor(diff / 86400);
    var currentYear = currentTime.getFullYear();
    var year_diff = currentYear - year;
    var result = "";
    if (days == 0) {
      diff -= days * 86400;
      var hour = Math.floor(diff / 3600) % 24;
      diff -= hour * 3600;
      var min = Math.floor(diff / 60) % 60;
      if (min == 0 && hour == 0) {
        result = "Just Now";
      } else if (min == 0 && hour != 0) {
        result = hour + " hr";
      } else if (min != 0 && hour == 0) {
        result = min + " min";
      } else {
        result = hour + " hr " + min + " min";
      }
    } else {
      if (year_diff == 0) {
        result = day + " " + month + " " + time;
      } else {
        result = day + " " + month + " " + year + " " + time;
      }
    }
    return result;
  }



  onScrollDown(event) {
    if (this.continueScroll) {
      this.getPagePost(this.lstTypePostId);
    }
    if (this.continueScrollSearch) {
      this.getTypeWisePost(this.lstUpdTime);
    }
    // if(this.postPresent){
    //   this.getArticlePost(this.lastPostCount_1)
    // }
  }



  getLatestPids10PublicPost(paramsId) {

    var lastInterest = {};
    lastInterest['pg_uuid'] = this.pageId;
    this._constantService.fetchDataApi(this._constantService.getLatestPgids10PublicPost(), lastInterest).subscribe(data => {
      var responseData:any = data;
      var status = responseData.STATUS;
      if (status == this._constantService.success_msg) {
        this.loadPageFeeds = false;
        if (responseData.POST_DATA.length != 0) {
          this.postPresent = true;
          for (var i = 0; i < responseData.POST_DATA.length; i++) {
            let postData = responseData.POST_DATA[i];
            postData['MY_PROFILE'] = false;
            postData['IS_PAGEFEED'] = true;
            postData['ADD_DATE_TIME'] = this.getPostDateTime(postData['ADD_DATE_TIME']);
            if (postData['TYPE'] == 4) {
              postData['SHARED_POST_DATA'].ADD_DATE_TIME = this.getPostDateTime(postData['SHARED_POST_DATA'].ADD_DATE_TIME);
            }
            this.factory = this.componentFactoryResolver.resolveComponentFactory(PostotherviewComponent);
            this.ref = this.container.createComponent(this.factory);
            this.ref.instance.arr = postData;
          }
        } else {
          this.postPresent = false;
        }
      }
    }, error => {
      var responseData = error;
      if (responseData.status == 500) {
        this.router.navigate(['500']);
      }
    });
  }


  getQuestionPublicPost() {
    var lastInterest = {};
    lastInterest['pg_uuid'] = this.pageUuid;
    lastInterest['lspid'] = "";
    lastInterest['ptyp'] = 3;
    this._constantService.fetchDataApi(this._constantService.getPostTypeWiseSearchPublicPageServiceUrl(), lastInterest).subscribe(data => {
      var responseData:any = data;
      var status = responseData.STATUS;
      if (status == this._constantService.success_msg) {
        this.loadPageFeeds = false;
        if (responseData.POST_DATA.length != 0) {
          this.postPresent = true;
          for (var i = 0; i < responseData.POST_DATA.length; i++) {
            let postData = responseData.POST_DATA[i];
            postData['MY_PROFILE'] = false;
            postData['IS_PAGEFEED'] = true;
            postData['ADD_DATE_TIME'] = this.getPostDateTime(postData['ADD_DATE_TIME']);
            if (postData['TYPE'] == 4) {
              postData['SHARED_POST_DATA'].ADD_DATE_TIME = this.getPostDateTime(postData['SHARED_POST_DATA'].ADD_DATE_TIME);
            }
            this.factory = this.componentFactoryResolver.resolveComponentFactory(PostotherviewComponent);
            this.ref = this.container.createComponent(this.factory);
            this.ref.instance.arr = postData;
          }
        } else {
          this.postPresent = false;
        }
      }
    }, error => {
      var responseData = error;
      if (responseData.status == 500) {
        this.router.navigate(['500']);
      }
    });
  }



  getTypeWisePost(lstUpdTime) {
    var typWiseSrch = {};
    typWiseSrch['token'] = this._constantService.getSessionDataBYKey('token');
    typWiseSrch['token_param'] = {};
    typWiseSrch['token_param']['device_type'] = 'w';
    typWiseSrch['token_param']['host'] = '';
    typWiseSrch['pg_uuid'] = this.pageId;
    typWiseSrch['ldatetime'] = lstUpdTime;
    typWiseSrch['ptyp'] = this.postFilter;
    this._constantService.fetchDataApi(this._constantService.getPostTypeWiseSearchPageServiceUrl(), typWiseSrch).subscribe(data => {
      var responseData:any = data;
      var status = responseData.STATUS;
      if (status == this._constantService.success_msg) {
        if (lstUpdTime == "") {
          this.container.clear();
        }
        if (responseData.SEARCHED_DATA.length < 10) {
          this.continueScrollSearch = false;
        } else {
          this.continueScrollSearch = true;
        }
        if (responseData.SEARCHED_DATA.length != 0) {
          this.lstUpdTime = responseData.SEARCHED_DATA[responseData.SEARCHED_DATA.length - 1].split("#")[1];
          for (var i = 0; i < responseData.SEARCHED_DATA.length; i++) {
            if (responseData.SEARCHED_DATA[i].split("#")[0].split(":")[2] != "3") {
              this.getLatestPostData(responseData.SEARCHED_DATA[i].split("#")[0], "flow", false);
            } else if (responseData.SEARCHED_DATA[i].split("#")[0].split(":")[2] == "3") {
              if (parseInt(responseData.SEARCHED_DATA[i].split("#")[0].split(":")[0]) == this._constantService.getSessionDataBYKey('u_id')) {
                this.getQuestionPostData(responseData.SEARCHED_DATA[i].split("#")[0], this._constantService.getQuestionPostDataProfileServiceUrl(), false);
              } else {
                this.getQuestionPostData(responseData.SEARCHED_DATA[i].split("#")[0], this._constantService.getQuestionPostDataWallServiceUrl(), false);
              }
            }
          }
        } else {
          if (lstUpdTime == "") {
            this.loadPageFeeds = false;
            this.postPresent = false;
          }
        }
      }
    });
  }

  getArticlePost(pageId) {
    var hitObj = {};
    hitObj['token_param'] = {};
    hitObj['token_param']['device_type'] = "w";
    hitObj['token_param']['host'] = "";
    hitObj['flow'] = 'd';
    hitObj['count'] = '10';
    hitObj['lspid1'] = this.lastPostCount_1;
    hitObj['pg_uuid'] = pageId;

    var url = "";
    if (this._constantService.getSessionDataBYKey('token')) {
      hitObj['token'] = this._constantService.getSessionDataBYKey('token');
      url = this._constantService.getArticlePostDataServiceUrl();
    } else {
      hitObj['is_art'] = 1;
      url = this._constantService.getPageArticlesWithoutToken();
    }

    this._constantService.fetchDataApi(url, hitObj).subscribe(data => {
      var responseData:any = data;
      var status = responseData.STATUS;
      if (status == this._constantService.success_msg) {
        if (this.lastPostCount_1 == 0) {
          this.container.clear();
        }
        this.loadPageFeeds = false;
        this.postPresent = true;
        this.lastPostCount_1 = responseData.LSPID1;

        var postArray = responseData.POST_DATA;
        if (postArray.length != 0) {
          this.postPresent = true;

          for (var i = postArray.length-1; i>=0  ; i--) {

            let postData = postArray[i];
            if (postData['REPORTED'] == 0) {
              postData['PROFILE_VIEW'] = this.profileView;
              if (this.urlArr[1] == "profile") {
                if (this.userName == "" || this.userName == this._constantService.getUserName() || postData['USER_ID'] == this._constantService.getSessionDataBYKey('u_id')) {
                  postData['MY_PROFILE'] = true;
                } else {
                  postData['MY_PROFILE'] = false;
                }
              } else {
                if (postData['USER_ID'] == this._constantService.getSessionDataBYKey('u_id')) {
                  postData['MY_PROFILE'] = true;
                } else {
                  postData['MY_PROFILE'] = false;
                }
              }

              if (hitObj['token']) {
                this.postBuilder(postData, true);
              } else {
                this.factory = this.componentFactoryResolver.resolveComponentFactory(PostotherviewComponent);
                this.ref = this.container.createComponent(this.factory);
                this.ref.instance.arr = postData;
              }

            } else if (!hitObj['token']) {
              postData['ADD_DATE_TIME'] = this.getPostDateTime(postData['ADD_DATE_TIME']);
              this.factory = this.componentFactoryResolver.resolveComponentFactory(PostotherviewComponent);
              this.ref = this.container.createComponent(this.factory);
              this.ref.instance.arr = postData;
            }
          }
        } else {
          this.postPresent = false;
        }
      } else if (status == this._constantService.error_token) {
        this.dataConf['type'] = 4;
        this.dataConf['msg'] = "Session Expire";
        this.dataConf['error_msg'] = "Session Expired!";
        this.openConfirmation = true;
        return false;
      } else {
        this.dataConf['type'] = 2;
        this.dataConf['msg'] = "Error";
        this.dataConf['error_msg'] = responseData.ERROR_MSG;
        this.openConfirmation = true;
        return false;
      }
    }), error => {
      var err = error;
      if (err.status == 500) {
        this.router.navigate(['500']);
      }
    };
  }



}
