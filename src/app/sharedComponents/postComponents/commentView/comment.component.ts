import {Component, ViewChild, OnInit, ComponentFactoryResolver, ViewContainerRef, AfterViewInit, HostListener, Input} from '@angular/core';
import {ConstantService} from './../../../services/constant.service';
import {Router} from '@angular/router';
import {EncryptionService} from './../../../services/encryption.service';
import {SubcommentComponent} from './../../postComponents/subcommentView/subcomment.component';
import {PostdataService} from "./../../../services/postdata.service";

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss', './newcomment.component.scss'],
    providers: [ConstantService, EncryptionService]
})
export class CommentComponent implements OnInit {
    @Input() delVal;
    clicked: boolean;
    rplyImageDimns = '';
    image: boolean;
    oneViewPath: any;
    postimagediv: string = "1";
    userId: boolean = false;
    date = new Date();
    post_id: string;
    showImage: boolean = false;
    replycount: number = 0;
    dataConf = {};
    openConfirmation: boolean = false;
    _ref: any;
    vart: boolean = true;
    c_data: string = "";
    overflowStatus: boolean;
    commentshow: boolean;
    @ViewChild('container', {read: ViewContainerRef}) container;
    showEnterReply: boolean = false;
    showAddReplyOnComment: boolean = false;
    full_name: string;
    u_name: string;
    parentId;
    commentId;
    postId = 0;
    comment_data: string;
    profile_pic_path: string;
    importantCondition: boolean = false;
    imagePath = "";
    like = 0;
    arr: any;
    hideSpan = 1;
    replycomment_image = null;
    showCommentImg = 1;
    factory;
    ref;
    u_id = 0;
    file_path = "";
    uuid = "";
    image_upload_url = "";
    time = "";
    subCommentStatus: boolean = false;
    showPreloader: boolean = false;
    lastReplyOnCommentId = 0;
    replyOncommentPresent: boolean = false;
    commentEditStatus = false;
    see__more: boolean = true;
    seemorecmt: boolean = false;
    constructor(
        public _constantService: ConstantService,
        public _encryptionServices: EncryptionService,
        public _router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        private postdata: PostdataService
    ) {
        if (this.arr != null) {

        }
    }
    see_more() {
        this.see__more = false;
    }


    ngOnInit() {
        console.log(this.subCommentStatus);
        this.full_name = this.arr['USER_FULL_NAME'];
        this.u_name = this.arr['USER_NAME'];
        if (this._constantService.getSessionDataBYKey('u_id') == 0) {
            this.userId = true;
        }
        if (this.arr['PARENT_ID'] != null) {
            this.parentId = this.arr['PARENT_ID'];
        }

        if (this.arr['TEXT'] != '' && this.arr['TEXT'] != null) {
            this.comment_data = this.postdata.decodeURIPostData((this.arr['TEXT'])).replace(/ /g, "&#160;");
            this.comment_data = this.postdata.linkActivate(this.comment_data);
        }
        this.replycount = this.arr['REPLY_COUNT'];
        if (this.replycount == undefined) {
            this.replycount = 0;
        }
        this.u_id = this.arr['COMMENT_BY'];
        this.profile_pic_path = this.arr['PROFILE_PHOTO_PATH'] + "profile/" + this.arr['COMMENT_BY'] + "_30x30.png?v=" + this.arr['IMG_UPD_DT'];
        this.commentId = this.arr['USER_COMMENT_ID'];
        this.postId = this.arr['USER_POST_ID'];
        if (this.arr['IMAGE_PATH'] != null && this.arr['IMAGE_PATH'] != "") {
            this.showImage = true;
            this.image = true;
            this.imagePath = this.arr['IMAGE_PATH'] + "img/" + this.arr['UNIQUE_COMMENT_ATTACHMENT_ID'] + ".png";
        }
        if (this.arr['LIKED'] == 1) {
            this.importantCondition = true;
        }
        if (this.arr['LIKED_COUNT']! >= 0 && this.arr['LIKED_COUNT'] != null) {
            this.like = this.arr['LIKED_COUNT'];
        }
        this.time = this.arr['ADD_DATE_TIME'];
        if (this.arr['UNIQUE_COMMENT_ATTACHMENT_ID'] != null && this.arr['UNIQUE_COMMENT_ATTACHMENT_ID'] != "") {
            this.uuid = this.arr['UNIQUE_COMMENT_ATTACHMENT_ID'];
        }

    }
    ngAfterViewInit() {
        //    this.comment_data = this.postdata.decodeURIPostData((this.arr['TEXT']));
        //    this.comment_data = this.postdata.linkActivate(this.comment_data);
    }

