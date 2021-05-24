import { Component, NgModule, ViewChild, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ngx-img-cropper';
@Component({
    selector: 'app-imgcropper',
    templateUrl: './imgcroppercp.component.html',
    styleUrls: ['./imgcroppercp.component.scss', './newimgcroppercp.component.scss']
})
export class ImgcroppercpComponent implements OnInit {
    openConfirmation: boolean = false;
    dataConf = {};

    name: string;
    // data1:any;
    // cropperSettings1:CropperSettings;
    data2: any;
    cropperSettings2: CropperSettings;
    croppedWidth: number;
    croppedHeight: number;
    @Output() coverobj = new EventEmitter<object>();
    opencover() {
        this.data2['status'] = false;
        this.coverobj.emit(this.data2);
    }
    @ViewChild('cropper', {static: false}) cropper: ImageCropperComponent;

    constructor(
        private changeDetector: ChangeDetectorRef
    ) {
        this.name = 'Angular2'
        this.cropperSettings2 = new CropperSettings();
        this.cropperSettings2.width = 1200;
        this.cropperSettings2.height = 600;

        this.cropperSettings2.croppedWidth = 1200;
        this.cropperSettings2.croppedHeight = 600;
        if (window.innerWidth>= 800) {
          this.cropperSettings2.canvasWidth = 800;
          this.cropperSettings2.canvasHeight = 400;
        }else{
          var width = window.innerWidth;
          var height= Math.floor(width/2);
          this.cropperSettings2.canvasWidth = width;
          this.cropperSettings2.canvasHeight = height;
        }


        this.cropperSettings2.minWidth = 2;
        this.cropperSettings2.minHeight = 1;

        //        this.cropperSettings2.width = 1600;
        //        this.cropperSettings2.height = 600;
        //
        //        this.cropperSettings2.croppedWidth = 800;
        //        this.cropperSettings2.croppedHeight = 400;
        //
        //        this.cropperSettings2.canvasWidth = 400;
        //        this.cropperSettings2.canvasHeight = 800;
        //
        //        this.cropperSettings2.minWidth = 800;
        //        this.cropperSettings2.minHeight = 400;

        this.cropperSettings2.rounded = false;
        this.cropperSettings2.dynamicSizing = false;
        this.cropperSettings2.minWithRelativeToResolution = true;

        this.cropperSettings2.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.cropperSettings2.cropperDrawSettings.strokeWidth = 2;
        this.cropperSettings2.noFileInput = false;
        this.cropperSettings2.preserveSize = true;
        this.cropperSettings2.keepAspect = true;

        this.data2 = {};
    }


    ngOnInit() {
        setTimeout(() => {
            var input = (<HTMLInputElement>document.getElementById('cvrUpload'));
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
        console.log(file);
        if (file.name.match(/\.(JPG|PNG|JPEG|GIF|jpg|jpeg|png|gif)$/)) {
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


            } else if (size > 10) {
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['type'] = 2;
                this.dataConf['error_msg'] = "File above 10mb is not allowed";
                this.openConfirmation = true;
            }
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
        this.coverobj.emit(this.data2);
    }
    closePopup(event) {
        if (event['error'] == false) {
            this.openConfirmation = false;
        }
    }

}
