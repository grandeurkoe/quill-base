import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  error = '';
  success = '';
  
  constructor(private auth: AuthService, private router: Router) {}
  
  register() {
    this.error = '';
    this.success = '';

    if(this.password !== this.confirmPassword) {
      this.error = "Password do not match";
      return;
    }

    this.auth.register({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.success = 'Registered successfully. Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      }, 
      error: err => {
        this.error = err.error.message || 'Registration failed';
      }
    });
  }
}
