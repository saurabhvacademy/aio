import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {ConstantService} from './../../services/constant.service';
import {EncryptionService} from './../../services/encryption.service';
import {Router} from '@angular/router';
import {PostdataService} from './../../services/postdata.service';

@Component({
    selector: 'app-textpostedit',
    templateUrl: './textpostedit.component.html',
    styleUrls: ['./textpostedit.component.scss', './newtextpostedit.component.scss']
})
export class TextposteditComponent implements OnInit {
    isQuestion: number = 0;
    config: any;
    dataConf = {};
    openConfirmation: boolean = false;
    @Output() hideBox = new EventEmitter<boolean>();
    @Output() sessionLogout = new EventEmitter<boolean>();
    @Input() post_id: string;
    loader: boolean = false;
    showText: boolean = true;
    imageUpload: boolean = false;
    post_data = [];
    hide: boolean = false;
    ret = 0;
    // showglow:boolean = true;
    linkPresent: boolean = false;
    linkPreview = 1;
    user_interest = [];
    showglow: boolean = false;
    linkAttrDesc = "";
    linkDescription = "";
    linkTitle = "";
    linkAttrTitle = "";
    linkImage = "";
    selectedposttab = 1;
    show_file = 1;
    image_upload_url;
    shareLink = '';
    post_tags = [];
    updated_post_tags = [];
    post_text;
    file_upload;
    image_upload;
    file_type;
    user_post_id;
    file_name = "";
    file_path = "";
    showPreloader: boolean = false;
    attachmentPageCount = "";
    prev_interest = [];
    attachmentId;
    logout;
    vimeoLinkPresent: boolean = false;
    vimeoLink = "";
    videoId = "";
    youtubeLinkPresent: boolean = false;
    youtubeLink = "";
    show_image = 0;
    hideAddIntrest: boolean = false;
    showInterest: boolean = false;

    constructor(
        public _constantService: ConstantService,
        public _encrypt: EncryptionService,
        private router: Router,
        public postData: PostdataService
    ) {}

    ngOnInit() {
        this.getPostdata();
        this.getUserInterest();

    }
    hideEditBox() {
        this.hideBox.emit(false);
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }

    removeShareLink() {
        this.ret = 0;
        this.linkPresent = false;
        this.linkPreview = 1;
        this.show_image = 0;
        this.linkImage = "";
        this.linkTitle = "";
        this.linkDescription = "";
        this.shareLink = "";
        this.youtubeLinkPresent = false;
        this.vimeoLinkPresent = false;
    }

    showtags() {
        (<HTMLElement> document.getElementById('interest_tags')).style.display = "inline-block";
    }

    closeInterest() {
        (<HTMLElement> document.getElementById('interest_tags')).style.display = "none";
    }

