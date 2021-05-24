import { Injectable } from '@angular/core';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {
  constructor(
    private _encryptionService: EncryptionService
  ) { }
  defaultImagePath="../assets/images/defaultImgPathForSuggestedConnections.png";


  getProfilePicUrl() {
    var sessionDataJson = JSON.parse(this._encryptionService.decrypt(localStorage.getItem('sessionData')));
    console.log('getProfilePicURL called');
    if (!sessionDataJson['p_pic']) {
      return this.defaultImagePath;
    }
    return sessionDataJson['p_pic'];
  }
  getLoggedInUserId() {
    var sessionDataJson = JSON.parse(this._encryptionService.decrypt(localStorage.getItem('sessionData')));
    return sessionDataJson['u_id'];
  }

}
