import { Component, ViewChild, OnInit, Output, Input, EventEmitter, ComponentFactoryResolver, ViewContainerRef, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConstantService } from './../../../services/constant.service';
import { EncryptionService } from './../../../services/encryption.service';
import { PostdataService } from './../../../services/postdata.service';
declare var Quill;
import { CommentComponent } from "./../../../sharedComponents/postComponents/commentView/comment.component";


@Component({
    selector: 'app-view-article',
    templateUrl: './view-article.component.html',
    styleUrls: ['./view-article.component.scss',
       './../../../sharedComponents/postComponents/textpost/allpost.css',
     './../../../sharedComponents/postComponents/post-header/post-header.component.scss',
     './../../../sharedComponents/postComponents/post-footer/post-footer.component.scss'

   ]
})
export class ViewArticleComponent implements OnInit, AfterViewInit {
    articleUrl: any;
    articlePostData: any;
    usrData = {};
    openLoginPopup: boolean = false;
    isPublicView: boolean = false;
    @ViewChild('container', { read: ViewContainerRef }) container;
    @ViewChild('container2', { read: ViewContainerRef }) container2;
    quillEditor: any;
    postmenu: boolean = false;
    user_interest;
    shwwallshowInterest: boolean;
    pageId: string = "";
    artl_id = "";
    time;
    coverPic = '';
    coverPicArticle = '';
    articleTitle;
    articleText;
    viewArticleDate: any = [];
    followbutton: boolean;
    unfollow: boolean;
    follow: boolean;
    dataConf = {};
    openConfirmation: boolean = false;
    atime;
    toolbarOptions = [];
    _ref: any;

    importantCondition = false;
    like = 0;
    comment = 0;
    share = 0;
    isSharePostList: boolean = false;
    userLikeShareList = [];
    impLikeShareStatus: boolean = false;
    comment_image: any;
    showPreloader: boolean = false;
    showCommentImg: number = 1;
    image_upload_url = '';
    uuid: any;
    commImageDimns: any;
    file_path = "";
    sharescreenlinkpara: boolean = false;

    postPublicShareLink: any;
    socialFbShareUrl: any;
    socialTeitterShareUrl: any;
    socialLinkedInShareUrl: any;
    socialTelegramUrl: any;
    socialWhatsappLink: any;
    sharelinkpostscreen: boolean = false;
    isCommentHit: boolean = false;
    page_uuid;
    c_data: any;
    hideSpan = 1;
    viewCommentList: boolean = false;
    post_id;
    lastCommentId = 0;
    ref;
    urlLink: any;
    factory;
    u_id
    commentPresent: boolean = false;
    user_name;
    for_page: boolean;
    for_user: boolean;
    mySetInterval;
    reportpopup: boolean;
    likedetailspopup: boolean;
    postimagediv: boolean = false;
    constructor(
        public activatedRoute: ActivatedRoute,
        public _constantService: ConstantService,
        public _encrypt: EncryptionService,
        public postdata: PostdataService,
        public _router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
    ) { }

    ngOnInit() {
        var link = document.createElement('link');
        link.id = 'id2';
        link.rel = 'stylesheet';
        // link.href = 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
        document.head.appendChild(link);
        document.getElementsByTagName('head')[0].appendChild(link);

        var script = document.createElement('script');
        script.onload = function () {
            // alert("Script loaded and ready");
        };
        // script.src = "https://cdn.quilljs.com/1.3.6/quill.js";
        document.getElementsByTagName('head')[0].appendChild(script);

        let tkn = this._constantService.getSessionDataBYKey('token');
        if (tkn && tkn != 'undefined') {
            this.isPublicView = false;
        }
        else {
            this.isPublicView = true;
            this._constantService.getInterest();
        }

        this.activatedRoute.params.subscribe((params: Params) => {
            if (params['id']) {
                this.artl_id = params['id'];
                if (this.isPublicView) {
                    this.getArticleDetailswithoutToken();
                } else {
                    this.getArticleDetails();
                }

            } else {
                this._router.navigate(['home']);
            }
        });

        var interestall = JSON.parse(this._constantService.getSessionDataBYKey('interests'));
        this.user_interest = [];
        for (let key in interestall) {
            var obj = { "STATUS": true, "INTEREST_ID": key, "INTEREST_NAME": interestall[key] };
            this.user_interest.push(obj);
        }








    }
    postimageshow(event) {
        this.postimagediv = true;
        // this.oneViewPath = event.target.currentSrc;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }
    postImageHide(event) {
        this.postimagediv = false;
        //this.imagepostviewsec = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }



    ngAfterViewInit() {
    }



    postdropdown() {
        this.postmenu = !this.postmenu;
    }

    getArticleTextOnly() {
        var articleDetails = {};
        articleDetails['artl_id'] = this.artl_id;

        this._constantService.fetchDataApi(this._constantService.getArticleSinglePostOnlyTextView(),articleDetails).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            // this.arr=responseData;
            if (status == 'success') {
                document.getElementById('editor').innerHTML = this.postdata.decodeURIPostData(responseData.ARTICLE_TEXT);
            }
        });
    }

