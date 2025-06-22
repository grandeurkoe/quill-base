import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { authGuard } from './guards/auth.guard';
import { MyPostComponent } from './components/my-post/my-post.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '', component: PostListComponent, data: { title: 'Home' } },
  { path: 'post/:id', component: PostDetailComponent, data: { title: 'Post Details' } },
  { path: 'new', component: PostFormComponent, canActivate: [authGuard], data: { title: 'New Post' } },
  { path: 'edit/:id', component: PostFormComponent, canActivate: [authGuard], data: { title: 'Edit Post' } },
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'register', component: RegisterComponent, data: { title: 'Register' } },
  { path: 'edit-profile', component: RegisterComponent, data: { title: 'Edit Profile' } },
  { path: 'my-posts', component: MyPostComponent, data: { title: 'My Posts' } },
  { path: 'profile', component: ProfileComponent, data: { title: 'My Profile' } },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
