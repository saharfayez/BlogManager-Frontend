import { Component } from '@angular/core';
import { HeaderComponent } from "../../home/header/header.component";
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-blog-model',
  standalone: true,
  imports: [HeaderComponent , MatCard],
  templateUrl: './blog-model.component.html',
  styleUrl: './blog-model.component.css'
})
export class BlogModelComponent {

}
