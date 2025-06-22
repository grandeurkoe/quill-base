import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from 'src/app/services/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  posts: Post[] = [];
  user = this.auth.getUser();
  totalPosts = 0;
  loading = false;
  error = '';

  constructor(private auth: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loading = true;
    const token = this.auth.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<Post[]>('http://localhost:3000/api/posts/my', { headers }).subscribe({
      next: (data) => {
        this.posts = data;
        this.totalPosts = data.length;
        this.loading = false;
        this.error = '';
      },
      error: (err) => {
        this.loading = false;
        console.error('Error fetching posts:', err);
        this.error = err.status === 403
          ? 'You are not authorized. Please login again.'
          : 'Something went wrong while fetching your posts.'
      }
    });
  }
}
