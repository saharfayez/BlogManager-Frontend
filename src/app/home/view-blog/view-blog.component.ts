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
  
    this.blogService.getPostById(this.blogId).then(blog=>{

    this.blogTitle=blog.title;
    this.blogContent=blog.content;
  })
  }

  redirectToHome(){
    this.router.navigate(['/']);
  }
}
