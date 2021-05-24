import {Component, ViewChild, OnInit, ComponentFactoryResolver, ViewContainerRef, AfterViewInit} from '@angular/core';
import {ConstantService} from './../../../services/constant.service';
import {Router} from '@angular/router';
import {EncryptionService} from './../../../services//encryption.service';
import {PostdataService} from './../../../services/postdata.service';

@Component({
    selector: 'app-subcomment',
    templateUrl: './subcomment.component.html',
    styleUrls: ['./subcomment.component.scss','./../commentView/comment.component.scss'],
    providers: [ConstantService, EncryptionService]
})
export class SubcommentComponent implements OnInit {
    delVal: boolean = false;
    oneViewPath: any;
    openConfirmation: boolean = false;
    dataConf: {};
    vart: boolean = true;
    replyCount: any;
    c_data: string = "";
    @ViewChild('container', {read: ViewContainerRef}) container;
    showAddReplyOnComment: boolean = false;
    image_upload_url: string = "";
    showEnterReply: boolean = false;
    full_name: string;
    u_name: string;
    parentId;
    commentId;
    postId;
    comment_data: string;
    profile_pic_path: string;
    importantCondition: boolean = false;
    imagePath = "";
    like = 0;
    arr: any;
    hideSpan = 1;
    replycomment_image;
    showCommentImg;
    factory;
    ref;
    u_id;
    file_path = "";
    uuid = '';
    time = "";
    replyEditStatus: boolean = false;
    _ref2: any;
    morecomt: boolean = false;
    isLargeText: boolean = false;
    postimagediv: string = "1";
    altName = "";
    constructor(
        public postdata: PostdataService,
        public _constantService: ConstantService,
        public _encryptionServices: EncryptionService,
        public _router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {
        //this.arr = this._constantService.getCommentData();
        if (this.arr != null) {

        }
    }

    ngOnInit() {
        this.altName = "aio " + this.arr['KEYWORDS'];
        this.full_name = this.arr['USER_FULL_NAME'];
        this.u_name = this.arr['USER_NAME'];
        this.parentId = this.arr['PARENT_ID'];
        // if (this.arr['TEXT'] != null) {
        //     this.comment_data = this.postdata.decodeURIPostData(this.arr['TEXT']).replace(/[\u200B-\u200D\uFEFF\uFFFD]/g, '');
        //     this.comment_data = this.postdata.linkActivate(this.comment_data);
        // }
        this.u_id = this.arr['COMMENT_BY'];
        this.profile_pic_path = this.arr['PROFILE_PHOTO_PATH'] + "profile/" + this.arr['COMMENT_BY'] + "_30x30.png";
        this.commentId = this.arr['USER_COMMENT_ID'];
        this.postId = this.arr['USER_POST_ID'];
        if (this.arr['IMAGE_PATH'] != null && this.arr['IMAGE_PATH'] != "") {
            this.imagePath = this.arr['IMAGE_PATH'] + "img/" + this.arr['UNIQUE_COMMENT_ATTACHMENT_ID'] + ".png";
        }
        if (this.arr['LIKED'] == 1) {
            this.importantCondition = true;
        }
        if (this.arr['LIKED_COUNT'] != null) {
            this.like = this.arr['LIKED_COUNT'];
        }
        this.time = this.arr['ADD_DATE_TIME'];

    }
    ngAfterViewInit() {
        this.comment_data = this.postdata.decodeURIPostData((this.arr['TEXT']));
        if (this.arr['TEXT'] != null) {
            this.comment_data = this.postdata.decodeURIPostData(this.arr['TEXT']).replace(/[\u200B-\u200D\uFEFF\uFFFD]/g, '');
            this.comment_data = this.postdata.linkActivate(this.comment_data);
        }
    }

    focus() {

    }

    important() {
        if (this.vart == true) {
            this.vart = false;
            this.importantCondition = !this.importantCondition;
            var importData = {};
            importData['token'] = this._constantService.getSessionDataBYKey('token');
            importData['token_param'] = {};
            importData['token_param']['device_type'] = 'w';
            importData['token_param']['host'] = '';
            importData['cmid'] = this.commentId;
            if (this.importantCondition) {
                importData['status'] = 0;
            } else {
                importData['status'] = 1;
            }

           
            this._constantService.fetchDataApi(this._constantService.putReplyImportServiceUrl(),importData).subscribe(data => {
                var responseData:any = data;
                var status = responseData.STATUS;
                if (status == this._constantService.success_msg) {
                    this.vart = true;
                    if (this.importantCondition) {
                        this.like = this.like + 1;
                    } else {
                        this.like = this.like - 1;
                    }
                } else if (status == this._constantService.error_token) {
                    this.vart = true;
                    this._constantService.clearUserInfo();
                    this._router.navigate(['']);
                    alert('This session has expired');
                } else {
                    this.vart = true;
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
    closePopup(event) {
        if (event['error'] == false) {
            this.openConfirmation = false;
        }
    }
    replyEditPopup() {
        this.replyEditStatus = !this.replyEditStatus;

    }

    updateSourcePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }

    addImageFile(event: any) {
        this.replycomment_image = event.target.files[0];
        let type = this.replycomment_image.name;
        var reader = new FileReader();
        var typearr = type.split(".");
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
            var encData = this._encryptionServices.encrypt(data);
            let formData = new FormData();
            formData.append("file", this.replycomment_image);
            formData.append("pattchid", '0');
            formData.append("token", encData);
            formData.append("type", "4");
            
            this._constantService.uploadFileApi(this._constantService.getUploadFileServiceUrl(), formData).subscribe(data => {
                var responseData:any = data;
                var status = responseData.STATUS;
                if (status == this._constantService.success_msg) {
                    var date = new Date();
                    this.file_path = responseData.FPATH + "?v=" + responseData.IMG_UPD_DT;;
                    this.uuid = responseData.UUID;
                    //this._constantService.setToken(responseData.TOKEN);
                    this._constantService.setSessionJsonPair('token',responseData.TOKEN);
                } else if (status == this._constantService.error_token) {
                    this._constantService.clearUserInfo()
                    this._router.navigate(['']);
                    alert('This session has expired');
                } else {
                    this.showCommentImg = 1;
                    this.replycomment_image = null;
                }
            }, error => {
                var responseData = error;
                if (responseData.status == 500) {
                    this._router.navigate(['500']);
                }
            });
        } else {
            alert("Unable to support the selected file");
            this.showCommentImg = 1;
            this.replycomment_image = null;
        }

    }

    confirmText(value, event) {
        event.preventDefault();
        event.stopPropagation();
        //  this.c_data = value;

    }

    addReplyOnComment(event) {
        this.showAddReplyOnComment = !this.showAddReplyOnComment;
        if (event.keyCode == 13 && !event.ctrlKey) {
            this.c_data = this.postdata.postDataManipulation(event.target.id);
            if (this.c_data.length == 0) {
                this.confirmText(this.c_data, event);
                return false;
            }
            this.hideSpan = 0;
            var id = event.target.id;
            var comment = {};
            comment['token'] = this._constantService.getSessionDataBYKey('token');
            comment['token_param'] = {};
            comment['token_param']['device_type'] = 'w';
            comment['token_param']['host'] = '';
            comment['pid'] = this.postId;
            comment['parid'] = this.commentId;
            comment['cmid'] = '0';
            comment['cmda'] = this.postdata.encodeURIPostData(this.c_data);
            //this.comment_data = this.comment_data.replace(/<(?!br\s*?>)[^<>]*>/ig, '');

            if (this.replycomment_image != null) {
                comment['fpath'] = this.file_path;
                comment['uuid'] = this.uuid;
            } else {
                comment['fpath'] = "";
                comment['uuid'] = "";
            }
            if (comment['cmda'].length == 0 && this.replycomment_image == null) {
                return false;

            }
           
            event.preventDefault();
            this._constantService.fetchDataApi(this._constantService.puReplyOnCommentServiceUrl(),comment).subscribe(data => {
                var responseData:any = data;
                var status = responseData.STATUS;
                if (status == this._constantService.success_msg) {
                    //this.showAddReplyOnComment = !this.showAddReplyOnComment;
                    this.showCommentImg = 1;
                    this.hideSpan = 1;
                    var addComment = {};
                    addComment['COMMENT_BY'] = this._constantService.getSessionDataBYKey('u_id');
                    addComment['IMAGE_PATH'] = this.file_path;
                    addComment['PARENT_ID'] = this.commentId;
                    addComment['PROFILE_PHOTO_PATH'] = this._constantService.getSessionDataBYKey('profile_pic_s3');
                    addComment['TEXT'] = this.postdata.linkActivate(this.c_data);
                    addComment['USER_COMMENT_ID'] = responseData.COMID;
                    addComment['USER_FULL_NAME'] = this._constantService.getSessionDataBYKey('full_name');
                    addComment['USER_NAME'] = this._constantService.getSessionDataBYKey('username');
                    addComment['USER_POST_ID'] = this.postId;
                    addComment['UNIQUE_COMMENT_ATTACHMENT_ID'] = this.uuid;
                    this._constantService.setCommentData(addComment);
                    this.factory = this.componentFactoryResolver.resolveComponentFactory(SubcommentComponent);
                    this.ref = this.container.createComponent(this.factory, 0);
                    event.target.innerHTML = null;
                    this.replyCount = responseData.REPLY_COUNT;
                    this.replycomment_image = null;
                    this.file_path = '';
                    this.uuid = '';
                } else if (status == this._constantService.error_token) {
                    this._constantService.clearUserInfo();
                    this._router.navigate(['']);
                    alert('This session has expired');
                } else {
                    alert(responseData.ERROR_MSG);
                } this.replyCount = responseData.REPLY_COUNT;
            }, error => {
                var responseData = error;
                if (responseData.status == 500) {
                    this._router.navigate(['500']);
                }
            });

        } else if (event.keyCode == 13 && event.keyCode == 17) {
            event.target.innerText = event.target.innerText + "\n";
        }
    }

    Delete(event) {

        var reply = {};
        reply['token'] = this._constantService.getSessionDataBYKey('token');
        reply['token_param'] = {};
        reply['token_param']['device_type'] = 'w';
        reply['token_param']['host'] = '';
        reply['cmid'] = this.commentId;
        reply['pid'] = this.postId;
        reply['uuid'] = '';
        this.delVal = false;
       
        this._constantService.fetchDataApi(this._constantService.delReplyServiceUrl(),reply).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                var count = (<HTMLElement> document.getElementById(this.postId+'_count'));
                if (count != null) {
                    if (parseInt(count.innerHTML) == 1) {
                        count.style.display = 'none';
                        count.innerHTML = (parseInt(count.innerHTML) - 1).toString();
                    } else {
                        count.innerHTML = (parseInt(count.innerHTML) - 1).toString();
                    }
                }

                this._ref2.destroy();
            } else if (status == this._constantService.error_token) {
                this._constantService.clearUserInfo();
                this._router.navigate(['']);
                alert('This session has expired');

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

    more_cmt() {
        this.morecomt = true;
    }

    less_cmt() {
        this.morecomt = false;
    }

    postimageshow(event) {
        this.postimagediv = "2";
        this.oneViewPath = event.target.currentSrc;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add("body-overflow");
    }

    postImageHide(event) {
        this.postimagediv = event;
        //this.imagepostviewsec = true;
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }
}
