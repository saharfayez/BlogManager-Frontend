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
    private httpClient: HttpClient,
  ) {}

  // Add Post to Database
  addPost(post: Post){
    
    return this.httpClient.post(`${this.url}/posts`, post);
  }

  getAllPosts(): Observable<any> {

    return this.httpClient.get(`${this.url}/posts`);
  }

  getPostByIdFromDatabase(id: number): Observable<any> {

    return this.httpClient.get(`${this.url}/posts/${id}`);
  }

 updatePostFromDatabase(post:Post): Observable<any>   {
  return this.httpClient.put(`${this.url}/posts/${post.id}` , post)
  
} 

 deletePostFromDatabase(id:number) : Observable<any> {

    return this.httpClient.delete(`${this.url}/posts/${id}`);

}
 
  async deletePost(id: number, author: string): Promise<boolean> {
    const post = await this.indexedDBService.getPostById(id);
    if (post && post.author === author) {
      await this.indexedDBService.deletePost(id);
      return true;
    }
    return false;
  }
}
