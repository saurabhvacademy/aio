import { Component, NgModule, ViewChild, OnInit,Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ngx-img-cropper';
@Component({
    selector: 'app-imgcropper',
    templateUrl: './imgcropper.component.html',
    styleUrls: ['./imgcropper.component.scss', './newimgcropper.component.scss']
})
export class ImgcropperComponent implements OnInit {
    openConfirmation: boolean = false;
    dataConf = {};
    @Input() childMessage: boolean;
    name: string;
    // data1:any;
    // cropperSettings1:CropperSettings;
    data2: any;
    cropperSettings2: CropperSettings;
    croppedWidth: number;
    croppedHeight: number;
    @Output() coverobj = new EventEmitter<object>();

    fileSelected: boolean;

    opencover() {
        this.data2['status'] = false;
        this.coverobj.emit(this.data2);
    }

    @ViewChild('cropper', {static: false}) cropper: ImageCropperComponent;

    constructor(
        private changeDetector: ChangeDetectorRef
    ) {

    }


    ngOnInit() {
       if(this.childMessage){
        this.name = 'Angular2'
        this.cropperSettings2 = new CropperSettings();
        this.cropperSettings2.width = 520;
        this.cropperSettings2.height = 260;
        // this.cropperSettings2.height = 600;
         }else{
            this.name = 'Angular2'
            this.cropperSettings2 = new CropperSettings();
            this.cropperSettings2.width = 1235;
            this.cropperSettings2.height = 330;
            // this.cropperSettings2.height = 600;
         }



        this.cropperSettings2.croppedWidth = 1235;
        this.cropperSettings2.croppedHeight = 330;



        // this.cropperSettings2.canvasWidth = 700;
        // this.cropperSettings2.canvasHeight = 350;
        if (window.innerWidth>= 700) {
                this.cropperSettings2.canvasWidth = 700;
                this.cropperSettings2.canvasHeight = 350;
        }else{
          var width =window.innerWidth;
          var height=Math.floor(width/2);
          this.cropperSettings2.canvasWidth = width;
          this.cropperSettings2.canvasHeight = height;
        }


        this.cropperSettings2.minWidth = 4;
        // this.cropperSettings2.minHeight = 1;
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
        this.changeDetector.detectChanges();
        if (file.name.match(/\.(JPG|PNG|JPEG|GIF|jpg|jpeg|png|gif)$/)) {
            if (size <= 10) {
                myReader.onloadend = (loadEvent: any) => {
                    image.src = loadEvent.target.result;
                    this.cropper.setImage(image);
                    this.data2['orgFile'] = file;
                    this.data2['filename'] = file.name;
                    setTimeout(()=>{
                        this.changeDetector.detectChanges();
                    },500);
                };
                myReader.readAsDataURL(file);
                // document.getElementsByTagName('canvas')[0].style.width="100%";
            } else if (size > 10) {
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['type'] = 2;
                this.dataConf['error_msg'] = "File above 10mb is not allowed";
                this.openConfirmation = true;
            }
            this.fileSelected=true;
        } else {
            this.dataConf['msg'] = "STUDY24X7";
            this.dataConf['type'] = 2;
            this.dataConf['error_msg'] = "Invalid file format";
            this.openConfirmation = true;
        }

    }

    uploadPic() {
        console.log(this.data2['status']);
        this.data2['status'] = true;
        this.coverobj.emit(this.data2);
    }

    closePopup(event) {
        if (event['error'] == false) {
            this.openConfirmation = false;
        }
    }

}
