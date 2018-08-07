import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input';

@Component({
  selector: 'postComponent',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{

  private postService:PostService;
  posts:any[];

  constructor( service:PostService) {
    this.postService=service;
   }

   createPost(input:HTMLInputElement){
     let post={title:input.value};
     input.value="";
     this.postService.addPost(post)
        .subscribe(
          response=>{
            post["id"]=response.json().id;
            this.posts.push(post);
          },
          (error:AppError)=>{
            if (error instanceof BadInput){
              //this.form.setErrors(error.originalError);
            } else throw error;
     });
   }

   updatePost(post){
     this.postService.updatePost(post)
      .subscribe(
        response=>{
          console.log(response.json());
     });
   }

   deletePost(post){
     this.postService.deletePost(345)
     .subscribe(
        response=>{
          console.log(response.json());
          this.updateListOfPosts(post);
     }, (error:AppError)=>{
       if (error instanceof NotFoundError){
         alert("Post has already been deleted");
       } else throw error;
     });
   }
   private updateListOfPosts(post: any): any {
    let index = this.posts.indexOf(post);
    this.posts.splice(index,1);
  }

  ngOnInit(): void {
    this.postService.getPosts()
      .subscribe(
        response=>{
          this.posts=response.json();
      });
  }
}
