// app.route.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AddBlogComponent } from './home/add-blog/add-blog.component';
import { EditBlogComponent } from './home/edit-blog/edit-blog.component';
import { ViewBlogComponent } from './home/view-blog/view-blog.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  
  { path: 'add-blog', component: AddBlogComponent },
  { path: 'edit-blog/:id', component: EditBlogComponent },
  { path: 'view-blog/:id', component: ViewBlogComponent},
  

  { path: '**', redirectTo: '' }
 
];
