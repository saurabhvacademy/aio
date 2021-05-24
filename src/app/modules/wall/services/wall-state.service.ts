import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WallStateService {

  constructor() { }
  interestState: any = {};
  setUserInterestState=(userInterests)=> {
    this.interestState.userInterestState =  userInterests ;
  }
  getUserInterestState=()=>{
    return this.interestState.userInterestState;
  }

  setInterests=(interests)=>{
    this.interestState.interests=interests;
  }
  getInterests=()=>{
    return this.interestState.interests;
  }
}