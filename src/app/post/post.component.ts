import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'postComponent',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{

  private url:string='http://jsonplaceholder.typicode.com/posts';
  private postService:PostService;
  posts:any[];

  constructor( service:PostService) {
    this.postService=service;
   }

   createPost(input:HTMLInputElement){
     let post={title:input.value};
     input.value="";
     this.postService.addPost(post)
     .subscribe(response=>{
       post["id"]=response.json().id;
       this.posts.push(post);
       console.log(response.json());
     });
   }

   updatePost(post){
     this.postService.updatePost(post)
     .subscribe(response=>{
       console.log(response.json());
     });
   }

   deletePost(post){
     this.postService.deletePost(post)
     .subscribe(response=>{
       console.log(response.json());
       this.updateListOfPosts(post);
     });
   }
   private updateListOfPosts(post: any): any {
    let index = this.posts.indexOf(post);
    this.posts.splice(index,1);
  }

  ngOnInit(): void {
    this.postService.getPosts()
    .subscribe(response=>{
      this.posts=response.json();
    });
  }
}
