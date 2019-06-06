import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Article } from '../models/article.model';
import { ArticleService } from '../services/article.service';
import { LocalStorageHelper } from '../helpers/local-storage.helper';
import { Constants } from '../constants/constants';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})

export class GetUserArticlesResolverService implements Resolve<Article[] | string> {
  constructor(private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article[] | string> {
    return this.userService.GetAllPostsAvaiableForUser()
      .pipe(
        catchError((err: string) => of(err))
      );
  }
}
