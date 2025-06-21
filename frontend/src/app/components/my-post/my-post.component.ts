import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from 'src/app/services/post.service';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.css']
})
export class MyPostComponent implements OnInit{
  posts: Post[] = [];
  loading = false;
  error = '';

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit(): void {
    this.loading = true;
    const token = this.auth.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<Post[]>('http://localhost:3000/api/posts/my', { headers }).subscribe({
      next: (data) => {
        this.posts = data;
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
