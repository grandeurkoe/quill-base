import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Post, PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit{
  post?: Post;
  error = '';
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.getPostById(id).subscribe({
      next: (data) => {
        this.post = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Page not found';
        this.loading = false;
      }
    });
  }

  onDelete(): void {
    if(confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(this.post?.id!).subscribe({
        next: () => this.router.navigate(['/']),
        error: () => this.error = 'Failed to delete post.'
      });
    }
  }
}
