import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userEmail: string;
  userArticles: Article[] = [];
  error: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.userEmail = this.getUserInfo().email;

    const resolvedData: Article[] = this.activatedRoute.snapshot.data['getArticles'];

    if (Array.isArray(resolvedData)) {
      this.userArticles = resolvedData;
    } else {
      this.error = resolvedData;
    }
  }

  private getUserInfo() {
    return JSON.parse(localStorage.getItem('session-token'));
  }

}
