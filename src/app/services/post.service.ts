import { Injectable } from '@angular/core';
import { Http } from '../../../node_modules/@angular/http';
import { Observable } from '../../../node_modules/rxjs/Observable';

@Injectable()
export class PostService {

  private url:string='http://jsonplaceholder.typicode.com/posts';
  private http:Http;

  constructor(http:Http) {
    this.http=http;
   }

   getPosts(){
    return this.http.get(this.url);
   }

   addPost(post: any) {
    return this.http.post(this.url,JSON.stringify(post));
  }

  updatePost(post:any){
    return this.http.patch(this.url+'/'+post.id,JSON.stringify({isRead:true}));
  }

  deletePost(post: any) {
    return this.http.delete(this.url+"/"+post.id);
  }
}
