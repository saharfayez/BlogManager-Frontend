// app.route.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AddBlogComponent } from './home/add-blog/add-blog.component';
import { EditBlogComponent } from './home/edit-blog/edit-blog.component';
import { ViewBlogComponent } from './home/view-blog/view-blog.component';
import { AuthGuard } from './guards/auth-guard.guard';


export const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  
  
  { path: 'home', component: HomeComponent  , canActivate:[AuthGuard]},
  { path: 'add-blog', component: AddBlogComponent , canActivate:[AuthGuard] },
  { path: 'edit-blog/:id', component: EditBlogComponent, canActivate:[AuthGuard] },
  { path: 'view-blog/:id', component: ViewBlogComponent , canActivate:[AuthGuard]},

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
