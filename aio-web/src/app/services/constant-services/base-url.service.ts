import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseUrlService {

  constructor() { }

  getBaseUrl(){
    // return 'https://aio-be.onrender.com';
    return 'http://localhost:5000'
  }

}