    getArticleDetails() {
        var articleDetails = {};
        articleDetails['token'] = this._constantService.getSessionDataBYKey('token');
        articleDetails['token_param'] = {};
        articleDetails['token_param']['device_type'] = 'w';
        articleDetails['token_param']['host'] = '';

        articleDetails['artl_id'] = this.artl_id;


        this._constantService.fetchDataApi(this._constantService.getArticleSinglePostView(),articleDetails).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            // this.arr=responseData;
            this.viewArticleDate = responseData;
            if (status == 'success') {
                this.getArticleTextOnly();
                this.articleUrl = responseData.ARTICLE_URL;
                if (responseData.ARTICLE_URL && responseData.ARTICLE_ID) {
                    window.history.replaceState(null, null, 'article/' + responseData.ARTICLE_ID + '/' + responseData.ARTICLE_URL);
                }


                this.postPublicShareLink = this._constantService.staticArticleShareLink + this.viewArticleDate.ARTICLE_ID + '/' + this.viewArticleDate.ARTICLE_URL;
                this.socialFbShareUrl = "https://www.facebook.com/dialog/feed?app_id=" + this._constantService.facebookAppId + "&link=" + this.postPublicShareLink;
                this.socialTeitterShareUrl = "https://twitter.com/intent/tweet?text=''" + "&url=" + this.postPublicShareLink;
                this.socialLinkedInShareUrl = "https://www.linkedin.com/sharing/share-offsite/?url=" + this.postPublicShareLink;
                this.socialTelegramUrl = "https://telegram.me/share/url?url=" + this.postPublicShareLink;
                this.socialWhatsappLink = "https://api.whatsapp.com/send?text=" + this.postPublicShareLink;
                this.articleUrl = responseData.ARTICLE_URL;

                if (responseData.LIKED == 0) {
                    this.importantCondition = false;
                }
                else {
                    this.importantCondition = true;
                }
                this.post_id = responseData.POST_ID;
                this.getLatestPostData(this.post_id);

                if (responseData.LT_COMM_DATA && responseData.LT_COMM_DATA.USER_POST_ID) {
                    this.lastCommentId = 0;
                    setTimeout(() => {
                        this.getComment();
                    }, 3000);
                }

                if (responseData.PAGE_UUID !== null) {
                    this.viewArticleDate['id'] = responseData.PAGE_UUID;
                    this.viewArticleDate['POST_ID'] = responseData.POST_ID;
                    this.viewArticleDate['title'] = this.postdata.decodeURIPostData(responseData.TITLE);
                    this.page_uuid = responseData.PAGE_UUID;
                    this.for_page = true;
                    this.viewArticleDate['time'] = responseData.UPDATE_DATE_TIME;
                    this.viewArticleDate['profile_pic_path'] = this._constantService.createPageProfilePath(responseData.PAGE_PROFILE_PHOTO_PATH, responseData.PAGE_UUID, responseData.ADD_DATE_TIME, responseData.PAGE_TYPE);
                    this.viewArticleDate['articleTitle'] = this.postdata.decodeURIPostData(responseData.ARTICLE_TITLE);
                    // this.viewArticleDate['articleText'] = this.postdata.decodeURIPostData(responseData.ARTICLE_TEXT);
                    if (responseData.IS_ADMIN == 1 || responseData.PAGE_FOLLOW_STATUS == 1) {
                        this.followbutton = false;
                    } else {
                        this.followbutton = true;
                    }
                    this.viewArticleDate['article_URL'] = responseData.ARTICLE_URL;
                    // this.postPublicShareLink = this._constantService.staticArticleShareLink + this.viewArticleDate['article_URL'];
                } else {
                    this.user_name = responseData.USER_NAME;
                    this.viewArticleDate['title'] = this.postdata.decodeURIPostData(responseData.USER_FULL_NAME);
                    this.user_name = responseData.USER_NAME;
                    this.for_user = true;
                    this.viewArticleDate['time'] = responseData.UPDATE_DATE_TIME;
                    this.viewArticleDate['articleTitle'] = this.postdata.decodeURIPostData(responseData.ARTICLE_TITLE);
                    this.viewArticleDate['POST_ID'] = responseData.POST_ID;
                    //                    this.viewArticleDate['articleText'] = this._encrypt.decrypt(responseData.ARTICLE_TEXT);
                    this.followbutton = false;
                    this.viewArticleDate['profile_pic_path'] = this._constantService.createuserProfilePath(responseData.PROFILE_PHOTO_PATH, responseData.USER_ID, responseData.ADD_DATE_TIME)
                    this.viewArticleDate['article_URL'] = responseData.ARTICLE_URL;
                    // this.postPublicShareLink = this._constantService.staticArticleShareLink + this.viewArticleDate['article_URL'];
                }

                this.coverPicArticle = responseData.ARTICLE_COVER_URL ? responseData.ARTICLE_COVER_URL + '/' + responseData.ARTICLE_UUID + '.png?v=' + responseData.UPDATE_DATE_TIME : "";
                this.coverPic = responseData.ARTICLE_COVER_URL ? responseData.ARTICLE_COVER_URL + '/' + responseData.ARTICLE_UUID + '.png?v=' + responseData.UPDATE_DATE_TIME : "";
                console.log(this.coverPic);
                let intObject = JSON.parse(responseData.ARTICLE_INTEREST);
                let post_tags = intObject.Interest;
                post_tags.forEach((id) => {
                    for (let obj of this.user_interest) {
                        if (obj.INTEREST_ID == id) {
                            this.addTags(id, obj['INTEREST_NAME']);
                        }
                    }
                });



                // if (this.quillEditor) {
                //     this.quillEditor.root.innerHTML = this.postdata.decodeURIPostData(responseData.ARTICLE_TEXT);
                //     console.log(this.quillEditor.root.innerHTML);

                // } else {
                //     this.mySetInterval = setInterval(() => {
                //         if (this.quillEditor){
                //         this.quillEditor.root.innerHTML = this.postdata.decodeURIPostData(responseData.ARTICLE_TEXT);
                //         console.log("setInterval quill")
                //         console.log(this.quillEditor.root.innerHTML);

                //             clearInterval(this.mySetInterval);
                //         }
                //     }, 1000);
                // }



            } else if (status == this._constantService.error_token) {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    addTags(tag_id, tag_name) {
        var tag = document.createElement('span');
        tag.id = "tag_" + tag_id;
        tag.className = 'tags';
        tag.innerHTML = tag_name;
        var tags = document.getElementById('posttagdiv');
        if (tags) {
            tags.insertBefore(tag, tags.childNodes[0]);
        }
    }
    pageFollowUnFollow(id) {

        var followUnfollow = {};
        followUnfollow['token'] = this._constantService.getSessionDataBYKey('token');
        followUnfollow['token_param'] = {};
        followUnfollow['token_param']['device_type'] = 'w';
        followUnfollow['token_param']['host'] = '';
        followUnfollow['pg_uuid'] = id;


        this._constantService.fetchDataApi(this._constantService.getPageFollowServiceUrl(),followUnfollow).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                // this.follow = true;
                this.followbutton = false;

            }
        })
    }
    showNotify() {
        this._constantService.showToast("Link has been Copied", "", "1");

    }


    important() {
        var importData = {};
        importData['token'] = this._constantService.getSessionDataBYKey('token');
        importData['token_param'] = {};
        importData['token_param']['device_type'] = 'w';
        importData['token_param']['host'] = '';
        console.log(this.viewArticleDate['POST_ID']);
        importData['pid'] = this.viewArticleDate['POST_ID'];
        if (this.importantCondition) {
            importData['status'] = 1;
        } else {
            importData['status'] = 0;
        }


        this._constantService.fetchDataApi(this._constantService.putUserPostImportantServiceUrl(),importData).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.importantCondition = !this.importantCondition;
                if (this.importantCondition) {
                    this.viewArticleDate['LIKED_COUNT'] = this.viewArticleDate['LIKED_COUNT'] + 1;
                } else {
                    this.viewArticleDate['LIKED_COUNT'] = this.viewArticleDate['LIKED_COUNT'] - 1;
                }
            } else if (status == this._constantService.error_token) {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // share artile list show and hide function start
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    hideSocialList() {
        let id = 'social_List';
        if (document.getElementById(id)) {
            document.getElementById(id).style.display = "none";
            document.getElementById(id).style.top = "0px";
        }
        this.isSharePostList = false;
    }

    showSharePostList(event) {
        let id = 'social_List';
        event.preventDefault();
        event.stopPropagation();
        this.isSharePostList = true;
        if (event.clientY > 500) {
            setTimeout(() => {
                if (document.getElementById(id)) {
                    document.getElementById(id).style.top = "-105px";
                    document.getElementById(id).style.display = "block";
                }
            }, 200);
        }
        else {
            setTimeout(() => {
                if (document.getElementById(id)) {
                    document.getElementById(id).style.top = "0px";
                    document.getElementById(id).style.display = "block";
                }

            }, 200);
        }
    }
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // share artile list show and hide function end
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // function for show the list who like your post
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    impLikeShareFn(count, type) {
        this.userLikeShareList['postId'] = this.viewArticleDate['POST_ID'];;
        this.userLikeShareList['type'] = type;
        this.userLikeShareList['count'] = count;
        this.impLikeShareStatus = !this.impLikeShareStatus;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // add image in comment box function
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    addImageFile(event: any) {

        this.comment_image = event.target.files[0];
        let type = this.comment_image.name;
        var reader = new FileReader();
        var typearr = type.split(".");
        this.showPreloader = true;
        var size = Math.round(this.comment_image.size / 1000 / 1000);
        if (size <= 10) {
            if (typearr[1] == 'jpg' || typearr[1] == 'jpeg' || typearr[1] == 'JPG' || typearr[1] == 'JPEG' || typearr[1] == 'png' || typearr[1] == 'PNG') {
                this.showCommentImg = 2;
                reader.onload = (event: any) => {
                    this.image_upload_url = event.target.result;
                }
                reader.readAsDataURL(event.target.files[0]);
                var upload = {};
                upload['token'] = this._constantService.getSessionDataBYKey('token');
                upload['token_param'] = {};
                upload['token_param']['device_type'] = "w";
                upload['token_param']['host'] = "";
                var data = JSON.stringify(upload);
                var encData = this._encrypt.encrypt(data);
                let formData = new FormData();
                formData.append("file", this.comment_image);
                formData.append("pattchid", '0');
                formData.append("token", encData);
                formData.append("type", "4");
                this._constantService.uploadFileApi(this._constantService.getUploadFileServiceUrl(), formData).subscribe(data => {
                    var responseData:any = data;
                    var status = responseData.STATUS;
                    if (status == this._constantService.success_msg) {
                        this.autoFocus();
                        this.showPreloader = false;
                        this.commImageDimns = responseData.DIMENSION;
                        this.file_path = responseData.FPATH;
                        this.uuid = responseData.UUID;
                        //this._constantService.setToken(responseData.TOKEN);
                        this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                    } else if (status == this._constantService.error_token) {
                        this._constantService.clearUserInfo()
                        this._router.navigate(['']);
                        this.dataConf['type'] = 4;
                        this.dataConf['msg'] = "Session Expire";
                        this.dataConf['error_msg'] = "Session Expired";
                        this.openConfirmation = true;
                    } else {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "STUDY24X7";
                        this.dataConf['error_msg'] = responseData.ERROR_MSG;
                        this.openConfirmation = true;
                        this.showCommentImg = 1;
                        this.comment_image = null;
                    }
                }, error => {
                    var responseData = error;
                    if (responseData.status == 500) {
                        this._router.navigate(['500']);
                    }
                });
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = "Unable to support the selected file";
                this.openConfirmation = true;
                this.showCommentImg = 1;
                this.comment_image = null;
            }
        } else {
            this.dataConf['msg'] = "STUDY24X7";
            this.dataConf['type'] = 2;
            this.dataConf['error_msg'] = "File above 10mb is not allowed";
            this.openConfirmation = true;
            this.showCommentImg = 1;
            this.comment_image = null;
        }

    }

    autoFocus() {
        console.log("focus");
        var id = 'comment_focus';
        var x = document.getElementById(id);
        if (x.innerText == this._constantService.commentPlaceHolder) {
            x.innerText = '';
        }
        (<HTMLInputElement>document.getElementById(id)).focus();
    }

    showPlaceHolder(event) {
        if (event.target.innerText.length == 0 || event.target.innerText.length == 1) {
            event.target.classList.add("placeholdercolor");
            event.target.classList.remove("option_inputt", "setwdth");
            event.target.innerText = this._constantService.commentPlaceHolder;
        }
    }

    hidePlaceHolder(event) {
        if (event.target.innerText == this._constantService.commentPlaceHolder) {
            event.target.innerText = "";
            var v = document.getElementById(event.target.id);
            v.classList.remove("placeholdercolor");
            v.classList.add("option_inputt", "setwdth");
            this.isCommentHit = false;
        }
        document.getElementById(event.target.id).focus();
    }

    sharelinkpostscreenhide(sharescreenlinkpara) {
        if (sharescreenlinkpara == true) {
            let body = document.getElementsByTagName('body')[0];
            body.classList.add("body-overflow");
        }
        else {
            let body = document.getElementsByTagName('body')[0];
            body.classList.remove("body-overflow");
        }
        this.sharelinkpostscreen = false;
        if (sharescreenlinkpara) {
            this.share++;
        }
    }

    confirmText(value, event) {
        event.preventDefault();
        event.stopPropagation();
    }

    sharescreenlinkPost() {
        // this.arr['EDIT_POST'] = false;
        this.sharelinkpostscreen = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }

    updateProfilePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }

    addComment(event) {
        if (event.keyCode == 13 && !event.ctrlKey && !event.shiftKey) {

            if (this.isCommentHit) {
                return false;
            } else {
                this.isCommentHit = true;
            }

            this.c_data = this.postdata.postDataManipulation(event.target.id);

            if (this.c_data.length == 0 && this.comment_image == null) {
                this.confirmText(this.c_data, event);
                return false;
            }

            this.hideSpan = 0;
            this.viewCommentList = true;
            var id = event.target.id;
            var comment = {};
            comment['token'] = this._constantService.getSessionDataBYKey('token');
            comment['token_param'] = {};
            comment['token_param']['device_type'] = 'w';
            comment['token_param']['host'] = '';
            comment['pid'] = this.post_id;
            comment['cmda'] = this.postdata.encodeURIPostData(this.c_data);
            comment['cmid'] = "0";
            if (this.comment_image != null) {
                comment['fpath'] = this.file_path;
                comment['uuid'] = this.uuid;
                comment['dimns'] = this.commImageDimns;
            } else {
                comment['fpath'] = "";
                comment['uuid'] = "";
            }
            if (comment['cmda'].length == 0 && this.comment_image == null) {
                return false;
            }


            event.preventDefault();
            if (this.isCommentHit == true) {
                this._constantService.fetchDataApi(this._constantService.putCommentServiceUrl(),comment).subscribe(data => {
                    var responseData:any = data;
                    var status = responseData.STATUS;
                    if (status == this._constantService.success_msg) {
                        this.showCommentImg = 1;
                        this.comment_image = null;
                        this.hideSpan = 1;
                        var date = new Date();
                        var addComment = {};
                        var count = (<HTMLElement>document.getElementById(this.post_id + '_comm_count'));
                        if (count != null) {
                            if (parseInt(count.innerHTML) == 0) {
                                count.style.display = "inline-block";
                            }
                            count.innerHTML = (parseInt(count.innerHTML) + 1).toString();
                        } else {
                            this.comment = 1;
                        }
                        addComment['COMMENT_BY'] = this._constantService.getSessionDataBYKey('u_id');
                        addComment['IMAGE_PATH'] = this.file_path;
                        addComment['PARENT_ID'] = null;
                        addComment['PROFILE_PHOTO_PATH'] = this._constantService.getSessionDataBYKey('profile_pic_s3');
                        addComment['TEXT'] = this.c_data;
                        addComment['USER_COMMENT_ID'] = responseData.COMID;
                        addComment['USER_FULL_NAME'] = this._constantService.getSessionDataBYKey('full_name');
                        addComment['USER_NAME'] = this._constantService.getSessionDataBYKey('username');
                        addComment['USER_POST_ID'] = this.post_id;
                        addComment['UNIQUE_COMMENT_ATTACHMENT_ID'] = this.uuid;
                        //this._constantService.setCommentData(addComment);
                        addComment['ADD_DATE_TIME'] = this.postdata.getPostDateTime(date.getTime());
                        this.factory = this.componentFactoryResolver.resolveComponentFactory(CommentComponent);
                        this.ref = this.container.createComponent(this.factory, 0);
                        this.ref.instance.arr = addComment;
                        this.ref.instance._ref = this.ref;
                        event.target.innerHTML = this._constantService.commentPlaceHolder;
                        event.target.classList.add("placeholdercolor");
                        event.target.classList.remove("option_inputt", "setwdth");
                        this.hideSpan = 1;
                        this.uuid = "";
                        this.file_path = "";
                        //remove focus
                        window.getSelection().removeAllRanges();
                        this.isCommentHit = true;
                    } else if (status == this._constantService.error_token) {
                        this.dataConf['type'] = 4;
                        this.dataConf['msg'] = "Session Expire";
                        this.dataConf['error_msg'] = "Session Expired";
                        this.openConfirmation = true;
                    } else {
                        this.dataConf['type'] = 2;
                        this.dataConf['msg'] = "STUDY24X7";
                        this.dataConf['error_msg'] = responseData.ERROR_MSG;
                        this.openConfirmation = true;
                    }
                }, error => {
                    var responseData = error;
                    if (responseData.status == 500) {
                        this._router.navigate(['500']);
                    }
                });
            }
        }
        else if (event.keyCode == 13 && event.keyCode == 17) {
            event.target.innerHTML = event.target.innerHTML + "<br>";
        }
    }


    getComment() {
        console.log("getcomment" + this.lastCommentId);
        this.viewCommentList = true;
        var commentData = {};
        commentData['token'] = this._constantService.getSessionDataBYKey('token');
        commentData['token_param'] = {};
        commentData['token_param']['device_type'] = 'w';
        commentData['token_param']['host'] = '';
        commentData['pid'] = this.post_id;
        commentData['lscmid'] = this.lastCommentId;
        commentData['count'] = 10;
        commentData['flow'] = 'd';

        this._constantService.fetchDataApi(this._constantService.getCommentOnPostServiceUrl(),commentData).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                if (responseData.COMMENT_DATA.length < 10) {
                    this.commentPresent = false;
                } else {
                    this.commentPresent = true;
                }

                for (var i = 0; i < responseData.COMMENT_DATA.length; i++) {
                    //this._constantService.setCommentData(responseData.COMMENT_DATA[i]);
                    this.lastCommentId = responseData.COMMENT_DATA[i].USER_COMMENT_ID;
                    responseData.COMMENT_DATA[i].ADD_DATE_TIME = this.postdata.getPostDateTime(responseData.COMMENT_DATA[i].ADD_DATE_TIME);
                    responseData.COMMENT_DATA[i].USER_POST_ID = this.post_id;
                    this.factory = this.componentFactoryResolver.resolveComponentFactory(CommentComponent);
                    console.log("container" + this.container);
                    this.ref = this.container.createComponent(this.factory);
                    this.ref.instance.arr = responseData.COMMENT_DATA[i];
                    this.ref.instance._ref = this.ref;
                }
            } else if (status == this._constantService.error_token) {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }
    sessionExpire(event) {
        if (event) {
            this.dataConf['type'] = 4;
            this.dataConf['msg'] = "Session Expire";
            this.dataConf['error_msg'] = "Session Expired";
            this.openConfirmation = true;
        }
    }




    getArticleDetailswithoutToken() {
        var articleDetails = {};
        articleDetails['token'] = this._constantService.getSessionDataBYKey('token');
        articleDetails['token_param'] = {};
        articleDetails['token_param']['device_type'] = 'w';
        articleDetails['token_param']['host'] = '';
        articleDetails['artl_id'] = this.artl_id;
        this._constantService.fetchDataApi(this._constantService.getArticleSinglePostView_withoutToken(),articleDetails).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            this.viewArticleDate = responseData;
            setTimeout(() => {
                for (var i = 0; i < this.viewArticleDate.COMMENT_DATA.length; i++) {
                    this.lastCommentId = responseData.COMMENT_DATA[i].USER_COMMENT_ID;
                    this.viewArticleDate.COMMENT_DATA[i].ADD_DATE_TIME = this.postdata.getPostDateTime(this.viewArticleDate.COMMENT_DATA[i].ADD_DATE_TIME);
                    this.viewArticleDate.COMMENT_DATA[i].USER_POST_ID = this.post_id;
                    this.factory = this.componentFactoryResolver.resolveComponentFactory(CommentComponent);
                    this.ref = this.container2.createComponent(this.factory, 0);
                    this.ref.instance.arr = this.viewArticleDate.COMMENT_DATA[i];
                    this.ref.instance._ref = this.ref;
                }
            }, 500);
            if (status == 'success') {
                this.getArticleTextOnly();
                if (responseData.LIKED == 0) {
                    this.importantCondition = false;
                }
                else {
                    this.importantCondition = true;
                }



                this.postPublicShareLink = this._constantService.staticArticleShareLink + this.viewArticleDate['ARTICLE_ID'] + '/' + this.viewArticleDate['ARTICLE_URL'];
                this.socialFbShareUrl = "https://www.facebook.com/dialog/feed?app_id=" + this._constantService.facebookAppId + "&link=" + this.viewArticleDate['ARTICLE_URL'];
                this.socialTeitterShareUrl = "https://twitter.com/intent/tweet?text=''" + "&url=" + this.viewArticleDate['ARTICLE_URL'];
                this.socialLinkedInShareUrl = "https://www.linkedin.com/sharing/share-offsite/?url=" + this.viewArticleDate['ARTICLE_URL'];
                this.socialTelegramUrl = "https://telegram.me/share/url?url=" + this.viewArticleDate['ARTICLE_URL'];
                this.socialWhatsappLink = "https://api.whatsapp.com/send?text=" + this.viewArticleDate['ARTICLE_URL'];
                this.post_id = responseData.POST_ID;


                //                if (responseData.LT_COMM_DATA.USER_POST_ID) {
                //                    this.lastCommentId = 0;
                //                    setTimeout(() => {
                //                        this.getComment();
                //                    }, 3000);
                //                }

                if (responseData.PAGE_UUID !== null) {
                    this.viewArticleDate['id'] = responseData.PAGE_UUID;
                    this.viewArticleDate['POST_ID'] = responseData.POST_ID;

                    this.viewArticleDate['title'] = this.postdata.decodeURIPostData(responseData.TITLE);
                    this.page_uuid = responseData.PAGE_UUID;
                    this.for_page = true;
                    this.viewArticleDate['time'] = (responseData.UPDATE_DATE_TIME);
                    this.viewArticleDate['profile_pic_path'] = this._constantService.createPageProfilePath(responseData.PAGE_PROFILE_PHOTO_PATH, responseData.PAGE_UUID, responseData.ADD_DATE_TIME, responseData.PAGE_TYPE)
                    this.viewArticleDate['articleTitle'] = this.postdata.decodeURIPostData(responseData.ARTICLE_TITLE);
                    this.usrData['PROFILE_PIC_PATH'] = this._constantService.createPageProfilePath(responseData.PAGE_PROFILE_PHOTO_PATH, responseData.PAGE_UUID, responseData.ADD_DATE_TIME, responseData.PAGE_TYPE);
                    this.usrData['USER_FULL_NAME'] = this.postdata.decodeURIPostData(responseData.TITLE);
                    this.viewArticleDate['articleText'] = this.postdata.decodeURIPostData(responseData.ARTICLE_TEXT);

                    if (responseData.IS_ADMIN == 1 || responseData.PAGE_FOLLOW_STATUS == 1) {
                        this.followbutton = false;
                    } else {

                        this.followbutton = true;
                    }
                    this.viewArticleDate['article_URL'] = responseData.ARTICLE_URL;
                    // this.postPublicShareLink = this._constantService.staticArticleShareLink + this.viewArticleDate['article_URL'];
                } else {
                    this.viewArticleDate['title'] = this.postdata.decodeURIPostData(responseData.USER_FULL_NAME);
                    this.user_name = responseData.USER_NAME;
                    this.for_user = true;
                    this.viewArticleDate['time'] = (responseData.UPDATE_DATE_TIME);
                    this.viewArticleDate['articleTitle'] = this.postdata.decodeURIPostData(responseData.ARTICLE_TITLE);
                    this.viewArticleDate['POST_ID'] = responseData.POST_ID;
                    this.usrData['PROFILE_PIC_PATH'] = this._constantService.createPageProfilePath(responseData.PAGE_PROFILE_PHOTO_PATH, responseData.PAGE_UUID, responseData.ADD_DATE_TIME, responseData.PAGE_TYPE);
                    this.usrData['USER_FULL_NAME'] = this.postdata.decodeURIPostData(responseData.TITLE);
                    //                    this.viewArticleDate['articleText'] = this._encrypt.decrypt(responseData.ARTICLE_TEXT);
                    // this.follow_button = false;
                    this.viewArticleDate['profile_pic_path'] = this._constantService.createuserProfilePath(responseData.PROFILE_PHOTO_PATH, responseData.USER_ID, responseData.ADD_DATE_TIME)
                    this.viewArticleDate['article_URL'] = responseData.ARTICLE_URL;
                    // this.postPublicShareLink = this._constantService.staticArticleShareLink + this.viewArticleDate['article_URL'];
                }

                this.coverPic = responseData.ARTICLE_COVER_URL ? responseData.ARTICLE_COVER_URL + '/' + responseData.ARTICLE_UUID + '.png?v=' + responseData.UPDATE_DATE_TIME : "";

                let intObject = JSON.parse(responseData.ARTICLE_INTEREST);
                let post_tags = intObject.Interest;
                const interestSetter = () => {
                    post_tags.forEach((id) => {
                        for (let obj of this.user_interest) {
                            if (obj.INTEREST_ID == id) {
                                this.addTags(id, obj['INTEREST_NAME']);
                            }
                        }
                    });
                }

                if (this.user_interest) {
                    interestSetter();
                } else {
                    setTimeout(() => { interestSetter(); }, 2000);
                }





                // if (this.quillEditor) {
                //     this.quillEditor.root.innerHTML = this.postdata.decodeURIPostData(responseData.ARTICLE_TEXT);
                //     console.log(this.quillEditor.root.innerHTML);
                // } else {
                //     this.mySetInterval = setInterval(() => {
                //         if (this.quillEditor){
                //         this.quillEditor.root.innerHTML = this.postdata.decodeURIPostData(responseData.ARTICLE_TEXT);
                //         console.log("setInterval quill")
                //         console.log(this.quillEditor.root.innerHTML);

                //             clearInterval(this.mySetInterval);
                //         }
                //     }, 1000);
                // }



            }
            else if (status == this._constantService.error_token) {
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    closePopup(event) {
        if (event['error'] == false) {
            this.openConfirmation = false;
        }
        if (event['userConfirmation']) {
            this.openConfirmation = false;
            let body = document.getElementsByTagName('body')[0];
            body.classList.remove("body-overflow");
            //            this.removeImage();
        } else {
            this.openConfirmation = false;
            let body = document.getElementsByTagName('body')[0];
            body.classList.remove("body-overflow");
        }
    }

    closeLoginPopUp(event) {
        this.openLoginPopup = false;
        // if (event['LOGIN']) {
        //     this.withoutToken = false;
        //     this.activatedRoute.params.subscribe((params: Params) => {
        //         this.getUserDetail();
        //         this.getpageDetails(params['id']);
        //     });
        // }
    }
    loginpopupopen() {
        //        this.savePublicPostUrlFxn();
        this.openLoginPopup = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }

    getLatestPostData(postIds: string) {
        var postData = {};
        postData['token'] = this._constantService.getSessionDataBYKey('token');
        postData['token_param'] = {};
        postData['token_param']['device_type'] = 'w';
        postData['token_param']['host'] = '';
        postData['post_id'] = postIds;
        this._constantService.fetchDataApi(this._constantService.getPublicPostDataWithTokenServiceUrl(),postData).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (responseData.STATUS == "error") {
                this._router.navigate(['home']);
            }
            if (responseData.POST_DATA && responseData.POST_DATA.length == 0) {
                this._router.navigate(['home']);
            }
            if (status == this._constantService.success_msg) {
                this.articlePostData = responseData.POST_DATA[0];
                this.articlePostData['EDIT_POST'] = false;
                this.articlePostData['ADD_DATE_TIME'] = this.postdata.getPostDateTime(this.articlePostData['ADD_DATE_TIME']);
                this.articlePostData['IS_ARTICLE'] = true;
                this.articlePostData['ARTICLE_ID'] = this.artl_id;
                this.articlePostData['ARTICLE_URL'] = this.articleUrl;
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }



    reprts() {
        this.reportpopup = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");

    }
    reportpopuphide() {
        this.reportpopup = false;
    }
    likepopup() {
        this.likedetailspopup = true;

    }
    removePost(event) {
        // this._constantService.showToast("Reported successfully", "", "1");
        this.reportpopup = false;
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }
    editPost(articleid) {
        let routing = "/article/edit/" + articleid;
        this._router.navigate([routing]);
    }

}
