import { Component, OnInit } from '@angular/core';
import { Article } from '../shared/models/article.model';
import { ActivatedRoute } from '@angular/router';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userArticles: Article[] = [];
  error: string;
  user: User;
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    const resolvedArticlesData: Article[]|string = this.activatedRoute.snapshot.data['getArticles'];

    if (Array.isArray(resolvedArticlesData)) {
      this.userArticles = resolvedArticlesData;
    } else {
      this.error = resolvedArticlesData;
    }

    this.user = this.activatedRoute.snapshot.data['getUser'];
  }
  followClicked()
  {
    this.userService.Follow(this.user.uuid).subscribe(x=>this.user.isFollowing=true);
  }
}