    c(event) {
        if (event.target.innerText.length == 0 || event.target.innerText == "\n") {
            this.hideSpan = 1;
        }
    }

    change_Commentimage(event) {
        (<HTMLInputElement> document.getElementById(event.target.id.split("_")[1] + "_" + event.target.id.split("_")[2] + "_" + event.target.id.split("_")[3] + "_" + "nci")).click();
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

           

            this._constantService.fetchDataApi(this._constantService.putCommentImportServiceUrl(),importData).subscribe(data => {
                var responseData:any = data;
                var status = responseData.STATUS;
                if (status == this._constantService.success_msg) {
                    if (this.importantCondition) {
                        this.clicked = true;
                        this.like = this.like + 1;
                        this.vart = true;
                    } else {
                        this.clicked = false;
                        this.like = this.like - 1;
                        this.vart = true;
                    }
                } else if (status == this._constantService.error_token) {
                    this._constantService.clearUserInfo();
                    this._router.navigate(['']);
                    this.vart = true;
                    this.dataConf['type'] = 4;
                    this.dataConf['msg'] = "Session Expire";
                    this.dataConf['error_msg'] = "Session Expired";
                    this.openConfirmation = true;
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

    addImageFile(event: any) {
        this.replycomment_image = event.target.files[0];
        let type = this.replycomment_image.name;
        var reader = new FileReader();
        var typearr = type.split(".");
        this.showPreloader = true;
        var size = Math.round(this.replycomment_image.size / 1000 / 1000);
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

                        this.showPreloader = false;
                        this.autoFocus();
                        this.rplyImageDimns = responseData.DIMENSION;
                        var date = new Date();
                        this.file_path = responseData.FPATH;
                        this.uuid = responseData.UUID;
                        //this._constantService.setToken(responseData.TOKEN);
                        this._constantService.setSessionJsonPair('token',responseData.TOKEN);
                    } else if (status == this._constantService.error_token) {
                        this._constantService.clearUserInfo()
                        this._router.navigate(['']);
                        this.dataConf['type'] = 4;
                        this.dataConf['msg'] = "Session Expire";
                        this.dataConf['error_msg'] = "Session Expired";
                        this.openConfirmation = true;
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
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = "Unable to support the selected file";
                this.openConfirmation = true;
                this.showCommentImg = 1;
                this.replycomment_image = null;
            }

        }
        else {
            this.dataConf['msg'] = "STUDY24X7";
            this.dataConf['type'] = 2;
            this.dataConf['error_msg'] = "File above 10mb is not allowed";
            this.openConfirmation = true;
        }
    }
    confirmText(value, event) {
        event.preventDefault();
        event.stopPropagation();
        //   this.c_data = value;

    }


    addReplyOnComment(event) {
        if (this.hideSpan == 1) {
            if (event.keyCode == 13 && !event.ctrlKey && !event.shiftKey) {
                this.c_data = this.postdata.postDataManipulation(event.target.id);
                if (this.c_data != this._constantService.replyPlaceHolder) {
                    if (this.c_data.length == 0 && this.replycomment_image == null) {
                        this.confirmText(this.c_data, event);
                        return false;
                    }
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
                    if (this.c_data.length == 0 && this.replycomment_image != null) {
                        comment['fpath'] = this.file_path;
                        comment['uuid'] = this.uuid;
                        comment['dimns'] = this.rplyImageDimns;
                    } else if (this.replycomment_image != null) {
                        comment['fpath'] = this.file_path;
                        comment['uuid'] = this.uuid;
                    }
                    else {
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
                            this.subCommentStatus = true;
                            //this.showAddReplyOnComment = !this.showAddReplyOnComment;
                            this.replycount = this.replycount + 1;
                            this.showCommentImg = 1;
                            this.hideSpan = 0;
                            var date = new Date();
                            var addComment = {};
                            addComment['COMMENT_BY'] = this._constantService.getSessionDataBYKey('u_id');
                            addComment['IMAGE_PATH'] = this.file_path;
                            addComment['PARENT_ID'] = this.commentId;
                            addComment['PROFILE_PHOTO_PATH'] = this._constantService.getSessionDataBYKey('profile_pic_s3');
                            addComment['TEXT'] = this.c_data;
                            addComment['USER_COMMENT_ID'] = responseData.COMID;
                            addComment['USER_FULL_NAME'] = this._constantService.getSessionDataBYKey('full_name');
                            addComment['USER_NAME'] = this._constantService.getSessionDataBYKey('username');
                            addComment['USER_POST_ID'] = this.postId;
                            addComment['UNIQUE_COMMENT_ATTACHMENT_ID'] = this.uuid;
                            //this._constantService.setCommentData(addComment);
                            addComment['ADD_DATE_TIME'] = this.postdata.getPostDateTime(date.getTime());
                            this.factory = this.componentFactoryResolver.resolveComponentFactory(SubcommentComponent);
                            this.ref = this.container.createComponent(this.factory, 0);
                            this.ref.instance.arr = addComment;
                            this.ref.instance._ref2 = this.ref;
                            //                            var v = document.getEl                            ementById(event.target.id);
                            //                            v.classList.                            remove("placeholdercolor");
                            //                            v.classList.add("option_inputt setwdth");

                            event.target.innerHTML = this._constantService.replyPlaceHolder;
                            event.target.classList.add("placeholdercolor");
                            event.target.classList.remove("option_inputt", "setwdth");
                            this.hideSpan = 1;
                            this.uuid = "";
                            window.getSelection().removeAllRanges();
                            //event.target.innerHTML = "&zwnj;
                            this.uuid = '';
                            this.file_path = '';
                            this.replycomment_image = null;
                            return false;
                        }
                        else if (status == this._constantService.error_token) {
                            this._constantService.clearUserInfo();
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
                        }
                    }, error => {
                        var responseData = error;
                        if (responseData.status == 500) {
                            this._router.navigate(['500']);
                        }
                    });
                    
                    //this.showAddReplyOnComment = false;
                }

            } else if (event.keyCode == 13 || event.keyCode == 17) {
                event.target.innerText = event.target.innerText + "\n";
            }
        }
    }


  
    updateSourcePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }

    getReplyonComment(commentId) {
        if (commentId == 1) {
            this.showAddReplyOnComment = false;
        }
        // this.subCommentStatus = false;
        //        var id = '';
        //        id += this.postId;
        //        id += '_';
        //        id += this.commentId;
        //        id += '_reply';

        //        setTimeout(() => {
        //            document.getElementById(id).focus();
        //        }, 300);
        if (!this.showAddReplyOnComment) {
            this.subCommentStatus = true;
            this.showAddReplyOnComment = true;
            this.showEnterReply = true;
            var showReplyOnComment = {};
            showReplyOnComment['token'] = this._constantService.getSessionDataBYKey('token');
            showReplyOnComment['token_param'] = {};
            showReplyOnComment['token_param']['device_type'] = 'w';
            showReplyOnComment['token_param']['host'] = '';
            showReplyOnComment['parid'] = this.commentId;
            showReplyOnComment['pid'] = this.postId;
            showReplyOnComment['lscmid'] = this.lastReplyOnCommentId;
            showReplyOnComment['flow'] = 'd';
            showReplyOnComment['count'] = 10;

         

            this._constantService.fetchDataApi(this._constantService.getReplyOnCommentServiceUrl(), showReplyOnComment).subscribe(data => {
                var responseData:any = data;
                var status = responseData.STATUS;
                if (status == this._constantService.success_msg) {
                    if (responseData.COMMENT_DATA.length < 10) {
                        this.replyOncommentPresent = false;
                    } else {
                        this.replyOncommentPresent = true;
                    }
                    if (responseData.COMMENT_DATA.length != 0) {
                        this.lastReplyOnCommentId = responseData.COMMENT_DATA[responseData.COMMENT_DATA.length - 1].USER_COMMENT_ID;
                        for (var i = 0; i < responseData.COMMENT_DATA.length; i++) {
                            //this._constantService.setCommentData(responseData.COMMENT_DATA[i]);
                            responseData.COMMENT_DATA[i].USER_POST_ID = this.postId;
                            responseData.COMMENT_DATA[i].ADD_DATE_TIME = this.postdata.getPostDateTime(responseData.COMMENT_DATA[i].ADD_DATE_TIME);
                            this.factory = this.componentFactoryResolver.resolveComponentFactory(SubcommentComponent);
                            this.ref = this.container.createComponent(this.factory);
                            this.ref.instance.arr = responseData.COMMENT_DATA[i];
                            this.ref.instance._ref2 = this.ref;
                        }
                    }
                } else if (status == this._constantService.error_token) {
                    this._constantService.clearUserInfo();
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
                }
            }, error => {
                var responseData = error;
                if (responseData.status == 500) {
                    this._router.navigate(['500']);
                }
            });
        }

        //}
    }
    commentEditPopup() {
        this.commentEditStatus = !this.commentEditStatus;
    }


    mouseOutOfComment() {
        // this.commentEditStatus = false;
    }
    //    delete(commentId) {
    //        if (this.commentshow === true) {
    //
    //            this.overflowStatus = true;
    //            this.commentshow = false;
    //        }
    //        else {
    //
    //            this.overflowStatus = true;
    //            this.commentshow = false;
    //        }
    //    }

    delete(event) {
        var comment = {};
        comment['token'] = this._constantService.getSessionDataBYKey('token');
        comment['token_param'] = {};
        comment['token_param']['device_type'] = 'w';
        comment['token_param']['host'] = '';
        comment['cmid'] = this.commentId;
        comment['pid'] = this.postId;
        if (this.uuid == "") {
            comment['uuid'] = '';
        } else {
            comment['uuid'] = this.uuid;
        }
       
        this._constantService.fetchDataApi(this._constantService.delCommentServiceUrl(),comment).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {

                var count = (<HTMLElement> document.getElementById(this.postId + '_comm_count'));
                if (count != null) {
                    if (parseInt(count.innerHTML) == 1) {
                        count.style.display = 'none';
                        count.innerHTML = (parseInt(count.innerHTML) - 1).toString();
                    } else {
                        count.innerHTML = (parseInt(count.innerHTML) - 1).toString();
                    }
                }

                this._ref.destroy();

                if (this.commentshow === true) {
                    this.overflowStatus = true;
                    this.commentshow = false;

                }
                else {
                    this.overflowStatus = true;
                    this.commentshow = false;
                }
            }
            else if (status == this._constantService.error_token) {
                this._constantService.clearUserInfo();
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
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    hidePlaceHolder(event) {
        var id = this.postId + "_" + this.commentId + "_reply";
        if (event.target.innerText == this._constantService.replyPlaceHolder) {
            var v = document.getElementById(event.target.id);
            v.classList.remove("placeholdercolor");
            v.classList.add("option_inputt", "setwdth");
        }
        document.getElementById(event.target.id).focus();
    }

    showPlaceHolder() {
        var id = this.postId + "_" + this.commentId + "_reply";
        var txt = document.getElementById(id);
        if (txt) {
            txt.innerHTML = txt.innerHTML.replace(this._constantService.junkText, "");
            if (txt.innerText.length <= 1) {
                txt.classList.add("placeholdercolor");
                txt.innerText = this._constantService.replyPlaceHolder;
            }
        }
    }

    // see more comment
    mycomment() {
        this.seemorecmt = true;
    }
    mycommentless() {
        this.seemorecmt = false;
    }

    autoFocus() {
        var id = this.postId + '_' + this.commentId + '_reply';
        var x = document.getElementById(id);
        if (x) {
            if (x.innerText == this._constantService.replyPlaceHolder) {
                (document.getElementById(id)).innerText = '';
                x.classList.remove("placeholdercolor");
                x.classList.add("option_inputt", "setwdth");
                //  x.classList.add("setwdth");
            }
            document.getElementById(id).focus();
        }
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

    keydown(e) {
        if (e.keyCode == 13) {
            return true;
        } else {
            return false;
        }
        //        if (e.keyCode == 13) {
        //            // insert 2 br tags (if only one br tag is inserted the cursor won't go to the second line)
        //            document.execCommand('insertHTML', false, '<br><br>');
        //            // prevent the default behaviour of return key pressed
        //            return false;
        //        }
    }
    //    @HostListener('drop', ['$event']) blockDrop(e: MouseEvent) {
    //        e.preventDefault();
    //    }


}


