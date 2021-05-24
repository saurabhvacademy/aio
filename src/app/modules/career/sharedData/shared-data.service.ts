import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  testDetails:any={};
  endpoint:any='';

  constructor() { }
}
