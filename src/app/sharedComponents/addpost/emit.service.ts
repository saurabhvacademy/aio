import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmitService {

  // EventEmitter should not be used this way - only for `@Output()`s
  //nameChange: EventEmitter<string> = new EventEmitter<string>();
  textEmmiter: Subject<any> = new Subject<any>();
  emmiter: Subject<any> = new Subject<any>();
  objectEmitter:Subject<any>=new Subject<any>();
  registerErrorObjectEmitter:Subject<any>=new Subject<any>();
  removeImage:  Subject<any> = new Subject<any>();
  imageUploadUrlBlank:  Subject<any> = new Subject<any>();
  imgDocUrlBlank:  Subject<any> = new Subject<any>();


  constructor() {
  }
  emitted(event){
    this.emmiter.next(event);
  }
  textEmitted(event){
    this.textEmmiter.next(event);
  }
  objectEmited(event){
    this.objectEmitter.next(event);
  }
  registerErrorObjectEmitted(event){
    this.registerErrorObjectEmitter.next(event);
  }
  removeUpldImg(event){
    this.removeImage.next(event);
  }
  imageUploadUrl(){
    this.imageUploadUrlBlank.next();
  }
  
  // removeDocFile(event){
  //   this.imgDocUrlBlank.next();
  // }
}
