import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseUrlService {

  constructor() { }

  getBaseUrl(){
    return 'http://localhost:5000';
  }

}
