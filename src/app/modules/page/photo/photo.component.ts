import {Input, Component, OnInit, AfterViewInit, Output, EventEmitter, ViewChild, HostListener, ElementRef} from '@angular/core';
import {ConstantService} from './../../../services/constant.service';
import {EncryptionService} from './../../../services/encryption.service';
import {PostdataService} from './../../../services/postdata.service';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
    selector: 'app-photo',
    templateUrl: './photo.component.html',
    styleUrls: ['./photo.component.scss', './newphoto.component.scss']
})
export class PhotoComponent implements OnInit {
    t: string = "";
    emptyGallery: boolean = true;
    slideChangeMessage = '';
    slides = [
        {image: 'assets/images/photo3.jpg'},
        {image: 'assets/images/chapter1.png'},
        {image: 'assets/images/slide1.jpg'}
    ];
    alert: boolean = false;
    alertMsg = {};
    showopup: boolean = false;
    sortlist: boolean = false;
    count = 1;
    gallery = [];
    fullPathGlry = [];
    currentImage = 0;
    continueScroll: boolean = false;
    newPageId: string = "";
    openCorasol: boolean = true;
    loadGallery: boolean = true;
    showPreloader=false;
    //    @ViewChild('sortlistcover', {read: ElementRef}) sortlistcover: ElementRef;
    @Input() pageId: string;
    @Input() user_type: number;
    @Input() withouttoken: boolean = false ;
    // ayush:any='https://s3.ap-south-1.amazonaws.com/247-user-test/development/2.0.0.7/profile/7f858120-ed81-11e8-bf49-e5a18049772e.png';
    path = 'https://s3.ap-south-1.amazonaws.com/247-page-test/development/2.0.0.7/cover/e2537eb0-d684-11e8-a943-3738f71090d7_1235x330.png?v=1542350979510';

    log(event: number) {
        this.slideChangeMessage = `Slide has been switched: ${event}`;
    }

    constructor(
        public _constantService: ConstantService,
        private _encryptionServices: EncryptionService,
        private _router: Router,
        private postData: PostdataService,
        private sanitizer: DomSanitizer
    ) {}

    ngOnInit() {
        //        this.t = this._constantService.getSessionDataBYKey('token');
        //        if (this.t != 'null' && this.t != 'undefined' && this.t != "") {
        this.newPageId = this.pageId;
        if(!this.withouttoken){
            this.getPageGallery(this.count);
        }else{
            this.getPageGalleryPublic(this.count);
        }
        
        //        }
    }

    ngDoCheck() {
        if (this.newPageId != this.pageId) {
            this.newPageId = this.pageId;
            this.count = 1;
            this.getPageGallery(this.count);
        }
    }

    show_img_popup(id) {
        if (this.openCorasol) {
            this.currentImage = id;
            this.showopup = true;
            let body = document.getElementsByTagName('body')[0];
            body.classList.add("body-overflow");
        }
    }
    hide_img_popup() {
        this.showopup = false;
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
    }
    showsortlist() {
        this.sortlist = !this.sortlist;
    }
    //    @HostListener('document:click', ['$event'])
    //    clickout(event) {
    //        if (this.sortlistcover.nativeElement.contains(event.target)) {
    //            this.sortlist = true;
    //        }
    //        else {
    //            this.sortlist = false;
    //        }
    //    }
    hidesortlist() {
        this.sortlist = false;
    }

    url: any;
    getUrl(index) {
        var imgUrl = "url('" + this.fullPathGlry[index] + "')";
        return imgUrl;

    }

    uploadImage(event) {
        //        this.count = 1;
        this.showPreloader=true;
        console.log("photo file uploaded");
        var imageUpload = event.target.files[0];
        //        let type = this.image_upload.name;
        var reader = new FileReader();
        //        var typearr = type.split(".");
        var size = Math.round(imageUpload.size / 1000 / 1000);
        if (size <= 10) {
            if (imageUpload.name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
                reader.readAsDataURL(event.target.files[0]);
                var upload = {};
                upload['token'] = this._constantService.getSessionDataBYKey('token');
                upload['token_param'] = {};
                upload['token_param']['device_type'] = "w";
                upload['token_param']['host'] = "";
                var data = JSON.stringify(upload);
                var encData = this._encryptionServices.encrypt(data);
                let formData = new FormData();
                formData.append("file", imageUpload);
                formData.append("token", encData);
                formData.append("page_uuid", this.pageId);
                formData.append("img_title", imageUpload.name);
                this._constantService.uploadFileApi(this._constantService.getUploadImageOnPageServiceUrl(), formData).subscribe(data => {
                    this.count = 1;
                    var responseData:any = data;
                    var status = responseData.STATUS;
                    if (status == this._constantService.success_msg) {
                        //this._constantService.setToken(responseData.TOKEN);
                        this._constantService.setSessionJsonPair('token',responseData.TOKEN);
                        this.getPageGallery(this.count);
                    } else if (status == this._constantService.error_token) {
                    } else {
                        this.alertMsg['msg'] = "STUDY24X7";
                        this.alertMsg['type'] = 2;
                        this.alertMsg['error_msg'] = responseData.ERROR_MSG;
                        this.alert = true;
                        return false;
                    }

                }, error => {
                    var responseData = error;
                    if (responseData.status == 500) {
                        this._router.navigate(['500']);
                    }
                });
            } else {
                this.alertMsg['msg'] = "STUDY24X7";
                this.alertMsg['type'] = 2;
                this.alertMsg['error_msg'] = "Unable to support the selected file ";
                this.alert = true;
                this.showPreloader=false;
                return false;
            }

        } else {
            this.alertMsg['msg'] = "STUDY24X7";
            this.alertMsg['type'] = 2;
            this.alertMsg['error_msg'] = "File above 10mb is not allowed";
            this.alert = true;
        }
    }

