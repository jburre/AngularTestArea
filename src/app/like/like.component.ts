import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {

  @Input("isLiked")
  isLiked:boolean=false;

  @Output("liked")
  liked=new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggle():void{
    if (!this.isLiked){
      this.isLiked=true;
      this.liked.emit({liked:this.isLiked, numberOfLikes:1});
    } else {
      this.isLiked=false;
      this.liked.emit({liked:this.isLiked,numberOfLikes:-1});
    }
  }
}

export interface LikedEventsArgs{
  liked:boolean;
  numberOfLikes:number;
}
