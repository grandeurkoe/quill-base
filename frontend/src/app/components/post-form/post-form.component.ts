import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit{
  postForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  postId: number | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder, 
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      content: ['', [Validators.required]],
    });
  }
  
  author = this.auth.getUser()?.username || '';

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.postId = idParam ? +idParam: null;

    if(this.postId) {
      this.isEditMode = true;
      this.postService.getPostById(this.postId).subscribe({
        next: (post) => this.postForm.patchValue(post),
        error: () => this.errorMessage = 'Failed to load post for editing.'
      });
    }
  }

  onSubmit(): void {
    if (this.postForm.invalid) return;

    const formData = this.postForm.value;

    if(this.isEditMode && this.postId) {
      this.postService.updatePost(this.postId, formData).subscribe({
        next: () => this.router.navigate(['/post', this.postId]),
        error: () => this.errorMessage = 'Failed to update post.'
      });
    }

    this.postService.createPost(formData).subscribe({
      next: (res) => {
        this.successMessage = 'Post created successfully!';
        this.postForm.reset();
      },
      error: (err) => {
        this.errorMessage = 'Failed to create post.';
        console.error(err);
      }
    });
  }
}
