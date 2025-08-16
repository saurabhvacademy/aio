import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  menuOpen = false;

  constructor(private router: Router) { console.log("AIO-7");}

  get isLoggedIn(): boolean {
    const token = localStorage.getItem('ACCESS_TOKEN');
    return !!token && token !== '';
  }

  goTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
  localStorage.removeItem('ACCESS_TOKEN');
  this.router.navigate(['/login']);
}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
