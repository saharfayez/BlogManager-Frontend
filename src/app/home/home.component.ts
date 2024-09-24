import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/Authentication Service/auth.service';
import { BlogService } from '../services/Blog Service/blogservice.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    HeaderComponent,
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  posts: any[] = [];
  isLoggedIn = false;
  currentUser = '';
 
  

  constructor(
    private router: Router,
    private blogService: BlogService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.updateLoginState();

    this.blogService.getAllPosts().subscribe(res => {
      this.posts = res;
     console.log(this.posts);
      
    });
    
  }
  

  updateLoginState() {
    this.isLoggedIn = this.authService.isLogged();
    if (this.isLoggedIn) {
      this.currentUser = this.authService.getUser()!;
    }
  }

  canEditOrDelete(userName:string): boolean {
    return this.isLoggedIn && userName === this.currentUser;
  }


  redirectToAddPost() {
    console.log('Navigating to Add Blog page'); // Debug line
    this.router.navigate(['/add-blog']).then(success => {
      if (success) {
        console.log('Navigation to Add Blog page successful');
      } else {
        console.log('Navigation to Add Blog page failed');
      }
    });
  }

  logout() {
    this.authService.logout();
    this.updateLoginState();
    this.router.navigate(['/login']);
  }

  editPost(postId: number): void {
    this.router.navigate(['/edit-blog', postId]); 
  }

  deletePost(postId: number) {
   
    this.blogService.getPostByIdFromDatabase(postId).subscribe({
      
      next: (post) => {  

        if (post && this.authService.getUser() === post.userName) {
          
          this.blogService.deletePostFromDatabase(postId).subscribe({
            next: () => {
              this.posts = this.posts.filter((p) => p.id !== postId);
              alert('Post deleted successfully');
              this.router.navigate(['/home']);
            },
            error: (err) => {
              console.error('Error deleting post:', err);
              alert('Failed to delete the post. Please try again.');
            }
          });
        } else {
          alert('You are not authorized to delete this post.');
        }
      },
      error: (err) => {
        console.error('Error retrieving post:', err);
        alert('Post not found. Please try again.');
      }
    });
  }

  viewBlogDetails(postId :number){
    
    this.router.navigate(['/view-blog' , postId]);
    
  }
}
