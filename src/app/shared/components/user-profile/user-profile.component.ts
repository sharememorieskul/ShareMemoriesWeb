import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userEmail: string;
  userArticles: Article[] = [];

  constructor() { }

  ngOnInit() {
    this.userEmail = this.getUserInfo().email;
  }

  private getUserInfo() {
    return JSON.parse(localStorage.getItem('session-token'));
  }

}
