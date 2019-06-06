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

export class GetPublicArticlesResolverService implements Resolve<Article[] | string> {
  constructor(private articleService: ArticleService, private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article[] | string> {
    return this.articleService.getAll()
      .pipe(
        catchError((err: string) => of(err))
      );
  }
}
