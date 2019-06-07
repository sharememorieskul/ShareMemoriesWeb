import { Component, OnInit } from '@angular/core';
import { Article } from '../shared/models/article.model';
import { ActivatedRoute } from '@angular/router';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';
import { TokenModel } from '../shared/models/token.model';
import { LocalStorageHelper } from '../shared/helpers/local-storage.helper';
import { Constants } from '../shared/constants/constants';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userArticles: Article[] = [];
  error: string;
  user: User;
  isCurrentUserProfile:boolean;
  isAlreadyFollowed: boolean;
  
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    const resolvedArticlesData: Article[]|string = this.activatedRoute.snapshot.data['getArticles'];

    if (Array.isArray(resolvedArticlesData)) {
      this.userArticles = resolvedArticlesData;
    } else {
      this.error = resolvedArticlesData;
    }

    this.user = this.activatedRoute.snapshot.data['getUser'];
    const tokenModel: TokenModel = LocalStorageHelper.getItem(Constants.localStorageTokenKey);
    this.isCurrentUserProfile=this.user.email==tokenModel.email;
    this.isAlreadyFollowed=this.user.isFollowing;
  }
  followClicked()
  {
    this.userService.Follow(this.user.uuid).subscribe(x=>this.isAlreadyFollowed=true );
  }
  unfollowClicked()
  {
    this.userService.Unfollow(this.user.uuid).subscribe(x=>this.isAlreadyFollowed=false );
  }
}
