import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient, private router: Router) { }

  register( data: { email: string, password: string}) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

    login( data: { email: string, password: string}) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, data)
    .pipe(
      tap(res => localStorage.setItem('token', res.token))
    );
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
