import { AuthorService } from '../author.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  title: string = "List of authors";
  authors:Array<string>;

  constructor(authorservice:AuthorService) {
    this.authors=authorservice.getAuthors();
   }

  ngOnInit() {
  }

}
