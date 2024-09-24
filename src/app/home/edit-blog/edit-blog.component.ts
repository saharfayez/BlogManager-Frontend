import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/Blog Service/blogservice.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from "../header/header.component";
import { BlogModelComponent } from "../../shared/blog-model/blog-model.component";
import { Post } from '../../model/post.model';

@Component({
  selector: 'app-edit-blog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    HeaderComponent,
    BlogModelComponent
  ],
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  blogForm: FormGroup;
  blogId!: number;
  post!: Post;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private blogService: BlogService
  ) {
    
    this.blogForm = this.fb.group({
      title: [''],
      content: ['']
    });
  }

  ngOnInit(): void {
    
    this.blogId = +this.route.snapshot.paramMap.get('id')!;

   
    this.blogService.getPostByIdFromDatabase(this.blogId).subscribe({
      next: (post) => {
        this.post = post;
        this.populateForm(post);
      },
      error: (err) => {
        console.error('Error fetching post:', err);
        alert('Failed to load the blog post. Please try again.');
      }
    });

  }

 
  populateForm(post: Post) {
    this.blogForm.patchValue({
      title: post.title,
      content: post.content
    });
  }

  
   onSubmit(): void {
    const {title , content} = this.blogForm.value;
    if (this.blogForm.valid) {
      const updatedPost: Post = {
        id: this.blogId,  
        title :title,
        content: content
      };

      this.blogService.updatePostFromDatabase(updatedPost).subscribe({
        next: (response) => {
          console.log('Post updated successfully:', response);
          alert('Post updated successfully');
          this.redirectToHomePage();
        },
        error: (err) => {
          console.error('Error updating post:', err);
          alert('Failed to update the post. Please try again.');
        }
      });
    }
  }

  
  redirectToHomePage() {
    this.router.navigate(['/home']);
  }
}
