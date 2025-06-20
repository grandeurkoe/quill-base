import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login({ email: this.email, password: this.password}).subscribe({
      next: res => {
        this.auth.saveToken(res.token);
        this.router.navigate(['/']);
      },
      error: err => {
        this.error = err.error.message || 'Login failed';
      }
    });
  }
}
