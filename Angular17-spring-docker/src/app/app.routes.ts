import { Routes } from '@angular/router';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';

export const routes: Routes = [
  { path: 'blog', component: BlogPostComponent },
  { path: 'create-user', component: UserCreateComponent },
];
