import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService, Comment } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit{
  @Input() postId!: number; 

  comments: Comment[] = [];
  commentForm: FormGroup;
  loading = false;
  error = '';
  isLoggedIn = false;
  currentUser = '';

  constructor(
    private fb: FormBuilder,
    private commentService: CommentService,
    private auth: AuthService
  ) {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.currentUser = this.auth.getUser()?.username || '';
    this.fetchComments();
  }

  fetchComments() {
    this.loading = true;
    this.commentService.getComments(this.postId).subscribe({
      next: (data) => {
        this.comments = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load comments';
        this.loading = false;
      }
    });
  }

  submitComment() {
    if (this.commentForm.invalid) return;
    const content = this.commentForm.value.content;

    this.commentService.addComment(this.postId, { content }).subscribe({
      next: () => {
        this.commentForm.reset();
        this.fetchComments();
      },
      error: () => (this.error = 'Failed to post comment')
    });
  }

  deleteComment(id: number) {
    this.commentService.deleteComment(id).subscribe({
      next: () =>  this.fetchComments(),
      error: () => (this.error = 'Failed to delete comment')
    });
  }
}