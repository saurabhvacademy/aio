import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  menuOpen = false;

  constructor(private router: Router) {}

  get isLoggedIn(): boolean {
    // Adjust this logic as per your auth implementation
    return !!localStorage.getItem('ACCESS_TOKEN');
  }

  goTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    localStorage.setItem('ACCESS_TOKEN', '');
    this.router.navigate(['/login']);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
