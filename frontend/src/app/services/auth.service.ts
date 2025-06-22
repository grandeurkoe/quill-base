import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/auth';
  private tokenKey = 'token';
  private user: {username: string, [key: string]: any} | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromToken();
  }

  register( data: { username: string, email: string, password: string}) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

    login( data: { email: string, password: string}) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, data)
    .pipe(
      tap(res => {
        localStorage.setItem(this.tokenKey, res.token);
        this.decodeToken(res.token);
      })
    );
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.user = null;
  }

  getUser() {
    return this.user;
  }

  private decodeToken(token: string): void {
    try {
      const decoded = jwtDecode<{ username: string }>(token);
      this.user = decoded;
    } catch (err) {
      this.user = null;
    }
  }

  public loadUserFromToken(): void {
    const token = this.getToken();
    if (token) this.decodeToken(token);
  }
}
