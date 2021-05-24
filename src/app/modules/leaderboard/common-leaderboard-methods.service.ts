import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonLeaderboardMethodsService {

  constructor() { }

  openLeaderProfile(leader) {
    window.open(window.location.origin + '/profile/' + leader.USER_NAME);
  }
}
