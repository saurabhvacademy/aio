import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ConstantService} from './../../services/constant.service';
import {PostdataService} from './../../services/postdata.service';
import {EncryptionService} from './../../services/encryption.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-imageview',
    templateUrl: './imageview.component.html',
    styleUrls: ['./imageview.component.scss', './newimageview.component.scss']
})
export class ImageviewComponent implements OnInit {
    NotAllowed: boolean = false;
    success: boolean = false;
    userId: any;
    @Input() imageUrl: string;
    @Input() imageUrlArticle: string;
    @Input() ImageTyp;
    @Input() userType: boolean;
    @Output() closePopUp = new EventEmitter<string>();
    imageviewmenu = false;
    config: any;
    urlOrg = "";
    height: boolean;
    img_h: boolean = false;
    img_w: boolean = false;
    hideoptioncontent: boolean = true;
    report_input_option: boolean = true;
    showlist: boolean = false;
    // div_height:number;
    // screen_height:number;
    // @ViewChild('div_height') elementView: ElementRef;
    constructor(public _constantService: ConstantService,
        private _encryptionService: EncryptionService,
        private _router: Router,
        private post_data:PostdataService) {}

    ngOnInit() {
        if (this.imageUrl) {
            this.urlOrg = this.imageUrl.substring(0, this.imageUrl.lastIndexOf(".")) + "_2000.png";
            if (this.ImageTyp == 0) {
                this.NotAllowed = true;
            }
        }else if(this.imageUrlArticle){
            this.urlOrg = this.imageUrlArticle;
        }else {
            this.closePopUp.emit("1");
        }

    }
    image_view() {
        setTimeout(() => {
            var screen_height = screen.height;
            var div_height = document.getElementById('div_height').offsetHeight;
            var img_height = document.getElementById('img_size').offsetHeight;
            var img_width = document.getElementById('img_size').offsetWidth;
            if (div_height < screen_height) {
                this.height = false;
            }
            else {
                this.height = true;
            }

            if (img_height > 800) {
                this.img_h = true;
            }


            if (img_width > 1000) {
                this.img_w = true;
            }


            if (img_height > 800 && img_width > 1000) {
                this.img_w = false;
                this.img_h = true;
            }


        }, 550)
    }

    imageviewdropdown() {
        this.imageviewmenu = !this.imageviewmenu;
    }

    closePopup() {
        this.closePopUp.emit("1");
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("body-overflow");
        // this.height=true;
    }

    showDropDownList() {
        this.showlist = !this.showlist;
    }
    unckecked() {
        for (let i = 1; i <= 5; i++) {
            let id = "report" + i;
            (<HTMLInputElement> document.getElementById(id)).checked = false;

        }

    }

    getpageReport() {
        if ((<HTMLInputElement> document.getElementById("other")).value) {
            var text = (<HTMLInputElement> document.getElementById("other")).value;
            var reptyp = 6;
        } else {
            text = '';
        }
        for (let i = 1; i <= 5; i++) {
            let id = "report" + i;
            if ((<HTMLInputElement> document.getElementById(id)).checked == true) {
                reptyp = i;
            }
        }
        var pageReport = {};
        pageReport['token'] = this._constantService.getSessionDataBYKey('token');
        pageReport['token_param'] = {};
        pageReport['token_param']['device_type'] = 'w';
        pageReport['token_param']['host'] = '';
        if (this.ImageTyp == 1 || this.ImageTyp == 2) {
            this.userId = JSON.parse(this._constantService.getSessionDataBYKey('friend_user_id'));
        } else if (this.ImageTyp == 3 || this.ImageTyp == 4) {
            var uuid = JSON.parse(this._constantService.getSessionDataBYKey('page_details'));
            this.userId = uuid.PAGE_ID;
        }
        pageReport['usr_id'] = this.userId;
        pageReport['reptyp'] = reptyp;
            pageReport['txt'] = this.post_data.encodeURIPostData(text);
        pageReport['img_typ'] = this.ImageTyp;


        this._constantService.fetchDataApi(this._constantService.getpageReport(), pageReport).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this._constantService.showToast("Your feedback submitted successfully.","",1);
                this.success = true;
                this.closePopUp;
                this.showlist = !this.showlist;
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });

    }


}
