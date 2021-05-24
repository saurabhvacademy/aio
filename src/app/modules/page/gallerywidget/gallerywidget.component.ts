import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import {ConstantService} from './../../../services/constant.service';
import {EncryptionService} from './../../../services/encryption.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-gallerywidget',
  templateUrl: './gallerywidget.component.html',
  styleUrls: ['./gallerywidget.component.scss']
})
export class GallerywidgetComponent implements OnInit,  AfterViewInit  {
  @Input() pageId: string;
  fullPath=[];
  isShowWidget:boolean = false;
  @Output() pageGallery = new EventEmitter<number>();
  constructor(
    public _constantService: ConstantService,
    private _encryptionServices: EncryptionService,
    private _router: Router,
  ) { }

  ngOnInit() {

  }
  ngAfterViewInit(){
    setTimeout(()=>{
        this.getGalleryImage(1);
    },200);

  }

  getGalleryImage(count){
    var gallery = {};
    gallery['token'] = this._constantService.getSessionDataBYKey('token');
    gallery['token_param'] = {};
    gallery['token_param']['device_type'] = 'w';
    gallery['token_param']['host'] = '';
    gallery['pg_uuid'] = this.pageId;
    gallery['count'] = count;
    console.log("=================="+ this.pageId +"========================");
   
    this._constantService.fetchDataApi(this._constantService.getpageGalleryServiceUrl(), gallery).subscribe(data => {
        var responseData:any = data;
        var status = responseData.STATUS;

         if (status == this._constantService.success_msg) {
            if(responseData.PAGE_GALLERY_DATA.length == 0){
              this.isShowWidget =false;
            }
            else{
              this.isShowWidget =true;
            }
           for (var i = 0; i < responseData.PAGE_GALLERY_DATA.length; i++) {
             this.fullPath[i] = responseData.PAGE_GALLERY_DATA[i].FILE_PATH + "profile/"+ responseData.PAGE_GALLERY_DATA[i].PAGE_GALLERY_UUID + ".png";
           }
         }
      });
  }

  showGallery(event){
        this.pageGallery.emit();
  }
  getUrl(index){
    if (this.fullPath[index]) {
        var imgUrl = "url('" + this.fullPath[index] + "')";
        return imgUrl;
    }
  }
}
