import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _router: Router
  ) { }

  public login(accessToken:string){
    localStorage.setItem('ACCESS_TOKEN', accessToken);
  }

  public isLoggedIn(){
    return !(localStorage.getItem('ACCESS_TOKEN') === '');

  }

  public logout(){
    localStorage.removeItem('ACCESS_TOKEN');
  }
}