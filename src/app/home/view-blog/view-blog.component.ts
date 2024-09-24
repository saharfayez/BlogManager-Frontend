import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { BlogService } from '../../services/Blog Service/blogservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-view-blog',
  standalone: true,
  imports: [HeaderComponent , MatCardModule],
  templateUrl: './view-blog.component.html',
  styleUrl: './view-blog.component.css',
})
export class ViewBlogComponent {
  constructor(private blogService: BlogService, private router: Router ,  private route: ActivatedRoute) {}

  blogId!:number;
  blogTitle!:string;
  blogContent!:string;
 
  ngOnInit(): void {
    this.blogId = +this.route.snapshot.paramMap.get('id')!;
  
    this.blogService.getPostByIdFromDatabase(this.blogId).subscribe({


      next: (post) => {
       this.blogTitle = post.title;
       this.blogContent = post.content;
      },
      error: (err) => {
        console.error('Error updating post:', err);
        alert('Failed to update the post. Please try again.');
      }
    });
      
  }

  redirectToHome(){
    this.router.navigate(['/home']);
  }
}
