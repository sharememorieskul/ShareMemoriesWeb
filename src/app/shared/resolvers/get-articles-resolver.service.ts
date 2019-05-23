import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Article } from '../models/article.model';
import { ArticleService } from '../services/article.service';

@Injectable({
  providedIn: 'root'
})

export class GetArticlesResolverService implements Resolve<Article[] | string> {
  constructor(private articleService: ArticleService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article[] | string> {
    return this.articleService.getAll()
      .pipe(
        catchError((err: string) => of(err))
      );
  }
}