    checkLink(event) {
        //alert(event.keyCode);
        if (event.keyCode === 32) {
            //alert('hi');
            if (this.ret == 0) {
                var text = document.getElementById('post_data').textContent.replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/\uFFFD/g, '').replace(/<!--bindings={\n  \"ng-reflect-ng-if\": \"false\"\n}-->\n/g, "").trim();
                var arr = text.split(' ');
                var i = 0;
                var videoLink = "";
                for (i; i < arr.length; i++) {
                    if (!this.linkPresent && !this.youtubeLinkPresent && !this.vimeoLinkPresent) {

                        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
                        var vimeoRegEx = /^(http:\/\/|https:\/\/)(vimeo\.com)\/([\w\/]+)([\?].*)?$/;
                        if (regExp.exec(arr[i])) {
                            this.youtubeLink = arr[i];
                            this.youtubeLinkPresent = true;
                            this.linkPresent = false;
                            var match = arr[i].match(regExp);
                            if (match && match[2].length == 11) {
                                videoLink = match[2];
                            }
                        } else if (vimeoRegEx.exec(arr[i])) {
                            this.vimeoLinkPresent = true;
                            this.vimeoLink = arr[i];
                            var arrtyp = arr[i].split("/");
                            videoLink = arrtyp[arrtyp.length - 1];
                            //                            if (match) {
                            //                                videoLink = match[match.length-1];
                            //                            }
                        } else if (this._constantService.url_pattern.exec(arr[i])) {
                            this.linkPresent = true;
                            this.youtubeLinkPresent = false;
                            this.shareLink = arr[i].trim();
                        }
                    }
                }

                if (this.youtubeLinkPresent) {
                    this.getYoutubeData(videoLink);
                }
                if (this.vimeoLinkPresent) {
                    this.ret = 1;
                    this.getVimeoData(videoLink)
                }
                if (this.linkPresent) {
                    this.ret = 1;
                    this.getLinkData(this.shareLink);
                }
            }
        }
    }

    getLinkData(link: string) {
        var linkData = {};
        linkData['token'] = this._constantService.getSessionDataBYKey('token');
        linkData['token_param'] = {};
        linkData['token_param']['device_type'] = 'w';
        linkData['token_param']['host'] = '';
        linkData['link'] = link.trim();

        this._constantService.fetchDataApi(this._constantService.getLinkDataServiceUrl(), linkData).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status === this._constantService.success_msg) {
                this.linkPreview = 2;
                this.linkPresent = true;
                this.show_image = 1;
                this.linkImage = responseData.SHARE_LINK_IMAGE;
                this.linkAttrTitle = responseData.SHARE_LINK_TITLE;
                this.linkAttrDesc = this.postData.decodeURIPostData(responseData.SHARE_LINK_DESCRIPTION);
                if (responseData.SHARE_LINK_TITLE.length > 100) {
                    this.linkTitle = responseData.SHARE_LINK_TITLE.slice(0, 100) + "...";
                } else {
                    this.linkTitle = responseData.SHARE_LINK_TITLE;
                }
                this.linkTitle = this.postData.decodeURIPostData(this.linkTitle);
                this.linkDescription = this.postData.decodeURIPostData(responseData.SHARE_LINK_DESCRIPTION);
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token',responseData.TOKEN);
            } else if (status === 'error') {
                this.linkPresent = false;
                this.shareLink = "";
                this.ret = 0;
                this.linkPreview = 1;
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });
    }

    getPostdata() {
        var postData = {};
        postData['token'] = this._constantService.getSessionDataBYKey('token');
        postData['token_param'] = {};
        postData['token_param']['device_type'] = 'w';
        postData['token_param']['host'] = '';
        postData['pid'] = this.post_id;

        this._constantService.fetchDataApi(this._constantService.getLatestPostDataServiceUrl(), postData).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.post_data = responseData.POST_DATA;
                this.isQuestion = responseData.POST_DATA[0].IS_QUESTION;

                if (this.post_data[0].TYPE == 1) {
                    if (this.post_data[0].SHARE_LINK != null && this.post_data[0].SHARE_LINK != "") {
                        this.linkPresent = true;
                        this.linkPreview = 2;
                        this.ret = 1;
                        this.show_image = 1;
                        if (this.post_data[0].SHARE_LINK_IMAGE != null && this.post_data[0].SHARE_LINK_IMAGE != 'null') {
                            this.linkImage = this.post_data[0].SHARE_LINK_IMAGE;
                        }
                        this.linkAttrTitle = this.post_data[0].SHARE_LINK_TITLE;
                        if (this.post_data[0].SHARE_LINK_DESCRIPTION != null) {

                            this.linkAttrDesc = this.post_data[0].SHARE_LINK_DESCRIPTION;
                            if (this.post_data[0].SHARE_LINK_DESCRIPTION.length > 150) {
                                this.linkDescription = this.post_data[0].SHARE_LINK_DESCRIPTION.slice(0, 150) + "...";
                            } else {
                                this.linkDescription = this.post_data[0].SHARE_LINK_DESCRIPTION;
                            }
                            this.linkDescription = this.postData.decodeURIPostData(this.post_data[0].SHARE_LINK_DESCRIPTION);
                        }
                        if (this.post_data[0].SHARE_LINK_TITLE.length > 100) {
                            this.linkTitle = this.post_data[0].SHARE_LINK_TITLE.slice(0, 100) + "...";
                        } else {
                            this.linkTitle = this.post_data[0].SHARE_LINK_TITLE;
                        }
                        this.linkTitle = this.postData.decodeURIPostData(this.post_data[0].SHARE_LINK_TITLE);
                    }
                } else if (this.post_data[0].TYPE == 2) {
                    this.show_file = 2;
                    this.file_type = this.post_data[0].FILE_TYPE;
                    if (this.file_type == 1) {
                        this.image_upload = "";
                        this.image_upload_url = this.post_data[0].PATH + "img/" + this.post_data[0].USER_POST_ATTACHMENT_UUID + ".png";;
                    } else if (this.file_type == 3 || this.file_type == 4 || this.file_type == 5) {
                        this.file_upload = "";
                        var filetypeArr = this.post_data[0].CAPTION.split(".");
                        var filetype = filetypeArr[filetypeArr.length - 1];
                        this.image_upload_url = "assets/images/svg/" + filetype.toLowerCase() + ".svg";
                    }
                    if (this.post_data[0].NUMBERS_OF_PAGES_TO_DWLD == null) {
                        this.attachmentPageCount = "0";
                    } else {
                        this.attachmentPageCount = this.post_data[0].NUMBERS_OF_PAGES_TO_DWLD;
                    }
                    this.file_path = this.post_data[0].PATH;
                    this.attachmentId = this.post_data[0].USER_POST_ATTACHMENT_UUID;
                    this.file_name = this.post_data[0].CAPTION;
                } else if (this.post_data[0].TYPE == 5 || this.post_data[0].TYPE == 6) {
                    this.show_image = 1;
                    if (this.post_data[0].TYPE == 5) {
                        this.getYoutubeData(this.post_data[0].SHARE_LINK);
                    }
                    if (this.post_data[0].TYPE == 6) {
                        this.getVimeoData(this.post_data[0].SHARE_LINK);
                    }
                }
                this.user_post_id = this.post_data[0].USER_POST_ID;
                if (this.post_data[0].TEXT) {

                    this.post_text = this.post_data[0].TEXT;
                    this.post_text = this.postData.decodeURIPostData(this.post_data[0].TEXT);
//                    this.post_text = this.post_text.replace(/&nbsp;/g, " ").replace(/<br>/,"");
                 //   this.post_text = this.post_text.replace(/&lt;/g, "<");
                 //   this.post_text = this.post_text.replace(/&gt;/g, ">");
                }
                setTimeout(() => {
                    this.updated_post_tags = this.post_data[0].INTERESTS;
                    var interestObj = JSON.parse(this._constantService.getSessionDataBYKey('interests'));
                    for (var i = 0; i < this.updated_post_tags.length; i++) {
                        this.addTags(this.updated_post_tags[i], interestObj[this.updated_post_tags[i]]);
                    }
                }, 100);
            } else if (status == this._constantService.error_token) {
                this._constantService.clearUserInfo();
                this.router.navigate(['']);
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
                this.router.navigate(['500']);
            }
        });
    }
    closePopup(event) {
        if (event['error'] == false) {
            this.openConfirmation = false;
        }
    }
    addTags(tag_id, tag_name) {
        if (this.post_tags.indexOf(tag_id) == -1) {
            this.post_tags.push(tag_id);
            var tagText = tag_name + '<img src="assets/images/svg/tagcross.svg" id="remove_' + tag_id + '_edit">';
            var tag = document.createElement('span');
            tag.id = "tag_" + tag_id;
            tag.className = 'tags';
            tag.innerHTML = tagText;
            var tags = document.getElementById('posttagsedit');
            tags.insertBefore(tag, tags.childNodes[0]);
            var tag_dom = document.getElementById("remove_" + tag_id + "_edit");
            var post_tagArr = this.post_tags;
            tag_dom.addEventListener('click', () => {
                tags.removeChild(tag);
                var index = this.post_tags.indexOf(tag_id);
                this.post_tags.splice(index, 1);
                var remid = this.user_interest.findIndex(x => x.INTEREST_ID == tag_id);
                this.user_interest[remid].STATUS = true;
                if (this.post_tags.length < 3) {
                    this.hideAddIntrest = false;
                }
            });
            this.post_tags = post_tagArr;
            var id = this.user_interest.findIndex(x => x.INTEREST_ID == tag_id);
            this.user_interest[id].STATUS = false;

        }
        this.showInterest = false;
        if (this.post_tags.length >= 3) {
            this.hideAddIntrest = true;
        }
        //        (<HTMLElement> document.getElementById('interest_tags')).style.display = "none";
    }


    getUserInterest() {
        var usr_interest = {};
        usr_interest['token'] = this._constantService.getSessionDataBYKey('token');
        usr_interest['token_param'] = {};
        usr_interest['token_param']['device_type'] = 'w';
        usr_interest['token_param']['host'] = '';

        this._constantService.fetchDataApi(this._constantService.getUserInterestServiceUrl(), usr_interest).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.user_interest = responseData.INTEREST_ID;
                for (var i = 0; i < this.user_interest.length; i++) {
                    this.user_interest[i].STATUS = true;
                }
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token',responseData.TOKEN);
            } else if (status == this._constantService.error_token) {
                this._constantService.clearUserInfo();
                alert('This session has expired');
                this.router.navigate(['']);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });
    }

    addImageFile(event: any) {
        this.image_upload = event.target.files[0];
        let type = this.image_upload['name'];
        var reader = new FileReader();
        var typearr = type.split(".");
        this.showPreloader = true;
        if (typearr[typearr.length - 1] == 'jpg' || typearr[typearr.length - 1] == 'jpeg' || typearr[typearr.length - 1] == 'JPG' || typearr[typearr.length - 1] == 'JPEG' || typearr[typearr.length - 1] == 'png' || typearr[typearr.length - 1] == 'PNG') {
            this.show_file = 2;
            this.file_type = 1;
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
            formData.append("file", this.image_upload);
            if (this.post_data[0].USER_POST_ATTACHMENT_UUID != null && this.post_data[0].USER_POST_ATTACHMENT_UUID != '') {
                formData.append("pattchid", this.post_data[0].USER_POST_ATTACHMENT_UUID);
            } else {
                formData.append("pattchid", '0');
            }

            formData.append("token", encData);
            formData.append("type", "2");
           
            this._constantService.uploadFileApi(this._constantService.getUploadFileServiceUrl(), formData).subscribe(data => {
                var responseData:any = data;
                var status = responseData.STATUS;
                if (status == this._constantService.success_msg) {
                    this.file_name = type;
                    this.showPreloader = false;
                    this.file_path = responseData.FPATH;
                    this.attachmentPageCount = responseData.PAGE;
                    this.attachmentId = responseData.PATTCHID;
                    //this._constantService.setToken(responseData.TOKEN);
                    this._constantService.setSessionJsonPair('token',responseData.TOKEN);
                } else if (status == this._constantService.error_token) {
                    this._constantService.clearUserInfo()
                    this.router.navigate(['']);
                    alert('This session has expired');
                } else {
                    this.show_file = 1;
                    this.image_upload = null;
                    this.file_type = null;
                }
            }, error => {
                var responseData = error;
                if (responseData.status == 500) {
                    this.router.navigate(['500']);
                }
            });
        } else {
            alert("Unable to support the selected file");
            this.show_file = 1;
            this.image_upload = null;
            this.file_type = null;
        }
    }

    addFile(event: any) {
        this.file_upload = event.target.files[0];
        let type = this.file_upload.name;
        this.file_name = this.file_upload.name;
        var reader = new FileReader();
        var typearr = type.split(".");
        if (typearr[typearr.length - 1] == "pdf" || typearr[typearr.length - 1] == "PDF" || typearr[typearr.length - 1] == "ppt" || typearr[typearr.length - 1] == 'PPT' || typearr[typearr.length - 1] == "pptx" || typearr[typearr.length - 1] == 'PPTX' || typearr[typearr.length - 1] == 'doc' || typearr[typearr.length - 1] == 'DOC' || typearr[typearr.length - 1] == 'docx' || typearr[typearr.length - 1] == 'DOCX' || typearr[typearr.length - 1] == 'csv' || typearr[typearr.length - 1] == 'CSV') {
            if (typearr[typearr.length - 1] == "pdf" || typearr[typearr.length - 1] == "PDF") {
                this.file_type = 4;
            } else if (typearr[typearr.length - 1] == "ppt" || typearr[typearr.length - 1] == 'PPT' || typearr[typearr.length - 1] == "pptx" || typearr[typearr.length - 1] == 'PPTX') {
                this.file_type = 5;
            } else {
                this.file_type = 3;
            }
            this.showPreloader = true;
            this.show_file = 2;
            var filetype = typearr[typearr.length - 1];
            this.image_upload_url = "assets/images/icons/" + filetype.toLowerCase() + ".png";
            let file: File = this.file_upload;
            var upload = {};
            upload['token'] = this._constantService.getSessionDataBYKey('token');
            upload['token_param'] = {};
            upload['token_param']['device_type'] = "w";
            upload['token_param']['host'] = "";
            var data = JSON.stringify(upload);
            var encData = this._encrypt.encrypt(data);
            let formData = new FormData();
            formData.append("file", file);
            if (this.post_data[0].USER_POST_ATTACHMENT_UUID != null && this.post_data[0].USER_POST_ATTACHMENT_UUID != '') {
                formData.append("uuid", this.post_data[0].USER_POST_ATTACHMENT_UUID);
            } else {
                formData.append("uuid", '0');
            }
            formData.append("token", encData);
            formData.append("type", "2");
           
            this._constantService.uploadFileApi(this._constantService.getUploadFileServiceUrl(), formData).subscribe(data => {
                var responseData:any = data;
                var status = responseData.STATUS;
                if (status == this._constantService.success_msg) {
                    this.imageUpload = false;
                    this.showPreloader = false;

                    this.file_path = responseData.FPATH;
                    this.attachmentPageCount = responseData.PAGE;
                    this.attachmentId = responseData.UUID;
                    //this._constantService.setToken(responseData.TOKEN);
                    this._constantService.setSessionJsonPair('token',responseData.TOKEN);
                } else if (status == this._constantService.error_token) {
                    this._constantService.clearUserInfo()
                    this.router.navigate(['']);
                    alert('This session has expired');
                } else {
                    this.show_file = 1;
                }
            }, error => {
                var responseData = error;
                if (responseData.status == 500) {
                    this.router.navigate(['500']);
                }
            });
        } else if (typearr[typearr.length - 1] == 'jpg' || typearr[typearr.length - 1] == 'jpeg' || typearr[typearr.length - 1] == 'JPG' || typearr[typearr.length - 1] == 'JPEG' || typearr[typearr.length - 1] == 'png' || typearr[typearr.length - 1] == 'PNG') {
            this.imageUpload = true;
            this.showPreloader = true;
            this.show_file = 2;
            this.file_type = 1;
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
            this.image_upload = this.file_upload;
            formData.append("file", this.image_upload);
            if (this.post_data[0].USER_POST_ATTACHMENT_UUID != null && this.post_data[0].USER_POST_ATTACHMENT_UUID != '') {
                formData.append("uuid", this.post_data[0].USER_POST_ATTACHMENT_UUID);
            } else {
                formData.append("uuid", '0');
            }
            formData.append("token", encData);
            formData.append("type", "2");
            
            this._constantService.uploadFileApi(this._constantService.getUploadFileServiceUrl(), formData).subscribe(data => {
                var responseData:any = data;
                var status = responseData.STATUS;
                if (status == this._constantService.success_msg) {
                    this.imageUpload = false;
                    this.showPreloader = false;
                    this.file_path = responseData.FPATH;
                    this.attachmentPageCount = responseData.PAGE;
                    this.attachmentId = responseData.UUID;
                    //this._constantService.setToken(responseData.TOKEN);
                    this._constantService.setSessionJsonPair('token',responseData.TOKEN);
                } else if (status == this._constantService.error_token) {
                    this._constantService.clearUserInfo()
                    this.router.navigate(['']);
                    alert('This session has expired');
                } else {
                    this.show_file = 1;
                    this.image_upload = null;
                    this.file_type = null;
                }
            }, error => {
                var responseData = error;
                if (responseData.status == 500) {
                    this.router.navigate(['500']);
                }
            });
        } else {
            alert("Unable to support the selected file");
            this.show_file = 1;
            this.file_upload = null;
            this.image_upload = null;
            this.file_type = null;
        }
    }

    change_image() {
        if (this.file_upload == null) {
            if (<HTMLInputElement> document.getElementById('edit_post_image') != null) {
                (<HTMLInputElement> document.getElementById('edit_post_image')).click();
            }
        } else {
            if (<HTMLInputElement> document.getElementById('edit_post_image') != null) {
                (<HTMLInputElement> document.getElementById('edit_post_image')).click();
            }
        }

    }

    removeImg() {
        this.show_file = 1;
        this.file_upload = null;
        this.image_upload = null;
    }

    updatePost() {
        this.loader = true;
        this.showText = false;
        if (this.post_data[0].TYPE == 2) {
            this.attachmentId = this.post_data[0].USER_POST_ATTACHMENT_UUID;
        }
        var interststags = this.post_tags.join();
        if (interststags == '') {
            this.loader = false;
            this.showText = true;
            alert("Please enter a post interest");
            return false;
        } else {

            var postData = this.postData.postDataManipulation('post_data');
            if (postData == '' && this.file_upload == undefined && this.image_upload == undefined) {
                this.loader = false;
                this.showText = true;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['type'] = 2;
                this.dataConf['error_msg'] = "Please enter a text";
                this.openConfirmation = true;
                return false;
            }
            if (this.file_upload == null && this.image_upload == null) {
                if (this.youtubeLinkPresent == false && this.vimeoLinkPresent == false) {
                    var addSimplePost = {};
                    addSimplePost['token'] = this._constantService.getSessionDataBYKey('token');
                    addSimplePost['token_param'] = {};
                    addSimplePost['token_param']['device_type'] = 'w';
                    addSimplePost['token_param']['host'] = '';
                    addSimplePost['pdt'] = this.postData.encodeURIPostData(postData).replace(/What's%20on%20your%20mind%3F/g, "");
                    addSimplePost['pv'] = this.post_data[0].VISIBILITY;
                    addSimplePost['pid'] = this.user_post_id;
                    addSimplePost['ptyp'] = '1';
                    addSimplePost['iid'] = this.post_tags.join();
                    addSimplePost['shrlimage'] = this.linkImage;
                    addSimplePost['shrltitle'] = this.postData.encodeURIPostData(this.linkTitle);
                    addSimplePost['shrldesc'] = this.postData.encodeURIPostData(this.linkDescription);
                    addSimplePost['sharelink'] = this.shareLink;

                    this._constantService.fetchDataApi(this._constantService.getAddGenPostServiceUrl(), addSimplePost).subscribe(data => {
                        var responseData:any = data
                        var status = responseData.STATUS;
                        if (status == this._constantService.success_msg) {
                            this.loader = false;
                            this.showText = true;
                            //this._constantService.setToken(responseData.TOKEN);
                            this._constantService.setSessionJsonPair('token',responseData.TOKEN);
                            this.hideBox.emit(false);
                            window.location.reload();
                            this.linkPreview = 3;
                        } else if (status == "error_token") {
                            this.loader = false;
                            this.showText = true;
                            if (this.logout == false) {
                                this.loader = false;
                                this.showText = true;
                                this.sessionLogout.emit(true);
                            }
                        } else {
                            this.loader = false;
                            this.showText = true;
                            this.dataConf['type'] = 2;
                            this.dataConf['msg'] = "STUDY24X7";
                            this.dataConf['error_msg'] = responseData.ERROR_MSG;
                            this.openConfirmation = true;
                        }
                        this.linkImage = '';
                        this.linkTitle = '';
                        this.linkDescription = '';
                        this.shareLink = '';
                    }, error => {
                        var responseData = error;
                        if (responseData.status == 500) {
                            this.router.navigate(['500']);
                        }
                    });
                } else {
                    var addVideoPost = {};
                    addVideoPost['token'] = this._constantService.getSessionDataBYKey('token');
                    addVideoPost['token_param'] = {};
                    addVideoPost['token_param']['device_type'] = "w";
                    addVideoPost['token_param']['host'] = "";
                    addVideoPost['pid'] = this.user_post_id;
                    addVideoPost['pdt'] = this.postData.encodeURIPostData(postData);
                    addVideoPost['pv'] = this.post_data[0].VISIBILITY;;
                    addVideoPost['iid'] = this.post_tags.join();
                    if (this.vimeoLinkPresent) {
                        addVideoPost['ptyp'] = 6;
                    } else if (this.youtubeLinkPresent) {
                        addVideoPost['ptyp'] = 5;
                    }
                    if(this.post_data[0].SHARE_LINK_TITLE){
                        addVideoPost['title'] = this.post_data[0].SHARE_LINK_TITLE;
                    }else{
                        addVideoPost['title'] = this.linkTitle;
                    }

                    addVideoPost['desc'] = "";
                    addVideoPost['vid'] = this.videoId;

                    this._constantService.fetchDataApi(this._constantService.getVideoPostServiceUrl(), addVideoPost).subscribe(data => {
                        var responseData:any = data;
                        var status = responseData.STATUS;
                        if (status == this._constantService.success_msg) {
                            //this._constantService.setToken(responseData.TOKEN);
                            this._constantService.setSessionJsonPair('token',responseData.TOKEN);
                            this.linkPreview = 3;
                            this.hideBox.emit(false);
                            window.location.reload();
                            this.loader = false;
                            this.showText = true;
                            this.linkImage = '';
                            this.linkTitle = '';
                            this.linkDescription = '';
                            this.shareLink = '';
                            this.youtubeLinkPresent = false;
                            this.vimeoLinkPresent = false;
                        } else if (status == "error_token") {
                            this.loader = false;
                            this.showText = true;
                            if (this.logout == false) {
                                this.sessionLogout.emit(true);
                            }
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
            } else {
                var upload = {};
                upload['token'] = this._constantService.getSessionDataBYKey('token');
                upload['token_param'] = {};
                upload['token_param']['device_type'] = "w";
                upload['token_param']['host'] = "";
                upload['pdt'] = this.postData.encodeURIPostData(postData).replace(/%3Cbr%3E/,"").replace(/%3Cbr%3E$/g,"");

                //addSimplePost['pv'] = visibility.value;
                upload['pv'] = this.post_data[0].VISIBILITY;
                upload['pid'] = this.user_post_id;
                upload['ptyp'] = '2';
                upload['iid'] = this.post_tags.join();
                upload['ftyp'] = this.file_type;
                upload['pcap'] = this.file_name;
                upload['fpath'] = this.file_path;
                upload['pages'] = this.attachmentPageCount;
                upload['uuid'] = this.attachmentId;

                this._constantService.fetchDataApi(this._constantService.getAddPostWithAttachemntServiceUrl(), upload).subscribe(data => {
                    var responseData:any = data;
                    var status = responseData.STATUS;
                    if (status == this._constantService.success_msg) {
                        this.loader = false;
                        this.showText = true;
                        this.show_file = 1;
                        //this._constantService.setToken(responseData.TOKEN);
                        this._constantService.setSessionJsonPair('token',responseData.TOKEN);
                        this.hideBox.emit(false);
                        window.location.reload();
                        this.post_tags = [];
                        this.file_upload = null;
                        this.show_file = 1;
                    } else if (status == "error_token") {
                        this.loader = false;
                        this.showText = true;
                        if (this.logout == false) {
                            this.sessionLogout.emit(true);
                        }
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
        }
    }

    getYoutubeData(link) {

        //var url2 = "https://gdata.youtube.com/feeds/api/videos/"+link+"?v=2&alt=json&orderby=published&prettyprint=true"
        //var url = "https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=" + link + "&format=json";
        var url3 = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + link + "&fields=items/snippet/title,items/snippet/description&key=AIzaSyDvBT5SIRntta660lUcTK85ryaSIZQwSI0"
        this._constantService.getDataApi(url3).subscribe(data => {
            this.videoId = link;
            var responseData:any = data;
            this.linkImage = "https://img.youtube.com/vi/" + link + "/maxresdefault.jpg";
            this.linkAttrTitle = responseData['items'][0]['snippet']['title'];
            if (responseData['items'][0]['snippet']['title'].length > 100) {
                this.linkTitle = responseData['items'][0]['snippet']['title'].slice(0, 100) + "...";
            } else {
                this.linkTitle = responseData['items'][0]['snippet']['title'];
            }
            this.linkPreview = 2;
            this.ret = 1;
            this.youtubeLinkPresent = true;
            this.show_image = 1;
        });

    }

    getUrl(index) {
        if(index){
        var imgUrl = "url('"+index+"')";
        return imgUrl;
       }
       else{
          this.linkImage = "";
          return this.linkImage;
       }
}

    getVimeoData(id) {
        var VIMEO_BASE_URL = "https://vimeo.com/api/oembed.json?url=https://vimeo.com/" + id;
        this._constantService.getDataApi(VIMEO_BASE_URL).subscribe(data => {
            var respoonseData:any = data;
            this.videoId = id;
            this.linkImage = respoonseData.thumbnail_url_with_play_button;
            this.linkTitle = respoonseData.title;
            this.linkPreview = 2;
            this.ret = 1;
            this.vimeoLinkPresent = true;
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this.router.navigate(['500']);
            }
        });
    }
    keydown(e) {
        if (e.keyCode == 13) {
            // insert 2 br tags (if only one br tag is inserted the cursor won't go to the second line)
            document.execCommand('insertHTML', false, '<br>');
            // prevent the default behaviour of return key pressed
            return false;
        }
    }


}


