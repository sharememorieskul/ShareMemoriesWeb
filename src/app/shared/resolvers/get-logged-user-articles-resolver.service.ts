import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of, merge } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

import { Article } from '../models/article.model';
import { ArticleService } from '../services/article.service';
import { LocalStorageHelper } from '../helpers/local-storage.helper';
import { Constants } from '../constants/constants';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})

export class GetLoggedUserArticlesResolverService implements Resolve<Article[] | string> {
  constructor(private articleService: ArticleService, private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article[] | string> {
    return this.userService.GetLoggedUser().pipe(
      mergeMap(user => this.userService.GetAllPostsCreatedByUser(user.uuid).pipe(
        catchError((err: string) => of(err))
      ))
    );
    
  }
}
