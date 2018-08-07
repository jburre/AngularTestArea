import { Injectable } from '@angular/core';
import { Http } from '../../../node_modules/@angular/http';
import { DataService } from './data.service';

@Injectable()
export class PostService extends DataService{

  constructor(http:Http) {
    super(http,"http://jsonplaceholder.typicode.com/posts");
   }
}
