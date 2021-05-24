import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConstantService } from '../../services/constant.service';
import { EncryptionService } from '../../services/encryption.service';
import { PostdataService } from '../../services/postdata.service';
import * as Quill from 'quill';
//declare var Quill;
import QuillBetterTable from 'quill-better-table'


@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, AfterViewInit {
    isPublishedTimer: boolean = false;
    isSavedTimer: boolean = false;
    isSavedArticle: boolean = false;
    editorMode: number = 0;
    alertMsg = {};
    isDraft: boolean = false;
    isConfirmPopup = false;
    contentHtml: string;
    @ViewChild('editor', { read: ElementRef }) editor: ElementRef;
    artHeadline = '';
    pageUuid = '';
    articleUuid = '';
    articleId = '';
    image_upload_url: any;
    show_image: number;
    showPreloader: boolean;
    image_upload: any;
    loader: boolean;
    showInterest: boolean;
    post_tags: any = [];
    user_interest: any;
    hideAddIntrest = false;
    quillEditor;
    optionDrpdwn: boolean = false;
    shwwallshowInterest: boolean = false;
    coverPath = '';
    showglow;
    isPublishing: boolean = false;
    mySetInterval;

    toolbarOptions = {
        container: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic'],
            [{ 'align': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image', 'video'],
            ['clean']                                         // remove formatting button
        ],

        handlers: {
            'image': this.imageHandler1.bind(this),
            'table': this.tableHandler.bind(this)
        },
    };
    articleAnchorTags: any;





    constructor(
        public _constantService: ConstantService,
        public _encryptionServices: EncryptionService,
        public _router: Router,
        public post_data: PostdataService,
        private activatedRoute: ActivatedRoute,
    ) {
        Quill.register({
            'modules/better-table': QuillBetterTable
        }, true)

    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            if (params['id']) {
                this.editorMode = 1;
                this.articleId = params['id'];
                this.getArticleForEdit();
            } else if (params['pageId']) {
                this.pageUuid = params['pageId'];
            }
        });

        var interestall = JSON.parse(this._constantService.getSessionDataBYKey('interests'));
        this.user_interest = [];
        for (let key in interestall) {
            var obj = { "STATUS": true, "INTEREST_ID": key, "INTEREST_NAME": interestall[key] };
            this.user_interest.push(obj);
        }
        if (this.articleId == "") {
            this.get_PreviousArticle();
        }


    }

    ngAfterViewInit() {
        

        setTimeout(() => {
            this.enableEditorQuill();
        }, 2000);
    }

    getArticleForEdit() {
        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";
        hitObj['artl_id'] = this.articleId;

       
        this._constantService.fetchDataApi(this._constantService.getSingleArticleDataUrl(),hitObj).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                // this.getArticleTextOnly();
                this.isSavedArticle = true;
                this.articleId = responseData.ARTICLE_ID;
                this.articleUuid = responseData.ARTICLE_UUID;
                if (responseData.PAGE_UUID) {
                    this.pageUuid = responseData.PAGE_UUID;
                }
                this.coverPath = responseData.ARTICLE_COVER_URL ? responseData.ARTICLE_COVER_URL + '/' + this.articleUuid + '.png' : '';
                this.artHeadline = this.post_data.decodeURIPostData(responseData.ARTICLE_TITLE);
                if (this.quillEditor) {
                    this.quillEditor.root.innerHTML = this.post_data.decodeURIPostData(responseData.ARTICLE_TEXT);
                    clearInterval(this.mySetInterval);
                } else {
                    this.mySetInterval = setInterval(() => {
                        if (this.quillEditor) {
                            this.quillEditor.root.innerHTML = this.post_data.decodeURIPostData(responseData.ARTICLE_TEXT);
                            clearInterval(this.mySetInterval);
                        }
                    }, 1000);
                }


                let intObject = JSON.parse(responseData.ARTICLE_INTEREST);
                let post_tags = intObject.Interest;
                post_tags.forEach((id) => {
                    for (let obj of this.user_interest) {
                        if (obj['INTEREST_ID'] == id) {
                            this.addTags(id, obj['INTEREST_NAME']);
                        }
                    }
                });
            } else if (status == this._constantService.error_token) {
                this.alertMsg['type'] = 4;
                this.alertMsg['msg'] = "Session Expire";
                this.alertMsg['error_msg'] = "Session Expired!";
                this.isConfirmPopup = true;
                return false;
            } else {
                this.alertMsg['type'] = 2;
                this.alertMsg['msg'] = "Error";
                this.alertMsg['error_msg'] = responseData.ERROR_MSG;
                // this.isConfirmPopup = true;
                this._router.navigate(["article/myarticle"]);
                return false;
            }
        }), error => {
            var err = error;
            if (err.status == 500) {
                this._router.navigate(['500']);
            }
        };
    }

    getArticleTextOnly() {
        var articleDetails = {};
        articleDetails['artl_id'] = this.articleId;

      

        this._constantService.fetchDataApi(this._constantService.getArticleSinglePostOnlyTextView(),articleDetails).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            // this.arr=responseData;
            if (status == 'success') {
                if (this.quillEditor) {
                    this.quillEditor.root.innerHTML = this.post_data.decodeURIPostData(responseData.ARTICLE_TEXT);
                    clearInterval(this.mySetInterval);

                } else {
                    this.mySetInterval = setInterval(() => {
                        if (this.quillEditor) {
                            this.quillEditor.root.innerHTML = this.post_data.decodeURIPostData(responseData.ARTICLE_TEXT);
                            clearInterval(this.mySetInterval);
                        }
                    }, 1000);
                }

            }
        });
    }


    sessionExpire(event) {
        if (event) {
            this.alertMsg['type'] = 4;
            this.alertMsg['msg'] = "Session Expire";
            this.alertMsg['error_msg'] = "Session Expired";
            this.isConfirmPopup = true;
        }
    }


    enableEditorQuill() {
        if (!this.quillEditor) {
            try {
                this.quillEditor = new Quill('#editor', {
                    modules: {
                        toolbar: this.toolbarOptions,
                        table: false,  // disable table module
                        'better-table': {
                            operationMenu: {
                                items: {
                                    unmergeCells: {
                                        text: 'Another unmerge cells name'
                                    }
                                }
                            },
                            color: {
                                colors: ['#fff', 'red', 'rgb(0, 0, 0)'],  // colors in operationMenu
                                text: 'Background Colors'  // subtitle
                            }
                        },
                        keyboard: {
                            bindings: QuillBetterTable.keyboardBindings
                        }
                    },

                    readOnly: false,
                    placeholder: 'Write your article here and can also add media items',
                    theme: 'snow'
                });

                //                const tableModule = this.quillEditor.getModule('better-table');

                var tooltip = this.quillEditor.theme.tooltip;
                var input = tooltip.root.querySelector('input[data-link]');
                input.dataset.link = 'www.aio.com';
               


            } catch{
                setTimeout(() => { this.enableEditorQuill(); }, 2000);
            }

            //          this.quillEditor.on('text-change', this.updateContent())
        }


    }

    tableHandler() {
        const tableModule = this.quillEditor.getModule('better-table');
        tableModule.insertTable(3, 3);
    }

    quillimageURL;

    imageHandler1() {


        this.quillimageURL = "";
        var input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        
        input.onchange = async () => {
            const file = input.files[0];

            await this.uploadFile(file);
            const range = this.quillEditor.getSelection(true);
            const index = range.index + range.length;


            this.quillEditor.insertEmbed(range.index, 'image', this.quillimageURL);
          
            this.quillEditor.setSelection(range.index + 2, range.index + 2);
            

        };
    }

    uploadFile(file) {
        return new Promise((resolve) => {
            var reader = new FileReader();
            var size = Math.round(file.size / 1000 / 1000);
            if (size <= 2) {
                if (file.name.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|gif)$/)) {

                    var upload = {};
                    upload['token'] = this._constantService.getSessionDataBYKey('token');
                    upload['token_param'] = {};
                    upload['token_param']['device_type'] = "w";
                    upload['token_param']['host'] = "";

                    var data = JSON.stringify(upload);
                    var encData = this._encryptionServices.encrypt(data);
                    let formData = new FormData();
                    formData.append("file", file);
                    formData.append("token", encData);
                    formData.append("artl_uuid", this.articleUuid);
                    formData.append("pg_uuid", this.pageUuid);

                    this._constantService.uploadFileApi(this._constantService.getArticleBodyImgUpldUrl(), formData).subscribe(data => {
                        var responseData:any = data;
                        var status = responseData.STATUS;

                        if (status == this._constantService.success_msg) {
                            this.articleUuid = responseData.ARTICLE_UUID;
                            window.history.replaceState(null, null, 'article/edit/' + responseData.ARTICLE_UUID);
                            this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                            this.quillimageURL = responseData.PATH + '/' + responseData.FILE_NAME;
                            resolve(responseData.PATH + '/' + responseData.FILE_NAME);
                            this.isSavedArticle = true;
                        } else if (status == this._constantService.error_token) {
                            this.alertMsg['msg'] = "Error";
                            this.alertMsg['type'] = 2;
                            this.alertMsg['error_msg'] = responseData.ERROR_MSG;
                            this.isConfirmPopup = true;
                            resolve();
                            return;
                        } else {
                            this.alertMsg['msg'] = "Error";
                            this.alertMsg['type'] = 2;
                            this.alertMsg['error_msg'] = responseData.ERROR_MSG;
                            this.isConfirmPopup = true;
                            resolve();
                            return;
                        }
                    }, error => {
                        var responseData = error;
                        if (responseData.status == 500) {
                            this._router.navigate(['500']);
                            resolve();

                        }
                    });
                } else {

                    this.alertMsg['msg'] = "STUDY24X7";
                    this.alertMsg['type'] = 2;
                    this.alertMsg['error_msg'] = "Unable to support the selected file ";
                    this.isConfirmPopup = true;
                    resolve();
                    return false;
                }

            } else {
                this.alertMsg['msg'] = "STUDY24X7";
                this.alertMsg['type'] = 2;
                this.alertMsg['error_msg'] = "File above 2mb is not allowed";
                this.isConfirmPopup = true;
                resolve();
                return false;

            }


        });
    }


    optionList() {
        this.optionDrpdwn = !this.optionDrpdwn;
    }
    hideoptionList() {
        this.optionDrpdwn = false;
    }

    shwwalltags() {
        this.shwwallshowInterest = true;
    }
    hidealltags() {
        this.shwwallshowInterest = false;
    }


    addTags(tag_id, tag_name) {
        if (this.post_tags.indexOf(tag_id) == -1) {
            this.post_tags.push(tag_id);
            var tagText = tag_name + '<img src="assets/images/svg/tagcross.svg" id="remove_' + tag_id + '">';
            var tag = document.createElement('span');
            tag.id = "tag_" + tag_id;
            tag.className = 'tags remTag';
            tag.innerHTML = tagText;
            var tags = document.getElementById('posttags');
            if (tags != null && tags != undefined) {
                tags.insertBefore(tag, tags.childNodes[0]);
                var tag_dom = document.getElementById("remove_" + tag_id);
                var post_tagArr = this.post_tags;
                tag_dom.addEventListener('click', () => {
                    tags.removeChild(tag);
                    var index = post_tagArr.indexOf(tag_id);
                    var remid = this.user_interest.findIndex(x => x.INTEREST_ID == tag_id);
                    post_tagArr.splice(index, 1);
                    this.user_interest[remid].STATUS = true;
                    if (this.post_tags.length < 3) {
                        this.hideAddIntrest = false;
                    }
                });
            }
            this.post_tags = post_tagArr;
            var id = this.user_interest.findIndex(x => x.INTEREST_ID == tag_id);
            this.user_interest[id].STATUS = false;
        }
        this.showInterest = false;
        if (this.post_tags.length >= 3) {
            this.hideAddIntrest = true;
        }
    }


    // removeCover() {
    //     this.coverPath = '';
    // }

    addCoverImageFile(event, typ) {
        this.image_upload = event.target.files[0];
        var reader = new FileReader();
        var size = Math.round(this.image_upload.size / 1000 / 1000);
        if (size <= 10) {
            if (this.image_upload.name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
                this.showPreloader = true;
                this.show_image = 2;
                reader.onload = (event: any) => {
                    this.coverPath = event.target.result;
                    //                    var image = new Image();
                    //                    image.src = reader.result;
                    //                    alert(image);
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
                formData.append("file", this.image_upload);
                formData.append("pattchid", '0');
                formData.append("token", encData);
                formData.append("type", typ);
                formData.append("artl_uuid", this.articleUuid);
                formData.append("pg_uuid", this.pageUuid);

                this._constantService.uploadFileApi(this._constantService.getArticleCvrUpldUrl(), formData).subscribe(data => {
                    var responseData:any = data;
                    var status = responseData.STATUS;
                    this.isDraft = true;
                    this.loader = false;
                    if (status == this._constantService.success_msg) {
                        this.articleUuid = responseData.ARTICLE_UUID;
                        this._constantService.showToast("Saved as draft.","",1);
                        window.history.replaceState(null, null, 'article/edit/' + responseData.ARTICLE_ID);
                        this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                        this.isSavedArticle = true;
                    } else if (status == this._constantService.error_token) {
                        //                        this.showText = true;
                        //                        this.showPreloader = false;
                        //                        this.sessionLogout.emit(true);
                    } else {
                        this.image_upload = null;
                        this.coverPath = '';
                        this.alertMsg['msg'] = "Error";
                        this.alertMsg['type'] = 2;
                        this.alertMsg['error_msg'] = responseData.ERROR_MSG;
                        this.isConfirmPopup = true;
                        return;
                    }
                }, error => {
                    var responseData = error;
                    if (responseData.status == 500) {
                        this._router.navigate(['500']);
                    }
                });
            } else {

              
            }

        } else {
           
        }
    }

    createUpdtArticle() {
        return new Promise(resolve => {
            var hitObj = {};
            hitObj['token'] = this._constantService.getSessionDataBYKey('token');
            hitObj['token_param'] = {};
            hitObj['token_param']['device_type'] = "w";
            hitObj['token_param']['host'] = "";

            if (this.artHeadline == '') {
                resolve(false);
                this.alertMsg['msg'] = "Error";
                this.alertMsg['type'] = 2;
                this.alertMsg['error_msg'] = 'Please provide article headline';
                this.isConfirmPopup = true;
                return;
            }
            hitObj['artl_tle'] = this.post_data.encodeURIPostData(this.artHeadline?this.artHeadline:'');

            if (this.post_tags.length == 0) {
                resolve(false);
                this.alertMsg['msg'] = "Error";
                this.alertMsg['type'] = 2;
                this.alertMsg['error_msg'] = 'Please select atleast one article interest';
                this.isConfirmPopup = true;
                return;
            }
            hitObj['intr'] = this.post_tags.join();

            this.articleAnchorTags = this.quillEditor.root.getElementsByTagName('A');
            for (let i = 0; i < this.articleAnchorTags.length; i++) {
                if (this._constantService.isExternalLink(this.articleAnchorTags[i].href)) {
                    this.articleAnchorTags[i].rel = 'nofollow noopener';
                }
            }

            hitObj['artl_txt'] = this.post_data.encodeURIPostData(this.quillEditor.root.innerHTML);

            hitObj['pg_uuid'] = this.pageUuid;
            hitObj['artl_uuid'] = this.articleUuid;

            hitObj['artl_inr_txt'] = this.post_data.encodeURIPostData(this.quillEditor.root.innerText.substring(0, 150));
            if (hitObj['artl_inr_txt'] == '') {
                resolve(false);
                this.alertMsg['msg'] = "Error";
                this.alertMsg['type'] = 2;
                this.alertMsg['error_msg'] = 'Please provide some article description';
                this.isConfirmPopup = true;
                return;
            }

           

            this._constantService.fetchDataApi(this._constantService.getArticleCreateUpdtdUrl(),hitObj).subscribe(data => {
                var responseData:any = data;
                var status = responseData.STATUS;
                if (status == this._constantService.success_msg) {
                    this.isSavedArticle = true;
                    this.isSavedTimer = true;
                    setTimeout(() => { this.isSavedTimer = false }, 3000);
                    this.articleUuid = responseData.ARTICLE_UUID;
                    // window.history.replaceState(null, null, 'article/edit/' + responseData.ARTICLE_UUID);
                    resolve(true);
                } else if (status == this._constantService.error_token) {
                    resolve(false);
                    this.alertMsg['type'] = 4;
                    this.alertMsg['msg'] = "Session Expire";
                    this.alertMsg['error_msg'] = "Session Expired!";
                    this.isConfirmPopup = true;
                    return false;
                } else {
                    resolve(false);
                    this.alertMsg['type'] = 2;
                    this.alertMsg['msg'] = "Error";
                    this.alertMsg['error_msg'] = responseData.ERROR_MSG;
                    this.isConfirmPopup = true;
                    return false;
                }
            }), error => {
                resolve(false);
                var err = error;
                if (err.status == 500) {
                    this._router.navigate(['500']);
                }
            };
        });
    }

    async publishArticle() {
        this.isPublishedTimer = true;
        this.isPublishing = true;
        if (await this.createUpdtArticle()) {
            var hitObj = {};
            hitObj['token'] = this._constantService.getSessionDataBYKey('token');
            hitObj['token_param'] = {};
            hitObj['token_param']['device_type'] = "w";
            hitObj['token_param']['host'] = "";
            hitObj['artl_uuid'] = this.articleUuid;

          

            this._constantService.fetchDataApi(this._constantService.getPublishArticleRestURL(),hitObj).subscribe(data => {
                var responseData:any = data;
                var status = responseData.STATUS;
                if (status == this._constantService.success_msg) {
                    this.isPublishing = false;
                    var status = responseData.STATUS;
                    this._router.navigate(['article/' + responseData.ARTICLE_ID]);

                        
                } else if (status == this._constantService.error_token) {
                    this.alertMsg['type'] = 4;
                    this.alertMsg['msg'] = "Session Expire";
                    this.alertMsg['error_msg'] = "Session Expired!";
                    this.isConfirmPopup = true;
                    return false;
                } else {
                    this.alertMsg['type'] = 2;
                    this.alertMsg['msg'] = "Error";
                    this.alertMsg['error_msg'] = responseData.ERROR_MSG;
                    this.isConfirmPopup = true;
                    this.isPublishing = false;

                    return false;
                }
            }), error => {
                this.isPublishing = false;
                var err = error;
                if (err.status == 500) {
                    this._router.navigate(['500']);
                }
            };
        } else {
            this.isPublishing = false;

        }
    }

    textAreaAdjust(event) {
        let id = document.getElementById(event.target.id);
        if (id.scrollHeight) {
          id.style.height = id.scrollHeight + "px";
       


        }
    }

    get_PreviousArticle() {
        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";
        if (this.pageUuid) {
            hitObj['page_uuid'] = this.pageUuid;
        } else {
            hitObj['page_uuid'] = "";
        }

       
        this._constantService.fetchDataApi(this._constantService.getLtUserInterestServiceUrl(),hitObj).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this._constantService.setLtPostInterest(responseData.LATEST_INTEREST_ID);
                this.latestPostInterest();
            } else if (status == this._constantService.error_token) {
                this.alertMsg['type'] = 4;
                this.alertMsg['msg'] = "Session Expire";
                this.alertMsg['error_msg'] = "Session Expired!";
                this.isConfirmPopup = true;
                return false;
            } else {
                this.alertMsg['type'] = 2;
                this.alertMsg['msg'] = "Error";
                this.alertMsg['error_msg'] = responseData.ERROR_MSG;
                this.isConfirmPopup = true;
                return false;
            }
        }), error => {
            var err = error;
            if (err.status == 500) {
                this._router.navigate(['500']);
            }
        };
    }


    latestPostInterest() {
        var x;
        
        x = this._constantService.getLtPostInterest();
        if (x != null && x != undefined) {
            x = x.split(',');
        } else {
            return;
        }
        var preInt = [];
        if (x != null) {
            for (var j = 0; j < x.length; j++) {
                preInt.push(parseInt(x[j]));
            }
        }
        for (var l = 0; l < this.user_interest.length; l++) {
            if (!preInt.includes(this.user_interest[l])) {
                this.user_interest[l].STATUS = true;
            }
        }
        if (preInt.length != 0) {
            for (var k = 0; k < preInt.length; k++) {
                var id = this.user_interest.findIndex(x => x.INTEREST_ID == preInt[k]);
                if (this.user_interest[id] != undefined) {
                    this.addTags(this.user_interest[id].INTEREST_ID, this.user_interest[id].INTEREST_NAME);
                }
            }
        }

    }

    removeCoverImageFile() {
        var upload = {};
        upload['token'] = this._constantService.getSessionDataBYKey('token');
        upload['token_param'] = {};
        upload['token_param']['device_type'] = "w";
        upload['token_param']['host'] = "";
        var data = JSON.stringify(upload);
        var encData = this._encryptionServices.encrypt(data);
        let formData = new FormData();
        formData.append("file", '');
        // formData.append("pattchid", '0');
        formData.append("token", encData);
        formData.append("type", '0');
        formData.append("artl_uuid", this.articleUuid);
        formData.append("pg_uuid", this.pageUuid);
        this._constantService.uploadFileApi(this._constantService.getArticleCvrUpldUrl(), formData).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.coverPath = '';

            }
            else if (status == this._constantService.error_token) {

            } else {
                this.image_upload = null;
                this.coverPath = '';
                this.alertMsg['msg'] = "Error";
                this.alertMsg['type'] = 2;
                this.alertMsg['error_msg'] = responseData.ERROR_MSG;
                this.isConfirmPopup = true;
                return;
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

}
