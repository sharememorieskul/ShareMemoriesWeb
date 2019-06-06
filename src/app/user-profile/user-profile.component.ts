import { Component, OnInit } from '@angular/core';
import { Article } from '../shared/models/article.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userArticles: Article[] = [];
  error: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const resolvedData: Article[] = this.activatedRoute.snapshot.data['getArticles'];

    if (Array.isArray(resolvedData)) {
      this.userArticles = resolvedData;
    } else {
      this.error = resolvedData;
    }
  }


}
