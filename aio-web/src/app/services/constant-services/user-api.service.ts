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

  usersBaseUrl = this._baseUrlService.getBaseUrl() +"/api/users";
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', 'http://localhost:5000/');

  getUsers() {
    return this._httpClient.get(this.usersBaseUrl + '/users');
  }

  createUser(params: any) {
    return this._httpClient.post(this.usersBaseUrl + '/register', params);
  }

  loginUser(params: any) {
    return this._httpClient.post(this.usersBaseUrl + '/login', params, { headers: this.headers });
  }


}
