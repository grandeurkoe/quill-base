import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public auth: AuthService, private router: Router) {}

  get userEmail(): string | null {
    return this.auth.getUser()?.username ?? null;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
