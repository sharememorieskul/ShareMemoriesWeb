import { Component, OnInit } from '@angular/core';
import { Article } from '../shared/models/article.model';
import { ActivatedRoute } from '@angular/router';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userArticles: Article[] = [];
  error: string;
  userEmail:string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const resolvedArticlesData: Article[]|string = this.activatedRoute.snapshot.data['getArticles'];

    if (Array.isArray(resolvedArticlesData)) {
      this.userArticles = resolvedArticlesData;
    } else {
      this.error = resolvedArticlesData;
    }

    const resolvedUser: User|string = this.activatedRoute.snapshot.data['getUser'];
    this.userEmail = (<User>resolvedUser).email;


  }
}
