import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Post {
  id?: number;
  title: string;
  content: string;
  created_at?: string;
  user_id?: number; 
  author?: string; // This will come from JOIN in backend
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient) {}

  // Fetch all posts (public)
  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  // Fetch a single post by ID (public)
  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  // Fetch posts created by logged-in user
  getMyPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/my`, {
      headers: this.getAuthHeaders()
    });
  }

  // Create a new post (authenticated)
  createPost(post: { title: string; content: string }): Observable<any> {
    return this.http.post(this.apiUrl, post, {
      headers: this.getAuthHeaders()
    });
  }

  // Update an existing post by ID (authenticated + ownership required)
  updatePost(id: number, post: Post): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, post, {
      headers: this.getAuthHeaders()
    });
  }

  // Delete a post by ID (authenticated + ownership required)
  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Private helper to generate auth headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
