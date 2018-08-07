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
     this.postService.create(post)
        .subscribe(
          newPost=>{
            post["id"]=newPost.id;
            this.posts.push(post);
          },
          (error:AppError)=>{
            if (error instanceof BadInput){
              //this.form.setErrors(error.originalError);
            } else throw error;
     });
   }

   updatePost(post){
     this.postService.update(post)
      .subscribe(
        updatedPost=>{
          console.log(updatedPost);
     });
   }

   deletePost(post){
     this.postService.delete(345)
     .subscribe(
        deletedPost=>{
          console.log(deletedPost);
          this.updateListOfPosts(deletedPost);
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
    this.postService.getAll()
      .subscribe(
        posts=>{
          this.posts=posts;
      });
  }
}
