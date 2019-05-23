import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Article } from '../models/article.model';
import { ArticleService } from '../services/article.service';

@Injectable({
  providedIn: 'root'
})

export class GetArticleResolverService implements Resolve<Article> {
  constructor(private articleService: ArticleService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article> | Promise<Article> | Article {
    return this.articleService.get(route.params['id']);
  }
}
