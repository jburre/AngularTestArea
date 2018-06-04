import { LikedEventsArgs } from './like/like.component';
import { FavouriteChangedEventArgs } from './favourite/favourite.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular app!';
  post={
    title:"Title",
    isFavourite:true
  }
  courses=[];

  numberOfLikes:number=0;

  viewMode:string="map";

  canSave:boolean=true;

  onFavouriteChanged(eventArgs:FavouriteChangedEventArgs):void{
    console.log("Favourite changed: ",eventArgs);
  }

  onLikeChanged(eventArgs:LikedEventsArgs):void{
    console.log("Likes changed: ", eventArgs);
    this.numberOfLikes+=eventArgs.numberOfLikes;
  }

  loadCourses():void{
    this.courses=[{id:1, name: "course1"},{id:2, name:"course2"}];
  }

  onAdd():void{
    this.courses.push({id:4, name:"course4"});
  }

  onRemove(toRemove):void{
    let index = this.courses.indexOf(toRemove);
    this.courses.splice(index,1);
  }

  trackCourse(index,course):number{
    return course? course.id:undefined;
  }
}
