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

  goTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    // Add logout logic here (clear tokens, etc.)
    // For now, just redirect to login
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
