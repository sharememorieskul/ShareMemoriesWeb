import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Article } from '../models/article.model';
import { ArticleService } from '../services/article.service';
import { LocalStorageHelper } from '../helpers/local-storage.helper';
import { Constants } from '../constants/constants';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})

export class GetArticlesResolverService implements Resolve<Article[] | string> {
  constructor(private articleService: ArticleService, private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article[] | string> {
    const userToken: string = LocalStorageHelper.getItem(Constants.localStorageTokenKey);
    if (userToken == null) {
      return this.articleService.getAll()
        .pipe(
          catchError((err: string) => of(err))
        );
    }
    else {
      return this.userService.GetAllPostsAvaiableForUser()
        .pipe(
          catchError((err: string) => of(err))
        );
    }


  }


}
