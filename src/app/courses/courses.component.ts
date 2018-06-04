import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  title:string="List of courses";
  courses:Array<string>;
  
  constructor(service:CoursesService) {
      //this.courses=["course1","course2","course3"];
      this.courses=service.getCourses();
   }

  ngOnInit() {
  }
}
