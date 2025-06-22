import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  error = '';
  success = '';
  isEditMode = false;

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isEditMode = this.route.snapshot.routeConfig?.path === 'edit-profile';

    if (this.isEditMode) {
      const user = this.auth.getUser();
      if (user) {
        this.username = user.username;
        this.email = user['email'];
      }
    }
  }

  submit() {
    this.error = '';
    this.success = '';

    if (this.password || this.confirmPassword) {
      if (this.password !== this.confirmPassword) {
        this.error = 'Passwords do not match';
        return;
      }
    }

    const payload: any = {
      username: this.username,
      email: this.email
    };
    if (this.password) payload.password = this.password;

    if (this.isEditMode) {
      this.http.put('http://localhost:3000/api/auth/me', payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }).subscribe({
        next: (res: any) => {
          if (res.token) {
            localStorage.setItem('token', res.token);
            this.auth.loadUserFromToken();
          }
          this.success = 'Profile updated successfully';
          setTimeout(() => this.router.navigate(['/profile']), 1500);
        },
        error: err => {
          this.error = err.error.message || 'Update failed';
        }
      });
    } else {
      this.auth.register(payload).subscribe({
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
}
