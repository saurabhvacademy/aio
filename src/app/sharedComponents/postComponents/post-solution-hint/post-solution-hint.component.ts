import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {ConstantService} from './../../../services/constant.service';
import { PostdataService } from './../../../services/postdata.service';

@Component({
  selector: 'app-post-solution-hint',
  templateUrl: './post-solution-hint.component.html',
  styleUrls: ['./post-solution-hint.component.scss']
})
export class PostSolutionHintComponent implements OnInit {
  @Input() postDataSol: any;
  @Output() imgShow = new EventEmitter<boolean>();
  downloading: boolean;

  constructor(
    public _constantService: ConstantService,
    private postData: PostdataService


  ) { }

  ngOnInit(): void {
    this.postDataSol.SOLUTION= this.postData.decodeURIPostData(this.postDataSol.SOLUTION);
  }

    postimageshow(event: any){
      this.imgShow.emit(event)
    
  }

  downloadCount(){
    
    var dlData={};
    dlData['token'] = this._constantService.getSessionDataBYKey('token');;
    dlData['token_param'] = {"device_type":"w","host":""};
    dlData['fnm']=this.postDataSol.SOL_MEDIA.fnm;
    dlData['usr_p_at_uuid']=this.postDataSol.UNIQUE_QUESTION_ID;
    dlData['dwnld_typ']=2;
    var fnmArr=this.postDataSol.SOL_MEDIA.fnm.split('.');
    dlData['ftyp']= fnmArr[fnmArr.length-1];
    this.downloading=true;
    this._constantService.fetchBlobDataApi(this._constantService.getDownloadResourcesUrlSolution(),dlData).subscribe(response=>{
        var newBlob = new Blob([response], { type: "application/pdf" });
         this.downloading=false;
      
        // IE doesn't allow using a blob object directly as link href
        // instead it is necessary to use msSaveOrOpenBlob
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob);
            return;
        }

        // For other browsers: 
        // Create a link pointing to the ObjectURL containing the blob.
        const data = window.URL.createObjectURL(newBlob);

        var link = document.createElement('a');
        link.href = data;
        link.download = this.postDataSol.SOL_MEDIA.fnm;
        // this is necessary as link.click() does not work on the latest firefox
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

        setTimeout(function () {
            // For Firefox it is necessary to delay revoking the ObjectURL
            window.URL.revokeObjectURL(data);
            link.remove();
        }, 100);
    })
  }
}
