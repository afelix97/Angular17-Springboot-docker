import { Routes } from '@angular/router';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'blog', component: BlogPostComponent },
  { path: 'users', component: UserComponent },
  { path: 'create-user', component: UserCreateComponent },
];
