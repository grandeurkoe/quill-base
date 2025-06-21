import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Comment {
  id: number;
  post_id: number;
  author: string;
  content: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = 'http://localhost:3000/api/posts'

  constructor(private http: HttpClient) { }

  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/${postId}/comments`);
  }

  addComment(postId: number, body: { content: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/${postId}/comments`, body);
  }

  deleteComment(commentId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.http.delete(`${this.baseUrl}/comments/${commentId}`, { headers });
  }
}
