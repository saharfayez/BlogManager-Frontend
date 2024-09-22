import { Injectable } from '@angular/core';
import { IndexedDBService } from '../IndexedDB Service/indexeddb.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../../model/post.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private url = 'http://localhost:8080';
  constructor(
    private indexedDBService: IndexedDBService,
    private httpClient: HttpClient
  ) {}

  // Add Post to Database
  addPost(post: Post){
    return this.httpClient.post(`${this.url}/posts`, post);
  }

  // Retrieve all blog posts
  async getAllPosts(): Promise<any[]> {
    return await this.indexedDBService.getAllPosts();
  }

  // Retrieve a single post by ID
  async getPostById(id: number): Promise<any> {
    return await this.indexedDBService.getPostById(id);
  }

  // Update an existing post
  async updatePost(
    id: number,
    title: string,
    content: string
  ): Promise<boolean> {
    const post = await this.indexedDBService.getPostById(id);

    await this.indexedDBService.updatePost({ id, title, content });
    return true;
  }

  // Delete a post
  async deletePost(id: number, author: string): Promise<boolean> {
    const post = await this.indexedDBService.getPostById(id);
    if (post && post.author === author) {
      await this.indexedDBService.deletePost(id);
      return true;
    }
    return false;
  }
}
