import { Component, NgModule, ViewChild, OnInit, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ngx-img-cropper';
@Component({
    selector: 'app-imgcropperprofile',
    templateUrl: './imgcropperprofile.component.html',
    styleUrls: ['./../imgcropper/imgcropper.component.scss', './imgcropperprofile.component.scss']
})
export class ImgcropperprofileComponent implements OnInit {
    openConfirmation: boolean = false;
    dataConf = {};
    canvasParentWidth=0;
    canvasParentWidthParse=0;
    // imgcopperprofile:boolean=true;

    name: string;
    // data1:any;
    // cropperSettings1:CropperSettings;
    data2: any;
    cropperSettings2: CropperSettings;
    croppedWidth: number;
    croppedHeight: number;
    @Output() popupobj = new EventEmitter<object>();
    profilepopup() {
        this.data2['status'] = false;
        this.popupobj.emit(this.data2);
    }

    @ViewChild('cropper', { static: false }) cropper: ImageCropperComponent;

    constructor(
    private changeDetector: ChangeDetectorRef

    ) {

        this.name = 'Angular2'
        this.cropperSettings2 = new CropperSettings();
        this.cropperSettings2.width = 200;
        this.cropperSettings2.height = 200;

        this.cropperSettings2.croppedWidth = 500;
        this.cropperSettings2.croppedHeight = 400;

// var width =parseInt(0.9*window.innerWidth);
// var height=width/2;
if (window.innerWidth>= 700) {
        this.cropperSettings2.canvasWidth = 700;
        this.cropperSettings2.canvasHeight = 350;
}else{
  var width =window.innerWidth;
  var height=Math.floor(width/2);
  this.cropperSettings2.canvasWidth = width;
  this.cropperSettings2.canvasHeight = height;
}
        this.cropperSettings2.minWidth = 100;
        this.cropperSettings2.minHeight = 100;

        this.cropperSettings2.rounded = true;
        this.cropperSettings2.minWithRelativeToResolution = false;

        this.cropperSettings2.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.cropperSettings2.cropperDrawSettings.strokeWidth = 2;
        this.cropperSettings2.noFileInput = false;
        this.cropperSettings2.preserveSize = true;
        this.cropperSettings2.keepAspect = true;

        this.data2 = {};
    }
    ngOnInit() {
        setTimeout(() => {
            var input = (<HTMLInputElement>document.getElementById('custom-input'));
            if (input) {
                input.click();
            }
        }, 100);
    }

    cropped(bounds: Bounds) {
        this.croppedHeight = bounds.bottom - bounds.top;
        this.croppedWidth = bounds.right - bounds.left;
    }

    fileChangeListener($event) {
        var image: any = new Image();
        var file: File = $event.target.files[0];
        var myReader: FileReader = new FileReader();
        var size = Math.round(file.size / 1000 / 1000);
        if (file.name.match(/\.(JPG|JPEG|PNG|GIF|jpg|jpeg|png|gif)$/)) {
            if (size <= 10) {
                myReader.onloadend = (loadEvent: any) => {
                    image.src = loadEvent.target.result;
                    this.cropper.setImage(image);
                    this.data2['orgFile'] = file;
                    this.data2['filename'] = file.name;
                };
                myReader.readAsDataURL(file);
                this.changeDetector.markForCheck();
                this.changeDetector.detectChanges();
                // this.canvasParentWidth = document.getElementById('controlCropperSec').offsetWidth;
                // this.canvasParentWidthParse = parseInt(canvasParentWidth);
                // document.getElementsByTagName('canvas')[0].style.width="100%";
            } else {
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['type'] = 2;
                this.dataConf['error_msg'] = "File above 10mb is not allowed";
                this.openConfirmation = true;
            }
            // setTimeout(() => {
                document.getElementsByTagName('canvas')[0].style.width="100%";
                
            // }, 1000);
        } else {
            this.dataConf['msg'] = "STUDY24X7";
            this.dataConf['type'] = 2;
            this.dataConf['error_msg'] = "Invalid file format";
            this.openConfirmation = true;
        }
        setTimeout(() => {

            this.changeDetector.markForCheck();
            this.changeDetector.detectChanges();
        }, 500);
        this.changeDetector.markForCheck();
        this.changeDetector.detectChanges();
    }

    uploadPic() {
        this.data2['status'] = true;
        this.popupobj.emit(this.data2);
    }
    closePopup(event) {
        if (event['error'] == false) {
            this.openConfirmation = false;
        }
    }
}
