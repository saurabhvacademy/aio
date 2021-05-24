import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonEmitterService {
  profileImageUpdatedEmitter: Subject<any> = new Subject<any>();
  loginSuccessfulEmitter: Subject<any>=new Subject<any>();

  constructor() { }

  profileImageUpdated(event){
    this.profileImageUpdatedEmitter.next(event);
  }

  loginSuccesful(event){
    this.loginSuccessfulEmitter.next(event);
  }
}
