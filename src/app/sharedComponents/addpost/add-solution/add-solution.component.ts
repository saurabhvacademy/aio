import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { PostdataService } from './../../../services/postdata.service';
import { EmitService } from '../emit.service';
@Component({
  selector: 'app-add-solution',
  templateUrl: './add-solution.component.html',
  styleUrls: ['./add-solution.component.scss']
})
export class AddSolutionComponent implements OnInit {
  aadSolOrNot: boolean;
  @Output() fileUpload = new EventEmitter<boolean>();
  @Output() remove = new EventEmitter<boolean>();
  @Output() solutionText = new EventEmitter<string>();

  @Input() imageUploadUrl: string;
  @Input() showPreloader: boolean;
  uploading=false;
  uploaded=false;
  solText= '';
  removeUpldImg: any;
  removeUpldDoc: any;

  constructor(
    private postData: PostdataService,
    private emitService:EmitService

  ) { 
    this.removeUpldImg = emitService.imageUploadUrlBlank.subscribe($event => {
      this.check();
  })
//   this.removeUpldDoc = emitService.imgDocUrlBlank.subscribe($event => {
//     this.removeupld(event);
// })
  }

  ngOnInit(): void {
  }

  AddSolution() {
    this.aadSolOrNot = !this.aadSolOrNot;
  }
  addFile(event: any) {
    // this.fileUpload.emit(event)
    this.emitService.emitted(event);
  }
  removeupld(event: any) {
    this.emitService.removeUpldImg(event);
  }
 
  check(){
    this.imageUploadUrl='';
    this.uploaded=false;
    (<HTMLInputElement>document.getElementById('fileupload')).value='';

  }

  removeSolution(event:any){
    this.solText='';
    this.aadSolOrNot=!this.aadSolOrNot;
    this.removeupld(event);
    this.solutionText.emit('');
    document.getElementById('solutionText').style.height='22px';
  }

  emitSolutionText(){
    document.getElementById('solutionText').style.height='auto';
    document.getElementById('solutionText').style.height=document.getElementById('solutionText').scrollHeight+'px';
    this.emitService.textEmitted(this.solText);
  }


}
