import { Injectable } from '@angular/core';
import { BaseUrlService } from './base-url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiUrlsService {

  constructor(
    private _baseUrlService: BaseUrlService,
    private _httpClient: HttpClient
  ) { }

  baseUrl = "http://localhost:3000";
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', 'http://localhost:3000/');

  getUsers() {
    return this._httpClient.get(this.baseUrl + '/users');
  }

  createUser(params: any) {
    return this._httpClient.post(this.baseUrl + '/createUser', params);
  }

  loginUser(params: any) {
    let url = this.baseUrl;
    if (params.email) {
      url = url + '/loginUser?pw=' + params.password;
    }
    if (params.password) {
      url = url + '&email=' + params.email;
    }
    return this._httpClient.get(url);
  }


}
