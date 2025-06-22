import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Comment {
  id: number;
  post_id: number;
  author: string; // username of the commenter
  content: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private postApiUrl = 'http://localhost:3000/api/posts';
  private commentApiUrl = 'http://localhost:3000/api/comments';

  constructor(private http: HttpClient) {}

  // Get all comments for a given post
  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.postApiUrl}/${postId}/comments`);
  }

  // Add a comment to a post (requires token)
  addComment(postId: number, body: { content: string }): Observable<any> {
    return this.http.post(`${this.postApiUrl}/${postId}/comments`, body, {
      headers: this.getAuthHeaders()
    });
  }

  // Delete a specific comment (requires token)
  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(`${this.commentApiUrl}/${commentId}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Utility to generate Authorization header
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
