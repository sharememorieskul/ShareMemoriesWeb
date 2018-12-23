import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataSharingService } from '../services/data-sharing.service';
import { map } from 'rxjs/operators';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})

export class GetArticlesResolverService implements Resolve<Article[]> {
  constructor(private dataSharingService: DataSharingService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article[]> | Promise<Article[]> | Article[] {
    return this.dataSharingService.getArticles()
      .pipe(
        map((data: Article[]) => {
          return data;
        })
      );
  }
}