    closePopup(event) {
        this.alert = false;
    }

    getPageGallery(count) {
        var gallery = {};
        gallery['token'] = this._constantService.getSessionDataBYKey('token');
        gallery['token_param'] = {};
        gallery['token_param']['device_type'] = 'w';
        gallery['token_param']['host'] = '';
        gallery['pg_uuid'] = this.pageId;
        gallery['count'] = count;

        this._constantService.fetchDataApi(this._constantService.getpageGalleryServiceUrl(), gallery).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                if (count == 1) {
                    this.gallery = [];
                    this.fullPathGlry = [];
                }
                var arr = [];
                var fullPath = [];
                for (var i = 0; i < responseData.PAGE_GALLERY_DATA.length; i++) {

                    var index = this.gallery.findIndex(x => x.PAGE_GALLERY_UUID == responseData.PAGE_GALLERY_DATA[i].PAGE_GALLERY_UUID);
                    if (index == -1) {
                        responseData.PAGE_GALLERY_DATA[i].ADD_DATE_TIME = this.postData.getPostDateTime(responseData.PAGE_GALLERY_DATA[i].ADD_DATE_TIME);
                        responseData.PAGE_GALLERY_DATA[i]['URL'] = "http://s3.ap-south-1.amazonaws.com/247-user-test/development/2.0.0.7/profile/" + responseData.PAGE_GALLERY_DATA[i].PAGE_GALLERY_UUID + ".png";
                        responseData.PAGE_GALLERY_DATA[i].DISPLAY = true;
                        arr.push(responseData.PAGE_GALLERY_DATA[i]);
                    }
                    fullPath[i] = arr[i].FILE_PATH + 'profile/' + arr[i].PAGE_GALLERY_UUID + '.png';

                }

                this.gallery.push.apply(this.gallery, arr);
                this.fullPathGlry.push.apply(this.fullPathGlry, fullPath);
                if (responseData.PAGE_GALLERY_DATA.length < 20) {
                    this.continueScroll = false;
                } else {
                    this.continueScroll = true;
                }
                if (responseData.PAGE_GALLERY_DATA.length == 20) {
                    this.count += 1;
                }
                if (this.gallery.length > 0) {
                    this.emptyGallery = false;
                } else {
                    this.emptyGallery = true;;
                }
                this.loadGallery = false;
                this.showPreloader=false;
            }
        },error=>{
            this.showPreloader=false;
        })
    }

    getPageGalleryPublic(count) {
        var gallery = {};
        gallery['pg_uuid'] = this.pageId;
        gallery['count'] = count;

        this._constantService.fetchDataApi(this._constantService.getPublicpageGalleryServiceUrl(), gallery).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                if (count == 1) {
                    this.gallery = [];
                    this.fullPathGlry = [];
                }
                var arr = [];
                var fullPath = [];
                for (var i = 0; i < responseData.PAGE_GALLERY_DATA.length; i++) {

                    var index = this.gallery.findIndex(x => x.PAGE_GALLERY_UUID == responseData.PAGE_GALLERY_DATA[i].PAGE_GALLERY_UUID);
                    if (index == -1) {
                        responseData.PAGE_GALLERY_DATA[i].ADD_DATE_TIME = this.postData.getPostDateTime(responseData.PAGE_GALLERY_DATA[i].ADD_DATE_TIME);
                        responseData.PAGE_GALLERY_DATA[i]['URL'] = "http://s3.ap-south-1.amazonaws.com/247-user-test/development/2.0.0.7/profile/" + responseData.PAGE_GALLERY_DATA[i].PAGE_GALLERY_UUID + ".png";
                        responseData.PAGE_GALLERY_DATA[i].DISPLAY = true;
                        arr.push(responseData.PAGE_GALLERY_DATA[i]);
                    }
                    fullPath[i] = arr[i].FILE_PATH + 'profile/' + arr[i].PAGE_GALLERY_UUID + '.png';

                }

                this.gallery.push.apply(this.gallery, arr);
                this.fullPathGlry.push.apply(this.fullPathGlry, fullPath);
                if (responseData.PAGE_GALLERY_DATA.length < 20) {
                    this.continueScroll = false;
                } else {
                    this.continueScroll = true;
                }
                if (responseData.PAGE_GALLERY_DATA.length == 20) {
                    this.count += 1;
                }
                if (this.gallery.length > 0) {
                    this.emptyGallery = false;
                } else {
                    this.emptyGallery = true;;
                }
                this.loadGallery = false;
            }
        })
    }

    onScrollDownn() {
        if (this.continueScroll) {
            if(!this.withouttoken){
                this.getPageGallery(this.count);
            }else{
                this.getPageGalleryPublic(this.count);
            }
            
        }
    }

    removeImage(id, index) {
        this.openCorasol = false;
        var removeImage = {};
        removeImage['token'] = this._constantService.getSessionDataBYKey('token');
        removeImage['token_param'] = {};
        removeImage['token_param']['device_type'] = 'w';
        removeImage['token_param']['host'] = '';
        removeImage['pg_gallery_uuid'] = id;
        removeImage['pg_uuid'] = this.pageId;

        this._constantService.fetchDataApi(this._constantService.getRemovePageFGalleryImageServiceUrl(), removeImage).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.count = 1;
                this.getPageGallery(this.count);
                this.openCorasol = true;
            }
        })
    }

}
