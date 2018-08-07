import { Injectable } from '@angular/core';
import { Http } from '../../../node_modules/@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input';

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
    return this.http.post(this.url,JSON.stringify(post))
      .catch((error:Response)=>{
        if (error.status===400){
          return Observable.throw(new BadInput(error.json()));
        } else {
          return Observable.throw(new AppError(error.json()));
        }
      });
    ;
  }

  updatePost(post:any){
    return this.http.patch(this.url+'/'+post.id,JSON.stringify({isRead:true}));
  }

  deletePost(post: any) {
    return this.http.delete(this.url+"/"+post.id)
      .catch((error:Response)=>{
        if (error.status===404){
          return Observable.throw(new NotFoundError());
        }
        return Observable.throw(new AppError(error));
    });
  }
}
